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
          <div class="t-cell w80">返点时间</div>
          <div class="t-cell align_right color-gray disdate">{{ data.dateline | dateformat }}</div>
        </div>
      </div>
    </div>
    <div class="padding10 font16">相关订单</div>
    <div class="bg-white padding10 b_bottom_after flex_left">
        <i class="al al-goumaiguodehuiyuan icon-red font20"></i><span class="ml3 v_middle font15">{{ data.linkman }}</span>
    </div
    <div class="scroll_list" v-if="showOrders">
      <div v-if="!orders || orders.length == 0" class="scroll_item emptyitem bg-white">
        <div class="t-table">
          <div class="t-cell">暂无相关订单</div>
        </div>
      </div>
      <div @click="toOrderDetail(item)" :to="{ path: '/retailerOrderDetail', query: { id: item.orderid } }" class="scroll_item mb10 db" v-else v-for="(item,index1) in orders" :key="item.id">
        <div class="padding10">
          <div class="t-table">
            <div class="t-cell w60">
              <img class="imgcover" :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"style="width:50px;height:50px;" />
            </div>
            <div class="t-cell v_middle">
              <div class="clamp2 font12 color-gray5">{{ item.name }}</div>
              <div class="font12"><span class="color-orange">{{ $t('RMB') }}{{ item.special }}</span><span class="color-gray"> × {{ item.quantity }}</span></div>
            </div>
            <div v-if="item.flagstr" class="t-cell w100 align_right v_middle color-red font12">{{item.flagstr}}</div>
          </div>
        </div>
        <div class="bg-white b_bottom_after padding10 flex_left">
          <div>合计：<span class="color-orange">{{ $t('RMB') }} <span class="font16">{{ data.orderstotal }}</span></span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<i18n>
</i18n>

<script>
import { XImg } from 'vux'
import ENV from 'env'
import Time from '#/time'
import { User } from '#/storage'

export default {
  components: {
    XImg
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      query: {},
      loginUser: {},
      data: {},
      orders: [],
      showOrders: false,
      totalPrice: '0.00'
    }
  },
  watch: {
    data: function () {
      return this.data
    },
    totalPrice: function () {
      return this.totalPrice
    }
  },
  methods: {
    toOrderDetail (item) {
      let params = this.$util.handleAppParams(this.query, {id: item.orderid})
      this.$router.push({path: '/retailerOrderDetail', query: params})
    },
    getData () {
      const self = this
      this.$vux.loading.show()
      let queryid = this.query.id
      if (this.query.uid) {
        queryid = this.query.uid
      }
      this.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, {
        module: 'retailer', action: 'accountdetail', id: queryid
      }).then(function () {
        return self.$http.get(`${ENV.BokaApi}/api/accounting/info`, {
          params: { id: queryid }
        })
      }).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        if (data.flag === 1) {
          self.data = data.data
          self.orders = self.data.orders
          self.showOrders = true
        }
      })
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.query = this.$route.query
      this.loginUser = User.get()
      this.getData()
    }
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less" scoped>
</style>
