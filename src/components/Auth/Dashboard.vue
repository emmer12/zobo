<template>
  <div style="z-index:1;position:relative" v-if="user">
    <!-- <pin-view></pin-view> -->
    <div class="dashboard" v-if="user.confirmed">
      <section class="side-bar d-none d-sm-flex">
        <section v-if="user" style="background:#333;height:150px;">
          <v-icon v-if="user.profile_image=='profile.png'">mdi-account-circle</v-icon>
             <v-avatar
                v-else
                size="40"
                color="white"
            >
            <img ref="img" :src="user.profile_image || 'http://localhost:3000/images/'+user.profile_image" alt="alt" />
            </v-avatar>
            
           <span class="ml-2"> {{user && user.username}}</span>
          <div class="d-flex flex-direction-row mt-3">
            <div style="text-align:center;">
              Follower
              <span>{{ follower.length }}</span>
            </div>
            <div style="text-align:center">
              Followeing
              <span>{{ following.length}}</span>
            </div>
          </div>
        </section>
        <router-link  tag="div" :to="{name:'zobo.list'}" :class="{'active':$route.name=='zobo.list'}">
          <v-icon left>mdi-home-lightbulb-outline</v-icon>Home
        </router-link>

        <router-link  tag="div" :to="{name:'balance'}" :class="{'active':$route.name=='balance'}">
          <v-icon left>mdi-cash-100</v-icon>Balance
        </router-link>

        <router-link  tag="div" :class="{'active':$route.name=='all.notification'}" :to="{name:'all.notification'}"  >
        <v-icon>mdi-bell-outline</v-icon>Alert
        </router-link>

        <v-spacer></v-spacer>

        <router-link tag="div" :to="{name:'logout'}" class="bottom">
          <v-icon left>mdi-logout</v-icon>Logout
        </router-link>
      </section>

      <section class="body">
        <v-toolbar dense pa-2>
          <v-btn v-show="$route.name!=='zobo.list' " color="primary" :to="{name:'zobo.list'}" icon>
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" :to="{name:'zobo.create'}" icon>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-toolbar>
        <transition
          mode="out-in"
          enter-active-class="animated slideInLeft"
          :duration="1000"
          leave-active-class="animated slideOutLeft"
        >
          <router-view></router-view>
        </transition>
      </section>
    </div>
    <div v-else class="d-flex justify-center align-content-center">
    <div class="email-confirm" v-if="user">
      <svg id="b76bd6b3-ad77-41ff-b778-1d1d054fe577" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="100" height="111" viewBox="0 0 570 511.67482"><path d="M879.99927,389.83741a.99678.99678,0,0,1-.5708-.1792L602.86963,197.05469a5.01548,5.01548,0,0,0-5.72852.00977L322.57434,389.65626a1.00019,1.00019,0,0,1-1.14868-1.6377l274.567-192.5918a7.02216,7.02216,0,0,1,8.02-.01318l276.55883,192.603a1.00019,1.00019,0,0,1-.57226,1.8208Z" transform="translate(-315 -194.16259)" fill="#3f3d56"/><polygon points="23.264 202.502 285.276 8.319 549.276 216.319 298.776 364.819 162.776 333.819 23.264 202.502" fill="#e6e6e6"/><path d="M489.25553,650.70367H359.81522a6.04737,6.04737,0,1,1,0-12.09473H489.25553a6.04737,6.04737,0,1,1,0,12.09473Z" transform="translate(-315 -194.16259)" fill="#e50913"/><path d="M406.25553,624.70367H359.81522a6.04737,6.04737,0,1,1,0-12.09473h46.44031a6.04737,6.04737,0,1,1,0,12.09473Z" transform="translate(-315 -194.16259)" fill="#e50913"/><path d="M603.96016,504.82207a7.56366,7.56366,0,0,1-2.86914-.562L439.5002,437.21123v-209.874a7.00817,7.00817,0,0,1,7-7h310a7.00818,7.00818,0,0,1,7,7v210.0205l-.30371.12989L606.91622,504.22734A7.61624,7.61624,0,0,1,603.96016,504.82207Z" transform="translate(-315 -194.16259)" fill="#fff"/><path d="M603.96016,505.32158a8.07177,8.07177,0,0,1-3.05957-.59863L439.0002,437.54521v-210.208a7.50851,7.50851,0,0,1,7.5-7.5h310a7.50851,7.50851,0,0,1,7.5,7.5V437.68779l-156.8877,66.999A8.10957,8.10957,0,0,1,603.96016,505.32158Zm-162.96-69.1123,160.66309,66.66455a6.1182,6.1182,0,0,0,4.668-.02784l155.669-66.47851V227.33721a5.50653,5.50653,0,0,0-5.5-5.5h-310a5.50653,5.50653,0,0,0-5.5,5.5Z" transform="translate(-315 -194.16259)" fill="#3f3d56"/><path d="M878,387.83741h-.2002L763,436.85743l-157.06982,67.07a5.06614,5.06614,0,0,1-3.88038.02L440,436.71741l-117.62012-48.8-.17968-.08H322a7.00778,7.00778,0,0,0-7,7v304a7.00779,7.00779,0,0,0,7,7H878a7.00779,7.00779,0,0,0,7-7v-304A7.00778,7.00778,0,0,0,878,387.83741Zm5,311a5.002,5.002,0,0,1-5,5H322a5.002,5.002,0,0,1-5-5v-304a5.01106,5.01106,0,0,1,4.81006-5L440,438.87739l161.28027,66.92a7.12081,7.12081,0,0,0,5.43994-.03L763,439.02741l115.2002-49.19a5.01621,5.01621,0,0,1,4.7998,5Z" transform="translate(-315 -194.16259)" fill="#3f3d56"/><path d="M602.345,445.30958a27.49862,27.49862,0,0,1-16.5459-5.4961l-.2959-.22217-62.311-47.70752a27.68337,27.68337,0,1,1,33.67407-43.94921l40.36035,30.94775,95.37793-124.38672a27.68235,27.68235,0,0,1,38.81323-5.12353l-.593.80517.6084-.79346a27.71447,27.71447,0,0,1,5.12353,38.81348L624.36938,434.50586A27.69447,27.69447,0,0,1,602.345,445.30958Z" transform="translate(-315 -194.16259)" fill="#e50913"/></svg>
      <h1>You've got mail</h1>
      <p>We have sent an email to <span class="black--text font-weight-bold ">{{user.email}}</span> wih the link for acivaing your account and proving you are human</p>
      <small>Didn't get anything? <span class="primary--text font-weight-bold " style="cursor:pointer" >Resend email</span> of check your spam folder thanks.</small>
    </div>
    </div>
    <v-spacer style="height:100px"></v-spacer>
  </div>
