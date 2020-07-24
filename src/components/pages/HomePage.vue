<template>
  <div>
    <!-- <banner></banner> -->
    <v-container grid-list-md>
      <h1>{{$route.name}} Page</h1>
      <v-btn round color="primary" dark>text</v-btn>
    </v-container>
    <section class="section1">
      <div class="topbg">hello</div>
      <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, deleniti? lor</h4>
    </section>

    <div style="height:200px">hello</div>
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
  & .topbg {
    background-image: url(./../../assets/images/bg/bg7.png);
  background-repeat: no-repeat;
    // background-position-y: -150px;
    background-size: cover;
    width:100%;
    height:100px;
    position: absolute;
    top:0px;
    left:0px;
  }
  position:relative;
  background: #444;
  color: white;
  text-align: center;
  height: 300px;
  line-height: 300px;
  background-image: url(./../../assets/images/bg/bg6.png);
  background-size: 100%;
  background-repeat: no-repeat;
  background-position-y: bottom;
}
</style>