<template>
  <div>
      <section class="pa-4 d-block d-sm-none">
          <div class="header">
              <h4>Meet New Celebrities</h4>
          </div>
          <v-divider></v-divider>

          <div class="m-box">
             <div v-if="loadingU">
             <v-card class="my-4" >
               <v-skeleton-loader type="list-item-avatar-three-line"></v-skeleton-loader>
             </v-card>
          </div>
           <transition-group v-else enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <div style="display:inline-block" v-for="user in ousers" :key="user.id">
              <user-box  :user="user"></user-box>
            </div>
          </transition-group>
          </div>
      </section>
      

    <div class="d-flex">
      <section class="main">
        <v-container grid-list-md>
            <div class="header">
              <h4 class="">Feeds</h4>
          </div>
         <v-divider></v-divider>
          <div v-if="loading">
             <v-layout row wrap>
               <v-flex 
               v-for="x in 6" 
               :key="x" 
               md4
               sm6
               xs12>
             <v-card class="my-4" >
               <v-skeleton-loader type="card-avatar"></v-skeleton-loader>
             </v-card>
              </v-flex>
             </v-layout>
          </div>
          <div v-else>
          <v-layout v-if="feeds && feeds.length" row wrap>
            <v-flex
              md4
              sm6
              xs12
              v-for="(c, index) in feeds"
              :index="index"
              :key="index"
            >
              <zobo-card :zobo="c" :user="{}" :from="'home'"></zobo-card>
            </v-flex>
          </v-layout>
          <div class="pa-4" v-else>
           <v-icon>info</v-icon>  No feeds to display 
          </div>
          </div> 

        </v-container>
      <pacman-loader v-infinite-scroll="getFeed"  infinite-scroll-disabled="busy" infinite-scroll-distance="10" v-show="!busy" :loading="true" color="#e50913" class="ma-4" ></pacman-loader>
      
      
      </section>

      <!-- <div v-infinite-scroll="getFeeds" infinite-scroll-disabled="busy" infinite-scroll-distance="10"></div> -->


      <section class="side pa-4 d-none d-sm-block">
          <div class="header">
              <h4>Meet New Celebrants</h4>
          </div>
          <v-divider></v-divider>
          <div v-if="loadingU">
             <v-card class="my-4" v-for="x in 4" :key="x" >
               <v-skeleton-loader v-bind="attrs" type="list-item-avatar-three-line"></v-skeleton-loader>
             </v-card>
          </div>
          <transition-group v-else enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <user-box v-for="user in ousers" :key="user.id" :user="user"></user-box>
          </transition-group>
      </section>
     </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ZoboCard from "./../Partials/ZoboCard";
import UserBox from "./../Partials/UserBox";
import PacmanLoader from 'vue-spinner/src/PacmanLoader.vue'

export default {
  components: {
    ZoboCard,
    UserBox,
    PacmanLoader
  },
  data() {
    return {
      loading:false,
      loadingU:false,
      busy:false,
      limit:0,
      increment:6,
    };
  },

  methods: {
    ...mapActions(["getFeeds","getOtherUsers"]),

    getFeed(){
      this.loading=true && this.increment > 6
      this.limit = this.limit+this.increment
      this.getFeeds({
        limit:this.limit
      }).then((res)=>{
      this.busy=res.exhusted
      this.loading=false
      }).catch(()=>{
      this.loading=false
      })
    },
    getUsers(){
      this.loadingU=true
      this.getOtherUsers().then(()=>{
      this.loadingU=false
      }).catch(()=>{
      this.loadingU=false
      })
    }
  },

  mounted() {
    // this.getFeed();
    this.getUsers();
  },
  computed: {
    ...mapGetters(["feeds","ousers"]),
  },
};
</script>

<style lang="scss" scoped>
.main{
    width:70%
}
.side{
    width:30%;
}
.m-box{
  white-space:nowrap;
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
}
@media (max-width:600px){
  .main{
    width:100%
}
}
</style>