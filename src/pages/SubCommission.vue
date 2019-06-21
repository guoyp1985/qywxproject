<template>
  <div class="containerarea font14 bg-page sub-commission-page notop nobottom">
    <div class="pagemiddle" ref="scrollContainer1" @scroll="handleScroll('scrollContainer1',0)">
      <template v-if="disList1">
        <div v-if="!tabdata1.length" class="w_100 h_100 flex_center color-gray">暂无数据</div>
        <div v-else class="scroll_list">
          <div v-for="(item,index1) in tabdata1" :key="index1" class="scroll_item bg-white flex_left" @click="toDetail(item)">
            <div class="pic flex_left">
              <img :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
            </div>
            <div class="flex_cell">
              <div class="clamp1">{{item.linkman}}</div>
              <div class="color-theme mt5">分佣: {{$t("RMB")}}{{item.salesmoney}}</div>
              <div class="color-gray font12">{{item.dateline | dateFormat}}</div>
            </div>
            <div class="w80 flex_right">
              <div class="bg-theme color-white btn flex_center">详情</div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div v-transfer-dom class="x-popup">
      <popup v-model="showDetail" height="100%">
        <div class="popup1 detail-modal">
          <div class="popup-top flex_center">{{clickData.linkman}}</div>
          <div class="popup-middle font14 flex_center">
            <div class="table vip-info">
              <div class="tr">
                <div class="td">累计销售额</div>
                <div class="td flex_cell">{{$t("RMB")}}{{clickData.salesmoney}}</div>
              </div>
              <div class="tr">
                <div class="td">累计订单数</div>
                <div class="td flex_cell">{{clickData.salescount}}单</div>
              </div>
              <div class="tr">
                <div class="td">D1订单数</div>
                <div class="td flex_cell">{{clickData.pc_count}}单</div>
              </div>
              <div class="tr">
                <div class="td">D2订单数</div>
                <div class="td flex_cell">{{clickData.pb_count}}单</div>
              </div>
              <div class="tr">
                <div class="td">D3订单数</div>
                <div class="td flex_cell">{{clickData.pa_count}}单</div>
              </div>
              <div class="tr">
                <div class="td">应获得奖励</div>
                <div class="td flex_cell">{{$t("RMB")}}{{clickData.hongbaomoney}}</div>
              </div>
            </div>
          </div>
          <div class="popup-bottom flex_center">
            <div class="flex_cell h_100 flex_center bg-gray color-white" @click="closeDetail">{{ $t('Close') }}</div>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import { Popup, TransferDom, XInput } from 'vux'
import ENV from 'env'
import Time from '#/time'
import { User } from '#/storage'

const limit = 20
let pageStart1 = 0
let pageStart2 = 0
let self = {}

export default {
  directives: {
    TransferDom
  },
  components: {
    Popup, XInput
  },
  data () {
    return {
      loginUser: {},
      query: {},
      disList1: false,
      tabdata1: [],
      showDetail: false,
      clickData: {}
    }
  },
  filters: {
    dateFormat: function (dt) {
      return new Time(dt * 1000).dateFormat('yyyy-MM-dd')
    }
  },
  methods: {
    toDetail (item) {
      this.clickData = item
      this.showDetail = true
    },
    closeDetail () {
      this.showDetail = false
      this.clickData = {}
    },
    handleScroll: function (refname, index) {
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          switch (self.selectedIndex) {
            case 0:
              if (self.tabdata1.length === (pageStart1 + 1) * limit) {
                pageStart1++
                self.getData1()
              }
              break
            case 1:
              if (self.tabdata2.length === (pageStart2 + 1) * limit) {
                pageStart2++
                self.getData2()
              }
              break
          }
        }
      })
    },
    getData () {
      self.$http.post(`${ENV.BokaApi}/api/haitun/teamStat`, {pagestart: pageStart1, limit: limit, fid: 97}).then((res) => {
        let data = res.data
        self.$vux.loading.hide()
        if (data.flag) {
          let retdata = data.data ? data.data : data
          self.tabdata1 = self.tabdata1.concat(retdata)
        }
        self.disList1 = true
      })
    },
    clickTab () {
      this.swiperChange()
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.loginUser = User.get()
      this.query = this.$route.query
      this.disList1 = false
      pageStart1 = 0
      this.tabdata1 = []
      this.getData()
    }
  },
  activated () {
    self = this
    this.refresh()
    this.$util.miniPost()
  }
}
</script>

<style lang="less" scoped>
.sub-commission-page{
  .scroll_item{padding:10px;}
  .pic{
    width:70px;
    img{width:60px;height:60px;border-radius:50%;object-fit: cover;}
  }
  .btn{width:60px;height:30px;border-radius:10px;}
}
.detail-modal .table{
  width:90%;margin:0 auto;position:relative;border:#e3e3e3 1px solid;font-size:12px;
  .tr:not(:last-child){border-bottom:1px solid #f2f2f2;}
  .tr{
    width:100%;height:45px;display:flex !important;align-items: left;justify-content:flex-start;flex-flow:row wrap; align-items: center;
    .th{height:100%;font-size:16px;display:flex !important;justify-content: center; align-items: center;}
    .th:nth-child(1){width:40%;border-right:1px solid #f2f2f2;}
    .th:nth-child(2){flex:1;background-color:#e4e4e4;font-weight:bold;}
    .th:nth-child(3){flex:1;background-color:#ECAC4D;font-weight:bold;}
    .td:nth-child(1){width:40%;border-right:1px solid #f2f2f2;padding:0 5px;box-sizing: border-box;}
    .td:nth-child(2){border-right:1px solid #f2f2f2;}
    .td{
      height:100%;display:flex !important;justify-content: center; align-items: center;
      .small-td{height:45px;display:flex !important;justify-content: center; align-items: center;}
      .small-td:not(:last-child){border-bottom:1px solid #f2f2f2;}
      .al{font-size:20px;color:#ff6a61;font-weight:bold;}
    }
  }
  .tr:nth-child(odd) .td{background-color:#fff;}
  .tr:nth-child(even) .td{background-color:#eee;}
}
</style>
