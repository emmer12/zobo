import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"
import auth from "./modules/Auth/"
import zobo from "./modules/Zobo/"
import user from "./modules/User/"
export const store =new Vuex.Store({
    state:{
      notifications:[]
    },
    modules:{
      auth,
      zobo,
      user
    },
    mutations,
    actions,
    getters
}) 