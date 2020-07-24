<template>
  <div>



    <nav-other v-show="$route.name!=='access.signup' && $route.name!=='access.signin'" v-if="$route.name!=='home'"></nav-other>
    <nav-home  v-else></nav-home>

  </div>
</template>




<script>
import NavOther from './../Partials/NavOther'
import NavHome from './../Partials/NavHome'

export default {
  components:{
    NavOther,
    NavHome
  },
  data: () => ({
    drawer: false,
    searchAdded: false,
    dropdownPro:false,
    search:"",
    items: [
      {
        key: 1,
        icon: "mdi-heart",
        title: "Home"
      },
      {
        key: 2,
        icon: "mdi-account-plus",
        title: "About"
      }
    ]
  }),
  methods: {
    toggleDrawer: function() {
      this.drawer = !this.drawer;
      console.log(this.open);
    }
  },
  mounted() {
    console.log(this.$route.name)
  },
  watch: {
    $route() {
      this.dropdownPro=false
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.loggedIn;
    },
    user() {
      return this.$store.getters.user;
    }
  }
};
</script>




<style lang="scss" >
.search-in {
  border: 1px solid green;
  border-radius: 5px;
  width: 0px;
  padding: 5px 10px;
  opacity: 0;
  transition: 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  margin-right: 5px;
  &.added {
    opacity: 1;
    width: 200px;
  }
}

.dropdown-user {
  position: absolute;
  top: 70px;
  padding: 10px 10px;
  right: 10px;
  max-width: 250px;
  min-width: 250px;
  & a {
    color: gray;
    font-size: 14px;
    display:block;
    padding:5px 20px;
    transition: 0.3s ease;
    position: relative;
    &:hover{
      background: #f6f7f7;
      color: #999;
    }
  }
}

  b{
    color:rgba(245,245,245,0.7);
    cursor: pointer;
    display: block;
  }

  .bar {
    width: 70%;
    & span{
    height:5px;
    width:100%;
    margin-top:4px;
    background: #ed6b35;
    display: block;
    border-radius:10px;

    animation: animateBar 1s ease-in-out;



    &:nth-child(2){
     width: 10px;
     height:10px;
     border-radius:5px;
     text-align:center;
     margin-left: 12px;

    }

    }

  }

  @keyframes animateBar {
    0%{
      width: 0px;
    }
    100%{
      width: 100%;
    }
  }
</style>