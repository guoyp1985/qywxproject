<template>
<<<<<<< HEAD
  <div class="containerarea s-havebottom font14 bg-white">
    <div class="s-container" style="top:0;">
      <div class="form-item required">
        <div class="t-table">
          <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Product name') }}<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
          <div class="t-cell input-cell v_middle" style="position:relative;">
            <input v-model="submitdata.title" type="text" class="input" name="title" :placeholder="$t('Product name')" />
          </div>
        </div>
      </div>
      <div class="form-item required">
        <div class="t-table">
          <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Product price') }}<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
          <div class="t-cell input-cell v_middle" style="position:relative;">
            <input v-model="submitdata.price" type="text" class="input" name="price" :placeholder="$t('User final purchase price')" />
          </div>
          <div class="t-cell v_middle align_right font12" style="width:20px;">元</div>
        </div>
      </div>
      <div class="form-item required">
        <div class="t-table">
          <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Product') }}{{ $t('Storage') }}<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
          <div class="t-cell input-cell v_middle" style="position:relative;">
            <input v-model="submitdata.storage" type="text" class="input" name="storage" :placeholder="$t('Storage')" />
          </div>
          <div class="t-cell v_middle align_right font12" style="width:20px;">件</div>
        </div>
      </div>
      <div class="form-item">
        <div class="t-table">
          <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Rebate Commission') }}</div>
          <div class="t-cell input-cell v_middle" style="position:relative;">
            <input v-model="submitdata.rebate" type="text" class="input" name="rebate" :placeholder="$t('Goods sold to customer rebate Commission')" />
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
=======
  <div class="containerarea s-havebottom font14">
    <div class="s-container" style="top:0;">
      <form>
        <div class="form-item required">
          <div class="t-table">
            <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Title') }}<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
            <div class="t-cell input-cell v_middle" style="position:relative;">
              <input type="text" class="input" name="title" :placeholder="$t('Outer show product title')" />
            </div>
          </div>
        </div>
        <div class="form-item required">
          <div class="t-table">
            <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Price') }}<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
            <div class="t-cell input-cell v_middle" style="position:relative;">
              <input type="text" class="input" name="title" :placeholder="$t('User buy price')" />
            </div>
            <div class="t-cell v_middle align_right font12" style="width:40px;">元</div>
          </div>
        </div>
        <div class="form-item">
          <div class="t-table">
            <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Commission') }}</div>
            <div class="t-cell input-cell v_middle" style="position:relative;">
              <input type="text" class="input" name="rebate" :placeholder="$t('Rebate user provide commision')" />
            </div>
            <div class="t-cell v_middle align_right font12" style="width:40px;">元</div>
          </div>
        </div>
        <div class="form-item required">
          <div class="t-table">
            <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Storage') }}<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
            <div class="t-cell input-cell v_middle" style="position:relative;">
              <input type="text" class="input" name="storage" :placeholder="$t('Storage')" />
            </div>
            <div class="t-cell v_middle align_right font12" style="width:40px;">件</div>
          </div>
        </div>
        <div class="form-item required">
          <div class="pt10 pb5">封面图像 <span class="al al-xing color-red font12" style="vertical-align: 3px;"></span> （图像最佳宽高比为1:1）</div>
          <div>
            <input type="hidden" name="qrcode" required="" value="http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15204030611795.jpg" class="no-fastclick">
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
                  <input type="file" style="position:absolute;left:0;right:0;top:0;bottom:0;z-index:1;background-color:transparent;" @change="filechange">
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
        <div class="pl10 pr10 pb5 pt10">商品介绍（图像宽高不受限制）</div>
        <group class="textarea-outer">
          <x-textarea class="x-textarea" :placeholder="$t('Product description')" :show-counter="false" :rows="1" autosize></x-textarea>
        </group>
        <div class="b_bottom_after">
          <input type="hidden" name="qrcode" required="" value="http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15204030611795.jpg" class="no-fastclick">
          <div class="q_photolist align_left" uploadform=".uploadfileForm">
            <template v-if="photoarr1.length > 0">
              <div v-for="(item,index) in photoarr1" :key="index" class="photoitem">
                <div class="inner photo" :photo="item" :style="`background-image: url('${item}');`">
                  <div class="close" @click="deletephoto1(item,index)">×</div>
                </div>
              </div>
            </template>
            <div v-if="photoarr1.length < maxnum1" class="photoitem add">
              <div class="inner">
                <input type="file" style="position:absolute;left:0;right:0;top:0;bottom:0;z-index:1;background-color:transparent;" @change="filechange1">
