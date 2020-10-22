<template>

  <div>
    <banner></banner>
    <!-- <svg class="svg-t" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#d34a1a" fill-opacity="1" d="M0,160L48,181.3C96,203,192,245,288,245.3C384,245,480,203,576,186.7C672,171,768,181,864,202.7C960,224,1056,256,1152,250.7C1248,245,1344,203,1392,181.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg> -->
    <section class="section1">
       <div class="header1">
         <h4>Welcome to Cellepay Where you get paid on your special day</h4>
       </div>


    </section>
  </div>
</template>
<script>

import Banner from './../Partials/Banner'

export default {
  components: {
    Banner,
  },
  methods:{
            getCurrentLocation(){
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(this.setCurrentPosition);
                }else{
                    alert('geoLocation not supported');
                }
            },
            setCurrentPosition(position){
              fetch('http://ipinfo.io',{
                method:"GET"
              },'jsonp').then(response => {
                console.log(response);
                // 0e4971de7ab8ce
              })
                .then(data => {
                  console.log('Success:', data);
                })
                // let pos={lat:position.coords.latitude,long:position.coords.longitude}
                console.log('====================================');
                console.log(position);
                console.log('====================================');
                // this.$store.dispatch('setCurrentPostion',pos)

            }
  },
  data: () => ({
    next:false
  }),
  created () {
    this.getCurrentLocation()
  },

  computed: {
  user() {
      return this.$store.getters.user
  }
}
};
</script>

<style lang="scss" scoped>
   .header{
    &::after{
      content: "";
     height: 50px;
     width: 50px;
     border-radius: 50%;
     background: #e50913;
     position: absolute;
     left: 0px;
     top: 5px;
     z-index: 0;
     
     }
  
     
     &::before{
       content: "";
       height: 30px;
       width: 30px;
       border-radius: 50%;
       background: white;
       position: absolute;
       left: 24px;
       top: 12px;
       /* border: 1px solid #ccc; */
       z-index: 1;
       box-shadow: -2px 2px 2px #2d2b2b;

     }
      h4{
    text-transform: uppercase;
    // text-align: center;
    padding:20px 10px;
    letter-spacing: 5px;
    font-weight:600;
    position: relative
  }
}

</style>
<style lang="scss" scoped>
.section1 {
  position:relative;
  background:white;
  color: #222;
  margin:auto;

   h4{
    text-transform: uppercase;
    text-align: center;
    padding:20px 10px;
    letter-spacing: 5px;
    font-weight:600;
    position: relative;


  }
 
}
   .svg-t{
    position: absolute;
    left:0;
    bottom:-30px;


  }
 .svg-b{
    position:relative;
    top:-10px;
    bottom:0px;
    transform: rotate(180deg);
    left:0;
  }

  .exit-home {
    position:fixed;
    z-index:999;
    height:100vh;
    width:100%;
    top:0;
    left:0px;
  
  & ul{
    display: flex;
    flex-direction:column;
    margin:0;
    padding:0;
    height: 100%;
    &.added{
      & li{
        &:nth-child(1){
          transform: scaleX(1);
          transition: 1s 0.1s;
        }
        &:nth-child(2){
          transform: scaleX(1);
          transition: 1s 0.2s;
        }
        &:nth-child(3){
          transform: scaleX(1);
          transition: 1s 0.3s;
        }
        &:nth-child(4){
          transform: scaleX(1);
          transition: 1s 0.4s;
        }
        &:nth-child(5){
          transform: scaleX(1);
          transition: 1s 0.5s;
        }
      }
    }
    & li{
      background:#d34a1a;
      margin:0px;
      width:100%;
      height:20%;
      transition:1s ease-in-out;
      transform-origin: left;
      transform: scaleX(0);
      // @for $i from 1 through 5{
      //   &:nt-child(#{$i}){
      //     margin:(10 * $i) 
      //   }
      // }
    }
  }
  }
</style>