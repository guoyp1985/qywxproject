<template>
  <div class="containerarea font14 bg-page sinfo scroll-container" ref="scrollContainer" @scroll="handleScroll">
		<div class="align_center pt10 pb10">
      <img :src="WeixinQrcode" style="max-width:90%;max-height:90%;" />
		</div>
		<div class="padding10 bg-white">
			<div class="pb10 border font16 color-gray b_bottom_after">我推荐的用户</div>
			<div v-if="disData" class="scroll_list">
        <div v-if="!data || data.length == 0" class="flex_center emptyitem">您还没有好友关注，去分享给好友关注吧</div>
        <div v-else v-for="(item,index) in data" :key="item.id" class="scroll_item db pt10 pb10">
          <div class="t-table">
						<div class="t-cell w50 v_middle">
              <x-img class="avtarimg" :src="item.avatar" default-src="../src/assets/images/user.jpg" :offset="0" container=".scroll-container"></x-img>
						</div>
						<div class="t-cell v_middle">
							<div class="clamp1"><span :class="getDateClass(item.dateline)">{{ getDateState(item.dateline) }}</span>{{ item.username }}</div>
						</div>
					</div>
        </div>
      </div>
		</div>
	</div>
</template>

<i18n>
</i18n>

<script>
import { XImg } from 'vux'
import Time from '#/time'
import ENV from 'env'

export default {
  components: {
    XImg
  },
  data () {
    return {
      loginUser: {},
      data: [],
      disData: false,
      WeixinQrcode: ENV.WeixinQrcode,
      limit: 10,
      pagestart1: 0
    }
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd')
    }
  },
  watch: {
    data () {
      return this.data
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
    handleScroll () {
      const self = this
      self.$util.scrollEvent({
        element: self.$refs.scrollContainer,
        callback: function () {
          if (self.data.length === (self.pagestart1 + 1) * self.limit) {
            self.pagestart1++
            self.$vux.loading.show()
            self.getData1()
          }
        }
      })
    },
    getData1 () {
      const self = this
      self.$http.get(`${ENV.BokaApi}/api/user/friendList`).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.data = self.data.concat(retdata)
        self.disData = true
      })
    },
    getData () {
      this.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, { module: 'retailer', action: 'subscribeinfo' })
    },
    init () {
      this.$vux.loading.show()
      this.getData()
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      if (this.data.length < this.limit) {
        this.disData = false
        this.data = []
        this.getData1()
      }
    }
  },
  created () {
    this.init()
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less">
</style>
