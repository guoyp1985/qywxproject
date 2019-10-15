<template>
  <div class="containerarea bg-white font14">
    <div class="s-topbanner" style="height:44px;">
      <div class="row">
        <div class="bg"></div>
        <div class="flex_center h_100 toprow">
          <div class="flex_cell font16 pl20">{{$t('Message')}}</div>
        </div>
      </div>
    </div>
    <div class="s-container scroll-container" style="top:44px;" ref="scrollContainer" @scroll="handleScroll('scrollContainer')">
      <div v-if="disData" class="scroll_list pl10 pr10">
        <div v-if="!listData || listData.length == 0" class="emptyitem flex_center">暂无消息</div>
        <div v-else @click="toChat(item)" class="scroll_item pt10 pb10 db" v-for="(item,index) in listData" :key="item.id">
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
      listData: [],
      disData: false,
      query: {},
      pageStart: 0,
      limit: 10
    }
  },
  methods: {
    getDateState (dt) {
      return this.$util.getDateState(dt)
    },
    getDateClass (dt) {
      let ret = this.$util.getDateClass(dt)
      ret = `${ret} mr5`
      return ret
    },
    handleScroll (refname, type) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          if (self.listData.length === (self.pageStart + 1) * self.limit) {
            self.pageStart++
            self.$vux.loading.show()
            self.getData()
          }
        }
      })
    },
    getData () {
      const self = this
      this.$http.get(`${ENV.BokaApi}/api/message/list`, {
        params: {pagestart: this.pageStart, limit: this.limit}
      }).then(res => {
        const data = res.data
        self.$vux.loading.hide()
        const retdata = data.data ? data.data : data
        self.listData = self.listData.concat(retdata)
        self.disData = true
      })
    },
    toChat (data) {
      let param = this.$util.handleAppParams(this.query, {uid: data.uid, fromModule: 'messagelist'})
      this.$router.push({path: '/chat', query: param})
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
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
