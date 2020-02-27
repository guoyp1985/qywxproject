<template>
  <div class="containerarea exam-test-page">
    <div class="page-bg">
      <div class="page-inner">
        <div class="page-box">
          <template v-if="isIng && examData.length">
            <div class="top-radius">
              <div class="radius-bg">
                <div class="bg2">
                  <span><span class="big-txt">{{ingIndex}}</span>/{{examData.length}}</span>
                </div>
              </div>
            </div>
            <div class="con-area">
              <div><span>{{ingIndex}}：</span><span v-if="examData[ingIndex-1].maxselect">【多选题】</span><span>{{examData[ingIndex-1].title}}</span></div>
              <div class="btn-list">
                <template v-for="(item,index) in examData[ingIndex-1].optionsArr">
                  <template v-if="examData[ingIndex-1].maxselect">
                    <template v-if="item.clicked">
                      <div v-if="isDone" :class="`btn-item ${examData[ingIndex-1].answerObject[index+1] ? 'right' : 'wrong'}`" @click="toChoose(index)">
                        <span class="flex_cell">{{item.title}}</span>
                        <span class="al al-gou font14"></span>
                      </div>
                      <div v-else class="btn-item clicked" @click="toChoose(index)">
                        <span class="flex_cell">{{item.title}}</span>
                        <span class="al al-gou font14"></span>
                      </div>
                    </template>
                    <div v-else class="btn-item" @click="toChoose(index)">
                      <span class="flex_cell">{{item.title}}</span>
                    </div>
                  </template>
                  <template v-else>
                    <div v-if="item.clicked" :class="`btn-item ${(index+1) == examData[ingIndex-1].answer ? 'right' : 'wrong'}`" @click="toChoose(index)">
                      <span class="flex_cell">{{item.title}}</span>
                      <span v-if="examData[ingIndex-1].maxselect" class="al al-gou font14"></span>
                    </div>
                    <div v-else class="btn-item" @click="toChoose(index)">
                      <span class="flex_cell">{{item.title}}</span>
                    </div>
                  </template>
                </template>
              </div>
              <div class="mt20 flex_center" v-if="examData[ingIndex-1].maxselect">
                <div class="btn-submit" @click="subEvent">确定</div>
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
                <div class="bg-txt">考核成功</div>
              </div>
              <div class="radius-bg red" v-else>
                <div class="bg-txt">考核失败</div>
              </div>
            </div>
            <div class="con-area">
              <div class="flex_center">最后得分: {{score}}分</div>
            </div>
            <div class="bottom-btn">
              <template v-if="isSuccess">
                <div class="btn btn-blue">
                  <div class="btn-inner">
                    <div class="btn-txt">开启推广之路</div>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="btn btn-blue" @click="toStudy">
                  <div class="btn-inner">
                    <div class="btn-txt">我要学习</div>
                  </div>
                </div>
                <div class="btn btn-green" @click="toTest">
                  <div class="btn-inner">
                    <div class="btn-txt">重新考试</div>
                  </div>
                </div>
              </template>
            </div>
          </template>
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
      query: {},
      isIng: true,
      isEnd: false,
      ingIndex: 1,
      total: 0,
      afterClick: false,
      examData: [],
      clickIndex: -1,
      clickData: [],
      showNext: false,
      rightData: [],
      wrongData: [],
      score: 0,
      perscore: 10,
      maxscore: 100,
      isSuccess: false,
      isDone: false
    }
  },
  computed: {
  },
  methods: {
    clearStatus (index) {
      let curExamData = this.examData[index]
      delete curExamData.clicked
      this.examData.splice(index, 1, curExamData)
      let curOptionsArr = this.examData[index].optionsArr
      for (let i = 0; i < curOptionsArr.length; i++) {
        let curOption = curOptionsArr[i]
        delete curOption.clicked
        this.examData[index].optionsArr.splice(i, 1, curOption)
      }
    },
    handleAnswer (isRight) {
      let valObject = {}
      valObject[this.ingIndex] = this.ingIndex
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
            this.clearStatus(this.ingIndex - 2)
          }, 500)
        } else {
          this.showNext = true
        }
      } else {
        setTimeout(() => {
          this.score = Math.floor(this.rightData.length * this.perscore)
          this.isIng = false
          this.isEnd = true
          this.clearStatus(this.ingIndex - 1)
          if (this.rightData.length / this.examData.length >= 0.9) {
            this.isSuccess = true
          } else {
            this.isSuccess = false
          }
        }, 500)
      }
    },
    subEvent () {
      let curExamData = this.examData[this.ingIndex - 1]
      let curOptionsArr = curExamData.optionsArr
      this.isDone = true
      this.examData[this.ingIndex - 1].clicked = true
      let clickAnswers = []
      for (let i = 0; i < curOptionsArr.length; i++) {
        if (curOptionsArr[i].clicked) {
          clickAnswers.push(i + 1)
        }
      }
      let isRight = false
      if (clickAnswers.join(',') === curExamData.answer) {
        isRight = true
      }
      this.handleAnswer(isRight)
    },
    toChoose (index) {
      let val = parseInt(index) + 1
      let curExamData = this.examData[this.ingIndex - 1]
      let isClicked = curExamData.optionsArr[index].clicked
      let curoption = curExamData.optionsArr[index]
      if (curExamData.maxselect) {
        if (isClicked) {
          delete curoption.clicked
        } else {
          curoption.clicked = true
        }
        this.examData[this.ingIndex - 1].optionsArr.splice(index, 1, curoption)
      } else if (!isClicked && !this.examData[this.ingIndex - 1].clicked) {
        this.examData[this.ingIndex - 1].clicked = true
        curoption.clicked = true
        this.examData[this.ingIndex - 1].optionsArr.splice(index, 1, curoption)
        let rightAnswer = parseInt(this.examData[this.ingIndex - 1].answer)
        let isRight = false
        if (val === rightAnswer) {
          isRight = true
        }
        this.handleAnswer(isRight)
      }
    },
    toNext () {
      if (this.ingIndex < this.examData.length) {
        this.ingIndex++
        this.clickIndex = -1
        this.showNext = false
        this.clearStatus(this.ingIndex - 2)
      }
    },
    toStudy () {
      let params = this.$util.handleAppParams(this.query)
      this.$router.push({path: '/examStudy', query: params})
    },
    toTest () {
      this.isEnd = false
      this.isSuccess = false
      this.isDone = false
      this.clickIndex = -1
      this.clickData = []
      this.ingIndex = 1
      this.rightData = []
      this.wrongData = []
      this.score = 0
      this.isIng = true
    },
    getData () {
      this.$http.get(`${ENV.BokaApi}/api/examination/getlist`, {
        params: {type: 'rand'}
      }).then((res) => {
        this.$vux.loading.hide()
        let data = res.data
        let retdata = data.data ? data.data : data
        for (let i = 0; i < retdata.length; i++) {
          let curd = retdata[i]
          retdata[i].content = JSON.parse(curd.content)
          retdata[i].selectoptions = JSON.parse(curd.selectoptions)
          let selectoptions = retdata[i].selectoptions
          let oarr = []
          for (let j = 0; j < selectoptions.length; j++) {
            oarr.push({title: selectoptions[j]})
          }
          retdata[i].optionsArr = oarr
          if (curd.maxselect) {
            retdata[i].answerObject = {}
            let arr = curd.answer.split(',')
            for (let j = 0; j < arr.length; j++) {
              retdata[i].answerObject[arr[j]] = 1
            }
          }
        }
        this.examData = retdata
        this.perscore = this.maxscore / this.examData.length
      })
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.loginUser = User.get()
      this.query = this.$route.query
      this.isIng = true
      this.ingIndex = 1
      this.isEnd = false
      this.isSuccess = false
      this.isDone = false
      this.$vux.loading.show()
      this.getData()
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
.exam-test-page{
  width:100%;position:relative;
  .page-bg{width:100%;padding-bottom:216.5%;position:relative;}
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
    .btn-item.right{border-color:#27db40;background-color:#27db40;}
    .btn-item.wrong{border-color:#ff0000;background-color:#ff0000;}
    .btn-item.clicked{background-color:#27db40;}
    .btn-item{
      width:100%;min-height:40px;border-radius:9px;border:#86aeff 2px solid;
      display:flex;justify-content: flex-start;align-items: center;
      padding:5px 10px;background-color:#ffb527;color:#fff;box-sizing: border-box;
    }
  }

  .btn-submit{
    width:50%;height:40px;border-radius:9px;
    background-color:#417bf2;color:#fff;
    display:flex;justify-content: center;align-items: center;
  }
}
</style>
