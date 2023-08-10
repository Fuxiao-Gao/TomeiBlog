import request from '@/utils/request'


export function listBlogs(query) {
  return request({
    url: '/system/blogs/list',
    method: 'get',
    params: query
  })
}


export function getBlogs(id) {
  return request({
    url: '/system/blogs/' + id,
    method: 'get'
  })
}


export function addBlogs(data) {
  return request({
    url: '/system/blogs',
    method: 'post',
    data: data
  })
}


export function updateBlogs(data) {
  return request({
    url: '/system/blogs',
    method: 'put',
    data: data
  })
}


export function delBlogs(id) {
  return request({
    url: '/system/blogs/' + id,
    method: 'delete'
  })
}

export function increLikeCount(id) {
  return request({
    url: '/system/blogs/increLikeCount/' + id,
    method: 'put'
  })
}

export function increSaveCount(id) {
  return request({
    url: '/system/blogs/increSaveCount/'+ id,
    method: 'put'
  })
}

export function increCommentCount(id) {
  return request({
    url: '/system/blogs/increCommentCount',
    method: 'put'
  })
}


