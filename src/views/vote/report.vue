<template>
  <div>
    <el-main>
      <el-button type="info" @click="backUp">返回投票活动列表</el-button>
      <el-row style="margin: 20px auto;">
        <el-col :span="6" style="display: flex;justify-content: space-between;">
          <el-input v-model="getOrderData.name" placeholder="请输入编号或名字"></el-input>
          <el-button class="el-icon-search" @click="searchButton"></el-button>
        </el-col>
        <el-col :span="6">
          <el-select v-model="selectValue" @change="SelectEvent" placeholder="全部" style="margin-left: 40px;">
            <el-option
              v-for="item in waitPay"
              :key="item.value"
              :label="item.label"
              value-key="value"
              :value="item">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-button size="small" style="margin-right: 15px;" @click="sortEvent">排序</el-button>
          <el-radio v-model="getOrderData.sort" label="1">编号从低到高</el-radio>
          <el-radio v-model="getOrderData.sort" label="2">票数从高到低</el-radio>
        </el-col>
      </el-row>

      <el-table :data="GroupActiveList" border style="width: 100%">
        <el-table-column prop="NO" label="编号" width="150"></el-table-column>
        <el-table-column prop="name" label="名称" width="350"></el-table-column>
        <el-table-column prop="phone_no" label="手机号" width="120"></el-table-column>
        <el-table-column prop="received_votes" label="投票数" width="120"></el-table-column>
        <el-table-column prop="activity_status" label="状态"></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click.native.prevent="customer_method(scope.$index, GroupActiveList)">客户详情</el-button>
            <el-button @click.native.prevent="deleteReport(scope.$index, GroupActiveList)" type="text" size="small">删除</el-button>
            <el-button @click.native.prevent="checkToupiao(scope.$index, GroupActiveList)" type="text" size="small">审核</el-button>
          </template>
        </el-table-column>
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

    <!-- 客户详情弹框 -->
    <el-dialog
      title="客户详情"
      :visible.sync="customer.customer_more"
      width="40%">
      <el-form label-width="100px" label-position="left">
        <el-form-item label="客户姓名">
          <el-input v-model="customer.customer_data.name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="客户电话">
          <el-input v-model="customer.customer_data.phone_no" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="所属活动">
          <el-input v-model="customer.customer_data.acitvity_name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="总票数">
          <el-input v-model="customer.customer_data.all_votes" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="虚拟票数">
          <el-input v-model="customer.customer_data.virtual_votes"></el-input>
        </el-form-item>
        <el-form-item label="实际票数">
          <el-input v-model="customer.customer_data.received_votes"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="customer.customer_data.desc" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" style="display:flex;justify-content:center">
        <el-button @click="customer.customer_more = false">取 消</el-button>
        <el-button type="primary" @click="customer_save">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { getTPList } from '@/api/vote'
  import { getTpDetail } from '@/api/vote'
  import { deleteTpUser } from '@/api/vote'
  import { saveTpDetail } from '@/api/vote'
  import { checkToupiao } from '@/api/vote'

  export default {
    data() {
      return {
        customer: {
          customer_more: false,
          customer_more_save_id: '',
          customer_data: {}
        },
        pagination: {},
        activity_id: '',
        GroupActiveList: [],
        selectValue: '全部',
        waitPay: [{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '未审核'
        }],
        getOrderData: {
          activity_id: '',
          page: 1,
          status: '',
          sort: '1',
          name: '',
          is_check: ''
        }
      }
    },
    methods: {
      backUp() {
        this.$router.push({ name: 'vote' })
      },
      changesize(currentPage) {
        this.getOrderData.page = currentPage
        this.GroupActiveList = []
        this.getTPList()
      },
      deleteReport(index, data) {
        deleteTpUser({ id: data[index].orderid })
          .then((result) => {
            this.GroupActiveList.splice(index, 1)
          }).catch((result) => {
            this.$message.error(result)
          })
      },
      // 审核
      checkToupiao(index, data) {
        const that = this
        let type = ''
        if (data[index].activity_status === '未审核') {
          type = 1
          checkMethod(data[index].orderid, type)
        }
        if (data[index].activity_status === '已审核') {
          type = 2
          checkMethod(data[index].orderid, type)
        }
        if (data[index].activity_status === '不需要审核') {
          this.$message.error('不需要审核')
        }
        function checkMethod(t_id, type) {
          checkToupiao({ t_id, type })
            .then((result) => {
              that.GroupActiveList = []
              that.getTPList()
            })
        }
      },
      // 客户详情
      customer_method(index, data) {
        this.customer.customer_data = {}
        this.customer.customer_more = true
        this.customer_more_save_id = data[index].orderid
        getTpDetail({ id: data[index].orderid })
          .then((result) => {
            this.customer.customer_data = result
            this.customer.customer_data.all_votes = result.virtual_votes + result.received_votes
          })
      },
      // 保存客户详情
      customer_save() {
        const all_votes = Number(this.customer.customer_data.virtual_votes) + Number(this.customer.customer_data.received_votes)
        saveTpDetail({ id: this.customer_more_save_id, votes: all_votes, desc: this.customer.customer_data.desc })
        this.customer.customer_more = false
      },
      SelectEvent(value) {
        console.log(value.value)
        this.GroupActiveList = []
        this.getOrderData.is_check = value.value
        this.getTPList()
      },
      // 排序
      sortEvent() {
        this.GroupActiveList = []
        this.getTPList()
      },
      searchButton() {
        this.GroupActiveList = []
        this.getTPList()
      },
      getTPList() {
        this.getOrderData.activity_id = this.$route.query.activity_id
        this.getOrderData.keywords = this.searchModel
        getTPList(this.getOrderData)
          .then((result) => {
            result.data_list.length === 0 ? this.$message.error('抱歉暂无数据！') : ''
            for (const val of result.data_list) {
              this.GroupActiveList.push({
                NO: val.NO,
                name: val.name,
                phone_no: val.phone_no,
                received_votes: val.received_votes,
                activity_status: val.activity_status,
                orderid: val.id
              })
            }
            this.pagination = result.page_data
          })
      }
    },
    mounted() {
      this.getTPList()
    }
  }
</script>

<style>
</style>
