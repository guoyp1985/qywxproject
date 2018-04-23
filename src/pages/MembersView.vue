<template>
  <div class="containerarea bg-page membersview font14 s-havebottom">
    <div class="s-topbanner flex_center color-white">
      <div class="pl10 pr10">
        <div class="t-table">
          <div class="t-cell v_middle w80">
            <img class="avatarimg4" :src="viewuser.avatar" />
          </div>
          <div class="t-cell v_middle">
            <div class="font17">{{ viewuser.linkman }}</div>
            <div class="font14" v-if="viewuser.uploadname && viewuser.uploadname != ''">返点客：{{ viewuser.uploadname }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="s-container">
      <div class="padding10 align_center btnlist">
        <div class="t-table">
          <div class="t-cell v_middle">
            <div class="btn bg-orange color-white">联系</div>
          </div>
          <div class="t-cell v_middle" v-if="!viewuser.isseller">
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
          <router-link :to="{path: '/shareList', query:{ uid: viewuser.uid }}" class="t-cell item v_middle b_right_after">{{ $t('Share') }}</router-link>
          <router-link :to="{path: '/salesList', query:{ uid: viewuser.uid }}" class="t-cell item v_middle b_right_after">{{ $t('Orders') }}</router-link>
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
            <div class="t-cell align_right color-gray">{{ viewuser.province }} {{ viewuser.city }}</div>
            <div class="t-cell align_right w50">
              <span class="qbtn1 bg-green color-white">更新</span>
            </div>
          </div>
        </div>
        <div class="item padding10 b_bottom_after">
          <div class="t-table">
            <div class="t-cell align_left w100">性别</div>
            <div class="t-cell align_right color-gray">{{ getsex }}</div>
          </div>
        </div>
        <div class="item padding10 b_bottom_after">
          <div class="t-table">
            <div class="t-cell align_left w100">返点客</div>
            <div class="t-cell align_right color-gray">{{ viewuser.linkman }}</div>
          </div>
        </div>
        <div class="item padding10 b_bottom_after">
          <div class="t-table">
            <div class="t-cell align_left w100">成为客户时间</div>
            <div class="t-cell align_right color-gray">{{ viewuser.dateline | dateformat }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="s-bottom bottomnaviarea b_top_after">
      <div class="t-table bottomnavi">
        <router-link class="t-cell item" to="/retailerShop">{{ $t('My shop') }}</router-link>
        <router-link class="t-cell item" to="/centerSales">{{ $t('Sales center') }}</router-link>
        <router-link class="t-cell item" to="/retailerOrders">{{ $t('My orders') }}</router-link>
      </div>
    </div>
  </div>
</template>

<i18n>
Behavior:
  zh-CN: 行为
</i18n>

<script>
import Time from '#/time'
import ENV from '#/env'

export default {
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      query: {},
      viewuser: { avatar: '/src/assets/images/user.jpg' }
    }
  },
  created: function () {
    const self = this
    this.$store.commit('updateToggleTabbar', {toggleBar: false})
    self.query = self.$route.query
    self.$http.get(`${ENV.BokaApi}/api/retailer/customerView`,
      { params: { customeruid: self.query.uid } }
    ).then(function (res) {
      return res.json()
    }).then(function (data) {
      if (data) {
        self.viewuser = data.data ? data.data : data
        document.title = self.viewuser.linkman
      }
    })
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
        return res.json()
      }).then(function (data) {
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
            return res.json()
          }).then(function (data) {
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
          /*
          if (self.$util.isNull(val)) {
            self.$vux.alert.show({
              title: '',
              content: '更新值不能为空'
            })
            return false
          }
          */
          self.$vux.loading.show()
          self.$http.post(`${ENV.BokaApi}/api/retailer/sellerAction`,
            { action: 'update', customeruid: self.query.uid, char: char, value: val }
          ).then(function (res) {
            return res.json()
          }).then(function (data) {
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
    }
  }
}
</script>

<style lang="less">
.membersview .btnlist .btn{
  display:inline-block;vertical-align: middle;
  width:90%;box-sizing: border-box;height:35px;line-height:35px;border-radius:20px;
}
.membersview .priority:after{content:"置顶"}
.membersview .priority.done:after{content:"取消置顶"}
.membersview .itemtab .item{color:#01a6ea;}
</style>
