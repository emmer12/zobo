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
import Carousel3d from 'vue-carousel-3d';
import VueConfetti from 'vue-confetti'
import infiniteScroll from 'vue-infinite-scroll'

// import LottieAnimation from "lottie-web"
// import  'lottie-vuejs'
// import firebase from 'firebase/app'


import VueSocialSharing from 'vue-social-sharing'

import VueCountdown from '@chenfengyuan/vue-countdown';

Vue.component(VueCountdown.name, VueCountdown);


Vue.use(VueConfetti)

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



// Vue.use(LottieAnimation)

Vue.use(VueSocialSharing);


Vue.use(infiniteScroll)


Vue.use(Carousel3d)



// ************************************************** //
//           Filtered                                 //
// **************************************************//


Vue.filter("formatDate",function(value){
    if(value){
        return moment(String(value)).format('LL')
    }
})

Vue.filter("timeAgo",function(value){
    if(value){
        return moment(String(value)).fromNow('dd')
    }
})


Vue.filter("toCountdown",function(value){
    if(value){
        return moment.utc(value)-(new Date())
    }
})


Vue.filter("birthday",function(value) {
    return  moment(String(value)).format('MMMM') + ',' + moment(String(value)).format('D')
})



Vue.filter('capFirst',function(value){
    return value.charAt(0).toUpperCase() + value.substr(1)
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
  else if (to.matched.some(record => record.meta.requiresSuperAuth)) {
    if (!store.getters.loggedIn && store.getters.role!=="Super Admin") {
       alert()
        next({
            name: 'zobo.list',
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
