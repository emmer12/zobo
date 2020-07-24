<template>
  <div>
    <v-container v-if="pageNotFound" grid-list-md>
      <div class="d">
        <v-card>
          <v-alert type="error" :value="true">page not found</v-alert>
        </v-card>
       <div class="d-flex justify-center">
          <v-btn color="success" to="/">
          <v-icon left>mdi-arrow-left</v-icon>Back to home
        </v-btn>
       </div>
      </div>
    </v-container>
    <div v-if="!pageNotFound || loading" class="banner"></div>
    <v-container grid-list-lg>
      <v-layout row v-if="post" v-show="!loading">
        <v-flex md8 class="offset-md-2">
          <div class="content">
            <v-layout row justify-space-around>
              <v-flex md1>
                <v-avatar size="70" color="white">
                  <img
                    :src="'http://localhost:8000/uploads/'+post.user_id[0].profile_image"
                    alt="alt"
                  />
                </v-avatar>
              </v-flex>
              <v-flex md10 class="ml-4">
                <h4>
                  <span class="font-weight-bold headline">{{post.title}}</span>
                </h4>
                <span class="ml-1 mr-3">by</span>
                <b class="primary--text">
                  <router-link :to="{name:'user-details',params:{username:post.user_id[0].username}}">
                  @ {{post.user_id[0].username}}
                 </router-link> 
                  </b>
                  |
                <span v-if="user && following.includes(post.user_id[0]._id)" @click=follow(post.user_id[0]._id) class="primary--text">Unfollow</span>
                <span v-else class="primary--text" @click=follow(post.user_id[0]._id)>Follow</span>
              </v-flex>
            </v-layout>

            <v-layout row wrap>
              <v-flex xl12 md12>
                <video :src="'http://localhost:8000/uploads/'+post.videoUrl" controls width="100%"></video>
              </v-flex>
            </v-layout>

            <v-layout row wrap>
              <v-flex md7>
                <p>{{post.description}}</p>
                <v-divider></v-divider>
                <span class="title">Callenges Response</span>

                <response :post_id="post._id"></response>

                <v-spacer class="ma-5"></v-spacer>

              </v-flex>
              <v-flex md5>
                <ShareNetwork
                    v-for="network in networks" :key="network.name"
                    :network="network.name"
                    :url="'https://news.vuejs.org/issues/180'"
                    :title="post.title"
                    hashtags="vuejs,vite"
                  >
                  <v-btn class="mx-2" x-small :color="network.color" dark>
                    <v-icon left small>{{network.icon}}</v-icon> {{network.name}}
                  </v-btn>          
                </ShareNetwork>
        
                <br />
                <br />
                <div class="list-c" v-show="post.tags.length">
                  <div class="left">
                    <v-icon color="grey">mdi-tag</v-icon>
                  </div>
                  <div class="right">
                    <v-chip  v-for="(tag, index) in post.tags" :key="index" small>{{tag}}</v-chip>
                  </div>
                </div>
                <div class="list-c">
                  <div class="left">
                    <v-icon
                      v-if="user"
                      :class="{'red--text':post.like_id.includes(user._id)}"
                      @click="handleLike(post._id)"
                    >mdi-heart</v-icon>
                    <v-icon v-else @click="handleLike(post._id)">mdi-heart</v-icon>
                  </div>
                  <div class="right">
                    <button class="px-1 btn text caption grey--text">{{ post.like_id.length}}</button>
                    <span class="caption grey--text">Likes</span>
                  </div>
                </div>
                 <div class="list-c">
                  <div class="left">
                    <v-icon color="grey">mdi-eye</v-icon>
                   
                  </div>
                  <div class="right">
                    <button
                      class="px-1 btn text caption grey--text"
                    >{{post.views }}</button>
                     <span v-if="post.views > 1" class="caption grey--text">Views</span>
                     <span v-else class="caption grey--text">View</span>
                  </div>
                </div>
                <div class="list-c">
                  <div class="left">
                    <v-icon color="grey">mdi-share</v-icon>
                  </div>
                  <div class="right">
                    <button class="px-1 btn text caption grey--text">{{post.challenge_response_id.length}}</button>
                    <span v-if="post.challenge_response_id.length>1" class="caption grey--text">Challenges</span>
                    <span v-else class="caption grey--text">Challenge</span>
                  </div>
                </div>
                <div class="list-c">
                  <div class="left">
                    <v-icon color="grey">mdi-calendar</v-icon>
                  </div>
                  <div class="right">
                    <button
                      class="px-1 btn text caption grey--text"
                    >{{post.createdAt | formatDate }}</button>
                  </div>
                </div>
                <v-divider></v-divider>

                <v-btn color="ma-10"  :to="{name:'explore',params:{key:post.title + ' ' + post.category}}"> <v-icon left color="green">explore</v-icon> Explore More</v-btn>
                <v-divider></v-divider>
                <h4 class="primary--text pa-5">Other post by {{post.user_id[0].username}}</h4>

                <other-post :id="post.user_id[0]._id" :username="post.user_id[0].username"></other-post>
              </v-flex>
            </v-layout>
          </div>
        </v-flex>
      </v-layout>
      <login-dialog :dialog="dialog" @closeDialog="dialog=!dialog"></login-dialog>
    </v-container>
  </div>
