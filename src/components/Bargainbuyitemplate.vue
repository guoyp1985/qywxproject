<template>
  <router-link :to="{path:'/activity',query:{id:data.id}}" class="bk-bargainbuyitem scroll_item bg-white mb5 db">
		<div class="t-table pt10 pb10">
			<div class="t-cell pl10 v_middle" style="width:90px;">
        <slot name="photo"></slot>
			</div>
			<div class="t-cell v_middle">
				<div class="clamp1 font14 pr10"><slot name="title"></slot></div>
					<div class="align_left mt10">
  					<div class="qbtn6 border-oranage5 font12 color-orange5">立省{{ $t('RMB') }} <slot name="saveprice"></slot></div>
					</div>
          <div class="clear">
            <div class="mt5 db-in">
              <span class="color-red font14 middle-cell">{{ $t('RMB') }} <slot name="minprice"></slot></span>
              <span class="color-gray2 font12 middle-cell ml5" style="text-decoration:line-through;">{{ $t('RMB') }} <slot name="price"></slot></span>
            </div>
            <div class="align_right pr10 db-in fr">
              <div class="qbtn5 bg-red color-white">邀请砍价</div>
            </div>
          </div>
				</div>
			</div>
  </router-link>
</template>

<script>
export default {
  name: 'Bargainbuyitemplate',
  props: {
    data: Object
  }
}
</script>

<style lang="less">
</style>
