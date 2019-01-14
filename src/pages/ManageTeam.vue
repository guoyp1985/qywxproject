<template>
  <scroll-view ref="wraper" @scrollEnd="scrollEnd">
    <div class="manage-team" slot="content" ref="content">
      <div class="manage-item">
        <div class="item-title"><span class="members-count">团队长</span></div>
        <div class="member">
          <div class="member-info">
            <img class="avatar" :src="creater.avatar"/>
            <span class="username">{{creater.username}}</span>
          </div>
        </div>
      </div>
      <!-- <div class="manage-item">
        <div class="item-title"><span class="members-count">团队管理员（{{countManager}}）人</span></div>
        <div class="member" v-for="(manager, index) in managers" :key="manager.id">
          <div class="member-info">
            <img class="avatar" :src="manager.avatar"/>
            <span class="username">{{manager.username}}</span>
            <div class="ope-btn" @click="toggleOpePanel">...</div>
          </div>
          <div class="member-ope" hidden="0">
            <span class="del-member" @click="delManager(manager.uid, index)">取消管理员</span>
            <span class="con-member" @click="toChat(manager.uid)">联系TA</span>
          </div>
        </div>
        <div class="tip-message" v-if="tipMessageShow1"><span>该团目前无管理员</span></div>
      </div> -->
      <div class="manage-item">
        <div class="item-title"><span class="members-count">团队成员（{{countNormal}}人）</span></div>
        <div class="member" v-for="(member, index) in members" :key="member.id">
          <div class="member-info">
            <img class="avatar" :src="member.avatar"/>
            <span class="username">{{member.username}}</span>
            <div class="ope-btn" @click="toggleOpePanel">...</div>
          </div>
          <div class="member-ope" hidden="0">
            <span class="del-member" @click="delMember(member.uid, index)">从团队中移除</span>
            <span class="con-member" @click="toChat(member.uid)">联系TA</span>
          </div>
        </div>
        <div class="tip-message" v-if="tipMessageShow2"><span>该团目前无团员</span></div>
      </div>
    </div>
  </scroll-view>
</template>

<script type="text/javascript">
import Env from 'env'
import ScrollView from '@/components/ScrollView'
export default {
  created () {
    console.log(this.$route)
    this.id = this.$route.query.id
    this.getMembers()
  },
  data () {
    return {
      id: null,
      uploader: null,
      managers: [],
      members: [],
      pagestart: 0,
      limit: 10,
      creater: {},
      countManager: null,
      countNormal: null,
      tipMessageShow1: true,
      tipMessageShow2: true
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
        this.getMembers()
      }
    },
    getMembers () {
      if (this.members.length === this.pagestart * this.limit) {
        this.$http({
          url: `${Env.BokaApi}/api/team/members?id=${this.id}`,
          method: 'get'
        }).then(res => {
          console.log(res)
          if (res.data.flag) {
            if (!this.pagestart) {
              this.countManager = res.data.count.manager
              this.countNormal = res.data.count.normal
              if (this.countManager) {
                this.tipMessageShow1 = false
              }
              if (this.countNormal) {
                this.tipMessageShow2 = false
              }
              this.creater = res.data.data.create[0]
              this.members = res.data.data.normal
              this.managers = res.data.data.manager
            } else {
              this.members.push(...res.data.data.normal)
            }
            this.pagestart++
          }
        })
      }
    },
    toggleOpePanel (e) {
      let el = e.target.parentNode.parentNode.lastElementChild
      let style = window.getComputedStyle(el)
      if (style.display === 'none') {
        el.setAttribute('style', 'display: flex;')
      } else {
        el.setAttribute('style', 'display: none;')
      }
    },
    delManager () {
      console.log('in delManager')
    },
    delMember (deluid, index) {
      let _this = this
      _this.$vux.confirm.show({
        title: `确定删除该团员吗？`,
        onConfirm () {
          _this.$http({
            url: `${Env.BokaApi}/api/team/teamset`,
            method: 'post',
            data: {
              type: 'delMember',
              id: _this.id,
              deluid: deluid
            }
          }).then(res => {
            console.log(res)
            if (res.data.flag) {
              _this.members.splice(index, 1)
              _this.count--
            }
          })
        }
      })
    },
    toChat (uid) {
      this.$router.push({
        path: '/chat',
        query: {
          uid: uid
        }
      })
    }
  }
};
</script>

<style lang="less" scoped="">
  .manage-team{
    .manage-item{
      width: 100vw;
      .item-title{
        width: 100%;
        background-color: #f2f2f2;
        padding: 10px;
        box-sizing: border-box;
        height: 50px;
        .members-count{
          display: inline-block;
          height: 80%;
          border-left: 4px solid #fd6b65;
          padding-left: 10px;
          font-weight: 700;
        }
      }
      .member{
        width: 100%;
        background-color: #fff;
        margin-bottom: 10px;
        .member-info{
          width: 100%;
          display: flex;
          padding: 10px;
          box-sizing: border-box;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #f2f2f2;
          .avatar{
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
          .username{
            margin-left: 10px;
            flex: 1;
          }
          .ope-btn{
            width: 40px;
            height: 20px;
            line-height: 10px;
            border-radius: 10px;
            text-align: center;
            background-color: #fd6b65;
            color: #fff;
          }
        }
        .member-ope{
          width: 100%;
          display: none;
          height: 45px;
          align-items: center;
          span{
            flex: 1;
            text-align: center;
            height: 30px;
            line-height: 30px;
            color: #6b6b6b;
          }
          .del-member{
            border-right: 1px solid #f2f2f2;
          }
        }
      }
      .member:last-child{
        margin-bottom: 0;
      }
      .tip-message{
        width: 100vw;
        text-align: center;
        color: #c9c9c9;
        margin: 30px auto;
      }
    }
  }
</style>