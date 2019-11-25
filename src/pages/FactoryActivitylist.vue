<template>
  <div class="containerarea font14 havetoptab bg-page factivitylist">
    <subscribe v-if="loginUser.subscribe == 0 && !loginUser.isretailer"></subscribe>
    <apply-tip v-if="showApply"></apply-tip>
    <template v-if="showContainer">
      <div class="pagetop">
        <tab v-model="tabmodel" class="v-tab">
          <tab-item v-if="!tabdata1 || tabdata1.length == 0 || query.from == 'miniprogram'" :selected="true">创建活动</tab-item>
          <tab-item
            v-else
            v-for="(item,index) in tabtxts"
            :selected="(query.from != 'miniprogram' && index == 0) || (query.from == 'miniprogram' && index == 1) || (query.type == 'add' && index == 1)"
            :key="index">{{item}}</tab-item>
        </tab>
      </div>
      <div class="s-container" style="top:44px">
        <template v-if="!tabdata1 || tabdata1.length == 0 || query.from == 'miniprogram'">
          <create-activity :fid="Fid" :retailer-info="retailerInfo" @on-add="clickAdd"></create-activity>
        </template>
        <template v-else>
          <div v-if="tabmodel === 0" class="swiper-inner scroll-container1" ref="scrollContainer" @scroll="handleScroll('scrollContainer')">
            <div class="pro_box bg-page list_shadow pl12 pr12 pb15">
              <div class="pro_list_top bg-page color-lightgray pt10 pb10 pl12 pr12"></div>
              <div class="rule pb12 pt12 pl12 pr12 border color-lightgray b_bottom_after list-shadow bg-white" style="margin-top: -4px;">
                <div>活动只有立即分享才会发挥作用哦！分享后你可以：</div>
                <div>1. 知道查看活动的用户和他们的兴趣度；</div>
                <div>2. 可以带来更多客户及购买量。</div>
              </div>
            </div>
            <div class="scroll_list">
              <div v-for="(item,index1) in tabdata1" :key="item.id" :class="`scroll_item ${item.type}item bg-white mb5 pl12 pr12 db`">
                <div @click="toProduct(item)" v-if="item.type == 'groupbuy'" :key="item.id" class="db" style="position:relative;">
                  <div v-if="item.isfinished === 1" class="ico finished"></div>
                  <div class="t-table">
                    <div class="t-cell align_left pr10 v_middle" style="width:100px;">
                      <img class="v_middle imgcover" :src="item.photo" style="width:100px;height:100px;" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
                    </div>
                    <div class="t-cell align_left v_middle">
                      <div class="clamp1 font16 color-lightgray">{{item.title}}</div>
                      <div class="clamp1 font14 color-gray mt5">{{ $t('Groupprice') }} <span class="color-red"> {{ $t('RMB') }} {{ item.groupprice }} </span></div>
                      <div class="clamp1 font14 color-gray mt5">{{ $t('Group numbers') }} {{ item.numbers }}{{ $t('Person') }}</div>
                    </div>
                    <div class="t-cell align_right v_middle font0" style="width:60px;">
                      <div class="qbtn bg-red color-white" :to="{path: '/stat', query:{id: item.id, module: 'activity'}}" @click.stop="toStat(item)">{{ $t('Stat') }}</div>
                      <div class="qbtn bg-red color-white mt5" v-if="item.isfinished != 1" @click.stop="stopevent(item,index1)">停止</div>
                    </div>
                  </div>
                  <div class="mt5 font12 color-gray">活动时间：{{ item.starttime | dateformat}} 至 {{ item.endtime | dateformat}}</div>
                </div>
                <div @click="toActivity(item)" v-else-if="item.type == 'bargainbuy'" :key="item.id" class="db" style="position:relative;">
                  <div v-if="item.isfinished === 1" class="ico finished"></div>
                  <div class="t-table">
                    <div class="t-cell align_left pr10 v_middle" style="width:100px;">
                      <img class="v_middle imgcover" :src="item.photo" style="width:100px;height:100px;" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
                    </div>
                    <div class="t-cell align_left v_middle">
                      <div class="clamp1 font16 color-lightgray">{{item.title}}</div>
                      <div class="clamp1 font14 color-gray mt5">{{ $t('Min buy price') }} <span class="color-red"> {{ $t('RMB') }} {{ item.minprice }} </span></div>
                    </div>
                    <div class="t-cell align_right v_middle font0" style="width:60px;">
                      <div class="qbtn bg-red color-white" :to="{path: '/stat', query:{id: item.id, module: 'activity'}}" @click.stop="toStat(item)">{{ $t('Stat') }}</div>
                      <div class="qbtn bg-red color-white mt5" v-if="item.isfinished != 1" @click.stop="stopevent(item,index1)">停止</div>
                    </div>
                  </div>
                  <div class="mt5 font12 color-gray">活动时间：{{ item.starttime | dateformat}} 至 {{ item.endtime | dateformat}}</div>
                </div>
              </div>
            </div>
          </div>
          <template v-if="tabmodel == 1">
            <create-activity :fid="Fid" :retailerInfo.sync="retailerInfo" @on-add="clickAdd"></create-activity>
          </template>
        </template>
      </div>
    </template>
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
Delivery of goods:
  zh-CN: 投放商品数量
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
import { Tab, TabItem, Swiper, SwiperItem, TransferDom, Confirm, Popup, XImg } from 'vux'
import CreateActivity from '@/components/CreateActivity'
import Time from '#/time'
import ENV from 'env'
import { User } from '#/storage'
import Subscribe from '@/components/Subscribe'
import ApplyTip from '@/components/ApplyTip'

