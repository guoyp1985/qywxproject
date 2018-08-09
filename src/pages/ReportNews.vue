<template>
  <div class="containerarea bg-page font14 rcustomerlist">
    <subscribe v-if="loginUser.subscribe != 1"></subscribe>
    <apply-tip v-if="showApply"></apply-tip>
    <template v-if="showContainer">
      <div class="s-topbanner s-topbanner1 bg-white">
        <div class="row">
          <tab v-model="selectedIndex" class="v-tab">
            <tab-item v-for="(item,index) in tabtxts" :selected="index == 0" :key="index">{{item}}</tab-item>
          </tab>
        </div>
      </div>
      <div class="s-container s-container1">
        <swiper v-model="selectedIndex" class="x-swiper no-indicator" @on-index-change="swiperChange">
          <swiper-item v-for="(tabitem, index) in tabtxts" :key="index">
            <div v-if="(index == 0)" class="swiper-inner scroll-container1" ref="scrollContainer1" @scroll="handleScroll('scrollContainer1', index)">
              <div v-if="disTabData1" class="scroll_list">
                <div v-if="!tabData1 || tabData1.length === 0" class="scroll_item padding10 color-gray align_center">
                  <div><i class="al al-qiangkehu font60 pt20"></i></div>
                  <div class="mt5">好可怜，一个客户都没有~<br />赶快分享<router-link to="/store" class="color-blue">商品</router-link>或<router-link to="/retailerNews" class="color-blue">文章</router-link>给微信好友获得客户吧！</div>
                </div>
                <div v-else v-for="(item,index) in tabData1" :key="item.id" class="scroll_item pt10 pb10 pl12 pr12 bg-white mb10 list-shadow">
                  <div class="t-table">
                    <router-link :to="{path: 'membersView', query: {uid: item.uid}}" class="t-cell v_middle w70">
                      <img class="avatarimg3 imgcover" :src="item.avatar" onerror="javascript:this.src='http://vuxlaravel.boka.cn/images/user.jpg';" />
                    </router-link>
                    <router-link :to="{path: 'membersView', query: {uid: item.uid}}" class="t-cell v_middle">
                      <div class="clamp1 font14 color-lightgray"><span v-if="item.priority" class="mr3"><i class="fa fa-arrow-circle-o-up color-orange" style="font-weight:bold;"></i></span><span :class="getDateClass(item.dateline)">{{ getDateState(item.dateline) }}</span>{{item.linkman}}</div>
                      <div class="clamp1 mt5 font14 color-gray">返点客: {{item.uploadname}}</div>
                    </router-link>
                    <div class="t-cell v_middle w60 h_100 align_right">
                        <div class="percentarea db-in v_middle" @click="percentclick">
                          <div class="inner" :style="`width:${item.percent}%`"></div>
                          <div class="txt font12">{{ item.percent }}%</div>
                        </div>
                    </div>
                    <router-link :to="{path: '/chat', query: {uid: item.uid}}" class="t-cell v_middle w60 align_right">
                      <div class="qbtn bg-red color-white">联系</div>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="(index == 1)" class="swiper-inner scroll-container2" ref="scrollContainer2" @scroll="handleScroll('scrollContainer2', index)">
              <div v-if="disTabData2" class="scroll_list">
                <div v-if="!tabData2 || tabData2.length === 0" class="scroll_item padding10 color-gray align_center">
                  <div><i class="al al-qiangkehu font60 pt20"></i></div>
                  <div class="mt5">好可怜，一个客户都没有~<br />赶快分享<router-link to="/store" class="color-blue">商品</router-link>或<router-link to="/retailerNews" class="color-blue">文章</router-link>给微信好友获得客户吧！</div>
                </div>
                <div v-else v-for="(item,index) in tabData2" :key="item.id" class="scroll_item pt10 pb10 pl12 pr12 bg-white mb10 list-shadow">
                  <div class="t-table">
                    <router-link :to="{path: 'membersView', query: {uid: item.uid}}" class="t-cell v_middle w70">
                      <img class="avatarimg3 imgcover" :src="item.avatar" onerror="javascript:this.src='http://vuxlaravel.boka.cn/images/user.jpg';" />
                    </router-link>
                    <router-link :to="{path: 'membersView', query: {uid: item.uid}}" class="t-cell v_middle">
                      <div class="clamp1 font14 color-lightgray"><span v-if="item.priority" class="mr3"><i class="fa fa-arrow-circle-o-up color-orange" style="font-weight:bold;"></i></span><span :class="getDateClass(item.dateline)">{{ getDateState(item.dateline) }}</span>{{item.linkman}}</div>
                      <div class="clamp1 mt5 font14 color-gray">返点客：{{item.uploadname}}</div>
                    </router-link>
                    <router-link :to="{path: '/chat', query: {uid: item.uid}}" class="t-cell v_middle w60 align_right">
                      <div class="qbtn bg-red color-white">联系</div>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </swiper-item>
        </swiper>
      </div>
      <div v-transfer-dom class="x-popup">
        <popup v-model="isshowpopup" height="100%">
          <div class="popup1 font14">
            <div class="percentlayer">
              <div class="bg"></div>
              <div class="w_100 h_100 flex_center">
                <div class="layerinner align_left probability">
                  <div class="inner">
                    <div class="pro" >
                      <div class="pro-sucess">
                        <div class="flex_left">
                          <img class="v_middle" src="http://vuxlaravel.boka.cn/images/infor.png"/>
                          <div class="color-blue">什么是成交概率</div>
                        </div>
                        <div class="font12" >成交概率是系统自动根据客户查看文章等行为，自动计算出该客户的真正成为购买客户的可能性。数字越大,可能性越大,成交概率就越高。</div>
                      </div>
                      <div class="pro-push">
                        <div class="flex_left">
                          <img class="v_middle" src="http://vuxlaravel.boka.cn/images/infor.png"/>
                          <div class="color-blue">如何提升成交概率</div>
                        </div>
                        <div class="font12">1、推送客户感兴趣的文章;</div>
                        <div class="font12">2、发展更多的返点客。</div>
                      </div>
                    </div>
                  </div>
                  <div class="pro-know">
                    <span class="close" @click="closepopup">知道了</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </popup>
      </div>
    </template>
  </div>
