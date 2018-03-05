<template>
  <div class="baseStup">
    <el-form label-width="120px">
      <el-alert
        title="基础设置"
        type="info"
        style="margin: 30px 0;">
      </el-alert>
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
      <!--团购方案-->
      <el-form-item label="团购方案">
        <el-row v-for="(plan, index) in planList" :key="index">
          <el-col :span="8" style="margin:15px 0">
            <el-form-item label="参团人数">
              <el-input v-model="plan.people_count"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="margin:15px 0">
            <el-form-item label="价格为">
              <el-input v-model="plan.arrived_price"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2" style="float: right;">
            <el-button @click="addPlan"> 添加 </el-button>
          </el-col>
        </el-row>
        <el-col :span="24" style="margin:15px 0">
          <el-tag type="success">配置团购方案，达到不同参与人数，价格发生对应变化</el-tag>
        </el-col>
        <!--已添加的值-->
        <el-row style="margin: 8px 0;" v-for="(plan, index) in addPurchaseData.purchase_rules_replace" :key="index">
          <el-col :span="8">
            <el-form-item label="">
              <el-tag style="width: 72%;float: right;" type="info">{{plan.num}}</el-tag>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="">
              <el-tag style="width: 72%;float: right;" type="info">{{plan.price}}</el-tag>
            </el-form-item>
          </el-col>
          <el-col :span="2" style="float: right;">
            <el-button @click="decrementPlan(index)"> 删除 </el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <!--参团订金-->
      <el-form-item label="参团订金">
        <el-input v-model="addPurchaseData.dingjin"></el-input>
        <el-col :span="8" style="margin:15px 0">
          <el-tag type="success">参加团购活动需要支付的定金，填0为免定金参团。</el-tag>
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
  import { addPurchase } from '@/api/groupOn'
  import { getActivityDetail } from '@/api/groupOn'
  export default {
    prop: ['group_id'],
    data() {
      return {
        chooseDate: [],
        planList: [
          {
            people_count: 0,
            arrived_price: 0
          }
        ],
        addPurchaseData: {
          name: '',
          virtual_people_num: '',
          picture_show_num: '',
          original_price: '',
          begintime: '',
          endtime: '',
          dingjin: '',
          purchase_rules_replace: [],
          purchase_rules: [],
          activity_id: ''
        }
      }
    },
    methods: {
      addPlan() {
        this.addPurchaseData.purchase_rules_replace.push({
          num: this.planList[0].people_count,
          price: this.planList[0].arrived_price
        })
      },
      save() {
        // 判断数据是否合格
        if (this.addPurchaseData.name === '') {
          this.$message.error('活动标题不能为空！')
          return
        }
        if (this.addPurchaseData.virtual_people_num === '') {
          this.$message.error('请填写参与人数！！')
          return
        }
        if (this.addPurchaseData.virtual_people_num < 0) {
          this.$message.error('参与人数不得小于0！！')
          return
        }
        if (this.addPurchaseData.picture_show_num === '') {
          this.$message.error('请填写头像展示信息！')
          return
        }
        if (this.addPurchaseData.picture_show_num < 0) {
          this.$message.error('头像展示不能小于0！')
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
        if (!this.addPurchaseData.purchase_rules_replace.length || this.addPurchaseData.purchase_rules_replace[0].num === '' || this.addPurchaseData.purchase_rules_replace[0].price === '') {
          this.$message.error('请完善您的团购方案！')
          return
        }
        if (this.addPurchaseData.dingjin === '') {
          this.$message.error('请填写参团定金！')
          return
        }
        if (Number(this.addPurchaseData.dingjin) <= 0) {
          this.$message.error('参团定金不能小于0！')
          return
        }
        if (this.chooseDate[0] === undefined || this.chooseDate[1] === undefined) {
          this.$message.error('请完善您的时间信息！')
          return
        }
        this.addPurchaseData.purchase_rules = JSON.stringify(this.addPurchaseData.purchase_rules_replace)
        // this.addPurchaseData.begintime = this.chooseDate[0]
        // this.addPurchaseData.endtime = this.chooseDate[1]
        addPurchase(this.addPurchaseData).then((result) => {
          console.log(result)
          if (result.id) {
            this.group_id = result.id
            this.$router.push({ name: 'grouponActivity', query: { activity_id: result.id, activity_url: result.activity_url }})
          } else {
            this.$message.error('活动标题已存在！')
          }
        }).catch((result) => {
          this.$message.error(result)
        })
      },
      choose_date(value) {
        this.addPurchaseData.begintime = Date.parse(value[0]) / 1000
        this.addPurchaseData.endtime = Date.parse(value[1]) / 1000
        console.log(this.addPurchaseData.begintime)
      },
      decrementPlan(index) {
        this.addPurchaseData.purchase_rules_replace.splice(index, 1)
      }
    },
    mounted() {
      const activity_id = this.$route.query.activity_id
      if (activity_id) {
        getActivityDetail(activity_id)
          .then((result) => {
            this.addPurchaseData = {
              name: result.name,
              virtual_people_num: result.virtual_people_num,
              picture_show_num: result.picture_show_num,
              original_price: result.original_price,
              begintime: result.begintime,
              endtime: result.endtime,
              dingjin: result.dingjin,
              activity_id: result.id,
              purchase_rules: [],
              purchase_rules_replace: []
            }
            for (const val of result.purchase_rules) {
              this.addPurchaseData.purchase_rules.push(val)
            }
            for (const val of result.purchase_rules) {
              this.addPurchaseData.purchase_rules_replace.push(val)
            }
            this.chooseDate = [result.begintime * 1000, result.endtime * 1000]
          })
      }
    }
  }
</script>

<style>
</style>