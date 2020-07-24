<template>
  <div class="search-drop" v-show="toggle">
    <span class="font-weight-bold pa-2">Instumentalist</span>
    <v-spacer class="mb-2"></v-spacer>

    <v-skeleton-loader
      v-if="loading"
      table
      class="mx-auto md3"
      min-width
      max-width="100%"
      type="list-item-avatar-two-line"
    ></v-skeleton-loader>

    <div v-show="!loading" class="ml-2 py-2" v-for="(user) in users" :key="user.id">
      <router-link :to="{name:'user-details',params:{username:user.username}}">
        <v-avatar size="25" color="blue">
          <img :src="'http://localhost:8000/uploads/'+user.profile_image" alt="alt" />
        </v-avatar>
        <span class="body-2 font-weight-bold text--darken-2 grey--text pl-4">{{user.username}}</span>
      </router-link>
    </div>

    <router-link class="pl-2 body-2 primary--text" :to="{name:'users'}">See All</router-link>

    <v-spacer class="mb-2"></v-spacer>
    <span class="font-weight-bold pa-2">Challenges</span>
    <v-spacer class="mb-2"></v-spacer>

    <v-skeleton-loader
      v-if="loading"
      table
      class="mx-auto md3"
      min-width
      max-width="100%"
      type="list-item-avatar-two-line"
    ></v-skeleton-loader>

    <div v-show="!loading" v-for="(challenge) in challenges" :key="challenge">
      <router-link
        class="d-flex justify-start ma-2"
        :to="{name:'details',params:{slug:challenge.slug}}"
      >
        <img
          :src="'http://localhost:8000/uploads/'+challenge.display"
          style="height:70px;width:100px;border-radius:5px"
          alt
        />
        <span class="body-2 pl-2 font-weight-bold text--darken-2 grey--text">{{challenge.title}}</span>
      </router-link>
    </div>

    <router-link class="pl-2 body-2 primary--text" :to="{name:'users'}">See All</router-link>
  </div>
</template>

<script>
export default {
  props: ["search"],
  data() {
    return {
      toggle: false,
      time: null,
      users: [],
      challenges: [],
      loading: false
    };
  },
  watch: {
    search(val) {
      // var self=this;
      val.length >= 1 ? (this.toggle = true) : (this.toggle = false);
      this.waitForIt(val);
    },
    $route() {
      this.toggle = false;
      this.$emit("emptyInput");
    }
  },

  methods: {
    waitForIt(val) {
      if (this.time) {
        clearTimeout(this.time);
      }
      this.loading = true;
      this.time = setTimeout(() => this.searchTerm(val), 1000);
    },
    searchTerm(val) {
      if (!val.length) return;
      this.$store.dispatch("searchTerm", val).then(data => {
        this.users = data.users;
        this.challenges = data.challenges;
        this.loading = false;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.search-drop {
  position: absolute;
  top: 70px;
  padding: 10px 10px;
  right: 300px;
  max-width: 250px;
  min-width: 250px;
  border-radius: 5px;
  border: 1px solid #ccc;
  z-index: 999;
  background: white;
}

@media screen and (max-width:550px) {
  
.search-drop{
  right:70px;
}

}

@media screen and (min-width:550px) and (max-width:750px) {
.search-drop{
  right:40%;
}

}

</style>