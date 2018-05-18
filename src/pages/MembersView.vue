<template>
  <div class="containerarea bg-page membersview font14 s-havebottom">
    <template v-if="showSos">
      <Sos :title="sosTitle"></Sos>
    </template>
    <template v-if="showContainer">
      <div class="s-topbanner flex_center color-white">
        <div class="pl10 pr10">
          <div class="t-table">
            <div class="t-cell v_middle w80">
              <img class="avatarimg4" :src="viewuser.avatar" @click="showBigimg(0)" />
              <div v-transfer-dom>
                <previewer :list="imgarr" ref="previewer"></previewer>
              </div>
            </div>
            <div class="t-cell v_middle">
              <div class="font17">{{ viewuser.linkman }}</div>
              <div class="font14" v-if="viewuser.uploadname && viewuser.uploadname != ''">返点客：{{ viewuser.uploadname }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="s-container">
        <div v-if="showContainer" class="padding10 align_center btnlist">
          <div class="t-table">
            <div class="t-cell v_middle">
              <router-link :to="{path: '/chat', query: {uid: query.uid}}" class="btn bg-orange color-white">联系</router-link>
            </div>
            <div class="t-cell v_middle" v-if="!viewuser.isseller || viewuser.isseller == '0'">
              <div class="btn bg-orange color-white" @click="inviteevent">返点客</div>
            </div>
            <div class="t-cell v_middle" v-else>
              <router-link :to="{path: '/retailerSaleview', query: {uid: query.uid}}" class="btn bg-orange color-white">返点管理</router-link>
            </div>
            <div class="t-cell v_middle">
              <div :class="`btn bg-red color-white priority ${getprioritycss}`" @click="priorityevent"></div>
            </div>
          </div>
        </div>
        <div class="b_top_after padding10 flex_center bg-white">
          <div class="t-table align_center font15 itemtab">
            <div class="t-cell item v_middle b_right_after">
              <div>{{viewuser.viewNumber}}</div>
              <div>{{ $t('Views') }}</div>
            </div>
            <router-link :to="{path: '/shareList', query:{ uid: viewuser.uid }}" class="t-cell item v_middle b_right_after">
              <div>{{viewuser.shareNumber}}</div>
              <div>{{ $t('Share') }}</div>
            </router-link>
            <router-link v-if="viewuser.customerlevel >= 5000" :to="{path: '/salesList', query:{ uid: viewuser.uid }}" class="t-cell item v_middle b_right_after">
              <div>{{viewuser.orderNumber}}</div>
              <div>{{ $t('Orders') }}</div>
            </router-link>
            <router-link :to="{path: '/timeline', query:{ uid: viewuser.uid }}" class="t-cell item v_middle">{{ $t('Behavior') }}</router-link>
          </div>
        </div>
        <div class="b_bottom_after"></div>
        <div class="mt12 bg-white itemlist">
          <div class="item padding10 b_bottom_after">
            <div class="t-table">
              <div class="t-cell align_left w100">真实姓名</div>
              <div class="t-cell align_right color-gray">{{ viewuser.position }}</div>
              <div class="t-cell align_right w50">
                <span class="qbtn1 bg-green color-white" @click="updatechar('position')">更新</span>
              </div>
            </div>
          </div>
          <div class="item padding10 b_bottom_after">
            <div class="t-table">
              <div class="t-cell align_left w100">手机号</div>
              <div class="t-cell align_right color-gray">{{ viewuser.mobile }}</div>
              <div class="t-cell align_right w50">
                <span class="qbtn1 bg-green color-white" @click="updatechar('mobile')">更新</span>
              </div>
            </div>
          </div>
          <div class="item padding10 b_bottom_after">
            <div class="t-table">
              <div class="t-cell align_left w100">地区</div>
              <div class="t-cell align_right color-gray">{{ viewuser.country }} {{ viewuser.province }} {{ viewuser.city }}</div>
              <div class="t-cell align_right w50">
                <span class="qbtn1 bg-green color-white" @click="updateArea">更新</span>
              </div>
            </div>
          </div>
          <div class="item padding10 b_bottom_after">
            <div class="t-table">
              <div class="t-cell align_left w100">性别</div>
              <div class="t-cell align_right color-gray">{{ getsex }}</div>
            </div>
          </div>
          <div class="item padding10 b_bottom_after" v-if="viewuser.uploadname && viewuser.uploadname != ''">
            <div class="t-table">
              <div class="t-cell align_left w100">返点客</div>
              <div class="t-cell align_right color-gray">{{ viewuser.uploadname }}</div>
            </div>
          </div>
          <div class="item padding10 b_bottom_after">
            <div class="t-table">
              <div class="t-cell align_left w100">成为客户时间</div>
              <div class="t-cell align_right color-gray">{{ viewuser.dateline | dateformat }}</div>
            </div>
          </div>
          <div class="item padding10 b_bottom_after">
            <div class="t-table">
              <div class="t-cell align_left w100">意向程度</div>
              <div class="t-cell align_right color-gray">{{ viewuser.intentiondesc }}</div>
              <div class="t-cell align_right w50">
                <span class="qbtn1 bg-green color-white" @click="showLevel">更新</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="s-bottom bottomnaviarea b_top_after">
        <div class="t-table bottomnavi">
          <router-link class="t-cell item" to="/store">{{ $t('My shop') }}</router-link>
          <router-link class="t-cell item" to="/centerSales">{{ $t('Sales center') }}</router-link>
          <router-link class="t-cell item" to="/retailerOrders">{{ $t('My orders') }}</router-link>
        </div>
      </div>
      <div v-transfer-dom>
        <popup v-model="showPopupLevel">
          <popup-header
          :left-text="$t('Cancel')"
          :right-text="$t('Submit')"
          :show-bottom-border="false"
          @on-click-left="showPopupLevel = false"
          @on-click-right="updateIntention"></popup-header>
          <group gutter="0">
            <radio v-model="userIntention" :options="intentionArr"></radio>
          </group>
        </popup>
      </div>
    </template>
  </div>
</template>

<i18n>
Behavior:
  zh-CN: 行为
</i18n>

<script>
import { Popup, Previewer, TransferDom, PopupHeader, Radio, Group } from 'vux'
import Sos from '@/components/Sos'
import Time from '#/time'
import ENV from 'env'

export default {
  directives: {
    TransferDom
  },
  components: {
    Popup, Previewer, Sos, PopupHeader, Radio, Group
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      query: {},
      showSos: false,
      sosTitle: '',
      showContainer: false,
      viewuser: { avatar: '/src/assets/images/user.jpg' },
      imgarr: [{
        msrc: '/src/assets/images/user.jpg',
        src: '/src/assets/images/user.jpg'
      }],
      wximgarr: ['/src/assets/images/user.jpg'],
      showPopupLevel: false,
      userIntention: 0,
      userIntentionDesc: '无',
      intentionObject: {
        '0': '无',
        '1': '低',
        '2': '中',
        '3': '高',
      },
      intentionArr: [
        { key: 0, value: '无' },
        { key: 1, value: '低' },
        { key: 2, value: '中' },
        { key: 3, value: '高' }
      ]
    }
  },
  watch: {
    userIntention: function () {
      return this.userIntention
    }
  },
  computed: {
    getprioritycss: function () {
      let ret = ''
      let self = this
      if (self.viewuser.priority) {
        ret = 'done'
      }
      return ret
    },
    getsex: function () {
      let val = this.viewuser.sex
      let ret = '未知'
      if (val === 1) {
        ret = '女'
      } else if (val === 2) {
        ret = '男'
      }
      return ret
    }
  },
  methods: {
    priorityevent () {
      const self = this
      self.$vux.loading.show()
      self.$http.post(`${ENV.BokaApi}/api/retailer/sellerAction`,
        { action: 'stickcustomer', customeruid: self.query.uid }
      ).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        self.$vux.toast.show({
          text: data.error,
          time: self.$util.delay(data.error),
          onHide: function () {
            if (data.flag === 1) {
              self.viewuser.priority = !self.viewuser.priority
            }
          }
        })
      })
    },
    inviteevent () {
      const self = this
      let content = `<div class="font14">邀请成功后，返点客在本店购买以及带来客户购买，均可获得佣金奖励</div>`
      self.$vux.confirm.show({
        content: content,
        onConfirm () {
          self.$vux.loading.show()
          self.$http.post(`${ENV.BokaApi}/api/retailer/inviteSeller`,
            { inviteuid: self.query.uid }
          ).then(function (res) {
            let data = res.data
            self.$vux.loading.hide()
            self.$vux.toast.show({
              text: data.error,
              time: self.$util.delay(data.error),
              onHide: function () {
                if (data.flag === 1) {
                  self.viewuser.isseller = true
                }
              }
            })
          })
        }
      })
    },
    updatechar (char) {
      const self = this
      let showtitle = ''
      let inputval = ''
      if (char === 'position') {
        showtitle = '请输入真实姓名'
        inputval = self.viewuser.position
      } else if (char === 'mobile') {
        showtitle = '请输入手机号'
        inputval = self.viewuser.mobile
      }
      self.$vux.confirm.prompt(inputval, {
        title: showtitle,
        onShow () {
          self.$vux.confirm.setInputValue(inputval)
        },
        onConfirm (val) {
          self.$vux.loading.show()
          self.$http.post(`${ENV.BokaApi}/api/retailer/sellerAction`,
            { action: 'update', customeruid: self.query.uid, char: char, value: val }
          ).then(function (res) {
            let data = res.data
            self.$vux.loading.hide()
            self.$vux.toast.show({
              text: data.error,
              time: self.$util.delay(data.error),
              onHide: function () {
                if (data.flag === 1) {
                  self.viewuser[char] = val
                }
              }
            })
          })
        }
      })
    },
    showBigimg (index) {
      const self = this
      if (self.$util.isPC()) {
        self.$refs.previewer.show(index)
      } else {
        self.$vue.wechat.previewImage({
          current: self.wximgarr[index],
          urls: self.wximgarr
        })
      }
    },
    updateArea () {
      const self = this
      self.$vux.loading.show()
      self.$http.post(`${ENV.BokaApi}/api/user/refreshLocation`,
        { uid: self.query.uid }
      ).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        if (data.flag === 1) {
          let retdata = data.data
          self.viewuser.country = retdata.country
          self.viewuser.province = retdata.province
          self.viewuser.city = retdata.city
        } else {
          self.$vux.toast.show({
            text: data.error,
            type: 'warn',
            time: self.$util.delay(data.error)
          })
        }
      })
    },
    showLevel () {
      this.showPopupLevel = true
    },
    updateIntention () {
      const self = this
      self.showPopupLevel = false
      self.$vux.loading.show()
      self.$http.post(`${ENV.BokaApi}/api/retailer/sellerAction`,
        { action: 'update', customeruid: self.query.uid, char: 'intention', value: self.userIntention }
      ).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        self.$vux.toast.show({
          text: data.error,
          type: data.flag === 1 ? 'success' : 'warn',
          time: self.$util.delay(data.error),
          onHide: function () {
            if (data.flag === 1) {
              self.viewuser.intention = self.userIntention
              self.viewuser.intentiondesc = self.intentionObject[self.userIntention]
              // self.userIntentionDesc = self.intentionObject[self.userIntention]
            }
          }
        })
      })
    }
  },
  created: function () {
    const self = this
    this.$store.commit('updateToggleTabbar', {toggleBar: false})
    self.query = self.$route.query
    self.$vux.loading.show()
    self.$http.get(`${ENV.BokaApi}/api/retailer/customerView`,
      { params: { customeruid: self.query.uid } }
    ).then(function (res) {
      self.$vux.loading.hide()
      let data = res.data
      if (data.flag !== 1) {
        self.sosTitle = data.error
        self.showSos = true
        return false
      }
      if (data) {
        self.viewuser = data.data ? data.data : data
        self.imgarr[0].msrc = self.viewuser.avatar
        self.imgarr[0].src = self.viewuser.avatar
        self.wximgarr[0] = self.viewuser.avatar
        document.title = self.viewuser.linkman
        self.userIntention = self.viewuser.intention
      }
      self.showContainer = true
    })
  }
}
</script>

<style lang="less" scoped>
.membersview .btnlist .btn{
  display:inline-block;vertical-align: middle;
  width:90%;box-sizing: border-box;height:35px;line-height:35px;border-radius:20px;
}
.membersview .priority:after{content:"置顶"}
.membersview .priority.done:after{content:"取消置顶"}
.membersview .itemtab .item{color:#01a6ea;}
</style>
