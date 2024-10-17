/// <reference types='vitest' />
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { join, resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/memegle-pwa',
  server: {
    port: 3001,
    host: 'localhost',
  },
  preview: {
    port: 4300,
    host: 'localhost',
  },
  plugins: [
    react(),
    TanStackRouterVite({
      routesDirectory: join(__dirname, 'src/router/routes'),
      generatedRouteTree: join(__dirname, 'src/router/route-tree.gen.ts'),
      routeFileIgnorePrefix: '-',
      quoteStyle: 'single',
    }),
    nxViteTsPaths(),
    nxCopyAssetsPlugin([
      // {
      //   glob: 'translations.json',
      //   input: 'src/i18n/en',
      //   output: 'assets/i18n/en',
      // },
      // {
      //   glob: 'translations.json',
      //   input: 'src/i18n/es',
      //   output: 'assets/i18n/es',
      // },
    ]),
  ],
  resolve: {
    alias: {
      '@memegle/styles': resolve(
        __dirname,
        '../../libs/shared/styles/src/themes/default/memegle.scss'
      ),
    },
  },
  esbuild: {
    logLevel: 'verbose',
    treeShaking: true,
  },
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  build: {
    outDir: '../../dist/apps/memegle-pwa',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
