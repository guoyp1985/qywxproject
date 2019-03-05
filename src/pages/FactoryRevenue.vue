<template>
  <div class="containerarea font14 income" ref="revenueContainer">
    <div class="inhead">
      <div class="in-item flex_center pr20 pl20 pt20">
        <div class="item mr10 flex_center" @click="toBank">我的银行卡</div>
        <div class="item ml10 flex_center" @click="popupexplain">提现说明</div>
      </div>
    </div>
    <div class="middle-content">
      <div class="align_center color-gray pt10 pb10">可提现金额（元）</div>
      <div class="align_center pb10 font30 bold" style="color:#FF6B63;">{{factoryInfo.waitcash}}</div>
      <div class="flex_center pt20">
        <!-- <div class="item flex_center mr10" @click="clickwechat">提现至零钱</div> -->
        <div class="item flex_center" @click="clickbank">提现至银行卡</div>
      </div>
    </div>
    <div class="btom-content">
      <div class="list flex_table mt20" @click="toIncome">
        <div class="align_left">待结算金额</div>
        <div class="moneyNum">{{factoryInfo.pendingmoney}}元<span class="color-gray pl10">></span></div>
      </div>
      <div class="pl20 pt10 pb10 color-gray font12">等待订单确认收货后方可结算并提现</div>
      <div class="list flex_table" @click="toDetail">
        <div class="align_left">提现明细</div>
        <div class="moneyNum"><span class="color-gray pl10">></span></div>
      </div>
    </div>
    <!-- 提现至微信零钱 -->
    <div class="mceng" v-if="wechatShow">
      <div class="flex_center">
        <div class="wechatShow" v-if="wechatShow">
          <div class="align_center b_bottom_after pb10">提现至微信零钱</div>
          <div class="pt10 pb10 pr10 pl10">
            <div class="flex_table">
              <div class="align_left color-gray2">到账时间</div>
              <div class="pl10">实时到账 (无手续费)</div>
            </div>
            <div class="flex_table mt10">
              <div class="align_left color-gray2">提现金额</div>
              <div class="pl10">(最低提现1元)</div>
            </div>
            <div class="flex_table mt10 b_bottom_after">
              <div class="align_left font24 pb10 bold">￥</div>
              <input v-model="cashMoney" class="font20 pb10 pl10 w_100" @blur="onBlur" type="text" placeholder="输入提现金额"/>
            </div>
            <div class="mt5 db-flex">
              <div class="flex_cell color-gray">可提现金额￥{{factoryInfo.waitcash}}</div>
              <div class="flex_right w80 color-theme" @click="clickAll">全部提现</div>
            </div>
            <div class="btnSubmit" @click="getWechatCash">确认提现</div>
          </div>
        </div>
      </div>
      <div class="flex_center close-area">
        <span class="al al-close font40 bold color-white" @click="closeWechat"></span>
      </div>
    </div>
    <!-- 提现至银行卡 -->
    <div class="mceng" v-if="bankShow">
      <div class="flex_center">
        <div class="wechatShow" v-if="bankShow">
          <div class="align_center b_bottom_after pb10">提现至银行卡</div>
          <div class="pt10 pb10 pr10 pl10">
            <div class="flex_table">
              <div class="align_left color-gray2">到账时间</div>
              <div class="pl10"> 1-3天(1%手续费)</div>
            </div>
            <div class="flex_table mt10">
              <div class="align_left color-gray2">提现金额</div>
              <div class="pl10">(最低提现1元)</div>
            </div>
            <div class="flex_table mt10 b_bottom_after">
              <div class="align_left font24 pb10 bold">￥</div>
              <input v-model="cashBankMoney" class="font20 pb10 pl10 w_100" @blur="onBlur" type="text" placeholder="输入提现金额"/>
            </div>
            <div class="mt5 db-flex">
              <div class="flex_cell color-gray">可提现金额￥{{factoryInfo.waitcash}}</div>
              <div class="flex_right w80 color-theme" @click="clickAll('bank')">全部提现</div>
            </div>
            <div class="btnSubmit" @click="getBankCash">确认提现</div>
          </div>
        </div>
      </div>
      <div class="flex_center close-area">
        <span class="al al-close font40 bold color-white" @click="closeWechat"></span>
      </div>
    </div>
    <div v-transfer-dom class="x-popup">
      <popup v-model="showpopup" height="100%">
        <div class="popup1">
          <div class="popup-top flex_center">{{ $t('Get cash explain') }}</div>
          <div class="popup-middle font14">
            <div class="padding10">
              <cash-txt></cash-txt>
            </div>
          </div>
          <div class="popup-bottom flex_center">
            <div class="flex_cell bg-gray color-white h_100 flex_center" @click="closepopup">{{ $t('Know txt') }}</div>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>
