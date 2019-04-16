/*
* @description: 厂家经营报告
* @auther: gyp
* @created_date: 2018-08-06
*/
<template>
  <div class="font14 containerarea factoryReport" ref="scrollContainer">
    <tab v-model="selectedIndex" class="bg-white radius-tab">
      <tab-item class="font14" selected  @on-item-click="clickTabItem">7日</tab-item>
      <tab-item class="font14" @on-item-click="clickTabItem">30日</tab-item>
    </tab>
    <div class="x-card">
      <div class="border-box posi_r">
        <card>
          <router-link :to="{path: '/retailerOrders', query: {wid: wid}}" slot="content" class="card-demo-flex card-demo-content01">
            <div class="vux-1px-r">
              <div class="color-red font18">{{ viewData.orderuids }}</div>
              <div class="color-gray font14 mt5">成交客户</div>
            </div>
            <div class="vux-1px-r">
              <div class="color-red font18">{{ viewData.orders }}</div>
              <div class="color-gray font14 mt5">支付订单</div>
            </div>
            <div class="vux-1px-r">
              <div class="color-red font18">{{ $t('RMB' )}}{{ viewData.totalmoney }}</div>
              <div class="color-gray font14 mt5">订单总额</div>
            </div>
          </router-link>
        </card>
      </div>
    </div>
    <div class="boxlist">
      <div class="boxitem">
        <div class='title'>客户</div>
        <card>
          <div slot="content" class="card-demo-flex card-demo-content01">
            <div class="vux-1px-r">
              <div class="color-red font18">{{ viewData.newcustomer }}</div>
              <div class="color-gray font14 mt5">新增客户</div>
            </div>
            <div class="vux-1px-r">
              <div class="color-red font18">{{ viewData.newbuyer }}</div>
              <div class="color-gray font14 mt5">转化客户</div>
            </div>
            <div class="vux-1px-r">
              <div class="color-red font18">{{ viewData.conversion }}</div>
              <div class="color-gray font14 mt5">转化率</div>
            </div>
          </div>
        </card>
      </div>
      <div class="boxitem">
        <div class='title'>商品</div>
        <card>
          <div slot="content" class="card-demo-flex card-demo-content01">
            <div class="vux-1px-r">
              <div class="color-red font18">{{ viewData.productviews }}</div>
              <div class="color-gray font14 mt5">浏览</div>
            </div>
            <div class="vux-1px-r">
              <div class="color-red font18">{{ viewData.productshares }}</div>
              <div class="color-gray font14 mt5">分享</div>
            </div>
            <div class="vux-1px-r">
              <div class="color-red font18">{{ viewData.productfavorites }}</div>
              <div class="color-gray font14 mt5">收藏</div>
            </div>
          </div>
        </card>
      </div>
      <div class="boxitem">
        <div class='title'>文章</div>
        <card>
          <div slot="content" class="card-demo-flex card-demo-content01">
            <div class="vux-1px-r">
              <div class="color-red font18">{{ viewData.newsviews }}</div>
              <div class="color-gray font14 mt5">浏览</div>
            </div>
            <div class="vux-1px-r">
              <div class="color-red font18">{{ viewData.newsshares }}</div>
              <div class="color-gray font14 mt5">分享</div>
            </div>
            <div class="vux-1px-r">
              <div class="color-red font18">{{ viewData.newsfavorites }}</div>
              <div class="color-gray font14 mt5">收藏</div>
            </div>
          </div>
        </card>
      </div>
    </div>
    <div class="padding10 align_center mt12 bg-white bold color-red" v-if="loginUser.subscribe != 1 && query.commfrom != 'tljk'">关注公众号【{{WeixinName}}】及时接收报告通知</div>
  </div>
</template>
<script>
import {Tab, TabItem, ViewBox, Group, Cell, CellBox, XImg, Sticky, XButton, Card, TransferDom, Popup} from 'vux'
import Time from '#/time'
import ENV from 'env'
import { User } from '#/storage'

