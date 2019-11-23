<template>
  <div class="containerarea bg-page CommissionDetail2 font14">
    <subscribe v-if="loginUser.subscribe != 1 && !loginUser.isretailer"></subscribe>
    <apply-tip v-if="showApply"></apply-tip>
    <Sos v-if="showSos" :title="sosTitle"></Sos>
    <template v-if="showContainer">
      <div class="s-topbanner flex_left pl15 pr15 border-box">
        <div class="">
          <img @click="showBigimg(0)" class="avatarimg5 imgcover" :src="viewuser.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
          <div v-transfer-dom>
            <previewer :list="imgarr" ref="previewer"></previewer>
          </div>
        </div>
        <div class="flex_cell pl10 pr20 color-white">
          <div class="font16 clamp1">{{ viewuser.linkman }}</div>
          <!-- <div class="font13 clamp1" v-if="viewuser.uploadname && viewuser.uploadname != ''">返点客：{{ viewuser.uploadname }}</div> -->
        </div>
        <div class="font14 color-white">共分佣：¥10.00</div>
      </div>
      <div class="s-container">
        <div class="b_bottom_after"></div>
        <div class="mt12 bg-white itemlist list-shadow font14">
          <div class="item padding10 b_bottom_after">
            <div class="t-table">
              <div class="t-cell align_left w100">销售收入</div>
              <div class="t-cell align_right w50 color-gray">
                  ¥10.00
              </div>
            </div>
          </div>
          <div class="item padding10 b_bottom_after">
            <div class="t-table">
              <div class="t-cell align_left w100">销售单数</div>
              <div class="t-cell align_right w50 color-gray">
                  10单
              </div>
            </div>
          </div>
          <div class="item padding10 b_bottom_after">
            <div class="t-table">
              <div class="t-cell align_left w100">红包发放金额</div>
              <div class="t-cell align_right w50 color-gray">
                ¥10.00
              </div>
            </div>
          </div>
          <div class="item padding10 b_bottom_after">
            <div class="t-table">
              <div class="t-cell align_left w100">下级带来销售</div>
              <div class="t-cell align_right w50 color-gray">
                ¥5.00
              </div>
            </div>
          </div>
          <div class="item padding10 b_bottom_after">
            <div class="t-table">
              <div class="t-cell align_left w100">下下级带来销售</div>
              <div class="t-cell align_right w50 color-gray">
                ¥3.00
              </div>
            </div>
          </div>
          <div class="item padding10 b_bottom_after">
            <div class="t-table">
              <div class="t-cell align_left w100">下下下级带来销售</div>
              <div class="t-cell align_right w50 color-gray">
                ¥2.00
              </div>
            </div>
          </div>

          <!-- <div class="item padding10 b_bottom_after" v-if="viewuser.uploadname && viewuser.uploadname != ''">
            <div class="t-table">
              <div class="t-cell align_left w100">返点客</div>
              <div class="t-cell align_right color-gray">{{ viewuser.uploadname }}</div>
            </div>
          </div> -->
        </div>
      </div>
      <!--
      <div class="s-bottom bottomnaviarea b_top_after">
        <div class="t-table bottomnavi">
          <router-link class="t-cell item" :to="{path: '/store', query: {wid: loginUser.uid}}">{{ $t('My shop') }}</router-link>
          <router-link class="t-cell item" to="/centerSales">{{ $t('Sales center') }}</router-link>
          <router-link class="t-cell item" to="/retailerOrders">{{ $t('My orders') }}</router-link>
        </div>
      </div>
    -->
      <div v-transfer-dom class="red-popup">
        <popup v-model="showPopupLevel">
          <popup-header
          :left-text="$t('Cancel')"
          :right-text="$t('Submit')"
          :show-bottom-border="false"
          @on-click-left="showPopupLevel = false"
          @on-click-right="updateIntention"></popup-header>
          <group gutter="0" class="red-radio">
            <radio
              v-model="userIntention"
              :options="intentionArr"
              :selected-label-style="{color: '#ea3a3a'}"></radio>
          </group>
        </popup>
      </div>
      <div v-transfer-dom class="x-popup">
        <popup v-model="showSubscribe" height="100%">
          <div class="popup1 font14">
            <div class="popup-middle" style="top:0;">
              <subscribe></subscribe>
            </div>
            <div class="popup-bottom flex_center bg-gray color-white" @click="closeSubscribe">{{ $t('Close') }}</div>
          </div>
        </popup>
      </div>
      <div v-transfer-dom>
        <confirm v-model="showConfirm"
        :title="confirmTitle"
        @on-cancel="onCancel"
        @on-confirm="onConfirm">
          <slot name="content">
            <x-input v-model="confirmData" type="text" class="input" style="border:#ccc 1px solid;" :placeholder="confirmTitle"></x-input>
          </slot>
        </confirm>
      </div>
      <template v-if="showHb">
        <firstHb action="seller" @closeFirstHb="closeFirstHb"></firstHb>
      </template>
    </template>
  </div>
