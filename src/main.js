// import './assets/main.css'
import "./style.css";
import 'vue-multiselect/dist/vue-multiselect.css';
import '../node_modules/nprogress/nprogress.css'
import moment from "moment";
import axios from 'axios'
import Swal from 'sweetalert2'
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

//interceptor token
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    console.log(error)
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

moment.locale('id');

const app = createApp(App)

app.provide("moment", moment);
app.provide("swal", Swal)
app.use(createPinia())
app.use(router)

app.mount('#app')