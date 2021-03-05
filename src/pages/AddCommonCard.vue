<style lang="less">
.add-comcard-page{
  width:100%;box-sizing: border-box;
  .form-list{
    .title-cell{margin-right:5px;}
    .input-cell.time-cell{height:30px;}
  }
  .date-txt{
    position:absolute;left:0;right:0;top:0;height:30px;line-height:30px;
    background-color:transparent;z-index:10;font-size:13px;
    text-align:left;color:#999;
  }
  .mjje{
    flex:1;width:30%;
    margin:0 3px;padding:0 5px;line-height:30px;box-sizing:border-box;
    text-decoration: none;
  }
  .btn{
    width:100px;line-height:40px;background-color:#07c160;color:#fff;border-radius:60px;text-align:center;
  }
  textarea{resize:none;height:200px;}
  .tag-container{
    .parent-item:not(:last-child){margin-bottom:10px;}
    .child-area{
      padding: 10px 0;display:flex;justify-content:flex-start;align-items:center;flex-wrap:wrap;
      .child-item:not(:first-child){margin-left:10px;}
      .child-item{
        border:#ddd 1px solid;border-radius:3px;line-height:30px;padding:0 10px;color:#999;
        display:flex;justify-content:center;align-items:center;margin-bottom:5px;
        .txt{margin-left:3px;}
      }
    }
  }
  .btn-select{
    border:#ccc 1px solid;border-radius:5px;padding:5px 10px;
  }
}
.user-modal{
  .scroll_list{
    .scroll_item{
      padding:10px;background-color:#fff;display:flex;justify-content: flex-start;align-items: center;
      .avatar{width:50px;height:50px;border-radius:50%;object-fit: cover;}
    }
  }
}
</style>
<template>
  <div class="bg-page add-comcard-page containerarea">
    <template v-if="loginUser && loginUser.uid">
      <template v-if="!loginUser.isadmin">
        <div class="flex_empty">抱歉，您没有权限</div>
      </template>
      <template v-else>
        <div class="s-topbanner s-topbanner1 bg-white">
          <div class="row">
            <tab v-model="selectedIndex" class="v-tab">
              <tab-item selected @on-item-click="clickTab(0)">普通优惠券</tab-item>
              <tab-item @on-item-click="clickTab(1)">专属优惠券</tab-item>
            </tab>
          </div>
        </div>
        <div class="s-container s-container1" style="bottom:45px;">
          <template v-if="selectedIndex == 0">
            <div class="form-list">
              <div class="form-item flex_left">
                  <div class="title-cell">标题<span class="ml3 vertical color-red">*</span></div>
                  <div class="input-cell">
                      <input v-model="submitData.title" type="text" placeholder="标题">
                  </div>
              </div>
              <div class="form-item flex_left">
                  <div class="title-cell">客户群体<span class="ml3 vertical color-red">*</span></div>
                  <div class="input-cell">
                    <div class="padding10 tag-container" style="box-sizing:border-box;" >
                      <template v-for="(item,index) in tagData">
                        <div v-if="item.parentid == 0" class="parent-item">
                          <div class="box-title">{{item.title}}</div>
                          <div class="child-area" v-if="item.child && item.child.length">
                            <label v-for="(citem, cindex) in item.child" class="child-item">
                              <input type="checkbox" :name="`ck-${item.id}-[]`" :value="citem.tagid" :checked="citem.checked" />
                              <span class="txt" @click="clickInput(index, citem, cindex)">{{citem.title}}</span>
                            </label>
                          </div>
                        </div>
                      </template>
                    </div>
                  </div>
              </div>
              <div class="form-item flex_left">
                  <div class="title-cell">开始时间<span class="ml3 vertical color-red">*</span></div>
                  <div class="input-cell time-cell">
                    <datetime format="YYYY-MM-DD HH:mm" v-model='submitData.starttime' :show.sync="visibility1" @on-change="datechange1" @on-cancel="datecancel1" @on-confirm="dateconfirm1"></datetime>
                    <div @click="showxdate1" class="date-txt">{{ selectdatetxt1 }}</div>
                  </div>
              </div>
              <div class="form-item flex_left">
                  <div class="title-cell">结束时间<span class="ml3 vertical color-red">*</span></div>
                  <div class="input-cell time-cell">
                    <datetime format="YYYY-MM-DD HH:mm" v-model='submitData.endtime' :show.sync="visibility2" @on-change="datechange2" @on-cancel="datecancel2" @on-confirm="dateconfirm2"></datetime>
                    <div @click="showxdate2" class="date-txt">{{ selectdatetxt2 }}</div>
                  </div>
              </div>
              <div class="form-item flex_left">
                  <div class="title-cell">有效期<span class="ml3 vertical color-red">*</span></div>
                  <div class="input-cell">
                      <input v-model="submitData.validday" type="text" placeholder="有效期，最多365天">
                  </div>
                  <div>天</div>
              </div>
              <div class="form-item flex_left">
                  <div class="title-cell">发放数量<span class="ml3 vertical color-red">*</span></div>
                  <div class="input-cell">
                      <input v-model="submitData.totalcount" type="text" placeholder="发放数量">
                  </div>
              </div>
              <div class="form-item flex_left">
                  <span style="line-height:34px">满:</span>
                  <input class="mjje" v-model="submitData.ordermoney" type="number" placeholder="请输入" />
                  <span style="line-height:34px">减:</span>
                  <input class="mjje" v-model="submitData.facemoney" type="number" placeholder="请输入" />
              </div>
              <div class="form-item flex_left">
                  <div class="title-cell">使用说明<span class="ml3 vertical color-red">*</span></div>
                  <div class="input-cell">
                      <textarea v-model="submitData.content" placeholder="使用说明"></textarea>
                  </div>
              </div>
            </div>
          </template>
          <template v-if="selectedIndex == 1">
            <div class="form-list">
              <div class="form-item flex_left">
                <div class="title-cell">标题<span class="ml3 vertical color-red">*</span></div>
                <div class="input-cell">
                    <input v-model="submitData1.title" type="text" placeholder="标题">
                </div>
              </div>
              <div class="form-item flex_left">
                  <div class="title-cell">奖励语<span class="ml3 vertical color-red">*</span></div>
                  <div class="input-cell">
                      <input v-model="submitData1.remark" type="text" placeholder="标题">
                  </div>
              </div>
              <div class="form-item flex_left">
                <div class="title-cell">客户<span class="ml3 vertical color-red">*</span></div>
                <div class="input-cell" @click="clickUser()">
                  <div v-if="selectedUser && selectedUser.uid" class="flex_left">
                    <img :src="selectedUser.avatar" class="mr5" style="width:50px;height:50px;border-radius:50%;" />
                    <span>{{selectedUser.linkman}}</span>
                  </div>
                  <div v-else class="btn-select">选择客户</div>
                </div>
              </div>
              <div class="form-item flex_left">
                  <span style="line-height:34px">满:</span>
                  <input class="mjje" v-model="submitData1.ordermoney" type="number" placeholder="请输入" />
                  <span style="line-height:34px">减:</span>
                  <input class="mjje" v-model="submitData1.facemoney" type="number" placeholder="请输入" />
              </div>
              <div class="form-item flex_left">
                  <div class="title-cell">使用说明<span class="ml3 vertical color-red">*</span></div>
                  <div class="input-cell">
                      <textarea v-model="submitData1.content" placeholder="使用说明"></textarea>
                  </div>
              </div>
            </div>
          </template>
        </div>
        <div v-if="selectedIndex == 0" class="s-bottom bg-green flex_center color-white font16" @click="submitEvent">提交</div>
        <div v-if="selectedIndex == 1" class="s-bottom bg-green flex_center color-white font16" @click="submitEvent1">提交</div>
      </template>
    </template>
    <div v-transfer-dom class="x-popup">
      <popup v-model="showUserModal" height="100%" class="bg-white user-modal">
        <div class="popup1">
          <div class="pagetop flex_center b_bottom_after" style="font-size:16px;font-weight:bold;">选择客户</div>
          <div class="pagemiddle" ref="scrollContainer"  @scroll="handleScroll('scrollContainer')">
            <template v-if="disList">
              <div v-if="!userData || !userData.length" class="flex_empty">暂无客户</div>
              <div v-else class="scroll_list">
                <label v-for="(item,index) in userData" :key="index" class="scroll_item" @click="clickUserItem(item, index)">
                  <div class="pr10">
                    <input type="radio" name="cuser" :checked="item.checked" />
                  </div>
                  <div class="pr10">
                    <img class="avatar" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
                  </div>
                  <div class="flex_cell flex_left">{{item.linkman}}</div>
                </label>
              </div>
              <div class="load-end-area loading" v-if="isLoading"></div>
              <div class="load-end-area done" v-else-if="isDone"></div>
            </template>
          </div>
          <div class="pagebottom flex_center">
            <div class="flex_cell h_100 flex_center bg-gray color-white" @click="closeUserModal">取消</div>
            <div class="flex_cell h_100 flex_center bg-green color-white" @click="submitUser">提交</div>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import ENV from 'env'