</template>

<script>
import Response from "./../Partials/Response";
import OtherPost from "./../Partials/OtherPost";
import LoginDialog from "./../Dialogs/LoginDialog";
export default {
  components: {
    Response,
    OtherPost,
    LoginDialog
  },
  data() {
    return {
      dialog: false,
      pageNotFound: false,
      following:[],
      currentUrl:"",
      networks:[
        {networks:'facebook',name:'Facebook',icon:'mdi-facebook',color:'#1877f2'},
        {networks:'twitter',name:'Twitter',icon:'mdi-twitter',color:'#1da1f2'},
        {networks:'whatsapp',name:'Whatsapp',icon:'mdi-whatsapp',color:'#25d366'}
      ]
    };
  },

  created() {
    this.currentUrl=new URL(location.href)
    // window.location.pathname;
    this.getData(this.$route.params.slug);
  },
  watch: {
    $route() {
      this.getData(this.$route.params.slug);
      this.updateViews(this.$route.params.slug)
    }
  },
  mounted () {
    this.updateViews(this.$route.params.slug)
  },
  methods: {
    updateViews(slug){
       this.$store.dispatch('updateViews',{slug})
    },
    getData(slug) {
      this.$store.dispatch("getPostBySlug", slug).then(()=>{
         if(this.user){
           this.$store.dispatch("getFollow",{uid:this.user._id}).then(follow=>{
             this.following=follow.following[0] ? follow.following[0].following_id : []
             this.follower=follow.followby[0] ? follow.followby[0].followed_id : []
             console.log(this.following,this.follower);
           });
         }
    })
      .catch((err) => {
        console.log(err);
        
        this.pageNotFound = true;
      });
    },

    follow(fuid){    
        if (this.user) {
          if (this.following.includes(fuid)) {
            this.$store.dispatch("unfollow", {fuid}).then(()=>{
              let index = this.following.findIndex(i => i === fuid);
              this.following.splice(index, 1);
            })
          }else{
          this.$store.dispatch("follow", {fuid})
            this.following.push(fuid)
              console.log(this.following);

          }
        }else{
        this.dialog=true
        }
    },

    handleLike(id) {
      if (!this.loggedIn) {
        this.dialog = true;
      } else {
        let userId = this.user._id;
        let postId = id;

        let post = this.post;

        let likes = post.like_id;

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
    post() {
      return this.$store.getters.feed;
    },
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
    user() {
      return this.$store.getters.user;
    },
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>

<style>
a {
  text-decoration: none;
}
</style>
<style lang="scss" scoped>
.banner {
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7));
  height: 200px;
}
.content {
  background: white;
  border-top-left-radius: 50px;
  position: relative;
  top: -50px;
  min-height: 200px;
  box-shadow: 2px 3px 3px #ccc;
  padding: 12px 20px;
}
.list-c {
  width: 100%;
  display: flex;
  margin: 10px;

  & .left {
    float: left;
    width: 10%;
    position: rela tive;
  }
  & .right {
    width: 90%;
    float: right;
  }
}
</style>