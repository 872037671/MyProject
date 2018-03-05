<template>
  <div>
    <el-main>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>裂变红包列表</span>
          <el-button style="float: right;" type="success" plain @click="sendHB">发红包</el-button>
        </div>
        <div>
          <el-table :data="GroupActiveList" border style="width: 802px">
            <el-table-column prop="name" label="用户名" width="200"></el-table-column>
            <el-table-column prop="activity" label="活动名" width="300"></el-table-column>
            <el-table-column prop="rule" label="达标条件"></el-table-column>
          </el-table>
        </div>
      </el-card>
    </el-main>
  </div>
</template>

<script>
  import { giftUser } from '@/api/redPackage'
  import { shareHongbao } from '@/api/cutGroup'
  export default {
    data() {
      return {
        GroupActiveList: []
      }
    },
    methods: {
      // 发红包
      sendHB() {
        shareHongbao()
          .then((result) => {
            this.$message({ showClose: true, message: '发红包成功', type: 'success' })
          }).catch((result) => {
            this.$message({ showClose: true, message: '已发送红包', type: 'error' })
          })
      }
    },
    mounted() {
      giftUser()
        .then((result) => {
          this.GroupActiveList = result
        })
    }
  }
</script>
