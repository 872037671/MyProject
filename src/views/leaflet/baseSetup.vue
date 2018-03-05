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
        <el-input></el-input>
        <el-col :span="8" style="margin:15px 0">
          <el-tag type="success">主题活动名称，展示在屏幕最顶部的信息</el-tag>
        </el-col>
      </el-form-item>
      <!--虚拟参与人数-->
      <el-form-item label="虚拟参与人数">
        <el-input></el-input>
        <el-col :span="8" style="margin:15px 0">
          <el-tag type="success">虚拟参与人数，活动展示的参与人数=虚拟参与人数+真实</el-tag>
        </el-col>
      </el-form-item>
      <!--头像展示（排）-->
      <el-form-item label="虚拟浏览数">
        <el-input></el-input>
        <el-col :span="8" style="margin:15px 0">
          <el-tag type="success">活动页面最多展示多少排头像，推荐10排内</el-tag>
        </el-col>
      </el-form-item>
      <!--开始时间-->
      <el-form-item label="设置时间">
        <el-date-picker
          style="width: 450px;"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-col :span="24" style="margin:15px 0">
          <el-tag type="success">活动时间</el-tag>
        </el-col>
      </el-form-item>
      <el-button style="margin: 0 auto;display: block;" @click.native="save">保存</el-button>
    </el-form>
  </div>
</template>

<script>
  export default {
    prop: ['group_id'],
    data() {
      return {
      }
    },
    methods: {
      save() {
        this.$router.push({ name: 'leafletactivitySetup' })
      }
    }
  }
</script>

<style>
</style>
