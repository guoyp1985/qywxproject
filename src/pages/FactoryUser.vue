<template>
  <div class="factory-user containerarea" ref="scrollContainer1" @scroll="handleScroll('scrollContainer1')">
    <div class="manage-item">
      <div class="item-title"><span class="members-count">高级管理员</span></div>
      <div class="member" v-for="(manager, index) in managers" :key="manager.uid">
        <div class="member-info" @click="toggleOpeManger(index)">
          <img class="avatar" :src="manager.avatar"/>
          <span class="username">{{manager.username}}</span>
          <div class="ope-btn">...</div>
        </div>
        <div v-if="manager.checked">
          <div class="flex_center bg-white h40">
            <div class="t-table align_center color-gray2 font14">
              <div class="t-cell v_middle b_right_after" v-if="ismanager === 1" @click="delManager(manager.uid, index)">从团队中移除</div>
              <div class="t-cell v_middle b_right_after" v-if="ismanager === 1" @click="disManger(manager.uid, index)">取消管理员</div>
              <div class="t-cell v_middle" @click="toChat(manager.uid)">联系TA</div>
            </div>
          </div>
        </div>
      </div>
      <div class="tip-message" v-if="tipMessageShow1"><span>无高级管理员</span></div>
    </div>
    <div class="manage-item">
      <div class="item-title"><span class="members-count">普通管理员（{{countNormal}}人）</span></div>
      <div class="member" v-for="(member, index) in members" :key="member.uid">
          <div class="member-info" @click="toggleOpePanel(index)">
            <img class="avatar" :src="member.avatar"/>
            <span class="username">{{member.username}}</span>
            <div class="ope-btn" v-if="ismanager > 0">...</div>
          </div>
          <div v-if="member.checked">
            <div class="flex_center bg-white h40">
              <div class="t-table align_center color-gray2 font14">
                <div class="t-cell v_middle b_right_after" @click="delMember(member.uid, index)">从厂家中移除</div>
                <div class="t-cell v_middle b_right_after" v-if="ismanager === 1" @click="setManger(member.uid, index)">转让高级管理员</div>
              </div>
            </div>
          </div>
      </div>
      <div class="tip-message" v-if="tipMessageShow2"><span>无普通管理员</span></div>
    </div>
    <div class="addUser" @click="disJoinQrcode">添加普通管理员</div>
    <div v-transfer-dom class="x-popup">
      <popup v-model="showQrcode" height="100%">
        <div class="popup1 font14">
          <div class="popup-top flex_center">普通管理员加盟码</div>
          <div class="popup-middle padding10 border-box flex_center" style="bottom:86px;">
            <img ref="joinQrcode" class="qrcode" style="max-width:100%;max-height:100%;" />
          </div>
          <div class="flex_center border-box pl10 pr10 color-red font12" style="position:absolute;left:0;right:0;bottom:46px;height:40px;">
            <div>保存图片发送给好友，邀请加盟厂家管理</div>
          </div>
          <div class="popup-bottom flex_center">
            <div class="flex_cell h_100 flex_center bg-gray color-white" @click="closeQrcode">{{ $t('Close') }}</div>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>

