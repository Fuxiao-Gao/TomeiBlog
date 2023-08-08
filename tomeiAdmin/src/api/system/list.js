import request from '@/utils/request'

// 查询list列表
export function listList(query) {
  return request({
    url: '/system/list/list',
    method: 'get',
    params: query
  })
}

// 查询list详细
export function getList(followerId) {
  return request({
    url: '/system/list/' + followerId,
    method: 'get'
  })
}

// 新增list
export function addList(data) {
  return request({
    url: '/system/list',
    method: 'post',
    data: data
  })
}

// 修改list
export function updateList(data) {
  return request({
    url: '/system/list',
    method: 'put',
    data: data
  })
}

// 删除list
export function delList(followerId) {
  return request({
    url: '/system/list/' + followerId,
    method: 'delete'
  })
}
