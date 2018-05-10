<template>
  <router-link :to="{path:'/product',query:{wid:data.wid,id:data.productid}}" class="bk-groupbuyitem scroll_item mb5 font14 bg-white db">
		<div class="t-table pt10 pb10">
			<div class="t-cell pl10 v_middle" style="width:90px;">
        <slot name="photo"></slot>
			</div>
			<div class="t-cell v_middle">
				<div class="clamp1 font14 pr10"><slot name="title"></slot></div>
				<div class="align_left mt10">
					<div class="qbtn6 border-oranage5 font12 color-orange5"><slot name="numbers"></slot>人团</div>
					<span class="ml5 color-gray2 font12">已团<slot name="havetuan"></slot>件</span>
				</div>
        <div class="clear">
  				<div class="mt5 db-in">
  					<span class="color-red font14 middle-cell">{{ $t('RMB') }} <slot name="groupprice"></slot></span>
  					<span class="color-gray2 font12 middle-cell ml5" style="text-decoration:line-through;">{{ $t('RMB') }} <slot name="price"></slot></span>
  				</div>
  				<div class="align_right pr10 db-in fr">
  					<div class="qbtn5 bg-red color-white">一键拼团</div>
  				</div>
        </div>
			</div>
		</div>
  </router-link>
</template>

<script>
export default {
  name: 'Groupbuyitemplate',
  props: {
    data: Object
  }
}
</script>

<style lang="less">
</style>
