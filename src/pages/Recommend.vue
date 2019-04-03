/*
* @description: 返点客页
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div id="to-recommend" class="font14 containerarea recommend" ref="scrollContainer" @scroll="handleScroll">
    <tab v-model="selectedIndex" class="bg-white radius-tab">
      <tab-item class="font14" selected @on-item-click="clickTabItem">全部收入</tab-item>
      <tab-item class="font14" @on-item-click="clickTabItem">客户资源</tab-item>
    </tab>
    <div class="x-card">
      <div class="border-box posi_r" v-show="selectedIndex===0">
        <div class="rebates-explain font12 color-red" @click="showpopup">
          <i class="al al-gantanhaozhong font20 v_middle"></i>
          <span class="v_middle">{{$t('Point Of Return')}}</span>
        </div>
        <card>
          <div slot="content" class="card-demo-flex card-demo-content01">
            <div class="vux-1px-r" @click="toRebateInfo(1)">
              <div class="color-red font18">{{ $t('RMB' )}}{{ rebateInfo.income }}</div>
              <div class="color-gray font14 mt5">{{$t('Total Amount')}}</div>
            </div>
            <div class="vux-1px-r" @click="toRebateInfo()">
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
        <card>
          <div slot="content" class="card-demo-flex card-demo-content01">
            <div class="vux-1px-r" @click="bringCustomerClick">
              <div class="color-red font18">{{ rebateInfo.customerNumber }}人</div>
              <div class="color-gray font14 mt5">{{$t('Total Number')}}</div>
            </div>
            <div class="vux-1px-r" @click="bringCustomerClick1">
              <div class="color-red font18">{{ rebateInfo.buyPeople }}人</div>
              <div class="color-gray font14 mt5">{{$t('Purchase Number')}}</div>
            </div>
            <div @click="bringCustomerClick">
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
    <div class="mt10 bg-white">
      <tab v-model="selectedIndex1" class="v-tab">
        <tab-item selected @on-item-click="swiperChange">{{$t('Rebate store')}}</tab-item>
        <tab-item @on-item-click="swiperChange">{{$t('Product')}}</tab-item>
        <tab-item @on-item-click="swiperChange">{{$t('Activity')}}</tab-item>
        <tab-item @on-item-click="swiperChange">{{$t('Article')}}</tab-item>
      </tab>
      <div v-show="selectedIndex1===0">
        <div class="scroll_list" v-if="disTabData1">
          <template v-if="!tabData1.length">
            <div class="no-related-x color-gray">
              <span>{{$t('No relevant data')}}</span>
            </div>
          </template>
          <div v-else @click="toRebateStore(item)" class="scroll_item flex_left pt10 pb10" v-for="(item, index) in tabData1" :key="index">
            <div class="w80 align_center">
              <img class="imgcover v_middle" style="width:60px;height:60px;" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';"/>
            </div>
            <div class="pr10 flex_cell border-box">
              <div class="clamp2">{{ item.title }}</div>
            </div>
            <div class="flex_center w40">
              <i class="al al-mjiantou-copy color-gray font20"></i>
            </div>
          </div>
        </div>
      </div>
      <div v-show="selectedIndex1===1">
        <div class="scroll_list" v-if="disTabData2">
          <div v-if="!tabData2.length" class="scroll_item emptyitem flex_center">
            <span>{{$t('No relevant data')}}</span>
          </div>
          <div v-else @click="toProduct(item)" class="scroll_item flex_left pt10 pb10" v-for="(item, index) in tabData2" :key="index">
            <div class="w80 align_center">
              <img class="imgcover v_middle" style="width:60px;height:60px;" :src="$util.getPhoto(item.photo)" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
            </div>
            <div class="pr10 flex_cell border-box">
              <div class="clamp2">{{ item.title }}</div>
              <div class="flex_left mt10 font12 color-gray">
                <div class="flex_cell">零售价：{{$t('RMB')}}{{item.price}}</div>
                <div class="flex_cell align_right color-red">佣金：{{$t('RMB')}}{{item.rebate}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="selectedIndex1===2">
        <div v-if="disTabData3" class="scroll_list">
          <div v-if="!tabData3.length" class="scroll_item emptyitem flex_center">
            <span>{{$t('No relevant data')}}</span>
          </div>
          <template v-else v-for="(item, index) in tabData3">
            <div @click="toProduct1(item)" class="scroll_item flex_left pt10 pb10">
              <div class="w80 align_center">
                <img class="imgcover v_middle" style="width:60px;height:60px;" :src="$util.getPhoto(item.photo)" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
              </div>
              <div class="pr10 flex_cell border-box">
                  <div class="clamp2">{{ item.title }}</div>
                  <div class="clamp1 mt10 font12 color-gray">{{item.starttime | dateFormat}} 至 {{item.endtime | dateFormat}}</div>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div v-show="selectedIndex1===3">
        <div class="scroll_list" v-if="disTabData4">
          <div v-if="!tabData4.length" class="scroll_item emptyitem flex_center">
            <span>{{$t('No relevant data')}}</span>
          </div>
          <div v-else @click="toNews(item)" class="scroll_item flex_left pt10 pb10" v-for="(item, index) in tabData4" :key="index">
            <div class="w80 align_center">
              <img class="imgcover v_middle" style="width:60px;height:60px;" :src="$util.getPhoto(item.photo)" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
            </div>
            <div class="pr10 flex_cell border-box">
              <div class="clamp2">{{ item.title }}</div>
              <div class="mt5 font12 color-gray">
                <span class="v_middle">{{ item.dateline | dateFormat }}</span>
                <span class="v_middle"><i class="al al-chakan font18 middle-cell pl5 pr5 color-b8b8b8"></i>{{item.views}}</span>
                <span class="v_middle"><i class="al al-ai-share font13 middle-cell pl5 pr5 color-b8b8b8"></i>{{item.shares}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
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
              <h3 class="align_center">{{platform}}返点客协议</h3>
              <b>第一条：立约目的</b><br/>
              为了规范{{platform}}平台经营秩序，明确卖家、返点客及{{platform}}平台的权利义务，保障各方及消费者的合法权益，特拟定本协议。<br/>
              <b>第二条：签约主体</b><br/>
              本协议由博卡先锋软件开发有限公司（以下统称“博卡先锋”）与申请成为返点客(以下简称“返点客”或“您”)签署。<br/>
              <b>第三条：协议生效和适用范围</b><br/>
              3.1、您通过网络页面点击确认或以其他方式选择接受本协议，即表示您与{{platform}}平台已达成协议并同意接受本协议的全部约定内容。本协议自您申请获得{{platform}}平台审核通过之时起生效。<br/>
              3.2、在{{platform}}平台成为卖家的返点客后，在本协议有效期间，返点客于{{platform}}平台开展经营活动应遵守本协议的约定。<br/>
              <b> 第四条：入驻{{platform}}平台返点客的条件</b><br/>
              4.1、{{platform}}平台的卖家直接邀请您成为卖家的返点客，无需提交申请资料。<br/>
              4.2、成为卖家的返点客后，您可立即对卖家提供的商品进行分销来获得佣金，也可通过分享卖家创建的商品和文章信息获得客户，客户购买后即可获得相应金额的佣金。<br/>
              <b>第五条：{{platform}}平台的权利和义务</b><br/>
              5.1、{{platform}}平台根据本协议的约定向返点客提供信息及数据管理服务。<br/>
              5.2、{{platform}}平台并不作为卖家提供产品信息及产品，也不作为返点客直接销售卖家的商品，卖家与返点客由于分销发生的纠纷，{{platform}}平台不承担任何责任，但{{platform}}平台有义务提供必要的协助以促进纠纷的解决。<br/>
              5.3、因网上平台的特殊性，{{platform}}平台没有义务对所有返点客的信息、所有的交易行为以及有关的其他事项进行事先审查，但如存在下列情况的，{{platform}}平台有权根据不同情况选择保留或删除相关信息或继续、停止对该用户提供服务：<br/>
              5.3.1、用户或其他第三方通知{{platform}}平台，认为某个具体返点客或具体交易事项可能存在重大问题的；<br/>
              5.3.2、用户或其他第三方向{{platform}}平台告知卖家有违法或不当行为的；<br/>
              5.3.3、{{platform}}平台以普通非专业交易者的知识水平标准对相关内容进行判别，可以明显认为这些内容或行为具有违法或不当性质的；<br/>
              5.4、{{platform}}平台有权对返点客的基本信息、分享行为及订单交易信息进行查阅，发现存在任何问题或疑问，均有权咨询返点客，并对其行为进行处理。<br/>
              5.5、经国家生效法律文书或行政处罚决定确认返点客存在违法行为，或者{{platform}}平台有足够事实依据可以认定返点客存在违法或违反协议行为的，{{platform}}平台有权公布返点客的违法或违规行为。<br/>
              <b> 第六条：其他约定</b><br/>
              6.1、本协议适用中华人民共和国大陆地区法律。因{{platform}}平台与返点客就本协议的签订、履行或解释发生争议，双方应努力友好协商解决。如协商不成，{{platform}}平台和返点客同意由{{platform}}平台住所地法院管辖审理双方的纠纷或争议。<br/>
              6.2、本协议内容包括协议正文、附件及所有{{platform}}平台已经发布的或将来可能发布的{{platform}}平台规则、经营规范等文件。这些文件是本协议不可分割的一部分，与本协议具有相同法律效力。<br/>
              6.3、{{platform}}平台有权以修改、更新等方式不时调整本协议和相关规则的内容，相关内容将公布于{{platform}}平台的官方网站或以其他方式通知返点客。除非您明示并通知{{platform}}平台不愿接受调整后的内容，否则调整后的内容将于公布之日或通知另行指定的日期开始生效。<br/>
              <b> 第七条：补充说明</b><br/>
              如果您对本声明的条款有疑问的，请通过{{platform}}客服渠道进行询问，{{platform}}将向您解释条款内容。如果您不同意本声明的任意内容，或者无法准确理解{{platform}}对条款的解释，请谨慎进行后续操作。<br/>
              7.1、任何商家欲根据用户发布的商品信息进行交易或其他行为前，应慎重辨别这些信息的合法性、准确性、真实性和安全性。{{platform}}不对用户发布的商品信息做任何保证或承诺，包括但不限于产品来源的合法性、产品权利瑕疵、产品质量瑕疵、卖家对商品描述的真实性等问题。<br/>
              9.2、{{platform}}不负责审核用户发布的商品信息中的图片、文字、Logo等是否基于合法权益，如该类信息涉及侵犯第三方知识产权等相关权益，{{platform}}不承担任何责任。<br/>
              9.3、{{platform}}为用户提供的独立担保交易仅为提供货款代收代付服务，不负责处理因其他原因而产生的各种交易纠纷。<br/>
              9.4、本声明适用中华人民共和国大陆地区法律。因{{platform}}与用户就本声明的确认、履行或解释发生争议，双方应努力友好协商解决。如协商不成，{{platform}}和用户同意由{{platform}}住所地法院管辖审理双方的纠纷或争议。<br/>
              本声明内容包括声明正文及所有{{platform}}已经发布的或将来可能发布的{{platform}}服务的使用规则。所有规则为本声明不可分割的一部分，与声明正文具有相同法律效力。本协议未尽事宜，用户需遵守{{platform}}网站上公布的《{{platform}}服务协议》及相关规则。<br/>
            </div>
          </div>
          <div class="popup-bottom flex_center bg-orange color-white" @click="closepopup">{{ $t('Agree to share right away') }}</div>
        </div>
      </popup>
    </div>
  </div>
</template>
<script>
import {Tab, TabItem, ViewBox, Group, Cell, CellBox, XImg, Sticky, XButton, Card, TransferDom, Popup} from 'vux'
import Time from '#/time'
import ENV from 'env'

let pageStart1 = 0
let pageStart2 = 0
let pageStart3 = 0
let pageStart4 = 0
const limit = 10

export default {
  directives: {
    TransferDom
  },
  components: {
    Tab, TabItem, ViewBox, Group, Cell, CellBox, XImg, Sticky, XButton, Card, Popup
  },
  data () {
    return {
      query: {},
      loginUser: {},
      selectedIndex: 0,
      list: [],
      list1: [],
      isshowpopup: false,
      disList: false,
      rebateInfo: Object,
      selectedIndex1: 0,
      disTabData1: false,
      disTabData2: false,
      disTabData3: false,
      disTabData4: false,
      tabData1: [],
      tabData2: [],
      tabData3: [],
      tabData4: [],
      platform: '共销客'
    }
  },
  filters: {
    dateFormat (date) {
      return new Time(date * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  methods: {
    toRebateInfo (flag) {
      let params = {}
      if (flag) {
        params.flag = flag
      }
      if (this.query.from) {
        params.from = this.query.from
      }
      this.$router.push({path: '/userRebateInfo', query: params})
    },
    toRebateStore (item) {
      let params = {wid: item.uid}
      if (this.query.from) {
        params.from = this.query.from
      }
      this.$router.push({path: '/rebateStore', query: params})
    },
    toProduct (item) {
      let params = {id: item.id, wid: item.uploader}
      if (this.query.from) {
        params.from = this.query.from
        this.$wechat.miniProgram.navigateTo({url: `${ENV.MiniRouter.product}?id=${item.id}&wid=${item.uploader}`})
      } else {
        this.$router.push({path: '/product', query: params})
      }
    },
    toProduct1 (item) {
      if (this.query.from) {
        if (item.type === 'groupbuy') {
          this.$wechat.miniProgram.navigateTo({url: `${ENV.MiniRouter.product}?id=${item.productid}&wid=${item.uploader}`})
        } else {
          this.$wechat.miniProgram.navigateTo({url: `${ENV.MiniRouter.activity}?id=${item.id}&wid=${item.uploader}`})
        }
      } else {
        if (item.type === 'groupbuy') {
          let params = {id: item.productid, wid: item.uploader}
          this.$router.push({path: '/product', query: params})
        } else {
          let params = {id: item.id, wid: item.uploader}
          this.$router.push({path: '/activity', query: params})
        }
      }
    },
    toActivity (item) {
      let params = {id: item.id}
      if (this.query.from) {
        params.from = this.query.from
        this.$wechat.miniProgram.navigateTo({url: `${ENV.MiniRouter.activity}?id=${item.id}&wid=${item.uploader}`})
      } else {
        this.$router.push({path: '/activity', query: params})
      }
    },
    toNews (item) {
      let params = {id: item.id, wid: item.uploader}
      if (this.query.from) {
        params.from = this.query.from
        this.$wechat.miniProgram.navigateTo({url: `${ENV.MiniRouter.news}?id=${item.id}&wid=${item.uploader}`})
      } else {
        this.$router.push({path: '/news', query: params})
      }
    },
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
    handleScroll: function () {
      const self = this
      self.$util.scrollEvent({
        element: self.$refs.scrollContainer,
        callback: function () {
          switch (self.selectedIndex1) {
            case 0:
              if (self.tabData1.length === (pageStart1 + 1) * limit) {
                pageStart1++
                self.$vux.loading.show()
                self.getData1()
              } else {
                self.$vux.loading.hide()
              }
              break
            case 1:
              if (self.tabData2.length === (pageStart2 + 1) * limit) {
                pageStart2++
                self.$vux.loading.show()
                self.getData2()
              } else {
                self.$vux.loading.hide()
              }
              break
            case 2:
              if (self.tabData3.length === (pageStart3 + 1) * limit) {
                pageStart3++
                self.$vux.loading.show()
                self.getData3()
              } else {
                self.$vux.loading.hide()
              }
              break
            case 3:
              if (self.tabData4.length === (pageStart4 + 1) * limit) {
                pageStart4++
                self.$vux.loading.show()
                self.getData4()
              } else {
                self.$vux.loading.hide()
              }
              break
          }
        }
      })
    },
    swiperChange () {
      switch (this.selectedIndex1) {
        case 0:
          if (this.tabData1.length < limit) {
            pageStart1 = 0
            this.disTabData1 = false
            this.tabData1 = []
            this.getData1()
          } else {
            this.$vux.loading.hide()
          }
          break
        case 1:
          if (this.tabData2.length < limit) {
            pageStart2 = 0
            this.disTabData2 = false
            this.tabData2 = []
            this.getData2()
          } else {
            this.$vux.loading.hide()
          }
          break
        case 2:
          if (this.tabData3.length < limit) {
            pageStart3 = 0
            this.disTabData3 = false
            this.tabData3 = []
            this.getData3()
          } else {
            this.$vux.loading.hide()
          }
          break
        case 3:
          if (this.tabData4.length < limit) {
            pageStart4 = 0
            this.disTabData4 = false
            this.tabData4 = []
            this.getData4()
          } else {
            this.$vux.loading.hide()
          }
          break
      }
    },
    getData1 () {
      const self = this
      let params = { pagestart: pageStart1, limit: limit }
      this.$http.get(`${ENV.BokaApi}/api/seller/myRetailerList`, {
        params: params
      })
      .then(res => {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabData1 = self.tabData1.concat(retdata)
        self.disTabData1 = true
      })
    },
    getData2 () {
      const self = this
      let params = { pagestart: pageStart2, limit: limit }
      this.$http.post(`${ENV.BokaApi}/api/seller/shareList/product`, params)
      .then(res => {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabData2 = self.tabData2.concat(retdata)
        self.disTabData2 = true
      })
    },
    getData3 () {
      const self = this
      let params = { pagestart: pageStart3, limit: limit }
      this.$http.post(`${ENV.BokaApi}/api/seller/shareList/activity`, params)
      .then(res => {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabData3 = self.tabData3.concat(retdata)
        self.disTabData3 = true
      })
    },
    getData4 () {
      const self = this
      let params = { pagestart: pageStart4, limit: limit }
      this.$http.post(`${ENV.BokaApi}/api/seller/shareList/news`, params)
      .then(res => {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabData4 = self.tabData4.concat(retdata)
        self.disTabData4 = true
      })
    },
    showpopup () {
      this.isshowpopup = true
    },
    closepopup () {
      this.isshowpopup = false
    },
    withdrawClick () {
      let params = {}
      if (this.query.appid) {
        params.appid = this.query.appid
      }
      if (this.query.from) {
        params.from = this.query.from
      }
      this.$router.push({path: '/userRevenue', query: params})
    },
    bringCustomerClick (type) {
      let params = {}
      if (this.query.appid) {
        params.appid = this.query.appid
      }
      if (this.query.from) {
        params.from = this.query.from
      }
      this.$router.push({path: '/bringCustomer', query: params})
    },
    bringCustomerClick1 (type) {
      let params = {type: 'buy'}
      if (this.query.appid) {
        params.appid = this.query.appid
      }
      if (this.query.from) {
        params.from = this.query.from
      }
      this.$router.push({path: '/bringCustomer', query: params})
    },
    getData () {
      const self = this
      this.$http.post(`${ENV.BokaApi}/api/seller/rebateinfo`)
      .then(res => {
        self.rebateInfo = res.data
        self.clickTabItem()
      })
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.query = this.$route.query
      if (this.query.fromappname) {
        this.platform = this.query.fromappname
      }
      this.$vux.loading.show()
      this.getData()
      this.swiperChange()
    }
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
.recommend .card-demo-content01 {
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
.radius-tab.vux-tab-wrap{
  z-index: 2;
  padding-top: 69px;
}
#to-recommend .weui-panel{margin-top: 0;}
#to-recommend .weui-panel:before{display: none;}
#to-recommend .vux-1px-r:after{top:10%;bottom:10%;}
.radius-tab .vux-tab-container{
  width: 60%;
  margin: 0 auto;
  height:35px;
}
@media only screen and (max-width:375px){
  .radius-tab .vux-tab-container{width: 50%;}
}
.radius-tab .vux-tab{
  height:35px;
}
.radius-tab .vux-tab-ink-bar{
  background-color: red;
  height: 35px !important;
}
.radius-tab .vux-tab .vux-tab-item{
  background: transparent;
  line-height:35px;
  color:red
}
.radius-tab .vux-tab-container{
  margin-top: 20px;
  border: 1px solid red;
  border-radius: 6px;
  box-sizing: border-box;
}
.radius-tab .vux-tab .vux-tab-item.vux-tab-selected{
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
#to-recommend .vux-cell-primary {
    padding-left: 10px;
}
#to-recommend .list-item .inline-desc {
    margin-top: 8px;
}
#to-recommend .date-cell {
    float: right;
    margin-right: 10px;
}
</style>
