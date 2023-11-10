import {defineConfig} from 'vite';
import {quiltPackage} from '@quilted/vite/package';

export default defineConfig({
  optimizeDeps: {
    exclude: ['@lemonmade/remote-ui'],
  },
  plugins: [quiltPackage()],
});
