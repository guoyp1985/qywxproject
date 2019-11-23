<template>
  <div class="containerarea bg-page membersview font14">
    <template v-if="showSos">
      <Sos :title="sosTitle"></Sos>
    </template>
    <template v-if="showContainer">
      <div class="s-topbanner flex_left color-white pl15 pr15 border-box">
        <img class="avatarimg5 imgcover" :src="viewuser.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
        <div class="flex_cell pr20 pl10">
          <div class="font16 clamp1">{{ viewuser.linkman }}</div>
          <div class="font13">成交概率 {{ viewuser.percent }}%</div>
        </div>
        <router-link :to="{ path: '/chat', query: {uid: viewuser.uid, from: query.from} }" class="qbtn7 font14 bg-white color-red5">{{ $t('Contact') }}</router-link>
      </div>
      <div class="s-container">
        <div class="b_top_after padding10 flex_center bg-white list-shadow01">
          <div class="t-table align_center font15 itemtab">
            <router-link :to="{path: '/shareList', query:{ uid: viewuser.uid }}" class="t-cell item v_middle b_right_after">{{ $t('Share') }}</router-link>
            <router-link v-if="viewuser.customerlevel >= 5000" :to="{path: '/salesList', query:{ uid: viewuser.uid }}" class="t-cell item v_middle b_right_after">{{ $t('Orders') }}</router-link>
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
      <!-- <div class="s-bottom bottomnaviarea b_top_after">
        <div class="t-table bottomnavi">
          <router-link class="t-cell item" to="/store">{{ $t('My shop') }}</router-link>
          <router-link class="t-cell item" to="/centerSales">{{ $t('Sales center') }}</router-link>
          <router-link class="t-cell item" to="/retailerOrders">{{ $t('My orders') }}</router-link>
        </div>
      </div> -->
    </template>
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
import Sos from '@/components/Sos'
import Time from '#/time'
import ENV from 'env'
export default {
  components: {
    XImg, Sos
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      showSos: false,
      sosTitle: '该用户不存在',
      showContainer: false,
      query: {},
      viewuser: {},
      data: [],
      disdatalist: false
    }
  },
  computed: {
  },
  methods: {
    getData () {
      const self = this
      this.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, { module: 'retailer', action: 'timeline' })
      .then(res => self.$http.get(`${ENV.BokaApi}/api/retailer/customerView`, { params: { customeruid: self.query.uid } }))
      .then(res => {
        const data = res.data
        if (data.flag !== 1) {
          self.$vux.loading.hide()
          self.sosTitle = data.error
          self.showSos = true
          self.showContainer = false
        } else {
          self.sosTitle = ''
          self.showSos = false
          self.showContainer = true
          self.viewuser = data.data ? data.data : data
          document.title = `${self.viewuser.linkman}的行为`
          const params = { params: { uid: self.query.uid } }
          return self.$http.get(`${ENV.BokaApi}/api/user/timeLine`, params)
        }
      })
      .then(res => {
        if (res) {
          self.$vux.loading.hide()
          const data = res.data
          const retdata = data.data ? data.data : data
          self.data = retdata
          self.disdatalist = true
        }
      })
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.$vux.loading.show()
      this.query = this.$route.query
      this.getData()
    }
  },
  activated () {
    this.refresh()
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
.membersview .itemtab .item{color:#ea3a3a;}
</style>
