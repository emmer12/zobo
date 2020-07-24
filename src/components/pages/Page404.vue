<template>
  <div class="v-flex d-flex justify-center align-content-center" >
          <div style="height:500px;width:400px" id="anim" ref="ani"></div>
  </div>
</template>

<script>
import lottie from "lottie-web"
let json=require('../../assets/json/404.json')
export default {
  mounted() {
    console.log(this.$ref);
    
  lottie.loadAnimation({
  container:document.querySelector('#anim'), // the dom element
  renderer: 'svg',
  loop: true,
  autoplay: true,
  animationData: json, // the animation data

  // rendererSettings: {
  //   context: canvasContext, // the canvas context
  //   preserveAspectRatio: 'xMinYMin slice', // Supports the same options as the svg element's preserveAspectRatio property
  //   clearCanvas: false,
  //   progressiveLoad: false, // Boolean, only svg renderer, loads dom elements when needed. Might speed up initialization for large number of elements.
  //   hideOnTransparent: true, //Boolean, only svg renderer, hides elements when opacity reaches 0 (defaults to true)
  //   className: 'some-css-class-name',
  //   id: 'some-id',
  // }
});
  },
}
</script>

<style>

</style>