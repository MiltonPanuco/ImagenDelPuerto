import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import fs from 'fs';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());

    const useHttps = env.VITE_DEV_HTTPS === 'true';
    const sslCertPath = env.VITE_SSL_CERT;
    const sslKeyPath = env.VITE_SSL_KEY;

    let httpsConfig = false;

    if (useHttps && sslCertPath && sslKeyPath) {
        try {
            httpsConfig = {
                cert: fs.readFileSync(sslCertPath),
                key: fs.readFileSync(sslKeyPath),
            };
        } catch (e) {
            console.warn('⚠️  No se pudieron leer los certificados SSL. Usando HTTP en su lugar. ' + e.message);
            httpsConfig = false;
        }
    }

    return {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'resources/js'),
                '@components': path.resolve(__dirname, 'resources/js/components'),
                '@pages': path.resolve(__dirname, 'resources/js/pages'),
                '@styles': path.resolve(__dirname, 'resources/css'),
            },
        },
        plugins: [
            laravel({
                input: ['resources/css/app.css', 'resources/js/app.tsx'],
                ssr: 'resources/js/ssr.tsx',
                refresh: true,
            }),
            react(),
            tailwindcss(),
            wayfinder({
                formVariants: true,
            }),
        ],
        esbuild: {
            jsx: 'automatic',
        },
        server: {
            host: env.VITE_DEV_HOST || 'localhost',
            port: parseInt(env.VITE_DEV_PORT) || 5173,
            https: httpsConfig,
            cors: true,
            origin: env.VITE_DEV_ORIGIN || undefined,
        },
    };
});
