import { defineConfig } from 'vitest/config';

// Only the TypeScript tests. The JavaScript suite in test/ keeps running with node --test.
export default defineConfig({
  test: { include: ['src/**/*.test.ts'] },
});
