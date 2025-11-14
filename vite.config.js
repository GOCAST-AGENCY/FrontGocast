import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Charger les variables d'environnement
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    server: {
      port: 3001,
      // Configuration pour gérer les routes SPA en développement
      historyApiFallback: true,
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:3000',
          changeOrigin: true
        },
        '/uploads': {
          target: env.VITE_API_URL || 'http://localhost:3000',
          changeOrigin: true
        }
      }
    },
    // Configuration pour le build
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      // Copier le fichier _redirects dans le build
      copyPublicDir: true
    }
  };
});

