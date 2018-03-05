<template>
  <div class="icon">
    <el-form label-width="120px">
      <!--点亮图标得好礼-->
      <el-form-item label="点亮图标得好礼">
        <el-checkbox v-model="statuses">启用</el-checkbox>
      </el-form-item>
      <!--分享范围-->
      <el-form-item label="分享范围">
        <el-radio v-model="addLightBase.share_range" label="1">朋友圈</el-radio>
        <el-radio v-model="addLightBase.share_range" label="2">好友，群</el-radio>
        <el-radio v-model="addLightBase.share_range" label="3">朋友圈/好友,群</el-radio>
      </el-form-item>
      <!--图标名称-->
      <el-form-item label="图标名称">
        <el-input v-model="addLightBase.name"></el-input>
        <el-col :span="24" style="margin:15px 0">
          <el-tag type="success">图标名称</el-tag>
        </el-col>
      </el-form-item>
      <!--暗图标-->
      <el-form-item label="图标上传">
        <el-col :span="24">
          <div>
            <el-upload
              class="avatar-uploader"
              :action="upload_url"
              :headers="postHeaders"
              :show-file-list="false"
              style="display: inline-block;"
              :on-success="AvatarSuccessdark">
              <el-button>暗图标</el-button>
            </el-upload>
            <el-upload
              class="avatar-uploader"
              :action="upload_url"
              :headers="postHeaders"
              :show-file-list="false"
              style="display: inline-block;"
              :on-success="AvatarSuccesslight">
              <el-button>亮图标</el-button>
            </el-upload>
            <el-button type="primary">请先上传暗图标！</el-button>
            <!-- <el-button @click="addIcon">添加</el-button> -->
          </div>
          <div v-for="(item, index) in showBase" key="index">
            <div style="display: inline-block;width: 100px;text-align: center;">
              <img style="width: 100px;" :src="item.dark" class="avatar">
              <el-tag type="info">暗图标</el-tag>
            </div>
            <div style="display: inline-block;width: 100px;text-align: center;">
              <img style="width: 100px;" :src="item.light" class="avatar">
              <el-tag type="success">亮图标</el-tag>
            </div>
            <!-- <el-button type="danger" size="small" @click="deleteIcons(item, index)">删除</el-button> -->
          </div>
        </el-col>
      </el-form-item>
      <!--图标个数-->
      <el-form-item label="图标个数">
        <el-input v-model="addLightBase.pic_num"></el-input>
        <el-col :span="24" style="margin:15px 0">
          <el-tag type="success">点亮图标领取礼，所需个数</el-tag>
        </el-col>
      </el-form-item>
      <!--礼品图片-->
      <el-form-item label="礼品图片">
        <el-col :span="24">
          <el-upload
            class="avatar-uploader"
            :action="upload_url"
            :headers="postHeaders"
            :show-file-list="false"
            :on-success="gift_picAvatarSuccess">
            <img v-if="gift_pic" :src="gift_pic" style="width: 200px;" class="avatar">
            <el-button>上传</el-button>
          </el-upload>
        </el-col>
        <el-col :span="8">
          <el-tag type="success">请上传尺寸比例为2/1</el-tag>
        </el-col>
      </el-form-item>
      <el-button style="margin: 0 auto;display: block;" @click="save">保存</el-button>
      
    </el-form>
  </div>
</template>

