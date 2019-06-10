<template>
  <div class="containerarea font14 rgoodeazy bg-white">
    <div class="s-topbanner s-topbanner1 bg-white">
      <div class="row">
        <tab v-model="selectedIndex" class="v-tab">
          <tab-item v-for="(item,index) in tabtxts" :selected="index == selectedIndex" :key="index" @on-item-click="clickTab">{{item}}</tab-item>
        </tab>
      </div>
    </div>
    <div class="s-container s-container1">
      <div v-show="(selectedIndex == 0)" class="swiper-inner scroll-container1" ref="scrollContainer1" @scroll="handleScroll1">
        <div class="font15 pt15 pl10 pr10">搜索关键词采集文章</div>
        <div class="font12 color-gray mt5 pl10 pr10">在搜索框内输入文章关键词，点击“搜索”按钮搜索相关文章后，即可预览或采集文章素材。</div>
        <div class="mb15" style="position:relative;">
          <search
            class="v-search bg-white"
            v-model="searchword"
            :auto-fixed="autofixed"
            @on-submit="onSubmit"
            @on-change="onChange"
            @on-cancel="onCancel"
            ref="search">
          </search>
          <checker
          v-if="keywordsData.length > 0"
          class="v-checker pt10 pl10 pr10"
          type="radio"
          v-model="keyword"
          default-item-class="ck-item"
          selected-item-class="ck-item-selected"
          @on-change="searchEvent">
            <checker-item class="border1px color-gray" v-for="(kw, keyindex) in keywordsData" :key="keyindex" :value="kw">{{ kw }}</checker-item>
          </checker>
          <div class="scroll_list pl10 pr10 mb12">
            <div v-if="showSearchEmpty && (!searchdata || searchdata.length == 0)" class="scroll_item emptyitem">
              <div class="t-table">
                <div class="t-cell">暂无搜索结果</div>
              </div>
            </div>
            <div v-else v-for="(item,index) in searchdata" :key="item.id" class="scroll_item pt10 pb10">
              <div class="t-table">
                <a :href="item.url" class="t-cell v_middle">
                  <div class="clamp1">{{ item.title }}</div>
                  <div class="clamp2 font12 color-gray mt5">{{ item.summary }}</div>
                </a>
                <div class="t-cell align_right v_middle w60">
                  <div class="qbtn bg-red color-white" @click="collect(item,index)">{{ $t('Collect') }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="(selectedIndex == 1)" class="swiper-inner scroll-container2" ref="scrollContainer2" @scroll="handleScroll2">
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
        <div class="bg-page" style="height:12px;"></div>
        <div class="padding15 font15 b_bottom_after">{{ $t('Collect record') }}</div>
        <div v-if="disNewslist" class="scroll_list pl10 pr10 pb10">
          <div v-if="!newsdata || newsdata.length == 0" class="scroll_item emptyitem">
            <div class="t-table">
              <div class="t-cell">您还没有采集过文章</div>
            </div>
          </div>
          <router-link v-else v-for="(item,index) in newsdata" :key="item.id" class="scroll_item pt10 pb10 db" :to="{path: '/factoryNews', query: {id: item.id,fid: query.fid}}">
            <div class="flex_left">
              <div class="">
                <img class="imgcover v_middle avatarimg1 radius0" :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
              </div>
              <div class="flex_cell pl10">
                <div class="clamp1 font14">{{item.title}}</div>
                <div class="clamp1 font12 color-gray">{{ item.dateline | dateformat }}</div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
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
        content: '确定要采集该文章吗？',
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
      self.$http.post(`${ENV.BokaApi}/api/factorynews/goodeazy`,
        { do: 'download', url: self.collecturl }
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
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.loginUser = User.get()
      this.query = this.$route.query
      this.swiperChange()
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
