<template>
  <div class="containerarea s-havebottom font14 rnews bg-page">
    <template v-if="showSos">
      <Sos :title="sosTitle"></Sos>
    </template>
    <template v-if="showContainer">
      <div class="pagetop b_bottom_after flex_center" style="height:55px;">
        <search
          class="v-search"
          v-model='searchword1'
          :auto-fixed="autofixed"
          @on-submit="onSubmit1"
          @on-change="onChange1"
          @on-cancel="onCancel1"
          ref="search">
        </search>
      </div>
      <div class="pagemiddle scroll-container" style="top:55px;" ref="scrollContainer" @scroll="handleScroll('scrollContainer','factorynews')">
        <div v-if="distabdata1" class="scroll_list ">
          <div v-if="!tabdata1 || tabdata1.length === 0" class="scroll_item padding10 color-gray align_center">
            <template v-if="searchresult1">
              <div class="flex_center" style="height:80px;">暂无搜索结果</div>
            </template>
            <template v-else>
              <div class="t-table" style="padding-top:20%;">
                <div class="t-cell v_middle">
                  <div><i class="al al-wushuju font60 pt20"></i></div>
                  <div class="mt5">空空如也~</div>
                  <div class="align_center mt5">赶快<router-link :to="{path: '/addFactoryNews', query: {fid: query.fid}}" class="color-blue">创建文章</router-link>，为卖家提供素材可有效提高销量哦</div>
                </div>
              </div>
            </template>
          </div>
          <div @click="toDetail(item)" v-else v-for="(item,index1) in tabdata1" :key="item.id" class="list-shadow scroll_item db pt10 pb10 pl12 pr12 bg-white mb10">
            <div class="t-table">
              <div class="t-cell v_middle w70">
                <img class="imgcover" style="width:60px;height:60px;" :src="$util.getPhoto(item.photo)" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
              </div>
              <div class="t-cell v_middle">
                <div class="clamp1 font14 color-lightgray"><span :class="getDateClass(item.dateline)">{{ getDateState(item.dateline) }}</span>{{item.title}}</div>
                <div class="clamp1 font14 color-gray v_middle mt5">
                    <span class="v_middle color-999">{{ item.dateline | dateformat }}</span>
                    <span class="v_middle"><i class="al al-chakan font18 middle-cell pl5 pr5" style="color: #bbbbbb"></i>{{item.views}}</span>
                    <span class="v_middle"><i class="al al-ai-share font14 middle-cell pl5 pr5" style="color: #bbbbbb"></i>{{item.shares}}</span>
                </div>
              </div>
              <div class="align_right t-cell v_bottom w80 pb8">
                  <div class="btnicon bg-red color-white font12" @click.stop="controlpopup(item, index1)">
                    <i class="al al-asmkticon0165 v_middle"></i>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="s-bottom list-shadow flex_center bg-white pl12 pr12">
        <div class="flex_cell flex_center">
          <div class="flex_center btn-bottom-red font14" style="width:80%;" @click="toGoodeazy">易采集</div>
        </div>
        <div class="flex_cell flex_center">
          <div class="flex_center btn-bottom-orange font14" style="width:80%;" @click="toClass">文章分类</div>
        </div>
        <div class="flex_cell flex_center">
          <div class="flex_center btn-bottom-red font14" style="width:80%;" @click="toAdd">{{ $t('Create news') }}</div>
        </div>
      </div>
      <div v-transfer-dom>
        <popup class="menuwrap" v-model="showpopup">
          <div class="popup0">
            <div class="list">
              <div class="item" v-for="(row,index1) in controldata" :key="index1">
                <div class="inner" v-if="row.key == 'stat'" @click="toStat">{{ row.title }}</div>
                <router-link class="inner" v-else-if="row.key == 'set'" :to="{path:'/addFactoryNews',query:{id:clickdata.id, fid: query.fid}}">{{ row.title }}</router-link>
              </div>
              <div class="item" v-if="clickdata.moderate == 0">
                <div class="inner" @click="toShow">显示</div>
              </div>
              <div class="item" v-else>
                <div class="inner" @click="toHide">隐藏</div>
              </div>
              <div class="item close mt10" @click="clickpopup('row.key,clickdata')">
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
Goodeazy:
  zh-CN: 易采集
Create news:
  zh-CN: 创建文章
Control text:
  zh-CN: 操作
</i18n>

<script>
import { TransferDom, Popup, CheckIcon, XImg, Search } from 'vux'
import Time from '#/time'
import { User } from '#/storage'
import ENV from 'env'
import Sos from '@/components/Sos'

