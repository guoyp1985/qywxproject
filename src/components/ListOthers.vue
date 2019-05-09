<template>
  <div class="data">
    <div v-for="(item, index) in data" :key="item.id" class="item flex_left">
      <div class="pic flex_left" @click="toItem(item)">
        <img class="avatar" :src="item.photo"/>
      </div>
      <div class="info flex_left flex_cell" @click="toItem(item)">
        <div class="w_100">
          <div class="font14 clamp1">{{item.title}}</div>
          <div class="price" v-if="module === 'product'">¥ {{item.price}}</div>
        </div>
      </div>
      <div class="ope-all flex_right">
        <button class="ope-btn flex_center" v-if="teamInfo.manager > 0" @click.stop="onDelete(item.moduleid, index)">删除</button>
        <button class="ope-btn flex_center" v-if="!item.haveimport" @click.stop="onImport(item.id,index)">导入</button>
        <button class="ope-btn flex_center" v-else>已导入</button>
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
      loaded: false,
      submitIng: false,
      error: ''
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
    importData (itemid, index) {
      const _this = this
      if (!this.submitIng) {
        this.submitIng = true
        _this.$http({
          url: `${Env.BokaApi}/api/team/copy`,
          method: 'POST',
          data: {
            id: itemid,
            module: _this.module
          }
        }).then(res => {
          this.submitIng = false
          console.log(res)
          const data = res.data
          if (data.flag) {
            this.data[index].haveimport = 1
            _this.$vux.toast.show({
              text: `导入${_this.moduleTransfer}成功！`
            })
          } else {
            _this.$vux.toast.show({
              text: data.error
            })
          }
        })
      }
    },
    onImport (itemid, index) {
      let _this = this
      if (!this.loginUser.isretailer || this.loginUser.retailerinfo.moderate !== 1) {
        this.$vux.confirm.show({
          title: `你还没有注册卖家哦，注册成功可免费导入该团队的所有信息哦，一键导入便可快速使用！`,
          onConfirm () {
            let url = '/pages/vip'
            if (_this.$route.query.weburl) {
              let weburl = encodeURIComponent(_this.$route.query.weburl)
              let webquery = encodeURIComponent(_this.$route.query.webquery)
              url = `${url}?weburl=${weburl}&webquery=${webquery}`
              _this.backurl = url
            }
            _this.$wechat.miniProgram.navigateTo({url: url})
          }
        })
      } else if (!this.teamInfo.join) {
        this.$vux.confirm.show({
          title: `您还没有加入团队，确定加入该团队并导入吗？`,
          onConfirm () {
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
                _this.importData(itemid, index)
              }
            })
          }
        })
      } else {
        _this.importData(itemid, index)
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
            id: item.moduleid,
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
            id: item.moduleid
          }
          break
        case 'news':
          path = '/news'
          query = {
            id: item.moduleid
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
      width: 100%;padding:20px 10px;box-sizing: border-box;
      background-color: #fff;
      border-bottom: 1px solid #e4e4e4;
      .pic{
        width:60px;
        .avatar{width: 50px;height: 50px;border-radius: 6px;object-fit: cover;}
      }
      .info{
        .price{font-size: 14px;color: #ff6a61;margin-top: 10px;}
      }
      .ope-all{
        width:120px;
        .ope-btn{
          width:50px;height:25px;
          border-radius: 10px;
          background-color: #ff6a61;
          color: #fff;
          border: none;
          outline: 0;
        }
        .ope-btn:not(:last-child){margin-right:10px;}
      }
    }
    .item:not(:first-child){border-top: 1px solid #e4e4e4;}
    .item:not(:last-child){margin-bottom:5px;}
    .tip-message{
      text-align: center;
      color: #c9c9c9;
      margin-top: 30px;
    }
  }
</style>
