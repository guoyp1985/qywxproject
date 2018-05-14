/*
* @description: 内容编辑组件
* @auther: simon
* @created_date: 2018-5-3
*/
<template>
  <div class="editor">
    <form class="editorImageForm hide" enctype="multipart/form-data">
      <input style="opacity:0;" type="file" name="files" />
    </form>
    <div class="editor-icon">
      <div class="edit-btn-box" v-show="!showBtnArea">
        <a class="edit-btn" @click="clickEditHandle">
          <span class="color-white font16">{{$t('Edit')}}</span>
        </a>
      </div>
      <div class="menu-btn-box" v-show="!showMenuArea">
        <a class="menu-btn" @click="clickMenuHandle">
          <span class="color-white font16">{{$t('Menu')}}</span>
        </a>
      </div>
    </div>
    <flexbox slot="bottom" class="option-area" v-show="showBtnArea">
      <flexbox-item>
        <x-button type="primary" @click.native="onSave">{{$t('Save')}}</x-button>
      </flexbox-item>
      <flexbox-item>
        <x-button @click.native="onCancel">{{$t('Cancel')}}</x-button>
      </flexbox-item>
    </flexbox>
    <flexbox slot="bottom" class="option-area" v-show="showMenuArea">
      <flexbox-item>
        <x-button @click.native="onSetting">{{$t('Setting')}}</x-button>
      </flexbox-item>
      <flexbox-item>
        <x-button type="warn" @click.native="onDelete">{{$t('Delete')}}</x-button>
      </flexbox-item>
      <flexbox-item>
        <x-button @click.native="onClose">{{$t('Close')}}</x-button>
      </flexbox-item>
    </flexbox>
    <div v-transfer-dom class="x-popup popup-selectproduct">
      <popup v-model="showpopup" height="100%">
        <div class="popup1">
          <div class="popup-top flex_center">{{ $t('Select product') }}</div>
          <div class="popup-middle">
            <search
              class="x-search"
              v-model="searchword"
              :auto-fixed="autofixed"
              @on-submit="onSubmit"
              @on-change="onChange"
              @on-cancel="onCancelSearch"
              ref="search">
            </search>
            <div class="scroll_list">
              <div v-if="!productdata || productdata.length === 0" class="scroll_item padding10 color-gray align_center">
                <template v-if="searchresult">
                  <div class="flex_center" style="height:80px;">暂无搜索结果</div>
                </template>
                <template v-else>
                  <div class="flex_center" style="height:80px;">暂无商品</div>
                </template>
              </div>
              <check-icon v-else class="x-check-icon scroll_item" v-for="(item,index) in productdata" :key="item.id" :value.sync="item.checked" @click.native.stop="radioclick(item,index)">
                <div class="t-table">
                  <div class="t-cell pic v_middle w50">
                    <img :src="item.photo" style="width:40px;height:40px;" class="v_middle imgcover" />
                  </div>
                  <div class="t-cell v_middle" style="color:inherit;">
                    <div class="clamp1">{{item.title}}</div>
                    <div class="mt5 font12 clamp1"><span class="color-orange">¥{{ item.price }}</span><span class="ml10 color-gray">{{ $t('Storage') }} {{ item.storage }}</span></div>
                  </div>
                </div>
              </check-icon>
            </div>
          </div>
          <div class="popup-bottom flex_center">
            <div class="flex_cell bg-gray color-white h_100 flex_center" @click="closepopup">{{ $t('Close') }}</div>
            <div class="flex_cell bg-green color-white h_100 flex_center" @click="confirmpopup">{{ $t('Confirm txt') }}</div>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import { TransferDom, Flexbox, FlexboxItem, XButton, Popup, Search, CheckIcon } from 'vux'
