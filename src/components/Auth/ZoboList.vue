<template>
  <div>
    <v-layout v-if="page==='dashboard'" row wrap  my-3 class="zobo-list-con">
      <transition-group
        class="v-layout row wrap"
        enter-active-class="animated zoomIn"
        leave-active-class="animated zoomOut"
      >
      
        <v-flex v-for="(zobo, index) in zobos" :key="index" md6 sm4 xs6>
            <v-btn @click="deleteZobo(zobo._id)" style="float:right;z-index:999" fab small color="error" class="elevation-1">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          <v-card class="ma-2 pa-2 zobo-cart" :to="{name:'list.details',params:{id:zobo._id}}">
            <span class="title" v-if="zobo.title.length < 5">{{zobo.title}}</span>
            <span v-else class="title">{{zobo.title.substr(0,5) + '...'}}</span>
            <img :src="zobo.cover" width="100%" />
            <!-- &#8358; -->
            <div class="title text-center" style="background:rgba(245,245,245,0.5)"><span style="color:#d34a1a">$ {{zobo.balance}}.00</span></div>
          </v-card>
        </v-flex>
      </transition-group>
    </v-layout>
  </div>
</template>

<script>
export default {
  props: ["zobos", "page"],
  data() {
    return {};
  },
  methods: {
    deleteZobo(id){
      let conf=confirm('You are about to delete this post')
      if (conf) {
         this.$store.dispatch('deleteZobo',id)
      }else{
        return
      }
    }
  },

  mounted() {
  }
};
</script>


<style lang="scss">
.zobo-list-con{
    width:80%;
}
.zobo-cart{
    background-image: linear-gradient(rgb(255, 255, 255) 80%,rgba(0,0,0,0.2) );
    
}

@media (max-width: 600px) {
    .zobo-list-con{
    width:100%;
}
}

</style>