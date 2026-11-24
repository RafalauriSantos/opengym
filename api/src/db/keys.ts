// Record keys in the document store. They replace the JSON file names the API used before
// (db.json, state-<id>.json, watch-<id>.json), and the user id is cleaned the same way.

const clean = (id: string) => id.replace(/[^a-zA-Z0-9_-]/g, '');

export const dbKey = (): string => 'db';
export const stateKey = (userId: string): string => `state:${clean(userId)}`;
export const watchKey = (userId: string): string => `watch:${clean(userId)}`;
