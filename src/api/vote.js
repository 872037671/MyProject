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

export function addVoting(data) {
  return request({
    url: 'add-voting?activity_type=3',
    method: 'post',
    data
  })
}

/* 删除一个投票参赛用户 */
export function deleteTpUser(activity_id) {
  return request({
    url: 'deleteTpUser?activity_type=3',
    method: 'post',
    data: activity_id
  })
}

/* 参与投票的选手列表 */
export function getTPList(data) {
  return request({
    url: 'getTPList?activity_type=3',
    method: 'get',
    params: data
  })
}

/* 删除一个活动 */
export function deleteActivity(activity_id) {
  return request({
    url: 'delete-activity?activity_type=3',
    method: 'post',
    data: activity_id
  })
}

/* 投票活动扩展设置 */
export function setVotingExtra(data) {
  return request({
    url: 'set-voting-extra?activity_type=3',
    method: 'post',
    data
  })
}

/* 进入编辑新增活动页 */
export function getActivityDetail(activity_id) {
  return request({
    url: 'getActivityDetail?activity_type=3',
    method: 'get',
    params: {
      activity_id
    }
  })
}

/* 获得投票活动扩展信息 */
export function votingExt(activity_id) {
  return request({
    url: 'voting-ext?activity_type=3',
    method: 'get',
    params: {
      activity_id
    }
  })
}

// 客户详情
export function getTpDetail(data) {
  return request({
    url: 'getTpDetail?activity_type=3',
    method: 'get',
    params: data
  })
}

// 保存客户详情设置
export function saveTpDetail(data) {
  return request({
    url: 'saveTpDetail?activity_type=3',
    method: 'post',
    data
  })
}

// 审核投票活动
export function checkToupiao(data) {
  return request({
    url: 'check-toupiao?activity_type=3',
    method: 'post',
    data
  })
}

// 开关
export function switchActivity(data) {
  return request({
    url: 'switch-activity?activity_type=3',
    method: 'post',
    data
  })
}
