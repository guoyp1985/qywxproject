<style lang="less">
.center-page{
  .top-box{
    background-color:#f5f9fe;text-align:left;padding:10px;box-sizing: border-box;
    .txt{font-size:16px;font-weight:bold;}
  }
}
</style>
<template>
  <div class="bg-page font14 center-page">
    <div class="top-box list-shadow02" style="">
      <div class="txt">{{ loginUser.linkman }}</div>
      <div class="mt5 font12 color-gray">{{loginUser.email}}</div>
    </div>
    <div class="padding10">
      <div class="box-outer">
        <div class="box-title">获客</div>
        <div class="box-list square">
          <div class="list-item ico-pic-item">
            <div class="item-inner">
              <div class="ico-bg">
                <span class="al al-huodong"></span>
              </div>
              <div class="txt">活动</div>
            </div>
          </div>
          <div class="list-item ico-pic-item">
            <div class="item-inner">
              <div class="ico-bg">
                <span class="al al-wenzhang3"></span>
              </div>
              <div class="txt">内容</div>
            </div>
          </div>
          <div class="list-item ico-pic-item">
            <div class="item-inner">
              <div class="ico-bg">
                <span class="al al-weixinqun"></span>
              </div>
              <div class="txt">微信群</div>
            </div>
          </div>
        </div>
        <div class="box-list square">
          <div class="list-item ico-pic-item">
            <div class="item-inner">
              <div class="ico-bg">
                <span class="al al-weixin"></span>
              </div>
              <div class="txt">微信</div>
            </div>
          </div>
          <div class="list-item ico-pic-item"></div>
          <div class="list-item ico-pic-item"></div>
        </div>
      </div>
      <div class="box-outer mt10">
        <div class="box-title">服务</div>
        <div class="box-list square">
          <div class="list-item ico-pic-item">
            <div class="item-inner">
              <div class="ico-bg">
                <span class="al al-huodong"></span>
              </div>
              <div class="txt">客户列表</div>
            </div>
          </div>
          <div class="list-item ico-pic-item">
            <div class="item-inner">
              <div class="ico-bg">
                <span class="al al-wenzhang3"></span>
              </div>
              <div class="txt">精准推送</div>
            </div>
          </div>
          <div class="list-item ico-pic-item">
            <div class="item-inner">
              <div class="ico-bg">
                <span class="al al-weixinqun"></span>
              </div>
              <div class="txt">买家秀</div>
            </div>
          </div>
        </div>
        <div class="box-list square">
          <div class="list-item ico-pic-item">
            <div class="item-inner">
              <div class="ico-bg">
                <span class="al al-weixin"></span>
              </div>
              <div class="txt">到店</div>
            </div>
          </div>
          <div class="list-item ico-pic-item">
            <div class="item-inner">
              <div class="ico-bg">
                <span class="al al-weixin"></span>
              </div>
              <div class="txt">活动</div>
            </div>
          </div>
          <div class="list-item ico-pic-item"></div>
        </div>
      </div>
      <div class="box-outer mt10">
        <div class="box-title">销售</div>
        <div class="box-list square">
          <div class="list-item ico-pic-item">
            <div class="item-inner">
              <div class="ico-bg">
                <span class="al al-huodong"></span>
              </div>
              <div class="txt">客户列表</div>
            </div>
          </div>
          <div class="list-item ico-pic-item">
            <div class="item-inner">
              <div class="ico-bg">
                <span class="al al-wenzhang3"></span>
              </div>
              <div class="txt">分销</div>
            </div>
          </div>
          <div class="list-item ico-pic-item">
            <div class="item-inner">
              <div class="ico-bg">
                <span class="al al-weixinqun"></span>
              </div>
              <div class="txt">销售机会</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Grid, GridItem, Group, Cell } from 'vux'
import TipLayer from '@/components/TipLayer'
import ENV from 'env'
import Time from '#/time'
import Reg from '#/reg'
import { Token, User, FirstInfo } from '#/storage'
let self = {}
export default {
  components: {
    Grid, GridItem, Group, Cell, TipLayer
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    // const self = this
    return {
      btns: [
        {
          name: 'All orders',
          icon: 'al-daifukuan',
          // color: 'rgba01',
          link: '/orderSearch'
        },
        {
          type: 'deliver',
          name: 'To Be Delivered',
          icon: 'al-wodedaifahuo3dtouchshangpinxiangqing',
          // color: 'rgba02',
          link: '/orderSearch?flag=2',
          count: 0
        },
        {
          type: 'receive',
          name: 'Shipped',
          icon: 'al-buoumaotubiao39',
          // color: 'rgba05',
          link: '/orderSearch?flag=3',
          count: 0
        },
        {
          name: 'Completed',
          icon: 'al-buoumaotubiao48',
          // color: 'rgba04',
          link: '/orderSearch?flag=4'
        }
      ],
      avatarHref: 'https://tossharingsales.boka.cn/images/user.jpg',
      query: {},
      loginUser: {},
      showCenter: false,
      showFactory: false,
      showManager: false,
      showQuit: false,
      showTip: false,
      showApply: false,
      showTestManager: ENV.showTestManager,
      showWeapp: false,
      weappHTML: '',
      isKaifa: ENV.IsKaifa
    }
  },
  methods: {
    handleLaunchFn (e) {
      console.log(e)
    },
    handleErrorFn (e) {
      console.log('fail', e.detail)
    },
    closeTip () {
      this.showTip = false
    },
    toApply () {
      let params = this.$util.handleAppParams(this.query, {uid: ENV.FactoryManagerUid, fromModule: 'retailer'})
      this.$router.push({path: '/chat', query: params})
    },
    initData () {
      this.showCenter = false
      this.showFactory = false
      this.showManager = false
      this.showQuit = false
    },
    buttonClick (btn) {
      if (btn.link) {
        this.$router.push({path: btn.link})
      } else {
        btn.react.call(this)
      }
    },
    toLink (link) {
      this.$router.push({path: link})
    },
    clickManager () {
      window.open(`${ENV.AdminUrl}?unionid=${self.loginUser.unionid}`)
    },
    clickQuit () {
      Token.remove()
      User.remove()
      FirstInfo.remove()
      this.$router.push({name: 'tLogin'})
    },
    clickFactoryCenter () {
      if (this.loginUser.factory_expired === 1) {
        this.showTip = true
      } else {
        this.$router.push('/centerFactory')
      }
    },
    getData () {
      this.$http.get(`${ENV.BokaApi}/api/user/show`).then(res => {
        if (!res) return
        const retdata = res.data
        if (retdata.flag) {
          this.loginUser = retdata.data
          User.set(this.loginUser)
          console.log('当前用户信息', this.loginUser)
        }
      })
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.initData()
      if (!Reg.rPlatfrom.test(navigator.userAgent)) {
        this.showQuit = true
      }
      this.$util.getSystemParams()
      this.getData()
    }
  },
  activated () {
    self = this
    this.refresh()
  }
}
</script>
