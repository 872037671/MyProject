<template>
  <div class="baseStup">
    <el-form label-width="120px">
      <!--活动标题-->
      <el-form-item label="活动标题">
        <el-input v-model.trim="addPurchaseData.name" placeholder=""></el-input>
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
        <el-col :span="8">
          <el-tag type="success">活动页面最多展示多少排头像，推荐10排内</el-tag>
        </el-col>
      </el-form-item>
      <!--拼团成功价-->
      <el-form-item label="拼团成功价">
        <el-input v-model="addPurchaseData.final_price"></el-input>
      </el-form-item>
      <!--拼团定金-->
      <el-form-item label="拼团定金">
        <el-input v-model="addPurchaseData.dingjin"></el-input>
      </el-form-item>
      <!--参团人数-->
      <el-form-item label="参团人数">
        <el-input v-model="addPurchaseData.people_num"></el-input>
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
  import { addGroup } from '@/api/cutGroup'
  import { getActivityDetail } from '@/api/cutGroup'
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
          begintime: '',
          endtime: '',
          final_price: '',
          dingjin: '',
          people_num: ''
        }
      }
    },
    methods: {
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
          this.$message.error('参与人数不能小于0！！')
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
        if (this.addPurchaseData.final_price === '') {
          this.$message.error('请填写拼团成功价格！')
          return
        }
        if (this.addPurchaseData.final_price < 0) {
          this.$message.error('拼团成功价格不能小于0！')
          return
        }
        if (this.addPurchaseData.dingjin === '') {
          this.$message.error('请填写拼团定金！')
          return
        }
        if (Number(this.addPurchaseData.dingjin) <= 0) {
          this.$message.error('拼团定金不能小于0！')
          return
        }
        if (this.addPurchaseData.people_num === '') {
          this.$message.error('请填写参团人数！')
          return
        }
        if (this.addPurchaseData.people_num < 0) {
          this.$message.error('参团人数不能小于0！')
          return
        }
        if (this.chooseDate[0] === undefined || this.chooseDate[1] === undefined) {
          this.$message.error('请完善您的时间信息！')
          return
        }
        this.$route.query.activity_id ? this.addPurchaseData.activity_id = this.$route.query.activity_id : ''
        addGroup(this.addPurchaseData).then((result) => {
          result ? this.$router.push({ name: 'cutGroupactivitySetup', query: { activity_id: result.id, activity_url: result.activity_url, activity_type: 1 }}) : this.$message.error('信息提交error')
        }).catch((result) => {
          this.$message.error(result)
        })
      },
      decrementPlan(index) {
        this.addPurchaseData.purchase_rules_replace.splice(index, 1)
      },
      choose_date(value) {
        this.addPurchaseData.begintime = Date.parse(value[0]) / 1000
        this.addPurchaseData.endtime = Date.parse(value[1]) / 1000
      }
    },
    mounted() {
      const activity_id = this.$route.query.activity_id
      if (activity_id) {
        getActivityDetail(activity_id)
          .then((result) => {
            console.log(result)
            this.addPurchaseData = {
              name: result.name,
              virtual_people_num: result.virtual_people_num,
              picture_show_num: result.picture_show_num,
              final_price: result.final_price,
              dingjin: result.dingjin,
              people_num: result.people_num,
              begintime: result.begintime,
              endtime: result.endtime
            }
            this.chooseDate = [result.begintime * 1000, result.endtime * 1000]
          })
      }
    }
  }
</script>

<style>
</style>