require('es6-promise').polyfill();
import Vue from 'vue'
import App from './AppAdmin.vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import 'element-ui/lib/theme-default/index.css'
import ElementUI from 'element-ui'
import articleList from './admin/component/ArticleList.vue'
import articleEdit from './admin/component/ArticleEdit.vue'
import atricleLabel from './admin/component/ArticleLabel.vue'
import atricleRecommand from './admin/component/ArticleRecommand.vue'
import memo from './admin/component/Memo.vue'
import ownerInfo from './admin/component/OwnerInfo.vue'
import personalCenter from './admin/component/PersonalCenter.vue'
import articlePreview from './admin/component/ArticlePreview.vue'
import Vuex from 'vuex'
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(ElementUI)
import store from './vuex/store.js'
Vue.use(Vuex)

const router = new VueRouter({
	routes: [
        {path: '/', component: personalCenter },
		{path: '/articleList', component: articleList,
		    children: [
                {path: 'articleEdit', component: articleEdit},
                {path: 'articlePreview:id', component: articlePreview},
            ]
		},
		{path: '/atricleLabel', component: atricleLabel},
		{path: '/atricleRecommand', component: atricleRecommand},
		{path: '/remindMemo', component: memo},
		{path: '/aboutMe', component: ownerInfo},
        {path: '/personalCenter', component: personalCenter}
	]
})

new Vue({
  	el: '#app',
  	router: router,
  	store:store,
  	render: h => h(App)
})
