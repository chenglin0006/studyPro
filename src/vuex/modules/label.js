import * as types from '../types'

const state={
	articleLabel:[]
}

const mutations={
	[types.GET_ARTICLE_LABEL](state,articleLabel){
		state.articleLabel = articleLabel;
	}
}

const actions= {
	 getArticleLabel ({ commit },articleLabel) {
	 	commit(types.GET_ARTICLE_LABEL,articleLabel)
	 }
}

const getters = {
    getArticleLabel:state=>state.articleLabel
}

export default{
  state,
  actions,
  mutations,
  getters
}