<template>
  <div class="dashboard-container">
    <!--<component :is="currentRole"></component>-->
    <el-main style="text-align: center;">
      <el-tag style="margin: 200px auto;font-size: 40px;height: auto;line-height: auto;padding: 20px;">欢迎进入利亚方舟后台管理系统</el-tag>
    </el-main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'
export default {
  name: 'dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  }
}
</script>
