import { createApp } from 'vue';

// Airbnb規則：外部套件往上放
// axios
import axios from 'axios';
import VueAxios from 'vue-axios';

// Airbnb規則：再執行本地檔案
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(router);
app.use(VueAxios, axios);
app.mount('#app');
