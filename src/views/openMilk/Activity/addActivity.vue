<template>
  <div class="setting">
    <el-main>
      <el-button type="info" @click="backUp" style="margin: 20px 0">返回活动列表</el-button>
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
          <el-form-item label="服务名称">
            <el-input v-model="submitData.service"></el-input>
          </el-form-item>

          <!--选择卡券-->
          <el-form-item label="选择卡券">
            <el-col :span="24">
              <div>
                <el-button style="" @click="chooseTicket">选择卡券</el-button>
                <el-button style="" @click="del_show = !del_show">删除</el-button>
              </div>
              <div style="width: 80px; display: inline-block; margin: 5px 10px 0 0; position: relative" v-for="(item, index) in ShowImgUrl.card_ids_imgurl" :key="index">
                <img style="max-width:100%" :src="item" class="avatar">
                <el-button v-if="del_show" style="" @click="delTicket(item, index)">删除</el-button>
              </div>
            </el-col>
          </el-form-item>

          <!--公众号二维码-->
          <el-form-item label="公众号二维码">
            <el-col :span="24" class="">
              <el-upload
                class="avatar-uploader"
                :action="upload_url"
                :headers="postHeaders"
                :show-file-list="false"
                :on-success="qecodeSuccess">
                <img style="max-width: 100px" v-if="ShowImgUrl.offical_qrcode" :src="ShowImgUrl.offical_qrcode" class="avatar">
                <el-button style="display: block">上传</el-button>
              </el-upload>
            </el-col>
          </el-form-item>

          <!--服务达标次数-->
          <el-form-item label="服务达标次数">
            <el-input v-model="submitData.service_times"></el-input>
          </el-form-item>

          <!--服务图片-->
          <el-form-item label="服务图片">
            <el-col :span="24" class="">
              <el-upload
                class="avatar-uploader"
                :action="upload_url"
                :headers="postHeaders"
                :show-file-list="false"
                :on-success="service_picSuccess">
                <img style="max-width: 100px" v-if="ShowImgUrl.service_pic" :src="ShowImgUrl.service_pic" class="avatar">
                <el-button style="display: block">上传</el-button>
              </el-upload>
            </el-col>
          </el-form-item>

          <!--服务价格-->
          <el-form-item label="服务价格">
            <el-input v-model="submitData.service_price"></el-input>
          </el-form-item>

          <el-button style="margin: 0 auto 100px;display: block;" @click="save">保存</el-button>

        </el-form>
      </el-card>
    </el-main>
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
      del_show: false,
      ShowImgUrl: {
        intro_pic: '',
        card_ids: [],
        card_ids_imgurl: [],
        offical_qrcode: '',
        service_pic: ''
      },
      submitData: {
        title: '',
        intro_pic: '',
        detail: '',
        card_ids: '',
        service: '',
        offical_qrcode: '',
        service_times: '',
        service_pic: '',
        service_price: ''
      }
    }
  },
  methods: {
    backUp() {
      this.$router.push({ name: 'openMilk' })
    },
    jieshaoSuccess(res, file) {
      this.ShowImgUrl.intro_pic = URL.createObjectURL(file.raw)
      this.submitData.intro_pic = res.data.save_url
    },
    qecodeSuccess(res, file) {
      this.ShowImgUrl.offical_qrcode = URL.createObjectURL(file.raw)
      this.submitData.offical_qrcode = res.data.save_url
    },
    service_picSuccess(res, file) {
      this.ShowImgUrl.service_pic = URL.createObjectURL(file.raw)
      this.submitData.service_pic = res.data.save_url
    },
    chooseTicket() {
      this.$refs.isActivityJieshao.uploadImgModel()
    },
    delTicket(item, index) {
      this.ShowImgUrl.card_ids_imgurl.splice(index, 1)
      this.ShowImgUrl.card_ids.splice(index, 1)
    },
    getImg11(data) {
      console.log(data)
      for (const val of data) {
        this.ShowImgUrl.card_ids_imgurl.push(val.pic_prefix + val.pic)
        this.ShowImgUrl.card_ids.push(val.id)
      }
    },
    save() {
      this.submitData.card_ids = this.ShowImgUrl.card_ids.join(',')
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
          this.$router.push({ name: 'openMilk', query: { activeName: 'first' }})
        })
    },
    getActivityData(activity_id) {
      this.ShowImgUrl.card_ids_imgurl = []
      getActivityDetail1(activity_id)
        .then((result) => {
          this.submitData = result
          this.ShowImgUrl.intro_pic = result.intro_pic_prefix + result.intro_pic
          for (const val of result.cards) {
            this.ShowImgUrl.card_ids_imgurl.push(result.intro_pic_prefix + val.pic)
          }
          this.ShowImgUrl.card_ids = result.card_ids.split(',')
          this.ShowImgUrl.service_pic = result.intro_pic_prefix + result.service_pic
          this.ShowImgUrl.offical_qrcode = result.intro_pic_prefix + result.offical_qrcode
        })
    }
  },
  mounted() {
    const activity_id = this.$route.query.id
    if (this.$route.query.id) {
      this.getActivityData(activity_id)
    }
  }
}
</script>

<style>

</style>
