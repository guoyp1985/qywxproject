<template>
  <div class="wraper" ref="wraper">
    <slot name="content" ref="content"></slot>
    <slot name="team-content-nav"></slot>
    <slot name="ope-btns"></slot>
  </div>
</template>

<script type="text/javascript">
import BScroll from 'better-scroll'
export default {
  mounted () {
    this.initScroll()
  },
  data () {
    return {
      bscroll: null
    }
  },
  methods: {
    initScroll () {
      this.bscroll = new BScroll(this.$refs.wraper, {
        click: true,
        probeType: 3
      })
      this.bscroll.on('scrollEnd', res => {
        this.$emit('scrollEnd', res.y)
      })
      this.bscroll.on('scroll', res => {
        this.$emit('scroll', res.y)
      })
    },
    refresh () {
      this.$nextTick(() => {
        this.bscroll.refresh()
      })
    }
  }
};
</script>

<style lang="less" scoped="">
  .wraper{
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
</style>