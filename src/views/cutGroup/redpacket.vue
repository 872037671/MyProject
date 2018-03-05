<template>
  <div class="redpack">
    <el-form label-width="120px">
      <!--裂变红包-->
      <el-form-item label="裂变红包">
        <el-checkbox v-model="statuses">启用</el-checkbox>
      </el-form-item>
      <!--红包标题-->
      <el-form-item label="红包标题">
        <el-input v-model="add_red_base.title"></el-input>
        <el-col :span="24" style="margin:15px 0">
          <el-tag type="success">红包主题名称，显示在红包领取页面，10个字内</el-tag>
        </el-col>
      </el-form-item>
      <!--红包副标题-->
      <el-form-item label="红包副标题">
        <el-input v-model="add_red_base.title_ext"></el-input>
        <el-col :span="24" style="margin:15px 0">
          <el-tag type="success">打开红包后标题下方显示的文字 一般为感谢语</el-tag>
        </el-col>
      </el-form-item>
      <!--发放规则-->
      <el-form-item label="发放规则">
        <el-select v-model="chooseValue" placeholder="请选择" @change="changeSelect">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            value-key="value"
            :value="item"
            :disabled="item.disabled">
          </el-option>
        </el-select>
        <!--<el-button @click="addRules">添加规则</el-button>-->
        <el-col :span="24" style="margin:15px 0">
          <el-tag type="success">可多种类型规则混合使用，但建议最好一个活动只用某一种类规则</el-tag>
        </el-col>
        
        <!--添加规则内容-->
        <el-row style="margin-top: 10px;" v-for="(item, index) in Temporary" :key="index">
          <el-tag style="margin-bottom: 10px;" type="info">{{item.label}}</el-tag><br />
          <el-col :span="10">
            <div class="box">
              <label v-if="item.rule_id == 1">成交金额</label><el-input v-if="item.rule_id == 1" @blur="blur1(item.amount, index)" v-model="item.amount" class="input" placeholder="请输入内容"></el-input><label v-if="item.rule_id == 1" for="">元</label>
              <label v-if="item.rule_id == 2">分享数</label><el-input v-if="item.rule_id == 2" @blur="blur2(item.amount, index)" v-model="item.amount" class="input" placeholder="请输入内容"></el-input><label v-if="item.rule_id == 2" for="">次</label>
              <label v-if="item.rule_id == 3">转发数</label><el-input v-if="item.rule_id == 3" @blur="blur3(item.amount, index)" v-model="item.amount" class="input" placeholder="请输入内容"></el-input><label v-if="item.rule_id == 3" for="">次</label>
              <label v-if="item.rule_id == 4">浏览数</label><el-input v-if="item.rule_id == 4" @blur="blur4(item.amount, index)" v-model="item.amount" class="input" placeholder="请输入内容"></el-input><label v-if="item.rule_id == 4" for="">次</label>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="box">
              <label for="">获得</label><el-input v-model="item.money[0]" class="input" placeholder="请输入内容"></el-input><label for="">元</label>
            </div>
            <div class="box">
              <label class="ins" for=""></label><el-input v-model="item.money[1]" class="input" placeholder="请输入内容"></el-input><label for="">元红包</label>
            </div>
          </el-col>
          <el-col :span="2"><el-button type="primary" @click="Temporary.splice(index, 1)">删除</el-button></el-col>
        </el-row>
      </el-form-item>
      <el-button style="margin: 0 auto;display: block;" @click="save">保存</el-button>
      
    </el-form>
  </div>
</template>

