/*
* @description: 群详细信息页
* @auther: simon
* @created_date: 2019-1-7
*/
<template>
  <div id="room-details">
    <div class="room-profile db-flex">
      <div class="room-avatar flex_cell color-white">
        <img class="v_middle imgcover" :src="roomAvatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
        <div class="room-topic">
          <div class="font16">{{roomTopic}}</div>
          <div class="font13">综合评分: {{roomScore}}分</div>
        </div>
      </div>
      <div class="operation-area flex_cell flex_right">
        <router-link :to="{ name: 'tRoomOrderDeal', params: {id: roomId} }">
          <span class="font13">交易</span>
        </router-link>
      </div>
    </div>
    <group>
      <cell title="群人数" value="value"></cell>
      <cell title="男女比例" value="value"></cell>
      <cell title="地域分析" value="value"></cell>
      <cell title="销量" value="value"></cell>
      <cell title="群信用度" value="value"></cell>
      <cell title="群属性" value="value"></cell>
      <cell title="群活跃度" value="value"></cell>
      <cell title="单次点击价格" value="value"></cell>
      <cell title="更新时间" value="value"></cell>
    </group>
  </div>
</template>
<script>
import { Group, Cell } from 'vux'
export default {
  components: {
    Group, Cell
  },
  data () {
    return {
      roomId: 1,
      roomTopic: 'unkown',
      roomScore: 100,
      roomAvatar: 'https://tossharingsales.boka.cn/images/nopic.jpg'
    }
  }
}
</script>
<style lang="less">
#room-details .weui-cells {
  margin-top: 10px;
  font-size: 15px;
}
#room-details .room-profile {
  background-color: @boka-red;
  padding: 10px;
}
#room-details .room-profile .room-avatar img{
  width: 64px;
  height: 64px;
}
#room-details .room-profile .room-topic {
  margin-left: 10px;
  vertical-align: middle;
  display: inline-block;
}
#room-details .operation-area span {
  border-radius: 20px;
  padding: 2px 18px;
  border: 1px solid #ffffff;
  background-color: #ffffff;
  color: @boka-red;
}
</style>
