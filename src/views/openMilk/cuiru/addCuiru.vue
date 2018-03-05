<template>
  <div>
    <el-main>
      <el-button type="info" @click="backUp" style="margin: 20px 0">返回活动列表</el-button>
      <el-card class="box-card">
        <el-form label-width="200px" label-position="left">
          <el-alert
            title="基础设置"
            type="info"
            style="margin: 30px 0;">
          </el-alert>

          <!--催乳师名称	-->
          <el-form-item label="催乳师名称	">
            <el-input v-model="prolactinDivisionSetting.name"></el-input>
          </el-form-item>

          <!--催乳师介绍	-->
          <el-form-item label="催乳师介绍	">
            <el-input v-model="prolactinDivisionSetting.intro"></el-input>
          </el-form-item>

          <!--催乳师头像-->
          <el-form-item label="催乳师头像">
            <el-col :span="24" class="">
              <el-upload
                class="avatar-uploader"
                :action="upload_url"
                :headers="postHeaders"
                :show-file-list="false"
                :on-success="avatarSuccess">
                <img style="max-width: 100px" v-if="ShowImgUrl.avatar" :src="ShowImgUrl.avatar" class="avatar">
                <el-button style="display: block">上传</el-button>
              </el-upload>
            </el-col>
          </el-form-item>

          <!--医院id	-->
          <el-form-item label="负责医院	">
            <el-select v-model="hospital_list_demo" placeholder="请选择" @change="hos_fn">
              <el-option
                v-for="item in hospital_list"
                :key="item.name"
                value-key="name"
                :label="item.name"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>

          <!--催乳师电话	-->
          <el-form-item label="催乳师电话	">
            <el-input v-model="prolactinDivisionSetting.phone_no"></el-input>
          </el-form-item>

          <!--催乳师工号	-->
          <el-form-item label="催乳师工号">
            <el-input v-model="prolactinDivisionSetting.no"></el-input>
          </el-form-item>

          <el-button style="margin: 0 auto 100px;display: block;" @click="save">保存</el-button>

        </el-form>
      </el-card>
    </el-main>
  </div>
</template>

<script>
import { prolactinDivisionSetting, getAllHospitalList, getDivisionDetail } from '@/api/openMilk'
import { UploadUrl6 } from '@/utils/auth'
import { getToken } from '@/utils/auth'

export default {
  data() {
    return {
      postHeaders: {
        'X-Token': getToken()
      },
      upload_url: UploadUrl6,
      ShowImgUrl: {
        avatar: ''
      },
      prolactinDivisionSetting: {
        name: '',
        intro: '',
        avatar: '',
        phone_no: '',
        no: '',
        hospital_id: '',
        id: ''
      },
      hospital_list: [],
      hospital_list_demo: ''
    }
  },
  methods: {
    backUp() {
      this.$router.push({ name: 'openMilk' })
    },
    avatarSuccess(res, file) {
      this.prolactinDivisionSetting.avatar = res.data.save_url
      this.ShowImgUrl.avatar = URL.createObjectURL(file.raw)
    },
    hos_fn(val) {
      this.prolactinDivisionSetting.hospital_id = val.id
    },
    getAllHospitalList() {
      getAllHospitalList()
        .then((result) => {
          for (const hos_val of result) {
            this.hospital_list.push({ name: hos_val.name, id: hos_val.id })
          }
        })
      if (this.$route.query.id) {
        getDivisionDetail(this.$route.query.id)
          .then((result) => {
            this.prolactinDivisionSetting = {
              name: result.name,
              intro: result.intro,
              avatar: result.avatar,
              phone_no: result.phone_no,
              no: result.no,
              hospital_id: result.hospital_id,
              id: result.id
            }
            this.ShowImgUrl.avatar = result.pic_prefix + result.avatar
            this.hospital_list_demo = result.hospital_name
          })
      }
    },
    save() {
      if (this.prolactinDivisionSetting.name === '') {
        this.$message.error('请填写医院名！')
        return
      }
      if (this.prolactinDivisionSetting.intro === '') {
        this.$message.error('请填写催乳师介绍！')
        return
      }
      if (this.prolactinDivisionSetting.avatar === '') {
        this.$message.error('请上传催乳师头像！')
        return
      }
      if (this.prolactinDivisionSetting.phone_no === '') {
        this.$message.error('	请填写催乳师电话')
        return
      }
      if (this.prolactinDivisionSetting.no === '') {
        this.$message.error('请填写催乳师工号')
        return
      }
      if (this.prolactinDivisionSetting.hospital_id === '') {
        this.$message.error('请填写医院id')
        return
      }
      prolactinDivisionSetting(this.prolactinDivisionSetting)
        .then((result) => {
          this.$router.push({ name: 'openMilk', query: { activeName: 'third' }})
        })
    }
  },
  mounted() {
    this.getAllHospitalList() // 活动医院列表 不带分页
  }
}
</script>
