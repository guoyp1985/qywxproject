<template>
  <div class="containerarea bg-page font14 s-havebottom rproductlist">
    <template v-if="showSos">
      <Sos :title="sosTitle"></Sos>
    </template>
    <template v-if="showContainer">
      <div class="s-container scroll-container" style="top:0px;" ref="scrollContainer" @scroll="handleScroll('scrollContainer', 'product')">
        <template v-if="disList">
          <template v-if="!Data || Data.length == 0">
            <div class="scroll_list">
              <div class="emptyitem">
                <div class="t-table" style="padding-top:20%;">
                  <div class="t-cell padding10">暂无厂家数据</div>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="scroll_list ">
              <router-link :to="{path:'/factory',query:{id:item.id, wid: loginUser.uid}}" class="scroll_item mb10 font14 bg-white db list-shadow " v-for="(item,index) in Data" :key="item.id" style="color:inherit;">
                <div v-if="item.moderate == 0" class="ico down"></div>
            		<div class="t-table bg-white pt10 pb10">
            			<div class="t-cell v_middle pl12">
                    <div class="clamp1 font16 pr10 color-lightgray">{{item.title}}</div>
                    <div class="t-table pr12 border-box mt15">
                      <div class="t-cell color-999 font14">
                        <div class="clamp1">{{ item.summary }}</span></div>
                      </div>
                      <div class="align_right t-cell v_bottom w80">
                        <div class="btnicon bg-red color-white font12" @click="controlPopup1(item,index)">
                          <i class="al al-asmkticon0165 v_middle"></i>
                        </div>
                      </div>
                    </div>
            			</div>
            		</div>
              </router-link>
            </div>
          </template>
        </template>
      </div>
      <div class="s-bottom flex_center pl12 pr12 list-shadow02 bg-white">
        <router-link class="addproduct flex_cell flex_center btn-bottom-red" to="/addFactory">{{ $t('Add factory') }}</router-link>
      </div>
      <div v-transfer-dom>
        <popup class="menuwrap" v-model="showPopup1">
          <div class="popup0">
            <div class="list" v-if="clickData">
              <!-- <div class="item">
                <div class="inner" @click="clickPopup('push')">添加管理员</div>
              </div> -->
              <div class="item">
                <div class="inner" @click="clickPopup('manager')">管理员列表</div>
              </div>
              <!-- <div class="item">
                <div class="inner" @click="clickPopup('set')">设置佣金</div>
              </div> -->
              <div class="item">
                <div class="inner" @click="showxdate2">设置到期时间</div>
              </div>
              <div class="item">
                <div class="inner" @click="clickPopup('edit')">编辑</div>
              </div>
              <div class="item">
                <div class="inner" @click="clickPopup('retailer')">卖家</div>
              </div>
              <div class="item">
                <div class="inner" @click="clickPopup('stat')">统计</div>
              </div>
              <div class="item">
                <div class="inner" @click="clickPopup('bank')">结算银行卡</div>
              </div>
              <div class="item close mt10" @click="clickPopup('row.key')">
                <div class="inner">{{ $t('Cancel txt') }}</div>
              </div>
            </div>
          </div>
        </popup>
      </div>
      <div v-transfer-dom class="x-popup">
        <popup v-model="showManager" height="100%">
          <div class="popup1 font14">
            <div class="popup-top flex_center">管理员</div>
            <div class="popup-middle padding10 border-box">
              <div class="scroll_list" v-if="disManagerList">
                <div v-if="!managerData || managerData.length == 0" class="scroll_item emptyitem flex_center">暂无管理员</div>
                <div v-else v-for="(item,index) in managerData" :key="item.id" class="scroll_item pt10 pb10 pl12 pr12 bg-white mb10 list-shadow">
                  <div class="t-table">
                    <router-link :to="{path: '/membersView', query: {uid: item.uid}}" class="t-cell v_middle w70">
                      <img class="avatarimg3 imgcover" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
                    </router-link>
                    <router-link :to="{path: '/membersView', query: {uid: item.uid}}" class="t-cell v_middle">
                      <div class="clamp1 font14 color-lightgray">{{item.linkman}}</div>
                    </router-link>
                    <div :to="{path: '/chat', query: {uid: item.uid,from:query.from}}" class="t-cell v_middle w60 align_right">
                      <div class="qbtn bg-red color-white" @click="deleteManager(item,index)">删除</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="popup-bottom flex_center" style="width:50%;">
              <div class="flex_cell h_100 flex_center bg-gray color-white" @click="closeManager">{{ $t('Close') }}</div>
            </div>
            <div class="popup-bottom flex_center" style="width:50%;left:50%;">
              <div class="flex_cell h_100 flex_center bg-red color-white" @click="clickPopup1">添加管理员</div>
            </div>
          </div>
        </popup>
      </div>
      <div v-transfer-dom class="x-popup">
        <popup v-model="showQrcode" height="100%">
          <div class="popup1 font14">
            <div class="popup-top flex_center">设置管理员</div>
            <div class="popup-middle padding10 border-box flex_center" style="bottom:86px;">
              <img ref="adminQrcode" class="qrcode" style="max-width:100%;max-height:100%;" />
            </div>
            <div class="flex_center border-box pl10 pr10 color-red font12" style="position:absolute;left:0;right:0;bottom:46px;height:40px;">
              <div>扫描二维码设置管理员</div>
            </div>
            <div class="popup-bottom flex_center">
              <div class="flex_cell h_100 flex_center bg-gray color-white" @click="closeQrcode">{{ $t('Close') }}</div>
            </div>
          </div>
        </popup>
      </div>
      <!-- <div v-show="timeShow">
        <group class="x-datetime">
          <datetime format="YYYY-MM-DD HH:mm" v-model="endTime" :show.sync="visibility2" @on-confirm="saveSuess"></datetime>
        </group>
      </div> -->
      <div class="modalarea flex_center" v-if="timeShow">
        <div class="modals">
          <div class="align_center mb10">请输入延长的天数</div>
          <div class="input-bor mb10">
            <input :value="day" ref="input1" type="text" class="input priceInput pl10" name="days" placeholder="请输入延长天数" ></input>
          </div>
          <div class="flex_table flex_center">
            <div class="btns mr10" style="background-color:#948f8f;" @click="btnClose">取消</div>
            <div class="btns ml10" style="background-color:#ea3a3a;" @click="saveSuess">确定</div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<i18n>
