import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    // Map GEMINI_API_KEY to VITE_GEMINI_API_KEY for client access
    if (env.GEMINI_API_KEY && !env.VITE_GEMINI_API_KEY) {
      process.env.VITE_GEMINI_API_KEY = env.GEMINI_API_KEY;
    }
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      // Expose environment variables to client code
      // Variables prefixed with VITE_ will be available in import.meta.env
      envPrefix: 'VITE_',
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        outDir: 'dist',
        rollupOptions: {
          input: {
            index: path.resolve(__dirname, 'index.html'),
            guide: path.resolve(__dirname, 'guide.html'),
            privacy: path.resolve(__dirname, 'privacy.html'),
            terms: path.resolve(__dirname, 'terms.html')
          }
        }
      },
      publicDir: 'public'
    };
});
