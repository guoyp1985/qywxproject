<template>
  <div class="containerarea font14 rgoodeazy bg-white">
    <div class="s-container s-container1" style="top:0;">
      <div class="pl10 pr10">
        <div class="font15 pt15">文章链接采集文章</div>
        <div class="font12 color-gray mt5">请从微信公众号中复制文章链接，粘贴在文本框内，点击“采集”按钮，采集成功后即可编辑分享</div>
        <form class="subform mb15">
          <div class="flex_left mt12 border1px">
            <div class="flex_cell" style="height:100%;">
              <group class="textarea-outer">
                <x-textarea
                  ref="urlTextarea"
                  v-model="collecturl"
                  class="x-textarea noborder"
                  name="url"
                  :placeholder="$t('Url paster here')"
                  :show-counter="false"
                  :rows="1"
                  @on-change="textareaChange('urlTextarea')"
                  @on-focus="textareaFocus('urlTextarea')"
                  autosize>
                </x-textarea>
              </group>
            </div>
            <div class="align_center bg-red color-white font15 w80" style="height:45px;line-height:45px;border-radius:5px;" @click="collect1">{{ $t('Collect') }}</div>
          </div>
        </form>
      </div>
      <div class="padding10 flex_center">
        <img src="../assets/images/news_example.png" style="max-width:80%;" />
      </div>
    </div>
    <template v-if="showFirst">
      <firstTip @submitFirstTip="submitFirstTip">
        <div class="font15 bold txt">
          <div class="flex_center">{{sysParams.advance_grabnews}}</div>
        </div>
      </firstTip>
    </template>
    <template v-if="showHb">
      <firstHb action="grabnews" @closeFirstHb="closeFirstHb"></firstHb>
    </template>
  </div>
</template>

<i18n>
</i18n>

<script>
import { Tab, TabItem, Swiper, SwiperItem, Search, XTextarea, Group, Checker, CheckerItem, XImg } from 'vux'
import Time from '#/time'
import ENV from 'env'
import { User, SystemParams } from '#/storage'
import Sos from '@/components/Sos'
import Subscribe from '@/components/Subscribe'
import FirstTip from '@/components/FirstTip'
import FirstHb from '@/components/FirstHb'

