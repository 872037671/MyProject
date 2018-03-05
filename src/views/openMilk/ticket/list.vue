<template>
  <div class="activitySitting">
    <el-main>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>卡券列表</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click.native="addCard">添加卡券设置</el-button>
        </div>
        <div>
          <el-table :data="listData" border style="width: 100%">
            <el-table-column prop="price" label="卡券价格" width="200"></el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope" :filter-method="filterTag" filter-placement="bottom-end">
                <el-button type="text" size="small" @click.native.prevent="bianji(scope.$index, listData)">编辑</el-button>
                <el-button type="text" size="small" @click.native.prevent="del(scope.$index, listData)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <!--分页-->
          <el-pagination
            class="pages"
            background
            :page-size="pagination.per_page"
            layout="prev, pager, next"
            :current-page="pagination.page"
            :total="pagination.total"
            @current-change="changesize">
          </el-pagination>

        </div>
      </el-card>
    </el-main>

    <el-dialog
      title="提示"
      :visible.sync="hos_status"
      width="50%">
      <el-card class="box-card">
        <el-form label-width="120px" label-position="left">
          <!--首页介绍图片-->
          <el-form-item label="首页介绍图片">
            <el-col :span="24" class="">
              <el-upload
                class="avatar-uploader"
                :action="upload_url"
                :headers="postHeaders"
                :show-file-list="false"
                :on-success="ticketSuccess">
                <img style="max-width: 100px" v-if="ShowImgUrl.pic" :src="ShowImgUrl.pic" class="avatar">
                <el-button style="display: block">上传</el-button>
              </el-upload>
            </el-col>
          </el-form-item>

          <el-form-item label="卡券价格">
            <el-input v-model="cardSetting.price"></el-input>
          </el-form-item>
        </el-form>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">保存</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
import { UploadUrl6 } from '@/utils/auth'
import { getToken } from '@/utils/auth'
import { cardSetting } from '@/api/openMilk'
import { getBackendCardList } from '@/api/openMilk'
import { getCardDetail, deleteCard } from '@/api/openMilk'

export default {
  data() {
    return {
      postHeaders: {
        'X-Token': getToken()
      },
      upload_url: UploadUrl6,
      pagination: {},
      hos_status: false,
      listData: [],
      page: '1',
      ShowImgUrl: {
        pic: ''
      },
      cardSetting: {
        pic: '',
        price: '',
        id: ''
      }
    }
  },
  methods: {
    addCard() {
      this.ShowImgUrl.pic = ''
      this.cardSetting.price = ''
      this.cardSetting.id = ''
      this.hos_status = true
    },
    ticketSuccess(res, file) {
      this.ShowImgUrl.pic = URL.createObjectURL(file.raw)
      this.cardSetting.pic = res.data.save_url
    },
    changesize(currentPage) {
      this.getList(currentPage)
    },
    save() {
      this.hos_status = false
      cardSetting(this.cardSetting)
        .then((result) => {
          this.getList(this.pagination.page)
          this.cardSetting.pic = ''
          this.cardSetting.price = ''
        })
    },
    getList() {
      getBackendCardList({ page: this.page })
        .then((result) => {
          this.pagination = {
            per_page: result.per_page,
            page: result.current_page,
            total: result.total
          }
          this.listData = result.data
        })
    },
    bianji(index, data) {
      this.cardSetting.id = data[index].id
      this.getCardDetail = []
      this.hos_status = true
      getCardDetail(data[index].id)
        .then((result) => {
          this.ShowImgUrl.pic = result.pic_prefix + result.pic
          this.cardSetting = result
          this.getList()
        })
    },
    del(index, data) {
      deleteCard(data[index].id)
        .then((result) => {
          this.listData.splice(index, 1)
        })
    }
  },
  mounted() {
    this.getList()
  }
}
</script>

<style>

</style>
