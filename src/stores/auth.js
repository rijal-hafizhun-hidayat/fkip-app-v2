import {
    defineStore
} from 'pinia'
import {
    reactive
} from 'vue'

export const userAuthStore = defineStore('auth', () => {
    const user = reactive({
        name: null,
        token: null
    })

    return {
        user
    }
})