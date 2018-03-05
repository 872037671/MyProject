<template>
  <div class="icon">
    <el-tabs v-model="activeName">
      <el-tab-pane label="方式一：点亮图标" name="first">
        <el-form label-width="120px">
          <!--点亮图标得好礼-->
          <el-form-item label="点亮图标得好礼">
            <el-checkbox v-model="type_icon.statuses">启用</el-checkbox>
          </el-form-item>
          <!--分享范围-->
          <el-form-item label="分享范围">
            <el-radio v-model="type_icon.addLightBase.share_range" label="1">朋友圈</el-radio>
            <el-radio v-model="type_icon.addLightBase.share_range" label="2">好友，群</el-radio>
            <el-radio v-model="type_icon.addLightBase.share_range" label="3">朋友圈/好友,群</el-radio>
          </el-form-item>
          <!--图标名称-->
          <el-form-item label="图标名称">
            <el-input v-model="type_icon.addLightBase.name"></el-input>
            <el-col :span="24" style="margin:15px 0">
              <el-tag type="success">图标名称</el-tag>
            </el-col>
          </el-form-item>
          <!--暗图标-->
          <el-form-item label="图标上传">
            <el-col :span="24">
              <div>
                <el-upload
                  class="avatar-uploader"
                  :action="upload_url"
                  :headers="postHeaders"
                  :show-file-list="false"
                  style="display: inline-block;"
                  :on-success="AvatarSuccessdark">
                  <el-button>暗图标</el-button>
                </el-upload>
                <el-upload
                  class="avatar-uploader"
                  :action="upload_url"
                  :headers="postHeaders"
                  :show-file-list="false"
                  style="display: inline-block;"
                  :on-success="AvatarSuccesslight">
                  <el-button>亮图标</el-button>
                </el-upload>
                <el-button type="primary">请先上传暗图标！</el-button>
                <!-- <el-button @click="addIcon">添加</el-button> -->
              </div>
              <div v-for="(item, index) in type_icon.showBase">
                <div style="display: inline-block;width: 100px;text-align: center;">
                  <img style="width: 100px;" :src="item.dark" class="avatar">
                  <el-tag type="info">暗图标</el-tag>
                </div>
                <div style="display: inline-block;width: 100px;text-align: center;">
                  <img style="width: 100px;" :src="item.light" class="avatar">
                  <el-tag type="success">亮图标</el-tag>
                </div>
                <!-- <el-button type="danger" size="small" @click="deleteIcons(item, index)">删除</el-button> -->
              </div>
            </el-col>
          </el-form-item>
          <!--图标个数-->
          <el-form-item label="图标个数">
            <el-input v-model="type_icon.addLightBase.pic_num" @blur="icon_blur"></el-input>
            <el-col :span="24" style="margin:15px 0">
              <el-tag type="success">点亮图标领取礼，所需个数</el-tag>
            </el-col>
          </el-form-item>
          <!--礼品图片-->
          <el-form-item label="礼品图片">
            <el-col :span="24">
              <el-upload
                class="avatar-uploader"
                :action="upload_url"
                :headers="postHeaders"
                :show-file-list="false"
                :on-success="gift_picAvatarSuccess">
                <img v-if="type_icon.gift_pic" :src="type_icon.gift_pic" style="width: 200px;" class="avatar">
                <el-button>上传</el-button>
              </el-upload>
            </el-col>
            <el-col :span="8">
              <el-tag type="success">请上传尺寸比例为2/1</el-tag>
            </el-col>
          </el-form-item>
          <el-button style="margin: 0 auto;display: block;" @click="save">保存</el-button>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="方式二：裂变红包" name="second">
        <el-form label-width="120px">
          <!--裂变红包-->
          <el-form-item label="裂变红包">
            <el-checkbox v-model="type_red_packet.statuses">启用</el-checkbox>
          </el-form-item>
          <!--红包标题-->
          <el-form-item label="红包标题">
            <el-input v-model="type_red_packet.add_red_base.title"></el-input>
            <el-col :span="24" style="margin:15px 0">
              <el-tag type="success">红包主题名称，显示在红包领取页面，10个字内</el-tag>
            </el-col>
          </el-form-item>
          <!--红包副标题-->
          <el-form-item label="红包副标题">
            <el-input v-model="type_red_packet.add_red_base.title_ext"></el-input>
            <el-col :span="24" style="margin:15px 0">
              <el-tag type="success">打开红包后标题下方显示的文字 一般为感谢语</el-tag>
            </el-col>
          </el-form-item>
          <!--发放规则-->
          <el-form-item label="发放规则">
            <el-select v-model="type_red_packet.chooseValue" placeholder="请选择" @change="changeSelect">
              <el-option
                v-for="item in type_red_packet.options"
                :key="item.value"
                :label="item.label"
                value-key="value"
                :value="item"
                :disabled="item.disabled">
              </el-option>
            </el-select>
            <!--<el-button @click="addRules">添加规则</el-button>-->
            <el-col :span="24" style="margin:15px 0">
              <el-tag type="success">可多种类型规则混合使用，但建议最好一个活动只用某一种类规则</el-tag>
            </el-col>
            <!--添加规则内容-->
            <el-row style="margin-top: 10px;" v-for="(item, index) in type_red_packet.Temporary" :key="index">
              <el-tag style="margin-bottom: 10px;" type="info">{{item.label}}</el-tag><br />
              <el-col :span="10">
                <div class="box">
                  <label v-if="item.rule_id == 1">成交金额</label><el-input v-if="item.rule_id == 1" @blur="blur1(item.amount, index)" v-model="item.amount" class="input" placeholder="请输入内容"></el-input><label v-if="item.rule_id == 1" for="">元</label>
                  <label v-if="item.rule_id == 2">分享数</label><el-input v-if="item.rule_id == 2" @blur="blur2(item.amount, index)" v-model="item.amount" class="input" placeholder="请输入内容"></el-input><label v-if="item.rule_id == 2" for="">次</label>
                  <label v-if="item.rule_id == 3">转发数</label><el-input v-if="item.rule_id == 3" @blur="blur3(item.amount, index)" v-model="item.amount" class="input" placeholder="请输入内容"></el-input><label v-if="item.rule_id == 3" for="">次</label>
                  <label v-if="item.rule_id == 4">浏览数</label><el-input v-if="item.rule_id == 4" @blur="blur4(item.amount, index)" v-model="item.amount" class="input" placeholder="请输入内容"></el-input><label v-if="item.rule_id == 4" for="">次</label>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="box">
                  <label for="">获得</label><el-input v-model="item.money[0]" class="input" placeholder="请输入内容"></el-input><label for="">元</label>
                </div>
                <div class="box">
                  <label class="ins" for=""></label><el-input v-model="item.money[1]" class="input" placeholder="请输入内容"></el-input><label for="">元红包</label>
                </div>
              </el-col>
              <el-col :span="2"><el-button type="primary" @click="Delete_Temporary(index, item)">删除</el-button></el-col>
            </el-row>
          </el-form-item>
          <el-button style="margin: 0 auto;display: block;" @click="save_red_packet">保存</el-button>

        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import { getToken } from '@/utils/auth'
  import { addLight } from '@/api/cutGroup'
  import { getLightDetail } from '@/api/cutGroup'
  import { UploadUrl } from '@/utils/auth'
  import { addRed } from '@/api/cutGroup'
  import { getRedDetail } from '@/api/cutGroup'

  export default {
    data() {
      return {
        postHeaders: {
          'X-Token': getToken()
        },
        upload_url: UploadUrl,
        activeName: 'first',
        type_icon: {
          darkSave_Url: '',
          lightSave_Url: '',
          icon_arr_commit: [],
          gift: true,
          gift_pic: '',
          showBase: [],
          linshiData: [],
          linshiSaveData: [],
          statuses: false,
          addLightBase: {
            activity_id: '',
            status: '',
            share_range: '1',
            name: '',
            icons: [],
            pic_num: '',
            gift_pic: ''
          }
        },
        type_red_packet: {
          chooseValue: '',
          options: [{
            value: 1,
            label: '介绍朋友成交得红包',
            disabled: false
          }, {
            value: '2',
            label: '分享达标得红包',
            disabled: false
          }, {
            value: '3',
            label: '转发达标得红包',
            disabled: false
          }, {
            value: '4',
            label: '浏览达标得红包',
            disabled: false
          }],
          Temporary: [],
          statuses: false,
          add_red_base: {
            title: '',
            title_ext: '',
            status: '',
            rules: [],
            activity_id: ''
          }
        }
      }
    },
    watch: {
      addLightBase: {
        handler(val, oldval) {
          this.type_icon.showBase = []
          this.type_icon.linshiSaveData = []
          for (let icons_num = 0; icons_num < val.pic_num; icons_num++) {
            this.type_icon.showBase[icons_num] = { dark: this.type_icon.icon_arr_commit[0].dark, light: this.type_icon.icon_arr_commit[0].light }
            this.type_icon.linshiSaveData[icons_num] = { dark: this.type_icon.icon_arr_commit[0].save_dark, light: this.type_icon.icon_arr_commit[0].save_light }
          }
        },
        deep: true
      }
    },
    methods: {
      gift_picAvatarSuccess(res, file) {
        this.type_icon.gift_pic = URL.createObjectURL(file.raw)
        this.type_icon.addLightBase.gift_pic = res.data.data.save_url
      },
      AvatarSuccessdark(res, file) {
        this.type_icon.showBase = [{ dark: '', light: '', sort: '' }]
        this.type_icon.linshiSaveData = [{ dark: '', light: '', sort: '' }]
        this.type_icon.icon_arr_commit[0].dark = res.data.data.img_url
        this.type_icon.showBase[0].dark = res.data.data.img_url
        this.type_icon.linshiSaveData[0].dark = res.data.data.save_url
        this.type_icon.icon_arr_commit[0].save_dark = res.data.data.save_url
      },
      AvatarSuccesslight(res, file) {
        this.type_icon.icon_arr_commit[0].light = res.data.data.img_url
        this.type_icon.showBase[0].light = res.data.data.img_url
        this.type_icon.linshiSaveData[0].light = res.data.data.save_url
        this.type_icon.icon_arr_commit[0].save_light = res.data.data.save_url
      },
      // 图标个数改变影响图标组数量
      icon_blur() {
        this.type_icon.showBase = []
        this.type_icon.linshiSaveData = []
        for (let icons_num = 0; icons_num < this.type_icon.addLightBase.pic_num; icons_num++) {
          this.type_icon.showBase[icons_num] = { dark: this.type_icon.icon_arr_commit[0].dark, light: this.type_icon.icon_arr_commit[0].light }
          this.type_icon.linshiSaveData[icons_num] = { dark: this.type_icon.icon_arr_commit[0].save_dark, light: this.type_icon.icon_arr_commit[0].save_light }
        }
      },
      save() {
        if (this.type_icon.statuses === true) {
          this.type_icon.addLightBase.status = 1
        } else {
          this.type_icon.addLightBase.status = 0
        }
        this.type_icon.addLightBase.icons = JSON.stringify(this.type_icon.linshiSaveData[0])
        if (!this.type_icon.addLightBase.status) {
          this.type_icon.addLightBase.status = false
        }
        // 判断数据是否合格
        if (this.type_icon.addLightBase.name === '') {
          this.$message.error('请填写图标名称！')
          return
        }
        if (this.type_icon.addLightBase.icons === '[]') {
          this.$message.error('请添加完整的图标！')
          return
        }
        const pic_num_type = Number(this.type_icon.addLightBase.pic_num)
        if (!Number.isInteger(pic_num_type) || this.type_icon.addLightBase.pic_num < 0) {
          this.$message.error('请填写正确图标格式！（不得小于上传图标组数且为整数）')
          return
        }
        if (this.type_icon.addLightBase.gift_pic === '') {
          this.$message.error('请上传礼品图片！')
          return
        }
        addLight(this.type_icon.addLightBase)
          .then((result) => {
            // result ? this.$router.push({ name: 'redpacketGroupon', query: { activity_id: this.$route.query.activity_id }}) : ''
            this.$router.push({ name: 'cutGroup' })
          })
      },
      // 分裂红包的方法!!!
      changeSelect(value, label) {
        this.type_red_packet.Temporary.push({ rule_id: value.value, label: value.label, amount: '', money: ['', ''] })
        value.disabled = true
      },
      // 删除一个
      Delete_Temporary(index, data) {
        const id_biaoshi = this.type_red_packet.Temporary[index].rule_id
        this.type_red_packet.options[id_biaoshi - 1].disabled = false
        this.type_red_packet.Temporary.splice(index, 1)
      },
      blur1(value, index) {
        if (value < 1) {
          this.type_red_packet.Temporary[index].amount = 1
          this.$message.error('金额不得小于1元！')
        }
      },
      blur2(value, index) {
        if (value < 1) {
          this.type_red_packet.Temporary[index].amount = 1
          this.$message.error('次数不能小于1次！')
        }
      },
      blur3(value, index) {
        if (value < 1) {
          this.type_red_packet.Temporary[index].amount = 1
          this.$message.error('次数不能小于1次！')
        }
      },
      blur4(value, index) {
        if (value < 1) {
          this.type_red_packet.Temporary[index].amount = 1
          this.$message.error('次数不能小于1次！')
        }
      },
      save_red_packet() {
        if (this.type_red_packet.statuses === true) {
          this.type_red_packet.add_red_base.status = 1
        } else {
          this.type_red_packet.add_red_base.status = 0
        }
        const FalseData = []
        for (const val of this.type_red_packet.Temporary) {
          FalseData.push({ rule_id: val.rule_id, amount: val.amount, money: val.money, label: val.label })
        }
        this.type_red_packet.add_red_base.rules = JSON.stringify(FalseData)
        if (!this.type_red_packet.add_red_base.status) {
          this.type_red_packet.add_red_base.status = false
        }
        // 判断数据是否合格
        if (this.type_red_packet.add_red_base.title === '') {
          this.$message.error('请填写红包标题！')
          return
        }
        if (this.type_red_packet.add_red_base.title_ext === '') {
          this.$message.error('请填写红包副标题！')
          return
        }
        if (!this.type_red_packet.add_red_base.rules.length) {
          this.$message.error('请填写发放规则！')
          return
        }
        for (const zhi of this.type_red_packet.Temporary) {
          const numamout = Number(zhi.amount)
          if (zhi.amount < 1 || !Number.isInteger(numamout)) {
            this.$message.error('金额信息填写不正确!')
            zhi.amount = 1
            return
          }
          if (zhi.money[0] <= 0 || zhi.money[1] - zhi.money[0] < 0) {
            this.$message.error('获得红包填写信息填写不正确!')
            return
          }
        }
        addRed(this.type_red_packet.add_red_base)
          .then((result) => {
            this.$router.push({ name: 'cutGroup' })
          }).catch(reason => {
            console.log(reason)
          })
      }
    },
    mounted() {
      this.type_icon.addLightBase.activity_id = this.$route.query.activity_id
      getLightDetail(this.$route.query.activity_id)
        .then((result) => {
          if (result.status === 0) {
            this.type_icon.statuses = false
          } else {
            this.type_icon.statuses = true
          }
          this.type_icon.addLightBase = {
            activity_id: result.activity_id,
            status: result.status,
            share_range: JSON.stringify(result.share_range),
            name: result.name,
            icons: [],
            pic_num: result.pic_num,
            gift_pic: result.gift_pic
          }
          this.type_icon.gift_pic = result.url_prefix + result.gift_pic
          for (const val of result.icons) {
            this.type_icon.showBase.push({ dark: result.url_prefix + val.dark, light: result.url_prefix + val.light, sort: val.sort })
            this.type_icon.linshiSaveData.push({ dark: val.dark, light: val.light, sort: val.sort })
          }
          if (result.icons !== 0) {
            this.type_icon.icon_arr_commit = [{ dark: result.url_prefix + result.icons[0].dark, light: result.url_prefix + result.icons[0].light, sort: result.icons[0].sort, save_dark: result.icons[0].dark, save_light: result.icons[0].light }]
          }
        }).catch((result) => {
          this.type_icon.icon_arr_commit = [{ dark: '', light: '', sort: '', save_dark: '', save_light: '' }]
        })
      // 分裂红包
      this.type_red_packet.add_red_base.activity_id = this.$route.query.activity_id
      getRedDetail(this.$route.query.activity_id)
        .then((result) => {
          if (result.status === 0) {
            this.type_red_packet.statuses = false
          } else {
            this.type_red_packet.statuses = true
          }
          this.type_red_packet.add_red_base = {
            title: result.title,
            title_ext: result.title_ext,
            status: result.status,
            activity_id: result.activity_id
          }
          for (const val of result.rules) {
            this.type_red_packet.Temporary.push({ rule_id: val.rule_id, amount: val.amount, money: val.money, label: val.label })
            if (val.rule_id === 1) {
              this.type_red_packet.options[0].disabled = true
            } else if (val.rule_id === 2) {
              this.type_red_packet.options[1].disabled = true
            } else if (val.rule_id === 3) {
              this.type_red_packet.options[2].disabled = true
            } else if (val.rule_id === 4) {
              this.type_red_packet.options[3].disabled = true
            }
          }
        })
    }
  }
</script>

<style lang="scss">
  .box{
    width: 40%;
    float: left;
    display: flex;
    .input{
      width: 50%;
      margin: 0 15px;
    }
    .ins{
      width: 30px;
      height: 1px;
      background: #333;
      position: relative;
      top: 18px
    }
  }
</style>
