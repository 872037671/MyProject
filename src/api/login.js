import request from '@/utils/request'

export function loginByUsername(phone_no, password) {
  const data = {
    phone_no,
    password
  }
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  /* return new Promise((resolve, reject) => {
     测试代码。不要提交
    resolve({
      data: {
        role: ['admin'],
        token: 'admin',
        introduction: '我是超级管理员',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Super Admin'
      }
    })
  })*/
  return request({
    url: '/getUserInfo',
    method: 'get',
    params: { token }
  })
}

