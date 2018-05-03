/*
* @description: 内容编辑组件
* @auther: simon
* @created_date: 2018-5-3
*/
<template>
  <div class="editor">
    <div class="edit-btn-box">
      <a class="edit-btn" v-show="!showOptionArea" @click="clickHandle">
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
import Eleditor from '#/Eleditor'
let editor = null
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
      this.createEditor()
      this.$emit('on-click')
    },
    onSave () {
      this.$emit('on-save')
    },
    onCancel () {
      this.showOptionArea = false
      editor.destory()
      this.$emit('on-cancel')
    },
    createEditor () {
      editor = new Eleditor({
        el: this.elem,
        toolbars: [
          'insertText',
          'editText',
          'insertImage',
          'insertLink',
          'insertHr',
          'delete',
          'undo',
          'cancel'
        ]
      })
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
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.55);
    border-radius: 50%;
    display: block;
    text-align: center;
    line-height: 55px;
  }
  .button-area {
    position: absolute;
    bottom: 0;
    z-index: 500px;
    height: 42px;
    padding: 2px 0;
  }
</style>
