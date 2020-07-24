import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import {routes} from './routes'
import { store } from './store/'
import CxltToastr from "cxlt-vue2-toastr";
import VueJwtDecode from "vue-jwt-decode"
import moment from "moment"
// import LottieAnimation from "lottie-web"
// import  'lottie-vuejs'
// import firebase from 'firebase/app'


import VueSocialSharing from 'vue-social-sharing'


// const firebaseConfig = {
//     apiKey: "AIzaSyAFcDUZViNv1_YmG7lgtIo9rJdZCrNJDWI",
//     authDomain: "hotmeat.firebaseapp.com",
//     databaseURL: "https://hotmeat.firebaseio.com",
//     projectId: "hotmeat",
//     storageBucket: "hotmeat.appspot.com",
//     messagingSenderId: "1083197514564",
//     appId: "1:1083197514564:web:443ff664ed16cb6e9d2d11",
//     measurementId: "G-3NLV8945SD"
//   };

import infiniteScroll from "vue-infinite-scroll"


// Vue.use(LottieAnimation)

Vue.use(VueSocialSharing);


Vue.use(infiniteScroll)


// ************************************************** //
//           Filtered                                 //
// **************************************************//


Vue.filter("formatDate",function(value){
    if(value){
        return moment(String(value)).format('LL')
    }
})

// ************************************************** //
//            JWT Decode init il i zation            //
// **************************************************//

Vue.use(VueJwtDecode)


// ************************************************** //
//            Event Bus                               //
// **************************************************//

window.eventBus=new Vue()



// import 'vue-material-design-icons/styles.css';



Vue.config.productionTip = false

// ************************************************** //
//            Vue Router Confg                        //
// **************************************************//



Vue.use(VueRouter);

let router = new VueRouter({
  mode: 'history',
  routes
});


// ************************************************** //
//            Cxlt Toaster Confg                      //
// **************************************************//


const toastConfig = {
  position: "top right",
  showDuration: 2000,
  timeOut: 5000,
  progressBar: true,
}

Vue.use(CxltToastr, toastConfig)


// ************************************************** //
//            Route Authentication                    //
// **************************************************//


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!store.getters.loggedIn) {
          next({
              name: 'access.signup',
          })
      }
      else {
          next();
      }
  }
  else if (to.matched.some(record => record.meta.requiresVisitor)) {
      if (store.getters.loggedIn) {
          next({
              name: 'dashboard',
          })
      }
      else {
          next();
      }
  } else {
      next()
  }
})








new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
