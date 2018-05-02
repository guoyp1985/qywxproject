<template>
  <div class="containerarea bg-page membersview font14 s-havebottom">
    <div class="s-topbanner flex_center color-white">
      <div class="pl10 pr10">
        <div class="t-table">
          <div class="t-cell v_middle" style="width:80px;">
            <img class="avatarimg4" :src="currentuser.avatar" />
          </div>
          <div class="t-cell v_middle">
            <div class="font17">{{ currentuser.linkman }}</div>
            <div class="font12">成交概率{{ currentuser.percent }}</div>
          </div>
          <div class="t-cell v_middle w50 align_right">
            <router-link :to="{ name: '', query: {uid: currentuser.uid} }" class="qbtn bg-green color-white">{{ $t('Contact') }}</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="s-container">
      <div class="b_top_after padding10 flex_center bg-white">
        <div class="t-table align_center font15 itemtab">
          <router-link :to="{path: '/shareList', query:{ uid: currentuser.uid }}" class="t-cell item v_middle b_right_after">{{ $t('Share') }}</router-link>
          <router-link :to="{path: '/salesList', query:{ uid: currentuser.uid }}" class="t-cell item v_middle b_right_after">{{ $t('Orders') }}</router-link>
          <router-link :to="{path: '/membersView', query:{ uid: currentuser.uid }}" class="t-cell item v_middle">{{ $t('Userinfo') }}</router-link>
        </div>
      </div>
      <div class="mt12 b_bottom_after padding10 bg-white">{{ currentuser.linkman }}{{ $t('Behavior analysis in the last month') }}</div>
      <div class="bg-white scroll_list">
        <div v-if="!listdata || listdata.length == 0">暂无行为数据</div>
        <div v-else v-for="item in listdata" :key="item.id" class="scroll_item padding10">
          <div class="t-table">
                  <div class="t-cell w50 align_left v_top">
                          <img class="avatarimg1" :src="item.avatar">
                  </div>
                  <div class="t-cell align_left v_top">
                          <div class="color-gray">{{ item.linkman }}</div>
                          <div class="">{{ item.title }}</div>
                          <div class="font12 color-gray">{{ item.dateline | dateformat}}</div>
                  </div>
          </div>
        </div>
      </div>
    </div>
    <div class="s-bottom bottomnaviarea b_top_after">
      <div class="t-table bottomnavi">
        <router-link class="t-cell item" to="/retailerShop">{{ $t('My shop') }}</router-link>
        <router-link class="t-cell item" to="/centerSales">{{ $t('Sales center') }}</router-link>
        <router-link class="t-cell item" to="/retailerOrders">{{ $t('My orders') }}</router-link>
      </div>
    </div>
  </div>
</template>

<i18n>
Orders:
  zh-CN: 订单
Userinfo:
  zh-CN: 用户信息
Behavior analysis in the last month:
  zh-CN: 最近一个月行为分析
</i18n>

<script>
import Time from '../../libs/time'
import ENV from '../../libs/env'
export default {
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      loginuser: {},
      currentuser: {
        uid: 187,
        linkman: 'YOUNG',
        position: '于国旺',
        percent: '20%',
        mobile: '18512341234',
        province: '北京',
        city: '北京',
        sex: 1,
        avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/187.jpg',
        dateline: 1529694513,
        retailerInfo: { uid: 2, linkman: '仇红波' },
        memberslevel: 3,
        vip: '3星用户',
        isseller: false,
        iscustomer: true,
        priority: true
      },
      listdata: [
        {
          id: '1', linkman: 'YOUNG', title: '第7次查看文章软件测试计划模板,共浏览了251秒', dateline: 1523694550, visitor: 0, avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/187.jpg'
        },
        {
          id: '2', linkman: 'YOUNG', title: '第45次查看产品苹果手机,共浏览了4879秒', dateline: 1523694550, visitor: 10, avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/187.jpg'
        },
        {
          id: '3', linkman: 'YOUNG', title: '第195次查看产品维生素B族片,共浏览了80358秒', dateline: 1521694550, visitor: 32, avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/187.jpg'
        }
      ]
    }
  },
  created: function () {
    let self = this
    this.$store.commit('updateToggleTabbar', {toggleBar: false})
    let curquery = self.$route.query
    console.log(curquery)
    self.$http.post(`${ENV.BokaApi}/mobile/ajax/api.php?module=news&action=list&type=all&notclass0=1&pagestart=0&limit=20`, {
      data: { uid: curquery.uid }
    }).then(function (res) {
      let data = res.data
      self.listdata = data.data ? data.data : data
    })
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.membersview .btnlist .btn{
  display:inline-block;vertical-align: middle;
  width:90%;box-sizing: border-box;height:35px;line-height:35px;border-radius:20px;
}
.membersview .priority:after{content:"置顶"}
.membersview .priority.done:after{content:"取消置顶"}
.membersview .itemtab .item{color:#01a6ea;}
</style>
