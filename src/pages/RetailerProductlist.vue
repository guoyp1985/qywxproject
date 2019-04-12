<template>
  <div class="containerarea bg-page font14 s-havebottom rproductlist">
    <tab v-model="selectedIndex" class="w_100 v-tab">
      <tab-item v-for="(item,index) in tabtxts" :selected="selectedIndex == index" :key="index">{{item}}</tab-item>
    </tab>
    <div class="s-container scroll-container" style="top:50px;">
      <swiper v-model="selectedIndex" class="x-swiper no-indicator" @on-index-change="swiperChange">
        <swiper-item v-for="(tabitem, index) in tabtxts" :key="index">
          <div v-if="(index == 0)" class="swiper-inner" ref="scrollContainer1" @scroll="handleScroll('scrollContainer1', index)">
            <div class="pro_box bg-page list_shadow pl12 pr12 pb15 border-box">
              <div class="pro_list_top"></div>
              <div class="rule pb12 pt12 pl12 pr12 border color-lightgray b_bottom_after list-shadow bg-white font12" style="margin-top: -4px;">
                <div>悄悄告诉你，立即分享新发布的商品可以：</div>
                <div>1. 接收好友查看商品的通知；</div>
                <div>2. 监控谁看过、分享过以及多次浏览过你的商品；</div>
                <div>3. 获得到更多潜在客户及销售机会。</div>
              </div>
            </div>
            <template v-if="disList1">
              <template v-if="!tabData1 || !tabData1.length">
                <div class="flex_center padding20 color-gray">暂无商品，快去添加商品吧！</div>
              </template>
              <div v-else class="scroll_list ">
                <router-link :to="{path:'/product',query:{id:item.id, wid: loginUser.uid}}" class="scroll_item mb10 font14 bg-white db list-shadow " v-for="(item,index) in tabData1" :key="index" style="color:inherit;">
                  <div v-if="item.moderate == 0" class="ico down"></div>
              		<div class="t-table bg-white pt10 pb10">
              			<div class="t-cell pl12 v_middle" style="width:110px;">
                      <img class="imgcover v_middle" :src="getPhoto(item.photo)" style="width:100px;height:100px;" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
                    </div>
              			<div class="t-cell v_middle">
                      <div class="clamp1 font16 pr10 color-lightgray"><span v-if="item.priority == 1" style="color:#fd8c2c;">【精选】</span>{{item.title}}</div>
                      <div class="t-table pr12 border-box mt15">
                        <div class="t-cell color-999 font14">
                          <div class="clamp1">售价:<span class="color-red"> {{ $t('RMB') }}{{ item.price }}</span></div>
                          <div class="clamp1 mt5" v-if="item.fpid > 0">厂家佣金:<span class="color-red"> {{ $t('RMB') }}{{ item.rebatein }}</span></div>
                          <div class="clamp1 mt5 font12">
                              <span class="v_middle db-in mr5" v-if="item.fpid == 0">库存: {{ item.storage }}{{item.unit}}</span>
                              <span class="v_middle db-in">已售: {{ item.saled }}{{item.unit}}</span>
                          </div>
                        </div>
                        <div class="align_right t-cell v_bottom w50">
                          <div class="btnicon bg-red color-white font12" @click="controlpopup1(item,index)">
                            <i class="al al-asmkticon0165 v_middle"></i>
                          </div>
                        </div>
                      </div>
              			</div>
              		</div>
                </router-link>
              </div>
            </template>
          </div>
          <div v-if="(index == 1)" class="swiper-inner" ref="scrollContainer2" @scroll="handleScroll('scrollContainer2', index)">
            <div class="pro_box bg-page list_shadow pl12 pr12 pb15 border-box">
              <div class="pro_list_top"></div>
              <div class="rule pb12 pt12 pl12 pr12 border color-lightgray b_bottom_after list-shadow bg-white font12" style="margin-top: -4px;">
                <div>悄悄告诉你，立即分享新发布的商品可以：</div>
                <div>1. 接收好友查看商品的通知；</div>
                <div>2. 监控谁看过、分享过以及多次浏览过你的商品；</div>
                <div>3. 获得到更多潜在客户及销售机会。</div>
              </div>
            </div>
            <template v-if="disList2">
              <div v-if="!tabData2 || !tabData2.length" class="flex_center padding20 color-gray">暂无厂家商品，快去货源里看看吧！</div>
              <div v-else class="scroll_list ">
                <router-link :to="{path:'/product',query:{id:item.id, wid: loginUser.uid}}" class="scroll_item mb10 font14 bg-white db list-shadow " v-for="(item,index) in tabData2" :key="index" style="color:inherit;">
                  <div v-if="item.moderate == 0" class="ico down"></div>
              		<div class="t-table bg-white pt10 pb10">
              			<div class="t-cell pl12 v_middle" style="width:110px;">
                      <img class="imgcover v_middle" :src="getPhoto(item.photo)" style="width:100px;height:100px;" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
                    </div>
              			<div class="t-cell v_middle">
                      <div class="clamp1 font16 pr10 color-lightgray"><span v-if="item.priority == 1" style="color:#fd8c2c;">【精选】</span>{{item.title}}</div>
                      <div class="t-table pr12 border-box mt15">
                        <div class="t-cell color-999 font14">
                          <div class="clamp1">售价:<span class="color-red"> {{ $t('RMB') }}{{ item.price }}</span></div>
                          <div class="clamp1 mt5" v-if="item.fpid > 0">厂家佣金:<span class="color-red"> {{ $t('RMB') }}{{ item.rebatein }}</span></div>
                          <div class="clamp1 mt5 font12">
                              <span class="v_middle db-in mr5" v-if="item.fpid == 0">库存: {{ item.storage }}{{item.unit}}</span>
                              <span class="v_middle db-in">已售: {{ item.saled }}{{item.unit}}</span>
                          </div>
                        </div>
                        <div class="align_right t-cell v_bottom w50">
                          <div class="btnicon bg-red color-white font12" @click="controlpopup1(item,index)">
                            <i class="al al-asmkticon0165 v_middle"></i>
                          </div>
                        </div>
                      </div>
              			</div>
              		</div>
                </router-link>
              </div>
            </template>
          </div>
          <div v-if="(index == 2)" class="swiper-inner" ref="scrollContainer3" @scroll="handleScroll('scrollContainer3', index)">
            <div class="pro_box bg-page list_shadow pl12 pr12 pb15 border-box">
              <div class="pro_list_top"></div>
              <div class="rule pb12 pt12 pl12 pr12 border color-lightgray b_bottom_after list-shadow bg-white font12" style="margin-top: -4px;">
                <div>悄悄告诉你，立即分享新发布的商品可以：</div>
                <div>1. 接收好友查看商品的通知；</div>
                <div>2. 监控谁看过、分享过以及多次浏览过你的商品；</div>
                <div>3. 获得到更多潜在客户及销售机会。</div>
              </div>
            </div>
            <template v-if="disList3">
              <div v-if="!tabData3 || !tabData3.length" class="flex_center padding20 color-gray">暂无下架商品！</div>
              <div v-else class="scroll_list ">
                <router-link :to="{path:'/product',query:{id:item.id, wid: loginUser.uid}}" class="scroll_item mb10 font14 bg-white db list-shadow " v-for="(item,index) in tabData3" :key="index" style="color:inherit;">
                  <div v-if="item.moderate == 0" class="ico down"></div>
              		<div class="t-table bg-white pt10 pb10">
              			<div class="t-cell pl12 v_middle" style="width:110px;">
                      <img class="imgcover v_middle" :src="getPhoto(item.photo)" style="width:100px;height:100px;" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
                    </div>
              			<div class="t-cell v_middle">
                      <div class="clamp1 font16 pr10 color-lightgray"><span v-if="item.priority == 1" style="color:#fd8c2c;">【精选】</span>{{item.title}}</div>
                      <div class="t-table pr12 border-box mt15">
                        <div class="t-cell color-999 font14">
                          <div class="clamp1">售价:<span class="color-red"> {{ $t('RMB') }}{{ item.price }}</span></div>
                          <div class="clamp1 mt5" v-if="item.fpid > 0">厂家佣金:<span class="color-red"> {{ $t('RMB') }}{{ item.rebatein }}</span></div>
                          <div class="clamp1 mt5 font12">
                              <span class="v_middle db-in mr5" v-if="item.fpid == 0">库存: {{ item.storage }}{{item.unit}}</span>
                              <span class="v_middle db-in">已售: {{ item.saled }}{{item.unit}}</span>
                          </div>
                        </div>
                        <div class="align_right t-cell v_bottom w50">
                          <div class="btnicon bg-red color-white font12" @click="controlpopup1(item,index)">
                            <i class="al al-asmkticon0165 v_middle"></i>
                          </div>
                        </div>
                      </div>
              			</div>
              		</div>
                </router-link>
              </div>
            </template>
          </div>
        </swiper-item>
      </swiper>
    </div>
    <div class="s-bottom flex_center pl12 pr12 list-shadow02 bg-white">
      <div class="flex_cell flex_center" v-if="retailerInfo.fid > 0">
        <div class="addproduct flex_center btn-bottom-red" style="width:85%;" @click="toUpdate">同步商品</div>
      </div>
      <template v-else>
        <div class="flex_cell flex_center">
          <div class="addproduct flex_center btn-bottom-orange" style="width:85%;" @click="toRecommend">{{ $t('Source of goods') }}</div>
        </div>
        <div class="flex_cell flex_center">
          <div class="addproduct flex_center btn-bottom-red" style="width:85%;" @click="toAdd">{{ $t('Add product') }}</div>
        </div>
        <div class="flex_cell flex_center">
          <div class="addproduct flex_center btn-bottom-red" style="width:85%;" @click="toCollect">{{ $t('Collect product') }}</div>
        </div>
      </template>
    </div>
    <div v-transfer-dom>
      <popup class="menuwrap" v-model="showpopup1">
        <div class="popup0">
          <div class="list" v-if="clickdata">
            <div class="item" v-if="clickdata.moderate == 1">
              <div class="inner" @click="clickpopup('activity')">创建活动</div>
            </div>
            <div class="item" v-if="clickdata.activityid == 0">
              <div v-if="clickdata.fpid > 0" class="inner" @click="clickpopup('fee')">设置返点佣金</div>
              <router-link v-else class="inner" :to="{path: '/addProduct', query: {id: clickdata.id}}">编辑</router-link>
            </div>
            <div class="item" v-if="clickdata.moderate == 0">
              <div class="inner" @click="clickpopup('up')">上架</div>
            </div>
            <div class="item" v-else-if="clickdata.moderate == 1">
              <div class="inner" @click="clickpopup('down')">下架</div>
            </div>
            <template v-if="clickdata.moderate == 1">
              <div class="item" v-if="clickdata.priority == 0">
                <div class="inner" @click="clickpopup('top')">设置为精选</div>
              </div>
              <div class="item" v-else-if="clickdata.priority == 1">
                <div class="inner" @click="clickpopup('bottom')">取消精选</div>
              </div>
            </template>
            <div class="item">
              <router-link class="inner" :to="{path: '/stat', query: {id: clickdata.id, module: 'product'}}">统计</router-link>
            </div>
            <div class="item" v-if="clickdata.moderate == 1">
              <router-link class="inner" :to="{path: '/poster', query: {id: clickdata.id, module: 'product'}}">生成海报</router-link>
            </div>
            <div class="item" v-if="clickdata.moderate == 1">
              <div class="inner" @click="clickpopup('push')">推送给返点客</div>
            </div>
            <div class="item close mt10" @click="clickpopup('row.key')">
              <div class="inner">{{ $t('Cancel txt') }}</div>
            </div>
          </div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom class="x-popup popupCustomer">
      <popup v-model="showpush" height="100%">
        <div class="popup1">
          <div class="popup-top flex_center">选择返点客</div>
          <div class="flex_left border-box pl10 pr10" style="position:absolute;left:0;right:0;top:46px;height:40px;">
            <div class="w_100">
              <check-icon class="x-check-icon w_100" :value.sync="checkAll" @click.native.stop="checkAllEvent">
                <div class="flex_left">全选</div>
              </check-icon>
            </div>
          </div>
          <div class="popup-middle font14 customer-popup-container" style="top:85px;bottom:86px;" ref="scrollCustomer" @scroll="handleScroll1('scrollCustomer')">
            <div class=" pt10 pb10 pl12 pr12">
              <div v-show="discustomerdata" class="scroll_list">
                <template v-if="customerdata.length == 0">
                  <div class="scroll_item emptyitem">
          					<div class="t-table">
          						<div class="t-cell" style="padding:10px;">暂无返点客</div>
          					</div>
          				</div>
                </template>
                <check-icon v-else class="x-check-icon scroll_item pt10 pb10" v-for="(item,index) in customerdata" :key="item.uid" :value.sync="item.checked" @click.native.stop="radioclick(item,index)">
                  <div class="t-table">
                    <div class="t-cell v_middle w50">
                      <img class="avatarimg imgcover" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
                    </div>
                    <div class="t-cell v_middle" style="color:inherit;">
                      <div class="clamp1">{{ item.linkman }}</div>
                    </div>
                  </div>
                </check-icon>
              </div>
  					</div>
          </div>
          <div class="flex_left border-box pl10 pr10" style="position:absolute;left:0;right:0;bottom:46px;height:40px;">
            <div class="w_100">
              <div class="align_left color-red font12 w_100">提示：只有48小时内互动过的返点客才可以收到通知！</div>
            </div>
          </div>
          <div class="popup-bottom flex_center">
            <div class="flex_cell h_100 flex_center bg-gray color-white" @click="closepush">{{ $t('Close') }}</div>
            <div class="flex_cell h_100 flex_center bg-green color-white" @click="submitpush">提交</div>
          </div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom class="x-popup">
      <popup v-model="showFeePopup" height="100%">
        <div class="popup1">
          <div class="popup-top flex_center">设置返点佣金</div>
          <div class="popup-middle font14">
            <div class="pt10 pb10 pl12 pr12">
              <div class="t-table bg-white pt10 pb10">
          			<div class="t-cell pl12 v_middle" style="width:110px;">
                  <img class="imgcover v_middle" :src="getPhoto(feeData.photo)" style="width:100px;height:100px;" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
                </div>
          			<div class="t-cell v_middle">
                  <div class="clamp1 font16 pr10 color-lightgray">{{feeData.title}}</div>
                  <div class="t-table pr12 border-box mt15">
                    <div class="t-cell color-999 font14">
                      <div class="clamp1">售价:<span class="color-red"> {{ $t('RMB') }}{{ feeData.price }}</span></div>
                      <div class="clamp1 mt5" v-if="feeData.fpid > 0">厂家佣金:<span class="color-red"> {{ $t('RMB') }}{{ feeData.rebatein }}</span></div>
                      <div class="clamp1 mt5">
                          <span class="v_middle db-in">已售: {{ feeData.saled }}{{feeData.unit}}</span>
                      </div>
                    </div>
                  </div>
          			</div>
          		</div>
              <div class="form-item">
                <div class="t-table">
                  <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Rebate Commission') }}<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;display:inline-block;"></span></div>
                  <div class="t-cell input-cell v_middle" style="position:relative;">
                    <input v-model="postFee" type="text" class="input" :placeholder="$t('Rebate Commission')" />
                  </div>
                </div>
              </div>
  					</div>
          </div>
          <div class="popup-bottom flex_center">
            <div class="flex_cell h_100 flex_center bg-gray color-white" @click="closeFeePopup">{{ $t('Close') }}</div>
            <div class="flex_cell h_100 flex_center bg-green color-white" @click="submitFee">提交</div>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>

