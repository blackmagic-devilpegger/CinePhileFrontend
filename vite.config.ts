import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue(),
  ],
  server: {
    port: 5173, // Hier wird der gewünschte Port festgelegt
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  envPrefix: 'VITE_', // Lädt alle Umgebungsvariablen mit "VITE_"-Prefix
});
