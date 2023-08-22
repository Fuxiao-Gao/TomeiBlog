import request from '@/utils/request'


export function listList(query) {
  return request({
    url: '/system/list/list',
    method: 'get',
    params: query
  })
}


export function getList(followerId) {
  return request({
    url: '/system/list/' + followerId,
    method: 'get'
  })
}


export function addList(data) {
  return request({
    url: '/system/list',
    method: 'post',
    data: data
  })
}


export function updateList(data) {
  return request({
    url: '/system/list',
    method: 'put',
    data: data
  })
}


export function delList(followerId) {
  return request({
    url: '/system/list/' + followerId,
    method: 'delete'
  })
}
