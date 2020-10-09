<template>
  <v-container grid-list-xs>
    <v-layout column v-if="user">
         <div class="edit-list">
          <v-card class="pa-4">
            <h4 class="text-block">Profile Image</h4>
            <div class="d-flex align-center justify-ceneter">
              <v-avatar
                  size="100"
                  color="white"
              >
              <!-- <img v-if="user" :src="'http://localhost:8000/uploads/'+user.profile_image" alt="alt" /> -->
              </v-avatar>
              <v-spacer></v-spacer>
              <v-btn fab rounde color="white" small   @click="openEdit('profile_image',user.profile_image)">
                <v-icon color="grey">edit</v-icon>
              </v-btn>
            </div>
          </v-card>
      </div>
    </v-layout>

    <div v-else>
       
         <v-skeleton-loader table class="mx-auto md3" min-width max-width="*80%" type="list-item-three-line"></v-skeleton-loader>
    </div>
  </v-container>
</template>

<script>
export default {
  inject: ['theme'],
  components: {
  },
  data() {
    return {
        user:{name:'emmer'}
    }
  },
  methods: {
    
  },
    computed: {
        // user(){
        //     return this.$store.getters.user
        // }
    },
};
</script>

<style lang="scss">
.edit-list {
  width: 70%;
  margin:10px
}

@media screen and (max-width: 640px) {
  .edit-list {
    width: 100%;
  }
}
</style>