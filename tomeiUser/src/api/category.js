import request from '@/utils/request'


export function listCategory(query) {
  return request({
    url: '/system/category/list',
    method: 'get',
    params: query
  })
}


export function getCategory(id) {
  return request({
    url: '/system/category/' + id,
    method: 'get'
  })
}


export function addCategory(data) {
  return request({
    url: '/system/category',
    method: 'post',
    data: data
  })
}


export function updateCategory(data) {
  return request({
    url: '/system/category',
    method: 'put',
    data: data
  })
}


export function delCategory(id) {
  return request({
    url: '/system/category/' + id,
    method: 'delete'
  })
}
