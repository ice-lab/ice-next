const { defineConfig } = require('@midwayjs/hooks');

module.exports = defineConfig({
  source: './src/api',
  build: {
    outDir: './dist',
  },
});
