<template>
  <div class="activitySetup">
    <el-form label-width="120px">
      <el-alert
        title="活动素材设置"
        type="info"
        style="margin: 30px 0;">
      </el-alert>
      <!--活动二维码-->
      <el-form-item label="活动二维码">
        <el-col :span="24" class="">
          <img :src="ShowImgUrl.erweima_url" class="avatar">
        </el-col>
      </el-form-item>
      <!--活动链接-->
      <el-form-item label="活动链接">
        <el-col :span="12">
          <el-input id="activity_url" disabled v-model="ShowImgUrl.activity_url"></el-input>
        </el-col>
        <el-col :span="2"><el-button v-clipboard:copy="ShowImgUrl.activity_url" v-clipboard:success="onCopy">复制</el-button></el-col>
        <el-col :span="24" style="margin:15px 0">
          <el-tag type="success">活动链接打开的地址</el-tag>
        </el-col>
      </el-form-item>
      <!--举办方名称-->
      <el-form-item label="举办方名称">
        <el-input v-model="saveUrl.commercial" disabled></el-input>
        <el-col :span="24" style="margin:15px 0">
          <el-tag type="success">活动商家的信息</el-tag>
        </el-col>
      </el-form-item>
      <!--活动备注-->
      <el-form-item label="活动备注">
        <el-input v-model="saveUrl.activity_desc"></el-input>
        <el-col :span="24" style="margin:15px 0">
          <el-tag type="success">活动备注信息</el-tag>
        </el-col>
      </el-form-item>
      <!--客服二维码-->
      <el-form-item label="客服二维码">
        <el-col :span="24" class="">
          <el-upload
            class="avatar-uploader"
            :action="upload_url"
            :headers="postHeaders"
            :show-file-list="false"
            :on-success="KFAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="ShowImgUrl.kefu_qrcode" :src="ShowImgUrl.kefu_qrcode" class="avatar">
            <el-button>上传</el-button>
          </el-upload>
        </el-col>
      </el-form-item>
      <!--客服电话-->
      <el-form-item label="客服电话">
        <el-input v-model="saveUrl.phone_no"></el-input>
        <el-col :span="24" style="margin:15px 0">
          <el-tag type="success">在活动页面显示的客服电话</el-tag>
        </el-col>
      </el-form-item>
      <!--图文展示页面-->
      <el-alert
        title="图文展示页面"
        type="info"
        style="margin: 30px 0;">
      </el-alert>
      <!--背景音乐-->
      <el-form-item label="背景音乐">
        <el-col :span="24" class="">
          <embed v-if="ShowImgUrl.bg_music" :src="ShowImgUrl.bg_music" width=200 height=80 type=audio/mpeg loop="false" autostart="false" style="position:relative;top:14px">
          <!--<el-upload
            class="avatar-uploader"
            action="http://wxyx.com:4000/index.php/api/upload-img"
            :headers="postHeaders"
            :show-file-list="false"
            :on-success="TOPAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="ShowImgUrl.top_pic" :src="ShowImgUrl.bg_music" class="avatar">
          </el-upload>-->
          <el-button @click="UploadMUSIC">上传音乐</el-button>
        </el-col>
        <el-col :span="24" style="margin:15px 0">
          <el-tag type="success">建议控制在1M内，防止打开加载过长（可使用酷狗裁切工具）</el-tag>
        </el-col>
      </el-form-item>
      <!--顶部图片-->
      <el-form-item label="顶部图片">
        <el-col :span="24">
          <el-upload
            class="avatar-uploader"
            :action="upload_url"
            :headers="postHeaders"
            :show-file-list="false"
            :on-success="TOPAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="ShowImgUrl.top_pic" :src="ShowImgUrl.top_pic" class="avatar">
            <el-button>上传</el-button>
          </el-upload>
        </el-col>
        <el-col :span="24" style="margin:15px 0">
          <el-tag type="success">活动动页面里最上方的图片，一般为宣传图片,建议宽度640，高度不限</el-tag>
        </el-col>
      </el-form-item>
      <!--团购进度标题-->
      <el-form-item label="团购进度标题">
        <el-col :span="4">
          <!--<el-input style="color: red;" v-model="saveUrl.purchase_title"></el-input>-->
          <input :style="{color: purchase_title_color}" class="textStyle" type="text"  v-model="saveUrl.purchase_title" />
        </el-col>
        <!-- <el-col :span="6">
          <el-color-picker v-model="purchase_title_color"></el-color-picker>
          <span class="demonstration">字体颜色</span>
        </el-col> -->
        <!-- <el-col :span="24" style="margin:15px 0">
          <el-tag type="success">请输入团购进度标题 如：伙伴们加油</el-tag>
        </el-col> -->
      </el-form-item>
      <!--团购进度条底色-->
      <el-form-item label="团购进度条底色">
        <el-col :span="4">
          <!--<el-input v-model="saveUrl.group_color"></el-input>-->
          <input :style="{color: group_color_color}" class="textStyle" type="text"  v-model="saveUrl.purchase_color" />
        </el-col>
        <!-- <el-col :span="6">
          <el-color-picker v-model="group_color_color"></el-color-picker>
          <span class="demonstration">选择</span>
        </el-col> -->
        <el-col :span="24" style="margin:15px 0">
          <el-tag type="success">选择进度条区域模块的底色</el-tag>
        </el-col>
      </el-form-item>
      <!--团购进度描述-->
      <el-form-item label="团购进度描述">
        <el-col :span="18">
          <!--<el-input v-model="saveUrl.text_color" style="height: 150px;" class="textarea" type="textarea"></el-input>-->
          <textarea :style="{color: text_color_color}" class="textTextarea" v-model="saveUrl.purchase_detail" ></textarea>
        </el-col>
        <el-col :span="6">
          <el-color-picker v-model="saveUrl.detail_color"></el-color-picker>
          <span class="demonstration">字体颜色</span>
        </el-col>
        <el-col :span="24" style="margin:15px 0">
          <el-tag type="success">可实时根据活动情况，修改编辑活动进度内容，展示在活动进度条下</el-tag>
        </el-col>
      </el-form-item>
      <!--活动介绍页-->
      <el-form-item label="活动介绍页">
        <el-col :span="24">
          <el-button @click="activityJieshao">上传</el-button>
          <el-button @click="del_activityJieshao_button = !del_activityJieshao_button">删除</el-button><br>
          <div style="width: 80px; display: inline-block; margin: 5px 10px 0 0; position: relative" v-for="(item, index) in ShowImgUrl.introduce_pic" :key="index">
            <img style="width:100%" :src="item" class="avatar">
            <el-button v-if="del_activityJieshao_button" @click="del_activityJieshao_img(index, item)">删除</el-button>
          </div>
        </el-col>
        <el-col :span="24" style="margin:15px 0">
          <el-tag type="success">一般为介绍活动内容，展示与团购进度下方</el-tag>
        </el-col>
      </el-form-item>
      <!--其他展示页-->
      <el-form-item label="其他展示页">
        <el-col :span="24">
          <el-button @click="activityotherShow">上传</el-button>
          <el-button @click="del_activityotherShow_button = !del_activityotherShow_button">删除</el-button><br>
          <div style="width: 80px;display: inline-block;margin: 5px 10px 0 0;position: relative;" v-for="(item, index) in ShowImgUrl.orther_pic" :key="index">
            <img style="width:100%" :src="item" class="avatar">
            <el-button v-if="del_activityotherShow_button" @click="del_activityotherShow_img(index, item)">删除</el-button>
          </div>
        </el-col>
        <el-col :span="24" style="margin:15px 0">
          <el-tag type="success">一般为店铺展示，产品图片，样片，显示在活动介绍页下方</el-tag>
        </el-col>
      </el-form-item>
      <el-button style="margin: 0 auto 100px;display: block;" @click="save">保存</el-button>
    </el-form>

    <!--上传文件-->
    <UploadImg @clickMoreChoose="getImg11" ref="isActivityJieshao"></UploadImg>

    <UploadImg @clickMoreChoose="getImg22" ref="isActivityotherShow"></UploadImg>

    <!--上传音乐-->
    <UploadMusic @clickMoreChoose = "getMusic" ref="isActivityMusic"></UploadMusic>

  </div>
