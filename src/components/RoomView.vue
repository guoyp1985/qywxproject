/*
* @description: 群群推群列表组件(发单方)
* @auther: simon
* @created_date: 2019-1-7
*/
<template>
  <div class="room-view">
    <div class="room-info" @click="toggleDetails">
      <div class="room-desc db-flex">
        <div class="room-avatar flex_cell flex-3">
          <img class="v_middle imgcover" :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
          <div class="room-topic">
            <div class="font16 clamp1" style="width:140px">{{item.title}}</div>
            <slot name="sort-key"></slot>
          </div>
        </div>
        <div v-if="routerPath === '/roomOrderDeal'" class="more-area flex_cell flex_right">
          <div class="font13 color-white more-btns" @click.stop="toggleDetails">
            <span class="al al-asmkticon0165"></span>
          </div>
        </div>
        <div v-else class="more-area flex_cell flex_right">
          <span class="more-btn font13 color-white" @click.stop="toggleDetails">
            <template v-if="openDetails">
              简约
            </template>
            <template v-else>
              详细
            </template>
          </span>
        </div>
      </div>
    </div>
    <template v-if="openDetails">
      <div class="room-stats">
        <div class="db-flex font13 color-gray">
          <div class="flex_cell">
            <div>
              <span>群人数:</span>
              <span>{{item.members}}</span>
            </div>
            <div class="mt5">
              <span>男/女/未知:</span>
              <span>{{item.sexrate}}</span>
            </div>
            <!-- <div>
              <span>地域分析:</span>
              <span>无</span>
            </div> -->
            <div class="mt5">
              <span>接单数:</span>
              <span>{{item.sales}}</span>
            </div>
          </div>
          <div class="flex_cell">
            <div>
              <span>群活跃度:</span>
              <span>{{item.liveness}}%</span>
            </div>
            <!-- <div>
              <span>鉴定类型:</span>
              <span>无</span>
            </div> -->
            <div class="mt5">
              <span>综合评分:</span>
              <span>{{item.score}}分</span>
            </div>
            <div class="mt5">
              <span>更新时间:</span>
              <span>{{item.dateline | formatDate}}</span>
            </div>
          </div>
        </div>
        <div v-if="routerPath === '/roomOrderDeal'" class="stats-result color-red">
          <span>点击价值: ￥</span>
          <span>{{item.viewmoney}}/人点击</span>
        </div>
        <div v-else class="stats-result">
          <span>点击价值: ￥</span>
          <span>{{item.viewmoney}}/人点击</span>
        </div>
      </div>
      <slot name="operation-area"></slot>
    </template>
  </div>
</template>
<script>
import Time from '#/time'
export default {
  name: 'RoomView',
  props: {
    routerPath: String,
    item: {
      type: Object,
      default: () => {
        return {
          topic: 'unkown',
          status: 0,
          avatar: 'https://tossharingsales.boka.cn/images/nopic.jpg'
        }
      }
    },
    showDetails: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      openDetails: this.showDetails
    }
  },
  filters: {
    formatDate (seconds) {
      return new Time(seconds * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  methods: {
    toggleDetails () {
      this.openDetails = !this.openDetails
    }
  }
}
</script>
<style lang="less">
.room-view {
  background-color: #ffffff;
  border-bottom: 1px solid #f0f0f0;
  box-shadow: 0px 0px 3px 1px #e6ebed;
}
.room-view:not(:first-child){margin-top:10px;}
.room-view .room-info, .room-view .room-stats {
  padding: 10px;
  position: relative;
}
.room-view .room-info:last-child:after,
.room-view .room-stats:last-child:after {
  content: ' ';
  height: 0px;
}
.room-view .room-info:after,
.room-view .room-stats:after {
  content: ' ';
  position: absolute;
  height: 1px;
  left: 10px;
  right: 10px;
  bottom: 0px;
  background-color: #f0f0f0;
}
.room-view .room-info .room-avatar img{
  width: 64px;
  height: 64px;
}
.room-view .room-info .room-topic {
  margin-left: 10px;
  vertical-align: middle;
  display: inline-block;
}
.room-view .room-status span {
  border-radius: 20px;
  padding: 3px 6px;
  border: 1px solid @boka-red;
  background-color: @boka-red;
}
.room-view .stats-result {
  margin-top: 20px;
  text-align: center;
}
.room-view .more-btn {
  border-radius: 20px;
  padding: 2px 18px;
  border: 1px solid @boka-red;
  background-color: @boka-red;
}
.room-view .more-btns{
  background-color:#EA3A3A;
  height: 25px;
  line-height: 25px;
  width: 60px;
  text-align: center;
  border-radius: 20px;
}
</style>
