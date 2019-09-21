<style lang="less">
.collect-info-page{
  .box-area{
    padding:10px;box-sizing:border-box;
    .box-inner{
      padding-left:10px;padding-bottom:10px;box-sizing:border-box;position:relative;
      .title:before{
        content:'';width:6px;height:6px;border-radius:50%;background-color:#ff6a61;
        position:absolute;left:-10px;top:50%;margin-top:-3px;
      }
      .title{color:#ff6a61;font-size:18px;font-weight:bold;position:relative;}
    }
    .btn{width:160px;height:35px;border-radius:60px;}
  }
}
</style>
<template>
  <div class="containerarea font14 bg-white collect-info-page">
    <div class="box-area">
      <div class="box-inner">
        <div class="title">推荐到货源优势</div>
        <div class="con">
          <div>平台卖家可帮您销售商品</div>
          <div>平台厂家也可帮您销售商品</div>
        </div>
      </div>
    </div>
    <div class="line bg-page pt10"></div>
    <div class="box-area">
      <div class="box-inner">
        <div class="title">交易流程</div>
        <div class="con">
          <div>商品产生交易后</div>
          <div>由于订单收入将会是在代理厂家账户上进行交易</div>
          <div>所以产生交易后</div>
          <div>代理厂家需将该笔订单供货商应获得的交易额</div>
          <div>从线下供货商进行订单发货</div>
          <div>代理厂家可通过订单列表查看订单的状态</div>
          <div class="mt10">注意: 订单出现售后情况时，需双方线下沟通协商处理。</div>
        </div>
      </div>
    </div>
    <div class="line bg-page pt10"></div>
    <div class="box-area">
      <div class="box-inner">
        <div class="title">收款信息填写</div>
        <div class="con">
          <div class="form-item required bg-white">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">开户银行</div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <select v-model="submitData.newbankcode" class="w_100" style="height:35px;">
                  <option value='0'>请选择银行</option>
                  <option v-for="(item,index) in cardList" :value="item.id">{{ item.name }}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="form-item required bg-white">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">开户名</div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <input v-model="submitData.accountname" type="text" class="input priceInput" name="username" placeholder="开户名" />
              </div>
            </div>
          </div>
          <div class="form-item required bg-white">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">开户账号</div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <input v-model="submitData.newbankcardno" type="text" class="input priceInput" name="username" placeholder="开户账号" />
              </div>
            </div>
          </div>
          <div class="form-item required bg-white">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">联系人</div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <input v-model="submitData.newbankuser" type="text" class="input priceInput" name="username" placeholder="联系人" />
              </div>
            </div>
          </div>
          <div class="form-item required bg-white">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">手机号</div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <input v-model="submitData.newbankphone" type="text" class="input priceInput" name="username" placeholder="手机号" />
              </div>
            </div>
          </div>
          <div class="pt20 flex_center">
            <div class="btn bg-theme color-white flex_center" @click="toSumbit">去推荐</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Group, GroupTitle, Cell, XImg } from 'vux'
import Time from '#/time'
import Reg from '#/reg'
import ENV from 'env'
import { User } from '#/storage'

export default {
  components: {
    Group, GroupTitle, Cell, XImg
  },
  data () {
    return {
      query: {},
      loginUser: {},
      submitData: {newbankcode: '', accountname: '', newbankcardno: '', newbankuser: '', newbankphone: ''},
      cardList: [],
      Fid: 0,
      factoryInfo: {}
    }
  },
  filters: {
    dateFormat: function (isoDate) {
      return new Time(isoDate).dateFormat('yyyy-MM-dd hh:mm:ss')
    },
    valueFormat: function (value) {
      return Number(value) < 0 ? `${value}` : `+${value}`
    }
  },
  methods: {
    toSumbit () {
      let iscontinue = true
      for (let key in this.submitData) {
        if (this.submitData[key] === '') {
          this.$vux.toast.text('请输入收款信息', 'middle')
          iscontinue = false
          return false
        }
      }
      if (!Reg.rPhone.test(this.submitData.bankphone)) {
        this.$vux.toast.text('请输入正确的手机号', 'middle')
        iscontinue = false
        return false
      }
      if (!iscontinue) return false
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/factory/add`, this.submitData).then(res => {
        const data = res.data
      })
    },
    refresh () {
      this.loginUser = User.get()
      this.query = this.$route.query
      if (this.query.fid) {
        this.Fid = parseInt(this.query.fid)
      } else {
        this.Fid = this.loginUser.fid
      }
      this.$http.post(`${ENV.BokaApi}/api/common/getBankNames`).then(res => {
        const data = res.data
        this.cardList = data.data ? data.data : data
        return this.$http.get(`${ENV.BokaApi}/api/factory/info`, {
          params: {fid: this.Fid}
        })
      }).then((res) => {
        let data = res.data
        let retdata = data.data ? data.data : data
        this.factoryInfo = retdata
        for (let key in this.submitData) {
          this.submitData[key] = this.factoryInfo[key]
        }
      })
    }
  },
  created () {
  },
  activated () {
    this.refresh()
  }
}
</script>
