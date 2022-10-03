// Libraries
import { createApp } from 'vue';
import 'normalize.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './snippet.prism';

import App from './App.vue';
import { createPinia } from 'pinia';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.mount('#app');
