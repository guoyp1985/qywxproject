<template>
  <div class="containerarea bg-page font14 s-havebottom decorationshop">
    <tab v-model="selectedIndex" class="w_100 v-tab">
      <tab-item v-for="(item,index) in tabtxts" :selected="selectedIndex == index" :key="index">{{item}}</tab-item>
    </tab>
    <template v-if="showSos">
      <Sos :title="sosTitle"></Sos>
    </template>
    <template v-if="showContainer">
      <swiper v-model="selectedIndex" class="x-swiper no-indicator" @on-index-change="swiperChange">
        <swiper-item v-for="(tabitem, index) in tabtxts" :key="index">
          <div v-if="(index == 0)">
            <div class="s-container scroll-container" :style="`top:0px;${query.from == 'miniprogram' ? 'bottom:0;' : ''}`" ref="scrollContainer" @scroll="handleScroll">
              <div v-if="disData" class="scroll_list bg-page">
                <template v-if="!productdata || productdata.length == 0">
                  <div class="emptyitem">
                    <div class="t-table" style="padding-top:20%;">
                      <div class="t-cell padding10">
                        <i class="al al-chuangjianxiangmu" style="font-size:60px;"></i>
                        <div>还没有可装修商品哦，及时添加商品可以：</div>
                        <div>1.创建促销活动 </div>
                        <div>2.分享商品获得客户</div>
                        <div>3.邀请返点客帮你赚钱</div>
                      </div>
                    </div>
                  </div>
                </template>
                <template v-for="(item,index) in productdata">
                  <!-- <router-link :to="{path:'/product',query:{id:item.id,wid:loginUser.uid}}" v-if="item.moderate == 1" class="scroll_item mb5 font14 bg-white db" :key="item.id" style="color:inherit;"> -->
                  <div v-if="item.moderate == 1" class="scroll_item mb5 font14 bg-white db" :key="item.id" style="color:inherit;">
                    <div class="t-table bg-white pt10 pb10">
                			<div class="t-cell pl10 v_middle" style="width:90px;" @click="onProduct(item)">
                        <img class="imgcover" :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" style="width:80px;height:80px;" />
                			</div>
                			<div class="t-cell v_middle">
                        <div  @click="onProduct(item)">
                          <div class="clamp2 font15 pr10">{{item.title}}</div>
                          <div class="mt5 dishref db">
                            <span class="color-red font15 middle-cell">{{ $t('RMB') }} {{ item.price }}</span>
                          </div>
                        </div>
                        <div class="align_right pr10">
                          <div class="qbtn2" @click="showRolling(item,index)">{{ $t('Rolling show') }}</div>
                        </div>
                			</div>
                		</div>
                  </div>
                  <!-- </router-link> -->
                </template>
              </div>
            </div>
          </div>
          <div v-if="(index == 1)">
            <div class="s-container scroll-container" :style="`top:0px;${query.from == 'miniprogram' ? 'bottom:0;' : ''}`" ref="scrollContainer" @scroll="handleScroll">
              <div v-if="disData" class="scroll_list bg-page">
                <template v-if="!factorydata || factorydata.length == 0">
                  <div class="emptyitem">
                    <div class="t-table" style="padding-top:20%;">
                      <div class="t-cell padding10">
                        <i class="al al-chuangjianxiangmu" style="font-size:60px;"></i>
                        <div>还没有可装修商品哦，及时添加商品可以：</div>
                        <div>1.创建促销活动 </div>
                        <div>2.分享商品获得客户</div>
                        <div>3.邀请返点客帮你赚钱</div>
                      </div>
                    </div>
                  </div>
                </template>
                <template v-for="(item,index) in factorydata">
                  <!-- <router-link :to="{path:'/product',query:{id:item.id,wid:loginUser.uid}}" v-if="item.moderate == 1" class="scroll_item mb5 font14 bg-white db" :key="item.id" style="color:inherit;"> -->
                  <div v-if="item.moderate == 1" class="scroll_item mb5 font14 bg-white db" :key="item.id" style="color:inherit;">
                    <div class="t-table bg-white pt10 pb10">
                			<div class="t-cell pl10 v_middle" style="width:90px;" @click="onProduct(item)">
                        <img class="imgcover" :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" style="width:80px;height:80px;" />
                			</div>
                			<div class="t-cell v_middle">
                        <div  @click="onProduct(item)">
                          <div class="clamp2 font15 pr10">{{item.title}}</div>
                          <div class="mt5 dishref db">
                            <span class="color-red font15 middle-cell">{{ $t('RMB') }} {{ item.price }}</span>
                          </div>
                        </div>
                        <div class="align_right pr10">
                          <div class="qbtn2" @click="showRolling(item,index)">{{ $t('Rolling show') }}</div>
                        </div>
                			</div>
                		</div>
                  </div>
                  <!-- </router-link> -->
                </template>
              </div>
            </div>
          </div>
        </swiper-item>
      </swiper>
      <div class="s-bottom" v-if="query.from != 'miniprogram'">
        <div class="t-table h_100 align_center">
          <router-link class="t-cell h_100 v_middle bg-gray color-white" :to="{path: '/store'}">{{ $t('Back go shop') }}</router-link>
          <router-link class="t-cell h_100 v_middle bg-orange color-white" to="/addProduct">{{ $t('Add product') }}</router-link>
        </div>
      </div>
      <div v-transfer-dom class="x-popup">
        <popup v-model="showphotopop" height="100%">
          <div class="popup1">
            <div class="popup-top flex_center">店铺首页滚动展示</div>
            <div class="popup-middle font14">
              <div class="padding10">
                <div class="pt10 pb5">（图像最佳宽高比为9:5）</div>
                <div>
                  <input type="hidden" name="photo" />
                  <form enctype="multipart/form-data">
                    <input ref="fileInput" class="hide" type="file" name="files" @change="fileChange" />
                  </form>
                  <div class="q_photolist align_left">
                    <template v-if="photoarr.length > 0">
                      <div v-for="(item,index) in photoarr" :key="index" class="photoitem">
                        <div class="inner photo imgcover" :photo="item" :style="`background-image: url('${item}');`">
                          <div class="close" @click="deletephoto(item,index)">×</div>
                          <div class="clip" @click="clipPhoto(item)"><i class="al al-set"></i></div>
                        </div>
                      </div>
                    </template>
                    <div v-if="photoarr.length < maxnum" class="photoitem add" @click="uploadPhoto">
                      <div class="inner">
                        <div class="innerlist">
                          <div class="flex_center h_100">
                            <div class="txt">
                              <i class="al al-zhaopian" style="color:#c6c5c5;line-height:30px;"></i>
                              <div><span class="havenum">{{ havenum }}</span><span class="ml5 mr5">/</span><span class="maxnum">{{ maxnum }}</span></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
    					</div>
            </div>
            <div class="popup-bottom flex_center">
              <div class="flex_cell flex_center h_100 bg-gray color-white" @click="closepopup">{{ $t('Close') }}</div>
              <div class="flex_cell flex_center h_100 bg-green color-white" @click="subphoto">{{ $t('Confirm txt') }}</div>
            </div>
          </div>
        </popup>
        <clip-popup :show="popupShow" :img="cutImg" :after-submit="popupSubmit" @on-cancel="popupCancel"></clip-popup>
      </div>
    </template>
  </div>
