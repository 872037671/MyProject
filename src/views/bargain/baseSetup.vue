<template>
  <div class="baseStup">
    <el-form label-width="120px">
      <!--活动标题-->
      <el-form-item label="活动标题">
        <el-input v-model.trim="addPurchaseData.name"></el-input>
        <el-col :span="8" style="margin:15px 0">
          <el-tag type="success">主题活动名称，展示在屏幕最顶部的信息</el-tag>
        </el-col>
      </el-form-item>
      <!--虚拟参与人数-->
      <el-form-item label="虚拟参与人数">
        <el-input v-model="addPurchaseData.virtual_people_num"></el-input>
        <el-col :span="8" style="margin:15px 0">
          <el-tag type="success">虚拟参与人数，活动展示的参与人数=虚拟参与人数+真实</el-tag>
        </el-col>
      </el-form-item>
      <!--头像展示（排）-->
      <el-form-item label="头像展示（排)">
        <el-input v-model="addPurchaseData.picture_show_num"></el-input>
        <el-col :span="8" style="margin:15px 0">
          <el-tag type="success">活动页面最多展示多少排头像，推荐10排内</el-tag>
        </el-col>
      </el-form-item>
      <!--商品原价-->
      <el-form-item label="商品原价">
        <el-input v-model="addPurchaseData.original_price"></el-input>
        <el-col :span="8" style="margin:15px 0">
          <el-tag type="success">产品原本价格</el-tag>
        </el-col>
      </el-form-item>
      <!--商品底价-->
      <el-form-item label="商品底价">
        <el-input v-model="addPurchaseData.final_price"></el-input>
        <el-col :span="8" style="margin:15px 0">
          <el-tag type="success">产品最低价格   -1 为无限</el-tag>
        </el-col>
      </el-form-item>
      <!--领取方式-->
      <el-form-item label="领取方式">
        <el-select v-model="lingqu_method_moren" placeholder="请选择" @change="lingquMethod">
          <el-option
            v-for="item in lingqu_method_data"
            :key="item.value"
            :label="item.label"
            :value="item">
          </el-option>
        </el-select>
        <el-col :span="24" style="margin:15px 0">
          <el-tag type="success">如果选择快递，下单会出来地址栏，客户输入收货地址</el-tag>
        </el-col>
      </el-form-item>
      <!--帮砍刀数-->
      <el-form-item label="帮砍刀数">
        <el-col :span="8">
          <el-input v-model="addPurchaseData.kanjia_num[0]"></el-input>
        </el-col>
        <el-col :span="4" style="margin: 0 20px;height: 1px;background: #BEBEBF;position: relative;top: 20px;"></el-col>
        <el-col :span="8">
          <el-input v-model="addPurchaseData.kanjia_num[1]"></el-input>
        </el-col>
        <el-col :span="8" style="margin:15px 0">
          <el-tag type="success">设置多少刀范围内要砍完</el-tag>
        </el-col>
      </el-form-item>
      <!--帮砍区间-->
      <el-form-item label="帮砍区间规则">
        <el-col :span="8">
          <el-input v-model="addPurchaseData.kanjia_range[0]"></el-input>
        </el-col>
        <el-col :span="4" style="margin: 0 20px;height: 1px;background: #BEBEBF;position: relative;top: 20px;"></el-col>
        <el-col :span="8">
          <el-input v-model="addPurchaseData.kanjia_range[1]"></el-input>
        </el-col>
        <el-col :span="8" style="margin:15px 0">
          <el-tag type="success">设置一刀能砍掉的最高金额以及最低金额  数据要合理，能确定上方刀数内可能砍完</el-tag>
        </el-col>
      </el-form-item>
      <!--好友帮砍限制数量-->
      <el-form-item label="好友帮砍限制数">
        <el-input v-model="addPurchaseData.help_num"></el-input>
        <el-col :span="8" style="margin:15px 0">
          <el-tag type="success">限制当前砍价活动，同一个好友最多可以给另一人砍多少次</el-tag>
        </el-col>
      </el-form-item>
      <!--帮砍总数-->
      <el-form-item label="帮砍总数">
        <el-input v-model="addPurchaseData.help_num_dif"></el-input>
        <el-col :span="8" style="margin:15px 0">
          <el-tag type="success">限制当前砍价活动，同一个好友最多可以给所有人砍多少次</el-tag>
        </el-col>
      </el-form-item>
      <!--砍价用户地区限制-->
      <el-form-item label="用户地区限制">
        <el-col :span="8">
          <el-cascader
            expand-trigger="hover"
            :options="cityData"
            v-model="city_model_data"
            :props="props"
            change-on-select
            @change="handleChange">
          </el-cascader>
          <el-input v-if="addPurchaseData.address_district" style="margin: 10px auto;" v-model="addPurchaseData.address_district" :disabled="true"></el-input>
        </el-col>
        <el-col :span="24" style="margin:15px 0">
          <el-tag type="success">无条件表示不启动，如果有地区条件表示限制砍价区域，最小精确到县，注：启动地区限制，微信会提示用户授权获取地理位置，如微信用户不授权，无法砍价</el-tag>
        </el-col>
      </el-form-item>
      <!--开始时间-->
      <el-form-item label="设置时间">
        <el-date-picker
          style="width: 450px;"
          v-model="chooseDate"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="choose_date">
        </el-date-picker>
        <el-col :span="24" style="margin:15px 0">
          <el-tag type="success">活动时间</el-tag>
        </el-col>
      </el-form-item>
      <!--结束时间-->
      <!--<el-form-item label="结束时间">
        <el-input v-model="addPurchaseData.endtime"></el-input>
      </el-form-item>-->
      <el-button style="margin: 0 auto;display: block;" @click="save">保存</el-button>
    </el-form>
  </div>
