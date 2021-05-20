<style lang="less">
.ing-orders-page.nobottom{
  .s-container{bottom:0;}
}
.ing-orders-page{
  .s-container{bottom:50px;overflow-y:auto;}
  .scroll_list{
    padding-top:10px;
    .scroll_item:not(:first-child){margin-top:12px;}
    .scroll_item{
      box-sizing: border-box;background-color:#fff;
      .btn{
        padding:0 10px;line-height:25px;
        background-color: #07c160;color:#fff;border:#07c160 2px solid;
        border-radius:5px; font-size:14px;font-weight:bold;
      }
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
  <div :class="`containerarea ing-orders-page nobottom`">
    <search
      class="v-search bg-white"
      v-model='searchword'
      :auto-fixed="1 == 0"
      @on-submit="onSubmit1"
      @on-change="onChange1"
      @on-cancel="onCancel1"
      placeholder="请输入餐桌号"
      ref="search">
    </search>
    <div class="s-container s-container1" ref="scrollContainer1" @scroll="handleScroll('scrollContainer1')">
      <template v-if="disList1">
        <div v-if="!listData1 || !listData1.length" class="flex_empty">
          <template v-if="afterSearch">暂无搜索结果</template><template v-else>暂无数据</template>
        </div>
        <div v-else class="scroll_list">
          <div v-for="(item,index) in listData1" :key="index" class="scroll_item b_bottom_after">
            <div class="flex_left b_top_after" style="width:100%;padding:10px;box-sizing:border-box;">
              <div class="flex_cell bold font16">{{item.storename}}【{{item.tableid}}】</div>
              <div class="flex_right color-gray font12">{{item.dateline_str}}</div>
            </div>
            <div class="b_top_after" v-for="(pitem,pindex) in item.orderlist" :key="pindex" style="width:100%;padding:10px;box-sizing:border-box;">
              <div class="flex_left">
                <span>{{pitem.name}}</span>
                <span v-if="pitem.options" class="color-gray">【{{pitem.options.title}}】</span>
              </div>
              <!-- <div v-if="pitem.options" class="color-gray">{{pitem.options.title}}</div> -->
              <div class="flex_left">
                <div class="flex_cell flex_left color-red">￥{{pitem.special}}</div>
                <div class="flex_right color-gray">× <span class="font12">{{ pitem.quantity }}</span></div>
              </div>
            </div>
            <div class="flex_left b_top_after" style="width:100%;padding:10px;box-sizing:border-box;">
              <div class="flex_cell flex_left">订单金额: <span class="color-red">￥</span><span class="font16 color-red">{{item.needpaymoney}}</span></div>
              <div class="flex_right">
                <div class="btn" @click="finishOrder(item,index)">线下付款</div>
              </div>
            </div>
          </div>
        </div>
        <div class="load-end-area loading" v-if="isLoading1"></div>
        <div class="load-end-area done" v-else-if="isDone1"></div>
      </template>
    </div>
    <!-- <div class="page-footer" v-if="loginUser && loginUser.isadmin">
      <router-link class="item" to="/addCommonCard">添加活动</router-link>
    </div> -->
  </div>
</template>

<script>
import { Tab, TabItem, Search } from 'vux'
import ENV from 'env'
import Time from '../../libs/time'
import { User } from '#/storage'

export default {
  components: { Tab, TabItem, Search },
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
      pageTop: 0,
      searchword: '',
      afterSearch: false,
      isIng: false
    }
  },
  methods: {
    finishOrder (item, index) {
      if (this.isIng) return false
      this.$vux.confirm.show({
        content: '请确认收银台已收到该笔付款？',
        onConfirm: () => {
          this.isIng = true
          this.$vux.loading.show()
          this.$http.get(`${ENV.BokaApi}/api/order/offlinePayOut`, {
            params: {id: item.id}
          }).then(res => {
            this.isIng = false
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
        }
      })
    },
    onSubmit1 () {
      this.disList1 = false
      this.listData1 = []
      this.pagestart1 = 1
      this.getList1()
    },
    onChange1 (val) {
      this.searchword = val
    },
    onCancel1 () {
      this.searchword = ''
      this.listData1 = []
      this.pagestart1 = 1
      this.getList1()
    },
    getList1 () {
      console.log('进入到了列表')
      let isSearch = false
      let params = {fromqy: 1, ordertype: 3, page: this.pagestart1, limit: this.limit}
      if (this.searchword && this.searchword !== '') {
        isSearch = true
        params.tableid = this.searchword
      }
      this.$http.get(`${ENV.BokaApi}/api/order/orderList`, {
        params: params
      }).then(res => {
        let data = res.data
        this.$vux.loading.hide()
        this.isLoading1 = false
        let retdata = data.data ? data.data : data
        for (var i = 0; i < retdata.length; i++) {
          retdata[i].dateline_str = new Time(retdata[i].dateline * 1000).dateFormat('yyyy-MM-dd hh:mm')
        }
        this.listData1 = this.listData1.concat(retdata)
        if (isSearch) {
          this.afterSearch = true
        } else {
          this.afterSearch = false
        }
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
    },
    refresh () {
      this.loginUser = User.get()
      this.initData()
      this.getList1()
    }
  },
  created () {
  },
  activated () {
    this.query = this.$route.query
    this.refresh()
    this.$refs.scrollContainer1.scrollTop = this.pageTop
  },
  beforeRouteLeave (to, from, next) {
    this.pageTop = this.$refs.scrollContainer1.scrollTop
    next()
  }
}
</script>
