<template>
  <div class="containerarea font14 havetoptab bg-page concession" :style="`height:${viewHeight == '100%' ? '100%' : viewHeight+'px'};`">
    <template v-if="showContainer">
      <div class="pagetop">
        <tab v-model="tabmodel" class="v-tab">
          <tab-item v-if="!tabdata1 || tabdata1.length == 0" :selected="true">创建活动</tab-item>
          <tab-item
            v-for="(item,index) in tabtxts"
            :selected="(query.from != 'miniprogram' && index == 0) || (query.from == 'miniprogram' && index == 1)"
            :key="index">{{item}}
          </tab-item>
        </tab>
      </div>
      <div class="s-container" style="top:44px">
        <swiper v-model="tabmodel" class="x-swiper no-indicator">
          <swiper-item v-for="(tabitem, index) in tabtxts" :key="index">
            <div v-if="index === 0" class="swiper-inner scroll-container1" ref="scrollContainer" @scroll="handleScroll">
              <div class="item-list" v-for="(item, index) in codeData" key="key" index="index">
                <div class="list">
                  <div class="math">54785874</div>
                  <div class="date">有效期至 2019年11月15日</div>
                </div>
                <div class="btncopy mt25 mr10">复制</div>
              </div>
              <div class="generate flex_center pl12 pr12 list-shadow02 bg-white">
                <div class="flex_center btn-bottom-red mt10 mb10" style="width:85%;" @click="btnshow">生成优惠码</div>
              </div>
              <div v-if="showModal" class="modal">
                <div class="txt1 pb10">生成优惠码</div>
                <div class="mt10">数量:<input type="number"/>个</div>
                <div class="font12 mt5 ml20"><span style="color:red;">*</span>每个优惠码100元，目前免费</div>
                <div class="bom mt25">
                  <div class="close" @click="btnclose">取消</div>
                  <div class="close" style="background-color:red;color:#fff;">立即生成</div>
                </div>
              </div>
              <div class="mceng" v-show="isShow"></div>
            </div>
            <template v-if="index == 1">
              <div class="list">
                <div class="math">54785874</div>
                <div class="date">有效期至 2019年11月15日</div>
              </div>
            </template>
          </swiper-item>
        </swiper>
      </div>
    </template>
  </div>
</template>

<script>
import { Tab, TabItem, Swiper, SwiperItem, TransferDom, Confirm, Popup, XImg } from 'vux'
import CreateActivity from '@/components/CreateActivity'
import Time from '#/time'
import ENV from 'env'
import { User, AdapterHeight } from '#/storage'
import Subscribe from '@/components/Subscribe'
import ApplyTip from '@/components/ApplyTip'

