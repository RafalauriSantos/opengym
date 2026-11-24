import { PGlite } from '@electric-sql/pglite';
import { drizzle } from 'drizzle-orm/pglite';
import { beforeEach, describe, expect, it } from 'vitest';
import { createDocStore } from './docstore.js';
import { DOCUMENTS_DDL } from './schema.js';

async function freshStore() {
  const pg = new PGlite();
  await pg.exec(DOCUMENTS_DDL);
  return createDocStore(drizzle(pg));
}

describe('docstore', () => {
  let store: Awaited<ReturnType<typeof freshStore>>;
  beforeEach(async () => { store = await freshStore(); });

  it('returns undefined for a missing key', async () => {
    expect(await store.get('db')).toBeUndefined();
  });

  it('round-trips a nested JSON value', async () => {
    const value = { users: [{ id: 'u1', name: 'Rafa', meta: { tz: 'America/Sao_Paulo', pb: 1.5 } }] };
    await store.put('db', value);
    expect(await store.get('db')).toEqual(value);
  });

  it('overwrites an existing key', async () => {
    await store.put('db', { v: 1 });
    await store.put('db', { v: 2 });
    expect(await store.get('db')).toEqual({ v: 2 });
  });

  it('deletes a key', async () => {
    await store.put('db', { v: 1 });
    await store.delete('db');
    expect(await store.get('db')).toBeUndefined();
  });

  it('lists keys by prefix, treating % and _ as literal characters', async () => {
    await store.put('state:u1', 1);
    await store.put('state:u2', 2);
    await store.put('state_x', 3);   // "_" must not match any character
    await store.put('statez', 4);
    await store.put('100%:a', 5);
    await store.put('100x:b', 6);    // "%" must not match any string
    expect(await store.list('state:')).toEqual(['state:u1', 'state:u2']);
    expect(await store.list('state_')).toEqual(['state_x']);
    expect(await store.list('100%')).toEqual(['100%:a']);
  });
});
