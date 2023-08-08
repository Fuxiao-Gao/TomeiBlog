import request from '@/utils/request'

// 查询saved列表
export function listSaved(query) {
  return request({
    url: '/system/saved/list',
    method: 'get',
    params: query
  })
}

// 查询saved详细
export function getSaved(userId) {
  return request({
    url: '/system/saved/' + userId,
    method: 'get'
  })
}

// 新增saved
export function addSaved(data) {
  return request({
    url: '/system/saved',
    method: 'post',
    data: data
  })
}

// 修改saved
export function updateSaved(data) {
  return request({
    url: '/system/saved',
    method: 'put',
    data: data
  })
}

// 删除saved
export function delSaved(userId) {
  return request({
    url: '/system/saved/' + userId,
    method: 'delete'
  })
}
