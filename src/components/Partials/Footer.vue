<template>
  <div v-if="user.confirmed">
    <section class="bottom-nav d-flex d-sm-none" id="foot-nav">
      <router-link tag="div" :to="{name:'zobo.list'}" :class="{'active':$route.name=='zobo.list'}">
        <v-icon>mdi-home-lightbulb-outline</v-icon>
        <div>Home</div>
      </router-link>

      <router-link tag="div" :class="{'active':$route.name=='balance'}" :to="{name:'balance'}">
        <v-icon>mdi-cash-100</v-icon>
        <div>Balance</div>
      </router-link>

      <router-link tag="div" :class="{'active':$route.name=='all.notification'}" :to="{name:'all.notification'}" >
        <v-icon>mdi-bell-outline</v-icon>
        <div>Alert</div>
      </router-link>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
       direction: 0,
       prevDirection:0,
       prevScroll: window.scrollY || document.documentElement.scrollTop
    };
  },

  methods: {
    checkScroll: function() {
      /*
       ** Find the direction of scroll
       ** 0 - initial, 1 - up, 2 - down
       */

      let curScroll = window.scrollY || document.documentElement.scrollTop;

      if (curScroll > this.prevScroll) {
        //scrolled up
        this.direction = 2;
      } else if (curScroll < this.prevScroll) {
        //scrolled down

        this.direction = 1;
      }

      if (this.direction !== this.prevDirection) {
        this.toggleHeader(this.direction, curScroll);
      }

      this.prevScroll = curScroll;
    },


    toggleHeader: function(direction, curScroll) {
      var header = document.getElementById("foot-nav");
      if (direction === 2 && curScroll > 70) {
        //replace 52 with the height of your header in px

        header.classList.add("hide");
        this.prevDirection = direction;
      } else if (direction === 1) {
        header.classList.remove("hide");
        this.prevDirection = direction;
      }
    }
  },
  created() {
    window.addEventListener("scroll", this.checkScroll);
  },
  computed: {
    user(){
      return this.$store.getters.user
    }
  }
};
</script>

<style lang="scss" scoped>
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
  transition: all .3s ease;

  .v-icon {
    color: rgba(255, 255, 255, 0.7);
  }

  .active {
    background: #e50913;
    border-radius: 50px;
    height: 90px;
    width: 60px;
    color: white;
    padding-top: 20px;
    z-index: 1;
    .v-icon {
      color: rgba(255, 255, 255, 1);
    }
  }
  
  &.hide{
    bottom:-100px
  }
}
</style>