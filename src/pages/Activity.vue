<style lang="less">
.activity-page{
  .box-outer{padding:20px;box-sizing:border-box;}
  .txt1{text-align:center;font-size:18px;font-weight:bold;}
  .txt2{text-align:center;margin-top:5px;}
  .btn{width:80%;max-width:300px;height:40px;line-height:40px;text-align:center;border-radius:60px;background-color:#07c160;color:#fff;margin:20px auto 10px;}
}
</style>
<template>
  <div class="activity-page">
    <template v-if="viewData && viewData.id">
      <template v-if="viewData.type == 'cardcommon'">
        <div class="box-outer">
          <div class="txt1">{{facemoney}}元优惠券</div>
          <div class="btn">立即领取</div>
          <div class="b_top_after flex_left pt10 pb10 color-gray">
            <div>有效期</div>
            <div class="flex_cell flex_right">{{viewData.starttime_str}}-{{viewData.endtime_str}}</div>
          </div>
          <div class="b_top_after flex_left pt10 pb10 color-gray">
            <div>使用门槛</div>
            <div class="flex_cell flex_right">满{{ordermoney}}元可用</div>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
import { Tab, TabItem } from 'vux'
import ENV from 'env'
import Time from '../../libs/time'
import { User } from '#/storage'

export default {
  components: { Tab, TabItem },
  data () {
    return {
      query: {},
      loginUser: {},
      viewData: {},
      ordermoney: '0.00',
      facemoney: '0.00'
    }
  },
  methods: {
    getData () {
      const infoparams = {id: this.query.id, module: 'miniactivity'}
      if (this.query['share_uid']) {
        infoparams['share_uid'] = this.query.share_uid
      }
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/content_n/info`, infoparams) // 获取文章
      .then(res => {
        const data = res.data
        this.$vux.loading.hide()
        if (data.flag) {
          let retdata = data.data
          retdata.starttime_str = new Time(retdata.starttime * 1000).dateFormat('yyyy-MM-dd hh:mm')
          retdata.endtime_str = new Time(retdata.endtime * 1000).dateFormat('yyyy-MM-dd hh:mm')
          this.viewData = retdata
          if (this.viewData.type === 'cardcommon') {
            let cmoney = this.viewData.discounttype.split(',')
            this.ordermoney = cmoney[0]
            this.facemoney = cmoney[1]
          }
          let shareParams = {
            // title: `送你一张${this.facemoney}元优惠券`,
            title: this.viewData.title,
            desc: `有效期${this.viewData.starttime_str}-${this.viewData.endtime_str}`,
            photo: 'https://tossharingsales.boka.cn/month_202102/16137146626061.jpeg',
            link: `${ENV.Host}/#/activity?id=${this.viewData.id}&share_uid=${this.loginUser.uid}`
          }
          if (this.query.share_uid) {
            shareParams.link = `${shareParams.link}&lastshareuid=${this.query.share_uid}`
            shareParams.lastshareuid = this.query.share_uid
          }
          this.$util.handleWxShare(shareParams)
        }
      })
    },
    refresh () {
      this.loginUser = User.get()
      this.query = this.$route.query
      this.getData()
    }
  },
  created () {
  },
  activated () {
    this.refresh()
  }
}
</script>
