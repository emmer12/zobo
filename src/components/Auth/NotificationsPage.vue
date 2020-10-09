<template>
  <v-container>
    <!-- <p v-if="notifications">{{notifications}}</p> -->
    <div>
        <div class="elevation-1" v-for="(item, index) in notifications" :key="index">
          <v-list class="elevation-1 pa-2 mt-2" v-if="item.type==='payment'">
              <div class="d-flex">
                <v-icon  color="primary">mdi-emoticon </v-icon>
                <span class="pl-3">Someone but you a lunch </span>
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