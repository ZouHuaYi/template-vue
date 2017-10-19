<template>
	<div class="vue-contanier">
		<div id="v-content" v-if="html.status==200" v-html="html.data"></div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				html:""
			}
		},
		created(){
			this.$http("c=msg&ts=index",(data)=>{
			this.html=data;
			this.$root.$data.share.loadingAction(false)
				this.$nextTick(()=>{
					call_func('func_index')
				})
			},'html')
		}
	}

</script>