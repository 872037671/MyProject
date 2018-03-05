<template>
  <div>
    <el-main>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>拼团活动列表</span>
          <el-button style="float: right;" type="text" @click="addGroupActivity">添加拼团活动</el-button>
        </div>
        <div>
          <el-table :data="GroupActiveList" border highlight-current-row style="width: 100%">
            <el-table-column prop="createtime" label="创建时间" width="200"></el-table-column>
            <el-table-column prop="name" label="拼团活动标题" width="200"></el-table-column>
            <el-table-column prop="begintime" label="开始时间" width="200"></el-table-column>
            <el-table-column prop="endtime" label="结束时间" width="200"></el-table-column>
            <el-table-column prop="activity_status" label="活动状态" width="120"></el-table-column>
            <el-table-column prop="group_num" label="开团数" width="120"></el-table-column>
            <el-table-column prop="doing_num" label="拼团中" width="120"></el-table-column>
            <el-table-column prop="done_num" label="拼团成功"></el-table-column>
            <el-table-column fixed="right" label="操作" width="200" :filter-method="filterTag" filter-placement="bottom-end">
              <template slot-scope="scope">
                <el-button @click.native.prevent="HrefReport(scope.$index, GroupActiveList)" type="text" size="small">订单报表</el-button>
                <el-button type="text" size="small" @click.native.prevent="bianji(scope.$index, GroupActiveList)">编辑</el-button>
                <el-button type="text" size="small" @click.native.prevent="switchMark(scope.$index, GroupActiveList, scope)">{{scope.row.activity_status}}</el-button>
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
  import { activityList } from '@/api/cutGroup'
  import { deleteActivity } from '@/api/cutGroup'
  import { switchActivity } from '@/api/cutGroup'
  export default {
    data() {
      return {
        GroupActiveList: [],
        activity_type: 1,
        page: 1,
        pagination: {},
        status_num: ''
      }
    },
    methods: {
      changesize(currentPage) {
        this.page = currentPage
        this.refreshList()
      },
      HrefReport(index, data) {
        this.$router.push({ name: 'cutGroupReport', query: { activity_id: data[index].id }})
      },
      // 删除一个活动
      deleteRow(index, data) {
        const activity_id = data[index].id
        deleteActivity({ activity_id })
          .then((result) => {
            this.$message.success(result)
            this.GroupActiveList.splice(index, 1)
          }).catch((result) => {
            this.$message.error(result)
            return
          })
      },
      bianji(index, data) {
        this.$router.push({ name: 'addcutGroup', query: { activity_id: data[index].id, activity_type: 1 }})
      },
      addGroupActivity() {
        this.$router.push({ name: 'addcutGroup', query: { activity_type: 1 }})
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
</style>
