<template>
  <div class="containerarea s-havebottom font14 rnews bg-page">
    <!--
    <div class="s-topbanner s-topbanner1">
      <div class="row flex_left pl10 border-box font18">{{$t('News')}}</div>
    </div>
     -->
    <div class="s-container s-container1 scroll-container">
      <div v-if="distabdata1" class="scroll_list ">
        <div v-if="!tabdata1 || tabdata1.length == 0" class="scroll_item pt10 pb10 color-gray align_center">
          <div class="t-table">
            <div class="t-cell v_middle">
              <div><i class="al al-wushuju font60 pt20"></i></div>
              <div class="mt5">空空如也~</div>
              <div class="align_left mt5">可以根据自己的营销特色<router-link to="/addNews" class="color-blue">创建文章</router-link>，或通过<router-link to="/retailerGoodeazy" class="color-blue">【易采集】</router-link>搜索符合自己营销特色的文章进行修改并发布。</div>
            </div>
          </div>
        </div>
        <router-link :to="{path: '/news', query: {id: item.id}}" v-else v-for="(item,index1) in tabdata1" :key="item.id" class="list_shadow scroll_item db pt10 pb10 pl12 pr12 bg-white mb10">
          <div class="t-table">
            <div class="t-cell v_middle w70">
              <x-img class="imgcover" :src="$util.getPhoto(item.photo)" default-src="../src/assets/images/nopic.jpg" style="width:60px;height:60px;" :offset="0" container=".scroll-container"></x-img>
            </div>
            <div class="t-cell v_middle">
              <div class="clamp1 font14 color-lightgray">{{item.title}}</div>
              <div class="clamp1 font14 color-gray v_middle mt5">
                  <span class="v_middle color-999">{{ item.dateline | dateformat }}</span>
                  <span class="v_middle"><i class="al al-chakan font18 middle-cell pl5 pr5" style="color: #bbbbbb"></i>{{item.views}}</span>
                  <span class="v_middle"><i class="al al-ai-share font14 middle-cell pl5 pr5" style="color: #bbbbbb"></i>{{item.shares}}</span>
              </div>
            </div>
            <div class="align_right t-cell v_bottom w80 pb8">
                <div class="btnicon bg-red color-white font12" @click="controlpopup(item)">●●●</div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="s-bottom list_shadow flex_center bg-white pl12 pr12">
      <div class="align_center flex_center flex_cell">
        <router-link class="collect flex_center h_100 mauto" style="width:85%;" to="/retailerGoodeazy">{{ $t('Goodeazy') }}</router-link>
      </div>
      <div class="align_center flex_center flex_cell">
        <router-link class="collect bg-red flex_center h_100" style="width:85%;" to="/addNews" >{{ $t('Create news') }}</router-link>
      </div>
    </div>
    <div v-transfer-dom>
      <popup class="menuwrap" v-model="showpopup">
        <div class="popup0">
          <div class="list">
            <div class="item" v-for="(row,index1) in controldata" :key="index1">
              <router-link class="inner" v-if="row.key == 'stat'" :to="{path:'/stat',query:{id:clickdata.id,module:'news'}}">{{ row.title }}</router-link>
              <router-link class="inner" v-else-if="row.key == 'set'" :to="{path:'/addNews',query:{id:clickdata.id}}">{{ row.title }}</router-link>
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
          <div class="popup-middle font14 customer-popup-container" style="top:85px;bottom:86px;">
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
                    <div class="t-cell v_middle w70">
                      <x-img class="avatarimg imgcover" :src="item.avatar" default-src="../src/assets/images/user.jpg" :offset="0" container=".customer-popup-container"></x-img>
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
import { Tab, TabItem, Swiper, SwiperItem, Group, TransferDom, Popup, CheckIcon, XImg } from 'vux'
import Time from '#/time'
import ENV from 'env'

