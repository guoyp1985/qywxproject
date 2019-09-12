/*
* @description: 我的优惠券列表
* @auther: gyp
* @created_date: 2018-10-22
*/
<style lang="less" scoped>
.factory-help-page{
  .scroll_list{}
  .nodata{
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      display:flex !important;justify-content: center; align-items: center;
      color:#666666;
      padding:10px;
  }
  .scroll_item{
    width: 100%;position:relative;margin-top:20px;background-color:#fff;padding:10px 20px;
  }
  .scroll_item.grayitem{background-color: #999;}
  .scroll_item .txt{color:#fff;}
  .scroll_item.grayitem .txt{color:orange;}
  .txt-cell{position:relative;padding-top:15px;padding-bottom:15px;padding-left:10px;box-sizing: border-box;}
  .txt-cell:after{
    content:"";display:block;
    border-right:#fff 1px dashed;
  	position: absolute;right: 0;top: 0;bottom:0px;
  	-webkit-transform: scaleX(0.5) translateX(0.5px);
  	transform: scaleX(0.5) translateX(0.5px);
  	-webkit-transform-origin: 0% 0%;
  	transform-origin: 0% 0%;
  }
  .scroll_item .ball{
    position: absolute;
    right: -14px;
    width: 30px;
    height: 30px;
    background-color: #f5f9fa;
    border-radius: 50%;
  }
  .scroll_item .ball-up{top: -15px;}
  .scroll_item .ball-down{bottom: -15px;}
  .scroll_item .pic{width:50px;}
  .scroll_item .pic image{width:40px;height:40px;border-radius:50%;}
  .btn-cell{width:90px;padding-top:15px;padding-bottom:15px;box-sizing: border-box;}
  .btn-cell .al{font-size:40px;}
  .btn-cell .icon-chat{margin-top:4px;}
  .rbtn{display:inline-block;padding:5px;border-radius:5px;background-color: #fff;}
  .scroll_item .rtxt{flex:1;text-align:right;color:#ff6a61;}
}
</style>
<template>
  <div class="containerarea bg-page font14 factory-help-page">
    <div class="s-topbanner s-topbanner1">
      <div class="row">
        <tab v-model="selectedIndex" active-color="#ea3a3a" default-color="#666666">
          <tab-item v-for="(item,index) in tabtxts" :selected="index == selectedIndex" :key="index" @on-item-click="clickTab">{{item}}</tab-item>
        </tab>
      </div>
    </div>
    <div class="s-container s-container1">
      <div v-show="(selectedIndex == 0)" class="swiper-inner scroll-container1" ref="scrollContainer1" @scroll="handleScroll('scrollContainer1',0)">
        <template v-if="distabdata1">
          <div v-if="!tabdata1 || tabdata1.length === 0" class="w_100 h_100 flex_center color-gray">暂无数据</div>
          <div v-else class="scroll_list">
            <div v-for="(item,index1) in tabdata1" :key="index1" class="scroll_item flex_left">
              <div class="flex_left" style="width:70px;">
                <img :src="item.photo" style="width:60px;height:60px;object-fit:cover;" />
              </div>
              <div class="flex_cell txt-cell">
                <div class="clamp1 bold">{{item.title}}</div>
                <!-- <div class="clamp1 color-gray">{{item.summary}}</div> -->
              </div>
            </div>
          </div>
        </template>
      </div>
      <div v-show="(selectedIndex == 1)" class="swiper-inner">
        <div class="pt20 pb20 flex_center">
          <img style="width:65%;max-width:100%;" :src="KefuQrcode" />
        </div>
        <div class="flex_center">微信扫一扫，添加您的专属客服</div>
        <div class="flex_center mt10"><span>微信号: </span><span class="color-theme">{{KefuWxNo}}</span></div>
        <div class="flex_center mt10">温馨提示: 长按图片保存到相册微信扫一扫即可添加</div>
      </div>
    </div>
  </div>
</template>
<i18n>
Add order1:
  zh-CN: 返点客
My orders:
  zh-CN: 我的订单
</i18n>
<script>
import { Tab, TabItem, Swiper, SwiperItem, XTextarea, Group, XButton, TransferDom, Popup, XImg } from 'vux'
import Time from '#/time'
import ENV from 'env'
import { User } from '#/storage'
let self = {}
const limit = 10
let pageStart1 = 0
export default {
  directives: {
    TransferDom
  },
  components: {
    Tab, TabItem, Swiper, SwiperItem, XTextarea, Group, XButton, Popup, XImg
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      showApply: false,
      showContainer: false,
      query: {},
      loginUser: {},
      tabtxts: ['文章', '客服'],
      selectedIndex: 0,
      distabdata1: false,
      tabdata1: [],
      showpopup: false,
      deliveritem: null,
      deliverindex: 0,
      delivercompany: [],
      deliverdata: { delivercompany: '-1', delivercode: '' },
      KefuQrcode: ENV.KefuQrcode,
      KefuWxNo: ENV.KefuWxNo
    }
  },
  methods: {
    handleScroll (refname, index) {
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          switch (self.selectedIndex) {
            case 0:
              if (self.tabdata1.length === (pageStart1 + 1) * limit) {
                pageStart1++
                self.getData1()
              }
              break
            case 1:
              break
          }
        }
      })
    },
    clickTab (index) {
      this.swiperChange()
    },
    getData1 () {
      this.$vux.loading.show()
      const params = {pagestart: pageStart1, limit: limit}
      self.$http.post(`${ENV.BokaApi}/api/list/knowledge`, params).then(function (res) {
        const data = res.data
        self.$vux.loading.hide()
        const retdata = data.data ? data.data : data
        self.tabdata1 = self.tabdata1.concat(retdata)
        self.distabdata1 = true
      })
    },
    swiperChange (index) {
      const self = this
      if (index !== undefined) {
        this.selectedIndex = index
      }
      switch (this.selectedIndex) {
        case 0:
          if (this.tabdata1.length < limit) {
            pageStart1 = 0
            self.distabdata1 = false
            this.tabdata1 = []
            self.getData1()
          }
          break
        case 1:
          break
      }
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.$vux.loading.show()
      this.loginUser = User.get()
      this.query = this.$route.query
      this.swiperChange()
    }
  },
  activated () {
    self = this
    this.refresh()
    this.$util.miniPost()
  }
}
</script>
