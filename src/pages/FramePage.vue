<template>
  <div class="containerarea bold font20">
    <div class="padding20">
      <div class="db-flex w_100">
        <div class="flex_cell">
          <search
            class="v-search bg-white"
            v-model="searchword"
            :auto-fixed="autofixed"
            @on-submit="onSubmit"
            @on-change="onChange"
            @on-cancel="onCancel"
            ref="search">
          </search>
        </div>
        <div class="font15 w100 flex_left" style="width:90px;">
          <div class="bg-red color-white flex_center w80" style="height:35px;" @click="onSubmit">搜索</div>
        </div>
      </div>
    </div>
    <iframe class="w_100" :src="`https://weixin.sogou.com/weixin?type=2&s_from=input&query=${searchword}&ie=utf8`"></iframe>
  </div>
</template>

<script>
import {Search, XTextarea} from 'vux'
export default {
  components: {
    Search, XTextarea
  },
  data () {
    return {
      autofixed: false,
      searchword: '',
      pageIndex: 0
    }
  },
  methods: {
    textareaChange (refname) {
      let curArea = this.$refs[refname][0] ? this.$refs[refname][0] : this.$refs[refname]
      curArea.updateAutosize()
    },
    textareaFocus (refname) {
      let curArea = this.$refs[refname][0] ? this.$refs[refname][0] : this.$refs[refname]
      curArea.updateAutosize()
    },
    onChange (val) {
      this.searchword = val
    },
    onCancel () {
      const self = this
      self.searchword = ''
      self.searchdata = []
    },
    onSubmit () {
      // const self = this
      // let kw = self.searchword
      // if (!kw || self.$util.trim(kw) === '') {
      //   self.$vux.toast.text('请输入搜索内容', 'middle')
      //   return false
      // }
      // if (self.$util.trim(kw) !== '') {
      //   self.$refs.search[0].setBlur()
      //   self.searchdata = []
      //   self.pagestart1 = 0
      //   self.searchFun(kw)
      //   self.keyword = ''
      // }
    },
    test () {
      this.$util.wxAccess()
    },
    init () {
      this.$util.wxAccessListening()
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="less" scoped>
</style>
