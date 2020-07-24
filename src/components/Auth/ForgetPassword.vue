<template>
  <div class="signup-con">
    <div class="left">
      <v-img
        alt="App Logo"
        class="shrink mr-2"
        contain
        src="./../../assets/images/logo.png"
        transition="scale-transition"
        width="40"
      />
      <br />
      <h2>Challenge and be challenged by musical gurus</h2>
    </div>
    
    <div class="right" >
      <v-container grid-list-md v-if="success">
        <v-alert type="success" :value="true">
          Email has been sent 
        </v-alert>
      </v-container>
      <v-container grid-list-md v-if="!success">
        <v-flex>
          <v-card class="pa-5">
            <span class="headline">Reset Password Resquest</span>
            <v-spacer class="ma-5"></v-spacer>
            <v-form ref="form">
              <v-alert type="error" :value="!!serverError">
                {{serverError}}
              </v-alert>
              <v-spacer class="ma-5"></v-spacer>
              <v-divider inset></v-divider>

              <v-text-field
                name="email"
                label="Email Address"
                v-model="newUser.email"
                :rules="[rules.required,rules.email]"
              ></v-text-field>

             

              <v-btn
                rounded
                :disabled="!valid"
                :loading="loading"
                color="success"
                class="mr-4"
                @click="requestPass"
              >Submit</v-btn>
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
      valid: true,
      newUser: {},
      serverError: false,
      loading: false,
      success:false,
      rules: {
        email: v => /.+@.+/.test(v) || "E-mail must be valid",
        required: v => !!v || "This field is required"
      }
    };
  },

  methods: {
    requestPass() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.$store
          .dispatch("resetPasswordRequest", this.newUser)
          .then(() => {
            this.newUser = {};
            this.loading = false;
            this.success=true
            this.$toast.success({
              title: "hey!,You are welcome Tunner",
              message: "Email has been sent"
            });
          })
          .catch(err => {
            this.loading = false;
            this.serverError=err.response.data.msg;
            this.$toast.error({
              title: "Server Error",
              message:err.response.data.msg
            });
          });
      } else {
        alert("error!!!");
      }
    }
  }
};
</script>



<style lang="scss" >
.signup-con {
  display: grid;
  grid-template-columns: 40% 60%;
  height: 100%;
  & .left {
    background: linear-gradient(#7cbf7e, rgba(0, 0, 0, 0.5));
    color: rgba(0, 100, 0, 0.7);
    height: 100%;
    width: 80%;
    //  text-align:center;
    padding-top: 100px;
    padding-left: 20px;
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