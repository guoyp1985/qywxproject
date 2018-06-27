<template>
  <div class="containerarea bg-page font14 rproductlist nobottom notop">
    <apply-tip v-if="showSos"></apply-tip>
    <template v-if="showContainer">
      <div class="pagemiddle" ref="scrollContainer" @scroll="handleScroll('scrollContainer', 0)">
        <template v-if="disTabData1">
          <div v-if="!tabData1 || tabData1.length == 0" class="emptyitem flex_center">
            <div>暂无加盟厂商</div>
          </div>
          <div v-else class="scroll_list ">
            <router-link v-for="(item,index) in tabData1" :key="item.id" :to="{path:'/factory',query:{id:item.id, wid: loginUser.uid}}" class="scroll_item pl10 pr10 border-box mb10 font14 bg-white db list-shadow " style="color:inherit;">
              <div v-if="item.moderate == 0" class="icon down"></div>
          		<div class="t-table bg-white pt10 pb10">
        				<div class="t-cell v_middle w70" v-if="item.photo && item.photo != ''">
                  <img class="v_middle imgcover" style="width:60px;height:60px;" :src="$util.getPhoto(item.photo)" onerror="javascript:this.src='http://vuxlaravel.boka.cn/images/nopic.jpg';" />
                </div>
          			<div class="t-cell v_middle">
                  <div class="clamp1 font16 pr10 color-lightgray">{{item.title}}</div>
                  <div class="clamp1 color-999">当前等级: {{ item.levelname }}</span></div>
          			</div>
          		</div>
            </router-link>
          </div>
        </template>
      </div>
      <div v-transfer-dom>
        <popup class="menuwrap" v-model="showPopup1">
          <div class="popup0">
            <div class="list" v-if="clickData">
              <div class="item">
                <div class="inner" @click="clickPopup('push')">设置管理员</div>
              </div>
              <div class="item">
                <div class="inner" @click="clickPopup('set')">设置</div>
              </div>
              <div class="item">
                <div class="inner" @click="clickPopup('edit')">编辑</div>
              </div>
              <div class="item">
                <div class="inner" @click="clickPopup('retailer')">卖家</div>
              </div>
              <div class="item close mt10" @click="clickPopup('row.key')">
                <div class="inner">{{ $t('Cancel txt') }}</div>
              </div>
            </div>
          </div>
        </popup>
      </div>
    </template>
  </div>
</template>

<i18n>
Add factory:
  zh-CN: 添加厂商
</i18n>

<script>
import { TransferDom, Popup, Confirm, CheckIcon, XImg, Tab, TabItem, Swiper, SwiperItem } from 'vux'
import ENV from 'env'
import { User } from '#/storage'

let pageStart1 = 0
let pageStart2 = 0
const limit = 10

export default {
  directives: {
    TransferDom
  },
  components: {
    Popup, Confirm, CheckIcon, XImg, Tab, TabItem, Swiper, SwiperItem
  },
  data () {
    return {
      loginUser: {},
      query: {},
      showSos: false,
      showContainer: false,
      tabtxts: [ '已分销', '未分销' ],
      selectedIndex: 0,
      tabData1: [],
      tabData2: [],
      disTabData1: false,
      disTabData2: false,
      showPopup1: false,
      clickData: {},
      clickIndex: 0
    }
  },
  methods: {
    getPhoto (src) {
      return this.$util.getPhoto(src)
    },
    handleScroll: function (refname, index) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          if (index === 0) {
            if (self.tabData1.length === (pageStart1 + 1) * limit) {
              pageStart1++
              self.$vux.loading.show()
              self.getData1()
            }
          } else if (index === 1) {
            if (self.tabData2.length === (pageStart2 + 1) * limit) {
              pageStart2++
              self.$vux.loading.show()
              self.getData2()
            }
          }
        }
      })
    },
    swiperChange (index) {
      if (index !== undefined) {
        this.selectedIndex = index
      }
      switch (this.selectedIndex) {
        case 0:
          if (this.tabData1.length < limit) {
            this.disTabData1 = false
            this.tabData1 = []
            this.getData1()
          }
          break
        case 1:
          if (this.tabData2.length < limit) {
            this.disTabData2 = false
            this.tabData2 = []
            this.getData2()
          }
          break
      }
    },
    getData1 () {
      const self = this
      const params = { pagestart: pageStart1, limit: limit }
      this.$http.post(`${ENV.BokaApi}/api/retailer/factoryList`, params)
      .then(res => {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        self.tabData1 = self.tabData1.concat(retdata)
        self.disTabData1 = true
      })
    },
    getData2 () {
      const self = this
      const params = { params: { pagestart: pageStart2, limit: limit } }
      this.$http.get(`${ENV.BokaApi}/api/factory/list`, params)
      .then(res => {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        self.tabData2 = self.tabData2.concat(retdata)
        self.disTabData2 = true
      })
    },
    init () {
      this.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, {
        module: 'retailer', action: 'factorylist'
      })
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.loginUser = User.get()
      if (!this.loginUser.isretailer) {
        this.$vux.loading.hide()
        this.showSos = true
        this.showContainer = false
      } else {
        this.showSos = false
        this.showContainer = true
        this.query = this.$route.query
        if (this.tabData1.length < limit) {
          this.disTabData1 = false
          this.tabData1 = []
          this.getData1()
        }
      }
    }
  },
  created () {
    this.init()
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less" scoped>
.rproductlist .scroll_item{overflow:hidden;position:relative;}
.rproductlist .scroll_item .icon{display:none;}
.rproductlist .scroll_item .down.icon{
  display:block;
  position:absolute;right:0;top:0;width:96px;height:25px;line-height:25px;
  background-color:#8a8a8a;color:#fff;text-align:center;font-size: 12px;
  -webkit-transform: translate(30px,5px) rotate(45deg);
  transform: translate(30px,5px) rotate(45deg);
}
.rproductlist .scroll_item .down.icon:after{content:"已下架";}
.rproductlist .btnicon{
  display: inline-block;
  color: #ea3a3a;
  border: 1px solid #ea3a3a;
  text-align: center;
  border-radius: 30px;
  letter-spacing: 0px;
  height: 21px;
  width: 41px;
  line-height: 21px;
}
.rproductlist .l-line{
  width:100%;
  height:8px;
  background:#fff;
}
.rproductlist .s-container{bottom:50px;}
.rproductlist .s-bottom{height: 50px;}
.rproductlist .addproduct{border-radius: 50px;height: 36px;width: 100%;}
.rproductlist .pro_list_top{
  background: url(../assets/images/product_list_top.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-size: 100%;
  height: 20px;
}

</style>
