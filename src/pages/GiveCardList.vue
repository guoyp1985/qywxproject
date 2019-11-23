<template>
  <div id="giveCardList-page" class="containerarea font14 giveCardList" style="backgroundColor:white;">
    <div class="s-container s-container1" ref="scrollContainer" @scroll="handleScroll('scrollContainer')">
      <!-- 正在发放的优惠券 -->
      <template v-if="disList1">
          <div v-if="!tabData1 || !tabData1.length" class="scroll_item padding10 align_center color-gray">
            <div><i class="al al-wushuju font60 pt20"></i></div>
            <div class="mt5">暂无发放优惠券！</div>
          </div>
          <div v-else class="scroll_list">
            <div class="lists" v-for="(item,index) in tabData1" :key="index">
              <div class="list-item">
                <div class="pic">
                  <img :src="item.avatar" />
                </div>
                <div class="flex_cell">
                  <div class="font16 mb5 clamp1 color-orange">满{{item.ordermoney}}减{{item.money}}</div>
                  <div class="font12 w_100 flex_left">
                    <span class="w40">仅限【</span>
                    <span class="clamp1" :class="{'w120' : item.producttitle.length >= 10}">{{item.producttitle}}</span>
                    <span class="w40">】使用</span>
                  </div>
                  <div class="font14 mb5 clamp1">领取人: {{item.linkman}}</div>
                  <div class="font12 color-gray">领取时间: {{item.dateline_str}}</div>
                </div>
                <div class="btn-cell flex_center" v-if="item.used">
                  <div class="rbtn bg-gray02 color-white">已使用</div>
                </div>
                <div class="btn-cell flex_center" v-else-if="!item.validate">
                  <div class="rbtn bg-gray02 color-white">已过期</div>
                </div>
              </div>
            </div>
          </div>
        </template>
    </div>
    <div class="s-bottom border-box flex_center color-white list-shadow02">
      <div class="flex_center flex_cell h_100" style="background-color:#ea3a3a;"  @click="saveevent()">生成专属优惠券</div>
    </div>
  </div>
</template>
<script>
// import jQuery from 'jquery'
import ENV from 'env'
import Time from '#/time'
import {Tab, TabItem, Popup, TransferDom, Confirm} from 'vux'
import {User} from '#/storage'

export default {
  directives: {
    TransferDom
  },
  components: {
    Tab, TabItem, Popup, Confirm
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      tabData1: [],
      pageStart1: 0,
      disList1: false,
      limit: 10,
      loginUser: {},
      clickdata: {},
      clickindex: 0,
      showpopup1: false,
      Fid: 0
    }
  },
  methods: {
    initData () {
      this.tabData1 = []
      this.pageStart1 = 0
      this.disList1 = false
      this.limit = 10
      this.loginUser = {}
      this.clickdata = {}
      this.clickindex = 0
      this.showpopup1 = false
      this.Fid = 0
    },
    handleScroll: function (refname) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          if (self.tabData1.length === (self.pageStart1 + 1) * self.limit) {
            console.log('进入了滚动事件')
            self.pageStart1++
            self.getData1()
          }
        }
      })
    },
    getData1 (isone) {
      // 获取正在发放优惠券数据
      this.$vux.loading.show()
      const self = this
      let params = {type: 'givefactorycard', pagestart: self.pageStart1, limit: self.limit, fid: self.loginUser.fid}
      if (isone) {
        params.pagestart = this.tabData1.length
        params.limit = 1
      }
      self.$http.post(`${ENV.BokaApi}/api/card/factoryCardList`,
        params
      ).then(function (res) {
        const data = res.data
        self.$vux.loading.hide()
        const retdata = data.data ? data.data : data
        self.tabData1 = self.tabData1.concat(retdata)
        self.disList1 = true
        console.log('----response-----')
        console.log(self.tabData1)
      })
    },
    saveevent () {
      let rparams = this.$util.handleAppParams(this.query, {fid: this.Fid})
      this.$router.push({path: '/addCard', query: rparams})
    }
  },
  created () {
  },
  activated () {
    this.initData()
    this.loginUser = User.get()
    this.Fid = this.loginUser.fid
    this.query = this.$route.query
    if (this.query.fid) {
      this.Fid = this.query.fid
      this.getData1()
    }
    if (this.query.refresh) {
      this.disList1 = false
      this.tabData1 = []
      this.pageStart1 = 0
    }
  }
}
</script>
<style lang="less">
.giveCardList{
  .s-container1{top: 0 !important;bottom:45px !important;}
  .lists{padding:0px 10px;}
  .list-item{width: 100%;background-color: #fff;position:relative;
  padding: 10px;box-sizing: border-box;box-sizing: border-box;
  display: flex;justify-content: center;align-items: center;}
  .list-item:after{
    content: "";
    display: block;
    background-color: #ddd;
    height: 1px;
    overflow: hidden;
    position: absolute;
    left: -10px;
    right: -10px;
    bottom: 0;
    -webkit-transform: scaleY(0.5) translateY(0.5px);
    transform: scaleY(0.5) translateY(0.5px);
    -webkit-transform-origin: 0% 0%;
    transform-origin: 0% 0%;
  }
  .pic{
    width:50px;
    img{width:40px;height:40px;border-radius:50%;}
  }
  .btn-cell{width:180rpx;padding-top:30rpx;padding-bottom:30rpx;box-sizing: border-box;}
  .rbtn{display:inline-block;padding:10rpx;border-radius:10rpx;background-color: #fff;}
  .w120{width:120px;}
}
</style>
