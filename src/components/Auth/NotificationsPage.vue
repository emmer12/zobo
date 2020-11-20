<template>
  <v-container>
    <!-- <p v-if="notifications">{{notifications}}</p> -->
    <div v-if="notifications.length">
        <router-link tag="div"  :to="'/'" class="elevation-1" v-for="(item, index) in notifications" :key="index">
         
           <!-- {{ item }} -->
          <v-list class="elevation-1 pa-2 mt-2" v-if="item.type==='payment'">
              <div class="d-flex">
                <v-icon  color="primary">mdi-emoticon </v-icon>
                <span class="pl-3">Someone just cellepayed you </span>
                <v-spacer></v-spacer>
                <v-icon  color="primary">mdi-alarm-light-outline </v-icon>
              </div>
              
              <div class="d-flex pa-2">
                  <b></b>
                  <v-spacer></v-spacer>
                  <span class="caption grey--text">{{item.createdAt | formatDate }}</span> 
              </div>
          </v-list>

            <v-list class="elevation-1 pa-2 mt-2" v-if="item.type==='z-created'">
              <div class="d-flex">
                <v-icon  color="primary">mdi-post-outline </v-icon>
                <span class="pl-3"> <router-link :to="{name:'profile',params:{username:item.sender[0].username}}">{{item.sender[0].username}}</router-link> created a new Zobo</span>
                <span> View </span>
                <v-spacer></v-spacer>
                <v-icon  color="primary">mdi-alarm-light-outline </v-icon>
              </div>
              
              <div class="d-flex pa-2">
                  <b></b>
                  <v-spacer></v-spacer>
                  <span class="caption grey--text">{{item.createdAt | formatDate }}</span> 
              </div>
          </v-list>


        </router-link>
    </div>
    <div v-else>
       <div class="d-flex justify-center align-center empty" style="flex-direction:column">
        <div class="text-center">
          <h3 style="color:rgba(0,0,0,0.2)" >No Notifications</h3>
           <div> 
             <v-icon class="block" size="80" color="#cccccc" >mdi-bell-cancel</v-icon>
           </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>

export default {
  mounted () {
      this.$store.dispatch('getAlltNotifications')    
  },
  computed: {
    notifications(){
      return this.$store.getters.allNotifications;
    }
  },
};
</script>

<style>
</style>