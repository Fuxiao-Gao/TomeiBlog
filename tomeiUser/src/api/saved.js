import request from '@/utils/request'


export function listSaved(query) {
  return request({
    url: '/system/saved/list',
    method: 'get',
    params: query
  })
}


export function getSaved(userId) {
  return request({
    url: '/system/saved/' + userId,
    method: 'get'
  })
}

export function checkSaved(data) {
  return request({
    url: '/system/saved/check',
    method: 'post',
    data: data
  })
}

export function addSaved(data) {
  return request({
    url: '/system/saved',
    method: 'post',
    data: data
  })
}


export function updateSaved(data) {
  return request({
    url: '/system/saved',
    method: 'put',
    data: data
  })
}


export function delSaved(userId) {
  return request({
    url: '/system/saved/' + userId,
    method: 'delete'
  })
}
