<template>
  <div class="">
     <v-container grid-list-xs>
        <div class="d-flex justify-center align-center empty" style="flex-direction:column" v-if="!zobos.length && !loading">
        <div class="text-center">
           <div> 
             <v-icon class="block" size="80" color="#cccccc" >mdi-flask-empty </v-icon>
           </div>
          <h3 style="color:rgba(0,0,0,0.2)" class="mb-4">No posts yet</h3>
           <v-btn color="primary" :to="{name:'zobo.create'}" outlined>Create<v-icon  right>mdi-plus</v-icon></v-btn>
        </div>
      </div>
      <div v-else>
        <zobo-list :zobos="zobos" :page="'dashboard'"></zobo-list>
      </div>
      <div class="d-flex justify-center align-center empty" style="flex-direction:column" v-show="loading">
       <v-progress-circular v-show="loading" :value="20" indeterminate color="primary"></v-progress-circular>
      </div>
     </v-container>

  </div>
</template>

<script>
import ZoboList from "./ZoboList"

export default {
  components: {
    ZoboList
  },
  data() {
    return {
      loading:false
      
    };
  },
  methods: {
    getMyZobo(){
      this.loading=true
      this.$store.dispatch('getMyZobo').then(()=>{
        this.loading=false
      })
    }
  },

  mounted() {
    this.getMyZobo()
  },

  computed: {
    zobos(){
      return this.$store.getters.myZobo
    }
  }
};
</script>

<style lang="scss">
.empty{
   margin-top:200px;
}
@media (max-width: 767px) {
  .empty{
    margin-top:100px;

    & .v-icon{
      font-size: 20px;
    }
  }
}
</style>