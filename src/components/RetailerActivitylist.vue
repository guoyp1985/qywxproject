<template>
  <div class="containerarea font14 havetoptab  bg-page">
    <tab v-model="tabmodel" class="x-toptab">
      <tab-item v-for="(item,index) in tabtxts" :selected="index == 0" :key="index">{{item}}</tab-item>
    </tab>
    <div class="s-container ractivitylist">
      <swiper v-model="tabmodel" class="x-swiper no-indicator">
        <swiper-item v-for="(item, index) in tabtxts" :key="index">
          <template v-if="(index == 0)">
            <div class="scroll_list">
              <Listplate2 v-for="(item,index1) in tabdata1" :class="`${item.type}item bg-white mb5 pl10 pr10`" :key="index1">
                <div v-if="item.isfinished === 1" class="icon finished"></div>
                <img slot="pic" :src="item.photo" />
                <div slot="title" class="clamp1 font12">{{item.title}}</div>
                  <template v-if="(item.type == 'groupbuy')">
                    <div slot="title" class="clamp1 font12 color-gray mt5">{{ $t('Groupprice') }} {{ $t('RMB') }} {{ item.groupprice }}</div>
                    <div slot="title" class="clamp1 font12 color-gray mt5">{{ $t('Group numbers') }} {{ item.numbers }}{{ $t('Person') }}</div>
                  </template>
                  <template v-if="(item.type == 'bargainbuy')">
                    <div slot="title" class="clamp1 font12 color-gray mt5">{{ $t('Min buy price') }} {{ $t('RMB') }} {{ item.minprice }}</div>
                    <div slot="title" class="clamp1 font12 color-gray mt5">{{ $t('Limitbuy count') }} {{ item.limitbuy }}</div>
                  </template>
                <div slot="btn" class="w_100">
                  <div class="qbtn1 bg-orange1 color-white">统计</div>
                  <div class="qbtn1 bg-orange1 color-white mt5" @click="stopevent(item)">停止</div>
                </div>
                <div class="mt5 font12 color-gray">活动时间：{{ item.starttime | dateformat}} 至 {{ item.endtime | dateformat}}</div>
              </Listplate2>
            </div>
          </template>
          <template v-if="(index == 1)">
            <div class="scroll_list">
              <Listplate2 v-for="(item,index1) in tabdata2" :class="`${item.type}item bg-white mb5 pl10 pr10`" :key="index1">
                <div v-if="item.isfinished === 1" class="icon finished"></div>
                <img slot="pic" :src="item.photo" />
                <div slot="title" class="clamp1 font12">{{item.title}}</div>
                  <template v-if="(item.type == 'groupbuy')">
                    <div slot="title" class="clamp1 font12 color-gray mt5">{{ $t('Groupprice') }} {{ $t('RMB') }} {{ item.groupprice }}</div>
                    <div slot="title" class="clamp1 font12 color-gray mt5">{{ $t('Group numbers') }} {{ item.numbers }}{{ $t('Person') }}</div>
                  </template>
                  <template v-if="(item.type == 'bargainbuy')">
                    <div slot="title" class="clamp1 font12 color-gray mt5">{{ $t('Min buy price') }} {{ $t('RMB') }} {{ item.minprice }}</div>
                    <div slot="title" class="clamp1 font12 color-gray mt5">{{ $t('Limitbuy count') }} {{ item.limitbuy }}</div>
                  </template>
                <div slot="btn" class="w_100">
                  <div class="qbtn1 bg-orange1 color-white">统计</div>
                  <div class="qbtn1 bg-orange1 color-white mt5" @click="stopevent(item)">停止</div>
                </div>
                <div class="mt5 font12 color-gray">活动时间：{{ item.starttime | dateformat}} 至 {{ item.endtime | dateformat}}</div>
              </Listplate2>
            </div>
          </template>
        </swiper-item>
      </swiper>
    </div>
    <div v-transfer-dom>
      <confirm v-model="showconfirm"
      @on-cancel="canceldownConfirm"
      @on-confirm="okdownConfirm">
        <p style="text-align:center;">{{ $t('Are you sure stop?') }}</p>
      </confirm>
    </div>
  </div>
</template>

<i18n>
Are you sure stop?:
  zh-CN: 确定要停止吗？
Min buy price:
  zh-CN: 最低成交价
Limitbuy count:
  zh-CN: 限购数量
</i18n>

<script>
import { Tab, TabItem, Swiper, SwiperItem, TransferDom, Confirm } from 'vux'
import Listplate2 from './Listplate2'
import Time from '../../libs/time'

