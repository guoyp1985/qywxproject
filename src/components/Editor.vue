/*
* @description: 内容编辑组件
* @auther: simon
* @created_date: 2018-5-3
*/
<template>
  <div class="editor">
    <a class="edit-btn" @click="clickHandle">
      <span></span>
    </a>
  </div>
</template>

<script>
import { Grid, GridItem, Badge } from 'vux'

export default {
  name: 'Editor',
  components: {
  },
  props: {
  },
  computed: {
  },
  methods: {
    clickHandle () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" scoped>
  .editor {
    position: absolute;
    bottom: 80px;
    left: 20px;
  }
</style>