<i18n>
Collect product:
  zh-CN: 采集商品
Add product:
  zh-CN: 添加商品
Back go shop:
  zh-CN: 返回店铺
</i18n>

<script>
import { TransferDom, Popup, Confirm, CheckIcon, XImg, Tab, TabItem, Swiper, SwiperItem } from 'vux'
import ENV from 'env'
import { User } from '#/storage'

const limit = 10
export default {
  directives: {
    TransferDom
  },
  components: {
    Popup, Confirm, CheckIcon, XImg, Tab, TabItem, Swiper, SwiperItem
  },
  data () {
    return {
      loginUser: {},
      retailerInfo: {},
      query: {},
      controldata1: [
        { key: 'edit', title: '编辑' },
        { key: 'up', title: '上架' },
        { key: 'down', title: '下架' },
        { key: 'stat', title: '统计' },
        { key: 'createposter', title: '生成海报' }
      ],
      selectedIndex: 0,
      showTitle: '',
      tabtxts: [ '上架商品', '厂家商品', '下架商品' ],
      disList1: false,
      disList2: false,
      disList3: false,
      tabData1: [],
      tabData2: [],
      tabData3: [],
      pageStart1: 0,
      pageStart2: 0,
      pageStart3: 0,
      pageStart4: 0,
      showpopup1: false,
      clickdata: {},
      clickindex: 0,
      limit: 10,
      showpush: false,
      customerdata: [],
      pushdata: [],
      checkAll: false,
      discustomerdata: false,
      showFeePopup: false,
      feeData: {},
      postFee: '0.00'
    }
  },
  computed: {
    getquery: function () {
      return this.$route.query
    }
  },
  methods: {
    swiperChange (index) {
      if (index !== self.selectedIndex) {
        self.selectedIndex = index
      }
      switch (this.selectedIndex) {
        case 0:
          if (this.tabData1.length < limit) {
            this.pageStart1 = 0
            this.disList1 = false
            this.tabData1 = []
            this.getData1()
          }
          break
        case 1:
          if (this.tabData2.length < limit) {
            this.pageStart2 = 0
            this.disList2 = false
            this.tabData2 = []
            this.getData2()
          }
          break
        case 2:
          if (this.tabData3.length < limit) {
            this.pageStart3 = 0
            this.disList3 = false
            this.tabData3 = []
            this.getData3()
          }
          break
      }
    },
    toUpdate () {
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/factory/fastImportFactoryProduct`, {
        fid: this.retailerInfo.fid
      }).then(res => {
        const data = res.data
        this.$vux.loading.hide()
        let error = data.flag ? '同步成功' : data.error
        this.$vux.toast.show({
          text: error,
          type: (data.flag ? 'success' : 'warn'),
          time: this.$util.delay(error),
          onHide: () => {
            this.refresh()
          }
        })
      })
    },
    openVip () {
      const self = this
      self.$vux.confirm.show({
        content: ENV.vipProduct,
        cancelText: ENV.giveUpVipText,
        confirmText: ENV.openVipText,
        onConfirm () {
          location.replace(`${ENV.Host}/#/pay?id=${self.loginUser.payorderid}&module=payorders`)
        }
      })
    },
    toRecommend () {
      if (this.loginUser.isretailer === 2 && this.tabData1.length >= 5) {
        this.openVip()
      } else {
        this.$router.push('/recommendProducts')
      }
    },
    toAdd () {
      if (this.loginUser.isretailer === 2 && this.tabData1.length >= 5) {
        this.openVip()
      } else {
        this.$router.push('/addProduct')
      }
    },
    toCollect () {
      if (this.loginUser.isretailer === 2 && this.tabData1.length >= 5) {
        this.openVip()
      } else {
        this.$router.push('/CollectProduct')
      }
    },
    getPhoto (src) {
      return this.$util.getPhoto(src)
    },
    handleScroll (refname, index) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: () => {
          if (index === 0) {
            if (self.tabData1.length === (self.pageStart1 + 1) * limit) {
              self.pageStart1++
              self.$vux.loading.show()
              self.getData1()
            }
          } else if (index === 1) {
            if (self.tabData2.length === (self.pageStart2 + 1) * limit) {
              self.pageStart2++
              self.$vux.loading.show()
              self.getData2()
            }
          } else if (index === 2) {
            if (self.tabData3.length === (self.pageStart3 + 1) * limit) {
              self.pageStart3++
              self.$vux.loading.show()
              self.getData3()
            }
          }
        }
      })
    },
    handleScroll1: function (refname) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: () => {
          if (self.customerdata.length === (self.pageStart4 + 1) * limit) {
            self.pageStart4++
            self.$vux.loading.show()
            self.getCustomerdata()
          }
        }
      })
    },
    controlpopup1 (item, index) {
      event.preventDefault()
      this.showpopup1 = !this.showpopup1
      this.clickdata = item
      this.clickindex = index
    },
    upEvent () {
      const self = this
      let params = { id: this.clickdata.id, moderate: 1 }
      self.$http.post(`${ENV.BokaApi}/api/moderate/product`, params).then((res) => {
        let data = res.data
        self.$vux.loading.hide()
        self.$vux.toast.show({
          text: data.error,
          type: (data.flag !== 1 ? 'warn' : 'success'),
          time: self.$util.delay(data.error),
          onHide: function () {
            if (data.flag === 1) {
              self.clickdata.moderate = 1
              if (self.selectedIndex === 2) {
                self.tabData3.splice(self.clickindex, 1)
                self.getData3(true)
                if (self.tabData1.length === (self.pageStart1 + 1) * limit) {
                  self.tabData1.splice(self.tabData1.length - 1, 1)
                  self.tabData1 = [self.clickdata].concat(self.tabData1)
                } else if (self.tabData1.length) {
                  self.tabData1 = [self.clickdata].concat(self.tabData1)
                }
              } else if (self.selectedIndex === 1) {
                self.tabData2[self.clickindex].moderate = 1
              }
            }
          }
        })
      })
    },
    downEvent () {
      const self = this
      let params = { id: self.clickdata.id, moderate: 0 }
      self.$http.post(`${ENV.BokaApi}/api/moderate/product`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        self.$vux.toast.show({
          text: data.error,
          type: (data.flag !== 1 ? 'warn' : 'success'),
          time: self.$util.delay(data.error),
          onHide: function () {
            if (data.flag === 1) {
              self.clickdata.moderate = 0
              if (self.selectedIndex === 0) {
                self.tabData1.splice(self.clickindex, 1)
                self.getData1(true)
                if (self.tabData3.length === (self.pageStart3 + 1) * limit) {
                  self.tabData3.splice(self.tabData3.length - 1, 1)
                  self.tabData3 = [self.clickdata].concat(self.tabData3)
                } else if (self.tabData3.length) {
                  self.tabData3 = [self.clickdata].concat(self.tabData3)
                }
              } else if (self.selectedIndex === 1) {
                self.tabData2[self.clickindex].moderate = 0
              }
            }
          }
        })
      })
    },
    clickpopup (key) {
      const self = this
      self.showpopup1 = false
      if (key === 'up') {
        self.$vux.confirm.show({
          title: '确定要上架该商品吗？',
          onConfirm: () => {
            self.$vux.loading.show()
            self.upEvent()
          }
        })
      } else if (key === 'down') {
        let content = '确定要下架该商品吗？'
        if (self.selectedIndex === 1) {
          content = '确定要下架该商品吗？下架后的商品将不会出现在厂家列表中'
        }
        self.$vux.confirm.show({
          title: '',
          content: content,
          onConfirm () {
            self.$vux.loading.show()
            self.downEvent()
          }
        })
      } else if (key === 'top') {
        self.$vux.confirm.show({
          title: '确定要设置为精选吗？',
          onConfirm () {
            self.$vux.loading.show()
            let params = { id: self.clickdata.id, module: 'product', param: 'priority', paramvalue: 1 }
            self.$http.post(`${ENV.BokaApi}/api/setModulePara/product`, params).then(function (res) {
              let data = res.data
              self.$vux.loading.hide()
              self.$vux.toast.show({
                text: data.error,
                type: (data.flag !== 1 ? 'warn' : 'success'),
                time: self.$util.delay(data.error),
                onHide: function () {
                  if (data.flag === 1) {
                    self.clickdata.priority = 1
                    switch (self.selectedIndex) {
                      case 0:
                        self.tabData1[self.clickindex].priority = 1
                        break
                      case 1:
                        self.tabData2[self.clickindex].priority = 1
                        break
                    }
                  }
                }
              })
            })
          }
        })
      } else if (key === 'bottom') {
        self.$vux.confirm.show({
          title: '确定要取消精选吗？',
          onConfirm () {
            self.$vux.loading.show()
            let params = { id: self.clickdata.id, module: 'product', param: 'priority', paramvalue: 0 }
            self.$http.post(`${ENV.BokaApi}/api/setModulePara/product`, params).then(function (res) {
              let data = res.data
              self.$vux.loading.hide()
              self.$vux.toast.show({
                text: data.error,
                type: (data.flag !== 1 ? 'warn' : 'success'),
                time: self.$util.delay(data.error),
                onHide: function () {
                  if (data.flag === 1) {
                    self.clickdata.priority = 0
                    switch (self.selectedIndex) {
                      case 0:
                        self.tabData1[self.clickindex].priority = 0
                        break
                      case 1:
                        self.tabData2[self.clickindex].priority = 0
                        break
                    }
                  }
                }
              })
            })
          }
        })
      } else if (key === 'edit') {
        self.$router.push({ path: '/addProduct', query: { id: self.clickdata.id } })
      } else if (key === 'push') {
        self.showpush = true
        if (self.customerdata.length === 0) {
          self.getCustomerdata()
        }
      } else if (key === 'fee') {
        self.showFeePopup = true
        self.feeData = self.clickdata
        self.postFee = self.feeData.rebate
      } else if (key === 'activity') {
        if (this.clickdata.activityid) {
          self.$vux.toast.show({
            text: '该商品已创建团购/砍价活动，不能重复创建！',
            type: 'text',
            time: 3000
          })
        } else {
          if (this.clickdata.allowcard) {
            self.$vux.confirm.show({
              content: '该商品是可使用优惠券的商品，继续选择该商品将会导致两种优惠叠加使用',
              confirmText: '继续创建',
              cancelText: '取消',
              onCancel () {
                self.showpopup1 = false
              },
              onConfirm () {
                self.$router.push({path: '/retailerActivitylist', query: {id: self.clickdata.id, type: 'add'}})
              }
            })
          } else {
            self.$router.push({path: '/retailerActivitylist', query: {id: self.clickdata.id, type: 'add'}})
          }
        }
      }
    },
    closeFeePopup () {
      this.showFeePopup = false
    },
    submitFee () {
      const self = this
      if (self.$util.trim(self.postFee) === '') {
        self.$vux.toast.show({
          text: '请输入佣金'
        })
        return false
      }
      if (isNaN(self.postFee)) {
        self.$vux.toast.show({
          text: '请输入正确的佣金'
        })
        return false
      }
      if (parseFloat(self.postFee) > parseFloat(self.clickdata.rebatein)) {
        self.$vux.toast.show({
          text: '返点佣金不能高于厂家佣金'
        })
        return false
      }
      self.$http.post(`${ENV.BokaApi}/api/retailer/updateRebate`, {
        id: self.clickdata.id, rebate: self.postFee
      }).then(function (res) {
        let data = res.data
        const retdata = data.data
        self.$vux.loading.hide()
        self.$vux.toast.show({
          text: data.error,
          type: data.flag !== 1 ? 'warn' : 'success',
          time: self.$util.delay(data.error),
          onHide: function () {
            if (data.flag === 1) {
              self.showFeePopup = false
              switch (self.selectedIndex) {
                case 0:
                  self.tabData1[self.clickindex] = retdata
                  break
                case 1:
                  self.tabData2[self.clickindex] = retdata
                  break
                case 2:
                  self.tabData3[self.clickindex] = retdata
                  break
              }
            }
          }
        })
      })
    },
    getCustomerdata () {
      const self = this
      self.$vux.loading.show()
      let params = { params: { pagestart: this.pageStart4, limit: limit } }
      self.$http.get(`${ENV.BokaApi}/api/retailer/sellersList`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.customerdata = self.customerdata.concat(retdata)
        self.discustomerdata = true
      })
    },
    closepush () {
      this.showpush = false
    },
    submitpush () {
      const self = this
      if (self.pushdata.length === 0) {
        self.$vux.toast.show({
          text: '请选择返点客'
        })
        return false
      }
      self.showpush = false
      self.$vux.loading.show()
      let subdata = { id: self.clickdata.id, sendmodule: 'product', uid: self.pushdata }
      self.$http.post(`${ENV.BokaApi}/api/retailer/sendGroupNews`, subdata).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        self.$vux.toast.show({
          text: data.error,
          time: self.$util.delay(data.error)
        })
      })
    },
    radioclick (data, index) {
      const self = this
      if (data.checked) {
        self.pushdata.push(data.uid)
      } else {
        self.checkAll = false
        for (let i = 0; i < self.pushdata.length; i++) {
          if (self.pushdata[i] === data.uid) {
            self.pushdata.splice(i, 1)
            break
          }
        }
      }
    },
    checkAllEvent () {
      const self = this
      for (let i = 0; i < self.customerdata.length; i++) {
        if (self.checkAll) {
          self.customerdata[i].checked = true
        } else {
          delete self.customerdata[i].checked
        }
      }
    },
    getData1 (isone) {
      const self = this
      const params = {moderate: 1, pagestart: this.pageStart1, limit: limit}
      if (isone) {
        params.pagestart = this.tabData1.length
        params.limit = 1
      }
      this.$http.get(`${ENV.BokaApi}/api/list/product?from=retailernew`, {
        params: params
      })
      .then(res => {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        this.tabData1 = this.tabData1.concat(retdata)
        this.disList1 = true
      })
    },
    getData2 (isone) {
      const self = this
      const params = {agent: 1, pagestart: this.pageStart2, limit: limit}
      if (isone) {
        params.pagestart = this.tabData2.length
        params.limit = 1
      }
      this.$http.get(`${ENV.BokaApi}/api/list/product?from=retailernew`, {
        params: params
      })
      .then(res => {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        this.tabData2 = this.tabData2.concat(retdata)
        this.disList2 = true
      })
    },
    getData3 (isone) {
      const self = this
      const params = {moderate: 0, pagestart: this.pageStart3, limit: limit}
      if (isone) {
        params.pagestart = this.tabData3.length
        params.limit = 1
      }
      this.$http.get(`${ENV.BokaApi}/api/list/product?from=retailernew`, {
        params: params
      })
      .then(res => {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        this.tabData3 = this.tabData3.concat(retdata)
        this.disList3 = true
      })
    },
    init () {
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, {
        module: 'retailer', action: 'productlist'
      })
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.loginUser = User.get()
      this.query = this.$route.query
      this.retailerInfo = this.loginUser.retailerinfo
      this.swiperChange()
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

<style lang="less" scoped>
.rproductlist .scroll_item{overflow:hidden;position:relative;}
.rproductlist .scroll_item .ico{display:none;}
.rproductlist .scroll_item .down.ico{
  display:block;
  position:absolute;right:0;top:0;width:96px;height:25px;line-height:25px;
  background-color:#8a8a8a;color:#fff;text-align:center;font-size: 12px;
  -webkit-transform: translate(30px,5px) rotate(45deg);
  transform: translate(30px,5px) rotate(45deg);
}
.rproductlist .scroll_item .down.ico:after{content:"已下架";}
.rproductlist .btnicon{
  display: inline-block;
  color: #ea3a3a;
  border: 1px solid #ea3a3a;
  text-align: center;
  border-radius: 30px;
  letter-spacing: 0px;
  height: 21px;
  width: 41px;
  line-height: 21px;
}
.rproductlist .l-line{
  width:100%;
  height:8px;
  background:#fff;
}
.rproductlist .s-container{bottom:50px;}
.rproductlist .s-bottom{height: 50px;}
.rproductlist .addproduct{border-radius: 50px;height: 36px;width: 100%;}
.pro_list_top{
  width:100%;padding-bottom:9%;
  background: url(../assets/images/product_list_top.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}

</style>
