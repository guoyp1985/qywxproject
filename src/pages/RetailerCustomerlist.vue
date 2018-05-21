<template>
  <div class="containerarea bg-page font14 rcustomerlist">
    <div class="s-topbanner bg-white">
      <div class="row">
        <tab v-model="tabmodel" class="" active-color="#ea3a3a" default-color="#666666">
          <tab-item v-for="(item,index) in tabtxts" :selected="index == 0" :key="index">{{item}}</tab-item>
        </tab>
      </div>
    </div>
    <div class="s-container">
      <swiper v-model="tabmodel" class="x-swiper no-indicator" @on-index-change="swiperChange">
        <swiper-item :class="`swiperitem scroll-container${index}`" v-for="(tabitem, index) in tabtxts" :key="index">
          <div v-if="(index == 0)">
            <search
              class="x-search bg-white"
              v-model='searchword1'
              :auto-fixed="autofixed"
              @on-submit="onSubmit1"
              @on-change="onChange1"
              @on-cancel="onCancel1"
              ref="search">
            </search>
            <!---->
            <div class="condition font14 pl12 pr12 bg-white border-box color-lightgray">
              <div class="t-table w_100">
                <div class="t-cell align_center active cut-off">时间<span class="font12 ml5">▼</span></div>
                <div class="t-cell align_center  cut-off">地域<span class="font12 ml5">▼</span></div>
                <div class="t-cell align_center cut-off">性别<span class="font12 ml5">▼</span></div>
              </div>
            </div>
            <!---->
            <div class="font13 pl12 pr12 b_bottom h35 list-shadow">
              <div class="t-table w_100">
                <div class="t-cell align_left ">{{ $t('Customer text') }}(共{{ tabcount1 }}人)</div>
                <div class="t-cell align_right" style="padding-right: 60px;">{{ $t('Percent') }}</div>
              </div>
            </div>
            <div v-if="distabdata1" class="scroll_list">
              <div v-if="!tabdata1 || tabdata1.length === 0" class="scroll_item padding10 color-gray align_center">
                <template v-if="searchresult1">
                  <div class="flex_center" style="height:80px;">暂无搜索结果</div>
                </template>
                <template v-else>
                  <div><i class="al al-qiangkehu font60 pt20"></i></div>
                  <div class="mt5">好可怜，一个客户都没有~<br />赶快分享<router-link to="/store" class="color-blue">商品</router-link>或<router-link to="/retailerNews" class="color-blue">文章</router-link>给微信好友获得客户吧！</div>
                </template>
              </div>
              <div v-else v-for="(item,index) in tabdata1" :key="item.id" class="scroll_item pt10 pb10 pl12 pr12 bg-white mb10 list-shadow">
                <div class="t-table">
                  <router-link :to="{path: 'membersView', query: {uid: item.uid}}" class="t-cell v_middle w70">
                    <x-img class="avatarimg1 imgcover" :src="item.avatar" default-src="../src/assets/images/user.jpg" :offset="0" container=".scroll-container0"></x-img>
                  </router-link>
                  <router-link :to="{path: 'membersView', query: {uid: item.uid}}" class="t-cell v_middle">
                    <div class="clamp1 font14 color-lightgray"><span v-if="item.priority" class="mr3"><i class="fa fa-arrow-circle-o-up color-orange" style="font-weight:bold;"></i></span><span :class="getDateClass(item.dateline)">{{ getDateState(item.dateline) }}</span>{{item.linkman}}</div>
                    <div class="clamp1 mt5 font14 color-gray">返点客：{{item.uploadname}}</div>
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
          <div v-if="(index == 1)">
            <search
              class="x-search bg-white"
              v-model='searchword3'
              :auto-fixed="autofixed"
              @on-submit="onSubmit3"
              @on-change="onChange3"
              @on-cancel="onCancel3"
              ref="search">
            </search>
            <div class="font12 padding10 b_bottom color-lightgray">
              <div class="t-table w_100">
                <div class="t-cell align_left pl10">{{ $t('Customer text') }}(共{{ tabcount3 }}人)</div>
                <div class="t-cell align_center w80">{{ $t('Degree of intention') }}</div>
                <div class="t-cell align_center w60">{{ $t('Contact customer') }}</div>
              </div>
            </div>
            <div v-if="distabdata3" class="scroll_list ">
              <div v-if="!tabdata3 || tabdata3.length === 0" class="scroll_item padding10 color-gray align_center">
                <template v-if="searchresult3">
                  <div class="flex_center" style="height:80px;">暂无搜索结果</div>
                </template>
                <template v-else>
                  <div><i class="al al-qiangkehu font60 pt20"></i></div>
                  <div class="mt5">暂无意向客户，可到用户资料里设置客户意向程序</div>
                </template>
              </div>
              <div v-else v-for="(item,index) in tabdata3" :key="item.id" class="scroll_item pt10 pb10 pl12 pr12 bg-white mb10 list-shadow">
                <div class="t-table">
                  <router-link :to="{path: 'membersView', query: {uid: item.uid}}" class="t-cell v_middle w70">
                    <x-img class="avatarimg1 imgcover" :src="item.avatar" default-src="../src/assets/images/user.jpg" :offset="0" container=".scroll-container1"></x-img>
                  </router-link>
                  <router-link :to="{path: 'membersView', query: {uid: item.uid}}" class="t-cell v_middle">
                    <div class="clamp1 font14 color-lightgray"><span v-if="item.priority" class="mr3"><i class="fa fa-arrow-circle-o-up color-orange" style="font-weight:bold;"></i></span><span :class="getDateClass(item.dateline)">{{ getDateState(item.dateline) }}</span>{{item.linkman}}</div>
                    <div class="clamp1 mt5 font14 color-gray">返点客: {{item.uploadname}}</div>
                  </router-link>
                  <div class="t-cell v_middle w80 align_center color-orange">{{item.intentiondesc}}</div>
                  <router-link :to="{path: '/chat', query: {uid: item.uid}}" class="t-cell v_middle w60 align_right">
                    <div class="qbtn bg-red color-white">联系</div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div v-if="(index == 2)">
            <search
              class="x-search bg-white"
              v-model='searchword2'
              :auto-fixed="autofixed"
              @on-submit="onSubmit2"
              @on-change="onChange2"
              @on-cancel="onCancel2"
              ref="search">
            </search>
            <div class="font12 padding10 b_bottom color-lightgray">
              <div class="t-table w_100">
                <div class="t-cell align_left pl10">{{ $t('Customer text') }}(共{{ tabcount2 }}人)</div>
                <div class="t-cell align_right pr10">{{ $t('Contact customer') }}</div>
              </div>
            </div>
            <div v-if="distabdata2" class="scroll_list">
              <div v-if="!tabdata2 || tabdata2.length === 0" class="scroll_item padding10 color-gray align_center">
                <template v-if="searchresult2">
                  <div class="flex_center" style="height:80px;">暂无搜索结果</div>
                </template>
                <template v-else>
                  <div><i class="al al-qiangkehu font60 pt20"></i></div>
                  <div class="mt5">好可怜，一个客户都没有~<br />赶快分享<router-link to="/store" class="color-blue">商品</router-link>或<router-link to="/retailerNews" class="color-blue">文章</router-link>给微信好友获得客户吧！</div>
                </template>
              </div>
              <div v-else v-for="(item,index) in tabdata2" :key="item.id" class="scroll_item pt10 pb10 pl12 pr12 bg-white mb10 list-shadow">
                <div class="t-table">
                  <router-link :to="{path: 'membersView', query: {uid: item.uid}}" class="t-cell v_middle w70">
                    <x-img class="avatarimg1 imgcover" :src="item.avatar" default-src="../src/assets/images/user.jpg" :offset="0" container=".scroll-container2"></x-img>
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
import { Tab, TabItem, Swiper, SwiperItem, Search, Group, Popup, TransferDom, XImg } from 'vux'
import ENV from 'env'

