<template>
  <div class="containerarea bg-page font14 s-havebottom rproductlist">
    <div class="s-container" style="top:0px;">
      <div class="scroll_list bg-page">
        <template v-if="!productdata || productdata.length == 0">
          <div class="emptyitem">
            <div class="t-table" style="padding-top:20%;">
              <div class="t-cell padding10">
                <i class="al al-chuangjianxiangmu" style="font-size:60px;"></i>
                <div>还没有可装修商品哦，及时添加商品可以：</div>
                <div>1.创建促销活动 </div>
                <div>2.分享商品获得客户</div>
                <div>3.邀请返点客帮你赚钱</div>
              </div>
            </div>
          </div>
        </template>
        <template v-else v-for="(item,index) in productdata">
          <router-link :to="{path:'/product',query:{id:item.id,wid:loginuser.uid}}" v-if="item.moderate == 1" class="scroll_item mb5 font14 bg-white db" :key="item.id" style="color:inherit;">
            <div class="t-table bg-white pt10 pb10">
        			<div class="t-cell pl10 v_middle" style="width:90px;">
    		          <img style="width:80px;height:80px;" :src="item.photo" />
        			</div>
        			<div class="t-cell v_middle">
                <div class="clamp2 font15 pr10">{{item.title}}</div>
                <div class="mt5 dishref db">
                  <span class="color-red font15 middle-cell">{{ $t('RMB') }} {{ item.price }}</span>
                </div>
                <div class="align_right pr10">
                  <div class="btnicon" style="padding: 1px 8px;" @click="showpopupclick(item,index)">{{ $t('Rolling show') }}</div>
                </div>
        			</div>
        		</div>
          </router-link>
        </template>
      </div>
    </div>
    <div class="s-bottom">
      <div class="t-table h_100 align_center">
        <router-link class="t-cell h_100 v_middle bg-gray color-white" :to="{path: '/retailerShop', query: { wid: loginuser.uid}}">{{ $t('Back go shop') }}</router-link>
        <router-link class="t-cell h_100 v_middle bg-orange color-white" to="/addProduct">{{ $t('Add product') }}</router-link>
      </div>
    </div>
    <div v-transfer-dom class="x-popup">
      <popup v-model="showphotopop" height="100%">
        <div class="popup1">
          <div class="popup-top flex_center">店铺首页滚动展示</div>
          <div class="popup-middle font14">
            <div class="padding10">
              <div class="pt10 pb5">（图像最佳宽高比为9:5）</div>
              <div>
                <input type="hidden" name="qrcode" required="" :value="clickdata.photo" class="no-fastclick">
                <div class="q_photolist align_left" uploadform=".uploadfileForm">
                  <template v-if="photoarr.length > 0">
                    <div v-for="(item,index) in photoarr" :key="index" class="photoitem">
                      <div class="inner photo" :photo="item" :style="`background-image: url('${item}');`">
                        <div class="close" @click="deletephoto(item,index)">×</div>
                      </div>
                    </div>
                  </template>
                  <div v-if="photoarr.length < maxnum" class="photoitem add">
                    <div class="inner">
                      <input type="file" style="position:absolute;left:0;right:0;top:0;bottom:0;z-index:1;background-color:transparent;" @change="filechange">
                      <div class="t-table">
                        <div class="t-cell">
                          <div class="txt">
                            <i class="al al-zhaopian" style="color:#c6c5c5;line-height:30px;"></i>
                            <div><span class="havenum">{{ havenum }}</span><span class="ml5 mr5">/</span><span class="maxnum">{{ maxnum }}</span></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt12 font12 color-red" v-if="showtip">{{ $t('Please upload rolling show photo') }}</div>
  					</div>
          </div>
          <div class="popup-bottom flex_center" @click="closepopup">
            <div class="flex_cell flex_center h_100 bg-gray color-white" @click="closepopup">{{ $t('Close') }}</div>
            <div class="flex_cell flex_center h_100 bg-green color-white" @click="subphoto">{{ $t('Confirm txt') }}</div>
          </div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom>
      <alert v-model="showalert">{{ $t('Please upload rolling show photo') }}</alert>
    </div>
  </div>
</template>

<i18n>
Rolling show:
  zh-CN: 滚动展示
Add product:
  zh-CN: 添加商品
Back go shop:
  zh-CN: 返回店铺
Please upload rolling show photo:
  zh-CN: 请上传滚动展示图像
</i18n>

<script>
import { TransferDom, Popup, Confirm, Alert } from 'vux'

