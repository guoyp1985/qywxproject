<template>
  <div class="containerarea  bg-page  fong14 rsales">
    <subscribe v-if="loginUser.subscribe == 0 && !loginUser.isretailer"></subscribe>
    <apply-tip v-if="showApply"></apply-tip>
    <template v-if="showContainer">
      <div class="s-topbanner s-topbanner1">
        <div class="row">
          <tab v-model="selectedIndex" class="v-tab">
            <tab-item v-for="(item,index) in tabtxts" :selected="selectedIndex == index" :key="index" @on-item-click="swiperChange">{{item}}</tab-item>
          </tab>
        </div>
      </div>
      <div class="s-container s-container1">
        <template v-if="(selectedIndex == 0)">
          <div class="flex_center bg-white" style="height:55px;position:absolute;left:0;top:0;right:0;">
            <search
              class="v-search bg-white"
              v-model="searchword1"
              :auto-fixed="autofixed"
              @on-submit="onSubmit1"
              @on-change="onChange1"
              @on-cancel="onCancel1"
              ref="search">
            </search>
          </div>
          <div v-if="distabdata1" class="scroll_list swiper-inner scroll-container1" style="top:55px;" ref="scrollContainer1" @scroll="handleScroll('scrollContainer1',selectedIndex)">
            <div v-if="!tabdata1 || tabdata1.length === 0" class="scroll_item padding10 color-gray align_center">
              <template v-if="searchresult1">
                <div class="flex_center" style="height:80px;">暂无搜索结果</div>
              </template>
              <template v-else>
                <div><i class="al al-qiangkehu font60 pt20"></i></div>
                <div class="mt5">竟然没有返点客，点击【邀请返点客】，选择客户并【邀请】，与返点客一起赚钱吧！</div>
              </template>
            </div>
            <div v-else class="scroll_item pt10 pb10  pl12 pr12 bg-white mt10 list-shadow" v-for="(item,index1) in tabdata1" :key="item.id">
              <div class="t-table">
                <div @click="toSaleview(item)" class="t-cell v_middle" style="width:70px;">
                  <img class="avatarimg3 imgcover v_middle" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
                </div>
                <div @click="toSaleview(item)" class="t-cell v_middle">
                  <div class="clamp1 font14 color-lightgray">{{item.username}}({{item.linkman}})</div>
                  <div class="clamp1 mt5 font14 color-gray">带来消费: ￥{{item.sales}}</div>
                </div>
                <div @click="toChat(item)" class="t-cell w60 align_right v_middle">
                  <div class="qbtn bg-red color-white">联系</div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-if="(selectedIndex == 1)">
          <div class="flex_center bg-white" style="height:55px;position:absolute;left:0;top:0;right:0;">
            <search
              class="v-search bg-white"
              v-model="searchword2"
              :auto-fixed="autofixed"
              @on-submit="onSubmit2"
              @on-change="onChange2"
              @on-cancel="onCancel2"
              ref="search">
            </search>
          </div>
          <div v-if="distabdata2" class="scroll_list swiper-inner scroll-container2" style="top:55px;" ref="scrollContainer2" @scroll="handleScroll('scrollContainer2',selectedIndex)">
            <div v-if="!tabdata2 || tabdata2.length == 0" class="scroll_item color-gray padding10 align_center">
              <template v-if="searchresult2">
                <div class="flex_center" style="height:80px;">暂无搜索结果</div>
              </template>
              <template v-else>
              <div><i class="al al-qiangkehu font60 pt20"></i></div>
              <div class="mt5">竟然没有客户！将商品、活动或文章分享给好友或朋友圈，获得客户后即可将客户邀请成返点客啦！</div>
              </template>
            </div>
            <div v-else class="scroll_item pt10 pb10  pl12 pr12 bg-white mt10 list-shadow" v-for="(item,index1) in tabdata2" :key="item.id">
              <div class="t-table">
                <div @click="toMemberView(item)" class="t-cell v_middle " style="width: 70px;">
                  <img class="avatarimg3 imgcover v_middle" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
                </div>
                <div class="t-cell v_middle">
                  <div @click="toMemberView(item)">
                    <div class="clamp1 font14 color-lightgray">{{item.linkman}}</div>
                    <!-- <div class="clamp1 font14 color-gray">成为客户时间: {{ item.dateline | dateformat }}</div> -->
                  </div>
                  <div class="clamp1 font14 color-gray" style="width:120px;" @click="influence">影响力:
                    <span class="color-red4">{{item.yingxiangli}}</span>
                    <span class="al al-wenhao font20 ml5 v_middle"></span>
                  </div>
                  <div @click="toMemberView(item)">
                    <div class="clamp1 font14 color-gray">返点客: {{item.uploadname}}</div>
                  </div>
                </div>
                <div class="t-cell v_middle align_right w60">
                  <div class="qbtn bg-red color-white" @click="inviteevent(item,index1)">邀请</div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <div v-if="(selectedIndex == 2)" class="swiper-inner scroll-container3" ref="scrollContainer3" @scroll="handleScroll('scrollContainer3',selectedIndex)">
          <div v-if="distabdata3" class="scroll_list cols-2">
            <div v-if="!tabdata3 || tabdata3.length == 0" class="scroll_item color-gray padding10 align_center">
              <div><i class="al al-wushuju font60 pt20"></i></div>
              <div class="mt5">暂无返点记录，返点客帮你带来消费后，系统即可自动返点并记录！</div>
            </div>
            <div @click="toDetail(item)" v-else class="scroll_item db pt10 pb10 pl12 pr12 bg-white mt10 list-shadow" v-for="(item,index1) in tabdata3" :key="item.id">
              <div class="t-table">
                <div class="t-cell v_middle" style="width:70px;">
                  <img class="avatarimg3 imgcover v_middle" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
                </div>
                <div class="t-cell v_middle">
                  <div class="clamp1 font14 color-lightgray">{{item.linkman}}</div>
                  <div class="clamp1 mt5 font14 color-gray">返点金额: ￥{{item.money}}</div>
                  <div class="clamp1 font14 color-gray">返点时间: {{ item.dateline | dateformat }} </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <div v-transfer-dom class="x-popup">
      <popup v-model="isshowfluence" height="100%">
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
                        <div class="color-blue">什么是影响力</div>
                      </div>
                      <div class="font12" >影响力是指客户通过分享动作所带来的访问量，影响力数值越大，表示该客户越受朋友欢迎，所分享的内容打开率越高，可将影响力高的客户发展成代理，通过他的资源为你带来更多销量！</div>
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
    <!-- <template v-if="showFirst">
      <firstTip @submitFirstTip="submitFirstTip">
        <div class="font15 bold txt">
          <div class="flex_center">{{sysParams.advance_seller}}</div>
        </div>
      </firstTip>
    </template>
    <template v-if="showHb">
      <firstHb action="seller" @closeFirstHb="closeFirstHb" @afterOpen="afterClickOpen"></firstHb>
    </template> -->
  </div>
