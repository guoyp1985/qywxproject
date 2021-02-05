<style lang="less">
.complain-page{
  width:100%;box-sizing: border-box;
  textarea{width:100%;height:200px;resize:none;}
  .btn{
    width:100px;line-height:40px;background-color:#07c160;color:#fff;border-radius:60px;text-align:center;
  }
}
</style>
<template>
  <div class="bg-page complain-page">
    <div class="flex_center padding10 font16 bold">问题反馈</div>
    <div class="form-list">
      <div class="form-item left">
        <div class="title-cell">联系电话</div>
        <div class="input-cell flex_left">
          <input type="text" placeholder="联系电话" class="align_left" />
        </div>
      </div>
      <div class="form-item left">
        <div class="title-cell">问题建议</div>
        <div class="input-cell">
          <textarea placeholder="问题建议"></textarea>
        </div>
      </div>
    </div>
    <div class="mt20 flex_center">
      <div class="btn">提交</div>
    </div>
  </div>
</template>

<script>
import {} from 'vux'
import { User } from '#/storage'
export default {
  components: {},
  data () {
    return {
      query: {},
      loginUser: {}
    }
  },
  methods: {
    refresh () {
      this.query = this.$route.query
      this.loginUser = User.get()
    }
  },
  activated () {
    this.refresh()
  }
}
</script>
