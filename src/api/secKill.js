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

/* 删除一个活动 */
export function deleteActivity(activity_id) {
  return request({
    url: 'delete-activity?activity_type=4',
    method: 'post',
    data: activity_id
  })
}

// 开启
export function switchActivity(data) {
  return request({
    url: 'switch-activity?activity_type=4',
    method: 'post',
    data
  })
}

/* 获得订单报表 */
export function getMSOrderList(data) {
  return request({
    url: 'getMSOrderList?activity_type=4',
    method: 'get',
    params: data
  })
}

// 删除订单
export function delOrder(data) {
  return request({
    url: 'del-order?activity_type=4',
    method: 'post',
    data
  })
}

// 添加秒杀活动
export function addMiaoSha(data) {
  return request({
    url: 'addMiaoSha?activity_type=4',
    method: 'post',
    data
  })
}

// 添加活动素材
export function addMaterial(bodyPaser) {
  console.log(bodyPaser)
  return request({
    url: 'add-material?activity_type=4',
    method: 'post',
    data: bodyPaser
  })
}

/* 添加点亮图标 */
export function addLight(bodyPaser) {
  return request({
    url: 'add-light?activity_type=4',
    method: 'post',
    data: bodyPaser
  })
}

/* 添加推广红包 */
export function addRed(bodyPaser) {
  return request({
    url: 'add-red?activity_type=4',
    method: 'post',
    data: bodyPaser
  })
}

/* 进入编辑新增活动页 */
export function getActivityDetail(activity_id) {
  return request({
    url: 'getActivityDetail?activity_type=4',
    method: 'get',
    params: {
      activity_id
    }
  })
}

// 获取活动二维码
export function genQrcode(activity_id) {
  return request({
    url: 'get-qrcode?activity_type=4',
    method: 'get',
    params: {
      activity_id
    }
  })
}

/* 编辑活动素材页 */
export function detailMaterial(activity_id) {
  return request({
    url: 'detail-material?activity_type=4',
    method: 'get',
    params: activity_id
  })
}

/* 点亮图标详情 */
export function getLightDetail(activity_id) {
  return request({
    url: 'getLightDetail?activity_type=4',
    method: 'get',
    params: { activity_id }
  })
}

/* 红包活动详情 */
export function getRedDetail(activity_id) {
  return request({
    url: 'getRedDetail?activity_type=4',
    method: 'get',
    params: { activity_id }
  })
}
