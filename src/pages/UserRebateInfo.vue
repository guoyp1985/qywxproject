/*
* @description: 用户返点信息页面
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div id="user-rebate" class="containerarea font14">
    <div class="s-topbanner s-topbanner1">
      <tab v-model="selectedIndex" class="v-tab">
        <tab-item v-for="(item,index) in tabtxts" :selected="index == selectedIndex" :key="index" @on-item-click="swiperChange">{{item}}</tab-item>
      </tab>
    </div>
    <div class="s-container s-container1">
      <!-- <swiper v-model="selectedIndex" class="x-swiper no-indicator" @on-index-change="swiperChange">
        <swiper-item v-for="(tabitem, index) in tabtxts" :key="index"> -->
          <div v-show="(selectedIndex == 0)" class="swiper-inner scroll-container1" ref="scrollContainer1" @scroll="handleScroll('scrollContainer1',0)">
            <template v-if="distabdata1">
              <div v-if="!tabdata1.length" class="flex_empty">
                <div>
                  <div class="align_center"><i class="al al-wushuju font60" ></i></div>
                  <div class="mt5 align_center">暂无待返点记录！</div>
                </div>
              </div>
              <div v-else v-for="(item,index1) in tabdata1" :key="index1" class="scroll_item bg-white mt10 list-shadow">
                <div class="pl12 pr12 pt10 pb10">
                  <div class="t-table">
                    <div class="t-cell pic v_middle w45 pr10 border-box">
                      <img class="avatarimg6 imgcover" :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';"/>
                    </div>
                    <div class="t-cell v_middle" style="color:inherit;">
                      <div class="clamp1 color-999">{{item.username}}</div>
                    </div>
                    <div class="t-cell v_middle" style="color:inherit;">
                      <div class="clamp1 font12 color-999 disdate align_right">{{ item.dateline }}</div>
                    </div>
                  </div>
                </div>
                <div class="pl12 pr12 pt10 pb10 border-box bg-page-product">
                  <div class="clamp1 font14 color-999"><span class="color-orange7 mr5">{{item.content}}</span><span>{{$t('RMB')}}{{item.money}}</span></div>
                  <div class="clamp1 font14 color-gray">店铺: {{ item.title }}</div>
                </div>
              </div>
            </template>
          </div>
          <div v-show="(selectedIndex == 1)" class="swiper-inner scroll-container2" ref="scrollContainer2" @scroll="handleScroll('scrollContainer2',1)">
            <template v-if="distabdata2">
              <div v-if="!tabdata2.length" class="flex_empty">
                <div>
                  <div class="align_center"><i class="al al-wushuju font60" ></i></div>
                  <div class="mt5 align_center">暂无已返点记录！</div>
                </div>
              </div>
              <div v-else v-for="(item,index1) in tabdata2" :key="index1" class="scroll_item bg-white mt10 list-shadow">
                <div class="pl12 pr12 pt10 pb10">
                  <div class="t-table">
                    <div class="t-cell pic v_middle w45 pr10 border-box">
                      <img class="avatarimg6 imgcover" :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';"/>
                    </div>
                    <div class="t-cell v_middle" style="color:inherit;">
                      <div class="clamp1 color-999">{{item.username}}</div>
                    </div>
                    <div class="t-cell v_middle" style="color:inherit;">
                      <div class="clamp1 font12 color-999 disdate align_right">{{ item.dateline }}</div>
                    </div>
                  </div>
                </div>
                <div class="pl12 pr12 pt10 pb10 border-box bg-page-product">
                  <div class="clamp1 font14 color-999"><span class="color-orange7 mr5">{{item.content}}</span><span>{{$t('RMB')}}{{item.money}}</span></div>
                  <div class="clamp1 font14 color-gray">店铺: {{ item.title }}</div>
                </div>
              </div>
            </template>
          </div>
          <div v-show="(selectedIndex == 2)" class="swiper-inner scroll-container3" ref="scrollContainer3" @scroll="handleScroll('scrollContainer3',2)">
            <template v-if="distabdata3">
              <div v-if="!tabdata3.length" class="flex_empty">
                <div>
                  <div class="align_center"><i class="al al-wushuju font60" ></i></div>
                  <div class="mt5 align_center">暂无提现记录！</div>
                </div>
              </div>
              <div v-else v-for="(item,index1) in tabdata3" :key="index1" class="scroll_item bg-white mt10 list-shadow">
                <div class="pl12 pr12 pt10 pb10">
                  <div class="db-flex">
                    <div class="flex_cell flex_left">
                      <div class="w_100">
                        <div><span>{{item.cashtypetext}}</span><span v-if="item.status == 1" class="color-green2">【{{item.statustext}}】</span><span v-else class="color-theme">【{{item.statustext}}】</span></div>
                        <div class="mt5 color-gray" v-if="item.cmms && item.cmms > 0">手续费: {{ $t('RMB') }}{{item.cmms}}</div>
                        <div class="color-theme mt5" v-if="item.reason && item.reason != ''">{{item.reason}}</div>
                        <div class="mt5 font12 clamp1 color-gray">{{ item.dateline | dateFormat }}</div>
                      </div>
                    </div>
                    <div class="w100 flex_right">
                      <div class="clamp1">{{ $t('RMB') }}{{item.money}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        <!-- </swiper-item>
      </swiper> -->
    </div>
    <div v-transfer-dom>
      <popup class="bg-white" v-model="showMoneyPopup" position="bottom">
        <div class="">
          <div class="padding10">本次提现金额为 <span class='color-red'>{{summoney}} 元</span></div>
          <div class="pb20">
            <check-icon class="red-check" :value.sync="wechatCash" @click.native.stop="setCashType()">提现到微信</check-icon>
            <check-icon class="red-check" :value.sync="bankCash" @click.native.stop="setCashType('bank')">提现到银行卡</check-icon>
          </div>
        </div>
        <div class="flex_center" style="width:100%;height:45px;">
          <div class="flex_cell bg-gray color-white h_100 flex_center" @click="closeMoneyPopup">取消</div>
          <div class="flex_cell bg-red color-white h_100 flex_center" @click="getCash">确认提现</div>
        </div>
      </popup>
    </div>
  </div>
</template>
<script>
import { TransferDom, ViewBox, Group, Cell, CellBox, Tab, TabItem, Swiper, SwiperItem, Sticky, XImg, CheckIcon, XButton, Popup } from 'vux'
import { User } from '#/storage'
import ENV from 'env'
import Time from '#/time'

const limit = 10
let pageStart1 = 0
let pageStart2 = 0
let pageStart3 = 0

export default {
  directives: {
    TransferDom
  },
  components: {
    ViewBox, Group, Cell, CellBox, Tab, TabItem, Swiper, SwiperItem, Sticky, XImg, CheckIcon, XButton, Popup
  },
  data () {
    return {
      query: {},
      tabtxts: [ '待返点', '已返点', '提现明细' ],
      rebateInfo: {},
      total: '0.00',
      selectedIndex: 0,
      globalChecked: true,
      checkedData: [],
      distabdata1: false,
      distabdata2: false,
      distabdata3: false,
      tabdata1: [],
      tabdata2: [],
      tabdata3: [],
      eventIng: false,
      summoney: '0.00',
      showMoneyPopup: false,
      wechatCash: true,
      bankCash: false
    }
  },
  filters: {
    dateFormat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  methods: {
    clickCash () {
      this.showMoneyPopup = true
    },
    closeMoneyPopup () {
      this.showMoneyPopup = false
    },
    setCashType (type) {
      if (type === 'bank') {
        this.bankCash = true
        this.wechatCash = false
      } else {
        this.bankCash = false
        this.wechatCash = true
      }
    },
    handleScroll: function (refname, index) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          if (index === 0) {
            if (self.tabdata1.length === (pageStart1 + 1) * limit) {
              pageStart1++
              self.$vux.loading.show()
              self.getData1()
            }
          } else if (index === 1) {
            if (self.tabdata2.length === (pageStart2 + 1) * limit) {
              pageStart2++
              self.$vux.loading.show()
              self.getData2()
            }
          } else if (index === 2) {
            if (self.tabdata3.length === (pageStart3 + 1) * limit) {
              pageStart3++
              self.$vux.loading.show()
              self.getData3()
            }
          }
        }
      })
    },
    getData1 () {
      this.$vux.loading.show()
      const self = this
      const params = { cashed: 2, from: 'seller', pagestart: pageStart1, limit: limit }
      self.$http.get(`${ENV.BokaApi}/api/accounting/list`, {
        params: params
      }).then(res => {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        self.summoney = data.summoney ? data.summoney : '0.00'
        if (self.globalChecked) {
          for (let i = 0; i < retdata.length; i++) {
            retdata[i].checked = true
            self.checkedData.push(retdata[i].id)
            self.total = (parseFloat(self.total) + parseFloat(retdata[i].money.replace(/,/g, ''))).toFixed(2)
          }
        }
        self.rebateInfo = data
        self.tabdata1 = self.tabdata1.concat(retdata)
        self.distabdata1 = true
      })
    },
    getData2 () {
      this.$vux.loading.show()
      const self = this
      const params = { cashed: 0, from: 'seller', pagestart: pageStart2, limit: limit }
      self.$http.get(`${ENV.BokaApi}/api/accounting/list`, {
        params: params
      }).then(res => {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        self.tabdata2 = self.tabdata2.concat(retdata)
        self.distabdata2 = true
      })
    },
    getData3 () {
      this.$vux.loading.show()
      const self = this
      const params = { pagestart: pageStart3, limit: limit }
      self.$http.post(`${ENV.BokaApi}/api/accounting/cashList`, params).then(res => {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        self.tabdata3 = self.tabdata3.concat(retdata)
        self.distabdata3 = true
      })
    },
    swiperChange (index) {
      console.log('in swiperchange')
      if (index !== undefined) {
        this.selectedIndex = index
      }
      switch (this.selectedIndex) {
        case 0:
          if (this.tabdata1.length < limit) {
            pageStart1 = 0
            this.distabdata1 = false
            this.total = '0.00'
            this.tabdata1 = []
            this.getData1()
          }
          break
        case 1:
          if (this.tabdata2.length < limit) {
            pageStart2 = 0
            this.distabdata2 = false
            this.tabdata2 = []
            this.getData2()
          }
          break
        case 2:
          if (this.tabdata3.length < limit) {
            pageStart3 = 0
            this.distabdata3 = false
            this.tabdata3 = []
            this.getData3()
          }
          break
      }
    },
    itemClick (item) {
      item.checked = !item.checked
      this.itemCheck(item)
    },
    itemCheck (item) {
      const self = this
      let curmoney = parseFloat(item.money.replace(/,/g, ''))
      if (item.checked) {
        self.checkedData.push(item.id)
        self.total = (parseFloat(self.total) + curmoney).toFixed(2)
      } else {
        self.globalChecked = false
        self.$util.deleteValue(self.checkedData, item.id)
        self.total = (parseFloat(self.total) - curmoney).toFixed(2)
      }
    },
    checkedAll () {
      const self = this
      self.total = '0.00'
      self.checkedData = []
      for (let i = 0; i < self.tabdata1.length; i++) {
        let d = self.tabdata1[i]
        if (self.globalChecked) {
          self.checkedData.push(d.id)
          self.tabdata1[i].checked = true
          self.total = (parseFloat(self.total) + parseFloat(d.money.replace(/,/g, ''))).toFixed(2)
        } else {
          delete self.tabdata1[i].checked
        }
      }
    },
    getCash () {
      const self = this
      if (!self.eventIng) {
        self.eventIng = true
        let fromPage = encodeURIComponent('/userRebateInfo')
        if (!self.loginUser.idcardno) {
          self.eventIng = false
          self.$router.push({path: '/authPhoto', query: {fromPage: fromPage}})
        } else {
          this.showMoneyPopup = false
          let cashstr = '微信'
          let cashtype = 'lingqian'
          if (this.bankCash) {
            cashstr = '银行卡'
            cashtype = 'yinhang'
          }
          if (this.bankCash && (!this.loginUser.bankcardno || this.loginUser.bankcardno === '')) {
            self.eventIng = false
            self.$vux.confirm.show({
              content: `您还没有绑定银行卡`,
              confirmText: '去绑定',
              onConfirm: () => {
                self.$router.push({path: '/bindingBank', query: {fromPage: fromPage}})
              }
            })
            return false
          }
          self.$vux.confirm.show({
            content: `本次提现金额为<span class='color-orange'>${self.summoney}元</span>，确认提现到${cashstr}吗？`,
            onConfirm () {
              self.$vux.loading.show()
              let postData = {type: cashtype, money: self.summoney}
              if (self.query.appid) {
                postData.appid = self.query.appid
              }
              self.$http.post(`${ENV.BokaApi}/api/accounting/cashMoney`, postData).then(function (res) {
                let data = res.data
                self.$vux.loading.hide()
                self.$vux.toast.show({
                  text: data.error,
                  time: self.$util.delay(data.error),
                  onHide: function () {
                    if (data.flag === 1) {
                      self.total = '0.00'
                      self.tabdata1 = []
                      self.summoney = '0.00'
                    }
                    self.eventIng = false
                  }
                })
              })
            }
          })
        }
      }
    },
    getData () {
      this.swiperChange()
    },
    initData () {
      pageStart1 = 0
      pageStart2 = 0
      pageStart3 = 0
      this.selectedIndex = 0
      this.distabdata1 = false
      this.distabdata2 = false
      this.distabdata3 = false
      this.tabdata1 = []
      this.tabdata2 = []
      this.tabdata3 = []
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.initData()
      this.query = this.$route.query
      this.loginUser = User.get()
      if (this.query.flag === '1' || this.query.flag === 1) {
        this.selectedIndex = 1
      } else if (this.query.flag === '2' || this.query.flag === 2) {
        this.selectedIndex = 2
      }
      console.log(this.selectedIndex)
      this.getData()
    }
  },
  activated () {
    this.refresh()
  }
}
</script>
<style lang="less">
#user-rebate .sticky-area {
  background-color: #f7f7f7;
}
#user-rebate .user-info img{
  width: 60px;
  height: 60px;
}
#user-rebate .rebate-money {
  margin-top: 4px;
}
#user-rebate .rebate-money span:last-of-type {
  color: #ff9900;
}
#user-rebate .income-cell {
  display: flex;
  padding: 10px;
}
#user-rebate .income-cell .avatar-cell {
  display: flex;
}
#user-rebate .wait-cell img,
#user-rebate .income-cell .avatar-cell img {
  width: 40px;
  height: 40px;
}
#user-rebate .income-cell .checker-cell {
  margin-right: 4px;
}
#user-rebate .income-cell .content-cell,
#user-rebate .income-cell .value-cell {
  line-height: 19px;
}
#user-rebate .income-cell .content-cell {
  flex: 1;
  padding-left: 10px;
}
#user-rebate .income-cell .value-cell {
  width: 60px;
}
#user-rebate .footer-bar {
  display: flex;
  position: absolute;
  z-index: 500;
  bottom: 0;
  width: 100%;
  height: 50px;
  background-color: #ffffff;
}
#user-rebate .footer-bar:before {
  content: ' ';
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #d9d9d9;
  position: absolute;
}

#user-rebate .footer-bar .checker-cell,
#user-rebate .footer-bar .count-cell {
  display: flex;
  align-items: center;
}
#user-rebate .footer-bar .checker-cell {padding: 0 10px;}
#user-rebate .footer-bar .count-cell {flex: 1;}
#user-rebate .footer-bar .count-cell span + span {
  margin-left: 4px;
}
#user-rebate .footer-bar .button-cell{
  width: 80px;
}
#user-rebate .withdraw-btn {
  border-radius: 0px;
  background-color:red;
  color: #ffffff;
  height: 100%
}
/* vux css hack */
#user-rebate .weui-cell__hd {
  display: flex;
}
#user-rebate .vux-cell-primary {
  padding-left: 10px;
}
#user-rebate .weui-cells {
  margin-top: 0;
}
#user-rebate .weui-cells:before {
  height: 0;
  border-top: none;
}
#user-rebate .vux-check-icon > .weui-icon-success:before,
#user-rebate .vux-check-icon > .weui-icon-success-circle:before {
  color:red;
}
</style>
