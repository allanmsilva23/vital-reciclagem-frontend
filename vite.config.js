import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path'; 

export default defineConfig({
  plugins: [vue()],
  base: '/vital-reciclagem-frontend/', 
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), 
    },
  },
});