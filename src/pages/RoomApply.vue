/*
* @description: 群群推页面
* @auther: simon
* @created_date: 2019-1-5
*/
<template>
  <div id="room-apply" class="containerarea font14 s-havebottom">
    <form>
      <forminputplate class="required">
        <span slot="title">群名称</span>
        <input v-model="submitRoom.topic" type="text" name="topic" class="input border-box" placeholder="请输入微信群名称" />
      </forminputplate>
      <forminputplate class="required">
        <span slot="title">群主号</span>
        <input v-model="submitRoom.owner" type="text" name="topic" class="input border-box" placeholder="请输入微信群名称" />
      </forminputplate>
      <div class="form-item required padding10" v-if="roomCategories.length > 0">
        <input v-model="roomCategory" type="hidden" name="productclass" />
        <div class="pb10">
          <span>选择群属性</span>
          <span class="color-gray">(最多选两项)</span>
          <span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span>
        </div>
        <checker
        class="x-checker"
        type="checkbox"
        v-model="roomCategory"
        :max="2"
        default-item-class="ck-item"
        selected-item-class="ck-item-selected">
          <checker-item class="border1px color-gray" v-for="(item, index) in roomCategories" :key="index" :value="item.id">{{ item.title }}</checker-item>
        </checker>
      </div>
      <div class="protocal-area">
        <check-icon :value.sync="isAccept" type="plain"><a>同意群群推协议</a></check-icon>
      </div>
    </form>
    <div class="s-bottom submit-button color-white" @click="submitHandle">
      <span>提交评估</span>
    </div>
  </div>
</template>
<script>
import { Checker, CheckerItem, CheckIcon, XButton } from 'vux'
import forminputplate from '@/components/Forminputplate'
export default {
  components: {
    Checker, CheckerItem, CheckIcon, XButton, forminputplate
  },
  data () {
    return {
      submitRoom: {},
      isAccept: false,
      isSubmitIng: false,
      roomCategory: [1],
      roomCategories: [
        {id: 1, title: '夜跑群'},
        {id: 2, title: '养生群'},
        {id: 3, title: '追星群'}
      ]
    }
  },
  methods: {
    submitHandle () {
      if (!this.isSubmitIng) {
        const self = this
        const room = {
          title: '',
          ownerid: '',
          tags: roomCategory.join(',')
        }
        if (this.$util.validateQueue(
          [
            {title: room.title},
            {ownerid: room.ownerid},
          ],
          model => {
            self.$vux.toast.text('未填必选项', 'middle')
          }
        )) {
          this.isSubmitIng = true
          this.$vux.loading.show()
          this.$http.post(`${ENV.BokaApi}/api/groups/addGroup`, room)
          .then(res => {
            this.$vux.loading.hide()
            this.$router.back()
          })
        }
      }
    }
  }
}
</script>
<style lang="less">
#room-apply {
  background-color: #ffffff;
}
#room-apply .protocal-area {
  padding: 20px 0;
  text-align: center;
}
#room-apply .submit-button {
  background-color: @boka-red;
  line-height: 45px;
  text-align: center;
}
</style>
