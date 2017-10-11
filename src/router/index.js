import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	// base: '/'
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: resolve=>require(['@/pages/main'],resolve)
    },
    {
    	path: '/list/:id',
    	name: 'list',
    	component: resolve=>require(['@/pages/list'],resolve)
    },
    {
    	path: '/msg/:id',
    	name: 'msg',
    	component: resolve=>require(['@/pages/msg'],resolve)
    },
    {
    	path: '/onepage/:id',
    	name: 'onepage',
    	component: resolve=>require(['@/pages/onepage'],resolve)
    }
  ]
})