>>>>>>> 25ba8f0938d571307dda639b762880ec13c7c827
                <div class="t-table">
                  <div class="t-cell">
                    <div class="txt">
                      <i class="al al-zhaopian" style="color:#c6c5c5;line-height:30px;"></i>
<<<<<<< HEAD
                      <div><span class="havenum">{{ gethavenum }}</span><span class="ml5 mr5">/</span><span class="maxnum">{{ maxnum }}</span></div>
=======
                      <div><span class="havenum">{{ gethavenum1 }}</span><span class="ml5 mr5">/</span><span class="maxnum">{{ maxnum1 }}</span></div>
>>>>>>> 25ba8f0938d571307dda639b762880ec13c7c827
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
<<<<<<< HEAD
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
              <div class="inner photo" :photo="item" :style="`background-image: url('${item}');`">
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
      <div class="flex_cell flex_center h_100 bg-orange color-white" style="border-right:#fff 1px solid;" @click="saveevent">{{ $t('Save') }}</div>
      <div class="flex_cell flex_center h_100 bg-orange color-white" @click="saveupevent">{{ $t('Save and up') }}</div>
    </div>
    <div v-transfer-dom>
      <loading :show="isShowLoading" text=""></loading>
=======
        <div v-show="showmore">
          <div class="form-item">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Share title') }}</div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <input type="text" class="input" name="title" :placeholder="$t('Outer show product title')" />
              </div>
            </div>
          </div>
          <div class="form-item">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Share description') }}</div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <group class="textarea-outer" style="padding:10px 0;">
                  <x-textarea class="x-textarea" :placeholder="$t('Share description placeholder')" :show-counter="false" :rows="1" autosize></x-textarea>
                </group>
              </div>
            </div>
          </div>
        </div>
        <div v-if="showmore" @click="expandevent" class="padding15 font14 align_center color-gray">{{ $t('Up text') }}<i class="al al-jiantou2-up font14 middle-cell"></i></div>
        <div v-else class="padding15 font14 align_center color-gray"  @click="expandevent">{{ $t('More') }}<i class="al al-jiantouyoushuang- font14"></i></div>
      </form>
    </div>
    <div class="s-bottom flex_center bg-orange color-white">
      <div class="flex_cell flex_center h_100 bg-orange color-white" style="border-right:#fff 1px solid;">{{ $t('Save') }}</div>
      <div class="flex_cell flex_center h_100 bg-orange color-white">{{ $t('Save and up') }}</div>
>>>>>>> 25ba8f0938d571307dda639b762880ec13c7c827
    </div>
  </div>
</template>

<i18n>
<<<<<<< HEAD
Product name:
  zh-CN: 商品名称
Product price:
  zh-CN: 商品价格
User final purchase price:
  zh-CN: 用户最终购买价格
Rebate Commission:
  zh-CN: 返点佣金
Goods sold to customer rebate Commission:
  zh-CN: 返点客售出商品后给予的佣金
Rebate user provide commision:
  zh-CN: 返点客售出商品后给予的佣金
Product share title placeholder:
  zh-CN: 如不填写默认调用商品标题
Product share description placeholder:
=======
Title:
  zh-CN: 标题
Outer show product title:
  zh-CN: 对外展示的商品标题
Price:
  zh-CN: 价格
User buy price:
  zh-CN: 用户最终购买价格
Commission:
  zh-CN: 佣金
Rebate user provide commision:
  zh-CN: 返点客售出商品后给予的佣金
Storage:
  zh-CN: 库存
Product description:
  zh-CN: 商品介绍
Share title:
  zh-CN: 分享标题
Share title placeholder:
  zh-CN: 如不填写默认调用商品标题
Share description:
  zh-CN: 分享描述
Share description placeholder:
>>>>>>> 25ba8f0938d571307dda639b762880ec13c7c827
  zh-CN: 如不填写自动截取商品介绍
Save:
  zh-CN: 保存
Save and up:
  zh-CN: 保存并上架
More:
  zh-CN: 更多