</template>

<i18n>
Contact customer:
  zh-CN: 联系客户
Customer text:
  zh-CN: 客户
Percent:
  zh-CN: 成交概率
</i18n>

<script>
import { Tab, TabItem, Swiper, SwiperItem, Search, Group, Popup, TransferDom, XImg, PopupHeader, Radio } from 'vux'
import ENV from 'env'
import { User } from '#/storage'
import Subscribe from '@/components/Subscribe'
import ApplyTip from '@/components/ApplyTip'

export default {
  directives: {
    TransferDom
  },
  components: {
    Tab, TabItem, Swiper, SwiperItem, Search, Group, Popup, XImg, Subscribe, ApplyTip, PopupHeader, Radio
  },
  data () {
    return {
      loginUser: {},
      query: {},
      showApply: false,
      showContainer: false,
      tabtxts: [ '成交客户', '支付订单' ],
      selectedIndex: 0,
      disTabData1: false,
      disTabData2: false,
      tabData1: [],
      tabData2: [],
      isshowpopup: false,
      limit: 10,
      pagestart1: 0,
      pagestart2: 0
    }
  },
  methods: {
    handleScroll: function (refname, index) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          if (index === 0) {
            if (self.tabData1.length === (self.pagestart1 + 1) * self.limit) {
              self.pagestart1++
              self.$vux.loading.show()
              self.getData1()
            }
          } else if (index === 1) {
            if (self.tabdata3.length === (self.pagestart3 + 1) * self.limit) {
              self.pagestart3++
              self.$vux.loading.show()
              self.getData3()
            }
          }
        }
      })
    },
    getData1 () {
      const self = this
      this.$vux.loading.show()
      let params = { tolevel: -1, pagestart: self.pagestart1, limit: self.limit }
      self.$http.get(`${ENV.BokaApi}/api/retailer/customerList`, {
        params: params
      }).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabData1 = self.tabData1.concat(retdata)
        self.disTabData1 = true
      })
    },
    getData2 () {
      const self = this
      this.$vux.loading.show()
      let params = { params: { tolevel: 5, pagestart: self.pagestart2, limit: self.limit } }
      self.$http.get(`${ENV.BokaApi}/api/retailer/customerList`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabData2 = self.tabData2.concat(retdata)
        self.disTabData2 = true
      })
    },
    swiperChange (index) {
      const self = this
      if (index !== undefined) {
        this.selectedIndex = index
      }
      switch (this.selectedIndex) {
        case 0:
          if (this.tabData1.length < this.limit) {
            self.pagestart1 = 0
            self.disTabData1 = false
            this.tabData1 = []
            self.getData1()
          }
          break
        case 1:
          if (this.tabData2.length < this.limit) {
            self.pagestart2 = 0
            self.disTabData2 = false
            this.tabData2 = []
            self.getData2()
          }
          break
      }
    },
    percentclick () {
      this.isshowpopup = true
    },
    closepopup () {
      this.isshowpopup = false
    },
    getDateState (dt) {
      return this.$util.getDateState(dt)
    },
    getDateClass (dt) {
      let ret = this.$util.getDateClass(dt)
      ret = `${ret} mr5`
      return ret
    },
    getData () {
      this.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, {
        module: 'retailer', action: 'customerlist'
      })
    },
    init () {
      this.$vux.loading.show()
      this.getData()
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
      if (this.loginUser && this.loginUser.subscribe === 1) {
        if (self.loginUser.isretailer === 2) {
          self.initContainer()
          self.$vux.loading.hide()
          let backUrl = encodeURIComponent(location.href)
          location.replace(`${ENV.Host}/#/pay?id=${self.loginUser.payorderid}&module=payorders&lasturl=${backUrl}`)
        } else {
          if (!this.loginUser.isretailer) {
            this.$vux.loading.hide()
            self.initContainer()
            this.showApply = true
          } else {
            self.initContainer()
            this.showContainer = true
            this.swiperChange()
          }
        }
      }
    }
  },
  created () {
    this.init()
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less" >
.rcustomerlist .condition{
  position: relative;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #eeeeee;
}
.rcustomerlist .h35{
  height: 35px;
  line-height: 35px;
}
.orderbyarea .orderbyitem{
  position:relative;
  text-align:center;
}
.orderbyarea .orderbyitem.active{color: #ea3a3a;}
.orderbyarea .orderbyitem:not(:last-child):after{
  content: "";
  position: absolute;
  right:0;
  top:50%;
  margin-top:-8px;
  height: 16px;
  width: 1px;
  background-color: #f5f5f5;
}
.orderbyarea .orderbyitem.active .ico:after{
  content: '▼';font-size:12px;margin-left:5px;
}
</style>
