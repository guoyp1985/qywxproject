<template>
  <div class="containerarea columnarea bg-white font14 notop nobottom rproducts">
    <search
      class="v-search bg-white"
      v-model='searchword'
      :auto-fixed="autofixed"
      @on-submit="onSubmit"
      @on-change="onChange"
      @on-cancel="onCancel"
      ref="search">
    </search>
    <div v-show="menuFlag" class="menu-swiper-outer" ref="swiperOuter">
      <swiper class="menu-swiper">
        <swiper-item class="swiper-item"  v-for="(items,index) in classDataArry" :key="index">
          <div :class="`inner flex_center ${selectedIndex == index*colCount+index1 ? 'active' : ''}`" v-for="(tab,index1) in items" :key="index1" @click="onItemClick(index*colCount+index1)">
            <div class="w_100">
              <div class="pic-outer">
                <div class="pic"><img :src="tab.photo"></img></div>
              </div>
              <div class="txt">{{tab.title}}</div>
            </div>
          </div>
        </swiper-item>
      </swiper>
    </div>
    <!-- <tab class="w_100 v-tab">
      <tab-item v-for="(item,index) in classData" :selected="selectedIndex == index" :key="index"  @on-item-click="onItemClick">{{item.title}}</tab-item>
    </tab> -->
    <div class="column-content" style="padding-bottom:10px;box-sizing:border-box;position:relative;">
      <div class="b_top_after pt10 pb10">
        <div class="flex_center">
          <div :class="`flex_cell flex_center b_right_after sort-icon ${sort == 'dateline' ? 'active' : ''}`" @click="sortEvent('dateline')">
            <div class="txt">最新上架<span :class="`al sort ${datecss}`"></span></div>
          </div>
          <div :class="`flex_cell flex_center sort-icon ${sort == 'profit' ? 'active' : ''}`" @click="sortEvent('profit')">
            <div class="txt">利润最高<span :class="`al sort ${pricecss}`"></span></div>
          </div>
        </div>
      </div>
      <div class="b_top_after"></div>
      <div style="overflow-y:auto;position:absolute;left:0;top:0;right:0;bottom:0;top:43px;" ref="scrollContainer" @scroll="handleScroll('scrollContainer')">
        <div v-if="disProductData">
          <div class="productlist squarepic">
            <template v-if="!productData.length">
              <div v-if="!afterSearch" class="emptyitem flex_center align_center w_100">该分类下暂无货源数据</div>
              <div v-else class="emptyitem flex_center align_center w_100">当前分类下没有该商品</div>
            </template>
            <div v-else @click="toFProduct(item)" v-for="(item,index) in productData" :key="index" class="bk-productitem scroll_item font14 db ">
          		<div class="inner list-shadow">
          			<div class="picarea">
          				<div class="pic">
                    <img class="imgcover" :src="$util.getPhoto(item.photo)" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
                    <div class="t-icon color-theme flex_center"><i class="al al-zhuanqian font18"></i><span class="font12">利润空间 {{$t('RMB')}}{{item.newprofit}}</span></div>
                  </div>
          			</div>
          			<div class="desbox" style="overflow:hidden;">
          				<div class="align_left clamp1">{{ item.title }}</div>
                  <div class="clamp1 color-red" style="height:20px;" v-if="item.sellingpoint && item.sellingpoint != ''">{{item.sellingpoint}}</div>
                  <div class="flex_left mt5">
                    <div class="flex_cell flex_left">
                      <div class="w_100 clamp1 color-red">{{ $t('RMB') }} {{ item.price }}</div>
                    </div>
                    <div class="flex_right" style="width:60px;" v-if="loginUser.fid !== item.fid">
                      <span v-if="item.havefpimport == 1" class="bg-theme color-white flex_center padding5 font12" style="border-radius:5px;">已代理</span>
                      <span v-else class="bg-theme color-white flex_center padding5 font12" style="border-radius:5px;" @click.stop="upEvent(item, index)">代理销售</span>
                    </div>
                  </div>
          			</div>
          		</div>
            </div>
          </div>
          <div class="load-end-area loading" v-if="isLoading"></div>
          <div class="load-end-area done" v-else-if="isDone"></div>
        </div>
      </div>
    </div>
    <!-- 新增按钮 -->
    <div class="btn-bottom" @click="closeChat">
      <div class="btn font14">我加盟的厂家</div>
    </div>
    <div class="auto-modal flex_center wechat-modal" v-if="showSubscribe">
      <div class="modal-inner padding20 border-box" style="width:80%;">
        <div class="align_center pt20 pb20 wechat-pic">
          <img :src="WeixinQrcode" style="max-width:300px;" />
        </div>
        <div class="align_center pt10 pb10" v-if="loginUser.subscribe == 1">去公众号进入厂家中心添加商品即可提供货源</div>
        <div class="align_center pt10 pb10" v-else>关注公众号进入厂家中心添加商品即可提供货源</div>
        <div class="close-area flex_center" @click="closeSubscribe">
          <div class="al al-close"></div>
        </div>
      </div>
    </div>
    <div class="flex_center color-white font12 flbtn">
      <div @click="hideMenu">{{flagTxt}}分类</div>
    </div>
    <div v-transfer-dom class="x-popup">
      <popup v-model="showBankPopup" height="100%">
        <div class="popup1">
          <div class="popup-middle font14 bank-pop" style="top:0;">
            <div class="box-area">
              <div class="box-inner">
                <div class="title">交易流程</div>
                <div class="con">
                  <div>商品产生交易后</div>
                  <div>由于订单收入是在代理厂家账户上进行的交易</div>
                  <div>所以在产生交易后</div>
                  <div>代理厂家需将供货商应获得的订单交易额</div>
                  <div>从线下打款到供货商的对公账户内</div>
                  <div>再由供货商对订单进行发货</div>
                  <div>代理厂家可通过订单列表查看订单的状态</div>
                  <div class="mt10">注意: 当订单出现售后情况时，需双方线下沟通协商处理</div>
                </div>
              </div>
            </div>
            <div class="line bg-page pt10"></div>
            <div class="box-area">
              <div class="box-inner">
                <div class="title">收款方信息填写</div>
                <div class="con">
                  <div class="flex_left pt10 pb10">
                    <div class="w80 flex_left">开户银行</div>
                    <div class="flex_cell flex_left">{{clickData && clickData.factoryinfo ? clickData.factoryinfo.newbankname : ''}}</div>
                  </div>
                  <div class="flex_left pt10 pb10">
                    <div class="w80 flex_left">开户名</div>
                    <div class="flex_cell flex_left">{{clickData && clickData.factoryinfo ? clickData.factoryinfo.accountname : ''}}</div>
                  </div>
                  <div class="flex_left pt10 pb10">
                    <div class="w80 flex_left">开户账号</div>
                    <div class="flex_cell flex_left">{{clickData && clickData.factoryinfo ? clickData.factoryinfo.newbankcardno : ''}}</div>
                  </div>
                  <div class="flex_left pt10 pb10">
                    <div class="w80 flex_left">联系人</div>
                    <div class="flex_cell flex_left">{{clickData && clickData.factoryinfo ? clickData.factoryinfo.newbankuser : ''}}</div>
                  </div>
                  <div class="flex_left pt10 pb10">
                    <div class="w80 flex_left">手机号</div>
                    <div class="flex_cell flex_left">{{clickData && clickData.factoryinfo ? clickData.factoryinfo.mobile : ''}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="popup-bottom flex_center">
            <div class="flex_cell h_100 flex_center bg-gray color-white" @click="closeBank">{{ $t('Close') }}</div>
            <div class="flex_cell h_100 flex_center bg-theme color-white" @click="toSale">代理销售</div>
          </div>
        </div>
      </popup>
    </div>
    <div class="auto-modal modalarea1 flex_center store-modal supply" style="position:fixed;" v-if="showSupplyWay">
      <div class="modal-inner">
        <div class="flex_center font16 pt10 pb10">请先选择供货方式</div>
        <div class="flex_left supply_way" @click="toSupplierList">
          <div class="ico down"></div>
          <div class="flex_left pr5">
            <div class="flex_center bg-white" style="height:40px;width:40px;border-radius:50%;">
              <div class="al al-tuoguan color-red font26" style="margin-top:3px;"></div>
            </div>
          </div>
          <div class="flex_cell padding5 flex_left">
            <div class="w_100">
              <div>托管运营</div>
              <div class="font12 color-gray">不具备选货能力，自动托管给供货商进行商品运营</div>
            </div>
          </div>
          <div class="flex_right">
            <div class="al al-mjiantou-copy2 color-gray font20"></div>
          </div>
        </div>
        <div class="flex_left supply_way" @click="radioclick">
          <div class="flex_left pr5">
            <div class="flex_center bg-white" style="height:40px;width:40px;border-radius:50%;">
              <div class="al al-aixin color-red font22" style="margin-top:3px;"></div>
            </div>
          </div>
          <div class="flex_cell padding5 flex_left">
            <div class="w_100">
              <div>自由选货</div>
              <div class="font12 color-gray">具备选货能力，自由选货上架到商城</div>
            </div>
          </div>
          <div class="flex_right" style="width:20px;">
            <div :class="{'checked': freedomChoose}" class="radio-ico"></div>
          </div>
        </div>
        <div v-if="freedomChoose">
          <div class="btn-bottom" @click="closeSupplyWay">
            <div class="btn font14">确定</div>
          </div>
        </div>
        <div class="close-area flex_center" @click="closeSupplyWay">
          <i class="al al-close"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<i18n>
Apply join:
  zh-CN: 申请加入
</i18n>

<script>
import { TransferDom, Popup, Tab, TabItem, Search, Swiper, SwiperItem, CheckIcon } from 'vux'
import { User } from '#/storage'
import ENV from 'env'
import Time from '#/time'

let self = this
const limit = 10
let pageStart = 0

export default {
  directives: {
    TransferDom
  },
  components: {
    Popup, Tab, TabItem, Search, Swiper, SwiperItem, CheckIcon
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      query: {},
      loginUser: {},
      userInfo: {},
      divData: {},
      disProductData: false,
      productData: [],
      classData: [],
      selectedIndex: 0,
      // defaultTab: [{title: '为你推荐', photo: 'https://tossharingsales.boka.cn/minigxk/allclass.png'}, {title: '全部', photo: 'https://tossharingsales.boka.cn/minigxk/allclass.png'}],
      defaultTab: [{title: '全部', photo: 'https://tossharingsales.boka.cn/minigxk/allclass.png'}],
      autofixed: false,
      searchword: '',
      datecss: 'desc',
      pricecss: 'desc',
      sort: 'dateline',
      pageTop: 0,
      tabLeft: 0,
      showTip: false,
      showFirst: false,
      sysParams: {},
      clickData: null,
      clickIndex: 0,
      afterSearch: false,
      showRetailerWechat: false,
      isLoading: false,
      WeixinQrcode: ENV.WeixinQrcode,
      showSubscribe: false,
      colCount: 10,
      classDataArry: [],
      activeColor: '',
      clicked: false,
      isDone: false,
      menuFlag: true,
      flagTxt: '收起',
      times: 0,
      Fid: 0,
      showBankPopup: false,
      factoryInfo: {},
      isIng: false,
      showSupplyWay: true,
      freedomChoose: false
    }
  },
  watch: {
    query: function () {
      return this.query
    }
  },
  methods: {
    toSupplierList () {
      this.$router.push({path: '/supplierList'})
    },
    closeSupplyWay () {
      this.showSupplyWay = false
      this.freedomChoose = false
    },
    radioclick () {
      console.log('=== 进来了点击事件 ===')
      this.freedomChoose = !this.freedomChoose
      console.log(this.freedomChoose)
    },
    hideMenu () {
      this.menuFlag = !this.menuFlag
      this.menuFlag ? this.flagTxt = '收起' : this.flagTxt = '展开'
      // if (this.menuFlag) {
      //   this.flagTxt = '收起'
      // } else {
      //   this.flagTxt = '展开'
      // }
    },
    closeSubscribe () {
      this.showSubscribe = false
    },
    closeChat () {
      let params = this.$util.handleAppParams(this.query, {})
      this.$router.push({path: '/joinFactoryList', query: params})
    },
    initData () {
      this.clickData = null
      this.clickIndex = 0
    },
    closeTip () {
      this.showTip = false
    },
    toApply () {
      this.showTip = false
      if (this.query.from && this.query.fromapp !== 'ddzs') {
        let webquery = encodeURIComponent(`from=${this.query.from}`)
        this.$wechat.miniProgram.redirectTo({url: `/pages/vip?weburl=recommendProducts&webquery=${webquery}`})
      } else {
        let backurl = `/recommendProducts`
        backurl = encodeURIComponent(backurl)
        this.$router.push({path: '/centerSales', query: {backurl: backurl}})
      }
    },
    closeBank () {
      this.showBankPopup = false
    },
    toSale () {
      const self = this
      if (!this.isIng) {
        this.isIng = true
        self.$vux.loading.show()
        self.$http.post(`${ENV.BokaApi}/api/factory/productshelf`, {
          fid: self.loginUser.fid, module: 'factoryproduct', moduleid: self.clickData.moduleid
        }).then(res => {
          this.isIng = false
          let data = res.data
          self.$vux.loading.hide()
          self.$vux.toast.show({
            text: data.error,
            type: data.flag === 1 ? 'success' : 'warn',
            time: self.$util.delay(data.error)
          })
          if (data.flag) {
            this.productData[self.clickIndex].havefpimport = 1
            this.showBankPopup = false
          }
        })
      }
    },
    ajaxImport (item) {
      const self = this
      let params = {id: item.id}
      if (self.query.wid) {
        params.wid = self.query.wid
      }
      self.$vux.loading.show()
      self.$http.post(`${ENV.BokaApi}/api/factory/importFactoryProduct`, params).then((res) => {
        let data = res.data
        self.$vux.loading.hide()
        let error = data.error
        if (data.flag === 1) {
          error = '上架成功！该商品已显示在你的店铺中！'
          this.productData[this.clickIndex].haveimport = 1
        }
        self.$vux.toast.show({
          text: error,
          type: data.flag === 1 ? 'success' : 'warn',
          time: self.$util.delay(error),
          onHide: () => {
          }
        })
      })
    },
    importProduct (item) {
      const self = this
      if (item.haveimport === 0) {
        self.ajaxImport(item)
      } else {
        self.$vux.confirm.show({
          content: '确定将该商品上架到店铺并进行出售吗？',
          onConfirm: () => {
            self.ajaxImport(item)
          }
        })
      }
    },
    upEvent (item, index) {
      this.clickData = item
      this.clickIndex = index
      this.showBankPopup = true
      // const self = this
      // let con = '确定导入商品吗？导入商品会自动加盟厂家'
      // self.$vux.confirm.show({
      //   content: con,
      //   onConfirm: () => {
      //     self.$vux.loading.show()
      //     self.$http.post(`${ENV.BokaApi}/api/factory/productshelf`, {
      //       fid: self.loginUser.fid, module: 'factoryproduct', moduleid: item.moduleid
      //     }).then(res => {
      //       let data = res.data
      //       self.$vux.loading.hide()
      //       self.$vux.toast.show({
      //         text: data.error,
      //         type: data.flag === 1 ? 'success' : 'warn',
      //         time: self.$util.delay(data.error)
      //       })
      //       if (data.flag) {
      //         this.productData[index].shelf = 1
      //       }
      //     })
      //   }
      // })
    },
    onChange (val) {
      this.searchword = val
    },
    onCancel () {
      const self = this
      self.searchword = ''
      self.$vux.loading.show()
      self.disProductData = false
      self.productData = []
      pageStart = 0
      self.getData1()
    },
    onSubmit () {
      const self = this
      self.$vux.loading.show()
      self.disProductData = false
      self.productData = []
      pageStart = 0
      self.getData1()
    },
    sortEvent (type) {
      if (type === 'dateline') {
        if (this.sort === 'dateline') {
          if (this.datecss === 'desc') {
            this.datecss = 'asc'
          } else {
            this.datecss = 'desc'
          }
        } else {
          this.sort = 'dateline'
        }
      } else {
        if (this.sort === 'profit') {
          if (this.pricecss === 'desc') {
            this.pricecss = 'asc'
          } else {
            this.pricecss = 'desc'
          }
        } else {
          this.sort = 'profit'
        }
      }
      this.$vux.loading.show()
      this.disProductData = false
      this.productData = []
      pageStart = 0
      this.getData1('sort')
    },
    toFProduct (item) {
      let params = this.$util.handleAppParams(this.query, {id: item.id})
      if (this.query.id) {
        params.fid = this.query.id
      }
      this.$router.push({path: '/fpimportProduct', query: params})
    },
    handleScroll (refname) {
      let swiperOuter = self.$refs['swiperOuter']
      swiperOuter.style.height = 100 + 'px'
      this.colCount = 5
      let len = this.classData.length
      let col = Math.ceil(len / this.colCount) // 获取swiper-items的数量，向上取整
      if (col > 1) {
        this.showDot = true
      } else {
        this.showDot = false
      }
      if (this.times < 1) {
        this.times += 1
        this.classDataArry = []
      // 拼接成5个一组的对象数组
        for (let i = 0; i < col; i++) { // 循环页数 i:0,1,2
          let arr = []
          for (let j = 0; j < 5; j++) { // 循环每页保存的类目数 j:1-30  每页10个类目
            if (this.classData[j + i * this.colCount] == null) {
              break
            }
            arr.push(this.classData[j + i * this.colCount]) // 第一页存前十个，即 j+0*10，j的取值范围，j<10（0-9） retdata[0-9]
          }
          this.classDataArry.push(arr)
        }
      }
      let scrollArea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollArea,
        callback: function () {
          if (self.productData.length === (pageStart + 1) * limit) {
            pageStart++
            self.$vux.loading.show()
            self.isLoading = true
            self.getData1()
          }
        }
      })
    },
    getData1 (type) {
      console.log(this.loginUser)
      console.log(this.userInfo)
      let params = {pagestart: pageStart, limit: limit, fid: this.Fid}
      if (this.sort === 'dateline') {
        params.orderby = 'dateline'
        params.ascdesc = this.datecss
      } else {
        params.orderby = 'newprofit'
        params.ascdesc = this.pricecss
      }
      if (this.selectedIndex > 0) {
        params.classid = self.classData[self.selectedIndex].id
      }
      if (this.searchword !== '') {
        params.keyword = this.searchword
      }
      self.$http.get(`${ENV.BokaApi}/api/factory/sourceFactoryProduct`, {
        params: params
      }).then((res) => {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        console.log('------------查询前-----------')
        console.log(self.productData)
        self.productData = self.productData.concat(retdata)
        console.log('------------查询后-----------')
        console.log(self.productData)
        self.disProductData = true
        self.isLoading = false
        if (this.searchword !== '') {
          self.afterSearch = true
        } else {
          self.afterSearch = false
        }
        if (retdata.length < limit && this.productData.length && pageStart > 0) {
          this.isDone = true
        } else {
          this.isDone = false
        }
      })
    },
    onItemClick (index, classId) {
      console.log('in onitemclick')
      console.log(index)
      console.log(this)
      this.selectedIndex = index
      this.clickClassId = classId
      // if (index !== self.selectedIndex) {
      this.clicked = true
      this.searchword = ''
      self.selectedIndex = index
      pageStart = 0
      self.$vux.loading.show()
      self.disProductData = false
      self.productData = []
      self.getData1()
      // }
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.query = this.$route.query
      this.loginUser = User.get()
      this.initData()
      if (this.query.fid) {
        this.Fid = this.query.fid
      } else {
        this.Fid = this.loginUser.fid
      }
      if (!self.classData.length) {
        let classParams = {pagestart: 0, limit: 500, ascdesc: 'asc'}
        self.$http.get(`${ENV.BokaApi}/api/list/productclass`, {
          params: classParams
        }).then((res) => {
          self.$vux.loading.hide()
          const data = res.data
          let retdata = data.data ? data.data : data
          retdata = this.defaultTab.concat(retdata)
          self.classData = retdata
          console.log(self.classData)
          let colcount = this.colCount
          let len = retdata.length
          let col = Math.ceil(len / colcount) // 获取swiper-items的数量，向上取整
          if (col > 1) {
            this.showDot = true
          } else {
            this.showDot = false
          }
          // 拼接成十个一组的对象数组
          for (let i = 0; i < col; i++) { // 循环页数 i:0,1,2
            let arr = []
            for (let j = 0; j < 10; j++) { // 循环每页保存的类目数 j:1-30  每页10个类目
              if (retdata[j + i * colcount] == null) {
                break
              }
              arr.push(retdata[j + i * colcount]) // 第一页存前十个，即 j+0*10，j的取值范围，j<10（0-9） retdata[0-9]
            }
            this.classDataArry.push(arr)
          }
          console.log(this.classDataArry)
          // for (var i = 0; i < self.classData.length; i++) {
          //   this.classItem.push = self.classData[i]
          // }
          pageStart = 0
          self.$vux.loading.show()
          self.disProductData = false
          self.productData = []
          self.getData1()
        })
      }
    }
  },
  created () {
    self = this
  },
  activated () {
    this.classData = []
    this.classDataArry = []
    this.$refs.scrollContainer.scrollTop = this.pageTop
    if (document.querySelector('.vux-tab')) {
      document.querySelector('.vux-tab').scrollLeft = this.tabLeft
    }
    this.refresh()
  },
  beforeRouteLeave (to, from, next) {
    this.pageTop = this.$refs.scrollContainer.scrollTop
    if (document.querySelector('.vux-tab')) {
      this.tabLeft = document.querySelector('.vux-tab').scrollLeft
    }
    next()
  }
}
</script>