export default {
  components: {
    Tab, TabItem, Swiper, SwiperItem, Search, XTextarea, Group, Checker, CheckerItem, XImg, Sos, Subscribe, FirstTip, FirstHb
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      showApply: false,
      showContainer: false,
      query: {},
      loginUser: {},
      retailerInfo: {},
      autofixed: false,
      tabtxts: [ '关键词', '链接' ],
      selectedIndex: 0,
      newsdata: [],
      searchdata: [],
      searchword: '',
      showSearchEmpty: false,
      collecturl: '',
      limit: 10,
      pagestart: 0,
      keywordsData: [],
      keyword: '',
      disNewslist: false,
      pagestart1: 0,
      limit1: 10,
      clickSearchword: '',
      historyLimit: 15,
      newsCount: 0,
      isFirst: false,
      showFirst: false,
      showHb: false,
      routerParams: {},
      sysParams: {}
    }
  },
  methods: {
    initData () {
      this.isFirst = false
      this.showFirst = false
      this.showHb = false
      this.routerParams = {}
    },
    submitFirstTip () {
      this.showFirst = false
    },
    closeFirstHb () {
      this.isFirst = false
      this.showHb = false
      this.afterCollect1()
    },
    delKey (e) {
      console.log(e)
      console.log('删除标签')
    },
    textareaChange (refname) {
      let curArea = this.$refs[refname][0] ? this.$refs[refname][0] : this.$refs[refname]
      curArea.updateAutosize()
    },
    textareaFocus (refname) {
      let curArea = this.$refs[refname][0] ? this.$refs[refname][0] : this.$refs[refname]
      curArea.updateAutosize()
    },
    getnewsdata () {
      this.$vux.loading.show()
      const self = this
      if (self.loginUser.isretailer === 2) {
        self.limit = 5
      } else if (self.loginUser.isretailer === 1) {
        self.limit = 10
      }
      const params = { do: 'list', pagestart: self.pagestart, limit: self.limit }
      this.$http.post(`${ENV.BokaApi}/api/news/goodeazy`, params)
      .then(res => {
        const data = res.data
        const retdata = data.data ? data.data : data
        self.$vux.loading.hide()
        self.newsdata = self.newsdata.concat(retdata)
        self.disNewslist = true
      })
    },
    getHistoryData () {
      this.$vux.loading.show()
      const self = this
      const params = { do: 'history', pagestart: 0, limit: self.historyLimit }
      this.$http.post(`${ENV.BokaApi}/api/news/goodeazy`, params)
      .then(res => {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        for (let i = 0; i < retdata.length; i++) {
          self.keywordsData.push({title: retdata[i], checked: false})
        }
      })
    },
    onChange (val) {
      this.searchword = val
    },
    onCancel () {
      const self = this
      self.searchword = ''
      self.searchdata = []
    },
    onSubmit () {
      const self = this
      let kw = self.searchword
      if (!kw || self.$util.trim(kw) === '') {
        self.$vux.toast.text('请输入搜索内容', 'middle')
        return false
      }
      if (self.$util.trim(kw) !== '') {
        self.$refs.search[0].setBlur()
        self.searchdata = []
        self.pagestart1 = 0
        self.searchFun(kw)
        self.keyword = ''
      }
    },
    handleScroll1 () {
      const self = this
      self.$util.scrollEvent({
        element: self.$refs.scrollContainer1[0],
        callback: function () {
          if (self.searchdata.length === self.pagestart1 + self.limit1) {
            self.pagestart1 = self.pagestart1 + self.limit1
            self.$vux.loading.show()
            let kw = self.$util.trim(self.clickSearchword) !== '' ? self.clickSearchword : self.searchword
            self.searchFun(kw)
          }
        }
      })
    },
    searchFun (kw) {
      const self = this
      self.clickSearchword = kw
      self.$vux.loading.show()
      let params = { pagestart: self.pagestart1, do: 'get_sogou_list', keyword: kw }
      self.$http.post(`${ENV.BokaApi}/api/news/goodeazy`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = (data.data ? data.data : data)
        self.searchdata = self.searchdata.concat(retdata)
        self.showSearchEmpty = true
      })
    },
    clickKw (keyindex) {
      const self = this
      const kw = self.keywordsData[keyindex].title
      for (let i = 0; i < self.keywordsData.length; i++) {
        if (self.keywordsData[i].checked) {
          delete self.keywordsData[i].checked
        }
      }
      self.keywordsData[keyindex].checked = true
      self.searchdata = []
      self.pagestart1 = 0
      if (self.$util.trim(kw) !== '') {
        self.searchFun(kw)
      }
    },
    deleteKw (keyindex) {
      const self = this
      const kw = self.keywordsData[keyindex].title
      self.$vux.confirm.show({
        content: '确定要删除吗？',
        onConfirm () {
          self.$http.post(`${ENV.BokaApi}/api/news/goodeazy?do=deletekeyword`, {keyword: kw}).then(function (res) {
            let data = res.data
            self.$vux.toast.show({
              text: data.error,
              type: (data.flag !== 1 ? 'warn' : 'success'),
              time: self.$util.delay(data.error),
              onHide: function () {
                if (data.flag) {
                  if (self.keywordsData[keyindex].checked) {
                    self.showSearchEmpty = false
                    self.searchdata = []
                  }
                  self.keywordsData.splice(keyindex, 1)
                }
              }
            })
          })
        }
      })
    },
    openVip () {
      const self = this
      self.$vux.confirm.show({
        content: ENV.vipNews,
        cancelText: ENV.giveUpVipText,
        confirmText: ENV.openVipText,
        onConfirm () {
          location.replace(`${ENV.Host}/#/pay?id=${self.loginUser.payorderid}&module=payorders`)
        }
      })
    },
    collect (item, index) {
      const self = this
      if (self.newsCount >= 5 && self.loginUser.isretailer === 2) {
        self.openVip()
      } else if (self.loginUser.isretailer === 1 || self.newsCount < 5) {
        self.$vux.confirm.show({
          content: '确定要采集该文章吗？',
          onConfirm () {
            self.$vux.loading.show()
            self.$http.post(`${ENV.BokaApi}/api/news/goodeazy`,
              { do: 'download', url: item.url }
            ).then(function (res) {
              const data = res.data
              self.$vux.loading.hide()
              self.$vux.toast.show({
                text: data.error,
                time: self.$util.delay(data.error),
                onHide: () => {
                  if (data.flag === 1) {
                    self.newsCount++
                    let queryParmas = {id: data.data.id, control: 'edit'}
                    if (self.query.minibackurl) {
                      queryParmas.minibackurl = self.query.minibackurl
                      queryParmas.backtype = self.query.backtype
                    }
                    if (self.query.fromapp) {
                      this.$vux.wechat.miniProgram.reLaunch({url: `${ENV.MiniRouter.news}?id=${data.data.id}&add=1`})
                    } else {
                      self.$router.push({path: '/news', query: queryParmas})
                    }
                  }
                }
              })
            })
          }
        })
      }
    },
    collect1 () {
      const self = this
      if (self.newsCount >= 5 && self.loginUser.isretailer === 2) {
        self.openVip()
      } else if (self.loginUser.isretailer === 1 || self.newsCount < 5) {
        if (!self.collecturl || self.$util.trim(self.collecturl) === '') {
          self.$vux.toast.text('请输入采集链接', 'middle')
          return false
        }
        if (self.collecturl.indexOf('mp.weixin.qq.com') < 0) {
          self.$vux.alert.show({
            title: '',
            content: '链接格式有误，请复制微信公众号文章链接再来采集哦！',
            onHide: function () {
              self.collecturl = ''
            }
          })
          return false
        }
        self.$vux.loading.show()
        self.$http.post(`${ENV.BokaApi}/api/news/goodeazy`,
          { do: 'download', url: self.collecturl, fid: this.loginUser.fid }
        ).then((res) => {
          const data = res.data
          self.$vux.loading.hide()
          self.$vux.toast.show({
            text: data.error,
            time: self.$util.delay(data.error),
            onHide: () => {
              if (data.flag === 1) {
                self.collecturl = ''
                let queryParmas = {id: data.data.id, control: 'edit'}
                if (self.query.minibackurl) {
                  queryParmas.minibackurl = self.query.minibackurl
                  queryParmas.backtype = self.query.backtype
                }
                this.routerParams = queryParmas
                if (self.query.fromapp) {
                  this.$vux.wechat.miniProgram.reLaunch({url: `${ENV.MiniRouter.news}?id=${data.data.id}&add=1`})
                } else {
                  if (this.isFirst) {
                    this.showHb = true
                  } else {
                    this.afterCollect1()
                  }
                }
              }
            }
          })
        })
      }
    },
    afterCollect1 () {
      this.$router.push({path: '/factoryNews', query: this.routerParams})
    },
    init () {
      this.loginUser = User.get()
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
      this.query = this.$route.query
      this.initData()
      let curArea = self.$refs.urlTextarea[0] ? self.$refs.urlTextarea[0] : self.$refs.urlTextarea
      curArea.updateAutosize()
      if (this.loginUser && (this.loginUser.subscribe !== 0 || this.loginUser.isretailer)) {
        self.initContainer()
        let isAdmin = false
        for (let i = 0; i < self.loginUser.usergroup.length; i++) {
          if (self.loginUser.usergroup[i] === 1) {
            isAdmin = true
            break
          }
        }
        this.$vux.loading.hide()
        if (!self.loginUser.isretailer && !isAdmin) {
          self.initContainer()
          self.showApply = true
        } else {
          self.initContainer()
          self.showContainer = true
          document.title = this.loginUser.retailerinfo.title
          if (self.loginUser.isretailer === 2) {
            self.$http.get(`${ENV.BokaApi}/api/list/news`, {
              params: { from: 'retailer', pagestart: 0, limit: 5 }
            }).then(function (res) {
              const data = res.data
              const retdata = data.data ? data.data : data
              self.newsCount = retdata.length
              if (self.loginUser.isretailer === 2 && retdata.length >= 5) {
                self.openVip()
              }
            })
          }
        }
      }
    }
  },
  created () {
    this.init()
  },
  activated () {
    this.refresh()
    this.$util.getSystemParams(() => {
      this.sysParams = SystemParams.get()
    })
    this.$util.miniPost()
  }
}
</script>

