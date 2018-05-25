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
      doCreated: false,
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
    initInfo () {
      const self = this
      self.$vux.loading.show()
      self.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, {
        module: 'retailer', action: 'setting'
      }).then(function (res) {
        if (res.status !== 200) {
          self.$vux.loading.hide()
        } else {
          let data = res.data
          if (data.flag === 1) {
            self.showSetting = true
            self.$http.get(`${ENV.BokaApi}/api/retailer/home`).then(function (res) {
              if (res.status === 200) {
                self.$vux.loading.hide()
                let data = res.data
                self.retailerInfo = data.data ? data.data : data
                for (let key in self.submitdata) {
                  self.submitdata[key] = self.retailerInfo[key]
                }
                let qrcode = self.submitdata.qrcode
                if (qrcode && self.$util.trim(qrcode) !== '') {
                  self.photoarr = qrcode.split(',')
                }
              }
            })
          } else {
            self.showCenter = false
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
        }
      })
    }
  },
  created () {
    const self = this
    self.doCreated = true
    self.$store.commit('updateToggleTabbar', {toggleBar: false})
    self.initInfo()
  },
  activated () {
    const self = this
    if (!self.doCreated) {
      self.initInfo()
    }
    self.doCreated = false
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
