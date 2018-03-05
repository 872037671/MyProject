import request from '@/utils/request'

export function addGroup(query) {
  return request({
    url: '/add-group?activity_type=1',
    method: 'post',
    data: query
  })
}

// 补款
export function extraMoney(data) {
  return request({
    url: '/extra-money?activity_type=1',
    method: 'post',
    data
  })
}

// 添加虚拟人数
export function pingAddVr(data) {
  return request({
    url: '/ping-add-vr?activity_type=1',
    method: 'post',
    data
  })
}

// 发红包
export function shareHongbao() {
  return request({
    url: '/share-hongbao?activity_type=1',
    method: 'get'
  })
}

export function activityList(activity_type, page) {
  return request({
    url: 'activity-list',
    method: 'get',
    params: {
      activity_type,
      page
    }
  })
}

// 获取活动二维码
export function genQrcode(activity_id) {
  return request({
    url: 'get-qrcode?activity_type=1',
    method: 'get',
    params: {
      activity_id
    }
  })
}

export function addMaterial(bodyPaser) {
  return request({
    url: 'add-material?activity_type=1',
    method: 'post',
    data: bodyPaser
  })
}

export function groupOrder(bodyPaser) {
  return request({
    url: 'group-order?activity_type=1',
    method: 'post',
    data: bodyPaser
  })
}

/* 保存点亮图标 */
export function addLight(bodyPaser) {
  return request({
    url: 'add-light?activity_type=1',
    method: 'post',
    data: bodyPaser
  })
}

/* 分享推广红包 */
export function addRed(bodyPaser) {
  return request({
    url: 'add-red?activity_type=1',
    method: 'post',
    data: bodyPaser
  })
}

/* 删除一个活动 */
export function deleteActivity(activity_id) {
  return request({
    url: 'delete-activity?activity_type=1',
    method: 'post',
    data: activity_id
  })
}

/* 获得订单报表 */
export function getGroupOrderLists(data) {
  return request({
    url: 'getGroupOrderList?activity_type=1',
    method: 'get',
    params: data
  })
}

export function delOrder(data) {
  return request({
    url: 'del-order?activity_type=1',
    method: 'post',
    data
  })
}

/* 进入编辑新增活动页 */
export function getActivityDetail(activity_id) {
  return request({
    url: 'getActivityDetail?activity_type=1',
    method: 'get',
    params: {
      activity_id
    }
  })
}

/* 编辑活动素材页 */
export function detailMaterial(activity_id) {
  return request({
    url: 'detail-material?activity_type=1',
    method: 'get',
    params: activity_id
  })
}

/* 点亮图标详情 */
export function getLightDetail(activity_id) {
  console.log(activity_id)
  return request({
    url: 'getLightDetail?activity_type=1',
    method: 'get',
    params: { activity_id }
  })
}

/* 红包活动详情 */
export function getRedDetail(activity_id) {
  return request({
    url: 'getRedDetail?activity_type=1',
    method: 'get',
    params: { activity_id }
  })
}

export function switchActivity(data) {
  return request({
    url: 'switch-activity?activity_type=1',
    method: 'post',
    data
  })
}

// 退款
export function refund(data) {
  return request({
    url: 'refund?activity_type=1',
    method: 'post',
    data
  })
}

// 客户详情
export function getCustomerDetail(data) {
  return request({
    url: 'getCustomerDetail?activity_type=1',
    method: 'get',
    params: data
  })
}

// 保存客户详情设置
export function setOrderDetail(data) {
  return request({
    url: 'setOrderDetail?activity_type=1',
    method: 'post',
    data
  })
}
