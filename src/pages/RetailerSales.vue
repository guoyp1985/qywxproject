<template>
  <div class="containerarea  bg-page  fong14 rsales">
    <div class="s-topbanner">      
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
              v-model="searchword1"
              :auto-fixed="autofixed"
              @on-submit="onSubmit1"
              @on-change="onChange1"
              @on-cancel="onCancel1"
              ref="search">
            </search>
            <div v-if="distabdata1" class="scroll_list">
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
                  <router-link :to="{ path: '/retailerSaleview', query: { uid: item.uid } }" class="t-cell v_middle" style="width:70px;">
                    <x-img class="avatarimg1 imgcover v_middle" :src="item.avatar" default-src="../src/assets/images/user.jpg" :offset="0" container=".scroll-container0"></x-img>
                  </router-link>
                  <router-link :to="{ path: '/retailerSaleview', query: { uid: item.uid } }" class="t-cell v_middle">
                    <div class="clamp1 font14 color-lightgray">{{item.username}}({{item.linkman}})</div>
                    <div class="clamp1 mt5 font14 color-gray">带来消费: ￥{{item.sales}}</div>
                  </router-link>
                  <router-link :to="{path: '/chat', query: {uid: item.uid}}" class="t-cell w60 align_right v_middle">
                    <div class="qbtn bg-red color-white">联系</div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div v-if="(index == 1)">
            <search
              class="x-search  bg-white"
              v-model="searchword2"
              :auto-fixed="autofixed"
              @on-submit="onSubmit2"
              @on-change="onChange2"
              @on-cancel="onCancel2"
              ref="search">
            </search>
            <div v-if="distabdata2" class="scroll_list ">
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
                  <router-link :to="{ path: '/membersView', query: { uid: item.uid } }" class="t-cell v_middle " style="width: 70px;">
                    <x-img class="avatarimg1 imgcover v_middle" :src="item.avatar" default-src="../src/assets/images/user.jpg" :offset="0" container=".scroll-container1"></x-img>
                  </router-link>
                  <router-link :to="{ path: '/membersView', query: { uid: item.uid } }" class="t-cell v_middle">
                    <div class="clamp1 font14 color-lightgray">{{item.linkman}}</div>
                    <div class="clamp1 mt5 font14 color-gray">返点客: {{item.uploadname}}</div>
                    <div class="clamp1 font14 color-gray">成为客户时间: {{ item.dateline | dateformat }}</div>
                  </router-link>
                  <div class="t-cell v_middle align_right w60">
                    <div class="qbtn bg-red color-white" @click="inviteevent(item,index1)">邀请</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="(index == 2)">
          <div v-if="distabdata3" class="scroll_list cols-2">
            <div v-if="!tabdata3 || tabdata3.length == 0" class="scroll_item color-gray padding10 align_center">
              <div><i class="al al-wushuju font60 pt20"></i></div>
              <div class="mt5">暂无返点记录，返点客帮你带来消费后，系统即可自动返点并记录！</div>
            </div>
            <router-link :to="{ path: '/accountDetail', query: { id: item.id } }" v-else class="scroll_item db pt10 pb10 pl12 pr12 bg-white mt10 list-shadow" v-for="(item,index1) in tabdata3" :key="item.id">
              <div class="t-table">
                <div class="t-cell v_middle" style="width:70px;">
                  <x-img class="avatarimg1 imgcover v_middle" :src="item.avatar" default-src="../src/assets/images/user.jpg" :offset="0" container=".scroll-container2"></x-img>
                </div>
                <div class="t-cell v_middle">
                  <div class="clamp1 font14 color-lightgray">{{item.linkman}}</div>
                  <div class="clamp1 mt5 font14 color-gray">返点金额: ￥{{item.money}}</div>
                  <div class="clamp1 font14 color-gray">返点时间: {{ item.dateline | dateformat }} </div>
                </div>
              </div>
            </router-link>
          </div>
          </div>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>

<i18n>
</i18n>

<script>
import { Tab, TabItem, Swiper, SwiperItem, Search, XTextarea, Group, XImg } from 'vux'
import Time from '#/time'
import ENV from 'env'

