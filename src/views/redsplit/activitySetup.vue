<template>
  <div class="activitySetup">
    <el-form label-width="120px">
      <el-alert
        title="活动素材设置"
        type="info"
        style="margin: 30px 0;">
      </el-alert>
      <!--活动二维码-->
      <!-- <el-form-item label="活动二维码">
        <el-col :span="24" class="">
          <img :src="ShowImgUrl.erweima_url" class="avatar">
        </el-col>
      </el-form-item> -->
      <!--<el-form-item label="红包数量">
        <el-col :span="24" class="">
          <el-input v-model="saveUrl.qrcode_num"></el-input>
        </el-col>
        <el-col :span="24" style="margin:15px 0">
          <el-tag type="success">生成的红包链接数量</el-tag>
        </el-col>
      </el-form-item>-->
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
      <!--活动备注-->
      <el-form-item label="活动备注">
        <el-input v-model="saveUrl.activity_desc"></el-input>
        <el-col :span="24" style="margin:15px 0">
          <el-tag type="success">活动备注信息</el-tag>
        </el-col>
      </el-form-item>
      <!--举办方名称-->
      <el-form-item label="举办方名称">
        <el-input v-model="saveUrl.commercial" disabled></el-input>
        <el-col :span="24" style="margin:15px 0">
          <el-tag type="success">活动商家的信息</el-tag>
        </el-col>
      </el-form-item>
      <!--客服二维码-->
      <!--<el-form-item label="客服二维码">
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
      </el-form-item>-->
      <!--客服电话-->
      <!--<el-form-item label="客服电话">
        <el-input v-model="saveUrl.phone_no"></el-input>
        <el-col :span="24" style="margin:15px 0">
          <el-tag type="success">在活动页面显示的客服电话</el-tag>
        </el-col>
      </el-form-item>-->
      <!--图文展示页面-->
      <el-alert
        title="图文展示页面"
        type="info"
        style="margin: 30px 0;">
      </el-alert>
      <el-main>
      	<el-row>
      		<el-col :span="24">
      			<div class="radio_fa"><span v-if="this.saveUrl.pattern === '1'"></span></div>	
      			<div class="radio_fa"><span v-if="this.saveUrl.pattern === '2'"></span></div>	
      		</el-col>
      	</el-row>
        <el-tabs v-model="activity_tab_show" @tab-click="tabs_event">
          <el-tab-pane label="自建内容" name="first">
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
            <!--活动介绍页-->
            <!-- <el-form-item label="活动介绍页">
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
            </el-form-item> -->
            <!--活动详情-->
            <el-form-item label="活动详情">
              <!-- <Tinymce ref="TinymceRef" @input="TinymceData"></Tinymce> -->
              <script id="editor" type="plain" style="height:400px"></script>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="跳转链接" name="second">
            <!--分享链接-->
            <el-form-item label="分享链接">
              <el-col :span="12">
                <el-input id="activity_url" placeholder="http://" v-model="saveUrl.share_url"></el-input>
              </el-col>
              <el-col :span="24" style="margin:15px 0">
                <el-tag type="success">链接请带上http://开头！</el-tag>
              </el-col>
            </el-form-item>
            <!--分享标题-->
						<el-form-item label="分享标题">
						  <el-col :span="12">
						    <el-input id="activity_url" v-model="saveUrl.share_title"></el-input>
						  </el-col>
						</el-form-item>
						<!--分享封面-->
						<el-form-item label="分享封面">
						  <el-col :span="24" class="">
						    <el-upload
						      class="avatar-uploader"
						      :action="upload_url"
						      :headers="postHeaders"
						      :show-file-list="false"
						      :on-success="FMAvatarSuccess"
						      :before-upload="beforeAvatarUpload">
						      <img v-if="ShowImgUrl.share_cover" :src="ShowImgUrl.share_cover" class="avatar">
						      <el-button>上传</el-button>
						    </el-upload>
						  </el-col>
						</el-form-item>
            <!--分享详情-->
            <el-form-item label="分享详情">
              <el-col :span="24" class="">
                <el-upload
                  class="avatar-uploader"
                  :action="upload_url"
                  :headers="postHeaders"
                  :show-file-list="false"
                  :on-success="XQAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="ShowImgUrl.share_detail" :src="ShowImgUrl.share_detail" class="avatar">
                  <el-button>上传</el-button>
                </el-upload>
              </el-col>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
      </el-main>
      <el-button style="margin: 0 auto 100px;display: block;" @click="save">保存</el-button>
    </el-form>

    <!--上传文件-->
    <UploadImg @clickMoreChoose="getImg11" ref="isActivityJieshao"></UploadImg>

    <!--上传音乐-->
    <UploadMusic @clickMoreChoose = "getMusic" ref="isActivityMusic"></UploadMusic>

  </div>
</template>

