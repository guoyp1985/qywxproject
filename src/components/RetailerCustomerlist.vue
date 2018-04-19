<template>
<<<<<<< HEAD
  <div class="containerarea bg-white">
=======
  <div class="containerarea">
>>>>>>> 25ba8f0938d571307dda639b762880ec13c7c827
    <div class="s-topbanner">
      <div class="row">
        <div class="bg"></div>
        <div class="flex_center h_100">
          <div class="flex_cell font18 pl20">{{$t('Contact customer')}}</div>
        </div>
      </div>
      <div class="row">
        <tab v-model="tabmodel" class="x-tab" active-color="#fff" default-color="#fff">
          <tab-item v-for="(item,index) in tabtxts" :selected="index == 0" :key="index">{{item}}</tab-item>
        </tab>
      </div>
    </div>
    <div class="s-container">
      <swiper v-model="tabmodel" class="x-swiper no-indicator">
        <swiper-item v-for="(tabitem, index) in tabtxts" :key="index">
          <div v-if="(index == 0)">
            <search
              class="x-search"
              position="absolute"
              auto-scroll-to-top top="0px"
              @on-focus="onFocus"
              @on-cancel="onCancel"
              @on-submit="onSubmit"
              ref="search">
            </search>
            <div class="font12 padding10 b_bottom">
              <div class="t-table w_100">
                <div class="t-cell align_left pl10">{{ $t('Customer text') }}(共{{ levelcount1 }}人)</div>
                <div class="t-cell align_right pr10">{{ $t('Percent') }}</div>
              </div>
            </div>
            <div class="scroll_list pl10 pr10">
              <Listplate v-for="(item,index) in customerdata1" :key="item.id">
                <img slot="pic" :src="item.avatar" class="avatarimg1" />
                <div slot="title" class="flex_left" style="height:55px;">
                  <div class="t-table w_100 h_100">
                    <div class="t-cell align_left h_100">
                      <div class="clamp1 font14">{{item.linkman}}</div>
                      <div class="clamp1 mt5 font12 color-gray">返点客户：{{item.uploadname}}</div>
                    </div>
                    <div class="t-cell w60 h_100">
                      <div class="w_100 h_100 flex_right">
                        <div class="percentarea db-in">
                          <div class="inner" :style="`width:${item.percent}%`"></div>
                          <div class="txt font12">{{ item.percent }}%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="qbtn bg-green color-white">联系</div>
              </Listplate>
            </div>
          </div>
          <div v-if="(index == 1)">
            <search
              class="x-search"
              position="absolute"
              auto-scroll-to-top top="0px"
              @on-focus="onFocus"
              @on-cancel="onCancel"
              @on-submit="onSubmit"
              ref="search">
            </search>
            <div class="font12 padding10 b_bottom">
              <div class="t-table w_100">
                <div class="t-cell align_left pl10">{{ $t('Customer text') }}(共{{ levelcount5 }}人)</div>
                <div class="t-cell align_right pr10">{{ $t('Contact customer') }}</div>
              </div>
            </div>
            <div class="scroll_list pl10 pr10">
              <Listplate v-for="(item,index) in customerdata5" :key="item.id">
                <img slot="pic" :src="item.avatar" class="avatarimg1" />
                <div slot="title" class="clamp1 font14">{{item.linkman}}</div>
                <div slot="title" class="clamp1 mt5 font12 color-gray">返点客户：{{item.uploadname}}</div>
                <div class="qbtn bg-green color-white">联系</div>
              </Listplate>
            </div>
          </div>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>

<i18n>
Contact customer:
  zh-CN: 联系客户
Customer text:
  zh-CN: 客户
Percent:
  zh-CN: 成交概率
</i18n>

<script>
import { Tab, TabItem, Swiper, SwiperItem, Search, XTextarea, Group } from 'vux'
import Listplate from './Listplate'

export default {
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    Search,
    Listplate,
    XTextarea,
    Group
  },
<<<<<<< HEAD
  created () {
    this.$store.commit('updateToggleTabbar', {toggleBar: false})
  },
=======
>>>>>>> 25ba8f0938d571307dda639b762880ec13c7c827
  data () {
    return {
      tabtxts: [ '潜在客户', '成交消息' ],
      levelcount1: 15,
      levelcount5: 10,
      tabmodel: 0,
      customerdata1: [
        {
          id: '1', uid: '51', percent: 80.02, dateline: 1522221270, linkman: '艳绝天下', uploadname: '贪吃小松鼠', sales: '1.00', avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/51.jpg'
        },
        {
          id: '2', uid: '272', percent: 80.16, dateline: 1522221270, linkman: '周学江', uploadname: 'zxj', sales: '0.00', avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/272.jpg'
        },
        {
          id: '3', uid: '29', percent: 80.13, dateline: 1522221270, linkman: '销售宝技术支持', uploadname: '网络影响力', sales: '1214.00', avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/29.jpg'
        },
        {
          id: '4', uid: '4', percent: 60.02, dateline: 1522221270, linkman: '销售宝技术支持', uploadname: '楚风越韵  🏠', sales: '89.00', avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/4.jpg'
        },
        {
          id: '5', uid: '2', percent: 50.02, dateline: 1522221270, linkman: '销售宝技术支持', uploadname: '仇红波', sales: '840.00', avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/2.jpg'
        }
      ],
      customerdata5: [
        {
          id: '1', uid: '51', dateline: 1522221270, linkman: '艳绝天下', uploadname: '贪吃小松鼠', sales: '1.00', avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/51.jpg'
        },
        {
          id: '2', uid: '272', dateline: 1522221270, linkman: '周学江', uploadname: 'zxj', sales: '0.00', avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/272.jpg'
        },
        {
          id: '3', uid: '29', dateline: 1522221270, linkman: '销售宝技术支持', uploadname: '网络影响力', sales: '1214.00', avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/29.jpg'
        },
        {
          id: '4', uid: '4', dateline: 1522221270, linkman: '销售宝技术支持', uploadname: '楚风越韵  🏠', sales: '89.00', avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/4.jpg'
        },
        {
          id: '5', uid: '2', dateline: 1522221270, linkman: '销售宝技术支持', uploadname: '仇红波', sales: '840.00', avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/2.jpg'
        }
      ]
    }
  },
  methods: {
    setFocus () {
    },
    resultClick (item) {
    },
    getResult (val) {
    },
    onSubmit () {
    },
    onFocus () {
    },
    onCancel () {
    }
  }
}
</script>

<style lang="less">
.textarea-outer{padding:10px;}
.textarea-outer .weui-cells{margin-top:0;}
.textarea-outer .weui-cells:before{display:none;}
.textarea-outer .weui-cells:after{display:none;}
</style>
