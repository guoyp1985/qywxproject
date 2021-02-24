<style lang="less">

</style>

<template>
  <div class="list-area">
    <div class="item">
      <div class="ico-cell">
        <span class="al al-qitashouru"></span>
      </div>
      <div class="txt-cell">我的收入</div>
    </div>
    <router-link class="item" to="/aboutGxk">
      <div class="ico-cell">
        <span class="al al-guanyu"></span>
      </div>
      <div class="txt-cell">关于共销客</div>
    </router-link>
    <router-link class="item" to="/complaint">
      <div class="ico-cell">
        <span class="al al-wenti"></span>
      </div>
      <div class="txt-cell">问题反馈</div>
    </router-link>
    <router-link class="item" to="/service">
      <div class="ico-cell">
        <span class="al al-kefu1"></span>
      </div>
      <div class="txt-cell">联系客服</div>
    </router-link>
    <div class="item" @click="toAdmin">
      <div class="ico-cell">
        <span class="al al-houtaiguanli"></span>
      </div>
      <div class="txt-cell">后台管理</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Userpage',
  props: {
    user: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      showModal: false
    }
  },
  methods: {
    toAdmin () {
      location.href = `${ENV.AdminUrl}?username=${this.loginUser.username}`
    },
    clickKefu () {
      this.showModal = true
    },
    closeEvent () {
      this.showModal = false
    }
  }
}
</script>
