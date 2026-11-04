import { neon } from "@neondatabase/serverless";

export interface GalleryMediaItem {
  id: string | number;
  type: "image" | "reel";
  src: string;
  title: string;
  aspect: "square" | "tall" | "wide";
  category: "Engagement" | "Halad" | "Sangit" | "Vidhi" | "Marriage" | "Other";
  fileId?: string;
  created_at?: string;
}

interface MemoryStore {
  enquiries: Array<{
    id: number;
    fullName: string;
    phone: string;
    email: string;
    eventDate?: string;
    eventType?: string;
    guestCount?: string;
    estimatedBudget?: string;
    message?: string;
    status: string;
    created_at: string;
  }>;
  customGalleryItems: GalleryMediaItem[];
}

const globalMemory: MemoryStore = {
  enquiries: [
    {
      id: 1,
      fullName: "Aniket & Snehal Deshmukh",
      phone: "+91 98220 12345",
      email: "aniket.deshmukh@example.com",
      eventDate: "2026-12-14",
      eventType: "Wedding & Reception",
      guestCount: "450",
      estimatedBudget: "₹15 - 25 Lakhs",
      message: "Looking for traditional Maharashtrian Vedic mandap and reception lighting in Karad.",
      status: "new",
      created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
    },
    {
      id: 2,
      fullName: "Rohan Patil",
      phone: "+91 99701 54321",
      email: "rohan.patil@example.com",
      eventDate: "2026-11-28",
      eventType: "Halad & Sangeet",
      guestCount: "300",
      estimatedBudget: "₹8 - 12 Lakhs",
      message: "High-energy Sangeet concert trussing and festive Halad decor.",
      status: "contacted",
      created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    },
  ],
  customGalleryItems: [],
};

export function getDatabase() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    return null;
  }
  return neon(dbUrl);
}

