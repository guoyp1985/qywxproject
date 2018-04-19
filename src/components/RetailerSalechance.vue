<template>
<<<<<<< HEAD
  <div class="containerarea bg-white">
=======
  <div>
>>>>>>> 25ba8f0938d571307dda639b762880ec13c7c827
    <div class="bg-gray4 padding10 border-box">
      <card :header="{title: $t('Data text')}" class="x-card">
        <div slot="content" class="card-demo-flex card-demo-content01">
          <div class="vux-1px-r" v-for="(item,index) in topdata" :key="index">
            <div class="color-gray font14">{{item.title}}</div>
            <div class="color-blue9 font17 mt5">{{item.value}}</div>
          </div>
        </div>
      </card>
    </div>
    <div class="padding10 border bg-white bordertxt font14">{{$t('Sale chance')}}</div>
    <div>
      <timeline class="x-timeline">
        <timeline-item v-for="(item, index) in chancedata" :key="item.id">
          <div class="color-black font12 ddate">{{ item.dateline | dateformat }}</div>
          <div class="color-gray font12 dtime">{{ item.dateline | dateformat1 }}</div>
          <div class="t-table">
            <div class="t-cell">
              <div class="color-blue9 font14">{{ item.linkman }}</div>
              <div class="color-gray font12">{{ item.content }}</div>
            </div>
            <div class="t-cell w50 align_right v_middle">
              <div class="qbtn1 bg-blue10 color-white">{{ $t('Contact') }}</div>
            </div>
          </div>
        </timeline-item>
      </timeline>
    </div>
  </div>
</template>

<i18n>
Data text:
  zh-CN: 数据
Sale chance:
  zh-CN: 销售机会
Contact:
  zh-CN: 联系
</i18n>

<script>
import { Card, Timeline, TimelineItem } from 'vux'
import Time from '../../libs/time'

export default {
  components: {
    Card,
    Timeline,
    TimelineItem
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('MM-dd')
    },
    dateformat1: function (value) {
      return new Time(value * 1000).dateFormat('hh:mm')
    }
  },
<<<<<<< HEAD
  created () {
    this.$store.commit('updateToggleTabbar', {toggleBar: false})
  },
=======
>>>>>>> 25ba8f0938d571307dda639b762880ec13c7c827
  data () {
    return {
      topdata: [
        { title: '访问量', value: '1130' },
        { title: '分享数', value: '15' },
        { title: '销售额', value: '0.00' }
      ],
      chancedata: [
        { id: 1, content: '浏览了《维生素B族片》,共浏览1次,合计浏览时间为10秒', dateline: 1522377357, linkman: 'SMART', number: 1, staytime: 0, title: '维生素B族片', type: 'views', uid: 281 },
        { id: 2, content: '浏览了《砍价:商品1》,共浏览3次,合计浏览时间为10秒', dateline: 1522377357, linkman: 'zxj', number: 1, staytime: 0, title: '维生素B族片', type: 'views', uid: 281 },
        { id: 3, content: '浏览了《砍价:商品1》,共浏览2次,合计浏览时间为10秒', dateline: 1522377357, linkman: '贪吃小松鼠', number: 1, staytime: 0, title: '维生素B族片', type: 'views', uid: 281 },
        { id: 4, content: '浏览了《砍价:商品1》,共浏览1次,合计浏览时间为10秒', dateline: 1522377357, linkman: '๓妖怪吧！', number: 1, staytime: 0, title: '维生素B族片', type: 'views', uid: 281 },
        { id: 5, content: '浏览了《砍价:你会给我买名牌包包吗？》,共浏览4次,合计浏览时间为10秒', dateline: 1522377357, linkman: '小小于', number: 1, staytime: 0, title: '维生素B族片', type: 'views', uid: 281 }
      ]
    }
  }
}
</script>

<style lang="less">
.card-demo-flex {
  display: flex;
}
.card-demo-content01 {
  padding: 10px 0;
}
.card-padding {
  padding: 15px;
}
.card-demo-flex > div {
  flex: 1;
  text-align: center;
  font-size: 12px;
}
.card-demo-flex span {
  color: #f74c31;
}
.x-card{
  background-color: #fff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.14);
  padding-bottom: 10px;
}
.x-card .weui-panel__hd{color:#000;}
.x-card.weui-panel:after{display:none;}
.x-card .vux-1px-r:after{display:none;}
.x-card .weui-panel__hd:after{display:none;}

.bordertxt{
  border-top:@list-border-color 1px solid;
  border-bottom:@list-border-color 1px solid;
}

.x-timeline .vux-timeline-item-color{background-color:#bfcadf;left:30px;}
.x-timeline .vux-timeline-item-head-first{width: 10px;height: 10px;top: 4px;}
.x-timeline .vux-timeline-item-tail{background-color:#bfcadf;left:34px;}
.x-timeline .vux-timeline-item-checked.weui-icon-success-no-circle::before{display:none;}
.x-timeline .vux-timeline-item-content{padding:0 0 10px 50px;}
.x-timeline .ddate{position:absolute;left:-10px;}
.x-timeline .dtime{position:absolute;left:-10px;top:17px;}

</style>
