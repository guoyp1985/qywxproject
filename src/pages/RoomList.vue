/*
* @description: 群群推群列表页面(接单方)
* @auther: simon
* @created_date: 2019-1-4
*/
<template>
  <div id="room-list" class="containerarea font14 s-havebottom">
    <div class="s-topbanner s-topbanner1">
      <tab class="b-tab" v-model="selectedIndex">
        <tab-item :selected="selectedIndex==0" @on-item-click="toggleTab">我的群</tab-item>
        <tab-item :selected="selectedIndex==1" @on-item-click="toggleTab">我的群订单</tab-item>
      </tab>
    </div>
    <div ref="scrollContainer" class="s-container s-container1 scroll-container list-area" @scroll="handleScroll">
      <form enctype="multipart/form-data">
        <input ref="fileInput" class="hide" type="file" name="files" @change="fileChange" />
      </form>
      <div v-if="query.from && loginUser.subscribe != 1" class="border-box db-flex top-subscribe-tip">
        <div class="flex_cell h_100 flex_left">
          <i class="al al-gantanhaozhong font20"></i><span>关注公众号可及时接收私信提醒</span>
        </div>
        <div class="w80 h_100 flex_right">
          <div class="btn flex_center" @click="toSubscribe">立即关注</div>
        </div>
      </div>
      <template v-if="selectedIndex===0">
        <template v-if="showTab1">
          <div class="pro_box bg-page list_shadow pl12 pr12 pb15  border-box">
            <div class="pro_list_top"></div>
            <div class="rule pb12 pt12 pl12 pr12 border color-lightgray b_bottom_after list-shadow bg-white font12" style="margin-top: -4px;">
              <div>首次添加微信群可根据群人数获得<span class="color-theme">现金红包奖励</span></div>
              <div>群人数在<span class="color-theme">50-150</span>人，赏现金红包<span class="color-theme">5</span>元</div>
              <div>群人数在<span class="color-theme">151-250</span>人，赏现金红包<span class="color-theme">10</span>元</div>
              <div>群人数在<span class="color-theme">251-500</span>人，赏现金红包<span class="color-theme">15</span>元</div>
              <div>群评估完成后红包会自动发送到微信余额</div>
            </div>
          </div>
          <template v-if="rooms.length">
            <room v-for="(item, index) in rooms" :key="index" :item="item" :index="index" @action="handleAction" @click-photo="clickPhoto"></room>
          </template>
          <template v-else>
            <div class="font16 color-gray2" style="padding-top:20%;">
              <div>
                <div class="align_center">你还没有添加微信群</div>
                <div class="db align_center mt10 color-theme" @click="toAdd">点击添加微信群 ></div>
              </div>
            </div>
          </template>
        </template>
      </template>
      <template v-if="selectedIndex===1">
        <template v-if="showTab2">
          <template v-if="roomOrders.length">
            <room-order-consumer v-for="(item, index) in roomOrders" :key="index" :item="item"></room-order-consumer>
          </template>
          <template v-else>
            <div class="font16 color-gray2 align_center" style="padding-top:20%;">
              <span>还没有群订单信息</span>
            </div>
          </template>
        </template>
      </template>
    </div>
    <div v-if="selectedIndex===0" @click="toAdd" class="s-bottom submit-button color-white">
      <span>添加微信群</span>
    </div>
    <router-link v-if="selectedIndex===1" to="/userRevenue" class="s-bottom submit-button color-white">
      <span>我的收入</span>
    </router-link>
    <!-- <div v-if="selectedIndex===1" class="s-bottom db-flex income-area">
      <div class="flex_cell income-info">
        <span>待提现收入: </span>
        <span class="color-red">￥{{income}}</span>
      </div>
      <div class="cashed-btn">
        <span class="color-white">提现</span>
      </div>
    </div> -->
    <!-- <div v-if="showTip" class="start-layer flex_center">
      <div class="auto-modal flex_center">
        <div class="modal-inner border-box" style="width:80%;">
          <div class="pic-outer" style="width:80%;margin:0 auto;">
            <div class="pic-area">
              <div class="pic-inner">
                <img src="../assets/images/wxqbx.png" class="pic"/>
              </div>
            </div>
          </div>
          <div class="align_center txt padding10 font16">
            <div>只要你是微信群主,</div>
            <div class="mt10">动动手指就可赚钱,</div>
            <div class="mt10">日赚千元更轻松!</div>
            <div class="mt10">赶快了解怎么玩吧↓↓↓</div>
          </div>
          <div class="pt20 pb20">
            <div class="bg-theme color-white btn-more flex_center" @click="clickMore">了解更多 ></div>
          </div>
          <div class="close-area flex_center" @click="closeTip">
            <i class="al al-close"></i>
          </div>
        </div>
      </div>
    </div> -->
    <template v-if="showFirst">
      <firstTip @submitFirstTip="submitFirstTip">
        <div class="font15 bold txt">
          <div class="flex_center">{{sysParams.advance_addgroup}}</div>
        </div>
      </firstTip>
    </template>
  </div>
