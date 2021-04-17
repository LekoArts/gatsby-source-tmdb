module.exports = {
  preset: `ts-jest`,
  verbose: true,
  globals: {
    "ts-jest": {
      diagnostics: {
        ignoreCodes: [2322],
      },
    },
  },
}
