<template>
  <div id="factory-cardlist-page" class="containerarea font14 factoryCardList" style="backgroundColor:#f2f3f2;">
    <div class="s-topbanner s-topbanner1">
      <div class="row">
        <tab v-model="selectedIndex" class="" active-color="#ea3a3a" default-color="#666666">
          <tab-item v-for="(item,index) in tabtxts" :selected="index == selectedIndex" :key="index" @on-item-click="onItemClick()">{{item}}</tab-item>
        </tab>
      </div>
    </div>
    <div class="s-container s-container1" ref="scrollContainer" @scroll="handleScroll('scrollContainer')">
      <!-- 正在发放的优惠券 -->
      <div v-show="(selectedIndex == 0)">
        <div v-if="!tabData1 || tabData1.length === 0" class="scroll_item padding10 align_center color-gray">
          <div><i class="al al-wushuju font60 pt20"></i></div>
          <div class="mt5">暂无发放优惠券！</div>
        </div>
        <div v-if="!disList1" class="scroll_list">
          <template v-for="(item,index) in tabData1" :index="index">
            <div class="lists">
              <!-- <div class="yhq_item">
                <div class="flex_cell txt-cell" style="overflow:visible">
                  <div class="db-flex">
                    <div class="pic v_middle w70">
                      <img class="v_middle imgcover" :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" style="width:60px;height:60px;" />
                    </div>
                    <div>
                      <div>{{item.title}}</div>
                      <div class="font16 mt5 txt" style="font-weight:bolder;">满100减50</div>
                    </div>
                  </div>
                  <div class="mt5">
                    <div class="font12">{{item.starttime | dateformat}}至{{item.endtime | dateformat}}</div>
                  </div>
                  <div class="ball ball-up"></div>
                  <div class="ball ball-down"></div>
                </div>
                <div class="btn-cell flex_column">
                  <div class="rbtn color-theme" @click="controlpopup1(item, item.id)">· · ·</div>
                  <div class="mt5">剩余<span style="font-weight:bolder;">100</span>张</div>
                </div>
              </div> -->
              <div>
                <div class="yhq_item">
                  <div class="flex_cell b-bottom" style="overflow:visible">
                    <div class="flex_between" style="padding:10px 20px 0px 20px;">
                      <div class="font18"><span style="font-weight:bold;color:#eb6b5e;">¥ 10</span><span class="color-gray3 font16"> (满99元可用)</span></div>
                      <div class="flex_column">
                        <div class="rbtn color-theme" @click="controlpopup1(item, item.id)">· · ·</div>
                      </div>
                    </div>
                    <div>
                    <div style="padding:5px 20px;">{{item.starttime | dateformat}} 至 {{item.endtime | dateformat}}</div>
                    </div>
                    <div class="flex_left">
                      <div class="ball ball-left"></div>
                      <div class="ball ball-right"></div>
                    </div>
                  </div>
                </div>
                <div class="w_100 proInfo bg-white">
                  <div class="db-flex">
                    <div class="pic v_middle w80">
                      <img class="v_middle imgcover" :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" style="width:70px;height:70px;" />
                    </div>
                    <div class="ml10" style="width:70%;">
                      <div class="clamp1 font16">{{item.title}}</div>
                      <div class="hxj">¥商品现价</div>
                      <div class="font16" style="color:#eb6b5e;">领券后 <span style="font-weight:bold">¥88.00</span></div>
                    </div>
                  </div>
                  <div class="w_100 flex_center">
                    <div class="percentarea db-in v_middle mr10">
                      <div class="inner" style="width:20%"></div> <!-- 这里的width需要计算百分比 -->
                    </div>
                    <div>仅剩20张</div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div v-show="(selectedIndex == 1)">
        <div v-if="!tabData2 || tabData2.length === 0" class="scroll_item padding10 align_center color-gray">
          <div><i class="al al-wushuju font60 pt20"></i></div>
          <div class="mt5">暂无已停止发放优惠券！</div>
        </div>
        <div v-if="!disList2" class="scroll_list">
          <template v-for="(item2,index) in tabData2" :index="index">
            <div class="lists">
              <div>
                <div class="yhq_item">
                  <div class="flex_cell b-bottom" style="overflow:visible">
                    <div class="flex_between" style="padding:10px 20px 0px 20px;">
                      <div class="font18"><span style="font-weight:bold;color:#eb6b5e;">¥ 10</span><span class="color-gray3 font16"> (满99元可用)</span></div>
                      <div class="flex_column">
                        <div class="rbtn color-theme" @click="controlpopup1(item2, item2.id)">· · ·</div>
                      </div>
                    </div>
                    <div>
                      <div style="padding:5px 20px;">2019-08-08 12:20 至 2019-08-10 12:20</div>
                    </div>
                    <div class="flex_left">
                      <div class="ball ball-left"></div>
                      <div class="ball ball-right"></div>
                    </div>
                  </div>
                </div>
                <div class="w_100 proInfo bg-white">
                  <div class="db-flex">
                    <div class="pic v_middle w80">
                      <img class="v_middle imgcover" src="https://tossqzx.boka.cn/month_201907/15629216149869.jpg" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" style="width:70px;height:70px;" />
                    </div>
                    <div class="ml10" style="width:70%;">
                      <div class="clamp1 font16">商品名</div>
                      <div class="hxj">¥商品现价</div>
                      <div class="font16" style="color:#eb6b5e;">领券后 <span style="font-weight:bold">¥88.00</span></div>
                    </div>
                  </div>
                  <div class="w_100 flex_center">
                    <div class="percentarea db-in v_middle mr10">
                      <div class="inner" style="width:20%"></div>
                    </div>
                    <div>仅剩20张</div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div class="hiddenbox"></div>
    </div>
    <div class="s-bottom border-box flex_center color-white list-shadow02" style="background-color:#eb6b5e;">
      <div class="flex_cell flex_center color-white" @click="saveevent">创建优惠券</div>
    </div>
    <div v-transfer-dom>
      <popup class="menuwrap" v-model="showpopup1">
        <div class="popup0">
          <div class="list" v-if="clickdata">
            <div class="item" v-if="selectedIndex == 0">
              <div class="inner"  @click="clickpopup('edit')">编辑</div>
            </div>
            <div class="item">
              <!-- <router-link class="inner" :to="{path: '/factoryCardDetailInfo', query: {id: clickdata.id, module: 'product'}}">统计</router-link> -->
              <router-link class="inner" :to="{path: '/factoryCardDetailInfo', query: {id: clickdata.id}}">统计</router-link>
            </div>
            <div class="item" v-if="selectedIndex == 0">
              <div class="inner" @click="clickpopup('stop')">停止</div>
            </div>
            <div class="item close mt10" @click="clickpopup('row.key')">
              <div class="inner">{{ $t('Cancel txt') }}</div>
            </div>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>
