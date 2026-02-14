import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React core
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
          // React Router separate
          if (id.includes('node_modules/react-router')) {
            return 'router-vendor';
          }
          // Radix UI components (split into smaller chunks)
          if (id.includes('@radix-ui')) {
            const match = id.match(/@radix-ui\/react-([^/]+)/);
            if (match) {
              // Group related components
              const component = match[1];
              if (['checkbox', 'radio-group', 'label'].includes(component)) {
                return 'radix-forms';
              }
              if (['dialog', 'popover', 'tooltip'].includes(component)) {
                return 'radix-overlays';
              }
              return 'radix-core';
            }
          }
          // Lucide icons - tree-shake by splitting
          if (id.includes('lucide-react')) {
            return 'icons';
          }
        },
      },
    },
    // Target modern browsers only - enables smaller bundles
    target: 'esnext',
    // Minify with esbuild (faster) and enable tree-shaking
    minify: 'esbuild',
    // Reduce chunk size warnings threshold
    chunkSizeWarningLimit: 500,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Generate sourcemaps for debugging but don't include in production
    sourcemap: false,
  },
}));
