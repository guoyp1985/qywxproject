<template>
  <div class="bk-listplate1 scroll_item">
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
  name: 'Listplate1'
}
</script>

<style lang="less">
.bk-listplate1{
  display: -webkit-box;
  padding:10px;
  position:relative;
  border-bottom:@list-border-color 1px solid;
}
.scroll_list .scroll_item:last-child{border-bottom:none;}
.bk-listplate1 .piccell{
  text-align:left;
  width:50px;
}
.bk-listplate1 .titlecell{
  flex:1;
  text-align:left;
}
.bk-listplate1 .iconcell{
  text-align:right;
  width:60px;
}
.cols-2 .iconcell{display:none;}
</style>
