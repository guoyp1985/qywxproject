<style lang="less">
.income-page{
  background-color:#fff;min-height:100%;
  .inhead{
    width:100%;position:relative;background:linear-gradient(#f5f9fe, #659af2);
    .wave-pic{display:block;position:relative;width:100%;z-index:1;}
    .item{width:100px;height:30px;color:#fff;border-radius:20px;border:1px solid #fff;font-size:12px;box-sizing:border-box;}
    .item:not(:last-child){margin-right:15px;}
    .btn-cash{
      width:150px;height:40px;border-radius:30px;margin:0 auto;background-color:#fff;
      font-size:18px;font-weight:bold;
    }
  }
  .txt-list{
    margin-top:-1px;display:flex;flex-wrap: wrap;position:relative;width:100%;box-sizing:border-box;
    .txt-item{
      width:50%;position:relative;box-sizing:border-box;display:flex;justify-content: center; align-items: center;
      padding-top:20px;padding-bottom:20px;
      .al{color:#999;font-size:16px;margin-left:5px;}
      .txt1{font-size:16px;font-weight:bold;color:#000;text-align: center;}
      .txt2{color:#999;text-align: center;}
    }
    .txt-item:nth-child(odd):after{
      content:"";position:absolute;right:0;top:15%;bottom:15%;width:1rpx;background-color:#ccc;
    	-webkit-transform: scaleX(0.5) translateX(0.5px);
    	transform: scaleX(0.5) translateX(0.5px);
    	-webkit-transform-origin: 0% 0%;
    	transform-origin: 0% 0%;
    }
    .txt-item:nth-child(1):before,.txt-item:nth-child(2):before,.txt-item:nth-child(3):before,.txt-item:nth-child(4):before{
      content:"";display:block;
      position:absolute;left:15%;right:15%;bottom:0;height:1px;background-color:#ccc;
    	-webkit-transform: scaleY(0.5) translateY(0.5px);
    	transform: scaleY(0.5) translateY(0.5px);
    	-webkit-transform-origin: 0% 0%;
    	transform-origin: 0% 0%;
    }
  }
  .plan-txt{position:relative;color:#659af2;}
  .plan-txt:before{
    content:"";display:block;
    position:absolute;left:0;right:0;bottom:0;height:1px;background-color:#ccc;
  }
  .plan-txt .jiantou:before{content: "\e744";}
  .plan-txt .jiantou.active:before{content: "\e73e";}
  .btom-content{
    .list{
      width:100%;padding:10px 20px;background-color:#fff;box-sizing:border-box;
      .moneyNum{margin-left:auto;}
    }
  }
}
.mceng{
  position:fixed;top:0;bottom:0;left:0;right:0;background-color:rgba(0, 0, 0, 0.3);overflow:hidden;z-index:10;
  .btnSubmit{
    width:90%;height:35px;margin:50px auto 0;
    button{border-radius:5px;}
  }
  .close-area{text-align:center;}
  .wechatShow{
    width:75%;padding:10px 0;background-color:#fff;border-radius:10px;margin:0 auto;box-sizing:border-box;margin-top:40%;
    input {color:#659af2;height:25px;line-height:25px;}
  }
}
</style>
<template>
  <div class="font14 income-page">
    <div class="inhead">
      <div class="flex_left pl10 pr10 pt10 pb20">
        <div class="flex_left flex_cell">可提现金额（元）</div>
        <div class="flex_right w100" bindsubmit="toBank" report-submit="true">
          <div class="al al-yinhangka color-white font16" form-type="submit"></div>
        </div>
      </div>
      <div class="flex_center font40 bold">{{cashInfo.ketixian}}</div>
      <div class="db pt20 pb20">
        <div class="btn-cash flex_center" @click="clickwechat">提现</div>
      </div>
      <image class="wave-pic" mode="widthFix" src="https://tossharingsales.boka.cn/minigxk/wave.png"></image>
    </div>
    <div class="txt-list bg-white">
      <div class="txt-item" data-flag="0" bindtap="toIncome">
        <div>
          <div class="txt1">{{cashInfo.zongshouru}}</div>
          <div class="txt2">总收入(元)</div>
        </div>
        <div class="al al-mjiantou-copy2"></div>
      </div>
      <div class="txt-item" data-flag="2" bindtap="toIncome">
        <div>
          <div class="txt1">{{cashInfo.yijiesuan}}</div>
          <div class="txt2">已结算(元)</div>
        </div>
        <div class="al al-mjiantou-copy2"></div>
      </div>
      <div class="txt-item" data-flag="1" bindtap="toIncome">
        <div>
          <div class="txt1">{{cashInfo.daijiesuan}}</div>
          <div class="txt2">待结算(元)</div>
        </div>
        <div class="al al-mjiantou-copy2"></div>
      </div>
      <div class="txt-item" data-flag="3" bindtap="toIncome">
        <div>
          <div class="txt1">{{cashInfo.yitixian}}</div>
          <div class="txt2">已提现(元)</div>
        </div>
        <div class="al al-mjiantou-copy2"></div>
      </div>
      <!-- <div class="txt-item" data-flag="3" bindtap="toIncome">
        <div>
          <div class="txt1">{{cashInfo.apply}}</div>
          <div class="txt2">待审核(元)</div>
        </div>
        <div class="al al-mjiantou-copy2"></div>
      </div>
      <div class="txt-item" data-flag="2" bindtap="toOrders">
        <div>
          <div class="txt1">{{cashInfo.savemoney}}</div>
          <div class="txt2">为您节省(元)</div>
        </div>
        <div class="al al-mjiantou-copy2"></div>
      </div> -->
    </div>
    <div class="padding20">
      <div class="flex_center">
        <div class="plan-txt font16" @click="clickTxt">
          <span>提现说明</span>
          <span :class="`al jiantou font16 ${showTxt ? 'active' : ''}`"></span>
        </div>
      </div>
      <template v-if="showTxt">
        <cashTxt></cashTxt>
      </template>
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
            <div class="flex_left mt10 pb10 b_bottom_after">
              <div class="font24 pr10">￥</div>
              <input v-model="cashMoney" class="flex_cell flex_left" bindinput="keyupWechatInput" type="text" placeholder="输入提现金额" />
            </div>
            <div class="pt20 db-flex">
              <div class="flex_cell color-gray">可提现金额￥{{cashInfo.ketixian}}</div>
              <div class="w80">
                <div class="w_100 flex_right" @click="clickAll('wechat')" style="color:#659af2;">全部提现</div>
              </div>
            </div>
            <div class="btnSubmit db" @click="getWechatCash">
              <div class="w_100 h_100 flex_center color-white" style="background-color:#659af2;">确认提现</div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex_center close-area">
        <div class="al al-close font40 bold color-white" @click="closeWechat"></div>
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
            <div class="flex_left mt10 pb10 b_bottom_after">
              <div class="font24 pr10">￥</div>
              <input v-model="cashBankMoney" class="font20 flex_cell" bindinput="keyupBankInput" type="text" placeholder="输入提现金额" />
            </div>
            <div class="pt20 db-flex">
              <div class="flex_cell color-gray">可提现金额￥{{cashInfo.ketixian}}</div>
              <div class="w80" data-type="bank">
                <div class="w_100 flex_right" @click="clickAll('bank')" style="color:#659af2;">全部提现</div>
              </div>
            </div>
            <div class="btnSubmit db" @tap="getBankCash">
              <div class="w_100 h_100 flex_center color-white" style="background-color:#659af2;">确认提现</div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex_center close-area">
        <div class="al al-close font40 bold color-white" @click="closeBank"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {} from 'vux'
import ENV from 'env'
import Time from '../../libs/time'
import { User, SystemParams, GlobalData } from '#/storage'
import Reg from '#/reg'
import CashTxt from '@/components/CashTxt'
export default {
  components: {CashTxt},
  data () {
    return {
      query: {},
      loginUser: {waitcash: '0.00'},
      wechatShow: false,
      bankShow: false,
      cashMoney: '',
      cashBankMoney: '',
      submitIng: false,
      showTxt: false,
      cashInfo: {ketixian: '0.00', zongshouru: '0.00', yijiesuan: '0.00', daijiesuan: '0.00', yitixian: '0.00'}
    }
  },
  methods: {
    clickTxt () {
      this.showTxt = !this.showTxt
    },
    clickwechat () {
      this.wechatShow = true
    },
    closeWechat () {
      this.wechatShow = false
    },
    closeBank () {
      this.bankShow = false
    },
    clickAll (type) {
      let cash = this.cashInfo.ketixian
      if (type === 'bank') {
        this.cashBankMoney = cash
      } else {
        this.cashMoney = cash
      }
    },
    cashEvent (inputMoney, type) {
      if (this.submitIng) return false
      if (inputMoney) {
        inputMoney = `${inputMoney}`
      }
      if (inputMoney && inputMoney.indexOf(',') > -1) {
        inputMoney = inputMoney.replace(/,/g, '')
      }
      if (!inputMoney || inputMoney === '' || isNaN(inputMoney)) {
        this.$vux.toast.text('请输入正确的提现金额')
        return false
      }
      let money = parseFloat(inputMoney)
      let curCash = `${this.cashInfo.ketixian}`
      let waitcash = parseFloat(curCash.replace(/,/g, ''))
      if (money > waitcash) {
        this.$vux.toast.text('提现金额不能超过可提现金额')
        return false
      }
      if (money < 1) {
        this.$vux.toast.text('提现金额最低为1元')
        return false
      }
      this.submitIng = true
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/accounting/cashMoney`, {
        money: inputMoney, type: type
      }).then(res => {
        this.$vux.loading.hide()
        this.submitIng = false
        const data = res.data
        this.$vux.toast.show({
          text: data.msg,
          type: (data.code === 0 ? 'success' : 'warn'),
          time: this.$util.delay(data.msg)
        })
        this.bankShow = false
        this.wechatShow = false
        this.cashMoney = ''
        this.cashBankMoney = ''
      })
    },
    getWechatCash () {
      this.cashEvent(this.cashMoney, 'lingqian')
    },
    getBankCash (e) {
      this.cashEvent(this.cashBankMoney, 'yinhang')
    },
    getData () {
      this.$http.get(`${ENV.BokaApi}/api/user/show`, {
        params: {init: 1}
      }).then(res => {
        if (res && res.status === 200) {
          const data = res.data
          if (data.code === 0) {
            this.loginUser = data.data
            User.set(data.data)
            SystemParams.set(data.paras)
            GlobalData.set(data)
            this.cashInfo = {
              ketixian: this.loginUser.waitcashmoney,
              zongshouru: this.loginUser.moneyin,
              yijiesuan: this.loginUser.jiesuanmoney,
              daijiesuan: this.loginUser.pendingmoney,
              yitixian: this.loginUser.moneyout
            }
          }
        }
      }, error => {
        console.log('error, income 页面的 user/show')
        console.log(error)
      })
    },
    refresh () {
      this.query = this.$route.query
      this.loginUser = User.get()
      this.cashInfo = {
        ketixian: this.loginUser.waitcashmoney,
        zongshouru: this.loginUser.moneyin,
        yijiesuan: this.loginUser.jiesuanmoney,
        daijiesuan: this.loginUser.pendingmoney,
        yitixian: this.loginUser.moneyout
      }
    }
  },
  activated () {
    this.refresh()
  }
}
</script>
