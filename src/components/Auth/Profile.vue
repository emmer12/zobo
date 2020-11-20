<template>
  <div>
          <div class="profile-banner">

                <div class="b-day">
                <v-icon color="primary">mdi-cake-layered</v-icon>
                <p>{{profile.user.birthday | birthday }}</p>
              </div>

            <div  v-if="loading">
               <div style="height:300px" class="d-flex flex-column align-center justify-center">
                  <v-skeleton-loader min-width="200"  type="avatar" v-bind="attrs" ></v-skeleton-loader>
               </div>
            </div>  
            <div v-else class="d-flex flex-column align-center justify-center">
              <v-avatar
                size="100"
                color="#ccc"
              >
                <img :src="profile.user.profile_image" alt="alt">
              </v-avatar>

              <h3 class="title white--text">{{profile.user.firstname}} {{profile.user.lastname}}</h3>
              <h3 class="caption pb-2" style="color:rgba(245,245,245,0.7)" >@{{profile.user.username}}</h3>
              <div v-if="!loading">
                <v-btn class="mr-2"  rounded color="primary" small dark>Following {{following.length}}</v-btn>
                <v-btn class="mr-2" rounded color="primary" small dark>Follower {{follower.length }}</v-btn>
              </div>
                <div v-if="isLoggedIn" v-show="!loading && user._id!==profile.user._id">
                  <v-btn  v-if="follower.includes(user._id)" rounded @click="follow(profile.user._id)" class="mt-3" outlined color="primary" small dark>Unfollow</v-btn>
                  <v-btn v-else rounded @click="follow(profile.user._id)" class="mt-3" outlined color="primary" small dark>Follow</v-btn>
                </div>
              <br>
              <v-btn v-if="isLoggedIn && user && user.username===$route.params.username" :to="{name:'profile.settings'}"  color="success" small rounded outlined><v-icon left>mdi-pencil-outline</v-icon> Edit Profile</v-btn>
 
              <!-- <div class="custom-avatar">
                <v-icon size="150">mdi-heart</v-icon>
                <img :src="require('./../../assets/images/avatar/avatar.png')" alt="alt">
              </div> -->

          
          </div>
          <v-container grid-list-md>
              <v-divider></v-divider>
               <div class="header">
                 <h4>Other post by {{profile.user.username | capFirst }} </h4>        
              </div>
              <v-divider></v-divider>
             <v-layout  v-if="profile.zobo.length" row wrap>
              <carousel-3d  :height="350"  :controls-visible="true">
                  <slide v-for="(zobo, index) in profile.zobo" :index="index" :key="index" >                     

                    
                      <zobo-card :from="'profile'" :zobo="zobo" :user="profile.user"  ></zobo-card>
                  </slide>
                </carousel-3d>


                <count-down v-if="profile && closestDate !== 'Infinity' " :date="closestDate"></count-down>
             </v-layout>
              <div v-else>
                       <v-icon>info</v-icon> User has no posted
              </div>
          </v-container>

          <div class="pa-4" v-show="!loading && !profile">
            <v-alert type="warning" :value="true">
              Oops,Page not found
            </v-alert>
          </div>
          </div>
          
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CountDown from "../Partials/CountDown";
import ZoboCard from './../Partials/ZoboCard'
export default {
  components: {
    ZoboCard,
    CountDown
  },
  data() {
    return {
      loading: true,
      dialog: false,
      dialogLog: false,
      pageNotFound: false,
      follower:[],
      following:[]
      
    };
  },
  methods: {
    follow(fuid) {
      if (this.isLoggedIn) {
        console.log(fuid);
        
        if (this.follower.includes(this.user._id)) {
          this.$store.dispatch("unfollow", { fuid }).then(() => {
            let index = this.follower.findIndex(i => i === this.user._id);
            this.follower.splice(index, 1);
          });
        } else {
          this.$store.dispatch("follow", { fuid });
          this.follower.push(this.user._id);
          console.log(this.follower);
        }
      } else {
        this.dialogLog = true;
      }
    },
    getUser(){
       this.$store.dispatch('getUserByUsername',this.$route.params.username).then((res)=>{
       this.$store.dispatch("getProfileFollow", { uid: res.data.user._id }).then(res=> {
         this.follower=res.data.follower
         this.following=res.data.following
         this.loading=false
       })
    })
    }
  },
  watch: {
    $route() {
      this.getUser();
    }
  },

  mounted () {
    this.loading=true
    this.getUser()
  },

  computed: {
     ...mapGetters({isLoggedIn:'loggedIn',user:'user',profile:'profile'}),

     closestDate(){
       let dates = this.profile.user.special
       let now =new Date();
       let closest=Infinity;

       dates.forEach((d)=>{
         const date=new Date(d.date)
         if (date>=now && (date < new Date(closest) || date < closest)) {
           closest = d.date
         }
       })

       return closest;
     }
  }
};
</script>

<style lang="scss" scoped>
.custom-avatar{
  height:100px;
  width:100px;
  border-radius: 50px;
  position:relative;
  & img{
    position: absolute;
    width:100%;
  border-radius: 50px;
  left: 26px;

  }

  & .v-icon{
    position: absolute;
    color:#836c6c
  }
}
.profile-banner {
  background:linear-gradient(rgba(0,0,0,0.5),rgba(50,0,0,0.6));
  max-height: 200px;
  & > div{
    transform: translateY(50px);
  }

  .b-day{
    // top:0%;
    right:0px;
    position: absolute;
    background:rgba(255, 255, 255, 0.71);
    padding:10px;
    top:90px;
    max-height:60px;
    border-top-left-radius:45px;
    border-top-right-radius:45px;
    text-align:center
  }
}

.carousel-3d-slide{
  // color:red;
  background-color:white;
  border:none
} 
</style>