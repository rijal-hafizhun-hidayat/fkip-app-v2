// import './assets/main.css'
import "./style.css";
import axios from 'axios'
import {
    createApp
} from 'vue'
import {
    createPinia
} from 'pinia'

import App from './App.vue'
import router from './router'

axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')