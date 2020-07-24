<template>
  <div>
    <v-layout row wrap>
      <v-flex v-show="loading" md3 xs6 v-for="(item, index) in 4" :key="index">
        <v-skeleton-loader table class="mx-auto md3" width="100%" type="card"></v-skeleton-loader>
      </v-flex>
    </v-layout>

    <transition-group class="v-layout row wrap" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <v-flex xs12 sm6 md4 v-for="(post) in posts" :key="post._id">
        <v-card class="ma-4">
          <router-link :to="{name:'details',params:{slug:post.slug}}">
            <div>
              <video :src="'http://localhost:8000/uploads/'+post.videoUrl" width="100%" controls></video>
            </div>
          </router-link>
          <div class="px-2 py-1">
              <router-link :to="{name:'details',params:{slug:post.slug}}" v-if="post.title.length < 60" class="body-1 blue-grey--text " style="font-weight:700">{{post.title}}</router-link>
              <router-link :to="{name:'details',params:{slug:post.slug}}" v-else class="body-1  blue-grey--text " style="font-weight:700">{{post.title.substr(0,60) + '...'}}</router-link>
          </div>

          <v-card-title primary-title>
            <v-layout row>
              <v-flex lg5>
                <v-avatar size="30">
                  <img src="./../../assets/images/avatar/avatar.png" alt="alt" />
                </v-avatar>
                <span class="ml-2 caption">{{post.user_id[0].username}}</span>
              </v-flex>
              <v-flex lg7>
                <v-layout row justify-space-around>
                  <!--  -->
                  <v-flex text-center>
                    <div class="liked" @click="handleLike(post._id)">
                      <v-icon v-if="user" :class="{'red--text':post.like_id.includes(user._id)}">mdi-heart</v-icon>
                      <v-icon v-else>mdi-heart</v-icon>
                      <v-badge class="caption" color="lighten grey--text" inline>
                        <span slot="badge">{{post.like_id.length}}</span>
                        <!--slot can be any component-->
                      </v-badge>
                    </div>
                  </v-flex>
                  <v-flex text-center>
                    <v-icon>mdi-eye</v-icon>
                    <v-badge class="caption" color="lighten grey--text" inline>
                      <span v-if="post.views.length > 3" slot="badge">{{999}}+</span>
                      <span v-else slot="badge">{{post.views}}</span>
                      <!--slot can be any component-->
                    </v-badge>
                  </v-flex>
                  <v-flex text-center>
                    <v-icon>mdi-share</v-icon>
                    <v-badge class="caption" color="lighten grey--text" inline>
                      <span slot="badge">{{post.challenge_response_id.length}}</span>
                      <!--slot can be any component-->
                    </v-badge>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card-title>
        </v-card>
      </v-flex>
    </transition-group>

    <login-dialog :dialog="dialog" @closeDialog="dialog=!dialog"></login-dialog>
  </div>
</template>


<script>

import LoginDialog from './../Dialogs/LoginDialog'
export default {
  components:{
    LoginDialog
  },
  props: ["posts"],
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    handleLike(id) {
      if (!this.loggedIn) {
        this.dialog = true;
      } else {
        let userId = this.user._id;
        let postId = id;

        let post = this.posts.find(i => i._id === postId);

        let likes = post.like_id;
        console.log(likes);

        if (likes.includes(userId)) {
          let index = likes.findIndex(i => i === userId);
          likes.splice(index, 1);
          this.$store.dispatch("unlikePost", {
            user_id: userId,
            post_id: postId
          });
        } else {
          this.$store.dispatch("likePost", {
            user_id: userId,
            post_id: postId
          });
          likes.push(userId);
        }
      }
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },

    loggedIn() {
      return this.$store.getters.loggedIn;
    },
    loading(){
     return this.$store.getters.loading;
    },
    // refineFeeds(){
    //   return this.loading || this.followerPosts.map((feed)=>{
    //         return this.posts.push(feed)
    //   })
    // }
  }
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none !important;
}
.tabs-con {
  background: red !important;
}
.v-tab {
  text-transform: none !important;
}
.v-flex {
  cursor: pointer;
}
.liked {
  cursor: pointer;
}
</style>
