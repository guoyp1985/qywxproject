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
        <div class="form-item bg-white">
          <div class="option-list">
            <div class="option-item" v-for="(item,index) in areaData" :key="index">
                <div class="option-title flex_left">
                  <div class="flex_cell flex_left">地区 {{index + 1}}</div>
                  <div class="w60 flex_right color-theme" @click="deleteData(index)">删除</div>
                </div>
                <div class="option-con">
                  <div class="flex_left con-item">
                    <div class="title-cell1 flex_left">选择地区</div>
                    <div class="border-cell flex_left flex_cell">
                      <select v-model="item.province" class="w_100 h_100">
                        <option v-for="(item,index) in provinceData" :key="index" :value="item.name">{{item.name}}</option>
                      </select>
                    </div>
                  </div>
                  <div class="flex_left mt10 con-item">
                    <div class="title-cell1 flex_left">运费金额</div>
                    <div class="border-cell flex_left flex_cell">
                      <x-input v-model="item.postage" class="input" @keyup="postageChange(index)" type="tel" placeholder="运费金额" maxlength="5" size="5"></x-input>
                    </div>
                    <div class="flex_right" style="width:20px;">元</div>
                  </div>
                </div>
              </div>
          </div>
          <div class="flex_center pt10 pb10" @click="addArea">
            <div class="color-theme btn-add flex_center">添加一项</div>
          </div>
        </div>
      </div>
      <div v-show="(selectedIndex == 1)" class="swiper-inner scroll-container2" ref="scrollContainer2" @scroll="handleScroll('scrollContainer2',1)">
        <div class="form-item bg-white">
          <div class="option-list">
            <div class="option-item" v-for="(item,index) in sendData" :key="index">
                <div class="option-title flex_left">
                  <div class="flex_cell flex_left">地区 {{index + 1}}</div>
                  <div class="w60 flex_right color-theme" @click="deleteSend(index)">删除</div>
                </div>
                <div class="option-con">
                  <div class="flex_left con-item">
                    <div class="title-cell1 flex_left">选择地区</div>
                    <div class="border-cell flex_left flex_cell">
                      <select v-model="item.province" class="w_100 h_100">
                        <option v-for="(item,index) in provinceData" :key="index" :value="item.name">{{item.name}}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          <div class="flex_center pt10 pb10" @click="addSend">
            <div class="color-theme btn-add flex_center">添加地区</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="selectedIndex == 0" class="s-bottom flex_center color-white bg-theme" @click="saveEvent">提交</div>
    <div v-if="selectedIndex == 1" class="s-bottom flex_center color-white bg-theme" @click="saveSend">提交</div>
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
      tabtxts: ['偏远地区', '不派送地区'],
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
        {name: '广东省', value: '450000'},
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
        {name: '新疆维吾尔自治区', value: '650000'}
      ],
      submitIng: false,
      sendData: [],
      postageData: [],
      areaObject: {},
      sendObject: {}
    }
  },
  methods: {
    addArea () {
      this.areaData.push({province: this.provinceData[0].name})
    },
    addSend () {
      this.sendData.push({province: this.provinceData[0].name})
    },
    postageChange (index) {
      let val = event.target.value
      this.areaData[index].postage = val
    },
    deleteData (index) {
      this.$vux.confirm.show({
        content: '确定要删除吗？',
        onConfirm: () => {
          let deleteData = this.areaData[index]
          if (deleteData.id) {
            this.$vux.loading.show()
            this.$http.post(`${ENV.BokaApi}/api/delete/postage`, {
              id: deleteData.id
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
                this.areaData.splice(index, 1)
              }
            })
          } else {
            this.areaData.splice(index, 1)
          }
        }
      })
    },
    deleteSend (index) {
      this.$vux.confirm.show({
        content: '确定要删除吗？',
        onConfirm: () => {
          let deleteData = this.sendData[index]
          if (deleteData.id) {
            this.$vux.loading.show()
            this.$http.post(`${ENV.BokaApi}/api/delete/postage`, {
              id: deleteData.id
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
                this.sendData.splice(index, 1)
              }
            })
          } else {
            this.sendData.splice(index, 1)
          }
        }
      })
    },
    saveEvent () {
      if (this.submitIng) return false
      if (!this.areaData.length) {
        this.$vux.toast.text('请设置运费信息', 'middle')
        return false
      }
      let iscontinue = true
      for (let i = 0; i < this.areaData.length; i++) {
        let curData = this.areaData[i]
        let curProvince = curData.province
        let curPostage = curData.postage
        if (!curProvince || this.$util.trim(curProvince) === '' || !curPostage || this.$util.trim(curPostage) === '') {
          this.$vux.toast.text('请完善运费信息', 'middle')
          iscontinue = false
          break
        }
        if (this.sendObject[curProvince]) {
          this.$vux.toast.text('偏远地区和不派送地区不可重复', 'middle')
          iscontinue = false
          break
        }
        if (isNaN(curPostage) || parseFloat(curPostage) <= 0) {
          this.$vux.toast.text('运费金额必须大于0', 'middle')
          iscontinue = false
          break
        }
      }
      if (!iscontinue) return false
      this.submitIng = true
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/batchAddPostage`, {
        data: this.areaData, type: this.productType, moduleid: this.moduleid, pianyuan: 1
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
              for (let i = 0; i < this.areaData.length; i++) {
                this.areaObject[this.areaData[i].province] = this.areaData[i]
              }
            }
          }
        })
      })
    },
    saveSend () {
      if (this.submitIng) return false
      if (!this.sendData.length) {
        this.$vux.toast.text('请设置运费信息', 'middle')
        return false
      }
      let iscontinue = true
      for (let i = 0; i < this.sendData.length; i++) {
        let curData = this.sendData[i]
        this.sendData[i].postage = -1
        let curProvince = curData.province
        if (!curProvince || this.$util.trim(curProvince) === '') {
          this.$vux.toast.text('请选择不派送地区', 'middle')
          iscontinue = false
          break
        }
        if (this.areaObject[curProvince]) {
          this.$vux.toast.text('偏远地区和不派送地区不可重复', 'middle')
          iscontinue = false
          break
        }
      }
      if (!iscontinue) return false
      this.submitIng = true
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/batchAddPostage`, {
        data: this.sendData, type: this.productType, moduleid: this.moduleid, pianyuan: 0
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
              for (let i = 0; i < this.sendData.length; i++) {
                this.sendObject[this.sendData[i].province] = this.sendData[i]
              }
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
      })
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
      this.areaData = []
      this.sendData = []
      this.getData()
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
}
</style>
