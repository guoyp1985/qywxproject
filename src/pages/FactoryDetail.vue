/*
* @description: 厂家介绍页
* @auther: gyp
* @created_date: 2019-02-12
*/
<template>
  <div class="containerarea font14 fd-page bg-white">
    <div class="pagetop flex_center b_bottom_after">
      <div class="flex_cell flex_left">
        <div class="flex_left" style="width:45px;" v-if="factoryInfo.photo && factoryInfo.photo != ''">
          <img :src="factoryInfo.photo" style="width:40px;height:40px;border-radius:50%;object-fit:cover;" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
        </div>
        <div class="flex_cell flex_left">
          <div class="w_100">
            <div class="w_100 clamp1 font16">{{factoryInfo.title}}旗舰店</div>
            <div v-if="shareUser.uid && !isJoin && disShareUser" class="w_100 clamp1 color-theme font12">推荐人: {{shareUser.linkman}}</div>
          </div>
        </div>
      </div>
      <div class="w100 flex_center">
        <div class="box-area bg-theme color-white flex_center" v-if="isJoin">已加盟</div>
        <div class="box-area bg-theme color-white flex_center" @click="toJoin" v-else>申请加盟</div>
      </div>
    </div>
    <div class="pagemiddle">
      <div v-if="(selectedIndex == 0)" class="swiper-inner scroll-container1" ref="scrollContainer1" @scroll="handleScroll('scrollContainer1', 0)">
        <template v-if="factoryInfo.id">
          <div v-if="!contentArr.length" class="flex_empty">
            <div>
              <div class="align_center">品牌介绍，正在路上</div>
              <router-link v-if="showEdit" :to="{path: '/factorySetting', query: {fid: fid}}" class="align_center mt10 color-blue db">设置品牌介绍</router-link>
            </div>
          </div>
          <div v-else v-for="(item,index1) in contentArr" :key="index1">
            <div class="padding10" v-html="item.content"></div>
            <div class="flex_center" v-for="(photo,index2) in item.photoarr" :key="index2">
              <img :src="photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" @click="viewBigImg(index2,index1)"/>
            </div>
          </div>
        </template>
      </div>
      <div v-if="(selectedIndex == 1)" class="swiper-inner scroll-container2" ref="scrollContainer2" @scroll="handleScroll('scrollContainer2', 1)">
        <template v-if="disProductData">
          <div v-if="!productData.length" class="flex_empty">
            <div>
              <div class="align_center">上等好货，敬请期待</div>
              <router-link v-if="showEdit" :to="{path: '/addFactoryProduct', query: {fid: fid}}" class="align_center mt10 color-blue db">添加商品信息</router-link>
            </div>
          </div>
          <div v-else :class="`productlist ${productData.length == 0 ? '' : 'squarepic'}`">
            <div @click="toFactoryProduct(item)" :data="item" v-for="(item,index) in productData" :key="item.id" class="bk-productitem scroll_item font14">
          		<div class="inner list-shadow">
          			<div class="picarea">
          				<div class="pic">
                    <img class="imgcover" :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
                    <div class="t-icon color-theme">佣金: {{$t('RMB')}}<template v-if="item.salesrebate">{{item.salesrebate}}</template><template v-else>{{item.levelagent}}</template></div>
          				</div>
          			</div>
          			<div class="desbox" style="overflow:hidden;">
          				<div class="align_left pl5 pr5 clamp2 distitle" style="line-height:18px;height:36px;">
                    <span style="word-break:break-all;">{{ item.title }}</span>
                  </div>
                  <div class="clamp1">
          					<div class="flex_table padding5 pro-desc">
          						<span class="color-red font14 flex_cell" style="overflow: hidden;margin-right: 10px;white-space: nowrap;text-overflow: ellipsis;">{{ $t('RMB') }} <span style="margin-left:1px;">{{ item.price }}</span></span>
                    </div>
          				</div>
          			</div>
          		</div>
            </div>
          </div>
        </template>
      </div>
      <!-- <div v-if="(selectedIndex == 2)" class="swiper-inner scroll-container3" ref="scrollContainer3" @scroll="handleScroll('scrollContainer3', 2)">
        <template v-if="disNewsData">
          <div v-if="!newsData.length" class="flex_empty">
            <div>
              <div class="align_center">品牌资讯，码字中...</div>
              <router-link v-if="showEdit" :to="{path: '/addFactoryNews', query: {fid: fid}}" class="align_center mt10 color-blue db">创建品牌资讯</router-link>
            </div>
          </div>
          <div v-else class="scroll_list ">
            <div v-if="!newsData.length" class="scroll_item padding10 color-gray align_center">
                <div class="t-table">
                  <div class="t-cell v_middle">暂无数据</div>
                </div>
            </div>
            <div v-else @click="toFactoryNews(item)" v-for="(item,index1) in newsData" :key="item.id" class="list-shadow scroll_item db pt10 pb10 pl12 pr12 bg-white mb10">
              <div class="t-table">
                <div class="t-cell v_middle w70">
                  <img class="imgcover" style="width:60px;height:60px;" :src="$util.getPhoto(item.photo)" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
                </div>
                <div class="t-cell v_middle">
                  <div class="clamp1 font14 color-lightgray"><span :class="getDateClass(item.dateline)">{{ getDateState(item.dateline) }}</span>{{item.title}}</div>
                  <div class="clamp1 font14 color-gray v_middle mt5">
                      <span class="v_middle"><i class="al al-chakan font18 middle-cell pl5 pr5" style="color: #bbbbbb"></i>{{item.views}}</span>
                      <span class="v_middle"><i class="al al-ai-share font14 middle-cell pl5 pr5" style="color: #bbbbbb"></i>{{item.shares}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div> -->
    </div>
    <div class="pagebottom db-flex bg-page">
      <div class="flex_cell">
        <tab v-model="selectedIndex" class="v-tab">
          <tab-item v-for="(item,index) in tabtxts" :selected="index == selectedIndex" :key="index" @on-item-click="clickTab">{{item}}</tab-item>
        </tab>
      </div>
    </div>
    <div v-if="showEdit" class="fixed-layer flex_center" @click="toEdit">编辑</div>
    <div v-transfer-dom>
      <previewer :list="previewerPhotoarr" ref="previewer"></previewer>
    </div>
  </div>
</template>
<script>
import { Previewer, TransferDom, Tab, TabItem, Swiper, SwiperItem, Group, GroupTitle, Cell, XImg } from 'vux'
import Productitemplate from '@/components/Productitemplate'
import Time from '#/time'
import ENV from 'env'
import { User } from '#/storage'

export default {
  directives: {
    TransferDom
  },
  components: {
    Previewer, Tab, TabItem, Swiper, SwiperItem, Group, GroupTitle, Cell, XImg, Productitemplate
  },
  data () {
    return {
      loginUser: {},
      query: {},
      factoryInfo: {photo: 'https://tossharingsales.boka.cn/images/nopic.jpg'},
      contentArr: [],
      selectedIndex: 0,
      // tabtxts: [ '品牌简介', '全部商品', '品牌资讯' ],
      tabtxts: ['品牌简介', '全部商品'],
      disList: false,
      list: [],
      pagestart1: 0,
      pagestart2: 0,
      limit: 10,
      disProductData: false,
      productData: [],
      disNewsData: false,
      newsData: [],
      fid: 0,
      showEdit: false,
      isJoin: false,
      previewerPhotoarr: [],
      wxPhotoArr: [],
      shareUser: {},
      disShareUser: false
    }
  },
  filters: {
    dateFormat: function (isoDate) {
      return new Time(isoDate).dateFormat('yyyy-MM-dd hh:mm')
    },
    valueFormat: function (value) {
      return Number(value) < 0 ? `${value}` : `+${value}`
    }
  },
  methods: {
    toEdit () {
      this.$router.push({path: 'factorySetting', query: {fid: this.fid}})
    },
    toFactoryProduct (item) {
      let params = this.$util.handleAppParams(this.query, {id: item.id, fid: this.fid})
      if (this.query.wid) {
        params.wid = this.query.wid
      }
      this.$router.push({path: '/factoryProduct', query: params})
    },
    toFactoryNews (item) {
      let params = this.$util.handleAppParams(this.query, {id: item.id, fid: this.fid})
      if (this.query.wid) {
        params.wid = this.query.wid
      }
      this.$router.push({path: '/factoryNews', query: params})
    },
    viewBigImg (index2, index1) {
      const self = this
      let index = -1
      for (let i = 0; i < this.contentArr.length; i++) {
        let cur = this.contentArr[i]
        if (index1 === i) {
          index = index + index2 + 1
          break
        } else if (cur.photoarr.length) {
          index = index + cur.photoarr.length
        }
      }
      if (self.$util.isPC()) {
        self.$refs.previewer.show(index)
      } else {
        window.WeixinJSBridge.invoke('imagePreview', {
          current: self.wxPhotoArr[index],
          urls: self.wxPhotoArr
        })
      }
    },
    toJoin () {
      const self = this
      if (!this.loginUser.isretailer || !this.loginUser.retailerinfo.moderate) {
        this.$vux.confirm.show({
          content: '您还不是卖家，要申请成为卖家吗？',
          onConfirm: () => {
            let params = {fid: self.fid}
            if (self.query.uploader) {
              params.uploader = self.query.uploader
            }
            if (self.query.wid) {
              params.wid = self.query.wid
            }
            self.$router.push({path: '/centerSales', query: params})
          }
        })
      } else {
        this.$vux.confirm.show({
          content: '确定要加盟吗？',
          onConfirm: () => {
            let params = {fid: self.fid}
            if (self.query.wid) {
              params.wid = self.query.wid
            }
            self.$http.post(`${ENV.BokaApi}/api/factory/join`, params).then(function (res) {
              const data = res.data
              self.$vux.toast.show({
                text: data.error,
                type: data.flag === 1 ? 'success' : 'warn',
                time: self.$util.delay(data.error),
                onHide: () => {
                  if (data.flag === 1) {
                    self.$router.push({path: '/factory', query: {id: self.fid}})
                  }
                }
              })
            })
          }
        })
      }
    },
    toChat () {
      const self = this
      if (this.fid === self.loginUser.uid) {
        this.$vux.toast.text('不能和自己聊天哦', 'middle')
      } else {
        if (this.loginUser.subscribe === 0) {
          const originHref = encodeURIComponent(`${ENV.Host}/#/chat?uid=${this.fid}&fromModule=factory&fromId=${this.fid}`)
          const callbackHref = encodeURIComponent(`${ENV.Host}/#/redirect`)
          location.replace(`${ENV.WxAuthUrl}appid=${ENV.AppId}&redirect_uri=${callbackHref}&response_type=code&scope=snsapi_userinfo&state=${originHref}#wechat_redirect`)
        } else {
          let params = this.$util.handleAppParams(this.query, {uid: this.fid, fromModule: 'factory', fromId: this.fid})
          this.$router.push({path: '/chat', query: params})
        }
      }
    },
    handleScroll (refname, index) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          if (index === 0) {
          } else if (index === 1) {
            if (self.productData.length === (self.pagestart1 + 1) * self.limit) {
              self.pagestart1++
              self.$vux.loading.show()
              self.getProduct()
            }
          } else if (index === 2) {
            if (self.newsData.length === (self.pagestart2 + 1) * self.limit) {
              self.pagestart2++
              self.$vux.loading.show()
              self.getNews()
            }
          }
        }
      })
    },
    getProduct () {
      const self = this
      const params = { fid: self.fid, pagestart: self.pagestart1, limit: self.limit, wid: this.loginUser.uid }
      this.$http.get(`${ENV.BokaApi}/api/list/factoryproduct`, {
        params: params
      })
      .then(res => {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        self.productData = self.productData.concat(retdata)
        self.disProductData = true
      })
    },
    getNews () {
      const self = this
      const params = { fid: self.fid, pagestart: self.pagestart2, limit: self.limit, wid: this.loginUser.uid }
      self.$http.get(`${ENV.BokaApi}/api/list/factorynews`, {
        params: params
      }).then(function (res) {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        self.newsData = self.newsData.concat(retdata)
        self.disNewsData = true
      })
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
          break
        case 1:
          if (this.productData.length < this.limit) {
            self.pagestart1 = 0
            self.disProductData = false
            self.productData = []
            self.getProduct()
          }
          break
        case 2:
          if (this.newsData.length < this.limit) {
            self.pagestart2 = 0
            self.disNewsData = false
            self.newsData = []
            self.getNews()
          }
          break
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
    getData () {
      const self = this
      const params = { pagestart: this.pagestart, limit: this.limit }
      this.$http.get(`${ENV.BokaApi}/api/user/creditsList`, {
        params: params
      })
      .then(res => {
        self.$vux.loading.hide()
        let data = res.data
        let retdata = data.data ? data.data : data
        self.list = self.list.concat(retdata)
        self.disList = true
      })
    },
    init () {
    },
    initData () {
      const self = this
      self.pagestart1 = 0
      self.disProductData = false
      self.productData = []
      self.pagestart2 = 0
      self.disNewsData = false
      self.newsData = []
    },
    refresh () {
      this.initData()
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.loginUser = User.get()
      this.query = this.$route.query
      if (this.query.fid) {
        this.fid = parseInt(this.query.fid)
      } else {
        this.fid = this.loginUser.fid
      }
      if (this.loginUser.fid === this.fid) {
        this.showEdit = true
      } else {
        this.showEdit = false
      }
      this.isJoin = false
      if (this.query.wid) {
        console.log(111)
        this.$http.get(`${ENV.BokaApi}/api/getUser/${this.query.wid}`).then(res => {
          this.shareUser = res.data
        })
      }
      this.$http.get(`${ENV.BokaApi}/api/user/show`).then(res => {
        const data = res.data
        this.loginUser = data
        User.set(data)
        for (let i = 0; i < this.loginUser.whoseagent.length; i++) {
          if (this.loginUser.whoseagent[i] === this.fid) {
            this.isJoin = true
            break
          }
        }
        this.disShareUser = true
        return this.$http.get(`${ENV.BokaApi}/api/factory/info`, {
          params: {fid: this.fid}
        })
      }).then(res => {
        const data = res.data
        this.factoryInfo = data.data
        document.title = this.factoryInfo.title
        let content = this.factoryInfo.content
        if (content && content !== '') {
          this.contentArr = JSON.parse(content)
        }
        for (let i = 0; i < this.contentArr.length; i++) {
          let cur = this.contentArr[i]
          if (cur.photoarr.length) {
            this.previewerPhotoarr = this.previewerPhotoarr.concat(cur.photoarr)
            this.wxPhotoArr = this.wxPhotoArr.concat(cur.photoarr)
          }
          this.contentArr[i].content = this.contentArr[i].content.replace(/\n/g, '<br />')
        }
        if (this.previewerPhotoarr.length) {
          this.previewerPhotoarr = this.$util.previewerImgdata(this.previewerPhotoarr)
        }
        let shareUrl = `${ENV.Host}/#/factoryDetail?fid=${this.fid}&share_uid=${this.loginUser.uid}`
        if (this.query.wid) {
          shareUrl = `${shareUrl}&wid=${this.query.wid}`
        }
        if (this.loginUser.isretailer) {
          shareUrl = `${shareUrl}&uploader=${this.loginUser.uid}`
        }
        let shareParams = {
          data: this.factoryInfo,
          module: 'factory',
          moduleid: this.fid,
          link: shareUrl
        }
        if (this.query.share_uid) {
          shareParams.link = `${shareParams.link}&lastshareuid=${this.query.share_uid}`
          shareParams.lastshareuid = this.query.share_uid
        }
        this.$util.handleWxShare(shareParams)
      })
    }
  },
  created () {
    this.init()
  },
  activated () {
    this.refresh()
  },
  watch: {
    $route (to, from) {
      this.selectedIndex = 0
    }
  }
}
</script>

<style lang="less">
.fd-page{
  .pagetop{
    height:60px;padding-left:10px;box-sizing: border-box;box-shadow: 0 1px 5px 0px #e4e4e4;
    .box-area{
      width:80px;border-radius:30px;height:30px;
    }
  }
  .pagemiddle{top:60px;}
  .f_logo{
    width:60px;
    img{width:30px;height:30px;border-radius:50%;object-fit:cover;}
  }
  .v-tab .vux-tab .vux-tab-item{background:#f5f9fa;}
  .t-icon{position:absolute;left:0;top:10px;border-top-right-radius:20px;border-bottom-right-radius:20px;background-color:#fff;padding:5px 10px 5px 5px;font-size:12px;}
  .fixed-layer{
    position:absolute;right:10px;bottom:80px;
    width:60px;height:60px;border-radius:50%;
    background-color:rgba(0,0,0,0.6);color:#fff;
  }
}
</style>
