<template>
  <div class="containerarea font14 bargainbuydetail scroll-container" style="overflow-y:auto;">
    <div class="topimg">
      <img src="https://tossharingsales.boka.cn/images/bargainbuy_2.png">
    </div>
    <div class="b_header">
      <div class="inner">
        <div class="pic">
          <img class="imgcover" :src="crowduser.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
        </div>
        <div class="clamp1 font13 color-gray7 pt5 align_center mauto" style="width:168px;">{{ crowduser.linkman }}</div>
      </div>
    </div>
    <div class="boxarea">
      <div class="inner">
        <div class="innerbg">
          <router-link class="t-table" style="color:inherit;" :to="{path:'/product',query:{wid:product.wid,id:product.id}}">
            <div class="t-cell v_middle w80">
              <img class="imgcover" :src="product.photo" style="width:70px;height:70px;" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
            </div>
            <div class="t-cell">
              <div class="clamp2 font13 color-gray7">{{ product.title }}</div>
              <div class="clamp1 font13" style="color:#E02D24;">最低价：<span class="font16 bold">{{ data.minprice }}</span> 元<del class="ml10 color-gray7">原价：{{ product.price }} 元</del></div>
              <div class="clamp1 font13" style="color:#E02D24;">剩  余：<span class="font16 bold">{{ data.leftstorage }}</span> 件</div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="mauto align_center" style="width: 94%;height: 5px;">
      <div class="mauto h_100" style="border-left:3px solid #FDC45D;border-right:3px solid #FDC45D;width: 45%;"></div>
    </div>
    <div class="boxarea1">
      <div class="inner">
        <div class="pricearea">
          <div class="t-table">
            <div class="t-cell align_left">原价</div>
            <div class="t-cell align_center">已砍到</div>
            <div class="t-cell align_right">最低价</div>
          </div>
          <div class="priceline">
            <div class="line linepercent" :style="`width:${crowduser.cutpercent}%;`"></div>
          </div>
          <div class="t-table">
            <div class="t-cell align_left">￥{{ product.price }}</div>
            <div class="t-cell align_center">￥{{ crowduser.leftmoney }}</div>
            <div class="t-cell align_right">￥{{ data.minprice }}</div>
          </div>
        </div>
        <template v-if="data.leftstorage > 0 && crowduser.isfull == 0 && !crowduser.isovertime">
          <div v-if="crowduser && crowduser.timeleft" class="pt10 pb10 align_center timeleftarea font13" style="color:#A87F35; ">
            <span class="v_middle db-in">还剩</span>
            <span class="v_middle db-in">{{ lefthour }}</span>
            <span class="v_middle db-in">:</span>
            <span class="v_middle db-in">{{ leftminute }}</span>
            <span class="v_middle db-in">:</span>
            <span class="v_middle db-in">{{ leftsecond }}</span>
            <span class="v_middle db-in">结束，快让好友帮忙砍价吧~</span>
          </div>
        </template>
        <div v-if="data.leftstorage <= 0" class="align_center">
          <div class="btn db">商品已售罄，本次活动结束</div>
        </div>
        <div class="t-table">
          <template v-if="data.leftstorage > 0">
            <div v-if="crowduser.isovertime && !crowduser.isfull" class="t-cell">
              <div class="btn db">砍价失败</div>
            </div>
            <template v-else>
              <div v-if="crowduser.isfull" class="t-cell">
                <div class="btn db">已完成砍价</div>
              </div>
              <div v-else-if="!crowduser.isovertime" class="t-cell">
                <div v-if="!user || user.subscribe == 0" class="btn db" @click="access">帮TA砍价</div>
                <div v-else class="btn db" @click="cutevent">帮TA砍价</div>
              </div>
            </template>
            <div v-if="!data.isfinished && !data.havecreate" class="t-cell">
              <div class="btn db" @click="joinin">我要参与</div>
            </div>
          </template>
          <div v-if="data.havecreate" class="t-cell">
            <router-link :to="{path: '/activity', query: {id: data.id, crowduserid: data.havecreate}}" class="btn db">我的活动</router-link>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="boxtitle">砍价亲友团</div>
      <div class="titleline">
        <div class="inner" style="background: #C93A3A;border-radius: 100px;height: 8px;width: 100%;"></div>
      </div>
      <div class="listarea">
        <div class="scroll_list">
          <div v-if="cutData.length == 0" class="scroll_item emptyitem" style="padding:0;">
              <div class="t-table">
                <div class="t-cell middle-cell" style="color:inherit;">还没有好友砍价</div>
              </div>
          </div>
          <div v-else v-for="(item,index) in cutData" :key="item.id" class="scroll_item">
            <div class="t-table" style="height:60px;">
              <div class="t-cell v_middle" style="width:55px;">
                <img class="v_middle imgcover avatarimg1" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
              </div>
              <div class="t-cell v_middle" style="padding-right:25px;">
                <div class="clamp1 font13">{{ item.linkman }}</div>
              </div>
              <div class="t-cell align_right v_middle pr10" style="width:130px;">
                <div class="font13" style="color:#C93A3A">
                  <img class="v_middle" src="https://tossharingsales.boka.cn/images/bargainbuy_3.png" style="width: 21px;height:19px;">  砍掉 <span class="font16 bold">{{ item.cutmoney }}</span> 元
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<i18n>
</i18n>

