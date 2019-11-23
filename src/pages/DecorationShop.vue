<template>
  <div class="containerarea bg-page font14 s-havebottom decorationshop">
    <template v-if="showSos">
      <Sos :title="sosTitle"></Sos>
    </template>
    <template v-if="showContainer">
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
          <template v-else v-for="(item,index) in productdata">
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
      <template v-if="showHb">
        <firstHb action="topbanner" @closeFirstHb="closeFirstHb"></firstHb>
      </template>
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
import { TransferDom, Popup, Confirm, Alert, XImg } from 'vux'
import ClipPopup from '@/components/ClipPopup'
import Sos from '@/components/Sos'
import FirstHb from '@/components/FirstHb'
import { User } from '#/storage'
import ENV from 'env'

const limit = 10
let pagestart1 = 0
export default {
  directives: {
    TransferDom
  },
  components: {
    Popup, Confirm, Alert, ClipPopup, XImg, Sos, FirstHb
  },
  data () {
    return {
      showSos: false,
      sosTitle: '',
      query: {},
      showContainer: false,
      loginUser: {},
      retailerInfo: {},
      productdata: [],
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
      isFirst: false,
      showHb: false
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
    initData () {
      this.isFirst = false
      this.showHb = false
    },
    closeFirstHb () {
      this.showHb = false
      this.isFirst = false
    },
    onProduct (item) {
      if (this.query.from === 'miniprogram') {
        this.$wechat.miniProgram.redirectTo({url: `${ENV.MiniRouter.product}?id=${item.id}&wid=${this.loginUser.uid}&module=product`})
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
        self.$http.post(`${ENV.BokaApi}/api/topBanner/product`, { do: 'add', id: self.clickdata.id, topbanner: parr.join(',') }).then((res) => {
          let data = res.data
          self.$vux.loading.hide()
          let toasttype = data.flag !== 1 ? 'warn' : 'success'
          self.$vux.toast.show({
            text: data.error,
            type: toasttype,
            time: self.$util.delay(data.error),
            onHide: () => {
              if (data.flag === 1) {
                self.showphotopop = false
                self.photoarr = []
                self.rollingData = null
                if (this.isFirst) {
                  this.showHb = true
                }
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
    getData () {
      const self = this
      const params = {pagestart: pagestart1, limit: limit, wid: this.loginUser.uid}
      self.$http.get(`${ENV.BokaApi}/api/retailer/getRetailerProducts`, {
        params: params
      }).then(function (res) {
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
      this.initData()
      if (`${this.loginUser.retailerinfo.firstinfo.topbanner}` === '0' && this.query.from) {
        this.$http.get(`${ENV.BokaApi}/api/user/show`).then((res) => {
          this.loginUser = res.data
          User.set(this.loginUser)
          if (`${this.loginUser.retailerinfo.firstinfo.topbanner}` === '0' && this.query.from) {
            this.isFirst = true
          }
        })
      }
      if (this.showContainer && this.productdata.length < limit) {
        pagestart1 = 0
        this.disData = false
        this.productdata = []
        this.$vux.loading.show()
        this.getData()
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
</style>
