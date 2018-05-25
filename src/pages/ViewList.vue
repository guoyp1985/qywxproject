<template>
  <div class="containerarea bg-white font14 rsharelist">
    <div class="s-topbanner s-topbanner1">
      <div class="flex_center h_100 toprow">
        <div class="flex_cell font16 pl20 color-white">{{ viewuser.linkman }}的{{$t('Views')}}</div>
      </div>
    </div>
    <div class="s-container s-container1">
      <div class="flex_center bg-white" style="height:55px;position:absolute;left:0;top:0;right:0;">
        <search
          class="v-search"
          v-model="searchword1"
          :auto-fixed="autofixed"
          @on-submit="onSubmit1"
          @on-change="onChange1"
          @on-cancel="onCancel1"
          ref="search">
        </search>
      </div>
      <div v-if="disdata" class="scroll_list swiper-inner pl10 pr10 border-box scroll-container" style="top:55px;" ref="scrollContainer" @scroll="handleScroll">
        <div v-if="!data || data.length === 0" class="scroll_item  emptyitem flex_center">
          <template v-if="searchresult1">暂无搜索结果</template>
          <template v-else>暂无浏览数据</template>
        </div>
        <router-link :to="{path: `/${item.module}?id=${item.moduleid}&wid=${item.wid}`}" v-else v-for="(item,index) in data" :key="item.id" class="scroll_item db padding10">
          <div class="flex_left">
            <x-img class="imgcover avatarimg2 radius0" :src="item.photo" default-src="../src/assets/images/nopic.jpg" :offset="0" container=".scroll-container"></x-img>
            <div class="flex_cell pl10">
              <div class="clamp1"><span :class="getDateClass(item.dateline)">{{ getDateState(item.dateline) }}</span>{{ item.title }}</div>
              <div class="clamp1 color-gray font12">浏览次数: {{ item.number }}</div>
              <div class="clamp1 color-gray font12">停留时间: {{ item.staytime | staytimeFormat }}</div>
            </div>
          </div>
        </router-link>
      </div>
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
import { Search, XImg } from 'vux'
import Time from '#/time'
import ENV from 'env'

export default {
  components: {
    Search, XImg
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    },
    staytimeFormat: function (value) {
      let ret = ''
      let stay = parseInt(value)
      if (stay < 60) {
        ret = `${stay}秒`
      } else if (stay >= 60 && stay < 3660) {
        let m = Math.floor(stay / 60)
        let s = stay % 60
        ret = `${m}分钟${s}秒`
      } else if (stay >= 3660) {
        let h = Math.floor(stay / 3660)
        let val1 = stay % 3660
        let m = Math.floor(val1 / 60)
        let s = val1 % 60
        ret = `${h}小时${m}分钟${s}秒`
      }
      return ret
    }
  },
  data () {
    return {
      autofixed: false,
      query: Object,
      viewuser: Object,
      disdata: false,
      data: [],
      searchword1: '',
      searchresult1: false,
      limit: 20,
      pagestart1: 0
    }
  },
  methods: {
    onChange1 (val) {
      this.searchword1 = val
    },
    onCancel1 () {
      const self = this
      self.searchword1 = ''
      self.$vux.loading.show()
      self.disdata = false
      self.data = []
      self.pagestart1 = 0
      self.getdata1()
    },
    onSubmit1 () {
      const self = this
      self.$vux.loading.show()
      self.disdata = false
      self.data = []
      self.pagestart1 = 0
      self.getdata1()
    },
    handleScroll: function () {
      const self = this
      self.$util.scrollEvent({
        element: self.$refs.scrollContainer,
        callback: function () {
          if (self.data.length === (self.pagestart1 + 1) * self.limit) {
            self.pagestart1++
            self.$vux.loading.show()
            self.getdata1()
          }
        }
      })
    },
    getdata1 () {
      const self = this
      let params = { params: { uid: self.query.uid, pagestart: self.pagestart1, limit: self.limit } }
      let keyword = self.searchword1
      if (typeof keyword !== 'undefined' && keyword && self.$util.trim(keyword) !== '') {
        self.searchresult1 = true
        params.params.keyword = keyword
      } else {
        self.searchresult1 = false
      }
      self.$http.get(`${ENV.BokaApi}/api/user/viewList`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.data = self.data.concat(retdata)
        self.disdata = true
      })
    },
    getDateState: function (dt) {
      return this.$util.getDateState(dt)
    },
    getDateClass: function (dt) {
      let ret = this.$util.getDateClass(dt)
      ret = `${ret} mr5`
      return ret
    }
  },
  created () {
    const self = this
    self.$store.commit('updateToggleTabbar', {toggleBar: false})
    self.query = self.$route.query
    self.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, {
      module: 'retailer', action: 'sharelist'
    }).then(function () {
      return self.$http.get(`${ENV.BokaApi}/api/retailer/customerView`,
        { params: { customeruid: self.query.uid } }
      )
    }).then(function (res) {
      let data = res.data
      if (data) {
        self.viewuser = data.data ? data.data : data
        document.title = `${self.viewuser.linkman}浏览`
      }
    })
    self.getdata1()
  }
}
</script>

<style lang="less" scoped>
.textarea-outer{padding:10px;}
.textarea-outer .weui-cells{margin-top:0;}
.textarea-outer .weui-cells:before{display:none;}
.textarea-outer .weui-cells:after{display:none;}
</style>
