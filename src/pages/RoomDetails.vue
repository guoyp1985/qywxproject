/*
* @description: 群详细信息页
* @auther: simon
* @created_date: 2019-1-7
*/
<template>
  <div id="room-details">
    <div class="room-profile db-flex">
      <div class="room-avatar flex_cell flex-3 clamp1 color-white">
        <img class="v_middle imgcover" :src="room.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
        <div class="room-topic">
          <div class="font15">{{room.title}}</div>
          <div class="font13">综合评分: {{room.score}}分</div>
        </div>
      </div>
      <div class="operation-area flex_right" style="width:65px;">
        <router-link :to="{ name: 'tRoomOrderDeal', query: {id: room.id} }">
          <span class="font13">交易</span>
        </router-link>
      </div>
    </div>
    <group>
      <cell title="群人数" :value="room.members"></cell>
      <cell title="男/女/未知" :value="room.sexrate"></cell>
      <!-- <cell title="地域分析" value="无"></cell> -->
      <cell title="接单数" :value="room.sales"></cell>
      <!-- <cell title="群信用度" value="无"></cell> -->
      <!-- <cell title="群属性" value="无"></cell> -->
      <cell title="群活跃度" :value="`${room.liveness}%`"></cell>
      <cell title="单次点击价格" :value="`￥${room.viewmoney}`"></cell>
      <cell title="更新时间" :value="room.dateline | formatDate"></cell>
    </group>
  </div>
</template>
<script>
import { Group, Cell } from 'vux'
import Time from '#/time'
import ENV from 'env'
export default {
  components: {
    Group, Cell
  },
  data () {
    return {
      room: {}
    }
  },
  filters: {
    formatDate (seconds) {
      return new Time(seconds * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  methods: {
    loadData () {
      const id = this.$route.query.id
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/groups/groupInfo`, {id: id})
      .then(res => {
        this.$vux.loading.hide()
        if (res.data.flag === 1) {
          this.room = res.data.data
        }
      })
    }
  },
  activated () {
    this.loadData()
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
