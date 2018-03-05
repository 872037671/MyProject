import request from '@/utils/request'

export function getMerchantInfo() {
  return request({
    url: 'getMerchantInfo',
    method: 'get'
  })
}

export function setMerchantSetting(data) {
  return request({
    url: 'setMerchantSetting',
    method: 'post',
    data
  })
}
