<style lang="less">
.qy-customer-view-page{
  .top-box{
    background-color:#f5f9fe;text-align:left;padding:10px;box-sizing: border-box;
    .avatar{width:80px;height:80px;border-radius:50%;margin-right:10px;}
    .txt{font-size:16px;font-weight:bold;}
  }
  .view-area{
    background-color:#fff;
    .view-item{
      padding:10px;display:flex;justify-content: flex-start;align-items: center;
      position:relative;
      .col1{padding-right:10px;}
      .col2{flex:1;display:flex;justify-content: flex-end;align-items: center;}
    }
    .view-item:not(:last-child):after{
  		content: " ";
      position: absolute;left: 0;bottom: 0;right: 0;
      height: 1px;border-bottom: 1px solid #ededed;color: #ededed;
      -webkit-transform-origin: 0 100%;
      transform-origin: 0 100%;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
    .btn-col{
      padding-left:10px;
      .btn{
        width:45px;text-align:center;line-height:22px;border-radius:5px;
        background-color:#07c160;color:#fff;
        font-size:12px;
      }
    }
  }
  .update-modal{
    .btn{height:40px;}
    .btn-cancel{background-color:#ccc;color:#fff;}
    .btn-submit{background-color:#07c160;color:#fff;}
  }
  .tag-list{
    display:flex;justify-content: flex-end;align-items: center;flex-wrap:wrap;
    .item:not(:last-child){margin-right:5px;}
    .item{border-radius:5px;border:#ccc 1px solid;padding:2px 5px;}
  }
}
.tag-container{
  .parent-item:not(:last-child){margin-bottom:10px;}
  .child-area{
    padding: 10px 15px;
    .child-item:not(:first-child){margin-top:10px;}
  }
}
</style>
<template>
  <div class="bg-page qy-customer-view-page">
    <div class="top-box list-shadow02 flex_left">
      <img class="avatar" :src="viewData.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
      <div class="txt">{{ viewData.linkman }}</div>
    </div>
    <div class="view-area">
      <div class="view-item">
        <div class="col1">微信昵称</div>
        <div class="col2">{{viewData.linkman}}</div>
      </div>
      <div class="view-item">
        <div class="col1">性别</div>
        <div class="col2">{{getsex}}</div>
      </div>
      <div class="view-item">
        <div class="col1">手机号</div>
        <div class="col2">{{viewData.mobile}}</div>
      </div>
      <div class="view-item">
        <div class="col1">价值</div>
        <div class="col2">{{viewData.yingxiangli}}</div>
      </div>
      <div class="view-item">
        <div class="col1">真实姓名</div>
        <div class="col2">{{viewData.truename}}</div>
        <div class="btn-col">
          <div class="btn" @click="updateEvent('truename')">更新</div>
        </div>
      </div>
      <div class="view-item">
        <div class="col1">公司名称</div>
        <div class="col2">{{viewData.company}}</div>
        <div class="btn-col">
          <div class="btn" @click="updateEvent('company')">更新</div>
        </div>
      </div>
      <div class="view-item">
        <div class="col1">生日</div>
        <div class="col2">
          <datetime format="YYYY-MM-DD" v-model='viewData.birthday_str' :show.sync="showDateTime" @on-cancel="dateCancel" @on-confirm="dateConfirm"></datetime>
        </div>
        <div class="btn-col">
          <div class="btn" @click="clickDate">更新</div>
        </div>
      </div>
      <div class="view-item">
        <div class="col1">地区</div>
        <div class="col2">{{ viewData.country }} {{ viewData.province }} {{ viewData.city }}</div>
      </div>
      <div class="view-item">
        <div class="col1">标签</div>
        <div class="col2">
          <div v-if="viewData.tagsData && viewData.tagsData.length" class="tag-list">
            <div class="item" v-for="(item, index) in viewData.tagsData" :key="index">{{item.group_name}}-{{item.tag_name}}</div>
          </div>
        </div>
        <div class="btn-col">
          <div class="btn" @click="clickTag">更新</div>
        </div>
      </div>
    </div>
    <!-- <div class="box-outer mt10" style="border-radius:0;">
      <div class="box-title">维护内容</div>
      <div class="box-con">
      </div>
    </div> -->
    <div v-if="showModal" class="auto-modal flex_center update-modal">
      <div class="modal-inner border-box" style="width:80%;">
        <div class="align_center font18 bold pb10 b_bottom_after color-theme pt10">更新信息</div>
        <div class="flex_left" style="padding:20px 10px;text-align:left;">
          <div class="pr10">{{nameObject[updateChar]}}</div>
          <div class="flex_cell flex_right">
            <input v-model="updateVal" type="text" class="w_100" style="line-height:25px;" :placeholder="nameObject[updateChar]" />
          </div>
        </div>
        <div class="b_top_after flex_center">
          <div class="flex_cell flex_center btn btn-cancel" @click="closeModal">取消</div>
          <div class="flex_cell flex_center btn btn-submit" @click="submitModal">提交</div>
        </div>
      </div>
    </div>
    <div v-transfer-dom class="x-popup">
      <popup v-model="showTagModal" height="100%" class="bg-white">
        <div class="popup1 tag-modal">
          <div class="pagetop flex_center b_bottom_after" style="font-size:16px;font-weight:bold;">设置标签</div>
          <div class="pagemiddle">
            <div class="padding10 tag-container" style="box-sizing:border-box;" >
              <template v-for="(item,index) in tagData">
                <div v-if="item.parentid == 0" class="parent-item">
                  <div class="box-outer">
                    <div class="box-title">{{item.title}}</div>
                    <div class="child-area" v-if="item.child && item.child.length">
                      <div v-for="(citem, cindex) in item.child" class="child-item">
                        <label class="flex_left">
                          <input type="radio" :name="`radio${item.id}`" :value="citem.tagid" :checked="citem.checked" />
                          <span style="margin-left:5px;" @click="clickInput(index, citem, cindex)">{{citem.title}}</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
          <div class="pagebottom bg-gray flex_center color-white">
            <div class="flex_cell h_100 flex_center bg-gray color-white" @click="closeTagModal">取消</div>
            <div class="flex_cell h_100 flex_center bg-green color-white" @click="submitTag">提交</div>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import {Datetime, Popup, TransferDom} from 'vux'
import ENV from 'env'
import { User } from '#/storage'
import Time from '../../libs/time'
import jQuery from 'jquery'
export default {
  directives: { TransferDom },
  components: {Datetime, Popup},
  data () {
    return {
      query: {},
      loginUser: {},
      viewData: {},
      showModal: false,
      updateChar: '',
      nameObject: {
        truename: '真实姓名',
        company: '公司名称'
      },
      updateVal: '',
      birthday: '',
      showDateTime: false,
      showTagModal: false,
      tagData: [],
      isFirst: true
    }
  },
  computed: {
    getsex () {
      let val = this.viewData.sex
      let ret = '未知'
      if (val === 1) {
        ret = '男'
      } else if (val === 2) {
        ret = '女'
      }
      return ret
    }
  },
  methods: {
    clickInput (pindex, citem, cindex) {
      let isPc = this.$util.isPC()
      if (!isPc && !citem.checked) {
        for (let i = 0; i < this.tagData[pindex].child.length; i++) {
          if (i === cindex) {
            this.tagData[pindex].child[cindex].checked = true
          } else {
            this.tagData[pindex].child[i].checked = false
          }
        }
        console.log('in mobile click')
      }
    },
    clickTag () {
      this.showTagModal = true
    },
    closeTagModal () {
      this.showTagModal = false
    },
    submitTag () {
      let cks = jQuery('.tag-modal .tag-container input:checked')
      if (!cks.length) {
        this.$vux.toast.text('请选择标签')
        return false
      }
      let tagsid = []
      cks.each(function () {
        tagsid.push(this.value)
      })
      this.$vux.loading.show()
      this.$http.get(`${ENV.BokaApi}/api/customer/markTags`, {
        params: {changeuid: this.query.uid, tagsid: tagsid}
      }).then(res => {
        this.$vux.loading.hide()
        let data = res.data
        this.$vux.toast.text(data.msg)
        if (data.code === 0) {
          this.getInfo()
          this.showTagModal = false
        }
      })
    },
    clickDate () {
      this.showDateTime = true
    },
    dateCancel () {
    },
    dateConfirm () {
      this.ajaxUpdate('birthday', this.viewData.birthday_str, () => {
        this.showDateTime = false
      })
    },
    updateEvent (char) {
      this.updateChar = char
      this.updateVal = this.viewData[char]
      this.showModal = true
    },
    closeModal () {
      this.showModal = false
    },
    ajaxUpdate (char, value, callback) {
      this.$vux.loading.show()
      this.$http.get(`${ENV.BokaApi}/api/customer/update`, {
        params: {uid: this.query.uid, char: char, value: value}
      }).then(res => {
        this.$vux.loading.hide()
        let data = res.data
        this.$vux.toast.text(data.msg)
        if (data.code === 0) {
          callback && callback()
        }
      })
    },
    submitModal () {
      if (this.updateVal === '') {
        this.$vux.toast.text('请输入更新内容')
        return false
      }
      this.ajaxUpdate(this.updateChar, this.updateVal, () => {
        this.viewData[this.updateChar] = this.updateVal
        this.showModal = false
      })
    },
    getTags () {
      this.$http.get(`${ENV.BokaApi}/api/customer/getCorpTags`).then(res => {
        let data = res.data
        if (data.code === 0) {
          let retdata = data.data
          let userTags = this.viewData.tags
          let tarr = userTags.split(',')
          let arr = []
          for (let i = 0; i < retdata.length; i++) {
            let pdata = retdata[i]
            if (pdata.parentid === 0) {
              pdata.child = []
              for (let j = 0; j < retdata.length; j++) {
                let cdata = retdata[j]
                if (cdata.parentid === pdata.id) {
                  cdata.checked = false
                  for (let t = 0; t < tarr.length; t++) {
                    if (cdata.tagid === tarr[t]) {
                      cdata.checked = true
                      break
                    }
                  }
                  pdata.child.push(cdata)
                }
              }
              arr.push(pdata)
            }
          }
          this.tagData = arr
          console.log(this.tagData)
        }
      })
    },
    getInfo () {
      this.$vux.loading.show()
      this.$http.get(`${ENV.BokaApi}/api/customer/info`, {
        params: {uid: this.query.uid}
      }).then(res => {
        this.$vux.loading.hide()
        let data = res.data
        let retdata = data.data ? data.data : data
        if (retdata) {
          retdata.birthday_str = ''
          if (retdata.birthday) {
            retdata.birthday_str = new Time(retdata.birthday * 1000).dateFormat('yyyy-MM-dd')
          }
          if (retdata.tagsdata && retdata.tagsdata !== '') {
            retdata.tagsData = JSON.parse(retdata.tagsdata)
          } else {
            retdata.tagsData = []
          }
          this.viewData = retdata
          if (this.isFirst) {
            this.isFirst = false
            this.getTags()
          }
        }
      })
    },
    refresh () {
      this.query = this.$route.query
      this.loginUser = User.get()
      this.getInfo()
    }
  },
  activated () {
    this.refresh()
  }
}
</script>
