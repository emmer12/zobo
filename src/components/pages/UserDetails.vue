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
    <v-card v-if="!loading && user">
      <div class="user-details">
        <v-container grid-list-md>
          <v-layout row wrap>
            <v-flex md4 sm6 xs12>
              <img
                width="100%"
                v-if="user"
                :src="'http://localhost:8000/uploads/'+user.profile_image"
                alt="alt"
              />
              <v-divider></v-divider>
              <div class="pa-4">
                <div class="heading mb-2">
                  <h4>Bio</h4>
                </div>
                <p>{{user.bio || "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur porro illum rerum. Consequatur, maiores! Ut labore totam nostrum voluptatum qui!"}}</p>
              </div>
            </v-flex>
            <v-flex md8 sm6 xs12>
              <div class="details pl-4">
                <h1 class="headline">
                  {{user.fullname}}
                  <span>(@{{user.username}})</span>
                </h1>
                <span class="subtitle">Instrument played</span>
                <strong class="primary--text">{{user.specilized_in}}</strong>
                <v-spacer class="pb-4"></v-spacer>

                <div class="d-flex">
                 <v-btn color="" class="elevation-1 primary--text" fab  small>{{rating }}.0</v-btn>
                  <span>
                    <v-rating v-model="rating" @input="rate" :value="rating"></v-rating>
                  </span>
                </div>
                <br />
                <v-btn color="primary mr-5 text-lower" rounded small>Follower {{follower.length}}</v-btn>
                <!-- <span class="mx-4"></span> -->
                <v-btn color="primary" rounded small>Following {{following.length}}</v-btn>
                <v-spacer class="mb-3"></v-spacer>
                <span class="caption text-block">Member since</span>
                <span class>
                  <v-icon color="grey">mdi-calendar</v-icon>
                  {{user.createdAt | formatDate }}
                </span>
                <br />
                <br />

                <v-divider></v-divider>
                <user-contacts :user="user" :dialog="dialog" @closeDialog="dialog=!dialog"></user-contacts>
                <v-btn color="success" @click="dialog=!dialog" outlined>
                  <v-icon left>info</v-icon>Contacts
                </v-btn>
                <v-btn
                  class="mx-4"
                  v-if="loggedInUser && follower.includes(loggedInUser._id)"
                  small
                  color="primary"
                  dark
                  @click="follow(user._id)"
                >Unfollow</v-btn>
                <v-btn
                  class="mx-4"
                  v-else
                  small
                  color="primary"
                  dark
                  @click="follow(user._id)"
                >Follow</v-btn>
              </div>
              <br />
              <div class="heading mb-2">
                <h4>Posts</h4>
                <v-layout row wrap>
                  <v-flex md6>
                    <other-post :id="user._id" :username="user.username"></other-post>
                  </v-flex>
                </v-layout>
                <!-- <post-feeds :posts="posts"></post-feeds> -->
              </div>
            </v-flex>
          </v-layout>
          <login-dialog :dialog="dialogLog" @closeDialog=" dialogLog=!dialogLog"></login-dialog>
        </v-container>
      </div>
    </v-card>
  </div>
</template>

<script>
import OtherPost from "./../Partials/OtherPost";
import UserContacts from "./../Dialogs/UserContacts";
import LoginDialog from "./../Dialogs/LoginDialog";

export default {
  components: {
    OtherPost,
    UserContacts,
    LoginDialog
  },
  data() {
    return {
      user: null,
      loading: false,
      dialog: false,
      dialogLog: false,
      pageNotFound: false,
      following: [],
      follower: [],
      
      
    };
  },
  methods: {
    follow(fuid) {
      if (this.loggedInUser) {
        if (this.follower.includes(this.loggedInUser._id)) {
          this.$store.dispatch("unfollow", { fuid }).then(() => {
            let index = this.follower.findIndex(i => i === this.loggedInUser);
            this.follower.splice(index, 1);
          });
        } else {
          this.$store.dispatch("follow", { fuid });
          this.follower.push(this.loggedInUser._id);
          console.log(this.follower);
        }
      } else {
        this.dialogLog = true;
      }
    },
    getUser() {
      this.loading = true;
      this.$store
        .dispatch("getUserByName", this.$route.params.username)
        .then(user => {
          this.user = user;
          this.loading = false;
          this.getRating(user._id)
          this.$store.dispatch("getFollow", { uid: user._id }).then(follow => {
            // console.log(follow.data.following);
            console.log(follow);

            this.following = follow.following[0]
              ? follow.following[0].following_id
              : [];
            this.follower = follow.followby[0]
              ? follow.followby[0].followed_id
              : [];
          });
        })
        .catch(() => {
          this.pageNotFound = true;
        });
    },
    rate(rate){
      console.log(rate);
      
      if(localStorage.getItem('rating'+this.user._id)){
        return
      }else{
        localStorage.setItem('rating'+this.user._id,rate)
        this.$store.dispatch('setRating',{
          rate,
          user_id:this.user._id
        })  
      }
    },
    getRating(id){
      this.$store.dispatch('getRating',id)
    }
  },
  watch: {
    $route() {
      this.getUser();
    }
  },
  created() {
    this.getUser();
   
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.user;
    },
     rating() {
      return Math.round(this.$store.getters.getRating);
    }
  }
};
</script>

<style lang="scss" scoped>
.heading {
  & h4 {
    font-weight: 700;
    color: #444;
    padding: 8px;
    border-left: 3px solid #333;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    background-color: #f6f7f7;
  }
}
</style>