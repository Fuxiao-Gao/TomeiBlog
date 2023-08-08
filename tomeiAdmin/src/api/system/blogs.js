import request from '@/utils/request'

// 查询blogs列表
export function listBlogs(query) {
  return request({
    url: '/system/blogs/list',
    method: 'get',
    params: query
  })
}

// 查询blogs详细
export function getBlogs(id) {
  return request({
    url: '/system/blogs/' + id,
    method: 'get'
  })
}

// 新增blogs
export function addBlogs(data) {
  return request({
    url: '/system/blogs',
    method: 'post',
    data: data
  })
}

// 修改blogs
export function updateBlogs(data) {
  return request({
    url: '/system/blogs',
    method: 'put',
    data: data
  })
}

// 删除blogs
export function delBlogs(id) {
  return request({
    url: '/system/blogs/' + id,
    method: 'delete'
  })
}
