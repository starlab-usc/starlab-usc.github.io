import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://starlab-usc.github.io',
  integrations: [react()],
  devToolbar: { enabled: false },
});
