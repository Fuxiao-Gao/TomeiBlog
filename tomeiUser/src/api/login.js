import request from '@/utils/request'


// login method
export function login(username, password) {
    console.log('doing login in api/login.js')
    const data = {
        username,
        password,
    }
    // login method
    return request({
        url: '/system/login/login',
        headers: {
            isToken: false
        },
        method: 'post',
        data: data
    })
}

// register method
// export function register(data) {
//     return request({
//         url: '/register',
//         headers: {
//             isToken: false
//         },
//         method: 'post',
//         data: data
//     })
// }

// get user info
export function getInfo() {
    return request({
        url: '/system/login/getInfo',
        method: 'get'
    })
}

// log out user-security config
export function logout() {
    return request({
        url: '/logout',
        method: 'post'
    })
}

// the login flow
// User logs in.
// The application generates a session token.
// The session token is stored in Redis with a corresponding set of user data or session state.
// The token is sent to the client, often in a cookie.
// On subsequent requests, the token is sent back to the server(carried by the cookie).
// The server looks up the token in Redis to validate it and retrieve the session data.