export default {
  directives: {
    TransferDom
  },
  components: {
    Tab, TabItem, Swiper, SwiperItem, Search, Group, Popup, XImg
  },
  data () {
    return {
      autofixed: false,
      tabtxts: [ '潜在客户', '意向客户', '成交客户' ],
      tabcount1: 0,
      tabcount2: 0,
      tabcount3: 0,
      tabmodel: 0,
      distabdata1: false,
      distabdata2: false,
      distabdata3: false,
      tabdata1: [],
      tabdata2: [],
      tabdata3: [],
      isshowpopup: false,
      searchword1: '',
      searchword2: '',
      searchword3: '',
      searchresult1: false,
      searchresult2: false,
      searchresult3: false,
      limit: 20,
      pagestart1: 0,
      pagestart2: 0,
      pagestart3: 0,
      isBindScroll1: false,
      isBindScroll2: false,
      isBindScroll3: false,
      scrollArea1: null,
      scrollArea2: null,
      scrollArea3: null
    }
  },
  created () {
    const self = this
    self.$store.commit('updateToggleTabbar', {toggleBar: false})
    self.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, {
      module: 'retailer', action: 'customerlist'
    })
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
    scroll3: function () {
      const self = this
      self.$util.scrollEvent({
        element: self.scrollArea3,
        callback: function () {
          if (self.tabdata3.length === (self.pagestart32 + 1) * self.limit) {
            self.pagestart2++
            self.$vux.loading.show()
            self.getdata3()
          }
        }
      })
    },
    getdata1 () {
      const self = this
      let params = { params: { tolevel: -1, pagestart: self.pagestart1, limit: self.limit } }
      let keyword = self.searchword1
      if (typeof keyword !== 'undefined' && keyword && self.$util.trim(keyword) !== '') {
        self.searchresult1 = true
        params.params.keyword = keyword
      } else {
        self.searchresult1 = false
      }
      self.$http.get(`${ENV.BokaApi}/api/retailer/customerList`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        self.tabcount1 = data.count
        let retdata = data.data ? data.data : data
        self.tabdata1 = self.tabdata1.concat(retdata)
        self.distabdata1 = true
        if (!self.isBindScroll1) {
          let items = document.querySelectorAll('.rcustomerlist .swiperitem')
          self.scrollArea1 = items[0]
          self.scrollArea3 = items[1]
          self.scrollArea2 = items[2]
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
      if (typeof keyword !== 'undefined' && keyword && self.$util.trim(keyword) !== '') {
        self.searchresult2 = true
        params.params.keyword = keyword
      } else {
        self.searchresult2 = false
      }
      self.$http.get(`${ENV.BokaApi}/api/retailer/customerList`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        self.tabcount2 = data.count
        let retdata = data.data ? data.data : data
        self.tabdata2 = self.tabdata2.concat(retdata)
        self.distabdata2 = true
        if (!self.isBindScroll2) {
          self.isBindScroll2 = true
          self.scrollArea2.removeEventListener('scroll', self.scroll2)
          self.scrollArea2.addEventListener('scroll', self.scroll2)
        }
      })
    },
    getdata3 () {
      const self = this
      let keyword = self.searchword3
      let params = { params: { tolevel: 100, pagestart: self.pagestart3, limit: self.limit } }
      if (typeof keyword !== 'undefined' && keyword && self.$util.trim(keyword) !== '') {
        self.searchresult3 = true
        params.params.keyword = keyword
      } else {
        self.searchresult3 = false
      }
      self.$http.get(`${ENV.BokaApi}/api/retailer/customerList`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        self.tabcount3 = data.count
        let retdata = data.data ? data.data : data
        self.tabdata3 = self.tabdata3.concat(retdata)
        self.distabdata3 = true
        if (!self.isBindScroll3) {
          self.isBindScroll3 = true
          self.scrollArea3.removeEventListener('scroll', self.scroll3)
          self.scrollArea3.addEventListener('scroll', self.scroll3)
        }
      })
    },
    onChange1 (val) {
      this.searchword1 = val
    },
    onChange2 (val) {
      this.searchword2 = val
    },
    onChange3 (val) {
      this.searchword3 = val
    },
    onCancel1 () {
      const self = this
      self.searchword1 = ''
      console.log('in cancel1')
      self.$vux.loading.show()
      self.distabdata1 = false
      self.tabdata1 = []
      self.pagestart1 = 0
      self.getdata1()
    },
    onCancel2 () {
      const self = this
      self.searchword2 = ''
      self.$vux.loading.show()
      self.distabdata2 = false
      self.tabdata2 = []
      self.pagestart2 = 0
      self.getdata2()
    },
    onCancel3 () {
      const self = this
      self.searchword3 = ''
      self.$vux.loading.show()
      self.distabdata3 = false
      self.tabdata3 = []
      self.pagestart3 = 0
      self.getdata3()
    },
    onSubmit1 () {
      const self = this
      self.$vux.loading.show()
      self.distabdata1 = false
      self.tabdata1 = []
      self.pagestart1 = 0
      self.getdata1()
    },
    onSubmit2 () {
      const self = this
      self.$vux.loading.show()
      self.distabdata2 = false
      self.tabdata2 = []
      self.pagestart2 = 0
      self.getdata2()
    },
    onSubmit3 () {
      const self = this
      self.$vux.loading.show()
      self.distabdata3 = false
      self.tabdata3 = []
      self.pagestart3 = 0
      self.getdata3()
    },
    swiperChange (index) {
      const self = this
      if (index === 0) {
        if (self.tabdata1.length === 0) {
          self.$vux.loading.show()
          self.getdata1()
        }
      } else if (index === 1) {
        if (self.pagestart3 === 0 && !self.isBindScroll3) {
          self.$vux.loading.show()
          self.getdata3()
        }
      } else if (index === 2) {
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
    },
    getDateState: function (dt) {
      return this.$util.getDateState(dt)
    },
    getDateClass: function (dt) {
      let ret = this.$util.getDateClass(dt)
      ret = `${ret} mr5`
      return ret
    }
  }
}
</script>

