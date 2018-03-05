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
        <el-input v-model.trim="addPurchaseData.name"></el-input>
        <el-col :span="8" style="margin:15px 0">
          <el-tag type="success">主题活动名称，展示在屏幕最顶部的信息</el-tag>
        </el-col>
      </el-form-item>
      <!--虚拟参与人数-->
      <el-form-item label="虚拟参与人数">
        <el-input v-model="addPurchaseData.virtual_people_num"></el-input>
        <el-col :span="8" style="margin:15px 0">
          <el-tag type="success">虚拟参与人数，活动展示的参与人数=虚拟参与人数+真实</el-tag>
        </el-col>
      </el-form-item>
      <!--红包数量-->
      <el-form-item label="红包数量">
        <el-input v-model="addPurchaseData.buy_num"></el-input>
        <el-col :span="8" style="margin:15px 0">
          <el-tag type="success">容许发放的红包个数</el-tag>
        </el-col>
      </el-form-item>
      <!--金额上限-->
      <el-form-item label="金额上限">
        <el-input v-model="addPurchaseData.final_price"></el-input>
        <el-col :span="8" style="margin:15px 0">
          <el-tag type="success">超过金额后，系统将不在发红包</el-tag>
        </el-col>
      </el-form-item>
      <!--强制关注-->
      <el-form-item label="强制关注">
        <el-radio v-model="addPurchaseData.focus" label="2">开启</el-radio>
        <el-radio v-model="addPurchaseData.focus" label="1">关闭</el-radio>
      </el-form-item>
      <el-form-item label="商户二维码">
        <el-col :span="24" class="">
          <el-upload
                  class="avatar-uploader"
                  :action="upload_url"
                  :headers="postHeaders"
                  name="img"
                  :show-file-list="false"
                  :on-success="KFAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
            <img v-if="ShowImgUrl.commercial_qrcode" :src="ShowImgUrl.commercial_qrcode" class="avatar">
            <el-button>上传</el-button>
          </el-upload>
        </el-col>
      </el-form-item>
      <!--领取规则-->
      <el-form-item label="领取规则">
        <el-radio v-model="addPurchaseData.get_method" label="1">只容许一次</el-radio>
        <el-radio v-model="addPurchaseData.get_method" label="2">每天容许一次</el-radio>
        <el-radio v-model="addPurchaseData.get_method" label="3">不限制</el-radio>
      </el-form-item>
      <!--派发方式-->
      <el-form-item label="派发方式">
        <el-radio v-model="addPurchaseData.pffs" label="1" @change="sss('1')">固定金额</el-radio>
        <el-radio v-model="addPurchaseData.pffs" label="2" @change="sss('2')">随机金额</el-radio>
      </el-form-item>
      <!--派发方式-->
      <el-form-item>
        <el-row>
          <el-col :span="4">
            <el-input v-model="addPurchaseData.num1" class="input" placeholder="请输入金额" size="medium"></el-input>
          </el-col>
          <div :style="{display: act}">
          <el-col :span="1" style="text-align: center;">
            一
          </el-col>
          <el-col :span="4">
            <el-input v-model="addPurchaseData.num2" class="input" placeholder="请输入金额" size="medium"></el-input>
          </el-col>
          </div>
        </el-row>
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
        <el-col :span="24" style="margin:15px 0">
          <el-tag type="success">活动时间</el-tag>
        </el-col>
      </el-form-item>
      <!--结束时间-->
      <!--<el-form-item label="结束时间">
        <el-input v-model="addPurchaseData.endtime"></el-input>
      </el-form-item>-->
      <el-button style="margin: 0 auto;display: block;" @click="save">保存</el-button>
    </el-form>
  </div>
</template>

