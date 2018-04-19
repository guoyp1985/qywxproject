<template>
  <div class="bk-newsitem scroll_item font14 bg-white mb5 pt10 pb10">
      <div class="t-table">
        <div class="t-cell v_middle pl10" style="width:90px;">
          <slot name="photo"></slot>
        </div>
        <div class="t-cell v_middle">
          <div class="pr10">
            <div class="clamp2 color-black"><slot name="title"></slot></div>
            <div class="color-gray font12 mt5 clamp1"><slot name="date"></slot></div>
          </div>
        </div>
      </div>
  </div>
</template>

<i18n>
</i18n>

<script>
export default {
  name: 'Newsitemplate'
}
</script>

<style lang="less">
</style>
