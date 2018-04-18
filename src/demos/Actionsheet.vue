<template>
  <div>
    <group>
      <x-switch title="基本使用" v-model="show1"></x-switch>
      <x-switch title="安卓风格" v-model="show7"></x-switch>
      <x-switch title="显示取消菜单" v-model="show2"></x-switch>
      <x-switch title="使用数组定义菜单" v-model="show5"></x-switch>
    </group>

    <group title="点击遮罩区域不自动关闭">
      <x-switch title="基本使用" v-model="show4"></x-switch>
    </group>

    <group>
      <x-switch title="显示提示文字" v-model="show3"></x-switch>
      <x-switch title="使用" v-model="show6"></x-switch>
      <x-switch title="不自动关闭" v-model="show8"></x-switch>
    </group>

    <actionsheet v-model="show4" :menus="menus1" :close-on-clicking-mask="false" show-cancel @on-click-mask="console('on click mask')"></actionsheet>

    <actionsheet v-model="show1" :menus="menus1" @on-click-menu="click"></actionsheet>

    <actionsheet v-model="show2" :menus="menus2" @on-click-menu="click" show-cancel></actionsheet>

    <actionsheet v-model="show3" :menus="menus3" @on-click-menu="click" @on-click-menu-delete="onDelete" show-cancel></actionsheet>

    <actionsheet v-model="show5" :menus="menus5" show-cancel @on-click-menu="click5"></actionsheet>

    <actionsheet v-model="show6" :menus="menus1">
      <p slot="header" v-html="'确定咩?<br/><span style="color:#666;font-size:12px;">删除后就无法撤消了哦</span>'"></p>
    </actionsheet>

    <actionsheet v-model="show7" :menus="menu7" theme="android" @on-click-menu="click">
    </actionsheet>

    <toast v-model="showSuccess">删除成功</toast>

    <div v-transfer-dom>
      <actionsheet v-model="show8" :menus="menus8" @on-click-menu="demo8doClose" :close-on-clicking-mask="false" :close-on-clicking-menu="false">
      </actionsheet>
    </div>
  </div>
</template>

<script>
import { TransferDom, Actionsheet, Group, XSwitch, Toast } from 'vux'
export default {
  components: {
    Actionsheet,
    Group,
    XSwitch,
    Toast
  },
  directives: {
    TransferDom
  },
  data () {
    return {
      show1: false,
      menus1: {
        menu1: '分享给朋友',
        menu2: '分享到朋友圈'
      },
      show2: false,
      menus2: {
        menu1: '拍照',
        menu2: '从相册选择'
      },
      show3: false,
      show4: false,
      show5: false,
      show6: false,
      show7: false,
      show8: false,
      menus5: [{
        label: '确定咩?<br/><span style="color:#666;font-size:12px;">删除后就无法撤消了哦</span>',
        type: 'info'
      }, {
        label: 'Primary',
        type: 'primary',
        value: 'primary',
        otherProp: 'hey'
      }, {
        label: 'Warn',
        type: 'warn'
      }, {
        label: 'Disabled',
        type: 'disabled'
      }, {
        label: 'Default'
      }],
      menu7: {
        menu1: '北京烤鸭',
        menu2: '陕西油泼面',
        menu3: '西安肉夹馍'
      },
      showSuccess: false,
      menus3: {
        'title.noop': '确定咩?<br/><span style="color:#666;font-size:12px;">删除后就无法撤消了哦</span>',
        delete: '<span style="color:red">Delete</span>'
      },
      menus8: {
        menu1: '点我关闭',
        menu2: '点我关闭'
      }
    }
  },
  methods: {
    demo8doClose () {
      this.$vux.loading.show({
        text: 'processing'
      })
      setTimeout(() => {
        this.$vux.loading.hide()
        this.show8 = false
      }, 1000)
    },
    console (msg) {
      console.log(msg)
    },
    click (key) {
      console.log(key)
    },
    click5 (key, item) {
      console.log(key, item)
    },
    onDelete () {
      this.showSuccess = true
    }
  }
}
</script>

<style>
.popup0 {
  padding-bottom:15px;
  height:200px;
}
.popup1 {
  width:100%;
  height:100%;
}
</style>
