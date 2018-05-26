/*
* @description: 返点客页
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div id="to-recommend" class="font14">
    <tab v-model="selectedIndex" class="bg-white">
      <tab-item class="font14" selected @on-item-click="clickTabItem">全部收入</tab-item>
      <tab-item class="font14" @on-item-click="clickTabItem">客户资源</tab-item>
    </tab>
    <div class="x-card">
      <div class="border-box posi_r" v-show="selectedIndex===0">
        <div class="rebates-explain font12 color-red" @click="showpopup">
          <i class="al al-gantanhaozhong font20 v_middle"></i>
          <span class="v_middle">{{$t('Point Of Return')}}</span>
        </div>
        <card @click.native="withdrawClick">
          <div slot="content" class="card-demo-flex card-demo-content01">
            <div class="vux-1px-r">
              <div class="color-red font18">{{ $t('RMB' )}}{{ rebateInfo.income }}</div>
              <div class="color-gray font14 mt5">{{$t('Total Amount')}}</div>
            </div>
            <div class="vux-1px-r">
              <div class="color-red font18">{{ $t('RMB' )}}{{ rebateInfo.torebate }}</div>
              <div class="color-gray font14 mt5">{{$t('Waiting To Rebate')}}</div>
            </div>
            <div class="vux-1px-r">
              <div class="color-red font18">{{ $t('RMB' )}}{{ rebateInfo.towithdraw }}</div>
              <div class="color-gray font14 mt5">{{$t('Waiting To Return Money')}}</div>
            </div>
          </div>
        </card>
      </div>
      <div class="border-box posi_r" v-show="selectedIndex===1">
        <card @click.native="bringCustomerClick">
          <div slot="content" class="card-demo-flex card-demo-content01">
            <div class="vux-1px-r">
              <div class="color-red font18">{{ rebateInfo.customerNumber }}人</div>
              <div class="color-gray font14 mt5">{{$t('Total Number')}}</div>
            </div>
            <div class="vux-1px-r">
              <div class="color-red font18">{{ rebateInfo.buyPeople }}人</div>
              <div class="color-gray font14 mt5">{{$t('Purchase Number')}}</div>
            </div>
            <div>
              <div class="color-red font18">{{ rebateInfo.buyPercent }}%</div>
              <div class="color-gray font14 mt5">{{$t('Purchase Ratio')}}</div>
            </div>
          </div>
        </card>
      </div>
      <div class="button-cell">
        <x-button @click.native="withdrawClick" class="btn-show">{{$t('To Make Presentation')}}</x-button>
      </div>
    </div>
    <div class="return-shop bg-white">
      <h2 class="return-title b_bottom_after">{{$t('My Return Stores')}}</h2>
      <template v-if="disList">
        <group v-if="list.length">
          <cell-box v-for="(item, index) in list" :key="item.id" :link="{name: 'tRebateStore', query: {wid: item.uploader}}">
            <div class="store-img">
              <x-img class="imgcover" :src="item.avatar" default-src="../src/assets/images/nopic.jpg"></x-img>
            </div>
            <div class="store-info font14">
              <div class="store-name">
                {{item.title}}
              </div>
              <div class="store-money color-gray mt5 font12">进入店铺</div>
            </div>
          </cell-box>
        </group>
        <div v-else class="no-related-x color-gray">
          <span>{{$t('No Related Ruturn Stores')}}</span>
        </div>
      </template>
    </div>
    <div v-transfer-dom class="x-popup">
      <popup v-model="isshowpopup" height="100%">
        <div class="popup1">
          <div class="popup-top flex_center">{{ $t('Rebate description and rebate customer protocol') }}</div>
          <div class="popup-middle font14">
            <div class="padding10">
              <h3 class="align_center">返点说明</h3>
              <div class="bold">1.如何赚佣金</div>
              <div>成为店铺的返点客后，即可查看店铺每件商品所提供的“佣金”，积极分享店铺的商品、活动或文章给好友或朋友圈，当自己购买商品或好友购买商品后，即可获得所购商品的佣金奖励。</div>
              <div class="bold mt5">2.佣金到账规则</div>
              <div>当自己购买商品，或分享给好友购买商品后，需购买者确认收货以后，佣金才会到账。</div>
              <div class="bold mt5">3.如何提现佣金</div>
              <div>（1）点击【我的收入】-->点击【已到账】-->点击【提现】即可提现佣金。</div>
              <div>（2）已到账的佣金金额必须大于1元方可提现。</div>
              <div class="bold mt5">4.好友购买后，没有收到佣金怎么办？</div>
              <div>该购买好友之前看过该店铺其他返点客分享的内容，所以该好友的返点客是其他人。</div>
              <h3 class="align_center">共销宝返点客协议</h3>
              <b>第一条：立约目的</b><br/>
              为了规范共销宝平台经营秩序，明确卖家、返点客及共销宝平台的权利义务，保障各方及消费者的合法权益，特拟定本协议。<br/>
              <b>第二条：签约主体</b><br/>
              本协议由博卡先锋软件开发有限公司（以下统称“博卡先锋”）与申请成为返点客(以下简称“返点客”或“您”)签署。<br/>
              <b>第三条：协议生效和适用范围</b><br/>
              3.1、您通过网络页面点击确认或以其他方式选择接受本协议，即表示您与共销宝平台已达成协议并同意接受本协议的全部约定内容。本协议自您申请获得共销宝平台审核通过之时起生效。<br/>
              3.2、在共销宝平台成为卖家的返点客后，在本协议有效期间，返点客于共销宝平台开展经营活动应遵守本协议的约定。<br/>
              <b> 第四条：入驻共销宝平台返点客的条件</b><br/>
              4.1、共销宝平台的卖家直接邀请您成为卖家的返点客，无需提交申请资料。<br/>
              4.2、成为卖家的返点客后，您可立即对卖家提供的商品进行分销来获得佣金，也可通过分享卖家创建的商品和文章信息获得客户，客户购买后即可获得相应金额的佣金。<br/>
              <b>第五条：共销宝平台的权利和义务</b><br/>
              5.1、共销宝平台根据本协议的约定向返点客提供信息及数据管理服务。<br/>
              5.2、共销宝平台并不作为卖家提供产品信息及产品，也不作为返点客直接销售卖家的商品，卖家与返点客由于分销发生的纠纷，共销宝平台不承担任何责任，但共销宝平台有义务提供必要的协助以促进纠纷的解决。<br/>
              5.3、因网上平台的特殊性，共销宝平台没有义务对所有返点客的信息、所有的交易行为以及有关的其他事项进行事先审查，但如存在下列情况的，共销宝平台有权根据不同情况选择保留或删除相关信息或继续、停止对该用户提供服务：<br/>
              5.3.1、用户或其他第三方通知共销宝平台，认为某个具体返点客或具体交易事项可能存在重大问题的；<br/>
              5.3.2、用户或其他第三方向共销宝平台告知卖家有违法或不当行为的；<br/>
              5.3.3、共销宝平台以普通非专业交易者的知识水平标准对相关内容进行判别，可以明显认为这些内容或行为具有违法或不当性质的；<br/>
              5.4、共销宝平台有权对返点客的基本信息、分享行为及订单交易信息进行查阅，发现存在任何问题或疑问，均有权咨询返点客，并对其行为进行处理。<br/>
              5.5、经国家生效法律文书或行政处罚决定确认返点客存在违法行为，或者共销宝平台有足够事实依据可以认定返点客存在违法或违反协议行为的，共销宝平台有权公布返点客的违法或违规行为。<br/>
              <b> 第六条：其他约定</b><br/>
              6.1、本协议适用中华人民共和国大陆地区法律。因共销宝平台与返点客就本协议的签订、履行或解释发生争议，双方应努力友好协商解决。如协商不成，共销宝平台和返点客同意由共销宝平台住所地法院管辖审理双方的纠纷或争议。<br/>
              6.2、本协议内容包括协议正文、附件及所有共销宝平台已经发布的或将来可能发布的共销宝平台规则、经营规范等文件。这些文件是本协议不可分割的一部分，与本协议具有相同法律效力。<br/>
              6.3、共销宝平台有权以修改、更新等方式不时调整本协议和相关规则的内容，相关内容将公布于共销宝平台的官方网站或以其他方式通知返点客。除非您明示并通知共销宝平台不愿接受调整后的内容，否则调整后的内容将于公布之日或通知另行指定的日期开始生效。<br/>
              <b> 第七条：补充说明</b><br/>
              如果您对本声明的条款有疑问的，请通过共销宝客服渠道进行询问，共销宝将向您解释条款内容。如果您不同意本声明的任意内容，或者无法准确理解共销宝对条款的解释，请谨慎进行后续操作。<br/>
              7.1、任何商家欲根据用户发布的商品信息进行交易或其他行为前，应慎重辨别这些信息的合法性、准确性、真实性和安全性。共销宝不对用户发布的商品信息做任何保证或承诺，包括但不限于产品来源的合法性、产品权利瑕疵、产品质量瑕疵、卖家对商品描述的真实性等问题。<br/>
              9.2、共销宝不负责审核用户发布的商品信息中的图片、文字、Logo等是否基于合法权益，如该类信息涉及侵犯第三方知识产权等相关权益，共销宝不承担任何责任。<br/>
              9.3、共销宝为用户提供的独立担保交易仅为提供货款代收代付服务，不负责处理因其他原因而产生的各种交易纠纷。<br/>
              9.4、本声明适用中华人民共和国大陆地区法律。因共销宝与用户就本声明的确认、履行或解释发生争议，双方应努力友好协商解决。如协商不成，共销宝和用户同意由共销宝住所地法院管辖审理双方的纠纷或争议。<br/>
              本声明内容包括声明正文及所有共销宝已经发布的或将来可能发布的共销宝服务的使用规则。所有规则为本声明不可分割的一部分，与声明正文具有相同法律效力。本协议未尽事宜，用户需遵守共销宝网站上公布的《共销宝服务协议》及相关规则。<br/>
            </div>
          </div>
          <div class="popup-bottom flex_center bg-orange color-white" @click="closepopup">{{ $t('Agree to share right away') }}</div>
        </div>
      </popup>
    </div>
  </div>
</template>
<script>
import {Tab, TabItem, Group, CellBox, XImg, Sticky, XButton, Card, TransferDom, Popup} from 'vux'
import ENV from 'env'

export default {
  directives: {
    TransferDom
  },
  components: {
    Tab, TabItem, Group, CellBox, XImg, Sticky, XButton, Card, Popup
  },
  data () {
    return {
      selectedIndex: 0,
      list: [],
      list1: [],
      isshowpopup: false,
      disList: false,
      rebateInfo: Object
    }
  },
  methods: {
    applyClick (id) {
      this.$router.push({name: 'tRebateApply'})
    },
    getMyRetailer () {
      const self = this
      this.$http.get(`${ENV.BokaApi}/api/seller/myRetailerList`)
      .then(res => {
        self.$vux.loading.hide()
        self.list = res.data
        self.disList = true
      })
    },
    getBuyRetailer () {
      const self = this
      this.$http.get(`${ENV.BokaApi}/api/seller/buyRetailerList`)
      .then(res => {
        self.$vux.loading.hide()
        self.list1 = res.data
      })
    },
    clickTabItem () {
      switch (this.selectedIndex) {
        case 0:
          this.getMyRetailer()
          break
        case 1:
          this.getBuyRetailer()
          break
      }
    },
    showpopup () {
      this.isshowpopup = true
    },
    closepopup () {
      this.isshowpopup = false
    },
    withdrawClick () {
      this.$router.push({path: '/userRebateInfo'})
    },
    bringCustomerClick () {
      this.$router.push({path: '/bringCustomer'})
    },
    getData () {
      const self = this
      this.$http.post(`${ENV.BokaApi}/api/seller/rebateinfo`)
      .then(res => {
        self.rebateInfo = res.data
        self.clickTabItem()
      })
    },
    init () {
      this.$vux.loading.show()
      this.getData()
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
    }
  },
  created () {
    this.init()
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less">
.return-shop .return-title{
  margin-top: 10px;
  padding: 10px 15px 10px 22px;
  font-size: 16px;
  color: inherit;
  position: relative;
  font-weight: normal;
}
.return-shop .return-title:before{
  content: " ";
  position: absolute;
  left: 0px;
  top: 13px;
  bottom: 13px;
  width: 0px;
  border-left: 2px solid red;
  color: #D9D9D9;
  left: 15px;
}
.card-demo-flex {
  display: flex;
}
.card-demo-content01 {
  padding: 10px 0;
}
.card-padding {
  padding: 15px;
}
.card-demo-flex > div {
  flex: 1;
  text-align: center;
  font-size: 12px;
}
.card-demo-flex span {
  color: #f74c31;
}
.x-card{
  background-color: #fff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.14);
}
#to-recommend .rebates-explain{
  position: absolute;
  z-index: 2;
  top: -37px;
  right: 10px;
}
#to-recommend .vux-tab-wrap{
  z-index: 2;
  padding-top: 69px;
}
#to-recommend .weui-panel{margin-top: 0;}
#to-recommend .weui-panel:before{display: none;}
#to-recommend .vux-1px-r:after{top:10%;bottom:10%;}
#to-recommend .vux-tab-container{
  width: 60%;
  margin: 0 auto;
  height:35px;
}
@media only screen and (max-width:375px){
  #to-recommend .vux-tab-container{width: 50%;}
}
#to-recommend .vux-tab{
  height:35px;
}
#to-recommend .vux-tab-ink-bar{
  background-color: red;
  height: 35px !important;
}
#to-recommend .vux-tab .vux-tab-item{
  background: transparent;
  line-height:35px;
  color:red
}
#to-recommend .vux-tab-container{
  margin-top: 20px;
  border: 1px solid red;
  border-radius: 6px;
  box-sizing: border-box;
}
#to-recommend .vux-tab .vux-tab-item.vux-tab-selected{
  background-color: red;
  color: #fff;
  position: relative;
  z-index: 2;
}
// #to-recommend .recommend-title {
//   padding: 10px 20px;
//   position: relative;
//   background-color: #ffffff;
// }
// #to-recommend .recommend-title:after {
//   content: ' ';
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   height: 1px;
//   border-bottom: 1px solid #e7e7e7;
// }
#to-recommend .bought-stores {
  margin-top: 10px;
}
#to-recommend .store-info {
  flex: 1;
  padding-left: 10px;
}
#to-recommend .store-img {
  display: flex;
}
#to-recommend .store-img img{
  width: 60px;
  height: 60px;
}
#to-recommend .button-cell {
  padding: 10px 0;
  text-align: center;
}

/* vux css hack */
#to-recommend .weui-cells {
  margin-top: 0;
}
#to-recommend .weui-cells:first-of-type:before {
  height: 0;
  border-top: none;
}
#to-recommend .btn-show{
  width:120px;
  height:35px;
  line-height:33px;
  border-radius:6px;
  border:1px solid red;
  color:#ffffff;
  font-size:14px;
  text-align:center;
  // position: absolute;
  // bottom:10px;
  // left:0;
  // right:0;
  // margin:0 auto;
  box-sizing: border-box;
  background-color: red
}
#to-recommend .weui-panel:after {
  height: 0;
  border-bottom: none;
}
</style>
