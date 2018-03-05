<template>
  <div>
    <el-main>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>客户配置信息列表</span>
        </div>
        <div>
          <el-form label-width="100px" label-position="left">
             <el-button  @click='accredit' style="margin-bottom:15px">一键授权</el-button>
             <el-form-item label="公众号名称">
              <span>{{setting_data.nick_name}}</span>
            </el-form-item>
            <el-form-item label="主体名称">
              <span>{{setting_data.principal_name}}</span>
            </el-form-item>
            <el-form-item label="简介">
              <span>{{setting_data.signature}}</span>
            </el-form-item>
            <el-form-item label="二维码">
              <img :src="setting_data.qrcode_url" alt="" style="width:150px" >
            </el-form-item>
            <el-form-item label="app_id">
              <span>{{setting_data.app_id}}</span>
              <!-- <el-input v-model="setting_data.app_id" :disabled="true" ></el-input> -->
            </el-form-item>
            <el-form-item label="微信商户ID">
              <el-input v-model="setting_data.merchant_id"></el-input>
            </el-form-item>
            <el-form-item label="key">
              <el-col :span="18">
                <el-input v-model="setting_data.key" style="width:90%" ></el-input>
              </el-col>
              <el-col :span="6">
                <el-button @click="touch" >一键生成</el-button>
              </el-col>
            </el-form-item>
            <!-- <el-form-item label="微信ID">
              <el-input v-model="setting_data.secret"></el-input>
            </el-form-item> -->
            <!--上传证书-->
            <el-form-item label="apiclient_cert">
              <el-col :span="24">
                <el-upload
                  class="avatar-uploader"
                  action="http://activity.lyfz.net/index.php/api/uploadCert"
                  :headers="postHeaders"
                  :show-file-list="false"
                  :on-success="zhengshu"
                  :before-upload="beforeAvatarUpload">
                  <el-col :span="24">
                    <el-input :disabled="true" v-model="show_url.original_name_shu"></el-input>
                  </el-col>
                  <el-button style="margin-top:15px">上传</el-button>
                </el-upload>
              </el-col>
            </el-form-item>
            <!--上传key-->
            <el-form-item label="apiclient_key">
              <el-col :span="24">
                <el-upload
                  class="avatar-uploader"
                  action="http://activity.lyfz.net/index.php/api/uploadCert"
                  :headers="postHeaders"
                  :show-file-list="false"
                  :on-success="chuankey"
                  :before-upload="beforeAvatarUpload">
                  <el-col :span="24">
                    <el-input :disabled="true" v-model="show_url.original_name_key"></el-input>
                    <el-button style="margin-top:15px">上传</el-button>
                  </el-col>
                </el-upload>
              </el-col>
            </el-form-item>
            <!-- <el-form-item label="上传授权回调页面认证文件">
              <el-col :span="24">
                <el-upload
                  class="avatar-uploader"
                  action="http://activity.lyfz.net/index.php/api/uploadCallBackFile"
                  :headers="postHeaders"
                  :show-file-list="false"
                  :on-success="callbackkey"
                  :before-upload="beforeAvatarUpload">
                  <el-col :span="24">
                    <el-input :disabled="true" v-model="show_url.call_back_name"></el-input>
                    <el-button style="margin-top:15px">上传</el-button>
                  </el-col>
                </el-upload>
              </el-col>
            </el-form-item> -->
          </el-form>
          <el-button style="margin:0 auto;display:block" @click="save">保存</el-button>
        </div>
      </el-card>
    </el-main>
  </div>
</template>

<script>
  import { getMerchantInfo } from '@/api/CustomerSetting'
  import { getToken } from '@/utils/auth'
  import { setMerchantSetting } from '@/api/CustomerSetting'
  import { mapState } from 'vuex'
  export default {
    data() {
      return {
        GroupActiveList: {},
        postHeaders: {
          'X-Token': getToken()
        },
        show_url: {
          original_name_shu: '',
          original_name_key: '',
          call_back_name: ''
        },
        setting_data: {
          app_id: '',
          merchant_id: '',
          key: '',
          // secret: '',
          cert_path: '',
          key_path: '',
          original_name: [],
          nick_name: '',
          signature: '',
          qrcode_url: '',
          principal_name: '',
          activity_merchant_id: ''
        },
        dialogVisible: false
      }
    },
    computed: {
      ...mapState({
        merchant_id: state => state.user.merchant_id
      })
    },
    methods: {
      save() {
        this.setting_data.original_name = [this.show_url.original_name_shu, this.show_url.original_name_key]
        if (this.setting_data.app_id === '') {
          this.$message.error('请填写app_id!')
          return
        }
        if (this.setting_data.merchant_id === '') {
          this.$message.error('请填写微信商户ID!')
          return
        }
        if (this.setting_data.key === '') {
          this.$message.error('请填写key!')
          return
        }
        if (this.setting_data.secret === '') {
          this.$message.error('请填写secret!')
          return
        }
        if (this.setting_data.cert_path === '') {
          this.$message.error('请上传apiclient_cert!')
          return
        }
        if (this.setting_data.key_path === '') {
          this.$message.error('请上传apiclient_key!')
          return
        }
        this.setting_data.original_name = [this.show_url.original_name_shu, this.show_url.original_name_key, this.show_url.call_back_name]
        setMerchantSetting(this.setting_data)
          .then((result) => {
            this.$message.success('保存成功!')
          }).catch((result) => {
            this.$message.success('保存失败!')
          })
      },
      // 顶部图片上传成功函数
      zhengshu(res, file) {
        this.show_url.original_name_shu = res.data.original_name
        this.setting_data.cert_path = res.data.savename
      },
      chuankey(res, file) {
        this.show_url.original_name_key = res.data.original_name
        this.setting_data.key_path = res.data.savename
      },
      callbackkey(res, file) {
        this.show_url.call_back_name = res.data.call_back_file
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isLt2M
      },
      // 一键授权
      accredit() {
        window.open('http://activity.lyfz.net/thirdpart/auth-url?merchant_id=' + this.merchant_id)
        this.$confirm('请在新窗口中完成授权', '提示', {
          confirmButtonText: '已完成授权',
          cancelButtonText: '遇到问题请重试',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '授权成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '请在重新完成微信小程序授权'
          })
        })
      },
      // 一键生成key值
      touch() {
        let str = ''
        const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        for (let i = 0; i < 32; i++) {
          const pos = Math.round(Math.random() * (arr.length - 1))
          str += arr[pos]
        }
        this.setting_data.key = str
      }
    },
    mounted() {
      getMerchantInfo()
        .then((result) => {
          this.setting_data = {
            app_id: result.app_id,
            merchant_id: result.merchant_id,
            key: result.key,
            // secret: result.secret,
            cert_path: result.cert_path,
            key_path: result.key_path,
            original_name: [],
            nick_name: result.nick_name,
            signature: result.signature,
            qrcode_url: result.qrcode_url,
            principal_name: result.principal_name,
            activity_merchant_id: result.activity_merchant_id
          }
          const url1 = result.original_name.split(',')
          this.show_url.original_name_shu = url1[0]
          this.show_url.original_name_key = url1[1]
          this.show_url.call_back_name = url1[2]
        })
    }
  }
</script>
