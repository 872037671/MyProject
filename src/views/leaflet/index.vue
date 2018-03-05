<template>
  <div>
    <el-main>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>微传单列表</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="addGroupActivity">添加微传单活动</el-button>
        </div>
        <div>
          <el-table :data="GroupActiveList" border style="width: 100%">
            <el-table-column prop="createtime" label="创建时间" width="200"></el-table-column>
            <el-table-column prop="name" label="微传单活动标题" width="300"></el-table-column>
            <el-table-column prop="begintime" label="开始时间" width="200"></el-table-column>
            <el-table-column prop="endtime" label="结束时间" width="200"></el-table-column>
            <el-table-column prop="activity_status" label="活动状态" width="200"></el-table-column>
            <el-table-column prop="view_num" label="代言人数" width="100"></el-table-column>
            <el-table-column prop="people_num" label="总阅读量" width="100"></el-table-column>
            <el-table-column prop="people_num" label="总集赞数" width="100"></el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope" :filter-method="filterTag" filter-placement="bottom-end">
                <el-button @click.native.prevent="HrefReport(scope.$index, GroupActiveList)" type="text" size="small">代言报表</el-button>
                <el-button type="text" size="small" @click.native.prevent="bianji(scope.$index, GroupActiveList)">编辑</el-button>
                <el-button type="text" size="small" @click.native.prevent="switchMark(scope.$index, GroupActiveList, scope)">开启</el-button>
                <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, GroupActiveList)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <el-pagination
            class="pages"
            background
            :page-size="pagination.rows_num"
            layout="prev, pager, next"
            :current-page="pagination.page"
            :total="pagination.count"
            @current-change="changesize">
          </el-pagination>
        </div>
      </el-card>
    </el-main>
  </div>
</template>

<script>
  import { activityList } from '@/api/groupOn'
  import { deleteActivity } from '@/api/groupOn'
  import { switchActivity } from '@/api/groupOn'
  export default {
    data() {
      return {
        GroupActiveList: [],
        activity_type: 0,
        page: 1,
        pagination: {}
      }
    },
    methods: {
      HrefReport(index, data) {
        this.$router.push({ name: 'grouponReport', query: { activity_id: data[index].id }})
      },
      changesize(currentPage) {
        this.refreshList()
      },
      // 删除一个活动
      deleteRow(index, data) {
        const activity_id = data[index].id
        deleteActivity({ activity_id })
          .then((result) => {
            this.$message({ message: '删除成功', type: 'success' })
            this.GroupActiveList.splice(index, 1)
          }).catch((result) => {
            this.$message.error(result)
          })
      },
      bianji(index, data) {
        this.$router.push({ name: 'addGroupon', query: { activity_id: data[index].id }})
      },
      addGroupActivity() {
        this.$router.push({ name: 'addLeaflet' })
      },
      filterTag(value, row) {
        console.log(12)
        return row.tag === value
      },
      switchMark(index, data, scope) {
        if (this.GroupActiveList[index].activity_status === '暂停中') {
          this.status_num = '1'
        } else {
          this.status_num = '0'
        }
        switchActivity({ status: this.status_num, activity_id: data[index].id })
          .then((result) => {
            this.refreshList()
          })
      },
      refreshList() {
        this.GroupActiveList = []
        activityList(this.activity_type, this.page)
          .then((result) => {
            for (const groupon_list of result.data_list) {
              this.GroupActiveList.push(groupon_list)
            }
            this.pagination = result.page_data
          })
      }
    },
    mounted() {
      this.refreshList()
    }
  }
</script>

<style lang="scss">
  .pages{
    margin: 50px auto;
    text-align: center;
  }
  .el-table_1_column_8   is-hidden{
    display: none;
  }
</style>
