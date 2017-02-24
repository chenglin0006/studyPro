import * as types from '../types'

const state={
	memoList:[]
}

const mutations={
	[types.GET_MEMO_LIST](state,memoList){
		state.memoList = memoList;
	}
}

const actions= {
	 getMemoList ({ commit },memoList) {
	 	commit(types.GET_MEMO_LIST,memoList)
	 }
}

const getters = {
    getMemoList:state=>state.memoList
}

export default{
  state,
  actions,
  mutations,
  getters
}