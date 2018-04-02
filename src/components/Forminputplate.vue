<template>
  <div class="bk-forminput form-item">
    <div class="t-table">
      <div class="t-cell title-cell w80 font14 v_middle"><slot name="title"></slot><span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
      <div class="t-cell input-cell v_middle" style="position:relative;">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Forminputplate'
}
</script>

<style lang="less">
.form-item{position:relative;padding:10px;}
.form-item:after{
  content:"";display:block;
	background-color:@list-border-color;height:1px;overflow:hidden;
	position: absolute;left: 0;right: 0;bottom:0px;
	-webkit-transform: scaleY(0.5) translateY(0.5px);
	transform: scaleY(0.5) translateY(0.5px);
	-webkit-transform-origin: 0% 0%;
	transform-origin: 0% 0%;
}
.form-item .ricon{display:none;}
.form-item.required .ricon{display:inline-block;}
.form-item .input{
    width: 100%;
    padding: 5px;
    font-size: 14px;
    height: auto;
}
.form-item .weui-cell{padding:0;}
.form-item .weui-cells{margin-top:0 !important;}
.form-item .weui-cells:before,.form-item .weui-cells:after{display:none;}
.x-number{width:120px;}
.x-number .vux-number-input{font-size:14px;width:35px !important;}
.form-item .weui-cell_access .weui-cell__ft:after {display:none;}
.form-item .weui-cell__ft{text-align:left;}
</style>
