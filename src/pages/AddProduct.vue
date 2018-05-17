<template>
  <div class="containerarea s-havebottom font14 bg-white">
    <div class="s-container" style="top:0;">
      <div class="form-item required">
        <div class="t-table">
          <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Product name') }}<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
          <div class="t-cell input-cell v_middle" style="position:relative;">
            <group class="textarea-outer" style="padding:0;">
              <x-textarea v-model="submitdata.title" name="title" class="x-textarea noborder" :placeholder="$t('Product name')" :show-counter="false" :rows="1" :max="30" autosize></x-textarea>
            </group>
          </div>
        </div>
      </div>
      <div class="form-item required">
        <div class="t-table">
          <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Product price') }}<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
          <div class="t-cell input-cell v_middle" style="position:relative;">
            <input v-model="submitdata.price" type="text" class="input priceInput" name="price" :placeholder="$t('User final purchase price')" />
          </div>
          <div class="t-cell v_middle align_right font12" style="width:20px;">元</div>
        </div>
      </div>
      <div class="form-item required">
        <div class="t-table">
          <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Product') }}{{ $t('Storage') }}<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
          <div class="t-cell input-cell v_middle" style="position:relative;">
            <input v-model="submitdata.storage" type="tel" class="input" name="storage" :placeholder="$t('Storage')" />
          </div>
        </div>
      </div>
      <div class="form-item required">
        <div class="t-table">
          <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Storage unit') }}<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
          <div class="t-cell input-cell v_middle" style="position:relative;">
            <input v-model="submitdata.unit" type="text" class="input" name="unit" :placeholder="$t('Storage unit')" />
          </div>
        </div>
      </div>
      <div class="form-item">
        <div class="t-table">
          <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Rebate Commission') }}</div>
          <div class="t-cell input-cell v_middle" style="position:relative;">
            <input v-model="submitdata.rebate" type="text" class="input rebateInput" name="rebate" :placeholder="$t('Goods sold to rebate user commission')" />
          </div>
          <div class="t-cell v_middle align_right font12" style="width:20px;">元</div>
        </div>
      </div>
      <div class="form-item required">
        <div class="pt10 pb5">封面图像 <span class="al al-xing color-red font12" style="vertical-align: 3px;"></span> （图像最佳宽高比为1:1,上传图像后可点击图像左上角"<i class="al al-set font12"></i>"进行剪裁）</div>
        <div>
          <input v-model="submitdata.photo" type="hidden" name="photo">
          <div class="q_photolist align_left" uploadform=".uploadfileForm">
            <template v-if="photoarr.length > 0">
              <div v-for="(item,index) in photoarr" :key="index" class="photoitem">
                <div class="inner photo" :photo="item" :style="`background-image: url('${item}');`">
                  <div class="close" @click="deletephoto(item,index)">×</div>
                </div>
              </div>
            </template>
            <div v-if="photoarr.length < maxnum" class="photoitem add">
              <div class="inner">
                <form class="fileform1" enctype="multipart/form-data">
                  <input class="fileinput" type="file" name="files" @change="filechange" />
                </form>
                <div class="t-table">
                  <div class="t-cell">
                    <div class="txt">
                      <i class="al al-zhaopian" style="color:#c6c5c5;line-height:30px;"></i>
                      <div><span class="havenum">{{ gethavenum }}</span><span class="ml5 mr5">/</span><span class="maxnum">{{ maxnum }}</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pl10 pr10 pb5 pt10">文字介绍</div>
      <group class="textarea-outer">
        <x-textarea v-model="submitdata.content" name="content" class="x-textarea" :placeholder="$t('Product description')" :show-counter="false" :rows="1" autosize></x-textarea>
      </group>
      <div class="pl10 pr10 pb5 pt10">详情图像（图像宽高不受限制）</div>
      <div class="b_bottom_after">
        <input v-model="submitdata.contentphoto" type="hidden" name="contentphoto" />
        <div class="q_photolist align_left">
          <template v-if="photoarr1.length > 0">
            <div v-for="(item,index) in photoarr1" :key="index" class="photoitem">
              <div class="inner photo imgcover" :photo="item" :style="`background-image: url('${item}');`">
                <div class="close" @click="deletephoto1(item,index)">×</div>
              </div>
            </div>
          </template>
          <div v-if="photoarr1.length < maxnum1" class="photoitem add">
            <div class="inner">
              <form class="fileform2" enctype="multipart/form-data">
                <input class="fileinput" type="file" name="files" @change="filechange1" />
              </form>
              <div class="t-table">
                <div class="t-cell">
                  <div class="txt">
                    <i class="al al-zhaopian" style="color:#c6c5c5;line-height:30px;"></i>
                    <div><span class="havenum">{{ gethavenum1 }}</span><span class="ml5 mr5">/</span><span class="maxnum">{{ maxnum1 }}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="showmore">
        <div class="form-item">
          <div class="t-table">
            <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Share title') }}</div>
            <div class="t-cell input-cell v_middle" style="position:relative;">
              <input v-model="submitdata.seotitle" type="text" class="input" name="seotitle" :placeholder="$t('Product share title placeholder')" />
            </div>
          </div>
        </div>
        <div class="form-item">
          <div class="t-table">
            <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Share description') }}</div>
            <div class="t-cell input-cell v_middle" style="position:relative;">
              <group class="textarea-outer" style="padding:10px 0;">
                <x-textarea v-model="submitdata.seodescription" name="seodescription" class="x-textarea" :placeholder="$t('Product share description placeholder')" :show-counter="false" :rows="1" autosize></x-textarea>
              </group>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showmore" @click="expandevent" class="padding15 font14 align_center color-gray">{{ $t('Up text') }}<i class="al al-jiantou2-up font14 middle-cell"></i></div>
      <div v-else class="padding15 font14 align_center color-gray"  @click="expandevent">{{ $t('More') }}<i class="al al-jiantouyoushuang- font14"></i></div>
    </div>
    <div class="s-bottom flex_center bg-orange color-white">
      <!--
      <div class="flex_cell flex_center h_100 bg-orange color-white" style="border-right:#fff 1px solid;" @click="saveevent">{{ $t('Save') }}</div>
    -->
      <div class="flex_cell flex_center h_100 bg-orange color-white" @click="saveupevent">{{ $t('Shelf sale') }}</div>
    </div>
  </div>
