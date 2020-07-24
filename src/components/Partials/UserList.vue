<template>
  <div >
      <v-card
               img="src"
               flat
               height="100px"
               class="pa-3"
           >
               <v-toolbar
                   floating
                   dense
               >
                   <!-- <v-text-field  v-model="search" prepend-icon="search" hide-details single-line></v-text-field> -->
                
                  <v-select
                      :items="['All','Guitar','Piano']"
                      v-model="filter"
                      label="All"
                      hide-details 
                      single-line
                      placeholder="Filter"
                      prepend-icon="mdi-filter"
                      
                  ></v-select>

               </v-toolbar>
           </v-card>
     <v-layout row wrap>
        <v-flex v-show="loading" md3 xs6 v-for="(item, index) in 4" :key="index">
        <v-skeleton-loader table class="mx-auto md3" min-width max-width="300" type="card"></v-skeleton-loader>
      </v-flex>
     </v-layout>
    <v-layout v-show="filterBySearch" row wrap >
      <v-flex  v-show="!loading || user && fuser._id != user._id" md3 sm xs6 v-for="(fuser) in filterBySearch" :key="fuser._id">
        <v-card height="220px" >
          <button class="cat-btn">{{fuser.specilized_in}}</button>
          <router-link :to="{name:'user-details',params:{username:fuser.username}}">
            <div class="avatar">
              <v-avatar size="100">
                <img
                  v-if="fuser"
                  :src="'http://localhost:8000/uploads/'+fuser.profile_image"
                  alt="alt"
                />
              </v-avatar>
            </div>
          </router-link>

          <div class="details">
            <router-link :to="{name:'user-details',params:{username:fuser.username}}">
              <h4 class="mb-2 primary--text">@{{fuser.username}}</h4>
            </router-link>
             <v-btn v-if="user && fuser && fuser.following.length && fuser.following[0].followed_id.includes(user._id)" small color="primary" dark  @click="follow(fuser._id)">Unfollow</v-btn>
            <v-btn v-else small color="primary" dark  @click="follow(fuser._id)">Follow</v-btn>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
    <pacman-loader v-infinite-scroll="loadMore"  infinite-scroll-disabled="busy" infinite-scroll-distance="10" v-show="!busy" :loading="true" ></pacman-loader>
    <login-dialog :dialog="dialog" @closeDialog="dialog=!dialog"></login-dialog>
  </div>
</template>

<script>
import LoginDialog from './../Dialogs/LoginDialog'
import PacmanLoader from 'vue-spinner/src/PacmanLoader.vue'

export default {
  components:{
    LoginDialog,
    PacmanLoader
  },
  data() {
    return {
      allUsers: null,
      loading: false,
      dialog:false,
      filter:"",
      search:"",
      busy:false,
      increment:6,
      limit:0
    };
  },
  methods: {
    follow(fuid) {
      if (this.user) {
        let users = this.filterBySearch.find(i => i._id === fuid);
        let following = users.following  
        let user_id=this.user._id
          if (following.includes(user_id)) {
            this.$store.dispatch("unfollow", {fuid}).then(()=>{
             this.getAllUser()
            })
            
          }else{
          this.$store.dispatch("follow", {fuid})
            this.getAllUser()
          }
        }else{
        this.dialog=true
        }
         
    },
    loadMore(){
       this.getAllUser()
      
    },
    getAllUser(){
    this.loading = true;
    this.limit = this.limit+this.increment
    this.$store
      .dispatch("getAllUser",{limit:this.limit})
      .then(data => {
        this.loading = false;
        this.allUsers = data.users;
        this.busy=data.exhusted
      })
      .catch(err => {
        console.log(err);
      });
    }
  },

  created() {
    this.getAllUser()
  },
  computed: {
    user(){
      return this.$store.getters.user
    },
    firstFilter(){
      if (this.filter) {
         return this.allUsers.filter(user=>{
         return user.username.toLowerCase().indexOf(this.filter.toLowerCase()>=0)
      })}else{
           return this.allUsers
      }
    },
    filterBySearch(){
      return this.loading || this.allUsers.filter(user=>{
         return this.filter=="All" ? user : user.specilized_in && user.specilized_in.match(this.filter)
      })
    },
  
  
  },
};
</script>

<style lang="scss" scoped>
.v-card {
  text-align: center;
  cursor: pointer;
}
.avatar {
  height: 100px;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)),
    url(./../../assets/images/bg/bg2.png);
  background-size: cover;
  transition: 0.3s ease;
  &:hover {
    transition: 0.3s ease;
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 200, 0.6)),
      url(./../../assets/images/bg/bg2.png);
  }
  & .v-avatar {
    position: relative;
    top: 40px;
  }
}
.details {
  position: relative;
  top: 40px;
}
.cat-btn {
  position: absolute;
  top: 0px;
  left: 0px;
  background: rgba(76, 175, 80, 0.45);
  border: none;
  border-radius: 3px;
  padding: 3px 10px;
  color: white;
}
</style>


