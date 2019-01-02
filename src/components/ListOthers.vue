<template>
  <div class="data">
    <div v-for="item in data" :key="item.id" class="item">
      <img class="avatar" :src="item.photo"/>
      <div class="info">
        <span class="title">{{item.title}}</span>
        <span class="price" v-if="module === 'product'">¥ {{item.price}}</span>
      </div>
      <button class="ope-btn" v-if="userInfo.uid === teamInfo.uploader" @click="onDelete(item.id)">删除</button>
      <button class="ope-btn" v-else @click="onImport(item.id)">导入</button>
    </div>
  </div>
</template>

<script type="text/javascript">
import Env from 'env'
export default {
  mounted () {
    this.getData()
  },
  data () {
    return {
      data: [],
      pagestart: 0,
      limit: 5
    }
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    module: {
      type: String,
      default: ''
    },
    userInfo: {
      type: Object,
      default: null
    },
    teamInfo: {
      type: Object,
      default: null
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
  watch: {
    module (newValue) {
      if (this.pagestart) {
        this.pagestart = 0
        this.data = []
      }
      this.getData()
    }
  },
  methods: {
    getData () {
      if (this.data.length === this.pagestart * this.limit) {
        this.$http({
          url: `${Env.BokaApi}/api/team/link`,
          method: 'post',
          data: {
            teamid: this.id,
            module: this.module,
            pagestart: this.pagestart,
            limit: this.limit
          }
        }).then(res => {
          if (!this.pagestart) {
            this.data = res.data.data
          } else {
            this.data.push(...res.data.data)
          }
          this.pagestart++
          console.log(this.data)
        })
      } else {
        console.log('没有数据了！')
      }
    },
    onDelete (moduleid) {
      const _this = this
      this.$vux.confirm.show({
        title: `确定删除该${this.moduleTransfer}吗？`,
        onConfirm () {
          console.log('in onDelete confirm')
          _this.$http({
            url: `${Env.BokaApi}/api/team/band`,
            method: 'POST',
            data: {
              type: 'del',
              module: _this.module,
              id: _this.id,
              moduleid: moduleid
            }
          }).then(res => {
            console.log(res)
            if (res.data.flag) {
              _this.pagestart = 0
              _this.data = []
              _this.getData()
            }
          })
        }
      })
    },
    onImport (moduleid) {
      this.$http({
        url: `${Env.BokaApi}/api/team/copy`,
        method: 'POST',
        data: {
          id: moduleid,
          module: this.module
        }
      }).then(res => {
        console.log(res)
        if (res.data.flag) {
          this.$vux.toast.show({
            text: `导入${this.moduleTransfer}成功！`
          })
        }
      })
    }
  }
};
</script>

<style lang="less" scoped="">
  .data{
    .item{
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: space-between;
      padding: 20px;
      background-color: #fff;
      margin-bottom: 20px;
      border-top: 1px solid #e4e4e4;
      border-bottom: 1px solid #e4e4e4;
      box-sizing: border-box;
      .avatar{
        width: 50px;
        height: 50px;
        border-radius: 10px;
        margin-right: 20px;
        object-fit: cover;
      }
      .info{
        flex: 1;
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .title{
          font-size: 14px;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
        .price{
          font-size: 14px;
          color: #ff6a61;
          margin-top: 10px;
        }
      }
      .ope-btn{
        padding: 5px 8px;
        border-radius: 10px;
        background-color: #ff6a61;
        color: #fff;
        flex: 0 0 50px;
        border: none;
      }
    }
    .item:first-child{
      border-top: none;
    }
    .item:last-child{
      margin-bottom: 0;
    }
  }
</style>