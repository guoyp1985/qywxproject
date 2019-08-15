<template>
  <div class="containerarea s-havebottom font14 rnews bg-page">
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
    <div class="pagemiddle scroll-container" style="top:55px;" ref="scrollContainer" @scroll="handleScroll('scrollContainer','news')">
      <div v-if="distabdata1" class="scroll_list ">
        <div v-if="!tabdata1 || tabdata1.length === 0" class="scroll_item padding10 color-gray align_center">
          <template v-if="searchresult1">
            <div class="flex_center" style="height:80px;">暂无搜索结果</div>
          </template>
          <template v-else>
            <div class="t-table">
              <div class="t-cell v_middle">
                <div><i class="al al-wushuju font60 pt20"></i></div>
                <div class="mt5">空空如也~</div>
                <div v-if="!retailerInfo.fid" class="align_left mt5">可以根据自己的营销特色<router-link to="/addNews" class="color-blue">创建文章</router-link>，或通过<router-link to="/retailerGoodeazy" class="color-blue">【易采集】</router-link>搜索符合自己营销特色的文章进行修改并发布。</div>
              </div>
            </div>
          </template>
        </div>
        <router-link :to="{path: '/news', query: {id: item.id}}" v-else v-for="(item,index1) in tabdata1" :key="item.id" class="list-shadow scroll_item db pt10 pb10 pl12 pr12 bg-white mb10">
          <div class="t-table">
            <div class="t-cell v_middle w70">
              <img class="imgcover" style="width:60px;height:60px;" :src="$util.getPhoto(item.photo)" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
            </div>
            <div class="t-cell v_middle">
              <div class="clamp1 font14 color-lightgray"><span :class="getDateClass(item.dateline)">{{ getDateState(item.dateline) }}</span>{{item.title}}</div>
              <div class="clamp1 font14 color-gray v_middle mt5">
                  <span class="v_middle"><i class="al al-chakan font18 middle-cell" style="color: #bbbbbb"></i>{{item.views}}</span>
                  <span class="v_middle ml5"><i class="al al-ai-share font14 middle-cell" style="color: #bbbbbb"></i>{{item.shares}}</span>
                  <span class="v_middle color-999 ml5">{{ item.dateline | dateformat }}</span>
              </div>
            </div>
            <div class="align_right t-cell v_bottom w80 pb8">
                <div class="btnicon bg-red color-white font12" @click="controlpopup(item)">
                  <i class="al al-asmkticon0165 v_middle"></i>
                </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="s-bottom flex_center pl12 pr12 list-shadow02 bg-white">
      <div class="flex_cell flex_center" v-if="retailerInfo.fid > 0">
        <div class="addproduct flex_center btn-bottom-red" style="width:85%;" @click="clickImport">导入文章</div>
      </div>
      <div class="align_center flex_center flex_cell">
        <div class="collect flex_center h_100 mauto" style="width:85%;" @click="toGoodeazy">{{ $t('Goodeazy') }}</div>
      </div>
      <div class="flex_cell flex_center">
        <div class="collect bg-red flex_center h_100" style="width:85%;" @click="toAdd">{{ $t('Create news') }}</div>
      </div>
    </div>
    <div v-transfer-dom>
      <popup class="menuwrap" v-model="showpopup">
        <div class="popup0">
          <div class="list">
            <div class="item" v-for="(row,index1) in controldata" :key="index1">
              <router-link class="inner" v-if="row.key == 'stat'" :to="{path:'/stat',query:{id:clickdata.id,module:'news'}}">{{ row.title }}</router-link>
              <template v-else-if="row.key == 'set'">
              <router-link class="inner" v-if="!(clickdata.fnid > 0)" :to="{path:'/addNews',query:{id:clickdata.id}}">{{ row.title }}</router-link>
              </template>
              <router-link class="inner" v-else-if="row.key == 'createposter'" :to="{path:'/poster',query:{id:clickdata.id, module:'news'}}">{{ row.title }}</router-link>
              <div class="inner" v-else @click="clickpopup(row.key,clickdata)">
                <div :class="`clamp1 ${row.key}`">{{ row.title }}</div>
              </div>
            </div>
            <div class="item close mt10" @click="clickpopup('row.key,clickdata')">
              <div class="inner">{{ $t('Cancel txt') }}</div>
            </div>
          </div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom class="x-popup popupCustomer">
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
          <div class="popup-middle font14 customer-popup-container" style="top:85px;bottom:86px;" ref="scrollContainer1" @scroll="handleScroll('scrollContainer1','customer')">
            <div class="padding10">
              <div class="scroll_list">
                <template v-if="customerdata.length == 0">
                  <div class="scroll_item emptyitem">
          					<div class="t-table">
          						<div class="t-cell" style="padding:10px;">暂无返点客</div>
          					</div>
          				</div>
                </template>
                <check-icon v-else class="x-check-icon scroll_item pt10 pb10" v-for="(item,index) in customerdata" :key="item.uid" :value.sync="item.checked" @click.native.stop="radioclick(item,index)">
                  <div class="t-table">
                    <div class="t-cell v_middle w50">
                      <img class="avatarimg imgcover" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
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
    <div v-transfer-dom class="x-popup popupImport">
      <popup v-model="showImportPopup" height="100%">
        <div class="popup1">
          <div class="popup-top flex_center">导入文章</div>
          <div class="popup-middle font14" ref="scrollContainerImport" @scroll="handleScroll('scrollContainerImport','import')">
            <div class="padding10">
              <div v-if="disNewsList" class="scroll_list">
                <template v-if="!newsData.length">
                  <div class="scroll_item emptyitem">
          					<div class="t-table">
          						<div class="t-cell" style="padding:10px;">暂无文章</div>
          					</div>
          				</div>
                </template>
                <div v-else v-for="(item,index) in newsData" :key="item.id" class="list-shadow scroll_item db pt10 pb10 pl12 pr12 bg-white mb10">
                  <div class="t-table">
                    <router-link class="t-cell v_middle w70" :to="{path: '/factorynews', query: {id: item.id, fid: retailerInfo.fid}}">
                      <img class="imgcover" style="width:60px;height:60px;" :src="$util.getPhoto(item.photo)" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
                    </router-link>
                    <router-link class="t-cell v_middle" :to="{path: '/factorynews', query: {id: item.id, fid: retailerInfo.fid}}">
                      <div class="clamp1 font14 color-lightgray"><span :class="getDateClass(item.dateline)">{{ getDateState(item.dateline) }}</span>{{item.title}}</div>
                      <div class="clamp1 font14 color-gray v_middle mt5">
                          <span class="v_middle color-999">{{ item.dateline | dateformat }}</span>
                          <span class="v_middle"><i class="al al-chakan font18 middle-cell pl5 pr5" style="color: #bbbbbb"></i>{{item.views}}</span>
                          <span class="v_middle"><i class="al al-ai-share font14 middle-cell pl5 pr5" style="color: #bbbbbb"></i>{{item.shares}}</span>
                      </div>
                    </router-link>
                    <div class="align_right t-cell v_bottom w80 pb8">
                        <div class="btnicon bg-red color-white font12" @click="importEvent(item)">导入</div>
                    </div>
                  </div>
                </div>
              </div>
  					</div>
          </div>
          <div class="popup-bottom flex_center">
            <div class="flex_cell h_100 flex_center bg-gray color-white" @click="closeImport">{{ $t('Close') }}</div>
            <div class="flex_cell h_100 flex_center bg-green color-white" @click="importEvent">导入全部</div>
          </div>
        </div>
      </popup>
    </div>
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
import ENV from 'env'
import { User } from '#/storage'

