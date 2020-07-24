/*
* @description: 领取优惠券
* @auther: gyp
* @created_date: 2018-10-23
*/
<template>
  <div class="containerarea font14 receive-card flex_center">
    <div class="imgarea">
      <div class="inner">
        <div class="img-outer">
          <img class="img" src="https://tossharingsales.boka.cn/images/card_bg3.png" />
          <div class="txt flex_center">
            <div v-if="disCardInfo" class="w_100">
              <div class="color-yellow font16 align_center" style="margin:0 auto;">满{{params.joincard_ordermoney}}减{{params.joincard_facemoney}}</div>
              <div class="font12 align_center" style="margin:0 auto;color:#e0d9d9;">(7日内有效)</div>
            </div>
          </div>
          <div class="btnarea" @click="receive"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ENV from 'env'
import { User } from '#/storage'
const jweixin = require('../../static/jweixin')
let self = {}
export default {
  data () {
    return {
      query: {},
      loginUser: {},
      retailerInfo: {},
      params: {},
      disCardInfo: false,
      isIng: false
    }
  },
  methods: {
    receive () {
      if (!self.isIng) {
        self.isIng = true
        self.$http.post(`${ENV.BokaApi}/api/card/getCard`, {
          wid: self.retailerInfo.uid,
          type: 'joincard',
          gid: self.query.gid,
          openid: self.query.miniopenid
        }).then(res => {
          const data = res.data
          if (data.flag) {
            self.$vux.toast.show({
              text: '领取成功',
              type: 'success'
            })
            setTimeout(function () {
              let minibackurl = decodeURIComponent(self.query.minibackurl)
              if (self.query.backtype === 'relaunch') {
                jweixin.miniProgram.reLaunch({url: `${minibackurl}`})
              } else if (self.query.backtype === 'redirect') {
                jweixin.miniProgram.redirectTo({url: `${minibackurl}`})
              } else {
                jweixin.miniProgram.navigateTo({url: `${minibackurl}`})
              }
            }, 600)
          } else {
            const timeoute = self.$util.delay(data.error)
            self.$vux.toast.show({
              text: data.error,
              type: 'warn',
              time: timeoute
            })
            setTimeout(function () {
              let minibackurl = decodeURIComponent(self.query.minibackurl)
              if (self.query.backtype === 'relaunch') {
                jweixin.miniProgram.reLaunch({url: `${minibackurl}`})
              } else if (self.query.backtype === 'redirect') {
                jweixin.miniProgram.redirectTo({url: `${minibackurl}`})
              } else {
                jweixin.miniProgram.navigateTo({url: `${minibackurl}`})
              }
            }, timeoute)
          }
        })
      }
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      self.isIng = false
      self.loginUser = User.get()
      self.query = self.$route.query
      let params = {}
      if (self.query.uid) {
        params.uid = self.query.uid
      } else {
        params.uid = self.loginUser.uid
      }
      if (self.query.share_uid) {
        params.share_uid = self.query.share_uid
        params.share_module = 'centerseller'
      }
      if (self.query.lastshareuid) {
        params.lastshareuid = self.query.lastshareuid
      }
      self.$http.get(`${ENV.BokaApi}/api/retailer/info`, {
        params: params
      }).then(function (res) {
        const data = res.data
        console.log(data)
        if (data.flag) {
          self.retailerInfo = data.data
          self.params = self.retailerInfo.params
          self.disCardInfo = true
        }
      })
    }
  },
  activated () {
    self = this
    self.refresh()
    this.$util.miniPost()
  }
}
</script>

<style lang="less" scoped>
.receive-card{background-color:#000;}
.receive-card .imgarea{width:100%;max-width:450px;position:relative;}
.receive-card .imgarea .inner{width:100%;padding-bottom:101.777%;position:relative;}
.receive-card .img-outer{position:absolute;left:0;right:0;bottom:0;top:0;}
.receive-card .img-outer .img{width:100%;display:block;margin:0 auto;}
.receive-card .txt-layer{position:absolute;left:0;top:0;right:0;bottom:0;}
.receive-card .txt{position:absolute;left:0;top:0;right:0;bottom:0;}
.receive-card .btnarea{
  width:49%;height:9%;background-color:transparent;z-index:1;
  position:absolute;left:48%;margin-left:-24%;bottom:14%;
}
</style>
