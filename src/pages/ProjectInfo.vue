<template>
  <div id="project-info" class="containerarea font14" style="background-color:#f2f2f2;">
    <div class="t-table padding10 bg-white mb10" style="box-sizing:border-box;">
      <div class="t-cell v_middle" style="width:70px;">
        <img class="avatarimg3 imgcover v_middle" src="" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
      </div>
      <div class="t-cell v_middle">
        <div class="clamp1 font14">完美生活旗舰店</div>
        <div v-if="selectedIndex === 0" class="clamp1 mt5 font14" style="color:#ea3a3a">项目收入: ￥0.00</div>
        <div v-else class="clamp1 mt5 font14" style="color:#ea3a3a">合作模式: 每月分佣</div>
      </div>
      <!-- <div class="t-cell align_right v_middle">
        <div class="qbtn w60">联系</div>
      </div> -->
    </div>
    <div class="s-topbanner1">
      <tab class="b-tab" v-model="selectedIndex">
        <tab-item :selected="selectedIndex==0" @on-item-click="toggleTab">项目进度</tab-item>
        <tab-item :selected="selectedIndex==1" @on-item-click="toggleTab">经营统计</tab-item>
      </tab>
    </div>
    <div v-if="selectedIndex === 0" class="bg-white padding15 db-flex">
      <div class="left-progress">
        <div class="progress w50 flex_center">
          <div class="ball flex_center" :style="{'background-color' : true ? '#7ca6fa' : 'white'}">
            <span class="font12 color-white" :class="{'al al-gou' : true}"></span>
          </div>
        </div>
        <div class="progress w50 flex_center">
          <div class="ball flex_center" :style="{'background-color' : false ? '#7ca6fa' : 'white'}">
            <span class="font12 color-white" :class="{'al al-gou' : false}"></span>
          </div>
        </div>
        <div class="progress w50 flex_center">
          <div class="ball flex_center" :style="{'background-color' : false ? '#7ca6fa' : 'white'}">
            <span class="font12 color-white" :class="{'al al-gou' : false}"></span>
          </div>
        </div>
        <div class="progress w50 flex_center">
          <div class="ball flex_center" :style="{'background-color' : false ? '#7ca6fa' : 'white'}">
            <span class="font12 color-white" :class="{'al al-gou' : false}"></span>
          </div>
        </div>
        <div class="progress w50 flex_center">
          <div class="ball flex_center" :style="{'background-color' : false ? '#7ca6fa' : 'white'}">
            <span class="font12 color-white" :class="{'al al-gou' : false}"></span>
          </div>
        </div>
        <div class="progress w50 flex_center">
          <div class="ball flex_center" :style="{'background-color' : false ? '#7ca6fa' : 'white'}">
            <span class="font12 color-white" :class="{'al al-gou' : false}"></span>
          </div>
        </div>
        <div class="progress w50 flex_center">
          <div class="ball flex_center" :style="{'background-color' : false ? '#7ca6fa' : 'white'}">
            <span class="font12 color-white" :class="{'al al-gou' : false}"></span>
          </div>
        </div>
        <div class="progress w50 flex_center">
          <div class="ball flex_center" :style="{'background-color' : false ? '#7ca6fa' : 'white'}">
            <span class="font12 color-white" :class="{'al al-gou' : false}"></span>
          </div>
        </div>
      </div>
      <div style="flex:1;">
        <div class="apply" :class="{'active' : true}">
          <div class="font14">申请成为厂家: 未完成</div>
          <div class="mt5 font12 time-color">2019-08-28 12:00</div>
        </div>
        <div class="apply">
          <div class="font14" :class="{'active' : false}">申请小程序: 未完成</div>
          <div class="mt5 font12 time-color">2019-08-28 12:00</div>
        </div>
        <div class="apply">
          <div class="font14" :class="{'active' : false}">授权厂家小程序: 未完成</div>
          <div class="mt5 font12 time-color">2019-08-28 12:00</div>
        </div>
        <div class="apply">
          <div class="font14" :class="{'active' : false}">绑定厂家身份: 未完成</div>
          <div class="mt5 font12 time-color">2019-08-28 12:00</div>
        </div>
        <div class="apply">
          <div class="font14" :class="{'active' : false}">配置自有微信支付: 未完成</div>
          <div class="mt5 font12 time-color">2019-08-28 12:00</div>
        </div>
        <div class="apply">
          <div class="font14" :class="{'active' : false}">上传代码提交审核: 未完成</div>
          <div class="mt5 font12 time-color">2019-08-28 12:00</div>
        </div>
        <div class="apply">
          <div class="font14" :class="{'active' : false}">上传商品: 未完成</div>
          <div class="mt5 font12 time-color">2019-08-28 12:00</div>
        </div>
        <div class="apply">
          <div class="font14" :class="{'active' : false}">开始运营: 未完成</div>
          <div class="mt5 font12 time-color">2019-08-28 12:00</div>
        </div>
      </div>
    </div>
    <div v-if="selectedIndex === 1" class="bg-white">
      <!-- <div v-if="statData && statData.length > 0" class="radiusarea mb10 pb15 bg-white list-shadow01">
        <div class="item" v-for="(item,index) in statData" :key="index">
          <div class="inner">
            <div class="radius font22 clamp1" v-if="item.value.length <= 4">{{ item.value }}</div>
            <div class="radius font15 clamp1" v-else-if="item.value.length > 4">{{ item.value }}</div>
            <div class="radius font12 clamp1" v-else>{{ item.value }}</div>
            <div class="title color-gray">{{ item.title }}</div>
          </div>
        </div>
      </div> -->
      <div class="radiusarea mb10 pb15 bg-white list-shadow01">
        <div class="item">
          <div class="inner">
            <div class="radius font12 clamp1">￥10000</div>
            <div class="title color-gray">本月我的收入</div>
          </div>
        </div>
        <div class="item">
          <div class="inner">
            <div class="radius font12 clamp1">￥100000</div>
            <div class="title color-gray">本月销售额</div>
          </div>
        </div>
        <div class="item">
          <div class="inner">
            <div class="radius font12 clamp1">￥3000</div>
            <div class="title color-gray">今日销售额</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<i18n>
