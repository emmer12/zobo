<template>
  <v-container grid-list-md v-if="userPostById">
    <v-alert
      type="info"
      outlined
      color="orange"
      :value="!userPostById.length && !loading"
    >No Other challenge posted by @{{username}} </v-alert>
    <v-flex>
      <div v-for="(post) in userPostById" :key="post._id">
        <v-card v-if="userPostById.length" class="ma-2 pa-2" v-show="post.slug!= $route.params.slug">
          <router-link :to="{name:'details',params:{slug:post.slug}}">
            <img :src="'http://localhost:8000/uploads/'+post.display" width="100%" alt />
            <div class="details pa-2">
              <span v-if="post.title.length < 60" class="medieum black--text pa-2">{{post.title}}</span>
              <span v-else class="medieum black--text pa-2">{{post.title.substr(0,60) + '...'}}</span>

            </div>
          </router-link>
        </v-card>
      </div>
    </v-flex>
  </v-container>
</template>

<script>
export default {
  props: ["id", "username"],
  created() {
    this.$store.dispatch("getUserPostById", this.id);
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    userPostById() {
      return this.loading || this.$store.getters.userPostById;
    }
    //  userPostById() {
    //   return this.loading || this.$store.getters.userPostById.filter(post=>{
    //         if (post._id!==this.post._id) {
    //          return post
    //         }
    //     })
    // }
  }
};
</script>

<style>
</style>