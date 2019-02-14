/*
* @description: 厂商介绍页
* @auther: gyp
* @created_date: 2019-02-12
*/
<template>
  <div class="containerarea font14 fd-page bg-white">
    <div class="pagetop flex_center">
      <div class="box-area bg-theme flex_center">
        <div class="flex_cell flex_center btn" v-if="isJoin">已加盟</div>
        <div class="flex_cell flex_center btn" @click="toJoin" v-else>申请加盟</div>
        <!-- <div class="flex_cell flex_center btn" @click="toChat">联系客服</div> -->
      </div>
    </div>
    <div class="pagemiddle">
      <swiper v-model="selectedIndex" class="x-swiper no-indicator" @on-index-change="swiperChange">
        <swiper-item v-for="(tabitem, index) in tabtxts" :key="index">
          <div v-if="(index == 0)" class="swiper-inner scroll-container1" ref="scrollContainer1" @scroll="handleScroll('scrollContainer1', index)">
            <div v-for="(item,index1) in contentArr" :key="index1">
              <div class="flex_center" v-for="(photo,index2) in item.photoarr" :key="index2">
                <img :src="photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" @click="viewBigImg(index2,index1)"/>
              </div>
              <div class="padding10">{{item.content}}</div>
            </div>
          </div>
          <div v-if="(index == 1)" class="swiper-inner scroll-container2" ref="scrollContainer2" @scroll="handleScroll('scrollContainer2', index)">
            <div v-if="disProductData" :class="`productlist ${productData.length == 0 ? '' : 'squarepic'}`">
              <div v-if="productData.length == 0" class="emptyitem flex_center">暂无商品</div>
              <router-link v-else :data="item" v-for="(item,index) in productData" :key="item.id" :to="{path: '/factoryProduct', query: {id: item.id, fid: fid}}" class="bk-productitem scroll_item font14">
            		<div class="inner list-shadow">
            			<div class="picarea">
            				<div class="pic">
                      <img class="imgcover" :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
                      <div class="t-icon color-theme">佣金: {{item.levelagent}}</div>
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
              </router-link>
            </div>
          </div>
          <div v-if="(index == 2)" class="swiper-inner scroll-container3" ref="scrollContainer3" @scroll="handleScroll('scrollContainer3', index)">
            <div v-if="disNewsData" class="scroll_list ">
              <div v-if="!newsData.length" class="scroll_item padding10 color-gray align_center">
                  <div class="t-table">
                    <div class="t-cell v_middle">暂无数据</div>
                  </div>
              </div>
              <router-link v-else :to="{path: '/factoryNews', query: {id: item.id, fid: fid}}" v-for="(item,index1) in newsData" :key="item.id" class="list-shadow scroll_item db pt10 pb10 pl12 pr12 bg-white mb10">
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
              </router-link>
            </div>
          </div>
        </swiper-item>
      </swiper>
    </div>
    <div class="pagebottom db-flex bg-page">
      <div class="flex_center f_logo">
        <img :src="factoryInfo.photo" />
      </div>
      <div class="flex_cell">
        <tab v-model="selectedIndex" class="v-tab">
          <tab-item v-for="(item,index) in tabtxts" :selected="index == 0" :key="index">{{item}}</tab-item>
        </tab>
      </div>
    </div>
    <router-link v-if="showEdit" :to="{path: '/factorySetting', query: {fid: fid}}" class="fixed-layer flex_center">编辑</router-link>
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
      tabtxts: [ '品牌简介', '全部商品', '品牌资讯' ],
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
      wxPhotoArr: []
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
      if (!this.loginUser.isretailer) {
        this.$vux.confirm.show({
          content: '您还不是卖家，要申请成为卖家吗？',
          onConfirm: () => {
            self.$router.push({path: '/centerSales', query: {fid: self.fid}})
          }
        })
      } else {
        this.$vux.confirm.show({
          content: '确定要加盟吗？',
          onConfirm: () => {
            self.$http.post(`${ENV.BokaApi}/api/factory/join`, {
              fid: self.fid
            }).then(function (res) {
              const data = res.data
              self.$vux.toast.show({
                text: data.error,
                time: self.$util.delay(data.error)
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
          let params = {uid: this.fid, fromModule: 'factory', fromId: this.fid}
          if (this.query.from) {
            params.from = this.query.from
          }
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
      const params = { fid: self.fid, pagestart: self.pagestart1, limit: self.limit }
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
      const params = { fid: self.fid, pagestart: self.pagestart2, limit: self.limit }
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
            this.productData = []
            self.getProduct()
          }
          break
        case 2:
          if (this.newsData.length < this.limit) {
            self.pagestart2 = 0
            self.disNewsData = false
            this.newsData = []
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
      this.loginUser = User.get()
      console.log(this.loginUser)
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
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
        }
        if (this.previewerPhotoarr.length) {
          this.previewerPhotoarr = this.$util.previewerImgdata(this.previewerPhotoarr)
        }
        let shareParams = {
          data: this.factoryInfo,
          module: 'factory',
          moduleid: this.fid,
          link: `${ENV.Host}/#/factoryDetail?fid=${this.fid}&wid=${this.fid}&share_uid=${this.loginUser.uid}`
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
  }
}
</script>

<style lang="less">
.fd-page{
  .pagetop{
    height:60px;
    .box-area{
      width:200px;border-radius:30px;height:40px;
      .btn{color:#fff;position:relative;}
      .btn:nth-child(1):after{
        content:"";position:absolute;top:0px;bottom:0px;right:0;width:1px;background-color:#fff;
      }
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