<script>
  import { addLBHb } from '@/api/redsplit'
  import { getActivityDetail } from '@/api/redsplit'
  import { getToken } from '@/utils/auth'
  import { UploadUrl } from '@/utils/auth'

  export default {
    prop: ['group_id'],
    data() {
      return {
        upload_url: UploadUrl,
        postHeaders: {
          'X-Token': getToken()
        },
        act: '',
        chooseDate: [],
        addPurchaseData: {
          commercial_qrcode: '',
          name: '',
          virtual_people_num: '',
          buy_num: '',
          final_price: '',
          focus: '2',
          get_method: '1',
          begintime: '',
          endtime: '',
          activity_id: '',
          pffs: '1',
          num1: '',
          num2: ''
        },
        ShowImgUrl: {
          commercial_qrcode: ''
        }
      }
    },
    methods: {
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isLt2M
      },
      // 客服二维码上传成功函数
      KFAvatarSuccess(res, file) {
        this.addPurchaseData.commercial_qrcode = res.data.data.save_url
        this.ShowImgUrl.commercial_qrcode = URL.createObjectURL(file.raw)
      },
      sss(val) {
        if (val === '1') {
          this.act = 'none'
        } else {
          this.act = 'block'
        }
      },
      save() {
        // 判断数据是否合格
        if (this.addPurchaseData.name === '') {
          this.$message.error('活动标题不能为空！')
          return
        }
        if (this.addPurchaseData.virtual_people_num === '' || this.addPurchaseData.virtual_people_num < 0) {
          this.$message.error('请填写参与人数！！')
          return
        }
        if (this.addPurchaseData.buy_num === '' || this.addPurchaseData.buy_num < 0) {
          this.$message.error('请填写红包数量！！')
          return
        }
        if (!this.isRealNum(this.addPurchaseData.num1)) {
          this.$message.error('金额必须为数字且大于0！！')
          return
        }
        if (!this.isRealNum(this.addPurchaseData.num2)) {
          if (this.act === 'none') {
            return
          }
          this.$message.error('金额必须为数字且大于0！！')
          return
        }
        if (this.addPurchaseData.num2 < this.addPurchaseData.num1) {
          if (this.act === 'block') {
            this.$message.error('金额上限不应小于金额下限！！')
            return
          }
        }
        if (this.addPurchaseData.final_price === '') {
          this.$message.error('请填写金额上限！！')
          return
        }
        if (Number(this.addPurchaseData.final_price) < Number(this.addPurchaseData.buy_num)) {
          this.$message.error('金额上限设置有误！')
          return
        }
        if (this.chooseDate[0] === undefined || this.chooseDate[1] === undefined) {
          this.$message.error('请完善您的时间信息！')
          return
        }
        addLBHb(this.addPurchaseData).then((result) => {
          if (result.id) {
            this.group_id = result.id
            this.$router.push({ name: 'redsplitActivity', query: { activity_id: result.id, activity_url: result.activity_url }})
          } else {
            this.$message.error('活动标题已存在！')
          }
        }).catch((result) => {
          this.$message.error(result)
        })
      },
      choose_date(value) {
        this.addPurchaseData.begintime = Date.parse(value[0]) / 1000
        this.addPurchaseData.endtime = Date.parse(value[1]) / 1000
      },
      isRealNum(val) {
        if (val === '' || val === null) {
          return false
        }
        if (!isNaN(val)) {
          return true
        } else {
          return false
        }
      }
    },
    mounted() {
      const activity_id = this.$route.query.activity_id
      if (activity_id) {
        getActivityDetail(activity_id)
          .then((result) => {
            this.addPurchaseData = {
              name: result.name,
              virtual_people_num: result.virtual_people_num,
              buy_num: result.buy_num,
              final_price: result.final_price,
              focus: JSON.stringify(result.focus),
              begintime: result.begintime,
              endtime: result.endtime,
              activity_id: result.id,
              commercial_qrcode: result.commercial_qrcode,
              get_method: JSON.stringify(result.get_method),
              pffs: JSON.stringify(result.pffs),
              num1: result.num1,
              num2: result.num2
            }
            this.ShowImgUrl.commercial_qrcode = result.url_prefix + result.commercial_qrcode
            if (JSON.stringify(result.pffs) === '1') {
              this.act = 'none'
            } else {
              this.act = 'block'
            }
            this.chooseDate = [result.begintime * 1000, result.endtime * 1000]
          })
      }
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
