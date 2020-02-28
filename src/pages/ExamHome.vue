<template>
  <div class="containerarea exam-home-page">
    <div class="page-bg">
      <div class="page-inner">
        <template v-if="showContainer1">
          <div class="top-area">
            <img class="img" src="../assets/images/exam_1.png" />
          </div>
          <div class="btn-area">
            <div class="img-area">
              <img class="img" src="../assets/images/exam_2.png" />
              <div class="txt" @click="toExam">开通推广人员身份</div>
            </div>
          </div>
        </template>
        <template v-if="showContainer2">
          <div class="page-box">
            <div class="top-radius">
              <div class="radius-bg">
                <div class="bg2">答题说明</div>
              </div>
            </div>
            <div class="con-area">
              <div>1.本活动100题，满分100分。</div>
              <div>2.答题次数不限，多次答题取最高成绩。</div>
              <div>3.成绩达到90分，则推广人员身份开通成功，如成绩未达到90分，则答题失败，可重新答题。</div>
            </div>
            <div  class="bottom-btn">
              <div class="btn btn-blue" @click="toStudy">
                <div class="btn-inner">
                  <div class="btn-txt">我要学习</div>
                </div>
              </div>
              <div class="btn btn-green" @click="toTest">
                <div class="btn-inner">
                  <div class="btn-txt">我要考试</div>
                </div>
              </div>
            </div>
          </div>
        </template>
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
      query: {},
      showContainer1: false,
      showContainer2: false
    }
  },
  computed: {
  },
  methods: {
    toExam () {
      this.showContainer1 = false
      this.showContainer2 = true
    },
    toStudy () {
      let params = this.$util.handleAppParams(this.query)
      this.$router.push({path: '/examStudy', query: params})
    },
    toTest () {
      let params = this.$util.handleAppParams(this.query)
      this.$router.push({path: '/examTest', query: params})
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.loginUser = User.get()
      this.query = this.$route.query
      this.showContainer1 = true
      this.showContainer2 = false
      let shareParams = {
        data: '推广答题',
        link: `${ENV.Host}/#/examHome?share_uid=${this.loginUser.uid}`
      }
      if (this.query.share_uid) {
        shareParams.link = `${shareParams.link}&lastshareuid=${this.query.share_uid}`
        shareParams.lastshareuid = this.query.share_uid
      }
      this.$util.handleWxShare(shareParams)
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
  .page-bg{width:100%;padding-bottom:216.5%;position:relative;}
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

  .page-box{
    width:92%;height:81.5%;height:89.5%;box-sizing: border-box;
    position:absolute;left:4%;top:5.6%;
    border:#ffb527 4px solid;background-color:#fff;border-radius:10px;
  }
  .top-radius{
    width:28.98%;position:relative;margin:3% auto 0;
    .radius-bg{
      width:100%;padding-bottom:100%;border-radius:50%;
      background-color:#417bf2;position:relative;
    }
    .bg2{
      position:absolute;left:7%;right:7%;top:7%;bottom:7%;border-radius:50%;
      background-color:#86aeff;color:#fff;
      display:flex;justify-content: center;align-items: center;
    }
  }
  .con-area{width:85.5%;margin:20px auto 0;text-align:left;font-weight:bold;}
  .bottom-btn{
    position:absolute;left:6.5%;right:6.5%;bottom:5.3%;
    .btn-blue{background-color:#417bf2;}
    .btn-green{background-color:#27db40;}
    .btn:not(:first-child){margin-top:10px;}
    .btn{
      width:100%;color:#fff;border-radius:9px;font-weight:bold;
      .btn-inner{
        width:100%;padding-bottom:13.33%;position:relative;
        .btn-txt{
          position:absolute;left:2px;top:2px;right:2px;bottom:2px;
          border:#fff 1px solid;box-sizing: border-box;border-radius:8px;
          display:flex;justify-content: center;align-items: center;
        }
      }
    }
  }
}
</style>