export default {
  directives: {
    TransferDom
  },
  components: {
    Popup, CheckIcon, XImg, Search
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
      loginUser: {},
      retailerInfo: {},
      autofixed: false,
      tabtxts: [ '我的文章', '采集记录' ],
      tabmodel: 0,
      distabdata1: false,
      distabdata2: false,
      tabdata1: [],
      tabdata2: [],
      controldata: [
        // { key: 'push', title: '推送给返点客' },
        { key: 'set', title: '更多设置' },
        { key: 'stat', title: '文章统计' },
        { key: 'createposter', title: '生成海报' }
      ],
      showpopup: false,
      clickdata: {},
      limit: 10,
      pagestart1: 0,
      pagestart2: 0,
      showpush: false,
      customerdata: [],
      pushdata: [],
      checkAll: false,
      customerPagestart: 0,
      searchword1: '',
      searchresult1: false,
      newsCount: 0,
      isFirst: true,
      showImportPopup: false,
      newsData: [],
      disNewsList: false,
      pageStartNews: 0
    }
  },
  methods: {
    getNewsData () {
      this.$http.get(`${ENV.BokaApi}/api/list/factorynews`, {
        params: {pagestart: this.pageStartNews, limit: this.limit, fid: this.retailerInfo.fid, wid: this.loginUser.uid}
      }).then(res => {
        const data = res.data
        const retdata = data.data ? data.data : data
        this.newsData = this.newsData.concat(retdata)
        this.disNewsList = true
      })
    },
    clickImport () {
      this.showImportPopup = true
      if (!this.newsData.length) {
        this.getNewsData()
      }
    },
    importEvent (item) {
      const self = this
      if (item && item.id) {
        self.$vux.loading.show()
        self.$http.post(`${ENV.BokaApi}/api/factory/importFactoryNews`, {id: item.id}).then(res => {
          const data = res.data
          self.$vux.loading.hide()
          self.$vux.toast.show({
            text: data.error,
            type: (data.flag !== 1 ? 'warn' : 'success'),
            time: self.$util.delay(data.error),
            onHide: function () {
              if (data.flag === 1) {
                self.tabdata1 = self.tabdata1.concat(item)
                self.pagestart1 = Math.floor(self.tabdata1.length / self.limit)
              }
            }
          })
        })
      } else {
        self.$vux.confirm.show({
          content: '确定要导入全部文章吗?',
          onConfirm () {
            self.$vux.loading.show()
            self.$http.post(`${ENV.BokaApi}/api/factory/fastImportFactoryNews`, {fid: self.retailerInfo.fid}).then(res => {
              const data = res.data
              self.$vux.loading.hide()
              self.$vux.toast.show({
                text: data.error,
                type: (data.flag !== 1 ? 'warn' : 'success'),
                time: self.$util.delay(data.error),
                onHide: function () {
                  if (data.flag === 1) {
                    self.showImportPopup = false
                    self.refresh()
                  }
                }
              })
            })
          }
        })
      }
    },
    closeImport () {
      this.showImportPopup = false
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
    toGoodeazy () {
      if (this.loginUser.isretailer === 2 && this.newsCount >= 5) {
        this.openVip()
      } else {
        this.$router.push({path: '/retailerGoodeazy'})
      }
    },
    toAdd () {
      if (this.loginUser.isretailer === 2 && this.newsCount >= 5) {
        this.openVip()
      } else {
        this.$router.push({path: '/addNews'})
      }
    },
    handleScroll (refname, type) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          if (type === 'news') {
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
          } else if (type === 'news') {
            if (self.newsData.length === (self.pageStartNews + 1) * self.limit) {
              self.pageStartNews++
              self.$vux.loading.show()
              self.getNewsData()
            }
          }
        }
      })
    },
    getData1 () {
      const self = this
      const params = { from: 'retailer', pagestart: self.pagestart1, limit: self.limit }
      let keyword = self.searchword1
      if (typeof keyword !== 'undefined' && keyword && self.$util.trim(keyword) !== '') {
        self.searchresult1 = true
        params.keyword = keyword
      } else {
        self.searchresult1 = false
      }
      self.$http.get(`${ENV.BokaApi}/api/list/news`, {
        params: params
      }).then(function (res) {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        self.tabdata1 = self.tabdata1.concat(retdata)
        if (self.isFirst) {
          self.newsCount = self.tabdata1.length
          self.isFirst = false
        }
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
    controlpopup (item) {
      event.preventDefault()
      this.showpopup = !this.showpopup
      this.clickdata = item
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
      this.showpopup = false
      if (key === 'push') {
        this.showpush = true
        if (self.customerdata.length === 0) {
          self.getCustomerdata()
        }
      }
    },
    closepush () {
      this.showpush = false
    },
    submitpush () {
      const self = this
      if (self.pushdata.length === 0) {
        self.$vux.toast.show({
          text: '请选择返点客'
        })
        return false
      }
      self.showpush = false
      self.$vux.loading.show()
      let subdata = { id: self.clickdata.id, sendmodule: 'news', uid: self.pushdata }
      self.$http.post(`${ENV.BokaApi}/api/retailer/sendGroupNews`, subdata).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        self.$vux.toast.show({
          text: data.error,
          time: self.$util.delay(data.error)
        })
      })
    },
    radioclick (data, index) {
      const self = this
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
      const self = this
      for (let i = 0; i < self.customerdata.length; i++) {
        if (self.checkAll) {
          self.customerdata[i].checked = true
        } else {
          delete self.customerdata[i].checked
        }
      }
    },
    getDateState (dt) {
      return this.$util.getDateState(dt)
    },
    getDateClass (dt) {
      let ret = this.$util.getDateClass(dt)
      ret = `${ret} mr5`
      return ret
    },
    init () {
      this.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, {
        module: 'retailer', action: 'news'
      })
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.loginUser = User.get()
      this.retailerInfo = this.loginUser.retailerinfo
      document.title = this.retailerInfo.title
      self.pagestart1 = 0
      this.distabdata1 = false
      this.tabdata1 = []
      this.$vux.loading.show()
      this.getData1()
    }
  },
  created () {
    this.init()
  },
  activated () {
    this.refresh()
    this.$util.miniPost()
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
.rnews .btnicon,.popupImport .btnicon{
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
