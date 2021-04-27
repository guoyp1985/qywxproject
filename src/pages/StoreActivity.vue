<style lang="less">
.store-activity-page{
  width:100%;height:100%;padding-bottom:40px;box-sizing: border-box;overflow-y:auto;
  background:linear-gradient(#f78853, #f6536e);
  .top-box{
    background-color:#f5f9fe;text-align:left;padding:10px;box-sizing: border-box;position:relative;
    .avatar{width:80px;height:80px;border-radius:50%;margin-right:10px;}
    .txt{font-size:16px;font-weight:bold;}
  }
  .qy-tab{
    width:100%;box-sizing: border-box;display:flex;
    .tab-item{
      flex:1;font-size:16px;
      display:flex;justify-content: center;align-items: center;
      .inner{
        width:80%;height:30px;background-color:#659af2;color:#fff;border-radius:5px;
        display:flex;justify-content: center;align-items: center;
      }
    }
  }
  .qrcode-area{
    padding:10px;box-sizing: border-box;
    .pic-outer{
      display:flex;justify-content: center;align-items: center;
      .pic{
        display:block;width:80%;position:relative;
        .img{width:100%;}
        .qrcode{
          position:absolute;right:0;bottom:0;width:30%;z-index:1;
        }
      }
    }
  }
  /*
  .pic-list{
    width:100%;
    .pic-item:not(:first-child){}
    .pic-item{
      display:flex;justify-content:flex-start;align-items:center;
      padding:10px;position:relative;
      .pic{
        width:100%;padding-bottom:55.5555%;box-sizing:border-box;position:relative;overflow:hidden;
        border-radius:10px;
        img{
          position:absolute;left:0;right:0;top:0;bottom:0;object-fit:cover;
          border-radius:10px;width:100%;
        }
      }
      .txt{
        position:absolute;left:0;bottom:0;right:0;height:50px;
        background-color:rgba(0,0,0,0.5);z-index:1;color:#fff;
        padding:0 10px;box-sizing: border-box;
        border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;
      }
    }
  }
  */
  .btn-share{
    background-color:#fff;border-radius:30px;padding:10px 15px;font-size:16px;
    color:#f6536e;font-weight:bold;box-sizing:border-box;
  }
  .txt-list{
    padding:0 10px;box-sizing: border-box;
    .txt-item:not(:last-child):after{
      content:"";display:block;
    	background-color:#ddd;height:1px;overflow:hidden;
    	position: absolute;left: 0;right: 0;bottom:0px;
    	-webkit-transform: scaleY(0.5) translateY(0.5px);
    	transform: scaleY(0.5) translateY(0.5px);
    	-webkit-transform-origin: 0% 0%;
    	transform-origin: 0% 0%;
    }
    .txt-item{
      display:flex;padding:10px 0;position:relative;
      .cell1{flex:1;}
      .cell2{
        margin-left:5px;
        .btn{
          width:50px;height:25px;box-sizing: border-box;
          display:flex;justify-content: center;align-items: center;
        }
      }
    }
  }
  .btn-apply{
    background-color:#659af2;color:#fff;border-radius:5px;
    padding:0 10px;height:25px;
    display:flex;justify-content: center;align-items: center;
  }
  .card-area{
    position:relative;padding:10px;box-sizing: border-box;
    background-color:#eb6b5e;color:#fff;
  }
  .card-area:before{
    content:'';display:block;width:20px;height:20px;border-radius:50%;background-color:#f5f9fa;
    position:absolute;left:-10px;top:50%;margin-top:-10px;
  }
  .card-area:after{
    content:'';display:block;width:20px;height:20px;border-radius:50%;background-color:#f5f9fa;
    position:absolute;right:-10px;top:50%;margin-top:-10px;
  }

  .top-txt1{
    width:100%;padding-top:10px;display:flex;justify-content:center;align-items:center;
    .txt{position:relative;padding:0 20px;font-size:30px;color:#fff;font-weight:bold;letter-spacing:4px;}
    .txt:before,.txt:after{
      content:'';display:block;width:10px;height:10px;background-color:#fff;border-radius:50%;
      position:absolute;top:50%;margin-top:-5px;
    }
    .txt:before{left:0;}
    .txt:after{right:0;}
  }
  .top-txt2{
    display:flex;justify-content:center;align-items:center;
    margin-top:10px;font-size:60px;font-weight:bold;color:#fff;letter-spacing:4px;
    /*text-shadow: 5px 5px 5px #FF0000;*/
    text-shadow: 0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777, 0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333, 0px 8px 7px #001135;
  }
  .top-txt3{
    width:100%;margin-top:-10px;display:flex;justify-content:center;align-items:center;
    .inner{position:relative;padding:0 20px;}
    .txt{
      color:#fff;letter-spacing:2px;padding:0 15px;font-size:22px;
    }
    .line:before,.line:after{
      content:'';display:block;width:20px;height:2px;background-color:#fff;border-radius:2px;
      position:absolute;top:50%;margin-top:-1px;
    }
    .line:before{left:0;}
    .line:after{right:0;}
  }
  .con-box{
    width:85%;margin:20px auto 0;background-color:#fff;
    border-radius:20px;padding:20px 0;box-sizing: border-box;
    .card-box{
      width:100%;padding:10px;box-sizing:border-box;position:relative;
      /*background: linear-gradient(135deg, #ea5976 0%, #f7d961 100%);*/
      background: linear-gradient(to right,#ea5976, #f7d961);
      display:flex;
    }
    .card-box:before, .card-box:after {
      content: "";
      position: absolute;
      top: -20px;
      display: block;
      width: 10px;
      height: 100%;
      margin-top: 20px;
      background-size: 20px 10px;
    }
    .card-box:before {
      left: -8px;
      background-color: #fff;
      background-position: 100% 35%;
      background-image: linear-gradient(-45deg, #ea5976 25%, transparent 25%, transparent),
                      linear-gradient(-135deg, #ea5976 25%, transparent 25%, transparent),
                      linear-gradient(-45deg, transparent 75%, #ea5976 75%),
                      linear-gradient(-135deg, transparent 75%, #ea5976 75%);
    }
    .card-box:after {
      right: -9px;
      background-color: #f7d961;
      background-position: 100% 15%;
      background-image: linear-gradient(-45deg, #fff 25%, transparent 25%, transparent),
                     linear-gradient(-135deg, #fff 25%, transparent 25%, transparent),
                     linear-gradient(-45deg, transparent 75%, #fff 75%),
                     linear-gradient(-135deg, transparent 75%, #fff 75%);
    }
    .cell1{
      background-color:#fff;border-radius:10px;color:#ea5976;
      .txt1{font-weight:bold;margin-left:10px;}
      .txt2{font-size:30px;font-weight:bold;}
      .txt3{font-size:12px;margin-left:10px;}
    }
    .radius{
      margin-left:10px;width:50px;height:50px;border-radius:50%;background-color:#fff;
      font-size:28px;color:#ea5976;font-weight:bold;
      display:flex;justify-content: center;align-items: center;
    }
  }
  .title-box{
    width:70%;height:35px;margin:10px auto 0;display:flex;justify-content: center;align-items: center;
    background:linear-gradient(#fcc836, #f8851a);letter-spacing: 4px;color:#fff;
    border-radius:60px;font-size:16px;font-weight:bold;
  }
  .pic-list{
    width:100%;overflow-x:auto;overflow-y:hidden;
    display:flex;
    .pic-item:not(:first-child){margin-left:10px;}
    .pic-item{
      width:100px;background-color:#fffdf0;padding:10px;box-sizing:border-box;
      border-radius:10px;box-shadow: 0 2px 4px 0 rgba(255, 253, 240, 0.07);
      .pic{
        box-sizing:border-box;margin-bottom:5px;
        img{
          width:80px;height:80px;object-fit:cover;display:block;
          border:#ecdbcb 2px solid;box-sizing:border-box;border-radius:50%;
        }
      }
      .txt{color:#ff8388;font-size:12px;font-weight:bold;}
    }
  }
  .new-area{
    .line{
      position:relative;padding:10px;box-sizing: border-box;
      background-color:#fff;color:#fff;margin-top:20px;
      display:flex;justify-content: center;align-items: center;
    }
    .line:before{
      content:'';display:block;width:20px;height:20px;border-radius:50%;background-color:#f66068;
      position:absolute;left:-10px;top:50%;margin-top:-10px;
    }
    .line:after{
      content:'';display:block;width:20px;height:20px;border-radius:50%;background-color:#f66068;
      position:absolute;right:-10px;top:50%;margin-top:-10px;
    }
    .line-boder{width:100%;height:1px;border-top:#ffd2c4 1px dashed;}
    .txt-area{
      padding:20px 20px 0;color:#dd6878;
    }
  }
  .qrcode{width:80px;height:80px;object-fit: cover;margin-left:10px;display:block;}
  .pic-swiper:after{content:"";padding-top:100%;display:block;}
  .pic-swiper{
    overflow:inherit;
    box-sizing: border-box;width:100%;max-height:375px;
    .img{border-radius:10px;}
    .qrcode{
      position:absolute;right:0;bottom:0;width:30%;z-index:1;
    }
    .ico{
      width:80px;height:80px;border-radius:50%;background-color:#f94929;color:#fff;
      display:flex;justify-content:center;align-items:center;
      position:absolute;left:50%;margin-left:-40px;top:50%;margin-top:-40px;
    }
    .txt{
      position:absolute;left:0;bottom:0;width:70%;padding:5px;box-sizing: border-box;font-size:14px;
      background-color:rgba(0,0,0,0.5);color:#fff;border-top-right-radius:10px;
    }
    .vux-swiper{
      position:absolute !important;left:0;top:0;right:0;bottom:0;height:100% !important;
    }
    .vux-indicator{
      width:281px;margin-right:-140.5px;transform: translateX(0);
      bottom:-40px;
    }
    .vux-indicator > a{margin-left:0px;}
    .vux-indicator > a:not(:first-child){margin-left:6px;}
    .vux-indicator > a > .vux-icon-dot{
      width:35px;height:35px;border-radius:50%;font-style:normal;
      display:flex;justify-content: center;align-items: center;
      background-color:transparent !important;
    }
    .vux-indicator > a > .vux-icon-dot.active{background-color:transparent !important;color:#f94929;}
    /*
    .vux-indicator > a > .vux-icon-dot.active{background-color:#f94929 !important;color:#fff;}
    .vux-indicator a:nth-child(1) .vux-icon-dot:after{content: '1';}
    .vux-indicator a:nth-child(2) .vux-icon-dot:after{content: '2';}
    .vux-indicator a:nth-child(3) .vux-icon-dot:after{content: '3';}
    .vux-indicator a:nth-child(4) .vux-icon-dot:after{content: '4';}
    .vux-indicator a:nth-child(5) .vux-icon-dot:after{content: '5';}
    .vux-indicator a:nth-child(6) .vux-icon-dot:after{content: '6';}
    .vux-indicator a:nth-child(7) .vux-icon-dot:after{content: '7';}
    */
    .vux-indicator a:nth-child(1) .vux-icon-dot:after{content: '周一';font-size:12px;}
    .vux-indicator a:nth-child(2) .vux-icon-dot:after{content: '周二';font-size:12px;}
    .vux-indicator a:nth-child(3) .vux-icon-dot:after{content: '周三';font-size:12px;}
    .vux-indicator a:nth-child(4) .vux-icon-dot:after{content: '周四';font-size:12px;}
    .vux-indicator a:nth-child(5) .vux-icon-dot:after{content: '周五';font-size:12px;}
    .vux-indicator a:nth-child(6) .vux-icon-dot:after{content: '周六';font-size:12px;}
    .vux-indicator a:nth-child(7) .vux-icon-dot:after{content: '周日';font-size:12px;}
  }
}
</style>
<template>
  <div class="store-activity-page">
    <div class="top-txt1">
      <div class="txt">顾湘餐饮</div>
    </div>
    <div class="top-txt2">新人送菜</div>
    <!-- <div class="top-txt3">
      <div class="inner">
        <div class="line"></div>
        <div class="txt">老客送券</div>
      </div>
    </div> -->
    <div class="con-box">
      <!-- <div class="pl20 pr20" v-if="isOld">
        <div class="card-box">
          <div class="flex_cell cell1 flex_left">
            <div class="w_100 db-flex">
              <div class="txt1">￥<span class="txt2">{{cardInfo.money}}</span></div>
              <div class="txt3 flex_left flex_cell">
                <div>
                  <div>满{{cardInfo.ordermoney}}元可用</div>
                  <div>{{cardInfo.date}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex_right cell2">
            <div class="radius">券</div>
          </div>
        </div>
      </div> -->
      <div class="title-box" style="letter-spacing:1px;">新客免费送</div>
      <div class="mt20 pl20 pr20" style="box-sizing:border-box;padding-bottom:20px;" v-if="disProduct">
        <swiper
          class="pic-swiper notitle"
          dots-position="center"
          :auto="1==1"
          :interval=6000
          :show-dots="1==1"
          :aspect-ratio="1/1"
          loop>
          <swiper-item v-for="(item,index) in productData" :key="item.id">
            <img class="img db imgcover w_100 h_100" :src="item.photo" default-src="https://tosqy.boka.cn/images/nopic.jpg" />
            <img v-if="qrcode && qrcode != ''" class="qrcode" :src="qrcode" />
            <div class="ico">免费送</div>
            <div class="txt">
              <div class="clamp1">{{item.title}}</div>
              <div style="color:#f94929;font-weight:bold;">￥{{item.price}}</div>
            </div>
          </swiper-item>
        </swiper>
      </div>
      <div class="new-area" v-if="isNew">
        <div class="line">
          <div class="line-boder"></div>
        </div>
        <div class="txt-area flex_left">
          <div class="flex_left">
            <div>
              <div class="font18 bold" v-if="qrcode && qrcode != ''">长按二维码加专属客服免费领菜</div>
              <div class="font12">{{storeInfo.address}}</div>
            </div>
          </div>
          <div class="flex_right" v-if="qrcode && qrcode != ''">
            <img class="qrcode" :src="qrcode" />
          </div>
        </div>
      </div>
      <div class="new-area" v-else>
        <div class="line">
          <div class="line-boder"></div>
        </div>
        <div class="txt-area flex_left font12">{{storeInfo.address}}</div>
      </div>
    </div>
    <div class="padding20 flex_center">
      <div class="btn-share" @click="clickShare">告诉朋友，一起薅老板羊毛</div>
    </div>
    <div class="pl10 pr10 mt10" v-if="loadStore">
      <div class="box-outer">
        <!-- <div class="box-title">{{storeInfo.address}}</div> -->
        <div style="width:100%;height:300px;" id="dituContent"></div>
      </div>
    </div>
    <div v-transfer-dom class="x-popup">
      <popup v-model="showShareModal" height="100%" class="share-modal">
        <div class="popup1 h_100" @click="clickShareModal">
    			<div class="ico"><i class="al al-feiji"></i></div>
    			<div class="txt">点击<span class="al al-asmkticon0165"></span>，分享给朋友吧！</div>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import {TransferDom, Popup, Swiper, SwiperItem} from 'vux'
import ENV from 'env'
import BMap from 'BMap'
import {User} from '#/storage'
export default {
  directives: {TransferDom},
  components: {Popup, Swiper, SwiperItem},
  data () {
    return {
      query: {},
      loginUser: {},
      afterLoad: false,
      isNew: false,
      isOld: false,
      AppGhId: ENV.AppGhId,
      showShareModal: false,
      disList: false,
      listData: [],
      disProduct: false,
      productData: [],
      isWx: false,
      isQywx: false,
      cardInfo: {},
      cardSet: {},
      qrcode: '',
      todayProduct: null,
      weappPath: ENV.MiniPage.store,
      weekObject: {0: '周一', 1: '周二', 2: '周三', 3: '周四', 4: '周五', 5: '周六', 6: '周日'},
      storeInfo: {},
      shareParams: {},
      shareWid: 0,
      // markerArr: [{title: '顾湘中关村店', content: '顾湘餐饮中关村店', point: '116.317866|39.985317', isOpen: 0, icon: {w:21,h:21,l:0,t:0,x:6,lb:5}}],
      markerArr: [],
      map: {},
      loadStore: false
    }
  },
  methods: {
    handleLaunchFn (e) {
      console.log(e)
    },
    handleErrorFn (e) {
      console.log('fail', e.detail)
    },
    toCard () {
      this.$router.push('/userCard')
    },
    clickShare () {
      this.showShareModal = true
    },
    clickShareModal () {
      this.showShareModal = false
    },
    handleShare () {
      let shareLink = `${ENV.Host}/#/storeActivity?storeid=${this.query.storeid}&tableid=${this.query.tableid}&share_uid=${this.loginUser.uid}`
      if (this.shareWid && this.shareWid !== '') {
        shareLink = `${shareLink}&wid=${this.shareWid}`
      }
      this.shareParams = {
        title: '新客送菜 老客有礼',
        desc: '新客送菜 老客有礼',
        photo: this.todayProduct.photo,
        link: shareLink
      }
      if (this.query.share_uid) {
        this.shareParams.link = `${this.shareParams.link}&lastshareuid=${this.query.share_uid}`
        this.shareParams.lastshareuid = this.query.share_uid
      }
      this.$util.handleWxShare(this.shareParams)
    },
    getData () {
      this.$http.get(`${ENV.BokaApi}/api/tableindex/index`, {
        params: {storeid: this.query.storeid, tableid: this.query.tableid}
      }).then(res => {
        let data = res.data
        if (data.code === 0) {
          let retdata = data.data
          if (retdata.prestoresetting) {
            this.listData = retdata.prestoresetting
            this.disList = true
          }
          if (retdata.sendproducts) {
            let sendproducts = retdata.sendproducts
            for (let i = 0; i < sendproducts.length; i++) {
              sendproducts[i].week = this.weekObject[i]
              if (sendproducts[i].selected) {
                this.todayProduct = sendproducts[i]
              }
            }
            this.productData = sendproducts
            this.disProduct = true
          }
          if (retdata.card) {
            this.cardInfo = retdata.card
          }
          if (retdata.cardsetting) {
            retdata.cardsetting.content = retdata.cardsetting.content.replace(/\n/g, '<br />')
            this.cardSet = retdata.cardsetting
          }
          if (retdata.qrcode) this.qrcode = retdata.qrcode
          if (retdata.storeinfo) {
            this.storeInfo = retdata.storeinfo
            this.loadStore = true
            this.markerArr = [{
              title: this.storeInfo.title,
              content: this.storeInfo.address,
              point: `${this.storeInfo.longitude_bd}|${this.storeInfo.latitude_bd}`,
              isOpen: 1,
              icon: {w: 21, h: 21, l: 0, t: 0, x: 6, lb: 5}
            }]
            setTimeout(() => {
              this.initMap() // 创建和初始化地图
            }, 500)
          }
          this.handleShare()
        }
      })
    },
    initData () {
      this.showShareModal = false
      this.afterLoad = false
      this.isNew = false
      this.isOld = false
      this.isWx = false
    },
    refresh () {
      this.query = this.$route.query
      this.weappPath = `${this.weappPath}.html?storeid=${this.query.storeid}&tableid=${this.query.tableid}`
      console.log(this.weappPath)
      this.loginUser = User.get()
      this.initData()
      this.afterLoad = true
      this.isWx = this.$util.isWx()
      this.isQywx = this.$util.isQywx()
      if (this.isQywx) {
        this.shareWid = this.loginUser.uid
      } else {
        if (this.query.wid) {
          this.shareWid = parseInt(this.query.wid)
        } else if (this.loginUser.ownid) {
          this.shareWid = this.loginUser.ownid
        }
      }
      if (!this.loginUser.identity) {
        this.isNew = true
      } else {
        this.isOld = true
      }
      this.getData()
    },
    initMap () {
      this.createMap() // 创建地图
      this.setMapEvent() // 设置地图事件
      this.addMapControl() // 向地图添加控件
      this.addMarker() // 向地图中添加marker
    },
    createMap () {
      // 创建地图函数：
      this.map = new BMap.Map('dituContent') // 在百度地图容器中创建一个地图
      let point = new BMap.Point(this.storeInfo.longitude_bd, this.storeInfo.latitude_bd) // 定义一个中心点坐标
      this.map.centerAndZoom(point, 18) // 设定地图的中心点和坐标并将地图显示在地图容器中
      window.map = this.map // 将map变量存储在全局
    },
    setMapEvent () {
      // 地图事件设置函数：
      this.map.enableDragging() // 启用地图拖拽事件，默认启用(可不写)
      this.map.enableScrollWheelZoom() // 启用地图滚轮放大缩小
      this.map.enableDoubleClickZoom() // 启用鼠标双击放大，默认启用(可不写)
      this.map.enableKeyboard() // 启用键盘上下左右键移动地图
    },
    addMapControl () {
      // 地图控件添加函数：
      // 向地图中添加缩放控件
      let ctrlNav = new BMap.NavigationControl({anchor: 0, type: 0})
      this.map.addControl(ctrlNav)
      // 向地图中添加缩略图控件
      let ctrlOve = new BMap.OverviewMapControl({anchor: 3, isOpen: 1})
      this.map.addControl(ctrlOve)
      // 向地图中添加比例尺控件
      let ctrlSca = new BMap.ScaleControl({anchor: 2})
      this.map.addControl(ctrlSca)
    },
    addMarker () {
      // 创建marker
      for (let i = 0; i < this.markerArr.length; i++) {
        let json = this.markerArr[i]
        let p0 = json.point.split('|')[0]
        let p1 = json.point.split('|')[1]
        let point = new BMap.Point(p0, p1)
        let iconImg = this.createIcon(json.icon)
        let marker = new BMap.Marker(point, {icon: iconImg})
        // let iw = this.createInfoWindow(i)
        let label = new BMap.Label(json.title, {'offset': new BMap.Size(json.icon.lb - json.icon.x + 10, -20)})
        marker.setLabel(label)
        this.map.addOverlay(marker)
        label.setStyle({
          borderColor: '#808080',
          color: '#333',
          cursor: 'pointer'
        })
        // let index = i
        let _iw = this.createInfoWindow(i)
        let _marker = marker
        _marker.addEventListener('click', function () {
          this.openInfoWindow(_iw)
        })
        _iw.addEventListener('open', function () {
          _marker.getLabel().hide()
        })
        _iw.addEventListener('close', function () {
          _marker.getLabel().show()
        })
        label.addEventListener('click', function () {
          _marker.openInfoWindow(_iw)
        })
        if (!!json.isOpen) {
          label.hide()
          _marker.openInfoWindow(_iw)
        }
      }
    },
    createInfoWindow (i) {
      // 创建InfoWindow
      let json = this.markerArr[i]
      let iw = new BMap.InfoWindow('<b class="iw_poi_title" title="' + json.title + '">' + json.title + '</b><div class="iw_poi_content">' + json.content + '</div>')
      return iw
    },
    createIcon (json) {
      // 创建一个Icon
      var icon = new BMap.Icon('http://api.map.baidu.com/lbsapi/creatmap/images/us_mk_icon.png', new BMap.Size(json.w, json.h), {imageOffset: new BMap.Size(-json.l, -json.t), infoWindowOffset: new BMap.Size(json.lb + 5, 1), offset: new BMap.Size(json.x, json.h)})
      return icon
    }
  },
  activated () {
    this.refresh()
  }
}
</script>
