<template>
  <div class="containerarea font14">
    <template v-if="showCenter">
      <center-sales :retailer-info="retailerInfo" :login-user="loginUser" :marquee-data="marqueeData"></center-sales>
    </template>
    <template v-if="showApply">
      <retailer-apply :login-user="loginUser" :after-apply="applySuccess" :class-data="classData"></retailer-apply>
    </template>
  </div>
</template>

<script>
import CenterSales from '@/components/CenterSales'
import RetailerApply from '@/components/RetailerApply'
import ENV from 'env'
import { User } from '#/storage'

export default {
  components: {
    CenterSales, RetailerApply
  },
  data () {
    return {
      showCenter: false,
      showApply: false,
      retailerInfo: {},
      loginUser: {},
      marqueeData: [],
      classData: []
    }
  },
  methods: {
    applySuccess () {
      const self = this
      self.showCenter = true
      self.showApply = false
      self.$vux.loading.hide()
    },
    getData () {
      const self = this
      self.$vux.loading.show()
      self.loginUser = User.get()
      self.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, {
        module: 'retailer', action: 'index'
      }).then(function (res) {
        if (res.status !== 200) {
          self.$vux.loading.hide()
        } else {
          let data = res.data
          if (data.flag === 1) {
            self.showCenter = true
            self.showApply = false
            self.$http.get(`${ENV.BokaApi}/api/retailer/home`).then(function (res) {
              if (res.status === 200) {
                let data = res.data
                self.retailerInfo = data.data ? data.data : data
                self.$vux.loading.hide()
                return self.$http.get(`${ENV.BokaApi}/api/retailer/shareview`)
              }
            }).then(function (res) {
              if (res) {
                let data = res.data
                self.marqueeData = data.data ? data.data : data
              }
            })
          } else {
            self.showCenter = false
            self.showApply = true
            self.$http.get(`${ENV.BokaApi}/api/list/applyclass?ascdesc=asc`,
              { params: { limit: 100 } }
            ).then(function (res) {
              self.$vux.loading.hide()
              if (res.status === 200) {
                let data = res.data
                data = data.data ? data.data : data
                for (let i = 0; i < data.length; i++) {
                  data[i].checked = false
                }
                self.classData = data
              }
            })
          }
        }
      })
    },
    init () {
      this.loginUser = User.get()
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.$vux.loading.show()
      this.getData()
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
.bk-salestop {
  width: 100%;
  height: 130px;
  background-image: url(../assets/images/bannerbg1.png);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  position: relative;
}

.bk-salestop .img-cell{
  padding-left:14px;
  padding-right:14px;
  width:68px;
  height:68px;
}

.bk-salestop .img-cell img{
  display: block;
  width: 68px;
  height: 68px;
  border-radius: 50%;
}
.bk-salestop .header-nav{
  position: relative;
  margin: 0 14px;
  height: 45px;
  background-color: #fff;
  z-index: 2;
  border-radius: 45px;
}
.bk-salestop .nav_icon{
  display: inline-block;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  text-align: center;
  color:white;
}
.bk-salestop .nav_icon01{
  background-color: #ea3a3a
}
.centersales .center-marquee{
  height:30px;
  position:relative;
  padding: 25px 0 15px 0;
  background-color:#fff;
}
.centersales .center-marquee .vux-marquee li{height:30px;}
.centersales .weui-cells:before,.centersales .weui-cells:after{display: none;}
.centersales .weui-cells{margin-top:10px;}
.centersales .weui-cell{padding:10px 18px;}
.centersales .weui-grids{padding: 0px 7px 3px 7px;}
.centersales .weui-grids .weui-grid{border-radius:10px;box-shadow: 0 0 4px 1px rgba(0,0,0,0.15);}
.centersales .weui-grids .gridlist:nth-child(1) .weui-grid{background: linear-gradient(#f2ad3d, #ed9a1e);}
.centersales .weui-grids .gridlist:nth-child(2) .weui-grid{background: linear-gradient(#f25a5c, #ed3939);}
.centersales .weui-grids .gridlist:nth-child(3) .weui-grid{background: linear-gradient(#3fcc86, #34a86c);}
.centersales .weui-grids .gridlist:nth-child(4) .weui-grid{background: linear-gradient(#3eb4f1, #099ded);}
.centersales .weui-grids .gridlist:nth-child(5) .weui-grid{background: linear-gradient(#f25c7d, #ed2d5a);}
.centersales .weui-grids .gridlist:nth-child(6) .weui-grid{background: linear-gradient(#7974f6, #615aec);}
.centersales .weui-grids .gridlist.disabled .weui-grid{background: linear-gradient(#b9b9b9, #afafaf);}
.listitem.disabled {position:relative;background-color:#d8d8d8;}

.icon_hot{
  position: absolute;
  height:40px;
  width:40px;
  right:0px;
  top:0px;
  text-align: center;
  background: linear-gradient(45deg, transparent 50%, #ea3a3a 0%);
  background-size: 100% 100%;
  border-top-right-radius: 10px;
}
.icon_hot:before{
  content:"HOT";
  display:block;
  font-size: 12px;
  color:#fff;
  transform: rotate(45deg);
  position: absolute;
  top: 5px;
  right: 1px;
}
.centersales .weui-grid__icon{width:35px;height:35px;padding-top: 22%;text-shadow: 0px 0px 10px rgba(0,0,0,0.15);}
.centersales .weui-grid__icon i{height:35px;font-size: 34px;display:inline-block;color:#fff;width: 35px;text-align: center;}
.centersales .weui-grid__icon i::before{display: block;height: 35px;line-height: 35px;}
.centersales .bk-grid .weui-grid__label{color:#fff;}
.centersales .weui-grid:before,.centersales .weui-grid:after,.centersales .weui-grids:before,.centersales .weui-grids:after{display: none;}
.centersales  .gridlist{
  width:33.3333%;
  position: relative;
  float: left;
  padding: 0px 5px;
  margin-bottom:20px;
  box-sizing: border-box;
}
.centersales .weui-grid{
  width: 90%;
  height: 0;
  padding-bottom: 90%;
  display: block;
  margin: 0 auto;
  float: none;
  padding-left:0;
  padding-right: 0;
  padding-top: 0;
}
.centersales .weui-grid__icon + .weui-grid__label{margin-top:10%;font-size: 15px;}
@media (max-width:361px) {
  .centersales .weui-grid__icon{padding-top:20%;}
  .centersales .weui-grid__icon + .weui-grid__label{margin-top:5%;font-size: 14px;}
  .centersales .weui-grid__icon i{font-size: 30px;}
}

.bk-salestop .right-cell {
  flex: 1;
  height: 100%;
  position: relative;
}

.bk-salestop .right-cell .right-content {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px 0;
}

.bk-salestop .right-cell .title-area {
  font-size: 18px !important;
  color: #fff;
}

.bk-salestop .right-cell .nav-area{
  position: relative;
}

.bk-salestop .right-cell .btns-area{
  position: absolute;
  right: 20px;
}

.bk-salestop .numicon{
  position: absolute;
  top: -5px;
  right: -8px;
  background: #eb3a3b;
  border-radius: 50%;
  color: #fff;
  font-size: 8pt;
  min-width: 18px;
  min-height:18px;
  line-height: 18px;
  border:1px solid #fff;
  text-align: center;
}
.grid-title {
  background-color: #efeff4;
  color: #716f76;
  padding: 10px 15px;
  font-size: 14px;
}
.bk-grid .weui-grid__label{color:#666;}
.bk-grid .numicon{
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ea3a3a;
  padding:1px;
  border-radius: 50%;
  color: #fff;
  font-size: 8pt;
  min-width: 18px;
  min-height:18px;
  line-height: 18px;
  border:1px solid #fff;
  text-align: center;
}
.bk-grid.disable{color:#a6a6a6 !important;}
.order_list_show .numicon{
  position: absolute;
  top: 11px;
  right: 32px;
  background: #ea3a3a;
  padding:1px;
  border-radius: 50%;
  color: #fff;
  font-size: 8pt;
  min-width: 18px;
  min-height:18px;
  line-height: 18px;
  border:1px solid #fff;
  text-align: center;
}
</style>
