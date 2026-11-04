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
    tentativeMonthYear?: string;
    weddingDates?: string;
    guestCount?: string;
    estimatedBudget?: string;
    location?: string;
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

let schemaInitialized = false;

// Auto-initialize Neon Postgres Schema (Enquiries + Gallery Uploads)
export async function initDatabaseSchema() {
  if (schemaInitialized) {
    return { initialized: true, mode: "neon-postgres" };
  }

  const sql = getDatabase();
  if (!sql) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("DATABASE_URL is not configured in production environment.");
    }
    return { initialized: false, mode: "memory" };
  }

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS wedding_enquiries (
        id SERIAL PRIMARY KEY,
        fullName VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        email VARCHAR(255) NOT NULL,
        eventDate VARCHAR(100),
        eventType VARCHAR(100),
        tentativeMonthYear VARCHAR(255),
        weddingDates VARCHAR(255),
        guestCount VARCHAR(100),
        estimatedBudget VARCHAR(100),
        location VARCHAR(255),
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
        title VARCHAR(255) DEFAULT '',
        aspect VARCHAR(20) DEFAULT 'square',
        category VARCHAR(50) NOT NULL,
        file_id VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    schemaInitialized = true;
    return { initialized: true, mode: "neon-postgres" };
  } catch (err: any) {
    console.error("Neon schema init error:", err);
    if (process.env.NODE_ENV === "production" || process.env.DATABASE_URL) {
      throw new Error(`Failed to initialize database schema: ${err.message || err}`);
    }
    return { initialized: false, mode: "fallback" };
  }
}

// Service: Save new wedding enquiry
export async function saveEnquiry(data: {
  fullName: string;
  phone: string;
  email: string;
  eventDate?: string;
  eventType?: string;
  tentativeMonthYear?: string;
  weddingDates?: string;
  guestCount?: string;
  estimatedBudget?: string;
  location?: string;
  message?: string;
}) {
  const sql = getDatabase();

  if (sql) {
    try {
      await initDatabaseSchema();
      const result = await sql`
        INSERT INTO wedding_enquiries (
          fullName, phone, email, eventDate, eventType, tentativeMonthYear, weddingDates, guestCount, estimatedBudget, location, message, status
        ) VALUES (
          ${data.fullName}, ${data.phone}, ${data.email}, ${data.eventDate || null},
          ${data.eventType || null}, ${data.tentativeMonthYear || null}, ${data.weddingDates || null},
          ${data.guestCount || null}, ${data.estimatedBudget || null}, ${data.location || null},
          ${data.message || null}, 'new'
        )
        RETURNING *;
      `;
      return result[0];
    } catch (dbErr: any) {
      console.error("Neon saveEnquiry failed:", dbErr);
      if (process.env.NODE_ENV === "production" || process.env.DATABASE_URL) {
        throw new Error(`Database error saving enquiry: ${dbErr.message || dbErr}`);
      }
    }
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("DATABASE_URL is required to save enquiries in production.");
  }

  const item = {
    id: globalMemory.enquiries.length + 1,
    ...data,
    status: "new",
    created_at: new Date().toISOString(),
  };
  globalMemory.enquiries.unshift(item);
  return item;
}

// Service: Fetch all enquiries for Admin
export async function getAllEnquiries() {
  const sql = getDatabase();

  if (sql) {
    try {
      await initDatabaseSchema();
      const rows = await sql`
        SELECT
          id,
          fullName,
          phone,
          email,
          eventDate,
          eventType,
          tentativeMonthYear,
          weddingDates,
          guestCount,
          estimatedBudget,
          location,
          message,
          status,
          created_at
        FROM wedding_enquiries
        ORDER BY created_at DESC;
      `;
      return rows;
    } catch (dbErr: any) {
      console.error("Neon getAllEnquiries failed:", dbErr);
      if (process.env.NODE_ENV === "production" || process.env.DATABASE_URL) {
        throw new Error(`Database error fetching enquiries: ${dbErr.message || dbErr}`);
      }
    }
  }

  return globalMemory.enquiries;
}

// Service: Update enquiry status
export async function updateEnquiryStatus(id: number, status: string) {
  const sql = getDatabase();

  if (sql) {
    try {
      await initDatabaseSchema();
      const rows = await sql`
        UPDATE wedding_enquiries SET status = ${status} WHERE id = ${id} RETURNING *;
      `;
      return rows[0];
    } catch (dbErr: any) {
      console.error("Neon updateEnquiryStatus failed:", dbErr);
      if (process.env.NODE_ENV === "production" || process.env.DATABASE_URL) {
        throw new Error(`Database error updating enquiry: ${dbErr.message || dbErr}`);
      }
    }
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
  category: "Engagement" | "Halad" | "Sangit" | "Vidhi" | "Marriage" | "Other";
  fileId?: string;
}) {
  const startTime = Date.now();
  console.log(`[NEON] saveGalleryMedia started | Category: ${data.category} | Type: ${data.type} | Title: "${data.title}" | FileID: ${data.fileId || "none"}`);

  const sql = getDatabase();

  if (sql) {
    try {
      await initDatabaseSchema();
      const result = await sql`
        INSERT INTO wedding_gallery_media (type, src, title, aspect, category, file_id)
        VALUES (${data.type}, ${data.src}, ${data.title}, ${data.aspect}, ${data.category}, ${data.fileId || null})
        RETURNING *;
      `;
      console.log(`[NEON] saveGalleryMedia successful (${Date.now() - startTime}ms) | Inserted Row ID: ${result[0]?.id}`);
      return result[0];
    } catch (dbErr: any) {
      console.error(`[NEON] saveGalleryMedia failed (${Date.now() - startTime}ms):`, dbErr.message || dbErr);
      if (process.env.NODE_ENV === "production" || process.env.DATABASE_URL) {
        throw new Error(`Database error saving gallery media: ${dbErr.message || dbErr}`);
      }
    }
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("DATABASE_URL is not configured in production environment.");
  }

  const item: GalleryMediaItem = {
    id: `ik-${Date.now()}`,
    ...data,
    created_at: new Date().toISOString(),
  };
  globalMemory.customGalleryItems.unshift(item);
  console.log(`[NEON] saveGalleryMedia saved to local memory (${Date.now() - startTime}ms) | Temp ID: ${item.id}`);
  return item;
}

