<template>
  <div class="containerarea s-havebottom font14 addnews">
    <div class="s-container" style="top:0;">
      <form>
        <div class="form-item required">
          <div class="t-table">
            <div class="t-cell title-cell w80 font14 v_middle">{{ $t('News title') }}<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
            <div class="t-cell input-cell v_middle" style="position:relative;">
              <input type="text" class="input" name="title" :placeholder="$t('News title')" />
            </div>
          </div>
        </div>
        <div class="form-item required">
          <div class="pt10 pb5">{{ $t('Cover photo') }} <span class="al al-xing color-red font12" style="vertical-align: 3px;"></span> （图像最佳宽高比为9:5）</div>
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
        <div v-show="showmore">
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
          <div class="form-item">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Summary') }}</div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <group class="textarea-outer" style="padding:10px 0;">
                  <x-textarea class="x-textarea" :placeholder="$t('Summary')" :show-counter="false" :rows="1" autosize></x-textarea>
                </group>
              </div>
            </div>
          </div>
          <div class="form-item">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Label') }}</div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <div v-for="(item,index) in labelarr" :key="index" class="labelitem">
                  <span>{{ item }}</span>
                  <div class="close" @click="deletelabel(item,index)">×</div>
                </div>
                <div class="addbtn" @click="addlabel">+</div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="showmore" @click="expandevent" class="padding15 font14 align_center color-gray">{{ $t('Up more options') }}<i class="al al-jiantou2-up font14 middle-cell"></i></div>
        <div v-else class="padding15 font14 align_center color-gray"  @click="expandevent">{{ $t('Expand more options') }}<i class="al al-jiantouyoushuang- font14"></i></div>
      </form>
    </div>
    <div class="s-bottom flex_center bg-green color-white">{{ $t('Save') }}</div>
    <div v-transfer-dom>
      <confirm v-model="showconfirm"
      show-input
      :title="confirmtitle"
      :input-attrs="{type: 'text'}"
      @on-cancel="onCancel"
      @on-confirm="onConfirm">
      </confirm>
    </div>
    <div v-transfer-dom>
      <alert v-model="showalert">{{ $t('Label can not empty') }}</alert>
    </div>
  </div>
</template>

<i18n>
News title:
  zh-CN: 文章标题
Cover photo:
  zh-CN: 封面图像
Expand more options:
  zh-CN: 展开更多选项
Up more options:
  zh-CN: 收起更多选项
Share title:
  zh-CN: 分享标题
Share title placeholder:
  zh-CN: 如不填写默认调用商品标题
Share description:
  zh-CN: 分享描述
Share description placeholder:
  zh-CN: 如不填写自动截取文章内容
Label:
  zh-CN: 标签
Save:
  zh-CN: 保存
Label can not empty:
  zh-CN: 标签不能为空
</i18n>

<script>
import { Group, XInput, XTextarea, Confirm, TransferDomDirective as TransferDom, Alert } from 'vux'

export default {
  directives: {
    TransferDom
  },
  components: {
    Group,
    XInput,
    XTextarea,
    Confirm,
    Alert
  },
  data () {
    return {
      photoarr: [],
      maxnum: 1,
      havenum: 0,
      showaddphoto: true,
      showphotoitem: false,
      showmore: false,
      labelarr: [],
      confirmtitle: '标签',
      showconfirm: false,
      showalert: false
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
    }
  },
  computed: {
    gethavenum: function () {
      return this.photoarr.length
    },
    getquery: function () {
      return this.$route.query
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
    addlabel () {
      this.showconfirm = true
    },
    deletelabel (item, index) {
      for (var i = 0; i < this.labelarr.length; i++) {
        if (i === index) {
          this.labelarr.splice(i, 1)
          break
        }
      }
    },
    expandevent () {
      this.showmore = !this.showmore
    },
    onCancel () {
      this.showconfirm = false
    },
    onConfirm (val) {
      let str = val.replace(/\s+/g, '')
      if (str === '') {
        this.showalert = true
      } else {
        this.labelarr.push(val)
      }
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/close.less';
@import '../assets/fonts.less';
@import '../assets/global.less';
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

.addnews .addbtn{
  display:inline-block;
  width:30px;
  height:20px;
  line-height:20px;
  border-radius:3px;
  text-align:center;
  border: 1px solid #17a8e0;
  color: #17a8e0;
}
.addnews .labelitem{
  display: inline-block;
  border: 1px solid #ccc;
  height: 20px;
  line-height: 20px;
  text-align: center;
  border-radius: 3px;
  position: relative;
  padding: 0 3px;
  margin: 0 10px 0 0px;
}
.addnews .close{
  position: absolute;
  top: -6px;
  left: -6px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: #f00f0f;
  color: #fff;
  line-height: 14px;
  text-align: center;
}
</style>
