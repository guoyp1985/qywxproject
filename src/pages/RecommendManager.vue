<template>
  <div class="containerarea bg-page font14 s-havebottom re-manager-page">
    <Sos v-if="showSos" title="您无权限访问该页面"></Sos>
    <template v-if="showContainer">
      <tab v-model="selectedIndex" class="w_100 v-tab">
        <tab-item v-for="(item,index) in tabtxts" :selected="selectedIndex == index" :key="index" @on-item-click="clickTab">{{item}}</tab-item>
      </tab>
      <div class="s-container scroll-container" style="top:50px;bottom:0;">
        <div v-show="(selectedIndex == 0)" class="swiper-inner" ref="scrollContainer1" @scroll="handleScroll('scrollContainer1', 0)">
          <template v-if="disList1">
            <template v-if="!tabData1 || !tabData1.length">
              <div class="flex_center padding20 color-gray">暂无相关数据</div>
            </template>
            <div v-else class="scroll_list ">
              <div class="scroll_item mb10 font14 bg-white db list-shadow " v-for="(item,index) in tabData1" :key="index" style="color:inherit;">
                <div class="t-table bg-white">
            			<div class="t-cell v_middle pic" @click="toProduct(item)">
                    <img class="imgcover v_middle" :src="getPhoto(item.photo)" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
                  </div>
            			<div class="t-cell v_middle" @click="toProduct(item)">
                    <div class="clamp1">{{item.title}}</div>
                    <div class="font12 color-gray">
                      <div class="clamp1 color-red">售价: {{ $t('RMB') }}{{ item.price }}</div>
                      <div class="clamp1">佣金:<span class="color-red"> {{ $t('RMB') }}<template v-if="item.salesrebate">{{item.salesrebate}}</template><template v-else>{{item.levelagent}}</template></span></div>
                      <div class="clamp1">
                          <span class="v_middle db-in mr5"><span class="al al-kucun font14"></span>{{ item.storage }}{{item.unit}}</span>
                          <span class="v_middle db-in"><span class="al al-yishouchu font14"></span>{{ item.saled }}{{item.unit}}</span>
                      </div>
                    </div>
            			</div>
                  <div class="t-cell v_middle w50 align_right">
                    <div class="btnicon bg-red color-white font12" @click="clickControl(item,index)">
                      <i class="al al-asmkticon0165 v_middle"></i>
                    </div>
                  </div>
            		</div>
                <div class="flex_left mt5 font12" @click="toProduct(item)" v-if="item.sellingpoint && item.sellingpoint != ''"><span class="color-theme mr5 w60">商品优势: </span><span class="flex_cell">{{item.sellingpoint}}</span></div>
              </div>
            </div>
          </template>
        </div>
        <div v-show="(selectedIndex == 1)" class="swiper-inner" ref="scrollContainer2" @scroll="handleScroll('scrollContainer2', 1)">
          <template v-if="disList2">
            <div v-if="!tabData2 || !tabData2.length" class="flex_center padding20 color-gray">暂无相关数据</div>
            <div v-else class="scroll_list ">
              <div :to="{path:'/product',query:{id:item.id, wid: loginUser.uid}}" class="scroll_item mb10 font14 bg-white db list-shadow " v-for="(item,index) in tabData2" :key="index" style="color:inherit;">
                <div v-if="item.recommend == 2" class="ico tuijian"></div>
                <div v-if="item.recommend == 3" class="ico yinliu"></div>
                <div v-if="item.recommend == 4" class="ico huiyuan"></div>
                <div v-if="item.recommend == 5" class="ico baokuan"></div>
                <div v-if="item.recommend == 6" class="ico xinpin"></div>
                <div v-if="item.recommend == 7" class="ico jianhuo"></div>
                <div class="t-table bg-white">
            			<div class="t-cell v_middle pic" @click="toProduct(item)">
                    <img class="imgcover v_middle" :src="getPhoto(item.photo)" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
                  </div>
            			<div class="t-cell v_middle" @click="toProduct(item)">
                    <!-- <div class="clamp1">
                      <span v-if="item.recommend == 2" class="color-theme">【推荐商品】</span>
                      <span v-if="item.recommend == 3" class="color-theme">【引流商品】</span>
                      <span v-if="item.recommend == 4" class="color-theme">【会员商品】</span>
                      <span v-if="item.recommend == 5" class="color-theme">【爆款】</span>
                      <span v-if="item.recommend == 6" class="color-theme">【新品】</span>
                      <span v-if="item.recommend == 7" class="color-theme">【尖货】</span>
                      {{item.title}}
                    </div> -->
                    <div class="clamp1">{{item.title}}</div>
                    <div class="font12 color-gray">
                      <div class="clamp1 color-red">售价: {{ $t('RMB') }}{{ item.price }}</div>
                      <div class="clamp1">佣金:<span class="color-red"> {{ $t('RMB') }}<template v-if="item.salesrebate">{{item.salesrebate}}</template><template v-else>{{item.levelagent}}</template></span></div>
                      <div class="clamp1">
                          <span class="v_middle db-in mr5"><span class="al al-kucun font14"></span>{{ item.storage }}{{item.unit}}</span>
                          <span class="v_middle db-in"><span class="al al-yishouchu font14"></span>{{ item.saled }}{{item.unit}}</span>
                      </div>
                    </div>
            			</div>
                  <div class="t-cell v_middle w50 align_right">
                    <div class="btnicon bg-red color-white font12" @click="clickControl1(item,index)">
                      <i class="al al-asmkticon0165 v_middle"></i>
                    </div>
                  </div>
            		</div>
                <div class="flex_left mt5 font12" @click="toProduct(item)" v-if="item.sellingpoint && item.sellingpoint != ''"><span class="color-theme mr5 w60">商品优势: </span><span class="flex_cell">{{item.sellingpoint}}</span></div>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div v-transfer-dom>
        <popup class="menuwrap" v-model="showPopup">
          <div class="popup0">
            <div class="list" v-if="clickdata">
              <div class="item">
                <div class="inner" @click="clickpopup('tuijian',2)">设为推荐</div>
              </div>
              <div class="item">
                <div class="inner" @click="clickpopup('huiyuan',4)">设为会员</div>
              </div>
              <div class="item">
                <div class="inner" @click="clickpopup('yinliu',3)">设为引流</div>
              </div>
              <div class="item">
                <div class="inner" @click="clickpopup('baokuan',5)">设为爆款</div>
              </div>
              <div class="item">
                <div class="inner" @click="clickpopup('jianhuo',7)">设为尖货</div>
              </div>
              <div class="item">
                <div class="inner" @click="clickpopup('xinpin',6)">设为新品</div>
              </div>
              <div class="item close mt10" @click="clickpopup()">
                <div class="inner">{{ $t('Cancel txt') }}</div>
              </div>
            </div>
          </div>
        </popup>
      </div>
      <div v-transfer-dom>
        <popup class="menuwrap" v-model="showPopup1">
          <div class="popup0">
            <div class="list" v-if="clickdata">
              <div class="item" v-if="clickdata.recommend == 2">
                <div class="inner" @click="clickpopup1('tuijian')">取消推荐</div>
              </div>
              <div class="item" v-if="clickdata.recommend == 4">
                <div class="inner" @click="clickpopup1('huiyuan')">取消会员</div>
              </div>
              <div class="item" v-if="clickdata.recommend == 3">
                <div class="inner" @click="clickpopup1('yinliu')">取消引流</div>
              </div>
              <div class="item" v-if="clickdata.recommend == 5">
                <div class="inner" @click="clickpopup1('baokuan')">取消爆款</div>
              </div>
              <div class="item" v-if="clickdata.recommend == 7">
                <div class="inner" @click="clickpopup1('jianhuo')">取消尖货</div>
              </div>
              <div class="item" v-if="clickdata.recommend == 6">
                <div class="inner" @click="clickpopup1('xinpin')">取消新品</div>
              </div>
              <div class="item close mt10" @click="clickpopup()">
                <div class="inner">{{ $t('Cancel txt') }}</div>
              </div>
            </div>
          </div>
        </popup>
      </div>
    </template>
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
import { TransferDom, Popup, Tab, TabItem, Swiper, SwiperItem } from 'vux'
import ENV from 'env'
import { User } from '#/storage'

