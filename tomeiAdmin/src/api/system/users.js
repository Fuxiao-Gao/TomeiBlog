import request from '@/utils/request'

// get all the application users
export function listUsers(query) {
  return request({
    url: '/system/users/list',
    method: 'get',
    params: query
  })
}

// get the application user
export function getUsers(id) {
  return request({
    url: '/system/users/' + id,
    method: 'get'
  })
}

// add user
export function addUsers(data) {
  return request({
    url: '/system/users',
    method: 'post',
    data: data
  })
}

// update user
export function updateUsers(data) {
  return request({
    url: '/system/users',
    method: 'put',
    data: data
  })
}

// delete user
export function delUsers(id) {
  return request({
    url: '/system/users/' + id,
    method: 'delete'
  })
}
