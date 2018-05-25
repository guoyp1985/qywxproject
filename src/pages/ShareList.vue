<template>
  <div class="containerarea bg-white font14 rsharelist">
    <div class="s-topbanner s-topbanner1">
      <div class="row">
        <div class="bg"></div>
        <div class="flex_center h_100">
          <div class="flex_cell font18 pl20">{{ viewuser.linkman }}的{{$t('Share')}}</div>
        </div>
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
        <div v-if="disdata" class="scroll_list">
          <div v-if="!data || data.length === 0" class="scroll_item  emptyitem flex_center">
            <template v-if="searchresult1">暂无搜索结果</template>
            <template v-else>暂无分享数据</template>
          </div>
          <router-link :to="{path: `/${item.module}?id=${item.moduleid}&wid=${item.wid}`}" v-else v-for="(item,index) in data" :key="item.id" class="scroll_item db padding10">
            <div class="t-table">
              <div class="t-cell v_middle" style="width:50px;height:50px;">
                <x-img class="imgcover" :src="getPhoto(item.photo)" default-src="../src/assets/images/nopic.jpg" style="width:40px;height:40px;" :offset="0" container=".scroll-container"></x-img>
              </div>
              <div class="t-cell v_middle">
                <div class="clamp1"><span :class="getDateClass(item.dateline)">{{ getDateState(item.dateline) }}</span>{{ item.title }}</div>
                <div class="clamp1 color-gray font12">
                  <span class="v_middle"><i class="al al-chakan font18 middle-cell pl5 pr5 color-b8b8b8"></i>{{item.visitor}}次</span>
                  <span class="v_middle"><i class="al al-fenxiang font14 middle-cell pl5 pr5"></i>{{ item.dateline | dateformat }}</span>
                </div>
              </div>
            </div>
          </router-link>
        </div>
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
    }
  },
  data () {
    return {
      autofixed: false,
      query: {},
      viewuser: {},
      disdata: false,
      data: [],
      searchword1: '',
      searchresult1: false,
      limit: 20,
      pagestart1: 0
    }
  },
  methods: {
    getPhoto: function (src) {
      return this.$util.getPhoto(src)
    },
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
      self.getData1()
    },
    onSubmit1 () {
      const self = this
      self.$vux.loading.show()
      self.disdata = false
      self.data = []
      self.pagestart1 = 0
      self.getData1()
    },
    handleScroll () {
      const self = this
      self.$util.scrollEvent({
        element: self.$refs.scrollContainer,
        callback: function () {
          if (self.data.length === (self.pagestart1 + 1) * self.limit) {
            self.pagestart1++
            self.$vux.loading.show()
            self.getData1()
          }
        }
      })
    },
    getData1 () {
      const self = this
      const params = { params: { uid: self.query.uid, pagestart: self.pagestart1, limit: self.limit } }
      const keyword = self.searchword1
      if (typeof keyword !== 'undefined' && keyword && self.$util.trim(keyword) !== '') {
        self.searchresult1 = true
        params.params.keyword = keyword
      } else {
        self.searchresult1 = false
      }
      self.$http.get(`${ENV.BokaApi}/api/user/shareList`, params).then(function (res) {
        this.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        self.data = self.data.concat(retdata)
        self.disdata = true
      })
    },
    getDateState (dt) {
      return this.$util.getDateState(dt)
    },
    getDateClass (dt) {
      let ret = this.$util.getDateClass(dt)
      ret = `${ret} mr5`
      return ret
    },
    getData () {
      const self = this
      this.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, { module: 'retailer', action: 'sharelist' })
      .then(res => self.$http.get(`${ENV.BokaApi}/api/retailer/customerView`, { params: { customeruid: self.query.uid } }))
      .then(res => {
        const data = res.data
        if (data) {
          self.viewuser = data.data ? data.data : data
          document.title = `${self.viewuser.linkman}分享`
        }
        self.getData1()
      })
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.query = this.$route.query
      this.getData()
    }
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less" scoped>
.textarea-outer{padding:10px;}
.textarea-outer .weui-cells{margin-top:0;}
.textarea-outer .weui-cells:before{display:none;}
.textarea-outer .weui-cells:after{display:none;}
</style>
