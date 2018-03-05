<template>
  <div>
    <el-main>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>新增拼团活动</span>
          <el-button type="primary" @click="backUp" style="float: right;">返回拼团活动列表</el-button>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="基础设置" name="first">
            <BaseSetup></BaseSetup>
          </el-tab-pane>
          <!-- <el-tab-pane label="活动素材设置" name="second" :disabled="disabled">
            <activitySetup></activitySetup>
          </el-tab-pane>
          <el-tab-pane label="裂变推广" name="third" :disabled="disabled">
            <Icon></Icon>
            <redPacket></redPacket>
          </el-tab-pane> -->
        </el-tabs>
        <div>
          
        </div>
      </el-card>
    </el-main>
  </div>
</template>

<script>
  import BaseSetup from './baseSetup'
  import activitySetup from './activitySetup'
  import Icon from './icon'
  import redPacket from './redpacket'
  export default {
    data() {
      return {
        activeName: 'first',
        disabled: true
      }
    },
    components: {
      BaseSetup,
      activitySetup,
      Icon,
      redPacket
    },
    methods: {
      backUp() {
        this.$router.push({ name: 'cutGroup' })
      },
      handleClick(tab, event) {
        console.log(tab, event)
      }
    },
    mounted() {
      if (this.$route.query.activity_id) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    }
  }
</script>

<style>
</style>