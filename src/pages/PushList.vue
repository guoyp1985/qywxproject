<style lang="less">
.push-list-page{
  .scroll_list{
    .scroll_item{
      padding:10px;background-color:#fff;
      .avatar{width:50px;height:50px;border-radius:50%;object-fit: cover;}
      .btn{
        background-color:#ff0000;color:#fff;width:40px;height:25px;line-height:25px;text-align:center;border-radius:20px;
      }
    }
    .info-area{
      background-color:#fff;display:flex;padding:10px;box-sizing:border-box;flex-wrap: wrap;
      .txt-item{width:50%;box-sizing:border-box;line-height:25px;position:relative;}
      .txt-item:nth-child(odd){padding-right:5px;}
      .txt-item:nth-child(even){padding-left:5px;}
    }
  }
}
</style>
<template>
  <div class="containerarea push-list-page">
    <div class="s-topbanner s-topbanner1 bg-white">
      <div class="row">
        <tab v-model="selectedIndex" class="v-tab">
          <tab-item selected @on-item-click="clickTab(0)"> 消费</tab-item>
          <tab-item @on-item-click="clickTab(1)">标签</tab-item>
          <tab-item @on-item-click="clickTab(2)">生日</tab-item>
        </tab>
      </div>
    </div>
    <div class="s-container s-container1">
      <div v-show="(selectedIndex == 0)" class="swiper-inner" ref="scrollContainer1" @scroll="handleScroll('scrollContainer1', 0)">
        <template v-if="disList1">
          <div v-if="!listData1 || !listData1.length" class="flex_empty">暂无数据</div>
          <div v-else class="scroll_list">
            <div v-for="(item,index) in listData1" :key="index" class="scroll_item">
              <div class="flex_left">
                <div class="pr10">
                  <img class="avatar" :src="item.headimgurl" onerror="javascript:this.src='https://tosqy.boka.cn/images/user.jpg';" />
                </div>
                <div class="flex_cell flex_left">{{item.linkman}}</div>
                <div class="flex_right pl10">
                  <div class="btn" @click="expandEvent(item)">
                    <span class="al al-asmkticon0165"></span>
                  </div>
                </div>
              </div>
              <div v-if="item.checked">
                <div class="info-area w_100 font14 color-gray b_bottom_after">
                  <div class="txt-item" @click="btnDetail(index)">性别: {{item.sexname}}</div>
                  <div class="txt-item db-flex" v-if="item.mobile && item.mobile != ''" @click="toPhone(item)">手机: <span>{{item.mobile}}</span><div class="phone bg-red1 ml5"><span class="al al-dianhua font16"></span></div></div>
                  <div class="txt-item" @click="btnDetail(index)">地区: {{ item.country }} {{ item.province }} {{ item.city }}</div>
                  <div class="txt-item flex_left" @click="clickYingxiangli">影响力:
                    <span class="color-red4">{{item.yingxiangli}}</span>
                    <span class="al al-wenhao font20 ml5"></span>
                  </div>
                  <div class="txt-item">推荐人: {{item.recommendname}}</div>
                  <div class="txt-item" v-if="item.uid != loginUser.uid">客户类型: {{item.customertype}}</div>
                  <div class="txt-item">获客时间: {{item.dateline_str}}</div>
                </div>
                <div class="flex_center bg-white h40">
                  <div class="t-table align_center color-gray2 font14 color-gray2">
                    <div class="t-cell v_middle b_right_after">
                      <div>联系TA</div>
                    </div>
                    <div class="t-cell v_middle" @click="toView(item)">更多</div>
                  </div>
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
            <div v-for="(item,index) in listData2" :key="index" class="scroll_item">
              <div class="flex_left">
                <div class="pr10">
                  <img class="avatar" :src="item.headimgurl" onerror="javascript:this.src='https://tosqy.boka.cn/images/user.jpg';" />
                </div>
                <div class="flex_cell flex_left">{{item.linkman}}</div>
                <div class="flex_right pl10">
                  <div class="btn" @click="expandEvent(item)">
                    <span class="al al-asmkticon0165"></span>
                  </div>
                </div>
              </div>
              <div v-if="item.checked">
                <div class="info-area w_100 font14 color-gray b_bottom_after">
                  <div class="txt-item" @click="btnDetail(index)">性别: {{item.sexname}}</div>
                  <div class="txt-item db-flex" v-if="item.mobile && item.mobile != ''" @click="toPhone(item)">手机: <span>{{item.mobile}}</span><div class="phone bg-red1 ml5"><span class="al al-dianhua font16"></span></div></div>
                  <div class="txt-item" @click="btnDetail(index)">地区: {{ item.country }} {{ item.province }} {{ item.city }}</div>
                  <div class="txt-item flex_left" @click="clickYingxiangli">影响力:
                    <span class="color-red4">{{item.yingxiangli}}</span>
                    <span class="al al-wenhao font20 ml5"></span>
                  </div>
                  <div class="txt-item">推荐人: {{item.recommendname}}</div>
                  <div class="txt-item" v-if="item.uid != loginUser.uid">客户类型: {{item.customertype}}</div>
                  <div class="txt-item">获客时间: {{item.dateline_str}}</div>
                </div>
                <div class="flex_center bg-white h40">
                  <div class="t-table align_center color-gray2 font14 color-gray2">
                    <div class="t-cell v_middle b_right_after">
                      <div>联系TA</div>
                    </div>
                    <div class="t-cell v_middle" @click="toView(item)">更多</div>
                  </div>
                </div>
              </div>
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
              <div class="flex_left">
                <div class="pr10">
                  <img class="avatar" :src="item.headimgurl" onerror="javascript:this.src='https://tosqy.boka.cn/images/user.jpg';" />
                </div>
                <div class="flex_cell flex_left">{{item.linkman}}</div>
                <div class="flex_right pl10">
                  <div class="btn" @click="expandEvent(item)">
                    <span class="al al-asmkticon0165"></span>
                  </div>
                </div>
              </div>
              <div v-if="item.checked">
                <div class="info-area w_100 font14 color-gray b_bottom_after">
                  <div class="txt-item" @click="btnDetail(index)">性别: {{item.sexname}}</div>
                  <div class="txt-item db-flex" v-if="item.mobile && item.mobile != ''" @click="toPhone(item)">手机: <span>{{item.mobile}}</span><div class="phone bg-red1 ml5"><span class="al al-dianhua font16"></span></div></div>
                  <div class="txt-item" @click="btnDetail(index)">地区: {{ item.country }} {{ item.province }} {{ item.city }}</div>
                  <div class="txt-item flex_left" @click="clickYingxiangli">影响力:
                    <span class="color-red4">{{item.yingxiangli}}</span>
                    <span class="al al-wenhao font20 ml5"></span>
                  </div>
                  <div class="txt-item">推荐人: {{item.recommendname}}</div>
                  <div class="txt-item" v-if="item.uid != loginUser.uid">客户类型: {{item.customertype}}</div>
                  <div class="txt-item">获客时间: {{item.dateline_str}}</div>
                </div>
                <div class="flex_center bg-white h40">
                  <div class="t-table align_center color-gray2 font14 color-gray2">
                    <div class="t-cell v_middle b_right_after">
                      <div>联系TA</div>
                    </div>
                    <div class="t-cell v_middle" @click="toView(item)">更多</div>
                  </div>
                </div>
              </div>
            </div>
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

export default {
  directives: { TransferDom },
  components: { Tab, TabItem, Popup },
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
    expandEvent (item) {
      item.checked = !item.checked
    },
    clickYingxiangli () {
      this.showYxlModal = true
    },
    closeYxlModal () {
      this.showYxlModal = false
    },
    clickTab (index) {
      this.selectedIndex = parseInt(index)
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
      console.log('in getlist2')
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
    refresh (query) {
      this.loginUser = User.get()
      this.query = this.$route.query
      this.initData()
      this.getList1()
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
