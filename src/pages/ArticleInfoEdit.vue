<template>
  <div id="article-info-edit">
    <group>
      <x-input :title="$t('News title')" :placeholder="`${$t('Necessary')}${$t('Title')}`" v-module="title"></x-input>
      <cell :title="$t('Cover photo')">
        上传图像后可点击<i class="al al-set font16"></i>进行剪裁
      </cell>
    </group>
  </div>
</template>
<script>
import { Group, XInput, Cell } from 'vux'
export default {
  components: {
    Group,
    XInput,
    Cell
  },
  data () {
    return {
      title: ''
    }
  }
}
</script>
<style>
</style>
