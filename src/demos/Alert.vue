<template>
  <div>
    <group>
      <x-switch title="显示" v-model="show"></x-switch>
    </group>
    <div v-transfer-dom>
      <alert v-model="show" title="恭喜" @on-show="onShow" @on-hide="onHide">消息已成功发送</alert>
    </div>

    <group title="Prop: content">
      <x-switch title="显示" v-model="show2"></x-switch>
    </group>
    <div v-transfer-dom>
      <alert v-model="show2" title="恭喜" content="消息已成功发送"></alert>
    </div>

    <group title="以插件方式调用">
      <cell title="显示" @click.native="showPlugin" is-link></cell>
      <cell title="3秒后关闭" @click.native="showPluginAuto" is-link></cell>
    </group>

    <group title="以插件方式调用">
      <cell title="显示" @click.native="showModule" is-link></cell>
      <cell title="3秒后关闭" @click.native="showModuleAuto" is-link></cell>
    </group>
  </div>
</template>

<script>
import { AlertModule, Alert, Group, XSwitch, Cell, TransferDomDirective as TransferDom } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    Alert,
    Group,
    XSwitch,
    Cell
  },
  data () {
    return {
      show: false,
      show1: false,
      show2: false
    }
  },
  methods: {
    onHide () {
      console.log('on hide')
    },
    onShow () {
      console.log('on show')
    },
    showPlugin () {
      this.$vux.alert.show({
        title: 'VUX is Cool',
        content: '同意不?',
        onShow () {
          console.log('Plugin: I\'m showing')
        },
        onHide () {
          console.log('Plugin: I\'m hiding now')
        }
      })
    },
    showModule () {
      AlertModule.show({
        title: 'VUX is Cool',
        content: '同意不?',
        onShow () {
          console.log('Module: I\'m showing')
        },
        onHide () {
          console.log('Module: I\'m hiding now')
        }
      })
    },
    showModuleAuto () {
      this.showModule()
      setTimeout(() => {
        AlertModule.hide()
      }, 3000)
    },
    showPluginAuto () {
      this.showPlugin()
      setTimeout(() => {
        this.$vux.alert.hide()
      }, 3000)
    }
  }
}
</script>
