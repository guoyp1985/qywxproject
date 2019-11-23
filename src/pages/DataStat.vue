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
          <tab-item v-for="(item,index) in tabtxts" :selected="index == 0" :key="index" @on-item-click="clickTab">{{item}}</tab-item>
        </tab>
      </div>
    </div>
    <div class="s-container s-container1">
      <div v-show="(selectedIndex == 0)" class="swiper-inner">
        <div class="box-area">
          <div class="col-item">
            <div class="row-item big">
              <div class="txt1">今日订单</div>
              <div class="txt2">{{statData1.todayorders}}</div>
            </div>
            <div class="row-item big">
              <div class="txt1">今日收入</div>
              <div class="txt2">{{statData1.todayrevenue}}</div>
            </div>
          </div>
          <div class="col-item">
            <div class="row-item big">
              <div class="txt1">今日入驻</div>
              <div class="txt2">{{statData1.newRetailers_0_factory}}</div>
            </div>
            <div class="row-item big">
              <div class="txt1">今日销售额</div>
              <div class="txt2">{{statData1.todayordersmoney}}</div>
            </div>
          </div>
        </div>
        <div class="box-area">
          <div class="col-item">
            <div class="row-item big">
              <div class="txt1">累计订单</div>
              <div class="txt2">{{statData1.allorders}}</div>
            </div>
            <div class="row-item big">
              <div class="txt1">累计收入</div>
              <div class="txt2">{{statData1.allrevenue}}</div>
            </div>
          </div>
          <div class="col-item">
            <div class="row-item big">
              <div class="txt1">累计入驻</div>
              <div class="txt2">{{statData1.allRetailers_0_factory}}</div>
            </div>
            <div class="row-item big">
              <div class="txt1">累计销售额</div>
              <div class="txt2">{{statData1.allordersmoney}}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="(selectedIndex == 1)" class="swiper-inner">
        <div class="box-area">
          <div class="col-item">
            <div class="row-item big">
              <div class="txt1">昨日订单</div>
              <div class="txt2">{{statData2.yesterdayorders}}</div>
            </div>
            <div class="row-item big">
              <div class="txt1">昨日收入</div>
              <div class="txt2">{{statData2.yesterdayrevenue}}</div>
            </div>
          </div>
          <div class="col-item">
            <div class="row-item big">
              <div class="txt1">昨日入驻</div>
              <div class="txt2">{{statData2.newRetailers_0_factory}}</div>
            </div>
            <div class="row-item big">
              <div class="txt1">昨日销售额</div>
              <div class="txt2">{{statData2.yesterdayordersmoney}}</div>
            </div>
          </div>
        </div>
        <div class="box-area">
          <div class="col-item">
            <div class="row-item big">
              <div class="txt1">累计订单</div>
              <div class="txt2">{{statData2.allorders}}</div>
            </div>
            <div class="row-item big">
              <div class="txt1">累计收入</div>
              <div class="txt2">{{statData2.allrevenue}}</div>
            </div>
          </div>
          <div class="col-item">
            <div class="row-item big">
              <div class="txt1">累计入驻</div>
              <div class="txt2">{{statData2.allRetailers_0_factory}}</div>
            </div>
            <div class="row-item big">
              <div class="txt1">累计销售额</div>
              <div class="txt2">{{statData2.allordersmoney}}</div>
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
      statData1: {},
      statData2: {}
    }
  },
  filters: {
    dateFormat: function (isoDate) {
      return new Time(isoDate).dateFormat('yyyy-MM-dd hh:mm:ss')
    }
  },
  methods: {
    clickTab (index) {
      this.swiperChange()
    },
    getData1 () {
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/factory/factoryAllStat`, {
        fid: this.Fid, type: 'today'
      }).then(res => {
        const data = res.data
        this.$vux.loading.hide()
        this.statData1 = data.data
      })
    },
    getData2 () {
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/factory/factoryAllStat`, {
        fid: this.Fid, type: 'yesterday'
      }).then(res => {
        const data = res.data
        this.$vux.loading.hide()
        this.statData2 = data.data
      })
    },
    swiperChange () {
      switch (this.selectedIndex) {
        case 0:
          this.getData1()
          break
        case 1:
          this.getData2()
          break
      }
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.loginUser = User.get()
      this.query = this.$route.query
      if (this.query.fid) {
        this.Fid = this.query.fid
      } else {
        this.Fid = this.loginUser.fid
      }
      this.swiperChange()
    }
  },
  created () {
  },
  activated () {
    this.refresh()
  }
}
</script>
