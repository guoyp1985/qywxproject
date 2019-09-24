<template>
  <div class="containerarea bg-page font14 factory-customer-page">
    <subscribe v-if="loginUser.subscribe == 0 && !loginUser.isretailer"></subscribe>
    <apply-tip v-if="showApply"></apply-tip>
    <template v-if="showContainer">
      <div class="s-container s-container1" style="top:0;" @scroll="handleScroll('scrollContainer1', 0)">
        <div class="swiper-inner scroll-container1" ref="scrollContainer1" @scroll="handleScroll('scrollContainer1')">
          <div v-if="distabdata1" class="scroll_list">
            <div v-if="!tabdata1 || tabdata1.length === 0" class="scroll_item padding10 color-gray align_center">
              <template v-if="searchresult1">
                <div class="flex_center" style="height:80px;">暂无搜索结果</div>
              </template>
              <template v-else>
                <div>暂无数据</div>
              </template>
            </div>
            <div v-else v-for="(item,index) in tabdata1" :key="item.id" class="scroll_item pt10 pl12 pr12 bg-white mb10 list-shadow">
              <div class="t-table pb10" @click="btnDetail(index)">
                <div class="t-cell v_middle w70">
                  <img class="avatarimg3 imgcover" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
                </div>
                <div class="t-cell v_middle">
                  <div class="clamp1 font14 color-lightgray">{{item.linkman}}</div>
                </div>
                <div class="t-cell v_middle w60 align_right">
                  <div class="qbtnInfo bg-red color-white al al-asmkticon0165 font20"></div>
                </div>
              </div>
              <div v-if="item.checked">
                <div class="detailInfo w_100 font14 color-gray b_bottom_after">
                  <div class="txt-item" @click="btnDetail(index)">性别: {{item.sexname}}</div>
                  <div class="txt-item" @click="btnDetail(index)">地区: {{ item.country }} {{ item.province }} {{ item.city }}</div>
                  <div class="txt-item flex_left" @click="influence">影响力:
                    <span class="color-red4">{{item.yingxiangli}}</span>
                    <span class="al al-wenhao font20 ml5" style="margin-top:-2px;"></span>
                  </div>
                  <div class="txt-item">累计消费: {{$t('RMB')}}{{item.salesmoney}}</div>
                </div>
                <div class="flex_center bg-white h40">
                  <div class="t-table align_center color-gray2 font14 color-gray2">
                    <div class="t-cell v_middle b_right_after" @click="toSaleRecord(item)">消费记录</div>
                    <div class="t-cell v_middle" @click="toChat(item)">
                      <div>联系TA</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-transfer-dom class="x-popup">
        <popup v-model="isshowfluence" height="100%">
          <div class="popup1 font14">
            <div class="percentlayer">
              <div class="bg"></div>
              <div class="w_100 h_100 flex_center">
                <div class="layerinner align_left probability">
                  <div class="inner">
                    <div class="pro" >
                      <div class="pro-sucess">
                        <div class="flex_left">
                          <img class="v_middle" src="https://tossharingsales.boka.cn/images/infor.png"/>
                          <div class="color-blue">什么是影响力</div>
                        </div>
                        <div class="font12" >影响力是指客户通过分享动作所带来的访问量，影响力数值越大，表示该客户越受朋友欢迎，所分享的内容打开率越高，可将影响力高的客户发展成代理，通过他的资源为你带来更多销量！</div>
                      </div>
                    </div>
                  </div>
                  <div class="pro-know">
                    <span class="close" @click="closepopup">知道了</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </popup>
      </div>
      <div v-transfer-dom class="x-popup">
        <popup v-model="isshowpopup" height="100%">
          <div class="popup1 font14">
            <div class="percentlayer">
              <div class="bg"></div>
              <div class="w_100 h_100 flex_center">
                <div class="layerinner align_left probability">
                  <div class="inner">
                    <div class="pro" >
                      <div class="pro-sucess">
                        <div class="flex_left">
                          <img class="v_middle" src="https://tossharingsales.boka.cn/images/infor.png"/>
                          <div class="color-blue">什么是成交概率</div>
                        </div>
                        <div class="font12" >成交概率是系统自动根据客户查看文章等行为，自动计算出该客户的真正成为购买客户的可能性。数字越大,可能性越大,成交概率就越高。</div>
                      </div>
                      <div class="pro-push">
                        <div class="flex_left">
                          <img class="v_middle" src="https://tossharingsales.boka.cn/images/infor.png"/>
                          <div class="color-blue">如何提升成交概率</div>
                        </div>
                        <div class="font12">1、推送客户感兴趣的文章;</div>
                        <div class="font12">2、发展更多的返点客。</div>
                      </div>
                    </div>
                  </div>
                  <div class="pro-know">
                    <span class="close" @click="closepopup">知道了</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </popup>
      </div>
      <div v-transfer-dom class="red-popup">
        <popup v-model="showPopupSex">
          <popup-header
          :left-text="$t('Cancel')"
          :right-text="$t('Confirm')"
          :show-bottom-border="false"
          @on-click-left="showPopupSex = false"
          @on-click-right="listSex"></popup-header>
          <group gutter="0" class="red-radio">
            <radio
              v-model="sexKey"
              :options="sexArr"
              :selected-label-style="{color: '#ea3a3a'}"></radio>
          </group>
        </popup>
      </div>
      <div v-transfer-dom class="red-popup">
        <popup v-model="showPopupArea">
          <popup-header
          :left-text="$t('Cancel')"
          :right-text="$t('Confirm')"
          :show-bottom-border="false"
          @on-click-left="showPopupArea = false"
          @on-click-right="listArea"></popup-header>
          <group gutter="0" class="red-radio">
            <radio
              v-model="areaKey"
              :options="areaArr"
              :selected-label-style="{color: '#ea3a3a'}"></radio>
          </group>
        </popup>
      </div>
    </template>
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
import { Tab, TabItem, Swiper, SwiperItem, Search, Group, Popup, TransferDom, XImg, PopupHeader, Radio } from 'vux'
import ENV from 'env'
import Time from '../../libs/time'
import { User } from '#/storage'
import Subscribe from '@/components/Subscribe'
import ApplyTip from '@/components/ApplyTip'