export default {
  directives: {
    TransferDom
  },
  components: {
    Popup,
    Confirm,
    Alert
  },
  created: function () {
    this.$store.commit('updateToggleTabbar', {toggleBar: false})
    if (this.clickdata && this.clickdata.rollingphoto && this.clickdata.rollingphoto !== '') {
      this.havenum = this.clickdata.rollingphoto.split(',')
    } else {
      this.havenum = 0
    }
  },
  data () {
    return {
      loginuser: { uid: 187 },
      productdata: [
        { 'id': 124, isfinished: 1, moderate: 0, 'title': '苹果手机', 'photo': 'http://ossgxs.boka.cn/month_201804/15226700508345.jpg', 'price': '8,000.00', rollingphoto: '' },
        { 'id': 113, isfinished: 0, moderate: 1, 'title': '维生素B族片', 'photo': 'http://ossgxs.boka.cn/month_201803/15223015290656.jpg', 'price': '1.00', 'saled': 1, rollingphoto: '' },
        { 'id': 107, isfinished: 1, moderate: 1, 'title': '大王卡', 'photo': 'http://ossgxs.boka.cn/month_201803/15222378479011.jpg', 'price': '12.00', 'saled': 0, rollingphoto: '' },
        { 'id': 106, isfinished: 0, moderate: 1, 'title': '测试分享商品通知', 'photo': 'http://ossgxs.boka.cn/month_201803/15222375843651.jpg', 'price': '1.00', 'saled': 0, rollingphoto: '' },
        { 'id': 105, isfinished: 1, moderate: 0, 'title': '测试商品分享', 'photo': 'http://ossgxs.boka.cn/month_201803/15222371028755.jpg', 'price': '1.00', 'saled': 0, rollingphoto: '' },
        { 'id': 103, isfinished: 1, moderate: 0, 'title': '测试商品图片', 'photo': 'http://ossgxs.boka.cn/month_201803/15222183428017.jpg?x-oss-process=image/crop,x_-109,y_-103,w_1086,h_1086', 'price': '10.00', 'saled': 2, rollingphoto: '' },
        { 'id': 98, isfinished: 0, moderate: 0, 'title': '111', 'photo': 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15221287780438.jpg', 'price': '222.00', 'saled': 0, rollingphoto: '' },
        { 'id': 92, isfinished: 0, moderate: 0, 'title': '商品2', 'photo': 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15220609241178.png', 'price': '12.00', 'saled': 0, rollingphoto: '' },
        { 'id': 91, isfinished: 0, moderate: 0, 'title': '商品1', 'photo': 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15220608592056.jpg', 'price': '1.00', 'saled': 1, rollingphoto: '' },
        { 'id': 89, isfinished: 0, moderate: 0, 'title': '啊', 'photo': 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15220603289333.jpg', 'price': '1.00', 'saled': 0, rollingphoto: '' }
      ],
      controldata1: [
        { key: 'edit', title: '编辑' },
        { key: 'up', title: '上架' },
        { key: 'down', title: '下架' },
        { key: 'stat', title: '统计' },
        { key: 'createposter', title: '生成海报' }
      ],
      clickdata: {},
      clickindex: 0,
      showphotopop: false,
      photoarr: [],
      maxnum: 1,
      havenum: 0,
      showalert: false,
      showtip: false
    }
  },
  watch: {
    photoarr: function () {
      return this.photoarr
    },
    havenum: function () {
      let len = 0
      if (this.clickdata && this.clickdata.rollingphoto && this.clickdata.rollingphoto !== '') {
        len = this.clickdata.rollingphoto.split(',')
      }
      return len
    }
  },
  computed: {
    getquery: function () {
      return this.$route.query
    }
  },
  methods: {
    showpopupclick (item, index) {
      event.preventDefault()
      let self = this
      self.showphotopop = !this.showphotopop
      self.clickdata = item
      self.clickindex = index
      if (item.rollingphoto && item.rollingphoto !== '') {
        self.photoarr = item.rollingphoto.split(',')
      } else {
        self.photoarr = []
      }
      self.havenum = self.photoarr.length
      if (self.havenum > self.maxnum) {
        self.havenum = self.maxnum
      }
    },
    popupevent (status) {
    },
    filechange (e) {
      if (this.havenum < this.maxnum) {
        this.havenum += 1
        this.photoarr.push('http://ossgxs.boka.cn/month_201804/15231791164010.jpg')
      }
    },
    deletephoto (item, index) {
      for (var i = 0; i < this.photoarr.length; i++) {
        if (i === index) {
          this.photoarr.splice(i, 1)
          this.havenum -= 1
          break
        }
      }
    },
    closepopup () {
      this.showphotopop = false
    },
    subphoto () {
      let self = this
      if (self.photoarr.length === 0) {
        self.showalert = true
      } else {
        self.clickdata.rollingphoto = self.photoarr.join(',')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.rproductlist .scroll_item{overflow:hidden;position:relative;}
.rproductlist .scroll_item .icon{display:none;}
.rproductlist .scroll_item .down.icon{
        display:block;
        position:absolute;right:0;top:0;width:96px;height:25px;line-height:25px;
        background-color:#8a8a8a;color:#fff;text-align:center;font-size: 12px;
        -webkit-transform: translate(30px,5px) rotate(45deg);
        transform: translate(30px,5px) rotate(45deg);
}
.rproductlist .scroll_item .down.icon:after{content:"已下架";}
.rproductlist .btnicon{
  display: inline-block;
    color: #9c9c9c;
    font-size: 14px;
    border: 1px solid #9c9c9c;
    text-align: center;
    border-radius: 30px;
    padding: 1px 8px;
}
</style>
