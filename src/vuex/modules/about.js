import * as types from '../types'

const state={
	name:'',
	sex:'',
	age:'',
	email:'',
	telephone:'',
	desc:''
}

const mutations={
	[types.GET_ABOUT_ME](state,aboutObj){
		state.name = aboutObj.name;
		state.age = aboutObj.age;
		state.sex = aboutObj.sex;
		state.telephone = aboutObj.telephone;
		state.email = aboutObj.email;
		state.desc = aboutObj.desc;
	}
}

const actions= {
	 getAboutMe ({ commit },aboutObj) {
	 	commit(types.GET_ABOUT_ME,aboutObj)
	 }
}

const getters = {
    getName:state=>state.name,
    getSex:state=>state.sex,
    getAge:state=>state.age,
    getEmail:state=>state.email,
    getTelephone:state=>state.telephone,
    getDesc:state=>state.desc
}

export default{
  state,
  actions,
  mutations,
  getters
}