<template>
  <div class="containerarea">
    <scroll-view class="team-page" ref="wraper" @scrollEnd="scrollEnd" @scroll="scroll">
      <div class="team" :class="{'pd30' : fixedTop}" slot="content" ref="content">

        <!-- 背景图 -->
        <div class="team-bg"><img src="https://tossharingsales.boka.cn/minigxk/team_bg.png" ref="teamBg"></div>

        <!-- 团队信息 -->
        <div class="team-info" ref="teamInfo">
          <div class="team-info-inner">
            <div class="inner-item inner-item-left">
              <img class="avatar" :src="teamInfo.avatar"/>
              <button class="btn" v-if="teamInfo.manager > 0" @click="manageTeam">管理团队</button>
              <button class="btn" v-if="!teamInfo.join" @click="joinTeam">加入团队</button>
              <button class="btn" v-if="teamInfo.join && teamInfo.manager === 0" @click="outTeam">退出团队</button>
            </div>
            <div class="inner-item inner-item-right">
              <div class="leader">
                {{teamInfo.title}}
                <div class="al al-fenxiang1 font20" style="position:absolute;right:20px;top:16px;color:#ff6a61;" @click="tabModal"></div>
              </div>
              <div class="counts">
                <span>商品 {{teamInfo.product}}</span>
                <span>文章 {{teamInfo.news}}</span>
                <div>
                  <span>活动 {{teamInfo.activity}}</span>
                  <span>素材 {{teamInfo.teamsource}}</span>
                  <span>培训 {{teamInfo.courseclass}}</span>
                </div>
              </div>
              <div class="title">{{teamInfo.content}}</div>
            </div>
          </div>
        </div>

        <!-- 团队内容 -->
        <div class="team-content">

          <!-- 导航 -->
          <div class="team-content-nav" v-if="!fixedTop">
            <div tag="div" v-for="(nav, index) in navs" :key="nav.id" class="nav-item" :class="{'nav-item-active' : currentTab === index}" @click="changeTab(index)">
                <span>{{nav}}</span>
            </div>
          </div>

          <div class="content-list">

            <!-- 素材 -->
            <list-tags ref="listTags" :userInfo="userInfo" :teamInfo="teamInfo" :id="id" v-if="currentTab === 0"></list-tags>

            <!-- 商品、活动、文章、培训 -->
            <list-others ref="listOthers" :userInfo="userInfo" :teamInfo="teamInfo" :loginUser="loginUser" :backurl="backurl" :id="id" :module="module" v-else></list-others>

          </div>

        </div>
      </div>

      <div class="team-content-nav fixed-top" slot="team-content-nav" v-if="fixedTop">
        <div tag="div" v-for="(nav, index) in navs" :key="nav.id" class="nav-item" :class="{'nav-item-active' : currentTab === index}" @click="changeTab(index)">
            <span>{{nav}}</span>
        </div>
      </div>

      <div class="add-import" slot="ope-btns">
        <span class="add al al-add" v-if="teamInfo.manager > 0" @click="onAdd"></span>
        <!-- <div class="import" v-if="teamInfo.manager === 0 && teamInfo.join && currentTab !== 0">
          <button @click="importAll">导入全部{{moduleTransfer}}</button>
        </div> -->
        <template v-else>
          <div class="import" v-if="currentTab !== 0">
            <button @click="importAll">导入全部{{moduleTransfer}}</button>
          </div>
        </template>
      </div>
      <div class="modalshow" v-if="showModal" @click="closeShow" slot="ope-btns">
        <div class="modaInfo">
          <div class="al al-feiji color-white"></div>
          <div class="align_center color-white bold">点击" ··· "，" 转发 " 给队员邀请加入</div>
          <div class="btnknow" @click="closeShow">知道了</div>
        </div>
      </div>
    </scroll-view>
    <template v-if="showTip">
      <tip-layer
        @clickButton="joinTeam"
        @clickClose="closeTipModal"
        title="邀请加入"
        content="加入团队即可免费导入商品、活动、文章、培训等信息到自己的账号内，一键导入便可马上使用，赶快加入吧"
        buttonTxt="立即加入团队">
      </tip-layer>
    </template>
    <div class="bg-theme flex_center color-white fix-home-icon" @click="toHome" v-if="query.from">
      <i class="al al-home1"></i>
    </div>
  </div>
</template>

