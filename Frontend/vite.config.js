import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    // Raise the warning threshold — our chunks are deliberately split
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Vendor: React ecosystem
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router')) {
            return 'react-vendor';
          }
          // Vendor: Framer Motion
          if (id.includes('node_modules/framer-motion')) {
            return 'framer-motion';
          }
          // Vendor: Icons
          if (id.includes('node_modules/react-icons')) {
            return 'icons';
          }
          // Vendor: misc (toast, etc.)
          if (id.includes('node_modules/')) {
            return 'vendor';
          }
          // Pages — each page gets its own chunk
          if (id.includes('src/pages/')) {
            const match = id.match(/src\/pages\/([^/]+)\.jsx/);
            if (match) return `page-${match[1].toLowerCase()}`;
          }
          // Dashboard components
          if (id.includes('src/components/dashboard/')) return 'dashboard-components';
          // Home section components
          if (id.includes('src/components/home/')) return 'home-components';
        },
      },
    },
  },
})