import vue from '@vitejs/plugin-vue';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue({ script: { refSugar: true } })],
    build: {
        target: 'es2015',
        lib: {
            entry: 'src/index.vue',
            fileName: () => 'index.js',
            formats: ['es'],
        },
        rollupOptions: {
            plugins: [visualizer()],
            external: ['vue', 'lodash-es'],
        },
    },
    optimizeDeps: {
        exclude: ['/public']
    }
});
