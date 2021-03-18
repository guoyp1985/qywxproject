<style lang="less">
.activity-list-page.nobottom{
  .s-container{bottom:0;}
}
.activity-list-page{
  .s-container{bottom:50px;overflow-y:auto;}
  .scroll_list{
    .scroll_item{
      display:flex;background-color:#fff;padding:10px;box-sizing: border-box;
      .al{color:#659af2;}
    }
  }
  .page-footer{
    display:flex;justify-content: center;align-items: center;
    width:100%;box-sizing: border-box;height:50px;
    position: absolute;left: 0;right: 0;bottom: 0;
    box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.07);
    .item{
      flex:1;display:flex;justify-content: center;align-items: center;height:100%;
      background-color:#07c160;color:#fff;
    }
  }
}
</style>
<template>
  <div :class="`containerarea activity-list-page ${(!loginUser || !loginUser.isadmin) ? 'nobottom' : ''}`">
    <!-- <div class="s-topbanner s-topbanner1 bg-white">
      <div class="row">
        <tab v-model="selectedIndex" class="v-tab">
          <tab-item selected @on-item-click="clickTab(0)">公司活动</tab-item>
          <tab-item @on-item-click="clickTab(1)">我的活动</tab-item>
        </tab>
      </div>
    </div> -->
    <div class="s-container s-container1" style="top:0;">
      <div v-show="(selectedIndex == 0)" class="swiper-inner" ref="scrollContainer1" @scroll="handleScroll('scrollContainer1', 0)">
        <template v-if="disList1">
          <div v-if="!listData1 || !listData1.length" class="flex_empty">暂无数据</div>
          <div v-else class="scroll_list">
            <div v-for="(item,index) in listData1" :key="index" class="scroll_item" @click="toDetail(item)">
              <div class="pr10 flex_left">
                <span class="al al-youhuiquan"></span>
              </div>
              <div class="flex_cell flex_left">
                <div>
                  <div>{{item.title}}</div>
                  <div>满{{item.ordermoney}}减{{item.facemoney}}</div>
                  <div class="color-gray font12">剩余数量: {{item.leftstorage}}</div>
                  <div class="color-gray font12">有效期: {{item.starttime_str}}<span class="ml5 mr5">-</span>{{item.endtime_str}}</div>
                </div>
              </div>
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
            <div v-for="(item,index) in listData2" :key="index" class="scroll_item" @click="toDetail(item)">
              <div class="pr10">
                <span class="al al-youhuiquan"></span>
              </div>
              <div class="flex_cell flex_left">
                <div>
                  <div>满{{item.ordermoney}}减{{item.facemoney}}</div>
                  <div class="color-gray font12">剩余数量: {{item.leftstorage}}</div>
                  <div class="color-gray font12">有效期: {{item.starttime_str}}<span class="ml5 mr5">-</span>{{item.endtime_str}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="load-end-area loading" v-if="isLoading2"></div>
          <div class="load-end-area done" v-else-if="isDone2"></div>
        </template>
      </div>
    </div>
    <div class="page-footer" v-if="loginUser && loginUser.isadmin">
      <router-link class="item" to="/addCommonCard">添加活动</router-link>
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
    toDetail (item) {
      this.$router.push({path: '/card', query: {id: item.id}})
    },
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
          retdata[i].starttime_str = new Time(retdata[i].starttime * 1000).dateFormat('yyyy-MM-dd hh:mm')
          retdata[i].endtime_str = new Time(retdata[i].endtime * 1000).dateFormat('yyyy-MM-dd hh:mm')
        }
        this.listData1 = this.listData1.concat(retdata)
        this.disList1 = true
        if (this.listData1.length && retdata.length < this.limit) {
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
    refresh () {
      this.loginUser = User.get()
      this.initData()
      this.switchData()
    }
  },
  created () {
    this.query = this.$route.query
    if (!this.query.refresh) {
      this.refresh()
    }
  },
  activated () {
    this.query = this.$route.query
    if (this.query.refresh) {
      this.refresh()
    } else {
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
