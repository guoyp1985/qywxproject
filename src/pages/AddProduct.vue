<template>
  <div class="containerarea s-havebottom font14 addproduct">
    <div class="s-container" style="top:0;">
      <form enctype="multipart/form-data">
        <input ref="fileInput" class="hide" type="file" name="files" @change="fileChange('photo')" />
      </form>
      <form enctype="multipart/form-data">
        <input ref="fileInput1" class="hide" type="file" name="files" @change="fileChange('contentphoto')" />
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
              <div v-if="photoarr.length >= 1 && photoarr.length < maxnum" class="photoitem add" @click="uploadPhoto('fileInput','photoarr')">
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
              <input v-model="submitdata.price" type="text" class="input priceInput" name="price" :placeholder="$t('User final purchase price')" />
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
        <div class="form-item bg-white" v-if="showRebate">
          <div class="t-table">
            <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Rebate Commission') }}</div>
            <div class="t-cell input-cell v_middle" style="position:relative;">
              <input v-model="submitdata.rebate" type="text" class="input rebateInput" name="rebate" :placeholder="$t('Goods sold to rebate user commission')" />
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
                      <div><span class="havenum">{{ gethavenum1 }}</span><span class="ml5 mr5">/</span><span class="maxnum">{{ maxnum1 }}</span></div>
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
  </div>
</template>

<i18n>
</i18n>

<script>
import { Group, XInput, XTextarea } from 'vux'
import ENV from 'env'

export default {
  components: {
    Group, XInput, XTextarea
  },
  data () {
    return {
      doCreated: false,
      query: {},
      data: {},
      photoarr: [],
      maxnum: 9,
      havenum: 0,
      photoarr1: [],
      maxnum1: 19,
      havenum1: 0,
      showmore: false,
      submitdata: {
        title: '',
        price: '',
        storage: '',
        unit: '件',
        rebate: '',
        photo: '',
        content: '',
        contentphoto: '',
        seotitle: '',
        seodescription: ''
      },
      allowsubmit: true,
      requireddata: { title: '', 'price': '', 'storage': '', 'unit': '', 'photo': '' },
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
    gethavenum: function () {
      return this.photoarr.length
    },
    gethavenum1: function () {
      return this.photoarr1.length
    }
  },
  methods: {
    photoCallback (data, type) {
      const self = this
      if (data.flag === 1) {
        if (type === 'photo') {
          self.photoarr.push(data.data)
          self.submitdata.photo = self.photoarr.join(',')
        } else {
          self.photoarr1.push(data.data)
          self.submitdata.contentphoto = self.photoarr1.join(',')
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
      if (self.$util.isPC()) {
        fileInput.click()
      } else {
        self.$wechat.ready(function () {
          self.$util.wxUploadImage({
            maxnum: 9,
            handleCallback: function (data) {
              self.photoCallback(data, type)
            }
          })
        })
      }
    },
    fileChange (type) {
      const self = this
      const target = event.target
      const files = target.files
      if (files.length > 0) {
        const fileForm = target.parentNode
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
      if (type === 'photo') {
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
      let price = postdata.price.replace(/,/g, '')
      let rebate = postdata.rebate
      if (self.$util.trim(rebate) !== '') {
        rebate = rebate.replace(/,/g, '')
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
              self.$router.push({ path: '/product', query: { id: data.data, newadd: 1 } })
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
    priceChange (input, callback) {
      input.addEventListener('keyup', function () {
        let val = input.value
        let dotindex = val.lastIndexOf('.')
        let vallen = val.length
        let cha = vallen - 1 - dotindex
        if (dotindex > -1 && cha > 2) {
          val = val.substr(0, vallen - cha + 2)
        }
        callback && callback(val)
      })
    },
    initInfo () {
      const self = this
      let logparams = { module: 'product', action: 'add' }
      if (self.query.id) {
        logparams.id = self.query.id
      }
      self.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, logparams).then(function (res) {
        if (res.status === 200) {
          return self.$http.get(`${ENV.BokaApi}/api/retailer/home`)
        }
      }).then(function (res) {
        if (res) {
          let data = res.data
          self.retailerInfo = data.data ? data.data : data
          if (self.retailerInfo.buyonline === 1) {
            self.showRebate = true
            setTimeout(function () {
              let rebateInput = document.querySelector('.rebateInput')
              self.priceChange(rebateInput, function (val) {
                self.submitdata.rebate = val
              })
            }, 500)
          }
          let priceInput = document.querySelector('.priceInput')
          self.priceChange(priceInput, function (val) {
            self.submitdata.price = val
          })
        }
      })
      if (self.query.id) {
        let params = { params: { id: self.query.id, module: 'product' } }
        self.$http.get(`${ENV.BokaApi}/api/moduleInfo`, params).then(function (res) {
          let data = res.data
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
          document.title = self.data.title
        })
      }
    }
  },
  created: function () {
    const self = this
    self.doCreated = true
    self.$store.commit('updateToggleTabbar', {toggleBar: false})
    self.query = self.$route.query
  },
  activated () {
    const self = this
    if (!self.doCreated) {
      self.initInfo()
    }
    self.doCreated = false
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
</style>
