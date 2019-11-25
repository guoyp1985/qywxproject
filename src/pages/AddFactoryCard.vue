<template>
  <div id="addfactory-card-page" class="containerarea bg-page font14 addFactoryCard">
    <div class="s-container">
      <form class="addForm">
        <div style="margin: 10px 10px 0px 10px;background-color: white;border-radius:5px">
          <div class="form-item required">
            <div class="t-table">
              <div class="t-cell title-cell font14 v_middle w100">
                <span>{{ $t('Starttime') }}</span><span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span>
              </div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <group class="x-datetime">
                  <datetime format="YYYY-MM-DD HH:mm" v-model='submitdata.starttime' :show.sync="visibility1" @on-change="datechange1" @on-cancel="datecancel1" @on-confirm="dateconfirm1"></datetime>
                </group>
                <div @click="showxdate1" class='font14 color-gray align_left' style="position:absolute;left:0;right:0;top:0;height:22px;background-color:transparent;z-index:10;">{{ selectdatetxt1 }}</div>
              </div>
            </div>
          </div>
          <div class="form-item required">
            <div class="t-table">
              <div class="t-cell title-cell font14 v_middle w100">
                <span>{{ $t('Endtime') }}</span><span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span>
              </div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <group class="x-datetime">
                  <datetime format="YYYY-MM-DD HH:mm" v-model='submitdata.endtime' :show.sync="visibility2" @on-change="datechange2" @on-cancel="datecancel2" @on-confirm="dateconfirm2"></datetime>
                </group>
                <div @click="showxdate2" class='font14 color-gray align_left' style="position:absolute;left:0;right:0;top:0;height:22px;background-color:transparent;z-index:10;">{{ selectdatetxt2 }}</div>
              </div>
            </div>
          </div>
        </div>
        <div style="margin: 10px 10px 10px 10px;background-color: white;border-radius:5px">
          <div class="form-item padding10 required">
            <div class="t-table">
              <div class="t-cell title-cell font14 v_middle w100">
                <span>优惠券类型</span><span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span>
              </div>
              <div class="t-cell input-cell v_middle db-flex" style="position:relative;">
                <check-icon class="red-check" :value.sync="template1" @click.native.stop="clickTemplate(1)">活动优惠券</check-icon>
                <check-icon class="red-check" :value.sync="template2" @click.native.stop="clickTemplate(2)">直播优惠券</check-icon>
              </div>
            </div>
          </div>
          <div class="form-item padding10 required">
            <div class="t-table">
              <div class="t-cell title-cell font14 v_middle w100">
                <span>优惠券数量</span><span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span>
              </div>
              <div class="t-cell input-cell v_middle db-flex" style="position:relative;">
                <x-input class="flex_cell" v-model='submitdata.totalcount' type="number" placeholder="请输入发放的优惠券数量" ></x-input>
                <div class="flex_right w30">张</div>
              </div>
            </div>
          </div>
          <div class="padding10 required">
            <div class="t-table">
              <div class="t-cell title-cell font14 v_middle w100">
                <span>可领取数量</span>
              </div>
              <div class="t-cell input-cell v_middle db-flex" style="position:relative;">
                <x-input class="flex_cell" v-model='submitdata.klqcount' type="number" placeholder="请输入每位用户可领取数量" ></x-input>
                <div class="flex_right w30">张</div>
              </div>
            </div>
          </div>
        </div>
        <div style="margin: 0px 10px 0px 10px;background-color: white;border-radius:5px">
          <div class="form-item required">
            <div class="t-table">
              <div class="t-cell title-cell font14 v_middle w100">
                <span>优惠券金额</span><span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span>
              </div>
            </div>
          </div>
          <div class="padding10 required db-flex">
            <div class="flex_cell flex_left">
              <span class="pr10">满</span>
              <x-input class="border-input flex_cell" v-model='submitdata.ordermoney' name="ordermoney" type="text" size="10" maxlength="6"></x-input>
              <span class="pl10 pr10">元</span>
            </div>
            <div class="flex_cell flex_left">
              <span class="pl19 pl10 pr10">减</span>
              <x-input class="border-input flex_cell" v-model='submitdata.facemoney' name="facemoney" type="text" size="10" maxlength="6"></x-input>
              <span class="pl10">元</span>
            </div>
          </div>
        </div>
        <div style="margin: 10px 10px 10px 10px;background-color: white;border-radius:5px">
          <!-- <div class="form-item required">
            <div class="t-table">
              <div class="t-cell title-cell font14 v_middle w100">
                <span>选择商品</span><span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span>
              </div>
              <check-icon class="red-check" :value.sync="singlePro" @click.stop="setType(1)">单件商品</check-icon>
              <check-icon class="red-check" :value.sync="allPro" @click.stop="setType(0)">所有商品</check-icon>
            </div>
          </div> -->
          <div class="form-item required">
            <div class="t-table">
              <div class="t-cell title-cell font14 v_middle w100">
                <span>指定商品</span><span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span>
              </div>
            </div>
          </div>
          <div class="padding10 required">
            <template v-if="selectedProduct">
              <div class="border db">
                <div class="t-table">
                  <div class="t-cell v_middle" style="width:50px;">
                    <img class="v_middle imgcover" style="width:40px;height:40px;" :src="selectedProduct.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
                  </div>
                  <div class="t-cell v_middle">
                    <div class="clamp1">{{selectedProduct.title}}</div>
                    <div class="mt5 font12 clamp1"><span class="color-orange">{{ $t('RMB') }}{{selectedProduct.price}}</span><span class="ml10 color-gray">{{ $t('Storage') }}{{selectedProduct.storage}}</span></div>
                  </div>
                  <div class="t-cell align_center v_middle" style="width:60px;" v-if="!query.id">
                    <div class="qbtn color-red btnchange" style="border:#ff3b30 1px solid;line-height:1;" @click="selectevent">修改</div>
                  </div>
                </div>
              </div>
            </template>
            <div v-else class="flex_center w_100">
              <div class="qbtn flex_center color-orange mt10" style="border:orange 1px solid;width:90%;line-height:1;padding:4px 0;" @click="selectevent">
                <span class="mr5 v_middle db-in" style="margin-top:-3px;">+</span><span class="v_middle db-in">{{ $t('Select product') }}</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="s-bottom border-box flex_center color-white list-shadow02" style="background-color:#ea3a3a;">
      <div class="flex_cell flex_center color-white" @click="saveevent">保存</div>
    </div>
    <!-- 点击单个商品弹出全部厂家商品列表区域 -->
    <div v-transfer-dom class="x-popup">
      <popup v-model="showProductList" height="100%">
        <div class="popup1">
          <div class="popup-top flex_center">选择商品</div>
          <div ref="scrollProduct" @scroll="handleScroll('scrollProduct')" class="popup-middle">
            <search
              class="x-search"
              v-model="searchword"
              :auto-fixed="autofixed"
              @on-submit="onSubmit"
              @on-change="onChange"
              @on-cancel="onCancel"
              ref="search">
            </search>
            <div class="scroll_list" v-if="disProductData">
              <div v-if="!productList || !productList.length" class="scroll_item padding10 color-gray align_center">
                <template v-if="searchresult">
                  <div class="flex_center" style="height:80px;">暂无搜索结果</div>
                </template>
                <template v-else>
                  <div class="flex_center" style="height:80px;">暂无商品</div>
                </template>
              </div>
              <check-icon class="x-check-icon scroll_item" v-for="(item,index) in productList" :key="item.id" :value.sync="item.checked" @click.native.stop="radioclick(item,index)">
                <div class="t-table">
                  <div class="t-cell pic v_middle w50">
                    <img class="v_middle imgcover" :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" style="width:40px;height:40px;" />
                  </div>
                  <div class="t-cell v_middle" style="color:inherit;">
                    <div class="clamp1">{{item.title}}</div>
                    <div class="font12 clamp1"><span class="color-orange">¥{{ item.price }}</span><span class="ml10 color-gray">{{ $t('Storage') }} {{ item.storage }}</span></div>
                    <div class="font12 clamp1 color-orange" v-if="item.allowcard">允许使用优惠券</div>
                    <template v-else-if="item.salesrebate">
                      <div class="font12 clamp1 color-orange">销售佣金: ¥{{ item.salesrebate }}</div>
                    </template>
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
<i18n>
  Starttime:
    zh-CN: 开始时间
  Endtime:
    zh-CN: 结束时间
  Confirm txt:
    zh-CN: 提交
