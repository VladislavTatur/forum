import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/forum/',
  resolve: {
    alias: {
      '@assets': '/src/assets',
      '@enums': '/src/enums',
      '@features': '/src/features',
      '@pages': '/src/pages',
      '@shared': '/src/shared',
      '@store': '/src/store',
      '@styles': '/src/styles',
      '@types': '/src/types',
    },
  },
});
