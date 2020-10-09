<template>
    <div class="access" v-if="!authToken">
       <div class="form-con">
         <v-form ref="form">
          
             <p v-if="error" class="red--text">{{error}}</p>

              <input
                label="Pin"
                v-model="pin"
                :rules="[rules.required]"
                type='number'
                class="pin-field"
                ref="pin"
                :maxlength="max"
                :minlength="4"
                name="pin"
                :class="{'invalid':error}"
              />
              <div class="loader" v-if="loading"><v-progress-circular :value="10" indeterminate></v-progress-circular></div>
              <router-link 
                :to="{name:'access.forget.password'}"
                style="width:50%"
                class="italics primary--text caption font-weight-bold d-block text-right float-right"
              >Forgot pin?</router-link>

              <br />
              <router-link tag="strong" :to="{name:'logout'}">
                <v-btn  class="mt-6 primary" small text>Logout</v-btn>
              </router-link>
            </v-form>
       </div>
    </div>
</template>

<script>
// import jwt from "jsonwebtoken"
export default {

  data() {
    return {
         rules: {
        length: v =>
          (v && v.length == 4) || "pin must be least 4 digit",
        required: v => !!v || "This field is required"
      },
      pin:'',
      max:4,
      error:null,
      loading:false
    };
  },

   watch: {
    pin(val) {
      this.waitForIt(val);
    }
  },

  methods: {
    waitForIt(val) {
      if (this.time) {
        clearTimeout(this.time);
      }
      this.error = false;
      this.time = setTimeout(() => this.submitPin(val), 1000);
    },
    submitPin(val) {
      this.loading = true;
      if (!val.length) return;
      this.$store.dispatch("submitPin", {val}).then(()=>{
      this.pin=' '
      }).catch(()=>{
        this.loading = false;
       this.error="Wrong pin"
       this.pin=" "
      })
  },
    focusInput(){
      this.$refs.pin.focus()
    },
  },

  mounted() {  
    setTimeout(()=>{
      this.focusInput() || !this.authToken
    },2000)  
  },

  computed: {
    authToken(){
      return this.$store.getters.authToken;
    },
  }
};
</script>

<style lang="scss" scoped>
.access{
  height:100%;
  width:100%;
  background:rgba(51, 16, 4, 0.8);
  position:fixed;
  top:0px;
  bottom:0px;
  z-index: 9999;
  color:white;

  & .form-con{
    position:relative;
    height:150px;
    width:40%;
    top:30%;
    left:50%;
    transform: translate(-50%,-50%);
    background:rgba(0, 0, 0, 0.123);
    padding:10px;
  & .pin-field{
    background:rgba(102, 102, 102, 0.068);
    width:100%;
    padding: 10px 20px;
    outline:none;
    border:2px solid white;
    color:white;
    font-size:20px;
    text-align: center;
    margin-bottom:20px;

    
  }
  & .invalid{
    border:2px solid rgb(224, 16, 16);
  }
    & .loader{
      position:absolute;
      top: -50px;
      right:10px
    }
  }
}



@media (max-width: 600px) {
  .access{
    & .form-con{
      width:100%;
    }
  }
}




</style>