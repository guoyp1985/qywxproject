<template>
  <div class="containerarea s-havebottom font14 rgoodeazy bg-white">
    <div class="s-topbanner">
      <div class="row">
        <div class="bg"></div>
        <div class="flex_center h_100 toprow">
          <div class="flex_cell font18 pl20">{{$t('Goodeazy')}}</div>
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
          <div v-if="(index == 0)" class="pl10 pr10">
            <div class="font15 pt15">搜索关键词采集文章</div>
            <div class="font12 color-gray mt5">在搜索框内输入文章关键词，点击“搜索”按钮搜索相关文章后，即可预览或采集文章素材。</div>
            <div class="mb15" style="position:relative;">
              <search
                class="x-search"
                position="absolute"
                auto-scroll-to-top top="0px"
                @on-focus="onFocus"
                @on-cancel="onCancel"
                @on-submit="onSubmit"
                @on-change="onChange"
                ref="search">
              </search>
              <div class="scroll_list pl10 pr10" style="position:absolute;top:45px;">
                <div v-for="(item,index) in searchdata" :key="item.id" class="scroll_item b_bottom_after pt10 pb10">
                  <div class="t-table">
                    <div class="t-cell v_middle">
                      <div class="clamp1">{{ item.title }}</div>
                      <div class="clamp2 font12 color-gray mt5">{{ item.summary }}</div>
                    </div>
                    <div class="t-cell align_right v_middle" style="width:60px;">
                      <span class="qbtn bg-green color-white font12" @click="collect">{{ $t('Collect') }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="(index == 1)">
            <div class="pl10 pr10">
              <div class="font15 pt15">文章链接采集文章</div>
              <div class="font12 color-gray mt5">请从微信公众号中复制文章链接，粘贴在文本框内，点击“采集”按钮，采集成功后即可编辑分享</div>
              <form class="subform mb15">
                <div class="t-table mt12">
                  <div class="t-cell v_middle" style="height:100%;background-color: #fafafa;">
                    <group class="textarea-outer">
                      <x-textarea class="x-textarea noborder" name="url" :placeholder="$t('Url paster here')" :show-counter="false" :rows="1" autosize></x-textarea>
                    </group>
                  </div>
                  <div class="t-cell v_middle align_center bg-green color-white font15" style="width:80px;">{{ $t('Collect') }}</div>
                </div>
              </form>
            </div>
            <div class="bg-page" style="height:12px;"></div>
            <div class="padding15 font15 b_bottom_after">{{ $t('Collect record') }}</div>
            <div class="scroll_list pl10 pr10 pb10 cols-2">
              <Listplate v-for="(item,index) in newsdata" :key="item.id">
                <img slot="pic" :src="item.photo" style="width:30px;height:30px;" />
                <div slot="title" class="clamp1 font14">{{item.title}}</div>
                <div slot="title" class="clamp1 font12 color-gray">{{ item.dateline | dateformat }}</div>
              </Listplate>
            </div>
          </div>
        </swiper-item>
      </swiper>
    </div>
    <div class="s-bottom bottomnaviarea b_top_after">
      <div class="t-table bottomnavi">
        <router-link class="t-cell item" to="/retailerShop">{{ $t('My shop') }}</router-link>
        <router-link class="t-cell item" to="/centerSales">{{ $t('Sales center') }}</router-link>
        <router-link class="t-cell item" to="/retailerOrders">{{ $t('My orders') }}</router-link>
      </div>
    </div>
  </div>
</template>

<i18n>
Rebate customer:
  zh-CN: 返点客户
Share invite customer:
  zh-CN: 分享邀请返点客户
Rebate manage:
  zh-CN: 返点管理
Message text:
  zh-CN: 早上八点到晚上十一点可以发送消息,但只有48小时内互动过的返点客户才能收到消息,消息将通过博卡授权中心 公众号直接推送给返点客户,每日只能推送一次。
Send text:
  zh-CN: 发送
Url paster here:
  zh-CN: 链接粘贴在此处
Collect:
  zh-CN: 采集
Collect record:
  zh-CN: 采集记录
My orders:
  zh-CN: 我的订单
</i18n>

<script>
import { Tab, TabItem, Swiper, SwiperItem, Search, XTextarea, Group } from 'vux'
import Listplate from './Listplate'
import Time from '../../libs/time'

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
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      tabtxts: [ '关键词', '链接' ],
      tabmodel: 0,
      newsdata: [
        {
          id: '1', dateline: 1522221270, photo: 'http://gongxiaoshe.qiyeplus.com/data/upload//month_201713/15222997918736', title: '老年人AA制吃饭 游玩 住一起,这种AA出来的幸福和快乐!太潮了~', summary: '简而言之就是,一群人通过AA制,花更少的钱,消耗更少的精力,做成想做的事情,获得更多的快乐,享受更好的生活.以前,拼客...'
        },
        {
          id: '2', dateline: 1522221270, photo: 'http://gongxiaoshe.qiyeplus.com/data/upload//month_201713/15222997918736', title: '老年人AA制吃饭 游玩 住一起,这种AA出来的幸福和快乐!太潮了~', summary: '简而言之就是,一群人通过AA制,花更少的钱,消耗更少的精力,做成想做的事情,获得更多的快乐,享受更好的生活.以前,拼客...'
        },
        {
          id: '3', dateline: 1522221270, photo: 'http://gongxiaoshe.qiyeplus.com/data/upload//month_201713/15222997918736', title: '老年人AA制吃饭 游玩 住一起,这种AA出来的幸福和快乐!太潮了~', summary: '简而言之就是,一群人通过AA制,花更少的钱,消耗更少的精力,做成想做的事情,获得更多的快乐,享受更好的生活.以前,拼客...'
        },
        {
          id: '4', dateline: 1522221270, photo: 'http://gongxiaoshe.qiyeplus.com/data/upload//month_201713/15222997918736', title: '老年人AA制吃饭 游玩 住一起,这种AA出来的幸福和快乐!太潮了~', summary: '简而言之就是,一群人通过AA制,花更少的钱,消耗更少的精力,做成想做的事情,获得更多的快乐,享受更好的生活.以前,拼客...'
        },
        {
          id: '5', dateline: 1522221270, photo: 'http://gongxiaoshe.qiyeplus.com/data/upload//month_201713/15222997918736', title: '老年人AA制吃饭 游玩 住一起,这种AA出来的幸福和快乐!太潮了~', summary: '简而言之就是,一群人通过AA制,花更少的钱,消耗更少的精力,做成想做的事情,获得更多的快乐,享受更好的生活.以前,拼客...'
        }
      ],
      searchdata: [],
      searchword: ''
    }
  },
  methods: {
    setFocus () {
    },
    resultClick (item) {
    },
    getResult (val) {
    },
    onChange (val) {
      this.searchword = val
    },
    onSubmit () {
      let kw = this.searchword.replace(/\s+/g, '')
      if (kw !== '') {
        this.searchdata = this.newsdata
      }
    },
    onFocus () {
    },
    onCancel () {
    },
    collect () {
    }
  }
}
</script>

<style lang="less">
.rgoodeazy .textarea-outer .weui-cells{background-color:transparent;}
.rgoodeazy .x-textarea textarea{background-color:transparent;}
</style>
