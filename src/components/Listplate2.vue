<template>
  <div class="bk-listplate2 scroll_item">
    <div class="row">
      <div class="piccell flex_left">
        <slot name="pic"></slot>
      </div>
      <div class="titlecell flex_left">
        <div style="width:100%;">
          <slot name="title"></slot>
        </div>
      </div>
      <div class="iconcell flex_right">
        <slot name="btn"></slot>
      </div>
    </div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'Listplate2'
}
</script>

<style lang="less">
.bk-listplate2{
  padding-top:10px;
  padding-bottom:10px;
  position:relative;
  overflow:hidden;
}
.scroll_list .bk-listplate2:not(:last-child):after{
  content:"";display:block;
	background-color:@list-border-color;height:1px;overflow:hidden;
	position: absolute;left: 0;right: 0;bottom:0px;
	-webkit-transform: scaleY(0.5) translateY(0.5px);
	transform: scaleY(0.5) translateY(0.5px);
	-webkit-transform-origin: 0% 0%;
	transform-origin: 0% 0%;
}
.bk-listplate2 .row{
  display: -webkit-box;
  position:relative;
}
.bk-listplate2 .piccell{
  text-align:left;
  width:80px;
  padding-right:10px;
}
.bk-listplate2 .piccell img{
  width:80px;height:80px;vertical-align: middle;
}
.bk-listplate2 .titlecell{
  flex:1;
  text-align:left;
}
.bk-listplate2 .iconcell{
  text-align:right;
  width:60px;
}
.cols-2 .iconcell{display:none;}
</style>
