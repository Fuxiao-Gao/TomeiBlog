import request from '@/utils/request'

// 查询users列表
export function listUsers(query) {
  return request({
    url: '/system/users/list',
    method: 'get',
    params: query
  })
}

// 查询users详细
export function getUsers(id) {
  return request({
    url: '/system/users/' + id,
    method: 'get'
  })
}

// 新增users
export function addUsers(data) {
  return request({
    url: '/system/users',
    method: 'post',
    data: data
  })
}

// 修改users
export function updateUsers(data) {
  return request({
    url: '/system/users',
    method: 'put',
    data: data
  })
}

// 删除users
export function delUsers(id) {
  return request({
    url: '/system/users/' + id,
    method: 'delete'
  })
}
