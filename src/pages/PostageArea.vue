/*
* @description: 我的优惠券列表
* @auther: gyp
* @created_date: 2018-10-22
*/
<template>
  <div class="containerarea font14 parea-page">
    <div class="s-topbanner s-topbanner1">
      <div style="height:45px;" class="db-flex top-subscribe-tip">
        <div class="flex_cell h_100 flex_left">
          <i class="al al-gantanhaozhong font20"></i><span>偏远地区和不派送地区，不可重复设置</span>
        </div>
      </div>
      <div class="row">
        <tab v-model="selectedIndex" active-color="#ea3a3a" default-color="#666666">
          <tab-item v-for="(item,index) in tabtxts" :selected="index == selectedIndex" :key="index">{{item}}</tab-item>
        </tab>
      </div>
    </div>
    <div class="s-container s-container1" style="top:90px;bottom:45px;">
      <div v-show="(selectedIndex == 0)" class="swiper-inner scroll-container1">
        <div class="check-list">
          <div :class="`check-item ${areaObject[item.name] || sendObject[item.name] ? 'disabled' : ''} ${item.checked ? 'checked' : ''}`" v-for="(item,index) in listArea" :key="index" @click="clickAreaProvince(item,index)">
            <div class="item-inner">
              <div class="ico al"></div>
              <div>{{item.name}}</div>
            </div>
          </div>
        </div>
        <div class="form-list">
          <div class="form-item flex_left">
            <div class="flex_left pr10">计费标准</div>
            <div class="flex_left flex_cell">
              <select v-model="postStandard" @change="selectChange">
                <option value="0">购买多件只收1件运费</option>
                <option value="1">每满几件递增运费</option>
              </select>
            </div>
          </div>
          <div class="form-item flex_left" v-if="showStandard">
            <div class="flex_left pr10">递增件数</div>
            <div class="flex_left flex_cell">
              <x-input v-model="postAddCount" class="input" type="tel" placeholder="递增件数" maxlength="5" size="5"></x-input>
            </div>
            <div class="flex_right" style="width:20px;">件</div>
          </div>
          <div class="form-item flex_left">
            <div class="flex_left pr10">运费金额</div>
            <div class="flex_left flex_cell">
              <x-input v-model="postPostage" class="input" type="tel" placeholder="运费金额" maxlength="5" size="5"></x-input>
            </div>
            <div class="flex_right" style="width:20px;">元</div>
          </div>
        </div>
        <div class="padding10 flex_center">
          <div class="bg-theme color-white flex_center" style="width:100px;height:35px;border-radius:10px;" @click="addAreaEvent">增加</div>
        </div>
        <div class="flex_left padding10" v-if="areaData.length">
          <div class="flex_left" @click="clickAreaAll">
            <div :class="`check-ico mr5 ${checkedAllArea ? 'checked': ''}`">
              <div class="ico al"></div>
            </div>
            <div>全选</div>
          </div>
          <div class="flex_left">
            <div class="bg-theme color-white flex_center" style="width:100px;height:35px;border-radius:10px;margin-left:20px;" @click="deleteMore">批量删除</div>
          </div>
        </div>
        <div class="form-list">
          <div class="form-item" v-for="(item,index) in areaData" :key="index">
            <div class="flex_left b_bottom_after pb10">
              <div :class="`check-ico mr10 ${item.checked ? 'checked' : ''}`" @click="clickOneArea(item,index)">
                <div class="ico al"></div>
              </div>
              <div class="flex_cell flex_left">{{item.province}}</div>
              <div class="pl10 flex_right color-theme" @click="deleteData(item,index)">删除</div>
            </div>
            <div class="flex_left pt10">
              <div class="flex_left pr10">计费标准</div>
              <div class="flex_left flex_cell">{{standardObject[item.standard]}}</div>
            </div>
            <div class="flex_left" v-if="item.standard == 1">
              <div class="flex_left pr10">递增件数</div>
              <div class="flex_left flex_cell">{{item.addcount}}</div>
            </div>
            <div class="flex_left">
              <div class="flex_left pr10">运费金额</div>
              <div class="flex_left flex_cell">{{item.postage}}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="(selectedIndex == 1)" class="swiper-inner scroll-container2" ref="scrollContainer2" @scroll="handleScroll('scrollContainer2',1)">
        <div class="check-list">
          <div :class="`check-item ${areaObject[item.name] || sendObject[item.name] ? 'disabled' : ''} ${item.checked ? 'checked' : ''}`" v-for="(item,index) in listSend" :key="index" @click="clickSendProvince(item,index)">
            <div class="item-inner">
              <div class="ico al"></div>
              <div>{{item.name}}</div>
            </div>
          </div>
        </div>
        <div class="padding10 flex_center">
          <div class="bg-theme color-white flex_center" style="width:100px;height:35px;border-radius:10px;" @click="addSendEvent">增加</div>
        </div>
        <div class="flex_left padding10" v-if="sendData.length">
          <div class="flex_left" @click="clickSendAll">
            <div :class="`check-ico mr5 ${checkedAllSend ? 'checked': ''}`">
              <div class="ico al"></div>
            </div>
            <div>全选</div>
          </div>
          <div class="flex_left">
            <div class="bg-theme color-white flex_center" style="width:100px;height:35px;border-radius:10px;margin-left:20px;" @click="deleteMore">批量删除</div>
          </div>
        </div>
        <div class="form-list">
          <div class="form-item flex_left" v-for="(item,index) in sendData" :key="index">
            <div :class="`check-ico mr10 ${item.checked ? 'checked' : ''}`" @click="clickOneSend(item,index)">
              <div class="ico al"></div>
            </div>
            <div class="flex_cell flex_left">{{item.province}}</div>
            <div class="w60 flex_right color-theme" @click="deleteData(item,index)">删除</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<i18n>
