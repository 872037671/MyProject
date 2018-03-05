<template>
  <div class="UploadMusic">
    <el-dialog
      title=""
      :visible.sync="activityMusic"
      width="50%"
      :before-close="handleClose"
      class="main-box">

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <!-- <el-button size="small">我的上传音乐</el-button> -->
          <el-button style="float: right;margin-right:30px" type="success" size="small" @click="UploadMusicIn">上传音乐</el-button>
          <el-button style="float: right;margin-right:10px" type="danger" size="small" @click="buttonHide = !buttonHide">删除音乐</el-button>
        </div>
        <div class="content">
          <ul>
            <li class="li" v-for="(item, index) in getMusicData" @click="chooseLi(item)">
              <audio :src="item.absolute_url" width="200" height=45 style="margin: 5px 2%;" loop="false" controls/>
              <p>{{item.original_name}}</p>
              <i v-if="item.check" class="icon-check-music"></i>
              <el-button @click="delete_list_Music(item.id, index)" v-if="buttonHide" size="small">删除</el-button>
            </li>
          </ul>
        </div>
        <div class="footer">
          <span slot="footer" class="dialog-footer">
            <el-button style="margin-right:30px" @click="addChoose" size="small" type="success">确定选择音乐</el-button>
            <el-button @click="closeAll" size="small" type="warning">关闭</el-button>
          </span>
        </div>
      </el-card>
    </el-dialog>

    <el-dialog
      title="上传新图片"
      :visible.sync="UploadMusicBlooen"
      width="50%"
      :before-close="handleClose">
      <div class="main-center">
        <el-upload
          class="upload-demo"
          drag
          :show-file-list="true"
          :action="upload_url"
          :on-success="NewImgAvatarSuccess"
          :headers="postHeaders"
          multiple>
          <i class="el-icon-upload" v-if="beginUpload"></i>
          <div v-for="item in MusicResult" style="width: 100%;overflow: hidden;">
            <el-tag v-if="!beginUpload" style="float: left;margin: 5px;">{{item.original_name}}</el-tag>
            <audio v-if="!beginUpload" :src="item.img_url" width="200" style="margin: 5px 2%;float: left;" height=45 loop="false" controls />
          </div>
          <div v-if="MusicResult.length === 0" class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div style="color: orangered;" v-if="beginUpload">已选{{MusicResult.length}}张音乐，请点击下方按钮进行上传！</div>
        </el-upload>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="backTop">返回上级</el-button>
        <el-button v-if="beginUpload" @click="yulanShow" type="primary">预览</el-button>
        <el-button @click="trueChoose" type="success">确 定选择</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import { getToken } from '@/utils/auth'
  import { uploadedMusic } from '@/api/groupOn'
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
        activityMusic: false,
        UploadMusicBlooen: false,
        MusicResult: [],
        getMusicData: [],
        moreList: ''
      }
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      },
      uploadImgModel() {
        this.activityMusic = true
      },
      NewImgAvatarSuccess(res, file) {
        this.MusicResult.push({ id: res.data.data.id, img_url: res.data.data.img_url, original_name: res.data.data.original_name, save_url: res.data.data.save_url, check: false })
      },
      /* 上传音乐 */
      UploadMusicIn() {
        this.UploadMusicBlooen = true
        this.activityMusic = false
      },
      /* 确定选择 */
      trueChoose() {
        this.activityMusic = true
        this.UploadMusicBlooen = false
        for (const val of this.MusicResult) {
          this.getMusicData.push({ id: val.id, absolute_url: val.img_url, original_name: val.original_name, save_url: val.save_url, check: false })
        }
      },
      /* 预览 */
      yulanShow() {
        this.beginUpload = false
      },
      /* 返回上级 */
      backTop() {
        this.activityMusic = true
        this.beginUpload = true
      },
      /* 选择文件 */
      chooseLi(item) {
        for (const val of this.getMusicData) {
          val.check = false
        }
        item.check = !item.check
      },
      /* 删除当前列表的音乐 */
      delete_list_Music(id, index) {
        this.getMusicData.splice(index, 1)
        deleteImg({ id })
          .then((result) => {
            console.log(result)
          })
      },
      /* 把选择的音乐加入到 getMusicData*/
      addChoose() {
        this.activityMusic = false
        this.UploadMusicBlooen = false
        for (const val of this.getMusicData) {
          if (val.check) {
            this.moreList = { absolute_url: val.absolute_url, id: val.id, save_url: val.save_url, original_name: val.original_name }
          }
        }
        this.$emit('clickMoreChoose', this.moreList)
      },
      /* 关闭所有 */
      closeAll() {
        this.activityMusic = false
        this.UploadMusicBlooen = false
      }
    },
    mounted() {
      uploadedMusic()
        .then((result) => {
          for (const val of result) {
            this.getMusicData.push({ absolute_url: val.absolute_url, id: val.id, original_name: val.original_name, save_url: val.save_url, check: false })
          }
        })
    }
  }
</script>

<style lang="scss">
  .icon-check-music{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 99%;
    height: 100%;
    border: 5px solid #33acb4;
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
    .li{
      width: 100%;
      float: none;
      list-style: none;
      margin: 8px 1%;
      position: relative;
      padding-bottom: 24px;
      background: #F6F6F6;
      cursor: pointer;
      img{
        width: 100%;
        height: 80px;
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
      }
      button{
        margin: 5px auto;
        display: block;
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
