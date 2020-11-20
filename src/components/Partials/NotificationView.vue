<template>
  <div class="notify">
      
      <div class="close pa-2" @click="closeNoti">
          <v-icon size="30">mdi-close</v-icon>
      </div>
       <div v-if="notifications.length<=0" class="mt-10">
        <v-alert type="info" :value="true" outlined>
          No new Notification
        </v-alert>
      </div>
      <v-container v-else grid-list-md class="mt-8">
           <!-- <v-card class="elevation-1" v-for="(item, index) in notifications" :key="index">
              <v-icon v-if="item.type==='payment'" color="primary">mdi-contactless-payment </v-icon>
              <v-icon v-if="item.type==='withdrawer'" color="primary">mdi-minus-box </v-icon>
              <v-icon v-if="item.type==='newpost'" color="primary">mdi-post-outline </v-icon>
              <v-icon v-if="item.type==='message'" color="primary">mdi-email-plus-outline </v-icon>
              <v-icon v-if="item.cerimony==='message'" color="primary">mdi-email-plus-outline </v-icon>
              <v-icon v-if="item.type==='follow'" color="primary">mdi-account-multiple-check-outline</v-icon> 
          </v-card> -->
        <div class="elevation-1" v-for="(item, index) in notifications" :key="index">
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
                <span class="pl-3">Someone just cellepayed you</span>
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
        <v-btn rounded small outlined tag="div" :to="{name:'all.notification'}" color="primary" class="elevation-0 float-right view-all-b mt-3"> View All <v-icon right>mdi-arrow-right</v-icon> </v-btn>
        </v-container>
  </div>
</template>

<script>
export default {
    props: ['notifications','count'],
    methods: {
        closeNoti(){
            this.$emit('close')
        }
    },
    watch: {
      $route(){
        this.$emit('close')
      }
    }
}
</script>

<style lang="scss" scoped>
   .notify{
       position:fixed;
       max-width:400px;
       width: 100%;
       top:60px;
       background:rgba($color: #fff, $alpha: 0.8);
       z-index: 9999;
       max-height:80vh;
       overflow-y: scroll;
       right:0px;
       & .close{
           position: absolute;
           right:10px;
           cursor: pointer;
           
       }

     
   }
</style>