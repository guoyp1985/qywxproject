<style lang="less">
.first-hb-modal-outer{
  position:absolute;left:0;top:0;right:0;bottom:0;
}
.first-hb-modal{
  .modal-inner{width:80%;background-color:transparent;max-width:430px;max-height:544px;}
  .pic-outer{
    width:100%;padding-bottom:170%;position:relative;max-height:100%;
    .pic{
      position:absolute;left:0;top:0;right:0;bottom:0;
      img{width:100%;height:100%;}
    }
    .click-area{
      position:absolute;left:40%;top:56%;width:18%;
      .click-inner{
        width:100%;padding-bottom:100%;
        .btn{
          position:absolute;left:0;top:0;right:0;bottom:0;
        }
      }
    }
  }
  .top-con{
    position:absolute;left:0;top:8%;right:0;width:100%;color:#fff;font-weight:bold;font-size:35px;z-index:1;
  }
  .top-con.small{font-size:20px;}
  .middle-con{
    position:absolute;left:8%;top:28%;width:84%;height:50%;
    background-color:#fff;border-radius:10rpx;box-shadow: 0 0 20px #e4e8eb;
    padding:20px;box-sizing: border-box;
    .txt{letter-spacing:1px;}
  }
  .bottom-con{
    display:block;
    position:absolute;left:8%;bottom:5%;width:84%;height:10%;z-index:1;
    .btn{
      width:100%;height:100%;
      box-shadow:0px 2px 3px 0px #f63f3d;color:#fff;
      background: linear-gradient(#f63f3d, #ff6a61);border-radius:30px;
    }
  }
}
.first-result-modal{
  .inner{
    width:90%;position:relative;
    .pic-outer{
      width:100%;padding-bottom:107%;position:relative;
      .pic{
        position:absolute;left:0;top:0;right:0;bottom:0;
        img{width:100%;height:100%;}
      }
    }
  }
  .top-txt{
    position:absolute;left:0;top:22%;right:0;width:100%;height:12%;color:#7a2716;font-weight:bold;font-size:15px;
    .big{font-size:20px;color:#ff6a61;}
  }
  .con-txt{
    position:absolute;left:0;top:33%;right:0;width:100%;height:29%;color:#7a2716;font-weight:bold;font-size:15px;
    .big{font-size:30px;color:#ff6a61;}
  }
  .txt-list{
    position:absolute;left:0;bottom:10%;right:0;display:flex;
    .item{flex:1;color:#f8edad;box-sizing: border-box;}
  }
}
</style>
<template>
  <div class="first-hb-modal-outer">
    <div class="auto-modal flex_center first-hb-modal" v-if="showModal">
      <div class="modal-inner border-box">
        <div class="pic-outer">
          <div class="pic">
            <img src="https://tossharingsales.boka.cn/minigxk/zpcj.jpg" />
          </div>
          <div class="click-area" @click="clickOpen">
            <div class="click-inner">
              <div class="btn"></div>
            </div>
          </div>
        </div>
        <div class="close-area flex_center" @click="closeModal">
          <div formType="submit" class="al al-close1"></div>
        </div>
      </div>
    </div>
    <div class="modalarea flex_center first-result-modal" v-if="showResult">
      <div class="inner">
        <div class="pic-outer">
          <div class="pic">
            <img src="https://tossharingsales.boka.cn/minigxk/luck/hb2.png" />
          </div>
        </div>
        <div class="top-txt flex_center">恭喜你获得<text class="big">{{typeObject[moneyParams.awardtype]}}</text>奖励</div>
        <div class="con-txt flex_center">
          <div class="w_100 align_center">
            <template v-if="moneyParams.awardtype == 'hb'">
              <div class="big">￥{{moneyParams.awardmoney}}</div>
              <div>已发送到你的微信零钱</div>
            </template>
            <template v-else>
              <div class="big">{{moneyParams.awardmoney}}</div>
            </template>
          </div>
        </div>
        <div class="close-area flex_center" @click="closeHbModal">
          <div formType="submit" class="al al-close1"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ENV from 'env'
export default {
  name: 'FirstHb',
  props: {
    action: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: '新手任务'
    },
    content: {
      type: String,
      default: ''
    },
    buttonTxt: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      showModal: true,
      showResult: false,
      typeObject: {vip: 'VIP', hb: '红包'},
      moneyParams: {awardtype: '', awardmoney: ''}
    }
  },
  methods: {
    closeModal () {
      this.$emit('closeFirstHb')
    },
    clickButton () {
      this.$emit('submitFirstTip')
    },
    clickOpen () {
      this.$vux.loading.show()
      let params = {actions: this.action}
      if (this.$route.query.appid) {
        params.appid = this.$route.query.appid
      }
      this.$http.post(`${ENV.BokaApi}/api/retailer/firstReward`, params).then(res => {
        this.$vux.loading.hide()
        const data = res.data
        if (data.flag) {
          if (data.data <= 3) {
            this.moneyParams.awardtype = 'hb'
          } else {
            this.moneyParams.awardtype = 'vip'
          }
          this.moneyParams.awardmoney = data.datadesc
        } else {
          this.$vux.toast.show({
            text: data.error,
            type: data.flag !== 1 ? 'warn' : 'success',
            time: this.$util.delay(data.error)
          })
        }
        this.showModal = false
        this.showResult = true
      })
    },
    closeHbModal (e) {
      this.showResult = false
      this.$emit('closeFirstHb')
    }
  }
}
</script>