<script>
  import { addMaterial } from '@/api/redsplit'
  import { genQrcode } from '@/api/redsplit'
  import UploadImg from '../../components/UploadImg'
  import UploadMusic from '../../components/UploadMusic'
  import { getToken } from '@/utils/auth'
  // import Tinymce from './Tinymce'
  import { detailMaterial } from '@/api/redsplit'
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
        postHeaders: {
          'X-Token': getToken()
        },
        activity_tab_show: 'first',
        del_activityJieshao_button: false,
        del_activityotherShow_button: false,
        upload_url: UploadUrl,
        imageUrl: '',
        ShowImgUrl: {
          introduce_pic: [],
          orther_pic: [],
          kefu_qrcode: '',
          bg_music: '',
          erweima_url: '',
          activity_url: '',
          share_cover: '',
          share_detail: ''
        },
        saveUrl: {
          introduce_pic_5: '', // 介绍页,
          introduce_pic: '12',
          pattern: '1',
          bg_music: '',
          commercial: '', // 举办方名称
          // kefu_qrcode: '',
          // phone_no: '',
          // qrcode_num: '',
          activity_id: '',
          share_url: '', // 分享链接
          share_title: '', // 分享标题
          share_cover: '', // 分享封面
          share_detail: '' // 分享详情
        }
      }
    },
    components: {
      UploadImg,
      UploadMusic
      // Tinymce
    },
    destroyed() {
      this.editor.destroy()
    },
    methods: {
      getUEContent() { // 获取内容方法
        return this.editor.getContent()
      },
      tabs_event(tab, event) {
        if (this.activity_tab_show === 'first') {
          this.saveUrl.pattern = '1'
        } else {
          this.saveUrl.pattern = '2'
        }
      },
      // 客服二维码上传成功函数
      // KFAvatarSuccess(res, file) {
      //   this.saveUrl.kefu_qrcode = res.data.data.save_url
      //   this.ShowImgUrl.kefu_qrcode = URL.createObjectURL(file.raw)
      // },
      // 分享封面
      FMAvatarSuccess(res, file) {
        this.saveUrl.share_cover = res.data.data.save_url
        this.ShowImgUrl.share_cover = URL.createObjectURL(file.raw)
      },
      // 分享详情
      XQAvatarSuccess(res, file) {
        this.saveUrl.share_detail = res.data.data.save_url
        this.ShowImgUrl.share_detail = URL.createObjectURL(file.raw)
      },
      // 活动详情
      // TinymceData(val) {
      //   this.saveUrl.introduce_pic_5 = val
      // },
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
        console.log(e.text)
      },
      beforeMUSICAvatarUpload(file) {
        console.log('上传成功了')
      },
      save() {
        this.saveUrl.introduce_pic_5 = this.editor.getContent()
        // 判断数据是否合格
        /*
        if (this.saveUrl.bg_music === '') {
          this.$message.error('需要上传您的背景音乐！')
          return
        }
        if (this.saveUrl.share_url === '') {
          this.$message.error('需要上传您的分享链接！')
          return
        }
        if (this.saveUrl.share_title === '') {
          this.$message.error('需要上传您的分享标题！')
          return
        }
        if (this.saveUrl.share_cover === '') {
          this.$message.error('需要上传您的分享封面！')
          return
        }
        if (this.saveUrl.share_detail === '') {
          this.$message.error('需要上传您的分享详情！')
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
        */
        addMaterial(this.saveUrl)
          .then((result) => {
            result ? this.$router.push({ name: 'redsplit' }) : ''
          })
      },
      // 拿到活动介绍的图片
      getImg11(data) {
        for (const val of data) {
          this.ShowImgUrl.introduce_pic.push(val.imgUrl)
          // this.saveUrl.introduce_pic.push(val.save_url)
        }
      },
      /* 拿到上传音乐的url */
      getMusic(data) {
        this.saveUrl.bg_music = data.save_url
        this.ShowImgUrl.bg_music = data.absolute_url
      },
      /* 上传音乐 */
      UploadMUSIC() {
        this.$refs.isActivityMusic.uploadImgModel()
      }
    },
    mounted() {
      this.saveUrl.commercial = this.$store.state.user.commercial
      const _this = this
      this.editor = UE.getEditor('editor', this.config) // 初始化UE
      this.editor.addListener('ready', function() {
        _this.editor.setContent(_this.saveUrl.introduce_pic_5) // 确保UE加载完成后，放入内容。
      })
      this.saveUrl.activity_id = this.$route.query.activity_id
      this.ShowImgUrl.activity_url = this.$route.query.activity_url
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
          // this.saveUrl.kefu_qrcode = result.kefu_qrcode // 给savurl添加
          // this.saveUrl.phone_no = result.phone_no
          this.ShowImgUrl.bg_music = result.url_prefix + result.bg_music
          this.saveUrl.bg_music = result.bg_music // 给savurl添加
          this.ShowImgUrl.share_cover = result.url_prefix + result.share_cover
          this.saveUrl.share_cover = result.share_cover // 给savurl添加封面
          this.ShowImgUrl.share_detail = result.url_prefix + result.share_detail
          this.saveUrl.share_detail = result.share_detail // 给savurl添加分享详情
          this.saveUrl.share_title = result.share_title
          this.saveUrl.activity_desc = result.activity_desc
          this.saveUrl.share_url = result.share_url
          // this.saveUrl.qrcode_num = result.qrcode_num
          this.saveUrl.pattern = JSON.stringify(result.pattern)
          this.saveUrl.introduce_pic_5 = result.introduce_pic_5
          this.editor.setContent(result.introduce_pic_5)
          // this.$refs.TinymceRef.setContent(result.introduce_pic_5)
          if (result.pattern === 2) {
            this.activity_tab_show = 'second'
          } else {
            this.activity_tab_show = 'first'
          }
        })
    }
  }
</script>

<style lang="scss">
	.radio_fa{
		width: 20px;
		height: 20px;
		display: inline-block;
		border: 1px solid #DDE0E6;
		margin-left: 20px;
		border-radius: 10px;
		span{
			width: 10px;
			height: 10px;
			display: block;
			background: #409EFF;
			border-radius: 50%;
			margin: 4px auto;
		}
	}
	.radio_fa:nth-child(2){
		margin-left: 70px;
	}
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
    background-color: #fff;
  }
</style>
