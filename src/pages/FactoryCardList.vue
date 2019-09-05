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
        <template v-if="disList1">
          <div v-if="!tabData1 || !tabData1.length" class="scroll_item padding10 align_center color-gray">
            <div><i class="al al-wushuju font60 pt20"></i></div>
            <div class="mt5">暂无发放优惠券！</div>
          </div>
          <div v-else class="scroll_list">
            <div class="lists" v-for="(item,index) in tabData1" :key="index">
              <div class="list-item">
                <div class="yhq_item">
                  <div class="flex_cell b-bottom" style="overflow:visible">
                    <div class="flex_between" style="padding:10px 20px 0px 20px;">
                      <div class="font18"><span style="font-weight:bold;color:#eb6b5e;">¥ {{item.facemoney}}</span><span class="color-gray3 font16 ml5"> (满{{item.ordermoney}}元可用)</span></div>
                      <div class="flex_column">
                        <div class="rbtn color-theme" @click="controlpopup1(item, index)">· · ·</div>
                      </div>
                    </div>
                    <div style="padding:5px 20px;">{{item.starttime | dateformat}} 至 {{item.endtime | dateformat}}</div>
                    <div class="flex_left">
                      <div class="ball ball-left"></div>
                      <div class="ball ball-right"></div>
                    </div>
                  </div>
                </div>
                <div class="w_100 proInfo">
                  <div class="db-flex">
                    <div class="pic v_middle w80">
                      <img class="v_middle imgcover" :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" style="width:70px;height:70px;" />
                    </div>
                    <div class="flex_cell">
                      <div class="clamp1 font16">{{item.title}}</div>
                      <div class="hxj">¥ {{item.productprice}}</div>
                      <div class="font16" style="color:#eb6b5e;">领券后 <span style="font-weight:bold">¥ {{item.discountprice}}</span></div>
                    </div>
                  </div>
                  <div class="w_100 pt10 flex_center">
                    <div class="flex_cell flex_left">
                      <div class="percentarea v_middle">
                        <div class="inner" :style="`width:${(item.totalcount - item.leftstorage) / item.totalcount * 100}%`"></div> <!-- 这里的width需要计算百分比 -->
                      </div>
                    </div>
                    <div class="w100 flex_center">
                      <div class="w_100 align_center clamp1 font12">仅剩{{item.leftstorage}}张</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
      <div v-show="(selectedIndex == 1)">
        <template v-if="disList2">
          <div v-if="!tabData2 || !tabData2.length" class="scroll_item padding10 align_center color-gray">
            <div><i class="al al-wushuju font60 pt20"></i></div>
            <div class="mt5">暂无已停止发放优惠券！</div>
          </div>
          <div v-else class="scroll_list">
            <div class="lists finished" v-for="(item,index) in tabData2" :key="index">
              <div>
                <div class="yhq_item">
                  <div class="flex_cell b-bottom" style="overflow:visible">
                    <div class="flex_between" style="padding:10px 20px 0px 20px;">
                      <div class="font18"><span style="font-weight:bold;color:#eb6b5e;">¥ {{item.facemoney}}</span><span class="color-gray3 font16"> (满{{item.ordermoney}}元可用)</span></div>
                      <div class="flex_column">
                        <div class="rbtn color-theme" @click="controlpopup1(item, index)">· · ·</div>
                      </div>
                    </div>
                    <div style="padding:5px 20px;">{{item.starttime | dateformat}} 至 {{item.endtime | dateformat}}</div>
                    <div class="flex_left">
                      <div class="ball ball-left"></div>
                      <div class="ball ball-right"></div>
                    </div>
                  </div>
                </div>
                <div class="w_100 proInfo">
                  <div class="db-flex">
                    <div class="pic v_middle w80">
                      <img class="v_middle imgcover" :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" style="width:70px;height:70px;" />
                    </div>
                    <div class="ml10" style="width:70%;">
                      <div class="clamp1 font16">{{item.title}}</div>
                      <div class="hxj">¥ {{item.productprice}}</div>
                      <div class="font16" style="color:#eb6b5e;">领券后 <span style="font-weight:bold">¥ {{item.discountprice}}</span></div>
                    </div>
                  </div>
                  <div class="w_100 pt10 flex_center">
                    <div class="flex_cell flex_left">
                      <div class="percentarea v_middle">
                        <div class="inner" :style="`width:${(item.totalcount - item.leftstorage) / item.totalcount * 100}%`"></div> <!-- 这里的width需要计算百分比 -->
                      </div>
                    </div>
                    <div class="w100 flex_center">
                      <div class="w_100 align_center clamp1 font12">仅剩{{item.leftstorage}}张</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
      <div class="hiddenbox"></div>
    </div>
    <div class="s-bottom border-box flex_center color-white list-shadow02" style="background-color:#eb6b5e;" @click="saveevent">
      <div class="flex_cell flex_center color-white">创建优惠券</div>
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
              <router-link class="inner" :to="{path: '/stat', query: {id: clickdata.id, module: 'miniactivity'}}">统计</router-link>
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
import ENV from 'env'
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
      tabData1: [],
      tabData2: [],
      pageStart1: 0,
      pageStart2: 0,
      disList1: false,
      disList2: false,
      limit: 10,
      loginUser: {},
      clickdata: {},
      clickindex: 0,
      showpopup1: false,
      Fid: 0
    }
  },
  methods: {
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
    swiperChange (index) {
      const self = this
      if (index !== undefined) {
        this.selectedIndex = index
      }
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
    onItemClick () {  // 选择对应tab获取对应订单状态列表数据
      this.swiperChange()
    },
    getData1 (isone) {
      // 获取正在发放优惠券数据
      this.$vux.loading.show()
      const self = this
      let params = {finished: 0, showtype: 'factorycard', do: 'all', pagestart: self.pageStart1, limit: self.limit, fid: self.loginUser.fid}
      if (isone) {
        params.pagestart = this.tabData1.length
        params.limit = 1
      }
      self.$http.post(`${ENV.BokaApi}/api/miniactivity/getList`,
        params
      ).then(function (res) {
        const data = res.data
        self.$vux.loading.hide()
        const retdata = data.data ? data.data : data
        self.tabData1 = self.tabData1.concat(retdata)
        self.disList1 = true
        console.log('----response-----')
        console.log(self.tabData1)
      })
    },
    getData2 (isone) {
      // 获取停止发放优惠券数据
      this.$vux.loading.show()
      const self = this
      let params = {finished: 1, showtype: 'factorycard', do: 'all', pagestart: self.pageStart2, limit: self.limit, fid: self.loginUser.fid}
      if (isone) {
        params.pagestart = this.tabData1.length
        params.limit = 1
      }
      self.$http.post(`${ENV.BokaApi}/api/miniactivity/getList`,
        params
      ).then(function (res) {
        const data = res.data
        self.$vux.loading.hide()
        const retdata = data.data ? data.data : data
        self.tabData2 = self.tabData2.concat(retdata)
        self.disList2 = true
        console.log('----response-----')
        console.log(self.tabData2)
      })
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
            self.$vux.loading.show()
            // 停止优惠券发放操作 向后台发送请求
            self.$http.post(`${ENV.BokaApi}/api/miniactivity/stop`, {
              id: this.clickdata.id
            }).then(res => {
              let data = res.data
              self.$vux.loading.hide()
              self.$vux.toast.show({
                text: data.error,
                type: data.flag !== 1 ? 'warn' : 'success',
                time: self.$util.delay(data.error),
                onHide: () => {
                  if (data.flag === 1) {
                    if (this.tabData1.length === (this.pageStart1 + 1) * this.limit) {
                      this.getData1(true)
                    }
                    this.tabData1.splice(this.clickindex, 1)
                    this.clickdata.finished = 1
                    if (this.tabData2.length) {
                      if (this.tabData2.length === (this.pageStart2 + 1) * this.limit) {
                        this.tabData2.splice(this.tabData2.length - 1, 1)
                      }
                      this.tabData2 = this.clickdata.concat(this.tabData2)
                    }
                  }
                }
              })
            })
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
      let rparams = this.$util.handleAppParams(this.query, {fid: this.Fid})
      this.$router.push({path: '/addFactoryCard', query: rparams})
    }
  },
  created () {
  },
  activated () {
    this.loginUser = User.get()
    this.Fid = this.loginUser.fid
    this.query = this.$route.query
    if (this.query.fid) {
      this.Fid = this.query.fid
    }
    if (this.query.refresh) {
      this.disList1 = false
      this.disList2 = false
      this.selectedIndex = 0
      this.tabData1 = []
      this.tabData2 = []
      this.pageStart1 = 0
      this.pageStart2 = 0
      this.swiperChange()
    } else {
      this.swiperChange()
    }
  }
}
</script>
<style lang="less">
.factoryCardList{
  .list-item{box-shadow: 0 2px 6px rgba(0,0,0,0.1);}
}
.factoryCardList .disimg{filter: grayscale(0.8);}
.factoryCardList .lists{padding:0px 20px 10px;}
.factoryCardList .hiddenbox{height: 45px;}
.factoryCardList .yhq_item{
  width: 100%;position:relative;background-color: white;color:#716f76;
  display: flex;justify-content: center;align-items: center;
  margin-top:10px;
}
.factoryCardList .finished .yhq_item{background-color:#ccc;}
.factoryCardList .b-bottom{border-bottom: 2px dashed #f2f3f2}
.factoryCardList .percentarea{width:100% !important;height: 5px !important;background: #f6f6f6 !important;}
.factoryCardList .inner{height:5px !important;background-color:#eb6b5e !important; }
.factoryCardList .proInfo{box-sizing: border-box;padding: 10px 20px;background-color:#fff;}
.factoryCardList .finished .proInfo{background-color:#ccc;}
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
