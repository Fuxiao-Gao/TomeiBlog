import request from '@/utils/request'

// list all the user details
export function listDetails(query) {
  return request({
    url: '/system/details/list',
    method: 'get',
    params: query
  })
}

// get the user details
export function getDetails(id) {
  return request({
    url: '/system/details/' + id,
    method: 'get'
  })
}

// add details
export function addDetails(data) {
  return request({
    url: '/system/details',
    method: 'post',
    data: data
  })
}

// update details
export function updateDetails(data) {
  return request({
    url: '/system/details',
    method: 'put',
    data: data
  })
}

// delete details
export function delDetails(id) {
  return request({
    url: '/system/details/' + id,
    method: 'delete'
  })
}
