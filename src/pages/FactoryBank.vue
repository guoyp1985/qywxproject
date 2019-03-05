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
    <div class="flex_center color-white btn-bottom-red mt20" @click="bindEvent" v-if="query.control === 'manage'">绑定</div>
    <div class="flex_center mt20 color-theme" v-else @click="toManager">点击此处联系管理员修改银行卡信息</div>
    <div class="mt20 padding20">
      <bank-txt></bank-txt>
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
import { TransferDom, Popup, XInput } from 'vux'
import CashTxt from '@/components/CashTxt'
import BankTxt from '@/components/BankTxt'
import ENV from 'env'
import Reg from '#/reg'
import { User } from '#/storage'
export default {
  directives: {
    TransferDom
  },
  components: {
    Popup, XInput, CashTxt, BankTxt
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
    toManager () {
      this.$router.push({path: '/chat', query: {fromModule: 'factory', uid: ENV.FactoryManagerUid}})
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
