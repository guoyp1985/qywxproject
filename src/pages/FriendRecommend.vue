<template>
  <div class="containerarea font14 friendRecommend">
    <div style="width:100%;height:125px;">
      <div class="flex_left bg-white font16 align_right b_bottom_after pl20 headtit">我的店铺</div>
      <div class="rhead t-table flex_left" @click="toStore">
        <div class="inner">
          <img :src="retailerInfo.avatar" />
        </div>
        <div class="txt-cell flex_cell w_100">
          <div class="font16 clamp1">{{retailerInfo.title}}</div>
          <!-- <div class="font14 clamp1 color-gray mt5">全部宝贝：{{retailerInfo.views}}件</div> -->
        </div>
        <div class="t-right">
          <span class="btnicon">去分享</span>
        </div>
      </div>
    </div>
    <!-- 文章 -->
    <div class="share-list mt10" v-if="disData1">
      <div class="border-t12 border pt10 pb10 pr15 pl15 bg-white b_bottom_after">
        <div class="t-table">
          <div class="t-cell middle-cell align_left font16">最新文章</div>
          <router-link v-if="articalData.length" :to="{ path: '/NewestList', query: {module: 'news'} }" class="t-cell middle-cell align_right font14">
            <div style="color:rgb(255, 68, 0);">更多>></div>
          </router-link>
        </div>
      </div>
      <div v-if="!articalData || articalData.length == 0" class="flex_center font16 bg-white pt10 pb10 pr15 pl15">暂无文章</div>
      <router-link :to="{ path: '/news', query: {id: item.id, wid:item.uploader} }" v-else v-for="(item, index) in articalData" :key="item.id">
        <div class="artical-item flex_left bg-white pt10 pb10 pr15 pl15">
          <div class="inner">
            <img :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
          </div>
          <div class="flex_left flex_cell">
            <div class="clamp1 w_100 pr10">
              <div class="font14 clamp1 wtitle">{{item.title}}</div>
              <div class="clamp1 font12 color-gray v_middle">
                  <span class="v_middle color-999">{{ item.dateline_str }}</span>
                  <span class="v_middle"><i class="al al-chakan font18 middle-cell pl5 pr5" style="color: #bbbbbb"></i>{{item.views}}</span>
                  <span class="v_middle"><i class="al al-ai-share font14 middle-cell pl5 pr5" style="color: #bbbbbb"></i>{{item.shares}}</span>
              </div>
            </div>
            <div class="t-right">
              <span class="btnicon">去分享</span>
            </div>
          </div>
        </div>
      </router-link>
    </div>
    <!-- 活动 -->
    <div class="share-list mt10" v-if="disData2">
      <div class="border-t12 border pt10 pb10 pr15 pl15 bg-white b_bottom_after">
        <div class="t-table">
          <div class="t-cell middle-cell align_left font16">最新活动</div>
          <router-link v-if="listActivity.length" :to="{ path: '/NewestList', query: {module: 'activity'} }" class="t-cell middle-cell align_right font14">
            <div style="color:rgb(255, 68, 0);">更多>></div>
          </router-link>
        </div>
      </div>
      <div v-if="!listActivity || listActivity.length == 0" class="flex_center font16 bg-white pt10 pb10 pr15 pl15">暂无活动</div>
      <div  v-else v-for="(item, index) in listActivity" :key="item.id" @click="toActivity(item)">
        <div class="artical-item flex_left bg-white pt10 pb10 pr15 pl15">
          <div class="inner">
            <img :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
          </div>
          <div class="txt-cell flex_cell clamp1 w_100 pr10">
            <div class="font14 clamp1 wtitle">{{item.title}}</div>
            <div class="font12 color-gray">{{item.dateline_str}}</div>
          </div>
          <div class="t-right">
            <span class="btnicon">去分享</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 商品 -->
    <div class="share-list mt10" v-if="disData3">
      <div class="border-t12 border pt10 pb10 pr15 pl15 bg-white b_bottom_after">
        <div class="t-table">
          <div class="t-cell middle-cell align_left font16">最新商品</div>
          <router-link v-if="productData.length" :to="{ path: '/NewestList', query: {module: 'product'} }" class="t-cell middle-cell align_right font14">
            <div style="color:rgb(255, 68, 0);">更多>></div>
          </router-link>
        </div>
      </div>
      <div v-if="!productData || productData.length == 0" class="flex_center font16 bg-white pt10 pb10 pr15 pl15">暂无商品</div>
      <router-link :to="{ path: '/product', query: {id: item.id, wid: item.uploader} }" v-else v-for="(item, index) in productData" :key="item.id">
        <div class="artical-item flex_left bg-white pt10 pb10 pr15 pl15">
          <div class="inner">
            <img :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
          </div>
          <div class="txt-cell flex_cell clamp1 w_100 pr10">
            <div class="font14 clamp1 wtitle">{{item.title}}</div>
            <div class="font12 color-gray">{{item.dateline_str}}</div>
          </div>
          <div class="t-right">
            <span class="btnicon">去分享</span>
          </div>
        </div>
      </router-link>
    </div>
    <!-- 商品 -->
    <div class="share-list mt10" v-if="disData4">
      <div class="border-t12 border pt10 pb10 pr15 pl15 bg-white b_bottom_after">
        <div class="t-table">
          <div class="t-cell middle-cell align_left font16">最新厂家商品</div>
          <router-link v-if="factoryData.length" :to="{ path: '/NewestList', query: {module: 'factoryProduct'} }" class="t-cell middle-cell align_right font14">
            <div style="color:rgb(255, 68, 0);">更多>></div>
          </router-link>
        </div>
      </div>
      <div v-if="!factoryData || !factoryData.length" class="flex_center font16 bg-white pt10 pb10 pr15 pl15">暂无商品</div>
      <router-link :to="{ path: '/product', query: {id: item.id, wid: item.uploader} }" v-else v-for="(item, index) in factoryData" :key="item.id">
        <div class="artical-item flex_left bg-white pt10 pb10 pr15 pl15">
          <div class="inner">
            <img :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
          </div>
          <div class="txt-cell flex_cell clamp1 w_100 pr10">
            <div class="font14 clamp1 wtitle">{{item.title}}</div>
            <div class="font12 color-gray">{{item.dateline_str}}</div>
          </div>
          <div class="t-right">
            <span class="btnicon">去分享</span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
  import ENV from 'env'
  import Time from '#/time'
  import { User } from '#/storage'
  export default {
    data () {
      return {
        loginUser: {},
        retailerInfo: {},
        selectedIndex: 0,
        articalData: [],
        listActivity: [],
        productData: [],
        factoryData: [],
        disData1: false,
        disData2: false,
        disData3: false,
        disData4: false
      }
    },
    methods: {
      toStore () {
        const params = {wid: this.retailerInfo.uid}
        this.$router.push({path: '/store', query: params})
      },
      toActivity (item) {
        const type = item.type
        console.log(type)
        console.log(item.uploader)
        let params = {id: item.productid, wid: item.uploader}
        let params1 = {id: item.id, wid: item.uploader}
        if (type === 'groupbuy') {
          this.$router.push({path: '/product', query: params})
        } else {
          this.$router.push({path: '/activity', query: params1})
        }
      },
      getData1 () {
        const self = this
        self.$http.get(`${ENV.BokaApi}/api/list/news?from=retailer&pagestart=0&limit=3`).then(res => {
          let data = res.data
          let retdata = data.data ? data.data : data
          for (var i = 0; i < retdata.length; i++) {
            retdata[i].dateline_str = new Time(retdata[i].dateline * 1000).dateFormat('yyyy-MM-dd hh:mm')
          }
          self.articalData = retdata
          this.disData1 = true
        })
      },
      getData2 () {
        const self = this
        self.$http.get(`${ENV.BokaApi}/api/retailer/listActivity?do=store&pagestart=0&limit=3&wid=${this.loginUser.uid}`).then(res => {
          let data = res.data
          let retdata = data.data ? data.data : data
          for (var i = 0; i < retdata.length; i++) {
            retdata[i].dateline_str = new Time(retdata[i].dateline * 1000).dateFormat('yyyy-MM-dd hh:mm')
          }
          self.listActivity = retdata
          this.disData2 = true
        })
      },
      getData3 () {
        const self = this
        self.$http.get(`${ENV.BokaApi}/api/list/product?pagestart=0&limit=3&uploader=${this.loginUser.uid}`).then(res => {
          let data = res.data
          let retdata = data.data ? data.data : data
          for (var i = 0; i < retdata.length; i++) {
            retdata[i].dateline_str = new Time(retdata[i].dateline * 1000).dateFormat('yyyy-MM-dd hh:mm')
          }
          self.factoryData = retdata
          this.disData4 = true
        })
      },
      getData4 () {
        const self = this
        self.$http.get(`${ENV.BokaApi}/api/list/product?agent=1&pagestart=0&limit=3`).then(res => {
          let data = res.data
          let retdata = data.data ? data.data : data
          for (var i = 0; i < retdata.length; i++) {
            retdata[i].dateline_str = new Time(retdata[i].dateline * 1000).dateFormat('yyyy-MM-dd hh:mm')
          }
          self.productData = retdata
          this.disData3 = true
        })
      },
      refresh () {
        this.loginUser = User.get()
        this.retailerInfo = this.loginUser.retailerinfo
        console.log('用户信息')
        console.log(this.retailerInfo)
        this.getData1()
        this.getData2()
        this.getData3()
        this.getData4()
      }
    },
    created () {
      this.refresh()
    }
  }
</script>
<style lang="less">
  .friendRecommend{
    background-color:#EFEEF3;
    .headtit{width:100%;height:45px;line-height:45px;}
    .rhead{
      padding:10px 15px;box-sizing:border-box;background:#fff;box-shadow:0 2px 4px 0 rgba(0, 0, 0, 0.07);
      .inner{
        width:80px;height:60px;
        img{width:60px;height:60px;object-fit:cover;}
      }
    }
    .t-right{margin-left:auto;}
    .btnicon{
      background-color:#4cd964;color:#fff;font-size:12px;border-radius:20px;
      display:inline-block;width:50px;text-align: center;
    }
    .artical-item{
      border-bottom:1px solid #e5e5e5;
    }
    .artical-item .inner{
      width:50px;height:40px;
      img{width:40px;height:40px;object-fit:cover;}
    }
  }
</style>
