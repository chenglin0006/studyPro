import * as types from '../types'

const state={
	memoItem:[],
	title:"这是备忘录"
}

const mutations={
	[types.GET_MEMO_ITEM](state,memoItem){
		state.memoItem = memoItem;
	}
}

const actions= {
	 getMemoItem ({ commit },memoItem) {
	 	commit(types.GET_MEMO_ITEM,memoItem)
	 }
}

const getters = {
    getMemoItem:state=>state.memoItem
}

export default{
  state,
  actions,
  mutations,
  getters
}