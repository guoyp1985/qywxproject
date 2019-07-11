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
    <div :class="`outer-eidtor-tip ${editTipCss}`">点击【编辑】按钮可修改内容哦！</div>
    <div class="editor-icon">
      <div class="edit-btn-box" v-if="showEditIcon">
        <div class="edit-btn" @click="clickEditHandle">
          <span class="color-white font16">{{$t('Edit')}}</span>
        </div>
      </div>
      <div class="edit-btn-box" v-else>
        <!-- <div class="cancel-btn" @click="onCancel">
          <span class="color-white font16">{{$t('Cancel')}}</span>
        </div> -->
        <div class="save-btn" @click="onSave">
          <span class="color-white font16">完成</span>
        </div>
      </div>
      <div v-if="query.from != 'miniprogram' && showEditIcon" class="menu-btn-box" v-show="showMenuIcon && module == 'news'">
        <div class="menu-btn" @click="clickMenuHandle">
          <span class="color-white font16">{{$t('Menu')}}</span>
        </div>
      </div>
    </div>
    <!--
    <div class="editor-icon">
      <div class="edit-btn-box" v-show="!showBtnArea">
        <div class="edit-btn" @click="clickEditHandle">
          <span class="color-white font16">{{$t('Edit')}}</span>
        </div>
      </div>
      <div class="menu-btn-box" v-show="!showMenuArea">
        <div class="menu-btn" @click="clickMenuHandle">
          <span class="color-white font16">{{$t('Menu')}}</span>
        </div>
      </div>
    </div>
  -->
    <!-- <flexbox slot="bottom" class="option-area" v-if="showBtnArea && showBtnSave">
      <flexbox-item>
        <x-button @click.native="onCancel">{{$t('Cancel')}}</x-button>
      </flexbox-item>
      <flexbox-item>
        <x-button type="primary" @click.native="onSave">{{$t('Save')}}</x-button>
      </flexbox-item>
    </flexbox> -->
    <div v-transfer-dom class="x-popup">
      <popup v-model="showpopup" height="100%">
        <div class="popup1">
          <div class="popup-top flex_center">{{ $t('Select product') }}</div>
          <div ref="scrollProduct" @scroll="handleScroll('scrollProduct','product')" class="popup-middle">
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
    <div v-transfer-dom>
      <popup class="menuwrap" v-model="showMenuArea">
        <div class="popup0">
          <div class="list">
            <!--
            <div class="item">
              <div class="inner" @click="pushEvent">推送给返点客</div>
            </div>
          -->
            <div class="item">
              <router-link class="inner" :to="{path: '/stat', query: {id: query.id,module:'news'}}">文章统计</router-link>
            </div>
            <div class="item">
              <router-link class="inner" to="/addNews">创建文章</router-link>
            </div>
            <div class="item">
              <router-link class="inner" :to="{path: '/addNews', query: {id: query.id}}">更多设置</router-link>
            </div>
            <!-- <div class="item" v-if="query.from != 'miniprogram'">
              <router-link class="inner" :to="{path:'/poster',query:{id:query.id, module:'news'}}">生成海报</router-link>
            </div>
            <div class="item">
              <div class="inner" @click="deleteNews">删除文章</div>
            </div> -->
            <div class="item close mt10" @click="closeMenuPopup">
              <div class="inner">{{ $t('Cancel txt') }}</div>
            </div>
          </div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom class="x-popup">
      <popup v-model="showpush" height="100%">
        <div class="popup1">
          <div class="popup-top flex_center">选择返点客</div>
          <div class="flex_left border-box pl10 pr10" style="position:absolute;left:0;right:0;top:46px;height:40px;">
            <div class="w_100">
              <check-icon class="x-check-icon w_100" :value.sync="checkAll" @click.native.stop="checkAllEvent">
                <div class="flex_left">全选</div>
              </check-icon>
            </div>
          </div>
          <div ref="scrollCustomer" @scroll="handleScroll('scrollCustomer','customer')" class="popup-middle font14" style="top:85px;bottom:86px;">
            <div class="padding10">
              <div v-if="disCustomerData" class="scroll_list">
                <template v-if="customerdata.length == 0">
                  <div class="scroll_item emptyitem">
          					<div class="t-table">
          						<div class="t-cell" style="padding:10px;">暂无返点客</div>
          					</div>
          				</div>
                </template>
                <check-icon v-else class="x-check-icon scroll_item pt10 pb10" v-for="(item,index) in customerdata" :key="item.uid" :value.sync="item.checked" @click.native.stop="radioclick1(item,index)">
                  <div class="t-table">
                    <div class="t-cell v_middle w50">
                      <img :src="item.avatar" class="avatarimg imgcover" />
                    </div>
                    <div class="t-cell v_middle" style="color:inherit;">
                      <div class="clamp1">{{ item.linkman }}</div>
                    </div>
                  </div>
                </check-icon>
              </div>
  					</div>
          </div>
          <div class="flex_left border-box pl10 pr10" style="position:absolute;left:0;right:0;bottom:46px;height:40px;">
            <div class="w_100">
              <div class="align_left color-red font12 w_100">提示：只有48小时内互动过的返点客才可以收到通知！</div>
            </div>
          </div>
          <div class="popup-bottom flex_center">
            <div class="flex_cell h_100 flex_center bg-gray color-white" @click="closepush">{{ $t('Close') }}</div>
            <div class="flex_cell h_100 flex_center bg-green color-white" @click="submitpush">提交</div>
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
import jQuery from 'jquery'
let editor = null
let self = {}
export default {
  name: 'Editor',
  directives: {
    TransferDom
  },
  components: {
    Flexbox, FlexboxItem, XButton, Popup, Search, CheckIcon
  },
  props: {
    elem: String,
    query: Object,
    loginUser: {
      type: Object,
      default: {}
    },
    module: {
      type: String,
      default: 'news'
    }
  },
  data () {
    return {
      showEditIcon: true,
      showMenuIcon: true,
      showBtnArea: false,
      showMenuArea: false,
      autofixed: false,
      showBtnSave: true,
      showselectproduct: true,
      showproductitem: false,
      selectproduct: {},
      selectpopupdata: null,
      showpopup: false,
      productdata: [],
      radiodata: [],
      searchword: '',
      searchresult: false,
      limit: 10,
      pagestart1: 0,
      insertProductCallback: Function,
      isDown: false,
      isMove: false,
      x: 0,
      y: 0,
      sx: 0,
      sy: 0,
      mx: 0,
      my: 0,
      bottompoint: 60,
      menuheight: 60,
      showpush: false,
      disCustomerData: false,
      customerdata: [],
      pushdata: [],
      checkAll: false,
      customerPagestart: 0,
      touchElement: null,
      editTipCss: ''
    }
  },
  computed: {
  },
  watch: {
    selectproduct: function () {
      return this.selectproduct
    },
    showMenuArea (prop) {
      if (this.isEditMod) {
        this.showBtnArea = !prop
      }
    }
  },
  methods: {
    clickEditHandle () {
      this.isEditMod = true
      this.showEditIcon = false
      this.showBtnArea = true
      // this.showMenuIcon = false
      this.showMenuArea = false
      this.editTipCss = ''
      this.createEditor()
      // this.$vux.toast.text(this.$t('Entry Edit Mode'))
      this.$vux.toast.show({
        text: this.$t('Entry Edit Mode'),
        type: 'text',
        time: 3000
      })
      this.$emit('on-edit')
    },
    closeMenuPopup () {
      this.showMenuArea = false
      this.showEditIcon = true
      // this.showMenuIcon = true
    },
    pushEvent () {
      this.showMenuArea = false
      this.showpush = true
      if (self.customerdata.length === 0) {
        self.getCustomerdata()
      }
    },
    closepush () {
      self.showpush = false
      this.showEditIcon = true
      // this.showMenuIcon = true
    },
    submitpush () {
      if (self.pushdata.length === 0) {
        self.$vux.toast.show({
          text: '请选择返点客'
        })
        return false
      }
      self.$vux.loading.show()
      let subdata = { id: self.query.id, sendmodule: 'news', uid: self.pushdata }
      self.$http.post(`${ENV.BokaApi}/api/retailer/sendGroupNews`, subdata).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        self.$vux.toast.show({
          text: data.error,
          time: self.$util.delay(data.error),
          onHide: function () {
            if (data.flag === 1) {
              self.showpush = false
              self.showEditIcon = true
              // self.showMenuIcon = true
            }
          }
        })
      })
    },
    radioclick1 (data, index) {
      if (data.checked) {
        self.pushdata.push(data.uid)
      } else {
        self.checkAll = false
        for (let i = 0; i < self.pushdata.length; i++) {
          if (self.pushdata[i] === data.uid) {
            self.pushdata.splice(i, 1)
            break
          }
        }
      }
    },
    checkAllEvent () {
      for (let i = 0; i < self.customerdata.length; i++) {
        if (self.checkAll) {
          self.customerdata[i].checked = true
        } else {
          delete self.customerdata[i].checked
        }
      }
    },
    handleScroll: function (refname, type) {
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          if (type === 'product') {
            if (self.productdata.length === (self.pagestart1 + 1) * self.limit) {
              self.pagestart1++
              self.$vux.loading.show()
              self.getProductData()
            }
          } else if (type === 'customer') {
            if (self.customerdata.length === (self.customerPagestart + 1) * self.limit) {
              self.customerPagestart++
              self.$vux.loading.show()
              self.getCustomerdata()
            }
          }
        }
      })
    },
    getProductData () {
      let params = {pagestart: self.pagestart1, limit: self.limit, wid: this.loginUser.uid}
      let keyword = self.searchword
      if (typeof keyword !== 'undefined' && self.$util.trim(keyword) !== '') {
        params.keyword = keyword
      }
      self.$http.get(`${ENV.BokaApi}/api/retailer/getRetailerProducts`, {
        params: params
      }).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        if (typeof keyword !== 'undefined' && self.$util.trim(keyword) !== '') {
          self.searchresult = true
        } else {
          self.searchresult = false
        }
        let retdata = data.data ? data.data : data
        self.productdata = self.productdata.concat(retdata)
      })
    },
    getCustomerdata () {
      self.$vux.loading.show()
      let params = { params: { pagestart: self.customerPagestart, limit: self.limit } }
      self.$http.get(`${ENV.BokaApi}/api/retailer/sellersList`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.customerdata = self.customerdata.concat(retdata)
        self.disCustomerData = true
      })
    },
    onSave () {
      this.isEditMod = false
      this.showBtnArea = false
      editor.destory()
      this.$emit('on-save')
      this.showEditIcon = true
      // this.showMenuIcon = true
    },
    onCancel () {
      this.isEditMod = false
      this.showBtnArea = false
      editor.destory()
      this.$emit('on-cancel')
      this.showEditIcon = true
      // this.showMenuIcon = true
    },
    createEditor () {
      let toolbars = [
        'insertProduct',
        'insertText',
        'editText',
        'insertImage',
        // 'insertLink',
        'insertHr',
        'deleteThis',
        'undo',
        'cancel'
      ]
      if (self.module === 'factorynews') {
        toolbars.splice(0, 1)
      }
      if (editor) {
        editor.destory()
      }
      editor = new Eleditor({
        el: this.elem,
        toolbars: toolbars,
        changeTxt: function () {
          self.$emit('on-auto-save')
        },
        deleteThis: function () {
          self.$emit('on-auto-save')
        },
        insertImageCallback: function (callback) {
          if (!window.WeixinJSBridge) {
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
                    self.$emit('on-auto-save')
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
                    self.$emit('on-auto-save')
                    callback && callback(data.data)
                    // self.$vux.toast.show({
                    //   text: data.data,
                    //   time: 5000
                    // })
                  } else if (data.error) {
                    self.$vux.toast.show({
                      text: data.error,
                      time: self.$util.delay(data.error)
                    })
                  }
                }
              })
            })
          }
          self.showBtnSave = true
        },
        insertProductCallback: function (callback) {
          self.insertProductCallback = callback
          self.showpopup = true
          if (self.productdata.length === 0) {
            self.getProductData()
          }
          self.showBtnSave = true
        },
        clickInsertProduct: function (area, d) {
          area.addEventListener('click', function () {
            if (!self.showBtnArea) {
              console.log('in editor.vue 459')
              // self.$router.push({path: '/product', query: {id: d.id, wid: d.uploader}})
            }
          })
          self.$emit('on-auto-save')
        },
        buildControler: function () {
          self.showBtnSave = false
        },
        cancelControler: function () {
          self.showBtnSave = true
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
      self.searchword = ''
      self.$vux.loading.show()
      self.productdata = []
      self.pagestart1 = 0
      self.getProductData()
    },
    onSubmit () {
      self.$vux.loading.show()
      self.productdata = []
      self.pagestart1 = 0
      self.getProductData()
    },
    selectevent () {
      self.showpopup = true
      if (self.productdata.length === 0) {
        self.getProductData()
      }
    },
    closepopup () {
      this.showpopup = false
    },
    deleteNews () {
      self.showMenuArea = false
      self.$vux.confirm.show({
        title: '确定要删除吗？',
        onConfirm () {
          self.$vux.loading.show()
          self.$http.post(`${ENV.BokaApi}/api/delete/news`, { id: self.query.id }).then(function (res) {
            let data = res.data
            self.$vux.loading.hide()
            self.$vux.toast.show({
              text: data.error,
              type: (data.flag !== 1 ? 'warn' : 'success'),
              time: self.$util.delay(data.error),
              onHide: function () {
                self.$router.go('-1')
              }
            })
          })
        }
      })
    },
    movePoint () {
      let e = event
      let move = { x: 0, y: 0 }
      let _e = e.touches ? e : window.event
      if (!self.$util.isPC()) {
        try {
          let touch = _e.touches[0]
          move.x = Number(touch.pageX)
          move.y = Number(touch.pageY)
        } catch (e) {
          move.x = _e.screenX
          move.y = _e.screenY
        }
      } else {
        move.x = e.screenX
        move.y = e.screenY
      }
      return move
    },
    startEvent () {
      let e = event
      let cur = self.touchElement
      self.isDown = true
      self.x = cur.offsetLeft
      self.y = cur.offsetTop
      let move = self.movePoint(e)
      self.sx = move.x
      self.sy = move.y
      return false // 取消元素事件向下冒泡
    },
    moveEvent () {
      let e = event
      let cur = self.touchElement
      if (self.isDown) {
        let move = self.movePoint(e)
        self.mx = move.x - self.sx // 获取鼠标移动了多少
        self.my = move.y - self.sy // 获取鼠标移动了多少
        let movemunber = 5 // 当触摸的时候移动像素小于这个值的时候代表着不移动
        if (self.mx > movemunber || (0 - self.mx) > movemunber || self.my > movemunber || (0 - self.my) > movemunber) {
          self.isMove = true
        }
        let _top = self.y + self.my
        let maxtop = window.innerHeight - self.menuheight - self.bottompoint * 2
        _top = _top < 0 ? 0 : (_top > maxtop ? maxtop : _top) // 避免小球移除移出去
        if (_top < self.bottompoint * 2) {
          _top = self.bottompoint * 2
        }
        // cur.offsetTop = _top
        jQuery(cur).offset({ top: _top })
        self.mx = move.x
        self.my = move.y
      }
      return false // 取消元素事件向下冒泡
    },
    endEvent () {
      let cur = self.touchElement
      // 添加定时器，是因为有的时候move事件还没运行完就运行了这个事件，为了给这个时间添加一个缓冲时间这里定义了10毫秒
      setTimeout(function () {
        if (self.isMove) { // 如果移动了执行移动方法
          let move = { x: cur.offsetLeft, y: cur.offsetTop }
          let width = window.innerWidth() / 2
          let height = window.innerHeight() / 2
          if (move.x > width) {
            move.x = 2 * width - move.x // 左右边距
          }
          if (move.y > height) {
            move.y = 2 * height - move.y // 上下边距
          }
        } else {
          self.clickMenuHandle()
        }
        self.isDown = false
        self.isMove = false
      }, 10)
      return false // 取消元素事件向下冒泡
    },
    clickProduct (event) {
      let node = event.target
      let linkurl = null
      if (!self.showBtnArea) {
        console.log('in editor clickproduct')
        while (node) {
          if (node.nodeType === 1) {
            let nodeClass = node.getAttribute('class')
            if (nodeClass && nodeClass.indexOf('insertproduct') > -1) {
              linkurl = node.getAttribute('linkurl')
              break
            }
          }
          node = node.parentNode
        }
      }
      if (linkurl) {
        let pquery = self.$route.query
        if (pquery.from === 'miniprogram') {
          const params = self.$util.query(linkurl)
          self.$wechat.miniProgram.redirectTo({url: `${ENV.MiniRouter.product}?id=${params.id}&wid=${params.wid}&module=product`})
        } else {
          self.$router.push({path: linkurl})
        }
      }
    }
  },
  mounted () {
    self = this
    if (editor) {
      editor.destory()
    }
    let start = !self.$util.isPC() ? 'touchstart' : 'mousedown'
    let move = !self.$util.isPC() ? 'touchmove' : 'mousemove'
    let end = !self.$util.isPC() ? 'touchend' : 'mouseup'
    self.touchElement = document.querySelector('.editor-icon')
    self.touchElement.removeEventListener(start, self.startEvent)
    self.touchElement.addEventListener(start, self.startEvent)
    self.touchElement.removeEventListener(move, self.moveEvent)
    self.touchElement.addEventListener(move, self.moveEvent)
    self.touchElement.removeEventListener(end, self.moveEvent)
    self.touchElement.addEventListener(end, self.moveEvent)
    self.editTipCss = 'active'
    setTimeout(function () {
      self.editTipCss = ''
    }, 5000)
    let items = document.querySelectorAll('.insertproduct')
    for (let i = 0; i < items.length; i++) {
      let cur = items[i]
      cur.addEventListener('click', self.clickProduct)
    }
  }
}
</script>

