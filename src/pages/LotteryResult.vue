<style lang="less">
.user-card-list-page{
  width:100%;height:100%;overflow-y:auto;
  .scroll_list{
    padding:10px;box-sizing: border-box;
    .scroll_item:not(:first-child){margin-top:10px;}
    .scroll_item{
      width: 100%;position:relative;
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
  <div class="user-card-list-page" ref="scrollContainer1" @scroll="handleScroll('scrollContainer1')">
    <template v-if="disList1">
      <div v-if="(!listData1 || !listData1.length) && !giveProduct" class="flex_empty">暂无数据</div>
      <div v-else class="scroll_list">
        <div v-for="(item,index) in listData1" :key="index" :class="`scroll_item `">
          <div class="box-outer">
            <div class="box-title bold font18" style="color:#f94929;">{{item.day}}</div>
            <div class="padding10">{{item.title}}</div>
          </div>
        </div>
      </div>
      <div class="load-end-area loading" v-if="isLoading1"></div>
      <div class="load-end-area done" v-else-if="isDone1"></div>
    </template>
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
      tabLeft: 0,
      cardObject: {
        newcustomer: '新人优惠券',
        singlecard: '专属优惠券'
      },
      giveProduct: null
    }
  },
  methods: {
    toUse (item) {
      if (item.remark && item.remark !== '') {
        this.$router.push({path: '/multiCardList', query: {shopid: item.remark}})
      } else {
        this.$router.push({path: '/card', query: {id: item.id, frompage: 'user'}})
      }
    },
    getList1 () {
      let params = {page: this.pagestart1, limit: this.limit}
      this.$http.get(`${ENV.BokaApi}/api/tableindex/lotteryResult`, {
        params: params
      }).then(res => {
        let data = res.data
        this.$vux.loading.hide()
        this.isLoading1 = false
        if (data.giveproduct) {
          this.giveProduct = data.giveproduct
        }
        let retdata = data.data ? data.data : data
        for (var i = 0; i < retdata.length; i++) {
          let curd = retdata[i]
          curd.usedateline_str = new Time(curd.usedateline * 1000).dateFormat('yyyy-MM-dd hh:mm')
          curd.startdate_str = new Time(curd.startdate * 1000).dateFormat('yyyy-MM-dd')
          let now = new Date().getTime()
          if (now >= curd.startdate * 1000) curd.canuse = true
        }
        this.listData1 = this.listData1.concat(retdata)
        this.disList1 = true
        if (this.listData1.length && retdata.length < this.limit) {
          this.isDone1 = true
        }
      })
    },
    handleScroll (refname) {
      const scrollarea = this.$refs[refname][0] ? this.$refs[refname][0] : this.$refs[refname]
      this.$util.scrollEvent({
        element: scrollarea,
        callback: () => {
          if (this.isLoading1 || this.isDone1) return false
          if (this.listData1.length === this.pagestart1 * this.limit) {
            this.pagestart1++
            this.isLoading1 = true
            this.getList1()
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
      this.getList1()
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
      } else {
        this.$refs.scrollContainer1.scrollTop = this.pageTop
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    if (document.querySelector('.vux-tab')) {
      this.tabLeft = document.querySelector('.vux-tab').scrollLeft
    }
    this.pageTop = this.$refs.scrollContainer1.scrollTop
    next()
  }
}
</script>
