<template>
  <div class="containerarea bg-page font14 prove">
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
      <div>没有实体地址但想申请个体工商户营业执照的，卖家可以把微店提供的网络经营场所作为经营场所，申请办理登记。</div>
      <div class="bold mt10">步骤如下：</div>
      <div>第1步：点击下方按钮申请《{{shopName.gxk}}开店证明》</div>
      <div>第2步：保存并打印《{{shopName.gxk}}开店证明》</div>
      <div>第3步：带上①身份证件、②《{{shopName.gxk}}开店证明》，前往当地工商行政管理部门，现场填写《开户申请表》，即可申请办理。</div>
      <div class="btnClick" @click="cliDownload">点击下载《{{shopName.gxk}}开店证明》</div>
    </div>
    <div v-if="showModal">
      <div class="mceng">
        <div style="margin-top:80px;">
          <div class="modal">
            <img src="https://tossharingsales.boka.cn/images/nopic.jpg" />
            <div class="align_center">（长按保存图片）</div>
          </div>
        </div>
        <div @click="closeModal" class="al al-close font34 color-white align_center"></div>
      </div>
    </div>
  </div>
</template>
<script>
import ENV from 'env'
export default {
  data () {
    return {
      shopName: {gxk: '共销客', juke: '聚客365'},
      showModal: false
    }
  },
  methods: {
    cliDownload () {
      console.log('cliDownload')
      const self = this
      self.showModal = true
      // self.$http.post(`${ENV.BokaApi}/api/retailer/createProof`).then(res => {
      //   const data = res.data
      //   if (data.flag === 1) {
      //     console.log(data)
      //   } else {
      //     self.$vux.toast.text(data.error, 'middle')
      //   }
      // })
    },
    closeModal () {
      this.showModal = false
    }
  }
}
</script>
<style lang="less">
  .prove{
    .content{padding:20px 10px;box-sizing:border-box;}
    .btnClick{
      padding:10px 20px;box-sizing:border-box;background-color:#f63f3d;color:#fff;font-size:16px;font-weight:bold;
      text-align:center;border-radius:5px;margin-top:50px;
    }
    .modal{
      width:80%;padding:15px 10px;border:1px solid #e5e5e5;margin:0 auto;background-color:#fff;text-align:center;
      z-index:1;border-radius:10px;
      img{width:100%;height:400px;}
    }
    .mceng{position:absolute;top:0;bottom:0;left:0;right:0;background-color: rgba(0, 0, 0, 0.6);overflow: hidden;}
    .al{z-index: 999;}
  }
</style>
