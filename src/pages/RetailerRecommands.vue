<template>
  <div class="recommands-wraper" ref="recommandsWraper">
    <div class="title">
      <span>我的推荐</span>
    </div>
    <div class="message" v-if="recommands.length === 0"><span>你还没有推荐的卖家</span></div>
    <div  class="recommands" ref="recommands" v-else>
      <div ref="recommandsInner">
        <div class="recommand" v-for="item in recommands" :key="item.id">
          <img :src="item.avatar">
          <div class="name-time">
            <span class="name">卖家：{{item.linkman}}</span>
            <span class="time">推荐时间：{{format(item.dateline)}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import getRecommands from '../api/getRecommands'
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      recommands: [],
      pagestart: 0,
      limit: 10,
      bscroll: null,
      format (time) {
        let result = ''
        const date = new Date(time * 1000)
        result = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()} : ${date.getMinutes()}`
        return result
      }
    }
  },
  mounted () {
    this._getRecommands()
  },
  methods: {
    _getRecommands () {
      if (this.recommands.length === this.pagestart * this.limit) {
        getRecommands().then(res => {
          console.log(res)
          const data = res.data
          if (data.flag === 1) {
            if (this.pagestart === 0) {
              this.recommands = data.data
              if (this.recommands.length > 0) {
                this.$nextTick(() => {
                  this.initRecommands()
                })
              }
            } else {
              this.recommands.push(...data.data)
              this.$nextTick(() => {
                this.bscroll.refresh()
              })
            }
            this.pagestart++
          }
        })
      }
    },
    initRecommands () {
      this.bscroll = new BScroll(this.$refs.recommands)
      this.bscroll.on('scrollEnd', res => {
        const recommandsHeight = this.$refs.recommands.offsetHeight
        const recommandsInnerHeight = this.$refs.recommandsInner.offsetHeight
        const disHeight = recommandsInnerHeight - recommandsHeight
        console.log(res)
        console.log(disHeight)
        if (Math.abs(res.y) === disHeight) {
          console.log('滑动到底了')
          this._getRecommands()
        }
      })
    }
  }
};
</script>

<style lang="less">
  .recommands-wraper{
    font-size: 14px;
    .title{
      width: 100vw;
      height: 7vh;
      line-height: 7vh;
      text-align: left;
      padding-left: 20px;
      box-sizing: border-box;
      font-size: 16px;
      font-weight: 700;
      background-color: #f75553;
      color: #fff;
    }
    .recommands{
      width: 100vw;
      height: 93vh;
      overflow: hidden;
      .recommand {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 10px;
        background-color: #fff;
        img{
          flex: 0 0 50px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-right: 10px;
        }
        .name-time{
          flex: 1;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .time{
            font-size: 12px;
          }
        }
      }
    }
    .message{
      height: 93vh;
      line-height: 93vh;
      text-align: center;
      color: #999;
    }
  }
</style>