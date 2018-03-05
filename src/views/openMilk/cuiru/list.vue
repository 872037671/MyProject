<template>
  <div class="activitySitting">
    <el-main>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>催乳师列表</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click.native="addActivity">添加催乳师设置</el-button>
        </div>
        <div>
          <el-table :data="listData" border style="width: 100%">
            <el-table-column prop="name" label="催乳师名称" width="200"></el-table-column>
            <el-table-column prop="intro" label="催乳师介绍" width="300"></el-table-column>
            <el-table-column prop="hospital_id" label="医院id" width="200"></el-table-column>
            <el-table-column prop="phone_no" label="催乳师电话" width="200"></el-table-column>
            <el-table-column prop="no" label="催乳师工号" width="200"></el-table-column>
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
  </div>
</template>

<script>
import { getDivisionList, deleteDivision } from '@/api/openMilk'

export default {
  data() {
    return {
      getDivisionListData: {
        page: '1',
        keywords: ''
      },
      listData: [],
      pagination: {}
    }
  },
  methods: {
    addActivity() {
      this.$router.push({ name: 'openMilkAddCuiru' })
    },
    changesize(currentPage) {
      this.getList(currentPage)
    },
    getList(page) {
      getDivisionList({ page, keywords: '' })
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
      this.$router.push({ name: 'openMilkAddCuiru', query: { id: data[index].id }})
    },
    del(index, data) {
      deleteDivision(data[index].id)
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
