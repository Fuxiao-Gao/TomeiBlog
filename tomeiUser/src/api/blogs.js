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

// add to both blog and the blog details
export function addAll(data) {
  return request({
    url: '/system/blogs/addAll',
    method: 'post',
    data: data
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

export function increLikeCount(data) {
  return request({
    url: '/system/blogs/increLikeCount',
    method: 'put',
    data: data
  })
}

export function increSaveCount(data) {
  return request({
    url: '/system/blogs/increSaveCount',
    method: 'put',
    data: data
  })
}

export function increCommentCount(id) {
  return request({
    url: '/system/blogs/increCommentCount',
    method: 'put'
  })
}


