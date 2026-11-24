import { jsonb, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

// Document store: one row per record (for example "db", "state:<userId>"), the value as JSONB.
// First step of the port: it keeps the document shape the JSON files had, so the code above
// it changes little. Entities move to their own tables later, one by one.
export const documents = pgTable('documents', {
  key: text('key').primaryKey(),
  value: jsonb('value').notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

// Same DDL as the schema above, for the tests and for a fresh database until migrations exist.
export const DOCUMENTS_DDL = `
CREATE TABLE IF NOT EXISTS documents (
  key text PRIMARY KEY,
  value jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
)`;
