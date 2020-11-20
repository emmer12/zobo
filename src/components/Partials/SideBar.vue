<template>
  
    <v-navigation-drawer
      v-if="user"
      app
      color="#fff"
      class="drawer"
      temporary
      fixed
      v-model="drawer"
      style="z-index:9999"
    >
      <section class="side-bar d-flex d-sm-none">
        <div style="background:#333;height:150px;">
          <router-link :to="{name:'profile',params:{username:user.username}}" tag="div">
             <v-icon v-if="user && user.profile_image=='profile.png'">mdi-account-circle</v-icon>
              <v-avatar v-else size="40" color="white">
                <img
                  v-if="user && user.profile_image"
                  ref="img"
                  :src="user.profile_image || 'http://localhost:3000/images/'+user.profile_image"
                  alt="alt"
                />
              </v-avatar>

              <span class="ml-2">{{user && user.username}}</span>
          </router-link>
          <div class="d-flex flex-direction-row">
            <div style="text-align:center">
              Follower
              <span>{{follower.length}}</span>
            </div>
            <div style="text-align:center">
              Followeing
              <span>{{following.length}}</span>
            </div>
          </div>
        </div><br>
        <!-- <router-link
          tag="div"
          :to="{name:'zobo.list'}"
          :class="{'active':$route.name=='zobo.list'}"
        >
          <v-icon left>mdi-home-lightbulb-outline</v-icon>Home
        </router-link>

        <router-link tag="div" :to="{name:'balance'}" :class="{'active':$route.name=='balance'}">
          <v-icon left>mdi-cash-100</v-icon>Balance                                        
        </router-link> -->
      
         <div :class="{'active':$route.name=='balance'}" style="cursor:text                     ">
          <v-icon left>mdi-cog-outline</v-icon>Settings
          <!-- <span style="float:right"><v-icon right>mdi-menu-down</v-icon></span> -->
         </div>

         <div>
           <router-link tag="div" :to="{name:'account.settings'}" :class="{'active':$route.name=='account.settings'}">
               Account Settings 
           </router-link>

           <router-link tag="div" :to="{name:'profile.settings'}" :class="{'active':$route.name=='profile.settings'}">
              Profile Settings
           </router-link>
         </div>
        <v-spacer></v-spacer>

        <router-link tag="div" :to="{name:'logout'}" class="bottom">
          <v-icon left>mdi-logout</v-icon>Logout
        </router-link>
      </section>
    </v-navigation-drawer>

    <transition v-else enter-active-class="animated bounceInDown" leave-active-class="animated fadeOutUp">
      <div v-show="drawer" class="menu">
      <span class="cancel float-right pa-5" @click="drawer=false">X</span>
      <ul>
        <router-link :to="{name:'access.signup'}" tag="li">Sign Up</router-link>
        <router-link :to="{name:'access.signin'}" tag="li">Sign In</router-link>
        <router-link to="/" tag="li">FAQ</router-link>
      </ul>
    </div>
    </transition>

</template>

<script>
import { mapGetters } from 'vuex';

export default {
    props: ['drawer'],
    data () {
        return {
          follower: [],
          following: [],
        }
    },
    methods: {
    getFollow() {
      this.$store.dispatch("getFollow").then(res => {
        this.follower = res.data.follower;
        this.following = res.data.following;
      });
    },
    
    },

    mounted () {
        this.getFollow();
    },
     computed: {
    ...mapGetters({
      user: "user",
      isLoggedIn: "loggedIn",
    })
  }
}
</script>

<style>
  
</style>