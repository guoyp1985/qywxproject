/*
* @description: 内容编辑组件
* @auther: simon
* @created_date: 2018-5-3
*/
<template>
  <div class="editor">
    <div class="edit-btn-box">
      <a class="edit-btn" @click="clickHandle">
        <span class="color-white font16">{{$t('Edit')}}</span>
      </a>
    </div>
    <flexbox slot="bottom" class="button-area" v-show="showOptionArea">
      <flexbox-item>
        <x-button type="primary" @click.native="onSave">{{$t('Save')}}</x-button>
      </flexbox-item>
      <flexbox-item>
        <x-button @click.native="onCancel">{{$t('Cancel')}}</x-button>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem, XButton } from 'vux'

export default {
  name: 'Editor',
  components: {
    Flexbox,
    FlexboxItem,
    XButton
  },
  props: {
    elem: String
  },
  data () {
    return {
      showOptionArea: false
    }
  },
  computed: {
  },
  methods: {
    clickHandle () {
      this.showOptionArea = true
      this.$emit('on-click')
    },
    onSave () {
      this.$emit('on-save')
    },
    onCancel () {
      this.$emit('on-cancel')
    }
  }
}
</script>

<style lang="less" scoped>
  .edit-btn-box {
    position: absolute;
    bottom: 80px;
    right: 20px;
  }
  .edit-btn {
    width: 55px;
    height: 55px;
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.65);
    border-radius: 50%;
  }
  .button-area {
    position: absolute;
    bottom: 0;
    z-index: 500px;
    height: 42px;
    padding: 2px 0;
  }
</style>
