import request from '@/utils/request'

// 查询likes列表
export function listLikes(query) {
  return request({
    url: '/system/likes/list',
    method: 'get',
    params: query
  })
}

// 查询likes详细
export function getLikes(userId) {
  return request({
    url: '/system/likes/' + userId,
    method: 'get'
  })
}

// 新增likes
export function addLikes(data) {
  return request({
    url: '/system/likes',
    method: 'post',
    data: data
  })
}

// 修改likes
export function updateLikes(data) {
  return request({
    url: '/system/likes',
    method: 'put',
    data: data
  })
}

// 删除likes
export function delLikes(userId) {
  return request({
    url: '/system/likes/' + userId,
    method: 'delete'
  })
}
