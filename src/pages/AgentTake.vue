selectAddress<!-- /* -->
* @description: 经销商提货页面
* @auther: gyp
* @created_date: 2018-09-08
*/
<template>
  <div id="order-detail" class="containerarea font14 bg-page nobottom agent-take-page">
    <template v-if="showSos">
      <Sos :title="sosTitle"></Sos>
    </template>
    <template v-if="showContainer">
      <div class="pagemiddle" style="top:0;" ref="scrollContainer" @scroll="handleScroll('scrollContainer')">
        <div class="b_top_after bg-white font12">
          <div class="flex_left b_bottom_after padding10">
            <div class="flex_left w70">
              <img style="width:60px;height:60px;border: 1px solid #f7f7f7;" class="imgcover" :src="productInfo.p_photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
            </div>
            <div class="flex_left flex_cell">
              <div class="w_100">
                <div>{{productInfo.p_title}}</div>
                <div v-if="productInfo.poid" class="color-gray font12">规格: {{productInfo.po_title}}</div>
                <div class="mt5 color-gray font12"><span>未提库存: {{productInfo.waitdeliver}}</span><span class="ml5">已提库存: {{productInfo.localstorage}}</span></div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt10 bg-white">
          <div class="padding10 b_bottom_after flex_left">
            <div class="w80 flex_left">提货数量</div>
            <div class="flex_right flex_cell">
              <x-input v-model="takeQuantity" class="w_100 align_right" placeholder="提货数量"></x-input>
            </div>
          </div>
          <div class="padding10 b_bottom_after flex_left" @click="showaddress">
            <div class="w80 flex_left">收货地址</div>
            <div class="flex_right flex_cell" v-if="disAddress">
              <template v-if="!selectAddress || !selectAddress.id"><span class="color-theme">请选择收货地址</span><span class="al al-mjiantou-copy2 font20 color-theme"></span></template>
              <template v-else>{{selectAddress.fulladdress}}</template>
            </div>
          </div>
        </div>
        <div class="flex_center pl12 pr12" style="height:50px;margin-top:20px;">
          <div class="flex_center color-white btn-bottom-red" style="width:80%;" @click="submitEvent">提交申请</div>
        </div>
        <div class="bg-white" style="margin-top:20px;" v-if="recordData.length && selectAddress">
          <div class="padding10 b_bottom_after flex_center bold font16">提货记录</div>
          <div class="scroll_list mt12">
            <div class="scroll_item padding10" v-for="(item, index) in recordData" :key="index">
              <div>收货地址: {{item.address}}</div>
              <div><span>提货数量: </span><span class="color-theme">{{productInfo.localstorage}}件</span><span class="ml5">未提库存: </span><span class="color-theme">{{productInfo.waitdeliver}}</span></div>
              <template v-if="item.dealed">
                <div>状态: 已发货</div>
                <div class="color-gray font12 mt5">发货时间: {{item.dealtime | dateformat}}</div>
              </template>
              <template v-else>
                <div>状态: 待发货</div>
                <div class="color-gray font12 mt5">申请时间: {{item.dateline | dateformat}}</div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </template>
    <div v-transfer-dom class="x-popup">
      <popup v-model="showpopup" height="100%">
        <div class="popup1">
          <div class="popup-top flex_center">选择地址</div>
          <div class="popup-middle font14">
            <div class="scroll_list">
              <template v-if="addressdata.length == 0">
                <div class="scroll_item emptyitem">
                  <div class="t-table">
                    <div class="t-cell" style="padding:10px;">暂无地址信息</div>
                  </div>
                </div>
              </template>
              <div v-else class="list-shadow mt10" v-for="(item,index) in addressdata" :key="item.id">
                <div class="t-table b_bottom_after padding10" @click="clickAddress(item,index)">
                  <div class="t-cell v_middle" style="color:inherit;">
                    <div class="clamp1">{{ item.linkman }} {{ item.telephone}}</div>
                    <div class="clamp1">{{ item.fulladdress }}</div>
                  </div>
                </div>
                <div class="padding10 flex_left">
                  <div class="flex_left flex_cell">
                    <check-icon @click.native.stop="setDefault(item,index)" class="green color-gray2" :value.sync="item.isdefault ? true : false">默认地址</check-icon>
                  </div>
                  <div class="flex_center w80 color-theme" @click="deleteAddress(item,index)">删除</div>
                  <div class="flex_right w80 color-gray" @click="toNewAddress(item)">编辑</div>
                </div>
              </div>
            </div>
          </div>
          <div class="popup-bottom flex_center">
            <div class="h_100 flex_center bg-gray color-white w80" @click="closepopup">{{ $t('Close') }}</div>
            <div @click="toNewAddress" class="flex_cell h_100 flex_center bg-red color-white">新建地址</div>
            <div v-if="!query.from" class="flex_cell h_100 flex_center bg-green color-white" @click="clickWxAddress">使用微信地址</div>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>
