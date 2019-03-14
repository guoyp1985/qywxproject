/*
* @description: 群浏览页
* @auther: simon
* @created_date: 2019-1-7
*/
<template>
  <div id="rooms" class="containerarea font14 s-havebottom">
    <!-- <div class="imgitem" @click="toStart">
      <div class="inner">
        <img src="../assets/images/quntui.png" />
      </div>
    </div> -->
    <div class="s-topbanner s-topbanner1 sort-header db-flex"><!-- s-topbanner -->
      <div class="flex_cell sort-cell" :class="{'sorted': selectIndex === 0}" @click="sortHandle(0)">
        <span :class="{'desc': sortTotal === true, 'asc': sortTotal === false}">综合</span>
      </div>
      <div class="flex_cell sort-cell" :class="{'sorted':  selectIndex === 1}" @click="sortHandle(1)">
        <span :class="{'desc': sortTime === true, 'asc': sortTime === false}">时间</span>
      </div>
      <div class="flex_cell sort-cell" :class="{'sorted':  selectIndex === 2}" @click="sortHandle(2)">
        <span :class="{'desc': sortSales === true, 'asc': sortSales === false}">接单数</span>
      </div>
      <div class="flex_cell sort-cell" :class="{'sorted':  selectIndex === 3}" @click="sortHandle(3)">
        <span :class="{'desc': sortPrice === true, 'asc': sortPrice === false}">价格</span>
      </div>
    </div>
    <div ref="scrollContainer" class="s-container s-container1 scroll-container" @scroll="handleScroll">
      <template v-if="loadCompleted">
        <template v-if="rooms.length">
          <room-view v-for="(item, index) in rooms" :key="index" :item="item">
            <div class="font13" slot="sort-key">
              <span v-if="selectIndex === 0">
                <div>群人数: {{item.members}}<span class="ml10">点击价值: ￥{{item.viewmoney}}</span></div>
                评分: {{item.score}}
              </span>
              <span v-if="selectIndex === 1">
                <div>群人数: {{item.members}}<span class="ml10">点击价值: ￥{{item.viewmoney}}</span></div>
                时间: {{item.dateline | formatDate}}
              </span>
              <span v-if="selectIndex === 2">
                <div>群人数: {{item.members}}<span class="ml10">点击价值: ￥{{item.viewmoney}}</span></div>
                接单数: {{item.sales}}
              </span>
              <span v-if="selectIndex === 3">
                <div>群人数: {{item.members}}<span class="ml10">点击价值: ￥{{item.viewmoney}}</span></div>
              </span>
            </div>
            <div slot="operation-area" class="room-operate-area db-flex">
              <div class="flex_cell font13 button" @click="toRoomDetails(item)">了解更多</div>
              <div class="flex_cell font13 button" @click="toOrderDeal(item)">与TA交易</div>
            </div>
          </room-view>
        </template>
        <template v-else>
          <div class="no-related-x color-gray">
            <span>还没有群信息</span>
          </div>
        </template>
      </template>
    </div>
    <div class="s-bottom submit-button color-white" @click="toMyOrder">
      <span>我的订单</span>
    </div>
  </div>
