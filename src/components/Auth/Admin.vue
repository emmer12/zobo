<template>
  <div style="z-index:1;position:relative">
    <pin-view></pin-view>

    <div class="dashboard">
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
            <router-link tag="div" :class="{'active':$route.name=='balance'}" :to="{name:'balance'}">
              <v-icon left>mdi-cash-100</v-icon>Events
            </router-link>


            <router-link tag="div" :class="{'active':$route.name=='balance'}" :to="{name:'balance'}">
              <v-icon left>mdi-cash-100</v-icon>Special Zobo
            </router-link>

            <router-link tag="div" :class="{'active':$route.name=='balance'}" :to="{name:'balance'}">
              <v-icon left>mdi-cash-100</v-icon>Sponsored Zobo
            </router-link>


            <router-link  tag="div" :to="{name:'zobo.list'}" :class="{'active':$route.name=='zobo.list'}">
              <v-icon left>mdi-home-lightbulb-outline</v-icon>All Zobo
            </router-link>
            

            <router-link tag="div" :class="{'active':$route.name=='balance'}" :to="{name:'balance'}">
              <v-icon left>mdi-cash-100</v-icon>All USer
            </router-link>

            <router-link tag="div" :class="{'active':$route.name=='balance'}" :to="{name:'balance'}">
              <v-icon left>mdi-cash-100</v-icon>Total Balance
            </router-link>

            <router-link tag="div" :class="{'active':$route.name=='balance'}" :to="{name:'balance'}">
              <v-icon left>mdi-cash-100</v-icon>Request
            </router-link>


            <router-link tag="div" :class="{'active':$route.name=='settings'}" :to="{name:'settings'}">
              <v-icon left>mdi-cog-outline</v-icon>Settings
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
          <!-- <router-view></router-view> -->
        </transition>
      </section>
    </div>

    <v-spacer style="height:100px"></v-spacer>
  </div>
</template>

<script>
import PinView from "./PinView";

export default {
  components: {
    PinView
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
      if (this.selected.length < 1) {
        alert("non items selected");
        return;
      }
      var confirmed = confirm(
        "Are you sure?\nYou won't be able to revert this!"
      );
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

<style lang="scss" scoped>
.dashboard {
  & .side-bar {
    background: #333;
    display: flex;
    position: absolute;
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
.bottom-nav {
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  background: #e50913;
  color: rgba(255, 255, 255, 0.7);
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 10px 20px;
  position: fixed;
  bottom: 0px;
  box-shadow: 0px -4px 5px #ddd;
  z-index: 999;

  & .v-icon {
    color: rgba(255, 255, 255, 0.7);
  }

  & .active {
    background: #e50913;
    border-radius: 50px;
    height: 90px;
    width: 60px;
    color: white;
    padding-top: 20px;
    z-index: 1;
    // border-top:1px solid grey;
    & .v-icon {
      color: rgba(255, 255, 255, 1);
    }
  }
}

@media (max-width: 767px) {
  .dashboard .body {
    margin-left: 0;
  }
}
</style>