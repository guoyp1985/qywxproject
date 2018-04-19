<template>
  <div class="bk-productitem1 scroll_item mb5 font14 bg-white">
    <slot name="icon"></slot>
		<div class="t-table bg-white pt10 pb10">
			<div class="t-cell pl10 v_middle" style="width:90px;">
        <slot name="photo"></slot>
			</div>
			<div class="t-cell v_middle">
        <slot name="rightcell"></slot>
			</div>
		</div>
  </div>
</template>

<script>
export default {
  name: 'Productitemplate1'
}
</script>

<style lang="less">
.bk-productitem1{overflow:hidden;position:relative;}
.bk-productitem1 .icon{display:none;}
.bk-productitem1 .down.icon{
        display:block;
        position:absolute;right:0;top:0;width:96px;height:25px;line-height:25px;
        background-color:#8a8a8a;color:#fff;text-align:center;font-size: 12px;
        -webkit-transform: translate(30px,5px) rotate(45deg);
        transform: translate(30px,5px) rotate(45deg);
}
.bk-productitem1 .down.icon:after{content:"已下架";}
</style>
