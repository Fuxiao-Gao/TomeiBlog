import { createStore } from 'vuex'
import user from './user'
import getters from './getters'

const store = createStore({
    modules: {
        user
    },
    getters
})

export default store
