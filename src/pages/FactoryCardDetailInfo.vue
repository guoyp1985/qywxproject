<template>
  <div id="factorycard-detailinfo-page" class="containerarea bg-page font14 factoryCardDetailInfo">
    <div v-if="detailData && detailData.length > 0" class="radiusarea mb10 pb15 list-shadow01" style="backgroundColor: #f5f9fa;">
      <div class="item" v-for="(item,index) in detailData" :key="index">
        <div class="inner">
          <div class="radius font22 clamp1">{{ item.value }}</div>
          <div class="title color-gray">{{ item.title }}</div>
        </div>
      </div>
    </div>
    <div class="s-topbanner s-topbanner1">
      <div class="row">
        <tab v-model="selectedIndex" class="" active-color="#ea3a3a" default-color="#666666">
          <tab-item v-for="(item,index) in tabtext" :selected="index == selectedIndex" :key="index" @on-item-click="onItemClick()">{{item}}</tab-item>
        </tab>
      </div>
    </div>
    <div class="s-container s-container1" ref="scrollContainer" @scroll="handleScroll('scrollContainer')">
      <div v-show="(selectedIndex == 0)">
        <div v-if="!tabData1 || tabData1.length === 0" class="scroll_item padding10 align_center color-gray">
          <div class="emptyitem flex_center">暂无数据</div>
        </div>
        <div v-if="!disList1" class="scroll_list border-box">
          <template v-for="(item,index) in tabData1" :index="index">
            <div class="scroll_item padding10">
              <div class="flex_left">
                <div>
                  <img class="avatarimg2 imgcover" src="https://tossqzx.boka.cn/avatar/5/8710.jpg" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
                </div>
                <div class="flex_cell pl10 pr20">
                  <div class="clamp1 color-gray2">冧</div>
                  <div class="clamp1 color-gray">2019-08-14 10:33</div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div v-show="(selectedIndex == 1)">
        <div v-if="!tabData2 || tabData2.length === 0" class="scroll_item padding10 align_center color-gray">
          <div class="emptyitem flex_center">暂无数据</div>
        </div>
        <div v-if="!disList2" class="scroll_list border-box">
          <template v-for="(item,index) in tabData1" :index="index">
            <div class="scroll_item padding10">
              <div class="flex_left">
                <div>
                  <img class="avatarimg2 imgcover" src="https://tossqzx.boka.cn/avatar/5/8710.jpg" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
                </div>
                <div class="flex_cell pl10 pr20">
                  <div class="clamp1 color-gray2">冧</div>
                  <div class="clamp1 color-gray">购买商品: 夏季潮流t恤</div>
                  <div class="clamp1 color-gray">2019-08-14 10:33</div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {Tab, TabItem} from 'vux'
import {User} from '#/storage'
export default {
  components: {
    Tab, TabItem
  },
  data () {
    return {
      tabtext: ['领取记录', '使用记录'],
      selectedIndex: 0,
      pageStart1: 0,
      pageStart2: 0,
      tabData1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      tabData2: [],
      detailData: [
        {title: '累计发放', value: '100'},
        {title: '累计使用', value: '60'},
        {title: '累计优惠金额', value: '180'},
        {title: '今日发放', value: '100'},
        {title: '今日使用', value: '60'},
        {title: '今日优惠金额', value: '180'}
      ],
      disList1: false,
      disList2: false,
      limit: 10,
      loginUser: {}
    }
  },
  methods: {
    init () {
      this.getData1()
    },
    handleScroll: function (refname) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          switch (self.selectedIndex) {
            case 0:
              if (self.tabData1.length === (self.pageStart1 + 1) * self.limit) {
                self.pageStart1++
                self.getData1()
              }
              break
            case 1:
              if (self.tabData2.length === (self.pageStart2 + 1) * self.limit) {
                self.pageStart2++
                self.getData2()
              }
              break
          }
        }
      })
    },
    getDetailData () {
      // 根据优惠券id，获取该券的详细信息(今日领取数量，发放数量等...)

    },
    getData1 () {
      // 获取领取记录
    },
    getData2 () {
      // 获取使用记录
    },
    onItemClick () {
      // const self = this
      // switch (this.selectedIndex) {
      //   case 0:
      //     if (this.tabData1.length < this.limit) {
      //       self.pageStart1 = 0
      //       self.disList1 = false
      //       this.tabData1 = []
      //       self.getData1()
      //     }
      //     break
      //   case 1:
      //     if (this.tabData2.length < this.limit) {
      //       self.pageStart2 = 0
      //       self.disList2 = false
      //       this.tabData2 = []
      //       self.getData2()
      //     }
      //     break
      // }
    },
    refresh () {
      // this.tabData1 = []
      this.pageStart1 = 0
      this.disList1 = false
      this.tabData2 = []
      this.pageStart2 = 0
      this.disList2 = false
      this.selectedIndex = 0
      this.getData1()
    }
  },
  activated () {
    this.refresh()
  },
  created () {
    this.loginUser = User.get()
    console.log('-----loginUser-----')
    console.log(this.loginUser.fid)
    this.init()
  }
}
</script>
<style lang="less">
.s-topbanner{top:230px !important;}
.s-container{top:274px !important;}
.radiusarea:after{content:"";clear:both;display:block;}
.radiusarea .item{float:left;width:33.333333%;text-align:center;}
.radiusarea .inner{padding:20px 10px 0 10px;}
.radiusarea .radius{margin:0 auto;width:60px;height:60px;border-radius:50%;background-color:#69d6e3;color:#fff;line-height:60px;}
.radiusarea .title{margin-top:5px;line-height:25px;}
.radiusarea .item:nth-child(1) .radius{background-color:#3ecbc0;}
.radiusarea .item:nth-child(2) .radius{background-color:#f0cb51;}
.radiusarea .item:nth-child(3) .radius{background-color:#aed370;}
.radiusarea .item:nth-child(4) .radius{background-color:#ffb22d;}
.radiusarea .item:nth-child(5) .radius{background-color:#ea8482;}
.radiusarea .item:nth-child(6) .radius{background-color:#ea8482;}
</style>