<style lang="less">
.rproducts{
  .vux-slider > .vux-indicator, .vux-slider .vux-indicator-right {
    position: absolute;
    right: 47%;
    bottom: -3px;
  }
  .al_center{

  }
  .squarepic .desbox{height:85px;}
  .t-icon{
    position:absolute;left:0;top:10px;border-top-right-radius:20px;border-bottom-right-radius:20px;background-color:#fff;padding:5px 10px 5px 5px;font-size:15px;
    box-shadow: 0px 0px 3px 1px #e6ebed;font-weight:bold;
  }
  .v-tab .vux-tab-container .vux-tab-selected{border-bottom-style:solid !important;}
  .scrollable .vux-tab-ink-bar{bottom:0 !important;}
  .sort-icon.active{color:#ff6a61;}
  .sort-icon{
    .txt{
      width:86px;span-align:left;position:relative;
      .al{position:absolute;right:0;top:50%;}
      .sort.desc{margin-top:-25px;}
      .sort.asc{margin-top:-22px;}
    }
    .sort.desc:before {content: "\e7d4";}
    .sort.asc:before {content: "\e7d5";}
  }
  .btn-bottom{
    width:100%;background-color:#fff;padding:10px 0;box-sizing:border-box;
    .btn{width:80%;height:35px;margin:0 auto;color:#fff;background-color:#ff6a61;border-radius:20px;text-align:center;line-height:35px;}
  }
  .wechat-modal{
    .wechat-pic {
      position:relative;
      width:80%;
      margin:0 auto;
      img{width:100%;}
  }
    .modal-bottom {
      width:100%;
      height:45px;
    }
  .txt1{position:absolute;top:26%;left:67%;}
  .txt2{position:absolute;bottom:6.6%;left:6%;}
  }
  // .flex_center.active{
  //   color: #ff6a61;
  // }
  .flbtn{height:50px;width:50px;border-radius:50px;background-color:#ff6a61;position:fixed;top:308px;right:12px;opacity:0.8}
}
.bank-pop{
  .box-area{
    padding:10px;box-sizing:border-box;
    .box-inner{
      padding-left:10px;padding-bottom:10px;box-sizing:border-box;position:relative;
      .title:before{
        content:'';width:6px;height:6px;border-radius:50%;background-color:#ff6a61;
        position:absolute;left:-10px;top:50%;margin-top:-3px;
      }
      .title{color:#ff6a61;font-size:18px;font-weight:bold;position:relative;}
    }
  }
}
.supply{
  .modal-inner{padding:15px;}
  .supply_way{
    background-color: #FFE9E7;border-radius: 5px;box-sizing: border-box;margin-top: 10px;position: relative;overflow:hidden;
    padding:10px;box-sizing: border-box;
  }
  .weui-icon-circle{font-size: 18px;}
  .x-check-icon.vux-check-icon > span{padding-right: 0;padding-left: 0;}
  .weui-icon-success{font-size: 16px;}
  .down.ico{
    display:block;
    position:absolute;right:-6px;top:-2px;width:96px;height:20px;line-height:20px;
    background-color:#F25242;color:#fff;text-align:center;font-size: 12px;
    -webkit-transform: translate(30px,5px) rotate(45deg);
    transform: translate(30px,5px) rotate(45deg);
  }
  .down.ico:after{content:"推荐";}
  .radio-ico{
    width:16px;height:16px;border:#ff6a61 1px solid;border-radius:50%;box-sizing:border-box;background-color:#fff;
    display:flex;justify-content:center;align-items:center;
  }
  .radio-ico.checked:after{
    content:"";width:6px;height:6px;background-color:#ff6a61;border-radius:50%;
  }
}
</style>
