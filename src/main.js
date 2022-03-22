import { createApp } from 'vue';

// Airbnb規則：外部套件往上放
// axios
import axios from 'axios';
import VueAxios from 'vue-axios';
import emitter from '@/script/mitt';
import VueLoading from 'vue-loading-overlay';
import CKEditor from '@ckeditor/ckeditor5-vue';
import 'vue-loading-overlay/dist/vue-loading.css';
import VCalendar from 'v-calendar';
import 'v-calendar/dist/style.css';
import PageLoading from '@/components/PageLoading.vue';
import Pagination from '@/components/PaginationNav.vue';

// Airbnb規則：再執行本地檔案
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.config.globalProperties.$emitter = emitter;

app.use(router);
app.use(VueAxios, axios);
app.use(CKEditor);
app.use(VueLoading);
app.use(VCalendar, {});
app.component('VueLoading', VueLoading);
app.component('PageLoading', PageLoading);
app.component('PaginationNav', Pagination);
app.mount('#app');
