<template>
  <div class="containerarea bg-white font14">
    <div class="s-topbanner" style="height:44px;">
      <div class="row">
        <div class="bg"></div>
        <div class="flex_center h_100 toprow">
          <div class="flex_cell font18 pl20">{{$t('Message')}}</div>
        </div>
      </div>
    </div>
    <div class="s-container scroll-container" style="top:44px;">
      <div class="scroll_list pl10 pr10">
        <router-link :to="{path: '/chat', query: {uid: item.uid}}" class="scroll_item pt10 pb10 db" v-for="(item,index) in data" :key="item.id">
          <div class="t-table">
            <div class="t-cell v_middle align_left" style="width:50px;">
              <x-img class="avatarimg1 imgcover" :src="item.avatar" default-src="../src/assets/images/user.jpg" :offset="0" container=".scroll-container"></x-img>
            </div>
            <div class="t-cell v_middle align_left">
              <div class="clamp1"><span :class="getDateClass(item.dateline)">{{ getDateState(item.dateline) }}</span><span>{{ item.linkman }}</span></div>
              <div class="clamp1 font12 color-gray">{{ item.title }}</div>
              <div class="clamp1 color-gray font12">{{ item.dateline | dateformat }}</div>
            </div>
            <div v-if="item.unreadNumber > 0" class="t-cell v_middle align_right w60">
              <div class="qbtn6 bg-green color-white">{{ item.unreadNumber }}</div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<i18n>
Message:
  zh-CN: 消息
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
      data: []
    }
  },
  methods: {
    getDateState: function (dt) {
      return this.$util.getDateState(dt)
    },
    getDateClass: function (dt) {
      let ret = this.$util.getDateClass(dt)
      ret = `${ret} mr5`
      return ret
    }
  },
  created () {
    const self = this
    self.$store.commit('updateToggleTabbar', {toggleBar: false})
    self.$vux.loading.show()
    self.$http.get(`${ENV.BokaApi}/api/message/mylist`).then(function (res) {
      let data = res.data
      self.$vux.loading.hide()
      self.data = data.data ? data.data : data
    })
  }
}
</script>

<style lang="less" scoped>
</style>
