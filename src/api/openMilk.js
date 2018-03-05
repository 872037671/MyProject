import request from '@/utils/request'

// 图片上传
export function uploadImg1(data) {
  return request({
    url: '/uploadImg1?activity_type=6',
    method: 'post',
    data
  })
}

// 活动

export function getBackendAllCardList(query) {
  return request({
    url: '/getBackendAllCardList?activity_type=6',
    method: 'get'
  })
}

export function activityBaseSetting(data) {
  return request({
    url: '/activityBaseSetting?activity_type=6',
    method: 'post',
    data
  })
}

export function getCommunityActivityList(page) {
  return request({
    url: '/getCommunityActivityList?activity_type=6',
    method: 'get',
    params: {
      page
    }
  })
}

// 获得活动信息
export function getActivityDetail1(activity_id) {
  return request({
    url: '/getActivityDetail1?activity_type=6',
    method: 'get',
    params: {
      activity_id
    }
  })
}

// 医院设置
export function hospitalSetting(data) {
  return request({
    url: '/hospitalSetting?activity_type=6',
    method: 'post',
    data
  })
}

// 获得医院
export function getHospitalList(data) {
  return request({
    url: '/getHospitalList?activity_type=6',
    method: 'get',
    params: {
      data
    }
  })
}

// 医院信息
export function getHospitalDetail(id) {
  return request({
    url: '/getHospitalDetail?activity_type=6',
    method: 'get',
    params: {
      id
    }
  })
}

// 催乳师设置
export function prolactinDivisionSetting(data) {
  return request({
    url: '/prolactinDivisionSetting?activity_type=6',
    method: 'post',
    data
  })
}

// 催乳师列表
export function getDivisionList(data) {
  return request({
    url: '/getDivisionList?activity_type=6',
    method: 'get',
    params: {
      data
    }
  })
}

// 催乳师信息
export function getDivisionDetail(id) {
  return request({
    url: '/getDivisionDetail?activity_type=6',
    method: 'get',
    params: {
      id
    }
  })
}

// 卡券设置
export function cardSetting(data) {
  return request({
    url: '/cardSetting?activity_type=6',
    method: 'post',
    data
  })
}

// 卡券列表
export function getBackendCardList(page) {
  return request({
    url: '/getBackendCardList?activity_type=6',
    method: 'get',
    params: {
      page
    }
  })
}

// 获得卡券信息
export function getCardDetail(id) {
  return request({
    url: '/getCardDetail?activity_type=6',
    method: 'get',
    params: {
      id
    }
  })
}

// 删除活动
export function deleteCommunityActivity(id) {
  return request({
    url: '/deleteCommunityActivity?activity_type=6',
    method: 'post',
    data: {
      id
    }
  })
}

// 删除卡券
export function deleteCard(id) {
  return request({
    url: '/deleteCard?activity_type=6',
    method: 'post',
    data: {
      id
    }
  })
}

// 删除催乳师
export function deleteDivision(id) {
  return request({
    url: '/deleteDivision?activity_type=6',
    method: 'post',
    data: {
      id
    }
  })
}

// 删除医院
export function deleteHospital(hospital_id) {
  return request({
    url: '/deleteHospital?activity_type=6',
    method: 'post',
    data: {
      hospital_id
    }
  })
}

// 医院列表 不带分页
export function getAllHospitalList() {
  return request({
    url: '/getAllHospitalList?activity_type=6',
    method: 'get'
  })
}

// 订单列表
export function getOrderList(data) {
  return request({
    url: '/getOrderList?activity_type=6',
    method: 'get',
    params: data
  })
}

// 订单详情
export function getOrderDetail(data) {
  return request({
    url: '/getOrderDetail?activity_type=6',
    method: 'get',
    params: data
  })
}
