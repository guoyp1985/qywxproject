<style lang="less">
.about-gxk-page{
}
</style>
<template>
  <div class="bg-page about-gxk-page">
    <img style="width:100%;display:block;" src="https://tossharingsales.boka.cn/minigxk/start/gxkHead.png" />
    <div style="width:100%;padding:30px 0;" class="flex_center">
      <video
        style="width:90%;box-shadow:0px 2px 9px rgba(0,0,0,0.2);border-radius:2%;"
        src="https://tossharingsales.boka.cn/minigxk/start/gxkStart.mp4"
        poster="https://tossharingsales.boka.cn/minigxk/start/ljgxk.png"
        object-fit="fill" controls>
      </video>
    </div>
    <img style="width:100%;display:block;" src="https://tossharingsales.boka.cn/minigxk/start/gxkBody.png" />
  </div>
</template>

<script>
import {} from 'vux'
import { User } from '#/storage'
export default {
  components: {},
  data () {
    return {
      query: {},
      loginUser: {}
    }
  },
  methods: {
    refresh () {
      this.query = this.$route.query
      this.loginUser = User.get()
    }
  },
  activated () {
    this.refresh()
  }
}
</script>
