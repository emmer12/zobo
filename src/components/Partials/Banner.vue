<template>
  <div class="banner">
    <v-container grid-list-md>
      <div class="banner-div">
        <div class="info-div">
          <h1 class="primary--text">Get gift as cash on special day </h1>
           <p class="white--text body-1">Start recieving money gifts from friends and family on your special day</p>
           <div style="height:150px">
              <v-btn @click="next" fab color="default" class="btn g-d elevation-10 mr-10">
            <v-icon>mdi-arrow-down</v-icon>
            </v-btn>
            <v-btn :to="{name:'access.signup'}" color="primary" class="g-s" large>
              Get started
              <v-icon right>mdi-arrow-right</v-icon>
            </v-btn>
           </div>
        </div>

        <div class="right">
          <send-love></send-love>
        </div>
      </div>

    </v-container>
  </div>
</template>

<script>
import {} from "vue-flux";
// import Gift from './../svg/gift'
import SendLove from './../svg/sendlove'
export default {
  components: {
    // Gift,
    SendLove
  },
  methods: {
    next(){
      alert()
    }
  }
};
</script>

<style lang="scss" scoped>
.banner {
  background: #222;
  min-height: 450px;
 .banner-div{
    display:flex;
    flex-direction:row;
  }
  .info-div{
    width:60%;
    position:relative;
    top:90px;

    h1{
         font-weight: 900;
        font-size: 3.4rem;
        line-height: 64px;

    }

    p{
      font-size:16px;
      line-height: 31px;
    }
  }
}


@media (max-width:460px){
.banner {
    .banner-div{
    flex-direction:column;
  }
 
  .info-div{
    width:100%;
    top:50px;
    padding:10px;

    h1{
        font-size: 2.6rem;
        line-height:45px;

    }

    p{
      margin-top:20px;
      line-height: 35px;
    }
  }
}
}
</style>