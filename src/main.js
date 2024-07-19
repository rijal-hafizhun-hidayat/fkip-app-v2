// import './assets/main.css'
import "./style.css";
import moment from "moment";
import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import {
    createApp
} from 'vue'
import {
    createPinia
} from 'pinia'

import App from './App.vue'
import router from './router'

axios.defaults.baseURL = 'http://localhost:3000/api';
axios.defaults.withCredentials = true

moment.locale('id');

const app = createApp(App)

app.provide("moment", moment);
app.provide("swal", Swal)
app.use(createPinia())
app.use(router)

app.mount('#app')