/*
* @description: 跳转小程序页面
* @auther: gyp
* @created_date: 2021-01-23
*/
<template>
  <div class="bg-page font14 bg-white">
    <wx-open-launch-weapp
      id="jumpt-btn"
      username="gh_dc6e3c73bc4c"
      @launch="handleLaunchFn"
      @error="handleErrorFn"
      style="width:100%;display:block;">
      <script type="text/wxtag-template">
        <div style="width:100%;height:39px;padding:0 12px;box-sizing:border-box;display:flex;justify-content:flex-left;">
          <div style="color:#666;height:39px;flex:1;display:flex;justify-content:flex-start;align-items:center;">跳转小程序</div>
          <div style="color:#ff712f;flex:1;display:flex;justify-content:flex-end;align-items:center;">灰太狼</div>
        </div>
      </script>
    </wx-open-launch-weapp>
  </div>
</template>

<i18n>
</i18n>

<script>
import ENV from 'env'
import jQuery from 'jquery'
export default {
  data () {
    return {
    }
  },
  methods: {
    handleLaunchFn (e) {
      console.log(e)
    },
    handleErrorFn (e) {
      console.log('fail', e.detail)
    },
    refresh () {
    }
  },
  activated () {
    jQuery('#jumpt-btn')[0].click()
  }
}
</script>

<style lang="less">
</style>
