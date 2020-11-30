<template>
  <v-app>
    <nav-bar></nav-bar>

    <v-content>
      <transition
        name="fade"
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        mode="out-in"
      >
        <router-view></router-view>
      </transition>

      <footer-nav v-show="isLoggedIn"></footer-nav>
      <main-footer v-show="!isLoggedIn" v-if="$route.name!='profile'"></main-footer>
    </v-content>
    <pin-view v-if="isLoggedIn"></pin-view>
    <cheers :type="'birthday'"></cheers>
  </v-app>
</template>

<script>
import VueJwtDecode from 'vue-jwt-decode'
import NavBar from "./components/Partials/NavBar";
import Cheers from "./components/Partials/Cheers";
import PinView from "./components/Auth/PinView";
import FooterNav from "./components/Partials/Footer";
import MainFooter from "./components/Partials/MainFooter";

export default {
  name: "App",
  components: {
    NavBar,
    Cheers,
    FooterNav,
    MainFooter,
    PinView
  },
  data() {
    return {
      show:true,
      exp:null
    }
  },
  methods: {
    start(){
      this.$confetti.start()
    },
     stop(){
      this.$confetti.stop()
    }
  },
  created(){
    // this.start();
   
    },
 watch: {
   $route(){
     window.scrollTo(0,0)
         if (localStorage.getItem('pinToken') && Date.now()>=VueJwtDecode.decode(localStorage.getItem('pinToken')).exp * 1000) {
         this.$store.dispatch('destroyPinToken');
            }
    }
 },
  
  mounted() {
    //  window.eventBus.$emit('checkCheers')
   if (localStorage.getItem('token')) {
      this.$store.dispatch("getUser");
      this.$store.dispatch("getCurrency");
   }
  },
  computed: {
    isLoggedIn(){
      return this.$store.getters.loggedIn
    }
  },
};
</script>

<style src="cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css"></style>
<style lang="scss">
@import url("./assets/css/animate.css");

.header{
  padding:10px;
  text-transform:uppercase;
  letter-spacing:2px;
  color:#e50913; 
}

.sub-header{
  margin:20px 0px;
   h1{
      font-size:2.5rem

   }
 }

a{
  text-decoration:none;
}



@media (max-width:600px){
  .sub-header{
   h1{
      font-size:1.5rem

   }
 }
}
</style>