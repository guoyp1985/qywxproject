/*
* @description: 返点商铺页面
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div id="rebate-store">
    <sticky scroll-box="rebate-store">
      <div class="rebate-store-title font14 color-white">
        <span>{{$t('Current Store')}}: {{storeName}}</span>
        <a @click="onShareCard" style="float:right"><i class="al al-a166 font15"></i> {{$t('To Recommend Store')}}</a>
      </div>
    </sticky>
    <card>
      <div slot="content" class="card-flex card-content">
        <div class="vux-1px-r" @click="totalSalesClick">
          <span>{{totalSales}}</span>
          <br/>
          {{ $t('Total Sales') }}
        </div>
        <div class="vux-1px-r" @click="rebateAmountClick">
          <span>{{rebateAmount}}</span>
          <br/>
          {{ $t('Rebate Amount') }}
        </div>
        <div @click="commingCustomerClick">
          <span>{{commingCustomer}}</span>
          <br/>
          {{ $t('Coming Customer') }}
        </div>
      </div>
    </card>
    <div class="sharing-title color-gray">
      {{$t('Make Money By Sharing')}}
    </div>
    <tab v-model="selectedIndex">
      <tab-item selected @on-item-click="onItemClick">{{$t('Article')}}</tab-item>
      <tab-item @on-item-click="onItemClick">{{$t('Product')}}</tab-item>
      <tab-item @on-item-click="onItemClick">{{$t('Activity')}}</tab-item>
    </tab>
    <view-box v-show="selectedIndex===0">
      <template v-if="list.length">
        <group v-for="(item, index) in list" :key="index">
          <cell :title="item.productName" class="list-item font14" is-link>
            <x-img slot="icon" class="product-img" :src="item.imgUrl"></x-img>
            <div slot="inline-desc" class="inline-desc font13 color-gray">
              <span class="info-cell">
                <i class="al al-chakan font13"></i><span>{{item.viewCounts}}</span>
                <i class="al al-ai-share font13"></i><span>{{item.sharingCounts}}</span>
              </span>
              <span class="date-cell">
                {{item.dateLine | dateFormat}}
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
          <cell :title="item.productName" class="list-item font14" is-link>
            <x-img slot="icon" class="product-img" :src="item.imgUrl"></x-img>
            <div slot="inline-desc" class="inline-desc font13 color-gray">
              <span class="info-cell">
                <i class="al al-chakan font13"></i><span>{{item.viewCounts}}</span>
                <i class="al al-ai-share font13"></i><span>{{item.sharingCounts}}</span>
              </span>
              <span class="date-cell">
                {{item.dateLine | dateFormat}}
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
          <cell :title="item.productName" class="list-item font14" is-link>
            <x-img slot="icon" class="product-img" :src="item.imgUrl"></x-img>
            <div slot="inline-desc" class="inline-desc font13 color-gray">
              <span class="info-cell">
                <i class="al al-chakan font13"></i><span>{{item.viewCounts}}</span>
                <i class="al al-ai-share font13"></i><span>{{item.sharingCounts}}</span>
              </span>
              <span class="date-cell">
                {{item.dateLine | dateFormat}}
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
import Time from '#/time'

export default {
  data () {
    return {
      totalSales: 0,
      rebateAmount: 0,
      commingCustomer: 0,
      selectedIndex: 0,
      storeName: '',
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

    },
    onShareCard () {
      this.storeCardShow = true
    },
    totalSalesClick () {
      this.$router.push({name: 'tUserRebateInfo'})
    },
    rebateAmountClick () {
      this.$router.push({name: 'tUserRebateInfo'})
    },
    commingCustomerClick () {
      this.$router.push({name: 'tBringCustomer'})
    }
  }
}
</script>
<style lang="less">
#rebate-store .rebate-store-title {
  padding: 10px;
  background-image: url('../assets/images/bannerbg2.png');
}
#rebate-store .card-flex {
  display: flex;
}
#rebate-store .card-content {
  padding: 10px 0;
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
  padding: 10px;
  font-size: 14px
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
</style>
