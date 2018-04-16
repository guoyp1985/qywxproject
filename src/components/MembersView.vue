<template>
  <div class="containerarea bg-page membersview font14">
    <div class="s-topbanner flex_center pl10 pr10 color-white">
      <div class="t-table">
        <div class="t-cell v_middle" style="width:80px;">
          <img class="avatarimg4" :src="viewuser.avatar" />
        </div>
        <div class="t-cell v_middle">
          <div class="font17">{{ viewuser.linkman }} <span class="color-yellow ml5" v-if="viewuser.memberslevel">{{ viewuser.vip }}</span></div>
          <div class="font14" v-if="viewuser.retailerInfo && viewuser.uid">返点客：{{ viewuser.retailerInfo.linkman }}</div>
        </div>
      </div>
    </div>
    <div class="s-container">
      <div class="padding10 align_center btnlist">
        <div class="t-table">
          <div class="t-cell v_middle">
            <div class="btn bg-orange color-white">联系</div>
          </div>
          <div class="t-cell v_middle" v-if="!viewuser.isseller">
            <div class="btn bg-orange color-white">返点客</div>
          </div>
          <div class="t-cell v_middle" v-else>
            <div class="btn bg-orange color-white">返点管理</div>
          </div>
          <div class="t-cell v_middle" v-if="viewuser.iscustomer">
            <div :class="`btn bg-red color-white priority ${getprioritycss}`" @click="priorityevent"></div>
          </div>
        </div>
      </div>
      <div class="b_top_after padding10 flex_center bg-white">
        <div class="t-table align_center font15 itemtab">
          <router-link to="/centerSales" class="t-cell item v_middle b_right_after">分享</router-link>
          <router-link to="/centerSales" class="t-cell item v_middle b_right_after">订单</router-link>
          <router-link to="/centerSales" class="t-cell item">行为</router-link>
        </div>
      </div>
      <div class="b_bottom_after"></div>
      <div class="mt12 bg-white itemlist">
        <div class="item padding10 b_bottom_after">
          <div class="t-table">
            <div class="t-cell align_left w100">真实姓名</div>
            <div class="t-cell align_right color-gray">{{ viewuser.position }}</div>
            <div class="t-cell align_right w50">
              <span class="qbtn1 bg-green color-white">更新</span>
            </div>
          </div>
        </div>
        <div class="item padding10 b_bottom_after">
          <div class="t-table">
            <div class="t-cell align_left w100">手机号</div>
            <div class="t-cell align_right color-gray">{{ viewuser.mobile }}</div>
            <div class="t-cell align_right w50">
              <span class="qbtn1 bg-green color-white">更新</span>
            </div>
          </div>
        </div>
        <div class="item padding10 b_bottom_after">
          <div class="t-table">
            <div class="t-cell align_left w100">地区</div>
            <div class="t-cell align_right color-gray">{{ viewuser.province }} {{ viewuser.city }}</div>
            <div class="t-cell align_right w50">
              <span class="qbtn1 bg-green color-white">更新</span>
            </div>
          </div>
        </div>
        <div class="item padding10 b_bottom_after">
          <div class="t-table">
            <div class="t-cell align_left w100">性别</div>
            <div class="t-cell align_right color-gray">{{ getsex }}</div>
          </div>
        </div>
        <div class="item padding10 b_bottom_after">
          <div class="t-table">
            <div class="t-cell align_left w100">真实姓名</div>
            <div class="t-cell align_right color-gray">{{ viewuser.position }}</div>
            <div class="t-cell align_right w50">
              <span class="qbtn1 bg-green color-white">更新</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<i18n>
</i18n>

<script>
export default {
  data () {
    return {
      viewuser: {
        uid: 187,
        linkman: 'YOUNG',
        position: '于国旺',
        mobile: '18512341234',
        province: '北京',
        city: '北京',
        sex: 1,
        avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/187.jpg',
        retailerInfo: { uid: 2, linkman: '仇红波' },
        memberslevel: 3,
        vip: '3星用户',
        isseller: false,
        iscustomer: true,
        priority: true
      }
    }
  },
  computed: {
    getprioritycss: function () {
      let ret = ''
      let self = this
      if (self.viewuser.priority) {
        ret = 'done'
      }
      return ret
    },
    getsex: function () {
      let val = this.viewuser.sex
      let ret = '未知'
      if (val === 1) {
        ret = '女'
      } else if (val === 2) {
        ret = '男'
      }
      return ret
    }
  },
  methods: {
    priorityevent () {
      this.viewuser.priority = !this.viewuser.priority
    }
  }
}
</script>

<style lang="less">
.membersview .btnlist .btn{
  display:inline-block;vertical-align: middle;
  width:90%;box-sizing: border-box;height:35px;line-height:35px;border-radius:20px;
}
.membersview .priority:after{content:"置顶"}
.membersview .priority.done:after{content:"取消置顶"}
.membersview .itemtab .item{color:#01a6ea;}
</style>
