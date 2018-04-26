<template>
  <div class="containerarea font14 havetoptab bg-page ractivitylist">
    <tab v-if="tabdata1.length > 0" v-model="tabmodel" class="x-toptab">
      <tab-item v-for="(item,index) in tabtxts" :selected="index == 0" :key="index">{{item}}</tab-item>
    </tab>
    <tab v-else v-model="tabmodel" class="x-toptab">
      <tab-item :selected="true">{{ tabtxts[1] }}</tab-item>
    </tab>
    <div class="s-container">
      <swiper v-model="tabmodel" class="x-swiper no-indicator">
        <swiper-item class="swiperitem" v-for="(tabitem, index) in tabtxts" :key="index">
          <template v-if="tabdata1.length > 0 && index === 0">
            <div class="scroll_list">
              <div v-if="tabdata1.length == 0" class="scroll_item pt10 pb10 align_center color-gray">
                <div class="t-table">
                  <div class="t-cell">
                    <div><i class="al al-cuxiaohuodong font60"></i></div>
                    <div>还没有创建活动哦，创建活动可以：</div>
                    <div>1.增加商品的销售量</div>
                    <div>2.分享活动快速获得客户</div>
                    <div>3.邀请返点客帮你赚钱</div>
                  </div>
                </div>
              </div>
              <div v-else v-for="(item,index1) in tabdata1" :key="item.id" :class="`scroll_item ${item.type}item bg-white mb5 pl10 pr10 db`">
                <router-link :to="{path:'/product',query:{wid:item.wid,id:item.id}}" v-if="item.type == 'spring'" :key="item.id" class="db" style="position:relative;">
                  <div v-if="item.isfinished === 1" class="icon finished"></div>
                  <div class="t-table">
                    <div class="t-cell align_left pr10 v_middle" style="width:80px;">
                      <img :src="item.photo" class="v_middle imgcover" style="width:80px;height:80px;" />
                    </div>
                    <div class="t-cell align_left v_middle">
                      <div class="clamp1 font12">{{item.title}}</div>
                      <div class="clamp1 color-999 middle-cell mt5">总金额:{{ $t('RMB') }}{{ item.budget }}</div>
                      <div class="clamp1 color-999 middle-cell">已领取:{{ item.getcount }}人/{{ $t('RMB') }}{{ item.getmoney }}</div>
                      <div class="clamp1 color-999 middle-cell">剩  余:{{ $t('RMB') }}{{ item.leavemoney }}</div>
                    </div>
                    <div class="t-cell align_right v_middle" style="width:60px;">
                      <router-link v-if="item.moderate == 0" class="qbtn1 bg-orange1 color-white" :to="`/pay/${item.orderid}`">支支付</router-link>
                      <router-link class="qbtn1 bg-orange1 color-white" to="/activityStat">{{ $t('Stat') }}</router-link>
                      <div class="qbtn1 bg-orange1 color-white mt5" v-if="item.moderate != 0">补钱</div>
                      <div class="qbtn1 bg-orange1 color-white mt5" v-if="item.isfinished != 1" @click="stopevent(item,index1)">停止</div>
                    </div>
                  </div>
                  <div class="mt5 font12 color-gray">活动时间：{{ item.starttime | dateformat}} 至 {{ item.endtime | dateformat}}</div>
                </router-link>
                <router-link :to="{path:'/product',query:{wid:item.wid,id:item.id}}" v-if="item.type == 'groupbuy'" :key="item.id" class="db" style="position:relative;">
                  <div v-if="item.isfinished === 1" class="icon finished"></div>
                  <div class="t-table">
                    <div class="t-cell align_left pr10 v_middle" style="width:80px;">
                      <img :src="item.photo" class="v_middle imgcover" style="width:80px;height:80px;" />
                    </div>
                    <div class="t-cell align_left v_middle">
                      <div class="clamp1 font12">{{item.title}}</div>
                      <div class="clamp1 font12 color-gray mt5">{{ $t('Groupprice') }} {{ $t('RMB') }} {{ item.groupprice }}</div>
                      <div class="clamp1 font12 color-gray mt5">{{ $t('Group numbers') }} {{ item.numbers }}{{ $t('Person') }}</div>
                    </div>
                    <div class="t-cell align_right v_middle" style="width:60px;">
                      <router-link class="qbtn1 bg-orange1 color-white" to="groupbuyStat">{{ $t('Stat') }}</router-link>
                      <div class="qbtn1 bg-orange1 color-white mt5" v-if="item.isfinished != 1" @click="stopevent(item,index1)">停止</div>
                    </div>
                  </div>
                  <div class="mt5 font12 color-gray">活动时间：{{ item.starttime | dateformat}} 至 {{ item.endtime | dateformat}}</div>
                </router-link>
                <router-link :to="{path:'/bargainbuy',query:{id:item.id}}" v-else-if="item.type == 'bargainbuy'" :key="item.id" class="db" style="position:relative;">
                  <div v-if="item.isfinished === 1" class="icon finished"></div>
                  <div class="t-table">
                    <div class="t-cell align_left pr10 v_middle" style="width:80px;">
                      <img :src="item.photo" class="v_middle imgcover" style="width:80px;height:80px;" />
                    </div>
                    <div class="t-cell align_left v_middle">
                      <div class="clamp1 font12">{{item.title}}</div>
                      <div class="clamp1 font12 color-gray mt5">{{ $t('Min buy price') }} {{ $t('RMB') }} {{ item.minprice }}</div>
                      <div class="clamp1 font12 color-gray mt5">{{ $t('Limitbuy count') }} {{ item.limitbuy }}</div>
                    </div>
                    <div class="t-cell align_right v_middle" style="width:60px;">
                      <router-link class="qbtn1 bg-orange1 color-white" to="/bargainbuyStat">{{ $t('Stat') }}</router-link>
                      <div class="qbtn1 bg-orange1 color-white mt5" v-if="item.isfinished != 1" @click="stopevent(item)">停止</div>
                    </div>
                  </div>
                  <div class="mt5 font12 color-gray">活动时间：{{ item.starttime | dateformat}} 至 {{ item.endtime | dateformat}}</div>
                </router-link>
              </div>
            </div>
          </template>
          <template v-if="tabdata1.length == 0 || index == 1">
            <div class="db-flex padding10 mb5 bg-white" @click="clickadd('groupbuy')">
              <div class="flex_left" style="width:90px;">
                <img class="disphoto db middle-cell" style="width:80px;height:80px;" src="/src/assets/images/groupbuy.jpg">
              </div>
              <div class="flex_cell flex_left">
                <div>
                  <div class="color-black">{{ $t('Groupbuy') }}</div>
                  <div class="font12 mt5 color-gray">{{ $t('Groupbuy description') }}</div>
                  <div class="mt5">
                    <div class="qbtn4 font12" style="line-height:1;">{{ $t('Eazy get order') }}</div>
                  </div>
                </div>
              </div>
              <div class="flex_left ml10" style="width:20px;">
                <i class="al al-mjiantou-copy font14"></i>
              </div>
            </div>
            <div class="db-flex padding10 mb5 bg-white" @click="clickadd('bargainbuy')">
              <div class="flex_left" style="width:90px;">
                <img class="disphoto db middle-cell" style="width:80px;height:80px;" src="/src/assets/images/bargainbuy.jpg">
              </div>
              <div class="flex_cell flex_left">
                <div>
                  <div class="color-black">{{ $t('Bargainbuy') }}</div>
                  <div class="font12 mt5 color-gray">{{ $t('Bargainbuy description') }}</div>
                  <div class="mt5">
                    <div class="qbtn4 font12 mr5" style="line-height:1;">{{ $t('Eazy get customer') }}</div>
                    <div class="qbtn4 font12" style="line-height:1;">{{ $t('Eazy get order') }}</div>
                  </div>
                </div>
              </div>
              <div class="flex_left ml10" style="width:20px;">
                <i class="al al-mjiantou-copy font14"></i>
              </div>
            </div>
            <!--
            <div class="db-flex padding10 mb5 bg-white" @click="clickadd('discount')">
              <div class="flex_left" style="width:90px;">
                <img class="disphoto db middle-cell" style="width:80px;height:80px;" src="/src/assets/images/discount.jpg">
              </div>
              <div class="flex_cell flex_left">
                <div>
                  <div class="color-black">{{ $t('Discount') }}</div>
                  <div class="font12 mt5 color-gray">{{ $t('Discount description') }}</div>
                  <div class="mt5">
                    <div class="qbtn4 font12" style="line-height:1;">{{ $t('Eazy get order') }}</div>
                  </div>
                </div>
              </div>
              <div class="flex_left ml10" style="width:20px;">
                <i class="al al-mjiantou-copy font14"></i>
              </div>
            </div>
          -->
          </template>
        </swiper-item>
      </swiper>
    </div>
    <div v-transfer-dom>
      <confirm v-model="showconfirm"
      @on-cancel="canceldownConfirm"
      @on-confirm="okdownConfirm">
        <p style="text-align:center;">{{ $t('Are you sure stop?') }}</p>
      </confirm>
    </div>
    <div v-transfer-dom class="x-popup">
      <popup v-model="showgroupbuy" height="100%">
        <div class="popup1">
          <div class="popup-top">
            <div class="t-table h_100">
              <div class="t-cell h_100 align_center v_middle w70">{{ $t('Groupbuy') }}</div>
              <div class="t-cell h_100 v_middle pr20 align_right">
                <router-link class="qbtn bg-orange color-white" style="line-height:20px;" :to="{path: '/addActivity', query: {type: 'groupbuy'}}">{{ $t('Go to create') }}</router-link>
              </div>
            </div>
          </div>
          <div class="popup-middle font14">
            <div class="pl15 pr15">
              <p class="mt20 title-popup">活动规则</p>
              <div class="pl10 pr10 color-999 font12 line22">团购就是团体购物，指认识或不认识的买家联合起来，以最优价格求购同一款商品。<br>买家可在活动商品主页一键开团，也可参加别人发起的团，在规定时间内，一旦团成员达到规定人数，则拼团成功，卖家即可进行发货。若在规定时间内，团成员未达到规定人数，则拼团失败，支付的金额将自动退还给买家。</div>
              <p class="title-popup">活动优势</p>
              <div class="pl10 pr10 color-999 font12 line22">团购是一个聚人气，易成交的活动方式，能够以薄利多销形式激励买家购买，通过团购也可以让买家介绍更多买家帮他成团来获得优惠，从而积累销量、聚拢人气、获得更多成交客户！</div>
              <p class="title-popup">界面效果</p>
              <img class="db mt10 w_100" style="margin-bottom: 20px;" src="/src/assets/images/groupbuy_1.png" />
            </div>
          </div>
          <div class="popup-bottom flex_center">
            <div class="flex_cell flex_center h_100 bg-gray color-white" @click="closepopup1">{{ $t('Close') }}</div>
            <router-link class="flex_cell flex_center h_100 bg-orange color-white" :to="{path: '/addActivity', query: {type: 'groupbuy'}}">{{ $t('Go to create') }}</router-link>
          </div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom class="x-popup">
      <popup v-model="showbargainbuy" height="100%">
        <div class="popup1">
          <div class="popup-top flex_center">
            <div class="t-table h_100">
              <div class="t-cell h_100 align_center v_middle w70">{{ $t('Bargainbuy') }}</div>
              <div class="t-cell h_100 v_middle pr20 align_right">
                <router-link class="qbtn bg-orange color-white" style="line-height:20px;" :to="{path: '/addActivity', query: {type: 'bargainbuy'}}">{{ $t('Go to create') }}</router-link>
              </div>
            </div>
          </div>
          <div class="popup-middle font14">
            <div class="pl15 pr15">
              <p class="mt20 title-popup">活动规则</p>
              <div class="pl10 pr10 color-999 font12 line22">砍价活动每人一次参与机会，参与者可邀请好友帮忙削减商品价格，从而获得优惠，最终以活动商品的最低价购买。在规定时间内，商品价格成功砍至最低价，则砍价成功，买家购买并支付即可；若商品价格未砍至最低价，则砍价失败，无法以活动价格购买商品！</div>
              <p class="title-popup">活动优势</p>
              <div class="pl10 pr10 color-999 font12 line22">砍价是一个传播范围广、成单机会大的活动方式，买家可以在短时间内通过多位好友的帮助，以最低的价格购买商品，从而为卖家带来大量潜在客户，为以后的销售提供更多机会！</div>
              <p class="title-popup">界面效果</p>
              <img src="/src/assets/images/bargainbuy_1.png" style="width:100%;margin-bottom: 20px;margin-top: 10px;" class="db">
            </div>
          </div>
          <div class="popup-bottom flex_center">
            <div class="flex_cell flex_center h_100 bg-gray color-white" @click="closepopup2">{{ $t('Close') }}</div>
            <router-link class="flex_cell flex_center h_100 bg-orange color-white" :to="{path: '/addActivity', query: {type: 'bargainbuy'}}">{{ $t('Go to create') }}</router-link>
          </div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom class="x-popup">
      <popup v-model="showdiscount" height="100%">
        <div class="popup1">
          <div class="popup-top flex_center">
            <div class="t-table h_100">
              <div class="t-cell h_100 align_center v_middle w70">{{ $t('Discount') }}</div>
              <div class="t-cell h_100 v_middle pr20 align_right">
                <router-link class="qbtn bg-orange color-white" style="line-height:20px;" :to="{path: '/addActivity', query: {type: 'discount'}}">{{ $t('Go to create') }}</router-link>
              </div>
            </div>
          </div>
          <div class="popup-middle font14">
            <div class="pl15 pr15">
              <p class="mt20 title-popup">活动规则</p>
              <div class="pl10 pr10 color-999 font12 line22">买家可在活动期间以活动价格购买商品，每人限购数量可在活动创建时进行设置，活动商品一旦抢购完毕，买家只能以原价进行购买。</div>
              <p class="title-popup">活动优势</p>
              <div class="pl10 pr10 color-999 font12 line22">限时抢购可短时间进行大量商品销售，吸引买家及时以低价格抢购心仪商品，以达到快速获客，快速成单的目的。</div>
              <p class="title-popup">界面效果</p>
              <img src="/src/assets/images/discount_1.png" style="width:100%;margin-bottom: 20px;margin-top: 10px;" class="db">
            </div>
          </div>
          <div class="popup-bottom flex_center">
            <div class="flex_cell flex_center h_100 bg-gray color-white" @click="closepopup3">{{ $t('Close') }}</div>
            <router-link class="flex_cell flex_center h_100 bg-orange color-white" :to="{path: '/addActivity', query: {type: 'discount'}}">{{ $t('Go to create') }}</router-link>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>

