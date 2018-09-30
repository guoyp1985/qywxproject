<template>
  <div id="centersales" class="containerarea font14">
    <template v-if="loginUser">
      <template v-if="afterApply">
        <swiper :show-dots="true" v-model="selectedIndex" class="x-swiper">
          <swiper-item>
            <img class="db mauto" src="https://tossharingsales.boka.cn/images/guide1.jpg" />
          </swiper-item>
          <swiper-item>
            <img class="db mauto" src="https://tossharingsales.boka.cn/images/guide2.jpg" />
          </swiper-item>
          <swiper-item>
            <img class="db mauto" src="https://tossharingsales.boka.cn/images/guide3.jpg" />
             <div class="in-btn" @click="inCenter">立即体验</div>
          </swiper-item>
        </swiper>
      </template>
      <template v-if="showCenter">
        <center-sales
          :retailer-info="retailerInfo"
          :messages="messages"
          :login-user="loginUser"
          :marquee-data="marqueeData"
          @vip-event="vipEvent">
        </center-sales>
      </template>
      <template v-if="showApply">
        <retailer-apply :login-user="loginUser" :after-apply="applySuccess" :class-data="classData"></retailer-apply>
      </template>
    </template>
    <open-vip v-if="showVip && retailerInfo.isretailer == 2" :retailer-info="retailerInfo" @hide-vip="hideVip" @open-vip="openVip"></open-vip>
    <vip v-if="showVip && retailerInfo.isretailer == 1" :retailer-info="retailerInfo" @hide-vip="hideVip" @open-vip="openVip1"></vip>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from 'vux'
import CenterSales from '@/components/CenterSales'
import RetailerApply from '@/components/RetailerApply'
import Subscribe from '@/components/Subscribe'
import OpenVip from '@/components/OpenVip'
import Vip from '@/components/Vip'
import ENV from 'env'
import { User, Token } from '#/storage'

