<template>

  <div>
    <banner></banner>
    <svg class="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#222222" fill-opacity="1" d="M0,288L8.9,245.3C17.8,203,36,117,53,106.7C71.1,96,89,160,107,181.3C124.4,203,142,181,160,176C177.8,171,196,181,213,181.3C231.1,181,249,171,267,165.3C284.4,160,302,160,320,181.3C337.8,203,356,245,373,250.7C391.1,256,409,224,427,218.7C444.4,213,462,235,480,202.7C497.8,171,516,85,533,85.3C551.1,85,569,171,587,197.3C604.4,224,622,192,640,176C657.8,160,676,160,693,149.3C711.1,139,729,117,747,128C764.4,139,782,181,800,208C817.8,235,836,245,853,240C871.1,235,889,213,907,218.7C924.4,224,942,256,960,240C977.8,224,996,160,1013,149.3C1031.1,139,1049,181,1067,208C1084.4,235,1102,245,1120,245.3C1137.8,245,1156,235,1173,224C1191.1,213,1209,203,1227,176C1244.4,149,1262,107,1280,128C1297.8,149,1316,235,1333,250.7C1351.1,267,1369,213,1387,176C1404.4,139,1422,117,1431,106.7L1440,96L1440,0L1431.1,0C1422.2,0,1404,0,1387,0C1368.9,0,1351,0,1333,0C1315.6,0,1298,0,1280,0C1262.2,0,1244,0,1227,0C1208.9,0,1191,0,1173,0C1155.6,0,1138,0,1120,0C1102.2,0,1084,0,1067,0C1048.9,0,1031,0,1013,0C995.6,0,978,0,960,0C942.2,0,924,0,907,0C888.9,0,871,0,853,0C835.6,0,818,0,800,0C782.2,0,764,0,747,0C728.9,0,711,0,693,0C675.6,0,658,0,640,0C622.2,0,604,0,587,0C568.9,0,551,0,533,0C515.6,0,498,0,480,0C462.2,0,444,0,427,0C408.9,0,391,0,373,0C355.6,0,338,0,320,0C302.2,0,284,0,267,0C248.9,0,231,0,213,0C195.6,0,178,0,160,0C142.2,0,124,0,107,0C88.9,0,71,0,53,0C35.6,0,18,0,9,0L0,0Z"></path></svg>
    
    <!-- <svg class="svg-t" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#d34a1a" fill-opacity="1" d="M0,160L48,181.3C96,203,192,245,288,245.3C384,245,480,203,576,186.7C672,171,768,181,864,202.7C960,224,1056,256,1152,250.7C1248,245,1344,203,1392,181.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg> -->
    <section class="section1">
       <div class="header">
         <h4>Welcome to Cellepay Where you get paid on your special day</h4>
       </div>
    </section>


    <section>
        <v-container grid-list-md>
          <div class="sub-header">
           <h1>How to get started</h1>
        </div>


         <div >
         <v-layout class="" row wrap ma-5>
              <v-flex md6>
                <div class="how-card be">
                <h4>Be a member</h4>
                   <p>To start recieving gifts form your loved once, getv started by creating an account and verify your email address for security reasons</p>
                <v-btn color="#e91e63"   dark>Create account</v-btn>
                </div>
              </v-flex>

              <v-flex md6>
                <div class="">
                   <member-svg></member-svg>
                </div>
              </v-flex>
         </v-layout>
        </div>

           <div >
         <v-layout class="layout-r" row wrap ma-5>
              <v-flex md6 >
                <div class="">
                     <create-svg></create-svg> 
                </div>
              </v-flex>

              <v-flex md6>
                <div class="how-card right create">
                   <h4>Create Celle</h4>

                   <p>Celle is like a wallet your gift will be stored in. After a succesfull registration with verification you will be taken to your dashboard where you can create a Celle by clicking on Create.</p>
                <v-btn color="success"   dark>Create account</v-btn>
                </div>
              </v-flex>
         </v-layout>
        </div>


        <div>
         <v-layout class="" row wrap ma-5>
              <v-flex md6>
                <div class="how-card share">
                   <h4>Start sharing</h4>

                   <p>Start sharing your link with friends and family on social media (Whatsapp,facebook,instagram,twitter) or copy and paste the link on any platform of your choice </p>
                <v-btn color="#03a9f4"   dark>Get Started</v-btn>
                </div>
              </v-flex>


              <v-flex md6 >
                <div class="">
                     <share-svg></share-svg> 
                </div>
              </v-flex>

         </v-layout>
        </div>


        <div >
         <v-layout class="layout-r" row wrap ma-5>
              <v-flex md6 >
                <div class="">
                     <deposit-svg></deposit-svg> 
                </div>
              </v-flex>

              <v-flex md6>
                <div class="how-card right deposit">
                   <h4>Deposit</h4>

                   <p>Deposite To start recieving gifts form your loved once, getv started by creating an account and verify your email address for security reasons</p>
                <v-btn color="#ff5722"   dark>Get started</v-btn>
                </div>
              </v-flex>
         </v-layout>
        </div>





        
        </v-container>
    </section>



   <section style="background:#f9f6f7 ">
        <v-container grid-list-md>


        <div class="sub-header">
           <h1>Meet Celebrants of the month</h1>
        </div>

           <v-layout  v-if="celep.length" row wrap>
          <v-flex md3 sm4 xs12 v-for="(c, index) in celep" :index="index" :key="index" >
            <zobo-card :zobo="c" :user="{}" :from="'home'" ></zobo-card>
          </v-flex>
        </v-layout>
        </v-container>
   </section>



      <section class="need-con">
        <v-container grid-list-md>


        <div class="sub-header">
           <h1 class="primary--text">Help Someone in need</h1>
        </div>
           <v-layout  v-if="celep.length" row wrap>
          <v-flex md6 sm4 xs12 v-for="(c, index) in celep" :index="index" :key="index" >
            <need-card :zobo="c" :user="{}" :from="'home'" ></need-card>
          </v-flex>
        </v-layout>
        </v-container>
   </section>


   <section class="newsletter">
     This is news latter secion
   </section>
  </div>
