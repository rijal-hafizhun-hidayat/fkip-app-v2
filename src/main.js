// import './assets/main.css'
import "./style.css";
import moment from "moment";
import axios from 'axios'
import {
    createApp
} from 'vue'
import {
    createPinia
} from 'pinia'

import App from './App.vue'
import router from './router'

axios.defaults.headers.common = {
    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
}
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true

moment.locale('id');

const app = createApp(App)

app.provide("moment", moment);
app.use(createPinia())
app.use(router)

app.mount('#app')