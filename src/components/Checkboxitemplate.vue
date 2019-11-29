<template>
  <div class="bk-checkboxitemplate scroll_item">
    <label class="db">
      <div class="t-table">
        <div class="t-cell v_middle" style="width:30px;">
          <div class="qcheckbox">
            <slot name="checkbox"></slot>
            <i class="al"></i>
          </div>
        </div>
        <div class="t-cell pic v_middle w50">
          <slot name="pic"></slot>
        </div>
        <div class="t-cell v_middle" style="color:inherit;">
          <slot name="title"></slot>
        </div>
        <div class="t-cell align_right v_middle" style="width:100px;">
          <slot></slot>
        </div>
      </div>
    </label>
  </div>
</template>
<script>
export default {
  name: 'Checkboxitemplate'
}
</script>

<style lang="less">
.bk-checkboxitemplate{
  display: -webkit-box;
  padding-top:10px;
  padding-bottom:10px;
  position:relative;
}
.scroll_list .bk-checkboxitemplate:not(:last-child):after{
  content:"";display:block;
	background-color:@list-border-color;height:1px;overflow:hidden;
	position: absolute;left: 0;right: 0;bottom:0px;
	-webkit-transform: scaleY(0.5) translateY(0.5px);
	transform: scaleY(0.5) translateY(0.5px);
	-webkit-transform-origin: 0% 0%;
	transform-origin: 0% 0%;
}
</style>