export async function getCustomGalleryMedia() {
  const startTime = Date.now();
  console.log(`[NEON] getCustomGalleryMedia query started`);

  const sql = getDatabase();

  if (sql) {
    try {
      await initDatabaseSchema();
      const rows = await sql`
        SELECT id, type, src, title, aspect, category, file_id as "fileId", created_at
        FROM wedding_gallery_media
        ORDER BY created_at DESC;
      `;
      console.log(`[NEON] getCustomGalleryMedia successful (${Date.now() - startTime}ms) | Fetched ${rows.length} rows`);
      return rows as GalleryMediaItem[];
    } catch (dbErr: any) {
      console.error(`[NEON] getCustomGalleryMedia failed (${Date.now() - startTime}ms):`, dbErr.message || dbErr);
      if (process.env.NODE_ENV === "production" || process.env.DATABASE_URL) {
        throw new Error(`Database error fetching gallery media: ${dbErr.message || dbErr}`);
      }
    }
  }

  console.log(`[NEON] getCustomGalleryMedia using local memory (${Date.now() - startTime}ms) | ${globalMemory.customGalleryItems.length} rows`);
  return globalMemory.customGalleryItems;
}

export async function updateGalleryMedia(
  id: string | number,
  updates: { title?: string; category?: GalleryMediaItem["category"] }
) {
  const startTime = Date.now();
  console.log(`[NEON] updateGalleryMedia started | ID: ${id} | Updates:`, updates);

  const sql = getDatabase();

  if (sql) {
    try {
      await initDatabaseSchema();
      const rows = await sql`
        UPDATE wedding_gallery_media
        SET title = COALESCE(${updates.title ?? null}, title),
            category = COALESCE(${updates.category ?? null}, category)
        WHERE id = ${Number(id)}
        RETURNING *;
      `;
      console.log(`[NEON] updateGalleryMedia successful (${Date.now() - startTime}ms) | Row ID: ${id}`);
      return rows[0];
    } catch (dbErr: any) {
      console.error(`[NEON] updateGalleryMedia failed (${Date.now() - startTime}ms):`, dbErr.message || dbErr);
      if (process.env.NODE_ENV === "production" || process.env.DATABASE_URL) {
        throw new Error(`Database error updating gallery media: ${dbErr.message || dbErr}`);
      }
    }
  }

  const item = globalMemory.customGalleryItems.find((m) => String(m.id) === String(id));
  if (item) {
    if (updates.title !== undefined) item.title = updates.title;
    if (updates.category !== undefined) item.category = updates.category;
    console.log(`[NEON] updateGalleryMedia in local memory (${Date.now() - startTime}ms) | ID: ${id}`);
    return item;
  }
  return null;
}

export async function deleteGalleryMedia(id: string | number) {
  const startTime = Date.now();
  console.log(`[NEON] deleteGalleryMedia started | ID: ${id}`);

  const sql = getDatabase();

  if (sql) {
    try {
      await initDatabaseSchema();
      const rows = await sql`
        DELETE FROM wedding_gallery_media WHERE id = ${Number(id)} RETURNING *;
      `;
      console.log(`[NEON] deleteGalleryMedia successful (${Date.now() - startTime}ms) | Deleted Row ID: ${id}`);
      return rows[0];
    } catch (dbErr: any) {
      console.error(`[NEON] deleteGalleryMedia failed (${Date.now() - startTime}ms):`, dbErr.message || dbErr);
      if (process.env.NODE_ENV === "production" || process.env.DATABASE_URL) {
        throw new Error(`Database error deleting gallery media: ${dbErr.message || dbErr}`);
      }
    }
  }

  const idx = globalMemory.customGalleryItems.findIndex((m) => String(m.id) === String(id));
  if (idx !== -1) {
    const deleted = globalMemory.customGalleryItems.splice(idx, 1);
    console.log(`[NEON] deleteGalleryMedia from local memory (${Date.now() - startTime}ms) | ID: ${id}`);
    return deleted[0];
  }
  return null;
}

export async function deleteEnquiry(id: number) {
  const sql = getDatabase();

  if (sql) {
    try {
      await initDatabaseSchema();
      const rows = await sql`
        DELETE FROM wedding_enquiries WHERE id = ${Number(id)} RETURNING *;
      `;
      return rows[0];
    } catch (dbErr: any) {
      console.error("Neon deleteEnquiry failed:", dbErr);
      if (process.env.NODE_ENV === "production" || process.env.DATABASE_URL) {
        throw new Error(`Database error deleting enquiry: ${dbErr.message || dbErr}`);
      }
    }
  }

  const idx = globalMemory.enquiries.findIndex((e) => e.id === Number(id));
  if (idx !== -1) {
    return globalMemory.enquiries.splice(idx, 1)[0];
  }
  return null;
}
