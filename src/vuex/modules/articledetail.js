import * as types from '../types'

const state={
	articleDetail:{}
}

const mutations={
	[types.GET_ARTICLE_DETAIL](state,articleDetail){
		state.articleDetail = articleDetail;
	}
}

const actions= {
	 getArticleDetail ({ commit },articleDetail) {
	 	commit(types.GET_ARTICLE_DETAIL,articleDetail)
	 }
}

const getters = {
    getArticleDetail:state=>state.articleDetail
}

export default{
  state,
  actions,
  mutations,
  getters
}