<template>
  <div class="containerarea font14 rnews bg-white">
    <div class="s-topbanner">
      <div class="row">
        <div class="bg"></div>
        <div class="flex_center h_100 toprow">
          <div class="flex_cell font18 pl20">{{ user.linkman }}</div>
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
            <div style="position:absolute;left:0;top:0;right:0;">
              <search
                class="x-search"
                position="absolute"
                auto-scroll-to-top top="0px"
                @on-focus="onFocus"
                @on-cancel="onCancel"
                @on-submit="onSubmit"
                ref="search">
              </search>
            </div>
            <div style="position:absolute;left:0;top:44px;right:0;bottom:0;overflow-y:auto;">
              <div class="scroll_list pl10 pr10">
                <div class="scroll_item emptyitem flex_center" v-if="(!tabdata1 || tabdata1.length == 0)">暂无线上数据</div>
                <div v-else v-for="item in tabdata1" :key="item.id" class="scroll_item padding10">
                  <div class="t-table">
                    <div class="t-cell v_middle" style="width:50px;height:50px;">
                      <img :src="item.photo" style="width:40px;height:40px;" />
                    </div>
                    <div class="t-cell v_middle">
                      <div class="clamp1">{{ item.title }}</div>
                      <div class="clamp1 color-gray font12">
                        <span class="v_middle">{{ item.dateline | dateformat }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-if="(index == 1)">
            <div class="scroll_list pl10 pr10">
              <div class="scroll_item emptyitem flex_center" v-if="(!tabdata2 || tabdata2.length == 0)">暂无线下数据</div>
              <div v-else v-for="item in tabdata2" :key="item.id" class="scroll_item padding10">
                <div class="t-table">
                  <div class="t-cell v_middle" style="width:50px;height:50px;">
                    <img :src="item.photo" style="width:40px;height:40px;" />
                  </div>
                  <div class="t-cell v_middle">
                    <div class="clamp1">{{ item.title }}</div>
                    <div class="clamp1 color-gray font12">
                      <span class="v_middle">{{ item.dateline | dateformat }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </swiper-item>
      </swiper>
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
import { Tab, TabItem, Swiper, SwiperItem, Group, Search } from 'vux'
import Time from '../../libs/time'

export default {
  directives: {
  },
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    Group,
    Search
  },
  created () {
    this.$store.commit('updateToggleTabbar', {toggleTarbar: true})
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      user: {
        uid: 187,
        linkman: 'YOUNG'
      },
      tabtxts: [ '线上', '线下' ],
      tabmodel: 0,
      tabdata1: [
        {
          id: '1', title: '医美运营营销36兵法攻略', dateline: 1523694550, visitor: 0, photo: 'http://gongxiaoshe.qiyeplus.com/data/upload//month_201713/15236697775676'
        },
        {
          id: '2', title: '商品1', dateline: 1523694550, visitor: 10, photo: 'http://ossgxs.boka.cn/month_201804/15236839495706.jpg'
        },
        {
          id: '3', title: 'YOUNG向你抛了一个媚眼，并诚恳的邀请你帮TA砍一刀！', dateline: 1521694550, visitor: 32, photo: 'http://ossgxs.boka.cn/month_201804/15226700508345.jpg'
        }
      ],
      tabdata2: [
        {
          id: '1', title: '医美运营营销36兵法攻略', dateline: 1523694550, visitor: 0, photo: 'http://gongxiaoshe.qiyeplus.com/data/upload//month_201713/15236697775676'
        },
        {
          id: '2', title: '商品1', dateline: 1523694550, visitor: 10, photo: 'http://ossgxs.boka.cn/month_201804/15236839495706.jpg'
        },
        {
          id: '3', title: 'YOUNG向你抛了一个媚眼，并诚恳的邀请你帮TA砍一刀！', dateline: 1521694550, visitor: 32, photo: 'http://ossgxs.boka.cn/month_201804/15226700508345.jpg'
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
.rnews .bk-listplate1 .iconcell{width:45px;}
.vux-popup-dialog .weui-cell__bd{text-align:center;}
.vux-popup-dialog .weui-cell__ft{display:none;}

</style>
