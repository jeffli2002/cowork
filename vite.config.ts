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
            terms: path.resolve(__dirname, 'terms.html'),
            // Language-specific pages
            'en/index': path.resolve(__dirname, 'en/index.html'),
            'en/guide': path.resolve(__dirname, 'en/guide.html'),
            'en/privacy': path.resolve(__dirname, 'en/privacy.html'),
            'en/terms': path.resolve(__dirname, 'en/terms.html'),
            'zh/index': path.resolve(__dirname, 'zh/index.html'),
            'zh/guide': path.resolve(__dirname, 'zh/guide.html'),
            'zh/privacy': path.resolve(__dirname, 'zh/privacy.html'),
            'zh/terms': path.resolve(__dirname, 'zh/terms.html'),
            'ja/index': path.resolve(__dirname, 'ja/index.html'),
            'ja/guide': path.resolve(__dirname, 'ja/guide.html'),
            'ja/privacy': path.resolve(__dirname, 'ja/privacy.html'),
            'ja/terms': path.resolve(__dirname, 'ja/terms.html'),
            'es/index': path.resolve(__dirname, 'es/index.html'),
            'es/guide': path.resolve(__dirname, 'es/guide.html'),
            'es/privacy': path.resolve(__dirname, 'es/privacy.html'),
            'es/terms': path.resolve(__dirname, 'es/terms.html'),
            'de/index': path.resolve(__dirname, 'de/index.html'),
            'de/guide': path.resolve(__dirname, 'de/guide.html'),
            'de/privacy': path.resolve(__dirname, 'de/privacy.html'),
            'de/terms': path.resolve(__dirname, 'de/terms.html'),
            'fr/index': path.resolve(__dirname, 'fr/index.html'),
            'fr/guide': path.resolve(__dirname, 'fr/guide.html'),
            'fr/privacy': path.resolve(__dirname, 'fr/privacy.html'),
            'fr/terms': path.resolve(__dirname, 'fr/terms.html')
          }
        }
      },
      publicDir: 'public'
    };
});
