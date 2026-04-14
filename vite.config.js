import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        contact: resolve(__dirname, 'contact.html'),
        gallery: resolve(__dirname, 'gallery.html'),
        products: resolve(__dirname, 'products.html'),
        mobile_index: resolve(__dirname, 'mobile_index.html'),
        mobile_about: resolve(__dirname, 'mobile_about.html'),
        mobile_contact: resolve(__dirname, 'mobile_contact.html'),
        mobile_gallery: resolve(__dirname, 'mobile_gallery.html'),
        mobile_products: resolve(__dirname, 'mobile_products.html'),
      },
    },
  },
});
