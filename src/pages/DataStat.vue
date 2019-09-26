<style lang="less">
.data-stat-page{
  .box-area:not(:last-child){margin-bottom:20px;}
  .box-area{
    box-shadow:0px 0px 3px 1px #e6ebed;
    padding:10px;background-color:#fff;
    .col-item:not(:last-child):after{
      content:"";display:block;
    	background-color:@list-border-color;height:1px;overflow:hidden;
    	position: absolute;left: 0;right: 0;bottom:0px;
    	-webkit-transform: scaleY(0.5) translateY(0.5px);
    	transform: scaleY(0.5) translateY(0.5px);
    	-webkit-transform-origin: 0% 0%;
    	transform-origin: 0% 0%;
    }
    .col-item{
      width:100%;display:flex;flex-wrap: wrap;padding-top:10px;padding-bottom:10px;position:relative;
      .row-item:not(:last-child):after{
        content:"";display:block;
      	background-color:@list-border-color;width:1px;overflow:hidden;
      	position: absolute;right: 0;top: 0;bottom:0px;
      	-webkit-transform: scaleX(0.5) translateX(0.5px);
      	transform: scaleX(0.5) translateX(0.5px);
      	-webkit-transform-origin: 0% 0%;
      	transform-origin: 0% 0%;
      }
      .row-item{
        width:50%;box-sizing:border-box;position:relative;
        .txt1{
          text-align:center;color:#999;font-size:16px;
        }
        .txt2{
          text-align:center;color:#ff6a61;font-weight:bold;
        }
      }
      .big{
        .txt2{font-size:20px;}
      }
      .middle{
        .txt2{font-size:16px;}
      }
      .small{
        .txt2{font-size:14px;}
      }
    }
  }
}
</style>
<template>
  <div class="containerarea font14 bg-page data-stat-page">
    <div class="s-topbanner s-topbanner1">
      <div class="row">
        <tab v-model="selectedIndex" class="v-tab">
          <tab-item v-for="(item,index) in tabtxts" :selected="index == 0" :key="index">{{item}}</tab-item>
        </tab>
      </div>
    </div>
    <div class="s-container s-container1">
      <div v-show="(selectedIndex == 0)" class="swiper-inner scroll-container1" ref="scrollContainer1" @scroll="handleScroll('scrollContainer1',0)">
        <div class="box-area">
          <div class="col-item">
            <div class="row-item big">
              <div class="txt1">今日订单</div>
              <div class="txt2">{{statData.todayorders}}</div>
            </div>
            <div class="row-item big">
              <div class="txt1">今日收入</div>
              <div class="txt2">{{statData.todayrevenue}}</div>
            </div>
          </div>
          <div class="col-item">
            <div class="row-item big">
              <div class="txt1">今日入驻</div>
              <div class="txt2">{{statData.newRetailers_0_factory}}</div>
            </div>
            <div class="row-item big">
              <div class="txt1">今日销售额</div>
              <div class="txt2">{{statData.todayordersmoney}}</div>
            </div>
          </div>
        </div>
        <div class="box-area">
          <div class="col-item">
            <div class="row-item big">
              <div class="txt1">本月订单</div>
              <div class="txt2">{{statData.monthorders}}</div>
            </div>
            <div class="row-item big">
              <div class="txt1">本月收入</div>
              <div class="txt2">{{statData.monthrevenue}}</div>
            </div>
          </div>
          <div class="col-item">
            <div class="row-item big">
              <div class="txt1">本月入驻</div>
              <div class="txt2">{{statData.newRetailers_0_factory}}</div>
            </div>
            <div class="row-item big">
              <div class="txt1">本月销售额</div>
              <div class="txt2">{{statData.monthordersmoney}}</div>
            </div>
          </div>
        </div>
        <div class="box-area">
          <div class="col-item">
            <div class="row-item big">
              <div class="txt1">累计订单</div>
              <div class="txt2">{{statData.allorders}}</div>
            </div>
            <div class="row-item big">
              <div class="txt1">累计收入</div>
              <div class="txt2">{{statData.allrevenue}}</div>
            </div>
          </div>
          <div class="col-item">
            <div class="row-item big">
              <div class="txt1">累计入驻</div>
              <div class="txt2">{{statData.allRetailers_0_factory}}</div>
            </div>
            <div class="row-item big">
              <div class="txt1">累计销售额</div>
              <div class="txt2">{{statData.allordersmoney}}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="(selectedIndex == 1)" class="swiper-inner scroll-container1" ref="scrollContainer1" @scroll="handleScroll('scrollContainer1',0)">
        <div class="box-area">
          <div class="col-item">
            <div class="row-item big">
              <div class="txt1">今日订单</div>
              <div class="txt2">{{statData.todayorders}}</div>
            </div>
            <div class="row-item big">
              <div class="txt1">今日收入</div>
              <div class="txt2">{{statData.todayrevenue}}</div>
            </div>
          </div>
          <div class="col-item">
            <div class="row-item big">
              <div class="txt1">今日入驻</div>
              <div class="txt2">{{statData.newRetailers_0_factory}}</div>
            </div>
            <div class="row-item big">
              <div class="txt1">今日销售额</div>
              <div class="txt2">{{statData.todayordersmoney}}</div>
            </div>
          </div>
        </div>
        <div class="box-area">
          <div class="col-item">
            <div class="row-item big">
              <div class="txt1">本月订单</div>
              <div class="txt2">{{statData.monthorders}}</div>
            </div>
            <div class="row-item big">
              <div class="txt1">本月收入</div>
              <div class="txt2">{{statData.monthrevenue}}</div>
            </div>
          </div>
          <div class="col-item">
            <div class="row-item big">
              <div class="txt1">本月入驻</div>
              <div class="txt2">{{statData.newRetailers_0_factory}}</div>
            </div>
            <div class="row-item big">
              <div class="txt1">本月销售额</div>
              <div class="txt2">{{statData.monthordersmoney}}</div>
            </div>
          </div>
        </div>
        <div class="box-area">
          <div class="col-item">
            <div class="row-item big">
              <div class="txt1">累计订单</div>
              <div class="txt2">{{statData.allorders}}</div>
            </div>
            <div class="row-item big">
              <div class="txt1">累计收入</div>
              <div class="txt2">{{statData.allrevenue}}</div>
            </div>
          </div>
          <div class="col-item">
            <div class="row-item big">
              <div class="txt1">累计入驻</div>
              <div class="txt2">{{statData.allRetailers_0_factory}}</div>
            </div>
            <div class="row-item big">
              <div class="txt1">累计销售额</div>
              <div class="txt2">{{statData.allordersmoney}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {Tab, TabItem} from 'vux'
import Time from '#/time'
import ENV from 'env'
import { User } from '#/storage'

export default {
  components: {
    Tab, TabItem
  },
  data () {
    return {
      query: {},
      loginUser: {},
      tabtxts: ['今日', '昨日'],
      selectedIndex: 0,
      Fid: 0,
      statData: {}
    }
  },
  filters: {
    dateFormat: function (isoDate) {
      return new Time(isoDate).dateFormat('yyyy-MM-dd hh:mm:ss')
    }
  },
  methods: {
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.loginUser = User.get()
      this.query = this.$route.query
      // factory/factoryAllStat  参数fid
      // 今日订单  todayorders
      // 今日收入  todayrevenue
      // 今日入驻  newRetailers_0_factory
      // 今日销售额  todayordersmoney
      //
      // 今月订单  monthorders
      // 今月收入  monthrevenue
      // 今月入驻  newRetailers_10_factory
      // 今月销售额  monthordersmoney
      if (this.query.fid) {
        this.Fid = this.query.fid
      } else {
        this.Fid = this.loginUser.fid
      }
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/factory/factoryAllStat`, {fid: this.Fid}).then(res => {
        const data = res.data
        this.$vux.loading.hide()
        this.statData = data.data
      })
    }
  },
  created () {
  },
  activated () {
    this.refresh()
  }
}
</script>
