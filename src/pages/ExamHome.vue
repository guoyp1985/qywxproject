<template>
  <div class="containerarea exam-home-page">
    <div class="page-bg">
      <div class="page-inner">
        <div class="top-area">
          <img class="img" src="../assets/images/exam_1.png" />
        </div>
        <div class="btn-area">
          <div class="img-area">
            <img class="img" src="../assets/images/exam_2.png" />
            <div class="txt" @click="toExam">开通推广人员身份</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {} from 'vux'
import ENV from 'env'
import { User } from '#/storage'
export default {
  components: {
  },
  data () {
    return {
      loginUser: {},
      query: {}
    }
  },
  computed: {
  },
  methods: {
    toExam () {
      let params = this.$util.handleAppParams(this.query)
      this.$router.push({path: '/examStudy', query: params})
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.loginUser = User.get()
      this.query = this.$route.query
    }
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less">
.exam-home-page{
  width:100%;position:relative;
  .page-bg{width:100%;padding-bottom:212.2%;position:relative;}
  .page-inner{
    position:absolute;left:0;top:0;bottom:0;right:0;overflow-y:auto;
    background-image:url('../assets/images/exam_bg.png');
    background-size:cover;
    background-repeat:no-repeat;
  }
  .top-area{
    width:62%;margin:0 auto;
    .img{width:100%;}
  }
  .btn-area{
    width:62%;margin:26% auto 0;
    .img-area{
      width:100%;position:relative;
      .img{width:100%;}
      .txt{
        position:absolute;left:0;top:7%;right:0;bottom:31%;
        display:flex;justify-content: center;align-items: center;
        color:#fff;font-size:18px;font-weight:bold;z-index:10;
      }
    }
  }
}
</style>
