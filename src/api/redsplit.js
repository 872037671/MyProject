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
    url: 'delete-activity?activity_type=5',
    method: 'post',
    data: activity_id
  })
}

export function switchActivity(data) {
  return request({
    url: 'switch-activity?activity_type=5',
    method: 'post',
    data
  })
}

// 添加一个红包裂变活动
export function addLBHb(data) {
  return request({
    url: 'addLBHb?activity_type=5',
    method: 'post',
    data
  })
}

/* 进入编辑新增活动页 */
export function getActivityDetail(activity_id) {
  return request({
    url: 'getActivityDetail?activity_type=5',
    method: 'get',
    params: {
      activity_id
    }
  })
}

export function addMaterial(bodyPaser) {
  console.log(bodyPaser)
  return request({
    url: 'add-material?activity_type=5',
    method: 'post',
    data: bodyPaser
  })
}

// 获取活动二维码
export function genQrcode(activity_id) {
  return request({
    url: 'get-qrcode?activity_type=5',
    method: 'get',
    params: {
      activity_id
    }
  })
}

/* 编辑活动素材页 */
export function detailMaterial(activity_id) {
  return request({
    url: 'detail-material?activity_type=5',
    method: 'get',
    params: activity_id
  })
}

// 获取活动二维码
export function getLBOrderList(data) {
  return request({
    url: 'getLBOrderList?activity_type=5',
    method: 'get',
    params: data
  })
}

// 导出红包
export function genLBQrcode(data) {
  return request({
    url: 'genLBQrcode?activity_type=5',
    method: 'get',
    params: data
  })
}