</template>

<i18n>
</i18n>

<script>
import { Tab, TabItem, Swiper, SwiperItem, Search, XTextarea, TransferDom, Popup, Group, XImg } from 'vux'
import Time from '#/time'
import ENV from 'env'
import { User, FirstInfo, SystemParams } from '#/storage'
import Subscribe from '@/components/Subscribe'
import ApplyTip from '@/components/ApplyTip'
import FirstTip from '@/components/FirstTip'
import FirstHb from '@/components/FirstHb'

export default {
  directives: {
    TransferDom
  },
  components: {
    Tab, TabItem, Swiper, SwiperItem, Search, XTextarea, Group, XImg, Subscribe, Popup, ApplyTip, FirstTip, FirstHb
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
      query: {},
      showApply: false,
      showContainer: false,
      autofixed: false,
      tabtxts: [ '返点客', '邀请返点客', '返点记录' ],
      selectedIndex: 0,
      distabdata1: false,
      distabdata2: false,
      distabdata3: false,
      tabdata1: [],
      tabdata2: [],
      tabdata3: [],
      searchword1: '',
      searchresult1: false,
      searchword2: '',
      searchresult2: false,
      limit: 10,
      pagestart1: 0,
      pagestart2: 0,
      pagestart3: 0,
      salesCount: 0,
      isFirstLoad: true,
      isshowfluence: false,
      showFirst: false,
      isFirst: false,
      showHb: false,
      sysParams: {}
    }
  },
  methods: {
    initData () {
      this.isFirst = false
      this.showFirst = false
      this.showHb = false
    },
    submitFirstTip () {
      this.showFirst = false
      // if (this.selectedIndex !== 1) {
      //   this.selectedIndex = 1
      //   this.swiperChange()
      // }
    },
    closeFirstHb () {
      this.isFirst = false
      this.showHb = false
    },
    afterClickOpen () {
      this.isFirst = false
    },
    toSaleview (item) {
      let params = this.$util.handleAppParams(this.query, {uid: item.uid})
      this.$router.push({path: '/retailerSaleview', query: params})
    },
    toChat (item) {
      let params = this.$util.handleAppParams(this.query, {uid: item.uid})
      this.$router.push({path: '/chat', query: params})
    },
    toMemberView (item) {
      let params = this.$util.handleAppParams(this.query, {uid: item.uid})
      this.$router.push({path: '/membersView', query: params})
    },
    toDetail (item) {
      if (item.ordertype === 'orders') {
        let params = this.$util.handleAppParams(this.query, {uid: item.id})
        this.$router.push({path: '/accountDetail', query: params})
      }
    },
    influence () {
      this.isshowfluence = true
    },
    closepopup () {
      this.isshowfluence = false
    },
    openVip () {
      const self = this
      self.$vux.confirm.show({
        content: ENV.vipSales,
        cancelText: ENV.giveUpVipText,
        confirmText: ENV.openVipText,
        onConfirm () {
          location.replace(`${ENV.Host}/#/pay?id=${self.loginUser.payorderid}&module=payorders`)
        }
      })
    },
    handleScroll: function (refname, index) {
      const self = this
      if (self.loginUser.isretailer === 1) {
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
      }
    },
    getData1 () {
      this.$vux.loading.show()
      const self = this
      const params = { params: { pagestart: self.pagestart1, limit: self.limit } }
      const keyword = self.searchword1
      if (typeof keyword !== 'undefined' && keyword && self.$util.trim(keyword) !== '') {
        self.searchresult1 = true
        params.params.keyword = keyword
      } else {
        self.searchresult1 = false
      }
      self.$http.get(`${ENV.BokaApi}/api/retailer/sellersList`, params).then(res => {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabdata1 = self.tabdata1.concat(retdata)
        self.distabdata1 = true
        if (self.isFirstLoad) {
          self.salesCount = self.tabdata1.length
          self.isFirstLoad = false
        }
      })
    },
    getData2 () {
      this.$vux.loading.show()
      const self = this
      const params = { pagestart: self.pagestart2, limit: self.limit }
      const keyword = self.searchword2
      if (typeof keyword !== 'undefined' && keyword && self.$util.trim(keyword) !== '') {
        self.searchresult2 = true
        params.keyword = keyword
      } else {
        self.searchresult2 = false
      }
      self.$http.post(`${ENV.BokaApi}/api/retailer/sellerRecommend`, params).then(res => {
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
      const params = { params: { pagestart: self.pagestart3, limit: self.limit } }
      self.$http.get(`${ENV.BokaApi}/api/accounting/list?from=retailer`, params).then(res => {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        self.tabdata3 = self.tabdata3.concat(retdata)
        self.distabdata3 = true
      })
    },
    onChange1 (val) {
      this.searchword1 = val
    },
    onSubmit1 () {
      const self = this
      self.$vux.loading.show()
      self.distabdata1 = false
      self.tabdata1 = []
      self.pagestart1 = 0
      self.getData1()
    },
    onCancel1 () {
      const self = this
      self.searchword1 = ''
      self.$vux.loading.show()
      self.distabdata1 = false
      self.tabdata1 = []
      self.pagestart1 = 0
      self.getData1()
    },
    onCancel2 () {
      const self = this
      self.searchword2 = ''
      self.$vux.loading.show()
      self.distabdata2 = false
      self.tabdata2 = []
      self.pagestart2 = 0
      self.getData2()
    },
    onChange2 (val) {
      this.searchword2 = val
    },
    onSubmit2 () {
      const self = this
      self.$vux.loading.show()
      self.distabdata2 = false
      self.tabdata2 = []
      self.pagestart2 = 0
      self.getData2()
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
    inviteevent (item, index) {
      const self = this
      if (self.loginUser.isretailer === 2 && self.salesCount >= 2) {
        self.openVip()
      } else if (self.loginUser.isretailer === 1 || self.salesCount < 2) {
        let content = `<div class="font14 v_middle">该客户是 <span class="color-orange v_middle">${item.uploadname}</span> 带来的，邀请成返点客后， <span class="color-orange v_middle">${item.uploadname}</span> 的收入可能受到影响，邀请成功后，返点客可在商品页面看到佣金金额，返点客购买以及带来客户购买后均可获得佣金奖励！确定邀请吗？</div>`
        if (item.uploader === self.loginUser.uid) {
          content = `邀请成功后，返点客可在商品页面看到佣金金额，返点客购买以及带来客户购买后均可获得佣金奖励！确定邀请吗？`
        }
        self.$vux.confirm.show({
          content: content,
          onConfirm: () => {
            self.$vux.loading.show()
            self.$http.post(`${ENV.BokaApi}/api/retailer/inviteSeller`, { inviteuid: item.uid }).then(res => {
              const data = res.data
              self.$vux.loading.hide()
              self.$vux.toast.show({
                text: data.error,
                time: self.$util.delay(data.error),
                onHide: () => {
                  if (data.flag === 1) {
                    self.salesCount++
                    self.tabdata2.splice(index, 1)
                    if (this.isFirst) {
                      this.showHb = true
                    }
                  }
                }
              })
            })
          }
        })
      }
    },
    init () {
      this.loginUser = User.get()
      this.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, {
        module: 'retailer', action: 'sales'
      })
    },
    initContainer () {
      const self = this
      self.showApply = false
      self.showContainer = false
    },
    refresh () {
      const self = this
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.$vux.loading.show()
      this.initData()
      this.loginUser = User.get()
      this.retailerInfo = this.loginUser.retailerinfo
      this.query = this.$route.query
      this.$http.get(`${ENV.BokaApi}/api/user/show`).then(res => {
        const data = res.data
        this.loginUser = data
        User.set(data)
        if (this.loginUser && (this.loginUser.subscribe !== 0 || this.loginUser.isretailer)) {
          self.initContainer()
          self.$vux.loading.hide()
          if (!self.loginUser.isretailer) {
            self.initContainer()
            self.showApply = true
          } else {
            self.initContainer()
            this.showContainer = true
            if (this.query.flag === '1' || this.query.flag === 1) {
              this.selectedIndex = 1
            } else if (this.query.flag === '2' || this.query.flag === 2) {
              this.selectedIndex = 2
            }
            document.title = this.retailerInfo.title
            this.swiperChange()
          }
          if (`${this.loginUser.retailerinfo.firstinfo.seller}` === '0' && this.query.from) {
            this.$http.get(`${ENV.BokaApi}/api/retailer/info`).then(res => {
              const data = res.data
              if (data.flag) {
                this.retailerInfo = data.data
                this.loginUser.retailerinfo = this.retailerInfo
                User.set(this.loginUser)
                if (`${this.retailerInfo.firstinfo.seller}` === '0' && this.query.from) {
                  this.isFirst = true
                  let finfo = FirstInfo.get()
                  if (!finfo) {
                    finfo = this.retailerInfo.firstinfo
                  }
                  if (`${finfo.seller}` === '0') {
                    this.showFirst = true
                    finfo.seller = 1
                  }
                  FirstInfo.set(finfo)
                }
              }
            })
          }
        }
      })
    }
  },
  created () {
    this.init()
  },
  activated () {
    this.refresh()
    this.$util.getSystemParams(() => {
      this.sysParams = SystemParams.get()
    })
    this.$util.miniPost()
  }
}
</script>

<style lang="less" >
.rsales .condition{
  position: relative;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #eeeeee;
}
.rsales .condition .active{
  color: #ea3a3a;
}
.rsales .h35{
  height: 35px;
  line-height: 35px;
}
.rsales .cut-off:after{
  content: "";
  position: absolute;
  top: 12px;
  height: 16px;
  width: 1px;
  background-color: #f5f5f5;
  margin-left: 14px;
  }
.rsales .cut-off:nth-last-child(1):after {
  display: none;
}
.rsales .weui-search-bar__box{
  background: #f0f0f0;
}
.rsales .weui-search-bar__box .weui-icon-search{
  line-height: 35px;
}
</style>
