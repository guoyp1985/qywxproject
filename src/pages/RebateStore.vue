/*
* @description: 返点商铺页面
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div id="rebate-store">
    <div class="bg-white">
      <div class="sharing-title">{{$t('Current Store')}}</div>
      <sticky scroll-box="rebate-store">
        <div class="pt5 pb5 pl15 pr15 flex_table">
          <div class="store-photo"><x-img :src="photo" default-src="../src/assets/images/nopic.jpg"></x-img></div>
          <div class="store-details flex_cell pl10">
            <span class="db font14">{{title}}</span>
            <span class="db color-gray font12 clamp1">店主说：勤分享，勤推荐，好友购买立返佣金！</span>
          </div>
        </div>
        <div class="rebate-store-title flex_table">
          <div class="flex_cell align_right pr20">
            <a @click="onShareCard" class="qbtn4"><i class="al al-a166 font12" style="line-height:12px"></i> {{$t('To Recommend Store')}}</a>
          </div>
          <div class="flex_cell align_left pl20">
            <a @click="commingCustomerClick" class="qbtn4">{{$t('Bring Customer')}}：{{customers}}</a>
          </div>
        </div>
      </sticky>
    </div>
    <div class="mt10 bg-white">
      <div class="sharing-title">{{$t('I Am In The Store')}}</div>
      <card>
        <div slot="content" class="card-flex card-content">
          <div class="vux-1px-r" @click="totalSalesClick">
            <span class="font18 db color-red">{{income}}</span>
            <span class="font14 db color-gray">{{$t('Income Of Our Shop')}}</span>
          </div>
          <div class="vux-1px-r" @click="rebateAmountClick">
            <span class="font18 db color-red">{{torebate}}</span>
            <span class="font14 db color-gray">{{$t('Waiting To Rebate')}}</span>
          </div>
          <div @click="rebateAmountClick">
            <span class="font18 db color-red">{{towithdraw}}</span>
            <span class="font14 db color-gray">{{$t('Waiting To Return Money')}}</span>
          </div>
        </div>
      </card>
    </div>
    <div class="mt10 bg-white">
      <div class="sharing-title color-red b_bottom_after">{{$t('Immediately Make Money By Sharing')}}</div>
      <tab v-model="selectedIndex">
        <tab-item class="b_right_after" selected @on-item-click="onItemClick">{{$t('Product')}}</tab-item>
        <tab-item class="b_right_after" @on-item-click="onItemClick">{{$t('Activity')}}</tab-item>
        <tab-item @on-item-click="onItemClick">{{$t('Article')}}</tab-item>
      </tab>
      <view-box v-show="selectedIndex===0">
        <template v-if="list.length">
          <group v-for="(item, index) in list" :key="index">
            <cell :title="item.productName" class="list-item font14 clamp2" is-link>
              <x-img slot="icon" class="product-img" :src="item.imgUrl"></x-img>
              <div slot="inline-desc" class="inline-desc font12 color-gray">
                <span class="info-cell">
                  零售价：<span>{{item.sharingCounts}}</span>
                </span>
                <span class="date-cell color-red">
                  佣金：<span>{{item.sharingCounts}}</span>
                </span>
              </div>
            </cell>
          </group>
        </template>
        <template v-else>
          <div class="no-related-x color-gray">
            <span>{{$t('No Related Orders')}}</span>
          </div>
        </template>
      </view-box>
      <view-box v-show="selectedIndex===1">
        <template v-if="list1.length">
          <group v-for="(item, index) in list" :key="index">
            <cell :title="item.productName" class="list-item font14 clamp2" is-link>
              <x-img slot="icon" class="product-img" :src="item.imgUrl"></x-img>
              <div slot="inline-desc" class="inline-desc font12 color-gray">
                <span class="info-cell">
                  零售价：<span>{{item.sharingCounts}}</span>
                </span>
                <span class="date-cell color-red">
                  佣金：<span>{{item.sharingCounts}}</span>
                </span>
              </div>
            </cell>
          </group>
        </template>
        <template v-else>
          <div class="no-related-x color-gray">
            <span>{{$t('No Related Orders')}}</span>
          </div>
        </template>
      </view-box>
      <view-box v-show="selectedIndex===2">
        <template v-if="list2.length">
          <group v-for="(item, index) in list" :key="index">
            <cell :title="item.productName" class="list-item font14 clamp2" is-link>
              <x-img slot="icon" class="product-img" :src="item.imgUrl"></x-img>
              <div slot="inline-desc" class="inline-desc font12 color-gray">
                <span class="info-cell">
                  零售价：<span>{{item.sharingCounts}}</span>
                </span>
                <span class="date-cell color-red">
                  佣金：<span>{{item.sharingCounts}}</span>
                </span>
              </div>
            </cell>
          </group>
        </template>
        <template v-else>
          <div class="no-related-x color-gray">
            <span>{{$t('No Related Orders')}}</span>
          </div>
        </template>
      </view-box>
    </div>
    <div v-transfer-dom class="qrcode-dialog">
      <x-dialog v-model="storeCardShow">
        <div class="img-box">
          <img :src="storeQrCode" style="max-width:100%">
        </div>
        <div>
          <span>{{$t('Save Picture To Sharing')}}</span>
        </div>
        <div @click="storeCardShow=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>
  </div>
</template>
<script>
import { Group, Cell, Card, Tab, TabItem, ViewBox, XImg, Sticky, XDialog, TransferDom } from 'vux'
import Time from '#/time'
import ENV from 'env'

export default {
  directives: {
    TransferDom
  },
  components: {
    Group, Cell, Card, Tab, TabItem, ViewBox, XImg, Sticky, XDialog
  },
  data () {
    return {
      income: 0,
      torebate: 0,
      towithdraw: 0,
      customers: 0,
      title: '',
      photo: '',
      selectedIndex: 0,
      storeCardShow: false,
      storeQrCode: '',
      list: [
        {
          id: '1',
          productName: '清代著名花鸟画家',
          imgUrl: '',
          viewCounts: 0,
          sharingCounts: 0,
          dateLine: 1523446874216
        }
      ],
      list1: [
        {
          id: '1',
          productName: '清代著名花鸟画家1',
          imgUrl: '',
          viewCounts: 0,
          sharingCounts: 0,
          dateLine: 1523446874216
        }
      ],
      list2: [
        {
          id: '1',
          productName: '清代著名花鸟画家2',
          imgUrl: '',
          viewCounts: 0,
          sharingCounts: 0,
          dateLine: 1523446874216
        }
      ]
    }
  },
  filters: {
    dateFormat (date) {
      return new Time(date).format()
    }
  },
  methods: {
    onItemClick () {
      switch (this.selectedIndex) {
        case 0:
          this.getList()
          break
        case 1:
          this.getList1()
          break
        case 2:
          this.getList2()
          break
      }
    },
    onShareCard () {
      this.storeCardShow = true
    },
    totalSalesClick () {
      const uid = this.$route.query.uid
      this.$router.push({path: '/userRebateInfo', query: {uid: uid}})
    },
    rebateAmountClick () {
      const uid = this.$route.query.uid
      this.$router.push({path: '/userRebateInfo', query: {uid: uid}})
    },
    commingCustomerClick () {
      const uid = this.$route.query.uid
      this.$router.push({path: '/bringCustomer', query: {uid: uid}})
    },
    getData () {
      const self = this
      const uid = this.$route.query.uid
      this.$http.post(`${ENV.BokaApi}/api/seller/rebateinfo`, {wid: uid})
      .then(res => {
        self.income = res.data.income
        self.torebate = res.data.torebate
        self.towithdraw = res.data.towithdraw
        self.customers = res.data.customers
        self.title = res.data.title
      })
    },
    getList () {
      const self = this
      const uid = this.$route.query.uid
      this.$http.post(`${ENV.BokaApi}/api/seller/shareList/product`, {wid: uid})
      .then(res => {
        console.log(res.data)
      })
    },
    getList1 () {
      const self = this
      const uid = this.$route.query.uid
      this.$http.post(`${ENV.BokaApi}/api/seller/shareList/activity`, {wid: uid})
      .then(res => {
      })
    },
    getList2 () {
      const self = this
      const uid = this.$route.query.uid
      this.$http.post(`${ENV.BokaApi}/api/seller/shareList/news`, {wid: uid})
      .then(res => {
      })
    }
  },
  created () {
    this.getData()
    this.getList()
  }
}
</script>
<style lang="less">
#rebate-store .rebate-store-title {
  padding:10px 15px 20px 15px;
}
#rebate-store .rebate-store-title .qbtn4{
  color:red;
  font-size:12px;
  border:1px solid red;
  width:100px;
  text-align:center;
  display:inline-block;
  box-sizing:border-box;
  line-height:1.4;
}
#rebate-store .card-flex {
  display: flex;
}
#rebate-store .card-content {
  padding: 0px 0 20px 0;
}
#rebate-store .card-flex > div {
  flex: 1;
  text-align: center;
  font-size: 12px;
}
#rebate-store .card-flex span {
  color: #67b8e1;
}
#rebate-store .sharing-title {
  padding: 10px 15px 10px 22px;
  font-size: 16px;
  position: relative;
  color:inherit;
}
#rebate-store .sharing-title:before{
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
#rebate-store .list-item .inline-desc {
  margin-top: 8px;
}
#rebate-store .list-item .product-img {
  width: 60px;
  height: 60px;
}
#rebate-store .list-item .date-cell {
  float: right;
  margin-right: 10px
}
#rebate-store .info-cell span{
  display: inline-block;
  width: 28px;
  padding-left: 4px;
}
.qrcode-dialog .img-box {
  height: 350px;
  overflow: hidden;
}
.qrcode-dialog .vux-close {
  margin-top: 8px;
  margin-bottom: 8px;
}
/* vux css hack */
#rebate-store .weui-cell__hd {
  display: flex;
}
#rebate-store .vux-cell-primary {
  padding-left: 10px;
}
#rebate-store .weui-cells {
  margin-top: 0;
}
#rebate-store .weui-cells:before {
  height: 0;
  border-top: none;
}
#rebate-store .weui-panel{margin-top:0px}
#rebate-store .weui-panel:before{display:none}
#rebate-store .vux-1px-r:after{top:10%;bottom:10%;}
#rebate-store .store-photo{width:50px;}
#rebate-store .store-photo img{width:50px;height:50px;object-fit:cover;display:block;}
#rebate-store .store-details{align-self:center;}
#rebate-store .vux-tab{background-color:@tab-background-color;}
#rebate-store .vux-tab .vux-tab-item.vux-tab-selected{color:@tab-active-text-color;background:@tab-active-background-color;}
#rebate-store .vux-tab-ink-bar{height:1px !important;background-color:@tab-background-red;}
#rebate-store .weui-cell__ft{display:none;}
#rebate-store .vux-cell-primary p{
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  white-space: normal;
  -webkit-line-clamp: 2;
}
#rebate-store .weui-tab__panel {
  padding-bottom: 0;
}
</style>
