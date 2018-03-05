<template>
  <div>
    <el-main>
      <el-button type="info" @click="backUp">返回秒杀活动列表</el-button>
      <el-row style="margin: 20px auto;">
        <el-col :span="6" style="display: flex;justify-content: space-between;">
          <el-input v-model="searchModel" placeholder="搜索"></el-input>
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
      </el-row>

      <el-table :data="GroupActiveList" border style="width: 100%">
        <el-table-column prop="orderid" label="订单号" width="150"></el-table-column>
        <el-table-column prop="name" label="客户姓名" width="120"></el-table-column>
        <el-table-column prop="phone_no" label="客户电话" width="120"></el-table-column>
        <el-table-column prop="price" label="支付情况" width="120"></el-table-column>
        <el-table-column prop="paid" label="欠款" width="120"></el-table-column>
        <el-table-column prop="desc" label="备注"></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click.native.prevent="deleteReport(scope.$index, GroupActiveList)" type="text" size="small">删除</el-button>
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
  </div>
</template>

<script>
  import { getMSOrderList } from '@/api/secKill'
  import { delOrder } from '@/api/secKill'

  export default {
    data() {
      return {
        customer: {
          customer_more: false,
          customer_more_save_id: '',
          customer_data: {},
          customer_select_value: '到店兑换',
          customer_select: [
            {
              value: '1',
              label: '到店兑换'
            },
            {
              value: '2',
              label: '已发快递'
            }
          ]
        },
        pagination: {},
        activity_id: '',
        GroupActiveList: [],
        searchModel: '',
        selectValue: '全部',
        waitPay: [{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '已填资料（未支付）'
        }, {
          value: '2',
          label: '团购中'
        }, {
          value: '3',
          label: '团购结束（待付全款） '
        }, {
          value: '4',
          label: '团购结束（待核销）'
        }, {
          value: '5',
          label: '完成 '
        }, {
          value: '10',
          label: '已退款'
        }, {
          value: '11',
          label: '已补款'
        }, {
          value: '12',
          label: '欠款'
        }],
        getOrderData: {
          activity_id: '',
          page: 1,
          keywords: '',
          status: ''
        }
      }
    },
    methods: {
      backUp() {
        this.$router.push({ name: 'seckill' })
      },
      changesize(currentPage) {
        this.getOrderData.page = currentPage
        this.GroupActiveList = []
        this.getGroupOrderLists()
      },
      deleteReport(index, data) {
        const activity_id = this.getOrderData.activity_id
        delOrder({ activity_id, order_id: data[index].id })
          .then((result) => {
            this.$message.success('删除成功')
            this.GroupActiveList.splice(index, 1)
          }).catch((result) => {
            this.$message.error(result)
          })
      },
      SelectEvent(value) {
        this.GroupActiveList = []
        this.getOrderData.status = value.value
        this.getMSOrderList()
      },
      searchButton() {
        this.GroupActiveList = []
        this.getMSOrderList()
      },
      getMSOrderList() {
        this.getOrderData.activity_id = this.$route.query.activity_id
        this.getOrderData.keywords = this.searchModel
        getMSOrderList(this.getOrderData)
          .then((result) => {
            result.data_list.length === 0 ? this.$message.error('抱歉暂无数据！') : ''
            console.log(result)
            for (const val of result.data_list) {
              this.GroupActiveList.push({
                orderid: val.orderid,
                status: val.status,
                name: val.name,
                phone_no: val.phone_no,
                price: val.price,
                paid: val.paid,
                debt: val.debt,
                desc: val.desc,
                id: val.id
              })
            }
            this.pagination = result.page_data
          })
      }
    },
    mounted() {
      this.getMSOrderList()
    }
  }
</script>

<style>
</style>
