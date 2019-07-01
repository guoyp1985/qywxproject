<template>
  <router-link :to="{path: '/product', query: {id: data.id, wid: data.uploader}}" class="bk-productitem scroll_item font14">
		<div class="inner list-shadow">
			<div class="picarea">
				<div class="pic">
          <slot name="photo"></slot>
          <img v-if="data.allowcard" class="yhq" src="https://tossharingsales.boka.cn/minigxk/yhq.png"/>
				</div>
			</div>
			<div class="desbox" style="overflow:hidden;">
				<div class="align_left pl5 pr5 clamp2 distitle" style="line-height:18px;height:36px;">
          <span class="jsxuan" v-if="data.priority">精选</span>
          <slot name="title"></slot>
        </div>
        <div class="clamp1">
					<div class="flex_table padding5 pro-desc">
						<span class="color-red font14 flex_cell" style="overflow: hidden;margin-right: 10px;white-space: nowrap;text-overflow: ellipsis;">{{ $t('RMB') }} <slot name="price"></slot></span>
            <!-- <span v-if="data.allowcard" class="color-red" style="margin-right: 10px">优惠券<span class="al al-gou" style="font-size:12px;"></span></span> -->
						<span class="color-gray" v-if="item.saled">{{ $t('Saled txt') }}:<slot name="saled"></slot></span>
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
  .jsxuan{padding:2px 5px;box-sizing:border-box;text-align:center;line-height:20px;background-color:#fd8c2c;color:#fff;border-radius:2px;}
  .pro-desc{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .pic{
    .yhq{
      position: absolute;
      left: 0;
      top: 0;
      width: 30% !important;
      height: 30% !important;
    }
  }
</style>
