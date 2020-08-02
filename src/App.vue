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

    </v-content>
    <cheers :cheers="'yesss'"></cheers>
  </v-app>
</template>

<script>
import NavBar from "./components/Partials/NavBar";
import Cheers from "./components/Partials/Cheers";
export default {
  name: "App",
  components: {
    NavBar,
    Cheers
  },
  data() {
    return {
      show:true
    }
  },

 watch: {
   $route(){
     window.scrollTo(0,0)
   }
 },
  
  mounted() {
    this.$store.dispatch("getUser");
  },
  computed: {
  },
};
</script>

<style src="cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css"></style>
<style lang="scss">
@import url("./assets/css/animate.css");
</style>