export default {
  components: {
    Tab, TabItem, Swiper, SwiperItem, Search, XTextarea, Group, XImg
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      autofixed: false,
      tabtxts: [ '返点客', '邀请返点客', '返点记录' ],
      tabmodel: 0,
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
      module: 'retailer', action: 'sales'
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
          if (self.tabdata3.length === (self.pagestart3 + 1) * self.limit) {
            self.pagestart3++
            self.$vux.loading.show()
            self.getdata3()
          }
        }
      })
    },
    getdata1 () {
      const self = this
      let params = { params: { pagestart: self.pagestart1, limit: self.limit } }
      let keyword = self.searchword1
      if (typeof keyword !== 'undefined' && keyword && self.$util.trim(keyword) !== '') {
        self.searchresult1 = true
        params.params.keyword = keyword
      } else {
        self.searchresult1 = false
      }
      self.$http.get(`${ENV.BokaApi}/api/retailer/sellersList`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabdata1 = self.tabdata1.concat(retdata)
        self.distabdata1 = true
        if (!self.isBindScroll1) {
          let items = document.querySelectorAll('.rsales .swiperitem')
          self.scrollArea1 = items[0]
          self.scrollArea2 = items[1]
          self.scrollArea3 = items[2]
          self.isBindScroll1 = true
          self.scrollArea1.removeEventListener('scroll', self.scroll1)
          self.scrollArea1.addEventListener('scroll', self.scroll1)
        }
      })
    },
    getdata2 () {
      const self = this
      let params = { pagestart: self.pagestart2, limit: self.limit }
      let keyword = self.searchword2
      if (typeof keyword !== 'undefined' && keyword && self.$util.trim(keyword) !== '') {
        self.searchresult2 = true
        params.keyword = keyword
      } else {
        self.searchresult2 = false
      }
      self.$http.post(`${ENV.BokaApi}/api/retailer/sellerRecommend`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
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
      let params = { params: { pagestart: self.pagestart3, limit: self.limit } }
      self.$http.get(`${ENV.BokaApi}/api/accounting/list?from=retailer`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
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
    onSubmit1 () {
      const self = this
      self.$vux.loading.show()
      self.distabdata1 = false
      self.tabdata1 = []
      self.pagestart1 = 0
      self.getdata1()
    },
    onCancel1 () {
      const self = this
      self.searchword1 = ''
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
    onChange2 (val) {
      this.searchword2 = val
    },
    onSubmit2 () {
      const self = this
      self.$vux.loading.show()
      self.distabdata2 = false
      self.tabdata2 = []
      self.pagestart2 = 0
      self.getdata2()
    },
    swiperChange (index) {
      const self = this
      if (index === 0) {
        if (self.tabdata1.length === 0) {
          self.$vux.loading.show()
          self.getdata1()
        }
      } else if (index === 1) {
        if (self.pagestart2 === 0 && !self.isBindScroll2) {
          self.$vux.loading.show()
          self.getdata2()
        }
      } else if (index === 2) {
        if (self.pagestart3 === 0 && !self.isBindScroll3) {
          self.$vux.loading.show()
          self.getdata3()
        }
      }
    },
    inviteevent (item, index) {
      const self = this
      let content = `<div class="font14 v_middle">该客户是 <span class="color-orange v_middle">${item.uploadname}</span> 带来的，邀请成返点客后， <span class="color-orange v_middle">${item.uploadname}</span> 的收入可能受到影响，邀请成功后，返点客可在商品页面看到佣金金额，返点客购买以及带来客户购买后均可获得佣金奖励！确定邀请吗？</div>`
      self.$vux.confirm.show({
        content: content,
        onConfirm () {
          self.$vux.loading.show()
          self.$http.post(`${ENV.BokaApi}/api/retailer/inviteSeller`,
            { inviteuid: item.uid }
          ).then(function (res) {
            let data = res.data
            self.$vux.loading.hide()
            self.$vux.toast.show({
              text: data.error,
              time: self.$util.delay(data.error),
              onHide: function () {
                if (data.flag === 1) {
                  self.tabdata2.splice(index, 1)
                }
              }
            })
          })
        }
      })
    }
  }
}
</script>

<style lang="less" >
.s-topbanner{
  background: #fff;
  height: 44px;
}
.rsales .s-container{
  top:44px;
}
.rsales .vux-tab {
    height: 44px;
}
.rsales .vux-tab .vux-tab-item{
  line-height: 44px;
}
.rsales .x-tab .vux-tab-selected:before{
  content: "";
  position: absolute;
  border-bottom: 3px solid #ea3a3a;
  bottom: 0;
  left: 0;
  width:100%;
}
.rsales .weui-search-bar{
  padding: 10px 12px;
  height: 55px;
}
.rsales .weui-search-bar__label{
  background: #f0f0f0;
  border-radius: 5px;
  height: 35px;
  }
.rsales .weui-search-bar__form:after{
  border: none;
   border-radius: 5px;
}
.rsales .weui-icon-search,.weui-search-bar__label{
  color: #999999 !important;
}
.rsales .weui-search-bar__form {
    height: 35px;
    line-height: 35px;
    background-color: #ff3b30;
    border-radius: 5px;
}
.rsales .weui-search-bar__label span {
   vertical-align: initial;
}
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
.rsales .avatarimg1{
  width: 60px;
  height: 60px;
}
.rsales .percentarea .inner{
  width: 53px;
  height: 24px;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  background: #ee9f25;
}
.rsales .percentarea{
  width: 53px;
  height: 24px;
  border-radius: 50px;
  background: #f6d6a5;
}
.rsales .percentarea .txt{
  line-height: 24px;
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
