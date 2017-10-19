<template>
  <div id="app">
  <loading :show.sync="$root.$data.share.state.isloading"></loading>
	<drawer :show.sync="showNavbar" 
	:show-mode="'push'"
	:placement="'left'"
	:drawerStyle="{'background-color':'#27303F', width: '80%'}">
		<div slot="drawer" class="menu-bar">
			<div class="bar-header">{{site.sitename}}</div>
			<ul>
        <li v-for="item in navlist"><router-link @click.native="showNavbar=!showNavbar" :to="item.link">{{item.title}}</router-link></li>
      </ul>
		</div>
		<view-box body-padding-top="0.46rem" body-padding-bottom="0.55rem" @newT="abs" ref="scrollBox">
			<header class="menu-nav" slot="header" flex="dir:left">
				  <img class="logo" :src="'http://127.0.0.1/mob/mob-1012/'+site.logo" alt="">
          <h2 flex-box="1">{{site.sitename}}</h2>
          <a class="menu-btn" href="javascript:void(0);" @click="showNavbar=!showNavbar"><i class="iconfont icon-san"></i></a>
			</header>
			<div class="view-box">
				<transition :name="'route-'+$root.$data.share.state.direction">
	        		<router-view @scrollNews="scrollChange"></router-view>
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
import Loading from './components/loading.vue'

export default {
  name: 'app',
  components:{
  	Drawer,
  	ViewBox,
    Loading
  },
  data(){
  	return{
  		showNavbar:false,
  		navlist:[],
      site:"",
      routePath:{},
      oT:0
  	}
  },
  created(){
  		let seft=this;
   		this.$http('c=msg&ts=main',(data)=>{
        seft.site=data.sys;
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
   		},'json');
  },
  methods:{
    scrollChange(val){
      this.$refs.scrollBox.scrollTo(val)
    },
    abs(val){
      this.oT=val;
    }
  },
  watch:{
   "$route":function(to,from){
    // 判断和存储滚动条的高度值
    let toP=to.path.split("&")[0].split("=")[1];
    let fromP=from.path.split("&")[0].split("=")[1];
    if(!fromP){ fromP="count"}
    if(!toP){toP="count"}
    this.routePath[fromP]=this.oT;
      if(this.routePath[toP]){
        this.$refs.scrollBox.scrollTo(this.routePath[toP])
      }else{
         this.$refs.scrollBox.scrollTo(0)
      }
    }
  }
}
</script>
<style>
@import './assets/flex.css';
@import './assets/app.css';
@import './assets/style.css';
</style>