<script type="text/javascript">
import ENV from 'env'
import ScrollView from '@/components/ScrollView'
import ListTags from '@/components/ListTags'
import ListOthers from '@/components/ListOthers'
import TipLayer from '@/components/TipLayer'
import { User } from '#/storage'
export default {
  components: {
    ScrollView, ListTags, ListOthers, TipLayer
  },
  data () {
    return {
      query: {},
      navs: ['素材', '商品', '活动', '文章', '培训'],
      teamInfo: {},
      currentTab: 0,
      id: null,
      userInfo: {},
      loginUser: {},
      module: '',
      fixedTop: false,
      showModal: false,
      backurl: '',
      showTip: false
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
        default:
          ret = '素材'
      }
      return ret
    }
  },
  created () {
    this.userInfo = User.get()
    this.id = this.$route.query.id
    this.getTeamInfo(this.id).then(res => {
      console.log(res)
      this.teamInfo = res.data.data
      if (!this.teamInfo.join) {
        this.showTip = true
      }
    })
    let url = '/pages/vip'
    if (this.$route.query.weburl) {
      let weburl = encodeURIComponent(this.$route.query.weburl)
      let webquery = encodeURIComponent(this.$route.query.webquery)
      url = `${url}?weburl=${weburl}&webquery=${webquery}`
      this.backurl = url
    } else {
      this.backurl = url
    }
    console.log('this.backurl')
    console.log(this.backurl)
  },
  activated () {
    this.fixedTop = false
    this.$http.get(`${ENV.BokaApi}/api/user/show`).then(res => {
      const data = res.data
      this.loginUser = data
      User.set(this.loginUser)
      this.query = this.$route.query
      if (!this.currentTab) {
        this.$refs.listTags.tags = []
        this.$refs.listTags.pagestart = 0
        this.$refs.listTags.getTags()
        this.getTeamInfo(this.id).then(res => {
          this.teamInfo = res.data.data
        })
      } else {
        this.$refs.listOthers.data = []
        this.$refs.listOthers.pagestart = 0
        this.$refs.listOthers.getData()
        this.getTeamInfo(this.id).then(res => {
          console.log(res)
          this.teamInfo = res.data.data
        })
      }
    })
  },
  methods: {
    toHome () {
      let type = 'default'
      alert(1)
      if (this.query.fromapp) {
        type = this.query.fromapp
      }
      let url = ENV.AppHomePage[type]
      // this.$wechat.miniProgram.reLaunch({url: `${url}`})
      this.$wechat.miniProgram.redirectTo({url: `/pages/wymh`})
    },
    closeTipModal () {
      this.showTip = false
    },
    tabModal () {
      this.showModal = true
    },
    closeShow () {
      this.showModal = false
    },
    getTeamInfo (id) {
      return this.$http({
        url: `${ENV.BokaApi}/api/team/info`,
        method: 'post',
        data: {
          id: id
        }
      })
    },
    changeTab (index) {
      console.log(index)
      this.currentTab = index
      this.$refs.wraper.refresh()
      this.fixedTop = false
      switch (index) {
        case 0:
          this.$nextTick(() => {
            this.isloading = false
            this.$refs.listTags.tags = []
            this.$refs.listTags.pagestart = 0
            this.$refs.listTags.getTags()
          })
          break
        case 1:
          this.module = 'product'
          break
        case 2:
          this.module = 'activity'
          break
        case 3:
          this.module = 'news'
          break
        case 4:
          this.module = 'courseclass'
          break
      }
    },
    scrollEnd (y) {
      const wraperHeight = this.$refs.wraper.$el.offsetHeight
      const contentHeight = this.$refs.content.offsetHeight
      let height = contentHeight - wraperHeight
      console.log(wraperHeight)
      console.log(contentHeight)
      console.log(height)
      console.log(-y)
      if (Math.abs(y) >= height) {
        console.log('滑动到底部了！')
        if (!this.currentTab) {
          this.$refs.listTags.getTags()
        } else {
          this.$refs.listOthers.getData()
        }
      }
    },
    scroll (y) {
      const wraperHeight = this.$refs.wraper.$el.offsetHeight
      const teamBgHeight = this.$refs.teamBg.offsetHeight
      const teamInfoHeight = this.$refs.teamInfo.offsetHeight
      const height = wraperHeight - (teamBgHeight + teamInfoHeight)
      if (Math.abs(y) >= height) {
        this.fixedTop = true
      } else {
        this.fixedTop = false
      }
      console.log(this.fixedTop)
    },
    onAdd () {
      const _this = this
      if (!this.loginUser.isretailer || this.loginUser.retailerinfo.moderate !== 1) {
        this.$vux.confirm.show({
          title: `申请卖家后才可操作,确定申请？`,
          onConfirm () {
            let url = '/pages/vip'
            if (_this.query.weburl) {
              let weburl = encodeURIComponent(_this.query.weburl)
              let webquery = encodeURIComponent(_this.query.webquery)
              url = `${url}?weburl=${weburl}&webquery=${webquery}`
              _this.backurl = url
            }
            _this.$wechat.miniProgram.navigateTo({url: url})
          }
        })
      } else {
        if (this.currentTab) {
          this.$router.push({
            path: '/addOthers',
            query: {
              module: this.module,
              id: this.id
            }
          })
        } else {
          this.$router.push({
            path: '/addTags',
            query: {
              id: this.id
            }
          })
        }
      }
    },
    manageTeam () {
      this.$router.push({
        path: '/manageTeam',
        query: {
          id: this.id
        }
      })
    },
    joinTeam () {
      let _this = this
      this.$vux.loading.show()
      this.showTip = false
      this.$http({
        url: `${ENV.BokaApi}/api/team/teamset`,
        method: 'post',
        data: {
          id: this.id,
          type: 'addMember'
        }
      }).then(res => {
        console.log(res)
        this.$vux.loading.hide()
        if (res.data.flag) {
          this.$vux.toast.show({
            text: '加入团队成功!',
            onHide () {
              _this.teamInfo.join = 1
            }
          })
        }
      })
      // if (!this.loginUser.isretailer || this.loginUser.retailerinfo.moderate !== 1) {
      //   this.$vux.confirm.show({
      //     title: `申请卖家后才可加入团队,确定申请？`,
      //     onConfirm () {
      //       let url = '/pages/vip'
      //       if (_this.query.weburl) {
      //         let weburl = encodeURIComponent(_this.query.weburl)
      //         let webquery = encodeURIComponent(_this.query.webquery)
      //         url = `${url}?weburl=${weburl}&webquery=${webquery}`
      //         _this.backurl = url
      //       }
      //       _this.$wechat.miniProgram.navigateTo({url: url})
      //     }
      //   })
      // } else {
      //   this.$http({
      //     url: `${ENV.BokaApi}/api/team/teamset`,
      //     method: 'post',
      //     data: {
      //       id: this.id,
      //       type: 'addMember'
      //     }
      //   }).then(res => {
      //     console.log(res)
      //     if (res.data.flag) {
      //       this.$vux.toast.show({
      //         text: '加入团队成功!',
      //         onHide () {
      //           _this.teamInfo.join = 1
      //         }
      //       })
      //     }
      //   })
      // }
    },
    outTeam () {
      let _this = this
      this.$vux.confirm.show({
        title: `确定退出该团队吗？`,
        onConfirm () {
          _this.$http({
            url: `${ENV.BokaApi}/api/team/teamset`,
            method: 'post',
            data: {
              id: _this.id,
              type: 'exitTeam'
            }
          }).then(res => {
            console.log(res)
            if (res.data.flag) {
              _this.$vux.toast.show({
                text: '退出团队成功!',
                onHide () {
                  _this.teamInfo.join = 0
                }
              })
            }
          })
        }
      })
    },
    importAllData () {
      const _this = this
      _this.$http({
        url: `${ENV.BokaApi}/api/team/copy`,
        method: 'post',
        data: {
          teamid: _this.id,
          type: 'all',
          module: _this.module
        }
      }).then(res => {
        console.log(res)
        const data = res.data
        if (data.flag === 1) {
          _this.$vux.toast.show({
            text: `导入全部${_this.moduleTransfer}成功!`
          })
        } else if (data.flag === 3) {
          _this.$vux.toast.show({
            text: `没有内容可导入!`
          })
        } else {
          _this.$vux.toast.show({
            text: data.error
          })
        }
      })
    },
    importAll () {
      let _this = this
      console.log(this.teamInfo[this.module])
      if (this.teamInfo[this.module] > 0) {
        if (!this.loginUser.isretailer || this.loginUser.retailerinfo.moderate !== 1) {
          this.$vux.confirm.show({
            title: `你还没有注册卖家哦，注册成功可免费导入该团队的所有信息哦，一键导入便可快速使用！`,
            onConfirm () {
              let url = '/pages/vip'
              if (_this.query.weburl) {
                let weburl = encodeURIComponent(_this.query.weburl)
                let webquery = encodeURIComponent(_this.query.webquery)
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
                url: `${ENV.BokaApi}/api/team/teamset`,
                method: 'post',
                data: {
                  id: _this.id,
                  type: 'addMember'
                }
              }).then(res => {
                console.log(res)
                if (res.data.flag) {
                  _this.teamInfo.join = 1
                  _this.importAllData()
                }
              })
            }
          })
        } else {
          this.$vux.confirm.show({
            title: `确定要导入全部${this.moduleTransfer}吗？`,
            onConfirm () {
              _this.importAllData()
            }
          })
        }
      } else {
        this.$vux.toast.show({
          text: `没有内容可导入!`
        })
      }
    }
  }
};
</script>

