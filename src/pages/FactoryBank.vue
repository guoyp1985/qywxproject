<template>
  <div class="containerarea font14 bindingbank">
    <div class="bhead align_center font16 color-white">
      <div class="">绑定银行卡<span class="al al-wenhao problem" @click="popupexplain"></span></div>
    </div>
    <div class="mt10">
      <div class="form-item required bg-white">
        <div class="t-table">
          <div class="t-cell title-cell w40 font14 v_middle">姓名</div>
          <div class="t-cell input-cell v_middle" style="position:relative;">
            <input v-model="submitData.bankuser" type="text" class="input priceInput" name="username" placeholder="持卡人姓名" />
          </div>
          <div class="t-cell v_middle align_right font12" style="width:20px;">
            <span class="al al-kehu1 font18 color-gray2"></span>
          </div>
        </div>
      </div>
      <div class="form-item required bg-white">
        <div class="t-table">
          <div class="t-cell title-cell w40 font14 v_middle">卡号</div>
          <div class="t-cell input-cell v_middle" style="position:relative;">
            <x-input v-model="submitData.bankcardno" type="text" class="input priceInput" name="card" placeholder="持卡人银行卡号" :max="23" maxlength="23" size="23" @on-change="changeNo"></x-input>
          </div>
        </div>
      </div>
      <div class="form-item required bg-white" v-if="showRepeat">
        <div class="t-table">
          <div class="t-cell title-cell w60 font14 v_middle">确认卡号</div>
          <div class="t-cell input-cell v_middle" style="position:relative;">
            <x-input v-model="repeatNo" type="text" class="input priceInput" placeholder="持卡人银行卡号" :max="23" maxlength="23" size="23"></x-input>
          </div>
        </div>
      </div>
      <div class="form-item required bg-white">
        <div class="t-table">
          <div class="t-cell title-cell w40 font14 v_middle">银行</div>
          <div class="t-cell input-cell v_middle" style="position:relative;">
            <select v-model="submitData.bankcode" class="w_100" style="height:35px;">
              <option value='0'>请选择银行</option>
              <option v-for="(item,index) in cardList" :value="item.id">{{ item.name }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="flex_center color-white btn-bottom-red mt20" @click="bindEvent" v-if="loginUser.ismanager">绑定</div>
    <div class="flex_center mt20 color-theme" v-else>请联系管理员修改银行卡信息</div>
    <div class="mt20 padding20">
      <div class="bold">*注意事项</div>
      <div>1. 请确保持卡人姓名为本人姓名</div>
      <div>2. 请认真核对银行卡号是否正确</div>
      <div>3. 目前支持17家银行，更多银行逐步开放</div>
      <div class="bold mt20">*银行卡提现规则</div>
      <div>1. 银行卡每日提现额度为2万元</div>
      <div>2. 每笔提现手续费为提现金额的0.1%，最低1元，最高25元。</div>
      <div>3. 提现至银行卡到账时间为1-3日内，具体以银行到账时间为准。</div>
      <div>4. 若1-3日内提现未到账，请核对您的持卡人姓名、银行卡号、所属银行是否正确，更正后重新提现即可。</div>
    </div>
    <div v-transfer-dom class="x-popup">
      <popup v-model="showpopup" height="100%">
        <div class="popup1">
          <div class="popup-top flex_center">{{ $t('Get cash explain') }}</div>
          <div class="popup-middle font14">
            <div class="padding10">
              <div class="bold">第一条 手续费</div>
              <div>1. 交易手续费：聚客365卖家需按订单交易额（含运费）的0.6%承担交易手续费，最低收费金额0.01元，不足0.01元按照0.01元收取。</div>
              <div>2. 提现手续费：</div>
              <div>提现至微信零钱：无需支付手续费。</div>
              <div>提现至银行卡：每笔提现扣除提现金额的0.1%，最低1元，最高25元。</div>
              <div class="bold mt5">第二条 提现规则</div>
              <div>1. 线上交易的订单，需待买家确认收货后，才可以通过“我的收入”查看并提现收益。</div>
              <div>2. 待提现金额不足1元时无法进行提现。</div>
              <div>3. 微信规定每日提现至微信零钱的额度为5千元，每日提现至银行卡的额度为2万元。</div>
              <div>4. 提现至银行卡的到账时间为1-3日内，具体以银行到账时间为准。</div>
              <div class="bold mt5">第三条 退款订单处理规则</div>
              <div>1. 当订单为“待发货”状态时，买家可主动发起交易退款，聚客365将整单全额退款，不收取手续费。</div>
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
import { TransferDom, Popup, XInput } from 'vux'
import ENV from 'env'
import Reg from '#/reg'
import { User } from '#/storage'
export default {
  directives: {
    TransferDom
  },
  components: {
    Popup, XInput
  },
  data () {
    return {
      query: {},
      loginUser: {},
      viewData: {},
      submitData: {position: '', bankuser: '', bankcardno: '', bankcode: 0},
      cardList: [],
      showpopup: false,
      bindName: '',
      bindCardId: '',
      bindCardName: '',
      submitIng: false,
      repeatNo: '',
      showRepeat: false,
      isFirst: true,
      fid: 0
    }
  },
  methods: {
    initData () {
      this.submitData = {position: '', bankuser: '', bankcardno: '', bankcode: 0}
      this.isFirst = true
      this.showRepeat = false
    },
    popupexplain () {
      this.showpopup = !this.showpopup
    },
    closepopup () {
      this.showpopup = false
    },
    changeNo (value) {
      if (this.isFirst) {
        this.isFirst = false
        if (value !== this.viewData.bankcardno) {
          this.showRepeat = true
        }
      } else {
        this.showRepeat = true
      }
    },
    bindEvent () {
      if (!this.submitIng) {
        let postData = this.submitData
        let repeatNo = this.repeatNo
        postData.id = this.query.id
        if (!this.showRepeat) {
          if (postData.bankuser === '' || postData.bankcardno === '' || !postData.bankcode || postData.bankcode === '0') {
            this.$vux.toast.show({
              text: '请完善信息',
              type: 'text'
            })
            return false
          }
        } else {
          if (postData.bankuser === '' || postData.bankcardno === '' || repeatNo === '' || !postData.bankcode || postData.bankcode === '0') {
            this.$vux.toast.show({
              text: '请完善信息',
              type: 'text'
            })
            return false
          }
        }
        postData.bankcardno = postData.bankcardno.replace(/\s/g, '')
        repeatNo = repeatNo.replace(/\s/g, '')
        if (postData.bankcardno !== this.viewData.bankcardno && !Reg.rBankId.test(postData.bankcardno)) {
          this.$vux.toast.show({
            text: '请输入正确的银行卡号',
            width: '200px',
            type: 'text'
          })
          return false
        }
        if (this.showRepeat && repeatNo !== postData.bankcardno) {
          this.$vux.toast.show({
            text: '两次输入的银行卡号不同',
            width: '200px',
            type: 'text'
          })
          return false
        }
        this.$vux.confirm.show({
          content: '请确保信息填写无误',
          confirmText: '确定',
          onConfirm: () => {
            this.submitIng = true
            if (!this.showRepeat && postData.bankuser === this.viewData.bankuser && postData.bankcardno === this.viewData.bankcardno && postData.bankcode === this.viewData.bankcode) {
              this.submitIng = false
              this.$vux.toast.show({
                text: '绑定成功',
                type: 'success'
              })
              setTimeout(() => {
                if (this.query.fromPage) {
                  this.$router.push({path: decodeURIComponent(this.query.fromPage)})
                }
              }, 1000)
            } else {
              this.$http.post(`${ENV.BokaApi}/api/factory/add`, postData).then(res => {
                this.submitIng = false
                const data = res.data
                let error = (data.flag === 1) ? '绑定成功' : data.error
                const timeout = this.$util.delay(error)
                this.$vux.toast.show({
                  text: error,
                  type: data.flag ? 'success' : 'warn',
                  time: timeout
                })
                if (data.flag) {
                  setTimeout(() => {
                    if (this.query.fromPage) {
                      this.$router.push({path: decodeURIComponent(this.query.fromPage)})
                    }
                  }, timeout)
                }
              })
            }
          }
        })
      }
    },
    init () {
      const self = this
      this.initData()
      this.loginUser = User.get()
      this.query = this.$route.query
      console.log('当前登录用户')
      console.log(this.loginUser)
      if (this.query.fid) {
        this.fid = this.query.id
      } else {
        this.fid = this.loginUser.fid
      }
      this.$http.post(`${ENV.BokaApi}/api/common/getBankNames`).then(res => {
        const data = res.data
        self.cardList = data.data ? data.data : data
        return self.$http.get(`${ENV.BokaApi}/api/factory/info`, {
          params: { fid: self.query.id }
        })
      }).then(res => {
        self.$vux.loading.hide()
        let data = res.data
        let retdata = data.data ? data.data : data
        self.viewData = retdata
        for (let key in this.submitData) {
          if (this.viewData[key]) {
            this.submitData[key] = this.viewData[key]
          }
        }
      })
    }
  },
  activated () {
    this.init()
  }
}
</script>
<style lang="less">
  .bindingbank{
    background-color:#F4F3F8;width:100%;height:100%;
    .problem{position:absolute;color:#fff;font-size:30px;right:10px;top:0;}
    .bhead{width:100%;padding:10px 10px;box-sizing:border-box;background: linear-gradient(#ff6a61, #f63f3d);position:relative;}
    .btn-bottom-red{
      width:90%;
      border-radius: 36px;
      height: 40px;
      background-color: #ea3a3a;
      font-size: 16px;
      color: #fff;
      line-height: 40px;
      margin:0 auto;
    }
  }
</style>
