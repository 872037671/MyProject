<template>
  <div class="orderList">
    <el-main>
      <el-button type="info" @click="backUp" style="margin: 20px 0">返回活动列表</el-button>
      <el-card class="box-card">
        <div>
          <el-table :data="listData" border style="width: 100%">
            <el-table-column prop="order_id" label="编号" width="200"></el-table-column>
            <el-table-column prop="price" label="金额" width="200"></el-table-column>
            <el-table-column prop="paid" label="已支付" width="200"></el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope" :filter-method="filterTag" filter-placement="bottom-end">
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
import { getOrderList } from '@/api/openMilk'

export default {
  data() {
    return {
      get_data: {
        status: '',
        keywords: '',
        page: '1'
      },
      pagination: {},
      listData: []
    }
  },
  methods: {
    backUp() {
      this.$router.push({ name: 'openMilk' })
    },
    del(index, data) {
      console.log(data[index])
    },
    changesize(currentPage) {
      this.get_data.page = currentPage
      this.getOrderList()
    },
    getOrderList() {
      getOrderList(this.get_data)
        .then((result) => {
          this.pagination = {
            per_page: result.per_page,
            page: result.current_page,
            total: result.total
          }
          this.listData = result.data
        })
    }
  },
  mounted() {
    this.getOrderList()
  }
}
</script>

<style>

</style>
