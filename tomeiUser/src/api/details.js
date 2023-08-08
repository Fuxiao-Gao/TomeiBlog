import request from '@/utils/request'


export function listDetails(query) {
  return request({
    url: '/system/details/list',
    method: 'get',
    params: query
  })
}


export function getDetails(id) {
  return request({
    url: '/system/details/' + id,
    method: 'get'
  })
}


export function addDetails(data) {
  return request({
    url: '/system/details',
    method: 'post',
    data: data
  })
}


export function updateDetails(data) {
  return request({
    url: '/system/details',
    method: 'put',
    data: data
  })
}


export function delDetails(id) {
  return request({
    url: '/system/details/' + id,
    method: 'delete'
  })
}