// Auto-initialize Neon Postgres Schema (Enquiries + Gallery Uploads)
export async function initDatabaseSchema() {
  const sql = getDatabase();
  if (!sql) {
    return { initialized: false, mode: "memory" };
  }

  await sql`
    CREATE TABLE IF NOT EXISTS wedding_enquiries (
      id SERIAL PRIMARY KEY,
      fullName VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      email VARCHAR(255) NOT NULL,
      eventDate VARCHAR(100),
      eventType VARCHAR(100),
      guestCount VARCHAR(100),
      estimatedBudget VARCHAR(100),
      message TEXT,
      status VARCHAR(50) DEFAULT 'new',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS wedding_gallery_media (
      id SERIAL PRIMARY KEY,
      type VARCHAR(20) NOT NULL,
      src TEXT NOT NULL,
      title VARCHAR(255) NOT NULL,
      aspect VARCHAR(20) DEFAULT 'square',
      category VARCHAR(50) NOT NULL,
      file_id VARCHAR(255),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  return { initialized: true, mode: "neon-postgres" };
}

// Service: Save new wedding enquiry
export async function saveEnquiry(data: {
  fullName: string;
  phone: string;
  email: string;
  eventDate?: string;
  eventType?: string;
  guestCount?: string;
  estimatedBudget?: string;
  message?: string;
}) {
  const sql = getDatabase();

  if (sql) {
    await initDatabaseSchema();
    const result = await sql`
      INSERT INTO wedding_enquiries (
        fullName, phone, email, eventDate, eventType, guestCount, estimatedBudget, message, status
      ) VALUES (
        ${data.fullName}, ${data.phone}, ${data.email}, ${data.eventDate || null},
        ${data.eventType || null}, ${data.guestCount || null}, ${data.estimatedBudget || null},
        ${data.message || null}, 'new'
      )
      RETURNING *;
    `;
    return result[0];
  } else {
    const item = {
      id: globalMemory.enquiries.length + 1,
      ...data,
      status: "new",
      created_at: new Date().toISOString(),
    };
    globalMemory.enquiries.unshift(item);
    return item;
  }
}

// Service: Fetch all enquiries for Admin
export async function getAllEnquiries() {
  const sql = getDatabase();

  if (sql) {
    await initDatabaseSchema();
    const rows = await sql`
      SELECT * FROM wedding_enquiries ORDER BY created_at DESC;
    `;
    return rows;
  }

  return globalMemory.enquiries;
}

// Service: Update enquiry status
export async function updateEnquiryStatus(id: number, status: string) {
  const sql = getDatabase();

  if (sql) {
    const rows = await sql`
      UPDATE wedding_enquiries SET status = ${status} WHERE id = ${id} RETURNING *;
    `;
    return rows[0];
  }

  const item = globalMemory.enquiries.find((e) => e.id === Number(id));
  if (item) {
    item.status = status;
  }
  return item;
}

// Gallery Uploads Services (ImageKit Media Management)
export async function saveGalleryMedia(data: {
  type: "image" | "reel";
  src: string;
  title: string;
  aspect: "square" | "tall" | "wide";
  category: "Engagement" | "Halad" | "Sangit" | "Vidhi" | "Marriage";
  fileId?: string;
}) {
  const sql = getDatabase();

  if (sql) {
    await initDatabaseSchema();
    const result = await sql`
      INSERT INTO wedding_gallery_media (type, src, title, aspect, category, file_id)
      VALUES (${data.type}, ${data.src}, ${data.title}, ${data.aspect}, ${data.category}, ${data.fileId || null})
      RETURNING *;
    `;
    return result[0];
  } else {
    const item: GalleryMediaItem = {
      id: `ik-${Date.now()}`,
      ...data,
      created_at: new Date().toISOString(),
    };
    globalMemory.customGalleryItems.unshift(item);
    return item;
  }
}

export async function getCustomGalleryMedia() {
  const sql = getDatabase();

  if (sql) {
    await initDatabaseSchema();
    const rows = await sql`
      SELECT id, type, src, title, aspect, category, file_id as "fileId", created_at
      FROM wedding_gallery_media
      ORDER BY created_at DESC;
    `;
    return rows as GalleryMediaItem[];
  }

  return globalMemory.customGalleryItems;
}

export async function updateGalleryMedia(
  id: string | number,
  updates: { title?: string; category?: GalleryMediaItem["category"] }
) {
  const sql = getDatabase();

  if (sql) {
    await initDatabaseSchema();
    const rows = await sql`
      UPDATE wedding_gallery_media
      SET title = COALESCE(${updates.title ?? null}, title),
          category = COALESCE(${updates.category ?? null}, category)
      WHERE id = ${Number(id)}
      RETURNING *;
    `;
    return rows[0];
  }

  const item = globalMemory.customGalleryItems.find((m) => String(m.id) === String(id));
  if (item) {
    if (updates.title !== undefined) item.title = updates.title;
    if (updates.category !== undefined) item.category = updates.category;
    return item;
  }
  return null;
}

export async function deleteGalleryMedia(id: string | number) {
  const sql = getDatabase();

  if (sql) {
    await initDatabaseSchema();
    const rows = await sql`
      DELETE FROM wedding_gallery_media WHERE id = ${Number(id)} RETURNING *;
    `;
    return rows[0];
  }

  const idx = globalMemory.customGalleryItems.findIndex((m) => String(m.id) === String(id));
  if (idx !== -1) {
    const deleted = globalMemory.customGalleryItems.splice(idx, 1);
    return deleted[0];
  }
  return null;
}

export async function deleteEnquiry(id: number) {
  const sql = getDatabase();

  if (sql) {
    const rows = await sql`
      DELETE FROM wedding_enquiries WHERE id = ${Number(id)} RETURNING *;
    `;
    return rows[0];
  }

  const idx = globalMemory.enquiries.findIndex((e) => e.id === Number(id));
  if (idx !== -1) {
    return globalMemory.enquiries.splice(idx, 1)[0];
  }
  return null;
}
