<template>
  <div class="containerarea font14">
    <div class="s-topbanner" style="height:44px;">
      <div class="row">
        <div class="bg"></div>
        <div class="flex_center h_100 toprow">
          <div class="flex_cell font18 pl20">{{$t('Message')}}</div>
        </div>
      </div>
    </div>
    <div class="s-container" style="top:44px;">
      <div class="scroll_list pl10 pr10">
        <div class="scroll_item pt10 pb10" v-for="(item,index) in messagedata" :key="item.id">
          <div class="t-table">
            <div class="t-cell v_middle align_left" style="width:50px;">
              <img :src="item.avatar" class="avatarimg1" />
            </div>
            <div class="t-cell v_middle align_left">
              <div class="clamp1"><span class="mr5">{{ item.username }}</span><span :class="item.dateline | getdateclass">{{ item.dateline | getdatestate }}</span></div>
              <div class="clamp1 font12 color-gray">{{ item.title }}</div>
              <div class="clamp1 color-gray font12">{{ item.dateline | dateformat }}</div>
            </div>
            <div v-if="item.unreadNumber > 0" class="t-cell v_middle align_right" style="width:60px;">
              <div class="qbtn6 bg-green color-white">{{ item.unreadNumber }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<i18n>
Message:
  zh-CN: 消息
</i18n>

<script>
import Time from '../../libs/time'

export default {
  components: {
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    },
    getdatestate: function (dt) {
      let newtime = new Time(dt * 1000)
      let year = newtime.year()
      let month = newtime.month()
      let date = newtime.date()
      let nowtime = new Time(new Date())
      let nowyear = nowtime.year()
      let nowmonth = nowtime.month()
      let nowdate = nowtime.date()
      let state = ''
      if (year === nowyear && month === nowmonth) {
        if (date === nowdate) {
          state = '今'
        } else if (date + 1 === nowdate) {
          state = '昨'
        } else if (date + 2 === nowdate) {
          state = '前'
        }
      }
      return state
    },
    getdateclass: function (dt) {
      let newtime = new Time(dt * 1000)
      let year = newtime.year()
      let month = newtime.month()
      let date = newtime.date()
      let nowtime = new Time(new Date())
      let nowyear = nowtime.year()
      let nowmonth = nowtime.month()
      let nowdate = nowtime.date()
      let state = ''
      let ret = 'datestate '
      if (year === nowyear && month === nowmonth) {
        if (date === nowdate) {
          state = '今'
        } else if (date + 1 === nowdate) {
          state = '昨'
        } else if (date + 2 === nowdate) {
          state = '前'
        }
      }
      if (state !== '') {
        console.log(state === '前')
        if (state === '今') {
          ret += 'today'
        } else if (state === '昨') {
          ret = 'yestoday'
        } else if (state === '前') {
          ret += ''
        } else {
          ret += 'hide'
        }
      }
      return ret
    }
  },
  data () {
    return {
      messagedata: [
        {
          id: '1', uid: '51', dateline: 1523343456, title: 'hello', username: '贪吃小松鼠', unreadNumber: 1, avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/51.jpg'
        },
        {
          id: '2', uid: '272', dateline: 1523179256, title: 'hello', username: 'zxj', unreadNumber: 0, avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/272.jpg'
        },
        {
          id: '3', uid: '29', dateline: 1522221270, title: 'hello', username: '网络影响力', unreadNumber: 1, avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/29.jpg'
        },
        {
          id: '4', uid: '4', dateline: 1522221270, title: 'hello', username: '楚风越韵  🏠', unreadNumber: 0, avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/4.jpg'
        },
        {
          id: '5', uid: '2', dateline: 1522221270, title: 'hello', username: '仇红波', unreadNumber: 1, avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/2.jpg'
        }
      ]
    }
  },
  methods: {
  }
}
</script>

<style lang="less">
</style>
