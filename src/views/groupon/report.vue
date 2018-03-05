<template>
  <div>
    <el-main>
      <el-button type="info" @click="backUp">返回团购活动列表</el-button>
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
        <el-table-column prop="status" label="订单状态" width="350"></el-table-column>
        <el-table-column prop="name" label="客户姓名" width="120"></el-table-column>
        <el-table-column prop="phone_no" label="客户电话" width="120"></el-table-column>
        <el-table-column prop="price" label="应收总价" width="120"></el-table-column>
        <el-table-column prop="paid" label="参团实收金额" width="120"></el-table-column>
        <el-table-column prop="debt" label="欠款" width="120"></el-table-column>
        <el-table-column prop="desc" label="备注"></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click.native.prevent="customer_method(scope.$index, GroupActiveList)">客户详情</el-button>
            <el-button type="text" size="small" @click.native.prevent="returnment(scope.$index, GroupActiveList)">退款</el-button>
            <el-button @click.native.prevent="deleteReport(scope.$index, GroupActiveList)" type="text" size="small">删除</el-button>
            <el-button type="text" size="small" @click.native.prevent="supplement(scope.$index, GroupActiveList)">补款</el-button>
          </template>
        </el-table-column>
      </el-table>

    </el-main>
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

    <!-- 退款弹框 -->
    <el-dialog
      title="提示"
      :visible.sync="returnment_sync"
      width="30%">
      <el-form label-width="100px" label-position="left">
        <el-form-item label="退款金额">
          <el-input v-model="returnment_data.returnment_refund.money"></el-input>
        </el-form-item>
        <el-form-item label="退款原因">
          <el-input v-model="returnment_data.returnment_refund.reason"></el-input>
        </el-form-item>
        <el-form-item label="退款方式">
          <el-select v-model="returnment_select_value.label" placeholder="请选择" @change="returnment_options_method">
            <el-option
              v-for="item in returnment_data.returnment_data_options"
              :key="item.value"
              :label="item.label"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="returnment_sync = false">取 消</el-button>
        <el-button type="primary" @click="returnment_true_method">确 定</el-button>
      </span>
    </el-dialog>

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
          <el-input v-model="customer.customer_data.activity_name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="团购总人数">
          <el-input v-model="customer.customer_data.num" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="团购最终价">
          <el-input v-model="customer.customer_data.price" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="已付金额">
          <el-input v-model="customer.customer_data.paid" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="欠款">
          <el-input v-model="customer.customer_data.debt" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-input v-model="customer.customer_data.status" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="customer.customer_data.desc" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="核销">
          <el-select v-model="customer.customer_select_value" @change="customer_select_event" placeholder="全部">
            <el-option
              v-for="item in customer.customer_select"
              :key="item.value"
              :label="item.label"
              value-key="value"
              :value="item">
            </el-option>
          </el-select>
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
  import { getPurchaseOrder } from '@/api/groupOn'
  import { delOrder } from '@/api/groupOn'
  import { extraMoney } from '@/api/groupOn'
  import { getCustomerDetail } from '@/api/groupOn'
  import { setOrderDetail } from '@/api/groupOn'
  import { refund } from '@/api/cutGroup'

  export default {
    data() {
      return {
        pagination: {},
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
        activity_id: '',
        returnment_sync: false,
        returnment_select_value: {
          value: '1',
          label: '当面退'
        },
        returnment_data: {
          returnment_data_options: [
            {
              value: '1',
              label: '当面退'
            },
            {
              value: '2',
              label: '在线退'
            }
          ],
          returnment_refund: {
            orderid: '',
            reason: '',
            method: '1',
            money: ''
          }
        },
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
        this.$router.push({ name: 'groupon' })
      },
      changesize(currentPage) {
        this.getOrderData.page = currentPage
        this.GroupActiveList = []
        this.getPurchaseOrder()
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
      // 客户详情
      customer_method(index, data) {
        this.customer.customer_data = {}
        this.customer.customer_more = true
        this.customer_more_save_id = data[index].id
        getCustomerDetail({ orderid: data[index].orderid })
          .then((result) => {
            this.customer.customer_data = result
          })
      },
      // 保存客户详情
      customer_save() {
        setOrderDetail({ id: this.customer_more_save_id, desc: this.customer.customer_data.desc, method: this.customer.customer_data.is_tuanzhang })
        this.customer.customer_more = false
      },
      customer_select_event(value) {
        this.customer.customer_data.is_tuanzhang = value.value
        this.customer.customer_select_value = value.label
      },
      SelectEvent(value) {
        this.GroupActiveList = []
        this.getOrderData.status = value.value
        this.getPurchaseOrder()
      },
      searchButton() {
        this.GroupActiveList = []
        this.getPurchaseOrder()
      },
      // 退款弹框
      returnment_true_method(index, data) {
        if (this.returnment_data.returnment_refund.reason === '') {
          this.$message.error('请填写退款原因!')
          return
        }
        if (this.returnment_data.returnment_refund.money === '') {
          this.$message.error('请填写退款金额!')
          return
        }
        refund(this.returnment_data.returnment_refund)
          .then((result) => {
            this.$message({ showClose: true, message: '退款成功', type: 'success' })
            setTimeout(function() {
              location.reload()
            }, 500)
          }).catch((result) => {
            this.$message({ showClose: true, message: result, type: 'error' })
          })
      },
      // 退款下拉事件
      returnment_options_method(value) {
        this.returnment_data.returnment_refund.method = value.value
        this.returnment_select_value.value = value.label
      },
      // 退款
      returnment(index, data) {
        this.returnment_sync = true
        this.returnment_data.returnment_refund.orderid = data[index].id
      },
      // 补款
      supplement(index, data) {
        const money = data[index].debt
        extraMoney({ money, order_id: data[index].id })
          .then((result) => {
            this.$message.success('补款成功')
          }).catch(() => {
            this.$message.error('补款失败')
          })
      },
      getPurchaseOrder() {
        this.getOrderData.activity_id = this.$route.query.activity_id
        this.getOrderData.keywords = this.searchModel
        getPurchaseOrder(this.getOrderData)
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
      this.getPurchaseOrder()
    }
  }
</script>

<style>
</style>
