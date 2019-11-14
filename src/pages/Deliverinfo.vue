<template>
  <div id="deliverinfo-page" class="containerarea deliverinfo nobottom font14">
    <template v-if="showSos">
      <div class="h_100 error404">
        <div class="content-block">
          <div class="meeting_title1">
            <div class="content_tile mg">
              <span class="">{{ sosTitle }}</span>
              <span>暂无物流信息</span>
              <div @click="toChat(deliverinfo)" class="bg-theme color-white" style="width:100px;border-radius:30px;box-sizing:border-box;position:relative;margin: 20px auto;">
                <span class="font13 ml5">联系客服</span>
                <div class="orderinfo_txt" style="opacity:0;height:0px;width:0px;">
                  <template v-if="isIOS">订单编号：{{deliverinfo.orderno}}<br/>商品：{{deliverinfo.orderlist[0].name}}<br/>数量：{{deliverinfo.orderlist[0].quantity}}<br/>卖家：{{deliverinfo.retailer.title}}<br/>合伙人：{{deliverinfo.retailer.title}}<br/>经理：{{deliverinfo.super}}<br/>状态：{{deliverinfo.flagstr}}<br/>下单时间：{{deliverinfo.dateline | dateformat2}}</template>
                  <template v-else>
  订单编号：{{deliverinfo.orderno}}
  商品：{{deliverinfo.orderlist[0].name}}
  数量：{{deliverinfo.orderlist[0].quantity}}
  卖家：{{deliverinfo.retailer.title}}
  合伙人：{{deliverinfo.retailer.title}}
  经理：{{deliverinfo.super}}
  状态：{{deliverinfo.flagstr}}
  下单时间：{{deliverinfo.dateline | dateformat2}}
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-if="showContainer">
      <div class="pagetop b_bottom_after pl15 pr15 flex_left color-white">
        <div>
          <div>物流公司：{{ deliverinfo.delivercompanyname }}</div>
          <div>物流单号：{{ deliverinfo.delivercode }}</div>
        </div>
        <div @click="toChat(deliverinfo)" style="width:80px;padding-right:10px;box-sizing:border-box;position: absolute;right: 10px;">
          <span class="al al-pinglun3 color-white font14"></span>
          <span class="font13 ml5">客服</span>
          <div class="orderinfo_txt" style="opacity:0;height:0px;width:0px;">
            <template v-if="isIOS">订单编号：{{deliverinfo.orderno}}<br/>商品：{{deliverinfo.orderlist[0].name}}<br/>数量：{{deliverinfo.orderlist[0].quantity}}<br/>卖家：{{deliverinfo.retailer.title}}<br/>合伙人：{{deliverinfo.retailer.title}}<br/>经理：{{deliverinfo.super}}<br/>状态：{{deliverinfo.flagstr}}<br/>下单时间：{{deliverinfo.dateline | dateformat2}}</template>
            <template v-else>
订单编号：{{deliverinfo.orderno}}
商品：{{deliverinfo.orderlist[0].name}}
数量：{{deliverinfo.orderlist[0].quantity}}
卖家：{{deliverinfo.retailer.title}}
合伙人：{{deliverinfo.retailer.title}}
经理：{{deliverinfo.super}}
状态：{{deliverinfo.flagstr}}
下单时间：{{deliverinfo.dateline | dateformat2}}
            </template>
          </div>
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
import jQuery from 'jquery'
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
    },
    dateformat2 (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
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
      showData: false,
      isIOS: false
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
      if (this.$util.isIOS()) {
        this.isIOS = true
      } else {
        this.isIOS = false
      }
      this.$vux.loading.show()
      this.initData()
      this.getData()
    },
    toChat () {
      const self = this
      let eleobj = jQuery('#deliverinfo-page .orderinfo_txt')[0]
      let range = null
      let save = function (e) {
        e.clipboardData.setData('text/plain', eleobj.innerHTML)
        e.preventDefault()
      }
      if (self.$util.isIOS()) { // ios设备
        self.isIOS = true
        console.log('in iOS')
        window.getSelection().removeAllRanges()
        range = document.createRange()
        range.selectNode(eleobj)
        window.getSelection().addRange(range)
        document.execCommand('copy')
        window.getSelection().removeAllRanges()
      } else { // 安卓设备
        self.isIOS = false
        console.log('in android')
        document.addEventListener('copy', save)
        document.execCommand('copy')
        document.removeEventListener('copy', save)
      }
      if (this.query.fromapp === 'factory') {
        console.log('=== 进来了 ===')
        this.$wechat.miniProgram.reLaunch({url: ENV.MiniRouter.chat})
      } else {
        let params = this.$util.handleAppParams(this.query, {uid: this.deliverinfo.retailer.uid, fromModule: 'order'})
        this.$router.push({path: '/chat', query: params})
      }
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
.deliverinfo{
  .error404 .content-block {
    margin:0px;
    padding:0;
    max-width:1920px;
    height:100%;
    margin:0 auto;
  }
  .error404 .list-block{
    margin:12px 0 0;
  }
  .error404 .meeting_title1{
    background:none;
    height:100%;
    color:#333;
    font-size:18px;
    line-height:40px;
    text-align:center;
  }
  .error404 .content_tile{
    width:98%;
    height:80%;
    margin:0 auto;
    padding-top:15%;
    box-sizing:border-box;
    background:url(../assets/images/404_icon.png) no-repeat center 90%;
    background-size:40%;
    box-shadow:0px 10px 20px rgba(0,0,0,0.05);
    border-radius:7%;
  }
  .error404 .back_year{
    height:20%;
    position:relative;
  }
  .error404 .back_year .back_btn{
    border:1px solid #04be02;
    left:0;
    right:0;
    top:0;
    bottom:0;
    margin:auto auto;
    width:30%;
    border-radius:10px;
    color:#888;
    letter-spacing:2px;
    padding:0 10px;
    font-size:14px;
    text-align:center;
    position:absolute;
  }
  .btncopyurl{
    padding:0 10px;
    border:#ccc 1px solid;
    border-radius:5px;
    display:inline-block;
  }
  @media only screen and (min-width:751px){
    .error404 .content_tile{
      background-size:20%;
    }
  }
  @media only screen and (min-width:1200px){
    .error404 .content_tile{
      background-size:15%;
    }
  }
}
</style>
