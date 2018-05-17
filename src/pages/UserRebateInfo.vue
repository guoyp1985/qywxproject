/*
* @description: 用户返点信息页面
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div id="user-rebate">
    <view-box>
      <sticky scroll-box="user-rebate" class="sticky-area">
        <group class="rebate-title">
          <cell :title="user.linkman" class="user-info font14">
            <x-img slot="icon" :src="user.avatar" default-src="../src/assets/images/user.jpg" container="#vux_view_box_body" class="radius50"></x-img>
            <div slot="inline-desc" class="rebate-money color-gray">
              <span>{{$t('Total Income')}}:</span><span> ¥{{totalIncome}}</span>
            </div>
          </cell>
        </group>
        <tab v-model="selectedIndex">
          <tab-item selected @on-item-click="onItemClick">{{$t('Waiting To Return Money')}}</tab-item>
          <tab-item @on-item-click="onItemClick">{{$t('Waiting To Rebate')}}</tab-item>
          <tab-item @on-item-click="onItemClick">{{$t('Already Return Money')}}</tab-item>
        </tab>
      </sticky>
      <div v-show="selectedIndex===0">
        <template v-if="distabdata1">
          <template v-if="tabdata1.length">
            <group>
              <cell-box class="income-cell" v-for="(item, index) in list" :key="index" @click.native="itemClick(item)">
                <div class="checker-cell">
                  <check-icon :value.sync="item.checked" @click.native.stop="itemCheck(item)"></check-icon>
                </div>
                <div class="avatar-cell">
                  <x-img :src="item.avatar"></x-img>
                </div>
                <div class="content-cell">
                  <div class="inline-title font14">
                    {{item.storename}}
                  </div>
                  <div class="inline-desc font12 color-gray">
                    {{item.dateline | dateFormat}}
                  </div>
                </div>
                <div class="value-cell font14 color-orange6">
                  <div>{{$t('Rebate Commission')}}</div>
                  <div>¥{{item.income}}</div>
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
      <div v-show="selectedIndex===1">
        <template v-if="distabdata2">
          <template v-if="tabdata2.length">
            <group>
              <cell class="wait-cell font14" v-for="(item, index) in tabdata2" :key="index" :title="item.storename">
                <x-img slot="icon" :src="item.avatar"></x-img>
                <div slot="inline-desc" class="font12 color-gray">
                  {{item.dateline | dateFormat}}
                </div>
                <div slot="child" class="font14 color-orange6">
                  <div>{{$t('Rebate Commission')}}</div>
                  <div>¥{{item.income}}</div>
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
      <div v-show="selectedIndex===2">
        <template v-if="distabdata3">
          <template v-if="tabdata3.length">
            <group>
              <cell class="wait-cell font14" v-for="(item, index) in tabdata3" :key="index" :title="item.storename">
                <x-img slot="icon" :src="item.avatar"></x-img>
                <div slot="inline-desc" class="font12 color-gray">
                  {{item.dateline | dateFormat}}
                </div>
                <div slot="child" class="font14 color-orange6">
                  <div>{{$t('Rebate Commission')}}</div>
                  <div>¥{{item.income}}</div>
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
      <div class="footer-bar" slot="bottom" v-show="selectedIndex===0">
        <div class="checker-cell">
          <check-icon :value.sync="globalChecked" @click.native="checkedAll">{{$t('All Checked')}}</check-icon>
        </div>
        <div class="count-cell">
          <span>{{$t('Total')}}:</span>
          <span class="color-orange6">¥{{total}}</span>
        </div>
        <div class="button-cell">
          <x-button class="withdraw-btn">{{$t('Withdraw')}}</x-button>
        </div>
      </div>
    </view-box>
  </div>
</template>
<script>
import { ViewBox, Group, Cell, CellBox, Tab, TabItem, Sticky, XImg, CheckIcon, XButton } from 'vux'
import ENV from 'env'
import Time from '#/time'
import { User } from '#/storage'
export default {
  components: {
    ViewBox, Group, Cell, CellBox, Tab, TabItem, Sticky, XImg, CheckIcon, XButton
  },
  data () {
    return {
      user: {},
      // userName: 'simon',
      // avatar: '',
      totalIncome: 0,
      total: 0,
      list: [
        {
          id: '1',
          storename: 'abc',
          avatar: '',
          dateline: 1523446874216,
          income: 10000,
          checked: false
        },
        {
          id: '1',
          storename: 'abc',
          avatar: '',
          dateline: 1523446874216,
          income: 10000,
          checked: false
        },
        {
          id: '1',
          storename: 'abc',
          avatar: '',
          dateline: 1523446874216,
          income: 10000,
          checked: false
        }
      ],
      list1: [
        {
          id: '1',
          storename: 'abc',
          avatar: '',
          dateline: 1523446874216,
          income: 10000
        }
      ],
      list2: [],
      selectedIndex: 0,
      globalChecked: false,
      distabdata1: false,
      distabdata2: false,
      distabdata3: false,
      tabdata1: [],
      tabdata2: [],
      tabdata3: [],
      limit: 20,
      pagestart1: 0,
      pagestart2: 0,
      pagestart3: 0,
      isBindScroll1: false,
      isBindScroll2: false,
      isBindScroll3: false,
      scrollArea1: null,
      scrollArea2: null,
      scrollArea3: null,
      scrollContainer: document.querySelector('#vux_view_box_body')
    }
  },
  filters: {
    dateFormat (date) {
      return new Time(date).format()
    }
  },
  methods: {
    scroll1: function () {
      const self = this
      self.$util.scrollEvent({
        element: self.scrollArea1,
        callback: function () {
          if (self.tabdata1.length === (self.pagestart1 + 1) * self.limit) {
            self.pagestart1++
            self.$vux.loading.show()
            self.getdata1()
          }
        }
      })
    },
    scroll2: function () {
      const self = this
      self.$util.scrollEvent({
        element: self.scrollArea2,
        callback: function () {
          if (self.tabdata2.length === (self.pagestart2 + 1) * self.limit) {
            self.pagestart2++
            self.$vux.loading.show()
            self.getdata2()
          }
        }
      })
    },
    scroll3: function () {
      const self = this
      self.$util.scrollEvent({
        element: self.scrollArea3,
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
      let params = { cashed: 0, pagestart: self.pagestart1, limit: self.limit }
      self.$http.post(`${ENV.BokaApi}/api/seller/rebateList`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabdata1 = self.tabdata1.concat(retdata)
        self.distabdata1 = true
      })
    },
    getdata2 () {
      const self = this
      let params = { cashed: 2, pagestart: self.pagestart1, limit: self.limit }
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
      let params = { cashed: 1, pagestart: self.pagestart1, limit: self.limit }
      self.$http.post(`${ENV.BokaApi}/api/seller/rebateList`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabdata3 = self.tabdata3.concat(retdata)
        self.distabdata3 = true
      })
    },
    onItemClick (index) {
      const self = this
      if (index === 0) {
        self.scrollContainer.removeEventListener('scroll', self.scroll1)
        self.scrollContainer.addEventListener('scroll', self.scroll1)
        if (self.pagestart1 > 0) {
          self.$vux.loading.show()
          self.getdata1()
        }
      } else if (index === 1) {
        self.scrollContainer.removeEventListener('scroll', self.scroll2)
        self.scrollContainer.addEventListener('scroll', self.scroll2)
        if (self.pagestart2 === 0 && !self.isBindScroll2) {
          self.$vux.loading.show()
          self.getdata2()
        }
      } else if (index === 2) {
        self.scrollContainer.removeEventListener('scroll', self.scroll3)
        self.scrollContainer.addEventListener('scroll', self.scroll3)
        if (self.pagestart3 === 0 && !self.isBindScroll3) {
          self.$vux.loading.show()
          self.getdata3()
        }
      }
    },
    itemClick (item) {
      item.checked = !item.checked
      this.itemCheck(item)
    },
    itemCheck (item) {
      if (item.checked) {
        let prev = true
        for (let item of this.list) {
          prev = prev && item.checked
        }
        this.globalChecked = prev
        this.total += item.income
      } else {
        this.globalChecked = item.checked
        this.total -= item.income
      }
    },
    checkedAll () {
      let totalCount = 0
      if (this.globalChecked) {
        for (let item of this.list) {
          item.checked = true
          totalCount += item.income
        }
      } else {
        for (let item of this.list) {
          item.checked = false
        }
      }
      this.total = totalCount
    },
    getData () {
      const self = this
      const uid = this.$route.query.uid
      this.$http.post(`${ENV.BokaApi}/api/seller/rebateList`, {uid: uid})
      .then(res => {
        self.totalIncome = res.data.special
      })
    }
  },
  created () {
    const self = this
    this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
    this.user = User.get()
    self.$vux.loading.show()
    self.scrollContainer.removeEventListener('scroll', self.scroll1)
    self.scrollContainer.addEventListener('scroll', self.scroll1)
    self.getdata1()
  }
}
</script>
<style lang="less">
#user-rebate {
  height: 100%
}
#user-rebate .sticky-area {
  background-color: #f7f7f7;
}
#user-rebate .rebate-title {
  margin-bottom: 10px;
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
  background-color: #ff9900;
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
  color: #ff9900;
}
</style>
