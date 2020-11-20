<template>
  <div class="signup-con">
    <div class="right">
      <v-container grid-list-md>
        <!-- <div class="d-flex d-sm-none bottom-z">
          <v-img
            alt="App Logo"
            class="shrink mr-2 img"
            contain
            src="./../../assets/images/logo.png"
            transition="scale-transition"
            width="100"
          />
          <h2>Sign Up,</h2>
        </div> -->
        <v-flex>
          <div class="">
            <div>
              <h1>Get started with Cellpay</h1>
              <p>Join now and start recieving gifts <router-link tag="a" class="primary--text" :to="{name:'access.signin'}">Already has an account <v-icon>mdi-help-circle</v-icon> </router-link></p>
            </div>
            <v-spacer class="ma-5"></v-spacer>
            <v-form ref="form">
              <v-alert
                v-for="(error, index) in serverErrors"
                :key="index"
                type="error"
                :value="!!serverErrors"
                outlined
              >
                <p v-html="error[0].msg || error"></p>
              </v-alert>
              <v-alert type="info" :value="!!vmsg">{{vmsg}}</v-alert>

              <!-- <v-divider inset color="primary">Or</v-divider> -->
             <v-row class="mx-1">
                <v-text-field 
              name="firstname" 
              label="Firstname" 
              v-model="newUser.firstname"
               :rules="[rules.required]"
              solo
              class="mr-2"
            
              >
              <v-spacer></v-spacer>
              </v-text-field>

              <v-text-field
                name="lastname"
                label="Lastname"
                v-model="newUser.lastname"
                :rules="[rules.required]"
                solo
              ></v-text-field>
             </v-row>

              <v-text-field
                name="username"
                label="Username"
                v-model="newUser.username"
                id="username"
                :rules="[rules.required]"
                solo
              ></v-text-field>

              <v-text-field
                v-model="newUser.email"
                label="E-mail"
                :rules="[rules.required,rules.email]"
                solo
              ></v-text-field>

              <!-- <v-select
                v-model="newUser.location"
                :items="['Lagos','Ondo','Abuja']"
                :rules="[v => !!v || 'Item is required']"
                label="Location"
                required
              ></v-select> -->

             <v-menu
                ref="menu"
                lazy
                :close-on-content-click="false"
                v-model="menu"
                transition="scale-transition"
                offset-y
                :nudge-right="40"
                min-width="290px"
              >
                <template v-slot:activator="{on}">
                  <v-text-field
                    label="Next birthday date"
                    v-model="newUser.birthday"
                    :rules="[rules.required]"
                    prepend-inner-icon="event"
                    readonly
                    v-on="on"
                    solo
                  ></v-text-field>
                </template>
                <v-date-picker
                  ref="picker"
                  v-model="newUser.birthday"
                  @change="$refs.menu.save(newUser.birthday)"
                  :min="new Date().toISOString().substr(0, 10)"
                ></v-date-picker>
              </v-menu> 

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

              <v-text-field
                v-model="newUser.pin"
                name="pin"
                label="Enter your pin"
                hint="Value must be 4 digit"
                :rules="[rules.required,rules.pinLength]"
                type="number"
                solo
              ></v-text-field>

              <!-- <v-select
                v-model="newUser.gender"
                :items="['Male','Female','Other']"
                :rules="[v => !!v || 'Item is required']"
                label="Gender"
                required
              ></v-select>-->

              <v-checkbox
                v-model="newUser.checkbox"
                :rules="[v => !!v || 'You must agree to continue!']"
                label="Agree to terms and conditions ?"
                required
              ></v-checkbox>

              <v-btn
                :loading="loading"
                :disabled="!valid"
                color="primary"
                class="mr-4"
                @click="register"
              >Create account</v-btn>
              <br/><br/>
              

              <!-- <v-btn class="mt-4" block color="blue" dark><v-icon left>mdi-facebook</v-icon> Login with facebook</v-btn> -->

            </v-form>
          </div>
        </v-flex>

      </v-container>
    </div>
    <div class="left">
      <si-svg></si-svg>
    </div>
  </div>
</template>

<script>
// import { mapActions } from 'vuex'
import SiSvg from './../svg/signup'
export default {
  components: {
    SiSvg
  },
  data() {
    return {
      value: true,
      pin: true,
      valid: true,
      newUser: {},
      loading: false,
      serverErrors: null,
      menu: false,
      vmsg: localStorage.getItem("visitor-buyer")
        ? "please sign up to continue with your payments"
        : null,
      rules: {
        email: v => /.+@.+/.test(v) || "E-mail must be valid",
        length: v =>
          (v && v.length >= 6) || "password must be least 6 characters",
        pinLength: v => (v && v.length == 4) || "pin must be 4 characters",
        required: v => !!v || "This field is required"
      }
    };
  },

  methods: {
    register() {
      if (this.$refs.form.validate()) {
        this.loading = true;
         this.serverErrors=null,
        this.$store
          .dispatch("registerUser", this.newUser)
          .then(() => {
            this.newUser = {};
            this.loading = false;
            this.$toast.success({
              title: "Registration successfull",
              message: "Please check your email to verify your account"
            });
            if (localStorage.getItem("visitor-buyer")) {
              this.$router.push({
                name: "myzobopage",
                params: JSON.parse(localStorage.getItem("visitor-buyer"))
              });
            } else {
              this.$router.push({ name: "zobo.list" });
            }
          })
          .catch(err => {
            this.loading = false;
            if (err.response.data.global) {
              this.serverErrors =
                null || Object.values(err.response.data.errors);
              this.$toast.error({
                title: "Server Error",
                message: "Opps! something went wrong"
              });
              window.scrollTo(0, 50);
            } else {
              
              this.$toast.error({
                title: "Server Error",
                message: err.response.data.msg
              });
               this.serverErrors=[err.response.data.msg]
            }

            this.newUser.password = "";
          });
      } else {
        this.$toast.error({
          title: "Validation Error",
          message: "Opps something went wrong, all field required"
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
    // margin: auto;
    // width: 70%;
    // margin-top: 20px;
  }
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