export default {
  directives: {
    TransferDom
  },
  components: {
    Tab, TabItem, Swiper, SwiperItem, Search, Group, Popup, XImg, Subscribe, ApplyTip, PopupHeader, Radio
  },
  data () {
    return {
      loginUser: {},
      query: {},
      showApply: false,
      showContainer: false,
      autofixed: false,
      tabtxts: [ '潜在客户', '意向客户', '成交客户' ],
      tabcount1: 0,
      tabcount2: 0,
      tabcount3: 0,
      selectedIndex: 0,
      distabdata1: false,
      distabdata2: false,
      distabdata3: false,
      tabdata1: [],
      tabdata2: [],
      tabdata3: [],
      isshowpopup: false,
      isshowfluence: false,
      searchword1: '',
      searchword2: '',
      searchword3: '',
      searchresult1: false,
      searchresult2: false,
      searchresult3: false,
      limit: 10,
      pagestart1: 0,
      pagestart2: 0,
      pagestart3: 0,
      dateClass: 'active',
      areaClass: '',
      sexClass: '',
      orderby: '',
      orderbyParams: {},
      showPopupSex: false,
      sexKey: 0,
      sexArr: [
        { key: 0, value: '未知' },
        { key: 1, value: '男' },
        { key: 2, value: '女' }
      ],
      sexParams: {0: '未知', 1: '男', 2: '女'},
      showPopupArea: false,
      areaKey: 0,
      areaArr: [],
      disAreaOrder: false,
      disOrderArea: false,
      selectedArea: null,
      selectedSex: null,
      detailShow: false
    }
  },
  methods: {
    toPhone (item) {
      location.href = `tel:${item.mobile}`
    },
    priorityEvent (item, index) {
      const self = this
      self.$vux.loading.show()
      self.$http.post(`${ENV.BokaApi}/api/retailer/sellerAction`,
        { action: 'stickcustomer', customeruid: item.uid }
      ).then(res => {
        const data = res.data
        self.$vux.loading.hide()
        self.$vux.toast.show({
          text: data.error,
          time: self.$util.delay(data.error),
          onHide: () => {
            if (data.flag === 1) {
              if (self.selectedIndex === 0) {
                self.tabdata1[index].priority = !self.tabdata1[index].priority
              } else if (self.selectedIndex === 2) {
                self.tabdata2[index].priority = !self.tabdata2[index].priority
              } else if (self.selectedIndex === 1) {
                self.tabdata3[index].priority = !self.tabdata3[index].priority
              }
            }
          }
        })
      })
    },
    toMembersView (item) {
      let params = this.$util.handleAppParams(this.query, {uid: item.uid})
      this.$router.push({path: '/membersView', query: params})
    },
    toChat (item) {
      let params = this.$util.handleAppParams(this.query, {uid: item.gxkuid, fromModule: 'retailer'})
      this.$router.push({path: '/chat', query: params})
    },
    toSaleRecord (item) {
      let params = this.$util.handleAppParams(this.query, {uid: item.uid, fid: this.loginUser.fid})
      this.$router.push({path: '/factoryOrders', query: params})
    },
    btnDetail (index) {
      for (var i = 0; i < this.tabdata1.length; i++) {
        if (i !== index && this.tabdata1[i].checked) {
          this.tabdata1[i].checked = false
          break
        }
      }
      this.tabdata1[index].checked = !this.tabdata1[index].checked
    },
    btnDetail1 (index) {
      for (var i = 0; i < this.tabdata3.length; i++) {
        if (i !== index && this.tabdata3[i].checked) {
          this.tabdata3[i].checked = false
          break
        }
      }
      this.tabdata3[index].checked = !this.tabdata3[index].checked
    },
    btnDetail2 (index) {
      for (var i = 0; i < this.tabdata2.length; i++) {
        if (i !== index && this.tabdata2[i].checked) {
          this.tabdata2[i].checked = false
          break
        }
      }
      this.tabdata2[index].checked = !this.tabdata2[index].checked
    },
    toStore () {
      if (this.query.from === 'miniprogram') {
        this.$wechat.miniProgram.navigateTo({url: ENV.MiniRouter.store})
      } else {
        this.$router.push({path: '/store'})
      }
    },
    toNews () {
      if (this.query.from === 'miniprogram') {
        this.$wechat.miniProgram.navigateTo({url: ENV.MiniRouter.contentsNews})
      } else {
        this.$router.push({path: '/store'})
      }
    },
    handleScroll (refname, index) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          if (self.tabdata1.length === (self.pagestart1 + 1) * self.limit) {
            self.pagestart1++
            self.$vux.loading.show()
            self.getData1()
          }
        }
      })
    },
    removeOrderActive () {
      const self = this
      self.dateClass = self.dateClass.replace(' active', '').replace('active', '')
      self.areaClass = self.areaClass.replace(' active', '').replace('active', '')
      self.sexClass = self.sexClass.replace(' active', '').replace('active', '')
    },
    dateOrder () {
      const self = this
      self.selectedArea = null
      self.selectedSex = null
      if (self.dateClass.indexOf('active') < 0) {
        self.removeOrderActive()
        self.dateClass = 'active'
        self.orderbyParams = { orderby: 'dateline' }
      } else {
        self.removeOrderActive()
        self.dateClass = ''
        self.orderbyParams = {}
      }
      self.pagestart1 = 0
      self.distabdata1 = false
      self.tabdata1 = []
      self.getData1()
    },
    sexOrder () {
      this.showPopupSex = true
      this.removeOrderActive()
      this.sexClass = 'active'
    },
    listSex () {
      const self = this
      self.showPopupSex = false
      self.$vux.loading.show()
      self.pagestart1 = 0
      self.distabdata1 = false
      self.tabdata1 = []
      self.selectedArea = null
      self.orderbyParams = {orderby: 'sex', sex: self.sexKey}
      self.selectedSex = self.sexParams[self.sexKey]
      self.getData1()
    },
    areaOrder () {
      this.showPopupArea = true
      this.removeOrderActive()
      this.areaClass = 'active'
    },
    listArea () {
      const self = this
      self.showPopupArea = false
      self.$vux.loading.show()
      self.pagestart1 = 0
      self.distabdata1 = false
      self.tabdata1 = []
      self.selectedSex = null
      self.orderbyParams = { orderby: 'province', province: self.areaArr[self.areaKey].value }
      self.selectedArea = self.orderbyParams.province
      self.getData1()
    },
    getData1 () {
      const self = this
      this.$vux.loading.show()
      let params = {tolevel: -1, pagestart: self.pagestart1, limit: self.limit, fid: this.loginUser.fid, appid: this.query.appid}
      let keyword = self.searchword1
      if (typeof keyword !== 'undefined' && keyword && self.$util.trim(keyword) !== '') {
        self.searchresult1 = true
        params.keyword = keyword
      } else {
        self.searchresult1 = false
      }
      if (typeof self.orderby !== 'undefined' && self.orderby && self.$util.trim(self.orderby) !== '') {
        params.orderby = self.orderby
      }
      for (let key in self.orderbyParams) {
        params[key] = self.orderbyParams[key]
      }
      self.$http.post(`${ENV.BokaApi}/api/factory/mincustomerList`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        self.tabcount1 = data.count
        let retdata = data.data ? data.data : data
        for (var i = 0; i < retdata.length; i++) {
          retdata[i].checked = false
          retdata[i].dateline_str = new Time(retdata[i].dateline * 1000).dateFormat('yyyy-MM-dd')
        }
        self.tabdata1 = self.tabdata1.concat(retdata)
        self.distabdata1 = true
      })
    },
    onChange1 (val) {
      this.searchword1 = val
    },
    onCancel1 () {
      const self = this
      self.searchword1 = ''
      self.$vux.loading.show()
      self.distabdata1 = false
      self.tabdata1 = []
      self.pagestart1 = 0
      self.getData1()
    },
    onSubmit1 () {
      const self = this
      self.$vux.loading.show()
      self.distabdata1 = false
      self.tabdata1 = []
      self.pagestart1 = 0
      self.getData1()
    },
    influence () {
      this.isshowfluence = true
    },
    percentclick () {
      this.isshowpopup = true
    },
    closepopup () {
      this.isshowpopup = false
      this.isshowfluence = false
    },
    getDateState (dt) {
      return this.$util.getDateState(dt)
    },
    getDateClass (dt) {
      let ret = this.$util.getDateClass(dt)
      ret = `${ret} mr5`
      return ret
    },
    getData () {
      this.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, {
        module: 'retailer', action: 'customerlist'
      })
    },
    init () {
      this.getData()
    },
    initContainer () {
      const self = this
      self.showApply = false
      self.showContainer = false
      self.distabdata1 = false
      self.tabdata1 = []
      self.pagestart1 = 0
    },
    refresh () {
      const self = this
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.loginUser = User.get()
      if (this.loginUser && (this.loginUser.subscribe !== 0 || this.loginUser.isretailer)) {
        this.query = this.$route.query
        if (this.query.type === 'customer') {
          self.dateClass = ''
        }
        if (!this.loginUser.isretailer) {
          self.initContainer()
          this.showApply = true
        } else {
          self.initContainer()
          this.showContainer = true
          this.getData1()
        }
      }
    }
  },
  created () {
    this.init()
  },
  activated () {
    this.refresh()
    this.$util.miniPost()
  }
}
</script>

