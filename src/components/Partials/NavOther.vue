<template>
  <div>
    <v-app-bar app color="white" style="z-index:9999">
      <div class="d-flex align-center ">
        <router-link :to="{name:'home'}" class="logo">
          <svg fill="#E50913" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="150"  version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd;margin-top:10px"
              viewBox="0 0 3216.22 1007.32"
              xmlns:xlink="http://www.w3.org/1999/xlink">
              <defs>
                <!-- <style type="text/css">
                <![CDATA[
                  .fil0 {fill:#E50913}
                  .fil1 {fill:#E50913;fill-rule:nonzero}
                ]]>
                </style> -->
              </defs>
              <g id="Layer_x0020_1">
                <metadata id="CorelCorpID_0Corel-Layer"/>
                <path class="fil0" d="M879.91 849.92c-89.95,96.81 -218.36,157.4 -360.94,157.4 -75.67,0 -147.34,-17.08 -211.4,-47.57 -0.21,-5.95 -0.36,-11.93 -0.36,-17.93 0,-137.79 56.58,-262.35 147.77,-351.75 81.81,-11.45 157.18,-42.99 220.96,-89.48 11.95,-8.7 27.78,-8.17 39.1,1.34 6.8,5.71 13.45,11.6 19.93,17.66 7.67,7.17 11.12,16.7 9.81,27.12 -1.3,10.41 -6.99,18.81 -16.18,23.87l-75.38 41.5c-49.56,27.29 -67.78,90.16 -40.5,139.72l0 0c27.28,49.56 90.16,67.78 139.72,40.5l80.06 -44.08c9.01,-4.96 18.89,-5.37 28.28,-1.16 9.39,4.2 15.67,11.85 17.97,21.88 4.19,18.27 7.36,36.93 9.45,55.9 1.05,9.5 -1.79,18.09 -8.29,25.09z"/>
                <path class="fil0" d="M702.68 15.89c52.3,15.66 82.01,70.75 66.35,123.05 -22.8,76.17 -157.7,118.42 -207.94,46.61 -0.5,-0.71 -1.33,-1.04 -2.19,-0.85 -0.85,0.18 -1.47,0.82 -1.63,1.68 -0.13,0.69 -0.29,1.37 -0.5,2.05 -3.06,10.2 -13.81,16 -24.01,12.94 -10.2,-3.05 -16,-13.81 -12.94,-24.01 3.05,-10.2 13.81,-16 24.01,-12.94 0.86,0.26 1.69,0.57 2.48,0.93 0.79,0.36 1.67,0.22 2.31,-0.37 0.64,-0.59 0.85,-1.46 0.55,-2.28 -30.11,-82.33 77.42,-169.59 153.5,-146.81z"/>
                <path class="fil0" d="M782.02 432.68c-274.63,2.19 -496.58,225.49 -496.58,500.63 0,5.81 0.13,11.58 0.33,17.34 -168.97,-80.41 -285.77,-219.15 -285.77,-452.29 0,-217.11 180.69,-453.19 418,-494.02 40.38,-6.94 59.3,-5.6 82.1,4.34 12.08,5.27 20.12,15.75 20.59,28.93 0.47,13.18 -6.55,24.7 -18.47,30.33l-70.63 33.33c-58.77,27.73 -84.16,98.51 -56.43,157.28l0 0c27.74,58.77 98.51,84.16 157.28,56.43l101.06 -47.69c125.31,-59.13 179.62,70.44 180.12,128.01 0.08,9.74 -0.91,18.51 -7.2,25.96 -6.29,7.45 -14.65,11.36 -24.39,11.44z"/>
                <path class="fil1" d="M1176.45 645.42c-56.56,0 -103.28,-18.79 -140.16,-56.39 -36.87,-37.59 -55.31,-83.95 -55.31,-139.08 0,-55.49 18.44,-101.94 55.31,-139.35 36.88,-37.41 83.6,-56.12 140.16,-56.12 34.01,0 65.43,7.97 94.24,23.9 28.82,15.93 51.28,37.5 67.4,64.71l-63.91 37.05c-9.3,-16.83 -22.55,-29.98 -39.74,-39.47 -17.18,-9.48 -36.51,-14.23 -58,-14.23 -36.51,0 -65.96,11.45 -88.33,34.37 -22.38,22.91 -33.56,52.62 -33.56,89.14 0,36.16 11.18,65.69 33.56,88.6 22.38,22.91 51.82,34.37 88.33,34.37 21.48,0 40.9,-4.74 58.27,-14.23 17.36,-9.48 30.52,-22.46 39.47,-38.93l63.91 37.05c-16.11,27.21 -38.48,48.78 -67.13,64.71 -28.64,15.93 -60.14,23.9 -94.51,23.9zm264.2 -113.31c9.31,33.65 34.55,50.48 75.72,50.48 26.5,0 46.54,-8.95 60.15,-26.85l55.85 32.22c-26.49,38.31 -65.52,57.46 -117.06,57.46 -44.39,0 -80.01,-13.42 -106.86,-40.28 -26.85,-26.85 -40.28,-60.68 -40.28,-101.49 0,-40.45 13.25,-74.19 39.74,-101.22 26.49,-27.03 60.5,-40.54 102.03,-40.54 39.38,0 71.86,13.6 97.46,40.81 25.6,27.21 38.4,60.86 38.4,100.95 0,8.95 -0.9,18.44 -2.68,28.46l-202.45 0zm-1.07 -53.7l136.94 0c-3.94,-18.25 -12.08,-31.86 -24.43,-40.81 -12.35,-8.95 -26.4,-13.42 -42.15,-13.42 -18.62,0 -34.01,4.74 -46.18,14.23 -12.17,9.49 -20.23,22.82 -24.17,40.01zm254.54 159.49l0 -392.01 69.27 0 0 392.01 -69.27 0zm132.64 0l0 -392.01 69.27 0 0 392.01 -69.27 0zm191.17 -105.79c9.31,33.65 34.55,50.48 75.72,50.48 26.49,0 46.54,-8.95 60.14,-26.85l55.85 32.22c-26.49,38.31 -65.52,57.46 -117.06,57.46 -44.4,0 -80.01,-13.42 -106.86,-40.28 -26.85,-26.85 -40.28,-60.68 -40.28,-101.49 0,-40.45 13.25,-74.19 39.74,-101.22 26.49,-27.03 60.5,-40.54 102.03,-40.54 39.38,0 71.87,13.6 97.46,40.81 25.6,27.21 38.4,60.86 38.4,100.95 0,8.95 -0.9,18.44 -2.69,28.46l-202.44 0zm-1.07 -53.7l136.93 0c-3.94,-18.25 -12.08,-31.86 -24.43,-40.81 -12.35,-8.95 -26.4,-13.42 -42.16,-13.42 -18.62,0 -34.01,4.74 -46.18,14.23 -12.17,9.49 -20.23,22.82 -24.16,40.01zm410.8 -116.53c36.16,0 67.03,13.69 92.63,41.08 25.6,27.39 38.39,60.95 38.39,100.68 0,39.74 -12.79,73.3 -38.39,100.69 -25.6,27.38 -56.47,41.08 -92.63,41.08 -37.59,0 -66.59,-13.07 -86.99,-39.2l0 139.08 -69.27 0 0 -375.9 69.27 0 0 31.68c20.4,-26.13 49.4,-39.2 86.99,-39.2zm-66.05 196.27c13.96,14.14 31.68,21.21 53.16,21.21 21.48,0 39.29,-7.07 53.43,-21.21 14.14,-14.14 21.21,-32.31 21.21,-54.51 0,-22.2 -7.07,-40.36 -21.21,-54.5 -14.14,-14.14 -31.95,-21.21 -53.43,-21.21 -21.48,0 -39.2,7.07 -53.16,21.21 -13.96,14.14 -20.94,32.31 -20.94,54.5 0,22.2 6.98,40.37 20.94,54.51zm450 -188.75l69.27 0 0 268.5 -69.27 0 0 -31.68c-20.77,26.13 -49.94,39.2 -87.53,39.2 -35.8,0 -66.49,-13.7 -92.09,-41.08 -25.6,-27.38 -38.4,-60.95 -38.4,-100.69 0,-39.74 12.8,-73.3 38.4,-100.68 25.6,-27.39 56.29,-41.08 92.09,-41.08 37.59,0 66.77,13.07 87.53,39.2l0 -31.68zm-127.81 188.75c13.96,14.14 31.68,21.21 53.16,21.21 21.48,0 39.29,-7.07 53.44,-21.21 14.14,-14.14 21.21,-32.31 21.21,-54.51 0,-22.2 -7.07,-40.36 -21.21,-54.5 -14.14,-14.14 -31.95,-21.21 -53.44,-21.21 -21.48,0 -39.2,7.07 -53.16,21.21 -13.96,14.14 -20.94,32.31 -20.94,54.5 0,22.2 6.98,40.37 20.94,54.51zm458.33 -252.04l74.11 0 -121.27 332.23c-13.96,38.31 -32.49,66.23 -55.49,83.6 -23.09,17.36 -51.73,25.15 -86.1,23.36l0 -64.44c18.62,0.36 33.38,-3.58 44.3,-11.81 10.92,-8.23 19.6,-21.48 26.04,-39.74l-110.08 -259.9 75.72 0 69.99 180.43 82.79 -243.72z"/>
              </g>
              </svg>
        </router-link>
      </div>

      <v-row class="ma-10 d-none d-sm-flex">
        <div class="c-wrapper" v-if="user  && user.confirmed">
          <div class="c-select" :class="{open:openCurrency}">
            <div class="c-trigger" @click="openCurrency=!openCurrency">
              <span>{{user.currency || 'USD'}}</span>
              <v-icon>mdi-chevron-down</v-icon>
            </div>

            <div class="c-options"  v-if="currencies.length">
              <span class="c-option" v-for="(item, index) in currencies" :key="index" :class="{selected:user.currency==item.unit}" :data-value="item.unit" @click="setCurrency">{{item.unit}}</span>
              <!-- <span class="c-option" :class="{selected:currency=='NAIRA'}" data-value="NAIRA" @click="setCurrency">NAIRA</span> -->
            </div>
          </div>
        </div>   
             
      </v-row>


     <v-spacer></v-spacer>
      <div class="nav-search d-none d-sm-flex"  v-if="user && user.confirmed">
        <v-text-field prepend-inner-icon="mdi-magnify" solo rounded label="Find Celebrant" :loading="loading" clearable ></v-text-field>
      </div>
      <router-link class="ml-4" style="cursor:pointer" v-if="isLoggedIn && user && user.confirmed" tag="div" :to="{name:'feeds'}">
         <!-- Feeds -->
         <v-icon size="35">mdi-rss</v-icon>
      </router-link>
      <div class="mx-4 mt-2 d-none d-sm-flex" v-if="isLoggedIn && user && user.confirmed" style="cursor:pointer" @click="openNote">
        <v-badge color="success" :content="count || '0'">
          <v-icon size="30">mdi-bell-outline</v-icon>
        </v-badge>
      </div>

      <v-btn @click="toggleDrawer"  v-if="user && user.confirmed" class="d-flex d-sm-none" icon color="primary">
        <div class="bar"  :class="{added:drawer}">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </v-btn>

      <div class="d-none d-sm-flex" >
        <ul class="d-flex">
          <li v-show="!isLoggedIn">
            <router-link :to="{name:'access.signin'}">Sign in</router-link>
          </li>
          <li>
            <v-btn color="primary" :to="{name:'access.signup'}" v-show="!isLoggedIn" outlined>
              <span class="mr-2">Join</span>
            </v-btn>
          </li>
        </ul>

        <v-btn
          v-if="user && user.profile_image=='profile.png'"
          color="primary"
          text
          @click="dropdownPro=!dropdownPro"
        >
          <v-icon color="grey">mdi-account-circle</v-icon> 
          <v-icon right color="grey">mdi-chevron-down</v-icon>
        </v-btn>
        <div
          v-if="user && user.profile_image!=='profile.png' && user.confirmed"  
          @click="dropdownPro=!dropdownPro"
          style="cursor:pointer"
        
        >
          <v-avatar size="40" color="white">
            <img
              v-if="user && user.profile_image"
              ref="img"
              :src="user.profile_image || 'http://localhost:3000/images/'+user.profile_image"
              alt="alt"
            />
          </v-avatar>
          <v-icon right color="grey">mdi-chevron-down</v-icon>
        </div>
      </div>

      <transition
        enter-active-class="animated bounceInUp"
        leave-active-class="animated bounceOutRight"
      ></transition>

      <transition
        enter-active-class="animated bounceInUp"
        leave-active-class="animated bounceOutRight"
      >
        <v-card class="dropdown-user" v-if="dropdownPro">
          <v-list>
            <router-link
              tag="div"
              style="cursor:pointer"
              :to="{name:'profile',params:{username:user.username}}"
            >
              <v-icon left>mdi-account</v-icon>Profile
            </router-link>
          </v-list>
            <v-list>
            <router-link tag="div" style="cursor:pointer" :to="{name:'zobo.list'}">
              <v-icon left>mdi-view-dashboard</v-icon>Dashboard
            </router-link>
          </v-list>
          <v-divider></v-divider>

          <v-list>
            <div>
              <v-icon left>mdi-cog</v-icon>Settings
            </div>
          </v-list>
            <div class="ml-8">
                <v-list>
                <router-link tag="div" style="cursor:pointer;font-size:14px" :to="{name:'account.settings'}">
                  Account Settings
                </router-link>
                </v-list>
                <v-list>
                  <router-link tag="div" style="cursor:pointer;font-size:14px" :to="{name:'profile.settings'}">
                    Profile Settings
                  </router-link>
            </v-list>
            </div>
          <v-divider></v-divider>
          <v-list>
            <router-link tag="div" :to="{name:'logout'}" style="cursor:pointer">
              <small>
                <v-icon left>mdi-logout</v-icon>Sign Out
              </small>
              <span class="float-right primary--text">{{user.username}}</span>
            </router-link>
          </v-list>
        </v-card>
      </transition>
    </v-app-bar>
    
   <side-bar :drawer="drawer"></side-bar>

    <transition
      v-if="isLoggedIn"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <notifications-view
        :notifications="notifications"
        :count="count"
        v-show="notifyShow"
        @close="notifyShow=false"
      ></notifications-view>
    </transition>
  </div>
</template>

<script>
import NotificationsView from "./NotificationView";
import SideBar from "./SideBar";
import { mapGetters } from "vuex";

export default {
  components: {
    NotificationsView,
    SideBar
  },
  data() {
    return {
      dropdownPro: false,
      drawer: false,
      notifyShow: false,
      openCurrency:false,
      search:"",
      loading:false
    };
  },

  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    notify() {
      this.$store.dispatch("getNotifications");
    },
    openNote() {
      (this.notifyShow = true),
        this.$store.dispatch("markAsRead").then(() => {});
    },

    setCurrency(e){
      let currency=e.target.getAttribute('data-value')
      this.openCurrency=false
      this.$store.dispatch('setCurrency',currency).then(()=>{
        this.$store.dispatch('getUser')
      })
    },

    submitSearch(val){
      if (!val.length) return;
       this.loading = true;
       this.$store.dispatch("searchUsers", {val}).then(()=>{
      }).catch(()=>{
        this.loading = false;
      })
    },

     waitForIt(val) {
      if (this.time) {
        clearTimeout(this.time);
      }
      this.error = false;
      this.time = setTimeout(() => this.submitSearch(val), 1000);
    },
  },

  watch: {
    $route() {
      this.dropdownPro = false;
      this.drawer = false;
      if (localStorage.getItem('token')) {
        this.notify();
      }
    },

     search(val) {
      this.waitForIt(val);
    }
  },
  mounted() {
    if (localStorage.getItem('token')) {
    this.notify();
    }
  },

  computed: {
    ...mapGetters({
      user: "user",
      isLoggedIn: "loggedIn",
      count: "notificationsCount",
      notifications: "notifications",
      currencies:'currencies'
    })
  }
};
</script>

<style lang="scss" >

.nav-search{
  height:50px;
}
.drawer {
  margin-top: 58px;
  & .side-bar {
    background: #333;
    display: flex;
    position: fixed;
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
      color: #e50913;

      & .v-icon {
        color: #e50913;
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

.menu {
  background:rgba(255, 255, 255, 0.9);
  height: 100vh;
  width: 100%;
  position: absolute;
  z-index: 999;
  top: 56px;
  text-align: center;
  transition:0.3s;


  & .cancel{
    color:#ccc;
    font-size:20px;
    font-weight:700;
    position:absolute;
    right:0px;
    display:block;
    z-index: 999;
  }
  & ul {
    margin: 0;
    top:30px;
    padding: 0;
    display: block;
    & li {
      padding: 10px;
      font-size: 20px;
      border-bottom: 1px solid #ccc;
    }
  }
}

.c-wrapper{
  position:relative;
  user-select: none;
  width:100px;

  & .c-select{
    position:relative;
    display: flex;
    flex-direction:column;

    & .c-trigger{
      position:relative;
      display:flex;
      align-items:center;
      justify-content: space-between;
      padding:0 22px;
      font-weight: 300;
      color:#444;
      top:5px;
      background: #ffffff;
      cursor: pointer;

    }
    & .c-options{
      position:absolute;
      display:block;
      top:50px;
      left:0;
      right:0;
      transition:all 0.5s;
      opacity:0;
      visibility:hidden;
      pointer-events:none;
      z-index: 2;
      background:#f6f6f6;
    }

    & .c-option{
      position:relative;
      display:block;
      font-size:16px;
      cursor:pointer;
      transition:all 0.5s;
      padding:0 10px 0 10px;
      line-height:40px;
      &:hover{
        cursor:pointer;
        background:#e50913;
        color:white;
      }

      &.selected{
        background:#e50913;
        color:white
      }
    }

    &.open .c-options{
      opacity:1;
      visibility:visible;
      pointer-events:all;
    }
  }
}


@media (max-width:460px){
  .logo{
    svg{
      width:120px;
    }
  }
}
</style>