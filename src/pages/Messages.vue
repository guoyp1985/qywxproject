/*
* @description: 消息页
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div id="message-list">
    <group>
      <group-title slot="title">{{$t('Message')}}</group-title>
      <cell v-for="(item, index) in list" :key="index" :title="item.userName" :value="item.date | dateFormat">
        <img class="user-avatar" slot="icon" style="display:block;margin-right:5px;" src="">
        <span slot="inline-desc">
          {{item.message}}
        </span>
      </cell>
    </group>
  </div>
</template>
<script>
import { GroupTitle, Group, Cell } from 'vux'
import Time from '#/time'
export default {
  components: {
    GroupTitle, Group, Cell
  },
  data () {
    return {
      list: [
        {
          avatar: '',
          userName: 'simon',
          message: '个人中心',
          date: 1522659301220
        }
      ]
    }
  },
  filters: {
    dateFormat (value) {
      return new Time(value).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  created () {

  }
}
</script>
<style lang="less" scoped>
#message-list .user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>
