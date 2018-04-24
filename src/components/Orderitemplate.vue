<template>
  <router-link :to="{path: '/orderDetail', query: {id: item.id}}" class="bk-orderitem order-item scroll_item mb10 font14 db">
    <div class="bg-white padding10 b_bottom_after font12 flex_center">
        <div class="flex_cell color-gray5">创建时间：<slot name="createdate"></slot></div>
        <div class="align_right color-orange5" style="width:100px;"><slot name="flagstr"></slot></div>
    </div>
    <slot name="productlist"></slot>
    <div class="bg-white padding10 b_top_after b_bottom_after color-gray5">
        <div class="clear">
          <div class="fl">
            <slot name="avatar"></slot>
            <slot name="username"></slot>
          </div>
          <slot name="seller"></slot>
        </div>
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
