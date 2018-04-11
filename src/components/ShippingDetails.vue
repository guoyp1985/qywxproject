/*
* @description: 物流信息页面
* @auther: simon
* @created_date: 2018-4-7
*/
<template>
  <div id="shipping-details">
    <sticky scroll-box="shipping-details">
      <div class="express-info">
        <div class="goods-cell">
          <x-img :src="orderImg"></x-img>
        </div>
        <div class="express-cell font13">
          <div class="express-status">
            <span>{{expressStatus}}</span>
          </div>
          <div class="express-company">
            <span>{{expressCompany}} {{expressId}}</span>
          </div>
          <div class="express-phone">
            <span>官方电话: {{expressPhone}}</span>
          </div>
        </div>
      </div>
    </sticky>
    <timeline class="timeline font12">
			<timeline-item v-for="(timeline, index) in timelines" :key="index">
				<h4>{{timeline.status}}</h4>
				<p>{{timeline.time}}</p>
			</timeline-item>
		</timeline>
  </div>
</template>

<i18n>
</i18n>

<script>
import { Sticky, Timeline, TimelineItem, XImg } from 'vux'

export default {
  components: {
    Sticky,
    Timeline,
    TimelineItem,
    XImg
  },
  data () {
    return {
      expressStatus: 'unkown',
      expressCompany: 'unkown',
      expressId: '100000000000',
      expressPhone: '00000',
      orderImg: '../../asset/_images/nopic.png',
      timelines: [
        {'time': '2018-04-03 10:19:40', 'status': '在官网"运单资料&签收图",可查看签收人信息'},
        {'time': '2018-04-03 10:18:40', 'status': '已签收(同事 ),感谢使用顺丰,期待再次为您服务'},
        {'time': '2018-04-03 08:20:31', 'status': '快件交给韩志磊，正在派送途中（联系电话：18610652457）'},
        {'time': '2018-04-03 08:11:48', 'status': '正在派送途中,请您准备签收(派件人:刘其美,电话:15501010502)'},
        {'time': '2018-04-03 08:01:24', 'status': '快件到达 【北京丰台莲怡营业点】'},
        {'time': '2018-04-03 03:57:54', 'status': '快件已发车'},
        {'time': '2018-04-03 03:39:38', 'status': '快件在【北京金马同城集散点】已装车,准备发往 【北京丰台莲怡营业点】'},
        {'time': '2018-04-02 22:19:35', 'status': '快件到达 【北京金马同城集散点】'},
        {'time': '2018-04-02 20:36:14', 'status': '快件已发车'},
        {'time': '2018-04-02 19:47:49', 'status': '快件在【北京田家园营业点】已装车,准备发往 【北京金马同城集散点】'},
        {'time': '2018-04-02 16:49:00', 'status': '顺丰速运 已收取快件'},
        {'time': '2018-04-02 16:46:57', 'status': '顺丰速运 已收取快件'}
      ]
    }
  },
  computed: {
    expressInfo () {
      return `${this.expressCompany} ${this.expressNumber}`
    }
  }
}
</script>

<style lang="less">
#shipping-details .express-info {
  background-color: #ffffff;
  display: flex;
  padding: 10px 20px;
  position: relative;
}
#shipping-details .express-info:after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  border-bottom: 1px solid #f0f0f0;
}
#shipping-details .goods-cell,
#shipping-details .goods-cell img{
  width: 60px;
  height: 60px;
}
#shipping-details .express-cell {
  margin-left: 10px;
  flex: 1;
}
#shipping-details .timeline {
  background-color: #ffffff;
  margin-top: 10px;
}
/* vux css hack */
#shipping-details .vux-timeline-item-content {
  position: relative;
}
#shipping-details .vux-timeline-item-content:before {
  content: '';
  position: absolute;
  top: -10px;
  left: 20px;
  right: 20px;
  height: 1px;
  border-top: 1px solid #f0f0f0;
}
#shipping-details li:first-of-type .vux-timeline-item-content:before {
  height: 0;
  border-top: none;
}
#shipping-details .vux-timeline-item-tail,
#shipping-details li:not(:first-of-type) .vux-timeline-item-color {
  background-color: #d7d7d7;
}
</style>
