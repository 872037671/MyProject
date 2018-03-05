<template>
  <div class="activitySitting">
    <el-main>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>医院列表</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click.native="addHospital">添加医院设置</el-button>
        </div>
        <div>
          <el-table :data="listData" border style="width: 100%">
            <el-table-column prop="name" label="医院名" width="200"></el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope" :filter-method="filterTag" filter-placement="bottom-end">
                <el-button type="text" size="small" @click.native.prevent="bianji(scope.$index, listData)">编辑</el-button>
                <el-button type="text" size="small" @click.native.prevent="del(scope.$index, listData)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <!--分页-->
          <el-pagination
            class="pages"
            background
            :page-size="pagination.per_page"
            layout="prev, pager, next"
            :current-page="pagination.page"
            :total="pagination.total"
            @current-change="changesize">
          </el-pagination>

        </div>
      </el-card>
    </el-main>

    <el-dialog
      title="提示"
      :visible.sync="hos_status"
      width="50%">
      <el-card class="box-card">
        <el-form label-width="120px" label-position="left">
          <el-form-item label="医院名">
            <el-input v-model="hospitalSettingData.name"></el-input>
          </el-form-item>
        </el-form>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">保存</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
import { hospitalSetting } from '@/api/openMilk'
import { getHospitalList } from '@/api/openMilk'
import { getHospitalDetail, deleteHospital } from '@/api/openMilk'

export default {
  data() {
    return {
      pagination: {},
      hos_status: false,
      listData: [],
      hospitalSettingData: {
        name: ''
      }
    }
  },
  methods: {
    addHospital() {
      this.hospitalSettingData.name = ''
      this.hos_status = true
    },
    changesize(currentPage) {
      this.getList(currentPage)
    },
    save() {
      const name = this.hospitalSettingData.name
      hospitalSetting({ name, id: '' })
        .then((result) => {
          this.$message.success('设置成功！')
          this.getList()
        })
      this.hos_status = false
    },
    getList(page) {
      getHospitalList({ page, keywords: '' })
        .then((result) => {
          this.pagination = {
            per_page: result.per_page,
            page: result.current_page,
            total: result.total
          }
          this.listData = result.data
        })
    },
    bianji(index, data) {
      this.hospitalSettingData = []
      this.hos_status = true
      getHospitalDetail(data[index].id)
        .then((result) => {
          this.hospitalSettingData = result
        })
    },
    del(index, data) {
      deleteHospital(data[index].id)
        .then((result) => {
          this.listData.splice(index, 1)
        })
    }
  },
  mounted() {
    this.getList()
  }
}
</script>

<style>

</style>
