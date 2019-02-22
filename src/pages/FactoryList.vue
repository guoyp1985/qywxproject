<template>
  <div class="containerarea bg-page font14 factory-list-page nobottom notop">
    <apply-tip v-if="showApply"></apply-tip>
    <subscribe v-if="loginUser.subscribe != 1 && !loginUser.isretailer"></subscribe>
    <template v-if="showContainer">
      <div class="pagemiddle" ref="scrollContainer" @scroll="handleScroll('scrollContainer', 0)">
        <template v-if="disTabData1">
          <div v-if="!tabData1 || tabData1.length == 0" class="emptyitem flex_center">
            <div>暂无加盟厂家</div>
          </div>
          <div v-else class="scroll_list ">
            <div v-for="(item,index) in tabData1" :key="item.id" class="scroll_item pl10 pr10 border-box mb10 font14 bg-white db list-shadow " style="color:inherit;">
              <div class="t-table bg-white pt10 pb10">
        				<div @click="toDetail(item)" class="t-cell v_middle w70" v-if="item.photo && item.photo != ''">
                  <img class="v_middle imgcover" style="width:60px;height:60px;" :src="$util.getPhoto(item.photo)" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
                </div>
          			<div @click="toDetail(item)" class="t-cell v_middle">
                  <div class="clamp1 font16 pr10 color-lightgray">{{item.title}}</div>
          			</div>
                <div @click="toRecommend(item)" class="t-cell v_middle w100">
                  <div class="btnicon bg-theme color-white font12">推荐好友加盟</div>
                </div>
          		</div>
            </div>
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
  zh-CN: 添加厂家
</i18n>

<script>
import { TransferDom, Popup, Confirm, CheckIcon, XImg, Tab, TabItem, Swiper, SwiperItem } from 'vux'
import ENV from 'env'
import { User } from '#/storage'
import Subscribe from '@/components/Subscribe'
import ApplyTip from '@/components/ApplyTip'

let pageStart1 = 0
let pageStart2 = 0
const limit = 10

export default {
  directives: {
    TransferDom
  },
  components: {
    Popup, Confirm, CheckIcon, XImg, Tab, TabItem, Swiper, SwiperItem, Subscribe, ApplyTip
  },
  data () {
    return {
      showApply: false,
      showContainer: false,
      query: {},
      loginUser: {},
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
    toDetail (item) {
      let params = {id: item.id, wid: this.loginUser.uid}
      if (this.query.from) {
        params.from = this.query.from
      }
      this.$router.push({path: '/factory', query: params})
    },
    toRecommend (item) {
      this.$router.push({path: '/recommendFactory', query: {id: item.id}})
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
            pageStart1 = 0
            this.disTabData1 = false
            this.tabData1 = []
            this.getData1()
          }
          break
        case 1:
          if (this.tabData2.length < limit) {
            pageStart2 = 0
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
    initContainer () {
      this.showApply = false
      this.showContainer = false
    },
    refresh () {
      const self = this
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.$vux.loading.show()
      this.loginUser = User.get()
      if (this.loginUser && (this.loginUser.subscribe === 1 || this.loginUser.isretailer)) {
        if (!this.loginUser.isretailer) {
          this.$vux.loading.hide()
          self.initContainer()
          this.showApply = true
        } else {
          self.initContainer()
          this.showContainer = true
          this.query = this.$route.query
          if (this.tabData1.length < limit) {
            pageStart1 = 0
            this.disTabData1 = false
            this.tabData1 = []
            this.getData1()
          }
        }
      }
    }
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less" scoped>
.factory-list-page{
  .scroll_item{overflow:hidden;position:relative;}
  .btnicon{
    display: inline-block;
    text-align: center;
    border-radius: 30px;
    letter-spacing: 0px;
    height: 25px;
    line-height: 25px;
    padding:0 10px;
  }
}

</style>
