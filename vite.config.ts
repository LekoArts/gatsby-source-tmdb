/// <reference types="vitest" />

import { defineConfig } from "vite"

export default defineConfig({
  test: {
    include: [`**/__tests__/*.ts`],
  },
})