</template>
<script>
import { XButton } from 'vux'
import RoomView from '@/components/RoomView'
import Time from '#/time'
import ENV from 'env'
export default {
  components: {
    XButton, RoomView
  },
  data () {
    return {
      query: {},
      selectIndex: 0,
      sortTotal: true,
      sortTime: null,
      sortSales: null,
      sortPrice: null,
      loadCompleted: false,
      limit: 10,
      pageStart: 0,
      rooms: []
    }
  },
  filters: {
    formatDate (seconds) {
      return new Time(seconds * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  methods: {
    toMyOrder () {
      let params = {}
      if (this.query.from) {
        params.from = this.query.from
      }
      this.$router.push({path: '/roomOrders', query: params})
    },
    toRoomDetails (item) {
      let params = {id: item.id}
      if (this.query.from) {
        params.from = this.query.from
      }
      this.$router.push({path: '/roomDetails', query: params})
    },
    toOrderDeal (item) {
      let params = {id: item.id}
      if (this.query.from) {
        params.from = this.query.from
      }
      this.$router.push({path: '/roomOrderDeal', query: params})
    },
    toStart () {
      this.$router.push('/roomStart?frompage=rooms')
    },
    sortHandle (i) {
      this.selectIndex = i
      this.loadCompleted = false
      this.pageStart = 0
      this.rooms = []
      switch (i) {
        case 0:
          this.sortTotal = !this.sortTotal
          this.sortTime = null
          this.sortSales = null
          this.sortPrice = null
          this.loadData('score', this.sortTotal)
          break
        case 1:
          this.sortTotal = null
          this.sortTime = !this.sortTime
          this.sortSales = null
          this.sortPrice = null
          console.log(this.sortTime)
          this.loadData('dateline', this.sortTime)
          break
        case 2:
          this.sortTotal = null
          this.sortTime = null
          this.sortSales = !this.sortSales
          this.sortPrice = null
          this.loadData('sales', this.sortSales)
          break
        case 3:
          this.sortTotal = null
          this.sortTime = null
          this.sortSales = null
          this.sortPrice = !this.sortPrice
          this.loadData('viewmoney', this.sortPrice)
          break
      }
    },
    kownMore () {
    },
    makeDeal () {
    },
    handleScroll () {
      const _this = this
      this.$util.scrollEvent({
        element: this.$refs.scrollContainer,
        callback: () => {
          if (_this.rooms.length === (_this.pageStart + 1) * _this.limit) {
            _this.pageStart++
            switch (_this.selectIndex) {
              case 0:
                this.loadData('score', this.sortTotal)
                break
              case 1:
                this.loadData('dateline', this.sortTime)
                break
              case 2:
                this.loadData('sales', this.sortSales)
                break
              case 3:
                this.loadData('viewmoney', this.sortPrice)
                break
            }
            // _this.loadData()
          }
        }
      })
    },
    refresh () {
      this.selectIndex = 0
      this.loadCompleted = false
      this.pageStart = 0
      this.rooms = []
      this.sortTotal = true
      this.sortTime = null
      this.sortSales = null
      this.sortPrice = null
      this.loadData('score', this.sortTotal)
    },
    loadData (sortKey, isAsc) {
      const params = {from: 'other', orderby: sortKey, ascdesc: isAsc ? 'desc' : 'asc', limit: this.limit, pagestart: this.pageStart}
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/groups/myGroups`, params)
      .then(res => {
        this.$vux.loading.hide()
        if (res.data.flag === 1) {
          const data = res.data.data
          this.rooms = this.rooms.concat(data)
          this.loadCompleted = true
        }
      })
    }
  },
  activated () {
    this.query = this.$route.query
    this.pageStart = 0
    this.rooms = []
    this.refresh()
  }
}
</script>
<style lang="less">
// #rooms .s-container.s-container1{top:209px;}
#rooms .imgitem{
  position:relative;width:100%;padding-bottom:43%;box-shadow: 0px 0px 3px 1px #e6ebed;
  .inner{position:absolute;top:0;bottom:0;left:0;right:0;}
  img{width:100%;height:100%;}
}
#rooms .sort-header {
  border-bottom: 1px solid #f0f0f0;
  text-align: center;
  line-height: 44px;
  background: #ffffff;
  // box-shadow: 0px 0px 3px 1px #e6ebed;
  // top:165px;
}
#rooms .sort-header span {
  position: relative;
}
#rooms .sort-header .sort-cell .asc:after,
#rooms .sort-header .sort-cell .desc:after {
  content: ' ';
  transition: transform 0.3s;
  width:0;
  height:0;
  border-width:0 6px 6px;
  border-style:solid;
  border-color:transparent transparent @boka-red;
  position: absolute;
}
#rooms .sort-header .sort-cell .asc:after {
  top: 5px;
  right: -15px;
  transform: rotate(0);
}
#rooms .sort-header .sort-cell .desc:after {
  top: 6px;
  right: -16px;
  transform: rotate(180deg);
}
#rooms .sort-header .sorted {
  color: red;
}
#rooms .submit-button {
  background-color: @boka-red;
  line-height: 45px;
  text-align: center;
}
#rooms .button {
  padding: 10px 0;
  text-align: center;
  position: relative;
}
#rooms .button:first-child:after {
  content: ' ';
  height: 20px;
  border-left: 1px solid #f0f0f0;
  position: absolute;
  right: 0;
}
// #rooms .room-operate-area {
//   border-bottom: 1px solid #f0f0f0;
// }
</style>
