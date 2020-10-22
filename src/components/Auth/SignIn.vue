<template>
  <div class="signup-con">
  
    <div class="right">
      <v-container grid-list-md>
        <v-flex>
          <div class="pa-5">
             <div>
              <h1>Welcome back!</h1>
              <p>We missed you <router-link tag="a" class="primary--text" :to="{name:'access.signup'}">Don't have account yet<v-icon>mdi-help-circle</v-icon> </router-link></p>
            </div>
            <v-spacer class="ma-5"></v-spacer>
            <v-form ref="form">
              <v-alert
                v-for="(error, index) in serverErrors"
                :key="index"
                type="error"
                :value="!!serverErrors"
                outlined
              ><p v-html="error[0].msg"></p></v-alert>

                <v-alert type="info" :value="!!vmsg">
                {{vmsg}}
              </v-alert>
              <h4 class="text-block grey--text mb-2">Username or Email</h4>
              <v-text-field
                name="username"
                label="Username or Email"
                v-model="newUser.username"
                :rules="[rules.required]"
                solo
              ></v-text-field>
              <h4 class="text-block mb-2 lighten-5 grey--text" >Password</h4>
              <v-text-field
                v-model="newUser.password"
                name="password"
                label="Enter your password"
                hint="At least 6 characters"
                min="6"
                :append-icon="value ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (value = !value)"
                :rules="[rules.required,rules.length]"
                :type="value ? 'password' : 'text'"
                @click:append="() => (value = !value)"
                solo
              ></v-text-field>

              <router-link 
                :to="{name:'access.forget.password'}"
                style="width:50%"
                class="italics primary--text caption font-weight-bold d-block text-right float-right"
              >Forgot password?</router-link>

              <v-btn
                rounded
                :disabled="loading"
                :loading="loading"
                color="primary"
                class="mr-4"
                @click="login"
              >Sign In</v-btn>
              <br />
              <br />
              
              
              <br/>

              <!-- <v-btn class="mt-4" block color="blue" dark><v-icon left>mdi-facebook</v-icon> Login with facebook</v-btn> -->

            </v-form>
          </div>
        </v-flex>


      </v-container>
    </div>
      <div class="left">
       <sn-svg></sn-svg>
    </div>
     
  </div>
</template>

<script>
import SnSvg from './../svg/signin'

export default {
  components: {
    SnSvg
  },  
  data() {
    return {
      value: true,
      valid: true,
      newUser: {},
      serverErrors: false,
      loading: false,
      vmsg:localStorage.getItem('visitor-buyer') ? 'please sign in to continue with your payments' : null,
      rules: {
        email: v => /.+@.+/.test(v) || "E-mail must be valid",
        length: v =>
          (v && v.length >= 6) || "password must be least 6 characters",
        required: v => !!v || "This field is required"
      }
    };
  },

  methods: {
    login() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.valid = false;
        this.$store
          .dispatch("loginUser", this.newUser)
          .then(() => {
            this.newUser = {};
            this.loading = false;
            this.$toast.success({
              title: "hey!,You are welcome Tunner",
              message: "start chanllenging and showcasing what you get"
            });
             if (localStorage.getItem('visitor-buyer')) {
                this.$router.push({ name: "myzobopage",params:JSON.parse(localStorage.getItem('visitor-buyer'))});
              }else{
                this.$router.push({ name: "zobo.list" });
            }
          })
          .catch(err => {
            this.loading = false;
            this.newUser.password = "";
            if (err.response.data.global) {
              this.serverErrors = null || Object.values(err.response.data.errors);
              this.$toast.error({
                title: "Server Error",
                message:"Opps! something went wrong"
              });
              window.scrollTo(0,50)
            }else{
                 this.$toast.error({
                title: "Server Error",
                message:err.response.data.msg
              });
            }
          });
      } else {
        this.$toast.error({
                title: "Server Error",
                message:"Opps! something went wrong"
         });
      }
    }
  }
};
</script>



<style lang="scss" scoped>

.signup-con {
  display: grid;
  grid-template-columns: 50% 50%;
  height: 100%;
  & .left {
  }
  & .right {
    padding: 10px;
    width: 100%;
    margin-top: 20px;
  }
}

.bottom-z{
  text-align:center;
  // background:red;
  flex-direction:column;
  align-items:center;
  border-radius:50%;
  border-bottom: 2px solid #d34a1a;
  margin-bottom:10px;
  box-shadow:2px 3px 4px #ddd;

  & h2{
    color:#d34a1a;
    padding:10px
  }
}

@media screen and (max-width: 640px) {
  .signup-con {
    grid-template-columns: 100%;

    & .left {
      display: none;
    }
    & .right {
      width: 100%;
      margin-top: 20px;
    }
  }
}
</style>