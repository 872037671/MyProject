<template>
  <div class="UploadImg">
    <el-dialog
      title=""
      :visible.sync="activityJieshao"
      width="50%"
      :before-close="handleClose"
      class="main-box">

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>我的图片</span>
          <el-button style="float: right;margin-right:30px" type="success" size="small" @click="shanchaun" >上传图片</el-button>
          <el-button style="float: right;margin-right:10px" type="danger" size="small" @click="buttonHide = !buttonHide">删除图片</el-button>
        </div>
        <div class="content">
          <ul>
          	<li v-for="(item, index) in AllImgList" @click="clickMoreChoose(item, index)" :key="index">
          	  <img :src="item.imgUrl"/>
          	  <p>{{item.original_name}}</p>
          	  <i v-if="item.checked" class="icon-check"></i>
          	  <el-button v-if="buttonHide" size="small" @click.native="deleteLiImg(item.id, index)">删除</el-button>
          	</li>
          </ul>
        </div>
        <!--<div class="pages" style="padding: 30px 0;text-align: center;border-bottom: 1px solid #E6EBF5;">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
          </el-pagination>
        </div>-->
        <div class="footer">
          <span slot="footer" class="dialog-footer">
            <el-button style="margin-right:30px" size="small" type="success" @click="trueChoose">确定选择图片</el-button>
            <el-button size="small" type="warning" @click="activityJieshao = false">关闭</el-button>
          </span>
        </div>
      </el-card>
    </el-dialog>

    <el-dialog
      title="上传新图片"
      :visible.sync="UploadImgBlooen"
      width="50%"
      :before-close="handleClose">
      <div class="main-center">
        <el-upload
          class="upload-demo"
          drag
          :show-file-list="true"
          :action="upload_url"
          :on-success="NewImgAvatarSuccess"
          :on-preview="handlePreview"
          :headers="postHeaders"
          multiple>
          <i class="el-icon-upload" v-if="beginUpload"></i>
          <img v-if="!beginUpload" style="width: 20%;margin: 5px 2%;" v-for="item in UploadImgList" :src="item.imgUrl" alt="" />
          <div v-if="UploadImgList.length === 0" class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div style="color: orangered;" v-if="beginUpload">已选{{UploadImgList.length}}张图片，请点击下方按钮进行上传！</div>
        </el-upload>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="backTopGo">返回上级</el-button>
        <el-button type="primary" @click="yulanImg">预览</el-button>
        <el-button type="success" @click="confirm">确 定选择</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import { uploadedPics } from '@/api/groupOn'
  import { getToken } from '@/utils/auth'
  import { deleteImg } from '@/api/groupOn'
  import { UploadUrl } from '@/utils/auth'

  export default {
    data() {
      return {
        postHeaders: {
          'X-Token': getToken()
        },
        upload_url: UploadUrl,
        buttonHide: false,
        beginUpload: true,
        activityJieshao: false,
        UploadImgBlooen: false,
        UploadImgList: [],
        saveUrl: [],
        AllImgList: [],
        MoreList: [],
        activity_type: '',
        check_img_arr: []
      }
    },
    methods: {
      // 多选功能
      clickMoreChoose(item, index) {
        item.checked = !item.checked
        if (item.checked) {
          this.check_img_arr.push({ checked: item.checked, id: item.id, imgUrl: item.imgUrl, original_name: item.original_name, save_url: item.save_url })
        } else {
          for (const [index, check_val] of this.check_img_arr.entries()) {
            if (check_val.id === item.id) {
              this.check_img_arr.splice(index, 1)
            }
          }
        }
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      },
      // 上传完回调
      handlePreview(file) {
        console.log(file)
      },
      uploadImgModel() {
        this.activityJieshao = true
        this.check_img_arr = []
        this.buttonHide = false
        uploadedPics()
          .then((result) => {
            for (const val of result) {
              this.AllImgList.push({ imgUrl: val.absolute_url, save_url: val.save_url, original_name: val.original_name, id: val.id, checked: false })
            }
          })
      },
      // 确定选择
      trueChoose() {
        this.activityJieshao = false
        for (const val of this.check_img_arr) {
          if (val.checked) {
            this.MoreList.push({ imgUrl: val.imgUrl, save_url: val.save_url, id: val.id })
          }
        }
        this.$emit('clickMoreChoose', this.MoreList)
        for (const check_val of this.AllImgList) {
          check_val.checked = false
        }
        this.MoreList = []
      },
      NewImgAvatarSuccess(res, file) {
        this.UploadImgList.push({ imgUrl: res.data.data.img_url, save_url: res.data.data.save_url, original_name: res.data.data.original_name, id: res.data.data.id, checked: false })
        this.saveUrl.push(res.data.data.save_url)
      },
      confirm() {
        this.UploadImgBlooen = false
        this.activityJieshao = true
        for (const val of this.UploadImgList) {
          this.AllImgList.unshift({ imgUrl: val.imgUrl, save_url: val.save_url, original_name: val.original_name, id: val.id, checked: false })
        }
      },
      yulanImg() {
        this.beginUpload = false
      },
      // 上传图片
      shanchaun() {
        this.beginUpload = true
        this.UploadImgList = []
        this.activityJieshao = false
        this.UploadImgBlooen = true
      },
      // 返回上级
      backTopGo() {
        this.UploadImgBlooen = false
        this.activityJieshao = true
      },
      // 删除图片
      deleteLiImg(id, index) {
        deleteImg({ id, activity_type: this.activity_type })
          .then((result) => {
          })
        this.AllImgList.splice(index, 1)
      }
    },
    mounted() {
      this.activity_type = this.$route.query.activity_type
    }
  }
</script>

<style lang="scss">
  .icon-check{
    position: absolute;
    top: 0%;
    left: 0%;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 50%;
    height: 50%;
    background: url('../../assets/bg_img/checkbox-yes.png') center no-repeat;
    background-size: contain;
    display: block;
  }
  .main-box .el-dialog__header{
    padding: 0;
  }
  .main-box .el-dialog__body{
    padding: 0 !important
  }
  .main-box .has-gutter{
    display: none;
  }
  .main-box .footer .dialog-footer button{
    float: right;
    margin: 5px 8px;
  }
  .content{
    overflow: hidden;
    overflow-y: scroll;
    padding: 0;
    height: 300px;
    li{
      float: left;
      width: 18%;
      list-style: none;
      margin: 8px 1%;
      height: 130px;
      overflow: hidden;
      position: relative;
      padding-bottom: 24px;
      background: #F6F6F6;
      cursor: pointer;
      img{
        width: 100%;
        display: block;
      }
      p{
        position: absolute;
        width: 100%;
        color: #333;
        text-align: center;
        line-height: 30px;
        overflow: hidden;
        margin: 0;
        padding: 0;
        bottom: 0;
        text-overflow: ellipsis;
        white-space: nowrap;
        background: #F6F6F6;
      }
      button{
        display: block;
        position: absolute;
        bottom: 30px;
        left: 30%;
        right: 0;
      }
    }
  }
  .main-center .upload-demo .el-upload--text{
    width: 100%;
    .el-upload-dragger{
      width: 100%;
      display: block;
    }
  }
</style>
