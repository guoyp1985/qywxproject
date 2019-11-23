<template>
  <div class="containerarea font14 rgoodeazy bg-white">
    <div class="pl10 pr10">
      <div class="font15 pt15">商品链接采集商品</div>
      <div class="font12 color-gray mt5">请复制天猫商品链接，粘贴在文本框内，点击“采集”按钮，采集成功后即可编辑分享</div>
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
  </div>
</template>

<i18n>
</i18n>

<script>
import { Tab, TabItem, Swiper, SwiperItem, Search, XTextarea, Group, Checker, CheckerItem, XImg } from 'vux'
import Time from '#/time'
import ENV from 'env'
import { User } from '#/storage'

export default {
  components: {
    Tab, TabItem, Swiper, SwiperItem, Search, XTextarea, Group, Checker, CheckerItem, XImg
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
      historyLimit: 15
    }
  },
  methods: {
    textareaChange (refname) {
      let curArea = this.$refs[refname][0] ? this.$refs[refname][0] : this.$refs[refname]
      curArea.updateAutosize()
    },
    textareaFocus (refname) {
      let curArea = this.$refs[refname][0] ? this.$refs[refname][0] : this.$refs[refname]
      curArea.updateAutosize()
    },
    handleScroll2 () {
      const self = this
      self.$util.scrollEvent({
        element: self.$refs.scrollContainer2[0],
        callback: function () {
          if (self.newsdata.length === (self.pagestart + 1) * self.limit) {
            self.pagestart++
            self.$vux.loading.show()
            self.getnewsdata()
          }
        }
      })
    },
    getnewsdata () {
      this.$vux.loading.show()
      const self = this
      const params = { do: 'list', pagestart: self.pagestart, limit: self.limit }
      this.$http.post(`${ENV.BokaApi}/api/factorynews/goodeazy`, params)
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
      this.$http.post(`${ENV.BokaApi}/api/factorynews/goodeazy`, params)
      .then(res => {
        self.$vux.loading.hide()
        const data = res.data
        self.keywordsData = data.data ? data.data : data
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
        self.$vux.alert.show({
          title: '',
          content: '请输入搜索内容'
        })
        return false
      }
      if (self.$util.trim(kw) !== '') {
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
      self.$http.post(`${ENV.BokaApi}/api/factorynews/goodeazy`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = (data.data ? data.data : data)
        self.searchdata = self.searchdata.concat(retdata)
        self.showSearchEmpty = true
      })
    },
    searchEvent (kw) {
      const self = this
      self.searchdata = []
      self.pagestart1 = 0
      if (self.$util.trim(kw) !== '') {
        self.searchFun(kw)
      }
    },
    clickTab () {
      this.swiperChange()
    },
    swiperChange (index) {
      const self = this
      if (index !== undefined) {
        this.selectedIndex = index
      }
      switch (this.selectedIndex) {
        case 0:
          if (this.keywordsData.length < this.historyLimit) {
            this.keywordsData = []
            this.getHistoryData()
          }
          break
        case 1:
          if (this.newsdata.length < this.limit) {
            self.pagestart = 0
            this.disNewslist = false
            this.newsdata = []
            this.getnewsdata()
          }
          break
      }
    },
    collect (item, index) {
      const self = this
      self.$vux.confirm.show({
        content: '确定要采集该商品吗？',
        onConfirm () {
          self.$vux.loading.show()
          self.$http.post(`${ENV.BokaApi}/api/factorynews/goodeazy`,
            { do: 'download', url: item.url }
          ).then(function (res) {
            const data = res.data
            self.$vux.loading.hide()
            self.$vux.toast.show({
              text: data.error,
              time: self.$util.delay(data.error),
              onHide: function () {
                if (data.flag === 1) {
                  self.$router.push({path: '/factorynews', query: {id: data.data.id, fid: self.query.fid}})
                }
              }
            })
          })
        }
      })
    },
    collect1 () {
      const self = this
      if (!self.collecturl || self.$util.trim(self.collecturl) === '') {
        self.$vux.alert.show({
          title: '',
          content: '请输入采集链接'
        })
        return false
      }
      self.$vux.loading.show()
      self.$http.post(`${ENV.BokaApi}/api/product/goodTaoMao`,
        {do: 'download', url: self.collecturl, fid: this.loginUser.fid}
      ).then(function (res) {
        const data = res.data
        self.$vux.loading.hide()
        let error = data.flag ? '成功' : data.error
        self.$vux.toast.show({
          text: error,
          time: self.$util.delay(error),
          onHide: function () {
            if (data.flag === 1) {
              self.$router.push({path: '/addFactoryProduct', query: {id: data.data}})
            }
          }
        })
      })
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.loginUser = User.get()
      this.query = this.$route.query
    }
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less" scoped>
.rgoodeazy .textarea-outer .weui-cells{background-color:transparent;}
.rgoodeazy .x-textarea textarea{background-color:transparent;}
</style>
