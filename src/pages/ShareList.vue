<template>
  <div class="containerarea bg-white">
    <div class="s-topbanner s-topbanner1">
      <div class="row">
        <div class="bg"></div>
        <div class="flex_center h_100">
          <div class="flex_cell font18 pl20">{{ user.linkman }}{{$t('Share')}}</div>
        </div>
      </div>
    </div>
    <div class="s-container s-container1">
      <div style="position:absolute;left:0;top:0;right:0;">
        <search
          class="x-search"
          position="absolute"
          auto-scroll-to-top top="0px"
          @on-focus="onFocus"
          @on-cancel="onCancel"
          @on-submit="onSubmit"
          ref="search">
        </search>
      </div>
      <div style="position:absolute;left:0;top:44px;right:0;bottom:0;overflow-y:auto;">
        <div class="scroll_list pl10 pr10">
          <div class="scroll_item emptyitem flex_center" v-if="(!listdata || listdata.length == 0)">暂无分享数据</div>
          <div v-else v-for="item in listdata" :key="item.id" class="scroll_item padding10">
            <div class="t-table">
              <div class="t-cell v_middle" style="width:50px;height:50px;">
                <img :src="item.photo" style="width:40px;height:40px;" />
              </div>
              <div class="t-cell v_middle">
                <div class="clamp1"><span :class="item.dateline | getdateclass">{{ item.dateline | getdatestate }}</span>{{ item.title }}</div>
                <div class="clamp1 color-gray font12">
                  <span class="v_middle"><i class="al al-chakan font18 middle-cell pl5 pr5 color-b8b8b8"></i>{{item.views}}</span>
                  <span class="v_middle">{{ item.dateline | dateformat }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<i18n>
Contact customer:
  zh-CN: 联系客户
Customer text:
  zh-CN: 客户
Percent:
  zh-CN: 成交概率
</i18n>

<script>
import { Search } from 'vux'
import Time from '../../libs/time'

export default {
  components: {
    Search
  },
  created () {
    this.$store.commit('updateToggleTabbar', {toggleBar: false})
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
      user: {
        uid: 187,
        linkman: 'YOUNG'
      },
      listdata: [
        {
          id: '1', title: '医美运营营销36兵法攻略', dateline: 1523694550, visitor: 0, photo: 'http://gongxiaoshe.qiyeplus.com/data/upload//month_201713/15236697775676'
        },
        {
          id: '2', title: '商品1', dateline: 1523694550, visitor: 10, photo: 'http://ossgxs.boka.cn/month_201804/15236839495706.jpg'
        },
        {
          id: '3', title: 'YOUNG向你抛了一个媚眼，并诚恳的邀请你帮TA砍一刀！', dateline: 1521694550, visitor: 32, photo: 'http://ossgxs.boka.cn/month_201804/15226700508345.jpg'
        }
      ]
    }
  },
  methods: {
    setFocus () {
    },
    resultClick (item) {
    },
    getResult (val) {
    },
    onSubmit () {
    },
    onFocus () {
    },
    onCancel () {
    }
  }
}
</script>

<style lang="less" scoped>
.textarea-outer{padding:10px;}
.textarea-outer .weui-cells{margin-top:0;}
.textarea-outer .weui-cells:before{display:none;}
.textarea-outer .weui-cells:after{display:none;}
</style>
