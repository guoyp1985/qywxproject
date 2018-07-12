<template>
  <router-link :to="{path: '/product', query: {id: data.id, wid: data.uploader}}" class="bk-productitem scroll_item font14">
		<div class="inner list-shadow">
			<div class="picarea">
				<div class="pic">
          <slot name="photo"></slot>
				</div>
			</div>
			<div class="desbox" style="overflow:hidden;">
				<div class="align_left pl5 pr5 clamp2 distitle" style="line-height:18px;height:36px;"><slot name="title"></slot></div>
				<div class="clamp1">
					<div class="flex_table padding5">
						<span class="color-red font14 flex_cell" style="overflow: hidden;
    margin-right: 10px;
    white-space: nowrap;
    text-overflow: ellipsis;">{{ $t('RMB') }} <slot name="price"></slot></span>
						<span class="color-gray">{{ $t('Saled txt') }}:<slot name="saled"></slot></span>
					</div>
				</div>
			</div>
		</div>
  </router-link>
</template>
<i18n>
Saled txt:
  zh-CN: 销量
</i18n>

<script>
export default {
  name: 'Productitemplate',
  props: {
    data: Object
  }
}
</script>

<style lang="less">
</style>
