<template>
  <div class="containerarea bg-page font14 s-havebottom frproductlist">
    <template v-if="showSos">
      <Sos :title="sosTitle"></Sos>
    </template>
    <template v-if="showContainer">
      <div class="s-container scroll-container" style="top:0px;" ref="scrollContainer" @scroll="handleScroll('scrollContainer', 'product')">
        <template v-if="disproductdata">
          <template v-if="!productdata || productdata.length == 0">
            <div class="scroll_list">
              <div class="emptyitem">
                <div class="t-table" style="padding-top:20%;">
                  <div class="t-cell padding10">
                    <i class="al al-chuangjianxiangmu" style="font-size:60px;"></i>
                    <div class="align_center">竟然一个商品也没有！</div>
                    <div class="align_center">及时添加商品卖家才可以帮你带来更多销量哦</div>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="scroll_list ">
              <div @click="toFactoryProduct(item)" class="scroll_item mb10 font14 bg-white db list-shadow " v-for="(item,index) in productdata" :key="index" style="color:inherit;">
                <!-- <div v-if="item.moderate == 0 || (clickdata.fromfid && clickdata.originmoderate == 0)" class="ico down"></div> -->
                <div v-if="item.isshow == 0" class="ico down"></div>
            		<div class="t-table bg-white pt10 pb10">
            			<div class="t-cell pl12 v_middle" style="width:110px;">
                    <img class="imgcover v_middle" :src="getPhoto(item.photo)" style="width:100px;height:100px;" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
                  </div>
            			<div class="t-cell v_middle">
                    <div class="clamp1 font16 pr10 color-lightgray"><span class="color-theme" v-if="item.fromfid">【货源】</span><span>{{item.title}}</span></div>
                    <div class="t-table pr12 border-box mt15">
                      <div class="t-cell color-999 font14">
                        <div class="clamp1">售价:<span class="color-red"> {{ $t('RMB') }}{{ item.price }}</span></div>
                        <div class="clamp1">
                            <span class="v_middle db-in">库存: {{ item.storage }}{{item.unit}}</span>
                            <span class="v_middle db-in ml5">已售: {{ item.truesaled }}{{item.unit}}</span>
                        </div>
                        <div class="font12" v-if="item.fromfid">
                          <template v-if="factoryInfo.agentid">
                            <span>平台佣金:</span><span class="color-red"> {{ $t('RMB') }}{{ item.agentrebate }}</span>
                          </template>
                          <template v-else>
                            <span>利润空间:</span><span class="color-red"> {{ $t('RMB') }}{{ item.lirun }}</span>
                          </template>
                        </div>
                        <!-- <div class="clamp1 mt5">
                            <span class="v_middle db-in">销售佣金: {{ item.salesrebate }}</span>
                            <span class="v_middle db-in ml5">推荐佣金: {{ item.superrebate }}</span>
                        </div> -->
                      </div>
                    </div>
            			</div>
            		</div>
              </div>
            </div>
          </template>
        </template>
      </div>
      <div class="s-bottom flex_center pl12 pr12 list-shadow02 bg-white">
        <div class="flex_cell flex_center">
          <div class="bg-red flex_center color-white" style="width:85%;border-radius:50px;height:35px;" @click="toAdd">{{ $t('Add product') }}</div>
        </div>
      </div>
    </template>
  </div>
</template>

<i18n>
</i18n>

<script>
import { TransferDom, Popup, Confirm, CheckIcon, XImg, XInput } from 'vux'
import ENV from 'env'
import { User } from '#/storage'
import Sos from '@/components/Sos'
import TipLayer from '@/components/TipLayer'

let pageStart1 = 0
const limit = 10

