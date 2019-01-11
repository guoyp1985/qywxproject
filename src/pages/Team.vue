<template>
  <scroll-view ref="wraper" @scrollEnd="scrollEnd" @scroll="scroll">
    <div class="team" :class="{'pd30' : fixedTop}" slot="content" ref="content">

      <!-- 背景图 -->
      <div class="team-bg"><img src="../assets/images/team.png" ref="teamBg"></div>

      <!-- 团队信息 -->
      <div class="team-info" ref="teamInfo">
        <div class="team-info-inner">
          <div class="inner-item inner-item-left">
            <img class="avatar" :src="teamInfo.avatar"/>
            <button class="btn" v-if="userInfo.uid === teamInfo.uploader" @click="manageTeam">管理团队</button>
            <button class="btn" v-if="userInfo.uid !== teamInfo.uploader && !teamInfo.join" @click="joinTeam">加入团队</button>
            <button class="btn" v-if="userInfo.uid !== teamInfo.uploader && teamInfo.join" @click="outTeam">退出团队</button>
          </div>
          <div class="inner-item inner-item-right">
            <div class="leader">{{teamInfo.username}}的团队</div>
            <div class="counts">
              <span>商品 {{teamInfo.product}}</span>
              <span>文章 {{teamInfo.news}}</span>
              <span>活动 {{teamInfo.activity}}</span>
            </div>
            <div class="title">{{teamInfo.title}}</div>
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
            <list-others ref="listOthers" :userInfo="userInfo" :teamInfo="teamInfo" :id="id" :module="module" v-else></list-others>

        </div>

      </div>
    </div>

    <div class="team-content-nav fixed-top" slot="team-content-nav" v-if="fixedTop">
      <div tag="div" v-for="(nav, index) in navs" :key="nav.id" class="nav-item" :class="{'nav-item-active' : currentTab === index}" @click="changeTab(index)">
          <span>{{nav}}</span>
      </div>
    </div>

    <div class="add-import" slot="ope-btns">
      <span class="add al al-add" v-if="userInfo.uid === teamInfo.uploader" @click="onAdd"></span>
      <div class="import" v-if="userInfo.uid !== teamInfo.uploader && teamInfo.join && currentTab !== 0">
        <button @click="importAll">导入全部{{moduleTransfer}}</button>
      </div>
    </div>
  </scroll-view>
</template>

<script type="text/javascript">
import Env from 'env'
import ScrollView from '@/components/ScrollView'
import ListTags from '@/components/ListTags'
import ListOthers from '@/components/ListOthers'
import { User } from '#/storage'
export default {
  created () {
    this.userInfo = User.get()
    this.id = this.$route.query.id
    this.getTeamInfo(this.id).then(res => {
      console.log(res)
      this.teamInfo = res.data.data
    })
  },
  activated () {
    console.log('in team activated')
    if (!this.currentTab) {
      this.$refs.listTags.tags = []
      this.$refs.listTags.pagestart = 0
      this.$refs.listTags.getTags()
    } else {
      this.$refs.listOthers.data = []
      this.$refs.listOthers.pagestart = 0
      this.$refs.listOthers.getData()
    }
  },
  data () {
    return {
      navs: ['素材', '商品', '活动', '文章', '培训'],
      teamInfo: {},
      currentTab: 0,
      id: null,
      userInfo: {},
      module: '',
      fixedTop: false
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
  components: {
    ScrollView,
    ListTags,
    ListOthers
  },
  methods: {
    getTeamInfo (id) {
      return this.$http({
        url: `${Env.BokaApi}/api/team/info`,
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
      switch (index) {
        case 0:
          this.$nextTick(() => {
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
      this.$http({
        url: `${Env.BokaApi}/api/team/teamset`,
        method: 'post',
        data: {
          id: this.id,
          type: 'addMember'
        }
      }).then(res => {
        console.log(res)
        if (res.data.flag) {
          this.$vux.toast.show({
            text: '加入团队成功!',
            onHide () {
              _this.teamInfo.join = 1
            }
          })
        }
      })
    },
    outTeam () {
      let _this = this
      this.$http({
        url: `${Env.BokaApi}/api/team/teamset`,
        method: 'post',
        data: {
          id: this.id,
          type: 'exitTeam'
        }
      }).then(res => {
        console.log(res)
        if (res.data.flag) {
          this.$vux.toast.show({
            text: '退出团队成功!',
            onHide () {
              _this.teamInfo.join = 0
            }
          })
        }
      })
    },
    importAll () {
      this.$http({
        url: `${Env.BokaApi}/api/team/copy`,
        method: 'post',
        data: {
          teamid: this.id,
          type: 'all',
          module: this.module
        }
      }).then(res => {
        console.log(res)
        if (res.data.flag) {
          this.$vux.toast.show({
            text: `导入全部${this.moduleTransfer}成功!`
          })
        }
      })
    }
  }
};
</script>

<style lang="less">
  .team{
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding-bottom: 70px;
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
</style>
