<template>
  <div class="signup-con ">
    <div class="access"></div>
     <div class="left">
      <h2>Forgot Password</h2>
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
    <div class="right" >
       <div class="d-flex d-sm-none bottom-z">
          <v-img
            alt="App Logo"
            class="shrink mr-2 img"
            contain
            src="./../../assets/images/logo.png"
            transition="scale-transition"
            width="100"
          />
          <h2>Forgot Reset</h2>
        </div>

        <v-container grid-list-md v-if="success">
        <v-alert type="success" :value="true">
          Email has been sent to {{ newUser.email }}
        </v-alert>
      </v-container>
      <v-container grid-list-md v-if="!success">
        <v-flex>
          <v-card class="pa-5">
            <span class="title">Reset Password Resquest</span>
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
                solo
              ></v-text-field>


              <v-btn
                rounded
                :disabled="!valid"
                :loading="loading"
                color="primary"
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
            // this.newUser = {};
            this.loading = false;
            this.success=true
            this.$toast.success({
              title: "hey!,You are welcome Tunner",
              message: "Email has been sent"
            });
          })
          .catch(err => {
            console.log('====================================');
            console.log(err);
            console.log('====================================');
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



<style lang="scss" scoped>
.signup-con {
  display: grid;
  grid-template-columns: 40% 60%;
  height: 100%;
  & .left {
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
    margin:auto;
    width: 70%;
    // margin-top: 20px;
  }
}
.access{
  background:url('./../../assets/images/bg/bg8.png');
  background-repeat: no-repeat;
  background-size: contain;
  opacity: 0.1;
  width:100%;
  height:100%;
  position:absolute;
}

.bottom-z {
  text-align: center;
  // background:red;
  flex-direction: column;
  align-items: center;
  border-radius: 50%;
  border-bottom: 2px solid #d34a1a;
  margin-bottom: 10px;
  box-shadow: 2px 3px 4px #ddd;

  & h2 {
    color: #d34a1a;
    padding: 10px;
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