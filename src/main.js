import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import FastClick from 'fastclick'

let ajaxGet=function(url,fn,type='json'){
	Axios.get(/api/+'?'+url,{ responseType: type}).then(res=>{
		if(type=='json'){
			if(res.data.code){
				fn&&fn(res.data.data)
			}else{
				console.log("没有对应的数据")
			}
		}else if (type=='html') {
			fn&&fn(res)
		}
	}).catch(function(err){
        	console.log(err);
    })
}

let store={
	debug: true,
	state: {
	   direction: 'in',
	   isloading: false
	},
	directionAction (val){
		this.state.direction= val
	},
	loadingAction (val){
		this.state.isloading=val
	}
}

// 路由切换的时候页面跳转
const history = window.sessionStorage

history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

router.beforeEach((to,from,next)=>{
	const toIndex = history.getItem(to.path)
    const fromIndex = history.getItem(from.path)
    store.loadingAction(true)
    if(toIndex){
    	if(!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')){
    		store.directionAction ('in');
    	}else{
    		store.directionAction ('out');
    	}
    }else {
    	++historyCount
    	history.setItem('count', historyCount)
        to.path !== '/' && history.setItem(to.path, historyCount)
    	store.directionAction ('in');
    }
    if (/\/http/.test(to.path)) {
	    let url = to.path.split('http')[1]
	    window.location.href = `http${url}`
	} else {
	    next()
	}
})
router.afterEach(function (to, from){
 	
})

Vue.prototype.$http=ajaxGet;
FastClick.attach(document.body)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  data:{
  	share: store
  },
  template: '<App/>',
  components: { App }
})
