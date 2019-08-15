<template>
  <div class="bk-forminput form-item">
    <div class="t-table">
      <div class="t-cell title-cell font14 v_middle"><slot name="title"></slot><span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
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
</style>
