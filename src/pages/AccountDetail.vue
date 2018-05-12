<template>
  <div class="containerarea font14 bg-page">
    <div class="bg-white">
      <div class="b_bottom_after padding10">
        <div class="t-table">
          <div class="t-cell w80">返点给</div>
          <div class="t-cell align_right color-gray">{{ data.linkman }}</div>
        </div>
      </div>
      <div class="b_bottom_after padding10">
        <div class="t-table">
          <div class="t-cell w80">佣金金额</div>
          <div class="t-cell align_right color-orange">{{ $t('RMB') }}{{ data.money }}</div>
        </div>
      </div>
      <div class="b_bottom_after padding10">
        <div class="t-table">
          <div class="t-cell w80">支付凭证</div>
          <div class="t-cell align_right photoarea">
              <template v-if="!data.photo || data.photo == ''">无</template>
              <div v-else>
              </div>
          </div>
        </div>
      </div>
      <div class="b_bottom_after padding10">
        <div class="t-table">
          <div class="t-cell w80">返点时间</div>
          <div class="t-cell align_right color-gray disdate">{{ data.dateline | dateformat }}</div>
        </div>
      </div>
    </div>
    <div class="padding10 font16">相关订单</div>
    <div class="scroll_list">
      <div v-if="!data.orders || data.orders == 0" class="scroll_item emptyitem bg-white">
        <div class="t-table">
          <div class="t-cell">暂无相关订单</div>
        </div>
      </div>
      <router-link :to="{ path: '/orderDetail', query: { id: item.id } }" class="scroll_item mb10 db" v-else v-for="(item,index1) in data.orders" :key="item.id">
        <div class="bg-white padding10 b_bottom_after flex_left">
            <i class="al al-goumaiguodehuiyuan icon-red font20"></i><span class="ml3 v_middle font15">{{ data.username }}</span>
        </div>
        <orderproductplate v-for="(product,pindex) in item.orderlist" :key="product.id">
          <img slot="photo" :src="product.photo" style="width:50px;height:50px;" class="imgcover" />
          <span slot="name">{{ product.name }}</span>
          <span slot="special">{{ product.special }}</span>
          <span slot="quantity" class="font12">{{ product.quantity }}</span>
        </orderproductplate>
        <div class="bg-white b_bottom_after padding10 flex_left">
          <div>合计：<span class="color-orange">{{ $t('RMB') }} <span class="font16">{{ totalPrice }}</span></span></div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<i18n>
</i18n>

<script>
import Orderproductplate from '@/components/Orderproductplate'
import Time from '#/time'

export default {
  components: {
    Orderproductplate
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      data: {
        username: 'SMART',
        linkman: 'SMART',
        money: '0.00',
        photo: '',
        dateline: 1524450730,
        orders: [
          {
            id: 315,
            uid: '187',
            dateline: 1522724948,
            flagstr: '待付款',
            flag: 1,
            username: 'YOUNG',
            linkman: '于国旺',
            telephone: '13051687651',
            address: '北京市东城区金家村',
            avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/187.jpg',
            orderlist: [
              {
                id: 327, photo: 'http://ossgxs.boka.cn/month_201804/15226700508345.jpg', name: '苹果手机', special: '8,000.00', quantity: 1
              }
            ]
          }
        ]
      },
      totalPrice: '0.00'
    }
  },
  created: function () {
    const self = this
    self.$store.commit('updateToggleTabbar', {toggleBar: false})
    let total = 0
    for (let i = 0; i < self.data.orders.length; i++) {
      let o = self.data.orders[i]
      for (let j = 0; j < o.orderlist.length; j++) {
        let d = o.orderlist[j]
        total += parseFloat(d.special.replace(/,/g, '')) * parseInt(d.quantity)
      }
    }
    self.totalPrice = total.toFixed(2)
  },
  watch: {
    data: function () {
      return this.data
    },
    totalPrice: function () {
      return this.totalPrice
    }
  }
}
</script>

<style lang="less" scoped>
</style>