<script>
  import { addRed } from '@/api/cutGroup'
  import { getRedDetail } from '@/api/cutGroup'
  export default {
    data() {
      return {
        chooseValue: '',
        options: [{
          value: 1,
          label: '介绍朋友成交得红包',
          disabled: false
        }, {
          value: '2',
          label: '分享达标得红包',
          disabled: false
        }, {
          value: '3',
          label: '转发达标得红包',
          disabled: false
        }, {
          value: '4',
          label: '浏览达标得红包',
          disabled: false
        }],
        Temporary: [],
        statuses: false,
        add_red_base: {
          title: '',
          title_ext: '',
          status: '',
          rules: [],
          activity_id: ''
        }
      }
    },
    methods: {
      changeSelect(value, label) {
        this.Temporary.push({ rule_id: value.value, label: value.label, amount: '', money: ['', ''] })
        value.disabled = true
      },
      blur1(value, index) {
        if (value < 1) {
          this.Temporary[index].amount = 1
          this.$message.error('金额不得小于1元！')
        }
      },
      blur2(value, index) {
        if (value < 1) {
          this.Temporary[index].amount = 1
          this.$message.error('次数不能小于1次！')
        }
      },
      blur3(value, index) {
        if (value < 1) {
          this.Temporary[index].amount = 1
          this.$message.error('次数不能小于1次！')
        }
      },
      blur4(value, index) {
        if (value < 1) {
          this.Temporary[index].amount = 1
          this.$message.error('次数不能小于1次！')
        }
      },
      save() {
        if (this.statuses === true) {
          this.add_red_base.status = 1
        } else {
          this.add_red_base.status = 0
        }
        const FalseData = []
        for (const val of this.Temporary) {
          FalseData.push({ rule_id: val.rule_id, amount: val.amount, money: val.money, label: val.label })
        }
        this.add_red_base.rules = JSON.stringify(FalseData)
        if (!this.add_red_base.status) {
          this.add_red_base.status = false
        }
        // 判断数据是否合格
        if (this.add_red_base.title === '') {
          this.$message.error('请填写红包标题！')
          return
        }
        if (this.add_red_base.title_ext === '') {
          this.$message.error('请填写红包副标题！')
          return
        }
        if (!this.add_red_base.rules.length) {
          this.$message.error('请填写发放规则！')
          return
        }
        if (!this.add_red_base.rules.length) {
          this.$message.error('请填写发放规则！')
          return
        }
        for (const zhi of this.Temporary) {
          const numamout = Number(zhi.amount)
          if (zhi.amount < 1 || !Number.isInteger(numamout)) {
            this.$message.error('金额信息填写不正确!')
            zhi.amount = 1
            return
          }
          if (zhi.money[0] <= 0 || zhi.money[1] - zhi.money[0] < 0) {
            this.$message.error('获得红包填写信息填写不正确!')
            return
          }
        }
        addRed(this.add_red_base)
          .then((result) => {
            this.$router.push({ name: 'cutGroup' })
          }).catch(reason => {
            console.log(reason)
          })
      }
    },
    mounted() {
      this.add_red_base.activity_id = this.$route.query.activity_id
      getRedDetail(this.$route.query.activity_id)
        .then((result) => {
          if (result.status === 0) {
            this.statuses = false
          } else {
            this.statuses = true
          }
          this.add_red_base = {
            title: result.title,
            title_ext: result.title_ext,
            status: result.status,
            activity_id: result.activity_id
          }
          for (const val of result.rules) {
            this.Temporary.push({ rule_id: val.rule_id, amount: val.amount, money: val.money, label: val.label })
          }
          for (const val of result.rules) {
            this.Temporary.push({ rule_id: val.rule_id, amount: val.amount, money: val.money, label: val.label })
            if (val.rule_id === 1) {
              this.options[0].disabled = true
            } else if (val.rule_id === 2) {
              this.options[1].disabled = true
            } else if (val.rule_id === 3) {
              this.options[2].disabled = true
            } else if (val.rule_id === 4) {
              this.options[3].disabled = true
            }
          }
        })
    }
  }
</script>

<style lang="scss">
  .box{
    width: 40%;
    float: left;
    display: flex;
    .input{
      width: 50%;
      margin: 0 15px;
    }
    .ins{
      width: 30px;
      height: 1px;
      background: #333;
      position: relative;
      top: 18px
    }
  }
</style>