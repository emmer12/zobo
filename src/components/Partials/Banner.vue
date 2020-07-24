<template>
  <div class="banner" >
    <v-container grid-list-md >
      <v-layout row wrap>
        <v-flex md12 style="position:relative">
          <div class="overlay" ></div>
          <div class="right" style="z-index:0;position:relative">
              <vue-flux
                :options="vfOptions"
                :images="vfImages"
                :transitions="vfTransitions"
                ref="slider">
                <template v-slot:preloader>
                    <flux-preloader />
                </template>
              </vue-flux>
          </div>
        </v-flex>
      </v-layout>
      <v-row></v-row>
    </v-container>
  </div>
</template>

<script>
import {
   VueFlux,
   FluxPreloader,
} from 'vue-flux';

export default {
  components: {
    VueFlux,
    FluxPreloader,
  },
  data: () => ({
    vfOptions: {
      autoplay: true
    },
    vfImages: [
      require("./../../assets/images/banner/piano.jpg"),
      require("./../../assets/images/banner/guitar.jpg"),
      require("./../../assets/images/banner/guitar2.jpg"),
      require("./../../assets/images/banner/guitar3.jpg"),
      require("./../../assets/images/banner/guitar4.jpg"),
      require("./../../assets/images/banner/vocal.jpg"),
      require("./../../assets/images/banner/vocal2.jpg"),
      require("./../../assets/images/banner/vocal3.jpg"),
      require("./../../assets/images/banner/vocal4.jpg"),
      require("./../../assets/images/banner/drum1.jpg"),
      require("./../../assets/images/banner/drum3.jpg")
    ],
    vfTransitions: ['fade'],
  })
};
</script>

<style lang="scss" scoped>
.banner{
   background:url(./../../assets/images/bg/bg1.png);
   background-position:bottom;
   background-size: cover;
   & .left{
      & h1{
         font-weight: 800;
         font-size: 30px;
         padding: 10px;
      }
      & p{
         padding: 10px;
      }
   }
}
.overlay{
  position: absolute;
  width:100%;
  height:100%;
  left:4px;
  top: 4px;
  background: url(./../../assets/images/bg/bg5.png);
  background-size: contain;
  background-repeat: no-repeat;
  z-index: 1;
  overflow: hidden;
  // opacity: 0.5;
}
</style>