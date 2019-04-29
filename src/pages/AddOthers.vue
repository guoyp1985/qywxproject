<template>
  <scroll-view ref="wraper" @scrollEnd="scrollEnd">
    <div slot="content" ref="content" class="data">
        <div v-for="(item, index) in data" :key="item.id" class="item" @click="onCheck(item)">
          <div :class="{'selected' : item.isChecked}" class="icon">
            <span class="al al-gou" v-if="item.isChecked"></span>
          </div>
          <img class="avatar" :src="item.photo"/>
          <div class="info">
            <span class="title">{{item.title}}</span>
            <span class="price" v-if="module === 'product'">{{item.price}}</span>
          </div>
        </div>
        <div class="tip-message" v-if="!data.length"><span>暂无{{moduleTransfer}}</span></div>
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
export default {
  activated () {
    console.log(this.$route.query)
    this.module = this.$route.query.module
    this.id = this.$route.query.id
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
      selectedItemId: [],
      id: null,
      loaded: false
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
    ScrollView
  },
  methods: {
    scrollEnd (y) {
      const wraperHeight = this.$refs.wraper.$el.offsetHeight
      const contentHeight = this.$refs.content.offsetHeight
      let height = contentHeight - wraperHeight
      if (Math.abs(y) >= height) {
        console.log('滑动到底部了！')
        if (this.loaded) {
          this.getData(this.module)
        }
      }
    },
    getData (module) {
      if (this.loaded) {
        this.loaded = false
      }
      console.log(module)
      if (this.data.length === this.pagestart * this.limit) {
        let url = ''
        let params = {teamid: this.id, pagestart: this.pagestart, limit: this.limit}
        if (module === 'activity') {
          url = `${Env.BokaApi}/api/retailer/listActivity`
          params = {
            ...params,
            do: 'store',
            wid: this.userInfo.uid
          }
          this.$http.get(url, {
            params: params
          }).then(res => {
            console.log(res)
            const data = res.data.data
            for (let i = 0; i < data.length; i++) {
              data[i].isChecked = false
            }
            if (!this.pagestart) {
              this.data = data
            } else {
              this.data.push(...data)
            }
            console.log(data)
            this.pagestart++
            this.loaded = true
            this.$nextTick(() => {
              this.$refs.wraper.bscroll.refresh()
            })
          })
        } else {
          // if (module === 'news') {
          //   url = `${Env.BokaApi}/api/list/news?from=retaile`
          // } else if (module === 'product') {
          //   url = `${Env.BokaApi}/api/retailer/getRetailerProducts`
          // } else {
          url = `${Env.BokaApi}/api/list/${module}`
          // }
          params = {
            ...params,
            uploader: this.userInfo.uid,
            wid: this.userInfo.uid
          }
          this.$http({
            url: url,
            method: 'POST',
            data: params
          }).then(res => {
            console.log(res)
            const data = res.data
            let retdata = data.data ? data.data : data
            for (let i = 0; i < retdata.length; i++) {
              retdata[i].isChecked = false
            }
            if (!this.pagestart) {
              this.data = retdata
            } else {
              this.data.push(...retdata)
            }
            console.log(retdata)
            console.log(this)
            this.pagestart++
            this.loaded = true
            this.$nextTick(() => {
              this.$refs.wraper.bscroll.refresh()
            })
          })
        }
      } else {
        console.log('没有更多数据了！')
      }
    },
    onCheck (item) {
      if (!item.isChecked) {
        item.isChecked = true
        this.selectedItemId.push(item.id)
      } else {
        item.isChecked = false
        this.selectedItemId.splice(this.selectedItemId.indexOf(item.id), 1)
      }
    },
    onCancel () {
      this.$router.back()
    },
    onConfirm () {
      let _this = this
      if (!this.selectedItemId.length) {
        this.$vux.toast.show({
          text: `请选择${this.moduleTransfer}！`,
          type: 'warn'
        })
        return
      }
      this.$http({
        url: `${Env.BokaApi}/api/team/band`,
        method: 'POST',
        data: {
          type: 'add',
          module: this.module,
          id: this.id,
          moduleid: this.selectedItemId.join()
        }
      }).then(res => {
        if (res.data.flag) {
          this.selectedItemId = []
          this.$vux.toast.show({
            text: `添加${this.moduleTransfer}成功！`,
            onHide: _this.$router.back()
          })
        }
      })
    }
  }
};
</script>

<style lang="less" scoped="">
  .data{
    width: 100vw;
    padding-bottom: 45px;
    touch-action: pan-y;
    .item{
      display: flex;
      width: 100%;
      align-items: center;
      padding: 20px;
      box-sizing: border-box;
      justify-content: flex-start;
      background-color: #fff;
      margin-bottom: 10px;
      .icon{
        width: 20px;
        height: 20px;
        border-radius: 50%;
        color: #1fb922;
        border: 1px solid #c9c9c9;
        color: #c9c9c9;
        span{
          display: inline-block;
          width: 100%;
          height: 100%;
          line-height: 20px;
          text-align: center;
          vertical-align: top;
        }
        .al{
          font-size: 12px;
        }
      }
      .selected{
        background-color: #1fb922;
        color: #fff;
      }
      .avatar{
        flex: 0 0 50px;
        width: 50px;
        height: 50px;
        object-fit: cover;
        margin-left: 20px;
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
  .tip-message{
    padding-top:70%;
    text-align: center;
    color: #c9c9c9;
    margin-top: 30px;
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
