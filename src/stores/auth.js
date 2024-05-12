import axios from 'axios';
import {
    defineStore
} from 'pinia'
import {
    ref
} from 'vue'

export const userAuthStore = defineStore('user', () => {
    const user = ref(null)
    const isLoggedIn = ref(false)

    async function setDataAuth(data) {
        user.value = await data
        isLoggedIn.value = true
    }

    async function getCurrentAuth() {
        axios.get('api/current-user')
            .then((res) => {
                user.value = res.data.data
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return {
        user,
        isLoggedIn,
        setDataAuth,
        getCurrentAuth
    }
})