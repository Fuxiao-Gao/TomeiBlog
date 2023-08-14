import request from '@/utils/request'


export function listLikes(query) {
  return request({
    url: '/system/likes/list',
    method: 'get',
    params: query
  })
}


export function getLikes(userId) {
  return request({
    url: '/system/likes/' + userId,
    method: 'get'
  })
}

export function checkLikes(query) {
  return request({
    url: '/system/likes/check',
    method: 'get',
    data: query
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


export function delLikes(userId) {
  return request({
    url: '/system/likes/' + userId,
    method: 'delete'
  })
}