<style lang="less">
.team-page{
  .modalshow{position:absolute;left:0;right:0;bottom:0;top:0;z-index:10;background-color:rgba(0,0,0,0.8);box-sizing: border-box;}
  .modaInfo{
    display:flex;flex-direction:column;margin-top: 60px;
    .al{font-size:80px;margin-left:auto;margin-right: 100px;}
  }
  .team{
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding-bottom: 70px;
    .btnknow{padding:3px 25px;border:1px solid #fff;color:#fff;margin: 0 auto;border-radius:20px;font-size:14px;margin-top: 20px;}
    .team-bg{
      flex: 0 0 30%;
      overflow: hidden;
      img{
        width: 100%;
      }
    }
    .team-info{
      .team-info-inner{
        width: 90%;
        position: relative;
        margin: 0 auto;
        padding: 20px 10px;
        top: -20px;
        display: flex;
        border-radius: 10px;
        background-color: #fff;
        box-sizing: border-box;
        .inner-item{
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .inner-item-left{
          align-items: center;
          img{
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
          button{
            border-radius: 5px;
            border: 1px solid #ff6a61;
            background-color: transparent;
            margin-top: 10px;
            padding: 5px 10px;
            color: #ff6a61;
          }
        }
        .inner-item-right{
          flex: 1;
          margin-left: 20px;
          .leader{
            color: #000;
            font-size: 16px;
          }
          .counts, .title{
            word-break: break-all;
            white-space: pre-wrap;
            color: #7a7a7a;
            font-size: 14px;
          }
        }
      }
    }
    .team-content{
      display: flex;
      flex-direction: column;
      width: 100vw;
      .team-content-nav{
        display: flex;
        background-color: #fbfbfb;
        width: 100vw;
        flex: 0 0 40px;
        align-items: center;
        border-top: 1px solid #e4e4e4;
        border-bottom: 1px solid #e4e4e4;
        .nav-item{
          flex: 1;
          text-align: center;
          color: #7a7a7a;
          font-size: 16px;
          height: 70%;
        }
        .nav-item-active span{
          display: inline-block;
          height: 100%;
          color: #000;
          border-bottom: 2px solid #ff6a61;
        }
      }
      .content-list{
        width: 100vw;
        overflow: hidden;
      }
    }
  }
  .add-import{
    position: absolute;
    width: 100vw;
    height: 70px;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .add{
      font-size: 50px;
      color: #ff6a61;
    }
    .import{
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      button{
        width: 80%;
        color: #fff;
        border-radius: 10px;
        background-color: #ff6a61;
        border: none;
        padding-top: 10px;
        padding-bottom: 10px;
      }
    }
  }
  .fixed-top{
    position: fixed;
    left: 0;
    top: 0;
  }
  .team-content-nav{
    display: flex;
    background-color: #fbfbfb;
    width: 100vw;
    height: 40px;
    align-items: center;
    border-top: 1px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;
    .nav-item{
      flex: 1;
      text-align: center;
      color: #7a7a7a;
      font-size: 16px;
      height: 70%;
    }
    .nav-item-active span{
      display: inline-block;
      height: 100%;
      color: #000;
      border-bottom: 2px solid #ff6a61;
    }
  }
}
.fix-home-icon{
  position:absolute;right:20px;bottom:80px;
  width:50px;height:50px;border-radius:50%;
}
</style>
