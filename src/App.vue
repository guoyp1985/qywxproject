<template>
  <div id="app" @touchend="globalTouch" style="height:100%;" v-cloak>
    <div v-transfer-dom>
      <loading v-model="isLoading" delay="2"></loading>
    </div>
    <view-box ref="viewBox" body-padding-bottom="0">
      <transition
      :name="viewTransition"
      :css="!!direction">
        <keep-alive>
          <router-view class="router-view"></router-view>
        </keep-alive>
      </transition>

      <tabbar class="vux-demo-tabbar" icon-class="vux-center" v-show="toggleTabbar" slot="bottom">
        <tabbar-item :link="{name: 'tUserproducts'}" :selected="route.path=='/userProducts'">
          <span class="al al-home1 font20" slot="icon" style="position:relative;top: -2px;"></span>
          <span slot="label">{{ $t('Home') }}</span>
        </tabbar-item>
        <tabbar-item :link="{name: 'tSaleProducts'}" :selected="route.path=='/saleProducts'">
          <span class="al al-tag font20" slot="icon"></span>
          <span slot="label">{{ $t('Sales') }}</span>
        </tabbar-item>
        <tabbar-item :link="{name: 'tMessages'}" :selected="route.path=='/messages'">
          <span class="al al-mark font20" slot="icon"></span>
          <span slot="label">{{ $t('Message') }}</span>
        </tabbar-item>
        <tabbar-item :link="{name: 'tFavorite'}" :selected="route.path=='/favorite'">
          <span class="al al-favor font20" slot="icon"></span>
          <span slot="label">{{ $t('Favorite') }}</span>
        </tabbar-item>
        <tabbar-item :link="{name: 'tCenter'}" :selected="route.path=='/'">
          <span class="al al-peoplefill font20" slot="icon"></span>
          <span slot="label">{{ $t('Center') }}</span>
        </tabbar-item>
      </tabbar>

    </view-box>
  </div>
</template>

<i18n>
</i18n>

<script>
import { ViewBox, Loading, Tabbar, TabbarItem, TransferDom } from 'vux'
import { mapState } from 'vuex'
import { User, SystemParams } from '#/storage'
import ENV from 'env'

export default {
  name: 'app',
  provide () {
    return {
      reload: this.reload
    }
  },
  directives: {
    TransferDom
  },
  components: {
    ViewBox,
    Loading,
    Tabbar,
    TabbarItem
  },
  watch: {
    path (path) {
      if (path === '/component/demo') {
        this.$router.replace('/demo')
      }
    },
    '$route' (to, from) {
      console.log(`set title:${this.getTitle(to.path)}`)
      document.title = this.getTitle(to.path)
    }
  },
  computed: {
    ...mapState({
      route: state => state.route,
      path: state => state.route.path,
      isLoading: state => state.vux.isLoading,
      direction: state => state.vux.direction,
      toggleTabbar: state => state.vux.toggleTabbar
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
    // headerTransition () {
    //   if (!this.direction) return ''
    //   return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
    // },
    // componentName () {
    //   if (this.route.path) {
    //     const parts = this.route.path.split('/')
    //     if (/component/.test(this.route.path) && parts[2]) return parts[2]
    //   }
    // },
    // title () {
    //   if (this.route.path === '/') return 'Home'
    //   if (this.route.path === '/components') return 'Demo list'
    //   return this.componentName ? `Demo/${this.componentName}` : 'Demo/~~'
    // },
    viewTransition () {
      // console.log(this.direction)
      if (!this.direction) return ''
      return 'vux-' + (this.direction === 'forward' ? 'in' : 'out')
    }
  },
  methods: {
    getTitle (path) {
      let name = path.substr(1).replace(/([a-z])(.*)/, (match, p1, p2) => `t${p1.toUpperCase()}${p2}`)
      if (name === '') {
        name = 'tIndex'
      }
      const title = this.$t(name)
      return title || ' '
    },
    getData () {
      // const user = User.get()
      this.$http.get(`${ENV.BokaApi}/api/user/show`, {
        params: {init: 1}
      }).then(res => {
        if (res && res.status === 200) {
          const data = res.data
          if (data.code === 0) {
            User.set(data.data)
            SystemParams.set(data.paras)
          }
        }
      })
    },
    globalTouch () {
      this.$vux.loading.hide()
    }
  },
  created () {
    console.info('App Start Up')
    // document.title = this.$t('tIndex')
    this.getData()
    this.$util.wxConfig()
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/tap.less';
@import '~vux/src/styles/close.less';
@import '~vux/src/styles/center.less';
@import './assets/global.less';
@import './assets/fonts.less';
@import './assets/hack.less';

body {
  background-color: #f5f9fa;
  color:#333;
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
#app .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon,
#app .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {
  color: #1aad19
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
