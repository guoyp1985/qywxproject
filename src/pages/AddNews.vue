<template>
  <div class="containerarea s-havebottom font14 addnews bg-white">
    <div class="s-container" style="top:0;">
      <form>
        <div class="form-item required">
          <div class="t-table">
            <div class="t-cell title-cell w80 font14 v_middle">{{ $t('News title') }}<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
            <div class="t-cell input-cell v_middle" style="position:relative;">
              <input v-model="submitdata.title" type="text" class="input" name="title" :placeholder="$t('News title')" />
            </div>
          </div>
        </div>
        <div class="form-item required">
          <div class="pt10 pb5">{{ $t('Cover photo') }} <span class="al al-xing color-red font12" style="vertical-align: 3px;"></span> （图像最佳宽高比为9:5,上传图像后可点击图像左上角"<i class="al al-set font12"></i>"进行剪裁,本图片不会显示在文章内容里）</div>
          <div>
            <input v-model="submitdata.photo" type="hidden" name="photo" />
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
        <div v-show="showmore">
          <div class="form-item">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Share description') }}</div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <group class="textarea-outer" style="padding:10px 0;">
                  <x-textarea
                    class="x-textarea noborder"
                    v-model="submitdata.seodescription"
                    name="seodescription"
                    :placeholder="$t('Share description placeholder')"
                    :show-counter="false"
                    :rows="1" autosize>
                  </x-textarea>
                </group>
              </div>
            </div>
          </div>
          <div class="form-item">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Summary') }}</div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <group class="textarea-outer" style="padding:10px 0;">
                  <x-textarea
                    class="x-textarea noborder"
                    v-model="submitdata.summary"
                    name="summary"
                    :placeholder="$t('Summary')"
                    :show-counter="false"
                    :rows="1" autosize>
                  </x-textarea>
                </group>
              </div>
            </div>
          </div>
          <!--
          <div class="form-item labelarea">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Label') }}</div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <div v-for="(item,index) in labelarr" :key="index" class="labelitem">
                  <span>{{ item }}</span>
                  <div class="close" @click="deletelabel(item,index)">×</div>
                </div>
                <div class="addbtn" @click="addlabel">+</div>
              </div>
            </div>
          </div>
        -->
        </div>
        <div v-if="showmore" @click="expandevent" class="padding15 font14 align_center color-gray">{{ $t('Up more options') }}<i class="al al-jiantou2-up font14 middle-cell"></i></div>
        <div v-else class="padding15 font14 align_center color-gray"  @click="expandevent">{{ $t('Expand more options') }}<i class="al al-jiantouyoushuang- font14"></i></div>
      </form>
    </div>
    <div class="s-bottom flex_center bg-green color-white" @click="saveevent">{{ $t('Save') }}</div>
    <div v-transfer-dom>
      <confirm v-model="showconfirm"
      show-input
      :title="confirmtitle"
      :input-attrs="{type: 'text'}"
      @on-cancel="onCancel"
      @on-confirm="onConfirm">
      </confirm>
    </div>
    <div v-transfer-dom>
      <alert v-model="showalert">{{ $t('Label can not empty') }}</alert>
    </div>
    <div v-transfer-dom>
      <loading :show="isShowLoading" text=""></loading>
    </div>
  </div>
</template>

<i18n>
News title:
  zh-CN: 文章标题
Cover photo:
  zh-CN: 封面图像
Expand more options:
  zh-CN: 展开更多选项
Up more options:
  zh-CN: 收起更多选项
Share title:
  zh-CN: 分享标题
Share title placeholder:
  zh-CN: 如不填写默认调用商品标题
Share description:
  zh-CN: 分享描述
Share description placeholder:
  zh-CN: 如不填写自动截取文章内容
Label:
  zh-CN: 标签
Save:
  zh-CN: 保存
Label can not empty:
  zh-CN: 标签不能为空
</i18n>

<script>
import { Group, XInput, XTextarea, Confirm, TransferDomDirective as TransferDom, Alert, Loading } from 'vux'
import ENV from '#/env'