const limit = 10
let pageStart1 = 0

export default {
  directives: {
    TransferDom
  },
  components: {
    Tab, TabItem, Swiper, SwiperItem, Confirm, Popup, XImg, CreateActivity, Subscribe, ApplyTip
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      loginUser: {},
      retailerInfo: {},
      factoryInfo: {},
      query: {},
      showApply: false,
      showContainer: false,
      tabtxts: [ '全部活动', '创建活动' ],
      tabmodel: 0,
      tabdata1: [],
      isFirstLoad: true,
      activityCount: 0,
      Fid: 0
    }
  },
  watch: {
    tabdata1: function () {
      return this.tabdata1
    }
  },
  methods: {
    toStat (item) {
      let queryParams = this.$util.handleAppParams(this.query, {id: item.id, module: 'activity'})
      if (this.query.minibackurl) {
        queryParams.minibackurl = this.query.minibackurl
        queryParams.backtype = this.query.backtype
      }
      this.$router.push({path: '/stat', query: queryParams})
    },
    toProduct (item) {
      const self = this
      if (self.query.from) {
        self.$wechat.miniProgram.navigateTo({url: `${ENV.MiniRouter.product}?id=${item.fpid}&fid=${item.fid}&module=factoryproduct`})
      } else {
        self.$router.push({path: '/product', query: {id: item.fpid, fid: item.fid, module: 'factoryproduct'}})
      }
    },
    toActivity (item) {
      const self = this
      if (self.query.from) {
        self.$wechat.miniProgram.navigateTo({url: `${ENV.MiniRouter.activity}?id=${item.id}`})
      } else {
        self.$router.push({path: '/activity', query: {id: item.id}})
      }
    },
    clickAdd (type) {
      let queryParams = this.$util.handleAppParams(this.query, {type: type, fid: this.Fid})
      if (this.query.id) {
        queryParams.id = this.query.id
      }
      if (this.query.minibackurl) {
        queryParams.minibackurl = this.query.minibackurl
        queryParams.backtype = this.query.backtype
      }
      this.$router.push({path: '/addActivity', query: queryParams})
    },
    openVip () {
      const self = this
      self.$vux.confirm.show({
        content: ENV.vipActivity,
        cancelText: ENV.giveUpVipText,
        confirmText: ENV.openVipText,
        onConfirm () {
          location.replace(`${ENV.Host}/#/pay?id=${self.loginUser.payorderid}&module=payorders`)
        }
      })
    },
    handleScroll (refname) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          if (self.tabdata1.length === (pageStart1 + 1) * limit) {
            pageStart1++
            self.$vux.loading.show()
            self.getData1()
          }
        }
      })
    },
    getData1 () {
      const self = this
      let params = {pagestart: pageStart1, limit: limit, fid: this.Fid}
      self.$http.get(`${ENV.BokaApi}/api/retailer/listActivity`, {
        params: params
      }).then((res) => {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabdata1 = self.tabdata1.concat(retdata)
        self.showContainer = true
        if (self.isFirstLoad) {
          self.activityCount = self.tabdata1.length
          self.isFirstLoad = false
        }
      })
    },
    stopevent (item, index) {
      event.preventDefault()
      const self = this
      self.$vux.confirm.show({
        content: '确定要停止吗？',
        onConfirm () {
          self.$http.post(`${ENV.BokaApi}/api/retailer/stopActivity`, {id: item.id, fid: this.Fid}).then(function (res) {
            let data = res.data
            self.isShowLoading = false
            self.$vux.toast.show({
              text: data.error,
              time: self.$util.delay(data.error),
              onHide: function () {
                if (data.flag === 1) {
                  self.tabdata1[index].isfinished = 1
                }
              }
            })
          })
        }
      })
    },
    init () {
      this.$vux.loading.show()
    },
    initContainer () {
      const self = this
      self.showApply = false
      self.showContainer = false
    },
    refresh () {
      const self = this
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.loginUser = User.get()
      this.query = this.$route.query
      this.Fid = this.query.fid ? parseInt(this.query.fid) : this.loginUser.fid
      self.showContainer = true
      if (this.tabdata1.length < limit || this.query.add) {
        pageStart1 = 0
        this.tabdata1 = []
        this.getData1()
      }
    }
  },
  created () {
    this.init()
  },
  activated () {
    this.refresh()
    this.$util.miniPost()
  }
}
</script>

<style lang="less" scoped>
.factivitylist{
  .ico{
    position:absolute;left:0;top:0;width:96px;height:25px;line-height:25px;
    background-color:#ff9f9f;color:#fff;text-align:center;font-size: 12px;
    -webkit-transform: translate(-40px,-2px) rotate(-45deg);
    transform: translate(-40px,-2px) rotate(-45deg);
  }
  .finished.ico{background-color:#8a8a8a;}
  .finished.ico:after{content:"已结束";}
  .scroll_item{
    padding-top:10px;
    padding-bottom:10px;
    position:relative;
    overflow:hidden;
  }
  .scroll_item .row{
    display: -webkit-box;
    position:relative;
  }
  .x-toptab, .x-toptab.vux-tab-warp{
    height: 44px;
  }
  .pro_list_top{
    background: url(../assets/images/product_list_top.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-size: 100%;
    height: 20px;
  }
}
</style>
