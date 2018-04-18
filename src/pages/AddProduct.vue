<template>
  <div class="containerarea s-havebottom font14 bg-white">
    <div class="s-container" style="top:0;">
      <form>
        <div class="form-item required">
          <div class="t-table">
            <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Title') }}<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
            <div class="t-cell input-cell v_middle" style="position:relative;">
              <input type="text" class="input" name="title" :placeholder="$t('Outer show product title')" />
            </div>
          </div>
        </div>
        <div class="form-item required">
          <div class="t-table">
            <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Price') }}<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
            <div class="t-cell input-cell v_middle" style="position:relative;">
              <input type="text" class="input" name="title" :placeholder="$t('User buy price')" />
            </div>
            <div class="t-cell v_middle align_right font12" style="width:40px;">元</div>
          </div>
        </div>
        <div class="form-item">
          <div class="t-table">
            <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Commission') }}</div>
            <div class="t-cell input-cell v_middle" style="position:relative;">
              <input type="text" class="input" name="rebate" :placeholder="$t('Rebate user provide commision')" />
            </div>
            <div class="t-cell v_middle align_right font12" style="width:40px;">元</div>
          </div>
        </div>
        <div class="form-item required">
          <div class="t-table">
            <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Storage') }}<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
            <div class="t-cell input-cell v_middle" style="position:relative;">
              <input type="text" class="input" name="storage" :placeholder="$t('Storage')" />
            </div>
            <div class="t-cell v_middle align_right font12" style="width:40px;">件</div>
          </div>
        </div>
        <div class="form-item required">
          <div class="pt10 pb5">封面图像 <span class="al al-xing color-red font12" style="vertical-align: 3px;"></span> （图像最佳宽高比为1:1）</div>
          <div>
            <input type="hidden" name="qrcode" required="" value="http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15204030611795.jpg" class="no-fastclick">
            <div class="q_photolist align_left" uploadform=".uploadfileForm">
              <template v-if="photoarr.length > 0">
                <div v-for="(item,index) in photoarr" :key="index" class="photoitem">
                  <div class="inner photo" :photo="item" :style="`background-image: url('${item}');`">
                    <div class="close" @click="deletephoto(item,index)">×</div>
                  </div>
                </div>
              </template>
              <div v-if="photoarr.length < maxnum" class="photoitem add">
                <div class="inner">
                  <input type="file" style="position:absolute;left:0;right:0;top:0;bottom:0;z-index:1;background-color:transparent;" @change="filechange">
                  <div class="t-table">
                    <div class="t-cell">
                      <div class="txt">
                        <i class="al al-zhaopian" style="color:#c6c5c5;line-height:30px;"></i>
                        <div><span class="havenum">{{ gethavenum }}</span><span class="ml5 mr5">/</span><span class="maxnum">{{ maxnum }}</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="pl10 pr10 pb5 pt10">商品介绍（图像宽高不受限制）</div>
        <group class="textarea-outer">
          <x-textarea class="x-textarea" :placeholder="$t('Product description')" :show-counter="false" :rows="1" autosize></x-textarea>
        </group>
        <div class="b_bottom_after">
          <input type="hidden" name="qrcode" required="" value="http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15204030611795.jpg" class="no-fastclick">
          <div class="q_photolist align_left" uploadform=".uploadfileForm">
            <template v-if="photoarr1.length > 0">
              <div v-for="(item,index) in photoarr1" :key="index" class="photoitem">
                <div class="inner photo" :photo="item" :style="`background-image: url('${item}');`">
                  <div class="close" @click="deletephoto1(item,index)">×</div>
                </div>
              </div>
            </template>
            <div v-if="photoarr1.length < maxnum1" class="photoitem add">
              <div class="inner">
                <input type="file" style="position:absolute;left:0;right:0;top:0;bottom:0;z-index:1;background-color:transparent;" @change="filechange1">
                <div class="t-table">
                  <div class="t-cell">
                    <div class="txt">
                      <i class="al al-zhaopian" style="color:#c6c5c5;line-height:30px;"></i>
                      <div><span class="havenum">{{ gethavenum1 }}</span><span class="ml5 mr5">/</span><span class="maxnum">{{ maxnum1 }}</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="showmore">
          <div class="form-item">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Share title') }}</div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <input type="text" class="input" name="title" :placeholder="$t('Outer show product title')" />
              </div>
            </div>
          </div>
          <div class="form-item">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Share description') }}</div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <group class="textarea-outer" style="padding:10px 0;">
                  <x-textarea class="x-textarea" :placeholder="$t('Share description placeholder')" :show-counter="false" :rows="1" autosize></x-textarea>
                </group>
              </div>
            </div>
          </div>
        </div>
        <div v-if="showmore" @click="expandevent" class="padding15 font14 align_center color-gray">{{ $t('Up text') }}<i class="al al-jiantou2-up font14 middle-cell"></i></div>
        <div v-else class="padding15 font14 align_center color-gray"  @click="expandevent">{{ $t('More') }}<i class="al al-jiantouyoushuang- font14"></i></div>
      </form>
    </div>
    <div class="s-bottom flex_center bg-orange color-white">
      <div class="flex_cell flex_center h_100 bg-orange color-white" style="border-right:#fff 1px solid;">{{ $t('Save') }}</div>
      <div class="flex_cell flex_center h_100 bg-orange color-white">{{ $t('Save and up') }}</div>
    </div>
  </div>
