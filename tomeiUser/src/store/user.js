import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
    state: {
        token: getToken(),
        name: '',
        id: null,
        avatar: '',
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_ID: (state, id) => {
            state.id = id
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
    },
    actions: {
        // login
        Login({ commit }, userInfo) {
            const username = userInfo.username.trim()
            const password = userInfo.password
            return new Promise((resolve, reject) => {
                login(username, password).then(res => {
                    setToken(res.appUser.token)
                    commit('SET_TOKEN', res.appUser.token)
                    commit('SET_NAME', res.appUser.username)
                    //console.log("this user is" + JSON.stringify(res))
                    //console.log("this user id is " + res.appUser.id)
                    commit('SET_ID', res.appUser.id)
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
                    console.log(res.user)
                    const avatar = (user.profilePic == "" || user.avatar == null) ? require("@/assets/tomei/tomei3.jpg") : process.env.VUE_APP_BASE_API + user.avatar;
                    commit('SET_NAME', user.username)
                    console.log("this userid is"+ user.id)
                    commit('SET_ID', user.id)
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
