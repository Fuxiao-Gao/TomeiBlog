import request from '@/utils/request'


export function listSaved(query) {
  return request({
    url: '/system/saved/list',
    method: 'get',
    params: query
  })
}


export function getSaved(id) {
  return request({
    url: '/system/saved/' + id,
    method: 'get'
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


export function delSaved(id) {
  return request({
    url: '/system/saved/' + id,
    method: 'delete'
  })
}
