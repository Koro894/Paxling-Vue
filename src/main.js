import './css/main.css';
import './views/css_views/Main_views/Main_views.css'
import axios from 'axios';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createStore } from 'vuex';
import store from './store';



axios.interceptors.request.use(config => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



const app = createApp(App);

app.use(router);
app.use(store);

// При запуске приложения загрузите токен
store.dispatch('loadToken');

// Установка axios как глобального свойства (не рекомендуется, но можно использовать Composition API)
app.config.globalProperties.axios = axios;

app.mount('#app');
