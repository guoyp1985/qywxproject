<style lang="less">
.add-book-page{
  width:100%;heihgt:100%;overflow:hidden;box-sizing: border-box;
  .form-list{
    .title-cell{margin-right:10px;}
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
  textarea{resize:none;height:200px;width:100%;}
  .tag-container{
    .parent-item:not(:last-child){margin-bottom:10px;}
    .child-area{
      display:flex;justify-content:flex-start;align-items:center;flex-wrap:wrap;
      .child-item:not(:last-child){margin-right:10px;}
      .child-item{
        /*border:#ddd 1px solid;border-radius:3px;line-height:30px;padding:0 10px;*/
        color:#999;
        display:flex;justify-content:center;align-items:center;margin-bottom:5px;
        .txt{margin-left:3px;}
      }
    }
  }
  .btn-select{
    border:#ccc 1px solid;border-radius:5px;padding:5px 10px;
  }
  .q_photolist{
    .photoitem{width:90px;height:90px;}
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
.product-modal{
  .scroll_list{
    .scroll_item{
      padding:10px;background-color:#fff;display:flex;justify-content: flex-start;align-items: center;
      .pic{width:50px;height:50px;object-fit: cover;}
    }
  }
}
</style>
<template>
  <div class="bg-page add-book-page">
    <template v-if="loginUser && loginUser.uid">
      <template v-if="loginUser.identity != 2">
        <div class="flex_empty">抱歉，您没有权限</div>
      </template>
      <template v-else>
        <div class="s-container" style="top:0;bottom:45px;">
          <div class="form-list">
            <div class="form-item flex_left">
                <div class="title-cell">
                  <span>门店</span>
                  <span class="ml3 vertical color-red">*</span>
                </div>
                <div class="input-cell">
                  <select v-model="submitData.storeid">
                    <option v-for="(item, index) in StoreData" :value="item.id">{{item.title}}</option>
                  </select>
                </div>
            </div>
            <div class="form-item flex_left">
                <div class="title-cell">
                  <span>姓名</span>
                  <span class="ml3 vertical color-red">*</span>
                </div>
                <div class="input-cell">
                    <input v-model="submitData.title" type="text" placeholder="姓名">
                </div>
            </div>
            <div class="form-item flex_left">
              <div class="title-cell">性别<span class="ml3 vertical color-red">*</span></div>
              <div class="input-cell">
                <div class="tag-container" style="box-sizing:border-box;" >
                  <div class="child-area">
                    <label class="child-item">
                      <input type="radio" name="radio-sex" value="1" :checked="sex == 1" />
                      <span class="txt" @click="clickInput('sex', 1)">先生</span>
                    </label>
                    <label class="child-item">
                      <input type="radio" name="radio-sex" value="2" :checked="sex == 2" />
                      <span class="txt" @click="clickInput('sex', 2)">女士</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-item flex_left">
                <div class="title-cell">
                  <span>手机</span>
                  <span class="ml3 vertical color-red">*</span>
                </div>
                <div class="input-cell">
                    <input v-model="submitData.mobile" type="tel" placeholder="手机">
                </div>
            </div>
            <div class="form-item flex_left">
                <div class="title-cell">
                  <span>用餐人数</span>
                  <span class="ml3 vertical color-red">*</span>
                </div>
                <div class="input-cell">
                    <input v-model="submitData.dinners" type="tel" placeholder="用餐人数">
                </div>
            </div>
            <div class="form-item flex_left">
              <div class="title-cell">餐别<span class="ml3 vertical color-red">*</span></div>
              <div class="input-cell">
                <div class="tag-container" style="box-sizing:border-box;" >
                  <div class="child-area">
                    <label class="child-item" :checked="submitData.canbie == 1">
                      <input type="radio" name="radio-canbie" value="1" :checked="canbie == 1" />
                      <span class="txt" @click="clickInput('canbie', 1)">早餐</span>
                    </label>
                    <label class="child-item">
                      <input type="radio" name="radio-canbie" value="2" :checked="canbie == 2" />
                      <span class="txt" @click="clickInput('canbie', 2)">午餐</span>
                    </label>
                    <label class="child-item">
                      <input type="radio" name="radio-canbie" value="3" :checked="canbie == 3" />
                      <span class="txt" @click="clickInput('canbie', 3)">晚餐</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-item flex_left">
              <div class="title-cell">桌别<span class="ml3 vertical color-red">*</span></div>
              <div class="input-cell">
                <div class="tag-container" style="box-sizing:border-box;" >
                  <div class="child-area">
                    <label class="child-item">
                      <input type="radio" name="radio-tabletype" value="1" :checked="tabletype == 1" />
                      <span class="txt" @click="clickInput('tabletype', 1)">包间</span>
                    </label>
                    <label class="child-item">
                      <input type="radio" name="radio-tabletype" value="2" :checked="tabletype == 2" />
                      <span class="txt" @click="clickInput('tabletype', 2)">卡座</span>
                    </label>
                    <label class="child-item">
                      <input type="radio" name="radio-tabletype" value="3" :checked="tabletype == 3" />
                      <span class="txt" @click="clickInput('tabletype', 3)">普通</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-item flex_left">
                <div class="title-cell">
                  <span>桌号</span>
                  <span class="ml3 vertical color-red">*</span>
                </div>
                <div class="input-cell">
                    <input v-model="submitData.tableid" type="number" placeholder="桌号">
                </div>
            </div>
            <div class="form-item flex_left">
                <div class="title-cell">就餐时间<span class="ml3 vertical color-red">*</span></div>
                <div class="input-cell time-cell">
                  <datetime
                    format="YYYY-MM-DD HH:mm"
                    :start-date="minDate"
                    :end-date="maxDate"
                    v-model='submitData.dinnertime'
                    :show.sync="visibility1"
                    @on-change="datechange1"
                    @on-cancel="datecancel1"
                    @on-confirm="dateconfirm1">
                  </datetime>
                  <div @click="showxdate1" class="date-txt">{{ selectdatetxt1 }}</div>
                </div>
            </div>
            <div class="form-item flex_left">
                <div class="title-cell">备注</div>
                <div class="input-cell">
                  <textarea v-model="submitData.content" placeholder="备注"></textarea>
                </div>
            </div>
          </div>
        </div>
        <div class="s-bottom bg-green flex_center color-white font16" @click="submitEvent">提交</div>
      </template>
    </template>
  </div>
</template>

<script>
import ENV from 'env'
import { Datetime, Tab, TabItem, Popup, TransferDom } from 'vux'
import { User } from '#/storage'
import Time from '../../libs/time'
import Reg from '../../libs/reg'
export default {
  directives: { TransferDom },
  components: { Datetime, Tab, TabItem, Popup },
  data () {
    return {
      query: {},
      loginUser: {},
      submitData: {
        title: '',
        sex: '',
        mobile: '',
        canbie: 3,
        tabletype: 1,
        dinnertime: '',
        content: ''
      },
      sex: 1,
      canbie: 3,
      tabletype: 1,
      visibility1: false,
      selectdatetxt1: '选择就餐时间',
      submitIng: false,
      maxDay: 365,
      requiredData: {
        storeid: '',
        title: '',
        sex: 1,
        mobile: '',
        canbie: 3,
        tabletype: 1,
        dinnertime: ''
      },
      minDate: '',
      maxDate: '',
      StoreData: []
    }
  },
  methods: {
    clickInput (name, val) {
      if (this.$util.isIOS()) {
        this[name] = val
      }
    },
    showxdate1 () {
      this.visibility1 = true
    },
    datechange1 (val) {
    },
    datecancel1 () {
      this.submitData.dinnertime = ''
      this.selectdatetxt1 = '选择就餐时间'
    },
    dateconfirm1 () {
      this.selectdatetxt1 = ''
    },
    submitEvent () {
      if (this.submitIng) return false
      let postData = {...this.submitData, from: 'employee'}
      postData.sex = this.sex
      postData.canbie = this.canbie
      postData.tabletype = this.tabletype
      console.log(postData)
      if (this.$util.trim(postData.storeid) === '') {
        this.$vux.toast.text('请选择门店')
        return false
      }
      if (this.$util.trim(postData.title) === '') {
        this.$vux.toast.text('请输入姓名')
        return false
      }
      if (this.$util.trim(postData.mobile) === '') {
        this.$vux.toast.text('请输入手机号')
        return false
      }
      if (!Reg.rPhone.test(postData.mobile)) {
        this.$vux.toast.text('请输入正确的手机号')
        return false
      }
      if (this.$util.trim(postData.dinners) === '') {
        this.$vux.toast.text('请输入用餐人数')
        return false
      }
      if (!(/(^[1-9]\d*$)/.test(postData.dinners))) {
        this.$vux.toast.text('请输入正确的用餐人数')
        return false
      }
      if (this.$util.trim(postData.tableid) === '') {
        this.$vux.toast.text('请输入桌号')
        return false
      }
      if (this.$util.trim(postData.dinnertime) === '') {
        this.$vux.toast.text('请选择就餐时间')
        return false
      }
      let now = new Date().getTime()
      let dinnertime = new Date(postData.dinnertime).getTime()
      if (dinnertime - 30 * 60 * 1000 < now) {
        this.$vux.toast.text('请至少提前半个小时预约')
        return false
      }
      if (dinnertime - now > 4 * 24 * 60 * 60 * 1000) {
        this.$vux.toast.text('最多可提前3天预约')
        return false
      }
      this.submitIng = true
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/bookdinner/add`, postData).then(res => {
        this.$vux.loading.hide()
        let data = res.data
        this.$vux.toast.show({
          text: data.msg,
          type: (data.code === 0 ? 'success' : 'warn'),
          time: this.$util.delay(data.msg),
          onHide: () => {
            if (data.code === 0) {
              this.$router.push('/bookList?refresh=1')
            } else {
              this.submitIng = false
            }
          }
        })
      })
    },
    initData () {
      this.submitData = {
        storeid: '',
        title: '',
        sex: '',
        mobile: '',
        canbie: 3,
        tabletype: 1,
        dinnertime: ''
      }
      this.visibility1 = false
      this.selectdatetxt1 = '选择就餐时间'
      this.submitIng = false
    },
    refresh () {
      this.query = this.$route.query
      this.loginUser = User.get()
      let now = new Date().getTime()
      let end = now + 4 * 24 * 60 * 60 * 1000
      this.minDate = new Time(now).dateFormat('yyyy-MM-dd')
      this.maxdate = new Time(end).dateFormat('yyyy-MM-dd')
      this.initData()
      this.$http.get(`${ENV.BokaApi}/api/content/getList`, {
        params: {module: 'store'}
      }).then(res => {
        let data = res.data
        if (data.code === 0) {
          this.StoreData = data.data
          if (this.StoreData.length) {
            this.submitData.storeid = this.StoreData[0].id
          }
        }
      })
    }
  },
  activated () {
    this.refresh()
  }
}
</script>
