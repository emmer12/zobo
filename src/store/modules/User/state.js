import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export default {
      user:null,
      role:localStorage.getItem('role') || null,
      profile:null,
      currencies:[],
      otherUsers:[],
      celeb:[]
    }
