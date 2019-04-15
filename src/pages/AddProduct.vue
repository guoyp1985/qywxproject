<template>
  <div class="containerarea s-havebottom font14 addproduct">
    <subscribe v-if="loginUser.subscribe != 1 && !loginUser.isretailer"></subscribe>
    <apply-tip v-if="showApply"></apply-tip>
    <template v-if="showContainer">
      <div class="s-container">
        <form ref="fileForm" enctype="multipart/form-data">
          <input ref="fileInput" class="hide" type="file" multiple="multiple" name="files" @change="fileMulChange('fileForm', 'photo')" />
        </form>
        <form ref="fileForm1" enctype="multipart/form-data">
          <input ref="fileInput1" class="hide" type="file" multiple="multiple" name="files" @change="fileMulChange('fileForm1', 'contentphoto')" />
        </form>
        <div class="list-shadow01">
          <div class="form-item no-after pt15 bg-gray10">
            <div class="cover_map" v-if="photoarr.length == 0" @click.stop="uploadPhoto('fileInput','photo')">
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
                    <div class="innerlist">
                      <div class="flex_center h_100">
                        <div class="txt">
                          <i class="al al-zhaopian" style="color:#c6c5c5;line-height:30px;"></i>
                          <div><span class="havenum">{{ photoarr.length }}</span><span class="ml5 mr5">/</span><span class="maxnum">{{ maxnum }}</span></div>
                        </div>
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
          <div v-if="classData.length" class="form-item required bg-white">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Product class') }}<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <select v-model="submitdata.classid" class="w_100" style="height:35px;">
                  <option value='0'>请选择</option>
                  <option v-for="(item,index) in classData" :value="item.id">{{ item.title }}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="form-item required bg-white">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Product name') }}<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <group class="textarea-outer" style="padding:0;">
                  <x-textarea
                    ref="titleTextarea"
                    v-model="submitdata.title"
                    name="title" class="x-textarea noborder"
                    :placeholder="$t('Product name')"
                    :show-counter="false"
                    :rows="1"
                    :max="30"
                    @on-change="textareaChange('titleTextarea')"
                    @on-focus="textareaFocus('titleTextarea')"
                    autosize>
                  </x-textarea>
                </group>
              </div>
            </div>
          </div>
          <div class="form-item required bg-white">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">商品原价</div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <x-input v-model="submitdata.oriprice" @keyup="priceChange('oriprice')" maxlength="9" size="9" type="text" class="input priceInput" name="oriprice" placeholder="商品原价" ></x-input>
              </div>
              <div class="t-cell v_middle align_right font12" style="width:20px;">元</div>
            </div>
          </div>
          <div class="form-item required bg-white">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">商品现价<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <x-input v-model="submitdata.price" @keyup="priceChange('price')" maxlength="9" size="9" type="text" class="input priceInput" name="price" :placeholder="$t('User final purchase price')" ></x-input>
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
                    <x-input v-model="submitdata.storage" type="tel" class="input" name="storage" :placeholder="$t('Storage')" maxlength="5" size="5" ></x-input>
                  </div>
                </div>
              </div>
              <div style="width:30%;">
                <div class="t-table">
                  <div class="t-cell title-cell font14 v_middle">{{ $t('Storage unit') }}<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
                  <div class="t-cell input-cell v_middle" style="position:relative;">
                    <x-input v-model="submitdata.unit" type="text" class="input align_right" name="unit" size="1" maxlength="1" :placeholder="$t('Storage unit')" ></x-input>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="form-item required bg-white">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Postage') }}<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <x-input v-model="submitdata.postage" @keyup="priceChange('postage')" type="text" class="input priceInput" name="postage" :placeholder="$t('Postage')" ></x-input>
              </div>
              <div class="t-cell v_middle align_right font12" style="width:20px;">元</div>
            </div>
          </div>
          <div class="form-item bg-white" v-if="showRebate">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Rebate Commission') }}</div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <x-input v-model="submitdata.rebate" @keyup="priceChange('rebate')" type="text" class="input rebateInput" name="rebate" :placeholder="$t('Goods sold to rebate user commission')" ></x-input>
              </div>
              <div class="t-cell v_middle align_right font12" style="width:20px;">元</div>
            </div>
          </div>
          <div class="form-item bg-white" v-if="showRebate">
            <div class="t-table">
              <!--
              <div class="t-cell title-cell font14 v_middle" style="width:120px;">是否允许使用卡券</div>
            -->
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <x-switch title='是否允许使用卡券' v-model="submitdata.allowcard"></x-switch>
              </div>
            </div>
          </div>
          <div class="pl12 pr12 pt10 bg-white">文字介绍</div>
          <group class="textarea-outer textarea-text bg-white">
            <x-textarea
              ref="contentTextarea"
              v-model="submitdata.content"
              name="content"
              class="x-textarea"
              :placeholder="$t('Product description')"
              :show-counter="false"
              :rows="1"
              @on-change="textareaChange('contentTextarea')"
              @on-focus="textareaFocus('contentTextarea')"
              autosize>
            </x-textarea>
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
                  <x-input v-model="submitdata.seotitle" type="text" class="input" name="seotitle" :placeholder="$t('Product share title placeholder')" ></x-input>
                </div>
              </div>
            </div>
            <div class="form-item bg-white no-after">
              <div class="t-table">
                <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Share description') }}</div>
                <div class="t-cell input-cell v_middle" style="position:relative;">
                  <group class="textarea-outer" style="padding:0;">
                    <x-textarea
                      ref="descTextarea"
                      v-model="submitdata.seodescription"
                      name="seodescription"
                      class="x-textarea noborder"
                      :placeholder="$t('Product share description placeholder')"
                      :show-counter="false"
                      :rows="1"
                      @on-change="textareaChange('descTextarea')"
                      @on-focus="textareaFocus('descTextarea')"
                      autosize>
                    </x-textarea>
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
import { Group, XInput, XTextarea, XSwitch } from 'vux'
import ENV from 'env'
import { User } from '#/storage'
import Sos from '@/components/Sos'
import Subscribe from '@/components/Subscribe'
import ApplyTip from '@/components/ApplyTip'
import OpenVip from '@/components/OpenVip'