<script type="text/javascript">
import Env from 'env'
import { TransferDom, Popup } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    Popup
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
      tipMessageShow2: true,
      showQrcode: false,
      ismanager: 0,
      loginUser: {}
    }
  },
  methods: {
    disJoinQrcode () {
      const self = this
      self.showQrcode = true
    },
    closeQrcode () {
      this.showQrcode = false
    },
    handleScroll: function (refname) {
      const self = this
      console.log('handleScroll')
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          if (self.members.length === (self.pagestart + 1) * self.limit) {
            self.pagestart++
            self.getMembers()
          }
        }
      })
    },
    getMembers () {
      this.$http({
        url: `${Env.BokaApi}/api/team/members?id=${this.id}&pagestart=${this.pagestart}&limit=${this.limit}`,
        method: 'get'
      }).then(res => {
        if (res.data.flag) {
          if (!this.pagestart) {
            console.log('111111111')
            this.countManager = res.data.count.manager
            this.countNormal = res.data.count.normal
            this.ismanager = res.data.data.ismanager
            if (this.countManager) {
              this.tipMessageShow1 = false
            }
            if (this.countNormal) {
              this.tipMessageShow2 = false
            }
            this.creater = res.data.data.create[0]
            const retdata = res.data.data.normal
            for (var i = 0; i < retdata.length; i++) {
              retdata[i].checked = false
            }
            const retdatamanager = res.data.data.manager
            for (var m = 0; m < retdatamanager.length; m++) {
              retdatamanager[m].checked = false
            }
            this.members = retdata
            this.managers = retdatamanager
          } else {
            console.log('2222222222')
            const retdata1 = res.data.data.normal
            if (retdata1 && retdata1 !== '') {
              if (retdata1.length !== 0) {
                for (var k = 0; k < retdata1.length; k++) {
                  retdata1[k].checked = false
                }
                this.members.push(...retdata1)
              }
            }
            const retdata2 = res.data.data.managers
            if (retdata2 && retdata2 !== '') {
              if (retdata2.length !== 0) {
                for (var n = 0; n < retdata2.length; n++) {
                  retdata2[k].checked = false
                }
                this.managers.push(...retdata2)
              }
            }
          }
        }
      })
    },
    toggleOpePanel (index) {
      for (var i = 0; i < this.members.length; i++) {
        if (i !== index && this.members[i].checked) {
          this.members[i].checked = false
          break
        }
      }
      this.members[index].checked = !this.members[index].checked
    },
    toggleOpeManger (index) {
      for (var i = 0; i < this.managers.length; i++) {
        if (i !== index && this.managers[i].checked) {
          this.managers[i].checked = false
          break
        }
      }
      this.managers[index].checked = !this.managers[index].checked
    },
    disManger (setuid, index) {
      let _this = this
      _this.$vux.confirm.show({
        title: `确定取消管理员吗？`,
        onConfirm: () => {
          _this.$http({
            url: `${Env.BokaApi}/api/team/teamset`,
            method: 'post',
            data: {
              type: 'dismanager',
              id: _this.id,
              uploade: setuid
            }
          }).then(res => {
            this.tipMessageShow1 = true
            this.tipMessageShow2 = true
            this.pagestart = 0
            this.members = []
            this.getMembers()
          })
        }
      })
    },
    setManger (setuid, index) {
      let _this = this
      _this.$vux.confirm.show({
        title: `确定设置为管理员吗？`,
        onConfirm: () => {
          _this.$http({
            url: `${Env.BokaApi}/api/team/teamset`,
            method: 'post',
            data: {
              type: 'manager',
              id: _this.id,
              uploade: setuid
            }
          }).then(res => {
            this.pagestart = 0
            this.members = []
            this.tipMessageShow1 = true
            this.tipMessageShow2 = true
            this.getMembers()
          })
        }
      })
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
              _this.countNormal--
              if (_this.countNormal === 0) {
                _this.tipMessageShow2 = true
              }
            }
          })
        }
      })
    },
    delManager (deluid, index) {
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
              _this.managers.splice(index, 1)
              _this.count--
              _this.countManager--
              if (_this.countNormal === 0) {
                _this.tipMessageShow1 = true
              }
            }
          })
        }
      })
    }
  },
  created () {
    console.log(this.$route)
    this.id = this.$route.query.id
    this.getMembers()
  },
  activated () {
    this.refresh()
  }
};
</script>

<style lang="less" scoped="">
  .factory-user{
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
    .addUser{
      padding:10px 0;width:100%;box-sizing:border-box;background-color:#EB746B;
      color:#fff;font-size:14px;position:fixed;bottom:0;text-align:center;
    }
  }
</style>
