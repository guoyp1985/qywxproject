<style lang="less">
.center-page{
  overflow:hidden;height:100%;
  .page-inner{position:absolute;left:0;top:0;right:0;bottom:50px;overflow-y:scroll;}
  .top-box{
    background-color:#f5f9fe;text-align:left;padding:10px;box-sizing: border-box;
    .avatar{width:80px;height:80px;border-radius:50%;margin-right:10px;}
    .txt{font-size:16px;font-weight:bold;}
  }
}
</style>
<template>
  <div class="bg-page font14 center-page">
    <div class="page-inner">
      <div class="top-box list-shadow02 flex_left">
        <img class="avatar" :src="loginUser.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
        <div class="txt">{{ loginUser.linkman }}</div>
      </div>
      <div class="padding10">
        <div class="box-outer">
          <div class="box-title">获客</div>
          <div class="box-list square">
            <router-link to="/qiyeNewsList" class="list-item ico-pic-item">
              <div class="item-inner">
                <div class="ico-bg">
                  <span class="al al-wenzhang3"></span>
                </div>
                <div class="txt">文章</div>
              </div>
            </router-link>
            <router-link to="/qiyeProductList" class="list-item ico-pic-item">
              <div class="item-inner">
                <div class="ico-bg">
                  <span class="al al-shangpin"></span>
                </div>
                <div class="txt">产品</div>
              </div>
            </router-link>
            <router-link to="/activity" class="list-item ico-pic-item">
              <div class="item-inner">
                <div class="ico-bg">
                  <span class="al al-huodong"></span>
                </div>
                <div class="txt">活动</div>
              </div>
            </router-link>
          </div>
          <div class="box-list square">
            <router-link to="/" class="list-item ico-pic-item">
              <div class="item-inner">
                <div class="ico-bg">
                  <span class="al al-zhaopian"></span>
                </div>
                <div class="txt">海报</div>
              </div>
            </router-link>
            <router-link to="/wechatGroup" class="list-item ico-pic-item">
              <div class="item-inner">
                <div class="ico-bg">
                  <span class="al al-weixinqun"></span>
                </div>
                <div class="txt">微信群</div>
              </div>
            </router-link>
            <router-link to="" class="list-item ico-pic-item">
              <div class="item-inner">
                <div class="ico-bg">
                  <span class="al al-weixin"></span>
                </div>
                <div class="txt">微信</div>
              </div>
            </router-link>
          </div>
        </div>
        <div class="box-outer mt10">
          <div class="box-title">服务</div>
          <div class="box-list square">
            <router-link to="/qiyeCustomerList" class="list-item ico-pic-item">
              <div class="item-inner">
                <div class="ico-bg">
                  <span class="al al-huodong"></span>
                </div>
                <div class="txt">客户列表</div>
              </div>
            </router-link>
            <router-link to="/pushList" class="list-item ico-pic-item">
              <div class="item-inner">
                <div class="ico-bg">
                  <span class="al al-wenzhang3"></span>
                </div>
                <div class="txt">精准推送</div>
              </div>
            </router-link>
            <router-link to="/buyerShow" class="list-item ico-pic-item">
              <div class="item-inner">
                <div class="ico-bg">
                  <span class="al al-weixinqun"></span>
                </div>
                <div class="txt">买家秀</div>
              </div>
            </router-link>
          </div>
          <div class="box-list square">
            <router-link to="" class="list-item ico-pic-item">
              <div class="item-inner">
                <div class="ico-bg">
                  <span class="al al-weixin"></span>
                </div>
                <div class="txt">到店</div>
              </div>
            </router-link>
            <router-link to="" class="list-item ico-pic-item">
              <div class="item-inner">
                <div class="ico-bg">
                  <span class="al al-weixin"></span>
                </div>
                <div class="txt">活动</div>
              </div>
            </router-link>
            <div class="list-item ico-pic-item"></div>
          </div>
        </div>
        <div class="box-outer mt10">
          <div class="box-title">销售</div>
          <div class="box-list square">
            <router-link to="/saleCustomerList" class="list-item ico-pic-item">
              <div class="item-inner">
                <div class="ico-bg">
                  <span class="al al-huodong"></span>
                </div>
                <div class="txt">客户列表</div>
              </div>
            </router-link>
            <router-link to="/retailSale" class="list-item ico-pic-item">
              <div class="item-inner">
                <div class="ico-bg">
                  <span class="al al-wenzhang3"></span>
                </div>
                <div class="txt">分销</div>
              </div>
            </router-link>
            <router-link to="/saleChance" class="list-item ico-pic-item">
              <div class="item-inner">
                <div class="ico-bg">
                  <span class="al al-weixinqun"></span>
                </div>
                <div class="txt">销售机会</div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <qiye-footer :user.sync="loginUser"></qiye-footer>
  </div>
</template>

<script>
import {} from 'vux'
import ENV from 'env'
import { User } from '#/storage'
import QiyeFooter from '@/components/QiyeFooter'
export default {
  components: { QiyeFooter },
  data () {
    return {
      query: {},
      loginUser: {}
    }
  },
  methods: {
    getData () {
      this.$http.get(`${ENV.BokaApi}/api/user/show`).then(res => {
        console.log('进入到了center页面的user/show', res)
        console.log(res)
        if (!res) return
        const data = res.data
        let retdata = data.data ? data.data : data
        this.loginUser = retdata
        User.set(this.loginUser)
        console.log('当前用户信息', this.loginUser)
      })
    },
    refresh () {
      this.query = this.$route.query
      this.getData()
    }
  },
  activated () {
    this.refresh()
  }
}
</script>
