<template>
	<transition name="vue-mak">
	<div class="vue-loading" v-show="show">
		<div class="vue-mak">
			<div class="vue-toast"></div>
		</div>
	</div>
	</transition>
</template>
<script type="text/javascript" charset="utf-8">
	export default{
		props:{
			show:{
				type:Boolean,
				default:false
			}
		},
		watch:{
			show(val){
				this.$emit('update:show', val)
			}
		}

	}
</script>
<style scoped>
.vue-loading{position: absolute;z-index: 5000;width: 100%;height: 100%;background: rgba(0,0,0,.5);}
.vue-toast{position: absolute;top:50%;left:50%;transform: translate3d(-50%,-50%,0);width: 150px;height: 150px;background: #fff;}
.vue-mask-enter, .vue-mask-leave-active {opacity: 0;}
.vue-mask-leave-active, .vue-mask-enter-active {transition: opacity 300ms;}
</style>