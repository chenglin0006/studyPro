import * as types from '../types'
const state={
	recommandList:[],
	recommandText:''
}

const mutations={
	[types.GET_RECOMMAND_LIST](state,list){
		state.recommandList = list;
	},
	[types.GIVE_RECOMMAND_TEXT](state,str){
		state.recommandText = str
	}
}

const actions= {
	 getRecommandList ({ commit },list) {
	 	commit(types.GET_RECOMMAND_LIST,list)
	 },
	 giveRecommandText ({ commit },str) {
	 	commit(types.GIVE_RECOMMAND_TEXT,str)
	 }
}

const getters = {
    getRecommandList:state=>state.recommandList,
    getRecommandText:state=>state.recommandText
}

export default{
  state,
  actions,
  mutations,
  getters
}