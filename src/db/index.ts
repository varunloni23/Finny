import { neon } from '@neondatabase/serverless';
import { drizzle, type NeonHttpDatabase } from 'drizzle-orm/neon-http';

// Only initialize the database connection if DATABASE_URL is available
// This prevents build errors when environment variables aren't set
let dbInstance: NeonHttpDatabase<Record<string, never>> | null = null;

if (process.env.DATABASE_URL) {
  try {
    const sql = neon(process.env.DATABASE_URL);
    dbInstance = drizzle(sql);
  } catch (error) {
    console.warn('Failed to initialize database connection:', error);
  }
}

export const db = dbInstance;