/*
* @description: 用户返点信息页面
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div id="user-rebate" class="containerarea font14">
    <div class="s-topbanner s-topbanner1">
      <tab v-model="selectedIndex" class="v-tab">
        <tab-item selected>{{$t('Waiting To Return Money')}}</tab-item>
        <tab-item>{{$t('Waiting To Rebate')}}</tab-item>
        <tab-item>{{$t('Already Return Money')}}</tab-item>
      </tab>
    </div>
    <div class="s-container s-container1">
      <swiper v-model="selectedIndex" class="x-swiper no-indicator" @on-index-change="swiperChange">
        <swiper-item v-for="(tabitem, index) in tabtxts" :key="index">
          <div v-if="(index == 0)" class="swiper-inner scroll-container1" style="bottom:50px;" ref="scrollContainer1" @scroll="handleScroll1">
            <template v-if="distabdata1">
              <template v-if="tabdata1.length">
                <group>
                  <cell-box class="income-cell" v-for="(item, index) in tabdata1" :key="index" @click.native="itemClick(item)">
                    <div class="checker-cell">
                      <check-icon :value.sync="item.checked" @click.native.stop="itemCheck(item)"></check-icon>
                    </div>
                    <div class="avatar-cell">
                      <x-img :src="item.photo" class="imgcover" default-src="/src/assets/images/nopic.jpg" container=".scroll-container1"></x-img>
                    </div>
                    <div slot="inline-desc">
                      <div class="clamp1">{{item.username}}</div>
                      <div class="clamp1">店铺: {{item.title}}</div>
                      <div class="clamp1 font12 color-gray">{{item.dateline | dateFormat}}</div>
                    </div>
                    <div class="value-cell font14 color-red align_center" style="width:120px;">
                      <div class="clamp1">{{item.content}}</div>
                      <div class="clamp1">{{$t('RMB')}}{{item.money}}</div>
                    </div>
                  </cell-box>
                </group>
              </template>
              <template v-else>
                <div class="no-related-x color-gray">
                  <span>{{$t('No Related Orders')}}</span>
                </div>
              </template>
            </template>
          </div>
          <div v-if="(index == 0)" class="footer-bar">
            <div class="checker-cell">
              <check-icon :value.sync="globalChecked" @click.native="checkedAll">{{$t('All Checked')}}</check-icon>
            </div>
            <div class="count-cell">
              <span>{{$t('Total')}}:</span>
              <span class="color-red">¥{{total}}</span>
            </div>
            <div class="button-cell">
              <x-button class="withdraw-btn" @click.native="getCash">{{$t('Withdraw')}}</x-button>
            </div>
          </div>
          <div v-if="(index == 1)" class="swiper-inner scroll-container2" ref="scrollContainer2" @scroll="handleScroll2">
            <template v-if="distabdata2">
              <template v-if="tabdata2.length">
                <group>
                  <cell class="wait-cell font14" v-for="(item, index) in tabdata2" :key="index">
                    <x-img slot="icon" :src="item.photo" class="imgcover" default-src="/src/assets/images/nopic.jpg" container=".scroll-container2"></x-img>
                    <div slot="inline-desc">
                      <div class="clamp1">{{item.username}}</div>
                      <div class="clamp1">店铺: {{item.title}}</div>
                      <div class="clamp1 font12 color-gray">{{item.dateline | dateFormat}}</div>
                    </div>
                    <div class="value-cell font14 color-red align_center" style="width:120px;">
                      <div class="clamp1">{{item.content}}</div>
                      <div class="clamp1">{{$t('RMB')}}{{item.money}}</div>
                    </div>
                  </cell>
                </group>
              </template>
              <template v-else>
                <div class="no-related-x color-gray">
                  <span>{{$t('No Related Orders')}}</span>
                </div>
              </template>
            </template>
          </div>
          <div v-if="(index == 2)" class="swiper-inner scroll-container3" ref="scrollContainer3" @scroll="handleScroll3">
            <template v-if="distabdata3">
              <template v-if="tabdata3.length">
                <group>
                  <cell class="wait-cell font14" v-for="(item, index) in tabdata3" :key="index">
                    <x-img slot="icon" :src="item.photo" class="imgcover" default-src="/src/assets/images/nopic.jpg" container=".scroll-container3"></x-img>
                    <div slot="inline-desc">
                      <div class="clamp1">{{item.username}}</div>
                      <div class="clamp1">店铺: {{item.title}}</div>
                      <div class="clamp1 font12 color-gray">{{item.dateline | dateFormat}}</div>
                    </div>
                    <div class="value-cell font14 color-red align_center" style="width:120px;">
                      <div class="clamp1">{{item.content}}</div>
                      <div class="clamp1">{{$t('RMB')}}{{item.money}}</div>
                    </div>
                  </cell>
                </group>
              </template>
              <template v-else>
                <div class="no-related-x color-gray">
                  <span>{{$t('No Related Orders')}}</span>
                </div>
              </template>
            </template>
          </div>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>
<script>
import { ViewBox, Group, Cell, CellBox, Tab, TabItem, Swiper, SwiperItem, Sticky, XImg, CheckIcon, XButton } from 'vux'
import ENV from 'env'
import Time from '#/time'
import { User } from '#/storage'
export default {
  components: {
    ViewBox, Group, Cell, CellBox, Tab, TabItem, Swiper, SwiperItem, Sticky, XImg, CheckIcon, XButton
  },
  data () {
    return {
      query: Object,
      tabtxts: [ '待提现', '待返点', '已提现' ],
      user: {},
      rebateInfo: {},
      totalIncome: 0,
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
      limit: 20,
      pagestart1: 0,
      pagestart2: 0,
      pagestart3: 0
    }
  },
  filters: {
    dateFormat (date) {
      return new Time(date).format()
    }
  },
  methods: {
    handleScroll1: function () {
      const self = this
      self.$util.scrollEvent({
        element: self.$refs.scrollContainer1[0],
        callback: function () {
          if (self.tabdata1.length === (self.pagestart1 + 1) * self.limit) {
            self.pagestart1++
            self.$vux.loading.show()
            self.getdata1()
          }
        }
      })
    },
    handleScroll2: function () {
      const self = this
      self.$util.scrollEvent({
        element: self.$refs.scrollContainer2[0],
        callback: function () {
          if (self.tabdata2.length === (self.pagestart2 + 1) * self.limit) {
            self.pagestart2++
            self.$vux.loading.show()
            self.getdata2()
          }
        }
      })
    },
    handleScroll3: function () {
      const self = this
      self.$util.scrollEvent({
        element: self.$refs.scrollContainer3[0],
        callback: function () {
          if (self.tabdata3.length === (self.pagestart3 + 1) * self.limit) {
            self.pagestart3++
            self.$vux.loading.show()
            self.getdata3()
          }
        }
      })
    },
    getdata1 () {
      const self = this
      let params = { cashed: 0, from: 'user', pagestart: self.pagestart1, limit: self.limit }
      self.$http.post(`${ENV.BokaApi}/api/seller/rebateList`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
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
    getdata2 () {
      const self = this
      let params = { cashed: 2, from: 'user', pagestart: self.pagestart1, limit: self.limit }
      self.$http.post(`${ENV.BokaApi}/api/seller/rebateList`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabdata2 = self.tabdata2.concat(retdata)
        self.distabdata2 = true
      })
    },
    getdata3 () {
      const self = this
      let params = { cashed: 1, from: 'user', pagestart: self.pagestart1, limit: self.limit }
      self.$http.post(`${ENV.BokaApi}/api/seller/rebateList`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabdata3 = self.tabdata3.concat(retdata)
        self.distabdata3 = true
      })
    },
    swiperChange (index) {
      const self = this
      if (index === 0 && self.tabdata1.length === 0) {
        self.$vux.loading.show()
        self.getdata1()
      } else if (index === 1 && self.tabdata2.length === 0) {
        self.$vux.loading.show()
        self.getdata2()
      } else if (index === 2 && self.tabdata3.length === 0) {
        self.$vux.loading.show()
        self.getdata3()
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
    getData () {
      const self = this
      const uid = this.$route.query.uid
      this.$http.post(`${ENV.BokaApi}/api/seller/rebateList`, {uid: uid})
      .then(res => {
        self.totalIncome = res.data.special
      })
    },
    getCash () {
      const self = this
      if (self.checkedData.length === 0) {
        self.$vux.toast.show({
          text: '请选择提现数据'
        })
        return false
      }
      self.$vux.confirm.show({
        content: `本次提现金额为<span class='color-orange'>${self.total}元</span>，确认提现吗？`,
        onConfirm () {
          self.$vux.loading.show()
          let subdata = { ids: self.checkedData, identity: 'seller' }
          self.$http.post(`${ENV.BokaApi}/api/accounting/getCash`, subdata).then(function (res) {
            let data = res.data
            self.$vux.loading.hide()
            self.$vux.toast.show({
              text: data.error,
              time: self.$util.delay(data.error),
              onHide: function () {
                if (data.flag === 1) {
                  for (let i = 0; i < self.checkedData.length; i++) {
                    let ckid = self.checkedData[i]
                    for (let j = 0; j < self.tabdata1.length; j++) {
                      if (self.tabdata1[j].id === ckid) {
                        self.tabdata1.splice(j, 1)
                        break
                      }
                    }
                  }
                  self.total = '0.00'
                }
              }
            })
          })
        }
      })
    }
  },
  created () {
    const self = this
    this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
    this.user = User.get()
    self.query = self.$route.query
    self.$vux.loading.show()
    self.getdata1()
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
#user-rebate .footer-bar .checker-cell {
  width: 80px;
  padding: 0 10px;
}
#user-rebate .footer-bar .count-cell {
  flex: 1;
  margin: 2px 0 0 10px;
}
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