Add order1:
  zh-CN: 返点客
My orders:
  zh-CN: 我的订单
</i18n>
<script>
import { Tab, TabItem, Swiper, SwiperItem, XTextarea, Group, XButton, TransferDom, Popup, XImg, XInput } from 'vux'
import Time from '#/time'
import ENV from 'env'
import { User } from '#/storage'
export default {
  directives: {
    TransferDom
  },
  components: {
    Tab, TabItem, Swiper, SwiperItem, XTextarea, Group, XButton, Popup, XImg, XInput
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      showApply: false,
      showContainer: false,
      query: {},
      loginUser: {},
      tabtxts: ['偏远地区运费', '不派送地区'],
      productType: 'product',
      moduleid: 0,
      selectedIndex: 0,
      areaData: [],
      provinceData: [
        {name: '北京市', value: '110000'},
        {name: '天津市', value: '120000'},
        {name: '河北省', value: '130000'},
        {name: '山西省', value: '140000'},
        {name: '内蒙古自治区', value: '150000'},
        {name: '辽宁省', value: '210000'},
        {name: '吉林省', value: '220000'},
        {name: '黑龙江省', value: '230000'},
        {name: '上海市', value: '310000'},
        {name: '江苏省', value: '320000'},
        {name: '浙江省', value: '330000'},
        {name: '安徽省', value: '340000'},
        {name: '福建省', value: '350000'},
        {name: '江西省', value: '360000'},
        {name: '山东省', value: '370000'},
        {name: '河南省', value: '410000'},
        {name: '湖北省', value: '420000'},
        {name: '湖南省', value: '430000'},
        {name: '广东省', value: '440000'},
        {name: '广西壮族自治区', value: '450000'},
        {name: '海南省', value: '460000'},
        {name: '重庆市', value: '500000'},
        {name: '四川省', value: '510000'},
        {name: '贵州省', value: '520000'},
        {name: '云南省', value: '530000'},
        {name: '西藏自治区', value: '540000'},
        {name: '陕西省', value: '610000'},
        {name: '甘肃省', value: '620000'},
        {name: '青海省', value: '630000'},
        {name: '宁夏回族自治区', value: '640000'},
        {name: '新疆维吾尔自治区', value: '650000'},
        {name: '臺灣省', value: '710000'},
        {name: '香港特別行政區', value: '810000'},
        {name: '澳門特別行政區', value: '820000'}
      ],
      submitIng: false,
      sendData: [],
      postageData: [],
      areaObject: {},
      sendObject: {},
      listArea: [],
      listSend: [],
      showStandard: false,
      postPostage: '',
      postStandard: 0,
      postAddCount: '',
      checkedArea: [],
      checkedSend: [],
      standardObject: {
        0: '购买多件只收1件运费',
        1: '满几件递增运费'
      },
      checkedAllArea: false,
      checkedAllSend: false
    }
  },
  methods: {
    selectChange () {
      if (parseInt(this.postStandard) === 1) {
        this.showStandard = true
      } else {
        this.showStandard = false
      }
    },
    clickAreaProvince (item, index) {
      if (item.disabled) return false
      if (item.checked) {
        for (let i = 0; i < this.checkedArea.length; i++) {
          if (this.checkedArea[i].name === item.name) {
            this.checkedArea.splice(i, 1)
            break
          }
        }
        item.checked = false
        delete this.areaObject[item.name]
        for (let i = 0; i < this.listSend.length; i++) {
          if (this.listSend[i].name === item.name) {
            let curD = this.listSend[i]
            delete curD.disabled
            this.listSend.splice(i, 1, curD)
            break
          }
        }
      } else {
        this.checkedArea.push(item)
        item.checked = true
        this.areaObject[item.name] = item
        for (let i = 0; i < this.listSend.length; i++) {
          if (this.listSend[i].name === item.name) {
            let curD = this.listSend[i]
            curD.disabled = true
            this.listSend.splice(i, 1, curD)
            break
          }
        }
      }
      this.listArea.splice(index, 1, item)
    },
    clickSendProvince (item, index) {
      if (item.disabled) return false
      if (item.checked) {
        for (let i = 0; i < this.checkedSend.length; i++) {
          if (this.checkedSend[i].name === item.name) {
            this.checkedSend.splice(i, 1)
            break
          }
        }
        item.checked = false
        delete this.sendObject[item.name]
        for (let i = 0; i < this.listArea.length; i++) {
          if (this.listArea[i].name === item.name) {
            let curD = this.listArea[i]
            delete curD.disabled
            this.listArea.splice(i, 1, curD)
            break
          }
        }
      } else {
        this.checkedSend.push(item)
        item.checked = true
        this.sendObject[item.name] = item
        for (let i = 0; i < this.listArea.length; i++) {
          if (this.listArea[i].name === item.name) {
            let curD = this.listArea[i]
            curD.disabled = true
            this.listArea.splice(i, 1, curD)
            break
          }
        }
      }
      this.listSend.splice(index, 1, item)
    },
    clickAreaAll () {
      this.checkedAllArea = !this.checkedAllArea
      for (let i = 0; i < this.areaData.length; i++) {
        this.areaData[i].checked = this.checkedAllArea
        let changeData = this.areaData[i]
        this.areaData.splice(i, 1, changeData)
      }
    },
    clickSendAll () {
      this.checkedAllSend = !this.checkedAllSend
      for (let i = 0; i < this.sendData.length; i++) {
        this.sendData[i].checked = this.checkedAllSend
        let changeData = this.sendData[i]
        this.sendData.splice(i, 1, changeData)
      }
    },
    clickOneArea (item, index) {
      this.checkedAllArea = false
      item.checked = !item.checked
      this.areaData.splice(index, 1, item)
    },
    clickOneSend (item, index) {
      this.checkedAllSend = false
      item.checked = !item.checked
      this.sendData.splice(index, 1, item)
    },
    deleteMore () {
      let delArr = []
      let datas = this.areaData
      if (this.selectedIndex === 1) {
        datas = this.sendData
      }
      for (let i = 0; i < datas.length; i++) {
        let curd = datas[i]
        if (curd.checked) {
          delArr.push({...curd, delindex: i})
        }
      }
      if (!delArr.length) {
        this.$vux.toast.text('请选择要删除的地区', 'middle')
        return false
      }
      this.$vux.confirm.show({
        content: '确定要删除吗？',
        onConfirm: () => {
          this.$vux.loading.show()
          this.$util.taskData({
            data: delArr,
            handleFunction: (d) => {
              return (done) => {
                this.$http.post(`${ENV.BokaApi}/api/delete/postage`, {
                  id: d.id
                }).then((res) => {
                  const data = res.data
                  if (data.flag) {
                    if (this.selectedIndex === 1) {
                      delete this.sendObject[d.province]
                      for (let i = 0; i < this.sendData.length; i++) {
                        if (this.sendData[i].id === d.id) {
                          this.sendData.splice(i, 1)
                        }
                      }
                    } else {
                      delete this.areaObject[d.province]
                      for (let i = 0; i < this.areaData.length; i++) {
                        if (this.areaData[i].id === d.id) {
                          this.areaData.splice(i, 1)
                        }
                      }
                    }
                  }
                })
                done()
              }
            },
            callback: () => {
              this.$vux.loading.hide()
            }
          })
        }
      })
    },
    deleteData (item, index) {
      this.$vux.confirm.show({
        content: '确定要删除吗？',
        onConfirm: () => {
          this.$vux.loading.show()
          this.$http.post(`${ENV.BokaApi}/api/delete/postage`, {
            id: item.id
          }).then((res) => {
            this.$vux.loading.hide()
            let data = res.data
            let error = data.flag ? '删除成功' : data.error
            this.$vux.toast.show({
              text: error,
              type: data.flag ? 'success' : 'warn',
              time: this.$util.delay(error)
            })
            if (data.flag) {
              if (this.selectedIndex === 0) {
                this.areaData.splice(index, 1)
                delete this.areaObject[item.province]
              } else {
                this.sendData.splice(index, 1)
                delete this.sendObject[item.province]
              }
            }
          })
        }
      })
    },
    addAreaEvent () {
      if (!this.checkedArea.length) {
        this.$vux.toast.text('请选择偏远地区', 'middle')
        return false
      }
      if (parseInt(this.postStandard) === 1) {
        if (this.postAddCount === '') {
          this.$vux.toast.text('请输入递增件数', 'middle')
          return false
        }
        if (isNaN(this.postAddCount) || parseFloat(this.postAddCount) <= 0) {
          this.$vux.toast.text('请输入正确的递增件数', 'middle')
          return false
        }
      }
      if (this.postPostage === '') {
        this.$vux.toast.text('请输入运费金额', 'middle')
        return false
      }
      if (isNaN(this.postPostage) || parseFloat(this.postPostage) <= 0) {
        this.$vux.toast.text('运费金额必须大于0', 'middle')
        return false
      }
      if (parseFloat(this.postPostage) > 100000) {
        this.$vux.toast.text('运费金额过大', 'middle')
        return false
      }
      let iscontinue = true
      let postData = []
      for (let i = 0; i < this.checkedArea.length; i++) {
        let curd = this.checkedArea[i]
        if (this.sendObject[curd.name]) {
          this.$vux.toast.show({
            text: '偏远地区和不派送地区不可重复设置',
            type: 'text'
          })
          iscontinue = false
          break
        }
        postData.push({province: curd.name, standard: this.postStandard, addcount: 0, postage: this.postPostage})
      }
      postData = this.areaData.concat(postData)
      if (!iscontinue) return false
      this.submitIng = true
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/batchAddPostage`, {
        data: postData, type: this.productType, moduleid: this.moduleid, pianyuan: 1
      }).then(res => {
        let data = res.data
        this.$vux.loading.hide()
        this.$vux.toast.show({
          text: data.error,
          type: data.flag !== 1 ? 'warn' : 'success',
          time: this.$util.delay(data.error),
          onHide: () => {
            this.submitIng = false
            if (data.flag === 1) {
              this.refreshData()
            }
          }
        })
      })
    },
    addSendEvent () {
      if (!this.checkedSend.length) {
        this.$vux.toast.show({
          text: '请选择不派送地区',
          type: 'text'
        })
        return false
      }
      let iscontinue = true
      let postData = []
      for (let i = 0; i < this.checkedSend.length; i++) {
        let curd = this.checkedSend[i]
        if (this.areaObject[curd.name]) {
          this.$vux.toast.show({
            text: '偏远地区和不派送地区不可重复设置',
            type: 'text'
          })
          iscontinue = false
          break
        }
        postData.push({province: curd.name, addcount: 0, postage: -1})
      }
      if (!iscontinue) return false
      postData = this.sendData.concat(postData)
      this.submitIng = true
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/batchAddPostage`, {
        data: postData, type: this.productType, moduleid: this.moduleid, pianyuan: 0
      }).then(res => {
        let data = res.data
        this.$vux.loading.hide()
        this.$vux.toast.show({
          text: data.error,
          type: data.flag !== 1 ? 'warn' : 'success',
          time: this.$util.delay(data.error),
          onHide: () => {
            this.submitIng = false
            if (data.flag === 1) {
              this.refreshData()
            }
          }
        })
      })
    },
    getData () {
      this.$vux.loading.show()
      let params = {pagestart: 0, limit: 100, type: this.productType, moduleid: this.moduleid}
      this.$http.get(`${ENV.BokaApi}/api/list/postage`, {
        params: params
      }).then(res => {
        const data = res.data
        this.$vux.loading.hide()
        const retdata = data.data ? data.data : data
        for (let i = 0; i < retdata.length; i++) {
          if (retdata[i].postage !== -1 && retdata[i].postage !== '-1' && retdata[i].postage !== '-1.00') {
            this.areaObject[retdata[i].province] = retdata[i]
            this.areaData.push(retdata[i])
          } else {
            this.sendObject[retdata[i].province] = retdata[i]
            this.sendData.push(retdata[i])
          }
        }
        for (let i = 0; i < this.provinceData.length; i++) {
          let curd = this.provinceData[i]
          let curArea = {}
          let curSend = {}
          for (let key in curd) {
            curArea[key] = curd[key]
            curSend[key] = curd[key]
          }
          if (this.sendObject[curd.name]) {
            this.listArea.push({...curArea, disabled: true})
          } else {
            if (this.areaObject[curd.name]) {
              this.listArea.push({...curArea, disabled: true})
            } else {
              this.listArea.push(curArea)
            }
          }
          if (this.areaObject[curd.name]) {
            this.listSend.push({...curSend, disabled: true})
          } else {
            if (this.sendObject[curd.name]) {
              this.listSend.push({...curSend, disabled: true})
            } else {
              this.listSend.push(curSend)
            }
          }
        }
      })
    },
    refreshData () {
      this.checkedArea = []
      this.checkedSend = []
      this.listArea = []
      this.listSend = []
      this.areaObject = {}
      this.sendObject = {}
      this.areaData = []
      this.sendData = []
      this.getData()
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.$vux.loading.show()
      this.loginUser = User.get()
      this.query = this.$route.query
      if (this.query.type) {
        this.productType = this.query.type
      }
      if (this.query.id) {
        this.moduleid = this.query.id
      }
      this.refreshData()
    }
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less" scoped>
.parea-page{
  .option-list{
    .option-item{
      border:#ccc 1px solid;margin-top:10px;
      .option-title{border-bottom:#ccc 1px solid;padding:10px;}
      .option-con{
        padding:10px;
        .con-item:not(:last-child) {margin-bottom:10px;}
        .con-item{
          width:100%;height:30px;
          .title-cell1{width:60px;height:100%;}
          .border-cell{
            border:#ccc 1px solid;height:100%;
            .input{width:100%;height:100%;padding:0 5px;box-sizing: border-box;}
          }
          .icon-cell{
            width:30px;height:100%;
          }
        }
      }
      .option-pic-list{
        .option-pic{width:30px;height:30px;object-fit:cover;}
      }
    }
  }
  .check-list{
    display:flex;flex-wrap:wrap;padding:10px;box-sizing:border-box;
    .check-item{
        padding:5px 10px 5px 0px;display:flex;justify-content:center;align-items:center;
    }
    .check-item.disabled{
      .item-inner{background-color:#d1d1d1;color:#eaeaea;}
      .ico{border-color:#eaeaea;}
    }
    .item-inner{
        border:#ccc 1px solid;border-radius:5px;padding:5px 10px;
        display:flex;justify-content:center;align-items:center;
    }
    .ico{width:10px;height:10px;border:#000 1px solid;margin-right:5px;position:relative;}
    .checked.check-item{
      .ico{background-color:#ff6a61;color:#fff;border-color:#ff6a61;}
      .ico:before{content:"\e778";font-size:10px;width:12px;height:12px;position:absolute;left:-1px;bottom:3px;font-weight:bold;}
    }
    .check-item.disabled.checked{
      .item-inner{background-color:#fff;color:#000;}
    }
  }
  .form-list{
    padding:10px;box-sizing: border-box;
    .form-item:not(:first-child){margin-top:10px;}
    .form-item{
      width: 100%;
      box-sizing: border-box;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
      box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    }
  }
  .check-ico{
    .ico{width:10px;height:10px;border:#000 1px solid;position:relative;}
  }
  .check-ico.checked{
    .ico{background-color:#ff6a61;color:#fff;border-color:#ff6a61;}
    .ico:before{content:"\e778";font-size:10px;width:12px;height:12px;position:absolute;left:-1px;bottom:3px;font-weight:bold;}
  }
}
</style>
