/*
* @description: 评论窗口组件
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <popup v-show="show" height="100%">
    <div class="comment-popup">
      <div class="comment-article-title">
        <h4>{{title}}</h4>
      </div>
      <group>
        <x-textarea
          ref="textarea"
          v-model="value"
          @on-change="valueChange"
          class="font14 pop-textarea"
          :max="200"
          placeholder="说两句吧...">
        </x-textarea>
      </group>
      <emotion-box bind-textarea=".pop-textarea">
      </emotion-box>
      <box gap="20px">
        <x-button type="primary" @click.native="onSubmit">{{$t('Comment')}}</x-button>
        <x-button type="default" @click.native="onCancel">{{$t('Cancel')}}</x-button>
      </box>
    </div>
  </popup>
</template>
<i18n>
</i18n>
<script>
// const emotions = [
//   [
//     '微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴',
//     '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过',
//     '酷', '冷汗', '抓狂', '吐', '偷笑', '可爱', '白眼'
//   ],
//   [
//     '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗',
//     '咒骂', '疑问', '嘘', '晕', '折磨', '衰', '骷髅', '敲打',
//     '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼'
//   ],
//   [
//     '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓',
//     '可怜', '菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭',
//     '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕'
//   ],
//   [
//     '闪电', '炸弹', '刀', '足球', '瓢虫', '便便', '月亮', '太阳',
//     '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引',
//     '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻'
//   ],
//   [
//     '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手',
//     '激动', '街舞', '献吻', '左太极', '右太极'
//   ]
// ]
// const unicode = '\\u5fae\\u7b11,\\u6487\\u5634,\\u8272,\\u53d1\\u5446,\\u5f97\\u610f,\\u6d41\\u6cea,\\u5bb3\\u7f9e,\\u95ed\\u5634,\\u7761,\\u5927\\u54ed,\\u5c34\\u5c2c,\\u53d1\\u6012,\\u8c03\\u76ae,\\u5472\\u7259,\\u60ca\\u8bb6,\\u96be\\u8fc7,\\u9177,\\u51b7\\u6c57,\\u6293\\u72c2,\\u5410,\\u5077\\u7b11,\\u53ef\\u7231,\\u767d\\u773c,\\u50b2\\u6162,\\u9965\\u997f,\\u56f0,\\u60ca\\u6050,\\u6d41\\u6c57,\\u61a8\\u7b11,\\u5927\\u5175,\\u594b\\u6597,\\u5492\\u9a82,\\u7591\\u95ee,\\u5618,\\u6655,\\u6298\\u78e8,\\u8870,\\u9ab7\\u9ac5,\\u6572\\u6253,\\u518d\\u89c1,\\u64e6\\u6c57,\\u62a0\\u9f3b,\\u9f13\\u638c,\\u7cd7\\u5927\\u4e86,\\u574f\\u7b11,\\u5de6\\u54fc\\u54fc,\\u53f3\\u54fc\\u54fc,\\u54c8\\u6b20,\\u9119\\u89c6,\\u59d4\\u5c48,\\u5feb\\u54ed\\u4e86,\\u9634\\u9669,\\u4eb2\\u4eb2,\\u5413,\\u53ef\\u601c,\\u83dc\\u5200,\\u897f\\u74dc,\\u5564\\u9152,\\u7bee\\u7403,\\u4e52\\u4e53,\\u5496\\u5561,\\u996d,\\u732a\\u5934,\\u73ab\\u7470,\\u51cb\\u8c22,\\u793a\\u7231,\\u7231\\u5fc3,\\u5fc3\\u788e,\\u86cb\\u7cd5,\\u95ea\\u7535,\\u70b8\\u5f39,\\u5200,\\u8db3\\u7403,\\u74e2\\u866b,\\u4fbf\\u4fbf,\\u6708\\u4eae,\\u592a\\u9633,\\u793c\\u7269,\\u62e5\\u62b1,\\u5f3a,\\u5f31,\\u63e1\\u624b,\\u80dc\\u5229,\\u62b1\\u62f3,\\u52fe\\u5f15,\\u62f3\\u5934,\\u5dee\\u52b2,\\u7231\\u4f60,no,ok,\\u7231\\u60c5,\\u98de\\u543b,\\u8df3\\u8df3,\\u53d1\\u6296,\\u6004\\u706b,\\u8f6c\\u5708,\\u78d5\\u5934,\\u56de\\u5934,\\u8df3\\u7ef3,\\u6325\\u624b,\\u6fc0\\u52a8,\\u8857\\u821e,\\u732e\\u543b,\\u5de6\\u592a\\u6781,\\u53f3\\u592a\\u6781'
// const str = unicode.split(',').join('|')
// const rEmotion = RegExp(`(.*)(\\[(?:${str})\\])$`)
import { TransferDom, Popup, Group, XTextarea, Swiper, SwiperItem, Box, XButton } from 'vux'
import EmotionBox from './EmotionBox'
export default {
  name: 'CommentPopup',
  directives: {
    TransferDom
  },
  components: {
    Popup, Group, XTextarea, Swiper, SwiperItem, Box, XButton, EmotionBox
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    id: String,
    title: String,
    className: ''
  },
  data () {
    return {
      // emotions1: emotions[0],
      // emotions2: emotions[1],
      // emotions3: emotions[2],
      // emotions4: emotions[3],
      // emotions5: emotions[4],
      value: '',
      textarea: null
      // rangeData: undefined
    }
  },
  watch: {
    value () {
      return this.value
    }
  },
  methods: {
    valueChange (val) {
      this.value = val
    },
    onSubmit () {
      const textarea = this.$refs.textarea.$refs.textarea
      let val = textarea.value
      textarea.value = ''
      this.value = ''
      this.$emit('on-submit', val)
    },
    onCancel () {
      const textarea = this.$refs.textarea.$refs.textarea
      textarea.value = ''
      this.value = ''
      this.$emit('on-cancel', textarea)
    },
    onTextFocus () {
      this.$emit('on-text-focus')
    }
  }
}
</script>
<style>
.comment-popup .comment-article-title {
  padding: 10px 14px;
}

/* vui css hack */
.comment-popup .weui-cells {
  margin-top: 0;
}
</style>
