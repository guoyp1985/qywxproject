/*
* @description: 群群推群列表组件(群主)
* @auther: simon
* @created_date: 2019-1-4
*/
<template>
  <div class="room">
    <div class="room-info">
      <div class="room-desc db-flex">
        <div class="room-avatar flex_cell flex-3">
          <img class="v_middle imgcover" src="https://tossharingsales.boka.cn/images/nopic.jpg" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
          <div class="room-topic">
            <div class="font16">{{item.title}}</div>
            <div class="font13">单数: {{item.sales}}</div>
          </div>
        </div>
        <div class="room-status flex_cell flex_right">
          <span class="font13 color-white">{{statusName}}</span>
        </div>
      </div>
    </div>
    <div class="room-stats" v-if="item.members">
      <div class="db-flex font13 color-gray">
        <div class="flex_cell">
          <div>
            <span>群人数:</span>
            <span>{{item.members}}</span>
          </div>
          <div>
            <span>男/女/未知:</span>
            <span>{{item.sexrate}}</span>
          </div>
          <div>
            <span>地域分析:</span>
            <span>无</span>
          </div>
        </div>
        <div class="flex_cell">
          <div>
            <span>群活跃度:</span>
            <span>{{item.liveness}}</span>
          </div>
          <div>
            <span>鉴定类型:</span>
            <span>无</span>
          </div>
          <div>
            <span>综合评分:</span>
            <span>{{item.score}}</span>
          </div>
        </div>
      </div>
      <div class="stats-result">
        <span>评估结果: ￥</span>
        <span>{{item.viewmoney}}/人点击</span>
      </div>
    </div>
    <div v-if="item.moderate === 0" class="room-operate-area db-flex">
      <div class="flex_cell font13 button color-red">正在评估</div>
      <div class="flex_cell font13 button" @click="action(3)">关闭</div>
    </div>
    <div v-if="item.moderate === 1" class="room-operate-area db-flex">
      <div class="flex_cell font13 button" @click="action(0)">重新评估</div>
      <div class="flex_cell font13 button" @click="action(2)">立即开放</div>
    </div>
    <div v-if="item.moderate === 2" class="room-operate-area db-flex">
      <div class="flex_cell font13 button" @click="action(0)">重新评估</div>
      <div class="flex_cell font13 button" @click="action(3)">关闭</div>
    </div>
    <div v-if="item.moderate === 3" class="room-operate-area db-flex">
      <div class="flex_cell font13 button" @click="action(0)">重新评估</div>
      <div class="flex_cell font13 button" @click="action(2)">立即开放</div>
    </div>
  </div>
</template>
<script>
const STATUS_NAME = ['待评估', '已评估', '开放', '关闭']
export default {
  name: 'Room',
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
    }
  },
  computed: {
    statusName () {
      return STATUS_NAME[this.item.moderate]
    }
  },
  methods: {
    action (status) {
      this.$emit('action', this.item, status)
    }
  }
}
</script>
<style lang="less">
.room {
  background-color: #ffffff;
}
.room .room-info, .room-stats {
  padding: 10px;
  border-bottom: 1px solid #f0f0f0;
}
.room .room-info .room-avatar img{
  width: 64px;
  height: 64px;
}
.room .room-info .room-topic {
  margin-left: 10px;
  vertical-align: middle;
  display: inline-block;
}
.room .room-status span {
  border-radius: 20px;
  padding: 3px 6px;
  border: 1px solid @boka-red;
  background-color: @boka-red;
}
.room .stats-result {
  margin-top: 10px;
  text-align: center;
}
.room .button {
  padding: 10px 0;
  text-align: center;
  position: relative;
}
.room .button:first-child:after {
  content: ' ';
  height: 20px;
  border-left: 1px solid #f0f0f0;
  position: absolute;
  right: 0;
}
.room .room-operate-area {
  border-bottom: 1px solid #f0f0f0;
}
</style>
