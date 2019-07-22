<template>
  <div class="bk-orderitem order-item scroll_item mb10 font14 db list-shadow">
    <div @click="toOrder(data)" class="bg-white padding10 b_bottom_after font12 flex_center ">
        <div class="color-lightgray" style="width:210px;"><!-- 创建时间：<slot name="createdate"></slot> -->
          {{ $t('Order Number')}}：<slot name="orderno"></slot>
        </div>
        <div class="flex_cell align_right color-red4"><slot name="flagstr"></slot></div>
    </div>
    <div @click="toOrder(data)">
      <slot name="productlist"></slot>
    </div>
    <div class="bg-white padding10 b_top_after b_bottom_after color-gray5">
        <slot name="receivearea"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Orderitemplate',
  props: {
    data: Object,
    orderLink: {
      type: String,
      default: '/retailerOrderDetail'
    },
    from: {
      type: String,
      default: ''
    }
  },
  methods: {
    toOrder (data) {
      let params = this.$util.handleAppParams(this.$route.query, {id: data.id})
      this.$router.push({path: this.orderLink, query: params})
    }
  }
}
</script>

<style lang="less">
</style>
