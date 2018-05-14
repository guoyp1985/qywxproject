<template>
  <div class="containerarea font14 bg-page">
		<div class="align_center pt10 pb10">
			<img :src="WeixinQrcode" style="max-width:90%;max-height:90%;" />
		</div>
		<div class="padding10 bg-white">
			<div class="pb10 border font16 color-gray b_bottom_after">我推荐的用户</div>
			<div class="scroll_list">
        <div v-if="!data || data.length == 0" class="flex_center emptyitem">您还没有好友关注，去分享给好友关注吧</div>
        <div v-else v-for="(item,index) in data" :key="item.id" class="scroll_item db">
          <div class="t-table">
						<div class="t-cell w50">
							<img class="avtarimg" :src="item.avatar" />
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
import Time from '#/time'
import ENV from 'env'

export default {
  components: {
  },
  data () {
    return {
      loginUser: Object,
      data: [],
      disdatalist: false,
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
    self.$store.commit('updateToggleTabbar', {toggleTabbar: false})
  }
}
</script>

<style lang="less">
</style>
