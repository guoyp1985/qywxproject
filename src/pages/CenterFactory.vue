<template>
  <div id="centersales" class="containerarea font14">
    <template v-if="loginUser.uid">
      <template v-if="loginUser.subscribe != 1 && !query.from">
        <div class="pagemiddle flex_center" style="top:0;">
          <img :src="WeixinQrcode" style="max-width:90%;max-height:90%;" />
        </div>
        <div class="pagebottom flex_center b_top_after font16">请先关注</div>
      </template>
      <div v-else-if="!loginUser.factoryinfo || loginUser.factoryinfo.moderate != 1" class="w_100 h_100 flex_center">
        <apply-factory
          :factory-info="factoryInfo"
          :login-user="loginUser"
          :classData="classData"
          :productClass="productClass"
          :classTitle="classTitle"
          :identityArr="identityArr"
          :factoryIdentity="factoryIdentity"
          :identityTitle="identityTitle"
          :submitData="submitData"
          :tradeData="tradeData"
          @clickPhoto="afterUploadPhoto"
          @afterApply="afterApply">
        </apply-factory>
      </div>
      <template v-else>
        <template v-if="showCenter">
          <center-factory :query="query" :factory-info="factoryInfo" :endTime="endTime" :messages="messages" :login-user="loginUser"></center-factory>
        </template>
      </template>
    </template>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from 'vux'
import CenterFactory from '@/components/CenterFactory'
import ApplyFactory from '@/components/ApplyFactory'
import ENV from 'env'
import Time from '#/time'
import {User} from '#/storage'

export default {
  components: {
    Swiper, SwiperItem, CenterFactory, ApplyFactory
  },
  data () {
    return {
      query: {},
      showCenter: false,
      showApply: false,
      selectedIndex: 0,
      factoryInfo: {},
      loginUser: {},
      classData: [],
      WeixinQrcode: ENV.WeixinQrcode,
      messages: 0,
      endTime: '',
      submitkey: { title: '', mobile: '', company: '', licensephoto: '', licensecode: '', superiorrate: '20', salesrate: '80', identity: '' },
      submitData: {},
      productClass: [],
      classTitle: '',
      identityArr: [
        {id: 1, title: '社群团队'},
        {id: 2, title: '供应链'},
        {id: 3, title: '生产厂家'}
      ],
      factoryIdentity: [],
      identityTitle: '',
      tradeData: []
    }
  },
  methods: {
    afterUploadPhoto (photoarr) {
      delete this.submitData.licensephoto
      this.submitData.licensephoto = photoarr.join(',')
    },
    handleProductClass () {
      const self = this
      self.productClass = []
      if (self.factoryInfo.productclass && self.$util.trim(self.factoryInfo.productclass) !== '') {
        let classStr = []
        let idarr = self.factoryInfo.productclass.split(',')
        for (let i = 0; i < idarr.length; i++) {
          self.productClass.push(parseInt(idarr[i]))
          for (let j = 0; j < self.classData.length; j++) {
            if (parseInt(idarr[i]) === self.classData[j].id) {
              classStr.push(self.classData[j].title)
              break
            }
          }
        }
        if (classStr.length) {
          self.classTitle = classStr.join(',')
        }
      }
      console.log(this.productClass)
    },
    handleIndentity () {
      this.factoryIdentity = []
      if (this.factoryInfo.identity && this.$util.trim(this.factoryInfo.identity) !== '') {
        let iStr = []
        let idarr = this.factoryInfo.identity.split(',')
        for (let i = 0; i < idarr.length; i++) {
          this.factoryIdentity.push(parseInt(idarr[i]))
          for (let j = 0; j < this.identityArr.length; j++) {
            if (parseInt(idarr[i]) === this.identityArr[j].id) {
              iStr.push(this.identityArr[j].title)
              break
            }
          }
        }
        if (iStr.length) {
          this.identityTitle = iStr.join(',')
        }
      }
    },
    afterApply (data) {
      delete this.factoryInfo.id
      this.loginUser.factoryinfo = data
      User.set(this.loginUser)
      this.factoryInfo = data
      this.handleProductClass()
      this.handleIndentity()
    },
    getData () {
      const self = this
      self.$vux.loading.show()
      self.$http.get(`${ENV.BokaApi}/api/user/show`).then(res => {
        self.loginUser = res.data
        User.set(self.loginUser)
        if (self.loginUser.subscribe !== 1 && !self.query.from) {
          self.$vux.loading.hide()
        } else {
          self.showCenter = true
          if (self.loginUser.factoryinfo) {
            self.factoryInfo = self.loginUser.factoryinfo
            self.endTime = new Time(self.factoryInfo.endtime * 1000).dateFormat('yyyy-MM-dd')
            let photoArr = [self.factoryInfo.photo]
            self.factoryInfo.photoArr = self.$util.previewerImgdata(photoArr)
            for (let key in self.submitkey) {
              self.submitData[key] = self.factoryInfo[key]
            }
            this.handleIndentity()
            console.log('厂家身份')
            console.log(self.factoryIdentity)
          } else {
            self.submitData = self.submitkey
          }
          self.$vux.loading.hide()
          return self.$http.get(`${ENV.BokaApi}/api/message/newMessages`)
        }
      }).then(res => {
        if (res) {
          let data = res.data
          self.messages = data.data
        }
        return self.$http.get(`${ENV.BokaApi}/api/list/applyclass?ascdesc=asc`,
          { params: { limit: 100 } }
        )
      }).then(function (res) {
        if (res) {
          let data = res.data
          data = data.data ? data.data : data
          self.classData = data
          self.handleProductClass()
        }
        return self.$http.get(`${ENV.BokaApi}/api/factory/modulefield`,
          { params: {module: 'factory', field: 'trade'} }
        )
      }).then(function (res) {
        if (res) {
          let data = res.data
          data = data.data ? data.data : data
          self.tradeData = data
        }
      })
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.query = this.$route.query
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
