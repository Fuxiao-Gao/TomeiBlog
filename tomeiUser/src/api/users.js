import request from '@/utils/request'


export function listUsers(query) {
  return request({
    url: '/system/users/list',
    method: 'get',
    params: query
  })
}


export function getUsers(id) {
  return request({
    url: '/system/users/' + id,
    method: 'get'
  })
}

export function getUserName(id) {
  return request({
    url: '/system/users/username/' + id,
    method: 'get'
  })
}


export function addUsers(data) {
  return request({
    url: '/system/users',
    method: 'post',
    data: data
  })
}


export function updateUsers(data) {
  return request({
    url: '/system/users',
    method: 'put',
    data: data
  })
}


export function delUsers(id) {
  return request({
    url: '/system/users/' + id,
    method: 'delete'
  })
}