</template>

<script>
// import PinView from "./PinView";

export default {
  components: {
    // PinView
  },
  data() {
    return {
      rules: {
        length: v => (v && v.length == 4) || "pin must be least 4 digit",
        required: v => !!v || "This field is required"
      },
      follower:[],
      following:[],
    };
  },
  methods: {
    select: function() {
      this.selected = [];
      if (!this.selectAll) {
        for (let i in this.posts) {
          this.selected.push(this.posts[i]._id);
        }
      }
    },
    deletePost: function() {
      let confirmed = confirm(
        "Are you sure?\nYou won't be able to revert this!"
      );
      if (this.selected.length < 1) {
        alert("non items selected");
        return;
      }
      if (confirmed) {
        this.$store.dispatch("deletePost", this.selected).then(() => {
          alert("deleted");
          this.selected = [];
        });
      }
    }
  },

  watch: {
    $route() {
      if (this.$router.name === "dashboard") {
        this.$router.push({ name: "zobo.list" });
      }
    }
  },
  created () {
    if (this.$route.name==='dashboard') {
      this.$router.push({ name: "zobo.list" });
    }

    window.eventBus.$emit('checkCheers')
  },

  mounted() {
     this.$store.dispatch("getFollow").then(res=> {
         this.follower=res.data.follower
         this.following=res.data.following
       })
  },

computed: {
  user() {
      return this.$store.getters.user
  }
}
};
</script>

<style lang="scss">
.dashboard {
   .side-bar {
    background: #333;
    display: flex;
    position: fixed;
    min-height:90vh ;
    width: 230px;
    z-index: 810;
    flex-direction: column;
    padding: 10px;
    color: white;

    & .v-icon {
      color: white;
    }

    & div {
      // display: inline-block;
      padding: 10px 10px;
      background: rgba(246, 249, 246, 0.048);
      margin-top: 3px;
      cursor: pointer;
    }

    & div.bottom {
      position: relative;
      bottom: 0px;
    }
    & .active {
      background: white;
      color: #e50913;

      & .v-icon {
        color: #e50913;
      }
    }
  }

  & .body {
    position: relative;
    margin-left: 230px;
    z-index: 820;
    padding: 10px;
    overflow: hidden;
  }
}
.email-confirm{
  padding:10px;
  margin:10px;
  margin-top:150px;
}
@media (max-width: 767px) {
  .dashboard .body {
    margin-left: 0;
  }
}
</style>