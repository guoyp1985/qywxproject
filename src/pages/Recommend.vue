/*
* @description: 返点客页
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div id="to-recommend">
    <tab v-model="selectedIndex" class="bg-white">
      <tab-item class="font14" selected @on-item-click="clickTabItem">全部收入</tab-item>
      <tab-item class="font14" @on-item-click="clickTabItem">客户资源</tab-item>
    </tab>
    <div class="x-card">
      <div class="border-box posi_r" v-show="selectedIndex===0">
        <div class="rebates-explain font12 color-red">
          <i class="al al-gantanhaozhong font20 v_middle"></i>
          <span class="v_middle">{{$t('Point Of Return')}}</span>
        </div>
        <card @click.native="withdrawClick">
          <div slot="content" class="card-demo-flex card-demo-content01">
            <div class="vux-1px-r">
              <div class="color-red font18">￥200.00</div>
              <div class="color-gray font14 mt5">{{$t('Total Amount')}}</div>
            </div>
            <div class="vux-1px-r">
              <div class="color-red font18">￥10.00</div>
              <div class="color-gray font14 mt5">{{$t('Waiting To Rebate')}}</div>
            </div>
            <div class="vux-1px-r">
              <div class="color-red font18">￥5.00</div>
              <div class="color-gray font14 mt5">{{$t('Waiting To Return Money')}}</div>
            </div>
          </div>
        </card>
      </div>
      <div class="border-box posi_r" v-show="selectedIndex===1">
        <card @click.native="bringCustomerClick">
          <div slot="content" class="card-demo-flex card-demo-content01">
            <div class="vux-1px-r">
              <div class="color-red font18">20人</div>
              <div class="color-gray font14 mt5">{{$t('Total Number')}}</div>
            </div>
            <div class="vux-1px-r">
              <div class="color-red font18">20人</div>
              <div class="color-gray font14 mt5">{{$t('Purchase Number')}}</div>
            </div>
            <div>
              <div class="color-red font18">50%</div>
              <div class="color-gray font14 mt5">{{$t('Purchase Ratio')}}</div>
            </div>
          </div>
        </card>
      </div>
      <div class="button-cell">
        <x-button @click.native="withdrawClick" class="btn-show">{{$t('To Make Presentation')}}</x-button>
      </div>
    </div>
    <div class="return-shop bg-white">
      <h2 class="return-title b_bottom_after">{{$t('My Return Stores')}}</h2>
      <group v-if="list.length">
        <cell-box v-for="(item, index) in list" :key="item.id" :link="{name: 'tRebateStore', query: {id: item.id, uid: item.uid}}">
          <div class="store-img">
            <x-img :src="item.photo" default-src="../src/assets/images/nopic.jpg"></x-img>
          </div>
          <div class="store-info font14">
            <div class="store-name">
              {{item.title}}
            </div>
            <div class="store-money color-gray mt5 font12">
              <span class="color-red">1</span>件商品可赚拥金
            </div>
          </div>
        </cell-box>
      </group>
      <div v-else class="no-related-x color-gray">
        <span>{{$t('No Related Ruturn Stores')}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import {Tab, TabItem, Group, CellBox, XImg, Sticky, XButton, Card} from 'vux'
import ENV from 'env'

export default {
  components: {
    Tab, TabItem, Group, CellBox, XImg, Sticky, XButton, Card
  },
  data () {
    return {
      selectedIndex: 0,
      list: [],
      list1: []
    }
  },
  methods: {
    applyClick (id) {
      this.$router.push({name: 'tRebateApply'})
    },
    getMyRetailer () {
      this.$http.get(`${ENV.BokaApi}/api/seller/myRetailerList`)
      .then(res => {
        this.list = res.data
      })
    },
    getBuyRetailer () {
      this.$http.get(`${ENV.BokaApi}/api/seller/buyRetailerList`)
      .then(res => {
        this.list1 = res.data
      })
    },
    clickTabItem (index) {
      switch (index) {
        case 0:
          this.getMyRetailer()
          break
        case 1:
          this.getBuyRetailer()
          break
      }
    },
    withdrawClick () {
      this.$router.push({path: '/userRebateInfo'})
    },
    bringCustomerClick () {
      this.$router.push({path: '/bringCustomer'})
    }
  },
  created () {
    this.getMyRetailer()
    this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
  }
}
</script>

<style lang="less">
.return-shop .return-title{
  margin-top: 10px;
  padding: 10px 15px 10px 22px;
  font-size: 16px;
  color: inherit;
  position: relative;
  font-weight: normal;
}
.return-shop .return-title:before{
  content: " ";
  position: absolute;
  left: 0px;
  top: 13px;
  bottom: 13px;
  width: 0px;
  border-left: 2px solid red;
  color: #D9D9D9;
  left: 15px;
}
.card-demo-flex {
  display: flex;
}
.card-demo-content01 {
  padding: 10px 0;
}
.card-padding {
  padding: 15px;
}
.card-demo-flex > div {
  flex: 1;
  text-align: center;
  font-size: 12px;
}
.card-demo-flex span {
  color: #f74c31;
}
.x-card{
  background-color: #fff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.14);
}
#to-recommend .rebates-explain{
  position: absolute;
  z-index: 2;
  top: -37px;
  right: 10px;
}
#to-recommend .vux-tab-wrap{
  z-index: 2;
  padding-top: 69px;
}
#to-recommend .weui-panel{margin-top: 0;}
#to-recommend .weui-panel:before{display: none;}
#to-recommend .vux-1px-r:after{top:10%;bottom:10%;}
#to-recommend .vux-tab-container{
  width: 60%;
  margin: 0 auto;
  height:35px;
}
@media only screen and (max-width:375px){
  #to-recommend .vux-tab-container{width: 50%;}
}
#to-recommend .vux-tab{
  height:35px;
}
#to-recommend .vux-tab-ink-bar{
  background-color: red;
  height: 35px !important;
}
#to-recommend .vux-tab .vux-tab-item{
  background: transparent;
  line-height:35px;
  color:red
}
#to-recommend .vux-tab-container{
  margin-top: 20px;
  border: 1px solid red;
  border-radius: 6px;
  box-sizing: border-box;
}
#to-recommend .vux-tab .vux-tab-item.vux-tab-selected{
  background-color: red;
  color: #fff;
  position: relative;
  z-index: 2;
}
// #to-recommend .recommend-title {
//   padding: 10px 20px;
//   position: relative;
//   background-color: #ffffff;
// }
// #to-recommend .recommend-title:after {
//   content: ' ';
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   height: 1px;
//   border-bottom: 1px solid #e7e7e7;
// }
#to-recommend .bought-stores {
  margin-top: 10px;
}
#to-recommend .store-info {
  flex: 1;
  padding-left: 10px;
}
#to-recommend .store-img {
  display: flex;
}
#to-recommend .store-img img{
  width: 60px;
  height: 60px;
}
#to-recommend .button-cell {
  padding: 10px 0;
  text-align: center;
}

/* vux css hack */
#to-recommend .weui-cells {
  margin-top: 0;
}
#to-recommend .weui-cells:first-of-type:before {
  height: 0;
  border-top: none;
}
#to-recommend .btn-show{
  width:120px;
  height:35px;
  line-height:33px;
  border-radius:6px;
  border:1px solid red;
  color:red;
  font-size:14px;
  text-align:center;
  // position: absolute;
  // bottom:10px;
  // left:0;
  // right:0;
  // margin:0 auto;
  box-sizing: border-box;
  background-color: #ffffff
}
#to-recommend .weui-panel:after {
  height: 0;
  border-bottom: none;
}
</style>
