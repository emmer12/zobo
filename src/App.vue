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
<!-- 
       <div class="confirm notifivation" style="max-width:360px; position:fixed;right:0px;bottom:0px">
        <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOut">
            <v-alert  v-if="user && !user.bio" color="green-darken-3" type="error" dismissible v-model="show">
            <span class="subheadiing">Your Bio is empty,</span><br>
            <p>write somethig about yourself <router-link :to="{name:'profile.edit'}"><b>Click</b></router-link></p>
        </v-alert>
        </transition>
      </div> -->
      <!-- <div class="confirm" style="max-width:360px; position:fixed;right:0px;bottom:0px">
        <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOut">
            <v-alert v-if="user && user.bio && (!user.facebook || !user.twitter || !user.youtube)" color="green-darkeen-3" type="error" dismissible v-model="show">
            <span class="subheadiing">Link up your social media with Tunner</span><br>
           <router-link :to="{name:'profile.edit'}"><b>Click</b></router-link>
        </v-alert>
        </transition>
      </div> -->
    </v-content>
    
  </v-app>
</template>

<script>
import NavBar from "./components/Partials/NavBar";
export default {
  name: "App",
  components: {
    NavBar
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
  }
};
</script>

<style src="cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css"></style>
<style lang="scss">
@import url("./assets/css/animate.css");
</style>