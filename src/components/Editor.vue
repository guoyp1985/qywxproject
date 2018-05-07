/*
* @description: 内容编辑组件
* @auther: simon
* @created_date: 2018-5-3
*/
<template>
  <div class="editor">
    <div class="edit-btn-box" v-show="!showBtnArea">
      <a class="edit-btn" @click="clickEditHandle">
        <span class="color-white font16">{{$t('Edit')}}</span>
      </a>
    </div>
    <div class="menu-btn-box" v-show="!showMenuArea">
      <a class="menu-btn" @click="clickMenuHandle">
        <span class="color-white font16">{{$t('Menu')}}</span>
      </a>
    </div>
    <flexbox slot="bottom" class="option-area" v-show="showBtnArea">
      <flexbox-item>
        <x-button type="primary" @click.native="onSave">{{$t('Save')}}</x-button>
      </flexbox-item>
      <flexbox-item>
        <x-button @click.native="onCancel">{{$t('Cancel')}}</x-button>
      </flexbox-item>
    </flexbox>
    <flexbox slot="bottom" class="option-area" v-show="showMenuArea">
      <flexbox-item>
        <x-button @click.native="onSetting">{{$t('Setting')}}</x-button>
      </flexbox-item>
      <flexbox-item>
        <x-button type="warn" @click.native="onDelete">{{$t('Delete')}}</x-button>
      </flexbox-item>
      <flexbox-item>
        <x-button @click.native="onClose">{{$t('Close')}}</x-button>
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
      showBtnArea: false,
      showMenuArea: false
    }
  },
  computed: {
  },
  methods: {
    clickEditHandle () {
      this.showMenuArea = false
      this.showBtnArea = true
      this.createEditor()
      this.$vux.toast.text(this.$t('Entry Edit Mode'))
      this.$emit('on-edit')
    },
    onSave () {
      this.$emit('on-save')
    },
    onCancel () {
      this.showBtnArea = false
      editor.destory()
      this.$emit('on-cancel')
    },
    createEditor () {
      const self = this
      editor = new Eleditor({
        el: this.elem,
        insertImageCallback:function(callback){
        },
        insertProductCallback:function(callback){
        }
      })
    },
    clickMenuHandle () {
      if (editor) {
        editor.destory()
      }
      this.showBtnArea = false
      this.showMenuArea = true
      this.$emit('on-menu')
    },
    onSetting () {
      this.$emit('on-setting')
    },
    onDelete () {
      this.$emit('on-delete')
    },
    onClose () {
      this.showMenuArea = false
    }
  }
}
</script>

<style lang="less" scoped>
.edit-btn-box {
  position: absolute;
  bottom: 150px;
  right: 20px;
}
.menu-btn-box {
  position: absolute;
  bottom: 80px;
  right: 20px;
}

.edit-btn,
.menu-btn {
  width: 40px;
  height: 40px;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.55);
  border-radius: 50%;
  display: block;
  text-align: center;
  line-height: 40px;
}
.option-area {
  position: absolute;
  bottom: 0;
  z-index: 500;
  // height: 62px;
  padding: 10px 10px;
  box-sizing: border-box;
  background-color: #ffffff;
}
.option-area:before {
  content: ' ';
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  height: 1px;
  border-top: 1px solid #e7e7e7;
}
</style>
