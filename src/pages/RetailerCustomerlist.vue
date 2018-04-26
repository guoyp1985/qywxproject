<template>
  <div class="containerarea bg-white font14 rcustomerlist">
    <div class="s-topbanner">
      <div class="row">
        <div class="bg"></div>
        <div class="flex_center h_100">
          <div class="flex_cell font18 pl20">{{$t('Contact customer')}}</div>
        </div>
      </div>
      <div class="row">
        <tab v-model="tabmodel" class="x-tab" active-color="#fff" default-color="#fff">
          <tab-item v-for="(item,index) in tabtxts" :selected="index == 0" :key="index" @on-item-click="tabclick">{{item}}</tab-item>
        </tab>
      </div>
    </div>
    <div class="s-container">
      <swiper v-model="tabmodel" class="x-swiper no-indicator">
        <swiper-item class="swiperitem" v-for="(tabitem, index) in tabtxts" :key="index">
          <div v-if="(index == 0)">
            <search
              class="x-search"
              :auto-fixed="autofixed"
              @on-submit="onSubmit1"
              @on-change="onChange1"
              ref="search">
            </search>
            <div class="font12 padding10 b_bottom">
              <div class="t-table w_100">
                <div class="t-cell align_left pl10">{{ $t('Customer text') }}(共{{ tabcount1 }}人)</div>
                <div class="t-cell align_right pr10">{{ $t('Percent') }}</div>
              </div>
            </div>
            <div class="scroll_list pl10 pr10">
              <div v-if="!tabdata1 || tabdata1.length === 0" class="scroll_item padding10 color-gray align_center">
                <template v-if="searchresult1">
                  <div class="flex_center" style="height:80px;">暂无搜索结果</div>
                </template>
                <template v-else>
                  <div><i class="al al-qiangkehu font60 pt20"></i></div>
                  <div class="mt5">好可怜，一个客户都没有~<br />赶快分享<router-link to="/store" class="color-blue">商品</router-link>或<router-link to="/retailerNews" class="color-blue">文章</router-link>给微信好友获得客户吧！</div>
                </template>
              </div>
              <div v-else v-for="(item,index) in tabdata1" :key="item.id" class="scroll_item pt10 pb10">
                <div class="t-table">
                  <router-link :to="{path: 'membersView', query: {uid: item.uid}}" class="t-cell v_middle w50">
                    <img :src="item.avatar" class="avatarimg1" />
                  </router-link>
                  <router-link :to="{path: 'membersView', query: {uid: item.uid}}" class="t-cell v_middle">
                    <div class="clamp1 font14">{{item.linkman}}</div>
                    <div class="clamp1 mt5 font12 color-gray">返点客户：{{item.uploadname}}</div>
                  </router-link>
                  <div class="t-cell v_middle w60 h_100 align_right">
                      <div class="percentarea db-in v_middle" @click="percentclick">
                        <div class="inner" :style="`width:${item.percent}%`"></div>
                        <div class="txt font12">{{ item.percent }}%</div>
                      </div>
                  </div>
                  <div class="t-cell v_middle w60 align_right">
                    <div class="qbtn bg-green color-white">联系</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="(index == 1)">
            <search
              class="x-search"
              :auto-fixed="autofixed"
              @on-submit="onSubmit2"
              @on-change="onChange2"
              ref="search">
            </search>
            <div class="font12 padding10 b_bottom">
              <div class="t-table w_100">
                <div class="t-cell align_left pl10">{{ $t('Customer text') }}(共{{ tabcount2 }}人)</div>
                <div class="t-cell align_right pr10">{{ $t('Contact customer') }}</div>
              </div>
            </div>
            <div class="scroll_list pl10 pr10">
              <div v-if="!tabdata2 || tabdata2.length === 0" class="scroll_item padding10 color-gray align_center">
                <template v-if="searchresult2">
                  <div class="flex_center" style="height:80px;">暂无搜索结果</div>
                </template>
                <template v-else>
                  <div><i class="al al-qiangkehu font60 pt20"></i></div>
                  <div class="mt5">好可怜，一个客户都没有~<br />赶快分享<router-link to="/store" class="color-blue">商品</router-link>或<router-link to="/retailerNews" class="color-blue">文章</router-link>给微信好友获得客户吧！</div>
                </template>
              </div>
              <div v-else v-for="(item,index) in tabdata2" :key="item.id" class="scroll_item pt10 pb10">
                <div class="t-table">
                  <router-link :to="{path: 'membersView', query: {uid: item.uid}}" class="t-cell v_middle w50">
                    <img :src="item.avatar" class="avatarimg1" />
                  </router-link>
                  <router-link :to="{path: 'membersView', query: {uid: item.uid}}" class="t-cell v_middle">
                    <div class="clamp1 font14">{{item.linkman}}</div>
                    <div class="clamp1 mt5 font12 color-gray">返点客户：{{item.uploadname}}</div>
                  </router-link>
                  <div class="t-cell v_middle w60 align_right">
                    <div class="qbtn bg-green color-white">联系</div>
                  </div>
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
                        <img class="v_middle" src="../assets/images/infor.png"/>
                        <div class="color-blue">什么是成交概率</div>
                      </div>
                      <div class="font12" >成交概率是系统自动根据客户查看文章等行为，自动计算出该客户的真正成为购买客户的可能性。数字越大,可能性越大,成交概率就越高。</div>
                    </div>
                    <div class="pro-push">
                      <div class="flex_left">
                        <img class="v_middle" src="../assets/images/infor.png"/>
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
import { Tab, TabItem, Swiper, SwiperItem, Search, Group, Popup, TransferDomDirective as TransferDom } from 'vux'
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
    Search,
    Group,
    Popup
  },
  data () {
    return {
      autofixed: false,
      tabtxts: [ '潜在客户', '成交客户' ],
      tabcount1: 0,
      tabcount2: 0,
      tabmodel: 0,
      tabdata1: [],
      tabdata2: [],
      isshowpopup: false,
      searchword1: '',
      searchword2: '',
      searchresult1: false,
      searchresult2: false,
      limit: 20,
      pagestart1: 0,
      pagestart2: 0,
      isBindScroll1: false,
      isBindScroll2: false,
      scrollArea1: null,
      scrollArea2: null
    }
  },
  created () {
    const self = this
    self.$store.commit('updateToggleTabbar', {toggleBar: false})
    self.$vux.loading.show()
    self.getdata1()
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
    scroll2: function () {
      const self = this
      self.$util.scrollEvent({
        element: self.scrollArea2,
        callback: function () {
          if (self.tabdata2.length === (self.pagestart2 + 1) * self.limit) {
            self.pagestart2++
            self.$vux.loading.show()
            self.getdata2()
          }
        }
      })
    },
    getdata1 () {
      const self = this
      let params = { params: { tolevel: -1, pagestart: self.pagestart1, limit: self.limit } }
      let keyword = self.searchword1
      if (typeof keyword !== 'undefined' && !self.$util.isNull(keyword)) {
        params.params.keyword = keyword
      }
      self.$http.get(`${ENV.BokaApi}/api/retailer/customerList`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        if (typeof keyword !== 'undefined' && !self.$util.isNull(keyword)) {
          self.searchresult1 = true
        } else {
          self.tabcount1 = data.count
          self.searchresult1 = false
        }
        let retdata = data.data ? data.data : data
        self.tabdata1 = self.tabdata1.concat(retdata)
        if (!self.isBindScroll1) {
          let items = document.querySelectorAll('.rcustomerlist .swiperitem')
          self.scrollArea1 = items[0]
          self.scrollArea2 = items[1]
          self.isBindScroll1 = true
          self.scrollArea1.removeEventListener('scroll', self.scroll1)
          self.scrollArea1.addEventListener('scroll', self.scroll1)
        }
      })
    },
    getdata2 () {
      const self = this
      let keyword = self.searchword2
      let params = { params: { tolevel: 5, pagestart: self.pagestart2, limit: self.limit } }
      if (typeof keyword !== 'undefined' && !self.$util.isNull(keyword)) {
        params.params.keyword = keyword
      }
      self.$http.get(`${ENV.BokaApi}/api/retailer/customerList`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        if (typeof keyword !== 'undefined' && !self.$util.isNull(keyword)) {
          self.searchresult2 = true
        } else {
          self.tabcount2 = data.count
          self.searchresult2 = false
        }
        let retdata = data.data ? data.data : data
        self.tabdata2 = self.tabdata2.concat(retdata)
        if (!self.isBindScroll2) {
          self.isBindScroll2 = true
          self.scrollArea2.removeEventListener('scroll', self.scroll2)
          self.scrollArea2.addEventListener('scroll', self.scroll2)
        }
      })
    },
    onChange1 (val) {
      this.searchword1 = val
    },
    onChange2 (val) {
      this.searchword2 = val
    },
    onSubmit1 () {
      const self = this
      self.$vux.loading.show()
      self.tabdata1 = []
      self.pagestart1 = 0
      self.getdata1()
    },
    onSubmit2 () {
      const self = this
      self.$vux.loading.show()
      self.tabdata2 = []
      self.pagestart2 = 0
      self.getdata2()
    },
    tabclick (index) {
      const self = this
      if (index === 0) {
        if (self.pagestart1 > 0) {
          self.$vux.loading.show()
          self.getdata1()
        }
      } else if (index === 1) {
        if (self.pagestart2 === 0 && !self.isBindScroll2) {
          self.$vux.loading.show()
          self.getdata2()
        }
      }
    },
    percentclick () {
      this.isshowpopup = true
    },
    closepopup () {
      this.isshowpopup = false
    }
  }
}
</script>