<style lang="less">
.factory-customer-page{
  .phone{width:20px;height:20px;background-color:red;color:#fff;border-radius:5px;text-align:center;line-height:20px;}
  .detailInfo{
    background-color:#fff;display:flex;padding:10px;box-sizing:border-box;flex-wrap: wrap;
    .txt-item{width:50%;box-sizing:border-box;line-height:25px;position:relative;}
    .txt-item:nth-child(odd){padding-right:5px;}
    .txt-item:nth-child(even){padding-left:5px;}
  }
  .qbtnInfo{
    display: inline-block;
    vertical-align: middle;
    border-radius: 50px;
    text-align: center;
    padding: 2px 10px;
    font-size: 14px;
    line-height: 1;
  }
  .condition{
    position: relative;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #eeeeee;
  }
  .h35{
    height: 35px;
    line-height: 35px;
  }
  .orderbyarea .orderbyitem{
    position:relative;
    text-align:center;
  }
  .orderbyarea .orderbyitem.active{color: #ea3a3a;}
  .orderbyarea .orderbyitem:not(:last-child):after{
    content: "";
    position: absolute;
    right:0;
    top:50%;
    margin-top:-8px;
    height: 16px;
    width: 1px;
    background-color: #f5f5f5;
  }
  .orderbyarea .orderbyitem.active .ico:after{
    content: '▼';font-size:12px;margin-left:5px;
  }
}
</style>