</template>
<script>
import { Tab, TabItem, XButton } from 'vux'
import Room from '@/components/Room'
import RoomOrderConsumer from '@/components/RoomOrderConsumer'
import FirstTip from '@/components/FirstTip'
import ENV from 'env'
import { User, FirstInfo, SystemParams } from '#/storage'

export default {
  components: {
    Tab, TabItem, XButton, Room, RoomOrderConsumer, FirstTip
  },
  data () {
    return {
      query: {},
      loginUser: {},
      selectedIndex: 0,
      showTab1: false,
      showTab2: false,
      income: 0,
      rooms: [],
      roomOrders: [],
      limit: 10,
      pageStart1: 0,
      pageStart2: 0,
      clickItem: null,
      clickIndex: 0,
      showTip: true,
      loaddata: false,
      showFirst: false,
      isFirst: false,
      sysParams: {}
    }
  },
  watch: {
    rooms () {
      return this.rooms
    }
  },
  methods: {
    initData () {
      this.isFirst = false
      this.showFirst = false
    },
    submitFirstTip () {
      this.showFirst = false
    },
    toSubscribe () {
      this.$wechat.miniProgram.navigateTo({url: '/pages/subscribe'})
    },
    toAdd () {
      let params = this.$util.handleAppParams(this.query, {})
      this.$router.push({path: '/roomApply', query: params})
    },
    closeTip () {
      this.showTip = false
    },
    clickMore () {
      this.showTip = false
      let params = this.$util.handleAppParams(this.query, {})
      this.$router.push({path: '/roomStart', query: params})
    },
    photoCallback (photodata) {
      if (photodata.flag === 1) {
        this.$vux.loading.show()
        let newphoto = photodata.data
        this.$http.post(`${ENV.BokaApi}/api/setModulePara/wechatgroups`, {
          id: this.clickItem.id, param: 'photo', paramvalue: newphoto
        }).then((res) => {
          this.$vux.loading.hide()
          const data = res.data
          this.$vux.toast.show({
            text: data.error,
            type: (data.flag !== 1 ? 'warn' : 'success'),
            time: this.$util.delay(data.error)
          })
          if (data.flag === 1) {
            this.showTab1 = false
            this.rooms = []
            console.log('in photoCallback')
            this.loadRooms()
            // this.rooms[this.clickIndex].photo = newphoto
          }
        })
      } else if (photodata.error) {
        this.$vux.toast.show({
          text: photodata.error,
          time: this.$util.delay(photodata.error)
        })
      }
    },
    fileChange () {
      const self = this
      const target = event.target
      let files = target.files
      if (files.length > 0) {
        const fileForm = target.parentNode
        const filedata = new FormData(fileForm)
        self.$vux.loading.show()
        self.$http.post(`${ENV.BokaApi}/api/upload/files`, filedata).then(function (res) {
          let data = res.data
          self.$vux.loading.hide()
          self.photoCallback(data)
        })
      }
    },
    clickPhoto (item, index) {
      const self = this
      const refname = 'fileInput'
      const fileInput = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      this.clickItem = item
      this.clickIndex = index
      if (self.$util.isPC()) {
        fileInput.click()
      } else {
        self.$wechat.ready(function () {
          self.$util.wxUploadImage({
            maxnum: 1,
            handleCallback: function (data) {
              self.photoCallback(data)
            }
          })
        })
      }
    },
    toggleTab () {
      console.log('in toggleTab')
      switch (this.selectedIndex) {
        case 0:
          !this.rooms.length && this.loadRooms()
          break
        case 1:
          !this.roomOrders.length && this.loadOrders()
          break
      }
    },
    handleScroll () {
      console.log('in handelscroll')
      const _this = this
      this.$util.scrollEvent({
        element: this.$refs.scrollContainer,
        callback: () => {
          switch (_this.selectedIndex) {
            case 0:
              if (_this.rooms.length === (_this.pageStart1 + 1) * _this.limit) {
                _this.loadRooms(_this.pageStart1++)
              }
              break
            case 1:
              if (_this.roomOrders.length === (_this.pageStart2 + 1) * _this.limit) {
                _this.loadOrders(_this.pageStart2++)
              }
              break
          }
        }
      })
    },
    handleAction (room, status) {
      const _this = this
      let confirmTitle = ''
      let conCon = ''
      switch (status) {
        case 0:
          confirmTitle = '是否重新评估?'
          conCon = '<div style="font-size:12px;text-align:center;">重新评估过程中，不可改变群状态</div><div style="font-size:12px;text-align:center;margin-top:5px;">如不需要接单，请先暂停接单再重新评估</div>'
          break
        case 2:
          break
        case 3:
          confirmTitle = '是否要暂停接单?'
          break
      }
      if (status === 2) {
        _this.actionData(room.id, status)
      } else {
        this.$vux.confirm.show({
          title: confirmTitle,
          content: conCon,
          onConfirm () {
            _this.actionData(room.id, status)
          }
        })
      }
    },
    actionData (id, status) {
      const _this = this
      this.$http.post(`${ENV.BokaApi}/api/groups/moderate`, {id: id, moderate: status})
      .then(res => {
        if (res.data.flag === 1) {
          const moderate = res.data.moderate
          this.rooms = this.$util.changeItem(this.rooms, id, room => {
            room.moderate = moderate
            return room
          })
          if (status === 2) {
            _this.$vux.toast.text('成功开放，正在接单中...', 'middle')
          }
        }
      })
    },
    loadRooms (page) {
      if (!this.loaddata) {
        this.loaddata = true
        page = page || 0
        this.$vux.loading.show()
        let params = { pagestart: page, limit: this.limit }
        this.$http.post(`${ENV.BokaApi}/api/groups/myGroups`, params)
        .then(res => {
          this.$vux.loading.hide()
          this.loaddata = false
          if (res.data.flag === 1) {
            const data = res.data.data
            this.rooms = this.rooms.concat(data)
            this.showTab1 = true
          }
        })
      }
    },
    loadOrders (page) {
      page = page || 0
      this.$vux.loading.show()
      const params = {from: 'groupowner', pagestart: page, limit: this.limit}
      this.$http.post(`${ENV.BokaApi}/api/groups/orderList`, params)
      .then(res => {
        this.$vux.loading.hide()
        if (res.data.flag === 1) {
          const data = res.data.data
          this.roomOrders = this.roomOrders.concat(data)
          this.showTab2 = true
        }
      })
    },
    refresh () {
      this.initData()
      this.query = this.$route.query
      this.loginUser = User.get()
      if (`${this.loginUser.retailerinfo.firstinfo.addgroup}` === '0' && this.query.from) {
        this.$http.get(`${ENV.BokaApi}/api/user/show`).then(res => {
          const data = res.data
          this.loginUser = data
          User.set(data)
          if (`${this.loginUser.retailerinfo.firstinfo.addgroup}` === '0' && this.query.from) {
            this.isFirst = true
            let finfo = FirstInfo.get()
            if (!finfo) {
              finfo = this.loginUser.retailerinfo.firstinfo
            }
            if (`${finfo.addgroup}` === '0') {
              this.showFirst = true
              finfo.addgroup = 1
            }
            FirstInfo.set(finfo)
          }
        })
      }
      this.selectedIndex = 0
      this.showTab1 = false
      this.rooms = []
      this.loadRooms()
    }
  },
  activated () {
    if (!SystemParams.get()) {
      this.$util.getSystemParams(() => {
        this.sysParams = SystemParams.get()
      })
    } else {
      this.sysParams = SystemParams.get()
    }
    this.refresh()
  }
}
</script>
<style lang="less">
#room-list{
  .pro_list_top{
    width:100%;padding-bottom:9%;
    background: url(../assets/images/product_list_top.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
  }
  .list-area{
    .room:not(:last-child){margin-bottom:10px;}
    .room-order-consumer:not(:last-child){margin-bottom:10px;}
  }
  .income-area {
    background-color: #ffffff;
  }
  .income-area .income-info {
    line-height: 45px;
    padding-left: 10px;
    text-align: left;
  }
  .cashed-btn {
    line-height: 45px;
    width: 120px;
    background-color: @boka-red;
    text-align: center;
  }
  .submit-button {
    background-color: @boka-red;
    line-height: 45px;
    text-align: center;
  }
  .b-tab .vux-tab .vux-tab-item.vux-tab-selected {
    color: @boka-red;
    border-bottom: 3px solid @boka-red;
  }
  .b-tab .vux-tab-ink-bar {
    background-color: @boka-red;
  }
  .start-layer{
    .modal-inner{padding-top:25%;}
    .pic-outer{
      position:absolute;left:10%;top:-25%;right:10%;
      .pic-area{
        width:100%;padding-bottom:75%;position:relative;
        .pic-inner{
          text-align:center;position:absolute;left:0;top:0;right:0;bottom:0;
          .pic{max-width:100%;}
        }
      }
    }
    .btn-more{width:160px;height:35px;border-radius:30px;margin:0 auto;}
  }
}
</style>