</template>

<i18n>
Behavior:
  zh-CN: 行为
</i18n>

<script>
import { Popup, Previewer, TransferDom, PopupHeader, Radio, Group, XImg, XInput, Confirm } from 'vux'
import Sos from '@/components/Sos'
import Time from '#/time'
import ENV from 'env'
import { User } from '#/storage'
import Subscribe from '@/components/Subscribe'
import ApplyTip from '@/components/ApplyTip'
import FirstHb from '@/components/FirstHb'

export default {
  directives: {
    TransferDom
  },
  components: {
    Popup, Previewer, Sos, PopupHeader, Radio, Group, XImg, Subscribe, ApplyTip, XInput, Confirm, FirstHb
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      showApply: false,
      showSos: false,
      sosTitle: '',
      showContainer: false,
      query: {},
      loginUser: {},
      viewuser: { avatar: 'https://tossharingsales.boka.cn/images/user.jpg' },
      imgarr: [{
        msrc: 'https://tossharingsales.boka.cn/images/user.jpg',
        src: 'https://tossharingsales.boka.cn/images/user.jpg'
      }],
      wximgarr: ['https://tossharingsales.boka.cn/images/user.jpg'],
      showPopupLevel: false,
      userIntention: 0,
      userIntentionDesc: '无',
      intentionObject: {
        '0': '无',
        '1': '低',
        '2': '中',
        '3': '高'
      },
      intentionArr: [
        { key: 0, value: '无' },
        { key: 1, value: '低' },
        { key: 2, value: '中' },
        { key: 3, value: '高' }
      ],
      showSubscribe: false,
      showConfirm: false,
      confirmTitle: '',
      confirmData: '',
      charName: '',
      isFirst: false,
      showHb: false
    }
  },
  watch: {
    userIntention () {
      return this.userIntention
    }
  },
  computed: {
    getprioritycss () {
      let ret = ''
      let self = this
      if (self.viewuser.priority) {
        ret = 'done'
      }
      return ret
    },
    getsex () {
      let val = this.viewuser.sex
      let ret = '未知'
      if (val === 1) {
        ret = '男'
      } else if (val === 2) {
        ret = '女'
      }
      return ret
    }
  },
  methods: {
    initData () {
      this.isFirst = false
      this.showHb = false
    },
    closeFirstHb () {
      this.isFirst = false
      this.showHb = false
    },
    toChat () {
      let params = this.$util.handleAppParams(this.query, {uid: this.query.uid})
      this.$router.push({path: '/chat', query: params})
    },
    toSaleview () {
      let params = this.$util.handleAppParams(this.query, {uid: this.query.uid})
      this.$router.push({path: '/retailerSaleview', query: params})
    },
    toViewList () {
      let params = this.$util.handleAppParams(this.query, {uid: this.viewuser.uid})
      this.$router.push({path: '/viewList', query: params})
    },
    toShareList () {
      let params = this.$util.handleAppParams(this.query, {uid: this.viewuser.uid})
      this.$router.push({path: '/shareList', query: params})
    },
    toSalesList () {
      let params = this.$util.handleAppParams(this.query, {uid: this.viewuser.uid})
      this.$router.push({path: '/salesList', query: params})
    },
    priorityevent () {
      const self = this
      self.$vux.loading.show()
      self.$http.post(`${ENV.BokaApi}/api/retailer/sellerAction`,
        { action: 'stickcustomer', customeruid: self.query.uid }
      ).then(res => {
        const data = res.data
        self.$vux.loading.hide()
        self.$vux.toast.show({
          text: data.error,
          time: self.$util.delay(data.error),
          onHide: () => {
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
        onConfirm: () => {
          self.$vux.loading.show()
          self.$http.post(`${ENV.BokaApi}/api/retailer/inviteSeller`,
            { inviteuid: self.query.uid }
          ).then(res => {
            const data = res.data
            self.$vux.loading.hide()
            self.$vux.toast.show({
              text: data.error,
              time: self.$util.delay(data.error),
              onHide: () => {
                if (data.flag === 1) {
                  self.viewuser.isseller = true
                  if (this.isFirst) {
                    this.showHb = true
                  }
                }
              }
            })
          })
        }
      })
    },
    updatechar (char) {
      const self = this
      let inputval = ''
      this.confirmTitle = ''
      this.confirmData = ''
      this.charName = char
      if (char === 'position') {
        this.confirmTitle = '请输入备注名'
        inputval = self.viewuser.position
      } else if (char === 'mobile') {
        this.confirmTitle = '请输入手机号'
        inputval = self.viewuser.mobile
      }
      self.showConfirm = true
      self.confirmData = inputval
    },
    onCancel () {
      this.showConfirm = false
    },
    onConfirm () {
      const self = this
      let iscontinue = true
      let char = this.charName
      let val = this.confirmData
      if (char === 'mobile' && self.$util.trim(val) !== '') {
        iscontinue = self.$util.validateQueue([{ telephone: val, r: 'Phone' }],
          model => {
            switch (model.key) {
              case 'telephone':
                self.$vux.toast.text('请输入正确的手机号', 'middle')
                break
            }
          }
        )
      }
      if (!iscontinue) {
        return false
      }
      self.showConfirm = false
      self.$vux.loading.show()
      self.$http.post(`${ENV.BokaApi}/api/retailer/sellerAction`,
        { action: 'update', customeruid: self.query.uid, char: char, value: val }
      ).then(res => {
        const data = res.data
        self.$vux.loading.hide()
        self.$vux.toast.show({
          text: data.error,
          time: self.$util.delay(data.error),
          onHide: () => {
            if (data.flag === 1) {
              self.viewuser[char] = val
            }
          }
        })
      })
    },
    showBigimg (index) {
      const self = this
      if (self.$util.isPC()) {
        self.$refs.previewer.show(index)
      } else {
        window.WeixinJSBridge.invoke('imagePreview', {
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
      ).then(res => {
        const data = res.data
        self.$vux.loading.hide()
        let error = data.error
        if (data.flag) {
          error = '更新成功'
        }
        self.$vux.toast.show({
          text: error,
          type: data.flag ? 'success' : 'warn',
          time: self.$util.delay(error)
        })
        if (data.flag === 1) {
          let retdata = data.data
          self.viewuser.country = retdata.country
          self.viewuser.province = retdata.province
          self.viewuser.city = retdata.city
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
      ).then(res => {
        const data = res.data
        self.$vux.loading.hide()
        self.$vux.toast.show({
          text: data.error,
          type: data.flag === 1 ? 'success' : 'warn',
          time: self.$util.delay(data.error),
          onHide: () => {
            if (data.flag === 1) {
              self.viewuser.intention = self.userIntention
              self.viewuser.intentiondesc = self.intentionObject[self.userIntention]
            }
          }
        })
      })
    },
    getData () {
      const self = this
      this.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, {
        module: 'retailer', action: 'membersview', id: this.query.uid
      }).then(res => {
        return self.$http.get(`${ENV.BokaApi}/api/retailer/customerView`,
          { params: { customeruid: self.query.uid } }
        )
      }).then(res => {
        self.$vux.loading.hide()
        const data = res.data
        if (data.flag !== 1) {
          self.initContainer()
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
        self.initContainer()
        self.showContainer = true
      })
    },
    initContainer () {
      this.showApply = false
      this.showSos = false
      this.sosTitle = ''
      this.showContainer = false
    },
    refresh () {
      const self = this
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.initData()
      this.loginUser = User.get()
      if (this.loginUser && (this.loginUser.subscribe === 1 || this.loginUser.isretailer)) {
        if (!this.loginUser.isretailer) {
          self.initContainer()
          this.showApply = true
        } else {
          self.initContainer()
          this.query = this.$route.query
          this.getData()
          if (`${this.loginUser.retailerinfo.firstinfo.seller}` === '0' && this.query.from && (!this.viewuser.isseller || this.viewuser.isseller === 0)) {
            this.$http.get(`${ENV.BokaApi}/api/user/show`).then((res) => {
              this.loginUser = res.data
              User.set(this.loginUser)
              if (`${this.loginUser.retailerinfo.firstinfo.seller}` === '0' && this.query.from && (!this.viewuser.isseller || this.viewuser.isseller === 0)) {
                this.isFirst = true
              }
            })
          }
        }
      }
    },
    toSubscribe () {
      this.showSubscribe = true
    },
    closeSubscribe () {
      this.showSubscribe = false
    }
  },
  activated () {
    this.refresh()
    this.$util.miniPost()
  }
}
</script>

<style lang="less" scoped>
</style>
