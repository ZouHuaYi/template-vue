<template>
  <div id="app">
	<drawer :show.sync="showNavbar" 
	:show-mode="'push'"
	:placement="'left'">
		<div slot="drawer">
			<ul><li v-for="n in 20">{{n}}hehheh</li></ul>
		</div>
		<view-box body-padding-top="0.46rem" body-padding-bottom="0.55rem">
			<header class="menu-nav" slot="header">
				<button @click="showNavbar=!showNavbar">click</button>
			</header>
			<div class="view-box">
				<transition :name="'route-'+$root.$data.share.state.direction">
	        		<router-view></router-view>
	    		</transition>
			</div>
			<div slot="button"></div>
		</view-box>
	</drawer>	
  </div>
</template>

<script>
import Drawer from './components/drawer.vue'
import ViewBox from './components/viewBox.vue'
export default {
  name: 'app',
  components:{
  	Drawer,
  	ViewBox
  },
  data(){
  	return{
  		showNavbar:false,
  		navlist:[]
  	}
  },
  created(){
  		let seft=this;
   		this.$http("c=msg&ts=main",(data)=>{
   			data.nav.forEach(function(item,key){
   				let linkRoot=item.link.split("&amp;");
   				let it=linkRoot[0].split("=")[1];
   				if(it=='list'){
   					let ia={"link":'/list/'+linkRoot[1],"title":item.title};
   					seft.navlist.push(ia);	
   				}else if(it=='msg'){
   					let ia={"link":'/msg/'+linkRoot[1],"title":item.title};
   					seft.navlist.push(ia)
   				}else{
   					let ia={"link":'/',"title":item.title};
   				   seft.navlist.push(ia);
   				}
   			})
   			console.log(data,seft.navlist)
   		},'json');
  }
}
</script>

<style>
html,body,h1,h2,h3,h4,h5,h6,p,input,textarea,ul,li,dl,dd,dt{margin: 0;padding: 0;}
html{width: 100%;height: 100%;}
body{width: 100%;height: 100%;overflow-x:hidden;}
a{text-decoration:none;color: #666666}
li{list-style: none;}
img{border: none;}
input,textarea{outline: none;}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 0.24rem;
  position: relative;
  height: 100%;
  width: 100%;
		
}
.menu-nav{
	position: absolute;
	top:0;
	left: 0;
	z-index: 1000;
	width: 100%;
	height: 0.46rem;
	background: #585050;
}
/*路由跳转的主要部分*/
.route-out-enter-active,
.route-out-leave-active,
.route-in-enter-active,
.route-in-leave-active {
  will-change: transform;
  transition: all 1000ms;
  height: 100%;
  top: 0;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}
.route-out-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.route-out-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.route-in-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.route-in-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
