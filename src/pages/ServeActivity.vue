<style lang="less">
.serve-activity-page{
}
</style>
<template>
  <div class="containerarea serve-activity-page">
    <div class="s-topbanner s-topbanner1 bg-white">
      <div class="row">
        <tab v-model="selectedIndex" class="v-tab">
          <tab-item selected @on-item-click="clickTab(0)">公司活动</tab-item>
          <tab-item @on-item-click="clickTab(1)">我的活动</tab-item>
        </tab>
      </div>
    </div>
    <div class="s-container s-container1">
      <div v-show="(selectedIndex == 0)" class="swiper-inner" ref="scrollContainer1" @scroll="handleScroll('scrollContainer1', 0)">
        <template v-if="disList1">
          <div v-if="!listData1 || !listData1.length" class="flex_empty">暂无数据</div>
          <div v-else class="scroll_list">
            <div v-for="(item,index) in listData1" :key="index" class="scroll_item">
              <div>{{item.title}}</div>
            </div>
          </div>
          <div class="load-end-area loading" v-if="isLoading1"></div>
          <div class="load-end-area done" v-else-if="isDone1"></div>
        </template>
      </div>
      <div v-show="(selectedIndex == 1)" class="swiper-inner" ref="scrollContainer2" @scroll="handleScroll('scrollContainer2', 1)">
        <template v-if="disList2">
          <div v-if="!listData2 || !listData2.length" class="flex_empty">暂无数据</div>
          <div v-else class="scroll_list">
            <div v-for="(item,index) in listData2" :key="index" class="scroll_item">
              <div>{{item.title}}</div>
            </div>
          </div>
          <div class="load-end-area loading" v-if="isLoading2"></div>
          <div class="load-end-area done" v-else-if="isDone2"></div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { Tab, TabItem } from 'vux'
import ENV from 'env'
import Time from '../../libs/time'
import { User } from '#/storage'

export default {
  components: { Tab, TabItem },
  data () {
    return {
      query: {},
      loginUser: {},
      selectedIndex: 0,
      limit: 15,
      pagestart1: 1,
      disList1: false,
      listData1: [],
      isLoading1: false,
      isDone1: false,
      pagestart2: 1,
      disList2: false,
      listData2: [],
      isLoading2: false,
      isDone2: false,
      pageTop: 0,
      tabLeft: 0
    }
  },
  methods: {
    switchData () {
      switch (this.selectedIndex) {
        case 0:
          if (this.isLoading1) return false
          if (this.listData1.length < this.limit) {
            this.pagestart1 = 1
            this.disList1 = false
            this.listData1 = []
            this.isLoading1 = true
            this.isDone1 = false
            this.getList1()
          }
          break
        case 1:
          if (this.isLoading2) return false
          if (this.listData2.length < this.limit) {
            this.pagestart2 = 1
            this.disList2 = false
            this.listData2 = []
            this.isLoading2 = true
            this.isDone2 = false
            this.getList2()
          }
          break
      }
    },
    clickTab (index) {
      this.selectedIndex = index
      this.switchData()
    },
    getList1 () {
      let params = {page: this.pagestart1, limit: this.limit}
      this.$http.get(`${ENV.BokaApi}/api/miniactivity/getList`, {
        params: params
      }).then(res => {
        let data = res.data
        this.$vux.loading.hide()
        this.isLoading1 = false
        let retdata = data.data ? data.data : data
        for (var i = 0; i < retdata.length; i++) {
          retdata[i].dateline_str = new Time(retdata[i].dateline * 1000).dateFormat('yyyy-MM-dd')
        }
        this.listData1 = this.listData1.concat(retdata)
        this.disList1 = true
        if (retdata.length < this.limit) {
          this.isDone1 = true
        }
      })
    },
    getList2 () {
      let params = {page: this.pagestart2, limit: this.limit}
      this.$http.get(`${ENV.BokaApi}/api/miniactivity/getList`, {
        params: params
      }).then(res => {
        let data = res.data
        this.$vux.loading.hide()
        this.isLoading2 = false
        let retdata = data.data ? data.data : data
        for (var i = 0; i < retdata.length; i++) {
          retdata[i].dateline_str = new Time(retdata[i].dateline * 1000).dateFormat('yyyy-MM-dd')
        }
        this.listData2 = this.listData2.concat(retdata)
        this.disList2 = true
        if (retdata.length < this.limit) {
          this.isDone2 = true
        }
      })
    },
    handleScroll (refname, index) {
      const scrollarea = this.$refs[refname][0] ? this.$refs[refname][0] : this.$refs[refname]
      this.$util.scrollEvent({
        element: scrollarea,
        callback: () => {
          switch (index) {
            case 0:
              if (this.isLoading1 || this.isDone1) return false
              if (this.listData1.length === this.pagestart1 * this.limit) {
                this.pagestart1++
                this.isLoading1 = true
                this.getList1()
              }
              break
            case 1:
              if (this.isLoading2 || this.isDone2) return false
              if (this.listData2.length === this.pagestart2 * this.limit) {
                this.pagestart2++
                this.isLoading2 = true
                this.getList2()
              }
              break
          }
        }
      })
    },
    initData () {
      this.selectedIndex = 0
      this.disList1 = false
      this.listData1 = []
      this.pagestart1 = 1
      this.isLoading1 = false
      this.isDone1 = false
      this.disList2 = false
      this.listData2 = []
      this.pagestart2 = 1
      this.isLoading2 = false
      this.isDone2 = false
    },
    refresh (query) {
      this.loginUser = User.get()
      this.query = this.$route.query
      this.initData()
      this.switchData()
    }
  },
  created () {
    this.refresh(this.$route.query)
  },
  activated () {
    if (document.querySelector('.vux-tab')) {
      document.querySelector('.vux-tab').scrollLeft = this.tabLeft
    }
    switch (this.selectedIndex) {
      case 0:
        this.$refs.scrollContainer1.scrollTop = this.pageTop
        break
      case 1:
        this.$refs.scrollContainer2.scrollTop = this.pageTop
        break
    }
  },
  beforeRouteLeave (to, from, next) {
    if (document.querySelector('.vux-tab')) {
      this.tabLeft = document.querySelector('.vux-tab').scrollLeft
    }
    switch (this.selectedIndex) {
      case 0:
        this.pageTop = this.$refs.scrollContainer1.scrollTop
        break
      case 1:
        this.pageTop = this.$refs.scrollContainer2.scrollTop
        break
    }
    next()
  }
}
</script>
