<template>
  <div class="containerarea font14">
    <div class="pagemiddle flex_center" style="top:0;">
      <div>
        <img :src="WeixinQrcode" style="max-width:90%;max-height:90%;margin:0 auto;display:block;" />
        <div class="align_left padding10" style="width:90%;box-sizing:border-box;margin:0 auto;">
          <div>1、长按识别或保存二维码关注【{{WeixinName}}】</div>
          <div>2、搜索公众号【{{WeixinName}}】加关注</div>
        </div>
      </div>
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
      WeixinQrcode: ENV.WeixinQrcode,
      WeixinName: ENV.WeixinName
    }
  }
}
</script>
