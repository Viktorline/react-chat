import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      app: path.resolve(__dirname, 'src/app'),
      pages: path.resolve(__dirname, 'src/pages'),
      shared: path.resolve(__dirname, 'src/shared'),
      hooks: path.resolve(__dirname, 'src/hooks'),
      entities: path.resolve(__dirname, 'src/entities'),
      features: path.resolve(__dirname, 'src/features'),
      widgets: path.resolve(__dirname, './src/widgets'),
    },
  },
});
