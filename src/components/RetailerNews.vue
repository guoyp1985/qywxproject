<template>
  <div class="containerarea s-havebottom font14 rnews">
    <div class="s-topbanner">
      <div class="row">
        <div class="bg"></div>
        <div class="flex_center h_100 toprow">
          <div class="flex_cell font18 pl20">{{$t('News')}}</div>
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
          <template v-if="(index == 0)">
            <div class="scroll_list pl10 pr10">
              <Listplate1 v-for="(item,index1) in tabdata1" :key="item.id">
                <img slot="pic" :src="item.photo" style="width:40px;height:40px;" />
                <div slot="title" class="clamp1 font16">{{item.title}}</div>
                <div slot="title" class="clamp1 font12 color-gray v_middle">
                    <span class="v_middle">{{ item.dateline | dateformat }}</span>
                    <span class="v_middle"><i class="al al-chakan font18 middle-cell pl5 pr5 color-b8b8b8"></i>{{item.views}}</span>
                    <span class="v_middle"><i class="al al-ai-share font13 middle-cell pl5 pr5 color-b8b8b8"></i>{{item.shares}}</span>
                </div>
                <div class="qbtn1 bg-green color-white" @click="controlpopup1(item)">{{ $t('Control text') }}</div>
              </Listplate1>
            </div>
          </template>
          <template v-if="(index == 1)">
            <div class="scroll_list pl10 pr10">
              <Listplate1 v-for="(item,index) in tabdata2" :key="item.id">
                <img slot="pic" :src="item.photo" style="width:40px;height:40px;" />
                <div slot="title" class="clamp1 font14">{{item.title}}</div>
                <div slot="title" class="clamp1 mt5 font12 color-gray ">
                    <span class="v_middle">{{ item.dateline | dateformat }}</span>
                    <span class="v_middle"><i class="al al-chakan font18 middle-cell pl5 pr5 color-b8b8b8"></i>{{item.views}}</span>
                    <span class="v_middle"><i class="al al-ai-share font13 middle-cell pl5 pr5 color-b8b8b8"></i>{{item.shares}}</span>
                </div>
                <div class="qbtn1 bg-green color-white" @click="controlpopup2(item)">{{ $t('Control text') }}</div>
              </Listplate1>
            </div>
          </template>
        </swiper-item>
      </swiper>
    </div>
    <div class="s-bottom flex_center bg-blue3 color-white">
      <router-link class="flex_cell bg-blue3 flex_center h_100" to="/retailerGoodeazy" style="border-right:#fff 1px solid;">{{ $t('Goodeazy') }}</router-link>
      <router-link class="bg-blue3 flex_center h_100" to="/serviceAddnews" style="width:30%;">{{ $t('Create news') }}</router-link>
    </div>
    <div v-transfer-dom>
      <popup class="menuwrap" v-model="showpopup1" @on-hide="popupevent('hide')" @on-show="popupevent('show')">
        <div class="popup0">
          <div class="list">
            <div class="item" v-for="(row,index1) in controldata1" :key="index1">
              <router-link class="inner" v-if="row.key == 'stat'" to="/newsStat">{{ row.title }}</router-link>
              <router-link class="inner" v-else-if="row.key == 'set'" :to="{path:'/serviceAddnews',query:{id:clickdata1.id}}">{{ row.title }}</router-link>
              <div class="inner" v-else @click="clickpopup1(row.key,clickdata1)">
                <div :class="`clamp1 ${row.key}`">{{ row.title }}</div>
              </div>
            </div>
            <div class="item close mt10" @click="clickpopup1('row.key,clickdata1')">
              <div class="inner">{{ $t('Cancel txt') }}</div>
            </div>
          </div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom>
      <popup class="menuwrap" v-model="showpopup2" @on-hide="popupevent('hide')" @on-show="popupevent('show')">
        <div class="popup0">
          <div class="list">
            <div class="item" v-for="(row,index1) in controldata2" :key="index1">
              <div class="inner" @click="clickpopup2(row.key,clickdata2)">
                <div :class="`clamp1 ${row.key}`">{{ row.title }}</div>
              </div>
            </div>
            <div class="item close mt10" @click="clickpopup2('row.key,clickdata2')">
              <div class="inner">{{ $t('Cancel txt') }}</div>
            </div>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>

