/*
* havefactory  申请成为厂家
* haveminiprograms   申请小程勋
* havefactoryminiprograms   授权厂家小程序
* bandfactroy   绑定厂家身份
* haveminpay    自有微信支付
* havesubmit    上传代码提交审核
* haveproduct    商品
* success   运营
*/
<template>
  <div class="containerarea font14 project-info-page">
    <div class="t-table padding10 bg-white mb10" style="box-sizing:border-box;">
      <div class="t-cell v_middle" style="width:70px;">
        <img class="avatarimg3 imgcover v_middle" :src="infoData.factoryinfo.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
      </div>
      <div class="t-cell v_middle">
        <div class="clamp1 font14">{{infoData.factoryinfo.title}}</div>
        <div class="clamp1 mt5 font14" style="color:#ea3a3a">本月我的分佣: ￥{{infoData.mymonthmoney}}</div>
      </div>
      <!-- <div class="t-cell align_right v_middle">
        <div class="qbtn w60">联系</div>
      </div> -->
    </div>
    <div class="s-topbanner1">
      <tab class="b-tab" v-model="selectedIndex">
        <tab-item :selected="selectedIndex==0" @on-item-click="toggleTab">项目进度</tab-item>
        <!-- <tab-item :selected="selectedIndex==1" @on-item-click="toggleTab">经营统计</tab-item> -->
      </tab>
    </div>
    <div v-if="selectedIndex === 0" class="bg-white padding15 db-flex">
      <div class="left-progress">
        <div class="progress w50 flex_center">
          <div class="ball flex_center" :style="{'background-color' : infoData.havefactory ? '#7ca6fa' : 'white'}">
            <span class="font12 color-white" :class="{'al al-gou' : infoData.havefactory}"></span>
          </div>
        </div>
        <div class="progress w50 flex_center">
          <div class="ball flex_center" :style="{'background-color' : infoData.haveminiprograms ? '#7ca6fa' : 'white'}">
            <span class="font12 color-white" :class="{'al al-gou' : infoData.haveminiprograms}"></span>
          </div>
        </div>
        <div class="progress w50 flex_center">
          <div class="ball flex_center" :style="{'background-color' : infoData.havefactoryminiprograms ? '#7ca6fa' : 'white'}">
            <span class="font12 color-white" :class="{'al al-gou' : infoData.havefactoryminiprograms}"></span>
          </div>
        </div>
        <div class="progress w50 flex_center">
          <div class="ball flex_center" :style="{'background-color' : infoData.bandfactroy ? '#7ca6fa' : 'white'}">
            <span class="font12 color-white" :class="{'al al-gou' : infoData.bandfactroy}"></span>
          </div>
        </div>
        <div class="progress w50 flex_center">
          <div class="ball flex_center" :style="{'background-color' : infoData.haveminpay ? '#7ca6fa' : 'white'}">
            <span class="font12 color-white" :class="{'al al-gou' : infoData.haveminpay}"></span>
          </div>
        </div>
        <div class="progress w50 flex_center">
          <div class="ball flex_center" :style="{'background-color' : infoData.havesubmit ? '#7ca6fa' : 'white'}">
            <span class="font12 color-white" :class="{'al al-gou' : infoData.havesubmit}"></span>
          </div>
        </div>
        <div class="progress w50 flex_center">
          <div class="ball flex_center" :style="{'background-color' : infoData.haveproduct ? '#7ca6fa' : 'white'}">
            <span class="font12 color-white" :class="{'al al-gou' : infoData.haveproduct}"></span>
          </div>
        </div>
        <div class="progress w50 flex_center">
          <div class="ball flex_center" :style="{'background-color' : infoData.success ? '#7ca6fa' : 'white'}">
            <span class="font12 color-white" :class="{'al al-gou' : infoData.success}"></span>
          </div>
        </div>
      </div>
      <div style="flex:1;">
        <div class="apply" :class="{'active' : infoData.havefactory}">
          <div class="w_100">
            <div class="font14">申请成为厂家: {{infoData.havefactory ? '已完成' : '未完成'}}</div>
            <!-- <div class="mt5 font12 time-color">2019-08-28 12:00</div> -->
          </div>
        </div>
        <div class="apply" :class="{'active' : infoData.haveminiprograms}">
          <div class="w_100">
            <div class="font14">申请小程序: {{infoData.haveminiprograms ? '已完成' : '未完成'}}</div>
            <!-- <div class="mt5 font12 time-color">2019-08-28 12:00</div> -->
          </div>
        </div>
        <div class="apply" :class="{'active' : infoData.havefactoryminiprograms}">
          <div class="w_100">
            <div class="font14">授权厂家小程序: {{infoData.havefactoryminiprograms ? '已完成' : '未完成'}}</div>
            <!-- <div class="mt5 font12 time-color">2019-08-28 12:00</div> -->
          </div>
        </div>
        <div class="apply" :class="{'active' : infoData.bandfactroy}">
          <div class="w_100">
            <div class="font14">绑定厂家身份: {{infoData.bandfactroy ? '已完成' : '未完成'}}</div>
            <!-- <div class="mt5 font12 time-color">2019-08-28 12:00</div> -->
          </div>
        </div>
        <div class="apply" :class="{'active' : infoData.haveminpay}">
          <div class="w_100">
            <div class="font14">配置自有微信支付: {{infoData.haveminpay ? '已完成' : '未完成'}}</div>
            <!-- <div class="mt5 font12 time-color">2019-08-28 12:00</div> -->
          </div>
        </div>
        <div class="apply" :class="{'active' : infoData.havesubmit}">
          <div class="w_100">
            <div class="font14">上传代码提交审核: {{infoData.havesubmit ? '已完成' : '未完成'}}</div>
            <!-- <div class="mt5 font12 time-color">2019-08-28 12:00</div> -->
          </div>
        </div>
        <div class="apply" :class="{'active' : infoData.haveproduct}">
          <div class="w_100">
            <div class="font14">上传商品: {{infoData.haveproduct ? '已完成' : '未完成'}}</div>
            <!-- <div class="mt5 font12 time-color">2019-08-28 12:00</div> -->
          </div>
        </div>
        <div class="apply" :class="{'active' : infoData.success}">
          <div class="w_100">
            <div class="font14">开始运营: {{infoData.success ? '已完成' : '未完成'}}</div>
            <!-- <div class="mt5 font12 time-color">2019-08-28 12:00</div> -->
          </div>
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
            <div class="radius font12 clamp1">￥{{statData.mymonthmoney}}</div>
            <div class="title color-gray">本月我的分佣</div>
          </div>
        </div>
        <div class="item">
          <div class="inner">
            <div class="radius font12 clamp1">￥{{statData.monthmoney}}</div>
            <div class="title color-gray">本月销售额</div>
          </div>
        </div>
        <div class="item">
          <div class="inner">
            <div class="radius font12 clamp1">￥{{statData.todaymoney}}</div>
            <div class="title color-gray">今日销售额</div>
          </div>
        </div>
      </div>
      <div class="radiusarea mb10 pb15 bg-white list-shadow01">
        <div class="item">
          <div class="inner">
            <div class="radius font12 clamp1">{{statData.productcount}}</div>
            <div class="title color-gray">上架商品</div>
          </div>
        </div>
        <div class="item">
          <div class="inner">
            <div class="radius font12 clamp1">{{statData.orderscount}}</div>
            <div class="title color-gray">本月订单</div>
          </div>
        </div>
        <div class="item">
          <div class="inner">
            <div class="radius font12 clamp1">{{statData.retailercount}}</div>
            <div class="title color-gray">合伙人</div>
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
import ENV from 'env'

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
      pagestart2: 0,
      infoData: {factoryinfo: {}},
      statData: {}
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
      this.$http.post(`${ENV.BokaApi}/api/factory/factoryProgress`, {
        fid: this.query.fid
      }).then((res) => {
        const data = res.data
        if (data.flag) {
          this.infoData = data.data
        }
      })
    },
    /* 获取统计数据 */
    getData2 () {
      this.$http.post(`${ENV.BokaApi}/api/factory/inviterFactoryStat`, {
        fid: this.query.fid
      }).then((res) => {
        const data = res.data
        if (data.flag) {
          this.statData = data.data
        }
      })
    }
  },
  created () {
  },
  activated () {
    this.initData()
    this.query = this.$route.query
    switch (this.selectedIndex) {
      case 0:
        this.getData()
        break;
      case 1:
        this.getData2()
        break;
    }
  }
}
</script>

<style lang="less">
.project-info-page{
  background-color:#f2f2f2;
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
  .apply{
    height:76px;padding:15px;box-sizing: border-box;background-color: #d7d7d7;margin-bottom: 15px;
    display:flex;justify-content: flex-start;align-items: center;
  }
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
}
</style>
