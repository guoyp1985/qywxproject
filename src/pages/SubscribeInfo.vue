<template>
  <div class="containerarea font14 bg-page sinfo scroll-container" ref="scrollContainer" @scroll="handleScroll">
		<div class="align_center pt10 pb10">
      <img :src="WeixinQrcode" style="max-width:90%;max-height:90%;" />
		</div>
		<div class="padding10 bg-white">
			<div class="pb10 border font16 color-gray b_bottom_after">我的好友</div>
			<div v-if="disData" class="scroll_list">
        <div v-if="!data || data.length == 0" class="flex_center emptyitem">您还没有好友关注，去分享给好友关注吧</div>
        <div v-else v-for="(item,index) in data" :key="item.id" class="scroll_item db pt10 pb10">
          <div class="t-table">
						<div class="t-cell w50 v_middle">
              <img class="avatarimg1" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
						</div>
						<div class="t-cell v_middle">
							<div class="clamp1">{{ item.username }}</div>
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

const limit = 10
let pageStart = 0

export default {
  components: {
    XImg
  },
  data () {
    return {
      loginUser: {},
      data: [],
      disData: false,
      WeixinQrcode: ENV.WeixinQrcode
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
    handleScroll () {
      const self = this
      self.$util.scrollEvent({
        element: self.$refs.scrollContainer,
        callback: function () {
          if (self.data.length === (pageStart + 1) * limit) {
            pageStart++
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
      if (this.data.length < limit) {
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
