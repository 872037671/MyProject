<template>
  <div class="openMilk">
    <el-main>
        <!-- 导航分类 -->
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="活动设置" name="first">
            <activitySitting></activitySitting>
          </el-tab-pane>
          <el-tab-pane label="医院设置" name="second">
            <Hospital></Hospital>
          </el-tab-pane>
          <el-tab-pane label="催乳师" name="third">
            <Cuiru></Cuiru>
          </el-tab-pane>
          <el-tab-pane label="卡券设置" name="fourth">
            <Ticket></Ticket>
          </el-tab-pane>
        </el-tabs>
        <!-- 导航分类 -->
    </el-main>
  </div>
</template>

<script>
import activitySitting from './Activity/list'
import Hospital from './hospital/list'
import Cuiru from './cuiru/list'
import Ticket from './ticket/list'

export default {
  data() {
    return {
      activeName: ''
    }
  },
  components: {
    activitySitting,
    Hospital,
    Cuiru,
    Ticket
  },
  methods: {
    handleClick(value) {
      this.$router.push({ query: { activeName: value.name }})
    },
    tabs() {
      if (this.$route.query.activeName) {
        this.activeName = this.$route.query.activeName
      } else {
        this.activeName = 'first'
      }
    }
  },
  mounted() {
    // 判断导航页目
    this.tabs()
  }
}
</script>

<style>

</style>
