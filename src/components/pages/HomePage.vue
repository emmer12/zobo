<template>
  <div>
    <!-- <banner></banner> -->
    <v-container grid-list-md>
      <h1>{{$route.name}} Page</h1>
      <v-btn round color="primary" dark>text</v-btn>
    </v-container>
    <section class="section1">
      <!-- <div class="topbg">hello</div> -->
      <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, deleniti? lor</h4>
      <svg class="svg-b" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#fff" fill-opacity="1" d="M0,160L48,181.3C96,203,192,245,288,245.3C384,245,480,203,576,186.7C672,171,768,181,864,202.7C960,224,1056,256,1152,250.7C1248,245,1344,203,1392,181.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
    </section>

  </div>
</template>

<script>
// import Banner from "../Partials/Banner";
export default {
  components: {
    // Banner,
  },
  data: () => ({}),

  computed: {}
};
</script>

<style lang="scss" scoped>
.section1 {
 
  position:relative;
  background: #444;
  color: white;
  text-align: center;
  height: 300px;
  line-height: 300px;

  & .svg-b{
    position:absolute;
    bottom:0px;
    left:0;

  }
  
  & .svg-t{
    position:absolute;
    top:-100px;
    left:0;
    transform: rotate(180deg);
  }


}
</style>