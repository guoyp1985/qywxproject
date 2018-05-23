<template>
  <router-link :to="{path: '/retailerOrderDetail', query: {id: data.id}}" class="bk-orderitem order-item scroll_item mb10 font14 db list-shadow">
    <div class="bg-white padding12 b_bottom_after font13 flex_center ">
        <div class="flex_cell color-lightgray"><!-- 创建时间：<slot name="createdate"></slot> -->
          {{ $t('Order Number')}}：<slot name="orderno"></slot>
        </div>
        <div class="align_right color-red4" style="width:100px;"><slot name="flagstr"></slot></div>
    </div>
    <slot name="productlist"></slot>
    <div class="bg-white padding10 b_top_after b_bottom_after color-gray5">
        <slot name="receivearea"></slot>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'Orderitemplate',
  props: {
    data: Object
  }
}
</script>

<style lang="less">
</style>
