<template>
  <div class="recommands-wraper">
    <div class="title">
      <span>我的推荐</span>
    </div>
    <div class="recommands" ref="recommands">
      <div ref="recommandsInner">
        <div class="recommand" v-for="item in recommands" :key="item.id">
          <img :src="item.avatar">
          <div class="name-time">
            <span class="name">卖家：{{item.linkman}}</span>
            <span class="time">推荐时间：{{time.format(item.dateline)}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import Time from '../../libs/time'
import getRecommands from '../api/getRecommands'
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      recommands: [],
      pagestart: 0,
      limit: 10,
      bscroll: null,
      time: new Time()
    }
  },
  created () {
    this._getRecommands()
  },
  mounted () {
    this.initRecommands()
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
            } else {
              this.recommands.push(...data.data)
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
  },
  watch: {
    recommands () {
      this.bscroll.refresh()
    }
  }
};
</script>

<style lang="less">
  .recommands-wraper{
    font-size: 14px;
    .title{
      width: 100vw;
      height: 10vh;
      line-height: 10vh;
      text-align: center;
      font-weight: 700;
      background-color: #f75553;
      color: #fff;
    }
    .recommands{
      width: 100vw;
      height: 90vh;
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
  }
</style>