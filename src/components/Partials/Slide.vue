<template>
   <div class="slider">
      <vue-flux
                :options="vfOptions"
                :images="vfImages"
                :transitions="vfTransitions"
                :captions="vfCaptions"
                ref="slider">

                <template v-slot:preloader>
                    <flux-preloader />
                </template>

                <template v-slot:caption>
                    <flux-caption  v-slot='captionProps'>
                       <div>
                           <h1 color="white" style="color:white">{{captionProps.text}}</h1>
                       </div>
                    </flux-caption>
                </template>

                <template v-slot:controls>
                    <flux-controls />
                </template>

                <template v-slot:pagination>
                    <flux-pagination />
                </template>

                <template v-slot:index>
                    <flux-index />
                </template>
                </vue-flux>


                <button @click="$refs.slider.show('prev')">PREV</button> 
                <button @click="$refs.slider.show('next')">NEXT</button> 
   </div>
</template>

<script>
import {
   VueFlux,
   FluxCaption,
   FluxControls,
   FluxIndex,
   FluxPagination,
   FluxPreloader,
} from 'vue-flux';

export default {
    components: {
      VueFlux,
      FluxCaption,
      FluxControls,
      FluxIndex,
      FluxPagination,
      FluxPreloader,
   },
   data: () => ({
      vfOptions: {
         autoplay: true
      },
      vfImages: [require('./../../assets/images/slider/01.jpg'),require('./../../assets/images/slider/02.jpg'),require('./../../assets/images/slider/03.jpg')],
      vfTransitions: [ 'fade', 'cube', 'book', 'wave' ],
      vfCaptions: [
         'Caption for image 1',
         'Caption for image 2',
         'Caption for image 3',
      ],
   }),
}
</script>

<style>
.slider{
   position: relative;
   background: red;
}
</style>