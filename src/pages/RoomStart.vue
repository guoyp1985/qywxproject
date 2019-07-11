/*
* @description: 群群推首页
* @auther: gyp
* @created_date: 2019-02-19
*/
<template>
  <div class="containerarea font14 room-start-page bg-white">
    <div class="pagemiddle padding10" style="top:0;color:#666;bottom:0;">
      <div class="color-theme font16">1、群群推是什么？</div>
      <div class="mt10">答：1个群做销售，能力有限；多个群帮你做销售，能力无限！群群推通过微信群价值评估，将群主与需要推广的卖家建立联系，最终达到双方受益，合作共赢的目的。</div>
      <div class="color-theme mt10 font16">我是群主：</div>
      <div class="mt10">群主可根据提示将微信群添加至群群推，待官方客服评估完后，即可展示给共销客的所有卖家，共销客的卖家选择群信息后主动向群主发起订单，群主只需根据提示将订单提供的链接分享至微信群，待群成员点击或购买后，系统即可自动计算收入。</div>
      <div class="color-theme mt10 font16">我是卖家，我要找群推广：</div>
      <div class="mt10">卖家可通过群群推功能了解微信群信息，找到合适的微信群进行交易，支付保证金后群主需将商品分享至微信群，待群成员点击后，系统自动扣除保证金。</div>
      <div>（注意：通过群群推进行交易时，群主将会成为你的返点客，若商品设置了返点佣金，群主销售商品将额外获得佣金奖励）</div>
      <div class="color-theme mt10 font16">2、群群推如何收费？</div>
      <div class="mt10">群群推为免费功能，在卖家与群主达成交易时，所支付的保证金需扣除0.6%，其余功能及流程不收费。</div>
      <div class="color-theme mt10 font16">3、群群推的优势是什么？</div>
      <div class="mt10">在微信生态中，卖家总是被获客难、转化难、无法提高交易量等诸多问题所困扰，而群群推正是解决这些问题的纽带，每个卖家都会拥有自己的微信群，通过帮助其他卖家推广产品信息不仅可以获得推广费用，还可以丰富自己的微信群，不让群内产品过于单调。而对于其他卖家而言，通过群群推可有效提高产品的曝光度、获得群内客户，且凭借群成员对群主的信任度还可有效提高产品销量，通过群群推功能，产品的销售成功率高达80%。</div>
    </div>
    <!-- <div class="pagebottom db-flex b_top_after">
      <div class="flex_cell flex_center">
        <div class="btn flex_center bg-theme color-white" @click="toMoney">我要赚钱</div>
      </div>
      <div class="flex_cell flex_center">
        <div class="btn flex_center bg-orange color-white" @click="toRooms">我要推广</div>
      </div>
    </div> -->
  </div>
</template>
<script>
import { XButton } from 'vux'
import { User } from '#/storage'
export default {
  components: {
    XButton
  },
  data () {
    return {
      query: {},
      loginUser: {}
    }
  },
  methods: {
    toRooms () {
      let params = this.$util.handleAppParams(this.query, {})
      this.$router.push({path: '/rooms', query: params})
    },
    toMoney () {
      let params = this.$util.handleAppParams(this.query, {})
      if (this.query.frompage === 'rooms') {
        this.$router.push({path: '/roomList', query: params})
      } else {
        this.$router.push({path: '/roomApply', query: params})
      }
    },
    closeTip () {
      this.showTip = false
      this.showMore = false
    },
    clickMore () {
      this.showTip = false
      this.showMore = true
      this.$router.push({path: '/roomStart'})
    },
    refresh () {
      this.loginUser = User.get()
      this.query = this.$route.query
    }
  },
  activated () {
    this.refresh()
  }
}
</script>
<style lang="less">
.room-start-page{
  // .pagebottom{
  //   .btn{width:80%;margin:0 auto;height:35px;border-radius:30px;}
  // }
}
</style>
