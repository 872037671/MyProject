<template>
  <div class="UploadTicket">
    <!-- 弹框 -->
    <el-dialog
      title="选择卡券"
      :visible.sync="dialogVisible"
      width="60%">

      <!-- 图片列表区域 -->
      <el-card class="box-card">
        <div class="content">
          <ul>
          	<li v-for="(item, index) in ticket_tist_data" @click="clickMoreChoose(item, index)" :key="index">
          	  <img :src="item.pic_prefix + item.pic"/>
          	  <i v-if="item.checked" class="icon-check"></i>
          	</li>
          </ul>
        </div>
      </el-card>
      <!-- 图片列表区域 -->

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="trueEmit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 弹框 -->

  </div>
</template>

<script>
  import { getToken } from '@/utils/auth'
  import { UploadUrl } from '@/utils/auth'
  import { getBackendAllCardList } from '@/api/openMilk'

  export default {
    data() {
      return {
        postHeaders: {
          'X-Token': getToken()
        },
        upload_url: UploadUrl,
        dialogVisible: false,
        ticket_tist_data: [],
        check_img_arr: []
      }
    },
    methods: {
      // 多选功能
      clickMoreChoose(item, index) {
        item.checked = !item.checked
        if (item.checked) {
          this.check_img_arr.push({ checked: item.checked, id: item.id, pic: item.pic, pic_prefix: item.pic_prefix, price: item.price })
        } else {
          for (const [index, check_val] of this.check_img_arr.entries()) {
            if (check_val.id === item.id) {
              this.check_img_arr.splice(index, 1)
            }
          }
        }
      },
      uploadImgModel() {
        this.getTicket()
        this.dialogVisible = true
      },
      getTicket() {
        const that = this
        this.ticket_tist_data = []
        this.check_img_arr = []
        getBackendAllCardList()
          .then((result) => {
            if (result) {
              for (const val of result) {
                this.ticket_tist_data.push({ id: val.id, pic: val.pic, pic_prefix: val.pic_prefix, price: val.price, checked: false })
              }
            } else {
              that.$message.error('卡券获取失败！')
            }
          })
      },
      // 确定
      trueEmit() {
        this.dialogVisible = false
        this.$emit('clickMoreChoose', this.check_img_arr)
      }
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
</style>
