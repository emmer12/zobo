import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export default {
      zoboCat:[],
      myZobo:[],
      celep:[],
      zobo:JSON.parse(localStorage.getItem('zobo')) || null,
      progress:0,
      gift:{
        init:localStorage.getItem('init') || 1,
      },
      transactions:[],
      yield:[],
      feeds:[]
    }
