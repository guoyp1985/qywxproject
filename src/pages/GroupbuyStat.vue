<template>
  <div class="containerarea font14">
    <div class="radiusarea mt12">
      <div class="item" v-for="(item,index) in radiusdata" :key="index">
        <div class="inner">
          <div class="radius font22">{{ item.number }}</div>
          <div class="title">{{ item.title }}</div>
        </div>
      </div>
    </div>
    <tab v-model="tabmodel" class="mt12">
      <tab-item v-for="(item,index) in tabsdata" :selected="index == 0" :key="index">{{item}}</tab-item>
    </tab>
    <swiper v-model="tabmodel" class="x-swiper no-indicator">
      <swiper-item v-for="(tabitem, index) in tabsdata" :key="index">
        <div class="scroll_list padding10">
          <template v-if="tabcondata[index].data.length == 0">
            <div class="scroll_item padding10">暂无数据</div>
          </template>
          <div class="scroll_item" v-else v-for="(item,index1) in tabcondata[index].data" :key="item.id">
            <div class="t-table">
              <div class="t-cell v_middle" style="width:50px;">
                <img class="avatarimg1" :src="item.avatar" />
              </div>
              <div class="t-cell v_middle">
                <div class="clamp1">{{ item.linkman }}</div>
                <div class="font13">{{ item.isfull }}</div>
              </div>
              <div class="t-cell v_middle align_right" style="width:60px;">
                <span class="qbtn1 bg-green color-white">联系</span>
              </div>
            </div>
            <div class="mt5">团员：<span class="font13">{{ item.otherusers}}</span></div>
            <div class="mt5">开团时间：<span class="font12 color-gray">{{ item.dateline }}</span></div>
          </div>
        </div>
      </swiper-item>
    </swiper>
  </div>
</template>

<i18n>
Message:
  zh-CN: 消息
</i18n>

<script>
import { Tab, TabItem, Swiper, SwiperItem } from 'vux'
import Listplate from '@/components/Listplate'
import Time from '../../libs/time'
export default {
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    Listplate
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      tabmodel: 0,
      radiusdata: [
        { title: '总团数', number: 0 },
        { title: '已成团数', number: 0 }
      ],
      tabsdata: [ '当前拼团成员' ],
      tabcondata: [
        {
          data: [
            { id: 1, avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/187.jpg', dateline: '2018-04-10 14:45', isfull: '组团失败', linkman: 'YOUNG', otherusers: '无' }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.radiusarea:after{content:"";clear:both;display:block;}
.radiusarea .item{float:left;width:33.333333%;text-align:center;}
.radiusarea .inner{padding:10px 10px 0 10px;}
.radiusarea .radius{margin:0 auto;width:60px;height:60px;border-radius:50%;background-color:#69d6e3;color:#fff;line-height:60px;}
.radiusarea .title{margin-top:5px;line-height:25px;}
.radiusarea .item:nth-child(1) .radius{background-color:#3ecbc0;}
.radiusarea .item:nth-child(2) .radius{background-color:#f0cb51;}
.radiusarea .item:nth-child(3) .radius{background-color:#aed370;}
.radiusarea .item:nth-child(4) .radius{background-color:#ffb22d;}
.radiusarea .item:nth-child(5) .radius{background-color:#ea8482;}
</style>
