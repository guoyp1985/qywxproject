<template>
  <div class="containerarea font14 havetoptab  bg-page">
    <tab v-model="tabmodel" class="x-toptab">
      <tab-item v-for="(item,index) in tabtxts" :selected="index == 0" :key="index">{{item}}</tab-item>
    </tab>
    <div class="s-container ractivitylist">
      <swiper v-model="tabmodel" class="x-swiper no-indicator">
        <swiper-item v-for="(item, index) in tabtxts" :key="index">
          <template v-if="(index == 0)">
            <div class="scroll_list">
              <Listplate2 v-for="(item,index) in tabdata1" :key="item.id" :class="`${item.type}item bg-white mb5 pl10 pr10`">
                <div v-if="item.isfinished === 1" class="icon finished"></div>
                <img slot="pic" :src="item.photo" />
                <div slot="title" class="clamp1 font12">{{item.title}}</div>
                  <template v-if="(item.type == 'groupbuy')">
                    <div slot="title" class="clamp1 font12 color-gray mt5">{{ $t('Groupprice') }} {{ $t('RMB') }} {{ item.groupprice }}</div>
                    <div slot="title" class="clamp1 font12 color-gray mt5">{{ $t('Group numbers') }} {{ item.numbers }}{{ $t('Person') }}</div>
                  </template>
                  <template v-if="(item.type == 'bargainbuy')">
                    <div slot="title" class="clamp1 font12 color-gray mt5">{{ $t('Min buy price') }} {{ $t('RMB') }} {{ item.minprice }}</div>
                    <div slot="title" class="clamp1 font12 color-gray mt5">{{ $t('Limitbuy count') }} {{ item.limitbuy }}</div>
                  </template>
                <div slot="btn" class="w_100">
                  <router-link class="qbtn1 bg-orange1 color-white" to="/groupbuyStat" v-if="item.type == 'groupbuy'">{{ $t('Stat') }}</router-link>
                  <router-link class="qbtn1 bg-orange1 color-white" to="/bargainbuyStat" v-else-if="item.type == 'bargainbuy'">{{ $t('Stat') }}</router-link>
                  <router-link class="qbtn1 bg-orange1 color-white" to="/activityStat" v-else>{{ $t('Stat') }}</router-link>
                  <div class="qbtn1 bg-orange1 color-white mt5" @click="stopevent(item)">停止</div>
                </div>
                <div class="mt5 font12 color-gray">活动时间：{{ item.starttime | dateformat}} 至 {{ item.endtime | dateformat}}</div>
              </Listplate2>
            </div>
          </template>
          <template v-if="(index == 1)">
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
          <div class="popup-top flex_center">{{ $t('Groupbuy') }}</div>
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
            <router-link class="flex_cell flex_center h_100 bg-orange color-white" to="/addActivity">{{ $t('Go to create') }}</router-link>
          </div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom class="x-popup">
      <popup v-model="showbargainbuy" height="100%">
        <div class="popup1">
          <div class="popup-top flex_center">{{ $t('Bargainbuy') }}</div>
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
            <router-link class="flex_cell flex_center h_100 bg-orange color-white" to="/addActivity">{{ $t('Go to create') }}</router-link>
          </div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom class="x-popup">
      <popup v-model="showdiscount" height="100%">
        <div class="popup1">
          <div class="popup-top flex_center">{{ $t('Discount') }}</div>
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
            <router-link class="flex_cell flex_center h_100 bg-orange color-white" to="/addActivity">{{ $t('Go to create') }}</router-link>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>

<i18n>
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
import Listplate2 from './Listplate2'
import Time from '../../libs/time'