import Eleditor from '#/Eleditor'
import ENV from 'env'
let editor = null
export default {
  name: 'Editor',
  directives: {
    TransferDom
  },
  components: {
    Flexbox, FlexboxItem, XButton, Popup, Search, CheckIcon
  },
  props: {
    elem: String
  },
  data () {
    return {
      showBtnArea: false,
      showMenuArea: false,
      autofixed: false,
      showselectproduct: true,
      showproductitem: false,
      selectproduct: {},
      selectpopupdata: null,
      showpopup: false,
      productdata: [],
      radiodata: [],
      searchword: '',
      searchresult: false,
      limit: 20,
      pagestart1: 0,
      isBindScroll1: false,
      scrollArea1: null,
      insertProductCallback: Function
    }
  },
  computed: {
  },
  watch: {
    selectproduct: function () {
      return this.selectproduct
    }
  },
  methods: {
    clickEditHandle () {
      this.showMenuArea = false
      this.showBtnArea = true
      this.createEditor()
      this.$vux.toast.text(this.$t('Entry Edit Mode'))
      this.$emit('on-edit')
    },
    onSave () {
      this.showBtnArea = false
      this.$emit('on-save')
    },
    onCancel () {
      this.showBtnArea = false
      editor.destory()
      this.$emit('on-cancel')
    },
    createEditor () {
      const self = this
      editor = new Eleditor({
        el: this.elem,
        insertImageCallback: function (callback) {
          if (typeof window.WeixinJSBridge === 'undefined' || typeof window.WeixinJSBridge === undefined) {
            let fileForm = document.querySelector('.editorImageForm')
            let fileInput = document.querySelector('.editorImageForm input')
            fileInput.click()
            fileInput.addEventListener('change', function (e) {
              let files = e.target.files
              if (files.length > 0) {
                let filedata = new FormData(fileForm)
                self.$vux.loading.show()
                self.$http.post(`${ENV.BokaApi}/api/upload/files`, filedata).then(function (res) {
                  let data = res.data
                  self.$vux.loading.hide()
                  if (data.flag === 1 && data.data) {
                    callback && callback(data.data)
                  } else if (data.error) {
                    self.$vux.toast.show({
                      text: data.error,
                      time: self.$util.delay(data.error)
                    })
                  }
                })
              }
            })
          } else {
            self.$wechat.ready(function () {
              self.$util.wxUploadImage({
                maxnum: 1,
                handleCallback: function (data) {
                  if (data.flag === 1 && data.data) {
                    callback && callback(data.data)
                  } else if (data.error) {
                    self.$vux.toast.show({
                      text: 'data.error',
                      time: self.$util.delay(data.error)
                    })
                  }
                }
              })
            })
          }
        },
        insertProductCallback: function (callback) {
          self.insertProductCallback = callback
          self.showpopup = true
          self.getProductData()
        }
      })
    },
    clickMenuHandle () {
      if (editor) {
        editor.destory()
      }
      this.showBtnArea = false
      this.showMenuArea = true
      this.$emit('on-menu')
    },
    onSetting () {
      this.$emit('on-setting')
    },
    onDelete () {
      this.$emit('on-delete')
    },
    onClose () {
      this.showMenuArea = false
    },
    radioclick (data, index) {
      const self = this
      if (data.checked) {
        self.selectpopupdata = data
      } else {
        self.selectpopupdata = null
      }
      for (let d of self.productdata) {
        if (d.id !== data.id && d.checked) {
          delete d.checked
          break
        }
      }
    },
    radiochange (val) {
      this.checkeduid = val
    },
    confirmpopup () {
      const self = this
      if (!this.selectpopupdata || !this.selectpopupdata.id) {
        self.$vux.alert.show({
          title: '',
          content: '请选择商品'
        })
        return false
      }
      this.selectproduct = this.selectpopupdata
      this.showpopup = false
      this.showselectproduct = false
      self.insertProductCallback && self.insertProductCallback(self.selectproduct)
    },
    onChange (val) {
      this.searchword = val
    },
    onCancelSearch () {
      const self = this
      self.searchword = ''
      self.$vux.loading.show()
      self.productdata = []
      self.pagestart1 = 0
      self.getProductData()
    },
    onSubmit () {
      const self = this
      self.$vux.loading.show()
      self.productdata = []
      self.pagestart1 = 0
      self.getProductData()
    },
    scroll1: function () {
      const self = this
      self.$util.scrollEvent({
        element: self.scrollArea1,
        callback: function () {
          if (self.productdata.length === (self.pagestart1 + 1) * self.limit) {
            self.pagestart1++
            self.$vux.loading.show()
            self.getProductData()
          }
        }
      })
    },
    getProductData () {
      const self = this
      let params = { params: { from: 'activity', pagestart: self.pagestart1, limit: self.limit } }
      let keyword = self.searchword
      if (typeof keyword !== 'undefined' && self.$util.trim(keyword) !== '') {
        params.params.keyword = keyword
      }
      self.$http.get(`${ENV.BokaApi}/api/list/product`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        if (typeof keyword !== 'undefined' && self.$util.trim(keyword) !== '') {
          self.searchresult = true
        } else {
          self.searchresult = false
        }
        let retdata = data.data ? data.data : data
        self.productdata = self.productdata.concat(retdata)
        if (!self.isBindScroll1) {
          self.scrollArea1 = document.querySelector('.popup-selectproduct .popup-middle')
          self.isBindScroll1 = true
          self.scrollArea1.removeEventListener('scroll', self.scroll1)
          self.scrollArea1.addEventListener('scroll', self.scroll1)
        }
      })
    },
    selectevent () {
      const self = this
      self.showpopup = true
      if (self.productdata.length === 0) {
        self.getProductData()
      }
    },
    closepopup () {
      this.showpopup = false
    }
  }
}
</script>

<style lang="less" scoped>
.editor .editor-icon{position:absolute;bottom:70px;right:10px;z-index:10;}
.edit-btn-box {
  position: absolute;
  bottom: 80px;
  right: 20px;
}
.menu-btn-box {
  position: absolute;
  bottom: 0px;
  right: 20px;
}

.edit-btn,
.menu-btn {
  width: 40px;
  height: 40px;
  padding: 10px;
  border-radius: 50%;
  display: block;
  text-align: center;
  line-height: 40px;
  z-index: 100;
}
.menu-btn {
  background-color: rgba(0, 0, 0, 0.55);
}
.edit-btn{
  background-color: rgba(248, 100, 0, 1);
}
.option-area {
  position: absolute;
  bottom: 0;
  z-index: 500;
  // height: 62px;
  padding: 10px 10px;
  box-sizing: border-box;
  background-color: #ffffff;
}
.option-area:before {
  content: ' ';
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  height: 1px;
  border-top: 1px solid #e7e7e7;
}
</style>
