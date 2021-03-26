<style lang="less">
.qy-income-list-page{
  .scroll_list{
    .income-list:not(:last-child){margin-bottom:10px;}
  }
}
</style>
<template>
  <div class="qy-income-list-page containerarea">
    <div class="s-topbanner s-topbanner1 bg-white">
      <div class="row">
        <tab v-model="selectedIndex" class="v-tab">
          <tab-item :selected="selectedIndex == 0" @on-item-click="clickTab(0)">未结算</tab-item>
          <tab-item :selected="selectedIndex == 1" @on-item-click="clickTab(1)">已结算</tab-item>
          <tab-item :selected="selectedIndex == 2" @on-item-click="clickTab(2)">提现明细</tab-item>
        </tab>
      </div>
    </div>
    <div class="s-container s-container1">
      <div v-show="(selectedIndex == 0)" class="swiper-inner" ref="scrollContainer1" @scroll="handleScroll('scrollContainer1', 0)">
        <template v-if="disList1">
          <div v-if="!listData1 || !listData1.length" class="flex_empty">暂无数据</div>
          <div v-else class="scroll_list">
            <income-item
              v-for="(item,index) in listData1"
              :key="index"
              :item.sync="item"
              :index.sync="index"
              :user.sync="loginUser"
              :tabIndex = "0">
            </income-item>
          </div>
          <div class="load-end-area loading" v-if="isLoading1"></div>
          <div class="load-end-area done" v-else-if="isDone1"></div>
        </template>
      </div>
      <div v-show="(selectedIndex == 1)" class="swiper-inner" ref="scrollContainer2" @scroll="handleScroll('scrollContainer2', 1)">
        <template v-if="disList2">
          <div v-if="!listData2 || !listData2.length" class="flex_empty">暂无数据</div>
          <div v-else class="scroll_list">
            <income-item
              v-for="(item,index) in listData2"
              :key="index"
              :item.sync="item"
              :index.sync="index"
              :user.sync="loginUser"
              :tabIndex = "1">
            </income-item>
          </div>
          <div class="load-end-area loading" v-if="isLoading2"></div>
          <div class="load-end-area done" v-else-if="isDone2"></div>
        </template>
      </div>
      <div v-show="(selectedIndex == 2)" class="swiper-inner" ref="scrollContainer3" @scroll="handleScroll('scrollContainer3', 2)">
        <template v-if="disList3">
          <div v-if="!listData3 || !listData3.length" class="flex_empty">暂无数据</div>
          <div v-else class="scroll_list">
            <div v-for="(item,index1) in listData3" :key="index1" class="scroll_item bg-white mt10 list-shadow">
              <div class="pl12 pr12 pt10 pb10">
                <div class="db-flex">
                  <div class="flex_cell flex_left">
                    <div class="w_100">
                      <div><span>{{item.cashtypetext}}</span><span v-if="item.status == 1" class="color-green2">【{{item.statustext}}】</span><span v-else class="color-theme">【{{item.statustext}}】</span></div>
                      <div class="mt5 color-gray" v-if="item.cmms && item.cmms > 0">手续费: ￥{{item.cmms}}</div>
                      <div class="color-theme mt5" v-if="item.reason && item.reason != ''">{{item.reason}}</div>
                      <div class="mt5 font12 clamp1 color-gray">{{ item.dateline | dateformat }}</div>
                    </div>
                  </div>
                  <div class="flex_right ml5 color-theme bold">￥{{item.money}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="load-end-area loading" v-if="isLoading3"></div>
          <div class="load-end-area done" v-else-if="isDone3"></div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { Tab, TabItem, Popup, TransferDom } from 'vux'
import ENV from 'env'
import Time from '../../libs/time'
import { User } from '#/storage'
import IncomeItem from '@/components/IncomeItem'

export default {
  directives: { TransferDom },
  components: { Tab, TabItem, Popup, IncomeItem },
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
      pagestart3: 1,
      disList3: false,
      listData3: [],
      isLoading3: false,
      isDone3: false,
      pageTop: 0,
      tabLeft: 0,
      cardUser: {},
      cardInfo: {}
    }
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  methods: {
    clickTab (index) {
      this.selectedIndex = index
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
        case 2:
          if (this.isLoading3) return false
          if (this.listData3.length < this.limit) {
            this.pagestart3 = 1
            this.disList3 = false
            this.listData3 = []
            this.isLoading3 = true
            this.isDone3 = false
            this.getList3()
          }
          break
      }
    },
    switchData () {
      switch (this.selectedIndex) {
        case 0:
          if (!this.listData1.length) {
            this.getList1()
          }
          break
        case 1:
          if (!this.listData2.length) {
            this.getList2()
          }
          break
        case 2:
          if (!this.listData3.length) {
            this.getList3()
          }
          break
      }
    },
    handleListData (retdata) {
      for (var i = 0; i < retdata.length; i++) {
        let curd = retdata[i]
        curd.dateline_str = new Time(curd.dateline * 1000).dateFormat('yyyy-MM-dd')
      }
      return retdata
    },
    getList1 () {
      let params = {cashed: 0, page: this.pagestart1, limit: this.limit}
      this.$http.get(`${ENV.BokaApi}/api/account/getList`, {
        params: params
      }).then(res => {
        let data = res.data
        this.$vux.loading.hide()
        this.isLoading1 = false
        let retdata = data.data ? data.data : data
        retdata = this.handleListData(retdata)
        this.listData1 = this.listData1.concat(retdata)
        this.disList1 = true
        if (retdata.length && retdata.length < this.limit) {
          this.isDone1 = true
        }
      })
    },
    getList2 () {
      let params = {cashed: 1, page: this.pagestart2, limit: this.limit}
      this.$http.get(`${ENV.BokaApi}/api/account/getList`, {
        params: params
      }).then(res => {
        let data = res.data
        this.$vux.loading.hide()
        this.isLoading2 = false
        let retdata = data.data ? data.data : data
        retdata = this.handleListData(retdata)
        this.listData2 = this.listData2.concat(retdata)
        this.disList2 = true
        if (retdata.length && retdata.length < this.limit) {
          this.isDone2 = true
        }
      })
    },
    getList3 () {
      let params = {page: this.pagestart3, limit: this.limit}
      this.$http.get(`${ENV.BokaApi}/api/account/cashList`, {
        params: params
      }).then(res => {
        let data = res.data
        this.$vux.loading.hide()
        this.isLoading3 = false
        let retdata = data.data ? data.data : data
        retdata = this.handleListData(retdata)
        this.listData3 = this.listData3.concat(retdata)
        this.disList3 = true
        if (retdata.length && retdata.length < this.limit) {
          this.isDone3 = true
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
            case 2:
              if (this.isLoading3 || this.isDone3) return false
              if (this.listData3.length === this.pagestart3 * this.limit) {
                this.pagestart3++
                this.isLoading3 = true
                this.getList3()
              }
              break
          }
        }
      })
    },
    initData () {
      this.pagestart1 = 1
      this.disList1 = false
      this.listData1 = []
      this.isLoading1 = false
      this.isDone1 = false
      this.pagestart2 = 1
      this.disList2 = false
      this.listData2 = []
      this.isLoading2 = false
      this.isDone2 = false
      this.pagestart3 = 1
      this.disList3 = false
      this.listData3 = []
      this.isLoading3 = false
      this.isDone3 = false
    },
    refresh () {
      this.loginUser = User.get()
      this.query = this.$route.query
      this.initData()
    }
  },
  created () {
    this.refresh()
  },
  activated () {
    this.query = this.$route.query
    if (this.query.flag) {
      this.selectedIndex = parseInt(this.query.flag)
    } else {
      this.selectedIndex = 0
    }
    console.log('flag', this.query.flag)
    console.log('index', this.selectedIndex)
    this.switchData()
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
