import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    include: [`package/**/__tests__/*.ts`],
  },
})
