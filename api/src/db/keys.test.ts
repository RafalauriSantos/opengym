import { describe, expect, it } from 'vitest';
import { dbKey, stateKey, watchKey } from './keys.js';

describe('storage keys', () => {
  it('uses one key for the main database record', () => {
    expect(dbKey()).toBe('db');
  });

  it('keeps letters, digits, underscore and dash of the user id', () => {
    expect(stateKey('abc-123_X')).toBe('state:abc-123_X');
    expect(watchKey('abc-123_X')).toBe('watch:abc-123_X');
  });

  it('removes every other character, as the JSON file names did', () => {
    expect(stateKey('../../etc/passwd')).toBe('state:etcpasswd');
    expect(watchKey('a b.c')).toBe('watch:abc');
  });
});
