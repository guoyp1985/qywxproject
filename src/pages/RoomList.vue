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
      <template v-if="selectedIndex===0">
        <template v-if="showTab1">
          <template v-if="rooms.length">
            <room v-for="(item, index) in rooms" :key="index" :item="item" :index="index" @action="handleAction" @click-photo="clickPhoto"></room>
          </template>
          <template v-else>
            <div class="flex_empty">
              <span>还没有群信息，点击底部按钮前去验证</span>
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
            <div class="flex_empty">
              <span>还没有群订单信息</span>
            </div>
          </template>
        </template>
      </template>
    </div>
    <router-link v-if="selectedIndex===0" :to="{ name: 'tRoomApply'}" class="s-bottom submit-button color-white">
      <span>群密钥验证</span>
    </router-link>
    <router-link v-if="selectedIndex===1" :to="{ name: 'tUserRebateInfo'}" class="s-bottom submit-button color-white">
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
  </div>
</template>
<script>
import { Tab, TabItem, XButton } from 'vux'
import Room from '@/components/Room'
import RoomOrderConsumer from '@/components/RoomOrderConsumer'
import ENV from 'env'

export default {
  components: {
    Tab, TabItem, XButton, Room, RoomOrderConsumer
  },
  data () {
    return {
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
      clickIndex: 0
    }
  },
  watch: {
    rooms () {
      return this.rooms
    }
  },
  methods: {
    photoCallback (data) {
      if (data.flag === 1) {
        this.$vux.loading.show()
        this.$http.post(`${ENV.BokaApi}/api/setModulePara/wechatgroups`, {
          id: this.clickItem.id, param: 'photo', paramvalue: data.data
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
            this.loadRooms()
          }
        })
      } else if (data.error) {
        this.$vux.toast.show({
          text: data.error,
          time: this.$util.delay(data.error)
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
      const _this = this
      this.$util.scrollEvent({
        element: this.$refs.scrollContainer,
        callback: () => {
          switch (_this.selectedIndex) {
            case 0:
              if (_this.rooms.length === _this.pageStart1 * _this.limit) {
                _this.loadRooms(_this.pageStart1)
              }
              break
            case 1:
              if (_this.roomOrders.length === _this.pageStart2 * _this.limit) {
                _this.loadOrders(_this.pageStart2)
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
          conCon = '<div style="font-size:12px;text-align:center;">重新评估过程中，正常接单</div><div style="font-size:12px;text-align:center;margin-top:5px;">如不需要，请手动关闭</div>'
          break
        case 2:
          confirmTitle = '确认开放?'
          break
        case 3:
          confirmTitle = '确认关闭?'
          break
      }
      this.$vux.confirm.show({
        title: confirmTitle,
        content: conCon,
        onConfirm () {
          _this.actionData(room.id, status)
        }
      })
    },
    actionData (id, status) {
      this.$http.post(`${ENV.BokaApi}/api/groups/moderate`, {id: id, moderate: status})
      .then(res => {
        if (res.data.flag === 1) {
          const moderate = res.data.moderate
          this.rooms = this.$util.changeItem(this.rooms, id, room => {
            room.moderate = moderate
            return room
          })
        }
      })
    },
    loadRooms (page) {
      page = page || 0
      this.$vux.loading.show()
      let params = { pagestart: page, limit: this.limit }
      this.$http.post(`${ENV.BokaApi}/api/groups/myGroups`, params)
      .then(res => {
        this.$vux.loading.hide()
        if (res.data.flag === 1) {
          const data = res.data.data
          this.rooms = this.rooms.concat(data)
          this.showTab1 = true
        }
      })
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
      this.toggleTab()
    }
  },
  activated () {
    this.refresh()
  }
}
</script>
<style lang="less">
#room-list{
  .list-area{
    .room:not(:last-child){margin-bottom:10px;}
    .room-order-consumer:not(:last-child){margin-bottom:10px;}
  }
}
#room-list .income-area {
  background-color: #ffffff;
}
#room-list .income-area .income-info {
  line-height: 45px;
  padding-left: 10px;
  text-align: left;
}
#room-list .cashed-btn {
  line-height: 45px;
  width: 120px;
  background-color: @boka-red;
  text-align: center;
}
#room-list .submit-button {
  background-color: @boka-red;
  line-height: 45px;
  text-align: center;
}
#room-list .b-tab .vux-tab .vux-tab-item.vux-tab-selected {
  color: @boka-red;
  border-bottom: 3px solid @boka-red;
}
#room-list .b-tab .vux-tab-ink-bar {
  background-color: @boka-red;
}
</style>
