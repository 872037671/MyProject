<template>
  <div class="baseStup">
    <el-form label-width="120px">
      <el-alert
        title="基础设置"
        type="info"
        style="margin: 30px 0;">
      </el-alert>
      <!--活动标题-->
      <el-form-item label="活动标题">
        <el-input v-model.trim="saveUrl.name"></el-input>
        <el-col :span="24" style="margin:15px 0">
          <el-tag type="success">活动标题</el-tag>
        </el-col>
      </el-form-item>
      <!--开始时间-->
      <el-form-item label="设置时间">
        <el-date-picker
          style="width: 450px;"
          v-model="chooseDate"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="choose_date">
        </el-date-picker>
      </el-form-item>
      <!--结束时间-->
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
      <!--背景音乐-->
      <el-form-item label="背景音乐">
        <el-col :span="24" class="">
          <embed v-if="ShowImgUrl.bg_music" :src="ShowImgUrl.bg_music" width=200 height=80 type=audio/mpeg loop="false" autostart="false" style="position:relative;top:14px">
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
      <!--活动介绍页-->
      <el-form-item label="活动介绍页">
        <el-col :span="24">
          <el-button @click="activityJieshao">上传</el-button>
          <el-button @click="del_activityJieshao_button = !del_activityJieshao_button">删除</el-button><br>
          <div style="width: 80px;display: inline-block;margin: 5px 10px 0 0;position: relative;" v-for="(item, index) in ShowImgUrl.introduce_pic">
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
          <div style="width: 80px;display: inline-block;margin: 5px 10px 0 0;position: relative;" v-for="(item, index) in ShowImgUrl.orther_pic" >
            <img style="width:100%" :src="item" class="avatar">
            <el-button v-if="del_activityotherShow_button" @click="del_activityotherShow_img(index, item)">删除</el-button>
          </div>
        </el-col>
        <el-col :span="24" style="margin:15px 0">
          <el-tag type="success">一般为店铺展示，产品图片，样片，显示在活动介绍页下方</el-tag>
        </el-col>
      </el-form-item>
      <!--活动详情-->
      <el-form-item label="活动详情" class="vote-editor">
        <!-- <Tinymce ref="TinymceRef" @input="TinymceData"></Tinymce> -->
        <script id="editor" type="plain" style="height:400px"></script>
      </el-form-item>

      <el-button style="margin: 0 auto;display: block;" @click="save">保存</el-button>
    </el-form>

    <!--上传文件-->
    <UploadImg @clickMoreChoose="getImg11" ref="isActivityJieshao"></UploadImg>

    <UploadImg @clickMoreChoose="getImg22" ref="isActivityotherShow"></UploadImg>

    <UploadMusic @clickMoreChoose = "getMusic" ref="isActivityMusic"></UploadMusic>
  </div>
</template>

