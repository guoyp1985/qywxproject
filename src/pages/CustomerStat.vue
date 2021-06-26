<style lang="less">
.customer-stat-page{
  .box-list{
    .txt1{text-align:center;font-size:20px;font-weight:bold;}
    .txt2{text-align:center;color:#999;}
  }
}
</style>
<template>
  <div class="customer-stat-page">
    <div class="s-topbanner s-topbanner1 bg-white">
      <div class="row">
        <tab class="v-tab">
          <tab-item :selected="period == 'm'" @on-item-click="clickTab('m')">本月</tab-item>
          <tab-item :selected="period == 'w'" @on-item-click="clickTab('w')">本周</tab-item>
          <tab-item :selected="period == 'd'" @on-item-click="clickTab('d')">昨日</tab-item>
        </tab>
      </div>
    </div>
    <div class="s-container s-container1">
      <template v-if="afterLoad">
        <div class="box-outer">
          <div class="box-title">{{periodTxt[period]}}新增客户数</div>
          <div class="box-list square">
            <div class="list-item">
              <div class="item-inner">
                <div class="txt1">{{statData.xinzeng.yb}}</div>
                <div class="txt2">一般</div>
              </div>
            </div>
            <div class="list-item">
              <div class="item-inner">
                <div class="txt1">{{statData.xinzeng.zd}}</div>
                <div class="txt2">重点</div>
              </div>
            </div>
            <div class="list-item">
              <div class="item-inner">
                <div class="txt1">{{statData.xinzeng.hx}}</div>
                <div class="txt2">核心</div>
              </div>
            </div>
          </div>
        </div>
        <div class="box-outer mt12">
          <div class="box-title">当前客户数</div>
          <div class="box-list square">
            <div class="list-item">
              <div class="item-inner">
                <div class="txt1">{{statData.dangqian.yb}}</div>
                <div class="txt2">一般</div>
              </div>
            </div>
            <div class="list-item">
              <div class="item-inner">
                <div class="txt1">{{statData.dangqian.zd}}</div>
                <div class="txt2">重点</div>
              </div>
            </div>
            <div class="list-item">
              <div class="item-inner">
                <div class="txt1">{{statData.dangqian.hx}}</div>
                <div class="txt2">核心</div>
              </div>
            </div>
          </div>
        </div>
        <div class="box-outer mt12">
          <div class="box-title">{{periodTxt[period]}}客户到店次数</div>
          <div class="box-list square">
            <div class="list-item">
              <div class="item-inner">
                <div class="txt1">{{statData.daodian.yb}}</div>
                <div class="txt2">一般</div>
              </div>
            </div>
            <div class="list-item">
              <div class="item-inner">
                <div class="txt1">{{statData.daodian.zd}}</div>
                <div class="txt2">重点</div>
              </div>
            </div>
            <div class="list-item">
              <div class="item-inner">
                <div class="txt1">{{statData.daodian.hx}}</div>
                <div class="txt2">核心</div>
              </div>
            </div>
          </div>
        </div>
        <div class="box-outer mt12">
          <div class="box-title">{{periodTxt[period]}}客户消费金额</div>
          <div class="box-list square">
            <div class="list-item">
              <div class="item-inner">
                <div class="txt1">{{statData.xiaofei.yb}}</div>
                <div class="txt2">一般</div>
              </div>
            </div>
            <div class="list-item">
              <div class="item-inner">
                <div class="txt1">{{statData.xiaofei.zd}}</div>
                <div class="txt2">重点</div>
              </div>
            </div>
            <div class="list-item">
              <div class="item-inner">
                <div class="txt1">{{statData.xiaofei.hx}}</div>
                <div class="txt2">核心</div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { Tab, TabItem } from 'vux'
import ENV from 'env'
import {User} from '#/storage'

export default {
  components: { Tab, TabItem },
  data () {
    return {
      query: {},
      loginUser: {},
      statData: {xinzeng: {}, daodian: {}, xiaofei: {}, dangqian: {}},
      period: 'w',
      periodTxt: {w: '本周', d: '昨日', m: '本月'},
      afterLoad: false,
      dataObject: {
        w: null,
        m: null,
        d: null
      }
    }
  },
  methods: {
    clickTab (type) {
      this.period = type
      if (this.dataObject[type]) {
        this.statData = this.dataObject[type]
      } else {
        this.getData()
      }
    },
    getData () {
      this.$http.get(`${ENV.BokaApi}/api/customer/weekStat`, {
        params: {period: this.period}
      }).then(res => {
        let data = res.data
        if (data.code === 0) {
          this.statData = data.data
          this.dataObject[this.period] = data.data
        }
      })
    }
  },
  activated () {
    this.query = this.$route.query
    if (this.query.period) this.period = this.query.period
    this.loginUser = User.get()
    this.getData()
    this.afterLoad = true
  }
}
</script>