export default {
  directives: {
    TransferDom
  },
  components: {
    Popup, CheckIcon, XImg, Search, Sos
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    },
    photoFormat: function (photo) {
      const self = this
      let parr = photo.split(',')
      let retphoto = parr[0]
      return self.$util.getPhoto(retphoto)
    }
  },
  data () {
    return {
      showSos: false,
      sosTitle: '抱歉，您暂无权限访问此页面！',
      showContainer: false,
      query: {},
      loginUser: {},
      autofixed: false,
      tabtxts: [ '我的文章', '采集记录' ],
      tabmodel: 0,
      distabdata1: false,
      distabdata2: false,
      tabdata1: [],
      tabdata2: [],
      controldata: [
        { key: 'set', title: '更多设置' },
        { key: 'stat', title: '统计' }
      ],
      showpopup: false,
      clickdata: {},
      clickIndex: 0,
      limit: 10,
      pagestart1: 0,
      pagestart2: 0,
      searchword1: '',
      searchresult1: false
    }
  },
  methods: {
    toShow () {
      this.showpopup = false
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/moderate/factorynews`, {
        id: this.clickdata.id, fid: this.loginUser.fid, moderate: 1
      }).then(res => {
        this.$vux.loading.hide()
        const data = res.data
        this.$vux.toast.show({
          text: data.error,
          type: data.flag === 1 ? 'success' : 'warn',
          time: this.$util.delay(data.error)
        })
        if (data.flag) {
          this.clickdata.moderate = 1
          this.tabdata1.splice(this.clickIndex, this.clickdata)
        }
      })
    },
    toHide () {
      this.showpopup = false
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/moderate/factorynews`, {
        id: this.clickdata.id, fid: this.loginUser.fid, moderate: 0
      }).then(res => {
        this.$vux.loading.hide()
        const data = res.data
        this.$vux.toast.show({
          text: data.error,
          type: data.flag === 1 ? 'success' : 'warn',
          time: this.$util.delay(data.error)
        })
        if (data.flag) {
          this.clickdata.moderate = 0
          this.tabdata1.splice(this.clickIndex, this.clickdata)
        }
      })
    },
    toDetail (item) {
      let params = this.$util.handleAppParams(this.query, {id: item.id, fid: this.query.fid})
      this.$router.push({path: '/factoryNews', query: params})
    },
    toGoodeazy () {
      let params = this.$util.handleAppParams(this.query, {fid: this.query.fid})
      this.$router.push({path: '/factoryGoodeazy', query: params})
    },
    toClass () {
      let params = this.$util.handleAppParams(this.query, {fid: this.query.fid})
      this.$router.push({path: '/factoryNewsClass', query: params})
    },
    toAdd () {
      let params = this.$util.handleAppParams(this.query, {fid: this.query.fid})
      this.$router.push({path: '/addFactoryNews', query: params})
    },
    toStat () {
      let params = this.$util.handleAppParams(this.query, {id: this.clickdata.id, module: 'factorynews', fid: this.query.fid})
      this.$router.push({path: '/stat', query: params})
    },
    handleScroll (refname, type) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          if (type === 'factorynews') {
            if (self.tabdata1.length === (self.pagestart1 + 1) * self.limit) {
              self.pagestart1++
              self.$vux.loading.show()
              self.getData1()
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
    getData1 () {
      const self = this
      const params = { fid: self.query.fid, pagestart: self.pagestart1, limit: self.limit, wid: this.loginUser.uid }
      if (this.query.classid) {
        params.classid = this.query.classid
      }
      let keyword = self.searchword1
      if (typeof keyword !== 'undefined' && keyword && self.$util.trim(keyword) !== '') {
        self.searchresult1 = true
        params.keyword = keyword
      } else {
        self.searchresult1 = false
      }
      self.$http.get(`${ENV.BokaApi}/api/list/factorynews`, {
        params: params
      }).then(function (res) {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        self.tabdata1 = self.tabdata1.concat(retdata)
        self.distabdata1 = true
      })
    },
    onChange1 (val) {
      this.searchword1 = val
    },
    onCancel1 () {
      const self = this
      self.searchword1 = ''
      self.$vux.loading.show()
      self.distabdata1 = false
      self.tabdata1 = []
      self.pagestart1 = 0
      self.getData1()
    },
    onSubmit1 () {
      const self = this
      self.$vux.loading.show()
      self.distabdata1 = false
      self.tabdata1 = []
      self.pagestart1 = 0
      self.getData1()
    },
    controlpopup (item, index) {
      event.preventDefault()
      this.showpopup = !this.showpopup
      this.clickdata = item
      this.clickIndex = index
    },
    getCustomerdata () {
      const self = this
      self.$vux.loading.show()
      let params = { params: { pagestart: self.customerPagestart, limit: self.limit } }
      self.$http.get(`${ENV.BokaApi}/api/retailer/sellersList`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabdata2 = self.tabdata2.concat(retdata)
        self.customerdata = self.customerdata.concat(retdata)
      })
    },
    clickpopup (key, item) {
      const self = this
      self.showpopup = false
    },
    getDateState (dt) {
      return this.$util.getDateState(dt)
    },
    getDateClass (dt) {
      let ret = this.$util.getDateClass(dt)
      ret = `${ret} mr5`
      return ret
    },
    refresh () {
      const self = this
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.loginUser = User.get()
      if (this.loginUser) {
        this.$vux.loading.show()
        let isAdmin = false
        for (let i = 0; i < self.loginUser.usergroup.length; i++) {
          if (self.loginUser.usergroup[i] === 1) {
            isAdmin = true
            break
          }
        }
        if (!(self.loginUser.fid && parseInt(self.loginUser.fid) === parseInt(self.$route.query.fid)) && !isAdmin) {
          this.$vux.loading.hide()
          self.showSos = true
          self.showContainer = false
        } else {
          self.showSos = false
          self.showContainer = true
          self.$vux.loading.hide()
          this.query = this.$route.query
          if (this.tabdata1.length < this.limit) {
            this.distabdata1 = false
            this.tabdata1 = []
            this.$vux.loading.show()
            self.pagestart1 = 0
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

<style lang="less">
.rnews .bk-listplate1 .iconcell{width:45px;}
.vux-popup-dialog .weui-cell__bd{text-align:center;}
.vux-popup-dialog .weui-cell__ft{display:none;}
.rnews .collect{
  background:#ee9f25;
  color: #fff;
  width: 171px;
  height: 36px;
  margin: 0 auto;
  border-radius: 50px;
}
.rnews .s-bottom{
  height: 50px;
}
.rnews .btnicon{
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
</style>
