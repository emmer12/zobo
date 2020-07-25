<template>
  <div>
    <v-app-bar app color="white" style="z-index:9999">
      <div class="d-flex align-center">
        <router-link :to="{name:'home'}">
          <v-img
            alt="App Logo"
            class="shrink mr-2"
            contain
            src="./../../assets/images/logo.png"
            transition="scale-transition"
            width="40"
          />
        </router-link>
      </div>

      <v-row class="ma-10 d-none d-sm-flex">
        <span>Explore</span>
      </v-row>

      <v-spacer></v-spacer>
      <!-- <input
      type="text"
      class="search-in"
      :loading="true"
      v-model="search"
      :class="{'added':searchAdded}"
      placeholder="Search"
    />
    <v-btn fab icon color="primary" @click="searchAdded=!searchAdded">
      <v-icon>search</v-icon>
      </v-btn>-->
      

      <div class="mx-4 mt-2" v-if="isLoggedIn" style="cursor:pointer"  @click="openNote" >
        <v-badge color="success" :content="count || '0'">
          <v-icon  size="30">mdi-alarm-light-outline</v-icon>
        </v-badge>
      </div>

      <v-btn @click="toggleDrawer" class="d-flex d-sm-none" icon color="primary">
        <div class="bar">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </v-btn>

      <div class="d-none d-sm-flex">
        <ul class="d-flex">
          <li>
            <router-link :to="{name:'home'}">Event</router-link>
          </li>
          <li>
            <router-link :to="{name:'about'}">Explore</router-link>
          </li>
          <li v-show="!isLoggedIn">
            <router-link :to="{name:'access.signup'}">Sign Up</router-link>
          </li>
          <li>
            <v-btn color="primary" :to="{name:'access.signin'}" v-show="!isLoggedIn" outlined>
              <span class="mr-2">Sign In</span>
            </v-btn>
          </li>
        </ul>

        <v-btn v-if="isLoggedIn" color="primary" text @click="dropdownPro=!dropdownPro">
          <v-icon color="grey">mdi-account-circle</v-icon>
          <v-icon right color="grey">mdi-chevron-down</v-icon>
        </v-btn>
      </div>

      <transition
        enter-active-class="animated bounceInUp"
        leave-active-class="animated bounceOutRight"
      >
      </transition>

      <transition
        enter-active-class="animated bounceInUp"
        leave-active-class="animated bounceOutRight"
      >
        <v-card class="dropdown-user" v-if="dropdownPro">
          <v-list>
            <router-link tag="div" style="cursor:pointer" :to="{name:'profile',params:{username:user.username}}"><v-icon>mdi-account</v-icon>  Profile</router-link>
          </v-list>

          <v-list>
            <router-link tag="div" style="cursor:pointer" :to="{name:'settings'}"><v-icon>mdi-cog</v-icon> Settings</router-link>
          </v-list>
          <v-divider></v-divider>
          <v-list>
            <router-link tag="div" :to="{name:'logout'}" style="cursor:pointer">
              <small><v-icon>mdi-logout</v-icon>  Sign Out</small>
              <span class="float-right primary--text">{{user.username}}</span>
            </router-link>
          </v-list>
        </v-card>
      </transition>
    </v-app-bar>

    <v-navigation-drawer app color="#fff" class="drawer" temporary absolute v-model="drawer">
      <section class="side-bar d-flex d-sm-none">
        <div style="background:#333;height:150px;">
          <v-icon>mdi-account-circle</v-icon>
          {{user && user.username}}
          <div class="d-flex flex-direction-row ">
            <div style="text-align:center">
              Follower
              <span>{{follower.length}}</span>
            </div>
            <div style="text-align:center">
              Followeing
              <span>{{following.length}}</span>
            </div>
          </div>
        </div>
        <router-link
          tag="div"
          :to="{name:'zobo.list'}"
          :class="{'active':$route.name=='zobo.list'}"
        >
          <v-icon left>mdi-home-lightbulb-outline</v-icon>Home
        </router-link>

        <router-link tag="div" :to="{name:'balance'}" :class="{'active':$route.name=='balance'}">
          <v-icon left>mdi-cash-100</v-icon>Balance
        </router-link>

        <router-link tag="div" :to="{name:'settings'}" :class="{'active':$route.name=='settings'}">
          <v-icon left>mdi-cog-outline</v-icon>Settings
        </router-link>

        <v-spacer></v-spacer>

        <router-link tag="div" :to="{name:'logout'}" class="bottom">
          <v-icon left>mdi-logout</v-icon>Logout
        </router-link>
      </section>
    </v-navigation-drawer>

    <transition v-if="isLoggedIn"  enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
      <notifications-view :notifications="notifications" :count="count" v-show="notifyShow" @close="notifyShow=false"></notifications-view>    
    </transition> 
 
  </div>
</template>

<script>
import NotificationsView from './NotificationView'
import {mapGetters} from 'vuex'

export default {
  components: {
    NotificationsView
  },
  data() {
    return {
      dropdownPro: false,
      drawer: false,
      notifyShow:false,
      follower:[],
      following:[]
    };
  },

  methods: {
    toggleDrawer() {
      this.drawer = true;
    },
    notify(){
      this.$store.dispatch('getNotifications')
    },
    openNote(){
     this.notifyShow=true,
     this.$store.dispatch('markAsRead').then(()=>{
       
     })
    }
  },

  watch: {
    $route(){
      this.notify()
      this.dropdownPro=false
    }
  },
  mounted () {
    this.notify()
     this.$store.dispatch("getFollow").then(res=> {
         this.follower=res.data.follower
         this.following=res.data.following
       })
  },

  computed: {
      ...mapGetters({user:'user',isLoggedIn:'loggedIn',count:'notificationsCount',notifications:'notifications'})
  }
};
</script>

<style lang="scss" scoped>
.drawer {
  margin-top: 58px;
  & .side-bar {
    background: #333;
    display: flex;
    position: absolute;
    min-height: 90vh;
    width: 100%;
    // z-index: 810;
    flex-direction: column;
    padding: 10px;
    color: white;

    & .v-icon {
      color: white;
    }

    & div {
      display: inline-block;
      padding: 10px 10px;
      background: rgba(220, 233, 220, 0.048);
      margin-top: 3px;
      cursor: pointer;
    }

    & div.bottom {
      position: relative;
      bottom: 0px;
    }
    & .active {
      background: white;
      color: #d34a1a;

      & .v-icon {
        color: #d34a1a;
      }
    }
  }
}
ul {
  position: relative;
  z-index: 2;
  border-radius: 10px;
  line-height: 40px;
  height: 40px;
  & li {
    list-style: none;
    & a {
      color: #444;
      padding: 0px 15px;
      text-decoration: none;
      font-weight: 600;
    }
  }
}
</style>