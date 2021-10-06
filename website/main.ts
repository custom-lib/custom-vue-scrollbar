import Stats from 'stats.js';
import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import CustomScrollbar from '../src/index.vue';
import App from './App.vue';
import Box from './Box.vue';

const app = createApp(App);
app.component(CustomScrollbar.name, CustomScrollbar);
app.component(Box.name, Box);

const i18n = createI18n({
    locale: navigator.language.includes('zh') ? 'zh' : 'en',
    fallbackLocale: 'en'
});
app.use(i18n);

app.mount('#app');

declare module 'vue' {
    export interface GlobalComponents {
        CustomScrollbar: typeof CustomScrollbar;
        Box: typeof Box;
    }
}


const stats = new Stats();
stats.showPanel(0);
document.body.appendChild( stats.dom );

function animate() {
	stats.begin();
	stats.end();
	requestAnimationFrame( animate );
}

requestAnimationFrame( animate );   