<script>
// import jQuery from 'jquery'
// import ENV from 'env'
import Time from '#/time'
import {Tab, TabItem, Popup, TransferDom, Confirm} from 'vux'
import {User} from '#/storage'

export default {
  directives: {
    TransferDom
  },
  components: {
    Tab, TabItem, Popup, Confirm
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      tabtxts: ['正在发放', '已停止发放'],
      selectedIndex: 0,
      tabData1: [
        {id: 1, title: '胶卷', photo: 'https://tossqzx.boka.cn/month_201907/15629216149869.jpg', starttime: '1564990620', endtime: '1565595604'},
        {id: 1, title: '胶卷', photo: 'https://tossqzx.boka.cn/month_201907/15629216149869.jpg', starttime: '1564990620', endtime: '1565595604'},
        {id: 1, title: '胶卷', photo: 'https://tossqzx.boka.cn/month_201907/15629216149869.jpg', starttime: '1564990620', endtime: '1565595604'},
        {id: 1, title: '胶卷', photo: 'https://tossqzx.boka.cn/month_201907/15629216149869.jpg', starttime: '1564990620', endtime: '1565595604'},
        {id: 1, title: '胶卷', photo: 'https://tossqzx.boka.cn/month_201907/15629216149869.jpg', starttime: '1564990620', endtime: '1565595604'},
        {id: 1, title: '胶卷', photo: 'https://tossqzx.boka.cn/month_201907/15629216149869.jpg', starttime: '1564990620', endtime: '1565595604'},
        {id: 1, title: '胶卷', photo: 'https://tossqzx.boka.cn/month_201907/15629216149869.jpg', starttime: '1564990620', endtime: '1565595604'},
        {id: 1, title: '胶卷', photo: 'https://tossqzx.boka.cn/month_201907/15629216149869.jpg', starttime: '1564990620', endtime: '1565595604'},
        {id: 1, title: '胶卷', photo: 'https://tossqzx.boka.cn/month_201907/15629216149869.jpg', starttime: '1564990620', endtime: '1565595604'},
        {id: 1, title: '胶卷', photo: 'https://tossqzx.boka.cn/month_201907/15629216149869.jpg', starttime: '1564990620', endtime: '1565595604'},
        {id: 1, title: '胶卷', photo: 'https://tossqzx.boka.cn/month_201907/15629216149869.jpg', starttime: '1564990620', endtime: '1565595604'},
        {id: 1, title: '胶卷', photo: 'https://tossqzx.boka.cn/month_201907/15629216149869.jpg', starttime: '1564990620', endtime: '1565595604'}],
      tabData2: [{id: 1, title: '胶卷', photo: 'https://tossqzx.boka.cn/month_201907/15629216149869.jpg', starttime: '1564990620', endtime: '1565595604'}],
      pageStart1: 0,
      pageStart2: 0,
      disList1: false,
      disList2: false,
      limit: 10,
      loginUser: {},
      clickdata: {},
      clickindex: 0,
      showpopup1: false
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
                console.log('进入了滚动事件')
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
    onItemClick () {  // 选择对应tab获取对应订单状态列表数据
      const self = this
      switch (this.selectedIndex) {
        case 0:
          if (this.tabData1.length < this.limit) {
            self.pageStart1 = 0
            self.disList1 = false
            this.tabData1 = []
            self.getData1()
          }
          break
        case 1:
          if (this.tabData2.length < this.limit) {
            self.pageStart2 = 0
            self.disList2 = false
            // this.tabData2 = []
            self.getData2()
          }
          break
      }
    },
    getData1 () {
      // 获取正在发放优惠券数据
      // this.$vux.loading.show()
      // const self = this
      // let params = {dealed: 0, pagestart: self.pageStart1, limit: self.limit, fid: self.loginUser.fid}
      // self.$http.post(`${ENV.BokaApi}/api/agent/applyList`,
      //   params
      // ).then(function (res) {
      //   const data = res.data
      //   self.$vux.loading.hide()
      //   const retdata = data.data ? data.data : data
      //   self.tabData1 = self.tabData1.concat(retdata)
      //   self.disList1 = true
      //   console.log('----response-----')
      //   console.log(self.tabData1)
      // })
    },
    getData2 () {
      // 获取停止发放优惠券数据
      // this.$vux.loading.show()
      // const self = this
      // let params = {dealed: 1, pagestart: self.pageStart2, limit: self.limit, fid: self.loginUser.fid}
      // self.$http.post(`${ENV.BokaApi}/api/agent/applyList`,
      //   params
      // ).then(function (res) {
      //   const data = res.data
      //   self.$vux.loading.hide()
      //   const retdata = data.data ? data.data : data
      //   self.tabData2 = self.tabData2.concat(retdata)
      //   self.disList2 = true
      //   console.log('----response-----')
      //   console.log(self.tabData2)
      // })
    },
    clickpopup (key) {
      const self = this
      self.showpopup1 = false
      if (key === 'edit') {
        // 跳转优惠券编辑页面
        self.$router.push({ path: '/addFactoryCard', query: { id: self.clickdata.id } })
      } else if (key === 'stop') {
        self.$vux.confirm.show({
          title: '确定要停止发放该优惠券吗？',
          onConfirm: () => {
            // self.$vux.loading.show()
            // 停止优惠券发放操作 向后台发送请求
            // let params = { id: self.clickdata.id, module: 'product', param: 'priority', paramvalue: 1 }
            // self.$http.post(`${ENV.BokaApi}/api/setModulePara/product`, params).then(function (res) {
            //   let data = res.data
            //   self.$vux.loading.hide()
            //   self.$vux.toast.show({})
            // })
          }
        })
      }
    },
    controlpopup1 (item, index) {
      console.log('=====进入点击更多操作展示菜单====')
      this.showpopup1 = !this.showpopup1
      console.log('输出showpopup1')
      console.log(this.showpopup1)
      console.log('====item===')
      console.log(item)
      this.clickdata = item
      this.clickindex = index
    },
    saveevent () {
      this.$router.push({path: '/addFactoryCard'})
    }
  },
  activated () {
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
.factoryCardList{}
.factoryCardList .disimg{filter: grayscale(0.8);}
.factoryCardList .lists{padding:0px 20px 10px;}
.factoryCardList .hiddenbox{height: 45px;}
.factoryCardList .yhq_item{
  width: 100%;position:relative;background-color: white;color:#716f76;
  display: flex;justify-content: center;align-items: center;
  margin-top:10px;
}
.factoryCardList .b-bottom{border-bottom: 2px dashed #f2f3f2}
.factoryCardList .percentarea{width: 75% !important;height: 5px !important;background: #f6f6f6 !important;}
.factoryCardList .inner{height:5px !important;background-color:#eb6b5e !important; }
.factoryCardList .proInfo{box-sizing: border-box;padding: 10px 20px}
.factoryCardList .hxj{text-decoration: line-through;}
.factoryCardList .flex_between{display: flex;justify-content: space-between;}
.factoryCardList .stop{background-color: #aeafae !important;}
.factoryCardList .yhq_item.grayitem{background-color: #999;}
.factoryCardList .yhq_item .txt{color:#fff;}
.factoryCardList .yhq_item.grayitem .txt{color:orange;}
.factoryCardList .yhq_item  .flex_column{display:flex;flex-direction: column;align-items: center;justify-content: center;}
.factoryCardList .txt-cell{position:relative;padding-top:15px;padding-bottom:15px;padding-left:10px;box-sizing: border-box;}
.factoryCardList .txt-cell:after{
  content:"";display:block;
  border-right:#fff 1px dashed;
	position: absolute;right: 0;top: 0;left: 0;
	-webkit-transform: scaleX(0.5) translateX(0.5px);
	transform: scaleX(0.5) translateX(0.5px);
	-webkit-transform-origin: 0% 0%;
	transform-origin: 0% 0%;
}
.factoryCardList .yhq_item .ball{
  position: absolute;
  width: 30px;
  height: 30px;
  bottom: -15px;
  background-color: #f2f3f2;
  border-radius: 50%;
}
.factoryCardList .yhq_item .ball-left{left: -15px;}
.factoryCardList .yhq_item .ball-right{right: -15px;}
.factoryCardList .yhq_item .ball-up{top: -15px;}
.factoryCardList .yhq_item .ball-down{bottom: -15px;}
.factoryCardList .yhq_item .pic{width:50px;}
.factoryCardList .yhq_item .pic image{width:40px;height:40px;border-radius:50%;}
.factoryCardList .btn-cell{width:90px;padding-top:15px;padding-bottom:15px;box-sizing: border-box;}
.factoryCardList .btn-cell .al{font-size:65px;}
.factoryCardList .btn-cell .icon-chat{margin-top:4px;}
.factoryCardList .rbtn{display:inline-block;padding:5px;border-radius:50px;background-color: #ff6a61;font-weight: bolder;width: 50px;text-align: center;}
.factoryCardList .color-theme{color: white !important;}
.factoryCardList .yhq_item .rtxt{flex:1;text-align:right;color:#ff6a6;}
.modalarea .modal{height:350px;}
.modalarea .radio-group{width:100%;padding:10px;box-sizing: border-box;}
.modalarea .radio-group .radio:not(:last-child){margin-bottom:10px;}
.factoryCardList .fixed-icon{
  position: absolute;z-index:10;bottom: 10px;right:15px;
  font-size: 40px;width:40px;height:40px;color:#fff;border-radius:50%;
}
.factoryCardList .tag-add{right:10px;}
.factoryCardList .fixed-icon .inner{width:100%;height:100%;}
.factoryCardList .fixed-icon .al{font-weight:bold;color:#fff;font-size:26px;margin-top:-2px;}
</style>
