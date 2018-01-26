<template>
  <div id="app">
    <div v-transfer-dom>
      <loading v-model="isLoading" delay="1"></loading>
    </div>
    <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="55px">
      <x-header
      style="width:100%;position:absolute;left:0;top:0;z-index:100;"
      :left-options="leftOptions"
      :right-options="rightOptions"
      :title="title"
      :transition="headerTransition">
      </x-header>
      <transition
      :name="viewTransition"
      :css="!!direction">
        <router-view class="router-view"></router-view>
      </transition>
    </view-box>
  </div>
</template>

<script>
import { ViewBox, XHeader, Loading, TransferDom } from 'vux'
import { mapState } from 'vuex'

export default {
  name: 'app',
  directives: {
    TransferDom
  },
  components: {
    ViewBox,
    XHeader,
    Loading
  },
  watch: {
    path (path) {
      if (path === '/component/demo') {
        this.$router.replace('/demo')
      }
    }
  },
  computed: {
    ...mapState({
      route: state => state.route,
      path: state => state.route.path,
      isLoading: state => state.vux.isLoading,
      direction: state => state.vux.direction
    }),
    leftOptions () {
      return {
        showBack: this.route.path !== '/'
      }
    },
    rightOptions () {
      return {
        showMore: true
      }
    },
    headerTransition () {
      if (!this.direction) return ''
      return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
    },
    componentName () {
      if (this.route.path) {
        const parts = this.route.path.split('/')
        if (/component/.test(this.route.path) && parts[2]) return parts[2]
      }
    },
    title () {
      if (this.route.path === '/') return 'Home'
      if (this.route.path === '/components') return 'Demo list'
      return this.componentName ? `Demo/${this.componentName}` : 'Demo/~~'
    },
    viewTransition () {
      console.log(this.direction)
      if (!this.direction) return ''
      return 'vux-' + (this.direction === 'forward' ? 'in' : 'out')
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/tap.less';

body {
  background-color: #fbf9fe;
}
html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
.demo-icon-22 {
  font-family: 'vux-demo';
  font-size: 22px;
  color: #888;
}
.weui-tabbar.vux-demo-tabbar {
  /** backdrop-filter: blur(10px);
  background-color: none;
  background: rgba(247, 247, 250, 0.5);**/
}
.vux-demo-tabbar .weui-bar__item_on .demo-icon-22 {
  color: #F70968;
}
.vux-demo-tabbar .weui-tabbar_item.weui-bar__item_on .vux-demo-tabbar-icon-home {
  color: rgb(53, 73, 94);
}
.demo-icon-22:before {
  content: attr(icon);
}
.vux-demo-tabbar-component {
  background-color: #F70968;
  color: #fff;
  border-radius: 7px;
  padding: 0 4px;
  line-height: 14px;
}
.weui-tabbar__icon + .weui-tabbar__label {
  margin-top: 0!important;
}
.vux-demo-header-box {
  z-index: 100;
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
}
@font-face {
  font-family: 'vux-demo';  /* project id 70323 */
  src: url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.eot');
  src: url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.eot?#iefix') format('embedded-opentype'),
  url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.woff') format('woff'),
  url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.ttf') format('truetype'),
  url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.svg#iconfont') format('svg');
}
.demo-icon {
  font-family: 'vux-demo';
  font-size: 20px;
  color: #04BE02;
}
.demo-icon-big {
  font-size: 28px;
}
.demo-icon:before {
  content: attr(icon);
}
.router-view {
  width: 100%;
  top: 46px;
}
.vux-out-enter-active,
.vux-out-leave-active,
.vux-in-enter-active,
.vux-in-leave-active {
  transition: all 350ms;
  position: absolute;
  width: 100%;
  box-sizing: border-box;
  backface-visibility: hidden;
  perspective: 1000;
  will-change: transform;
}

.vux-out-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.vux-out-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.vux-in-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.vux-in-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.menu-title {
  color: #888;
}
</style>
