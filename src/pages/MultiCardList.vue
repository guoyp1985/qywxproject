<style lang="less">
.multicard-list-page.havebottom{
  overflow-y:hidden;
  .page-inner{position:absolute;left:0;top:0;right:0;bottom:50px;overflow-y:auto;background-color:#f94929;overflow-y:auto;}
}
.multicard-list-page{
  width:100%;height:100%;background-color:#f94929;box-sizing: border-box;overflow-y:auto;
  position:relative;
  .page-inner{
    /*display:flex;justify-content: flex-start;flex-wrap: wrap;*/
  }
  .top-pic{
    img{width:100%;}
  }
  .box-area{
    width:90%;margin:0 auto 20px;box-sizing: border-box;border:3px solid #FDDD91;
    background-color:#fff;border-radius:3px;padding:4%;
  }
  .image-outer{
    width:100%;margin:0 auto;
    .imgarea:after{content:"";display:block;padding-top:26%;}
    .imgarea:not(:first-child){margin-top:20px;}
    .imgarea{
      width:100%;max-height:100%;position:relative;
      .inner{position:absolute;left:0;top:0;right:0;bottom:0;display:flex !important;justify-content: center; align-items: center;}
      .avatar{width:30px;height:30px;border-radius:50%;}
      .bg-pic{width:100%;height:100%;max-width:100%;max-height:100%;}
      .money-txt{
        position:absolute;left:0;top:0;right:0;bottom:0;z-index:1;display:flex;width:100%;
        .ico{
          position:absolute;left:5px;top:2px;color:#FBF1B8;
          .al{font-size:14px;}
        }
      }
      .money-txt .left_cell{width:35%;color:#FBF1B8;}
      .money-txt .big-txt{font-size:14px;color:#f94929;}
      .money-txt .big-txt.long{font-size:22px;}
      .money-txt .big-txt.big1{font-size:30px;}
      .money-txt .big-txt.big2{font-size:30px;}
      .money-txt .big-txt.big3{font-size:30px;}
      .money-txt .big-txt.big4{font-size:30px;}
      .money-txt .big-txt.big5{font-size:25px;}
      .money-txt .big-txt.big6{font-size:22px;}
    }
  }
  .btn-area{
    width:100%;padding-top:15px;border-top:#dba472 2px dashed;margin-top:20px;
    .btn{
      width:100%;height:80px;box-sizing: border-box;
      display:flex;justify-content: center;align-items: center;
      border-radius:20px;text-align:center;background-color:#FE6C5B;color:#fff;font-size:30px;
    }
  }

  .item{
    position:relative;
    .pic{
      width:150px;position:relative;
      img{width:100%;}
      .txt-area{
        position:absolute;left:0;top:0;right:0;bottom:0;
        .radius{
          position:absolute;left:50px;top:62px;
          width:50px;height:50px;
          display: flex;;justify-content: center;align-items: center;color:#fff;
        }
      }
    }
  }
  .bottom-area{
    position:absolute;left:0;bottom:0;right:0;height:50px;z-index:10;
    background-color:#fff;
    display:flex;justify-content: center;align-items: center;
    .btn{
      width:80%;height:40px;border-radius:60px;
      background-color:#eb6b5e;color:#fff;font-size:18px;
      display:flex;justify-content: center;align-items: center;
    }
  }
  .scroll_list{
    padding:10px;box-sizing: border-box;
    .scroll_item:after{display:none;}
    .scroll_item:not(:first-child){margin-top:20px;}
    .scroll_item{
      width: 100%;height:90px;position:relative;background-color: #eb6b5e;color:#fff;
      display: flex;justify-content: center;align-items: center;
      .txt{color:#fff;}
    }
    .scroll_item.grayitem{
      background-color: #999;
      .txt{color:orange;}
    }
    .avatar{
      padding-left:10px;padding-right:10px;box-sizing: border-box;
      img{width:40px;height:40px;border-radius:50%;}
    }
    .txt-cell{position:relative;padding-top:15px;padding-bottom:15px;padding-left:10px;box-sizing: border-box;}
    .txt-cell:after{
      content:"";display:block;
      border-right:#f5f9fa 1px dashed;
    	position: absolute;right: 0;top: 0;bottom:0px;
    	-webkit-transform: scaleX(0.5) translateX(0.5px);
    	transform: scaleX(0.5) translateX(0.5px);
    	-webkit-transform-origin: 0% 0%;
    	transform-origin: 0% 0%;
    }
    .forbid{position:relative;padding-top:30rpx;padding-bottom:15px;padding-left:10px;box-sizing: border-box;}
    .forbid:after{
      content:"";display:block;
      border-right:#f5f9fa 1px dashed;
    	position: absolute;right: 0;top: -13px;bottom:0px;
    	-webkit-transform: scaleX(0.5) translateX(0.5px);
    	transform: scaleX(0.5) translateX(0.5px);
    	-webkit-transform-origin: 0% 0%;
    	transform-origin: 0% 0%;
      height: 118px;
    }
    .scroll_item .ball{
      position: absolute;
      right: -14px;
      width: 30px;
      height: 30px;
      background-color: #f5f9fa;
      border-radius: 50%;
    }
    .scroll_item .ball-up{top: -15px;}
    .scroll_item .ball-down{bottom: -15px;}
    .scroll_item .pic{width:50px;}
    .scroll_item .pic image{width:40px;height:40px;border-radius:50%;}
    .btn-cell{width:90px;height:100%;box-sizing: border-box;}
    .btn-cell .al{font-size:65px;}
    .btn-cell .icon-chat{margin-top:4px;}
    .rbtn{display:inline-block;padding:5px;border-radius:5px;background-color: #fff;}
  }
}
</style>
<template>
  <div :class="`multicard-list-page ${listData1.length ? 'havebottom' : ''}`">
    <div class="page-inner" v-if="disList1">
      <div class="top-pic">
        <img src="../assets/images/card_bg2.png" />
      </div>
      <div class="box-area">
        <div v-if="!listData1.length" class="flex_empty">
          <span v-if="afterUse">优惠券核销成功</span>
          <span v-else>没有优惠券哦</span>
        </div>
        <template v-else>
          <div class="image-outer">
            <div class="imgarea" v-for="(item,index) in listData1" :key="index">
              <div class="inner">
                <img class="bg-pic" src="https://tossharingsales.boka.cn/minigxk/voucher/voucher1.png" />
                <div class="money-txt">
                  <div v-if="item.zuijia" class="ico">
                    <span class="al al-zan7"></span>
                  </div>
                  <div class="left_cell flex_center">
                    <div>
                      <div class="flex_center">
                        <img class="avatar" :src="item.avatar" />
                      </div>
                      <div class="flex_center font12" style="margin-top:3px;">
                        <div class="clamp1">{{item.linkman}}</div>
                      </div>
                    </div>
                  </div>
                  <div class="right_cell flex_cell flex_center">
                    <div>
                      <div class="align_center"><span class="big-txt big1">{{item.money}}</span>元</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="imgarea" v-for="(item,index) in listData1" :key="index">
              <div class="inner">
                <img class="bg-pic" src="https://tossharingsales.boka.cn/minigxk/voucher/voucher1.png" />
                <div class="money-txt">
                  <div class="left_cell flex_center">
                    <div class="align_center"><span :class="`big-txt big${item.money.length}`">{{item.money}}</span>元</div>
                  </div>
                  <div class="right_cell flex_cell flex_center">
                    <div class="w_100">
                      <div class="flex_center">
                        <img class="avatar" :src="item.avatar" />
                        <span class="font12 ml5">{{item.linkman}}</span>
                      </div>
                      <div class="flex_center">订单满{{item.ordermoney}}元可用</div>
                    </div>
                  </div>
                </div>
              </div>
            </div> -->
          </div>
          <div v-if="listData1.length" class="flex_center btn-area" style="padding-bottom:20px;">
            <div class="btn" @click="toUsePage">核销<span class="ml5" v-if="totalPrice">{{totalPrice}}</span>元</div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import {} from 'vux'
import ENV from 'env'
import Time from '../../libs/time'
import { User } from '#/storage'

export default {
  components: {},
  data () {
    return {
      query: {},
      loginUser: {},
      disList1: false,
      listData1: [],
      afterUse: false,
      totalPrice: 0
    }
  },
  methods: {
    toUsePage () {
      this.$vux.confirm.show({
        content: '确定要使用优惠券吗？',
        onConfirm: () => {
          let ids = []
          for (let i = 0; i < this.listData1.length; i++) {
            ids.push(this.listData1[i].id)
          }
          this.$vux.loading.show()
          this.$http.post(`${ENV.BokaApi}/api/card/multiUseCard`, {
            ids: ids
          }).then(res => {
            let data = res.data
            this.$vux.loading.hide()
            this.$vux.toast.show({
              text: data.msg,
              type: 'text',
              time: this.$util.delay(data.msg)
            })
            if (data.code === 1) {
              this.listData1 = []
              this.afterUse = true
            }
          })
        }
      })
    },
    getList1 () {
      let params = {multi: 1, used: 0}
      this.$http.get(`${ENV.BokaApi}/api/card/cardList`, {
        params: params
      }).then(res => {
        let data = res.data
        this.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        let max = 0
        let maxIndex = 0
        let total = 0
        for (var i = 0; i < retdata.length; i++) {
          let curd = retdata[i]
          curd.usedateline_str = new Time(curd.usedateline * 1000).dateFormat('yyyy-MM-dd hh:mm')
          if (parseFloat(curd.money) > max) {
            max = curd.money
            maxIndex = i
          }
          total = total + parseFloat(curd.money)
        }
        this.totalPrice = total.toFixed(2)
        if (max > 0) {
          retdata[maxIndex].zuijia = true
        }
        this.listData1 = retdata
        this.disList1 = true
      })
    },
    initData () {
      this.afterUse = false
      this.listData1 = []
    },
    refresh () {
      this.loginUser = User.get()
      this.initData()
      this.getList1()
    }
  },
  created () {
    this.query = this.$route.query
    this.refresh()
  },
  activated () {
    this.query = this.$route.query
    this.refresh()
  }
}
</script>
