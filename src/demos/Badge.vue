<template>
  <div>
    <badge text="1"></badge>
    <br>
    <badge text="123"></badge>
    <br>
    <group title="在 Cell 组件里使用">
      <cell title="红点" is-link>
        <div class="badge-value">
          <span class="vertical-middle">新消息 &nbsp;</span>
          <badge></badge>
        </div>
      </cell>
      <cell title="个位数" is-link>
        <div class="badge-value">
          <span class="vertical-middle">新消息 &nbsp;</span>
          <badge text="8"></badge>
        </div>
      </cell>
      <cell title="多位数" is-link>
        <div class="badge-value">
          <span class="vertical-middle">新消息 &nbsp;</span>
          <badge text="888"></badge>
        </div>
      </cell>
    </group>
  </div>
</template>

<script>
import { Badge, Group, Cell } from 'vux'
export default {
  components: {
    Badge,
    Group,
    Cell
  }
}
</script>

<style lang="less">
.badge-value {
  display: inline-block!important;
}
.vertical-middle {
  vertical-align: middle;
}
</style>
