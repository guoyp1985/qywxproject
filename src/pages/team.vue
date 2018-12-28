<template>
  <div class="team">

    <!-- 背景图 -->
    <div class="team-bg"><img src="../assets/images/team.png"></div>

    <!-- 团队信息 -->
    <div class="team-info">
      <div class="team-info-inner">
        <div class="inner-item inner-item-left">
          <img class="avatar" src="../assets/images/team.png"/>
          <button class="btn">加入团队</button>
        </div>
        <div class="inner-item inner-item-right">
          <div class="leader">{{teamInfo.leaderName}}的团队</div>
          <div class="counts">
            <span>商品 {{teamInfo.productCounts}}</span>
            <span>文章 {{teamInfo.articleCounts}}</span>
            <span>活动 {{teamInfo.activityCounts}}</span>
          </div>
          <div class="title">{{teamInfo.title}}</div>
        </div>
      </div>
    </div>

    <!-- 团队内容 -->
    <div class="team-content">
      <div class="team-content-nav">
        <div v-for="(nav, index) in navs" :key="nav.id" class="nav-item" :class="{'nav-item-active' : currentTab === index}" @click="changeTab(index)"><span>{{nav}}</span></div>
      </div>
    </div>

  </div>
</template>

<script>
import ENV from 'env'
export default {
  created () {
    this.id = this.$route.query.id
    this._getTeamInfo()
  },
  data () {
    return {
      navs: ['素材', '商品', '活动', '文章', '培训'],
      teamInfo: {
        avatar: '../assets/images/team.png',
        productCounts: 0,
        articleCounts: 0,
        activityCounts: 0,
        title: '膏质量生活',
        leaderName: 'ohh'
      },
      currentTab: 0,
      id: null
    }
  },
  methods: {
    _getTeamInfo () {
      // getTeamInfo(this.id).then(res => {
      //   console.log(res)
      // })
      this.$http.post(`${ENV.BokaApi}/api/team/info`, {id: this.id}).then(res => {
      })
    },
    changeTab (index) {
      this.currentTab = index
    }
  }
};
</script>

<style lang="less" scoped="">
  .team{
    .team-bg{
      img{
        width: 100%;
      }
    }
    .team-info{
      background-color: #f2f2f2;
      .team-info-inner{
        width: 90%;
        position: relative;
        margin: 0 auto;
        padding: 20px 10px;
        top: -30px;
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
      .team-content-nav{
        display: flex;
        background-color: #fbfbfb;
        border-bottom: 1px solid #e4e4e4;
        height: 40px;
        align-items: center;
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
          border-bottom: 2px solid rgb(255, 51, 51);
        }
      }
    }
  }
</style>