<style lang="less" >
.rcustomerlist .s-topbanner{
  background: #fff;
  height: 44px;
}
.rcustomerlist .s-container{
  top:44px;
}
.rcustomerlist .vux-tab {
    height: 44px;
}
.rcustomerlist .vux-tab .vux-tab-item{
  line-height: 44px;
}
.rcustomerlist .x-tab .vux-tab-selected:before{
  content: "";
  position: absolute;
  border-bottom: 3px solid #ea3a3a;
  bottom: 0;
  left: 0;
  width:100%;
}
.rcustomerlist .weui-search-bar{
  padding: 10px 12px;
  height: 55px;
}
.rcustomerlist .weui-search-bar__label{
  background: #f0f0f0;
  border-radius: 5px;
  height: 35px;
  }
.rcustomerlist .weui-search-bar__form:after{
  border: none;
   border-radius: 5px;
}
.rcustomerlist .weui-icon-search,.weui-search-bar__label{
  color: #999999 !important;
}
.rcustomerlist .weui-search-bar__form {
    height: 35px;
    line-height: 35px;
    background-color: #ff3b30;
    border-radius: 5px;
}
.rcustomerlist .weui-search-bar__label span {
   vertical-align: initial;
}
.rcustomerlist .condition{
  position: relative;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #eeeeee;
}
.rcustomerlist .condition .active{
  color: #ea3a3a;
}
.rcustomerlist .h35{
  height: 35px;
  line-height: 35px;
}
.rcustomerlist .avatarimg1{
  width: 60px;
  height: 60px;
}
.rcustomerlist .percentarea .inner{
  width: 53px;
  height: 24px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  background: #ee9f25;
}
.rcustomerlist .percentarea{
  width: 53px;
  height: 24px;
  border-radius: 50px;
  background: #f6d6a5;
}
.rcustomerlist .percentarea .txt{
  line-height: 24px;
}
.rcustomerlist .cut-off:after{
  content: "";
  position: absolute;
  top: 12px;
  height: 16px;
  width: 1px;
  background-color: #f5f5f5;
  margin-left: 14px;
  }
.rcustomerlist .cut-off:nth-last-child(1):after {
  display: none;
}
.rcustomerlist .weui-search-bar__box{
  background: #f0f0f0;
}
.rcustomerlist .weui-search-bar__box .weui-icon-search{
  line-height: 35px;
}
</style>