<script>
  import UploadImg from '../../components/UploadImg'
  import UploadMusic from '../../components/UploadMusic'
  import { getToken } from '@/utils/auth'
  // import Tinymce from './Tinymce'
  import { addVoting } from '@/api/vote'
  import { getActivityDetail } from '@/api/vote'
  import { UploadUrl } from '@/utils/auth'
  /* global UE */

  export default {
    name: 'addnew',
    prop: ['group_id', 'defaultMsg', 'config'],
    data() {
      return {
        config: {
          lang: 'zh-cn'
        },
        editor: null,
        upload_url: UploadUrl,
        del_activityJieshao_button: false,
        del_activityotherShow_button: false,
        postHeaders: {
          'X-Token': getToken()
        },
        textData: '',
        chooseDate: [],
        addPurchaseData: {
          name: ''
        },
        ShowImgUrl: {
          introduce_pic: [],
          orther_pic: [],
          top_pic: '',
          kefu_qrcode: '',
          bg_music: ''
        },
        saveUrl: {
          introduce_pic: [],
          orther_pic: [],
          name: '',
          begintime: '',
          kefu_qrcode: '',
          phone_no: '',
          endtime: '',
          detail: '',
          top_pic: '',
          activity_desc: '',
          bg_music: '',
          activity_id: ''
        }
      }
    },
    components: {
      UploadMusic,
      // Tinymce,
      UploadImg
    },
    destroyed() {
      this.editor.destroy()
    },
    methods: {
      getUEContent() { // 获取内容方法
        return this.editor.getContent()
      },
      // 删除活动图片
      del_activityJieshao_img(index, data) {
        this.ShowImgUrl.introduce_pic.splice(index, 1)
        this.saveUrl.introduce_pic.splice(index, 1)
      },
      // 客服二维码上传成功函数
      KFAvatarSuccess(res, file) {
        this.saveUrl.kefu_qrcode = res.data.data.save_url
        this.ShowImgUrl.kefu_qrcode = URL.createObjectURL(file.raw)
      },
      // 删除展示图片
      del_activityotherShow_img(index, data) {
        this.ShowImgUrl.orther_pic.splice(index, 1)
        this.saveUrl.orther_pic.splice(index, 1)
      },
      choose_date(value) {
        this.saveUrl.begintime = Date.parse(value[0]) / 1000
        this.saveUrl.endtime = Date.parse(value[1]) / 1000
      },
      /* 上传音乐成功回调 */
      MUSICAvatarSuccess(res, file) {
        this.ShowImgUrl.bg_music = URL.createObjectURL(file.raw)
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
      },
      /* 拿到上传音乐的url */
      getMusic(data) {
        this.saveUrl.bg_music = data.save_url
        this.ShowImgUrl.bg_music = data.absolute_url
      },
      // 拿到活动介绍的图片
      getImg11(data) {
        for (const val of data) {
          console.log(val)
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
      // 顶部图片上传成功函数
      TOPAvatarSuccess(res, file) {
        this.saveUrl.top_pic = res.data.data.save_url
        this.ShowImgUrl.top_pic = URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isLt2M
      },
      // TinymceData(val) {
      //   this.saveUrl.detail = val
      // },
      save() {
        this.saveUrl.detail = this.editor.getContent()
        console.log(this.saveUrl.detail)
        // 判断数据是否合格
        if (this.saveUrl.name === '') {
          this.$message.error('活动标题不能为空！')
          return
        }
        if (this.chooseDate[0] === undefined || this.chooseDate[1] === undefined) {
          this.$message.error('请完善您的时间信息！')
          return
        }
        if (this.saveUrl.bg_music === '') {
          this.$message.error('请上传音乐！')
          return
        }
        if (this.saveUrl.top_pic === '') {
          this.$message.error('请上传顶部图片！')
          return
        }
        if (this.saveUrl.detail === '') {
          this.$message.error('请填写活动详情！')
          return
        }
        addVoting(this.saveUrl)
          .then((result) => {
            !result.code ? this.$router.push({ name: 'Extension', query: { activity_id: result.id }}) : ''
          }).catch((result) => {
            this.$message.error(result)
          })
      }
    },
    mounted() {
      const _this = this
      this.editor = UE.getEditor('editor', this.config) // 初始化UE
      this.editor.addListener('ready', function() {
        _this.editor.setContent(_this.saveUrl.detail) // 确保UE加载完成后，放入内容。
      })
      this.$route.query.activity_id ? this.saveUrl.activity_id = this.$route.query.activity_id : ''
      getActivityDetail(this.saveUrl.activity_id)
        .then((result) => {
          console.log(result)
          this.saveUrl.name = result.name
          this.saveUrl.begintime = result.begintime
          this.saveUrl.endtime = result.endtime
          this.ShowImgUrl.kefu_qrcode = result.url_prefix + result.kefu_qrcode
          this.saveUrl.kefu_qrcode = result.kefu_qrcode // 给savurl添加
          this.saveUrl.phone_no = result.phone_no
          this.saveUrl.detail = result.detail
          this.ShowImgUrl.top_pic = result.url_prefix + result.top_pic
          this.saveUrl.top_pic = result.top_pic // 给savurl添加顶部图片
          this.ShowImgUrl.bg_music = result.url_prefix + result.bg_music
          this.saveUrl.bg_music = result.bg_music // 给savurl添加音乐
          this.saveUrl.activity_id = result.id
          this.chooseDate = [result.begintime * 1000, result.endtime * 1000]
          this.editor.setContent(result.detail)
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

<style>
  .avatar{
    width: 150px;
  }
  #edui191{
    display: none !important;
  }
  #edui180{
    display: none !important;
  }
  #edui185{
    display: none !important;
  }
  #edui190{
    display: none !important;
  }
  #edui191{
    display: none !important;
  }
  #edui219{
    display: none !important;
  }
  #edui220{
    display: none !important;
  }
  #edui225{
    display: none !important;
  }
  #edui230{
    display: none !important;
  }
  #edui270{
    display: none !important;
  }
  #edui273{
    display: none !important;
  }
  #edui276{
    display: none !important;
  }
  #edui277{
    display: none !important;
  }
  #edui255{
    display: none !important;
  }
  #edui256{
    display: none !important;
  }
  #edui257{
    display: none !important;
  }

  #editor iframe {
    background-color: #0070c0;
  }
</style>