<i18n>
Groupprice:
  zh-CN: 团购价
Group numbers:
  zh-CN: 成团人数
Person:
  zh-CN: 人
Are you sure stop?:
  zh-CN: 确定要停止吗？
Min buy price:
  zh-CN: 最低成交价
Limitbuy count:
  zh-CN: 限购数量
Groupbuy:
  zh-CN: 团购
Groupbuy description:
  zh-CN: 买家可拼团购买商品，有效提高销量
Bargainbuy:
  zh-CN: 砍价
Bargainbuy description:
  zh-CN: 买家可邀请好友帮忙砍价，以优惠价格购买
Discount:
  zh-CN: 限时抢购
Discount description:
  zh-CN: 商品限时促销，增强用户紧迫感及购买欲望
Eazy get customer:
  zh-CN: 易获客
Eazy get order:
  zh-CN: 易成单
Close:
  zh-CN: 关闭
Go to create:
  zh-CN: 立即创建
Stat:
  zh-CN: 统计
</i18n>

<script>
import { Tab, TabItem, Swiper, SwiperItem, TransferDom, Confirm, Popup } from 'vux'
import Time from '#/time'
import ENV from '#/env'

export default {
  directives: {
    TransferDom
  },
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    TransferDom,
    Confirm,
    Popup
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      tabtxts: [ '全部活动', '创建活动' ],
      tabmodel: 0,
      tabdata1: [],
      clickdata: null,
      clickindex: 0,
      showconfirm: false,
      showgroupbuy: false,
      showbargainbuy: false,
      showdiscount: false,
      isShowLoading: false,
      limit: 20,
      pagestart1: 0,
      isBindScroll1: false,
      scrollArea1: null
    }
  },
  created: function () {
    let self = this
    self.$store.commit('updateToggleTabbar', {toggleBar: false})
    self.$vux.loading.show()
    self.getdata1()
  },
  watch: {
    tabdata1: function () {
      return this.tabdata1
    },
    clickdata: function () {
      return this.clickdata
    },
    clickindex: function () {
      return this.clickindex
    }
  },
  methods: {
    scroll1: function () {
      const self = this
      self.$util.scrollEvent({
        element: self.scrollArea1,
        callback: function () {
          if (self.tabdata1.length === (self.pagestart1 + 1) * self.limit) {
            self.pagestart1++
            self.$vux.loading.show()
            self.getdata1()
          }
        }
      })
    },
    getdata1 () {
      const self = this
      let params = { params: { pagestart: self.pagestart1, limit: self.limit } }
      self.$http.get(`${ENV.BokaApi}/api/retailer/listActivity`, params).then(function (res) {
        return res.json()
      }).then(function (data) {
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabdata1 = self.tabdata1.concat(retdata)
        if (!self.isBindScroll1) {
          let items = document.querySelectorAll('.ractivitylist .swiperitem')
          if (items.length > 1) {
            self.scrollArea1 = items[0]
            self.isBindScroll1 = true
            self.scrollArea1.removeEventListener('scroll', self.scroll1)
            self.scrollArea1.addEventListener('scroll', self.scroll1)
          }
        }
      })
    },
    stopevent (item, index) {
      event.preventDefault()
      this.showconfirm = true
      this.clickdata = item
      this.clickindex = index
    },
    canceldownConfirm () {
      this.showconfirm = false
      this.clickdata = null
      this.clickindex = 0
    },
    okdownConfirm () {
      const self = this
      self.showconfirm = false
      self.isShowLoading = true
      self.$http.post(`${ENV.BokaApi}/api/retailer/stopActivity`, { id: self.clickdata.id }).then(function (res) {
        return res.json()
      }).then(function (data) {
        self.isShowLoading = false
        self.$vux.toast.show({
          text: data.error,
          time: self.$util.delay(data.error),
          onHide: function () {
            if (data.flag === 1) {
              self.tabdata1[self.clickindex].isfinished = 1
            }
          }
        })
      })
    },
    clickadd (type) {
      if (type === 'groupbuy') {
        this.showgroupbuy = !this.showgroupbuy
      } else if (type === 'bargainbuy') {
        this.showbargainbuy = !this.showbargainbuy
      } else if (type === 'discount') {
        this.showdiscount = !this.showdiscount
      }
    },
    closepopup1 () {
      this.showgroupbuy = false
    },
    closepopup2 () {
      this.showbargainbuy = false
    },
    closepopup3 () {
      this.showdiscount = false
    }
  }
}
</script>

<style lang="less">
.ractivitylist .icon{
        position:absolute;left:0;top:0;width:96px;height:25px;line-height:25px;
        background-color:#ff9f9f;color:#fff;text-align:center;font-size: 12px;
        -webkit-transform: translate(-30px,5px) rotate(-45deg);
        transform: translate(-30px,5px) rotate(-45deg);
}
.ractivitylist .finished.icon{background-color:#8a8a8a;}
.ractivitylist .finished.icon:after{content:"已结束";}
.title-popup {
  position: relative;
  width: 100px;
  background: #f3f3f3;
  padding: 3px 5px 3px 8px;
  margin-top: 30px;
  margin-bottom: 10px;
  font-size: 14px;
  margin-left: 10px;
}
.title-popup:after {
  content: "";
  display: block;
  position: absolute;
  width: 2px;
  top: 0;
  bottom: 0;
  margin: auto 0;
  left: -6px;
  background-color: #f89100;
  height: 100%;
}
.ractivitylist .scroll_item{
  padding-top:10px;
  padding-bottom:10px;
  position:relative;
  overflow:hidden;
}
.ractivitylist .scroll_item .row{
  display: -webkit-box;
  position:relative;
}
</style>
