<template>
  <div class="containerarea font14 bargainbuyview scroll-container" style="overflow-y:auto;">
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
        <div v-if="data.leftstorage <= 0" class="btn">商品已售罄，本次活动结束</div>
        <template v-else>
          <div v-if="crowduser.isovertime && crowduser.isfull == 0" class="btn">指定时间内未完成砍价，砍价失败</div>
          <template v-else>
            <div v-if="crowduser.isdeliver == 0 && crowduser.isfull == 1" class="btn" @click="buyevent">立即购买 {{  $t('RMB') }}{{ crowduser.leftmoney }}</div>
            <div v-if="crowduser.isdeliver == 1" class="btn">已发起购买,砍价结束</div>
            <template v-if="crowduser.isfull == 0">
              <div class="btn db" @click="inviteevent">邀请好友砍价</div>
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
          </template>
        </template>
        <div class="padding10 border-box align_center" style="color:#d51932;" @click="viewRule">* 查看活动规则</div>
      </div>
    </div>
    <div>
      <div class="boxtitle">砍价亲友团</div>
      <div class="titleline">
        <div class="inner" style="background: #C93A3A;border-radius: 100px;height: 8px;width: 100%;"></div>
      </div>
      <div class="listarea">
        <div class="scroll_list">
          <div v-if="cutdata.length == 0" class="scroll_item emptyitem" style="padding:0;">
              <div class="t-table">
                <div class="t-cell middle-cell" style="color:inherit;">还没有好友砍价</div>
              </div>
          </div>
          <div v-else v-for="(item,index) in cutdata" :key="item.id" class="scroll_item">
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
    <div v-transfer-dom class="x-popup invite-popup">
      <popup v-model="showpopup" height="100%">
        <div class="popup1 invitelayer" @click="closeinvite">
          <div class="iconarea" style="padding:15px 40px;"><i class="al al-feiji font60" style="color:rgba(255,255,255,0.9)"></i></div>
          <div class="txtarea align_center color-fff font16" style="line-height:26px;text-shadow: -2px 0px 1px #000;">点击右上角“···”发送给微信好友<br>邀请对方帮你砍价！</div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom class="x-popup">
      <popup v-model="showViewPopup" height="100%">
        <div class="popup1">
          <div class="popup-top flex_center">砍价活动规则</div>
          <div class="popup-middle font14">
            <div class=" font12 pt10 pl15 pr15 pb10 color-gray7">
              <div>活动规则：</div>
              <div>1. 每人一次砍价机会；</div>
              <div>2. 活动商品只可购买一次；</div>
              <div>3. 商品最终购买金额以实际所砍金额为准；</div>
              <div>4. 砍价活动结束后，商品即恢复原价；</div>
              <div>5. 该活动不可与其他活动优惠同时使用；</div>
              <div>6. 参与活动的有效砍价时间为{{ data.finishtime }}小时；</div>
              <div>7. 活动截止时间: {{ data.endtime | dateformat }}</div>
              <div>（商品若提前售完，活动将提前截止）</div>
            </div>
          </div>
          <div class="popup-bottom flex_center">
            <div class="flex_cell h_100 flex_center bg-orange color-white" @click="closepopup">{{ $t('Know txt') }}</div>
          </div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom class="x-popup buy-popup-layer">
      <popup v-model="showBuy" height="100%">
        <div class="product-options-area columnarea">
          <div class="column-content" @click="closeOptions"></div>
          <div class="options-box columnarea">
            <div class="close-area flex_center color-gray" @click="closeOptions"><span class="al al-close"></span></div>
            <div class="column-content columnarea">
              <div class="part1 flex_left">
                <div class="pic flex_left">
                  <img :src="selectedOption.photo" @click="viewBigImg(0)" />
                </div>
                <div class="flex_cell flex_left">
                  <div class="w_100">
                    <div class="color-theme"><span>￥</span><span class="bold font16">{{product.price}}</span></div>
                    <div class="mt10 color-gray">库存{{selectedOption.storage}}{{product.unit}}</div>
                    <div class="mt10" v-if="selectedOption.title">已选: {{selectedOption.title}}</div>
                    <div class="mt10" v-else>请选择 规格</div>
                  </div>
                </div>
              </div>
              <div class="part2 column-content">
                <div class="pt10">规格</div>
                <div class="options-list">
                  <div v-for="(item,index) in data.productoptions" :class="`options-item ${(selectedOptionIndex == index && item.storage > 0) ? 'active' : ''} ${item.storage <= 0 ? 'disabled' : ''}`" @click="clickOptions(item,index)">
                    <div class="flex_center">
                      <img :src="item.photo" /><span class="ml5">{{item.title}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="options-bottom flex_center">
              <div class="flex_cell h_100 flex_center">
                <div class="bg-theme color-white flex_center btn" @click="buyOption">立即购买</div>
              </div>
            </div>
          </div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom>
      <previewer :list="previewerOptionsPhoto" ref="previewerOption"></previewer>
    </div>
  </div>
</template>

<i18n>
</i18n>

<script>
import { Previewer, TransferDom, Popup, XImg } from 'vux'
import Time from '#/time'
import ENV from 'env'

export default {
  name: 'BargainbuyView',
  directives: {
    TransferDom
  },
  components: {
    Previewer, Popup, XImg
  },
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
    onJoin: Function,
    cutdownEnd: Function
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      query: {},
      product: Object,
      showpopup: false,
      lefthour: '',
      leftminute: '',
      leftsecond: '',
      cutdata: [],
      showViewPopup: false,
      showBuy: false,
      selectedOption: {},
      selectedOptionIndex: 0,
      previewerOptionsPhoto: []
    }
  },
  created () {
    const self = this
    self.query = self.$route.query
    if (self.data) {
      self.product = self.data.product
    }
    if (self.crowduser && self.crowduser.timeleft) {
      self.lefthour = self.crowduser.timeleft.hour
      self.leftminute = self.crowduser.timeleft.minute
      self.leftsecond = self.crowduser.timeleft.second
      self.cutdown()
    }
    self.$http.post(`${ENV.BokaApi}/api/activity/bargainUsers`, { id: self.crowduser.id }).then(function (res) {
      let data = res.data
      self.cutdata = data.data ? data.data : data
    })
  },
  methods: {
    inviteevent () {
      this.showpopup = true
    },
    closeOptions () {
      this.showBuy = false
    },
    viewBigImg (index) {
      const self = this
      if (self.$util.isPC()) {
        self.$refs.previewerOption.show(0)
      } else {
        window.WeixinJSBridge.invoke('imagePreview', {
          current: this.selectedOption.photo,
          urls: [this.selectedOption.photo]
        })
      }
    },
    clickOptions (item, index) {
      this.selectedOption = item
      this.selectedOptionIndex = index
      this.previewerOptionsPhoto = this.$util.previewerImgdata([this.selectedOption.photo])
    },
    buyOption () {
      if (!this.selectedOption || !this.selectedOption.id) {
        this.$vux.toast.text('请选择商品规格', 'middle')
        return false
      }
      if (this.selectedOption.storage <= 0) {
        this.$vux.toast.text('该规格商品库存不足', 'middle')
        return false
      }
      this.showBuy = false
      this.ajaxBuy()
    },
    closeinvite () {
      this.showpopup = false
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
    },
    ajaxBuy () {
      const self = this
      self.$vux.confirm.show({
        title: '确定要购买吗？',
        onConfirm: () => {
          self.$vux.loading.show()
          let params = { id: self.product.id, flag: 1, quantity: 1, activityid: self.data.id, wid: self.product.uploader }
          if (self.query.share_uid) {
            params.share_uid = self.query.share_uid
          }
          if (this.data.productoptions && this.data.productoptions.length && this.selectedOption && this.selectedOption.id) {
            params.poid = this.selectedOption.id
          }
          self.$http.post(`${ENV.BokaApi}/api/order/addShop`, params).then(function (res) {
            let data = res.data
            self.$vux.loading.hide()
            if (data.flag === 1) {
              self.$router.push({ path: '/addOrder', query: { id: data.data } })
            } else if (data.error) {
              self.$vux.toast.show({
                text: data.error,
                time: self.$util.delay(data.error)
              })
            }
          })
        }
      })
    },
    buyevent () {
      if (this.data.productoptions && this.data.productoptions.length) {
        if (!this.selectedOption || !this.selectedOption.id) {
          this.selectedOption = this.data.productoptions[0]
          this.selectedOptionIndex = 0
        }
        this.showBuy = true
      } else {
        this.ajaxBuy()
      }
    },
    viewRule () {
      this.showViewPopup = true
    },
    closepopup () {
      this.showViewPopup = false
    }
  }
}
</script>