</template>

<script>
  import { addMaterial } from '@/api/groupOn'
  import { genQrcode } from '@/api/groupOn'
  import UploadImg from '../../components/UploadImg'
  import UploadMusic from '../../components/UploadMusic'
  import { getToken } from '@/utils/auth'
  import { detailMaterial } from '@/api/groupOn'
  import { UploadUrl } from '@/utils/auth'

  export default {
    data() {
      return {
        postHeaders: {
          'X-Token': getToken()
        },
        del_activityJieshao_button: false,
        del_activityotherShow_button: false,
        upload_url: UploadUrl,
        purchase_title_color: '#2A1F1F',
        group_color_color: '#2A1F1F',
        text_color_color: '#2A1F1F',
        imageUrl: '',
        fileList: [],
        UploadshowData: {
          activityJieshao: true
        },
        ShowImgUrl: {
          introduce_pic: [],
          orther_pic: [],
          kefu_qrcode: '',
          top_pic: '',
          bg_music: '',
          erweima_url: '',
          activity_url: ''
        },
        saveUrl: {
          introduce_pic: [],
          orther_pic: [],
          top_pic: '',
          bg_music: '',
          commercial: '',
          kefu_qrcode: '',
          phone_no: '',
          purchase_title: '',
          purchase_color: '',
          purchase_detail: '',
          activity_desc: '',
          activity_id: '',
          detail_color: '#333'
        }
      }
    },
    components: {
      UploadImg,
      UploadMusic
    },
    methods: {
      // 删除活动图片
      del_activityJieshao_img(index, data) {
        this.ShowImgUrl.introduce_pic.splice(index, 1)
        this.saveUrl.introduce_pic.splice(index, 1)
      },
      // 删除展示图片
      del_activityotherShow_img(index, data) {
        this.ShowImgUrl.orther_pic.splice(index, 1)
        this.saveUrl.orther_pic.splice(index, 1)
      },
      // 客服二维码上传成功函数
      KFAvatarSuccess(res, file) {
        this.saveUrl.kefu_qrcode = res.data.data.save_url
        this.ShowImgUrl.kefu_qrcode = URL.createObjectURL(file.raw)
      },
      // 顶部图片上传成功函数
      TOPAvatarSuccess(res, file) {
        this.saveUrl.top_pic = res.data.data.save_url
        this.ShowImgUrl.top_pic = URL.createObjectURL(file.raw)
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
      },
      /* 上传音乐成功回调 */
      MUSICAvatarSuccess(res, file) {
        this.ShowImgUrl.bg_music = URL.createObjectURL(file.raw)
        this.saveUrl.bg_music = URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isLt2M
      },
      onCopy(e) {
        console.log(e)
      },
      beforeMUSICAvatarUpload(file) {
        console.log('上传成功了')
      },
      save() {
        // 判断数据是否合格
        if (this.saveUrl.bg_music === '') {
          this.$message.error('需要上传您的背景音乐！')
          return
        }
        if (this.saveUrl.kefu_qrcode === '') {
          this.$message.error('需要上传您的客服二维码！')
          return
        }
        if (this.saveUrl.phone_no === '') {
          this.$message.error('请填写客服电话！')
          return
        }
        if (this.saveUrl.top_pic === '') {
          this.$message.error('需要上传顶部图片！')
          return
        }
        if (!this.saveUrl.introduce_pic.length) {
          this.$message.error('需要上传活动图片！')
          return
        }
        if (!this.saveUrl.orther_pic.length) {
          this.$message.error('需要其他展示页图片！')
          return
        }
        addMaterial(this.saveUrl)
          .then((result) => {
            result ? this.$router.push({ name: 'duckIconGroupon', query: { activity_id: this.saveUrl.activity_id }}) : ''
          })
      },
      // 拿到活动介绍的图片
      getImg11(data) {
        for (const val of data) {
          this.ShowImgUrl.introduce_pic.push(val.imgUrl)
          this.saveUrl.introduce_pic.push(val.save_url)
        }
      },
      // 拿到其他展示的图片
      getImg22(data) {
        for (const val of data) {
          this.ShowImgUrl.orther_pic.push(val.imgUrl)
          this.saveUrl.orther_pic.push(val.save_url)
        }
      },
      /* 拿到上传音乐的url */
      getMusic(data) {
        this.saveUrl.bg_music = data.save_url
        this.ShowImgUrl.bg_music = data.absolute_url
      },
      /* 活动介绍上传 */
      activityJieshao() {
        this.$refs.isActivityJieshao.uploadImgModel()
      },
      /* 其他展示页 */
      activityotherShow() {
        this.$refs.isActivityotherShow.uploadImgModel()
      },
      /* 上传音乐 */
      UploadMUSIC() {
        this.$refs.isActivityMusic.uploadImgModel()
      }
    },
    mounted() {
      this.saveUrl.commercial = this.$store.state.user.commercial
      this.saveUrl.activity_id = this.$route.query.activity_id
      this.saveUrl.activity_url = this.$route.query.activity_url
      genQrcode(this.saveUrl.activity_id)
        .then((result) => {
          this.ShowImgUrl.erweima_url = result.qrcode_url
          this.ShowImgUrl.activity_url = result.activity_url
        })
      /* 获取编辑活动素材页面数据 */
      const activity_id = this.saveUrl.activity_id
      detailMaterial({ activity_id })
        .then((result) => {
          this.saveUrl.activity_url = result.activity_url
          this.ShowImgUrl.kefu_qrcode = result.url_prefix + result.kefu_qrcode
          this.saveUrl.kefu_qrcode = result.kefu_qrcode // 给savurl添加
          this.saveUrl.phone_no = result.phone_no
          this.ShowImgUrl.bg_music = result.url_prefix + result.bg_music
          this.saveUrl.bg_music = result.bg_music // 给savurl添加
          this.ShowImgUrl.top_pic = result.url_prefix + result.top_pic
          this.saveUrl.top_pic = result.top_pic // 给savurl添加
          this.saveUrl.purchase_title = result.purchase_title
          this.saveUrl.purchase_color = result.purchase_color
          this.saveUrl.purchase_detail = result.purchase_detail
          this.saveUrl.detail_color = result.detail_color
          this.saveUrl.activity_desc = result.activity_desc
          for (const val of result.introduce_pic) {
            this.ShowImgUrl.introduce_pic.push(result.url_prefix + val)
            this.saveUrl.introduce_pic.push(val)
          }
          for (const val of result.orther_pic) {
            this.ShowImgUrl.orther_pic.push(result.url_prefix + val)
            this.saveUrl.orther_pic.push(val)
          }
        })
    }
  }
</script>

<style lang="scss">
  .avatar{
    width: 150px;
  }
  .box-flex .el-upload--text{
    display: flex;
    justify-content:flex-start;
    align-items: flex-start;
    button{
      height: 40px;
      margin-left: 20px;
    }
  }
  .textStyle{
    width: 228px;
    height: 38px;
    border: 1px solid #D8DCE5;
    border-radius: 5px;
    text-indent: 20px;
    outline: none;
    line-height: 38px;
  }
  .textTextarea{
    width: 228px;
    height: 150px;
    border: 1px solid #D8DCE5;
    border-radius: 5px;
    text-indent: 20px;
    outline: none;width: 100%;
    padding-top: 20px;
  }
</style>