<script>
import { Popup, TransferDom } from 'vux'
import CashTxt from '@/components/CashTxt'
import { User } from '#/storage'
import ENV from 'env'
export default {
  directives: {
    TransferDom
  },
  components: {
    Popup, CashTxt
  },
  data () {
    return {
      loginUser: {},
      query: {},
      factoryInfo: {waitcash: '0.00', pendingmoney: '0.00'},
      wechatShow: false,
      bankShow: false,
      showpopup: false,
      cashMoney: '',
      cashBankMoney: '',
      fromPage: '',
      fid: 0
    }
  },
  methods: {
    onBlur () {
      console.log('进入到了失焦页面')
      let revenueContainer = this.$refs.revenueContainer[0] ? this.$refs.revenueContainer[0] : this.$refs.revenueContainer
      setTimeout(() => {
        document.body.scrollTop = document.body.scrollHeight
        revenueContainer.scrollTop = revenueContainer.scrollHeight
      }, 100)
    },
    toBank () {
      this.$router.push({path: '/factoryBank', query: {fid: this.fid, fromPage: this.fromPage}})
    },
    toIncome () {
      let params = {fid: this.fid}
      if (this.query.appid) {
        params.appid = this.query.appid
      }
      this.$router.push({path: '/factoryIncome', query: params})
    },
    toDetail () {
      let params = {flag: 2, fid: this.fid}
      if (this.query.appid) {
        params.appid = this.query.appid
      }
      this.$router.push({path: '/factoryIncome', query: params})
    },
    clickwechat () {
      if (!this.loginUser.idcardno || this.loginUser.idcardno === '') {
        this.$router.push({path: '/authPhoto', query: {fromPage: this.fromPage}})
      } else {
        this.wechatShow = true
      }
    },
    clickbank () {
      if (!this.loginUser.idcardno || this.loginUser.idcardno === '') {
        this.$router.push({path: '/authPhoto', query: {fromPage: this.fromPage}})
      } else {
        if (!this.factoryInfo.bankcardno || this.factoryInfo.bankcardno === '') {
          this.$vux.toast.show({
            text: '请联系管理员绑定银行卡信息',
            type: 'text',
            width: '220px'
          })
          return false
        }
        this.bankShow = true
      }
    },
    popupexplain () {
      this.showpopup = !this.showpopup
    },
    closepopup () {
      this.showpopup = false
    },
    closeWechat () {
      this.wechatShow = false
      this.bankShow = false
      this.cashMoney = ''
      this.cashBankMoney = ''
      this.submitIng = false
    },
    cashEvent (inputMoney, type) {
      if (!this.submitIng) {
        if (inputMoney) {
          inputMoney = `${inputMoney}`
        }
        if (inputMoney && inputMoney.indexOf(',') > -1) {
          inputMoney = inputMoney.replace(/,/g, '')
        }
        if (!inputMoney || inputMoney === '' || isNaN(inputMoney)) {
          this.$vux.toast.show({
            text: '请输入正确的提现金额',
            width: '200px',
            type: 'text'
          })
          return false
        }
        let money = parseFloat(inputMoney)
        let waitcash = parseFloat(this.factoryInfo.waitcash.replace(/,/g, ''))
        if (money > waitcash) {
          this.$vux.toast.show({
            text: '提现金额不能超过可提现金额',
            width: '220px',
            type: 'text'
          })
          return false
        }
        if (money < 1) {
          this.$vux.toast.show({
            text: '提现金额最低为1元',
            width: '200px',
            type: 'text'
          })
          return false
        }
        this.submitIng = true
        let postData = {money: inputMoney, type: type, fid: this.fid}
        if (this.query.appid) {
          postData.appid = this.query.appid
        }
        this.$vux.loading.show()
        this.$http.post(`${ENV.BokaApi}/api/accounting/cashMoney`, postData).then(res => {
          this.$vux.loading.hide()
          const data = res.data
          this.$vux.toast.show({
            text: data.error,
            type: data.flag ? 'success' : 'warn',
            time: this.$util.delay(data.error)
          })
          if (data.flag) {
            this.factoryInfo.waitcash = data.waitcash
            this.loginUser.factoryInfo = this.factoryInfo
            User.set(this.loginUser)
          }
          this.closeWechat()
        })
      }
    },
    getWechatCash () {
      this.cashEvent(this.cashMoney, 'lingqian')
    },
    getBankCash () {
      this.cashEvent(this.cashBankMoney, 'yinhang')
    },
    clickAll (type) {
      if (type === 'bank') {
        this.cashBankMoney = this.factoryInfo.waitcash
      } else {
        this.cashMoney = this.factoryInfo.waitcash
      }
    }
  },
  activated () {
    this.loginUser = User.get()
    this.query = this.$route.query
    if (this.query.fid) {
      this.fid = this.query.fid
    } else {
      this.fid = this.loginUser.fid
    }
    if (this.query.appid) {
      this.fromPage = encodeURIComponent(`/factoryRevenue?fid=${this.fid}&appid=${this.query.appid}`)
    } else {
      this.fromPage = encodeURIComponent(`/factoryRevenue?fid=${this.fid}`)
    }
    this.$http.get(`${ENV.BokaApi}/api/factory/info`,
      { params: { fid: this.fid } }
    ).then(res => {
      const data = res.data
      const retdata = data.data ? data.data : data
      this.factoryInfo = retdata
      this.factoryInfo.waitcash = `${this.factoryInfo.waitcashmoney}`
    })
  }
}
</script>
<style lang="less">
  .income{
    background-color:#F2F2F2;height:100%;
    .inhead{
      width:100%;height:100px;background-color:#FF6B63;
      .mr20{margin-right:10px;}
      .item{width:100px;height:25px;background-color:#FF6B63;color:#fff;border-radius:20px;border:1px solid #fff;font-size:12px;box-sizing:border-box;}
    }
    .middle-content{
      width:90%;height:180px;background-color:#fff;border-radius:10px;border:1px solid #e5e5e5;margin: 0 auto;margin-top:-30px;
      .item{width:100px;height:25px;background-color:#fff;border-radius:20px;border:1px solid #FF6B63;font-size:12px;color:#FF6B63;box-sizing:border-box;}
    }
    .btom-content{
      .list{
        width:100%;padding:10px 20px;background-color:#fff;box-sizing:border-box;
        .moneyNum{margin-left:auto;}
      }
    }
    .mceng{position:fixed;top:0;bottom:0;left:0;right:0;background-color:rgba(0, 0, 0, 0.3);overflow:hidden;z-index:0;}
    .wechatShow{
      width:75%;padding:10px 0;background-color:#fff;border-radius:10px;margin:0 auto;box-sizing:border-box;margin-top:40%;
      input {color:#FF6B63;}
    }
    .btnSubmit{
      width:90%;padding:10px 0;background-color:#FF6B63;color:#fff;text-align:center;
      border-radius:5px;margin:0 auto;margin-top:50px;
    }
    .close-area{text-align:center;}
  }
</style>
