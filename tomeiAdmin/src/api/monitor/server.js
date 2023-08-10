import request from '@/utils/request'

// get server info
export function getServer() {
  return request({
    url: '/monitor/server',
    method: 'get'
  })
}