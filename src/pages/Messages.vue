<template>
  <div class="containerarea bg-page font14 nobottom">
    <div v-if="query.from && loginUser.subscribe != 1" class="pagetop border-box db-flex top-subscribe-tip">
      <div class="flex_cell h_100 flex_left">
        <i class="al al-gantanhaozhong font20"></i><span>关注公众号可及时接收私信提醒</span>
      </div>
      <div class="w80 h_100 flex_right">
        <div class="btn flex_center" @click="toSubscribe">立即关注</div>
      </div>
    </div>
    <div v-else class="pagetop flex_left pl10 border-box font16">{{$t('Message')}}</div>
    <div class="pagemiddle scroll-container bg-white">
      <div v-if="disData" class="scroll_list pl10 pr10">
        <div v-if="!data || data.length == 0" class="emptyitem flex_center">暂无消息</div>
        <div v-else @click="toChat(item)" class="scroll_item pt10 pb10 db" v-for="(item,index) in data" :key="item.id">
          <div class="t-table">
            <div class="t-cell v_middle align_left" style="width:50px;">
              <img class="avatarimg1 imgcover" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
            </div>
            <div class="t-cell v_middle align_left">
              <div class="clamp1"><span :class="getDateClass(item.dateline)">{{ getDateState(item.dateline) }}</span><span>{{ item.linkman }}</span></div>
              <div class="clamp1 font12 color-gray" v-html="item.title"></div>
              <div class="clamp1 color-gray font12">{{ item.dateline | dateformat }}</div>
            </div>
            <div v-if="item.unreadNumber > 0" class="t-cell v_middle align_right w60">
              <div class="qbtn6 bg-red color-white">{{ item.unreadNumber }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { XImg } from 'vux'
import Time from '#/time'
import ENV from 'env'
import { User } from '#/storage'
const jweixin = require('../../static/jweixin')

export default {
  components: {
    XImg
  },
  filters: {
    dateformat (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      data: [],
      disData: false,
      query: {},
      loginUser: {}
    }
  },
  methods: {
    toSubscribe () {
      jweixin.miniProgram.navigateTo({url: '/pages/subscribe'})
    },
    getDateState (dt) {
      return this.$util.getDateState(dt)
    },
    getDateClass (dt) {
      let ret = this.$util.getDateClass(dt)
      ret = `${ret} mr5`
      return ret
    },
    getData () {
      const self = this
      this.$http.get(`${ENV.BokaApi}/api/message/list`).then(res => {
        const data = res.data
        self.$vux.loading.hide()
        self.data = data.data ? data.data : data
        self.disData = true
      })
    },
    toChat (data) {
      let param = this.$util.handleAppParams(this.query, {uid: data.uid, fromModule: 'messagelist'})
      this.$router.push({path: '/chat', query: param})
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.loginUser = User.get()
      this.query = this.$route.query
      this.$vux.loading.show()
      this.getData()
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
