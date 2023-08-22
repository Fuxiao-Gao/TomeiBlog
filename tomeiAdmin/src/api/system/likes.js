import request from '@/utils/request'


export function listLikes(query) {
  return request({
    url: '/system/likes/list',
    method: 'get',
    params: query
  })
}


export function getLikes(id) {
  return request({
    url: '/system/likes/' + id,
    method: 'get'
  })
}


export function addLikes(data) {
  return request({
    url: '/system/likes',
    method: 'post',
    data: data
  })
}


export function updateLikes(data) {
  return request({
    url: '/system/likes',
    method: 'put',
    data: data
  })
}


export function delLikes(id) {
  return request({
    url: '/system/likes/' + id,
    method: 'delete'
  })
}
