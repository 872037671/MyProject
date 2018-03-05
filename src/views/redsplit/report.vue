<template>
  <div>
    <el-main>
      <el-button type="info" @click="backUp">返回裂变红包活动列表</el-button>
      <el-row style="margin: 20px auto;">
        <el-col :span="6" style="display: flex;justify-content: space-between;">
          <el-input v-model="searchModel" placeholder="搜索"></el-input>
          <el-button class="el-icon-search" @click="searchButton"></el-button>
        </el-col>
      </el-row>

      <el-table :data="GroupActiveList" border style="width: 901px">
        <el-table-column prop="create_time" label="领取时间" width="300"></el-table-column>
        <el-table-column prop="hongbao" label="领取的金额" width="300"></el-table-column>
        <el-table-column prop="nickname" label="微信名称" width="300"></el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination
        style="margin: 50px auto;text-align: center;"
        background
        :page-size="pagination.rows_num"
        :current-page="getOrderData.page"
        :total="pagination.count"
        layout="prev, pager, next"
        @current-change="changesize">
      </el-pagination>

    </el-main>
  </div>
</template>

<script>
  import { getLBOrderList } from '@/api/redsplit'

  export default {
    data() {
      return {
        activity_id: '',
        pagination: {},
        GroupActiveList: [],
        searchModel: '',
        selectValue: '全部',
        getOrderData: {
          activity_id: '',
          page: 1,
          keywords: ''
        }
      }
    },
    methods: {
      backUp() {
        this.$router.push({ name: 'redsplit' })
      },
      changesize(currentPage) {
        this.getOrderData.page = currentPage
        this.GroupActiveList = []
        this.getPurchaseOrder()
      },
      searchButton() {
        this.GroupActiveList = []
        this.getOrderData.keywords = this.searchModel
        this.getPurchaseOrder()
      },
      getPurchaseOrder() {
        this.getOrderData.activity_id = this.$route.query.activity_id
        this.getOrderData.keywords = this.searchModel
        getLBOrderList(this.getOrderData)
          .then((result) => {
            result.data_list.length === 0 ? this.$message.error('抱歉暂无数据！') : ''
            console.log(result)
            for (const val of result.data_list) {
              this.GroupActiveList.push({
                create_time: val.create_time,
                hongbao: val.hongbao,
                nickname: val.nickname
              })
            }
          })
      }
    },
    mounted() {
      this.getPurchaseOrder()
    }
  }
</script>

<style>
</style>
