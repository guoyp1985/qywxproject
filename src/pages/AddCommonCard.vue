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
  .x-checker .ck-item{
    font-size:13px;
    display: inline-block;
    padding: 0 15px;
    height: 30px;
    line-height: 30px;
    border:0px;
    text-align: center;
    border-radius: 3px;
    background-color: #fff;
    margin-right: 10px;
    margin-top: 5px;
    margin-bottom: 5px;
    box-sizing: border-box;
  }
  .x-checker .border1px.ck-item-selected:after{border:1px solid #ea3a3a;}
  .vux-check-icon > span{color:#666;display: inline-block;vertical-align: bottom;line-height: 19px;}
}
</style>
<template>
  <div class="bg-page add-comcard-page">
    <template v-if="loginUser && loginUser.uid">
      <template v-if="!loginUser.isadmin">
        <div class="flex_empty">抱歉，您没有权限</div>
      </template>
      <template v-else>
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
        <div class="mt20 flex_center">
          <div class="btn" @click="submitEvent">提交</div>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
import ENV from 'env'
import { Datetime } from 'vux'
import { User } from '#/storage'
import jQuery from 'jquery'
export default {
  components: { Datetime },
  data () {
    return {
      query: {},
      loginUser: {},
      submitData: {
        title: '',
        customertype: '',
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
      tagData: []
    }
  },
  methods: {
    clickInput (pindex, citem, cindex) {
      let isPc = this.$util.isPC()
      if (!isPc) {
        this.tagData[pindex].child[cindex].checked = !citem.checked
        console.log('in mobile click')
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
      if (this.submitIng) return false
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
              this.$router.push('/activityList')
            } else {
              this.submitIng = false
            }
          }
        })
      })
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