<style lang="less">
.rgoodeazy{
  .v-search .weui-search-bar{padding:10px 0 10px 12px;}
  .v-search .weui-search-bar.weui-search-bar_focusing .weui-search-bar__cancel-btn{display:none;}
  .item-list{
    .item{
      position:relative;
      font-size: 13px;
      display: inline-block;
      box-sizing: border-box;
      padding-left:10px;padding-right:10px;padding-bottom:10px;
      .inner{
        position:relative;
        padding: 0 15px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 3px;
        background-color: #fff;
        box-sizing: border-box;
      }
      .txt{max-width:80px;}
    }
    .item.active .inner{
      background: #ffffff url("../assets/images/checker.png") no-repeat right bottom;
    }
    .item.active .border1px:after{
      border-color: #ff4a00;
    }
    .close{
      position:absolute;top:-6px;right:0px;z-index:10;
      width:15px;height:15px;border-radius:50%;background-color:#EC3E3F;color:#fff;
    	display:flex;justify-content: center;align-items: center;
    }
  }
  .textarea-outer .weui-cells{background-color:transparent;}
  .x-textarea textarea{background-color:transparent;}
  .del{
    position:absolute;right:-10px;top:-10px;z-index:1;
    width:20px;height:20px;border-radius:50%;font-size:12px;
  }
}
</style>
