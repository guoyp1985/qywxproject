<template>
  <div id="user-rebate">
    <view-box>
      <sticky scroll-box="user-rebate" class="sticky-area">
        <group class="rebate-title">
          <cell :title="userName" class="user-info font14">
            <img slot="icon" :src="avatar" class="radius50"/>
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
        <template v-if="list.length">
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
      </div>
      <div v-show="selectedIndex===1">
        <template v-if="list1.length">
          <group>
            <cell class="wait-cell font14" v-for="(item, index) in list1" :key="index" :title="item.storename">
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
      </div>
      <div v-show="selectedIndex===2">
        <template v-if="list2.length">
          <group>
            <cell class="wait-cell font14" v-for="(item, index) in list2" :key="index" :title="item.storename">
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
      </div>
    </view-box>
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
  </div>
</template>
<script>
import { ViewBox, Group, Cell, CellBox, Tab, TabItem, Sticky, XImg, CheckIcon, XButton } from 'vux'
import Time from '#/time'
export default {
  components: {
    ViewBox,
    Group,
    Cell,
    CellBox,
    Tab,
    TabItem,
    Sticky,
    XImg,
    CheckIcon,
    XButton
  },
  data () {
    return {
      userName: 'simon',
      avatar: '',
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
      globalChecked: false
    }
  },
  filters: {
    dateFormat (date) {
      return new Time(date).format()
    }
  },
  methods: {
    onItemClick () {

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
    }
  },
  created () {
    this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
  }
}
</script>
<style>
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
