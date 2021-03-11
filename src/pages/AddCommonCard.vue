<style lang="less">
.add-comcard-page{
  width:100%;box-sizing: border-box;
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
      padding: 10px 0;display:flex;justify-content:flex-start;align-items:center;flex-wrap:wrap;
      .child-item:not(:last-child){margin-right:10px;}
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
  <div class="bg-page add-comcard-page containerarea">
    <template v-if="loginUser && loginUser.uid">
      <template v-if="!loginUser.isadmin">
        <div class="flex_empty">抱歉，您没有权限</div>
      </template>
      <template v-else>
        <div class="s-container" style="top:0;bottom:45px;">
          <div class="form-list">
            <div class="form-item flex_left">
                <div class="title-cell">
                  <span>标题</span>
                  <span class="ml3 vertical color-red">*</span>
                </div>
                <div class="input-cell">
                    <input v-model="submitData.title" type="text" placeholder="标题">
                </div>
            </div>
            <!-- <div class="form-item flex_left">
              <div class="title-cell">优惠商品</div>
              <div class="input-cell" @click="clickProduct()">
                <div v-if="selectedProduct && selectedProduct.id" class="flex_left">
                  <img :src="selectedProduct.photo" class="mr5" style="width:50px;height:50px;object-fit:cover;" />
                  <span>{{selectedProduct.title}}</span>
                </div>
                <div v-else class="btn-select">选择优惠商品</div>
              </div>
            </div> -->
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
            <div class="form-item flex_left">
                <div class="title-cell">推送标题</div>
                <div class="input-cell">
                    <input v-model="submitData.push_title" type="text" placeholder="推送标题">
                </div>
            </div>
            <div class="form-item flex_left">
                <div class="title-cell">推送描述</div>
                <div class="input-cell">
                    <textarea v-model="submitData.push_desc" placeholder="使用说明"></textarea>
                </div>
            </div>
            <div class="form-item flex_left">
              <div class="title-cell">推送图片</div>
              <div class="input-cell">
                <form ref="fileForm" enctype="multipart/form-data">
                  <input ref="fileInput" class="hide" type="file" name="files" @change="fileChange('fileForm')" />
                </form>
                <div class="q_photolist align_left bg-white">
                  <template v-if="pushPhoto && pushPhoto != ''">
                    <div class="photoitem">
                      <div class="inner photo imgcover">
                        <img :src="pushPhoto" class="pic" @click="uploadPhoto('fileInput')" />
                        <div class="close" @click="deletePhoto()">×</div>
                      </div>
                    </div>
                  </template>
                  <div v-else class="photoitem add" @click="uploadPhoto('fileInput')">
                    <div class="inner">
                      <div class="innerlist">
                        <div class="flex_center h_100">
                          <div class="txt">
                            <i class="al al-zhaopian" style="color:#bbb;line-height:30px;"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="s-bottom bg-green flex_center color-white font16" @click="submitEvent">提交</div>
      </template>
    </template>
    <div v-transfer-dom class="x-popup">
      <popup v-model="showProductModal" height="100%" class="bg-white product-modal">
        <div class="popup1">
          <div class="pagetop flex_center b_bottom_after" style="font-size:16px;font-weight:bold;">选择商品</div>
          <div class="pagemiddle" ref="scrollContainer1"  @scroll="handleScroll1('scrollContainer1')">
            <template v-if="disList1">
              <div v-if="!productData || !productData.length" class="flex_empty">暂无商品</div>
              <div v-else class="scroll_list">
                <label v-for="(item,index) in productData" :key="index" class="scroll_item" @click="clickProductItem(item, index)">
                  <div class="pr10">
                    <input type="radio" name="cproduct" :checked="item.checked" />
                  </div>
                  <div class="pr10">
                    <img class="pic" :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
                  </div>
                  <div class="flex_cell flex_left">{{item.title}}</div>
                </label>
              </div>
              <div class="load-end-area loading" v-if="isLoading1"></div>
              <div class="load-end-area done" v-else-if="isDone1"></div>
            </template>
          </div>
          <div class="pagebottom flex_center">
            <div class="flex_cell h_100 flex_center bg-gray color-white" @click="closeProductModal">取消</div>
            <div class="flex_cell h_100 flex_center bg-green color-white" @click="submitProduct">提交</div>
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
        content: '',
        push_title: '',
        push_desc: ''
      },
      visibility1: false,
      visibility2: false,
      selectdatetxt1: '选择开始时间',
      selectdatetxt2: '选择结束时间',
      submitIng: false,
      maxDay: 365,
      tagData: [],
      selectedIndex: 0,
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
      limit: 10,
      selectedProduct: null,
      showProductModal: false,
      productData: [],
      productPage: 1,
      isLoading1: false,
      disList1: false,
      isDone1: false,
      pannelProduct: null,
      pushPhoto: ''
    }
  },
  methods: {
    deletePhoto () {
      this.pushPhoto = ''
    },
    photoCallback (data) {
      if (data.code === 0) {
        this.pushPhoto = data.data
      } else if (data.error) {
        this.$vux.toast.show({
          text: data.msg,
          time: this.$util.delay(data.msg)
        })
      }
    },
    uploadPhoto (refname) {
      const _this = this
      const fileInput = this.$refs[refname][0] ? this.$refs[refname][0] : this.$refs[refname]
      if (this.$util.isPC()) {
        fileInput.click()
      } else {
        jweixin.ready(() => {
          _this.$util.wxUploadImage({
            maxnum: 1,
            handleCallback: (data) => {
              _this.photoCallback(data)
            }
          })
        })
      }
    },
    fileChange (refname) {
      const target = event.target
      const files = target.files
      if (files.length > 0) {
        let fileForm = target.parentNode
        const filedata = new FormData(fileForm)
        this.$vux.loading.show()
        this.$http.post(`${ENV.BokaApi}/api/upload/files`, filedata).then(res => {
          this.$vux.loading.hide()
          let data = res.data
          this.photoCallback(data)
        })
      }
    },
    clickProduct () {
      this.showProductModal = true
      if (!this.productData.length) {
        this.$vux.loading.show()
        this.getProduct()
      }
    },
    closeProductModal () {
      this.showProductModal = false
    },
    clickProductItem (item, index) {
      this.pannelProduct = item
      if (this.$util.isIOS()) {
        if (!item.checked) {
          for (let i = 0; i < this.productData.length; i++) {
            if (this.productData[i].checked) {
              this.productData[i].checked = false
              break
            }
          }
          this.productData[index].checked = true
        }
      }
    },
    submitProduct () {
      if (!this.pannelProduct) {
        this.$vux.toast.text('请选择商品')
        return false
      }
      this.selectedProduct = this.pannelProduct
      this.showProductModal = false
    },
    getProduct () {
      let params = {module: 'product', page: this.productPage, limit: this.limit}
      this.$http.get(`${ENV.BokaApi}/api/content/getList`, {
        params: params
      }).then(res => {
        this.$vux.loading.hide()
        let data = res.data
        this.$vux.loading.hide()
        this.isLoading1 = false
        let retdata = data.data ? data.data : data
        for (let i = 0; i < retdata.length; i++) {
          retdata[i].checked = false
        }
        this.productData = this.productData.concat(retdata)
        this.disList1 = true
        if (retdata.length < this.limit) {
          this.isDone1 = true
        }
      })
    },
    handleScroll1 (refname, index) {
      const scrollarea = this.$refs[refname][0] ? this.$refs[refname][0] : this.$refs[refname]
      this.$util.scrollEvent({
        element: scrollarea,
        callback: () => {
          if (this.isLoading1 || this.isDone1) return false
          if (this.productData.length === this.productPage * this.limit) {
            this.productPage++
            this.isLoading1 = true
            this.getProduct()
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
      let ajaxUrl = `${ENV.BokaApi}/api/miniactivity/add`
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
      if (this.selectedProduct) {
        postData.pid = this.selectedProduct.id
      }
      postData.photo = this.pushPhoto
      this.submitIng = true
      this.$vux.loading.show()
      this.$http.post(ajaxUrl, postData).then(res => {
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
      this.disList1 = false
      this.productData = []
      this.productPage = 1
      this.isLoading1 = false
      this.isDone1 = false
      this.selectedProduct = null
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
