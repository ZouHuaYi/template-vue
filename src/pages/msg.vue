<template>
	<div class="vue-contanier">
		<div id="content" v-if="html.status==200" v-html="html.data"></div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				html:"",
				oldPath:""
			}
		},
		methods:{
			getHtml(){
				var url=this.$route.params.id;
				this.$http('c=msg&'+url,(data)=>{
					this.html=data;
					this.$root.$data.share.loadingAction(false)
					console.log(data,1)
				},'html')
			},
		},
		created(){
			this.getHtml();
		},
		watch:{
			"$route":function(to,from){
			 //   let newPa=to.path.split("&")[0].split("=")[1];
				// let oldPa=from.path.split("&")[0].split("=")[1];
				// if(this.oldPath!=newPa || this.oldPath==""){
				// 	this.$emit("scrollNews",0)
				// }
				// this.oldPath=oldPa;
				this.getHtml();
			}
		}
	}
</script>