<style lang="less">
.bargainbuyview {
    background-image: linear-gradient(-180deg, #f32a3d 0%, #FF8048 100%);
}
.bargainbuyview .topimg{position:absolute;left:0;top:0;width:100%;}
.bargainbuyview .topimg img{width:100%;max-height:240px;vertical-align: middle;}
.bargainbuyview .b_header{width:100%;height:90px;padding-top:30px;overflow:hidden;position: relative;}
.bargainbuyview .b_header .inner {
    width: 168px;
    height: 168px;
    box-sizing:border-box;
    padding-top:8px;
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
    background: #FDC45D;
    margin:0 auto;
}
.bargainbuyview .b_header .pic{width:60px;margin:0 auto;}
.bargainbuyview .b_header .pic img{width:60px;height:60px;border-radius:50%;vertical-align:middle;}
.bargainbuyview .boxarea {
  width: 94%;
  box-sizing:border-box;
  position:relative;
  margin:-1px auto 0;
  background: #FDC45D;
  border-radius: 13px;
  padding: 16px 12px 16px 12px;
}
.bargainbuyview .boxarea .inner {
    border-radius: 8px;
    background: white;
    margin-top: 5px;
    padding: 7px 6px 7px 6px;
    position: relative;
    cursor: pointer;
}
.bargainbuyview .boxarea .innerbg {
    border-radius: 7px;
    background: #F7F7F7;
    padding: 6px;
}
.bargainbuyview .boxarea .pic{width:80px;}
.bargainbuyview .boxarea .pic img{width:70px;height:70px;vertical-align:middle;}

.bargainbuyview .boxarea1{width:94%;margin:0 auto;}
.bargainbuyview .boxarea1 .inner{
  background-color: #FDC45D;border-radius: 13px;padding:11px 15px 8px 15px;
}
.bargainbuyview .boxarea1 .pricearea{
  width: 90%;
  margin: 20px auto 0;
  color: #C93A3A;
}
.bargainbuyview .priceline {
  margin: 12px auto;
  background-color: rgba(255, 255, 255, 0.75);
  width: 100%;
  height: 10px;
  border-radius: 5px;
}
.bargainbuyview .line {
  width: 0%;
  height: 100%;
  background-image: linear-gradient(0deg, #EC3F57 0%, #FF8147 99%);
  border-radius: 5px;
}
.bargainbuyview .btn{
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
.bargainbuyview .boxtitle {
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
.bargainbuyview .titleline{
  width: 94%;padding-left: 24px;padding-right: 24px;margin:0 auto;
  box-sizing: border-box;
}
.bargainbuyview .titleline .inner{
  background: #C93A3A;border-radius: 100px;height: 8px;width: 100%;
}
.bargainbuyview .listarea{
  background: #F8F8F8; border-radius: 24px;padding: 1px 12px 1px 12px;margin: -5px 5px 5px 5px;
  box-sizing: border-box;
}
.bargainbuyview .scroll_list{margin:20px auto;}
.bargainbuyview .listarea .scroll_item {
    border-radius: 6px;
    padding-left: 10px;
    height: 60px;
    margin-top: 10px;
    background-color: #E0E0E0;
}
.invite-popup .vux-popup-dialog{background-color:transparent;}
.invitelayer{width:100%;height:100%;position:relative;background: rgba(0, 0, 0, 0.3);}
.invitelayer .iconarea{text-align:right;padding:15px 40px;color:rgba(255,255,255,0.9);}
.invitelayer .txtarea{
  text-align:center;color:#fff;font-size:16px;
  line-height:26px;text-shadow: -2px 0px 1px #000;
}
</style>
