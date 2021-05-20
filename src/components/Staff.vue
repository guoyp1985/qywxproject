<style lang="less">
.staff-container{
  padding:10px;box-sizing:border-box;
  .box-list{
    .txt1{text-align:center;font-size:20px;font-weight:bold;}
    .txt2{text-align:center;color:#999;}
  }
}
</style>

<template>
  <div class="staff-container">
    <div v-if="isWx && !isQywx" class="box-outer mb10">
      <div class="box-title flex_center">
        <wx-open-launch-weapp
          :username="AppGhId"
          :path.sync="miniPage"
          @launch="handleLaunchFn"
          @error="handleErrorFn"
          style="width:100%;display:flex;justify-content:center;align-items:center;">
          <script type="text/wxtag-template">
            <div style="color:red;font-weight:bold;">绑定小程序</div>
          </script>
        </wx-open-launch-weapp>
      </div>
    </div>
    <div class="box-outer mb10" @click="toIncome">
      <div class="box-title flex_left">
        <div>可提现</div>
        <div class="flex_cell flex_right bold color-red">￥{{user.waitcashmoney}}</div>
      </div>
    </div>
    <div :class="`box-outer ${targets ? 'mb10' : ''}`" v-if="targets">
      <div class="box-title">{{targets.month | getMonth}}目标</div>
      <div class="box-list square">
        <div class="list-item">
          <div class="item-inner">
            <div class="txt1">{{targets.huoke}}</div>
            <div class="txt2">获客</div>
          </div>
        </div>
        <div class="list-item">
          <div class="item-inner">
            <div class="txt1">{{targets.fuwu}}</div>
            <div class="txt2">服务</div>
          </div>
        </div>
        <div class="list-item">
          <div class="item-inner">
            <div class="txt1">{{targets.xiaoshou}}</div>
            <div class="txt2">销售</div>
          </div>
        </div>
      </div>
    </div>
    <div class="box-outer">
      <div class="box-title">获客</div>
      <div class="box-list square">
       <router-link to="/activityList" class="list-item ico-pic-item">
          <div class="item-inner">
            <div class="ico-bg">
              <span class="al al-huodong1"></span>
            </div>
            <div class="txt">活动</div>
          </div>
        </router-link>
        <router-link to="/qiyeNewsList" class="list-item ico-pic-item">
          <div class="item-inner">
            <div class="ico-bg">
              <span class="al al-wenzhang3"></span>
            </div>
            <div class="txt">文章</div>
          </div>
        </router-link>
        <router-link to="/qiyeProductList" class="list-item ico-pic-item">
          <div class="item-inner">
            <div class="ico-bg">
              <span class="al al-shangpin"></span>
            </div>
            <div class="txt">商品</div>
          </div>
        </router-link>
      </div>
      <div class="box-list square">
        <router-link to="/qiyePoster" class="list-item ico-pic-item">
          <div class="item-inner">
            <div class="ico-bg">
              <span class="al al-zhaopian"></span>
            </div>
            <div class="txt">海报</div>
          </div>
        </router-link>
        <router-link to="/wechatGroup" class="list-item ico-pic-item">
          <div class="item-inner">
            <div class="ico-bg">
              <span class="al al-weixinqun"></span>
            </div>
            <div class="txt">客户群</div>
          </div>
        </router-link>
        <!-- <router-link to="" class="list-item ico-pic-item">
          <div class="item-inner">
            <div class="ico-bg">
              <span class="al al-weixin"></span>
            </div>
            <div class="txt">微信</div>
          </div>
        </router-link> -->
        <div class="list-item ico-pic-item"></div>
      </div>
    </div>
    <div class="box-outer mt10">
      <div class="box-title">服务</div>
      <div class="box-list square">
        <router-link to="/qiyeCustomerList" class="list-item ico-pic-item">
          <div class="item-inner">
            <div class="ico-bg">
              <span class="al al-kehufuwu"></span>
            </div>
            <div class="txt">客户服务</div>
          </div>
        </router-link>
        <router-link to="/pushList" class="list-item ico-pic-item">
          <div class="item-inner">
            <div class="ico-bg">
              <span class="al al-service"></span>
            </div>
            <div class="txt">精准服务</div>
          </div>
        </router-link>
        <router-link to="/buyerShow" class="list-item ico-pic-item">
          <div class="item-inner">
            <div class="ico-bg">
              <span class="al al-maijiaxiu2"></span>
            </div>
            <div class="txt">买家秀</div>
          </div>
        </router-link>
      </div>
      <div class="box-list square">
        <!-- <router-link to="" class="list-item ico-pic-item">
          <div class="item-inner">
            <div class="ico-bg">
              <span class="al al-daodianfuwu"></span>
            </div>
            <div class="txt">到店服务</div>
          </div>
        </router-link> -->
        <router-link to="/serveActivity" class="list-item ico-pic-item">
          <div class="item-inner">
            <div class="ico-bg">
              <span class="al al-huodong"></span>
            </div>
            <div class="txt">活动</div>
          </div>
        </router-link>
        <router-link to="/customerStat" class="list-item ico-pic-item">
          <div class="item-inner">
            <div class="ico-bg">
              <span class="al al-tongji1"></span>
            </div>
            <div class="txt">本周统计</div>
          </div>
        </router-link>
        <div class="list-item ico-pic-item"></div>
      </div>
    </div>
    <div class="box-outer mt10">
      <div class="box-title">销售</div>
      <div class="box-list square">
        <router-link to="/saleCustomerList" class="list-item ico-pic-item">
          <div class="item-inner">
            <div class="ico-bg">
              <span class="al al-kehuliebiao"></span>
            </div>
            <div class="txt">客户列表</div>
          </div>
        </router-link>
        <router-link to="/ingOrders" class="list-item ico-pic-item">
          <div class="item-inner">
            <div class="ico-bg">
              <span class="al al-kehuliebiao"></span>
            </div>
            <div class="txt">未结订单</div>
          </div>
        </router-link>
        <div class="list-item ico-pic-item"></div>
        <!-- <router-link to="/retailSale" class="list-item ico-pic-item">
          <div class="item-inner">
            <div class="ico-bg">
              <span class="al al-fenxiao"></span>
            </div>
            <div class="txt">分销</div>
          </div>
        </router-link>
        <router-link to="/saleChance" class="list-item ico-pic-item">
          <div class="item-inner">
            <div class="ico-bg">
              <span class="al al-xiaoshoujihui"></span>
            </div>
            <div class="txt">销售机会</div>
          </div>
        </router-link> -->
      </div>
    </div>
  </div>
</template>

<script>
import ENV from 'env'
export default {
  name: 'Staff',
  props: {
    user: {
      type: Object,
      default: {}
    },
    targets: {
      type: Object,
      default: null
    },
    miniPage: {
      type: String,
      default: ''
    },
    isQywx: {
      type: Boolean,
      default: false
    },
    isWx: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      AppGhId: ENV.AppGhId
    }
  },
  filters: {
    getMonth: (val) => {
      let monthVal = `${val}`
      let curYear = monthVal.substr(0, 4)
      let curMonth = monthVal.substr(4, 2)
      return `${curYear}年${curMonth}月`
    }
  },
  methods: {
    toIncome () {
      this.$router.push('/income')
    },
    handleLaunchFn (e) {
      console.log(e)
    },
    handleErrorFn (e) {
      console.log('fail', e.detail)
    }
  }
}
</script>