</i18n>
<script>
import { Tab, TabItem } from 'vux'
// import {User} from '#/storage'
// import ENV from 'env'

export default {
  components: {
    Tab, TabItem
  },
  data () {
    return {
      query: {},
      selectedIndex: 0,
      distabdata1: false,
      distabdata2: false,
      tabdata1: [],
      tabdata2: [],
      limit: 10,
      pagestart1: 0,
      pagestart2: 0
    }
  },
  methods: {
    initData () {
      // this.selectedIndex = 0
      // this.distabdata1 = false
      // this.distabdata2 = false
      // this.tabdata1 = []
      // this.tabdata2 = []
      // this.pagestart1 = 0
      // this.pagestart2 = 0
    },
    toggleTab () {
      console.log('in toggleTab')
      console.log(this.selectedIndex)
      switch (this.selectedIndex) {
        case 0:
          !this.tabdata1.length && this.getData()
          break
        case 1:
          !this.tabdata2.length && this.getData2()
          break
      }
    },
    /* 获取对应步骤是否完成 */
    getData () {
      // console.log('走1方法')
      // this.$vux.loading.show()
      // const self = this
      // let params = {limit: self.limit, pagestart: self.pageStart1}
      // this.$http.get(`${ENV.BokaApi}/api/order/orderList/user`, {
      //   params: params
      // }).then((res) => {
      //   let data = res.data
      //   self.$vux.loading.hide()
      //   let retdata = data.data ? data.data : data
      //   switch (flag) {
      //     case 0:
      //       self.tabdata1 = self.tabdata1.concat(retdata)
      //       self.distabdata1 = true
      //       break
      //     case 2:
      //       self.tabdata2 = self.tabdata2.concat(retdata)
      //       self.distabdata2 = true
      //       break
      //   }
      // })
    },
    /* 获取统计数据 */
    getData2 () {
      // console.log('走2方法')
      // const self = this
      // let params = {limit: self.limit, pagestart: self.pageStart2}
    },
    init () {
      // this.$vux.loading.show()
    }
  },
  created () {
    this.init()
  },
  activated () {
    this.initData()
    switch (this.selectedIndex) {
      case 0:
        if (!this.tabdata1.length) {
          this.getData()
        }
        break;
      case 1:
        if (!this.tadData2.length) {
          this.getData2()
        }
        break;
    }
  }
}
</script>

<style lang="less">
.b-tab .vux-tab .vux-tab-item.vux-tab-selected{color:#ea3a3a;}
.b-tab .vux-tab-ink-bar{background-color:#ea3a3a;}
.qbtn{
  display: inline-block;
  vertical-align: middle;
  border-radius: 50px;
  text-align: center;
  padding: 5px 10px;
  font-size: 14px;
  line-height: 1;
  color: #ea3a3a;
  border: #ea3a3a 1px solid;
}
.active{background-color: #f8f9e4 !important;}
.time-color{color:#d7d7d7;}
.apply{height: 76px;box-sizing: border-box;padding: 15px;background-color: #d7d7d7;margin-bottom: 15px;}
.radiusarea:after{content:"";clear:both;display:block;}
.radiusarea .item{float:left;width:33.333333%;text-align:center;}
.radiusarea .inner{padding:20px 10px 0 10px;}
.radiusarea .radius{margin:0 auto;width:60px;height:60px;border-radius:50%;background-color:#69d6e3;color:#fff;line-height:60px;}
.radiusarea .title{margin-top:5px;line-height:25px;}
.radiusarea .item:nth-child(1) .radius{background-color:#3ecbc0;}
.radiusarea .item:nth-child(2) .radius{background-color:#f0cb51;}
.radiusarea .item:nth-child(3) .radius{background-color:#aed370;}
.radiusarea .item:nth-child(4) .radius{background-color:#3ecbc0;}
.radiusarea .item:nth-child(5) .radius{background-color:#f0cb51;}
.radiusarea .item:nth-child(6) .radius{background-color:#aed370;}
.left-progress{position: relative;}
.left-progress:after{
  content: "";display:block;
  border-right:#d7d7d7 1px solid;
	position: absolute;top: 45px;left: 50%;bottom: 45px;
}
.progress{height: 76px;margin-bottom: 15px;}
.ball{border-radius: 50%;height: 20px;width: 20px;z-index: 99;border: 1px solid #d7d7d7;}
</style>
