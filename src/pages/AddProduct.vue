<template>
  <div class="containerarea s-havebottom font14 addproduct">
    <template v-if="loginUser.subscribe != 1">
      <div class="pagemiddle flex_center" style="top:0;">
        <img :src="WeixinQrcode" style="max-width:90%;max-height:90%;" />
      </div>
      <div class="pagebottom flex_center b_top_after font16">请先关注</div>
    </template>
    <template v-if="showSos">
      <Sos :title="sosTitle"></Sos>
    </template>
    <template v-if="showPay">
      <pay :login-user="loginUser" module="payorders" :order-id="loginUser.payorderid" :pay-callback="afterPay"></pay>
    </template>
    <template v-if="showContainer">
      <div class="s-container" style="top:0;">
        <form ref="fileForm" enctype="multipart/form-data">
          <input ref="fileInput" class="hide" type="file" name="files" @change="fileChange('fileForm', 'photo')" />
        </form>
        <form ref="fileForm1" enctype="multipart/form-data">
          <input ref="fileInput1" class="hide" type="file" name="files" @change="fileChange('fileForm1', 'contentphoto')" />
        </form>
        <div class="list-shadow01">
          <div class="form-item no-after pt15 bg-gray10">
            <div class="cover_map" v-if="photoarr.length == 0" @click="uploadPhoto('fileInput','photo')">
              <div class="button_photo">
                <i class="al al-zhaoxiangji color-white"></i>
              </div>
            </div>
            <div class="cover_maplist mt12" v-if="photoarr.length > 0">
              <input v-model="submitdata.photo" type="hidden" name="photo">
              <div class="q_photolist align_left">
                <template v-if="photoarr.length > 0">
                  <div v-for="(item,index) in photoarr" :key="index" class="photoitem">
                    <div class="inner photo" :photo="item" :style="`background-image: url('${item}');`">
                      <div class="close" @click="deletephoto(item,index,'photo')">×</div>
                    </div>
                  </div>
                </template>
                <div v-if="photoarr.length >= 1 && photoarr.length < maxnum" class="photoitem add" @click="uploadPhoto('fileInput','photo')">
                  <div class="inner">
                    <div class="icon flex_center">
                      <div class="txt">
                        <i class="al al-zhaopian" style="color:#c6c5c5;line-height:30px;"></i>
                        <div><span class="havenum">{{ photoarr.length }}</span><span class="ml5 mr5">/</span><span class="maxnum">{{ maxnum }}</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="pt10 pb5 align_center">
              <p class="font14 color-gray5">封面图像(最多9张) <span class="al al-xing color-red font12" style="vertical-align: 2px;"></span></p>
            </div>
          </div>
          <div class="form-item required bg-white">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Product name') }}<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <group class="textarea-outer" style="padding:0;">
                  <x-textarea v-model="submitdata.title" name="title" class="x-textarea noborder" :placeholder="$t('Product name')" :show-counter="false" :rows="1" :max="30" autosize></x-textarea>
                </group>
              </div>
            </div>
          </div>
          <div class="form-item required bg-white">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Product price') }}<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <input v-model="submitdata.price" @keyup="priceChange('price')" type="text" class="input priceInput" name="price" :placeholder="$t('User final purchase price')" />
              </div>
              <div class="t-cell v_middle align_right font12" style="width:20px;">元</div>
            </div>
          </div>
          <div class="form-item required bg-white">
            <div class="flex_row">
              <div class="flex_cell">
                <div class="t-table">
                  <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Product') }}{{ $t('Storage') }}<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
                  <div class="t-cell input-cell v_middle" style="position:relative;">
                    <input v-model="submitdata.storage" type="tel" class="input" name="storage" :placeholder="$t('Storage')" />
                  </div>
                </div>
              </div>
              <div style="width:30%;">
                <div class="t-table">
                  <div class="t-cell title-cell font14 v_middle">{{ $t('Storage unit') }}<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
                  <div class="t-cell input-cell v_middle" style="position:relative;">
                    <input v-model="submitdata.unit" type="text" class="input align_center" name="unit" size="1" maxlength="1" :placeholder="$t('Storage unit')" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="form-item required bg-white">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Postage') }}<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <input v-model="submitdata.postage" @keyup="priceChange('postage')" type="text" class="input priceInput" name="postage" :placeholder="$t('Postage')" />
              </div>
              <div class="t-cell v_middle align_right font12" style="width:20px;">元</div>
            </div>
          </div>
          <div class="form-item bg-white" v-if="showRebate">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Rebate Commission') }}</div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <input v-model="submitdata.rebate" @keyup="priceChange('rebate')" type="text" class="input rebateInput" name="rebate" :placeholder="$t('Goods sold to rebate user commission')" />
              </div>
              <div class="t-cell v_middle align_right font12" style="width:20px;">元</div>
            </div>
          </div>
          <div class="pl12 pr12 pt10 bg-white">文字介绍</div>
          <group class="textarea-outer textarea-text bg-white">
            <x-textarea v-model="submitdata.content" name="content" class="x-textarea" :placeholder="$t('Product description')" :show-counter="false" :rows="1" autosize></x-textarea>
          </group>
          <div class="pl12 pr12 pt10 b_top_after bg-white">详情图像<span class="color-gray">（图像宽高不受限制）</span></div>
          <div class="b_bottom_after bg-white pl12 pr12 pb5">
            <input v-model="submitdata.contentphoto" type="hidden" name="contentphoto" />
            <div class="q_photolist align_left bg-white">
              <template v-if="photoarr1.length > 0">
                <div v-for="(item,index) in photoarr1" :key="index" class="photoitem">
                  <div class="inner photo imgcover" :photo="item" :style="`background-image: url('${item}');`">
                    <div class="close" @click="deletephoto(item,index,'contentphoto')">×</div>
                  </div>
                </div>
              </template>
              <div v-if="photoarr1.length < maxnum1" class="photoitem add" @click="uploadPhoto('fileInput1','contentphoto')">
                <div class="inner">
                  <div class="innerlist">
                    <div class="flex_center h_100">
                      <div class="txt">
                        <i class="al al-zhaopian" style="color:#bbb;line-height:30px;"></i>
                        <div><span class="havenum">{{ photoarr1.length }}</span><span class="ml5 mr5">/</span><span class="maxnum">{{ maxnum1 }}</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="form-item bg-white">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">视频</div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <div class="q_photolist align_left" style="overflow:hidden;">
                  <!--
                  <div v-if="videoarr.length == 0" @click="uploadPhoto('videoInput','video')">
                    <div class="button_video flex_center">
                      <i class="al al-ai-video color-white"></i>
                    </div>
                  </div>
                -->
                  <form ref="videoForm" class="db" enctype="multipart/form-data" v-if="videoarr.length == 0">
                    <div class="button_video flex_center">
                      <i class="al al-ai-video color-white"></i>
                      <input ref="videoInput" type="file" name="files" @change="fileChange('videoForm', 'video')" />
                    </div>
                  </form>
                  <div v-else v-for="(item,index) in videoarr" :key="index" class="videoitem photoitem">
                    <div class="inner photo imgcover" :photo="item" style="border:#ccc 1px solid;">
                      <div class="flex_center" style="position:absolute;left:0;top:0;bottom:0;right:0;">
                        <i class="al al-ai-video"></i>
                        <div class="close" @click="deletephoto(item,index,'video')">×</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-show="showmore">
            <div class="form-item bg-white">
              <div class="t-table">
                <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Share title') }}</div>
                <div class="t-cell input-cell v_middle" style="position:relative;">
                  <input v-model="submitdata.seotitle" type="text" class="input" name="seotitle" :placeholder="$t('Product share title placeholder')" />
                </div>
              </div>
            </div>
            <div class="form-item bg-white no-after">
              <div class="t-table">
                <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Share description') }}</div>
                <div class="t-cell input-cell v_middle" style="position:relative;">
                  <group class="textarea-outer" style="padding:0;">
                    <x-textarea v-model="submitdata.seodescription" name="seodescription" class="x-textarea noborder" :placeholder="$t('Product share description placeholder')" :show-counter="false" :rows="1" autosize></x-textarea>
                  </group>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="showmore" @click="expandevent" class="padding15 font14 align_center color-gray">{{ $t('Up text') }}<i class="al al-jiantou2-up font14 middle-cell"></i></div>
        <div v-else class="padding15 font14 align_center color-gray"  @click="expandevent">{{ $t('More') }}<i class="al al-jiantouyoushuang- font14"></i></div>
      </div>
      <div class="s-bottom flex_center color-white list-shadow02">
        <div class="flex_cell flex_center color-white btn-bottom-red" @click="saveupevent">{{ $t('Shelf sale') }}</div>
      </div>
    </template>
  </div>