</template>

<i18n>
Title:
  zh-CN: 标题
Outer show product title:
  zh-CN: 对外展示的商品标题
Price:
  zh-CN: 价格
User buy price:
  zh-CN: 用户最终购买价格
Commission:
  zh-CN: 佣金
Rebate user provide commision:
  zh-CN: 返点客售出商品后给予的佣金
Storage:
  zh-CN: 库存
Product description:
  zh-CN: 商品介绍
Share title:
  zh-CN: 分享标题
Share title placeholder:
  zh-CN: 如不填写默认调用商品标题
Share description:
  zh-CN: 分享描述
Share description placeholder:
  zh-CN: 如不填写自动截取商品介绍
Save:
  zh-CN: 保存
Save and up:
  zh-CN: 保存并上架
More:
  zh-CN: 更多
Up text:
  zh-CN: 收起
</i18n>

<script>
import { Group, XInput, XTextarea } from 'vux'

export default {
  components: {
    Group,
    XInput,
    XTextarea
  },
  data () {
    return {
      photoarr: [ 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15204030611795.jpg' ],
      maxnum: 9,
      havenum: 0,
      showaddphoto: true,
      showphotoitem: false,
      photoarr1: [ 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15204030611795.jpg' ],
      maxnum1: 19,
      havenum1: 0,
      showaddphoto1: true,
      showphotoitem1: false,
      showmore: false
    }
  },
  watch: {
    havenum: function (val) {
      this.havenum = this.photoarr.length
    },
    showaddphoto: function (val) {
      let ret = false
      if (this.photoarr.length < this.maxnum) {
        ret = true
      }
      return ret
    },
    showphotoitem: function (val) {
      let ret = false
      if (this.photoarr.length > 0) {
        ret = true
      }
      return ret
    },
    havenum1: function (val) {
      this.havenum1 = this.photoarr1.length
    },
    showaddphoto1: function (val) {
      let ret = false
      if (this.photoarr1.length < this.maxnum1) {
        ret = true
      }
      return ret
    },
    showphotoitem1: function (val) {
      let ret = false
      if (this.photoarr1.length > 0) {
        ret = true
      }
      return ret
    }
  },
  computed: {
    gethavenum: function () {
      return this.photoarr.length
    },
    gethavenum1: function () {
      return this.photoarr1.length
    }
  },
  methods: {
    filechange (e) {
      if (this.havenum < this.maxnum) {
        this.havenum += 1
        this.photoarr.push('http://ossgxs.boka.cn/month_201804/15231791164010.jpg')
      } else {
        this.showaddphoto = false
      }
      this.showphotoitem = true
    },
    deletephoto (item, index) {
      for (var i = 0; i < this.photoarr.length; i++) {
        if (i === index) {
          this.photoarr.splice(i, 1)
          this.havenum -= 1
          if (this.photoarr.length === 0) {
            this.showaddphoto = true
            this.showphotoitem = false
          }
          break
        }
      }
    },
    filechange1 (e) {
      if (this.havenum1 < this.maxnum1) {
        this.havenum1 += 1
        this.photoarr1.push('http://ossgxs.boka.cn/month_201804/15231791164010.jpg')
      } else {
        this.showaddphoto1 = false
      }
      this.showphotoitem1 = true
    },
    deletephoto1 (item, index) {
      for (var i = 0; i < this.photoarr1.length; i++) {
        if (i === index) {
          this.photoarr1.splice(i, 1)
          this.havenum1 -= 1
          if (this.photoarr1.length === 0) {
            this.showaddphoto1 = true
            this.showphotoitem1 = false
          }
          break
        }
      }
    },
    expandevent () {
      this.showmore = !this.showmore
    }
  }
}
</script>

<style lang="less">
.form-item{position:relative;padding:10px;}
.form-item:after{
  content:"";display:block;
	background-color:@list-border-color;height:1px;overflow:hidden;
	position: absolute;left: 0;right: 0;bottom:1px;
	-webkit-transform: scaleY(0.5) translateY(0.5px);
	transform: scaleY(0.5) translateY(0.5px);
	-webkit-transform-origin: 0% 0%;
	transform-origin: 0% 0%;
}
</style>
