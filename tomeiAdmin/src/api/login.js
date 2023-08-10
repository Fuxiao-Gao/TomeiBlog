import request from '@/utils/request'

// log in method
export function login(username, password, code, uuid) {
  const data = {
    username,
    password,
    code,
    uuid
  }
  return request({
    url: '/login',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// register method
export function register(data) {
  return request({
    url: '/register',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// get user info
export function getInfo() {
  return request({
    url: '/getInfo',
    method: 'get'
  })
}

// log out method
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

// get code image
export function getCodeImg() {
  return request({
    url: '/captchaImage',
    headers: {
      isToken: false
    },
    method: 'get',
    timeout: 20000
  })
}