export default {
  directives: {
    TransferDom
  },
  components: {
    Group,
    XInput,
    XTextarea,
    Confirm,
    Alert,
    Loading
  },
  data () {
    return {
      allowsubmit: true,
      isShowLoading: false,
      photoarr: [],
      maxnum: 1,
      havenum: 0,
      showmore: false,
      labelarr: [],
      confirmtitle: '标签',
      showconfirm: false,
      showalert: false,
      submitdata: { title: '', photo: '', seodescription: '', summary: '' },
      requireddata: { title: '', 'photo': '' }
    }
  },
  created () {
    const self = this
    self.$store.commit('updateToggleTabbar', {toggleBar: false})
    const query = self.$route.query
    if (query.id) {
      self.$http.get(`${ENV.BokaApi}/api/moduleInfo`, {
        params: { id: query.id, module: 'news' }
      }).then(function (res) {
        return res.json()
      }).then(function (data) {
        let retdata = data.data ? data.data : data
        if (retdata) {
          for (let key in self.submitdata) {
            self.submitdata[key] = retdata[key]
          }
          if (!self.$util.isNull(self.submitdata.photo)) {
            self.photoarr = self.submitdata.photo.split(',')
          }
        }
      })
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
    labelarr: function () {
      return this.labelarr
    }
  },
  computed: {
  },
  methods: {
    filechange (e) {
      const self = this
      let files = e.target.files
      if (files.length > 0 && !self.isShowLoading) {
        let fileform = document.querySelector('.fileform')
        let filedata = new FormData(fileform)
        self.isShowLoading = true
        self.$http.post(`${ENV.BokaApi}/api/upload/files`, filedata).then(function (res) {
          return res.json()
        }).then(function (data) {
          self.isShowLoading = false
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
      this.photoarr.splice(index, 1)
      this.submitdata.photo = this.photoarr.join(',')
    },
    addlabel () {
      this.showconfirm = true
    },
    deletelabel (item, index) {
      for (var i = 0; i < this.labelarr.length; i++) {
        if (i === index) {
          this.labelarr.splice(i, 1)
          break
        }
      }
    },
    expandevent () {
      this.showmore = !this.showmore
    },
    onCancel () {
      this.showconfirm = false
    },
    onConfirm (val) {
      let str = val.replace(/\s+/g, '')
      if (str === '') {
        this.showalert = true
      } else {
        this.labelarr.push(val)
      }
    },
    saveevent () {
      const self = this
      const query = self.$route.query
      for (let key in self.requireddata) {
        self.requireddata[key] = self.submitdata[key]
      }
      self.allowsubmit = self.$util.validateQueue(self.requireddata)
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
      if (query.id) {
        self.submitdata['id'] = query.id
      } else {
        delete self.submitdata['id']
      }
      self.$http.post(`${ENV.BokaApi}/api/add/news`, self.submitdata).then(function (res) {
        return res.json()
      }).then(function (data) {
        self.isShowLoading = false
        self.$vux.toast.show({
          text: data.error,
          time: self.$util.delay(data.error),
          onHide: function () {
            if (data.flag === 1) {
              self.$router.push({name: '/article', params: { id: data.data }})
            }
          }
        })
      })
    }
  }
}
</script>

<style lang="less">
.addnews .addbtn{
  display:inline-block;
  width:30px;
  height:20px;
  line-height:20px;
  border-radius:3px;
  text-align:center;
  border: 1px solid #17a8e0;
  color: #17a8e0;
}
.addnews .labelitem{
  display: inline-block;
  border: 1px solid #ccc;
  height: 20px;
  line-height: 20px;
  text-align: center;
  border-radius: 3px;
  position: relative;
  padding: 0 3px;
  margin: 0 10px 0 0px;
}
.addnews .labelitem .close{
  position: absolute;
  top: -6px;
  left: -6px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: #f00f0f;
  color: #fff;
  line-height: 14px;
  text-align: center;
}
</style>
