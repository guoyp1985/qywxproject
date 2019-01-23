/*
* @description: 群浏览页
* @auther: simon
* @created_date: 2019-1-7
*/
<template>
  <div id="rooms" class="containerarea font14 s-havebottom">
    <div class="s-topbanner s-topbanner1 sort-header db-flex">
      <div class="flex_cell sort-cell" :class="{'sorted': selectIndex === 0}" @click="sortHandle(0)">
        <span :class="{'asc': sortTotal === true, 'desc': sortTotal === false}">综合</span>
      </div>
      <div class="flex_cell sort-cell" :class="{'sorted':  selectIndex === 1}" @click="sortHandle(1)">
        <span :class="{'asc': sortTime === true, 'desc': sortTime === false}">时间</span>
      </div>
      <div class="flex_cell sort-cell" :class="{'sorted':  selectIndex === 2}" @click="sortHandle(2)">
        <span :class="{'asc': sortSales === true, 'desc': sortSales === false}">单数</span>
      </div>
      <div class="flex_cell sort-cell" :class="{'sorted':  selectIndex === 3}" @click="sortHandle(3)">
        <span :class="{'asc': sortPrice === true, 'desc': sortPrice === false}">价格</span>
      </div>
    </div>
    <div ref="scrollContainer" class="s-container s-container1 scroll-container" @scroll="handleScroll">
      <template v-if="loadCompleted">
        <template v-if="rooms.length">
          <room-view v-for="(item, index) in rooms" :key="index" :item="item">
            <div class="font13" slot="sort-key">
              <span v-if="selectIndex === 0">评分: {{item.score}}</span>
              <span v-if="selectIndex === 1">时间: {{item.dateline | formatDate}}</span>
              <span v-if="selectIndex === 2">单数: {{item.sales}}</span>
              <span v-if="selectIndex === 3">价格: ￥{{item.viewmoney}}/人点击</span>
            </div>
            <div slot="operation-area" class="room-operate-area db-flex">
              <router-link class="flex_cell font13 button" :to="{ name: 'tRoomDetails', query: {id: item.id} }">了解更多</router-link>
              <router-link class="flex_cell font13 button" :to="{ name: 'tRoomOrderDeal', query: {id: item.id} }">与TA交易</router-link>
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
    <router-link class="s-bottom submit-button color-white" :to="{ name: 'tRoomOrders' }">
      <span>订单列表</span>
    </router-link>
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
      selectIndex: -1,
      sortTotal: null,
      sortTime: null,
      sortSales: null,
      sortPrice: null,
      loadCompleted: true,
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
    sortHandle (i) {
      this.selectIndex = i
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
          _this.loadData()
        }
      })
    },
    refresh () {
      this.loadData()
    },
    loadData (sortKey, isAsc) {
      const params = {from: 'other', orderby: sortKey, ascdesc: isAsc ? 'asc' : 'desc', limit: this.limit, pagestart: this.pageStart}
      this.$http.post(`${ENV.BokaApi}/api/groups/myGroups`, params)
      .then(res => {
        if (res.data.flag === 1) {
          const data = res.data.data
          data.length && this.pageStart++
          this.rooms = this.rooms.concat(data)
        }
      })
    }
  },
  activated () {
    this.refresh()
  }
}
</script>
<style lang="less">
#rooms .sort-header {
  border-bottom: 1px solid #f0f0f0;
  text-align: center;
  line-height: 44px;
  background: #ffffff;
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