<i18n>
Goodeazy:
  zh-CN: 易采集
Create news:
  zh-CN: 创建文章
Control text:
  zh-CN: 操作
</i18n>

<script>
import { Tab, TabItem, Swiper, SwiperItem, Group, TransferDom, Popup } from 'vux'
import Listplate1 from './Listplate1'
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
    Listplate1,
    Group,
    TransferDom,
    Popup
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      tabtxts: [ '我的文章', '采集记录' ],
      tabmodel: 0,
      tabdata1: [
        {
          id: '1', dateline: 1522221270, title: '沈阳市毽球协会经验介绍 | 专题', shares: 3, views: 5, photo: 'http://gongxiaoshe.qiyeplus.com/data/upload//month_201713/15222997918736'
        },
        {
          id: '2', dateline: 1522221270, title: '『销售电子商务』最新职位推荐', shares: 3, views: 5, photo: 'http://gongxiaoshe.qiyeplus.com/data/upload//month_201713/15222371898745'
        },
        {
          id: '3', dateline: 1522221270, title: '【渠道运营】销售≠只说话！80％的销售员都错了', shares: 3, views: 5, photo: 'http://gongxiaoshe.qiyeplus.com/data/upload//month_201713/15222181292017'
        },
        {
          id: '4', dateline: 1522221270, title: '固始首家爱心粥屋揭牌运营', shares: 3, views: 5, photo: 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15221433494852.jpg'
        },
        {
          id: '5', dateline: 1522221270, title: '董明珠：格力不能更好运营，绝对不交班;揭电商大数据杀熟套路：算法投放，大V投诉更快处理', shares: 3, views: 5, photo: 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15221255851634.jpg'
        }
      ],
      tabdata2: [
        {
          id: '1', dateline: 1522221270, title: '沈阳市毽球协会经验介绍 | 专题', shares: 3, views: 5, photo: 'http://gongxiaoshe.qiyeplus.com/data/upload//month_201713/15214273537848'
        },
        {
          id: '2', dateline: 1522221270, title: '『销售电子商务』最新职位推荐', shares: 3, views: 5, photo: 'http://gongxiaoshe.qiyeplus.com/data/upload//month_201713/15214253209099'
        },
        {
          id: '3', dateline: 1522221270, title: '【渠道运营】销售≠只说话！80％的销售员都错了', shares: 3, views: 5, photo: 'http://gongxiaoshe.qiyeplus.com/data/upload//month_201713/15222181292017'
        },
        {
          id: '4', dateline: 1522221270, title: '固始首家爱心粥屋揭牌运营', shares: 3, views: 5, photo: 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15221433494852.jpg'
        },
        {
          id: '5', dateline: 1522221270, title: '董明珠：格力不能更好运营，绝对不交班;揭电商大数据杀熟套路：算法投放，大V投诉更快处理', shares: 3, views: 5, photo: 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15221255851634.jpg'
        }
      ],
      controldata1: [
        { key: 'set', title: '更多设置' },
        { key: 'stat', title: '文章统计' },
        { key: 'createposter', title: '生成海报' }
      ],
      controldata2: [
        { key: 'set', title: '更多设置' }
      ],
      showpopup1: false,
      showpopup2: false,
      clickdata1: {},
      clickdata2: {}
    }
  },
  methods: {
    controlpopup1 (item) {
      this.showpopup1 = !this.showpopup1
      this.clickdata1 = item
    },
    controlpopup2 (item) {
      this.showpopup2 = !this.showpopup2
      this.clickdata2 = item
    },
    popupevent (status) {

    },
    clickpopup1 (key, item) {
      this.showpopup1 = false
    },
    clickpopup2 (key, item) {
      this.showpopup2 = false
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/center.less';
@import '../assets/fonts.less';
@import '../assets/global.less';
.rnews .bk-listplate1 .iconcell{width:45px;}
.vux-popup-dialog .weui-cell__bd{text-align:center;}
.vux-popup-dialog .weui-cell__ft{display:none;}

</style>