<style lang="less">
.percentlayer{z-index:10;position:absolute;left:0;right:0;bottom:0;top:0;}
.percentlayer .bg{position:absolute;left:0;right:0;bottom:0;top:0;background:rgba(0,0,0,0.6);}
.percentlayer .layerinner{
	width:80%;padding-bottom:100%;position:relative;
}
.percentlayer .layerinner .inner{
	z-index:10;position:absolute;left:0;top:0;right:0;bottom:0;
	padding:10px;box-sizing: border-box;
}
.percentlayer .probability{background:url(../assets/images/bgletter.png) center center no-repeat;background-size:85% 100%; margin: 0 auto;}
.percentlayer .pro-sucess{ width: 90%; margin: 0 auto; text-align: left; padding-left: 5px;  }
.percentlayer .pro-sucess p{margin-top: 1px;margin-bottom: 5px;}
.percentlayer .span1{vertical-align:middle;color:#1e98f9;}
.percentlayer .pro{width: 70%; margin: 0 auto; vertical-align:middle;  height: 60%; }
.percentlayer .pro-push{width: 90%; margin: 0 auto; text-align: left; padding-left: 5px;}

.percentlayer .encourade{width:80%;  color: #00a0e9;text-align: center;  position: absolute; left:10%; top: 85%; }
.percentlayer .pro-know{position: absolute;width:100%;text-align: center;bottom: -40px;}
.percentlayer .pro-know span{color:#fff;background:#00a0e9;padding: 5px 10px;border-radius: 5px;}
</style>
