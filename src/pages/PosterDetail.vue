<template>
  <div class="containerarea bg-page font14 notop posterdetail">
    <div class="pagemiddle" style="padding:20px;">
      <div class="boxouter flex_center">
        <x-img class="pic" :src="data" default-src="../src/assets/images/nopic.jpg"></x-img>
      </div>
    </div>
    <div class="pagebottom flex_center">(长按图片保存到相册)</div>
  </div>
</template>

<i18n>
</i18n>

<script>
import { XImg } from 'vux'
import ENV from 'env'
export default {
  components: {
    XImg
  },
  data () {
    return {
      query: Object,
      data: Object
    }
  },
  created () {
    const self = this
    self.$store.commit('updateToggleTabbar', {toggleBar: false})
    self.query = self.$route.query
    self.$vux.loading.show()
    self.$http.post(`${ENV.BokaApi}/api/retailer/getPoster`).then(function (res) {
      let data = res.data
      self.$vux.loading.hide()
      self.data = data.data ? data.data : data
    })
  }
}
</script>

<style lang="less">
.posterdetail .pagemiddle{
  padding:20px;box-sizing: border-box;
}
.posterdetail .boxouter {
  position: absolute;
  left: 20px;
  right: 20px;
  top: 20px;
  bottom: 20px;
}
.posterdetail .boxouter .pic {
    border: 1px solid #f2f2f2;box-sizing: border-box;
    box-shadow: 5px 5px 10px #d8d6d6;
}
.posterdetail .boxouter img {
    max-width: 100%;
    max-height: 100%;
}
</style>
