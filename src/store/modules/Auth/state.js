import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export default {
      token:localStorage.getItem('token') || null,
      pinToken:localStorage.getItem('pinToken') || null,
    }
