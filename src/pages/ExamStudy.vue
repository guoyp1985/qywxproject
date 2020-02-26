<template>
  <div class="containerarea exam-study-page">
    <div class="page-bg">
      <div class="page-inner">
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
            <div class="btn btn-blue">
              <div class="btn-inner">
                <div class="btn-txt">我要学习</div>
              </div>
            </div>
            <div class="btn btn-green">
              <div class="btn-inner">
                <div class="btn-txt">我要考试</div>
              </div>
            </div>
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
/*
红色ff0000
蓝色417bf2
浅蓝色86aeff
黄色ffb527
绿色27db40
黑色字颜色333333
*/
.exam-study-page{
  width:100%;position:relative;
  .page-bg{width:100%;padding-bottom:212.2%;position:relative;}
  .page-inner{
    position:absolute;left:0;top:0;bottom:0;right:0;overflow-y:auto;
    background-image:url('../assets/images/exam_bg.png');
    background-size:cover;
    background-repeat:no-repeat;
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
