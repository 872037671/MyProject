import request from '@/utils/request'

/* 获取所有团购活动列表 */
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

// 补款
export function extraMoney(data) {
  return request({
    url: '/extra-money?activity_type=2',
    method: 'post',
    data
  })
}

export function addBargain(data) {
  return request({
    url: 'add-bargain?activity_type=2',
    method: 'post',
    data
  })
}

export function addMaterial(bodyPaser) {
  console.log(bodyPaser)
  return request({
    url: 'add-material?activity_type=2',
    method: 'post',
    data: bodyPaser
  })
}

export function groupOrder(bodyPaser) {
  return request({
    url: 'group-order?activity_type=2',
    method: 'post',
    data: bodyPaser
  })
}

/* 获得团购订单列表 */
export function getPurchaseOrder(data) {
  return request({
    url: 'getPurchaseOrderList?activity_type=2',
    method: 'get',
    params: data
  })
}

export function uploadedPics() {
  return request({
    url: 'uploaded-pics?activity_type=2',
    method: 'get'
  })
}

// 删除图片
export function deleteImg(data) {
  console.log(data)
  return request({
    url: 'delete-img?activity_type=2',
    method: 'post',
    data
  })
}

// 获取已上传的音乐列表
export function uploadedMusic() {
  return request({
    url: 'uploaded-music?activity_type=2',
    method: 'get'
  })
}

// 获取活动二维码
export function genQrcode(activity_id) {
  return request({
    url: 'get-qrcode?activity_type=2',
    method: 'get',
    params: {
      activity_id
    }
  })
}

/* 保存点亮图标 */
export function addLight(bodyPaser) {
  return request({
    url: 'add-light?activity_type=2',
    method: 'post',
    data: bodyPaser
  })
}

/* 分享推广红包 */
export function addRed(bodyPaser) {
  return request({
    url: 'add-red?activity_type=2',
    method: 'post',
    data: bodyPaser
  })
}

/* 删除一个活动 */
export function deleteActivity(activity_id) {
  return request({
    url: 'delete-activity?activity_type=2',
    method: 'post',
    data: activity_id
  })
}

/* 获得订单报表 */
export function getGroupOrderLists(data) {
  return request({
    url: 'getBargainOrderList?activity_type=2',
    method: 'get',
    params: data
  })
}

// 删除订单
export function delOrder(data) {
  return request({
    url: 'del-order?activity_type=2',
    method: 'post',
    data
  })
}

/* 进入编辑新增活动页 */
export function getActivityDetail(activity_id) {
  return request({
    url: 'getActivityDetail?activity_type=2',
    method: 'get',
    params: {
      activity_id
    }
  })
}

/* 编辑活动素材页 */
export function detailMaterial(activity_id) {
  return request({
    url: 'detail-material?activity_type=2',
    method: 'get',
    params: activity_id
  })
}

/* 点亮图标详情 */
export function getLightDetail(activity_id) {
  return request({
    url: 'getLightDetail?activity_type=2',
    method: 'get',
    params: { activity_id }
  })
}

/* 红包活动详情 */
export function getRedDetail(activity_id) {
  return request({
    url: 'getRedDetail?activity_type=2',
    method: 'get',
    params: { activity_id }
  })
}

export function switchActivity(data) {
  return request({
    url: 'switch-activity?activity_type=2',
    method: 'post',
    data
  })
}

// 客户详情
export function getCustomerDetail(data) {
  return request({
    url: 'getCustomerDetail?activity_type=2',
    method: 'get',
    params: data
  })
}

// 保存客户详情设置
export function setOrderDetail(data) {
  return request({
    url: 'setOrderDetail?activity_type=2',
    method: 'post',
    data
  })
}
