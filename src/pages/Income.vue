<template>
  <div class="containerarea font14 income">
    <div class="inhead">
      <div class="in-item flex_center pr20 pl20 pt20">
        <div class="item mr20">我的银行卡</div>
        <div class="item">提现说明</div>
      </div>
    </div>
    <div class="middle-content">
      <div class="align_center color-gray pt10 pb10">可提现金额（元）</div>
      <div class="align_center pb10 font30 bold" style="color:#FF6B63;">1000.5</div>
      <div class="flex_center pt20">
        <div class="item mr10" @click="clickWechat">提现至零钱</div>
        <div class="item ml10" @click="clickBank">提现至银行卡</div>
      </div>
    </div>
    <div class="btom-content">
      <div class="list flex_table mt20">
        <div class="align_left">待结算金额</div>
        <div class="moneyNum">233.15元<span class="color-gray pl10">></span></div>
      </div>
      <div class="pl20 pt10 pb10 color-gray font12">等待订单确认收货后方可结算并提现</div>
      <div class="list flex_table">
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
              <div class="pl10" style="color:#FF6B63">实时到账 (无手续费)</div>
            </div>
            <div class="flex_table mt10">
              <div class="align_left color-gray2">提现金额</div>
              <div class="pl10">(最低提现一元)</div>
            </div>
            <div class="flex_table mt10 b_bottom_after">
              <div class="align_left font24 pb10 bold">￥</div>
              <input class="font20 color-gray pb10 pl10 w_100" type="number" name="money" placeholder="输入提现金额"/>
            </div>
            <div class="color-gray mt5">可提现金额￥996.50</div>
            <div class="btnSubmit">确认提现</div>
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
          <div class="align_center b_bottom_after pb10">提现至微信零钱</div>
          <div class="pt10 pb10 pr10 pl10">
            <div class="flex_table">
              <div class="align_left color-gray2">到账时间</div>
              <div class="pl10" style="color:#FF6B63"> 1-3天(1%手续费)</div>
            </div>
            <div class="flex_table mt10">
              <div class="align_left color-gray2">提现金额</div>
              <div class="pl10">(最低提现一元)</div>
            </div>
            <div class="flex_table mt10 b_bottom_after">
              <div class="align_left font24 pb10 bold">￥</div>
              <input class="font20 color-gray pb10 pl10 w_100" type="number" name="money" placeholder="输入提现金额"/>
            </div>
            <div class="color-gray mt5">可提现金额￥996.50</div>
            <div class="btnSubmit">确认提现</div>
          </div>
        </div>
      </div>
      <div class="flex_center close-area">
        <span class="al al-close font40 bold color-white" @click="closeWechat"></span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        wechatShow: false,
        bankShow: false
      }
    },
    methods: {
      clickWechat () {
        this.wechatShow = true
      },
      clickBank () {
        this.bankShow = true
      },
      closeWechat () {
        this.wechatShow = false
        this.bankShow = false
      }
    }
  }
</script>
<style lang="less">
  .income{
    background-color:#F2F2F2;height:100%;
    .inhead{
      width:100%;height:100px;background-color:#FF6B63;
      .mr20{margin-right:10px;}
      .item{padding:1px 15px;background-color:#FF6B63;color:#fff;border-radius:20px;border:1px solid #fff;font-size:12px;box-sizing:border-box;}
    }
    .middle-content{
      width:90%;height:180px;background-color:#fff;border-radius:10px;border:1px solid #e5e5e5;margin: 0 auto;margin-top:-30px;
      .item{padding:5px 15px;background-color:#fff;border-radius:20px;border:1px solid #FF6B63;font-size:12px;color:#FF6B63;box-sizing:border-box;}
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
    }
    .btnSubmit{
      width:90%;padding:10px 0;background-color:#FF6B63;color:#fff;text-align:center;
      border-radius:5px;margin:0 auto;margin-top:50px;
    }
    .close-area{text-align:center;}
  }
</style>
