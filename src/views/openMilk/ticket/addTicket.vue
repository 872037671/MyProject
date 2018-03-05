<template>
  <div class="setting">
    <el-card class="box-card">
      <el-form label-width="200px" label-position="left">
        <el-alert
          title="基础设置"
          type="info"
          style="margin: 30px 0;">
        </el-alert>

        <!--活动标题-->
        <el-form-item label="首页介绍语句">
          <el-input v-model.trim="submitData.title"></el-input>
        </el-form-item>

        <!--首页介绍图片-->
        <el-form-item label="首页介绍图片">
          <el-col :span="24" class="">
            <el-upload
              class="avatar-uploader"
              :action="upload_url"
              :headers="postHeaders"
              :show-file-list="false"
              :on-success="jieshaoSuccess">
              <img style="max-width: 100px" v-if="ShowImgUrl.intro_pic" :src="ShowImgUrl.intro_pic" class="avatar">
              <el-button style="display: block">上传</el-button>
            </el-upload>
          </el-col>
        </el-form-item>

        <!--活动详细介绍-->
        <el-form-item label="活动详细介绍">
          <el-input v-model="submitData.detail"></el-input>
        </el-form-item>

        <!--赠送条件达标赠送服务名称-->
        <el-form-item label="赠送条件达标赠送服务名称">
          <el-input v-model="submitData.service"></el-input>
        </el-form-item>

        <!--选择卡券-->
        <el-form-item label="选择卡券">
          <el-col :span="24">
            <div style="width: 80px; display: inline-block; margin: 5px 10px 0 0; position: relative" v-for="(item, index) in ShowTicket" :key="index">
              <img style="max-width:100%" :src="item" class="avatar">
            </div>
            <el-button style="display: block" @click="chooseTicket">选择卡券</el-button>
          </el-col>
        </el-form-item>

        <el-button style="margin: 0 auto 100px;display: block;" @click="save">保存</el-button>

      </el-form>
    </el-card>

    <UploadTicket @clickMoreChoose="getImg11" ref="isActivityJieshao"></UploadTicket>

  </div>
</template>

<script>
import { UploadUrl6 } from '@/utils/auth'
import { getToken } from '@/utils/auth'
import UploadTicket from '../../../components/UploadImg/ticket'
import { activityBaseSetting } from '@/api/openMilk'
import { getActivityDetail1 } from '@/api/openMilk'

export default {
  components: {
    UploadTicket
  },
  data() {
    return {
      postHeaders: {
        'X-Token': getToken()
      },
      upload_url: UploadUrl6,
      ShowImgUrl: {
        intro_pic: ''
      },
      ShowTicket: [],
      submitData: {
        title: '',
        intro_pic: '',
        detail: '',
        card_ids: '',
        service: ''
      }
    }
  },
  methods: {
    jieshaoSuccess(res, file) {
      this.ShowImgUrl.intro_pic = URL.createObjectURL(file.raw)
      this.submitData.intro_pic = res.data.save_url
    },
    chooseTicket() {
      this.$refs.isActivityJieshao.uploadImgModel()
    },
    getImg11(data) {
      this.ShowTicket = data
    },
    save() {
      const zancun_arr = this.submitData.card_ids.split(',')
      for (const val of this.ShowTicket) {
        zancun_arr.push(val.id)
      }
      this.submitData.card_ids = zancun_arr.join(',')
      if (this.submitData.title === '') {
        this.$message.error('请填写首页介绍语句！')
        return
      }
      if (this.submitData.intro_pic === '') {
        this.$message.error('请上传首页介绍图片')
        return
      }
      if (this.submitData.detail === '') {
        this.$message.error('请填写活动详细介绍！')
        return
      }
      if (this.submitData.card_ids === '') {
        this.$message.error('请上传卡券！')
        return
      }
      if (this.submitData.service === '') {
        this.$message.error('请填写赠送条件！')
        return
      }
      activityBaseSetting(this.submitData)
        .then((result) => {
          this.$router.push({ name: 'openMilklist', query: { activeName: 'first' }})
          this.getActivityData(this.$route.query.id)
        })
    },
    getActivityData(activity_id) {
      getActivityDetail1(activity_id)
        .then((result) => {
          this.submitData = result
          this.ShowImgUrl.intro_pic = result.intro_pic_prefix + result.intro_pic
          const card_arr = result.card_ids.split(',')
          for (const val of card_arr) {
            this.ShowTicket.push(result.intro_pic_prefix + val)
          }
        })
    }
  },
  mounted() {
    const activity_id = this.$route.query.id
    this.getActivityData(activity_id)
  }
}
</script>

<style>

</style>