export default {
  directives: {
    TransferDom
  },
  components: {
    Tab, TabItem, Swiper, SwiperItem, Group, Popup, CheckIcon, XImg
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
      tabtxts: [ '我的文章', '采集记录' ],
      tabmodel: 0,
      distabdata1: false,
      distabdata2: false,
      tabdata1: [],
      tabdata2: [],
      controldata: [
        { key: 'push', title: '推送给返点客' },
        { key: 'set', title: '更多设置' },
        { key: 'stat', title: '文章统计' },
        { key: 'createposter', title: '生成海报' }
      ],
      showpopup: false,
      clickdata: {},
      limit: 20,
      pagestart1: 0,
      pagestart2: 0,
      isBindScroll1: false,
      isBindScroll2: false,
      scrollArea1: null,
      scrollArea2: null,
      showpush: false,
      customerdata: [],
      pushdata: [],
      checkAll: false,
      customerPagestart: 0,
      isBindCustomerScroll: false,
      scrollCustomerArea: null,
      scrollContainer: null
    }
  },
  methods: {
    scroll1: function () {
      const self = this
      self.$util.scrollEvent({
        element: self.scrollContainer,
        callback: function () {
          if (self.tabdata1.length === (self.pagestart1 + 1) * self.limit) {
            self.pagestart1++
            self.$vux.loading.show()
            self.getdata1()
          }
        }
      })
    },
    scroll2: function () {
      const self = this
      self.$util.scrollEvent({
        element: self.scrollArea2,
        callback: function () {
          if (self.tabdata2.length === (self.pagestart2 + 1) * self.limit) {
            self.pagestart2++
            self.$vux.loading.show()
            self.getdata2()
          }
        }
      })
    },
    getdata1 () {
      const self = this
      let params = { params: { from: 'retailer', pagestart: self.pagestart1, limit: self.limit } }
      self.$http.get(`${ENV.BokaApi}/api/list/news`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabdata1 = self.tabdata1.concat(retdata)
        self.distabdata1 = true
        if (!self.scrollContainer) {
          self.scrollContainer = document.querySelector('.scroll-container')
        }
        if (!self.isBindScroll1) {
          self.scrollContainer.removeEventListener('scroll', self.scroll1)
          self.scrollContainer.addEventListener('scroll', self.scroll1)
        }
      })
    },
    getdata2 () {
      const self = this
      let params = { from: 'retailer', do: 'list', pagestart: self.pagestart2, limit: self.limit }
      self.$http.post(`${ENV.BokaApi}/api/news/goodeazy`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabdata2 = self.tabdata2.concat(retdata)
        self.distabdata2 = true
        if (!self.isBindScroll2) {
          self.isBindScroll2 = true
          self.scrollArea2.removeEventListener('scroll', self.scroll2)
          self.scrollArea2.addEventListener('scroll', self.scroll2)
        }
      })
    },
    controlpopup (item) {
      event.preventDefault()
      this.showpopup = !this.showpopup
      this.clickdata = item
    },
    scrollCustomer: function () {
      const self = this
      self.$util.scrollEvent({
        element: self.scrollCustomerArea,
        callback: function () {
          if (self.customerdata.length === (self.customerPagestart + 1) * self.limit) {
            self.customerPagestart++
            self.$vux.loading.show()
            self.getCustomerdata()
          }
        }
      })
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
        if (!self.isBindCustomerScroll) {
          self.scrollCustomerArea = document.querySelector('.popupCustomer .popup-middle')
          self.isBindCustomerScroll = true
          self.scrollCustomerArea.removeEventListener('scroll', self.scrollCustomer)
          self.scrollCustomerArea.addEventListener('scroll', self.scrollCustomer)
        }
      })
    },
    clickpopup (key, item) {
      const self = this
      this.showpopup = false
      if (key === 'push') {
        this.showpush = true
        if (self.customerdata.length === 0) {
          self.getCustomerdata()
        } else {
          self.scrollCustomerArea = document.querySelector('.popupCustomer .popup-middle')
          self.isBindCustomerScroll = true
          self.scrollCustomerArea.removeEventListener('scroll', self.scrollCustomer)
          self.scrollCustomerArea.addEventListener('scroll', self.scrollCustomer)
        }
      }
    },
    tabitemclick (index) {
      const self = this
      if (index === 0) {
        if (self.tabdata1.length === 0) {
          self.$vux.loading.show()
          self.getdata1()
        }
      } else if (index === 1) {
        if (self.pagestart2 === 0 && !self.isBindScroll2) {
          self.$vux.loading.show()
          self.getdata2()
        }
      }
    },
    closepush () {
      this.showpush = false
      self.isBindCustomerScroll = false
    },
    submitpush () {
      const self = this
      if (self.pushdata.length === 0) {
        self.$vux.toast.show({
          text: '请选择返点客'
        })
        return false
      }
      self.$vux.loading.show()
      let subdata = { id: self.clickdata.id, sendmodule: 'news', uid: self.pushdata }
      self.$http.post(`${ENV.BokaApi}/api/retailer/sendGroupNews`, subdata).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        self.$vux.toast.show({
          text: data.error,
          time: self.$util.delay(data.error),
          onHide: function () {
            if (data.flag === 1) {
              self.showpush = false
            }
          }
        })
      })
      self.isBindCustomerScroll = false
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
    getDateState: function (dt) {
      return this.$util.getDateState(dt)
    },
    getDateClass: function (dt) {
      let ret = this.$util.getDateClass(dt)
      ret = `${ret} mr5`
      return ret
    }
  },
  created () {
    const self = this
    self.$store.commit('updateToggleTabbar', {toggleBar: false})
    self.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, {
      module: 'retailer', action: 'news'
    })
    self.$vux.loading.show()
    self.getdata1()
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
.rnews .s-container.s-container1{
  top: 0
}
.rnews .s-bottom{
  height: 50px;
}
.rnews .btnicon{
  display:inline-block;
  color: #ea3a3a;
  font-size: 12px;
  border: 1px solid #ea3a3a;
  text-align: center;
  border-radius: 30px;
  padding: 1px 8px;
  letter-spacing: 0px;
}

</style>
