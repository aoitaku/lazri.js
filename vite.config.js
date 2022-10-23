import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'lib',
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'Lazri',
      fileName: (format) => `${ format === 'es' ? 'esm' : format }/lazri.js`,
    },
  },
})
