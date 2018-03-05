<template>
  <div>
    <el-main>
      <el-button type="info" @click="backUp">返回拼团活动列表</el-button>
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

      <el-table :data="GroupActiveList" border style="width: 100%" default-expand-all>
        <!-- 下拉内容部分 -->
        <el-table-column type="expand" stripe show-header="false">
          <template slot-scope="props">
            <el-table :data="props.row.children" border style="width: 100%" class="table-children">
              <el-table-column prop="orderid" label="订单号" width="150"></el-table-column>
              <el-table-column prop="status" label="订单状态" width="350"></el-table-column>
              <el-table-column prop="name" label="" width="120"></el-table-column>
              <el-table-column prop="phone_no" label="" width="120"></el-table-column>
              <el-table-column prop="price" label="" width="120"></el-table-column>
              <el-table-column prop="paid" label="" width="120"></el-table-column>
              <el-table-column prop="debt" label="" width="120"></el-table-column>
              <el-table-column prop="desc" label=""></el-table-column>
              <el-table-column fixed="right" label="" width="249">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click.native.prevent="customer_method_children(scope.$index, props.row.children)">客户详情</el-button>
                  <el-button type="text" size="small" @click.native.prevent="returnment_children(scope.$index, props.row.children)">退款</el-button>
                  <el-button type="text" size="small" @click.native.prevent="delete_list_children(scope.$index, props.row.children)">删除</el-button>
                  <el-button type="text" size="small" @click.native.prevent="supplement_children(scope.$index, props.row.children)">补款</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <!-- 下拉内容部分 -->
        <el-table-column prop="orderid" label="订单号" width="150"></el-table-column>
        <el-table-column prop="status" label="订单状态" width="350"></el-table-column>
        <el-table-column prop="name" label="客户姓名" width="120"></el-table-column>
        <el-table-column prop="phone_no" label="客户电话" width="120"></el-table-column>
        <el-table-column prop="price" label="应收总价" width="120"></el-table-column>
        <el-table-column prop="paid" label="参团实收金额" width="120"></el-table-column>
        <el-table-column prop="debt" label="欠款" width="120"></el-table-column>
        <el-table-column prop="desc" label="备注"></el-table-column>
        <el-table-column fixed="right" label="操作" width="250">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click.native.prevent="customer_method(scope.$index, GroupActiveList)">客户详情</el-button>
            <el-button type="text" size="small" @click.native.prevent="returnment(scope.$index, GroupActiveList)">退款</el-button>
            <el-button type="text" size="small" @click.native.prevent="addVR(scope.$index, GroupActiveList)">添加虚拟成员</el-button>
            <el-button type="text" size="small" @click.native.prevent="delete_list(scope.$index, GroupActiveList)">删除</el-button>
            <el-button type="text" size="small" @click.native.prevent="supplement(scope.$index, GroupActiveList)">补款</el-button>
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
    <!-- 添加虚拟成员弹框 -->
    <el-dialog
      title="提示"
      :visible.sync="addvr_data"
      width="30%">
      <el-input v-model="addvr_num"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addvr_data = false">取 消</el-button>
        <el-button type="primary" @click="addvr_true_method">确 定</el-button>
      </span>
    </el-dialog>
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
        <el-form-item label="拼团角色">
          <el-input v-model="customer.customer_data.is_tuanzhang" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="所属活动">
          <el-input v-model="customer.customer_data.activity_name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="拼团成功价">
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
  import { getGroupOrderLists } from '@/api/cutGroup'
  import { delOrder } from '@/api/cutGroup'
  import { extraMoney } from '@/api/cutGroup'
  import { refund } from '@/api/cutGroup'
  import { pingAddVr } from '@/api/cutGroup'
  import { getCustomerDetail } from '@/api/cutGroup'
  import { setOrderDetail } from '@/api/cutGroup'

  export default {
    data() {
      return {
        customer: {
          customer_more: false,
          customer_more_save_id: '',
          customer_data: {
            name: '',
            phone_no: '',
            is_tuanzhang: '',
            activity_name: '',
            price: '',
            paid: '',
            debt: '',
            status: '',
            desc: '',
            lingqu_method: ''
          },
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
        addData: {
          order_id: '',
          activity_id: '',
          num: ''
        },
        difference_sync: true, // 区别退款弹框是父级还是子级
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
        addvr_num: 0,
        addvr_data: false,
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
          label: '拼团中'
        }, {
          value: '3',
          label: '已成团（待付全款） '
        }, {
          value: '4',
          label: '已成团（待核销）'
        }, {
          value: '5',
          label: '完成 '
        }, {
          value: '6',
          label: '已付全款'
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
        this.$router.push({ name: 'cutGroup' })
      },
      changesize(currentPage) {
        this.getOrderData.page = currentPage
        this.GroupActiveList = []
        this.getGroupOrderLists()
      },
      delete_list(index, data) {
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
      // 客户详情子
      customer_method_children(index, data) {
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
      // 删除子
      delete_list_children(index, data) {
        const activity_id = this.getOrderData.activity_id
        delOrder({ activity_id, order_id: data[index].id })
          .then((result) => {
            this.GroupActiveList.splice(index, 1)
            this.$message.success('删除成功')
          }).catch((result) => {
            this.$message.error(result)
          })
      },
      SelectEvent(value) {
        this.GroupActiveList = []
        this.getOrderData.status = value.value
        this.getGroupOrderLists()
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
        this.returnment_select_value = value.label
      },
      // 添加虚拟人员
      addvr_true_method() {
        this.addData.num = this.addvr_num
        pingAddVr(this.addData)
          .then((result) => {
            console.log(result)
          })
        this.addvr_data = false
      },
      // 添加虚拟人员
      addVR(index, data) {
        this.addvr_data = true
        this.addData = {
          order_id: data[index].id,
          activity_id: this.getOrderData.activity_id,
          num: ''
        }
      },
      // 补款
      supplement(index, data) {
        const money = data[index].debt
        extraMoney({ money, order_id: data[index].id })
          .then((result) => {
            this.$message({ showClose: true, message: '补款成功', type: 'success' })
          }).catch((result) => {
            this.$message({ showClose: true, message: result, type: 'error' })
          })
      },
      // 补款子
      supplement_children(index, data) {
        const money = data[index].debt
        extraMoney({ money, order_id: data[index].id })
          .then((result) => {
            this.$message({ showClose: true, message: '补款成功', type: 'success' })
          }).catch((result) => {
            this.$message({ showClose: true, message: result, type: 'error' })
          })
      },
      // 退款
      returnment(index, data) {
        this.returnment_sync = true
        this.returnment_data.returnment_refund.orderid = data[index].id
      },
      // 退款子
      returnment_children(index, data) {
        this.returnment_sync = true
        this.returnment_data.returnment_refund.orderid = data[index].id
      },
      getGroupOrderLists() {
        this.getOrderData.activity_id = this.$route.query.activity_id
        this.getOrderData.keywords = this.searchModel
        getGroupOrderLists(this.getOrderData)
          .then((result) => {
            result.data_list.length === 0 ? this.$message.error('抱歉暂无数据！') : ''
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
                id: val.id,
                children: val.children
              })
            }
            this.pagination = result.page_data
          })
      },
      searchButton() {
        this.GroupActiveList = []
        this.getGroupOrderLists()
      }
    },
    mounted() {
      this.getGroupOrderLists()
    }
  }
</script>

<style <style lang="scss">
.el-table__expanded-cell{
  padding:0 !important;
  padding-left: 47px !important;
}
.table-children .el-table__header-wrapper{
  display: none;
}
</style>