Up text:
  zh-CN: 收起
</i18n>

<script>
<<<<<<< HEAD
import { Group, XInput, XTextarea, Loading, TransferDomDirective as TransferDom } from 'vux'
import ENV from '../../libs/env'
import Util from '../../libs/util'

export default {
  directives: {
    TransferDom
  },
  components: {
    Group,
    XInput,
    XTextarea,
    Loading
  },
  data () {
    return {
      isShowLoading: false,
      photoarr: [],
=======
import { Group, XInput, XTextarea } from 'vux'

export default {
  components: {
    Group,
    XInput,
    XTextarea
  },
  data () {
    return {
      photoarr: [ 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15204030611795.jpg' ],
>>>>>>> 25ba8f0938d571307dda639b762880ec13c7c827
      maxnum: 9,
      havenum: 0,
      showaddphoto: true,
      showphotoitem: false,
<<<<<<< HEAD
      photoarr1: [],
=======
      photoarr1: [ 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15204030611795.jpg' ],
>>>>>>> 25ba8f0938d571307dda639b762880ec13c7c827
      maxnum1: 19,
      havenum1: 0,
      showaddphoto1: true,
      showphotoitem1: false,
<<<<<<< HEAD
      showmore: false,
      submitdata: {
        title: '',
        price: '',
        storage: '',
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
  watch: {
    submitdata: function () {
      return this.submitdata
    },
=======
      showmore: false
    }
  },
  watch: {
>>>>>>> 25ba8f0938d571307dda639b762880ec13c7c827
    havenum: function (val) {
      this.havenum = this.photoarr.length
    },
    showaddphoto: function (val) {
      let ret = false
      if (this.photoarr.length < this.maxnum) {
        ret = true
      }
      return ret
    },
    showphotoitem: function (val) {
      let ret = false
      if (this.photoarr.length > 0) {
        ret = true
      }
      return ret
    },
    havenum1: function (val) {
      this.havenum1 = this.photoarr1.length
    },
    showaddphoto1: function (val) {
      let ret = false
      if (this.photoarr1.length < this.maxnum1) {
        ret = true
      }
      return ret
    },
    showphotoitem1: function (val) {
      let ret = false
      if (this.photoarr1.length > 0) {
        ret = true
      }
      return ret
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
<<<<<<< HEAD
  created: function () {
    let self = this
    self.$store.commit('updateToggleTabbar', {toggleBar: false})
  },
  methods: {
    filechange (e) {
      let self = this
      let files = e.target.files
      if (files.length > 0 && !self.isShowLoading) {
        let fileform = document.querySelector('.fileform1')
        let filedata = new FormData(fileform)
        self.isShowLoading = true
        self.$http.post(`${ENV.BokaApi}/api/upload/files`, filedata).then(function (res) {
          return res.json()
        }).then(function (data) {
          self.isShowLoading = false
          if (data.flag === 1) {
            self.photoarr.push(data.data)
            self.submitdata.photo = self.photoarr.join(',')
            if (self.photoarr.length >= self.maxnum) {
              this.showaddphoto = false
            }
            this.showphotoitem = true
          } else if (data.error) {
            self.$vux.toast.show({
              text: data.error,
              time: Util.delay(data.error)
            })
          }
        })
      }
    },
    deletephoto (item, index) {
      let self = this
      for (let i = 0; i < self.photoarr.length; i++) {
        if (i === index) {
          self.photoarr.splice(i, 1)
          if (self.photoarr.length === 0) {
            self.showaddphoto = true
            self.showphotoitem = false
          }
          self.submitdata.photo = self.photoarr.join(',')
=======
  methods: {
    filechange (e) {
      if (this.havenum < this.maxnum) {
        this.havenum += 1
        this.photoarr.push('http://ossgxs.boka.cn/month_201804/15231791164010.jpg')
      } else {
        this.showaddphoto = false
      }
      this.showphotoitem = true
    },
    deletephoto (item, index) {
      for (var i = 0; i < this.photoarr.length; i++) {
        if (i === index) {
          this.photoarr.splice(i, 1)
          this.havenum -= 1
          if (this.photoarr.length === 0) {
            this.showaddphoto = true
            this.showphotoitem = false
          }
>>>>>>> 25ba8f0938d571307dda639b762880ec13c7c827
          break
        }
      }
    },
    filechange1 (e) {
<<<<<<< HEAD
      let self = this
      let files = e.target.files
      if (files.length > 0 && !self.isShowLoading) {
        let fileform = document.querySelector('.fileform2')
        let filedata = new FormData(fileform)
        self.isShowLoading = true
        self.$http.post(`${ENV.BokaApi}/api/upload/files`, filedata).then(function (res) {
          return res.json()
        }).then(function (data) {
          self.isShowLoading = false
          if (data.flag === 1) {
            self.photoarr1.push(data.data)
            self.submitdata.contentphoto = self.photoarr1.join(',')
            if (self.photoarr1.length >= self.maxnum1) {
              this.showaddphoto1 = false
            }
            this.showphotoitem1 = true
          } else if (data.error) {
            self.$vux.toast.show({
              text: data.error,
              time: Util.delay(data.error)
            })
          }
        })
      }
    },
    deletephoto1 (item, index) {
      let self = this
      for (let i = 0; i < self.photoarr1.length; i++) {
        if (i === index) {
          self.photoarr1.splice(i, 1)
          if (self.photoarr1.length === 0) {
            self.showaddphoto1 = true
            self.showphotoitem1 = false
          }
          self.submitdata.contentphoto = self.photoarr1.join(',')
=======
      if (this.havenum1 < this.maxnum1) {
        this.havenum1 += 1
        this.photoarr1.push('http://ossgxs.boka.cn/month_201804/15231791164010.jpg')
      } else {
        this.showaddphoto1 = false
      }
      this.showphotoitem1 = true
    },
    deletephoto1 (item, index) {
      for (var i = 0; i < this.photoarr1.length; i++) {
        if (i === index) {
          this.photoarr1.splice(i, 1)
          this.havenum1 -= 1
          if (this.photoarr1.length === 0) {
            this.showaddphoto1 = true
            this.showphotoitem1 = false
          }
>>>>>>> 25ba8f0938d571307dda639b762880ec13c7c827
          break
        }
      }
    },
    expandevent () {
      this.showmore = !this.showmore
<<<<<<< HEAD
    },
    saveevent () {
      let self = this
      for (let key in self.requireddata) {
        self.requireddata[key] = self.submitdata[key]
      }
      self.allowsubmit = Util.validateQueue(self.requireddata)
      if (!self.allowsubmit) {
        self.$vux.alert.show({
          title: '',
          content: '必填项不能为空',
          onShow () {
          },
          onHide () {
            self.allowsubmit = true
          }
        })
        return false
      }
      self.isShowLoading = true
      self.$http.post(`${ENV.BokaApi}/api/add/product`, self.submitdata).then(function (res) {
        return res.json()
      }).then(function (data) {
        self.isShowLoading = false
        self.$vux.toast.show({
          text: data.error,
          time: Util.delay(data.error),
          onHide: function () {
            if (data.flag === 1) {
              self.$router.push('/retailerProductlist')
            }
          }
        })
      })
    },
    saveupevent () {
      let self = this
      for (let key in self.requireddata) {
        self.requireddata[key] = self.submitdata[key]
      }
      self.allowsubmit = Util.validateQueue(self.requireddata)
      if (!self.allowsubmit) {
        self.$vux.alert.show({
          title: '',
          content: '必填项不能为空',
          onShow () {
          },
          onHide () {
            self.allowsubmit = true
          }
        })
        return false
      }
      self.isShowLoading = true
      let postdata = self.submitdata
      postdata['moderate'] = 1
      self.$http.post(`${ENV.BokaApi}/api/add/product`, postdata).then(function (res) {
        return res.json()
      }).then(function (data) {
        self.isShowLoading = false
        self.$vux.toast.show({
          text: data.error,
          time: Util.delay(data.error),
          onHide: function () {
            if (data.flag === 1) {
              self.$router.push('/retailerProductlist')
            }
          }
        })
      })
=======
>>>>>>> 25ba8f0938d571307dda639b762880ec13c7c827
    }
  }
}
</script>

<style lang="less">
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
<<<<<<< HEAD
.q_photolist .fileinput{position:absolute;left:0;right:0;top:0;bottom:0;z-index:1;background-color:transparent;}
=======
>>>>>>> 25ba8f0938d571307dda639b762880ec13c7c827
</style>