import { Datetime, Tab, TabItem, Popup, TransferDom } from 'vux'
import { User } from '#/storage'
import jQuery from 'jquery'
export default {
  directives: { TransferDom },
  components: { Datetime, Tab, TabItem, Popup },
  data () {
    return {
      query: {},
      loginUser: {},
      submitData: {
        title: '',
        starttime: '',
        endtime: '',
        validday: '',
        totalcount: '',
        ordermoney: '',
        facemoney: '',
        content: ''
      },
      requiredData: {
        title: '',
        starttime: '',
        endtime: '',
        validday: '',
        totalcount: '',
        ordermoney: '',
        facemoney: '',
        content: ''
      },
      visibility1: false,
      visibility2: false,
      selectdatetxt1: '选择开始时间',
      selectdatetxt2: '选择结束时间',
      submitIng: false,
      maxDay: 365,
      tagData: [],
      selectedIndex: 0,
      submitData1: {
        title: '',
        remark: '',
        ordermoney: '',
        facemoney: '',
        content: ''
      },
      requiredData1: {
        title: '',
        remark: '',
        ordermoney: '',
        facemoney: '',
        content: ''
      },
      selectedUser: null,
      submitIng1: false,
      showUserModal: false,
      userData: [],
      pagestart: 1,
      limit: 15,
      isLoading: false,
      disList: false,
      isDone: false,
      nextCursor: null,
      pannelUser: null
    }
  },
  methods: {
    clickUser () {
      this.showUserModal = true
      if (!this.userData.length) {
        this.getUser()
      }
    },
    closeUserModal () {
      this.showUserModal = false
    },
    clickUserItem (item, index) {
      this.pannelUser = item
      if (this.$util.isIOS()) {
        if (!item.checked) {
          for (let i = 0; i < this.userData.length; i++) {
            if (this.userData[i].checked) {
              this.userData[i].checked = false
              break
            }
          }
          this.userData[index].checked = true
        }
      }
    },
    submitUser () {
      // let cks = jQuery('.user-modal').find(".scroll_list input:checked")
      // if (!cks.length) {
      //   this.$vux.toast.text('请选择客户')
      //   return false
      // }
      if (!this.pannelUser) {
        this.$vux.toast.text('请选择客户')
        return false
      }
      this.selectedUser = this.pannelUser
      this.showUserModal = false
    },
    getUser () {
      let params = {page: this.pagestart, limit: this.limit}
      if (this.nextCursor) params.cursor = this.nextCursor
      this.$http.get(`${ENV.BokaApi}/api/customer/getList`, {
        params: params
      }).then(res => {
        let data = res.data
        this.$vux.loading.hide()
        this.isLoading = false
        let retdata = data.data ? data.data : data
        for (let i = 0; i < retdata.length; i++) {
          retdata[i].checked = false
        }
        this.userData = this.userData.concat(retdata)
        if (data.next_cursor && data.next_cursor !== this.nextCursor) this.nextCursor = data.next_cursor
        this.disList = true
        if (retdata.length < this.limit) {
          this.isDone = true
        }
      })
    },
    handleScroll (refname, index) {
      const scrollarea = this.$refs[refname][0] ? this.$refs[refname][0] : this.$refs[refname]
      this.$util.scrollEvent({
        element: scrollarea,
        callback: () => {
          if (this.isLoading || this.isDone) return false
          if (this.userData.length === this.pagestart * this.limit) {
            this.pagestart++
            this.isLoading = true
            this.getUser()
          }
        }
      })
    },
    clickTab (index) {
      this.selectedIndex = parseInt(index)
    },
    clickInput (pindex, citem, cindex) {
      if (this.$util.isIOS()) {
        this.tagData[pindex].child[cindex].checked = !citem.checked
      }
    },
    showxdate1 () {
      this.visibility1 = true
    },
    datechange1 (val) {
    },
    datecancel1 () {
      this.submitData.starttime = ''
      this.selectdatetxt1 = '选择开始时间'
    },
    dateconfirm1 () {
      this.selectdatetxt1 = ''
    },
    showxdate2 () {
      this.visibility2 = true
    },
    datechange2 (val) {
    },
    datecancel2 () {
      this.submitData.endtime = ''
      this.selectdatetxt2 = '选择结束时间'
    },
    dateconfirm2 () {
      this.selectdatetxt2 = ''
    },
    submitEvent () {
      if (this.submitIng) return false
      let postData = {...this.submitData, type: 'cardcommon'}
      let iscontinue = true
      for (let key in this.requiredData) {
        if (postData[key] === '') {
          this.$vux.toast.text('请完善内容')
          iscontinue = false
          break
        }
      }
      if (!iscontinue) return false
      let cks = jQuery.find('.tag-container input[type=checkbox]:checked')
      if (!cks.length) {
        this.$vux.toast.text('请选择客户群体')
        return false
      }
      let tagarr = []
      for (let i = 0; i < cks.length; i++) {
        let cur = cks[i]
        tagarr.push(cur.value)
      }
      postData.corptag = tagarr.join(',')
      let stime = new Date(postData.starttime).valueOf()
      let etime = new Date(postData.endtime).valueOf()
      if (stime > etime) {
        this.$vux.toast.text('请选择正确的起止时间')
        return false
      }
      let validday = postData.validday
      if (isNaN(validday) || parseInt(validday) > this.maxDay || parseInt(validday) < 0 || !(/(^[1-9]\d*$)/.test(validday))) {
        this.$vux.toast.text(`请输入正确的有效期，最多${this.maxDay}天`)
        return false
      }
      let totalcount = postData.totalcount
      if (isNaN(totalcount) || parseInt(totalcount) < 0 || !(/(^[1-9]\d*$)/.test(totalcount))) {
        this.$vux.toast.text('请输入正确的发放数量')
        return false
      }
      let facemoney = postData.facemoney
      let ordermoney = postData.ordermoney
      if (parseFloat(facemoney) < 0.01 || parseFloat(ordermoney) < 0) {
        this.$vux.toast.text('请输入正确的满减金额')
        return false
      }
      this.submitIng = true
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/miniactivity/add`, postData).then(res => {
        this.$vux.loading.hide()
        let data = res.data
        this.$vux.toast.show({
          text: data.msg,
          type: (data.code === 0 ? 'success' : 'warn'),
          time: this.$util.delay(data.msg),
          onHide: () => {
            if (data.code === 0) {
              this.$router.push('/activityList?refresh=1')
            } else {
              this.submitIng = false
            }
          }
        })
      })
    },
    submitEvent1 () {
      if (this.submitIng1) return false
      let postData = {...this.submitData1, type: 'cardcommon'}
      let iscontinue = true
      for (let key in this.requiredData) {
        if (postData[key] === '') {
          this.$vux.toast.text('请完善内容')
          iscontinue = false
          break
        }
      }
      if (!iscontinue) return false
      if (!this.selectedUser || !this.selectedUser.uid) {
        this.$vux.toast.text('请选择客户')
        return false
      }
      postData.uid = this.selectedUser.uid
      let facemoney = postData.facemoney
      let ordermoney = postData.ordermoney
      if (parseFloat(facemoney) < 0.01 || parseFloat(ordermoney) < 0) {
        this.$vux.toast.text('请输入正确的满减金额')
        return false
      }
      // this.submitIng1 = true
      // this.$vux.loading.show()
      // this.$http.post(`${ENV.BokaApi}/api/miniactivity/add`, postData).then(res => {
      //   this.$vux.loading.hide()
      //   let data = res.data
      //   this.$vux.toast.show({
      //     text: data.msg,
      //     type: (data.code === 0 ? 'success' : 'warn'),
      //     time: this.$util.delay(data.msg),
      //     onHide: () => {
      //       if (data.code === 0) {
      //         this.$router.push('/activityList?refresh=1')
      //       } else {
      //         this.submitIng1 = false
      //       }
      //     }
      //   })
      // })
    },
    getTags () {
      this.$http.get(`${ENV.BokaApi}/api/customer/getCorpTags`).then(res => {
        let data = res.data
        if (data.code === 0) {
          let retdata = data.data
          let arr = []
          for (let i = 0; i < retdata.length; i++) {
            let pdata = retdata[i]
            if (pdata.parentid === 0) {
              pdata.child = []
              for (let j = 0; j < retdata.length; j++) {
                let cdata = retdata[j]
                if (cdata.parentid === pdata.id) {
                  cdata.checked = false
                  pdata.child.push(cdata)
                }
              }
              arr.push(pdata)
            }
          }
          this.tagData = arr
        }
      })
    },
    initData () {
      this.submitData = {
        title: '',
        starttime: '',
        endtime: '',
        validday: '',
        totalcount: '',
        ordermoney: '',
        facemoney: ''
      }
      this.visibility1 = false
      this.visibility2 = false
      this.selectdatetxt1 = '选择开始时间'
      this.selectdatetxt2 = '选择结束时间'
      this.submitIng = false
      this.submitData1 = {
        title: '',
        remark: '',
        ordermoney: '',
        facemoney: '',
        content: ''
      }
      this.submitIng1 = false
      this.selectedUser = null
    },
    refresh () {
      this.query = this.$route.query
      this.loginUser = User.get()
      this.initData()
      this.getTags()
    }
  },
  activated () {
    this.refresh()
  }
}
</script>