const limit = 10
let pageStart1 = 0
const aHeight = AdapterHeight.get()

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
      query: {},
      showApply: false,
      showContainer: false,
      retailerInfo: {},
      tabtxts: [ '有效码', '已使用' ],
      tabmodel: 0,
      tabdata1: [],
      isFirst: true,
      activityCount: 0,
      viewHeight: '100%', // '-52'
      popupBottom: '0',
      codeData: [{id: 1},{id: 2}],
      isShow: false,
      showModal: false
    }
  },
  watch: {
    tabdata1: function () {
      return this.tabdata1
    }
  },
  methods: {
    btnshow () {
      this.isShow = true
      this.showModal = true
    },
    btnclose() {
      this.isShow = false
      this.showModal = false
    },
    clickAdd (type) {
      if (this.loginUser.isretailer === 2 && this.activityCount >= 2) {
        this.openVip()
      } else {
        let queryParams = {type: type, from: this.query.from}
        if (this.query.minibackurl) {
          queryParams.minibackurl = this.query.minibackurl
        }
        this.$router.push({path: '/addActivity', query: queryParams})
      }
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
    handleScroll () {
      const self = this
      self.$util.scrollEvent({
        element: self.$refs.scrollContainer[0],
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
      let params = { params: { pagestart: pageStart1, limit: limit } }
      self.$http.get(`${ENV.BokaApi}/api/retailer/listActivity`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabdata1 = self.tabdata1.concat(retdata)
        self.showContainer = true
        if (self.isFirst) {
          self.activityCount = self.tabdata1.length
          self.isFirst = false
        }
      })
    },
    stopevent (item, index) {
      event.preventDefault()
      const self = this
      self.$vux.confirm.show({
        content: '确定要停止吗？',
        onConfirm () {
          self.$http.post(`${ENV.BokaApi}/api/retailer/stopActivity`, { id: item.id }).then(function (res) {
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
    getData () {
      const self = this
      this.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, {
        module: 'retailer', action: 'activitylist'
      }).then(function () {
        return self.$http.get(`${ENV.BokaApi}/api/retailer/info`)
      }).then(function (res) {
        const data = res.data
        self.retailerInfo = data.data ? data.data : data
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
      this.$vux.loading.show()
      this.loginUser = User.get()
      if (this.loginUser && (this.loginUser.subscribe === 1 || this.loginUser.isretailer)) {
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
          this.$vux.loading.hide()
          this.query = this.$route.query
          if (this.tabdata1.length < limit || this.query.from === 'add') {
            self.initContainer()
            pageStart1 = 0
            this.tabdata1 = []
            this.getData1()
          }
        }
        // }
      }
    }
  },
  created () {
    this.init()
  },
  activated () {
    let disHeight = document.body.clientHeight - aHeight
    this.viewHeight = `${disHeight}`
    this.popupBottom = aHeight ? `${aHeight}` : '0'
    this.refresh()
    this.$util.miniPost()
  }
}
</script>

<style lang="less" scoped>
.concession .ico{
  position:absolute;left:0;top:0;width:96px;height:25px;line-height:25px;
  background-color:#ff9f9f;color:#fff;text-align:center;font-size: 12px;
  -webkit-transform: translate(-40px,-2px) rotate(-45deg);
  transform: translate(-40px,-2px) rotate(-45deg);
}
.concession .finished.ico{background-color:#8a8a8a;}
.concession .finished.ico:after{content:"已结束";}
.concession .scroll_item{
  padding-top:10px;
  padding-bottom:10px;
  position:relative;
  overflow:hidden;
}
.concession .scroll_item .row{
  display: -webkit-box;
  position:relative;
}
.concession .x-toptab, .x-toptab.vux-tab-warp{
  height: 44px;
}
.concession .item-list{width:100%;display:flex;flex-direction:row;background-color:#fff;border-bottom:1px solid #e5e5e5;}
.concession .list{width:80%;padding:10px 10px;}
.concession .list .math{font-weight:bold;}
.concession .item-list .btncopy{
  background-color:red;color:#fff;width:60px;height:25px;text-align:center;line-height:25px;border-radius:20px;
}
.concession .swiper-inner .generate{position: absolute;left: 0;right: 0;bottom: 0;}
.concession .modal{
  width:70%;padding:15px 10px;border:1px solid #e5e5e5;margin:0 auto;background-color:#fff;text-align:center;
  position:relative;z-index:9999;
}
.concession .modal .txt1{text-align:center;border-bottom:1px solid #e5e5e5;}
.concession .modal input{width:150px;height:25px;border:1px solid #e5e5e5;border-radius:5px;margin-left:20px;margin-right:5px;}
.concession .modal .bom{display:flex;flex-direction:row;}
.concession .modal .close{width:100px;height:30px;background-color:#e5e5e5;text-align:center;line-height:30px;border-radius:10px;margin:0 auto;}

.concession .mceng{
  position:fixed;
  top:0;
  bottom:0;
  left:0;
  right:0;
  background-color: rgba(0, 0, 0, 0.6);
  overflow: hidden;
  z-index:0;
}
</style>
