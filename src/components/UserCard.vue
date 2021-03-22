<style lang="less">
.user-card-inner {
  .bg-pic{width:100%;}

  .image-outer{width:100%;margin:0 auto;}
  .image-outer .imgarea{width:100%;max-height:100%;position:relative;}
  .image-outer .imgarea:after{content:"";display:block;padding-top:76%;}
  .image-outer .imgarea .inner{position:absolute;left:0;top:0;right:0;bottom:0;display:flex !important;justify-content: center; align-items: center;}
  .image-outer .imgarea img{width:100%;height:100%;max-width:100%;max-height:100%;}

  .box-area{
    width:90%;margin:0 auto 20px;box-sizing: border-box;border:3px solid #FDDD91;
    background-color:#fff;border-radius:3px;padding:4%;
  }
  .box-area .title{font-size:18px;color:#FE6C5B;text-align:center;padding-bottom:10px;}
  .image-outer.card-outer .imgarea:after{content:"";display:block;padding-top:26%;}
  .money-txt{position:absolute;left:0;top:0;right:0;bottom:0;z-index:1;display:flex;width:100%;}
  .money-txt .left_cell{width:35%;color:#FBF1B8;}
  .money-txt .big-txt{font-size:14px;}
  .money-txt .big-txt.long{font-size:22px;}
  .money-txt .big-txt.big1{font-size:30px;}
  .money-txt .big-txt.big2{font-size:30px;}
  .money-txt .big-txt.big3{font-size:30px;}
  .money-txt .big-txt.big4{font-size:30px;}
  .money-txt .big-txt.big5{font-size:25px;}
  .money-txt .big-txt.big6{font-size:22px;}
  .btn-area{
    width:100%;padding-top:15px;border-top:#dba472 2px dashed;margin-top:20px;
    .btn{
      width:80%;height:40px;box-sizing: border-box;
      display:flex;justify-content: center;align-items: center;
      border-radius:20px;text-align:center;background-color:#FE6C5B;color:#fff;font-size:18px;
    }
  }

  .btn-play{
    width:100px;margin:0 auto;color:#f8edad;text-decoration: underline;
  }

  .bg-img{
    .user-area{
      position:absolute;left:0;top:20px;right:0;
      .avatar{
        img{width:80px;height:80px;border-radius:50%;}
      }
    }
  }
  .con-area{color:#FE6C5B;width:100%;box-sizing: border-box;font-size:14px;}
  .txt-cell{width:65px;}
}
</style>

<template>
  <div class="card-inner user-card-inner">
    <div class="image-outer bg-img">
      <div class="imgarea">
        <div class="inner">
          <img class="bg-pic" src="https://tossharingsales.boka.cn/minigxk/giftcard2.png" />
          <div class="user-area">
            <div class="avatar flex_center">
              <img :src="user.avatar" />
            </div>
            <div class="flex_center font20 mt10 color-white bold">{{user.linkman}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="box-area" v-if="afterLoad">
      <div v-if="!viewData.id" class="flex_center">优惠券不存在</div>
      <template v-else>
        <div class="db image-outer card-outer mt15">
          <div class="imgarea">
            <div class="inner">
              <img class="bg-pic" src="https://tossharingsales.boka.cn/minigxk/voucher/voucher1.png" />
              <div class="money-txt">
                <div class="left_cell flex_center">
                  <div class="align_center"><span :class="`big-txt big${facemoney.length}`">{{viewData.money}}</span>元</div>
                </div>
                <div class="right_cell flex_cell flex_center">
                  <div class="w_100">
                    <div class="flex_center">订单满{{viewData.ordermoney}}元可用</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex_center btn-area" style="margin-bottom:20px;">
          <div class="btn bg-gray" v-if="viewData.used">已核销</div>
          <div class="btn" @click="toUse" v-else>核销</div>
        </div>
        <div class="con-area">
          <div class="flex_left" v-if="!viewData.starttime || !viewData.endtime">
            <div class="txt-cell">有效期至</div>
            <div class="flex_cell">{{viewData.deadline_str}}</div>
          </div>
          <div class="flex_left" v-else>
            <div class="txt-cell">有效期</div>
            <div class="flex_cell">{{viewData.starttime_str}} 至 {{viewData.endtime_str}}</div>
          </div>
          <div class="db-flex" v-if="viewData.content && viewData.content != ''">
            <div class="txt-cell">使用说明</div>
            <div class="flex_cell" v-html="viewData.content"></div>
          </div>
        </div>
      </template>
    </div>
    <div class="pb20">
      <div class="flex_center btn-play" @click="toList">我的优惠券</div>
    </div>
  </div>
</template>

<script>
import ENV from 'env'
export default {
  name: 'UserCard',
  props: {
    user: {
      type: Object,
      default: {}
    },
    viewData: {
      type: Object,
      default: {}
    },
    facemoney: {
      type: String,
      default: '0.00'
    },
    ordermoney: {
      type: String,
      default: '0.00'
    },
    afterLoad: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      query: {}
    }
  },
  methods: {
    toList () {
      this.$router.push({path: '/userCard'})
    },
    toUse (item) {
      this.$vux.loading.show()
      this.$http.get(`${ENV.BokaApi}/api/card/useCard`, {
        params: {id: this.query.id}
      }).then(res => {
        let data = res.data
        this.$vux.loading.hide()
        this.$vux.toast.show({
          text: data.msg,
          type: 'text',
          time: this.$util.delay(data.msg)
        })
        this.$emit('after-use', data)
      })
    }
  },
  created () {
    this.query = this.$route.query
  }
}
</script>