export default {
  directives: {
    TransferDom
  },
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    Listplate2,
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
      tabdata1: [
        {
          id: '1', dateline: 1522221270, starttime: 1522825984, endtime: 1524121984, isfinished: 1, type: 'groupbuy', groupprice: '0.50', numbers: 3, title: '沈阳市毽球协会经验介绍 | 专题', shares: 3, views: 5, photo: 'http://gongxiaoshe.qiyeplus.com/data/upload//month_201713/15222997918736'
        },
        {
          id: '2', dateline: 1522221270, starttime: 1522825984, endtime: 1524121984, isfinished: 0, type: 'bargainbuy', minprice: '0.50', limitbuy: 3, title: '『销售电子商务』最新职位推荐', shares: 3, views: 5, photo: 'http://gongxiaoshe.qiyeplus.com/data/upload//month_201713/15222371898745'
        },
        {
          id: '3', dateline: 1522221270, starttime: 1522825984, endtime: 1524121984, isfinished: 1, type: 'bargainbuy', minprice: '0.50', limitbuy: 3, title: '【渠道运营】销售≠只说话！80％的销售员都错了', shares: 3, views: 5, photo: 'http://gongxiaoshe.qiyeplus.com/data/upload//month_201713/15222181292017'
        },
        {
          id: '4', dateline: 1522221270, starttime: 1522825984, endtime: 1524121984, isfinished: 0, type: 'groupbuy', groupprice: '0.50', numbers: 3, title: '固始首家爱心粥屋揭牌运营', shares: 3, views: 5, photo: 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15221433494852.jpg'
        },
        {
          id: '5', dateline: 1522221270, starttime: 1522825984, endtime: 1524121984, isfinished: 1, type: 'groupbuy', groupprice: '0.50', numbers: 3, title: '董明珠：格力不能更好运营，绝对不交班;揭电商大数据杀熟套路：算法投放，大V投诉更快处理', shares: 3, views: 5, photo: 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15221255851634.jpg'
        }
      ],
      tabdata2: [
        {
          id: '1', dateline: 1522221270, starttime: 1522825984, endtime: 1524121984, isfinished: 0, type: 'groupbuy', groupprice: '0.50', numbers: 3, title: '沈阳市毽球协会经验介绍 | 专题', shares: 3, views: 5, photo: 'http://gongxiaoshe.qiyeplus.com/data/upload//month_201713/15214273537848'
        },
        {
          id: '2', dateline: 1522221270, starttime: 1522825984, endtime: 1524121984, isfinished: 1, type: 'bargainbuy', minprice: '0.50', limitbuy: 3, title: '『销售电子商务』最新职位推荐', shares: 3, views: 5, photo: 'http://gongxiaoshe.qiyeplus.com/data/upload//month_201713/15214253209099'
        },
        {
          id: '3', dateline: 1522221270, starttime: 1522825984, endtime: 1524121984, isfinished: 0, type: 'bargainbuy', minprice: '0.50', limitbuy: 3, title: '【渠道运营】销售≠只说话！80％的销售员都错了', shares: 3, views: 5, photo: 'http://gongxiaoshe.qiyeplus.com/data/upload//month_201713/15222181292017'
        },
        {
          id: '4', dateline: 1522221270, starttime: 1522825984, endtime: 1524121984, isfinished: 1, type: 'groupbuy', groupprice: '0.50', numbers: 3, title: '固始首家爱心粥屋揭牌运营', shares: 3, views: 5, photo: 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15221433494852.jpg'
        },
        {
          id: '5', dateline: 1522221270, starttime: 1522825984, endtime: 1524121984, isfinished: 0, type: 'groupbuy', groupprice: '0.50', title: '董明珠：格力不能更好运营，绝对不交班;揭电商大数据杀熟套路：算法投放，大V投诉更快处理', shares: 3, views: 5, photo: 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15221255851634.jpg'
        }
      ],
      clickdata: {},
      showconfirm: false,
      showgroupbuy: false,
      showbargainbuy: false,
      showdiscount: false
    }
  },
  methods: {
    stopevent (item) {
      this.showconfirm = true
      this.clickdata = item
    },
    canceldownConfirm () {
      this.showconfirm = false
    },
    okdownConfirm () {
      this.showconfirm = false
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
@import '~vux/src/styles/center.less';
@import '../assets/fonts.less';
@import '../assets/global.less';

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
</style>
