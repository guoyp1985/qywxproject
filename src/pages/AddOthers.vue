<template>
  <scroll-view ref="wraper" @scrollEnd="scrollEnd">
    <div slot="content" ref="content" class="data">
        <div v-for="item in data" :key="item.id" class="item" @click="onCheck(item)">
          <!-- <check-icon :value.sync="item.isChecked"></check-icon> -->
          <img class="avatar" :src="item.photo"/>
          <div class="info">
            <span class="title">{{item.title}}</span>
            <span class="price" v-if="module === 'product'">{{item.price}}</span>
          </div>
        </div>
    </div>
    <div slot="ope-btns" class="ope-btns">
      <button class="cancel-btn" @click="onCancel">取消</button>
      <button class="confirm-btn" @click="onConfirm">确定</button>
    </div>
  </scroll-view>
</template>

<script type="text/javascript">
import ScrollView from '@/components/ScrollView'
import Env from 'env'
import { User } from '#/storage'
import { CheckIcon } from 'vux'
export default {
  activated () {
    console.log(this.$route.query)
    this.module = this.$route.query.module
    this.userInfo = User.get()
    this.data = []
    this.pagestart = 0
    this.getData(this.module)
  },
  data () {
    return {
      module: '',
      data: [],
      pagestart: 0,
      limit: 10,
      selectedItem: []
    }
  },
  computed: {
    moduleTransfer () {
      let ret = ''
      switch (this.module) {
        case 'product':
          ret = '商品'
          break
        case 'activity':
          ret = '活动'
          break
        case 'news':
          ret = '文章'
          break
        case 'courseclass':
          ret = '培训'
          break
      }
      return ret
    }
  },
  components: {
    ScrollView,
    CheckIcon
  },
  methods: {
    scrollEnd (y) {
      const wraperHeight = this.$refs.wraper.$el.offsetHeight
      const contentHeight = this.$refs.content.offsetHeight
      let height = contentHeight - wraperHeight
      if (Math.abs(y) >= height) {
        console.log('滑动到底部了！')
        this.getData(this.module)
      }
    },
    getData (module) {
      if (this.data.length === this.pagestart * this.limit) {
        let url = ''
        let method = ''
        let params = null
        if (module === 'activity') {
          url = `${Env.BokaApi}/api/retailer/listActivity`
          method = 'GET'
          params = {
            do: 'store',
            wid: this.userInfo.uid
          }
        } else {
          url = `${Env.BokaApi}/api/list/${module}`
          method = 'POST'
          params = {
            uploader: this.userInfo.uid
          }
        }
        params = {
          ...params,
          pagestart: this.pagestart,
          limit: this.limit
        }
        this.$http({
          url: url,
          method: method,
          data: params
        }).then(res => {
          console.log(res)
          let data = []
          if (this.module === 'activity') {
            data = res.data.data
          } else {
            data = res.data
          }
          for (let i = 0; i < data.length; i++) {
            data.isChecked = false
          }
          if (!this.pagestart) {
            this.data = data
          } else {
            this.data.push(...data)
          }
          this.pagestart++
          this.$refs.wraper.bscroll.refresh()
        })
      } else {
        console.log('没有更多数据了！')
      }
    },
    onCheck (item) {
      console.log(item)
      if (!item.isChecked) {
        item.isChecked = true
        this.selectedItem.push(item)
      } else {
        item.isChecked = false
        this.selectedItem.splice(this.selectedItem.indexOf(item), 1)
      }
    },
    onCancel () {
      this.$router.back()
    },
    onConfirm () {
      if (!this.selectedItem.length) {
        this.$vux.toast.show({
          text: `请选择${this.moduleTransfer}！`
        })
        return
      }
      console.log('in AddOthers onConfirm')
    }
  }
};
</script>

<style lang="less" scoped="">
  .data{
    width: 100vw;
    padding-bottom: 45px;
    .item{
      display: flex;
      width: 100%;
      align-items: center;
      padding: 20px;
      box-sizing: border-box;
      justify-content: flex-start;
      background-color: #fff;
      margin-bottom: 10px;
      .avatar{
        flex: 0 0 50px;
        width: 50px;
        height: 50px;
        object-fit: cover;
        margin-left: 10px;
        margin-right: 20px;
      }
      .info{
        flex: 1;
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 14px;
        .title{
          width: 100%;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
        .price{
          color: #ff6a61;
        }
      }
    }
  }
  .ope-btns{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100vw;
    display: flex;
    button{
      flex: 1;
      height: 45px;
      color: #fff;
      border: none;
      font-size: 14px;
    }
    .cancel-btn{
      background-color: #cdcdcd;
    }
    .confirm-btn{
      background-color: #ff6a61;
    }
  }
</style>