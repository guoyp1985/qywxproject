<style lang="less">
.sale-customer-list-page{
  .scroll_list{
  }
}
</style>
<template>
  <div class="sale-customer-list-page containerarea">
    <div class="s-topbanner s-topbanner1 bg-white">
      <div class="row">
        <tab v-model="selectedIndex" class="v-tab">
          <tab-item selected @on-item-click="clickTab(0)">最近消费</tab-item>
          <!-- <tab-item @on-item-click="clickTab(1)">消费服务</tab-item>
          <tab-item @on-item-click="clickTab(2)">定期服务</tab-item> -->
        </tab>
      </div>
    </div>
    <div class="s-container s-container1">
      <div v-show="(selectedIndex == 0)" class="swiper-inner" ref="scrollContainer1" @scroll="handleScroll('scrollContainer1', 0)">
        <template v-if="disList1">
          <div v-if="!listData1 || !listData1.length" class="flex_empty">暂无数据</div>
          <div v-else class="scroll_list">
            <customer-item
              v-for="(item,index) in listData1"
              :key="index"
              :item.sync="item"
              :index.sync="index"
              :user.sync="loginUser"
              :tabIndex = "0"
              @expand-event="expandEvent"
              @yxl-event="clickYingxiangli"
              @give-card="giveCard">
            </customer-item>
          </div>
          <div class="load-end-area loading" v-if="isLoading1"></div>
          <div class="load-end-area done" v-else-if="isDone1"></div>
        </template>
      </div>
      <div v-show="(selectedIndex == 1)" class="swiper-inner" ref="scrollContainer2" @scroll="handleScroll('scrollContainer2', 1)">
        <template v-if="disList2">
          <div v-if="!listData2 || !listData2.length" class="flex_empty">暂无数据</div>
          <div v-else class="scroll_list">
            <customer-item
              v-for="(item,index) in listData2"
              :key="index"
              :item.sync="item"
              :index.sync="index"
              :user.sync="loginUser"
              :tabIndex = "1"
              @expand-event="expandEvent"
              @yxl-event="clickYingxiangli"
              @give-card="giveCard">
            </customer-item>
          </div>
          <div class="load-end-area loading" v-if="isLoading2"></div>
          <div class="load-end-area done" v-else-if="isDone2"></div>
        </template>
      </div>
      <div v-show="(selectedIndex == 2)" class="swiper-inner" ref="scrollContainer3" @scroll="handleScroll('scrollContainer3', 2)">
        <template v-if="disList3">
          <div v-if="!listData3 || !listData3.length" class="flex_empty">暂无数据</div>
          <div v-else class="scroll_list">
            <customer-item
              v-for="(item,index) in listData3"
              :key="index"
              :item.sync="item"
              :index.sync="index"
              :user.sync="loginUser"
              :tabIndex = "2"
              @expand-event="expandEvent"
              @yxl-event="clickYingxiangli"
              @give-card="giveCard">
            </customer-item>
          </div>
          <div class="load-end-area loading" v-if="isLoading3"></div>
          <div class="load-end-area done" v-else-if="isDone3"></div>
        </template>
      </div>
    </div>
    <div v-transfer-dom class="x-popup">
      <popup v-model="showYxlModal" height="100%" class="bg-white">
        <div class="popup1">
          <div class="pagetop flex_center b_bottom_after" style="font-size:16px;font-weight:bold;">什么是影响力</div>
          <div class="pagemiddle">
            <div class="padding10" style="box-sizing:border-box;" >影响力是指客户通过分享动作所带来的访问量，影响力数值越大，表示该客户越受朋友欢迎，所分享的内容打开率越高，可将影响力高的客户发展成代理，通过他的资源为你带来更多销量！</div>
          </div>
          <div class="pagebottom bg-gray flex_center color-white" @click="closeYxlModal">知道了</div>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import { Tab, TabItem, Popup, TransferDom } from 'vux'
import ENV from 'env'
import Time from '../../libs/time'
import { User } from '#/storage'
import CustomerItem from '@/components/CustomerItem'
import jweixin from 'jweixin'

