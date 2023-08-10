import request from '@/utils/request'

// list all saved posts
export function listSaved(query) {
  return request({
    url: '/system/saved/list',
    method: 'get',
    params: query
  })
}

// get saved post
export function getSaved(userId) {
  return request({
    url: '/system/saved/' + userId,
    method: 'get'
  })
}

// add saved
export function addSaved(data) {
  return request({
    url: '/system/saved',
    method: 'post',
    data: data
  })
}

// update saved
export function updateSaved(data) {
  return request({
    url: '/system/saved',
    method: 'put',
    data: data
  })
}

// delete saved
export function delSaved(userId) {
  return request({
    url: '/system/saved/' + userId,
    method: 'delete'
  })
}
