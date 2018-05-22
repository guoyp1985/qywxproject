<template>
  <div class="containerarea bg-page font14 bringcustomer">
    <div class="s-topbanner s-topbanner1 bg-white">
      <div class="row">
        <tab v-model="tabmodel" class="v-tab">
          <tab-item v-for="(item,index) in tabtxts" :selected="index == 0" :key="index">{{item}}</tab-item>
        </tab>
      </div>
    </div>
    <div class="s-container s-container1">
      <swiper v-model="tabmodel" class="x-swiper no-indicator" @on-index-change="swiperChange">
        <swiper-item :class="`swiperitem scroll-container${index}`" v-for="(tabitem, index) in tabtxts" :key="index">
          <div v-if="(index == 0)">
            <div v-if="distabdata1" class="scroll_list">
              <div v-if="!tabdata1 || tabdata1.length === 0" class="scroll_item padding10 color-gray align_center">
                <div><i class="al al-qiangkehu font60 pt20"></i></div>
                <div class="mt5">暂无数据</div>
              </div>
              <div v-else v-for="(item,index) in tabdata1" :key="item.id" class="scroll_item pt10 pb10 pl12 pr12 bg-white mb10 list-shadow">
                <div class="t-table">
                  <div class="t-cell v_middle w70">
                    <x-img class="avatarimg1 imgcover" :src="item.avatar" default-src="../src/assets/images/user.jpg" :offset="0" container=".scroll-container0"></x-img>
                  </div>
                  <div class="t-cell v_middle">
                    <div class="clamp1 font14 color-lightgray"><span v-if="item.priority" class="mr3"><i class="fa fa-arrow-circle-o-up color-orange" style="font-weight:bold;"></i></span><span :class="getDateClass(item.dateline)">{{ getDateState(item.dateline) }}</span>{{item.linkman}}</div>
                    <div class="clamp1 mt5 font14 color-gray">{{item.dateline | dateformat}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="(index == 1)">
            <div v-if="distabdata2" class="scroll_list ">
              <div v-if="!tabdata2 || tabdata2.length === 0" class="scroll_item padding10 color-gray align_center">
                <div><i class="al al-qiangkehu font60 pt20"></i></div>
                <div class="mt5">暂无购买客户</div>
              </div>
              <div v-else v-for="(item,index) in tabdata2" :key="item.id" class="scroll_item pt10 pb10 pl12 pr12 bg-white mb10 list-shadow">
                <div class="t-table">
                  <div class="t-cell v_middle w70">
                    <x-img class="avatarimg1 imgcover" :src="item.avatar" default-src="../src/assets/images/user.jpg" :offset="0" container=".scroll-container1"></x-img>
                  </div>
                  <div class="t-cell v_middle">
                    <div class="clamp1 font14 color-lightgray"><span v-if="item.priority" class="mr3"><i class="fa fa-arrow-circle-o-up color-orange" style="font-weight:bold;"></i></span><span :class="getDateClass(item.dateline)">{{ getDateState(item.dateline) }}</span>{{item.linkman}}</div>
                    <div class="clamp1 mt5 font14 color-gray">{{item.dateline | dateformat}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </swiper-item>
      </swiper>
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
import { Tab, TabItem, Swiper, SwiperItem, XImg } from 'vux'
import Time from '#/time'
import ENV from 'env'

export default {
  components: {
    Tab, TabItem, Swiper, SwiperItem, XImg
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      query: Object,
      tabtxts: [ '全部', '购买客户' ],
      tabmodel: 0,
      distabdata1: false,
      distabdata2: false,
      tabdata1: [],
      tabdata2: [],
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
    self.query = self.$route.query
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
      let params = { pagestart: self.pagestart1, limit: self.limit }
      if (self.query.wid) {
        params.wid = self.query.wid
      }
      self.$http.post(`${ENV.BokaApi}/api/seller/bringCustomer`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabdata1 = self.tabdata1.concat(retdata)
        self.distabdata1 = true
        if (!self.isBindScroll1) {
          let items = document.querySelectorAll('.bringcustomer .swiperitem')
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
      let params = { pagestart: self.pagestart2, limit: self.limit }
      if (self.query.wid) {
        params.wid = self.query.wid
      }
      self.$http.post(`${ENV.BokaApi}/api/seller/buyCustomer`, params).then(function (res) {
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
      }
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
</style>
