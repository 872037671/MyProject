import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import Cookies from 'js-cookie'
import router from '../router'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000, // 请求超时时间
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  transformRequest: [data => {
    // Do whatever you want to transform the data
    let ret = ''
    for (const it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
  }]
})

// request拦截器
service.interceptors.request.use(config => {
  // Do something before request is sent
  if (store.getters.token) {
    config.headers['X-Token'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => new Promise((resolve, reject) => {
    if (!response.data.code) {
      resolve(response.data.data)
    } else if (response.data.code === 1) {
      reject(response.data.msg)
    } else if (response.data.code === 6001) {
      Cookies.remove('Admin-Token')
      router.push({ path: '/login' })
      Message({ message: response.data.msg, type: 'error' })
      if (router.app._route.fullPath === '/login') {
        window.location.reload()
        return
      }
    } else if (response.data.code === 6002 || response.data.code === 6003) {
      Message({ message: response.data.msg, type: 'error' })
      router.push({ name: 'dashboard' })
    } else if (response.data.code === 6004) {
      Message({ message: response.data.msg, type: 'error' })
      router.push({ name: 'dashboard' })
    }
  }),
  /**
  * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
  * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
  */
  //  const res = response.data;
  //     if (res.code !== 20000) {
  //       Message({
  //         message: res.message,
  //         type: 'error',
  //         duration: 5 * 1000
  //       });
  //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
  //           confirmButtonText: '重新登录',
  //           cancelButtonText: '取消',
  //           type: 'warning'
  //         }).then(() => {
  //           store.dispatch('FedLogOut').then(() => {
  //             location.reload();// 为了重新实例化vue-router对象 避免bug
  //           });
  //         })
  //       }
  //       return Promise.reject('error');
  //     } else {
  //       return response.data;
  //     }
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  })

export default service
