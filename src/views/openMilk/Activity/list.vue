<template>
  <div class="activitySitting">
    <el-main>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>活动列表</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click.native="addActivity">添加活动</el-button>
        </div>
        <div>
          <el-table :data="listData" border style="width: 100%">
            <el-table-column prop="title" label="活动名" width="200"></el-table-column>
            <el-table-column prop="activity_url" label="活动链接" width="200"></el-table-column>
            <el-table-column label="二维码链接" width="300">
              <template slot-scope="scope">
                <img style="display:block;margin:auto" width=100 :src="scope.row.activity_qrcode" alt="">
              </template>
            </el-table-column>
            <el-table-column prop="createtime" label="创建时间" width="200"></el-table-column>
            <el-table-column prop="detail" label="活动介绍" width="200"></el-table-column>
            <el-table-column prop="title" label="首页介绍语句" width="200"></el-table-column>
            <el-table-column prop="service" label="赠送条件达标名称" width="100"></el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope" :filter-method="filterTag" filter-placement="bottom-end">
                <el-button type="text" size="small" @click.native.prevent="orderList(scope.$index, listData)">订单列表</el-button>
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
  </div>
</template>

<script>
import { getCommunityActivityList, deleteCommunityActivity } from '@/api/openMilk'

export default {
  data() {
    return {
      listData: [],
      pagination: {}
    }
  },
  methods: {
    addActivity() {
      this.$router.push({ name: 'addActivity' })
    },
    changesize(currentPage) {
      this.getList(currentPage)
    },
    getList(currentPage) {
      getCommunityActivityList(currentPage)
        .then((result) => {
          this.pagination = {
            per_page: result.per_page,
            page: result.current_page,
            total: result.total
          }
          this.listData = result.data
        })
    },
    del(index, data) {
      deleteCommunityActivity(data[index].id)
        .then((result) => {
          this.listData.splice(index, 1)
        })
    },
    orderList(index, data) {
      this.$router.push({ name: 'openMilkOrderList' })
    },
    bianji(index, data) {
      this.$router.push({ name: 'addActivity', query: { id: data[index].id }})
    }
  },
  mounted() {
    this.getList()
  }
}
</script>

<style>

</style>