export default {
  directives: {
    TransferDom
  },
  components: {
    Popup, Confirm, CheckIcon, XImg, Sos, TipLayer, XInput
  },
  data () {
    return {
      showSos: false,
      sosTitle: '抱歉，您暂无权限访问此页面！',
      showContainer: false,
      query: {},
      loginUser: {},
      productdata: [],
      disproductdata: false,
      Fid: 0,
      factoryInfo: {}
    }
  },
  watch: {
    productdata: function () {
      return this.productdata
    }
  },
  methods: {
    toFactoryProduct (item) {
      if (item.fromfid) {
        let params = this.$util.handleAppParams(this.query, {id: item.id, fid: this.Fid, module: 'fpimport'})
        this.$router.push({path: '/fpimportProduct', query: params})
      } else {
        let params = this.$util.handleAppParams(this.query, {id: item.moduleid, fid: this.Fid, frompage: 'manager'})
        this.$router.push({path: '/factoryProduct', query: params})
      }
    },
    toAdd () {
      let params = this.$util.handleAppParams(this.query, {fid: this.Fid})
      this.$router.push({path: '/addFactoryRetailerProduct', query: params})
    },
    getPhoto (src) {
      return this.$util.getPhoto(src)
    },
    handleScroll: function (refname, type) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          if (type === 'product') {
            if (self.productdata.length === (pageStart1 + 1) * limit) {
              pageStart1++
              self.$vux.loading.show()
              self.getData1()
            }
          }
        }
      })
    },
    getData1 () {
      const self = this
      const params = { fid: self.Fid, pagestart: pageStart1, limit: limit, from: 'myupload' }
      this.$http.get(`${ENV.BokaApi}/api/list/fpimport`, {
        params: params
      })
      .then(res => {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        self.productdata = self.productdata.concat(retdata)
        self.disproductdata = true
      })
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      const self = this
      this.loginUser = User.get()
      if (this.loginUser) {
        this.$vux.loading.show()
        // let isAdmin = false
        // for (let i = 0; i < self.loginUser.usergroup.length; i++) {
        //   if (self.loginUser.usergroup[i] === 1) {
        //     isAdmin = true
        //     break
        //   }
        // }
        if (!self.loginUser.subscribe) {
          this.$vux.loading.hide()
          self.showSos = true
          self.showContainer = false
        } else {
          self.showSos = false
          self.showContainer = true
          // this.$vux.loading.hide()
          this.query = this.$route.query
          if (this.query.fid) {
            this.Fid = this.query.fid
          } else {
            this.Fid = this.loginUser.fid
          }
          this.disproductdata = false
          this.productdata = []
          this.$vux.loading.show()
          pageStart1 = 0
          this.getData1()
        // this.$http.post(`${ENV.BokaApi}/api/common/getBankNames`).then(res => {
        //   const data = res.data
        //   this.cardList = data.data ? data.data : data
        //   return this.$http.get(`${ENV.BokaApi}/api/factory/info`, {
        //     params: {fid: this.Fid}
        //   })
        // }).then((res) => {
        //   let data = res.data
        //   let retdata = data.data ? data.data : data
        //   this.factoryInfo = retdata
        //   for (let key in this.submitData) {
        //     this.submitData[key] = this.factoryInfo[key]
        //   }
        // })
        }
      }
    },
    clearValue () {

    }
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less" scoped>
.frproductlist .scroll_item{overflow:hidden;position:relative;}
.frproductlist .scroll_item .ico{display:none;}
.frproductlist .scroll_item .down.ico{
  display:block;
  position:absolute;right:0;top:0;width:96px;height:25px;line-height:25px;
  background-color:#8a8a8a;color:#fff;text-align:center;font-size: 12px;
  -webkit-transform: translate(30px,5px) rotate(45deg);
  transform: translate(30px,5px) rotate(45deg);
}
.frproductlist .scroll_item .down.ico:after{content:"已下架";}
.frproductlist .btnicon{
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
.frproductlist .l-line{
  width:100%;
  height:8px;
  background:#fff;
}
.frproductlist .s-container{bottom:50px;}
.frproductlist .s-bottom{height: 50px;}
.frproductlist .addproduct{border-radius: 50px;height: 36px;width: 100%;}
.frproductlist .pro_list_top{
  background: url(../assets/images/product_list_top.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-size: 100%;
  height: 20px;
}
.bank-pop{
  .box-area{
    padding:10px;box-sizing:border-box;
    .box-inner{
      padding-left:10px;padding-bottom:10px;box-sizing:border-box;position:relative;
      .title:before{
        content:'';width:6px;height:6px;border-radius:50%;background-color:#ff6a61;
        position:absolute;left:-10px;top:50%;margin-top:-3px;
      }
      .title{color:#ff6a61;font-size:18px;font-weight:bold;position:relative;}
    }
  }
}

</style>
