<template>
  <div class="weui-tab">
    <slot name="header"></slot>
    <div class="weui-tab__panel vux-fix-safari-overflow-scrolling" ref="viewBoxBody" id="vux_view_box_body" :style='{paddingTop: bodyPaddingTop, paddingBottom: bodyPaddingBottom}'>
      <slot></slot>
    </div>
    <slot name="bottom"></slot>
  </div>
</template>

<script>
export default {
  name: 'view-box',
  props: ['bodyPaddingTop', 'bodyPaddingBottom'],
  methods: {
    scrollTo (top) {
      this.$refs.viewBoxBody.scrollTop = top
    },
    getScrollTop () {
      return this.$refs.viewBoxBody.scrollTop
    },
    getScrollBody () {
      return this.$refs.viewBoxBody
    }
  }
}
</script>
<style type="text/css" scoped>
.weui-tab {
    position: relative;
    height: 100%;
}

.weui-tab__panel {
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    height: 100%;
    overflow: auto;
    padding-bottom: 50px;
    overflow-scrolling: touch;
    -webkit-overflow-scrolling: touch;
}
</style>