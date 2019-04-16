<template>
  <div id="centersales" class="containerarea font14">
    <template v-if="loginUser">
      <template v-if="loginUser.subscribe != 1">
        <div class="pagemiddle flex_center" style="top:0;">
          <img :src="WeixinQrcode" style="max-width:90%;max-height:90%;" />
        </div>
        <div class="pagebottom flex_center b_top_after font16">请先关注</div>
      </template>
      <template v-else>
        <template v-if="showCenter">
          <center-factory :factory-info="factoryinfo" :endTime="endTime" :messages="messages" :login-user="loginUser"></center-factory>
        </template>
      </template>
    </template>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from 'vux'
import CenterFactory from '@/components/CenterFactory'
import ENV from 'env'
import Time from '#/time'
import { User } from '#/storage'

export default {
  components: {
    Swiper, SwiperItem, CenterFactory
  },
  data () {
    return {
      showCenter: false,
      showApply: false,
      afterApply: false,
      selectedIndex: 0,
      factoryinfo: {},
      loginUser: null,
      classData: [],
      WeixinQrcode: ENV.WeixinQrcode,
      messages: 0,
      endTime: ''
    }
  },
  methods: {
    getData () {
      const self = this
      self.$vux.loading.show()
      self.$http.get(`${ENV.BokaApi}/api/user/show`).then(function (res) {
        if (res.status === 200) {
          self.loginUser = res.data
          User.set(self.loginUser)
          if (self.loginUser.subscribe !== 1) {
            self.$vux.loading.hide()
          } else {
            self.showCenter = true
            self.$http.get(`${ENV.BokaApi}/api/factory/info`).then(function (res) {
              if (res.status === 200) {
                let data = res.data
                self.factoryinfo = data.data ? data.data : data
                self.endTime = new Time(self.factoryinfo.endtime * 1000).dateFormat('yyyy-MM-dd')
                let photoArr = [self.factoryinfo.photo]
                self.factoryinfo.photoArr = self.$util.previewerImgdata(photoArr)
                self.$vux.loading.hide()
                return self.$http.get(`${ENV.BokaApi}/api/message/newMessages`)
              }
            }).then(function (res) {
              if (res) {
                let data = res.data
                self.messages = data.data
              }
            })
          }
        }
      })
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.getData()
    }
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less">
.in-btn{
  width:90px;height:35px;line-height:35px;text-align:center;border-radius:5px;
  color:#15a3ee;background-color:#fff;box-shadow: 0 0 8px 2px #52c4f4;font-size: 16px !important;
  position: absolute;left: 50%;margin-left: -45px;bottom: 60px;
}
#centersales .vux-swiper-item img{
  object-fit: cover;
  width: 100%;
  height:100%;
  max-height:100%;
  overflow: hidden;
  object-position: center center;
}
#centersales .vux-slider > .vux-indicator,#centersales .vux-slider .vux-indicator-right{right:50%;margin-right:-18px;bottom:25px;}
</style>
