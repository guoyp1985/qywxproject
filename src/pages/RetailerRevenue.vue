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
      <div class="align_center pb10 font30 bold" style="color:#FF6B63;">{{retailerInfo.waitcash}}</div>
      <div class="flex_center pt20">
        <div class="item flex_center mr10" @click="clickwechat">提现至零钱</div>
        <div class="item flex_center ml10" @click="clickbank">提现至银行卡</div>
      </div>
    </div>
    <div class="btom-content">
      <div class="list flex_table mt20" @click="toIncome">
        <div class="align_left">待结算金额</div>
        <div class="moneyNum">{{retailerInfo.pendingmoney}}元<span class="color-gray pl10">></span></div>
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
              <div class="flex_cell color-gray">可提现金额￥{{retailerInfo.waitcash}}</div>
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
              <div class="flex_cell color-gray">可提现金额￥{{retailerInfo.waitcash}}</div>
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
              <div class="bold">第一条 手续费</div>
              <div>1. 交易手续费：卖家需按订单交易额（含运费）的0.6%承担交易手续费，最低收费金额0.01元，不足0.01元按照0.01元收取。</div>
              <div>2. 提现手续费：</div>
              <div>提现至微信零钱：无需支付手续费。</div>
              <div>提现至银行卡：每笔提现扣除提现金额的0.1%，最低1元，最高25元。</div>
              <div class="bold mt5">第二条 提现规则</div>
              <div>1. 线上交易的订单，需待买家确认收货后，才可以通过“我的收入”查看并提现收益。</div>
              <div>2. 待提现金额不足1元时无法进行提现。</div>
              <div>3. 微信规定每日提现至微信零钱的额度为5千元，每日提现至银行卡的额度为2万元。</div>
              <div>4. 提现至银行卡的到账时间为1-3日内，具体以银行到账时间为准。</div>
              <div class="bold mt5">第三条 退款订单处理规则</div>
              <div>1. 当订单为“待发货”状态时，买家可主动发起交易退款，系统将整单全额退款，不收取手续费。</div>
              <div>2. 当订单为“已发货或已收货”状态时，线上无法申请及处理交易退款，买家可与卖家互加好友，线下协商解决，手续费不予退还。</div>
              <div class="bold mt5">第四条 确认收货规则</div>
              <div>线上交易的订单，若买家没有主动确认收货，系统将在卖家发货后的第7天自动确认收货。</div>
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
import { User } from '#/storage'
import ENV from 'env'
export default {
  directives: {
    TransferDom
  },
  components: {
    Popup
  },
  data () {
    return {
      loginUser: {},
      query: {},
      retailerInfo: {waitcash: '0.00'},
      wechatShow: false,
      bankShow: false,
      showpopup: false,
      cashMoney: '',
      cashBankMoney: '',
      fromPage: ''
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
      this.$router.push({path: '/bindingBank', query: {fromPage: this.fromPage}})
    },
    toIncome () {
      let params = {}
      if (this.query.appid) {
        params.appid = this.query.appid
      }
      this.$router.push({path: '/income', query: params})
    },
    toDetail () {
      let params = {flag: 2}
      if (this.query.appid) {
        params.appid = this.query.appid
      }
      this.$router.push({path: '/income', query: params})
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
        if (!this.loginUser.bankcardno || this.loginUser.bankcardno === '') {
          this.$vux.confirm.show({
            content: `您还没有绑定银行卡`,
            confirmText: '去绑定',
            onConfirm: () => {
              this.$router.push({path: '/bindingBank', query: {fromPage: this.fromPage}})
            }
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
        let waitcash = parseFloat(this.retailerInfo.waitcash.replace(/,/g, ''))
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
        let postData = {money: inputMoney, type: type}
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
            this.retailerInfo.waitcash = data.waitcash
            this.loginUser.retailerinfo = this.retailerInfo
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
        this.cashBankMoney = this.retailerInfo.waitcash
      } else {
        this.cashMoney = this.retailerInfo.waitcash
      }
    }
  },
  activated () {
    this.loginUser = User.get()
    this.query = this.$route.query
    if (this.query.appid) {
      this.fromPage = encodeURIComponent(`/retailerRevenue?appid=${this.query.appid}`)
    } else {
      this.fromPage = encodeURIComponent('/retailerRevenue')
    }
    this.$http.get(`${ENV.BokaApi}/api/retailer/info`).then(res => {
      const data = res.data
      if (data.flag) {
        this.retailerInfo = data.data
        this.loginUser.retailerinfo = this.retailerInfo
        User.set(this.loginUser)
      }
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
