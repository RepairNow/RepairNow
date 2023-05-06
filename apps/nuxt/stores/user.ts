import { defineStore } from "pinia";

interface User {

}

export const useUserStore = defineStore('user', () => {
    const user = ref<User>({
        id: "fefefe"
    })

    async function signin() {
        console.log('signin')
    }

    return { user, signin }
})