</template>

<i18n>
</i18n>

<script>
import { Group, XInput, XTextarea } from 'vux'
import ENV from 'env'
import { User } from '#/storage'
import Sos from '@/components/Sos'

export default {
  components: {
    Group, XInput, XTextarea, Sos
  },
  data () {
    return {
      showSos: false,
      sosTitle: '抱歉，您暂无权限访问此页面！',
      showContainer: false,
      showPay: false,
      query: {},
      loginUser: {},
      data: {},
      photoarr: [],
      maxnum: 9,
      havenum: 0,
      photoarr1: [],
      maxnum1: 19,
      havenum1: 0,
      videoarr: [],
      maxnum2: 1,
      havenum2: 0,
      showmore: false,
      submitdata: {
        title: '',
        price: '',
        storage: '',
        unit: '件',
        postage: '0.00',
        rebate: '',
        photo: '',
        content: '',
        contentphoto: '',
        seotitle: '',
        seodescription: '',
        video: ''
      },
      allowsubmit: true,
      requireddata: { title: '', 'price': '', 'storage': '', 'unit': '', 'postage': '', 'photo': '' },
      showRebate: false
    }
  },
  watch: {
    submitdata: function () {
      return this.submitdata
    },
    havenum: function (val) {
      this.havenum = this.photoarr.length
      return this.havenum
    },
    havenum1: function (val) {
      this.havenum1 = this.photoarr1.length
      return this.havenum1
    },
    showRebate: function () {
      const self = this
      return self.showRebate
    }
  },
  computed: {
  },
  methods: {
    initSubmitData () {
      this.submitdata = {
        title: '',
        price: '',
        storage: '',
        unit: '件',
        postage: '0.00',
        rebate: '',
        photo: '',
        content: '',
        contentphoto: '',
        seotitle: '',
        seodescription: '',
        video: ''
      }
      this.photoarr = []
      this.photoarr1 = []
    },
    afterPay () {
      this.refresh()
    },
    photoCallback (data, type) {
      const self = this
      if (data.flag === 1) {
        if (type === 'photo' && self.photoarr.length < self.maxnum) {
          self.photoarr.push(data.data)
          self.submitdata.photo = self.photoarr.join(',')
        } else if (type === 'contentphoto' && self.photoarr1.length < self.maxnum1) {
          self.photoarr1.push(data.data)
          self.submitdata.contentphoto = self.photoarr1.join(',')
        } else if (type === 'video') {
          self.videoarr.push(data.data)
          self.submitdata.video = self.videoarr.join(',')
        }
      } else if (data.error) {
        self.$vux.toast.show({
          text: data.error,
          time: self.$util.delay(data.error)
        })
      }
    },
    uploadPhoto (refname, type) {
      const self = this
      const fileInput = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      if (self.$util.isPC() || type === 'video') {
        fileInput.click()
      } else {
        self.$wechat.ready(function () {
          let curMaxnum = 9
          if (type === 'video') {
            curMaxnum = 1
          }
          self.$util.wxUploadImage({
            maxnum: curMaxnum,
            handleCallback: function (data) {
              self.photoCallback(data, type)
            }
          })
        })
      }
    },
    fileChange (refname, type) {
      const self = this
      const target = event.target
      const files = target.files
      if (files.length > 0) {
        let fileForm = target.parentNode
        if (type === 'video') {
          fileForm = target.parentNode.parentNode
        }
        const filedata = new FormData(fileForm)
        self.$vux.loading.show()
        self.$http.post(`${ENV.BokaApi}/api/upload/files`, filedata).then(function (res) {
          let data = res.data
          self.$vux.loading.hide()
          self.photoCallback(data, type)
        })
      }
    },
    deletephoto (item, index, type) {
      const self = this
      if (type === 'video') {
        self.videoarr.splice(index, 1)
        self.submitdata.video = self.videoarr.join(',')
      } else if (type === 'photo') {
        self.photoarr.splice(index, 1)
        self.submitdata.photo = self.photoarr.join(',')
      } else {
        self.photoarr1.splice(index, 1)
        self.submitdata.contentphoto = self.photoarr1.join(',')
      }
    },
    expandevent () {
      this.showmore = !this.showmore
    },
    savedata (postdata) {
      const self = this
      let validateData = []
      for (let key in self.requireddata) {
        let v = {}
        v[key] = self.submitdata[key]
        validateData.push(v)
      }
      let iscontinue = self.$util.validateQueue(validateData,
        model => {
          switch (model.key) {
            default:
              self.$vux.toast.text('必填项不能为空', 'middle')
          }
        }
      )
      if (!iscontinue) {
        return false
      }
      let price = postdata.price.toString().replace(/,/g, '')
      let rebate = postdata.rebate
      if (self.$util.trim(rebate) !== '') {
        rebate = rebate.toString().replace(/,/g, '')
      }
      if (isNaN(price) || price <= 0 || (self.$util.trim(rebate) !== '' && (isNaN(rebate) || rebate < 0))) {
        self.$vux.alert.show({
          title: '',
          content: '请输入正确的价格'
        })
        return false
      }
      if (self.$util.trim(postdata.content) === '' && self.$util.trim(postdata.contentphoto) === '') {
        self.$vux.alert.show({
          title: '',
          content: '请完善商品介绍或者详情图片'
        })
        return false
      }
      postdata.price = price
      postdata.rebate = rebate
      self.$vux.loading.show()
      if (self.query.id) {
        postdata.id = self.query.id
      }
      self.$http.post(`${ENV.BokaApi}/api/add/product`, postdata).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        self.$vux.toast.show({
          text: data.error,
          type: data.flag !== 1 ? 'warn' : 'success',
          time: self.$util.delay(data.error),
          onHide: function () {
            if (data.flag === 1) {
              if (self.query.from === 'apply') {
                self.$router.push({path: '/centerSales'})
              } else {
                self.$router.push({ path: '/product', query: { id: data.data, newadd: 1 } })
              }
            }
          }
        })
      })
    },
    saveevent () {
      const self = this
      let postdata = self.submitdata
      self.savedata(postdata)
    },
    saveupevent () {
      const self = this
      let postdata = self.submitdata
      postdata['moderate'] = 1
      self.savedata(postdata)
    },
    priceChange (key) {
      let val = event.target.value
      const dotindex = val.lastIndexOf('.')
      const vallen = val.length
      const cha = vallen - 1 - dotindex
      if (dotindex > -1 && cha > 2) {
        val = val.substr(0, vallen - cha + 2)
      }
      this.submitdata[key] = val
    },
    getData () {
      const self = this
      const params1 = { module: 'product', action: 'add' }
      if (this.query.id) {
        params1.id = this.query.id
        const params2 = { params: { id: this.query.id, module: 'product' } }
        this.$http.get(`${ENV.BokaApi}/api/moduleInfo`, params2).then(res => {
          const data = res.data
          self.data = data.data ? data.data : data
          self.activityInfo = self.data.activitinfo
          for (let key in self.submitdata) {
            self.submitdata[key] = self.data[key]
          }
          if (self.submitdata.photo && self.$util.trim(self.submitdata.photo) !== '') {
            self.photoarr = self.submitdata.photo.split(',')
          }
          if (self.submitdata.contentphoto && self.$util.trim(self.submitdata.contentphoto) !== '') {
            self.photoarr1 = self.submitdata.contentphoto.split(',')
          }
          if (self.data.video && self.$util.trim(self.data.video) !== '') {
            self.videoarr = self.data.video.split(',')
          }
          document.title = self.data.title
        })
      }
      this.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, params1).then(res => {
        return self.$http.get(`${ENV.BokaApi}/api/retailer/home`)
      }).then(res => {
        const data = res.data
        self.retailerInfo = data.data ? data.data : data
        if (self.retailerInfo.buyonline === 1) {
          self.showRebate = true
        }
      })
    },
    refreshFun () {
      const self = this
      if (self.loginUser.subscribe === 1) {
        if (self.loginUser.isretailer === 2) {
          self.showSos = false
          self.showContainer = false
          self.showPay = true
        } else {
          self.showSos = false
          self.showContainer = false
          self.showPay = false
          let isAdmin = false
          for (let i = 0; i < self.loginUser.usergroup.length; i++) {
            if (self.loginUser.usergroup[i] === 1) {
              isAdmin = true
              break
            }
          }
          if (!self.loginUser.isretailer && !isAdmin) {
            this.$vux.loading.hide()
            self.showSos = true
            self.showContainer = false
          } else {
            self.showSos = false
            self.showContainer = true
            this.$vux.loading.hide()
            if (this.query.id !== this.$route.query.id) {
              this.initSubmitData()
            }
            this.query = this.$route.query
            this.getData()
          }
        }
      }
    },
    refresh () {
      const self = this
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.$vux.loading.show()
      this.loginUser = User.get()
      if (!this.loginUser || this.loginUser !== 1) {
        self.$http.get(`${ENV.BokaApi}/api/user/show`).then(function (res) {
          if (res.status === 200) {
            self.loginUser = res.data
            User.set(self.loginUser)
            self.refreshFun()
          }
        })
      } else if (this.loginUser && this.loginUser === 1) {
        self.refreshFun()
      }
    }
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less" scoped>
.form-item{position:relative;padding:10px 12px;}
.form-item:after{
  content:"";display:block;
	background-color:@list-border-color;height:1px;overflow:hidden;
	position: absolute;left: 12px;right: 0;bottom:1px;
	-webkit-transform: scaleY(0.5) translateY(0.5px);
	transform: scaleY(0.5) translateY(0.5px);
	-webkit-transform-origin: 0% 0%;
	transform-origin: 0% 0%;
}
.b_top_after:after,.b_bottom_after:after{left:12px;}
.button_photo{
  position:relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width:60px;
  height:60px;
  background-color:#ea3a3a;
  margin: 0 auto;
  border-radius:50%;
  overflow:hidden;
}
.button_photo .fileinput{position:absolute;left:0;right:0;top:0;bottom:0;z-index:1;background-color:transparent;opacity:0;}
.s-havebottom .s-container{bottom:50px;}
.s-bottom{height:50px;padding-left:12px;padding-right:12px;background-color:#fff;}
.button_video{
  position:relative;
  width:60px;
  height:60px;
  background-color:#ea3a3a;
  border-radius:50%;
  overflow:hidden;
}
.button_video input{
  position:absolute;
  left:0;top:0;right:0;bottom:0;
  opacity:0;
}
</style>
