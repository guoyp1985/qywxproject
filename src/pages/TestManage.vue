<template>
  <div class="containerarea bg-page font14 test-manage-page">
    <template v-if="showSos">
      <Sos :title="sosTitle"></Sos>
    </template>
    <template v-if="showContainer">
      <div class="s-container scroll-container" style="top:0px;" ref="scrollContainer" @scroll="handleScroll('scrollContainer', 'product')">
        <template v-if="disList">
          <template v-if="!listData || listData.length == 0">
            <div class="scroll_list">
              <div class="flex_empty">暂无内测功能</div>
            </div>
          </template>
          <template v-else>
            <div class="scroll_list ">
              <router-link :to="{path:'/factory',query:{id:item.id, wid: loginUser.uid}}" class="scroll_item mb10 font14 bg-white db list-shadow " v-for="(item,index) in listData" :key="item.id" style="color:inherit;">
                <div v-if="item.moderate == 0" class="ico down"></div>
            		<div class="t-table bg-white pt10 pb10">
            			<div class="t-cell v_middle pl12">
                    <div class="clamp1 font16 pr10 color-lightgray">{{item.content}}</div>
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
      <div v-transfer-dom>
        <popup class="menuwrap" v-model="showPopup1">
          <div class="popup0">
            <div class="list" v-if="clickData">
              <div class="item" v-if="clickData.status">
                <div class="inner" @click="clickPopup('manager')">内测人员列表</div>
              </div>
              <div class="item" v-if="clickData.status">
                <div class="inner" @click="showxdate2">添加内测人员</div>
              </div>
              <div class="item" v-if="clickData.status">
                <div class="inner" @click="clickPopup('close')">关闭内测功能</div>
              </div>
              <div class="item" v-else>
                <div class="inner" @click="clickPopup('open')">开放内测功能</div>
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
            <div class="popup-top flex_center">【{{clickData.content}}】内测人员</div>
            <div class="popup-middle padding10 border-box">
              <div class="scroll_list" v-if="disManagerList">
                <div v-if="!managerData || managerData.length == 0" class="scroll_item emptyitem flex_center">暂无内测人员</div>
                <div v-else v-for="(item,index) in managerData" :key="item.id" class="scroll_item pt10 pb10 pl12 pr12 bg-white mb10 list-shadow">
                  <div class="t-table">
                    <div class="t-cell v_middle w70">
                      <img class="avatarimg3 imgcover" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
                    </div>
                    <div class="t-cell v_middle">
                      <div class="clamp1 font14 color-lightgray">{{item.linkman}}</div>
                    </div>
                    <div class="t-cell v_middle w60 align_right">
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
              <div class="flex_cell h_100 flex_center bg-red color-white" @click="clickPopup1">添加内测人员</div>
            </div>
          </div>
        </popup>
      </div>
      <div v-transfer-dom class="x-popup">
        <popup v-model="showAddPopup" height="100%">
          <div class="popup1">
            <div class="popup-top flex_center">【{{clickData.content}}】添加内测人员</div>
            <div class="flex_left border-box pl10 pr10" style="position:absolute;left:0;right:0;top:46px;height:40px;">
              <div class="w_100">
                <check-icon class="x-check-icon w_100" :value.sync="checkAll" @click.native.stop="checkAllEvent">
                  <div class="flex_left">全选</div>
                </check-icon>
              </div>
            </div>
            <div ref="scrollCustomer" @scroll="handleScroll('scrollCustomer','customer')" class="popup-middle font14" style="top:85px;bottom:86px;">
              <div class="padding10">
                <div v-if="disUserData" class="scroll_list">
                  <template v-if="!userData.length">
                    <div class="scroll_item emptyitem">
            					<div class="t-table">
            						<div class="t-cell" style="padding:10px;">暂无返点客</div>
            					</div>
            				</div>
                  </template>
                  <check-icon v-else class="x-check-icon scroll_item pt10 pb10" v-for="(item,index) in userData" :key="item.uid" :value.sync="item.checked" @click.native.stop="radioclick1(item,index)">
                    <div class="t-table">
                      <div class="t-cell v_middle w50">
                        <img :src="item.avatar" class="avatarimg imgcover" />
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
              <div class="flex_cell h_100 flex_center bg-gray color-white" @click="closeAdd">{{ $t('Close') }}</div>
              <div class="flex_cell h_100 flex_center bg-green color-white" @click="submitAdd">提交</div>
            </div>
          </div>
        </popup>
      </div>
    </template>
  </div>
