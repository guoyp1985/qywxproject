<template>
  <div class="containerarea bg-page membersview font14 s-havebottom">
    <div class="s-topbanner flex_center color-white">
      <div class="pl10 pr10">
        <div class="t-table">
          <div class="t-cell v_middle" style="width:80px;">
            <x-img class="avatarimg4 imgcover" :src="viewuser.avatar" default-src="../src/assets/images/user.jpg" :offset="0" container="#vux_view_box_body"></x-img>
          </div>
          <div class="t-cell v_middle">
            <div class="font17">{{ viewuser.linkman }}</div>
            <div class="font12">成交概率{{ viewuser.percent }}</div>
          </div>
          <div class="t-cell v_middle w50 align_right">
            <router-link :to="{ path: '/chat', query: {uid: viewuser.uid} }" class="qbtn bg-green color-white">{{ $t('Contact') }}</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="s-container">
      <div class="b_top_after padding10 flex_center bg-white">
        <div class="t-table align_center font15 itemtab">
          <router-link :to="{path: '/shareList', query:{ uid: viewuser.uid }}" class="t-cell item v_middle b_right_after">{{ $t('Share') }}</router-link>
          <router-link :to="{path: '/salesList', query:{ uid: viewuser.uid }}" class="t-cell item v_middle b_right_after">{{ $t('Orders') }}</router-link>
          <router-link :to="{path: '/membersView', query:{ uid: viewuser.uid }}" class="t-cell item v_middle">{{ $t('Userinfo') }}</router-link>
        </div>
      </div>
      <div class="mt12 b_bottom_after padding10 bg-white">{{ viewuser.linkman }}{{ $t('Behavior analysis in the last month') }}</div>
      <div v-show="disdatalist" class="bg-white scroll_list">
        <div class="emptyitem flex_center" v-if="!data || data.length == 0">暂无行为数据</div>
        <div v-else v-for="item in data" :key="item.id" class="scroll_item padding10 db">
          <div class="t-table">
            <div class="t-cell align_left v_top">
              <div class="color-gray">{{ item.linkman }}</div>
              <div class="">{{ item.title }}</div>
              <div class="font12 color-gray">{{ item.dateline | dateformat}}</div>
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
  </div>
</template>

<i18n>
Orders:
  zh-CN: 订单
Userinfo:
  zh-CN: 用户信息
Behavior analysis in the last month:
  zh-CN: 最近一个月行为分析
</i18n>

<script>
import { XImg } from 'vux'
import Time from '#/time'
import ENV from 'env'
export default {
  components: {
    XImg
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      query: Object,
      viewuser: Object,
      data: [],
      disdatalist: false
    }
  },
  computed: {
  },
  methods: {
  },
  created: function () {
    let self = this
    this.$store.commit('updateToggleTabbar', {toggleBar: false})
    self.$vux.loading.show()
    self.query = self.$route.query
    self.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, {
      module: 'retailer', action: 'timeline'
    }).then(function () {
      return self.$http.get(`${ENV.BokaApi}/api/retailer/customerView`,
        { params: { customeruid: self.query.uid } }
      )
    }).then(function (res) {
      let data = res.data
      if (data) {
        self.viewuser = data.data ? data.data : data
        document.title = `${self.viewuser.linkman}的行为`
      }
      let params = { params: { uid: self.query.uid } }
      return self.$http.get(`${ENV.BokaApi}/api/user/timeLine`, params)
    }).then(function (res) {
      let data = res.data
      self.$vux.loading.hide()
      let retdata = data.data ? data.data : data
      self.data = retdata
      self.disdatalist = true
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
