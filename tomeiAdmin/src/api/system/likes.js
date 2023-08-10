import request from '@/utils/request'

// list all the likes
export function listLikes(query) {
  return request({
    url: '/system/likes/list',
    method: 'get',
    params: query
  })
}

// get likes details
export function getLikes(userId) {
  return request({
    url: '/system/likes/' + userId,
    method: 'get'
  })
}

// add likes
export function addLikes(data) {
  return request({
    url: '/system/likes',
    method: 'post',
    data: data
  })
}

// update likes
export function updateLikes(data) {
  return request({
    url: '/system/likes',
    method: 'put',
    data: data
  })
}

// delete likes
export function delLikes(userId) {
  return request({
    url: '/system/likes/' + userId,
    method: 'delete'
  })
}