<script>
  import { getToken } from '@/utils/auth'
  import { addLight } from '@/api/bargain'
  import { getLightDetail } from '@/api/bargain'
  import { UploadUrl } from '@/utils/auth'
  
  export default {
    data() {
      return {
        darkSave_Url: '',
        lightSave_Url: '',
        icon_arr_commit: [],
        gift_pic: '',
        postHeaders: {
          'X-Token': getToken()
        },
        upload_url: UploadUrl,
        gift: true,
        showBase: [],
        linshiData: [],
        linshiSaveData: [],
        statuses: false,
        addLightBase: {
          activity_id: '',
          status: '',
          share_range: '1',
          name: '',
          icons: [],
          pic_num: '',
          gift_pic: ''
        }
      }
    },
    watch: {
      addLightBase: {
        handler(val, oldval) {
          this.showBase = []
          this.linshiSaveData = []
          for (let icons_num = 0; icons_num < val.pic_num; icons_num++) {
            this.showBase[icons_num] = { dark: this.icon_arr_commit[0].dark, light: this.icon_arr_commit[0].light }
            this.linshiSaveData[icons_num] = { dark: this.icon_arr_commit[0].save_dark, light: this.icon_arr_commit[0].save_light }
          }
        },
        deep: true
      }
    },
    methods: {
      gift_picAvatarSuccess(res, file) {
        this.gift_pic = URL.createObjectURL(file.raw)
        this.addLightBase.gift_pic = res.data.data.save_url
      },
      AvatarSuccessdark(res, file) {
        console.log(this.icon_arr_commit[0].dark)
        this.showBase = [{ dark: '', light: '', sort: '' }]
        this.linshiSaveData = [{ dark: '', light: '', sort: '' }]
        this.icon_arr_commit[0].dark = res.data.data.img_url
        this.showBase[0].dark = res.data.data.img_url
        this.linshiSaveData[0].dark = res.data.data.save_url
        this.icon_arr_commit[0].save_dark = res.data.data.save_url
      },
      AvatarSuccesslight(res, file) {
        this.icon_arr_commit[0].light = res.data.data.img_url
        this.showBase[0].light = res.data.data.img_url
        this.linshiSaveData[0].light = res.data.data.save_url
        this.icon_arr_commit[0].save_light = res.data.data.save_url
      },
      save() {
        if (this.statuses === true) {
          this.addLightBase.status = 1
        } else {
          this.addLightBase.status = 0
        }
        this.addLightBase.icons = JSON.stringify(this.linshiSaveData[0])
        if (!this.addLightBase.status) {
          this.addLightBase.status = false
        }
        // 判断数据是否合格
        if (this.addLightBase.name === '') {
          this.$message.error('请填写图标名称！')
          return
        }
        if (this.addLightBase.icons === '[]') {
          this.$message.error('请添加完整的图标！')
          return
        }
        const pic_num_type = Number(this.addLightBase.pic_num)
        if (!Number.isInteger(pic_num_type) || this.addLightBase.pic_num < 0) {
          this.$message.error('请填写正确图标格式！（不得小于上传图标组数且为整数）')
          return
        }
        if (this.addLightBase.gift_pic === '') {
          this.$message.error('请上传礼品图片！')
          return
        }
        addLight(this.addLightBase)
          .then((result) => {
            result ? this.$router.push({ name: 'redpacketbargain', query: { activity_id: this.$route.query.activity_id }}) : ''
          })
      },
      default_method() {

      }
    },
    mounted() {
      this.addLightBase.activity_id = this.$route.query.activity_id
      getLightDetail(this.$route.query.activity_id)
        .then((result) => {
          if (result.status === 0) {
            this.statuses = false
          } else {
            this.statuses = true
          }
          this.addLightBase = {
            activity_id: result.activity_id,
            status: result.status,
            share_range: JSON.stringify(result.share_range),
            name: result.name,
            icons: [],
            pic_num: result.pic_num,
            gift_pic: result.gift_pic
          }
          this.gift_pic = result.url_prefix + result.gift_pic
          for (const val of result.icons) {
            this.showBase.push({ dark: result.url_prefix + val.dark, light: result.url_prefix + val.light, sort: val.sort })
            this.linshiSaveData.push({ dark: val.dark, light: val.light, sort: val.sort })
          }
          if (result.icons !== 0) {
            this.icon_arr_commit = [{ dark: result.url_prefix + result.icons[0].dark, light: result.url_prefix + result.icons[0].light, sort: result.icons[0].sort, save_dark: result.icons[0].dark, save_light: result.icons[0].light }]
          }
        }).catch((result) => {
          this.icon_arr_commit = [{ dark: '', light: '', sort: '', save_dark: '', save_light: '' }]
        })
    }
  }
</script>

<style>
</style>