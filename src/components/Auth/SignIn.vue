<template>
  <div class="signup-con">
    <div class="left">
      <h2>Sign In</h2>
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
      <v-container grid-list-md>
        <v-flex>
          <v-card class="pa-5">
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

              <v-text-field
                name="username"
                label="Username or Email"
                v-model="newUser.username"
                :rules="[rules.required]"
              ></v-text-field>

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
              <router-link tag="b" :to="{name:'signup'}">
                <span class="mt-6 grey--text" text>Don't have an account?</span>
              </router-link>
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
  grid-template-columns: 20% 60%;
  height: 100%;
  & .left {
    background: linear-gradient(rgb(211, 74, 26), rgba(0, 0, 0, 0.5));
    color: rgb(245, 245,245,0.9);
    height: 400px;
    width: 400px;
    border-radius:50%;
     text-align:right;
    padding-top: 140px;
    padding-right: 100px;
    transform:translateX(-200px);
    position: relative;
    & .img{
      float:right;
      position: absolute;
      right:90px;

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