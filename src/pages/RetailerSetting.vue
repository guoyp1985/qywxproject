<template>
  <div class="containerarea font14">
    <subscribe v-if="loginUser.subscribe != 1 && !loginUser.isretailer"></subscribe>
    <template v-if="showSetting">
      <retailer-setting
        ref="retailerSetting"
        :query="query"
        :retailer-info="retailerInfo"
        :login-user="loginUser"
        :photoarr="photoarr"
        :showphoto-arr="showphotoArr"
        :submitdata="submitdata"
        :submitdata1="submitdata1"
        :class-data="classData"
        :productClass="productClass"
        :buyonline="buyonline"
        :buyoffline="buyoffline"
        :submitSuggest="submitSuggest"
        @clickSuggest="clickSuggest">
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
import Subscribe from '@/components/Subscribe'
import ENV from 'env'
import { User } from '#/storage'

export default {
  components: {
    RetailerSetting, RetailerApply, Subscribe
  },
  data () {
    return {
      query: {},
      loginUser: {},
      showSetting: false,
      showApply: false,
      retailerInfo: {},
      submitdata: { title: '', productclass: '', qrcode: '', buyonline: 1, content: '', fastreply: '你好，请稍等，一会为你服务' },
      submitdata1: { showphoto: '', slogan: '', tags: '' },
      photoarr: [],
      showphotoArr: [],
      classData: [],
      productClass: [],
      buyonline: true,
      buyoffline: false,
      submitSuggest: true
    }
  },
  methods: {
    applySuccess () {
      const self = this
      self.initContainer()
      self.showSetting = true
      self.$vux.loading.hide()
    },
    getData () {
      const self = this
      self.loginUser = User.get()
      self.$http.get(`${ENV.BokaApi}/api/retailer/info`)
      .then(res => {
        self.$vux.loading.hide()
        if (res) {
          let data = res.data
          self.$vux.loading.hide()
          self.retailerInfo = data.data ? data.data : data
          for (let key in self.submitdata) {
            self.submitdata[key] = self.retailerInfo[key]
          }
          if (self.submitdata.buyonline) {
            self.buyonline = true
            self.buyoffline = false
          } else {
            self.buyonline = false
            self.buyoffline = true
          }
          if (this.retailerInfo.params.suggest_open === '1' || this.retailerInfo.params.suggest_open === 1) {
            console.log('进入到了开启')
            this.submitSuggest = true
          } else {
            console.log('进入到了关闭')
            this.submitSuggest = false
          }
          self.productClass = self.retailerInfo.productclass.split(',')
          for (let i = 0; i < self.productClass.length; i++) {
            let num = parseInt(self.productClass[i])
            if (isNaN(num) || num <= 0) {
              delete self.productClass.splice(i, 1)
              i--
            } else {
              self.productClass[i] = num
            }
          }
          for (let key in self.submitdata1) {
            self.submitdata1[key] = self.retailerInfo[key]
          }
          let qrcode = self.submitdata.qrcode
          if (qrcode && self.$util.trim(qrcode) !== '') {
            self.photoarr = qrcode.split(',')
          }
          let showphoto = self.submitdata1.showphoto
          if (showphoto && self.$util.trim(showphoto) !== '') {
            self.showphotoArr = showphoto.split(',')
          }
        }
      })
    },
    clickSuggest (val) {
      console.log(val)
      this.$http.post(`${ENV.BokaApi}/api/card/setParas`, {
        params: {suggest_open: val}
      }).then(res => {
        const data = res.data
        if (data.flag) {
          this.loginUser.retailerinfo.params = data.data
          this.retailerInfo.params = data.data
          User.set(this.loginUser)
        }
      })
    },
    init () {
      this.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, {
        module: 'retailer', action: 'setting'
      })
    },
    initContainer () {
      const self = this
      self.showApply = false
      self.showSetting = false
    },
    refresh () {
      const self = this
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.$vux.loading.show()
      this.loginUser = User.get()
      this.query = this.$route.query
      if (this.loginUser && (this.loginUser.subscribe === 1 || this.loginUser.isretailer)) {
        self.initContainer()
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
          if (!self.loginUser.isretailer) {
            self.initContainer()
            self.showApply = true
          } else {
            self.$vux.loading.hide()
            self.initContainer()
            self.showSetting = true
            self.getData()
          }
        })
      }
    }
  },
  created () {
    this.init()
  },
  activated () {
    this.refresh()
    this.$util.miniPost()
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