export default {
  components: {
    Group, XInput, XTextarea, Sos, Subscribe, ApplyTip, OpenVip, XSwitch
  },
  data () {
    return {
      showApply: false,
      showContainer: false,
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
        classid: '0',
        title: '',
        price: '',
        oriprice: '',
        storage: '',
        unit: '件',
        postage: '0.00',
        rebate: '',
        photo: '',
        content: '',
        contentphoto: '',
        seotitle: '',
        seodescription: '',
        video: '',
        allowcard: false
      },
      allowsubmit: true,
      requireddata: {'photo': '', classid: '', title: '', 'price': '', 'storage': '', 'unit': '', 'postage': ''},
      showRebate: false,
      classData: [],
      submitIng: false
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
      this.videoarr = []
      this.submitdata = {
        classid: '0',
        title: '',
        oriprice: '',
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
        video: '',
        allowcard: false
      }
      this.photoarr = []
      this.photoarr1 = []
    },
    textareaChange (refname) {
      let curArea = this.$refs[refname][0] ? this.$refs[refname][0] : this.$refs[refname]
      curArea.updateAutosize()
      setTimeout(function () {
        curArea.updateAutosize()
      }, 50)
    },
    textareaFocus (refname) {
      let curArea = this.$refs[refname][0] ? this.$refs[refname][0] : this.$refs[refname]
      curArea.updateAutosize()
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
          let curMaxnum = self.maxnum
          if (type === 'video') {
            curMaxnum = 1
          }
          if (type === 'photo') {
            curMaxnum = self.maxnum - self.photoarr.length
          } else if (type === 'contentphoto') {
            curMaxnum = self.maxnum1 - self.photoarr1.length
          }
          if (curMaxnum > 9) {
            curMaxnum = 9
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
          self.$vux.loading.hide()
          let data = res.data
          self.photoCallback(data, type)
        })
      }
    },
    fileMulChange (refname, type) {
      const self = this
      const target = event.target
      const files = target.files
      if (files.length > 0) {
        let filedata = new FormData()
        for (let i = 0; i < files.length; i++) {
          filedata.append(`files[${i}]`, files[i])
        }
        self.$vux.loading.show()
        self.$http.post(`${ENV.BokaApi}/api/uploadFiles`, filedata).then(function (res) {
          self.$vux.loading.hide()
          let data = res.data
          if (data.flag === 1) {
            let retdata = data.data
            if (type === 'photo' && self.photoarr.length < self.maxnum) {
              let allowNum = self.maxnum - self.photoarr.length
              let addNum = retdata.length > allowNum ? allowNum : retdata.length
              let addData = retdata.slice(0, addNum)
              self.photoarr = self.photoarr.concat(addData)
              self.submitdata.photo = self.photoarr.join(',')
            } else if (type === 'contentphoto' && self.photoarr1.length < self.maxnum1) {
              let allowNum = self.maxnum1 - self.photoarr1.length
              let addNum = retdata.length > allowNum ? allowNum : retdata.length
              let addData = retdata.slice(0, addNum)
              self.photoarr1 = self.photoarr1.concat(addData)
              self.submitdata.contentphoto = self.photoarr1.join(',')
            }
          } else if (data.error) {
            self.$vux.toast.show({
              text: data.error,
              time: self.$util.delay(data.error)
            })
          }
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
      if (!self.submitIng) {
        if (self.$util.trim(postdata.photo) === '') {
          self.$vux.toast.text('请先上传封面图像', 'middle')
          return false
        }
        if (self.classData.length && !parseInt(postdata.classid)) {
          self.$vux.toast.text('请选择商品类别', 'middle')
          return false
        }
        if (self.$util.trim(postdata.title) === '') {
          self.$vux.toast.text('请输入商品名称', 'middle')
          return false
        }
        if (self.$util.trim(postdata.price) === '') {
          self.$vux.toast.text('请输入商品价格', 'middle')
          return false
        }
        let price = postdata.price.toString().replace(/,/g, '')
        let oriprice = postdata.oriprice.toString().replace(/,/g, '')
        let rebate = postdata.rebate
        if (self.$util.trim(rebate) !== '') {
          rebate = rebate.toString().replace(/,/g, '')
        }
        if ((self.$util.trim(oriprice) !== '' && (isNaN(oriprice) || parseFloat(oriprice) < 0)) || isNaN(price) || parseFloat(price) <= 0 || (self.$util.trim(rebate) !== '' && (isNaN(rebate) || parseFloat(rebate) < 0))) {
          self.$vux.toast.text('请输入正确的价格', 'middle')
          return false
        }
        if (self.$util.trim(postdata.storage) === '') {
          self.$vux.toast.text('请输入商品库存', 'middle')
          return false
        }
        if (self.$util.trim(postdata.unit) === '') {
          self.$vux.toast.text('请输入商品单位', 'middle')
          return false
        }
        let reg = new RegExp('[0-9]+')
        if (postdata.unit !== '' && reg.test(postdata.unit)) {
          self.$vux.toast.text('请输入正确的单位', 'middle')
          return false
        }
        if (self.$util.trim(postdata.postage) === '') {
          self.$vux.toast.text('请输入运费', 'middle')
          return false
        }
        if (!isNaN(rebate)) {
          const maxRebate = (parseFloat(price) - parseFloat(price) * 0.11).toFixed(2)
          if (parseFloat(rebate) > parseFloat(maxRebate)) {
            self.$vux.toast.text(`返点佣金应小于${maxRebate}元`, 'middle')
            return false
          }
        }
        if (self.$util.trim(postdata.content) === '' && self.$util.trim(postdata.contentphoto) === '') {
          self.$vux.toast.text('请完善商品介绍或者详情图片', 'middle')
          return false
        }
        self.submitIng = true
        postdata.price = price
        postdata.oriprice = oriprice
        postdata.rebate = rebate
        postdata.postage = postdata.postage.toString().replace(/,/g, '')
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
              self.submitIng = false
              if (data.flag === 1) {
                if (self.query.minibackurl) {
                  let minibackurl = decodeURIComponent(self.query.minibackurl)
                  if (self.query.backtype === 'relaunch') {
                    self.$wechat.miniProgram.reLaunch({url: `${minibackurl}`})
                  } else if (self.query.backtype === 'redirect') {
                    self.$wechat.miniProgram.redirectTo({url: `${minibackurl}`})
                  } else {
                    self.$wechat.miniProgram.navigateTo({url: `${minibackurl}`})
                  }
                } else if (self.query.from === 'apply') {
                  self.$router.push({path: '/centerSales'})
                } else {
                  self.$router.push({ path: '/product', query: { id: data.data, newadd: 1 } })
                }
              }
            }
          })
        })
      }
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
      if (self.loginUser.isretailer === 1) {
        self.savedata(postdata)
      } else if (self.loginUser.isretailer === 2) {
        self.$http.get(`${ENV.BokaApi}/api/list/product?from=retailer`, {
          params: {pagestart: 0, limit: 6}
        })
        .then(res => {
          const data = res.data
          const retdata = data.data ? data.data : data
          if (retdata.length >= 5 && !self.query.id) {
            self.openVip()
          } else {
            self.savedata(postdata)
          }
        })
      }
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
        const params2 = { params: { id: this.query.id, module: 'product', from: 'edit' } }
        this.$http.get(`${ENV.BokaApi}/api/moduleInfo`, params2).then(res => {
          const data = res.data
          self.data = data.data ? data.data : data
          self.activityInfo = self.data.activitinfo
          for (let key in self.submitdata) {
            if (key === 'allowcard') {
              if (self.data[key]) {
                self.submitdata[key] = true
              } else {
                self.submitdata[key] = false
              }
            } else {
              self.submitdata[key] = self.data[key]
            }
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
    init () {
      const self = this
      this.$http.get(`${ENV.BokaApi}/api/classList/product`).then(res => {
        const data = res.data
        self.classData = data.data ? data.data : data
      })
    },
    initContainer () {
      const self = this
      self.showApply = false
      self.showContainer = false
    },
    refresh () {
      const self = this
      self.$vux.loading.show()
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.loginUser = User.get()
      self.submitIng = false
      if (this.loginUser && (this.loginUser.subscribe === 1 || this.loginUser.isretailer)) {
        // if (self.loginUser.isretailer === 2) {
        //   self.initContainer()
        //   self.$vux.loading.hide()
        //   let backUrl = encodeURIComponent(location.href)
        //   location.replace(`${ENV.Host}/#/pay?id=${self.loginUser.payorderid}&module=payorders&lasturl=${backUrl}`)
        // } else {
        self.initContainer()
        let isAdmin = false
        for (let i = 0; i < self.loginUser.usergroup.length; i++) {
          if (self.loginUser.usergroup[i] === 1) {
            isAdmin = true
            break
          }
        }
        if (!self.loginUser.isretailer && !isAdmin) {
          this.$vux.loading.hide()
          self.initContainer()
          self.showApply = true
        } else {
          self.initContainer()
          self.showContainer = true
          this.$vux.loading.hide()
          if (this.query.id === undefined || this.query.id !== this.$route.query.id) {
            this.initSubmitData()
          }
          this.query = this.$route.query
          this.getData()
        }
        // }
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
.addproduct .s-container{top:0;}
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
.input.align_right input{text-align:right;}
</style>
