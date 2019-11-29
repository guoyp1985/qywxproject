<style lang="less">
.prove{
  .content{padding:20px;box-sizing:border-box;}
  .btnClick{
    padding:10px 20px;box-sizing:border-box;background-color:#f63f3d;color:#fff;font-size:16px;font-weight:bold;
    text-align:center;border-radius:5px;margin-top:50px;
  }
  .modalarea{
    .inner{
      width:80%;
    }
    .modal1{
      width:100%;padding:15px 10px;border:1px solid #e5e5e5;background-color:#fff;text-align:center;border-radius:10px;
      img{max-width:100%;max-height:80%;display:block;margin:0 auto;}
    }
  }
}
</style>

<template>
  <div class="containerarea bg-white font14 prove">
    <div class="content">
      <div>按《电商法》第十条规定，电子商务经营者应当依法办理市场主体登记。如贵店铺想<span class="bold">办理个体工商户主体登记</span>的，有两种方法：</div>
      <div class="bold mt10">A. 有实体经营地址</div>
      <div>
        带上经营者身份证件、经营场所证明，前往户籍所在地或经营场所所在地的工商行政管理部门，现场填写《开户申请表》
        ，经工商行政管理部门的初步审查，对符合规定的予以受理
      </div>
      <div class="bold mt10">温馨提示：</div>
      <div>由于每个地区的政策略有不同，可能所需办证材料略有区别，建议去之前先电话/网上提前咨询。</div>
      <div class="bold mt10">B. 无实体经营地址</div>
      <div>没有实体地址但想申请个体工商户营业执照的，卖家可以把{{fromAppName}}提供的网络经营场所作为经营场所，申请办理登记。</div>
      <div class="bold mt10">步骤如下：</div>
      <div>第1步：点击下方按钮申请《{{fromAppName}}开店证明》</div>
      <div>第2步：保存并打印《{{fromAppName}}开店证明》</div>
      <div>第3步：带上①身份证件、②《{{fromAppName}}开店证明》，前往当地工商行政管理部门，现场填写《开户申请表》，即可申请办理。</div>
      <div class="btnClick" @click="cliDownload">点击下载《{{fromAppName}}开店证明》</div>
    </div>
    <div class="modalarea flex_center" v-if="showModal && photo != ''">
      <div class="inner">
        <div class="modal1">
          <img :src="photo" />
          <div class="align_center mt20 font18">（长按保存图片）</div>
        </div>
        <div @click="closeModal" class="al al-close font34 color-white align_center"></div>
      </div>
    </div>
  </div>
</template>
<script>
import ENV from 'env'
import { User } from '#/storage'
export default {
  data () {
    return {
      showModal: false,
      query: {},
      loginUser: {},
      appName: {'gxk': '共销客', 'jk365': '共销客', 'qxb': '群销宝'},
      fromAppName: '',
      photo: '',
      fromPage: ''
    }
  },
  methods: {
    cliDownload () {
      console.log('cliDownload')
      const self = this
      console.log(this.loginUser)
      if (!this.loginUser.idcardno || this.loginUser.idcardno === '') {
        this.$router.push({path: '/authPhoto', query: {fromPage: this.fromPage}})
      } else {
        if (this.photo !== '') {
          this.showModal = true
        } else {
          this.$vux.loading.show()
          self.$http.post(`${ENV.BokaApi}/api/retailer/createProof`, {
            from: this.query.logo
          }).then(res => {
            this.$vux.loading.hide()
            const data = res.data
            if (data.flag === 1) {
              this.photo = `${data.data}?_dt=${new Date().getTime()}`
              this.showModal = true
            } else if (data.flag === 2) {
              this.$router.push({path: '/authPhoto', query: {fromPage: this.fromPage}})
            } else {
              this.$vux.toast.show({
                text: data.error,
                type: 'warn',
                time: this.$util.delay(data.error)
              })
            }
          })
        }
      }
    },
    closeModal () {
      this.showModal = false
    }
  },
  activated () {
    this.loginUser = User.get()
    this.query = this.$route.query
    this.fromAppName = this.query.logo ? this.appName[this.query.logo] : '共销客'
    let queryarr = []
    for (let key in this.query) {
      queryarr.push(`${key}=${this.query[key]}`)
    }
    if (queryarr.length) {
      this.fromPage = encodeURIComponent(`/prove?${queryarr.join('&')}`)
    } else {
      this.fromPage = encodeURIComponent('/prove')
    }
  }
}
</script>
