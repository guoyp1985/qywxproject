<template>
  <div class="containerarea exam-study-page">
    <div class="page-bg">
      <div class="page-inner">
        <div class="page-box">
          <template v-if="isIng">
            <div class="top-radius">
              <div class="radius-bg">
                <div class="bg2">
                  <span><span class="big-txt">{{ingIndex}}</span>/{{examData.length}}</span>
                </div>
              </div>
            </div>
            <div class="con-area">
              <div>{{ingIndex}}：{{examData[ingIndex-1].title}}</div>
              <div class="btn-list">
                <template v-for="(item,index) in examData[ingIndex-1].questions">
                  <template v-if="clickIndex >= 0 && (clickIndex == index ||  examData[ingIndex-1].answer == index + 1)">
                    <div v-if="clickIndex == index" :class="`btn-item ${clickData[ingIndex-1] == examData[ingIndex-1].answer ? 'right' : 'wrong'}`" @click="toChoose(index, item)">
                      <span>{{item}}</span>
                    </div>
                    <div v-else :class="`btn-item ${index + 1 == examData[ingIndex-1].answer ? 'right' : ''}`" @click="toChoose(index, item)">
                      <span>{{item}}</span>
                    </div>
                  </template>
                  <div v-else class="btn-item" @click="toChoose(index)">
                    <span>{{item}}</span>
                  </div>
                </template>
              </div>
            </div>
            <div v-if="showNext" class="bottom-btn">
              <div class="btn btn-blue" @click="toNext">
                <div class="btn-inner">
                  <div class="btn-txt">下一题</div>
                </div>
              </div>
            </div>
          </template>
          <template v-if="isEnd">
            <div class="top-radius2">
              <div class="radius-bg green" v-if="isSuccess">
                <div class="bg-txt">答题成功</div>
              </div>
              <div class="radius-bg red" v-else>
                <div class="bg-txt">答题失败</div>
              </div>
            </div>
            <div class="con-area">
              <div class="flex_center">最后得分: {{score}}分</div>
            </div>
            <div class="bottom-btn">
              <div class="btn btn-blue" @click="toStudy">
                <div class="btn-inner">
                  <div class="btn-txt">继续学习</div>
                </div>
              </div>
              <div class="btn btn-green" @click="toTest">
                <div class="btn-inner">
                  <div class="btn-txt">立即考试</div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {} from 'vux'
// import ENV from 'env'
import { User } from '#/storage'
export default {
  components: {
  },
  data () {
    return {
      loginUser: {},
      query: {},
      isIng: true,
      isEnd: false,
      ingIndex: 1,
      total: 0,
      afterClick: false,
      examData: [
        {
          id: 1,
          title: '贝叶斯网络是一种模拟人类推理过程中（）关系的不确定性处理模型。',
          questions: ['主次', '总分', '因果'],
          answer: 2
        },
        {
          id: 2,
          title: '世界四大洋中面积最小的是',
          questions: ['太平洋', '大西洋', '印度洋', '北冰洋'],
          answer: 4
        }
      ],
      clickIndex: -1,
      clickData: [],
      showNext: false,
      rightData: [],
      wrongData: [],
      score: 0,
      perscore: 10,
      maxscore: 100,
      isSuccess: false
    }
  },
  computed: {
  },
  methods: {
    toChoose (index) {
      if (!this.clickData[this.ingIndex - 1]) {
        let val = parseInt(index) + 1
        this.clickIndex = parseInt(index)
        this.clickData.push(val)
        let isRight = false
        if (val === this.examData[this.ingIndex - 1].answer) {
          isRight = true
        }
        let valObject = {}
        valObject[this.ingIndex] = val
        if (isRight) {
          this.rightData.push(valObject)
        } else {
          this.wrongData.push(valObject)
        }
        if (this.ingIndex < this.examData.length) {
          if (isRight) {
            setTimeout(() => {
              this.ingIndex++
              this.clickIndex = -1
            }, 500)
          } else {
            this.showNext = true
          }
        } else {
          setTimeout(() => {
            this.score = Math.floor(this.rightData.length * this.perscore)
            this.isIng = false
            this.isEnd = true
            if (this.rightData.length / this.examData.length >= 0.9) {
              this.isSuccess = true
            } else {
              this.isSuccess = false
            }
          }, 500)
        }
      }
    },
    toNext () {
      if (this.ingIndex < this.examData.length) {
        this.ingIndex++
        this.clickIndex = -1
        this.showNext = false
      }
    },
    toStudy () {
      this.isEnd = false
      this.isSuccess = false
      this.clickIndex = -1
      this.clickData = []
      this.ingIndex = 1
      this.rightData = []
      this.wrongData = []
      this.score = 0
      this.isIng = true
    },
    toTest () {
      let params = this.$util.handleAppParams(this.query)
      this.$router.push({path: '/examTest', query: params})
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.loginUser = User.get()
      this.query = this.$route.query
      this.isIng = true
      this.ingIndex = 1
      this.isEnd = false
      this.isSuccess = false
      this.perscore = this.maxscore / this.examData.length
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
    .big-txt{font-size:30px;}
  }

  .top-radius2{
    width:42%;position:relative;margin:3% auto 0;
    .radius-bg{
      width:100%;padding-bottom:100%;border-radius:50%;
      background-color:#417bf2;position:relative;
    }
    .radius-bg.red{background-color:#ff0000;}
    .radius-bg.green{background-color:#27db40;}
    .bg-txt{
      position:absolute;left:0;right:0;top:0;bottom:0;border-radius:50%;
      color:#fff;font-size:24px;
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

  .btn-list{
    margin-top:20px;
    .btn-item:not(:first-child){margin-top:10px;}
    .btn-item.right{border-color:#27db40;}
    .btn-item.wrong{border-color:#ff0000;}
    .btn-item{
      width:100%;min-height:30px;border-radius:9px;border:#86aeff 2px solid;
      padding:0 10px;background-color:#ffb527;color:#fff;box-sizing: border-box;
    }
  }
}
</style>