<script>
import { XImg } from 'vux'
import Time from '#/time'
import ENV from 'env'

export default {
  name: 'BargainbuyDetail',
  props: {
    data: Object,
    crowduser: {
      type: Object,
      default: { 'avatar': 'https://tossharingsales.boka.cn/images/user.jpg' }
    },
    user: {
      type: Object,
      default: { 'avatar': 'https://tossharingsales.boka.cn/images/user.jpg' }
    },
    cutData: Array,
    onJoin: Function,
    onCut: Function
  },
  components: {
    XImg
  },
  data () {
    return {
      product: Object,
      nowdateline: new Date().getTime() / 1000,
      isfull: false,
      canbuy: true,
      lefthour: '',
      leftminute: '',
      leftsecond: '',
      cuting: false
    }
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd')
    }
  },
  watch: {
    data () {
      return this.data
    },
    crowduser () {
      return this.data.crowduser
    }
  },
  methods: {
    access () {
      this.$util.wxAccess()
    },
    cutevent () {
      const self = this
      if (!self.cuting) {
        self.$vux.loading.show()
        self.cuting = true
        self.$http.post(`${ENV.BokaApi}/api/activity/partInBargain`, { id: self.crowduser.id }).then(function (res) {
          let data = res.data
          self.$vux.loading.hide()
          self.$vux.toast.show({
            text: data.error,
            time: self.$util.delay(data.error),
            onHide: function () {
              if (data.flag === 1) {
                self.onCut && self.onCut()
              }
            }
          })
          self.cuting = false
        })
      }
    },
    joinin () {
      const self = this
      if (self.user.subscribe === 0) {
        this.$util.wxAccess()
      } else {
        self.$vux.loading.show()
        self.$http.post(`${ENV.BokaApi}/api/activity/createBargain`, { id: self.data.id }).then(function (res) {
          let data = res.data
          self.$vux.loading.hide()
          self.$vux.toast.show({
            text: data.error,
            time: self.$util.delay(data.error),
            onHide: function () {
              if (data.flag === 1) {
                self.onJoin && self.onJoin(data.data)
              }
            }
          })
        })
      }
    },
    toMyActivity () {
      const self = this
      self.$router.push({path: '/activity', query: {id: self.data.id, crowduserid: self.data.havecreate}})
    },
    cutdown () {
      const self = this
      let cutdownInterval = setInterval(function () {
        let h = parseInt(self.lefthour)
        let m = parseInt(self.leftminute)
        let s = parseInt(self.leftsecond)
        if (s > 0) {
          s--
          if (s < 10) {
            self.leftsecond = '0' + s
          } else {
            self.leftsecond = s
          }
        } else if (m > 0) {
          m--
          if (m < 10) {
            self.leftminute = '0' + m
          } else {
            self.leftminute = m
          }
          self.leftsecond = '59'
        } else if (h > 0) {
          h--
          if (h < 10) {
            self.lefthour = '0' + h
          } else {
            self.lefthour = h
          }
          self.leftminute = '59'
          self.leftsecond = '59'
        }
        if (h === 0 && m === 0 && s === 0) {
          clearInterval(cutdownInterval)
          self.isfinish = true
          self.cutdownEnd && self.cutdownEnd()
        }
      }, 1000)
    }
  },
  created () {
    const self = this
    if (self.data) {
      self.product = self.data.product
      if (self.crowduser && self.crowduser.timeleft) {
        self.lefthour = self.crowduser.timeleft.hour
        self.leftminute = self.crowduser.timeleft.minute
        self.leftsecond = self.crowduser.timeleft.second
        self.cutdown()
      }
    }
  }
}
</script>

