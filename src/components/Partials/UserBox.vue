<template>
     <div class="mx-2 user-box d-flex elevation-2 pa-4 my-4">
       <router-link :to="{name:'profile',params:{username:user.username}}" tag="div"  class="">
           <img src="./../../assets/images/avatar/avatar.png" height="100px" width="100px" />
       </router-link>
       <div>
           <div class="mt-5 px-2">
             <p class="body2 mb-0">{{user.firstname}} {{user.lastname}}</p>
             <p class="caption">@{{user.username}}</p>
           </div>
           <v-btn style="position:absolute;right:10px" color="primary" @click="follow(user.id)" small>Follow </v-btn>
       </div>
   </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {

props: ['user'],
    data () {
        return {
        }
    },
     methods: {
       follow(fuid) {
        if (this.isLoggedIn) {
          this.$store.dispatch("follow", { fuid }).then(()=>{
              this.$store.dispatch('getOtherUsers')
          }) ;
        } else {
        alert('You are not loggged in')
      }
      },
    getUser(){
       this.$store.dispatch('getUserByUsername',this.user.username).then((res)=>{
       this.$store.dispatch("getProfileFollow", { uid: res.data.user._id }).then(()=> {
         this.$store.dispatch('getFeeds')
         this.loading=false;
       })
    })
    }
  },

 
  computed: {
    ...mapGetters({
      isLoggedIn: "loggedIn",
    })
  }

}
</script>

<style>
.user-box{
position:relative
}
</style>