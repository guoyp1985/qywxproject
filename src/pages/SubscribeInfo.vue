<template>
  <div class="containerarea font14 bg-page sinfo">
		<div class="align_center pt10 pb10">
      <img :src="WeixinQrcode" style="max-width:90%;max-height:90%;" />
		</div>
		<div class="padding10 bg-white">
			<div class="pb10 border font16 color-gray b_bottom_after">我推荐的用户</div>
			<div v-if="disData" class="scroll_list">
        <div v-if="!data || data.length == 0" class="flex_center emptyitem">您还没有好友关注，去分享给好友关注吧</div>
        <div v-else v-for="(item,index) in data" :key="item.id" class="scroll_item db">
          <div class="t-table">
						<div class="t-cell w50">
              <x-img class="avtarimg" :src="item.avatar" default-src="../src/assets/images/user.jpg" :offset="0" container="#vux_view_box_body"></x-img>
						</div>
						<div class="t-cell">
							<div class="clamp1"><span :class="getDateClass(item.dateline)">{{ getDateState(item.dateline) }}</span>{{ item.title }}</div>
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
      loginUser: Object,
      data: [],
      disData: false,
      WeixinQrcode: ENV.WeixinQrcode,
      limit: 20,
      pagestart1: 0,
      isBindScroll1: false,
      scrollArea1: null
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
    getQrcode () {
      return ENV.WeixinQrcode
    },
    getDateState: function (dt) {
      return this.$util.getDateState(dt)
    },
    getDateClass: function (dt) {
      let ret = this.$util.getDateClass(dt)
      ret = `${ret} mr5`
      return ret
    },
    scroll1: function () {
      const self = this
      self.$util.scrollEvent({
        element: self.scrollArea1,
        callback: function () {
          if (self.data.length === (self.pagestart1 + 1) * self.limit) {
            self.pagestart1++
            self.$vux.loading.show()
            self.getdata1()
          }
        }
      })
    },
    getdata1 () {
      const self = this
      self.$http.get(`${ENV.BokaApi}/api/user/uploadByMe`).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.data = self.data.concat(retdata)
        self.disData = true
        if (!self.isBindScroll1) {
          self.scrollArea1 = document.querySelector('.containerarea.sinfo')
          self.isBindScroll1 = true
          self.scrollArea1.removeEventListener('scroll', self.scroll1)
          self.scrollArea1.addEventListener('scroll', self.scroll1)
        }
      })
    }
  },
  created () {
    const self = this
    self.$store.commit('updateToggleTabbar', {toggleTabbar: false})
    self.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, {
      module: 'retailer', action: 'subscribeinfo'
    })
    self.$vux.loading.show()
    self.getdata1()
  }
}
</script>

<style lang="less">
</style>
