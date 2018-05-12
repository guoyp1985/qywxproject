/*
* @description: 物流信息页面
* @auther: simon
* @created_date: 2018-4-7
*/
<template>
  <div id="shipping-details">
    <sticky scroll-box="vux_view_box_body">
      <div class="express-info">
        <div class="goods-cell">
          <img :src="orderImg"></img>
        </div>
        <div class="express-cell font13">
          <div class="express-status">
            <span>{{expressStatus}}</span>
          </div>
          <div class="express-company">
            <span>{{expressCompany}} {{expressNumber}}</span>
          </div>
          <div class="express-phone">
            <span>官方电话: {{expressPhone}}</span>
          </div>
        </div>
      </div>
    </sticky>
    <timeline class="timeline font12">
      <template v-if="timelines.length">
        <timeline-item v-for="(timeline, index) in timelines" :key="index">
          <h4>{{timeline.status}}</h4>
          <p>{{timeline.time}}</p>
        </timeline-item>
      </template>
      <div v-else class="no-related-x color-gray">
        <span>{{$t('No Related Data')}}</span>
      </div>
		</timeline>
  </div>
</template>

<i18n>
</i18n>

<script>
import { Sticky, Timeline, TimelineItem } from 'vux'
import ENV from 'env'
export default {
  components: {
    Sticky, Timeline, TimelineItem
  },
  data () {
    return {
      expressStatus: '',
      expressCompany: '',
      expressNumber: '',
      expressPhone: '',
      orderImg: '../../asset/images/nopic.png',
      timelines: []
    }
  },
  computed: {
    expressInfo () {
      return `${this.expressCompany} ${this.expressNumber}`
    }
  },
  methods: {
    getData () {
      const self = this
      const id = this.$route.query.id
      this.$http.post(`${ENV.BokaApi}/api/order/deliverInfo`, {id: id})
      .then(res => {
        console.log(res.data)
        if (res.data.data) {
          self.timelines = res.data.data
        }
        return this.$http.get(`${ENV.BokaApi}/api/order/orderDetail?id=${id}`)
      })
      .then(res => {
        if (res.data.flag) {
          self.orderImg = res.data.data.orderlist[0].photo
          self.expressCompany = res.data.data.delivercompany
          self.expressNumber = res.data.data.delivercode
        }
      })
    }
  },
  created () {
    this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
    this.getData()
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
