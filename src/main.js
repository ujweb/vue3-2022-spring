import { createApp } from 'vue';

// Airbnb規則：外部套件往上放
// axios
import axios from 'axios';
import VueAxios from 'vue-axios';
import emitter from '@/script/mitt';
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Pagination from '@/components/PaginationNav.vue';

// Airbnb規則：再執行本地檔案
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.config.globalProperties.$emitter = emitter;

app.use(router);
app.use(VueAxios, axios);
app.use(VueLoading);
app.component('VueLoading', VueLoading);
app.component('PaginationNav', Pagination);
app.mount('#app');
