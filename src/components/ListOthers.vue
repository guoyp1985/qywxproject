<template>
  <div class="data">
    <div v-for="(item, index) in data" :key="item.id" class="item" @click="toItem(item)">
      <img class="avatar" :src="item.photo"/>
      <div class="info">
        <span class="title">{{item.title}}</span>
        <span class="price" v-if="module === 'product'">¥ {{item.price}}</span>
      </div>
      <div class="ope-all">
        <button class="ope-btn" v-if="teamInfo.manager > 0" @click.stop="onDelete(item.id, index)">删除</button>
        <button class="ope-btn" @click.stop="onImport(item.id)">导入</button>
      </div>
  </div>
    <div class="tip-message" v-if="!data.length && loaded"><span>暂无{{moduleTransfer}}</span></div>
  </div>
</template>

<script type="text/javascript">
import Env from 'env'
export default {
  created () {
    console.log('in listothers activated')
    this.getData()
  },
  data () {
    return {
      data: [],
      pagestart: 0,
      limit: 5,
      loaded: false
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
    },
    backurl: {
      type: String,
      default: ''
    },
    loginUser: {
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
      console.log('in getData')
      // if (this.loaded) {
      //   this.loaded = false
      // }
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
          this.$nextTick(() => {
            this.$parent.refresh()
          })
          this.pagestart++
          console.log(this.data)
          this.loaded = true
        })
      } else {
        console.log('没有数据了！')
      }
    },
    onDelete (moduleid, index) {
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
              _this.data.splice(index, 1)
              if (_this.data.length === 0) {
                _this.pagestart = 0
                _this.getData()
              }
            }
          })
        }
      })
    },
    importData (moduleid) {
      const _this = this
      _this.$http({
        url: `${Env.BokaApi}/api/team/teamset`,
        method: 'post',
        data: {
          id: _this.id,
          type: 'addMember'
        }
      }).then(res => {
        console.log(res)
        if (res.data.flag) {
          _this.teamInfo.join = 1
          _this.$http({
            url: `${Env.BokaApi}/api/team/copy`,
            method: 'POST',
            data: {
              id: moduleid,
              module: _this.module
            }
          }).then(res => {
            console.log(res)
            if (res.data.flag) {
              _this.$vux.toast.show({
                text: `导入${_this.moduleTransfer}成功！`
              })
            }
          })
        }
      })
    },
    onImport (moduleid) {
      let _this = this
      if (!this.loginUser.isretailer || this.loginUser.retailerinfo.moderate !== 1) {
        this.$vux.confirm.show({
          // title: `你还不是卖家哦，成为卖家可免费导入该团队的所有信息哦，一键导入便可快速使用！`,
          title: `你还没有注册卖家哦，注册成功可免费导入该团队的所有信息哦，一键导入便可快速使用！`,
          // title: _this.backurl,
          onConfirm () {
            console.log(_this.backurl)
            _this.$wechat.miniProgram.navigateTo({url: _this.backurl})
          }
        })
      } else if (!this.teamInfo.join) {
        this.$vux.confirm.show({
          title: `您还没有加入团队，确定加入该团队并导入吗？`,
          onConfirm () {
            _this.importData(moduleid)
          }
        })
      } else {
        _this.importData(moduleid)
      }
    },
    toItem (item) {
      console.log('toItem')
      if (this.module === 'courseclass') {
        this.$vux.toast.show({
          text: `培训暂不支持预览哦^_^`,
          type: 'warn'
        })
        return
      }
      let path = ''
      let query = null
      switch (this.module) {
        case 'product':
          path = '/product'
          query = {
            id: item.id,
            wid: this.teamInfo.uid
          }
          break
        case 'activity':
          console.log(item)
          if (item.type === 'bargainbuy') {
            path = '/activity'
          } else {
            path = '/product'
          }
          query = {
            id: item.id
          }
          break
        case 'news':
          path = '/news'
          query = {
            id: item.id
          }
          break
      }
      this.$router.push({
        path: path,
        query: query
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
      margin-bottom: 5px;
      border-top: 1px solid #e4e4e4;
      border-bottom: 1px solid #e4e4e4;
      box-sizing: border-box;
      .avatar{
        width: 50px;
        height: 50px;
        border-radius: 6px;
        margin-right: 20px;
        object-fit: cover;
      }
      .info{
        flex: 2;
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
      .ope-all{
        display: flex;
        .ope-btn{
          flex-direction: row;
          margin-right: 5px;
          padding: 5px 8px;
          border-radius: 10px;
          background-color: #ff6a61;
          color: #fff;
          flex: 0 0 50px;
          border: none;
        }
      }
    }
    .item:first-child{
      border-top: none;
    }
    .item:last-child{
      margin-bottom: 0;
    }
    .tip-message{
      text-align: center;
      color: #c9c9c9;
      margin-top: 30px;
    }
  }
</style>
