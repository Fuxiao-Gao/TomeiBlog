import request from '@/utils/request'

// 查询comments列表
export function listComments(query) {
  return request({
    url: '/system/comments/list',
    method: 'get',
    params: query
  })
}

// 查询comments详细
export function getComments(id) {
  return request({
    url: '/system/comments/' + id,
    method: 'get'
  })
}

// 新增comments
export function addComments(data) {
  return request({
    url: '/system/comments',
    method: 'post',
    data: data
  })
}

// 修改comments
export function updateComments(data) {
  return request({
    url: '/system/comments',
    method: 'put',
    data: data
  })
}

// 删除comments
export function delComments(id) {
  return request({
    url: '/system/comments/' + id,
    method: 'delete'
  })
}