<template>
  <div class="Extension">
    <el-main>
      <el-tabs v-model="show_id" type="card">
        <el-tab-pane label="选手报名设置" name="first">
          <el-form label-width="150px">
            <!--选手报名需审核-->
            <el-form-item label="选手报名需审核">
              <el-radio v-model="basic.is_check" label="1">是</el-radio>
              <el-radio v-model="basic.is_check" label="0">否</el-radio>
            </el-form-item>
            <!--姓名-->
            <el-form-item label="姓名">
              <el-radio-group v-model="basic.name">
                <el-radio-button label="0">必填</el-radio-button>
                <el-radio-button label="1">选填</el-radio-button>
                <el-radio-button label="2">不显示</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <!--手机号码-->
            <el-form-item label="手机号码">
              <el-radio-group v-model="basic.phone_no">
                <el-radio-button label="0">必填</el-radio-button>
                <el-radio-button label="1">选填</el-radio-button>
                <el-radio-button label="2">不显示</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <!--地址-->
            <el-form-item label="地址">
              <el-radio-group v-model="basic.address">
                <el-radio-button label="0">必填</el-radio-button>
                <el-radio-button label="1">选填</el-radio-button>
                <el-radio-button label="2">不显示</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <!--用户描述-->
            <el-form-item label="用户描述">
              <el-radio-group v-model="basic.desc">
                <el-radio-button label="0">必填</el-radio-button>
                <el-radio-button label="1">选填</el-radio-button>
                <el-radio-button label="2">不显示</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <!--图片上传最大数量-->
            <el-form-item label="图片上传最大数量">
              <el-col :span="5">
                <el-input v-model="basic.pic_num"></el-input>
              </el-col>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="榜单设置" name="second">
          <el-form label-width="150px">
            <!--上榜粉丝最低票数限制-->
            <el-form-item label="上榜粉丝最低票限制">
              <el-col :span="5">
                <el-input v-model="bangdan.ticket_num"></el-input>
              </el-col>
              <el-col :span="24" style="margin:15px 0">
                <el-tag type="success">上榜粉丝最低票数限制为空时，对上榜票数不限制</el-tag>
              </el-col>
            </el-form-item>
          </el-form>
          <el-form label-width="150px">
            <!--上榜人数-->
            <el-form-item label="上榜人数">
              <el-col :span="5">
                <el-input v-model="bangdan.list_num"></el-input>
              </el-col>
              <el-col :span="24" style="margin:15px 0">
                <el-tag type="success">不填写上榜粉丝人数，排行榜显示上榜人数为前50位粉丝</el-tag>
              </el-col>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="页面设置" name="third">
          <el-form label-width="150px">
            <!--排序方式-->
            <el-form-item label="排序方式">
              <el-radio-group v-model="page.sort">
                <el-radio-button label="0">参与时间倒序</el-radio-button>
                <el-radio-button label="1">按票数从高到低</el-radio-button>
                <el-radio-button label="2">编号从低到高</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <!--显示方式-->
            <el-form-item label="显示方式">
              <el-radio-group v-model="page.show_method">
                <el-radio-button label="0">单排显示</el-radio-button>
                <el-radio-button label="1">双排显示</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <!--页面显示-->
            <el-form-item label="页面显示">
              <el-radio-group v-model="page.page_show">
                <el-radio-button label="0">瀑布流显示</el-radio-button>
                <el-radio-button label="1">对称显示</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <!--每页显示选手数量-->
            <el-form-item label="每页显示选手数量">
              <el-col :span="5">
                <el-input v-model="page.people_num"></el-input>
              </el-col>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="防作弊设置" name="fourth">
          <el-form label-width="150px">
            <!--选手每日获取票数最大值-->
            <el-form-item label="每日获取票数最大值">
              <el-col :span="5">
                <el-input v-model="cheat.per_day_tickets_num"></el-input>
              </el-col>
              <el-col :span="24" style="margin:15px 0">
                <!--<el-tag type="success">不填写选手每日获取投票最大值，选手每日获取投票最大值为50票</el-tag>-->
              </el-col>
            </el-form-item>
            <!--时间限制-->
            <el-form-item label="时间限制">
              <el-col :span="3">
                <el-input v-model="cheat.time_district"></el-input>
              </el-col>
              <el-col :span="4" style="text-align: center;">分钟内不能超过</el-col>
              <el-col :span="3">
                <el-input v-model="cheat.per_min_ticket_num"></el-input>
              </el-col>
              <el-col :span="1" style="text-align: center;">票</el-col>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>


      <el-button style="margin: 0 auto;display: block;" @click="save">保存</el-button>
    </el-main>
  </div>
</template>

<script>
  import { setVotingExtra } from '@/api/vote'
  import { votingExt } from '@/api/vote'
  export default {
    data() {
      return {
        show_id: 'first',
        basic: {
          is_check: '1',
          name: '',
          phone_no: '',
          address: '',
          desc: '',
          pic_num: ''
        },
        bangdan: {
          ticket_num: '',
          list_num: ''
        },
        page: {
          sort: '',
          show_method: '',
          page_show: '',
          people_num: ''
        },
        cheat: {
          per_day_tickets_num: '',
          time_district: '',
          per_min_ticket_num: ''
        },
        activity_id: ''
      }
    },
    methods: {
      save() {
        if (this.basic.name === '' || this.basic.phone_no === '' || this.basic.address === '' || this.basic.desc === '' || this.basic.pic_num === '') {
          this.$message.error('请完善选手报名设置信息！')
          return
        }
        if (this.bangdan.ticket_num === '' || this.bangdan.list_num === '') {
          this.$message.error('请完善榜单设置信息！')
          return
        }
        if (this.page.sort === '' || this.page.show_method === '' || this.page.page_show === '' || this.page.people_num === '') {
          this.$message.error('请完善页面设置！')
          return
        }
        if (this.cheat.per_day_tickets_num === '' || this.cheat.time_district === '' || this.cheat.per_min_ticket_num === '') {
          this.$message.error('请完善防作弊设置！')
          return
        }
        const Data = {
          basic: JSON.stringify(this.basic),
          bangdan: JSON.stringify(this.bangdan),
          page: JSON.stringify(this.page),
          cheat: JSON.stringify(this.cheat),
          activity_id: this.activity_id
        }
        setVotingExtra(Data)
          .then((result) => {
            !result.code ? this.$router.push({ name: 'vote' }) : this.$message.error('扩展设置失败！')
          })
      }
    },
    mounted() {
      this.$route.query.activity_id ? this.activity_id = this.$route.query.activity_id : ''
      votingExt(this.$route.query.activity_id)
        .then((result) => {
          console.log(result)
          this.basic = {
            is_check: result.basic.is_check,
            name: result.basic.name,
            phone_no: result.basic.phone_no,
            address: result.basic.address,
            desc: result.basic.desc,
            pic_num: result.basic.pic_num
          }
          this.bangdan = {
            ticket_num: result.bangdan.ticket_num,
            list_num: result.bangdan.list_num
          }
          this.page = {
            sort: result.page.sort,
            show_method: result.page.show_method,
            page_show: result.page.page_show,
            people_num: result.page.people_num
          }
          this.cheat = {
            per_day_tickets_num: result.cheat.per_day_tickets_num,
            time_district: result.cheat.time_district,
            per_min_ticket_num: result.cheat.per_min_ticket_num
          }
        })
    }
  }
</script>

<style>
</style>