export default {
  directives: {
    TransferDom
  },
  components: {
    Tab, TabItem, ViewBox, Group, Cell, CellBox, XImg, Sticky, XButton, Card, Popup
  },
  data () {
    return {
      query: {},
      loginUser: {},
      selectedIndex: 0,
      list: [],
      list1: [],
      isshowpopup: false,
      disList: false,
      selectedIndex1: 0,
      wid: null,
      viewData: {
        orderuids: 0,
        orders: 0,
        totalmoney: '0.00',
        newcustomer: 0,
        newbuyer: 0,
        conversion: 0,
        productviews: 0,
        productshares: 0,
        productfavorites: 0,
        newsviews: 0,
        newsshares: 0,
        newsfavorites: 0
      },
      WeixinName: ENV.WeixinName
    }
  },
  filters: {
    dateFormat (date) {
      return new Time(date * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  methods: {
    clickTabItem () {
      this.getData()
    },
    showpopup () {
      this.isshowpopup = true
    },
    closepopup () {
      this.isshowpopup = false
    },
    getData () {
      const self = this
      let params = {type: 'retailer', days: 7, id: self.wid}
      if (self.selectedIndex === 1) {
        params.days = 30
      }
      this.$http.post(`${ENV.BokaApi}/api/common/businessReport`, params).then(res => {
        let data = res.data
        if (data.flag) {
          self.viewData = data.data ? data.data : data
        }
      })
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.loginUser = User.get()
      this.query = this.$route.query
      this.wid = this.query.wid ? this.query.wid : this.loginUser.uid
      this.getData()
    }
  },
  activated () {
    this.refresh()
    this.$util.miniPost()
  }
}
</script>

<style lang="less">
.return-shop .return-title{
  margin-top: 10px;
  padding: 10px 15px 10px 22px;
  font-size: 16px;
  color: inherit;
  position: relative;
  font-weight: normal;
}
.return-shop .return-title:before{
  content: " ";
  position: absolute;
  left: 0px;
  top: 13px;
  bottom: 13px;
  width: 0px;
  border-left: 2px solid red;
  color: #D9D9D9;
  left: 15px;
}
.card-demo-flex {
  display: flex;
}
.card-demo-content01 {
  padding: 10px 0;
}
.card-padding {
  padding: 15px;
}
.card-demo-flex > div {
  flex: 1;
  text-align: center;
  font-size: 12px;
}
.card-demo-flex span {
  color: #f74c31;
}
.x-card{
  background-color: #fff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.14);
}
.factoryReport .rebates-explain{
  position: absolute;
  z-index: 2;
  top: -37px;
  right: 10px;
}
.radius-tab.vux-tab-wrap{
  z-index: 2;
  padding-top: 69px;
}
.factoryReport .weui-panel{margin-top: 0;}
.factoryReport .weui-panel:before{display: none;}
.factoryReport .vux-1px-r:after{top:10%;bottom:10%;}
.radius-tab .vux-tab-container{
  width: 60%;
  margin: 0 auto;
  height:35px;
}
@media only screen and (max-width:375px){
  .radius-tab .vux-tab-container{width: 50%;}
}
.radius-tab .vux-tab{
  height:35px;
}
.radius-tab .vux-tab-ink-bar{
  background-color: red;
  height: 35px !important;
}
.radius-tab .vux-tab .vux-tab-item{
  background: transparent;
  line-height:35px;
  color:red
}
.radius-tab .vux-tab-container{
  margin-top: 20px;
  border: 1px solid red;
  border-radius: 6px;
  box-sizing: border-box;
}
.radius-tab .vux-tab .vux-tab-item.vux-tab-selected{
  background-color: red;
  color: #fff;
  position: relative;
  z-index: 2;
}
.factoryReport .bought-stores {
  margin-top: 10px;
}
.factoryReport .store-info {
  flex: 1;
  padding-left: 10px;
}
.factoryReport .store-img {
  display: flex;
}
.factoryReport .store-img img{
  width: 60px;
  height: 60px;
}
.factoryReport .button-cell {
  padding: 10px 0;
  text-align: center;
}

/* vux css hack */
.factoryReport .weui-cells {
  margin-top: 0;
}
.factoryReport .weui-cells:first-of-type:before {
  height: 0;
  border-top: none;
}
.factoryReport .btn-show{
  width:120px;
  height:35px;
  line-height:33px;
  border-radius:6px;
  border:1px solid red;
  color:#ffffff;
  font-size:14px;
  text-align:center;
  box-sizing: border-box;
  background-color: red
}
.factoryReport .weui-panel:after {
  height: 0;
  border-bottom: none;
}
.factoryReport .vux-cell-primary {
    padding-left: 10px;
}
.factoryReport .list-item .inline-desc {
    margin-top: 8px;
}
.factoryReport .date-cell {
    float: right;
    margin-right: 10px;
}
.boxlist .title{
  position:relative;height:40px;padding-left:15px;
  display:flex;justify-content: left; align-items: center;
}
.boxlist .title:before{content:"";position:absolute;left:8px;top:12px;bottom:12px;width:3px;background-color:red;}
</style>
