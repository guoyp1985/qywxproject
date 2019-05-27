<style lang="less">
.bind-factory-page{
  background-color:#f2f2f2;
  .page-inner{background: linear-gradient(#6f6e6e, #000);border-radius:10px;width:90%;color:#F5CD91;margin:20px auto;position:relative;}
  .border-right.b_right_after:after{top:20%;bottom:20%;}
  .box-area{width:100%;padding:15px 0;margin-top:10px;text-align:center;}
  .box-area1{width:100%;padding:15px 10px;box-sizing:border-box;margin-top:10px;background-color:#fff0ef;border-radius:5px;}
  .txt_cell{width:80px;}
  .cell-item{
    border-top:#F5CD91 1px solid;width:100%;padding-top:15px;padding-bottom:10px;margin-top:10px;
    .txt_cell{width:75px;}
    .btn_cell{
      width:100px;
      .btn{width:80px;height:30px;border-radius:20px;text-align: center;background-color:#F5CD91;color:#000;}
    }
  }
  .conarea{
    width:100%;border-top-left-radius:10px;border-top-right-radius:10px;padding:18px 18px 10px;box-sizing: border-box;position:relative;
    .right-txt{
      position:absolute;right:10px;top:15px;
      .al{font-size:20px;}
    }
    .txt{text-align:center;margin-top:5px;}
  }
  .avatar{margin:0 auto;width:65px;height:65px;border-radius:50%;border:#fff 3px solid;box-sizing: border-box;}
  .avatar img{width:100%;height:100%;border-radius:50%;object-fit: cover;}
  .btnarea{
    width:100%;height:50px;font-weight:bold;
    .btn{width:85%;margin:0 auto;height:40px;border-radius:5px;background-color:#F5CD91;color:#000;font-size:16px;}
    .btn.dark{background-color:#ECAC4D;}
  }
  .form-control{
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
    .txt{font-weight: 600;width:60px;text-align:left;}
    .btn-code{
      background-color:#ECAC4D;
      color: #000;
      margin-left: 10px;
      border-radius: 5px;
      padding: 15px 0;
      width: 160px;
      text-align:center;
    }
    .disabled{background-color: #ccc;color: #000;}
    .xcode{background-color: #ccc;}
    input {flex: 1;background-color: transparent;padding: 10px 5px 10px 10px;border:#F5CD91 1px solid;border-radius:5px;color:#fff;}
  }
  checkbox{transform: scale(0.8);}
  checkbox .wx-checkbox-input.wx-checkbox-input-checked{border-color:#ECAC4D;color:#ECAC4D;}
  checkbox .wx-checkbox-input.wx-checkbox-input-checked::before{border-color:#ECAC4D;color:#ECAC4D;}
}
</style>
<template>
  <div class="containerarea bg-white font14 bind-factory-page">
    <template v-if="showContainer">
      <div class="page-inner">
        <div class="conarea">
          <div class="avatar">
            <img :src="loginUser.avatar" />
          </div>
          <div class="txt">{{loginUser.linkman}}</div>
          <template v-if="!loginUser.regwid">
            <div class="txt" >请先完善信息成为合伙人！</div>
            <div class="form-control">
              <text class="txt">手机号</text>
              <input v-model="telphone" maxlength="11" bindinput="inputTelphone" type="number" name="telphone" placeholder="请输入手机号"/>
            </div>
            <div class="form-control">
              <text class="txt">验证码</text>
              <input v-model="xcode" bindinput="inputXcode" type="number" name="xcode" placeholder="请输入验证码" />
              <div class="btn-code" @click="getXcode" :class="{'disabled' : count !== countNum}">{{message}}</div>
            </div>
            <div class="form-control">
              <text class="txt">身份证号</text>
              <input v-model="idcard" maxlength="18" bindinput="inputIdcard" type="text" name="idcard" placeholder="请输入身份证号"/>
            </div>
            <div class="btnarea flex_center">
              <div class="btn flex_center dark" @click="toApply">成为合伙人</div>
            </div>
          </template>
          <template v-else>
            <div class="flex_left cell-item">
              <div class="txt_cell font14">可提现金额</div>
              <div class="flex_cell bold font16">￥{{groupsData.waitMoney}}</div>
              <div class="btn_cell flex_right" report-submit="true">
                <div class="btn flex_center font14" @click="toRevenue">去提现</div>
              </div>
            </div>
          </template>
        </div>
      </div>
      <!-- <div class="mt10 bg-white">
        <div class="padding20">
          <div class="box-area1">
            <div class="color-theme bold">1、</div>
          </div>
        </div>
      </div> -->
    </template>
  </div>
</template>

<script>
import {} from 'vux'
import Time from '#/time'
import Reg from '#/reg'
import ENV from 'env'
import { User } from '#/storage'

const TimeCount = 60
const BokaApi = ENV.BokaApi
export default {
  components: {
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    },
    staytimeFormat: function (value) {
      let ret = ''
      let stay = parseInt(value)
      if (stay < 60) {
        ret = `${stay}秒`
      } else if (stay >= 60 && stay < 3660) {
        let m = Math.floor(stay / 60)
        let s = stay % 60
        ret = `${m}分钟${s}秒`
      } else if (stay >= 3660) {
        let h = Math.floor(stay / 3660)
        let val1 = stay % 3660
        let m = Math.floor(val1 / 60)
        let s = val1 % 60
        ret = `${h}小时${m}分钟${s}秒`
      }
      return ret
    }
  },
  data () {
    return {
      showContainer: false,
      query: {},
      loginUser: {},
      options: {},
      globalData: {},
      message: '获取验证码',
      count: 60,
      countNum: 60,
      intervalId: null,
      xcode: '',
      xcode1: '',
      telphone: '',
      getXcodeFlag: 0,
      submitIng: false,
      applyMobile: null,
      idcard: '',
      groupsData: {}
    }
  },
  methods: {
    toRevenue () {
      let params = this.$util.handleAppParams(this.query, {})
      this.$router.push({path: '/factoryRevenue', query: params})
    },
    getXcode () {
      if (this.getXcodeFlag) return
      clearInterval(this.intervalId)
      if (Reg.rPhone.test(this.telphone)) {
        this.$vux.loading.show()
        this.$http.get(`${BokaApi}/api/verifyMobile`, {
          // params: {type: 'apply', phone: this.telphone}
          params: {phone: this.telphone}
        }).then(res => {
          this.$vux.loading.hide()
          const data = res.data
          if (data.flag) {
            this.$vux.toast.text('验证码发送成功', 'middle')
            this.xcode1 = data.data
            console.log(typeof this.xcode1)
            this.applyMobile = this.telphone
            this.getXcodeFlag = 1
            this.intervalId = setInterval(() => {
              console.log('进入到了倒计时方法')
              this.count--
              if (!this.count) {
                this.count = TimeCount
                this.message = '获取验证码'
                clearInterval(this.intervalId)
                this.getXcodeFlag = false
              } else {
                this.message = `${this.count}秒`
              }
            }, 1000)
          } else {
            this.getXcodeFlag = 0
            this.applyMobile = null
            this.$vux.toast.show({
              text: data.error,
              type: !data.flag ? 'warn' : 'success',
              time: this.$util.delay(data.error)
            })
            clearInterval(this.intervalId)
          }
        })
      } else {
        this.$vux.toast.text('请输入正确的手机号', 'middle')
      }
    },
    toApply () {
      console.log('申请时的手机号')
      console.log(this.telphone)
      if (this.$util.trim(this.telphone) === '') {
        this.$vux.toast.text('请输入手机号', 'middle')
        return false
      }
      if (!Reg.rPhone.test(this.telphone)) {
        this.$vux.toast.text('请输入正确的手机号', 'middle')
        return false
      }
      if (!this.xcode) {
        this.$vux.toast.text('请输入验证码', 'middle')
        return false
      }
      if (this.applyMobile && this.telphone !== this.applyMobile) {
        this.$vux.toast.text('请重新获取验证码', 'middle')
        return false
      }
      if (this.xcode !== this.xcode1) {
        this.$vux.toast.text('验证码错误', 'middle')
        return false
      }
      if (this.$util.trim(this.idcard) === '') {
        this.$vux.toast.text('请输入身份证号', 'middle')
        return false
      }
      if (!this.submitIng) {
        clearInterval(this.intervalId)
        this.submitIng = true
        this.$vux.loading.show()
        let params = {
          mobile: this.telphone,
          verifycode: this.xcode,
          idcard: this.idcard
        }
        if (this.query.appid) {
          params.appid = this.query.appid
        }
        return false
        this.$http.post(`${BokaApi}/api/miniopen/bindRetailer`, params).then(res => {
          this.$vux.loading.hide()
          const data = res.data
          this.submitIng = false
          let error = data.flag ? '成功' : data.error
          this.$vux.toast.show({
            text: error,
            type: !data.flag ? 'warn' : 'success',
            time: this.$util.delay(error),
            onHide: () => {
              if (this.query.minibackurl) {
                let minibackurl = decodeURIComponent(this.query.minibackurl)
                if (this.query.backtype === 'relaunch') {
                  this.$wechat.miniProgram.reLaunch({url: `${minibackurl}`})
                } else if (this.query.backtype === 'redirect') {
                  this.$wechat.miniProgram.redirectTo({url: `${minibackurl}`})
                } else {
                  this.$wechat.miniProgram.navigateTo({url: `${minibackurl}`})
                }
              }
            }
          })
        })
      }
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.loginUser = User.get()
      if (this.loginUser.regwid) {
        this.showContainer = true
      } else {
        this.$http.get(`${BokaApi}/api/user/show`).then(res => {
          const data = res.data
          this.loginUser = data
          User.set(this.loginUser)
          this.showContainer = true
        })
      }
    }
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less" scoped>
.textarea-outer{padding:10px;}
.textarea-outer .weui-cells{margin-top:0;}
.textarea-outer .weui-cells:before{display:none;}
.textarea-outer .weui-cells:after{display:none;}
</style>
