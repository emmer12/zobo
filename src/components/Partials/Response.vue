<template>
  <v-layout row wrap>
    <v-flex md12 v-for="(response, index) in feedResponse" :key="index">
       <v-skeleton-loader v-show="loading" table class="mx-auto" min-width="240px" max-width="300" type="card">

       </v-skeleton-loader>

      <v-card>
        <video :src="'http://localhost:8000/uploads/'+response.videoUrl" controls width="100%"></video>
        <v-chip dark class="ma-2 px-4" color="primary" text-color="white">
          <v-avatar>
            <img  :src="'http://localhost:8000/uploads/'+response.user_id[0].profile_image" alt="alt" />
          </v-avatar>
          <v-spacer class="mx-2"></v-spacer>@ {{response.user_id[0].username}}
        </v-chip>
        <div style="float:right" class="mt-2 mr-3">
          <span class="text-right">
            <v-icon color="red">mdi-heart</v-icon>
          </span>
          <v-badge class="caption" color="lighten grey--text" inline>
            <span slot="badge">5</span>
            <!--slot can be any component-->
          </v-badge>
        </div>
      </v-card>
    </v-flex>

    <response-modal :post_id="post_id" @responded="refreshResponse"></response-modal>
    
  </v-layout>
</template>

<script>
import ResponseModal from "./../Partials/ResponseModal";
import { mapGetters } from 'vuex'
export default {
    props: ["post_id"],
    components:{
      ResponseModal
    },
    data() {
        return {
            
        }
    },
    methods: {
      refreshResponse(){
          this.$store.dispatch('getPostResponse', this.post_id);
      }
    },
    watch: {
      post_id(){
          this.$store.dispatch('getPostResponse', this.post_id);
      }
    },
    created() {
          this.$store.dispatch('getPostResponse', this.post_id);
    },
    computed:mapGetters([
        'feedResponse',
        'loading'
    ])
};
</script>

<style>
</style>