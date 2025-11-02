import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: [
      'baselhack.azu-dev.fr',
      'localhost',
      '.azu-dev.fr', // Allow all subdomains of azu-dev.fr
    ],
  },
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react/jsx-runtime', 'antd'],
    force: true,
  },
});