Add factory:
  zh-CN: 添加厂家
</i18n>

<script>
import { Group, Datetime, TransferDom, Popup, Confirm, CheckIcon, XImg, XInput } from 'vux'
import ENV from 'env'
import Time from '../../libs/time'
import { User } from '#/storage'
import Sos from '@/components/Sos'

let pageStart1 = 0
const limit = 10
export default {
  directives: {
    TransferDom
  },
  components: {
    Popup, Confirm, CheckIcon, XImg, Sos, Datetime, Group, XInput
  },
  data () {
    return {
      day: null,
      endTime: '',
      visibility2: false,
      timeShow: false,
      showSos: false,
      sosTitle: '抱歉，您暂无权限访问此页面！',
      showContainer: false,
      query: {},
      loginUser: {},
      Data: [],
      showPopup1: false,
      clickData: {},
      clickIndex: 0,
      showQrcode: false,
      disList: false,
      showManager: false,
      managerData: [],
      disManagerList: false
    }
  },
  methods: {
    btnClose () {
      this.timeShow = false
    },
    saveSuess (e) {
      const self = this
      self.day = self.$refs.input1.value
      self.$http.post(`${ENV.BokaApi}/api/factory/addFactoryDays`, {
        fid: self.clickData.id, days: self.day
      }).then(function (res) {
        const data = res.data
        if (data.flag === 1) {
          self.timeShow = false
          self.day = ''
          self.$vux.toast.show({
            text: '保存成功！',
            type: 'text',
            width: '200px'
          })
        } else {
          self.timeShow = false
          self.day = ''
          self.$vux.toast.show({
            text: '操作失败！！！',
            type: 'text',
            width: '200px'
          })
        }
      })
    },
    showxdate2 () {
      this.timeShow = true
      this.showPopup1 = false
    },
    getPhoto (src) {
      return this.$util.getPhoto(src)
    },
    handleScroll: function (refname, index) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          if (self.Data.length === (pageStart1 + 1) * limit) {
            pageStart1++
            self.$vux.loading.show()
            self.getData1()
          }
        }
      })
    },
    controlPopup1 (item, index) {
      event.preventDefault()
      this.showPopup1 = !this.showPopup1
      this.clickData = item
      this.clickIndex = index
      let time = new Time(item.endtime * 1000).dateFormat('yyyy-MM-dd hh:mm')
      this.endTime = time
    },
    clickPopup1 () {
      const self = this
      self.showPopup1 = false
      self.showQrcode = true
      self.$vux.loading.show()
      self.$http.get(`${ENV.BokaApi}/api/factory/adminQRCode`, {
        params: {fid: self.clickData.id}
      }).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        if (data.flag === 1) {
          let img = self.$refs.adminQrcode[0] ? self.$refs.adminQrcode[0] : self.$refs.adminQrcode
          img.src = data.data
        } else {
          self.$vux.toast.show({
            text: data.error,
            time: self.$util.delay(data.error)
          })
        }
      })
    },
    clickPopup (key) {
      const self = this
      if (key === 'manager') {
        self.showPopup1 = false
        self.showManager = true
        self.$vux.loading.show()
        self.$http.post(`${ENV.BokaApi}/api/factory/adminList`, {
          fid: self.clickData.id
        }).then(function (res) {
          let data = res.data
          self.$vux.loading.hide()
          self.managerData = data.data ? data.data : data
          self.disManagerList = true
        })
      } else if (key === 'edit') {
        self.$router.push({path: '/addFactory', query: {id: self.clickData.id}})
      } else if (key === 'set') {
        self.$router.push({path: '/factoryAgentFee', query: {id: self.clickData.id}})
      } else if (key === 'retailer') {
        self.$router.push({path: '/sellerList', query: {id: self.clickData.id}})
      } else if (key === 'stat') {
        self.$router.push({path: '/stat', query: {id: self.clickData.id, module: 'factory'}})
      } else if (key === 'bank') {
        let fromPage = encodeURIComponent('/factoryManage')
        self.$router.push({path: '/factoryBank', query: {id: self.clickData.id, control: 'manage', fromPage: fromPage}})
      } else {
        self.showPopup1 = false
      }
    },
    closeQrcode () {
      this.showQrcode = false
    },
    closeManager () {
      this.showManager = false
      this.disManagerList = false
      this.managerData = []
    },
    deleteManager (item, index) {
      const self = this
      self.$vux.confirm.show({
        title: '确定要删除吗？',
        onConfirm () {
          self.$vux.loading.show()
          self.$http.post(`${ENV.BokaApi}/api/factory/delAdmin`, {
            fid: self.clickData.id, uid: item.uid
          }).then(function (res) {
            self.$vux.loading.hide()
            let data = res.data
            if (data.flag) {
              self.managerData.splice(index, 1)
            } else {
              self.$vux.toast.show({
                text: data.error,
                type: 'warning',
                time: self.$util.delay(data.error)
              })
            }
          })
        }
      })
    },
    getData1 () {
      const self = this
      const params = { params: { pagestart: pageStart1, limit: limit } }
      this.$http.get(`${ENV.BokaApi}/api/factory/list`, params)
      .then(res => {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        self.Data = self.Data.concat(retdata)
        self.disList = true
      })
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
        if (!isAdmin) {
          this.$vux.loading.hide()
          self.showSos = true
          self.showContainer = false
        } else {
          self.showSos = false
          self.showContainer = true
          this.$vux.loading.hide()
          this.query = this.$route.query
          if (this.Data.length < limit) {
            this.disList = false
            this.Data = []
            this.$vux.loading.show()
            pageStart1 = 0
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

<style lang="less" scoped>
.rproductlist .scroll_item{overflow:hidden;position:relative;}
.rproductlist .scroll_item .ico{display:none;}
.rproductlist .scroll_item .down.ico{
  display:block;
  position:absolute;right:0;top:0;width:96px;height:25px;line-height:25px;
  background-color:#8a8a8a;color:#fff;text-align:center;font-size: 12px;
  -webkit-transform: translate(30px,5px) rotate(45deg);
  transform: translate(30px,5px) rotate(45deg);
}
.rproductlist .scroll_item .down.ico:after{content:"已下架";}
.rproductlist .btnicon{
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
.rproductlist .l-line{
  width:100%;
  height:8px;
  background:#fff;
}
.rproductlist .s-container{bottom:50px;}
.rproductlist .s-bottom{height: 50px;}
.rproductlist .addproduct{border-radius: 50px;height: 36px;width: 100%;}
.rproductlist .pro_list_top{
  background: url(../assets/images/product_list_top.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-size: 100%;
  height: 20px;
}
.modalarea{
  .modals{padding:20px 20px 10px 20px;box-sizing:border-box;background-color:#fff;border-radius:5px;}
  .btns{padding:3px 25px;font-size:14px;border-radius:5px;text-align:center;color:#fff;}
}
.input-bor{
  border:1px solid #e5e5e5;
}
</style>
