<template>
  <div class="containerarea font14 rsaleslist bg-white">
    <div class="s-topbanner">
      <div class="row">
        <div class="bg"></div>
        <div class="flex_center h_100 toprow">
          <div class="flex_cell font18 pl20">{{ viewuser.linkman }}</div>
        </div>
      </div>
      <div class="row">
        <tab v-model="tabmodel" class="x-tab" active-color="#fff" default-color="#fff">
          <tab-item v-for="(item,index) in tabtxts" :selected="index == 0" :key="index" @on-item-click="tabitemclick">{{item}}</tab-item>
        </tab>
      </div>
    </div>
    <div class="s-container">
      <swiper v-model="tabmodel" class="x-swiper no-indicator">
        <swiper-item class="swiperitem" v-for="(tabitem, index) in tabtxts" :key="index">
          <template v-if="(index == 0)">
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
                <template v-else>暂无线上数据</template>
              </div>
              <div v-else v-for="item in tabdata1" :key="item.id" class="scroll_item padding10">
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
              </div>
            </div>
          </template>
          <template v-if="(index == 1)">
            <search
              class="x-search"
              v-model="searchword2"
              :auto-fixed="autofixed"
              @on-submit="onSubmit2"
              @on-change="onChange2"
              @on-cancel="onCancel2"
              ref="search">
            </search>
            <div v-if="distabdata2" class="scroll_list pl10 pr10">
              <div v-if="!tabdata1 || tabdata1.length === 0" class="scroll_item emptyitem flex_center">
                <template v-if="searchresult1">暂无搜索结果</template>
                <template v-else>暂无线下数据</template>
              </div>
              <div v-else v-for="item in tabdata2" :key="item.id" class="scroll_item padding10">
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
              </div>
            </div>
          </template>
        </swiper-item>
      </swiper>
    </div>
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
      autofixed: false,
      query: Object,
      viewuser: Object,
      tabtxts: [ '线上', '线下' ],
      tabmodel: 0,
      distabdata1: false,
      distabdata2: false,
      tabdata1: [],
      tabdata2: [],
      searchword1: '',
      searchresult1: false,
      searchword2: '',
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
        if (!self.isBindScroll1) {
          let items = document.querySelectorAll('.rsaleslist .swiperitem')
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
      let params = { params: { uid: self.query.uid, buyonline: 0, pagestart: self.pagestart2, limit: self.limit } }
      let keyword = self.searchword2
      if (typeof keyword !== 'undefined' && keyword && self.$util.trim(keyword) !== '') {
        self.searchresult2 = true
        params.params.keyword = keyword
      } else {
        self.searchresult2 = false
      }
      self.$http.get(`${ENV.BokaApi}/api/user/salesList`, params).then(function (res) {
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
    tabitemclick (index) {
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
    })
    self.getdata1()
  }
}
</script>

<style lang="less" scoped>
.rnews .bk-listplate1 .iconcell{width:45px;}
.vux-popup-dialog .weui-cell__bd{text-align:center;}
.vux-popup-dialog .weui-cell__ft{display:none;}

</style>
