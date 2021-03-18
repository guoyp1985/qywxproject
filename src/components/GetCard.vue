<style lang="less">
.get-card-inner{
  background-color:#f94929;width:100%;height:100%;
  .bg-image1{width:100%;}
  .row1{
    width:100%;
    img{width:100%;display:block;}
  }
  .row2{
    width:100%;position:relative;
    img{width:100%;display:block;}
    .row2-inner{position:absolute;left:0;top:0;right:0;bottom:0;}
  }
  .pic-area{
    width:53%;
    .pic{
      width:100%;position:relative;
      img{width:100%;}
      .txt1{
        width:34%;max-height:100%;position:absolute;left:33%;top:34%;
        .inner{width:100%;max-height:100%;position:relative;}
        .inner:after{padding-top:100%;content:"";display:block;}
        .btn{position:absolute;left:0;top:0;right:0;bottom:0;font-size:25px;color:#f95a51;}
        .btn.disable{color:#999;}
      }
      .txt2{position:absolute;left:0;bottom:15%;right:0;text-align:center;color:#F9EA72;font-size:15px;letter-spacing:1px;}
    }
  }
  .txt-area{
    padding:20px;box-sizing: border-box;color:#fff;
    .txt{width:75px;text-align:right;padding-right:5px;box-sizing: border-box;}
  }
  .btn-play{
    width:100px;margin:0 auto;color:#f8edad;text-decoration: underline;
  }
}
</style>

<template>
  <div class="card-inner get-card-inner">
    <div class="row1">
      <img src="https://tossharingsales.boka.cn/minigxk/luck/bg3.png" />
    </div>
    <div class="row2">
      <img src="https://tossharingsales.boka.cn/minigxk/luck/bg2.png" />
      <template v-if="showOpen">
        <div class="row2-inner">
          <div class="w_100 flex_center">
            <div class="pic-area">
              <div class="pic">
                <img src="https://tossharingsales.boka.cn/minigxk/luck/hb1.png" />
                <div class="txt1">
                  <div class="inner">
                    <div class="btn flex_center" @click="openEvent">開</div>
                  </div>
                </div>
                <div class="txt2" @click="clickShare">立即分享</div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="viewData && viewData.id" class="txt-area">
          <div class="db-flex" v-if="viewData.content && viewData.content != ''">
            <div class="txt">使用说明: </div>
            <div class="flex_cell" v-html="viewData.content"></div>
          </div>
          <div class="flex_left" v-if="viewData.starttime">
            <div class="txt">有效期: </div>
            <div class="flex_cell">{{viewData.starttime_str}} 至 {{viewData.endtime_str}}</div>
          </div>
          <div class="flex_left" v-else="viewData.deadline">
            <div class="txt">有效期至: </div>
            <div class="flex_cell">{{viewData.deadline_str}}</div>
          </div>
        </div>
      </template>
      <div v-if="showResult" class="row2-inner">
        <div class="w_100 flex_center card-result-modal pb20">
          <div class="inner">
            <div class="pic-outer">
              <div class="pic">
                <img src="https://tossharingsales.boka.cn/minigxk/luck/hb2.png" />
              </div>
              <div class="top-txt flex_center">恭喜你获得<span class="big">{{(cardType && cardObject[cardType]) ? cardObject[cardType] : '优惠券'}}</span></div>
              <div class="con-txt flex_center">
                <div class="w_100 align_center">
                  <div class="big">￥{{facemoney}}</div>
                  <div>满{{ordermoney}}可用</div>
                </div>
              </div>
              <div class="desc-txt">
                <div class="db-flex" v-if="viewData.content && viewData.content != ''">
                  <div class="txt">使用说明: </div>
                  <div class="flex_cell" v-html="viewData.content"></div>
                </div>
                <div class="flex_left">
                  <div class="txt">有效期至: </div>
                  <div class="flex_cell">{{viewData.deadline_str}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="pb20">
          <div class="flex_center btn-play" @click="toList">我的优惠券</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ENV from 'env'
import Time from '../../libs/time'
export default {
  name: 'GetCard',
  props: {
    user: {
      type: Object,
      default: {}
    },
    viewData: {
      type: Object,
      default: {}
    },
    shareWid: {
      type: Number,
      default: 0
    },
    afterLoad: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      query: {},
      showOpen: true,
      showResult: false,
      cardObject: {
        newcustomer: '新人优惠券',
        singlecard: '专属优惠券'
      },
      cardType: null,
      ordermoney: '0.00',
      facemoney: '0.00'
    }
  },
  methods: {
    toList () {
      this.$router.push({path: '/userCard'})
    },
    clickShare () {
      this.$emit('click-share')
    },
    openEvent () {
      this.$vux.loading.show()
      let params = {type: this.query.type, wid: this.shareWid}
      if (this.query.id) params.id = this.query.id
      if (this.query.customeruid) params.customeruid = this.query.customeruid
      this.$http.post(`${ENV.BokaApi}/api/card/getCard`, params).then(res => {
        const data = res.data
        this.$vux.loading.hide()
        if (data.code !== 0) {
          this.$vux.toast.show({
            text: data.msg,
            type: 'text',
            time: this.$util.delay(data.msg)
          })
        }
        let retdata = data.data
        console.log(data.data)
        if (retdata) {
          retdata.deadline_str = new Time(retdata.deadline * 1000).dateFormat('yyyy-MM-dd')
          retdata.content = retdata.content.replace(/\n/g, '<br />')
          this.ordermoney = retdata.ordermoney
          this.facemoney = retdata.money
          this.showOpen = false
          this.showResult = true
        }
        this.$emit('after-open', data)
      }, res => {
        this.$vux.loading.hide()
      })
    }
  },
  created () {
    this.query = this.$route.query
    this.cardType = this.query.type
  }
}
</script>
