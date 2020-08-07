<template>
  <div class="containerarea bg-white font14 rsaleview">
    <apply-tip v-if="showApply"></apply-tip>
    <subscribe v-if="loginUser.subscribe == 0 && !loginUser.isretailer"></subscribe>
    <Sos v-if="showSos" :title="sosTitle"></Sos>
    <template v-if="showContainer">
      <div class="s-topbanner">
        <div class="flex_left h_100 toprow color-white pl15 pr15">
          <router-link class="w70" :to="{ path: '/membersView', query: { uid: sellerUser.uid } }">
            <img class="avatarimg5 v_middle imgcover" :src="sellerUser.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
          </router-link>
          <div class="clamp1 flex_cell">
            <router-link class="db font16" :to="{ path: '/membersView', query: { uid: sellerUser.uid } }">{{ sellerUser.username }}</router-link>
            <div class="align_left db-in" @click="createQrcode"><i class="al al-a166 font12" style="line-height: 12px;"></i> 返点客推荐码</div>
          </div>
          <div class="align_center w100">
            <div @click="toChat" class=""><i class="al al-liaotian font16"><span class="ml5">联系</span></i></div>
            <a class="db mt5" v-if="sellerUser.mobile && sellerUser.mobile != ''" :href="`tel:${sellerUser.mobile}`"><i class="al al-fuwuzhongxin font16"><span class="ml5">电话</span></i></a>
          </div>
        </div>
        <div class="row row2">
          <tab v-model="selectedIndex" class="v-tab" active-color="#ea3a3a" default-color="#666" style="height:60px;">
            <tab-item v-for="(item,index) in tabtxts" :selected="index == selectedIndex" :key="index" @on-item-click="clickTab">
              <div class="flex_center txt">
                <div>
                  <div>{{item}}</div>
                  <div v-if="index == 0">{{ $t('RMB') }}{{ sellerUser.total }}</div>
                  <div v-else-if="index == 1">{{ sellerUser.shares }}次</div>
                  <div v-else-if="index == 2">{{ sellerUser.customers }}人</div>
                </div>
              </div>
            </tab-item>
          </tab>
        </div>
      </div>
      <div class="s-container s-container2" style="top:148px;">
        <div v-show="(selectedIndex == 0)" class="swiper-inner scroll-container1" ref="scrollContainer1" @scroll="handleScroll('scrollContainer1',0)">
          <div v-if="distabdata1" class="scroll_list pl10 pr10 mb10 list-shadow">
            <div v-if="!tabdata1 || tabdata1.length == 0" class="scroll_item color-gray padding10 align_center">
              <div><i class="al al-wushuju font60 pt20"></i></div>
              <div class="mt5">该返点客还没有带来消费</div>
              <div>积极与返点客沟通可调动TA的积极性哦！</div>
            </div>
            <div v-else class="scroll_item pt10 pb10" v-for="(item,index1) in tabdata1" :key="item.id">
              <div class="t-table">
                <div @click="toMemberView(item)" class="t-cell v_middle w70">
                  <img class="avatarimg3 imgcover v_middle" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
                </div>
                <div @click="toMemberView(item)" class="t-cell v_middle">
                  <div class="clamp1 font14 color-lightgray">{{item.linkman}}</div>
                  <div class="clamp1 font14 color-gray">订单金额:{{ $t('RMB') }}{{item.special}}</div>
                  <div class="clamp1 font14 color-gray">时间:{{ item.dateline | dateformat }}</div>
                </div>
                <div class="t-cell v_middle align_right w60">
                  <div @click="toChat(item)" class="qbtn bg-red color-white">联系</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="(selectedIndex == 1)" class="swiper-inner scroll-container2" ref="scrollContainer2" @scroll="handleScroll('scrollContainer2',1)">
          <div v-if="distabdata2" class="scroll_list pl10 pr10 mb10 list-shadow">
            <div v-if="!tabdata2 || tabdata2.length == 0" class="scroll_item color-gray padding10 align_center">
              <div><i class="al al-wushuju font60 pt20"></i></div>
              <div class="mt5">该返点客还没有分享过</div>
              <div>积极与返点客沟通可调动TA的积极性哦！</div>
            </div>
            <div v-else class="scroll_item pt10 pb10 db" v-for="(item,index1) in tabdata2" :key="item.id" @click="clickItem(item)">
              <div class="t-table">
                <div class="t-cell v_middle w80">
                  <img class="imgcover v_middle" style="width:70px;height:70px;" :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
                </div>
                <div class="t-cell v_middle">
                  <div class="clamp1 font14 color-lightgray">{{item.title}}</div>
                  <div class="clamp1 font14 color-gray">分享次数:{{item.shares}}</div>
                  <div class="clamp1 font14 color-gray">带来访问:{{item.visitor}}</div>
                  <div class="clamp1 font14 color-gray">{{ item.dateline | dateformat }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="(selectedIndex == 2)" class="swiper-inner scroll-container3" ref="scrollContainer3" @scroll="handleScroll('scrollContainer3',2)">
          <div class="font12 padding10 b_bottom bg-page color-lightgray">
            <div class="t-table w_100">
              <div class="t-cell align_left pl10">{{ $t('Customer text') }}</div>
              <div class="t-cell align_right w80">{{ $t('Percent') }}</div>
              <div class="t-cell align_right w60">{{ $t('Contact Consumers') }}</div>
            </div>
          </div>
          <div v-if="distabdata3" class="scroll_list pl10 pr10 mb10 list-shadow cols-2">
            <div v-if="!tabdata3 || tabdata3.length == 0" class="scroll_item color-gray padding10 align_center">
              <div><i class="al al-wushuju font60 pt20"></i></div>
              <div class="mt5">该返点客还没有带来客户</div>
              <div>积极与返点客沟通可调动TA的积极性哦！</div>
            </div>
            <div v-else class="scroll_item pt10 pb10" v-for="(item,index1) in tabdata3" :key="item.id">
              <div class="t-table">
                <div @click="toMemberView(item)" class="t-cell v_middle w70">
                  <img class="avatarimg3 imgcover v_middle" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
                </div>
                <div @click="toMemberView(item)" class="t-cell v_middle">
                  <div class="clamp1 font14 color-lightgray">{{item.linkman}}</div>
                  <div class="clamp1 font14 color-gray">{{ item.dateline | dateformat }}</div>
                </div>
                <div class="t-cell v_middle w60 h_100 align_right">
                    <div class="percentarea db-in v_middle" @click="percentclick">
                      <div class="inner" :style="`width:${item.percent}%`"></div>
                      <div class="txt font12">{{ item.percent }}%</div>
                    </div>
                </div>
                <div class="t-cell v_middle align_right w60">
                    <div @click="toChat(item)" class="qbtn bg-red color-white">联系</div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
                          <img class="v_middle" src="https://tossharingsales.boka.cn/images/infor.png"/>
                          <div class="color-blue">什么是成交概率</div>
                        </div>
                        <div class="font12" >成交概率是系统自动根据客户查看文章等行为，自动计算出该客户的真正成为购买客户的可能性。数字越大,可能性越大,成交概率就越高。</div>
                      </div>
                      <div class="pro-push">
                        <div class="flex_left">
                          <img class="v_middle" src="https://tossharingsales.boka.cn/images/infor.png"/>
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
      <div v-transfer-dom class="qrcode-dialog">
        <x-dialog v-model="storeCardShow">
          <div class="img-box">
            <img :src="storeQrcode" style="max-width:100%;max-height:100%;">
          </div>
          <div class="padding10 color-white">{{$t('Save Picture To Sharing')}}</div>
          <div @click="storeCardShow=false">
            <span class="vux-close color-white"></span>
          </div>
        </x-dialog>
      </div>
    </template>
  </div>
</template>

<script>
import { Tab, TabItem, Swiper, SwiperItem, Group, Popup, TransferDom, XImg, XDialog } from 'vux'
import Sos from '@/components/Sos'
import Subscribe from '@/components/Subscribe'
import ApplyTip from '@/components/ApplyTip'
import Time from '#/time'
import ENV from 'env'
import { User } from '#/storage'
// const jweixin = require('../../static/jweixin')

export default {
  directives: {
    TransferDom
  },
  components: {
    Tab, TabItem, Swiper, SwiperItem, Group, Popup, XImg, Sos, XDialog, Subscribe, ApplyTip
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      showApply: false,
      showSos: false,
      sosTitle: '该记录不存在',
      showContainer: false,
      query: {},
      loginUser: {},
      sellerUser: { avatar: 'https://tossharingsales.boka.cn/images/user.jpg', total: '0.00', shares: 0, customers: 0 },
      isshowpopup: false,
      tabtxts: [ '带来消费', '分享记录', '带来客户' ],
      selectedIndex: 0,
      distabdata1: false,
      distabdata2: false,
      distabdata3: false,
      tabdata1: [],
      tabdata2: [],
      tabdata3: [],
      limit: 10,
      pagestart1: 0,
      pagestart2: 0,
      pagestart3: 0,
      storeCardShow: false,
      storeQrcode: null
    }
  },
  methods: {
    initData: function () {
      this.showApply = false
      this.showSos = false
      this.sosTitle = '该记录不存在'
      this.showContainer = false
      this.sellerUser = { avatar: 'https://tossharingsales.boka.cn/images/user.jpg', total: '0.00', shares: 0, customers: 0 }
      this.isshowpopup = false
      this.selectedIndex = 0
      this.distabdata1 = false
      this.distabdata2 = false
      this.distabdata3 = false
      this.tabdata1 = []
      this.tabdata2 = []
      this.tabdata3 = []
      this.pagestart1 = 0
      this.pagestart2 = 0
      this.pagestart3 = 0
      this.storeCardShow = false
      this.storeQrcode = null
    },
    toChat (item) {
      let params = this.$util.handleAppParams(this.query, {uid: this.query.uid})
      if (item && item.uid) {
        params.uid = item.uid
      }
      this.$router.push({path: '/chat', query: params})
    },
    toMemberView (item) {
      let params = this.$util.handleAppParams(this.query, {uid: item.uid})
      this.$router.push({path: '/membersView', query: params})
    },
    createQrcode: function () {
      const self = this
      if (self.storeQrcode) {
        self.storeCardShow = true
      } else {
        self.$vux.loading.show()
        self.$http.post(`${ENV.BokaApi}/api/seller/recommend_qrcode`, {wid: self.sellerUser.wid, uid: self.query.uid})
        .then(res => {
          self.$vux.loading.hide()
          let data = res.data
          if (data.flag === 1) {
            self.storeQrcode = data.data
            self.storeCardShow = true
          } else {
            self.$vux.toast.show({
              text: data.error,
              type: 'warn',
              time: self.$util.delay(data.error)
            })
          }
        })
      }
    },
    handleScroll: function (refname, index) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          if (index === 0) {
            if (self.tabdata1.length === (self.pagestart1 + 1) * self.limit) {
              self.pagestart1++
              self.$vux.loading.show()
              self.getData1()
            }
          } else if (index === 1) {
            if (self.tabdata2.length === (self.pagestart2 + 1) * self.limit) {
              self.pagestart2++
              self.$vux.loading.show()
              self.getData2()
            }
          } else if (index === 2) {
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
      this.$vux.loading.show()
      const self = this
      const params = { params: { selleruid: self.query.uid, action: 'orders', pagestart: self.pagestart1, limit: self.limit } }
      self.$http.get(`${ENV.BokaApi}/api/retailer/sellerAction`, params).then(res => {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        self.tabdata1 = self.tabdata1.concat(retdata)
        self.distabdata1 = true
      })
    },
    getData2 () {
      this.$vux.loading.show()
      const self = this
      const params = { params: { selleruid: self.query.uid, action: 'shares', pagestart: self.pagestart2, limit: self.limit } }
      self.$http.get(`${ENV.BokaApi}/api/retailer/sellerAction`, params).then(res => {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        self.tabdata2 = self.tabdata2.concat(retdata)
        self.distabdata2 = true
      })
    },
    getData3 () {
      this.$vux.loading.show()
      const self = this
      const params = { params: { selleruid: self.query.uid, action: 'customers', pagestart: self.pagestart3, limit: self.limit } }
      self.$http.get(`${ENV.BokaApi}/api/retailer/sellerAction`, params).then(res => {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        self.tabdata3 = self.tabdata3.concat(retdata)
        self.distabdata3 = true
      })
    },
    clickTab () {
      this.swiperChange()
    },
    swiperChange (index) {
      const self = this
      if (index !== undefined) {
        this.selectedIndex = index
      }
      switch (this.selectedIndex) {
        case 0:
          if (this.tabdata1.length < this.limit) {
            self.pagestart1 = 0
            this.distabdata1 = false
            this.tabdata1 = []
            this.getData1()
          }
          break
        case 1:
          if (this.tabdata2.length < this.limit) {
            self.pagestart2 = 0
            this.distabdata2 = false
            this.tabdata2 = []
            this.getData2()
          }
          break
        case 2:
          if (this.tabdata3.length < this.limit) {
            self.pagestart3 = 0
            this.distabdata3 = false
            this.tabdata3 = []
            this.getData3()
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
    clickItem (item) {
      // if (item.module === 'news' && this.query.from) {
      //   jweixin.miniProgram.navigateTo({url: `${ENV.MiniRouter.news}?id=${item.id}&wid=${item.kefuid}`})
      // } else if (item.module === 'product' && this.query.from) {
      //   jweixin.miniProgram.navigateTo({url: `${ENV.MiniRouter.product}?id=${item.id}&wid=${item.kefuid}&module=product`})
      // } else if (item.module === 'activity' && this.query.from) {
      //   jweixin.miniProgram.navigateTo({url: `${ENV.MiniRouter.activity}?id=${item.id}&wid=${item.kefuid}`})
      // } else {
      //   let params = this.$util.handleAppParams(this.query, {id: item.moduleid, wid: item.kefuid})
      //   this.$router.push({path: `/${item.module}`, query: params})
      // }
    },
    getData () {
      const self = this
      this.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, { module: 'retailer', action: 'saleview' })
      .then(res => self.$http.get(`${ENV.BokaApi}/api/retailer/sellerView`, { params: { selleruid: self.query.uid } }))
      .then(res => {
        self.$vux.loading.hide()
        const data = res.data
        self.sellerUser = (data.data ? data.data : data)
        if (self.sellerUser.length === 0) {
          self.showSos = true
          this.showSos1 = false
          self.showContainer = false
        } else {
          self.showSos = false
          this.showSos1 = false
          self.showContainer = true
          document.title = self.sellerUser.username
          self.swiperChange()
        }
      })
    },
    initContainer () {
      const self = this
      self.showApply = false
      self.showSos = false
      self.showContainer = false
    },
    refresh () {
      const self = this
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.$vux.loading.show()
      this.loginUser = User.get()
      if (this.loginUser && (this.loginUser.subscribe !== 0 || this.loginUser.isretailer)) {
        // if (self.loginUser.isretailer === 2) {
        //   self.initContainer()
        //   self.$vux.loading.hide()
        //   let backUrl = encodeURIComponent(location.href)
        //   location.replace(`${ENV.Host}/#/pay?id=${self.loginUser.payorderid}&module=payorders&lasturl=${backUrl}`)
        // } else {
        if (!this.loginUser.isretailer) {
          this.$vux.loading.hide()
          self.initContainer()
          this.showApply = true
        } else {
          if (this.query.uid !== this.$route.query.uid) {
            self.initContainer()
            this.initData()
            this.query = this.$route.query
            this.getData()
          } else {
            this.$vux.loading.hide()
          }
        }
        // }
      }
    }
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less">
.rsaleview .vux-tab-container{ height: 60px;}
.rsaleview .vux-tab{height: 60px;}
.rsaleview .v-tab .vux-tab .vux-tab-item{line-height: 30px;}
.rsaleview .s-topbanner .row{height: 60px;}
.rsaleview .vux-tab-wrap{padding-top: 0}

.qrcode-dialog .weui-dialog{background-color:transparent}
</style>
