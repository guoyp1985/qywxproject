<template>
  <div class="containerarea font14">
    <div class="pagemiddle flex_center" style="top:0;">
      <img :src="WeixinQrcode" style="max-width:90%;max-height:90%;" />
    </div>
    <div class="pagebottom flex_center b_top_after font16">请先关注</div>
  </div>
</template>

<script>
import ENV from 'env'

export default {
  name: 'Subscribe',
  data () {
    return {
      WeixinQrcode: ENV.WeixinQrcode
    }
  }
}
</script>
