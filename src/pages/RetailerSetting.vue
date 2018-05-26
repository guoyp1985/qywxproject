<template>
  <div class="containerarea font14">
    <template v-if="showSetting">
      <retailer-setting
        :retailer-info="retailerInfo"
        :login-user="loginUser"
        :photoarr="photoarr"
        :submitdata="submitdata">
      </retailer-setting>
    </template>
    <template v-if="showApply">
      <retailer-apply :login-user="loginUser" :after-apply="applySuccess" :class-data="classData"></retailer-apply>
    </template>
  </div>
</template>

<i18n>
</i18n>

<script>
import RetailerSetting from '@/components/RetailerSetting'
import RetailerApply from '@/components/RetailerApply'
import ENV from 'env'

export default {
  components: {
    RetailerSetting, RetailerApply
  },
  data () {
    return {
      showSetting: false,
      showApply: false,
      retailerInfo: {},
      submitdata: { title: '', qrcode: '', buyonline: 1, content: '', fastreply: '你好，请稍等，一会为你服务' },
      photoarr: [],
      loginUser: {},
      classData: []
    }
  },
  methods: {
    applySuccess () {
      const self = this
      self.showSetting = true
      self.showApply = false
      self.$vux.loading.hide()
    },
    getData () {
      const self = this
      this.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, { module: 'retailer', action: 'setting' })
      .then(res => {
        let data = res.data
        if (data.flag === 1) {
          self.showSetting = true
          self.showApply = false
          return self.$http.get(`${ENV.BokaApi}/api/retailer/home`)
        } else {
          self.showSetting = false
          self.showApply = true
          self.$http.get(`${ENV.BokaApi}/api/list/applyclass?ascdesc=asc`,
            { params: { limit: 100 } }
          ).then(function (res) {
            self.$vux.loading.hide()
            if (res.status === 200) {
              let data = res.data
              data = data.data ? data.data : data
              for (let i = 0; i < data.length; i++) {
                data[i].checked = false
              }
              self.classData = data
            }
          })
        }
      })
      .then(res => {
        let data = res.data
        if (self.showSetting) {
          self.$vux.loading.hide()
          self.retailerInfo = data.data ? data.data : data
          for (let key in self.submitdata) {
            self.submitdata[key] = self.retailerInfo[key]
          }
          let qrcode = self.submitdata.qrcode
          if (qrcode && self.$util.trim(qrcode) !== '') {
            self.photoarr = qrcode.split(',')
          }
        } else if (self.showApply) {
          self.$vux.loading.hide()
          data = data.data ? data.data : data
          for (let i = 0; i < data.length; i++) {
            data[i].checked = false
          }
          self.classData = data
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

<style lang="less" scoped>
.form-item{position:relative;padding:10px;}
.form-item:after{
  content:"";display:block;
	background-color:@list-border-color;height:1px;overflow:hidden;
	position: absolute;left: 0;right: 0;bottom:1px;
	-webkit-transform: scaleY(0.5) translateY(0.5px);
	transform: scaleY(0.5) translateY(0.5px);
	-webkit-transform-origin: 0% 0%;
	transform-origin: 0% 0%;
}
</style>