<style lang="less" scoped>
.Eleditor-scrollLocked .editor{display:none;}
.editor .editor-icon{position:absolute;bottom:70px;right:10px;width:60px;height:60px;}
.edit-btn-box {
  position: absolute;
  bottom: 80px;
  right: 0px;
}
.menu-btn-box {
  position: absolute;
  bottom: 0px;
  right: 0px;
}

.edit-btn,.save-btn,.cancel-btn,.menu-btn {
  width: 40px;
  height: 40px;
  padding: 10px;
  border-radius: 50%;
  display: block;
  text-align: center;
  line-height: 40px;
}
.menu-btn {background-color: rgba(0, 0, 0, 0.55);}
.edit-btn{background-color: rgba(248, 100, 0, 1);}
.save-btn {background-color: #1AAD19;}
.cancel-btn{background-color:#ccc;margin-bottom:20px;}
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
.controlmenu{text-align:center;padding:15px;box-sizing: border-box;}
.controlmenu .item{
  text-align:center;
  border:@list-border-color 1px solid;
  border-radius:5px;
  padding:10px;
  display:block;
}
.controlmenu .item:not(:last-child){margin-bottom:10px;}
.outer-eidtor-tip{
  position: absolute;
  right: 0;
  bottom: 167px;
  height: 30px;
  line-height: 30px;
  background-color: rgb(255, 0, 0);
  border-radius: 20px;
  color: #fff;
  width: 240px;
  z-index: 10;
  font-size: 14px;
  text-align: center;
  transform: translateX(100%);
  -webkit-transition:all 1s 0.3s ease;
  transition:all 1s 0.3s ease;
}
.outer-eidtor-tip.active{
  right:73px;
  transform: translateX(0);
}
.Eleditor-wrap.Eleditor-mask{bottom:50px;}
</style>