</template>

<i18n>
Add factory:
  zh-CN: 添加厂家
</i18n>

<script>
import { Group, Datetime, TransferDom, Popup, Confirm, CheckIcon, XImg, XInput, Search } from 'vux'
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
    Popup, Confirm, CheckIcon, XImg, Sos, Datetime, Group, XInput, Search
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
      listData: [],
      showPopup1: false,
      clickData: {},
      clickIndex: 0,
      showAddPopup: false,
      disList: false,
      showManager: false,
      managerData: [],
      disManagerList: false,
      checkAll: false,
      disUserData: false,
      userData: []
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
    checkAllEvent () {
      for (let i = 0; i < self.customerdata.length; i++) {
        if (self.checkAll) {
          self.customerdata[i].checked = true
        } else {
          delete self.customerdata[i].checked
        }
      }
    },
    handleScroll: function (refname, index) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          if (self.listData.length === (pageStart1 + 1) * limit) {
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
      self.showAddPopup = true
    },
    clickPopup (key) {
      const self = this
      if (key === 'manager') {
        self.showPopup1 = false
        self.showManager = true
        self.$vux.loading.show()
        self.$http.post(`${ENV.BokaApi}/api/Beta/getTestors`, {
          fid: self.loginUser.fid, module: self.clickData.module
        }).then(res => {
          let data = res.data
          self.$vux.loading.hide()
          self.managerData = data.data ? data.data : data
          self.disManagerList = true
        })
      } else if (key === 'close' || key === 'open') {
        self.showPopup1 = false
        let con = (key === 'close') ? '确定要关闭该内测功能吗？' : '确定要开启该内测功能吗？'
        self.$vux.confirm.show({
          content: con,
          onConfirm: () => {
            let newval = (key === 'close') ? 0 : 1
            self.$http.post(`${ENV.BokaApi}/api/Beta/setModuleStatus`, {
              fid: self.loginUser.fid, module: self.clickData.module, status: newval
            }).then(res => {
              let data = res.data
              self.$vux.loading.hide()
              self.$vux.toast.show({
                text: data.error,
                type: data.flag ? 'success' : 'warning',
                time: self.$util.delay(data.error)
              })
              if (data.flag) {
                self.clickData.status = newval
                self.listData[self.clickIndex].status = newval
              }
            })
          }
        })
      } else {
        self.showPopup1 = false
      }
    },
    closeAdd () {
      this.showAddPopup = false
    },
    closeManager () {
      this.showManager = false
      this.disManagerList = false
      this.managerData = []
    },
    submitAdd () {

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
      const params = {fid: this.loginUser.fid, pagestart: pageStart1, limit: limit}
      this.$http.post(`${ENV.BokaApi}/api/Beta/getModules`, params)
      .then(res => {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        self.listData = self.listData.concat(retdata)
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
        if (!isAdmin && !this.loginUser.fid) {
          this.$vux.loading.hide()
          self.showSos = true
          self.showContainer = false
        } else {
          self.showSos = false
          self.showContainer = true
          this.$vux.loading.hide()
          this.query = this.$route.query
          if (this.listData.length < limit) {
            this.disList = false
            this.listData = []
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
.test-manage-page{
  .scroll_item{overflow:hidden;position:relative;}
  .scroll_item .ico{display:none;}
  .scroll_item .down.ico{
    display:block;
    position:absolute;right:0;top:0;width:96px;height:25px;line-height:25px;
    background-color:#8a8a8a;color:#fff;text-align:center;font-size: 12px;
    -webkit-transform: translate(30px,5px) rotate(45deg);
    transform: translate(30px,5px) rotate(45deg);
  }
  .scroll_item .down.ico:after{content:"已下架";}
  .btnicon{
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
  .l-line{
    width:100%;
    height:8px;
    background:#fff;
  }
  .s-container{bottom:50px;}
  .s-bottom{height: 50px;}
  .addproduct{border-radius: 50px;height: 36px;width: 100%;}
  .pro_list_top{
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
}
</style>
