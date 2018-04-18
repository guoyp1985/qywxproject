<template>
  <div class="bk-listplate scroll_item">
    <div class="piccell flex_left">
      <slot name="pic"></slot>
    </div>
    <div class="titlecell flex_left">
      <div style="width:100%;">
        <slot name="title"></slot>
      </div>
    </div>
    <div class="iconcell flex_right">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Listplate'
}
</script>

<style lang="less">
.bk-listplate{
  display: -webkit-box;
  padding-top:10px;
  padding-bottom:10px;
  position:relative;
}
.scroll_list .bk-listplate:not(:last-child):after{
  content:"";display:block;
	background-color:@list-border-color;height:1px;overflow:hidden;
	position: absolute;left: 0;right: 0;bottom:0px;
	-webkit-transform: scaleY(0.5) translateY(0.5px);
	transform: scaleY(0.5) translateY(0.5px);
	-webkit-transform-origin: 0% 0%;
	transform-origin: 0% 0%;
}
.bk-listplate .piccell{
  text-align:left;
  width:50px;
}
.bk-listplate .titlecell{
  flex:1;
  text-align:left;
}
.bk-listplate .iconcell{
  text-align:right;
  width:60px;
}
.cols-2 .iconcell{display:none;}
</style>
