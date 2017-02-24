import Vue from 'vue'
import Vuex from 'vuex'

import about from './modules/about'
import recommand from './modules/recommand'
import articledetail from './modules/articledetail'
import home from './modules/home'
import label from './modules/label'
import memo from './modules/memo'
import memoitem from './modules/memoitem'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
       about,
       recommand,
       articledetail,
       home,
       label,
       memo,
       memoitem
    }
})