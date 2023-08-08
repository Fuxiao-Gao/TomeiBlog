import axios from 'axios'
import store from '@/store'
import { getToken } from './auth'
import cache from '@/plugins/cache'
import { ElNotification,ElMessageBox, ElMessage, ElLoading } from 'element-plus'

export let isRelogin = { show: false };

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// create axios instance
const request = axios.create({
  baseURL: 'http://192.168.169.182:8080/', 
  timeout: 10000
})


//intercept the request and handle it before it being sent, specifically add token to it
request.interceptors.request.use(config => {
  // whether require token
  const isToken = (config.headers || {}).isToken === false
  // whether need to prevent the data from being resubmitted
  const isRepeatSubmit = (config.headers || {}).repeatSubmit === false
  console.log('isToken: ' + isToken)
  console.log(getToken())
  if (getToken() && !isToken) {
    console.log('adding token to the request')
    config.headers['Authorization'] = 'Bearer ' + getToken() // let every request carry token
  }
  // converts the params into an url query and aappend it to the original url
  if (config.method === 'get' && config.params) {
    let url = config.url + '?' + transParams(config.params);
    url = url.slice(0, -1);
    config.params = {};
    config.url = url;
  }
  console.log('config: ' + JSON.stringify(config))
  //post or put request
  if (!isRepeatSubmit && (config.method === 'post' || config.method === 'put')) {
    const requestObj = {
      url: config.url,
      data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
      time: new Date().getTime()
    }
    const sessionObj = cache.session.getJSON('sessionObj')
    if (sessionObj === undefined || sessionObj === null || sessionObj === '') {
      // if sessionObj is empty, then store the requestObj
      cache.session.setJSON('sessionObj', requestObj)
    } else {
      // if sessionObj is not empty, then compare the requestObj with sessionObj
      // if they are the same, then it is a repetive submission
      // if they are different, then update the sessionObj
      const s_url = sessionObj.url;                  // request url
      const s_data = sessionObj.data;                // request data
      const s_time = sessionObj.time;                // request time
      const interval = 1000;                         // time interval，anything lower than this is considered as repetive submission
      if (s_data === requestObj.data && requestObj.time - s_time < interval && s_url === requestObj.url) {
        const message = 'the data is processing, please don\'t resubmit';
        console.warn(`[${s_url}]: ` + message)
        return Promise.reject(new Error(message))
      } else {
        cache.session.setJSON('sessionObj', requestObj)
      }
    }
  }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})


//response interception
//display different error message corresponding to 404/401/500
request.interceptors.response.use(res => {
  console.log('response: ' + JSON.stringify(res.data))
  const code = res.data.code || 200;
  const msg = res.data.msg || errorCode['default'];
  // if the response type is blob or arraybuffer, then return the data directly
  if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
    return res.data
  }
  if (code === 401) {
    if (!isRelogin.show) {
      isRelogin.show = true;
      ElMessageBox.confirm('Your session is expired.', 'System Warning', { confirmButtonText: 'relogin', cancelButtonText: 'stay', type: 'warning' }).then(() => {
        // user chose to relogin
        isRelogin.show = false;
        // call the LogOut method in store/user.js
        store.dispatch('LogOut').then(() => {
          location.href = '/';
        })
      }).catch(() => {
        // user chose to stay
        isRelogin.show = false;
      });
    }
    return Promise.reject('your session is expired');
  } else if (code === 500) {
    ElMessage({ message: msg, type: 'error' })
    return Promise.reject(new Error(msg))
  } else if (code === 601) {
    ElMessage({ message: msg, type: 'warning' })
    return Promise.reject('error')
  } else if (code !== 200) {
    ElNotification.error({ title: msg })
    return Promise.reject('error')
  } else {
    // if the response is 200, then return the data
    console.log('response: ' + JSON.stringify(res.data))
    return res.data
  }
},
  error => {
    console.log('err' + error)
    let { message } = error;
    if (message == "Network Error") {
      message = "backend system connection exception";
    } else if (message.includes("timeout")) {
      message = "system interface request timeout";
    } else if (message.includes("Request failed with status code")) {
      message = "system interface" + message.substr(message.length - 3) + "error";
    }
    ElMessage({ message: message, type: 'error', duration: 5 * 1000 })
    return Promise.reject(error)
  }
)

/**
* handle params
* 
*/
export function transParams(params) {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName];
    var part = encodeURIComponent(propName) + "=";
    if (value !== null && value !== "" && typeof (value) !== "undefined") {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && value[key] !== "" && typeof (value[key]) !== 'undefined') {
            let params = propName + '[' + key + ']';
            var subPart = encodeURIComponent(params) + "=";
            result += subPart + encodeURIComponent(value[key]) + "&";
          }
        }
      } else {
        result += part + encodeURIComponent(value) + "&";
      }
    }
  }
  return result
}



export default request;