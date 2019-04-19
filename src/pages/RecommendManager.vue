<template>
  <div class="containerarea bg-page font14 s-havebottom re-manager-page">
    <Sos v-if="showSos" title="您无权限访问该页面"></Sos>
    <template v-if="showContainer">
      <tab v-model="selectedIndex" class="w_100 v-tab">
        <tab-item v-for="(item,index) in tabtxts" :selected="selectedIndex == index" :key="index">{{item}}</tab-item>
      </tab>
      <div class="s-container scroll-container" style="top:50px;bottom:0;">
        <swiper v-model="selectedIndex" class="x-swiper no-indicator" @on-index-change="swiperChange">
          <swiper-item v-for="(tabitem, index) in tabtxts" :key="index">
            <div v-if="(index == 0)" class="swiper-inner" ref="scrollContainer1" @scroll="handleScroll('scrollContainer1', index)">
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
                          <div class="clamp1">佣金:<span class="color-red"> {{ $t('RMB') }}{{ item.levelagent }}</span></div>
                          <div class="clamp1">
                              <span class="v_middle db-in mr5"><span class="al al-kucun font14"></span>{{ item.storage }}{{item.unit}}</span>
                              <span class="v_middle db-in"><span class="al al-yishouchu font14"></span>{{ item.saled }}{{item.unit}}</span>
                          </div>
                        </div>
                			</div>
                      <div class="t-cell v_middle w80 align_right">
                        <div class="btnicon bg-theme color-white font12" @click="toRecommend(item,index)">设为推荐</div>
                      </div>
                		</div>
                    <div class="flex_left mt5 font12" @click="toProduct(item)" v-if="item.sellingpoint && item.sellingpoint != ''"><span class="color-theme mr5">商品优势: </span><span>{{item.sellingpoint}}</span></div>
                  </div>
                </div>
              </template>
            </div>
            <div v-if="(index == 1)" class="swiper-inner" ref="scrollContainer2" @scroll="handleScroll('scrollContainer2', index)">
              <template v-if="disList2">
                <div v-if="!tabData2 || !tabData2.length" class="flex_center padding20 color-gray">暂无相关数据</div>
                <div v-else class="scroll_list ">
                  <div :to="{path:'/product',query:{id:item.id, wid: loginUser.uid}}" class="scroll_item mb10 font14 bg-white db list-shadow " v-for="(item,index) in tabData2" :key="index" style="color:inherit;">
                    <div class="t-table bg-white">
                			<div class="t-cell v_middle pic" @click="toProduct(item)">
                        <img class="imgcover v_middle" :src="getPhoto(item.photo)" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
                      </div>
                			<div class="t-cell v_middle" @click="toProduct(item)">
                        <div class="clamp1">{{item.title}}</div>
                        <div class="font12 color-gray">
                          <div class="clamp1 color-red">售价: {{ $t('RMB') }}{{ item.price }}</div>
                          <div class="clamp1">佣金:<span class="color-red"> {{ $t('RMB') }}{{ item.levelagent }}</span></div>
                          <div class="clamp1">
                              <span class="v_middle db-in mr5"><span class="al al-kucun font14"></span>{{ item.storage }}{{item.unit}}</span>
                              <span class="v_middle db-in"><span class="al al-yishouchu font14"></span>{{ item.saled }}{{item.unit}}</span>
                          </div>
                        </div>
                			</div>
                      <div class="t-cell v_middle w80 align_right">
                        <div class="btnicon bg-theme color-white font12" @click="cancelRecommend(item,index)">取消推荐</div>
                      </div>
                		</div>
                    <div class="flex_left mt5 font12" @click="toProduct(item)" v-if="item.sellingpoint && item.sellingpoint != ''"><span class="color-theme mr5">商品优势: </span><span>{{item.sellingpoint}}</span></div>
                  </div>
                </div>
              </template>
            </div>
          </swiper-item>
        </swiper>
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
import { TransferDom, Tab, TabItem, Swiper, SwiperItem } from 'vux'
import ENV from 'env'
import { User } from '#/storage'

const limit = 10
export default {
  directives: {
    TransferDom
  },
  components: {
    Tab, TabItem, Swiper, SwiperItem
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
      tabtxts: ['待推荐', '推荐中'],
      disList1: false,
      disList2: false,
      tabData1: [],
      tabData2: [],
      pageStart1: 0,
      pageStart2: 0,
      showpopup1: false,
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
      let params = {pagestart: this.pageStart1, limit: limit, recommend: 1}
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
      let params = {pagestart: this.pageStart2, limit: limit, recommend: 2}
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
  .scroll_item .ico{display:none;}
  .scroll_item .down.ico{
    display:block;
    position:absolute;right:0;top:0;width:96px;height:25px;line-height:25px;
    background-color:#8a8a8a;color:#fff;text-align:center;font-size: 12px;
    -webkit-transform: translate(30px,5px) rotate(45deg);
    transform: translate(30px,5px) rotate(45deg);
  }
  .scroll_item .down.ico:after{content:"已下架";}
  .btnicon{
    display: inline-block;
    color: #ea3a3a;
    border: 1px solid #ea3a3a;
    text-align: center;
    border-radius: 30px;
    letter-spacing: 0px;
    height: 21px;
    width: 65px;
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
