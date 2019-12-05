<template>
  <div class="containerarea bg-page font14 factory-list-page nobottom notop">
    <div class="pagemiddle" ref="scrollContainer">
      <template v-if="disTabData1">
        <div v-if="!tabData1 || tabData1.length == 0" class="emptyitem flex_center">
          <div>暂无供货商信息</div>
        </div>
        <div v-else class="scroll_list ">
          <div v-for="(item,index) in tabData1" :key="item.id" class="scroll_item pl10 pr10 border-box mb10 font14 bg-white db list-shadow " style="color:inherit;">
            <div class="t-table bg-white pt10 pb10">
      				<div @click="toDetail(item)" class="t-cell v_middle w70" v-if="item.photo && item.photo != ''">
                <img class="v_middle imgcover" style="width:60px;height:60px;" :src="$util.getPhoto(item.photo)" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
              </div>
        			<div @click="toDetail(item)" class="t-cell v_middle">
                <div class="clamp1 font16 pr10 color-lightgray">{{item.title}}</div>
        			</div>
              <div @click="submitEvent(item)" class="t-cell v_middle w100">
                <div class="btnicon bg-theme color-white font12">我要托管</div>
              </div>
        		</div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>


<script>
import { TransferDom, Popup, Confirm, CheckIcon, XImg, Tab, TabItem, Swiper, SwiperItem } from 'vux'
import ENV from 'env'
import { User } from '#/storage'
import Subscribe from '@/components/Subscribe'
import ApplyTip from '@/components/ApplyTip'

let pageStart1 = 0
const limit = 10

export default {
  directives: {
    TransferDom
  },
  components: {
    Popup, Confirm, CheckIcon, XImg, Tab, TabItem, Swiper, SwiperItem, Subscribe, ApplyTip
  },
  data () {
    return {
      query: {},
      loginUser: {},
      selectedIndex: 0,
      tabData1: [],
      disTabData1: false,
      clickData: {},
      clickIndex: 0,
      isIng: false
    }
  },
  methods: {
    getPhoto (src) {
      return this.$util.getPhoto(src)
    },
    toDetail (item) {
      let params = this.$util.handleAppParams(this.query, {id: item.id, wid: this.loginUser.uid})
      this.$router.push({path: '/factory', query: params})
    },
    submitEvent (item) {
      if (this.isIng) return false
      this.$vux.confirm.show({
        content: '确定要托管给该供应商',
        onConfirm: () => {
          this.$vux.loading.show()
          this.$http.post(`${ENV.BokaApi}/api/factory/fpimportApply`, {
            trustmode: 1, fid: this.loginUser.fid, fromfid: item.id
          }).then(res => {
            this.isIng = false
            let data = res.data
            this.$vux.loading.hide()
            this.$vux.toast.show({
              text: data.error,
              type: data.flag === 1 ? 'success' : 'warn',
              time: this.$util.delay(data.error)
            })
            if (data.flag) {
              this.loginUser.factoryinfo.supplymode = 1
              User.set(this.loginUser)
            }
          })
        }
      })
    },
    handleScroll: function (refname, index) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          if (index === 0) {
            if (self.tabData1.length === (pageStart1 + 1) * limit) {
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
      const params = { pagestart: pageStart1, limit: limit, issupply: 1 }
      this.$http.get(`${ENV.BokaApi}/api/factory/list`, {
        params: params
      }).then(res => {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        self.tabData1 = self.tabData1.concat(retdata)
        self.disTabData1 = true
      })
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.$vux.loading.show()
      this.loginUser = User.get()
      this.query = this.$route.query
      if (this.tabData1.length < limit) {
        pageStart1 = 0
        this.disTabData1 = false
        this.tabData1 = []
        this.getData1()
      } else {
        this.$vux.loading.hide()
      }
    }
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less" scoped>
.factory-list-page{
  .scroll_item{overflow:hidden;position:relative;}
  .btnicon{
    text-align: center;
    border-radius: 30px;
    letter-spacing: 0px;
    height: 25px;
    line-height: 25px;
    padding:0 10px;
  }
}

</style>
