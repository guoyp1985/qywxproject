<style lang="less">
</style>
<template>
  <div class="containerarea font14">
    <div class="s-topbanner s-topbanner1 bg-white">
      <div class="row">
        <tab v-model="selectedIndex" class="v-tab">
          <tab-item selected @on-item-click="clickTab(0)">购买</tab-item>
          <tab-item @on-item-click="clickTab(1)">分享</tab-item>
          <tab-item @on-item-click="clickTab(2)">多次</tab-item>
          <tab-item @on-item-click="clickTab(3)">时长</tab-item>
          <tab-item @on-item-click="clickTab(4)">推荐</tab-item>
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
      <div v-show="(selectedIndex == 2)" class="swiper-inner" ref="scrollContainer3" @scroll="handleScroll('scrollContainer3', 2)">
        <template v-if="disList3">
          <div v-if="!listData3 || !listData3.length" class="flex_empty">暂无数据</div>
          <div v-else class="scroll_list">
            <div v-for="(item,index) in listData3" :key="index" class="scroll_item">
              <div>{{item.title}}</div>
            </div>
          </div>
          <div class="load-end-area loading" v-if="isLoading3"></div>
          <div class="load-end-area done" v-else-if="isDone3"></div>
        </template>
      </div>
      <div v-show="(selectedIndex == 3)" class="swiper-inner" ref="scrollContainer4" @scroll="handleScroll('scrollContainer4', 3)">
        <template v-if="disList4">
          <div v-if="!listData4 || !listData4.length" class="flex_empty">暂无数据</div>
          <div v-else class="scroll_list">
            <div v-for="(item,index) in listData4" :key="index" class="scroll_item">
              <div>{{item.title}}</div>
            </div>
          </div>
          <div class="load-end-area loading" v-if="isLoading4"></div>
          <div class="load-end-area done" v-else-if="isDone4"></div>
        </template>
      </div>
      <div v-show="(selectedIndex == 4)" class="swiper-inner" ref="scrollContainer5" @scroll="handleScroll('scrollContainer5', 4)">
        <template v-if="disList5">
          <div v-if="!listData5 || !listData5.length" class="flex_empty">暂无数据</div>
          <div v-else class="scroll_list">
            <div v-for="(item,index) in listData5" :key="index" class="scroll_item">
              <div>{{item.title}}</div>
            </div>
          </div>
          <div class="load-end-area loading" v-if="isLoading5"></div>
          <div class="load-end-area done" v-else-if="isDone5"></div>
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
      pagestart1: 0,
      disList1: false,
      listData1: [],
      isLoading1: false,
      isDone1: false,
      pagestart2: 0,
      disList2: false,
      listData2: [],
      isLoading2: false,
      isDone2: false,
      pagestart3: 0,
      disList3: false,
      listData3: [],
      isLoading3: false,
      isDone3: false,
      pagestart4: 0,
      disList4: false,
      listData4: [],
      isLoading4: false,
      isDone4: false,
      pagestart5: 0,
      disList5: false,
      listData5: [],
      isLoading5: false,
      isDone5: false
    }
  },
  methods: {
    clickTab (index) {
      this.selectedIndex = index
      switch (this.selectedIndex) {
        case 0:
          if (this.isLoading1) return false
          if (this.listData1.length < this.limit) {
            this.pagestart1 = 0
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
            this.pagestart2 = 0
            this.disList2 = false
            this.listData2 = []
            this.isLoading2 = true
            this.isDone2 = false
            this.getList2()
          }
          break
        case 2:
          if (this.isLoading3) return false
          if (this.listData3.length < this.limit) {
            this.pagestart3 = 0
            this.disList3 = false
            this.listData3 = []
            this.isLoading3 = true
            this.isDone3 = false
            this.getList3()
          }
          break
        case 3:
          if (this.isLoading4) return false
          if (this.listData4.length < this.limit) {
            this.pagestart4 = 0
            this.disList4 = false
            this.listData4 = []
            this.isLoading4 = true
            this.isDone4 = false
            this.getList4()
          }
          break
        case 4:
          if (this.isLoading5) return false
          if (this.listData5.length < this.limit) {
            this.pagestart5 = 0
            this.disList5 = false
            this.listData5 = []
            this.isLoading5 = true
            this.isDone5 = false
            this.getList5()
          }
          break
      }
    },
    getList1 () {
      let params = {pagestart: this.pagestart1, limit: this.limit}
      this.$http.get(`${ENV.BokaApi}/api`, {
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
      let params = {pagestart: this.pagestart2, limit: this.limit}
      this.$http.get(`${ENV.BokaApi}/api`, {
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
    getList3 () {
      let params = {pagestart: this.pagestart3, limit: this.limit}
      this.$http.get(`${ENV.BokaApi}/api`, {
        params: params
      }).then(res => {
        let data = res.data
        this.$vux.loading.hide()
        this.isLoading3 = false
        let retdata = data.data ? data.data : data
        for (var i = 0; i < retdata.length; i++) {
          retdata[i].dateline_str = new Time(retdata[i].dateline * 1000).dateFormat('yyyy-MM-dd')
        }
        this.listData3 = this.listData3.concat(retdata)
        this.disList3 = true
        if (retdata.length < this.limit) {
          this.isDone3 = true
        }
      })
    },
    getList4 () {
      let params = {pagestart: this.pagestart4, limit: this.limit}
      this.$http.get(`${ENV.BokaApi}/api`, {
        params: params
      }).then(res => {
        let data = res.data
        this.$vux.loading.hide()
        this.isLoading4 = false
        let retdata = data.data ? data.data : data
        for (var i = 0; i < retdata.length; i++) {
          retdata[i].dateline_str = new Time(retdata[i].dateline * 1000).dateFormat('yyyy-MM-dd')
        }
        this.listData4 = this.listData4.concat(retdata)
        this.disList4 = true
        if (retdata.length < this.limit) {
          this.isDone4 = true
        }
      })
    },
    getList5 () {
      let params = {pagestart: this.pagestart5, limit: this.limit}
      this.$http.get(`${ENV.BokaApi}/api`, {
        params: params
      }).then(res => {
        let data = res.data
        this.$vux.loading.hide()
        this.isLoading5 = false
        let retdata = data.data ? data.data : data
        for (var i = 0; i < retdata.length; i++) {
          retdata[i].dateline_str = new Time(retdata[i].dateline * 1000).dateFormat('yyyy-MM-dd')
        }
        this.listData5 = this.listData5.concat(retdata)
        this.disList5 = true
        if (retdata.length < this.limit) {
          this.isDone5 = true
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
              if (this.listData1.length === (this.pagestart1 + 1) * this.limit) {
                this.pagestart1++
                this.isLoading1 = true
                this.getList1()
              }
              break
            case 1:
              if (this.isLoading2 || this.isDone2) return false
              if (this.listData2.length === (this.pagestart2 + 1) * this.limit) {
                this.pagestart2++
                this.isLoading2 = true
                this.getList2()
              }
              break
            case 2:
              if (this.isLoading3 || this.isDone3) return false
              if (this.listData3.length === (this.pagestart3 + 1) * this.limit) {
                this.pagestart3++
                this.isLoading3 = true
                this.getList3()
              }
              break
            case 3:
              if (this.isLoading4 || this.isDone4) return false
              if (this.listData4.length === (this.pagestart4 + 1) * this.limit) {
                this.pagestart4++
                this.isLoading4 = true
                this.getList4()
              }
              break
            case 4:
              if (this.isLoading5 || this.isDone5) return false
              if (this.listData5.length === (this.pagestart5 + 1) * this.limit) {
                this.pagestart5++
                this.isLoading5 = true
                this.getList5()
              }
              break
          }
        }
      })
    },
    refresh (query) {
      this.loginUser = User.get()
      this.query = this.$route.query
    }
  },
  created () {
  },
  activated () {
    this.refresh(this.$route.query)
  }
}
</script>