</template>

<i18n>
</i18n>

<script>
import { Group, XInput, XTextarea, Loading } from 'vux'
import ENV from 'env'

export default {
  components: {
    Group, XInput, XTextarea, Loading
  },
  data () {
    return {
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
      requireddata: { title: '', 'price': '', 'storage': '', 'photo': '' }
    }
  },
  created: function () {
    const self = this
    self.$store.commit('updateToggleTabbar', {toggleBar: false})
    self.query = self.$route.query
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
  },
  mounted: function () {
    const self = this
    let priceInput = document.querySelector('.priceInput')
    this.priceChange(priceInput, function (val) {
      self.submitdata.price = val
    })
    let rebateInput = document.querySelector('.rebateInput')
    this.priceChange(rebateInput, function (val) {
      self.submitdata.rebate = val
    })
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
    filechange (e) {
      const self = this
      let files = e.target.files
      if (files.length > 0) {
        let fileform = document.querySelector('.fileform1')
        let filedata = new FormData(fileform)
        self.$vux.loading.show()
        self.$http.post(`${ENV.BokaApi}/api/upload/files`, filedata).then(function (res) {
          let data = res.data
          self.$vux.loading.hide()
          if (data.flag === 1) {
            self.photoarr.push(data.data)
            self.submitdata.photo = self.photoarr.join(',')
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
      self.photoarr.splice(index, 1)
      self.submitdata.photo = self.photoarr.join(',')
    },
    filechange1 (e) {
      const self = this
      let files = e.target.files
      if (files.length > 0) {
        let fileform = document.querySelector('.fileform2')
        let filedata = new FormData(fileform)
        self.$vux.loading.show()
        self.$http.post(`${ENV.BokaApi}/api/upload/files`, filedata).then(function (res) {
          let data = res.data
          self.$vux.loading.hide()
          if (data.flag === 1) {
            self.photoarr1.push(data.data)
            self.submitdata.contentphoto = self.photoarr1.join(',')
          } else if (data.error) {
            self.$vux.toast.show({
              text: data.error,
              time: self.$util.delay(data.error)
            })
          }
        })
      }
    },
    deletephoto1 (item, index) {
      const self = this
      self.photoarr1.splice(index, 1)
      self.submitdata.contentphoto = self.photoarr1.join(',')
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
      if (isNaN(postdata.price) || postdata.price < 0 || (self.$util.trim(postdata.rebate) !== '' && (isNaN(postdata.rebate) || postdata.rebate < 0))) {
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
        let toasttype = data.flag !== 1 ? 'warn' : 'success'
        self.$vux.toast.show({
          text: data.error,
          type: toasttype,
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
    }
  }
}
</script>

<style lang="less" scoped>
.form-item{position:relative;padding:10px;}
.form-item:after{
  content:"";display:block;
	background-color:@list-border-color;height:1px;overflow:hidden;
	position: absolute;left: 0;right: 0;bottom:1px;
	-webkit-transform: scaleY(0.5) translateY(0.5px);
	transform: scaleY(0.5) translateY(0.5px);
	-webkit-transform-origin: 0% 0%;
	transform-origin: 0% 0%;
}
.q_photolist .fileinput{position:absolute;left:0;right:0;top:0;bottom:0;z-index:1;background-color:transparent;}
</style>
