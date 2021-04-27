<style lang="less">
.customer-item{
  padding:10px 10px 0;background-color:#fff;
  .avatar{width:50px;height:50px;border-radius:50%;object-fit: cover;}
  .btn{
    background-color:#ff0000;color:#fff;width:40px;height:25px;line-height:25px;text-align:center;border-radius:20px;
  }
  .info-area{
    background-color:#fff;display:flex;padding:10px;box-sizing:border-box;flex-wrap: wrap;
    .txt-item{width:50%;box-sizing:border-box;line-height:25px;position:relative;}
    .txt-item:nth-child(odd){padding-right:5px;}
    .txt-item:nth-child(even){padding-left:5px;}
  }
}
</style>

<template>
  <div class="scroll_item customer-item">
    <div class="flex_left pb10">
      <div class="pr10">
        <img class="avatar" :src="item.headimgurl" onerror="javascript:this.src='https://tosqy.boka.cn/images/user.jpg';" />
      </div>
      <div class="flex_cell flex_left">{{item.linkman}}</div>
      <div class="flex_right pl10">
        <div class="btn" @click="expandEvent(item, index)">
          <span class="al al-asmkticon0165"></span>
        </div>
      </div>
    </div>
    <div v-if="item.checked">
      <div class="info-area w_100 font14 color-gray b_bottom_after">
        <div class="txt-item">性别: {{item.sexname}}</div>
        <div class="txt-item db-flex" v-if="item.mobile && item.mobile != ''" @click="toPhone(item)">手机: <span>{{item.mobile}}</span><div class="phone bg-red1 ml5"><span class="al al-dianhua font16"></span></div></div>
        <div class="txt-item">地区: {{ item.country }} {{ item.province }} {{ item.city }}</div>
        <div class="txt-item flex_left" @click="clickYingxiangli">影响力:
          <span class="color-red4">{{item.yingxiangli}}</span>
          <span class="al al-wenhao font20 ml5"></span>
        </div>
        <div class="txt-item">推荐人: {{item.recommendname}}</div>
        <div class="txt-item" v-if="item.uid != user.uid">客户类型: {{item.customertype}}</div>
        <div class="txt-item">获客时间: {{item.dateline_str}}</div>
      </div>
      <div class="flex_center bg-white h40 color-gray2 font14 color-gray2">
        <div class="flex_cell h_100 flex_center b_right_after">联系TA</div>
        <router-link to="/activityList" class="flex_cell h_100 flex_center b_right_after" v-if="item.exceed_7">推送活动</router-link>
        <div class="flex_cell h_100 flex_center" @click="toView(item)">更多</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomerItem',
  props: {
    item: {
      type: Object,
      default: {}
    },
    index: {
      type: Number,
      default: 0
    },
    tabIndex: {
      type: Number,
      default: 0
    },
    user: {
      type: Object,
      default: {}
    }
  },
  methods: {
    expandEvent (item, index) {
      this.$emit('expand-event', item, index, this.tabIndex)
    },
    toPhone (item) {
      location.href = `tel:${item.mobile}`
    },
    clickYingxiangli () {
      this.$emit('yxl-event')
    },
    toView (item) {
      this.$router.push({path: '/qiyeCustomerView', query: {uid: item.uid}})
    },
    giveCard (item) {
      this.$emit('give-card', item)
    },
    pushEvent (item) {
      this.$emit('push-event', item)
    }
  }
}
</script>
