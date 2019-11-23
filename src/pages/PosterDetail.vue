<template>
  <div class="containerarea bg-page font14 notop posterdetail">
    <template v-if="showSos">
      <Sos :title="sosTitle"></Sos>
    </template>
    <template v-if="showContainer">
      <div class="pagemiddle" style="padding:20px;">
        <div class="boxouter flex_center">
          <img class="pic" :src="data" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
        </div>
      </div>
      <div class="pagebottom flex_center">(长按图片保存到相册)</div>
    </template>
  </div>
</template>

<i18n>
</i18n>

<script>
import { XImg } from 'vux'
import Sos from '@/components/Sos'
import ENV from 'env'
export default {
  components: {
    XImg, Sos
  },
  data () {
    return {
      data: {},
      showSos: false,
      sosTitle: '',
      showContainer: false
    }
  },
  methods: {
    getData () {
      const self = this
      this.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, {
        module: 'retailer', action: 'posterdetail'
      }).then(function () {
        return self.$http.post(`${ENV.BokaApi}/api/retailer/getPoster`)
      }).then(function (res) {
        const data = res.data
        self.$vux.loading.hide()
        if (data.flag !== 1) {
          self.sosTitle = data.error
          self.showSos = true
          self.showContainer = false
        } else {
          self.showSos = false
          self.showContainer = true
          self.data = data.data ? data.data : data
        }
      })
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.$vux.loading.show()
      this.getData()
    }
  },
  activated () {
    this.refresh()
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
