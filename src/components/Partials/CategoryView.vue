<template>
      <!-- <transition-group name="fade" enter-active-class="ZoomIn">  -->
    <v-layout row wrap>
        <v-flex v-for="data in category" :key="data.id" xs6 sm4 md3>
         <router-link :to="{name:'store-cat',params:{category:data.id}}" >
            <v-card class="pa-2">
             <img :src="data.imgUrl" width="100%" />             
          </v-card>
          <v-card class='pa-4 mt-2' style="border-top-left-radius:0px;border-top-right-radius:0px"><h5>{{data.name}} l</h5></v-card>
         </router-link>
      </v-flex>

    </v-layout>
      <!-- </transition-group> -->
</template>


<script>
export default {
  props:['category'],
  data() {
    return {
      categotry:['']
    };
  },
  methods: {
    
  }
};
</script>

<style lang="scss" scoped>
a{
    text-decoration: none !important;
}
.tabs-con {
  background: red !important;
}
.v-tab{
    
    text-transform:none !important
}
.v-flex{
    cursor:pointer
}
.liked{
    cursor:pointer
}
</style>