</template>

<script>
  import { addBargain } from '@/api/bargain'
  import addressData from '@/components/address'
  import { getActivityDetail } from '@/api/bargain'
  export default {
    prop: ['group_id'],
    data() {
      return {
        chooseDate: [],
        city_model_data: [],
        cityData: [],
        props: {
          value: 'label'
        },
        lingqu_method_data: [
          {
            value: '0',
            label: '到店'
          },
          {
            value: '1',
            label: '快递'
          }
        ],
        lingqu_method_moren: '',
        addAddressData: '',
        addPurchaseData: {
          name: '',
          virtual_people_num: '',
          picture_show_num: '',
          original_price: '',
          final_price: '',
          lingqu_method: '',
          kanjia_num: ['', ''],
          kanjia_range: ['', ''],
          help_num: '',
          help_num_dif: '',
          begintime: '',
          endtime: '',
          address_district: '',
          activity_id: ''
        }
      }
    },
    methods: {
      handleChange(val) {
        if (val[1] === undefined) {
          val[1] = ''
        }
        if (val[2] === undefined) {
          val[2] = ''
        }
        this.addPurchaseData.address_district = val[0] + val[1] + val[2]
      },
      lingquMethod(value) {
        this.addPurchaseData.lingqu_method = value
        this.lingqu_method_moren = value.label
      },
      save() {
        // 判断数据是否合格
        if (this.addPurchaseData.name === '') {
          this.$message.error('活动标题不能为空！')
          return
        }
        if (this.addPurchaseData.virtual_people_num === '') {
          this.$message.error('请填写虚拟参与人数！！')
          return
        }
        if (this.addPurchaseData.virtual_people_num < 0) {
          this.$message.error('虚拟参与参与人数不能小于0！！')
          return
        }
        if (this.addPurchaseData.picture_show_num === '') {
          this.$message.error('请填写头像展示信息！')
          return
        }
        if (this.addPurchaseData.picture_show_num < 0) {
          this.$message.error('头像展示信息不能小于0！')
          return
        }
        if (this.addPurchaseData.original_price === '') {
          this.$message.error('请填写商品原价！')
          return
        }
        if (this.addPurchaseData.original_price < 0) {
          this.$message.error('商品原价不能小于0！')
          return
        }
        if (this.addPurchaseData.final_price === '') {
          this.$message.error('请填写商品底价！')
          return
        }
        if (this.addPurchaseData.final_price < 0) {
          this.$message.error('商品底价不能小于0！')
          return
        }
        if (this.addPurchaseData.lingqu_method === '') {
          this.$message.error('请选择一个领取方式！')
          return
        }
        if (this.addPurchaseData.kanjia_num[0] === '' || this.addPurchaseData.kanjia_num[1] === '' || this.addPurchaseData.kanjia_num[0] < 0 || this.addPurchaseData.kanjia_num[1] < 0 || Number(this.addPurchaseData.kanjia_num[0]) >= Number(this.addPurchaseData.kanjia_num[1])) {
          this.$message.error('请完善帮砍刀数！')
          return
        }
        if (this.addPurchaseData.kanjia_range[0] === '' || this.addPurchaseData.kanjia_range[1] === '') {
          this.$message.error('请完善帮砍区间规则！')
          return
        }
        if (this.addPurchaseData.help_num === '') {
          this.$message.error('请填写好友帮砍限制数！')
          return
        }
        if (this.addPurchaseData.help_num < 1) {
          this.$message.error('请填写好友帮砍限制数不能小于1！')
          return
        }
        if (this.addPurchaseData.help_num_dif === '') {
          this.$message.error('请填写帮砍总数！')
          return
        }
        if (this.addPurchaseData.help_num_dif < 1) {
          this.$message.error('帮砍总数不能小于1！')
          return
        }
        if (Number(this.addPurchaseData.original_price) - Number(this.addPurchaseData.final_price) <= 0) {
          this.$message.error('商品原价不能低于商品底价！')
          return
        }
        if (this.addPurchaseData.help_num < 0) {
          this.$message.error('好友帮砍限制数不能小于0！')
          return
        }
        if (this.addPurchaseData.begintime === '' || this.addPurchaseData.endtime === '') {
          this.$message.error('请设置完整时间！')
          return
        }
        this.addPurchaseData.help_num_dif = Math.floor(this.addPurchaseData.help_num_dif)
        addBargain(this.addPurchaseData)
          .then((result) => {
            this.$router.push({ name: 'bargainActivity', query: { activity_id: result.id, activity_url: result.activity_url, activity_type: 2 }})
          }).catch((result) => {
            this.$message.error(result)
          })
      },
      choose_date(value) {
        this.addPurchaseData.begintime = Date.parse(value[0]) / 1000
        this.addPurchaseData.endtime = Date.parse(value[1]) / 1000
      }
    },
    mounted() {
      this.cityData = addressData.address
      if (this.$route.query.activity_id) {
        this.addPurchaseData.activity_id = this.$route.query.activity_id
        getActivityDetail(this.addPurchaseData.activity_id)
          .then((result) => {
            const kanjia_num = result.kanjia_num.split(',')
            const kanjia_range = result.kanjia_range.split(',')
            this.lingqu_method_moren = this.lingqu_method_data[result.lingqu_method].label
            this.addPurchaseData = {
              name: result.name,
              virtual_people_num: result.virtual_people_num,
              picture_show_num: result.picture_show_num,
              original_price: result.original_price,
              final_price: result.final_price,
              lingqu_method: result.lingqu_method,
              kanjia_num,
              kanjia_range,
              help_num: result.help_num,
              help_num_dif: result.help_num_dif,
              begintime: result.begintime,
              endtime: result.endtime,
              address_district: result.address_district,
              activity_id: result.id
            }
            this.chooseDate = [result.begintime * 1000, result.endtime * 1000]
          })
      }
    }
  }
</script>

<style>
</style>
