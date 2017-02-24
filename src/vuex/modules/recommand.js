import * as types from '../types'
const state={
	recommandList:[]
}

const mutations={
	[types.GET_RECOMMAND_LIST](state,list){
		state.recommandList = list
	}
}

const actions= {
	 getRecommandList ({ commit },list) {
	 	commit(types.GET_RECOMMAND_LIST,list)
	 }
}

const getters = {
    getRecommandList:state=>state.recommandList
}

export default{
  state,
  actions,
  mutations,
  getters
}