<script>
import { Group, Cell, TransferDom, XImg, XButton, XTextarea, Previewer, XInput, Popup, CheckIcon } from 'vux'
import Sos from '@/components/Sos'
import Time from '#/time'
import ENV from 'env'
import { User } from '#/storage'
export default {
  directives: {
    TransferDom
  },
  components: {
    Group, Cell, XImg, XButton, Sos, XTextarea, Previewer, XInput, Popup, CheckIcon
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      showSos: false,
      sosTitle: '采购信息不存在',
      showContainer: false,
      loginUser: {},
      productInfo: {},
      id: 0,
      orderData: {},
      retailerInfo: {},
      special: 0,
      orders: [],
      priceInfos: [],
      userQrCode: '',
      wxCardShow: false,
      query: {},
      clickTxt: '',
      recordData: [],
      recordPageStart: 0,
      limit: 10,
      showpopup: false,
      addressdata: [],
      selectAddress: null,
      submitdata: {},
      takeQuantity: '',
      submitIng: false,
      disAddress: false
    }
  },
  computed: {
    expressInfo () {
      return `${this.expressCompany} ${this.expressNumber}`
    }
  },
  methods: {
    showaddress () {
      this.showpopup = true
    },
    closepopup () {
      this.showpopup = false
    },
    handleAddress () {
      const self = this
      let paramsid = this.query.addressid
      for (let i = 0; i < self.addressdata.length; i++) {
        let a = self.addressdata[i]
        if (paramsid) {
          if (a.id === parseInt(paramsid)) {
            self.selectAddress = a
            self.addressdata[i].checked = true
            break
          }
        } else {
          if (a.isdefault) {
            self.selectAddress = a
            self.addressdata[i].checked = true
            break
          }
        }
      }
      if (!self.selectAddress && self.addressdata.length > 0) {
        self.selectAddress = self.addressdata[0]
        self.addressdata[0].checked = true
      }
      if (self.selectAddress) {
        self.submitdata.addressid = self.selectAddress.id
      }
    },
    toNewAddress (item) {
      console.log('编辑地址')
      let parr = []
      for (let key in this.query) {
        if (key !== 'addressid') {
          parr.push(`${key}=${this.query[key]}`)
        }
      }
      let pstr = parr.join('&')
      let params = this.$util.handleAppParams(this.query, {lasturl: `/addOrder?${pstr}`})
      if (item && item.id) {
        this.$router.push({name: 'tNewAddress', params: {...params, data: item}, query: params})
      } else {
        this.$router.push({path: '/newAddress', query: params})
      }
    },
    deleteAddress (item, index) {
      this.$vux.confirm.show({
        content: '确定要删除该地址吗？',
        onConfirm: () => {
          this.$vux.loading.show()
          this.$http.post(`${ENV.BokaApi}/api/user/address/delete`, {id: item.id})
          .then(res => {
            this.$vux.loading.hide()
            const data = res.data
            this.$vux.toast.show({
              text: data.error,
              type: (data.flag !== 1 ? 'warn' : 'success'),
              time: this.$util.delay(data.error)
            })
            if (data.flag) {
              this.addressdata.splice(index, 1)
              if (this.selectAddress.id === item.id) {
                this.selectAddress = {}
                this.submitdata.addressid = 0
              }
            }
          })
        }
      })
    },
    clickWxAddress () {
      this.showpopup = false
      this.$wechat.ready(() => {
        this.$util.wxAddress((data1, newData) => {
          if (data1.flag) {
            this.addressdata = [newData]
            this.handleAddress()
          }
        })
      })
    },
    clickAddress (data, index) {
      this.selectAddress = data
      this.showpopup = false
    },
    setDefault (item, index) {
      if (this.defaultIng) {
        return false
      }
      this.defaultIng = true
      let newval = item.isdefault ? 0 : 1
      this.$http.post(`${ENV.BokaApi}/api/setModulePara/address`, {
        module: 'address', param: 'isdefault', paramvalue: newval, id: item.id
      }).then(res => {
        const data = res.data
        let error = data.flag ? '成功' : data.error
        this.$vux.toast.show({
          text: error,
          type: data.flag ? 'success' : 'warn',
          time: this.$util.delay(error)
        })
        if (data.flag) {
          this.addressdata[index].isdefault = newval
          if (newval) {
            for (let i in this.addressdata) {
              if (this.addressdata[i].id !== item.id && this.addressdata[i].isdefault) {
                this.addressdata[i].isdefault = 0
                this.$http.post(`${ENV.BokaApi}/api/setModulePara/address`, {
                  module: 'address', param: 'isdefault', paramvalue: 0, id: this.addressdata[i].id
                }).then(res1 => {
                  this.defaultIng = false
                })
              }
            }
          }
        } else {
          this.defaultIng = false
        }
      })
    },
    handleScroll (refname, type) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          if (self.recordData.length === (self.recordPageStart + 1) * self.limit) {
            self.recordPageStart++
            self.$vux.loading.show()
            self.getRecordData()
          }
        }
      })
    },
    toHome () {
      if (this.query.fromapp && ENV.AppHomePage[this.query.fromapp]) {
        this.$wechat.miniProgram.reLaunch({url: ENV.AppHomePage[this.query.fromapp]})
      } else {
        this.$wechat.miniProgram.reLaunch({url: ENV.AppHomePage.default})
      }
    },
    deletephoto () {
      this.servicePhoto = ''
    },
    viewBigImg (photo, index) {
      const self = this
      if (self.$util.isPC()) {
        let refarea = self.$refs[`previewerPhoto-${index}`][0] ? self.$refs[`previewerPhoto-${index}`][0] : self.$refs[`previewerPhoto-${index}`]
        refarea.show(0)
      } else {
        window.WeixinJSBridge.invoke('imagePreview', {
          current: photo,
          urls: [photo]
        })
      }
    },
    toProduct (item) {
      if (this.query.from) {
        this.$wechat.miniProgram.navigateTo({url: `${ENV.MiniRouter.product}?id=${item.pid}&wid=${item.wid}&module=product`})
      } else {
        this.$router.push({path: '/product', query: {id: item.pid, wid: item.wid}})
      }
    },
    textareaChange (refname) {
      let curArea = this.$refs[refname][0] ? this.$refs[refname][0] : this.$refs[refname]
      curArea.updateAutosize()
      setTimeout(function () {
        curArea.updateAutosize()
      }, 50)
    },
    textareaFocus (refname) {
      let curArea = this.$refs[refname][0] ? this.$refs[refname][0] : this.$refs[refname]
      curArea.updateAutosize()
    },
    getRecordData () {
      this.$http.post(`${ENV.BokaApi}/api/agent/dealList`, {
        wid: this.loginUser.uid, fpid: this.productInfo.fpid, poid: this.productInfo.poid
      }).then(res => {
        this.$vux.loading.hide()
        const data = res.data
        let retdata = data.data ? data.data : data
        for (let i in retdata) {
          if (retdata[i].photo && retdata[i].photo !== '') {
            retdata[i].previewerPhoto = this.$util.previewerImgdata([retdata[i].photo])
          }
          if (retdata[i].content && retdata[i].content !== '') {
            retdata[i].content = retdata[i].content.replace(/\n/g, '<br/>')
          }
        }
        this.recordData = this.recordData.concat(retdata)
      })
    },
    submitEvent () {
      if (this.submitIng) return false
      if (this.$util.trim(this.takeQuantity) === '') {
        this.$vux.toast.text('请输入提货数量', 'middle')
        return false
      }
      if (isNaN(this.takeQuantity) || parseFloat(this.takeQuantity) < 0) {
        this.$vux.toast.text('请输入正确的提货数量', 'middle')
        return false
      }
      if (!this.selectAddress || !this.selectAddress.id) {
        this.$vux.toast.text('请选择收货地址', 'middle')
        return false
      }
      let postData = {id: this.query.id, quantity: this.takeQuantity, appid: this.query.appid, addressid: this.selectAddress.id}
      this.submitIng = true
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/agent/applyDeliver`, postData).then(res => {
        this.$vux.loading.hide()
        this.submitIng = false
        const data = res.data
        this.$vux.toast.show({
          text: data.error,
          time: this.$util.delay(data.error),
          onHide: () => {
            if (data.flag) {
              this.refresh()
            }
          }
        })
      })
    },
    getData () {
      const self = this
      self.$http.get(`${ENV.BokaApi}/api/user/address/list`).then(res => {
        if (res) {
          let data = res.data
          let retdata = data.data ? data.data : data
          if (retdata) {
            if (retdata.length) {
              self.addressdata = retdata
              self.handleAddress()
            } else {
              if (!this.query.from) {
                this.$wechat.ready(() => {
                  this.$vux.confirm.show({
                    content: '是否使用微信地址？',
                    onConfirm: () => {
                      this.$util.wxAddress((data1, newData) => {
                        if (data1.flag) {
                          this.addressdata.push(newData)
                          this.handleAddress()
                        }
                      })
                    }
                  })
                })
              }
            }
          }
          this.disAddress = true
        }
      })
      self.showSos = false
      self.showContainer = true
      this.$http.post(`${ENV.BokaApi}/api/agent/AgentProductInfo`, {
        id: this.query.id
      }).then(res => {
        const data = res.data
        if (!data.flag || !data.data) {
          self.sosTitle = data.error
          self.showSos = true
          self.showContainer = false
        } else {
          self.showSos = false
          self.showContainer = true
          const retdata = data.data
          self.productInfo = retdata
          self.getRecordData()
        }
      })
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.loginUser = User.get()
      this.query = this.$route.query
      this.takeQuantity = ''
      this.recordData = []
      this.recordPageStart = 0
      this.getData()
    }
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less">
.agent-take-page{
  .order-service {
    display: flex;
    background-color: #ffffff;
    padding: 10px 2px 10px 10px;
  }
  .order-service:after {
    content: ' ';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
    border-bottom: 1px solid #dfdfdf;
    color: #c7c7c7;
  }
  .seller-cell {
    overflow: hidden;
  }
  .contact-cell {
    width : 180px;
    display: flex;
  }
  .order-service,
  .ol-contact,
  .wx-contact {
    position: relative;
  }
  .seller-cell,
  .ol-contact,
  .wx-contact {
    flex: 1;
  }
  .ol-contact,
  .wx-contact {
    text-align: center;
  }
  .seller-cell span,
  .contact-cell span {
    vertical-align: middle;
  }
  .ol-contact:after {
    content: ' ';
    position: absolute;
    right: 0;
    top: 0;
    width: 1px;
    bottom: 0;
    border-right: 1px solid #dfdfdf;
    color: #dfdfdf;
  }
  /* vui css hack */
  .shipping-address:before {
    height: 0;
    border-top: none;
  }
  .shipping-card .weui-cell {
    padding: 5px 10px 0px 0px
  }
  .shipping-card .weui-cells{
    padding:5px 0 10px 0
  }
  .express-info .weui-cell__ft{
    font-size: 12px;
  }
  .weui-cells {
    margin-top: 10px !important;
  }
  .vux-cell-primary {
    padding-left: 10px;
  }
  .vux-label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 80%;
  }
}
</style>
