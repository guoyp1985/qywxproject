<template>
  <router-link :to="{path: orderLink, query: {id: data.id, from: from}}" class="bk-managetemplate order-item scroll_item mb10 font14 db list-shadow">
    <div class="bg-white padding10 b_bottom_after font13 flex_table">
        <!-- <div class="flex_cell color-lightgray">
          {{ $t('Order Number')}}：<slot name="orderno"></slot>
        </div>
        <div class="align_right color-red4" style="width:100px;"><slot name="flagstr"></slot></div> -->
        <div class="inner flex_left">
          <img src="https://tossqzx.boka.cn/month_201812/15446705201956.jpg"></img>
        </div>
        <span class="mt5">YOUNG</span>
        <div class="mt5" style="margin-left:auto;">
          <span class="al al-copy font14 color-red4"></span><span class="font14 color-red4">复制收货地址</span>
        </div>
    </div>
    <slot name="productlist"></slot>
    <div class="bg-white padding10 b_top_after b_bottom_after color-gray5 flex_right">
        <div class="btn canle">取消</div>
        <div class="btn sure">确认收款</div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'Managetemplate',
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
  }
}
</script>

<style lang="less">
.bk-managetemplate{
  .inner{
    width:40px;height:30px;border-radius:50%;
    img{width:30px;height:30px;border-radius:50%;border:1px solid #e5e5e5}
  }
  .btn{width:70px;height:20px;font-size:12px;text-align:center;line-height:20px;border-radius:20px;}
  .canle{border:1px solid #999;color:#999;margin-right:10px;}
  .sure{border:1px solid #fd6c63;color:#fd6c63;}
}
</style>
