import request from '@/utils/request'


export function listList(query) {
  return request({
    url: '/system/list/list',
    method: 'get',
    params: query
  })
}

// get list
export function getList(followerId) {
  return request({
    url: '/system/list/' + followerId,
    method: 'get'
  })
}

// add list
export function addList(data) {
  return request({
    url: '/system/list',
    method: 'post',
    data: data
  })
}

// update list
export function updateList(data) {
  return request({
    url: '/system/list',
    method: 'put',
    data: data
  })
}

// delete list
export function delList(followerId) {
  return request({
    url: '/system/list/' + followerId,
    method: 'delete'
  })
}
