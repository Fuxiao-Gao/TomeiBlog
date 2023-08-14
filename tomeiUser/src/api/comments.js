import request from '@/utils/request'


export function listComments(query) {
  return request({
    url: '/system/comments/list',
    method: 'get',
    params: query
  })
}


export function getComments(id) {
  return request({
    url: '/system/comments/' + id,
    method: 'get'
  })
}

export function increCommentsLike(data) {
  return request({
    url: '/system/comments/increLikeCount',
    method: 'put',
    data: data
  })
}

export function addComments(data) {
  return request({
    url: '/system/comments',
    method: 'post',
    data: data
  })
}


export function updateComments(data) {
  return request({
    url: '/system/comments',
    method: 'put',
    data: data
  })
}


export function delComments(id) {
  return request({
    url: '/system/comments/' + id,
    method: 'delete'
  })
}
