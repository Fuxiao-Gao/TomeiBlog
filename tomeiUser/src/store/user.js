import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
    state: {
        token: getToken(),
        name: '',
        avatar: '',
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
    },
    actions: {
        // login
        Login({ commit }, userInfo) {
            const username = userInfo.username.trim()
            console.log('username in store: ' + username)
            const password = userInfo.password
            return new Promise((resolve, reject) => {
                login(username, password).then(res => {
                    console.log('setting token')
                    setToken(res.token)
                    commit('SET_TOKEN', res.token)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // get user info
        GetInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                getInfo().then(res => {
                    const user = res.user
                    const avatar = (user.avatar == "" || user.avatar == null) ? require("@/assets/tomei/tomei3.jpg") : process.env.VUE_APP_BASE_API + user.avatar;
                    // if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
                    //     commit('SET_ROLES', res.roles)
                    //     commit('SET_PERMISSIONS', res.permissions)
                    // } else {
                    //     commit('SET_ROLES', ['ROLE_DEFAULT'])
                    // }
                    commit('SET_NAME', user.userName)
                    commit('SET_AVATAR', avatar)
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // logout the system
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                console.log('doing logout in store/user.js')
                logout(state.token).then(() => {
                    commit('SET_TOKEN', '')
                    removeToken()
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // log out
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                removeToken()
                resolve()
            })
        }

    }
}

export default user
