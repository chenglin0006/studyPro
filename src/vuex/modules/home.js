import * as types from '../types'

const state={
	articleList:[]
}

const mutations={
	[types.GET_ARTICLE_LIST](state,articleList){
		state.articleList = articleList;
	}
}

const actions= {
	 getArticleList ({ commit },articleList) {
	 	commit(types.GET_ARTICLE_LIST,articleList)
	 }
}

const getters = {
    getArticleList:state=>state.articleList
}

export default{
  state,
  actions,
  mutations,
  getters
}