export default {
  components: {
    Swiper, SwiperItem, CenterSales, RetailerApply, Subscribe, Vip, OpenVip
  },
  data () {
    return {
      showCenter: false,
      showApply: false,
      afterApply: false,
      selectedIndex: 0,
      retailerInfo: {},
      loginUser: null,
      query: {},
      marqueeData: [],
      classData: [],
      // classData: [{title: '服饰内衣'}, {title: '鞋靴'}, {title: '珠宝首饰'}, {title: '礼品箱包'}, {title: '钟表'}, {title: '户外运动'}, {title: '家居家纺'}, {title: '厨具'}, {title: '家具建材'}, {title: '汽车用品'}, {title: '医药保健'}, {title: '母婴'}, {title: '玩具乐器'}, {title: '个护化妆'}, {title: '美妆护肤'}, {title: '家庭清洁/纸品'}, {title: '食品材料'}, {title: '生鲜'}, {title: '酒类'}, {title: '手机'}, {title: '图书影像'}, {title: '数码'}, {title: '电脑办公'}, {title: '家用电器'}, {title: '其他'}],
      messages: 0,
      showVip: false,
      allowVipFee: ENV.allowVipFee
    }
  },
  methods: {
    vipEvent () {
      if (this.allowVipFee) {
        this.showVip = true
      }
    },
    hideVip () {
      this.showVip = false
    },
    openVip () {
      location.replace(`${ENV.Host}/#/pay?id=${this.retailerInfo.payorderid}&module=payorders`)
    },
    openVip1 () {
      if (this.allowVipFee) {
        this.showVip = false
        this.$vux.loading.show()
        this.$http.post(`${ENV.BokaApi}/api/retailer/vipRenew`).then(res => {
          this.$vux.loading.hide()
          const data = res.data
          if (data.flag && data.data) {
            location.replace(`${ENV.Host}/#/pay?id=${data.data}&module=payorders`)
          } else {
            this.$vux.toast.show({
              text: data.error,
              type: data.flag ? 'success' : 'warn',
              time: this.$util.delay(data.error)
            })
          }
        })
      }
    },
    applySuccess () {
      const self = this
      console.log('after apply token')
      console.log(Token.get())
      if (self.query.minibackurl) {
        let minibackurl = decodeURIComponent(self.query.minibackurl)
        self.$wechat.miniProgram.redirectTo({url: `${minibackurl}?token=${Token.get().token}&expired_at=${Token.get().expired_at}`})
      } else {
        self.initContainer()
        self.showCenter = true
        self.$vux.loading.hide()
      }
    },
    inCenter () {
      const self = this
      let text = '添加完商品后才可体验更多功能'
      self.$vux.toast.show({
        text: text,
        type: 'success',
        time: self.$util.delay(text),
        onHide: function () {
          self.afterApply = false
          self.$router.push({path: '/addProduct', query: {from: 'apply'}})
        }
      })
    },
    getData () {
      const self = this
      self.$vux.loading.show()
      self.$http.get(`${ENV.BokaApi}/api/user/show`).then(function (res) {
        if (res) {
          if (res.status === 200) {
            self.loginUser = res.data
            User.set(self.loginUser)
            if (!self.loginUser.isretailer) {
              self.initContainer()
              self.showApply = true
              document.title = '申请卖家'
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
            } else if (self.loginUser.isretailer === 1 || self.loginUser.isretailer === 2) {
              self.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, {
                module: 'retailer', action: 'index'
              }).then(function (res) {
                if (self.loginUser.isretailer) {
                  self.initContainer()
                  self.showCenter = true
                  let shareParams = {
                    module: 'retailer',
                    moduleid: self.loginUser.uid,
                    title: `${self.loginUser.linkman}邀请你一起入驻共销汇`,
                    desc: '共销汇帮你解决微商创业难题',
                    photo: self.loginUser.avatar,
                    link: `${ENV.Host}/#/centerSales?&share_uid=${self.loginUser.uid}`
                  }
                  if (self.query.share_uid) {
                    shareParams.link = `${shareParams.link}&lastshareuid=${self.query.share_uid}`
                    shareParams.lastshareuid = self.query.share_uid
                  }
                  self.$util.handleWxShare(shareParams)
                  self.$http.get(`${ENV.BokaApi}/api/retailer/home`).then(function (res) {
                    if (res.status === 200) {
                      let data = res.data
                      self.retailerInfo = data.data ? data.data : data
                      self.$vux.loading.hide()
                      return self.$http.get(`${ENV.BokaApi}/api/message/newMessages`)
                    }
                  }).then(function (res) {
                    if (res) {
                      let data = res.data
                      self.messages = data.data
                      return self.$http.get(`${ENV.BokaApi}/api/retailer/shareview`)
                    }
                  }).then(function (res) {
                    if (res) {
                      let data = res.data
                      self.marqueeData = data.data ? data.data : data
                    }
                  })
                }
              })
            }
          }
        }
      })
    },
    initContainer () {
      const self = this
      self.showCenter = false
      self.showApply = false
      document.title = '卖家中心'
    },
    refresh (query) {
      // const self = this
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.query = query
      // if (self.query.miniopenid && self.query.miniappid) {
      //   MiniApp.setOpenId(self.query.miniopenid)
      //   MiniApp.setAppId(self.query.miniappid)
      //   Token.set({isExpired: null})
      // }
      this.getData()
    },
    miniPost () {
      const self = this
      // this.$wechat.miniProgram.postMessage({data: 'From Web'})
      this.$wechat.miniProgram.getEnv(res => {
        if (res.miniprogram) {
          self.$wechat.miniProgram.postMessage({data: {token: Token.get()}})
        }
      })
    }
  },
  activated () {
    this.refresh(this.$route.query)
    this.miniPost()
  },
  beforeRouteUpdate (to, from, next) {
    this.refresh(to.query)
    next && next()
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
