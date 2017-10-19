<template>
  <div class="weui-tab">
    <slot name="header"></slot>
    <div class="weui-tab__panel vux-fix-safari-overflow-scrolling" ref="viewBoxBody" @touchend="endTop" id="vux_view_box_body" :style='{paddingTop: bodyPaddingTop, paddingBottom: bodyPaddingBottom}'>
      <slot></slot>
    </div>
    <slot name="bottom"></slot>
  </div>
</template>

<script>
export default {
  name: 'view-box',
  props: ['bodyPaddingTop', 'bodyPaddingBottom'],
  data(){
    return{
      timer:null
    }
  },
  methods: {
    scrollTo (top) {
      this.$refs.viewBoxBody.scrollTop = top
    },
    getScrollTop () {
      return this.$refs.viewBoxBody.scrollTop
    },
    getScrollBody () {
      return this.$refs.viewBoxBody
    },
    endTop(){
      clearTimeout(this.timer);
      this.timer=setTimeout(()=>{
         this.$emit("newT",this.getScrollTop ())
       },500)
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
    padding-bottom: 0px;
    overflow-scrolling: touch;
    -webkit-overflow-scrolling: touch;
}
</style>