export default {
  directives: {
    TransferDom
  },
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    Listplate2,
    TransferDom,
    Confirm
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      tabtxts: [ '全部活动', '创建活动' ],
      tabmodel: 0,
      tabdata1: [
        {
          id: '1', dateline: 1522221270, starttime: 1522825984, endtime: 1524121984, isfinished: 1, type: 'groupbuy', groupprice: '0.50', numbers: 3, title: '沈阳市毽球协会经验介绍 | 专题', shares: 3, views: 5, photo: 'http://gongxiaoshe.qiyeplus.com/data/upload//month_201713/15222997918736'
        },
        {
          id: '2', dateline: 1522221270, starttime: 1522825984, endtime: 1524121984, isfinished: 0, type: 'bargainbuy', minprice: '0.50', limitbuy: 3, title: '『销售电子商务』最新职位推荐', shares: 3, views: 5, photo: 'http://gongxiaoshe.qiyeplus.com/data/upload//month_201713/15222371898745'
        },
        {
          id: '3', dateline: 1522221270, starttime: 1522825984, endtime: 1524121984, isfinished: 1, type: 'bargainbuy', minprice: '0.50', limitbuy: 3, title: '【渠道运营】销售≠只说话！80％的销售员都错了', shares: 3, views: 5, photo: 'http://gongxiaoshe.qiyeplus.com/data/upload//month_201713/15222181292017'
        },
        {
          id: '4', dateline: 1522221270, starttime: 1522825984, endtime: 1524121984, isfinished: 0, type: 'groupbuy', groupprice: '0.50', numbers: 3, title: '固始首家爱心粥屋揭牌运营', shares: 3, views: 5, photo: 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15221433494852.jpg'
        },
        {
          id: '5', dateline: 1522221270, starttime: 1522825984, endtime: 1524121984, isfinished: 1, type: 'groupbuy', groupprice: '0.50', numbers: 3, title: '董明珠：格力不能更好运营，绝对不交班;揭电商大数据杀熟套路：算法投放，大V投诉更快处理', shares: 3, views: 5, photo: 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15221255851634.jpg'
        }
      ],
      tabdata2: [
        {
          id: '1', dateline: 1522221270, starttime: 1522825984, endtime: 1524121984, isfinished: 0, type: 'groupbuy', groupprice: '0.50', numbers: 3, title: '沈阳市毽球协会经验介绍 | 专题', shares: 3, views: 5, photo: 'http://gongxiaoshe.qiyeplus.com/data/upload//month_201713/15214273537848'
        },
        {
          id: '2', dateline: 1522221270, starttime: 1522825984, endtime: 1524121984, isfinished: 1, type: 'bargainbuy', minprice: '0.50', limitbuy: 3, title: '『销售电子商务』最新职位推荐', shares: 3, views: 5, photo: 'http://gongxiaoshe.qiyeplus.com/data/upload//month_201713/15214253209099'
        },
        {
          id: '3', dateline: 1522221270, starttime: 1522825984, endtime: 1524121984, isfinished: 0, type: 'bargainbuy', minprice: '0.50', limitbuy: 3, title: '【渠道运营】销售≠只说话！80％的销售员都错了', shares: 3, views: 5, photo: 'http://gongxiaoshe.qiyeplus.com/data/upload//month_201713/15222181292017'
        },
        {
          id: '4', dateline: 1522221270, starttime: 1522825984, endtime: 1524121984, isfinished: 1, type: 'groupbuy', groupprice: '0.50', numbers: 3, title: '固始首家爱心粥屋揭牌运营', shares: 3, views: 5, photo: 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15221433494852.jpg'
        },
        {
          id: '5', dateline: 1522221270, starttime: 1522825984, endtime: 1524121984, isfinished: 0, type: 'groupbuy', groupprice: '0.50', title: '董明珠：格力不能更好运营，绝对不交班;揭电商大数据杀熟套路：算法投放，大V投诉更快处理', shares: 3, views: 5, photo: 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15221255851634.jpg'
        }
      ],
      clickdata: {},
      showconfirm: false
    }
  },
  methods: {
    stopevent (item) {
      this.showconfirm = true
      this.clickdata = item
    },
    canceldownConfirm () {
      this.showconfirm = false
    },
    okdownConfirm () {
      this.showconfirm = false
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/center.less';
@import '../assets/fonts.less';
@import '../assets/global.less';

.ractivitylist .icon{
        position:absolute;left:0;top:0;width:96px;height:25px;line-height:25px;
        background-color:#ff9f9f;color:#fff;text-align:center;font-size: 12px;
        -webkit-transform: translate(-30px,5px) rotate(-45deg);
        transform: translate(-30px,5px) rotate(-45deg);
}
.ractivitylist .finished.icon{background-color:#8a8a8a;}
.ractivitylist .finished.icon:after{content:"已结束";}
</style>
