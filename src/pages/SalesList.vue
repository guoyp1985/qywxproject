<template>
  <div class="containerarea font14 rsaleslist bg-white">
    <template v-if="showContainer">
      <div class="s-topbanner s-topbanner1">
        <div class="row">
          <div class="bg"></div>
          <div class="flex_center h_100 toprow">
            <div class="flex_cell font18 pl20">{{ viewuser.linkman }}</div>
          </div>
        </div>
      </div>
      <div class="s-container s-container1 scroll-container">
        <search
          class="x-search"
          v-model="searchword1"
          :auto-fixed="autofixed"
          @on-submit="onSubmit1"
          @on-change="onChange1"
          @on-cancel="onCancel1"
          ref="search">
        </search>
        <div v-if="distabdata1" class="scroll_list pl10 pr10">
          <div v-if="!tabdata1 || tabdata1.length === 0" class="scroll_item emptyitem flex_center">
            <template v-if="searchresult1">暂无搜索结果</template>
            <template v-else>暂无订单</template>
          </div>
          <router-link v-else v-for="item in tabdata1" :key="item.id" class="scroll_item padding10 db" :to="{path: '/retailerOrderDetail', query: {id: item.orderid}}">
            <div class="t-table">
              <div class="t-cell v_middle" style="width:50px;height:50px;">
                <img :src="item.photo" style="width:40px;height:40px;" />
              </div>
              <div class="t-cell v_middle">
                <div class="clamp1">{{ item.title }}</div>
                <div class="clamp1 color-gray font12">
                  <span class="v_middle">{{ item.dateline | dateformat }}</span>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </template>
  </div>
</template>

<i18n>
Goodeazy:
  zh-CN: 易采集
Create news:
  zh-CN: 创建文章
Control text:
  zh-CN: 操作
</i18n>

<script>
import { Tab, TabItem, Swiper, SwiperItem, Group, Search } from 'vux'
import Time from '#/time'
import ENV from 'env'

export default {
  components: {
    Tab, TabItem, Swiper, SwiperItem, Group, Search
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      showContainer: false,
      autofixed: false,
      query: Object,
      viewuser: Object,
      tabmodel: 0,
      distabdata1: false,
      tabdata1: [],
      searchword1: '',
      searchresult1: false,
      searchword2: '',
      searchresult2: false,
      limit: 20,
      pagestart1: 0,
      isBindScroll1: false,
      scrollArea1: null
    }
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
    getdata1 () {
      const self = this
      let params = { params: { uid: self.query.uid, buyonline: 1, pagestart: self.pagestart1, limit: self.limit } }
      let keyword = self.searchword1
      if (typeof keyword !== 'undefined' && keyword && self.$util.trim(keyword) !== '') {
        self.searchresult1 = true
        params.params.keyword = keyword
      } else {
        self.searchresult1 = false
      }
      self.$http.get(`${ENV.BokaApi}/api/user/salesList`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabdata1 = self.tabdata1.concat(retdata)
        self.distabdata1 = true
        if (!self.scrollArea1) {
          self.scrollArea1 = document.querySelector('.rsaleslist .scroll-container')
        }
        if (!self.isBindScroll1) {
          self.isBindScroll1 = true
          self.scrollArea1.removeEventListener('scroll', self.scroll1)
          self.scrollArea1.addEventListener('scroll', self.scroll1)
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
    }
  },
  created () {
    const self = this
    this.$store.commit('updateToggleTabbar', {toggleTarbar: true})
    self.query = self.$route.query
    self.$http.get(`${ENV.BokaApi}/api/retailer/customerView`,
      { params: { customeruid: self.query.uid } }
    ).then(function (res) {
      let data = res.data
      if (data) {
        self.viewuser = data.data ? data.data : data
        document.title = `${self.viewuser.linkman}`
      }
      self.showContainer = true
      self.getdata1()
    })
  }
}
</script>

<style lang="less" scoped>
.rnews .bk-listplate1 .iconcell{width:45px;}
.vux-popup-dialog .weui-cell__bd{text-align:center;}
.vux-popup-dialog .weui-cell__ft{display:none;}

</style>