<style lang="less">
.bargainbuydetail {
    background-image: linear-gradient(-180deg, #f32a3d 0%, #FF8048 100%);
}
.bargainbuydetail .topimg{position:absolute;left:0;top:0;width:100%;}
.bargainbuydetail .topimg img{width:100%;max-height:240px;vertical-align: middle;}
.bargainbuydetail .b_header{width:100%;height:90px;padding-top:30px;overflow:hidden;position: relative;}
.bargainbuydetail .b_header .inner {
    width: 168px;
    height: 168px;
    box-sizing:border-box;
    padding-top:8px;
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
    background: #FDC45D;
    margin:0 auto;
}
.bargainbuydetail .b_header .pic{width:60px;margin:0 auto;}
.bargainbuydetail .b_header .pic img{width:60px;height:60px;border-radius:50%;vertical-align:middle;}
.bargainbuydetail .boxarea {
  width: 94%;
  box-sizing:border-box;
  position:relative;
  margin:-1px auto 0;
  background: #FDC45D;
  border-radius: 13px;
  padding: 16px 12px 16px 12px;
}
.bargainbuydetail .boxarea .inner {
    border-radius: 8px;
    background: white;
    margin-top: 5px;
    padding: 7px 6px 7px 6px;
    position: relative;
    cursor: pointer;
}
.bargainbuydetail .boxarea .innerbg {
    border-radius: 7px;
    background: #F7F7F7;
    padding: 6px;
}
.bargainbuydetail .boxarea .pic{width:80px;}
.bargainbuydetail .boxarea .pic img{width:70px;height:70px;vertical-align:middle;}

.bargainbuydetail .boxarea1{width:94%;margin:0 auto;}
.bargainbuydetail .boxarea1 .inner{
  background-color: #FDC45D;border-radius: 13px;padding:11px 15px 8px 15px;
}
.bargainbuydetail .boxarea1 .pricearea{
  width: 90%;
  margin: 20px auto 0;
  color: #C93A3A;
}
.bargainbuydetail .priceline {
  margin: 12px auto;
  background-color: rgba(255, 255, 255, 0.75);
  width: 100%;
  height: 10px;
  border-radius: 5px;
}
.bargainbuydetail .line {
  width: 0%;
  height: 100%;
  background-image: linear-gradient(0deg, #EC3F57 0%, #FF8147 99%);
  border-radius: 5px;
}
.bargainbuydetail .btn{
  width: 90%;
  background-image: linear-gradient(90deg, #EC3F57 0%, #FF8147 99%);
  box-shadow: 0 5px 8px 0 #C13123;
  border-radius: 100px;
  height: 44px;
  line-height: 44px;
  text-align: center;
  color: white;
  font-size: 14px;
  margin: 16px auto 10px auto;
  cursor: pointer;
}
.bargainbuydetail .boxtitle {
    background: #C93A3A;
    border-radius: 6px 6px 0 0;
    width: 160px;
    height: 24px;
    line-height: 24px;
    font-size: 13px;
    color: #FFE0A0;
    text-align: center;
    margin: 20px auto 0px auto;
}
.bargainbuydetail .titleline{
  width: 94%;padding-left: 24px;padding-right: 24px;margin:0 auto;
  box-sizing: border-box;
}
.bargainbuydetail .titleline .inner{
  background: #C93A3A;border-radius: 100px;height: 8px;width: 100%;
}
.bargainbuydetail .listarea{
  background: #F8F8F8; border-radius: 24px;padding: 1px 12px 1px 12px;margin: -5px 5px 5px 5px;
  box-sizing: border-box;
}
.bargainbuydetail .scroll_list{margin:20px auto;}
.bargainbuydetail .listarea .scroll_item {
    border-radius: 6px;
    padding-left: 10px;
    height: 60px;
    margin-top: 10px;
    background-color: #E0E0E0;
}
</style>
