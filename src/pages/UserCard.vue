<style lang="less">
.user-card-list-page{
  .s-container{bottom:50px;overflow-y:auto;}
  .scroll_list{
    padding:20px;box-sizing: border-box;
    .scroll_item:not(:first-child){margin-top:20px;}
    .scroll_item{
      width: 100%;position:relative;background-color: #eb6b5e;color:#fff;
      display: flex;justify-content: center;align-items: center;
      .txt{color:#fff;}
    }
    .scroll_item.grayitem{
      background-color: #999;
      .txt{color:orange;}
    }
    .txt-cell{position:relative;padding-top:15px;padding-bottom:15px;padding-left:10px;box-sizing: border-box;}
    .txt-cell:after{
      content:"";display:block;
      border-right:#f5f9fa 1px dashed;
    	position: absolute;right: 0;top: 0;bottom:0px;
    	-webkit-transform: scaleX(0.5) translateX(0.5px);
    	transform: scaleX(0.5) translateX(0.5px);
    	-webkit-transform-origin: 0% 0%;
    	transform-origin: 0% 0%;
    }
    .forbid{position:relative;padding-top:30rpx;padding-bottom:15px;padding-left:10px;box-sizing: border-box;}
    .forbid:after{
      content:"";display:block;
      border-right:#f5f9fa 1px dashed;
    	position: absolute;right: 0;top: -13px;bottom:0px;
    	-webkit-transform: scaleX(0.5) translateX(0.5px);
    	transform: scaleX(0.5) translateX(0.5px);
    	-webkit-transform-origin: 0% 0%;
    	transform-origin: 0% 0%;
      height: 118px;
    }
    .scroll_item .ball{
      position: absolute;
      right: -14px;
      width: 30px;
      height: 30px;
      background-color: #f5f9fa;
      border-radius: 50%;
    }
    .scroll_item .ball-up{top: -15px;}
    .scroll_item .ball-down{bottom: -15px;}
    .scroll_item .pic{width:50px;}
    .scroll_item .pic image{width:40px;height:40px;border-radius:50%;}
    .btn-cell{width:90px;padding-top:15px;padding-bottom:15px;box-sizing: border-box;}
    .btn-cell .al{font-size:65px;}
    .btn-cell .icon-chat{margin-top:4px;}
    .rbtn{display:inline-block;padding:5px;border-radius:5px;background-color: #fff;}
  }
}
</style>
<template>
  <div class="containerarea user-card-list-page">
    <div class="s-topbanner s-topbanner1 bg-white">
      <div class="row">
        <tab v-model="selectedIndex" class="v-tab">
          <tab-item selected @on-item-click="clickTab(0)">未使用</tab-item>
          <tab-item @on-item-click="clickTab(1)">已使用</tab-item>
        </tab>
      </div>
    </div>
    <div class="s-container s-container1" style="bottom:0;">
      <div v-show="(selectedIndex == 0)" class="swiper-inner" ref="scrollContainer1" @scroll="handleScroll('scrollContainer1', 0)">
        <template v-if="disList1">
          <div v-if="!listData1 || !listData1.length" class="flex_empty">暂无数据</div>
          <div v-else class="scroll_list">
            <div v-for="(item,index) in listData1" :key="index" :class="`scroll_item ${item.validate <= 0 ? 'grayitem' : ''}`" @click="toUse(item)">
              <div class="flex_cell txt-cell" style="overflow:visible">
                <div class="font20 txt">满{{item.ordermoney}}减{{item.money}}</div>
                <div class="font12 w_100 flex_left">
                  <template v-if="item.limitpid">
                    <span class="w40">仅限【</span>
                    <span :class="`clamp1 producttitle ${item.producttitle.length >= 10 ? 'w120' : ''}`">{{item.producttitle}}</span>
                    <span class="w40">】使用</span>
                  </template>
                  <span v-else :class="`clamp1 producttitle ${item.producttitle.length >= 10 ? 'w120' : ''}`">{{item.producttitle}}</span>
                </div>
                <div class="font12">到期时间 {{item.deadline_str}}</div>
                <div class="ball ball-up"></div>
                <div class="ball ball-down"></div>
              </div>
              <div class="btn-cell flex_center" v-if="item.validate">
                <div class="rbtn color-theme">去使用</div>
              </div>
              <div class="flex_center" style="width:110px;" v-else>
                <span class="al al-yiguoqi" style="font-size:50px;"></span>
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
            <div v-for="(item,index) in listData2" :key="index" class="scroll_item grayitem">
              <div class="flex_cell txt-cell" style="overflow:visible">
                <div class="font20 txt">满{{item.ordermoney}}减{{item.money}}</div>
                <div class="font12 w_100 flex_left">
                  <template v-if="item.limitpid">
                    <span class="w40">仅限【</span>
                    <span :class="`clamp1 producttitle ${item.producttitle.length >= 10 ? 'w120' : ''}`">{{item.producttitle}}</span>
                    <span class="w40">】使用</span>
                  </template>
                  <span v-else :class="`clamp1 producttitle ${item.producttitle.length >= 10 ? 'w120' : ''}`">{{item.producttitle}}</span>
                </div>
                <div class="font12">到期时间 {{item.deadline_str}}</div>
                <div class="ball ball-up"></div>
                <div class="ball ball-down"></div>
              </div>
              <div class="btn-cell flex_center" v-if="item.used">
                <span class="al al-yishiyong1"></span>
              </div>
              <div class="flex_center" style="width:110px;" v-else-if="item.validate">
                <span class="al al-yiguoqi" style="font-size:50px;"></span>
              </div>
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
    toUse (item) {
      this.$vux.loading.show()
      this.$http.get(`${ENV.BokaApi}/api/card/useCard`, {
        params: {id: item.id}
      }).then(res => {
        let data = res.data
        this.$vux.loading.hide()
        this.$vux.toast.show({
          text: data.msg,
          type: 'text',
          time: this.$util.delay(data.msg)
        })
        if (data.code === 0) {
          this.refresh()
        }
      })
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
      let params = {page: this.pagestart1, limit: this.limit, used: 0}
      this.$http.get(`${ENV.BokaApi}/api/card/cardList`, {
        params: params
      }).then(res => {
        let data = res.data
        this.$vux.loading.hide()
        this.isLoading1 = false
        let retdata = data.data ? data.data : data
        for (var i = 0; i < retdata.length; i++) {
          retdata[i].usedateline_str = new Time(retdata[i].usedateline * 1000).dateFormat('yyyy-MM-dd hh:mm')
        }
        this.listData1 = this.listData1.concat(retdata)
        this.disList1 = true
        if (this.listData1.length && retdata.length < this.limit) {
          this.isDone1 = true
        }
      })
    },
    getList2 () {
      let params = {page: this.pagestart2, limit: this.limit, used: 1}
      this.$http.get(`${ENV.BokaApi}/api/card/cardList`, {
        params: params
      }).then(res => {
        let data = res.data
        this.$vux.loading.hide()
        this.isLoading2 = false
        let retdata = data.data ? data.data : data
        for (var i = 0; i < retdata.length; i++) {
          retdata[i].usedateline_str = new Time(retdata[i].usedateline * 1000).dateFormat('yyyy-MM-dd hh:mm')
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
