import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export const UploadUrl6 = 'http://activity.lyfz.net/index.php/api/uploadImg1'

export const UploadUrl = 'http://activity.lyfz.net/index.php/api/upload-img'
// export const UploadUrl = 'http://wxyx.com/index.php/api/upload-img'
