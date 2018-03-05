import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { constantRouterMap } from '@/router'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    commercial: '', // 举办方名称
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    },
    merchant_id: ''
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_MERCHANT_ID: (state, merchant_id) => {
      state.merchant_id = merchant_id
    },
    COMMERCIAL: (state, SET_TOKEN_data) => {
      state.commercial = SET_TOKEN_data
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          const result = response
          commit('SET_TOKEN', result.user_info.login_token)
          setToken(result.user_info.login_token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          console.log(response)
          commit('COMMERCIAL', response.user_info.company_name)
          for (const quanxian of response.auth) {
            switch (quanxian) {
              case 0:
                constantRouterMap[5].children[0].hidden = false
                break
              case 1:
                constantRouterMap[5].children[1].hidden = false
                break
              case 2:
                constantRouterMap[5].children[2].hidden = false
                break
              case 3:
                constantRouterMap[5].children[3].hidden = false
                break
              case 4:
                constantRouterMap[5].children[4].hidden = false
                break
              case 5:
                constantRouterMap[5].children[5].hidden = false
                break
              case 6:
                constantRouterMap[5].children[6].hidden = false
                break
            }
          }
          if (response.code) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error')
          }
          if (response.user_info.login_token) {
            response.roles = ['admin']
            response.roles = response.roles.concat(response.auth)
            commit('SET_MERCHANT_ID', response.user_info.merchant_id)
            commit('SET_ROLES', response.roles)
          }
          // commit('SET_ROLES', response)
          // const data = response.data
          /*
          commit('SET_ROLES', data.role)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          */
          resolve(response)
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRole({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.role)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve()
        })
      })
    }
  }
}

export default user
