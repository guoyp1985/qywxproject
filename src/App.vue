<template>
  <div id="app">
    <transition name="slide-fade">
      <x-header
      style="width:100%;position:absolute;left:0;top:0;z-index:100;"
      :left-options="leftOptions"
      :right-options="rightOptions"
      :title="title"
      :transition="headerTransition">This is the page title.</x-header>
    </transition>
    <transition :name="viewTransition">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { ViewBox, XHeader } from 'vux'
import { mapState } from 'vuex'

export default {
  name: 'app',
  components: {
    ViewBox,
    XHeader
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
    title () {
      if (this.route.path === '/') return 'Home'
      if (this.route.path === '/project/donate') return 'Donate'
      if (this.route.path === '/demo') return 'Demo list'
      return this.componentName ? `Demo/${this.componentName}` : 'Demo/~~'
    },
    viewTransition () {
      if (!this.direction) return ''
      return 'vux-' + (this.direction === 'forward' ? 'in' : 'out')
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
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
}

.vux-out-enter {
  transform: translate3d(-100%, 0, 0);
}

.vux-out-leave-active {
  transform: translate3d(100%, 0, 0);
}

.vux-in-enter {
  transform: translate3d(100%, 0, 0);
}

.vux-in-leave-active {
  transform: translate3d(-100%, 0, 0);
}

</style>