const limit = 10
export default {
  directives: {
    TransferDom
  },
  components: {
    Popup, Tab, TabItem, Swiper, SwiperItem
  },
  data () {
    return {
      loginUser: {},
      retailerInfo: {},
      query: {},
      selectedIndex: 0,
      showSos: false,
      showContainer: false,
      showTitle: '',
      tabtxts: ['待审核', '已审核'],
      disList1: false,
      disList2: false,
      tabData1: [],
      tabData2: [],
      pageStart1: 0,
      pageStart2: 0,
      showPopup: false,
      showPopup1: false,
      clickdata: {},
      clickindex: 0,
      limit: 10
    }
  },
  computed: {
    getquery: function () {
      return this.$route.query
    }
  },
  methods: {
    clickControl (item, index) {
      this.clickdata = item
      this.clickindex = index
      this.showPopup = true
    },
    clickControl1 (item, index) {
      this.clickdata = item
      this.clickindex = index
      this.showPopup1 = true
    },
    clickpopup (type, val) {
      let newval = val
      let errorTxt = '设置成功'
      this.showPopup = false
      this.showPopup1 = false
      if (type && type !== '') {
        let con = ''
        switch (type) {
          case 'tuijian':
            con = '确定要设为推荐商品吗？'
            break
          case 'yinliu':
            con = '确定要设为引流商品吗？'
            break
          case 'huiyuan':
            con = '确定要设为会员商品吗？'
            break
          case 'baokuan':
            con = '确定要设为爆款商品吗？'
            break
          case 'xinpin':
            con = '确定要设为新品吗？'
            break
          case 'jianhuo':
            con = '确定要设为尖货吗？'
            break
        }
        this.$vux.confirm.show({
          content: con,
          onConfirm: () => {
            this.$vux.loading.show()
            this.$http.post(`${ENV.BokaApi}/api/setModulePara/factoryproduct`, {
              id: this.clickdata.id, param: 'recommend', paramvalue: newval
            }).then((res) => {
              this.$vux.loading.hide()
              const data = res.data
              let error = data.flag ? errorTxt : data.error
              this.$vux.toast.show({
                text: error,
                type: (data.flag !== 1 ? 'warn' : 'success'),
                time: this.$util.delay(error)
              })
              if (data.flag) {
                this.clickdata.recommend = newval
                this.tabData1.splice(this.clickindex, 1)
                this.getData1(true)
                if (this.tabData2.length) {
                  if (this.tabData2.length && this.tabData2.length === (this.pageStart2 + 1) * this.limit) {
                    this.tabData2.splice(this.tabData2.length - 1, 1)
                  }
                  this.tabData2 = [this.clickdata].concat(this.tabData2)
                }
              }
            })
          }
        })
      }
    },
    clickpopup1 (type) {
      let newval = 1
      let errorTxt = '取消成功'
      this.showPopup1 = false
      if (type && type !== '') {
        let con = ''
        switch (type) {
          case 'tuijian':
            con = '确定要取消推荐该商品吗？'
            break
          case 'yinliu':
            con = '确定要取消该引流商品吗？'
            break
          case 'huiyuan':
            con = '确定要取消该会员商品吗？'
            break
          case 'baokuan':
            con = '确定要取消该爆款商品吗？'
            break
          case 'xinpin':
            con = '确定要取消该新品吗？'
            break
          case 'jianhuo':
            con = '确定要取消该尖货商品吗？'
            break
        }
        this.$vux.confirm.show({
          content: con,
          onConfirm: () => {
            this.$vux.loading.show()
            this.$http.post(`${ENV.BokaApi}/api/setModulePara/factoryproduct`, {
              id: this.clickdata.id, param: 'recommend', paramvalue: newval
            }).then((res) => {
              this.$vux.loading.hide()
              const data = res.data
              let error = data.flag ? errorTxt : data.error
              this.$vux.toast.show({
                text: error,
                type: (data.flag !== 1 ? 'warn' : 'success'),
                time: this.$util.delay(error)
              })
              if (data.flag) {
                this.clickdata.recommend = newval
                this.tabData2.splice(this.clickindex, 1)
                this.getData2(true)
                if (this.tabData1.length) {
                  if (this.tabData1.length && this.tabData1.length === (this.pageStart1 + 1) * this.limit) {
                    this.tabData1.splice(this.tabData1.length - 1, 1)
                  }
                  this.tabData1 = [this.clickdata].concat(this.tabData1)
                }
              }
            })
          }
        })
      }
    },
    toProduct (item) {
      let params = this.$util.handleAppParams(this.query, {id: item.id, fid: item.fid})
      this.$router.push({path: '/factoryProduct', query: params})
    },
    toRecommend (item, index) {
      this.$vux.confirm.show({
        content: '确定要推荐该商品吗',
        onConfirm: () => {
          this.$vux.loading.show()
          this.$http.post(`${ENV.BokaApi}/api/setModulePara/factoryproduct`, {
            id: item.id, param: 'recommend', paramvalue: 2
          }).then((res) => {
            this.$vux.loading.hide()
            const data = res.data
            let error = data.error
            if (data.flag) {
              error = '推荐成功'
            }
            this.$vux.toast.show({
              text: error,
              type: (data.flag !== 1 ? 'warn' : 'success'),
              time: this.$util.delay(error)
            })
            if (data.flag) {
              this.tabData1.splice(index, 1)
              this.getData1(true)
              if (this.tabData2.length) {
                if (this.tabData2.length && this.tabData2.length === (this.pageStart2 + 1) * this.limit) {
                  this.tabData2.splice(this.tabData2.length - 1, 1)
                }
                this.tabData2 = [item].concat(this.tabData2)
              }
            }
          })
        }
      })
    },
    cancelRecommend (item, index) {
      this.$vux.confirm.show({
        content: '确定要取消推荐该商品吗',
        onConfirm: () => {
          this.$vux.loading.show()
          this.$http.post(`${ENV.BokaApi}/api/setModulePara/factoryproduct`, {
            id: item.id, param: 'recommend', paramvalue: 0
          }).then((res) => {
            this.$vux.loading.hide()
            const data = res.data
            let error = data.error
            if (data.flag) {
              error = '取消成功'
            }
            this.$vux.toast.show({
              text: error,
              type: (data.flag !== 1 ? 'warn' : 'success'),
              time: this.$util.delay(error)
            })
            if (data.flag) {
              this.tabData2.splice(index, 1)
              this.getData2(true)
            }
          })
        }
      })
    },
    clickTab () {
      this.swiperChange()
    },
    swiperChange (index) {
      if (index && index !== this.selectedIndex) {
        this.selectedIndex = index
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
          }
        }
      })
    },
    getData1 (isone) {
      const self = this
      let params = {pagestart: this.pageStart1, limit: limit, recommend: 1, wid: this.loginUser.uid}
      if (isone) {
        params.pagestart = this.tabData1.length
        params.limit = 1
      }
      this.$http.post(`${ENV.BokaApi}/api/list/factoryproduct`, params)
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
      let params = {pagestart: this.pageStart2, limit: limit, haverecommend: 1, wid: this.loginUser.uid}
      if (isone) {
        params.pagestart = this.tabData2.length
        params.limit = 1
      }
      this.$http.post(`${ENV.BokaApi}/api/list/factoryproduct`, params)
      .then(res => {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        this.tabData2 = this.tabData2.concat(retdata)
        this.disList2 = true
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
      console.log(this.loginUser)
      let isshow = false
      for (let i = 0; i < this.loginUser.usergroup.length; i++) {
        if (this.loginUser.usergroup[i] === 5) {
          isshow = true
          break
        }
      }
      if (isshow) {
        this.showContainer = true
        this.swiperChange()
      } else {
        this.showSos = true
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

<style lang="less" scoped>
.re-manager-page{
  .scroll_item{
    overflow:hidden;position:relative;padding:10px;box-sizing: border-box;
    .pic{
      width:80px;
      img{width:70px;height:70px;}
    }
  }
  .scroll_item .ico{
    position:absolute;left:0;top:0;width:96px;height:25px;line-height:25px;
    background-color:#ff9f9f;color:#fff;text-align:center;font-size: 12px;
    -webkit-transform: translate(-28px,6px) rotate(-45deg);
    transform: translate(-28px,6px) rotate(-45deg);background-color:#ff6a61;
    color:#fff;
  }
  .scroll_item .ico.tuijian:after{content:"推荐";}
  .scroll_item .ico.yinliu:after{content:"引流";}
  .scroll_item .ico.huiyuan:after{content:"会员";}
  .scroll_item .ico.baokuan:after{content:"爆款";}
  .scroll_item .ico.xinpin:after{content:"新品";}
  .scroll_item .ico.jianhuo:after{content:"尖货";}
  .btnicon{
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
  .l-line{
    width:100%;
    height:8px;
    background:#fff;
  }
  .s-container{bottom:50px;}
  .s-bottom{height: 50px;}
  .addproduct{border-radius: 50px;height: 36px;width: 100%;}
}
</style>