</i18n>
<script>
import { Group, Datetime, CheckIcon, TransferDom, Search, Popup, XInput } from 'vux'
import { User } from '#/storage'
import ENV from 'env'
import Time from '#/time'
export default {
  directives: {
    TransferDom
  },
  components: { Group, Datetime, CheckIcon, Search, Popup, XInput },
  data () {
    return {
      submitdata: {
        endtime: '',
        starttime: '',
        facemoney: '',
        totalcount: '',
        ordermoney: '',
        fpid: ''
      },
      query: {},
      visibility1: false,
      visibility2: false,
      selectdatetxt1: '选择开始时间',
      selectdatetxt2: '选择结束时间',
      pagestart1: 0,
      limit: 20,
      singlePro: false,
      allPro: false,
      autofixed: false,
      showProductList: false,
      showproductitem: false,
      productList: [],
      searchword: '',
      searchresult: false,
      disProductData: false,
      selectpopupdata: null,
      selectproduct: [],
      selectProductData: [],
      selectProductIndex: -1,
      dataGetting: false,
      loginUser: {},
      Fid: 0,
      submitIng: false,
      checkedProduct: null,
      selectedProduct: null,
      template1: false,
      template2: false
    }
  },
  watch: {
    singlePro: function (newval, oldval) {
      if (newval) {
        this.allPro = false
        this.selectevent()
      } else {
        this.allPro = true
      }
    },
    allPro: function (newval, oldval) {
      if (newval) {
        this.singlePro = false
        this.showproductitem = false
        this.selectProductData = []
      } else {
        this.singlePro = true
        this.selectevent()
      }
    }
  },
  methods: {
    initData () {
      this.submitdata = {
        endtime: '',
        starttime: '',
        facemoney: '',
        totalcount: '',
        ordermoney: '',
        fpid: ''
      }
      this.visibility1 = false
      this.visibility2 = false
      this.selectdatetxt1 = '选择开始时间'
      this.selectdatetxt2 = '选择结束时间'
      this.showProductList = false
      this.showproductitem = false
      this.selectpopupdata = null
      this.selectProductData = []
      this.submitIng = false
      this.checkedProduct = null
      this.selectedProduct = null
    },
    showxdate1 () {
      this.visibility1 = true
    },
    showxdate2 () {
      this.visibility2 = true
    },
    datechange1 (val) {
    },
    datechange2 (val) {
    },
    datecancel1 () {
      this.submitdata.starttime = ''
      this.selectdatetxt1 = '选择开始时间'
    },
    datecancel2 () {
      this.submitdata.endtime = ''
      this.selectdatetxt2 = '选择结束时间'
    },
    dateconfirm1 () {
      this.selectdatetxt1 = ''
    },
    dateconfirm2 () {
      this.selectdatetxt2 = ''
    },
    setType (val) {
      // 1: 单个商品  0：所有商品
      if (val === 1) {
        this.singlePro = !this.singlePro
        this.allPro = false
      } else if (val === 0) {
        this.allPro = !this.allPro
        this.singlePro = false
      }
    },
    selectevent () {
      const self = this
      self.showProductList = true
      if (self.productList.length === 0) {
        this.singlePro = true
        self.getProductData()
      }
      // 当点击修改的时候
      // console.log('----当前点击的对象----')
      // console.log(self.selectpopupdata)
    },
    clickTemplate (val) {
      let curval = parseInt(val)
      if (curval === 1) {
        this.template1 = true
        this.template2 = false
        // this.submitData.shopmodel = 1
      } else if (curval === 2) {
        this.template1 = false
        this.template2 = true
        // this.submitData.shopmodel = 2
      }
    },
    onSubmit () {
      const self = this
      self.$vux.loading.show()
      self.productList = []
      self.pagestart1 = 0
      self.getProductData()
    },
    onChange (val) {
      this.searchword = val
    },
    onCancel () {
      const self = this
      self.searchword = ''
      self.$vux.loading.show()
      self.productList = []
      self.pagestart1 = 0
      self.getProductData()
    },
    handleScroll (refname) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      this.$util.scrollEvent({
        element: scrollarea,
        callback: () => {
          if (self.productList.length === (self.pagestart1 + 1) * self.limit) {
            self.pagestart1++
            self.$vux.loading.show()
            self.getProductData()
          }
        }
      })
    },
    getProductData () {
      // 获取厂家商品数据
      const self = this
      let params = {fid: this.loginUser.fid, pagestart: self.pagestart1, limit: self.limit}
      let ajaxurl = `${ENV.BokaApi}/api/list/factoryproduct`
      let keyword = self.searchword
      if (typeof keyword !== 'undefined' && self.$util.trim(keyword) !== '') {
        params.keyword = keyword
      }
      if (self.dataGetting) return false
      self.dataGetting = true
      self.$http.get(ajaxurl, {
        params: params
      }).then((res) => {
        let data = res.data
        self.$vux.loading.hide()
        if (typeof keyword !== 'undefined' && self.$util.trim(keyword) !== '') {
          self.searchresult = true
        } else {
          self.searchresult = false
        }
        let retdata = data.data ? data.data : data
        self.productList = self.productList.concat(retdata)
        this.disProductData = true
        this.dataGetting = false
      })
    },
    getCardInfoById () {
      this.selectdatetxt1 = ''
      this.selectdatetxt2 = ''
      this.$http.post(`${ENV.BokaApi}/api/miniactivity/info`, {
        id: this.query.id
      }).then(res => {
        const data = res.data
        if (data.flag) {
          this.viewData = data.data
          for (let key in this.submitdata) {
            if (key === 'starttime' || key === 'endtime') {
              this.submitdata[key] = new Time(this.viewData[key] * 1000).dateFormat('yyyy-MM-dd hh:mm')
            } else {
              this.submitdata[key] = this.viewData[key]
            }
          }
          // this.submitdata['totalcount'] = parseInt(this.viewData['totalcount']) - parseInt(this.viewData['budget']) // 编辑时计算剩余数量
          console.log(this.submitdata)
          return this.$http.get(`${ENV.BokaApi}/api/moduleInfo`, {
            params: {id: this.viewData.fpid, module: 'factoryproduct'}
          })
        }
      }).then(res => {
        if (res) {
          const data = res.data
          if (data.flag) {
            const retdata = data.data
            retdata.photo = retdata.photo.split(',')[0]
            this.selectedProduct = retdata
          }
        }
      })
    },
    _radioclick (data, index) {
      const self = this
      if (data.checked) {
        self.selectpopupdata = data
        self.selectProductIndex = index
      } else {
        self.selectpopupdata = null
        self.selectProductIndex = -1
      }
      for (let d of self.productList) {
        if (d.id !== data.id && d.checked) {
          delete d.checked
          break
        }
      }
    },
    radioclick (data, index) {
      if (data.checked) {
        this.checkedProduct = data
      } else {
        this.checkedProduct = null
      }
      for (let d of this.productList) {
        if (d.id !== data.id && d.checked) {
          delete d.checked
          break
        }
      }
    },
    _closepopup () {
      this.selectpopupdata = null
      this.showProductList = false
    },
    closepopup () {
      this.showProductList = false
      this.checkedProduct = null
      for (let d of this.productList) {
        if (d.checked) {
          delete d.checked
          break
        }
      }
    },
    afterSelectProduct () {
      const self = this
      self.selectproduct = self.selectpopupdata
      // if (self.selectProductData) {  // 此处循环判断选中的商品是否已经存在 一张优惠券对应多个商品
      //   for (var i = 0; i < self.selectProductData.length; i++) {
      //     if (self.selectproduct === self.selectProductData[i]) {
      //       self.selectProductData.splice(i, 1)
      //     }
      //   }
      //   self.selectProductData.push(self.selectproduct)
      // } else {
      self.selectProductData[0] = self.selectproduct
      // }
      console.log('------已选择的商品------')
      console.log(self.selectProductData)
      self.submitdata.fpid = self.selectproduct.id
      self.showProductList = false
      self.showproductitem = true
    },
    confirmpopup () {
      let curProduct = this.checkedProduct
      if (!curProduct || !curProduct.id) {
        this.$vux.toast.text('请选择商品', 'middle')
        return false
      } else if (curProduct.storage <= 0) {
        this.$vux.toast.text('该商品库存为0，请补充库存', 'middle')
        return false
      }
      if (curProduct.activityid) {
        this.$vux.confirm.show({
          content: '该商品正在参与活动，继续选择该商品将会导致两种优惠叠加使用',
          confirmText: '继续创建',
          cancelText: '取消',
          onCancel: () => {
            this.closepopup()
          },
          onConfirm: () => {
            this.selectedProduct = curProduct
            this.closepopup()
          }
        })
      } else {
        this.selectedProduct = curProduct
        this.closepopup()
      }
    },
    saveevent () {
      const self = this
      if (this.submitIng) return false
      let facemoney = self.submitdata.facemoney
      let ordermoney = self.submitdata.ordermoney
      if (!self.selectedProduct) {
        self.$vux.toast.text('请选择至少一个商品', 'middle')
        return false
      }
      if (!self.submitdata.starttime || self.submitdata.starttime === '') {
        self.$vux.toast.text('请选择开始时间', 'middle')
        return false
      }
      if (!self.submitdata.endtime || self.submitdata.endtime === '') {
        self.$vux.toast.text('请选择结束时间', 'middle')
        return false
      }
      let starttime = new Date(self.submitdata.starttime.replace(/-/g, '/')).getTime()
      let endtime = new Date(self.submitdata.endtime.replace(/-/g, '/')).getTime()
      let nowtime = new Date().getTime()
      console.log('starttime', starttime)
      console.log('endtime', endtime)
      console.log('nowtime', nowtime)
      if (endtime <= starttime) {
        self.$vux.toast.text('结束时间应大于开始时间', 'middle')
        return false
      }
      if (endtime <= nowtime) {
        self.$vux.toast.text('结束时间应大于当前时间', 'middle')
        return false
      }
      if (self.submitdata.totalcount <= 0 || !self.submitdata.totalcount) {
        self.$vux.toast.text('请输入正确的优惠券数量', 'middle')
        return false
      }
      if (isNaN(facemoney) || isNaN(ordermoney) || !facemoney || parseFloat(facemoney.replace(/,/g, '')) < 0 || !ordermoney || parseFloat(ordermoney.replace(/,/g, '')) < 0) {
        self.$vux.toast.text('请填写正确的满减金额', 'middle')
        return false
      }
      // if (this.selectpopupdata.price <= this.submitdata.ordermoney) {
      //   console.log('当前选中商品金额')
      //   console.log(this.selectpopupdata.price)
      //   console.log('所设置的满减金额')
      //   console.log(this.submitdata.ordermoney)
      //   self.$vux.toast.text('该商品价格低于满减金额，请重新选择', 'middle')
      //   return false
      // }
      // 无论是创建优惠券 还是修改优惠券 统一传对象
      console.log('------submitdata------')
      console.log(self.submitdata)
      if (this.query.id) {
        self.submitdata.id = this.query.id
      }
      this.submitdata.fpid = this.selectedProduct.id
      this.submitIng = true
      this.$vux.loading.show()
      self.$http.post(`${ENV.BokaApi}/api/miniactivity/add`, {
        ...self.submitdata, type: 'factorycard', fid: this.Fid
      }).then(res => {
        let data = res.data
        self.$vux.loading.hide()
        self.$vux.toast.show({
          text: data.error,
          type: data.flag !== 1 ? 'warn' : 'success',
          time: self.$util.delay(data.error),
          onHide: () => {
            self.submitIng = false
            if (data.flag === 1) {
              let rparams = self.$util.handleAppParams(self.query, {fid: this.Fid, refresh: 1})
              self.$router.push({path: '/factoryCardList', query: rparams})
            }
          }
        })
      })
    }
  },
  created () {
  },
  activated () {
    this.initData()
    this.loginUser = User.get()
    this.Fid = this.loginUser.fid
    this.query = this.$route.query
    if (this.query.fid) {
      this.Fid = this.query.fid
    }
    if (this.query.id) {
      this.getCardInfoById()
    }
  }
}
</script>
<style lang="less">
.addFactoryCard{
  .s-container{top:0;}
  .weui-cell{padding:5px !important;}
}
.bg-page{background-color:  #f2f2f2 !important}
.border-input{border:#ccc 1px solid;}
.x-datetime *{touch-action: pan-y;}
</style>
