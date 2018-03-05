<template>
  <div>
    <el-main>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>秒杀活动列表</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="addGroupActivity">添加秒杀活动</el-button>
        </div>
        <div>
          <el-table :data="GroupActiveList" border style="width: 100%">
            <el-table-column prop="createtime" label="创建时间" width="200"></el-table-column>
            <el-table-column prop="name" label="秒杀活动标题" width="300"></el-table-column>
            <el-table-column prop="begintime" label="开始时间" width="200"></el-table-column>
            <el-table-column prop="endtime" label="结束时间" width="200"></el-table-column>
            <el-table-column prop="activity_status" label="活动状态" width="200"></el-table-column>
            <el-table-column prop="num" label="已下单数" width="100"></el-table-column>
            <el-table-column prop="now_num" label="剩余名额" width="100"></el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope" :filter-method="filterTag" filter-placement="bottom-end">
                <el-button @click.native.prevent="HrefReport(scope.$index, GroupActiveList)" type="text" size="small">秒杀报表</el-button>
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
  import { activityList } from '@/api/secKill'
  import { deleteActivity } from '@/api/secKill'
  import { switchActivity } from '@/api/secKill'
  export default {
    data() {
      return {
        GroupActiveList: [],
        activity_type: 4,
        page: 1,
        pagination: {}
      }
    },
    methods: {
      HrefReport(index, data) {
        this.$router.push({ name: 'seckillReport', query: { activity_id: data[index].id }})
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
            return
          })
      },
      bianji(index, data) {
        this.$router.push({ name: 'addSeckill', query: { activity_id: data[index].id }})
      },
      addGroupActivity() {
        this.$router.push({ name: 'addSeckill' })
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
            console.log(result)
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