</template>

<i18n>
Rolling show:
  zh-CN: 滚动展示
Add product:
  zh-CN: 添加商品
Back go shop:
  zh-CN: 返回店铺
Please upload rolling show photo:
  zh-CN: 请上传滚动展示图像
</i18n>

<script>
import { TransferDom, Popup, Confirm, Alert, XImg, Tab, TabItem, Swiper, SwiperItem } from 'vux'
import ClipPopup from '@/components/ClipPopup'
import Sos from '@/components/Sos'
import { User } from '#/storage'
import ENV from 'env'

const limit = 10
let pagestart1 = 0
export default {
  directives: {
    TransferDom
  },
  components: {
    Popup, Confirm, Alert, ClipPopup, XImg, Sos, Tab, TabItem, Swiper, SwiperItem
  },
  data () {
    return {
      showSos: false,
      sosTitle: '',
      query: {},
      showContainer: false,
      loginUser: {},
      productdata: [],
      factorydata: [],
      clickdata: {},
      clickindex: 0,
      showphotopop: false,
      photoarr: [],
      maxnum: 1,
      havenum: 0,
      rollingData: null,
      cutImg: '',
      popupShow: false,
      disData: false,
      fPageStart: 0,
      isGetProduct: false,
      fProductLen: 0,
      selectedIndex: 0,
      tabtxts: [ '上架商品', '厂家商品' ]
    }
  },
  watch: {
    photoarr: function () {
      return this.photoarr
    },
    havenum: function () {
      return this.photoarr.length
    }
  },
  methods: {
    swiperChange (index) {
      if (index !== self.selectedIndex) {
        self.selectedIndex = index
      }
      switch (this.selectedIndex) {
        case 0:
          if (this.productdata.length < limit) {
            this.pagestart1 = 0
            this.disData = false
            this.productdata = []
            this.getData()
          }
          break
        case 1:
          if (this.factorydata.length < limit) {
            this.fPageStart = 0
            this.disData = false
            this.factorydata = []
            this.getFactoryData()
          }
          break
      }
    },
    onProduct (item) {
      if (this.query.from === 'miniprogram') {
        this.$wechat.miniProgram.redirectTo({url: `/packageB/pages/product?id=${item.id}&wid=${this.loginUser.uid}`})
      } else {
        this.$router.push({
          path: '/product',
          query: {
            id: item.id,
            wid: this.loginUser.uid
          }
        })
      }
    },
    handleScroll () {
      const self = this
      self.$util.scrollEvent({
        element: self.$refs.scrollContainer,
        callback: function () {
          if (self.productdata.length === (pagestart1 + 1) * limit) {
            pagestart1++
            self.$vux.loading.show()
            self.getData()
          }
        }
      })
    },
    showRolling (item, index) {
      event.preventDefault()
      const self = this
      self.showphotopop = !this.showphotopop
      self.clickdata = item
      self.clickindex = index
      self.photoarr = []
      self.$vux.loading.show()
      self.$http.post(`${ENV.BokaApi}/api/topBanner/product`, { do: 'show', id: self.clickdata.id }).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        if (retdata && retdata.photo) {
          self.rollingData = retdata
          let parr = retdata.photo.split(',')
          for (let i = 0; i < parr.length; i++) {
            self.photoarr.push(self.$util.getPhoto(parr[i]))
          }
        }
      })
    },
    photoCallback (data) {
      const self = this
      if (data.flag === 1) {
        self.photoarr.push(data.data)
      } else if (data.error) {
        self.$vux.toast.show({
          text: data.error,
          time: self.$util.delay(data.error)
        })
      }
    },
    uploadPhoto () {
      const self = this
      const fileInput = self.$refs.fileInput[0] ? self.$refs.fileInput[0] : self.$refs.fileInput
      if (self.$util.isPC()) {
        fileInput.click()
      } else {
        self.$wechat.ready(function () {
          self.$util.wxUploadImage({
            maxnum: 1,
            handleCallback: function (data) {
              self.photoCallback(data)
            }
          })
        })
      }
    },
    fileChange (e) {
      const self = this
      let files = e.target.files
      if (files.length > 0) {
        const fileForm = e.target.parentNode
        const filedata = new FormData(fileForm)
        self.$vux.loading.show()
        self.$http.post(`${ENV.BokaApi}/api/upload/files`, filedata).then(function (res) {
          let data = res.data
          self.$vux.loading.hide()
          self.photoCallback(data)
        })
      }
    },
    deletephoto (item, index) {
      const self = this
      self.$vux.confirm.show({
        title: '确定要删除图像吗？',
        onConfirm () {
          if (!self.rollingData) {
            self.photoarr.splice(index, 1)
          } else {
            self.$vux.loading.show()
            self.$http.post(`${ENV.BokaApi}/api/topBanner/product`, { do: 'delete', id: self.rollingData.id }).then(function (res) {
              let data = res.data
              self.$vux.loading.hide()
              self.$vux.toast.show({
                text: data.error,
                time: self.$util.delay(data.error),
                onHide: function () {
                  if (data.flag === 1) {
                    self.rollingData = null
                    self.photoarr.splice(index, 1)
                  }
                }
              })
            })
          }
        }
      })
    },
    closepopup () {
      this.showphotopop = false
    },
    subphoto () {
      let self = this
      if (self.photoarr.length === 0) {
        self.$vux.alert.show({
          title: '',
          content: '请上传滚动展示图像',
          onShow () {
          },
          onHide () {
            self.allowsubmit = true
          }
        })
        return false
      } else {
        self.$vux.loading.show()
        let parr = []
        for (let i = 0; i < self.photoarr.length; i++) {
          parr.push(self.$util.setPhoto(self.photoarr[i]))
        }
        self.$http.post(`${ENV.BokaApi}/api/topBanner/product`, { do: 'add', id: self.clickdata.id, topbanner: parr.join(',') }).then(function (res) {
          let data = res.data
          self.$vux.loading.hide()
          let toasttype = data.flag !== 1 ? 'warn' : 'success'
          self.$vux.toast.show({
            text: data.error,
            type: toasttype,
            time: self.$util.delay(data.error),
            onHide: function () {
              if (data.flag === 1) {
                self.showphotopop = false
                self.photoarr = []
                self.rollingData = null
              }
            }
          })
        })
      }
    },
    clipPhoto (item) {
      this.popupShow = true
      let index = item.indexOf('?')
      if (index > -1) {
        this.cutImg = item.substring(0, index)
      } else {
        this.cutImg = item
      }
    },
    popupSubmit (cutimg) {
      this.photoarr = [ cutimg ]
    },
    popupCancel () {
      this.popupShow = false
    },
    // 厂家商品
    getFactoryData () {
      const self = this
      let params = { pagestart: this.fPageStart, limit: limit, agent: 1 }
      self.$http.get(`${ENV.BokaApi}/api/list/product`, {
        params: params
      }).then(res => {
        const data = res.data
        self.$vux.loading.hide()
        const retdata = data.data ? data.data : data
        self.factorydata = self.factorydata.concat(retdata)
        self.disData = true
      })
    },
    getData () {
      const self = this
      const params = { params: { from: 'myshop', pagestart: pagestart1, limit: limit } }
      self.$http.get(`${ENV.BokaApi}/api/list/product`, params).then(function (res) {
        const data = res.data
        const retdata = data.data ? data.data : data
        self.$vux.loading.hide()
        self.productdata = self.productdata.concat(retdata)
        self.disData = true
      })
    },
    init () {
      const self = this
      this.loginUser = User.get()
      this.query = this.$route.query
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, {
        module: 'retailer', action: 'decorationshop'
      }).then(function (res) {
        if (res.status === 200) {
          let data = res.data
          if (data.flag !== 1) {
            self.sosTitle = data.error
            self.showSos = true
            self.showContainer = false
            self.$vux.loading.hide()
          } else {
            self.showSos = false
            self.showContainer = true
            self.$vux.loading.show()
            self.getData()
          }
        }
      })
      if (this.clickdata && this.clickdata.rollingphoto && this.clickdata.rollingphoto !== '') {
        this.havenum = this.clickdata.rollingphoto.split(',')
      } else {
        this.havenum = 0
      }
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      if (this.showContainer && this.productdata.length < limit) {
        pagestart1 = 0
        this.disData = false
        this.productdata = []
        this.factorydata = []
        this.isGetProduct = false
        this.fProductLen = 0
        this.fPageStart = 0
        this.$vux.loading.show()
        this.getData()
        this.getFactoryData()
      }
    }
  },
  created () {
    this.init()
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less" scoped>
  .decorationshop .scroll_item{overflow:hidden;position:relative;}
</style>
