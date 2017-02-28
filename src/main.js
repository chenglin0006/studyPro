require('es6-promise').polyfill();
import Vue from 'vue'
import {Tooltip, Input} from 'element-ui'

import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import App from './App.vue'
import home from './index/component/Home.vue'
import memo from './index/component/Memo.vue'
import about from './index/component/About.vue'
import recommand from './index/component/Recommand.vue'
import articleDetails from './index/component/ArticleDetails.vue'
import classify from './index/component/Classify.vue'
import memoItem from './index/component/MemoItem.vue'
import backHome from './index/component/BackHome.vue'
import label from './index/component/Label.vue'
import Vuex from 'vuex'
import store from './vuex/store.js'
Vue.use(Vuex)

//全局安装路由功能
Vue.use(VueRouter);  //plugin.install
Vue.use(VueResource);
Vue.use(Tooltip);
Vue.use(Input);

//创建 VueRouter 实例 ,然后传入options中
const router = new VueRouter({
	mode:'hash',
	routes: [
		{path: '/', component: home},		//component:一个路由对应一个视图
		{path: '/backHome', redirect:'/'},
		{path: '/home', component: home},
		{path: '/memo', component: memo,name:'memo',meta:{title:'备忘录'},
			children: [
                {
                	path: 'memoPreview:memoId',meta:{title:'备忘录',checkMatch:true},query:{memoId:''},
                	components:  			//components:一个路由对应多个视图
                	{
	                	default:memoItem,
	                	backhome:backHome
	                },
	                beforeEnter:function(to,from,next){
	                	console.log('beforeEnter');
	                	next()
	                }
            	}
            ]},
		{path: '/about', component: about},
		{name:'recommand',path: '/recommand', component: recommand},
		{path: '/articleDetails:id', component: articleDetails},
		{path: '/classify', component: classify},
		{path: '/label', component: label},
		{path: '*', component: home}
	],
	//模拟锚点的滚动
	scrollBehavior :function(to, from, savedPosition) {
	  if (to.hash) {
	    return {
	      selector: to.hash
	    }
	  }
	}
})

router.beforeEach((to,from,next)=>{
	console.log('beforeEach');
	next();
});

router.afterEach(route=>{
	console.log('afterEach');
})


// 创建和挂载根实例，通过 router 配置参数注入路由，从而让整个应用都有路由功能
new Vue({
  	el: '#app',
  	router: router,
  	store,
  	render: h => h(App)
})

/*
	h=>h(App)
	function(h){
		return h(App)
	}
	render: function (createElement) {
		return createElement(
		  'h' + this.level,   // tag name 标签名称
		  this.$slots.default // 子组件中的阵列
		)
	}
	h的实参是createElement函数，然后 createElement 会以 APP 为参数进行调用，用来创建 VNode
*/