</template>
<script>

import Banner from './../Partials/Banner'
import CreateSvg from './../svg/create'
import DepositSvg from './../svg/deposit'
import MemberSvg from './../svg/member'
import ShareSvg from './../svg/share'
import ZoboCard from './../Partials/ZoboCard'
import NeedCard from './../Partials/NeedCard'
import { mapGetters,mapActions } from 'vuex';
import {gsap} from "gsap";

export default {
  components: {
    Banner,
    ZoboCard,
    CreateSvg,
    MemberSvg,
    DepositSvg,
    ShareSvg,
    NeedCard
    
  },
  methods:{
    ...mapActions(['getCelepLimit']),
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
    this.getCelepLimit()
  },
  mounted () {
      gsap.to('.how-card h4', 5, { x:-30, yoyo:true, repeat:-1 } );
      gsap.to('.how-card.right h4', 3, { x:30, yoyo:true, repeat:-1 } );
  },

  computed: {
    ...mapGetters(['user','celep'])

}
};
</script>

<style lang="scss" scoped>
   .header{
    // &::after{
    //   content: "";
    //  height: 50px;
    //  width: 50px;
    //  border-radius: 50%;
    //  background: #e50913;
    //  position: absolute;
    //  left: 0px;
    //  top: 5px;
    //  z-index: 0;
     
    //  }
  
     
    //  &::before{
    //    content: "";
    //    height: 30px;
    //    width: 30px;
    //    border-radius: 50%;
    //    background: white;
    //    position: absolute;
    //    left: 24px;
    //    top: 12px;
    //    /* border: 1px solid #ccc; */
    //    z-index: 1;
    //    box-shadow: -2px 2px 2px #2d2b2b;

    //  }
      h4{
    text-transform: uppercase;
    // text-align: center;
    padding:20px 10px;
    letter-spacing: 5px;
    font-weight:600;
    position: relative
  }
}
.how-card{
  color:white;
  padding:10px;
  &.right{
    h4{
     text-align: end;
     transform: translateX(50px);
    }
  }
  
  h4{
    padding:10px;
    font-weight:700;
    box-shadow:2px 2px 4px rgba($color: #000000, $alpha: 0.2);
    margin-bottom:10px;
    transform: translateX(-50px);
  }
  &.create{
  background:#4caf50;

  h4{
    background:#4caf50;
  }
  }
  &.be{
    background:#e91e63;

    h4{
    background:#e91e63;

    }
    }
     &.deposit{
    background:#ff5722;

    h4{
    background:#ff5722;

    }
    }

    &.share{
    background:#03a9f4;

    h4{
    background:#03a9f4;

    }
   }

}

.need-con{
  background:#222
}

.newsletter{
  height:200px;
  background:#fff;
  padding:10%
}


   @media (max-width: 600px){
     .layout-r{
       flex-direction: column-reverse;
     }
     .how-card{
      &.right{
       h4{
       transform: translateX(20px);
      }
     }

   h4{
    transform: translateX(-20px);
   }
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