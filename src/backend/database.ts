import { neon } from "@neondatabase/serverless";

export interface GalleryMediaItem {
  id: string | number;
  type: "image" | "reel";
  src: string;
  title: string;
  aspect: "square" | "tall" | "wide";
  category: "Marriage" | "Engagement" | "Halad" | "Sangit" | "Vidhi" | "Other";
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
    remark?: string;
    status: string;
    created_at: string;
  }>;
  customGalleryItems: GalleryMediaItem[];
}

const globalMemory: MemoryStore = {
  enquiries: [],
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
        remark TEXT,
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

    // Admin users table - strictly one designated admin in database
    await sql`
      CREATE TABLE IF NOT EXISTS wedding_admin_users (
        id SERIAL PRIMARY KEY,
        mobile_number VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP WITH TIME ZONE
      );
    `;

    // Ensure email column exists if table was created previously without it
    await sql`
      ALTER TABLE wedding_admin_users 
      ADD COLUMN IF NOT EXISTS email VARCHAR(255);
    `;

    // Ensure the designated admin exists in Neon PostgreSQL
    // Mobile: 9359108383 | Email: atharva@gmail.com | SHA-256 for Umesh@8383
    const initialAdminHash = "4e1ceaa0fcd1a033792b5ac4fafed37c3184bce37d5a2b26b441acf659b619eb";
    await sql`
      INSERT INTO wedding_admin_users (mobile_number, email, password_hash, role)
      VALUES ('9359108383', 'atharva@gmail.com', ${initialAdminHash}, 'admin')
      ON CONFLICT (mobile_number) 
      DO UPDATE SET 
        email = 'atharva@gmail.com',
        password_hash = ${initialAdminHash};
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
          fullName AS "fullName",
          phone,
          email,
          eventDate AS "eventDate",
          eventType AS "eventType",
          tentativeMonthYear AS "tentativeMonthYear",
          weddingDates AS "weddingDates",
          guestCount AS "guestCount",
          estimatedBudget AS "estimatedBudget",
          location,
          message,
          remark,
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

// Service: Update enquiry status and optional admin remark
export async function updateEnquiryStatus(id: number, status: string, remark?: string) {
  const sql = getDatabase();

  if (sql) {
    try {
      await initDatabaseSchema();
      let rows;
      if (typeof remark !== "undefined") {
        rows = await sql`
          UPDATE wedding_enquiries 
          SET status = ${status}, remark = ${remark} 
          WHERE id = ${id} 
          RETURNING *;
        `;
      } else {
        rows = await sql`
          UPDATE wedding_enquiries 
          SET status = ${status} 
          WHERE id = ${id} 
          RETURNING *;
        `;
      }
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
    if (typeof remark !== "undefined") {
      item.remark = remark;
    }
  }
  return item;
}

// Gallery Uploads Services (ImageKit Media Management)
export async function saveGalleryMedia(data: {
  type: "image" | "reel";
  src: string;
  title: string;
  aspect: "square" | "tall" | "wide";
  category: "Marriage" | "Engagement" | "Halad" | "Sangit" | "Vidhi" | "Other";
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

// ========================================================
// ADMIN AUTHENTICATION SERVICES (Database Driven)
// Supports login with Mobile Number OR Email Address
// ========================================================
export async function verifyAdminCredentials(identifier: string, passwordHash: string) {
  const sql = getDatabase();
  const cleanId = identifier.trim().toLowerCase();
  const cleanMobile = identifier.trim().replace(/[\s-]/g, "");

  if (sql) {
    await initDatabaseSchema();
    const rows = await sql`
      SELECT id, mobile_number, email, role, created_at, last_login 
      FROM wedding_admin_users 
      WHERE (mobile_number = ${cleanMobile} OR LOWER(email) = ${cleanId})
        AND password_hash = ${passwordHash}
      LIMIT 1;
    `;

    if (rows && rows.length > 0) {
      // Update last_login timestamp in database
      await sql`
        UPDATE wedding_admin_users 
        SET last_login = CURRENT_TIMESTAMP 
        WHERE id = ${rows[0].id};
      `;
      return rows[0];
    }
    return null;
  }

  // Memory fallback when offline or without database
  const fallbackHash = "4e1ceaa0fcd1a033792b5ac4fafed37c3184bce37d5a2b26b441acf659b619eb";
  if ((cleanMobile === "9359108383" || cleanId === "atharva@gmail.com") && passwordHash === fallbackHash) {
    return { id: 1, mobile_number: "9359108383", email: "atharva@gmail.com", role: "admin" };
  }
  return null;
}

export async function getAdminByIdentifier(identifier: string) {
  const sql = getDatabase();
  const cleanId = identifier.trim().toLowerCase();
  const cleanMobile = identifier.trim().replace(/[\s-]/g, "");

  if (sql) {
    await initDatabaseSchema();
    const rows = await sql`
      SELECT id, mobile_number, email, role, created_at, last_login 
      FROM wedding_admin_users 
      WHERE mobile_number = ${cleanMobile} OR LOWER(email) = ${cleanId}
      LIMIT 1;
    `;
    return rows && rows.length > 0 ? rows[0] : null;
  }

  if (cleanMobile === "9359108383" || cleanId === "atharva@gmail.com") {
    return { id: 1, mobile_number: "9359108383", email: "atharva@gmail.com", role: "admin" };
  }
  return null;
}
