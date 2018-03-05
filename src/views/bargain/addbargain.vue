<template>
  <div>
    <el-main>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>新增砍价活动</span>
          <el-button type="primary" @click="backUp" style="float: right;">返回砍价活动列表</el-button>
        </div>
        <div>
          <BaseSetup></BaseSetup>
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
        duckOrder: 'first',
        activeName: 'first',
        nextRouterblooen: true,
        addGroup_id: ''
      }
    },
    components: {
      BaseSetup
    },
    methods: {
      backUp() {
        this.$router.push({ name: 'bargain' })
      }
    }
  }
</script>

<style>
</style>