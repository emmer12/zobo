<template>
  <div>
    <div class="celebrate"  v-show="birthday">
       <div class="child">
           <div style="width:100%" id="congrat">
            <h2>Happy birthday</h2>
       </div>
     </div>
    </div>
  </div>
</template>

<script>
import lottie from "lottie-web";
let json = require("../../assets/json/10208-animated-giftbox.json");
export default {
  props: ['type'],
  data() {
    return {
      birthday: null,
    };
  },
  methods: {
     start(){
      this.$confetti.start()
    },
     stop(){
      this.$confetti.stop()
    },
    cheers(){
       if (localStorage.getItem('token')) {
             let dis = this;
          setTimeout(function() {
            let bDay = dis.user.birthday.split("-")[2].substr(0, 2);
            let bMonth =dis.user.birthday.split("-")[1].substr(0, 2);
            let presentDate = new Date();
            let pDate = presentDate.getDate();
            let pMonth = presentDate.getMonth() + 1;
            

            if (bDay == pDate && bMonth == pMonth) {
              lottie.loadAnimation({
              container: document.querySelector("#congrat"), // the dom element
              renderer: "svg",
              loop: true,
              autoplay: true,
              animationData: json
            });
        dis.start()    
        dis.birthday = true;

        setInterval(() => {
            dis.stop()
            dis.birthday=false
        },9000);
    
      }
    }, 2000);
       }
    }
  },
  created() {
  
     window.eventBus.$on('checkCheers',()=>this.cheers())
  },
  
  mounted() {
    // let that=this;
    //  setTimeout(()=>{
    //     that.cheers()
    //  },5000)

  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  }
};
</script>

<style lang="scss" scoped>
   .celebrate{
      width:100%;
      height:100vh;
      position:fixed;
      background:rgba(51, 16, 4, 0.8);
      z-index:9999;
      top:0;
      left:0;
      display: flex;
      justify-content:center;
      align-items:center;
      & .child{
        max-width:400px;
        text-align:center;

        & h2{
            color:#ccc;
            animation:zoomIn 1s ;
            font-family: cursive;
        }
      }
   }
</style>