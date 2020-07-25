<template>
  <div style="z-index:1;position:relative">
    <pin-view></pin-view>

    <section class="bottom-nav d-flex d-sm-none">
      <router-link  tag="div" :to="{name:'zobo.list'}" :class="{'active':$route.name=='zobo.list'}">
        <v-icon>mdi-home-lightbulb-outline</v-icon>
        <div>Home</div>
      </router-link>

      <router-link tag="div" :class="{'active':$route.name=='balance'}" :to="{name:'balance'}">
        <v-icon>mdi-cash-100</v-icon>
        <div>Balance</div>
      </router-link>

      <router-link tag="div" :class="{'active':$route.name=='settings'}" :to="{name:'settings'}">
        <v-icon>mdi-cog-outline</v-icon>
        <div>Settings</div>
      </router-link>
    </section>

    <div class="dashboard">
      <section class="side-bar d-none d-sm-flex">
        <div style="background:#333;height:150px;">
          <v-icon>mdi-account-circle</v-icon>
          {{user && user.username}}
          <div class="d-flex flex-direction-row ">
            <div style="text-align:center">
              Follower
              <span>{{ follower.length }}</span>
            </div>
            <div style="text-align:center">
              Followeing
              <span>{{ following.length}}</span>
            </div>
          </div>
        </div>
        <router-link  tag="div" :to="{name:'zobo.list'}" :class="{'active':$route.name=='zobo.list'}">
          <v-icon left>mdi-home-lightbulb-outline</v-icon>Home
        </router-link>

        <router-link  tag="div" :to="{name:'balance'}" :class="{'active':$route.name=='balance'}">
          <v-icon left>mdi-cash-100</v-icon>Balance
        </router-link>

        <router-link  tag="div" :to="{name:'profile'}" :class="{'active':$route.name=='profile'}">
          <v-icon left>mdi-cog</v-icon>Settings
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

<style lang="scss">
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
      display: inline-block;
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
      color: #d34a1a;

      & .v-icon {
        color: #d34a1a;
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
  background: rgba(211, 75, 26, 1);
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
    background: #d34a1a;
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