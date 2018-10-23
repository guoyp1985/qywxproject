<template>
  <div class="containerarea deliverinfo nobottom font14">
    <template v-if="showSos">
      <Sos :title="sosTitle"></Sos>
    </template>
    <template v-if="showContainer">
      <div class="pagetop b_bottom_after pl15 pr15 flex_left color-white">
        <div>
          <div>物流公司：{{ deliverinfo.delivercompanyname }}</div>
          <div>物流单号：{{ deliverinfo.delivercode }}</div>
        </div>
      </div>
      <div class="pagemiddle">
        <template v-if="showData">
          <div v-if="!data || data.length == 0" class="scroll_item emptyitem">
            <div class="t-table">
              <div class="t-cell">暂无物流信息</div>
            </div>
          </div>
          <timeline v-else class="x-timeline">
            <timeline-item v-for="(item, index) in data" :key="index">
              <div class="font16 ddate align_right">{{ item.dateline | dateformat }}</div>
              <div class="font12 dtime align_right">{{ item.dateline | dateformat1 }}</div>
              <div class="t-table">
                <div class="t-cell" style="padding-bottom:30px;">{{ item.content }}</div>
              </div>
            </timeline-item>
          </timeline>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
import { Timeline, TimelineItem } from 'vux'
import Sos from '@/components/Sos'
import Time from '#/time'
import ENV from 'env'

export default {
  components: {
    Timeline, TimelineItem, Sos
  },
  filters: {
    dateformat (dt) {
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
          state = '今天'
        } else if (date + 1 === nowdate) {
          state = '昨天'
        } else if (date + 2 === nowdate) {
          state = '前天'
        } else {
          state = new Time(dt * 1000).dateFormat('MM-dd')
        }
      } else {
        state = new Time(dt * 1000).dateFormat('MM-dd')
      }
      return state
    },
    dateformat1 (value) {
      return new Time(value * 1000).dateFormat('hh:mm')
    }
  },
  data () {
    return {
      showSos: false,
      sosTitle: '',
      showContainer: false,
      query: {},
      deliverinfo: {},
      data: [],
      showData: false
    }
  },
  methods: {
    initData () {
      this.showSos = false
      this.showContainer = false
      this.showData = false
      this.data = []
    },
    getData () {
      const self = this
      const params = { id: this.query.id }
      this.$http.get(`${ENV.BokaApi}/api/order/orderDetail`, { params: params }).then(function (res) {
        const data = res.data
        self.deliverinfo = data.data ? data.data : data
        return self.$http.post(`${ENV.BokaApi}/api/order/deliverInfo`, params)
      }).then(function (res) {
        const data = res.data
        const retdata = data.data
        self.$vux.loading.hide()
        if (data.flag !== 1) {
          self.sosTitle = data.error
          self.showSos = true
          self.showContainer = false
        } else {
          if (retdata.code === '-1') {
            self.sosTitle = retdata.msg
            self.showSos = true
            self.showContainer = false
          } else {
            self.showContainer = true
            self.showSos = false
            let retdata = data.data ? data.data : data
            if (!retdata.status) {
              for (let i = 0; i < retdata.length; i++) {
                let d = retdata[i]
                d.dateline = parseInt(Date.parse(d.time.replace(/-/g, '/')) / 1000)
              }
              self.data = retdata
            }
            self.showData = true
          }
        }
      })
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.query = this.$route.query
      this.$vux.loading.show()
      this.initData()
      this.getData()
    }
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less" scoped>
.deliverinfo .pagetop{height:70px;background:rgba(0,0,0,0.85);}
.deliverinfo .pagemiddle{
  top:90px;padding:0 20px 0 20px;
  box-sizing:border-box;
  bottom:20px;
}
.deliverinfo .x-timeline .vux-timeline-item:nth-child(1) {
    color: orange;
}
.deliverinfo .x-timeline .ddate {left: -39px;width: 60px;}
.deliverinfo .x-timeline .dtime {left: -39px;width: 60px;margin-top:5px;}
.deliverinfo .x-timeline .vux-timeline-item:nth-child(1) .vux-timeline-item-color {background-color: orange;}
</style>
