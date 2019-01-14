/*
* @description: 群群推群列表组件(客户)
* @auther: simon
* @created_date: 2019-1-7
*/
<template>
  <div class="room-view">
    <div class="room-info">
      <div class="room-desc db-flex">
        <div class="room-avatar flex_cell">
          <img class="v_middle imgcover" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
          <div class="room-topic">
            <div class="font16">{{item.topic}}</div>
            <slot name="sort-key"></slot>
          </div>
        </div>
        <div class="more-area flex_cell flex_right">
          <span class="more-btn font13 color-white" @click="toggleDetails">
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
              <span>{{item.memberStats}}</span>
            </div>
            <div>
              <span>男女比例:</span>
              <span>{{item.ganderStats}}</span>
            </div>
            <div>
              <span>地域分析:</span>
              <span>{{item.locationStats}}</span>
            </div>
            <div>
              <span>销量:</span>
              <span>{{item.salesVolume}}</span>
            </div>
          </div>
          <div class="flex_cell">
            <div>
              <span>群活跃度:</span>
              <span>{{item.activity}}</span>
            </div>
            <div>
              <span>鉴定类型:</span>
              <span>{{item.type}}</span>
            </div>
            <div>
              <span>综合评分:</span>
              <span>{{item.score}}</span>
            </div>
            <div>
              <span>更新时间:</span>
              <span>{{item.updatedTime}}</span>
            </div>
          </div>
        </div>
        <div class="stats-result">
          <span>评估结果: ￥</span>
          <span>{{item.statsResult}}/人点击</span>
        </div>
      </div>
      <slot name="operation-area"></slot>
    </template>
  </div>
</template>
<script>
export default {
  name: 'RoomView',
  props: {
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
}
.room-view .room-info, .room-stats {
  padding: 10px;
  border-bottom: 1px solid #f0f0f0;
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
  margin-top: 10px;
  text-align: center;
}
.room-view .more-btn {
  border-radius: 20px;
  padding: 2px 18px;
  border: 1px solid @boka-red;
  background-color: @boka-red;
}
</style>
