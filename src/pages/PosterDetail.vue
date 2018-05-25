<template>
  <div class="containerarea bg-page font14 notop posterdetail">
    <template v-if="showSos">
      <Sos :title="sosTitle"></Sos>
    </template>
    <template v-if="showContainer">
      <div class="pagemiddle" style="padding:20px;">
        <div class="boxouter flex_center">
          <x-img class="pic" :src="data" default-src="../src/assets/images/nopic.jpg"></x-img>
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
      showSos: false,
      sosTitle: '',
      showContainer: false,
      doCreated: false,
      query: {},
      data: ''
    }
  },
  methods: {
    initData () {
      const self = this
      self.$http.post(`${ENV.BokaApi}/api/retailer/getPoster`).then(function (res) {
        let data = res.data
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
    }
  },
  created () {
    const self = this
    self.doCreated = true
    self.$store.commit('updateToggleTabbar', {toggleBar: false})
    self.query = self.$route.query
    self.$vux.loading.show()
    self.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, {
      module: 'retailer', action: 'posterdetail'
    }).then(function (res) {
      if (res.status === 200) {
        self.initData()
      }
    })
  },
  activated () {
    const self = this
    if (!self.doCreated && !self.data.id) {
      self.$vux.loading.show()
      self.initData()
    }
    self.doCreated = false
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