export default {
  directives: { TransferDom },
  components: { Tab, TabItem, Popup, CustomerItem },
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
      showYxlModal: false,
      nextCursor1: null,
      nextCursor2: null,
      nextCursor3: null,
      pageTop: 0,
      tabLeft: 0
    }
  },
  methods: {
    toView (item) {
      this.$router.push({path: '/qiyeCustomerView', query: {uid: item.uid}})
    },
    giveCard (item) {
      this.cardUser = item
      let shareTitle = this.cardInfo.title
      if (this.cardInfo.push_title && this.cardInfo.push_title !== '') {
        shareTitle = this.cardInfo.push_title
      }
      let shareDesc = this.cardInfo.push_desc
      if (!shareDesc || shareDesc === '') {
        let shareStartTime = new Time(this.cardInfo.starttime * 1000).dateFormat('MM-dd')
        let shareEndTime = new Time(this.cardInfo.endtime * 1000).dateFormat('MM-dd')
        shareDesc = `活动日期${shareStartTime}至${shareEndTime}`
      }
      jweixin.invoke('shareToExternalContact', {
        title: shareTitle,
        desc: shareDesc,
        link: `${ENV.Host}/#/card?type=singlecard&customeruid=${this.cardUser.uid}&share_uid=${this.loginUser.uid}`,
        imgUrl: this.cardInfo.photo
      })
    },
    expandEvent (item, index, tabIndex) {
      switch (tabIndex) {
        case 0:
          this.listData1[index].checked = !this.listData1[index].checked
          break
        case 1:
          this.listData2[index].checked = !this.listData2[index].checked
          break
        case 2:
          this.listData3[index].checked = !this.listData3[index].checked
          break
      }
    },
    clickYingxiangli () {
      this.showYxlModal = true
    },
    closeYxlModal () {
      this.showYxlModal = false
    },
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
    handleListData (retdata) {
      for (var i = 0; i < retdata.length; i++) {
        let curd = retdata[i]
        curd.checked = false
        curd.dateline_str = new Time(curd.dateline * 1000).dateFormat('yyyy-MM-dd')
        switch (curd.sex) {
          case 1:
            curd.sexname = '男'
            break
          case 2:
            curd.sexname = '女'
            break
          default:
            curd.sexname = '未知'
        }
      }
      return retdata
    },
    getList1 () {
      let params = {page: this.pagestart1, limit: this.limit}
      if (this.nextCursor1) params.cursor = this.nextCursor1
      this.$http.get(`${ENV.BokaApi}/api/customer/getList`, {
        params: params
      }).then(res => {
        let data = res.data
        this.$vux.loading.hide()
        this.isLoading1 = false
        let retdata = data.data ? data.data : data
        retdata = this.handleListData(retdata)
        this.listData1 = this.listData1.concat(retdata)
        this.disList1 = true
        if (data.next_cursor && data.next_cursor !== this.nextCursor1) this.nextCursor1 = data.next_cursor
        if (retdata.length < this.limit) {
          this.isDone1 = true
        }
      })
    },
    getList2 () {
      let params = {page: this.pagestart2, limit: this.limit}
      if (this.nextCursor2) params.cursor = this.nextCursor2
      this.$http.get(`${ENV.BokaApi}/api/customer/getList`, {
        params: params
      }).then(res => {
        let data = res.data
        this.$vux.loading.hide()
        this.isLoading2 = false
        let retdata = data.data ? data.data : data
        retdata = this.handleListData(retdata)
        this.listData2 = this.listData2.concat(retdata)
        this.disList2 = true
        if (data.next_cursor && data.next_cursor !== this.nextCursor2) this.nextCursor2 = data.next_cursor
        if (retdata.length < this.limit) {
          this.isDone2 = true
        }
      })
    },
    getList3 () {
      let params = {page: this.pagestart3, limit: this.limit}
      if (this.nextCursor3) params.cursor = this.nextCursor3
      this.$http.get(`${ENV.BokaApi}/api/customer/getList`, {
        params: params
      }).then(res => {
        let data = res.data
        this.$vux.loading.hide()
        this.isLoading3 = false
        let retdata = data.data ? data.data : data
        retdata = this.handleListData(retdata)
        this.listData3 = this.listData3.concat(retdata)
        this.disList3 = true
        if (data.next_cursor && data.next_cursor !== this.nextCursor3) this.nextCursor3 = data.next_cursor
        if (retdata.length < this.limit) {
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
    getCardInfo () {
      this.$http.post(`${ENV.BokaApi}/api/miniactivity/info`, {
        type: 'singlecard'
      }) // 获取文章
      .then(res => {
        const data = res.data
        this.$vux.loading.hide()
        if (data.code === 0) {
          let retdata = data.data
          this.cardInfo = retdata
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
      this.showYxlModal = false
      this.nextCursor1 = null
      this.nextCursor2 = null
      this.nextCursor3 = null
    },
    refresh () {
      this.loginUser = User.get()
      this.query = this.$route.query
      this.initData()
      this.getCardInfo()
      this.getList1()
    }
  },
  created () {
    this.refresh()
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
      case 2:
        this.$refs.scrollContainer3.scrollTop = this.pageTop
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
      case 2:
        this.pageTop = this.$refs.scrollContainer3.scrollTop
        break
    }
    next()
  }
}
</script>
