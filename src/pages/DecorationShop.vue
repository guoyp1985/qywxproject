<template>
  <div class="containerarea bg-page font14 s-havebottom decorationshop">
    <div class="s-container" style="top:0px;">
      <div class="scroll_list bg-page">
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
          <router-link :to="{path:'/product',query:{id:item.id,wid:loginuser.uid}}" v-if="item.moderate == 1" class="scroll_item mb5 font14 bg-white db" :key="item.id" style="color:inherit;">
            <div class="t-table bg-white pt10 pb10">
        			<div class="t-cell pl10 v_middle" style="width:90px;">
    		          <img style="width:80px;height:80px;" :src="item.photo" />
        			</div>
        			<div class="t-cell v_middle">
                <div class="clamp2 font15 pr10">{{item.title}}</div>
                <div class="mt5 dishref db">
                  <span class="color-red font15 middle-cell">{{ $t('RMB') }} {{ item.price }}</span>
                </div>
                <div class="align_right pr10">
                  <div class="qbtn2" @click="showRolling(item,index)">{{ $t('Rolling show') }}</div>
                </div>
        			</div>
        		</div>
          </router-link>
        </template>
      </div>
    </div>
    <div class="s-bottom">
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
                <div class="q_photolist align_left">
                  <template v-if="photoarr.length > 0">
                    <div v-for="(item,index) in photoarr" :key="index" class="photoitem">
                      <div class="inner photo imgcover" :photo="item" :style="`background-image: url('${item}');`">
                        <div class="close" @click="deletephoto(item,index)">×</div>
                        <div class="clip"><i class="al al-set"></i></div>
                      </div>
                    </div>
                  </template>
                  <div v-if="photoarr.length < maxnum" class="photoitem add">
                    <div class="inner">
                      <form class="fileform" enctype="multipart/form-data">
                        <input class="fileinput" type="file" name="files" @change="filechange" />
                      </form>
                      <div class="t-table">
                        <div class="t-cell">
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
    </div>
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
import { TransferDom, Popup, Confirm, Alert } from 'vux'
import ENV from 'env'

export default {
  directives: {
    TransferDom
  },
  components: {
    Popup,
    Confirm,
    Alert
  },
  data () {
    return {
      loginuser: { uid: 187 },
      productdata: [],
      clickdata: {},
      clickindex: 0,
      showphotopop: false,
      photoarr: [],
      maxnum: 1,
      havenum: 0,
      limit: 20,
      pagestart1: 0,
      isBindScroll1: false,
      scrollArea1: null,
      rollingData: null
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
  computed: {
    getquery: function () {
      return this.$route.query
    }
  },
  methods: {
    scroll1: function () {
      const self = this
      self.$util.scrollEvent({
        element: self.scrollArea1,
        callback: function () {
          if (self.productdata.length === (self.pagestart1 + 1) * self.limit) {
            self.pagestart1++
            self.$vux.loading.show()
            self.getdata1()
          }
        }
      })
    },
    getdata1 () {
      const self = this
      let params = { params: { from: 'myshop', pagestart: self.pagestart1, limit: self.limit } }
      self.$http.get(`${ENV.BokaApi}/api/list/product`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.productdata = self.productdata.concat(retdata)
        if (!self.isBindScroll1) {
          let items = document.querySelectorAll('.decorationshop .s-container')
          if (items.length > 1) {
            self.scrollArea1 = items[0]
            self.isBindScroll1 = true
            self.scrollArea1.removeEventListener('scroll', self.scroll1)
            self.scrollArea1.addEventListener('scroll', self.scroll1)
          }
        }
      })
    },
    showRolling (item, index) {
      event.preventDefault()
      let self = this
      self.showphotopop = !this.showphotopop
      self.clickdata = item
      self.clickindex = index
      self.$vux.loading.show()
      self.$http.post(`${ENV.BokaApi}/api/topBanner/product`, { do: 'show', id: self.clickdata.id }).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        if (retdata && retdata.photo) {
          self.rollingData = retdata
          self.photoarr = retdata.photo.split(',')
        }
      })
    },
    filechange (e) {
      const self = this
      let files = e.target.files
      if (files.length > 0) {
        let fileform = document.querySelector('.fileform')
        let filedata = new FormData(fileform)
        self.$vux.loading.show()
        self.$http.post(`${ENV.BokaApi}/api/upload/files`, filedata).then(function (res) {
          let data = res.data
          self.$vux.loading.hide()
          if (data.flag === 1) {
            self.photoarr.push(data.data)
          } else if (data.error) {
            self.$vux.toast.show({
              text: data.error,
              time: self.$util.delay(data.error)
            })
          }
        })
      }
    },
    deletephoto (item, index) {
      const self = this
      self.$vux.confirm.show({
        title: '确定要删除图像吗？',
        onConfirm () {
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
        self.$http.post(`${ENV.BokaApi}/api/topBanner/product`, { do: 'add', id: self.clickdata.id, topbanner: self.photoarr.join(',') }).then(function (res) {
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
    }
  },
  created: function () {
    let self = this
    self.$store.commit('updateToggleTabbar', {toggleBar: false})
    if (this.clickdata && this.clickdata.rollingphoto && this.clickdata.rollingphoto !== '') {
      this.havenum = this.clickdata.rollingphoto.split(',')
    } else {
      this.havenum = 0
    }
    self.$vux.loading.show()
    self.getdata1()
  }
}
</script>

<style lang="less" scoped>
.rproductlist .scroll_item{overflow:hidden;position:relative;}
.rproductlist .scroll_item .icon{display:none;}
.rproductlist .scroll_item .down.icon{
        display:block;
        position:absolute;right:0;top:0;width:96px;height:25px;line-height:25px;
        background-color:#8a8a8a;color:#fff;text-align:center;font-size: 12px;
        -webkit-transform: translate(30px,5px) rotate(45deg);
        transform: translate(30px,5px) rotate(45deg);
}
.rproductlist .scroll_item .down.icon:after{content:"已下架";}
.rproductlist .btnicon{
  display: inline-block;
    color: #9c9c9c;
    font-size: 14px;
    border: 1px solid #9c9c9c;
    text-align: center;
    border-radius: 30px;
    padding: 1px 8px;
}
</style>
