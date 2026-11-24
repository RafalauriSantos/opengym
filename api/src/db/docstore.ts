import { eq, like, sql } from 'drizzle-orm';
import type { PgDatabase } from 'drizzle-orm/pg-core';
import { documents } from './schema.js';

export interface DocStore {
  get<T = unknown>(key: string): Promise<T | undefined>;
  put(key: string, value: unknown): Promise<void>;
  delete(key: string): Promise<void>;
  /** Keys that start with `prefix`. `%` and `_` in the prefix match themselves. */
  list(prefix: string): Promise<string[]>;
}

// Any Drizzle Postgres database: PGlite in tests, Neon in production.
type Db = PgDatabase<any, any, any>;

export function createDocStore(db: Db): DocStore {
  return {
    async get<T = unknown>(key: string) {
      const rows = await db.select({ value: documents.value }).from(documents).where(eq(documents.key, key)).limit(1);
      return rows.length ? (rows[0]!.value as T) : undefined;
    },

    async put(key, value) {
      await db
        .insert(documents)
        .values({ key, value, updatedAt: sql`now()` })
        .onConflictDoUpdate({ target: documents.key, set: { value, updatedAt: sql`now()` } });
    },

    async delete(key) {
      await db.delete(documents).where(eq(documents.key, key));
    },

    async list(prefix) {
      const escaped = prefix.replace(/[\\%_]/g, '\\$&');
      const rows = await db
        .select({ key: documents.key })
        .from(documents)
        .where(like(documents.key, `${escaped}%`))
        .orderBy(documents.key);
      return rows.map(r => r.key);
    },
  };
}
