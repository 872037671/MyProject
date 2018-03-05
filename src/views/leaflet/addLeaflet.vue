<template>
  <div>
    <el-main>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>新增微传单活动</span>
          <el-button type="primary" @click="backUp" style="float: right;">返回微传单活动列表</el-button>
        </div>
        <div>

          <BaseSetup :group_id="groupID"></BaseSetup>

        </div>
      </el-card>
    </el-main>

  </div>
</template>

<script>
  import BaseSetup from './baseSetup'
  export default {
    data() {
      return {
        groupID: ''
      }
    },
    components: {
      BaseSetup
    },
    methods: {
      backUp() {
        this.$router.push({ name: 'leaflet' })
      }
    }
  }
</script>

<style>
</style>
