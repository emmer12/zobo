<template>
  <div class="signup-con">
     <div class="left">
      <h2>Reset Password</h2>
      <v-img
        alt="App Logo"
        class="shrink mr-2 img"
        contain
        src="./../../assets/images/logo.png"
        transition="scale-transition"
        width="100"
      />
      <br />
    </div>
    <div class="right">
     <v-container grid-list-md class="text-center">
        <v-progress-circular v-if="isLoading" indeterminate color="primary"></v-progress-circular>
       <div v-if="error">
          <v-icon color="red" size="70">mdi-cancel</v-icon>
          <h1 class="font-weight-black red--text">Opps! Invalid token</h1>
        </div>
     </v-container>
     
      <v-container grid-list-md v-if="success">
        <v-flex>
          <v-card class="pa-5">
            <span class="headline">Reset Passwrod</span>
            <v-spacer class="ma-5"></v-spacer>
            <v-form ref="form">
              <v-alert type="error" :value="!!serverError">
                {{serverError}}
              </v-alert>
              <v-divider inset></v-divider>
              <v-text-field
                v-model="newUser.password"
                name="password"
                label="Enter your new password"
                hint="At least 6 characters"
                min="6"
                :append-icon="value ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (value = !value)"
                :rules="[rules.required,rules.length]"
                :type="value ? 'password' : 'text'"
                @click:append="() => (value = !value)"
              ></v-text-field>

    

              <v-btn
                rounded
                :disabled="!valid"
                :loading="loading"
                color="success"
                class="mr-4"
                @click="resetPassword"
              >Reset</v-btn>
              <br />
              <br />
            
            </v-form>
          </v-card>
        </v-flex>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: true,
      valid: true,
      newUser: {},
      serverError: false,
      loading: false,
      isLoading:false,
      success:false,
      error:false,
      rules: {
        length: v =>
          (v && v.length >= 6) || "password must be least 6 characters",
        required: v => !!v || "This field is required"
      }
    };
  },
  created () {
    console.log(this.$route.params.token);
    this.$store.dispatch("varifyPassToken",this.$route.params.token)
    .then(()=>{
      this.isLoading=false
      this.success=true
    }).catch(()=>{
      this.isLoading=false
      this.error=true
    })
  },
  methods: {
    resetPassword() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.newUser.token=this.$route.params.token
        this.$store
          .dispatch("resetPassword", this.newUser)
          .then(() => {
            this.newUser = {};
            this.loading = false;
            this.$toast.success({
              title: "Password Reset successful",
              message: "You have successfully reset your password"
            });
            this.$router.push({ name: "signin" });
          })
          .catch(err => {
            this.loading = false;
            console.log(err);
            // this.serverErrors=Object.values(err.response.data.errors);
            this.newUser.password = "";
            this.serverError=err.response.data.msg;
            this.$toast.error({
              title: "Server Error",
              message: "Opps! something went wrong.Plase try again later"
            });
          });
      } else {
        alert("error!!!");
      }
    }
  }
};
</script>



<style lang="scss" scoped>
.signup-con {
  display: grid;
  grid-template-columns: 40% 60%;
  height: 100%;
  &  .left {
    background: linear-gradient(rgb(211, 74, 26), rgba(0, 0, 0, 0.5));
    color: rgb(245, 245, 245, 0.9);
    height: 400px;
    width: 400px;
    border-radius: 50%;
    text-align: right;
    padding-top: 140px;
    padding-right: 100px;
    transform: translateX(-200px);
    position: relative;
    & .img {
      float: right;
      position: absolute;
      right: 90px;
    }
  }
  & .right {
    padding: 10px;
    margin: auto;
    width: 70%;
    margin-top: 20px;
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