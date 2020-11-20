<template>
  <v-container grid-list-xs>
    <div class="payment-con">
      <div class="pay-side">
        <div class="logo">
          <img src="../../assets/images/svg/Cellepay_logo_Icon_White+PNG.png" width="50px" />
        </div>

        <h1>$ {{ result }}</h1>
      </div>
      <div class="pay-details">
        <h4 class="title pb-5">Payers actions</h4>
        <div>
          <v-btn color="primary" @click="openMsg=!openMsg" dark>Attach message</v-btn>
          <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <v-textarea
              v-if="openMsg"
              class="mt-5"
              row="2"
              label="Message"
              name="name"
              v-model="msg"
              textarea
              counter="100"
              rows="2"
              solo
              maxlength="100"
            ></v-textarea>
          </transition>
          <v-checkbox label="Hide my identification" v-model="hide" value></v-checkbox>

         <v-btn v-if="user" color="primary" >
           <v-icon>mdi-cash</v-icon>
            <paystack
            :amount="result*100"
            :email="user.email"
            :first_name="user.firstname"
            :last_name="user.lastname"
            :paystackkey="paystackkey"
            :reference="reference"
            :callback="callback"
            :close="close"
            :embed="false"
            class="v-btn primary"
          >
            Make Payment
          </paystack>
         </v-btn>
        </div>
      </div>
    </div>
    <!-- <v-btn color="success" :loading="loading" :disabled="loading" @click="makePay">Pay {{result}}</v-btn> -->
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import paystack from "vue-paystack";
export default {
  components: {
    paystack
  },
  data() {
    return {
      openMsg: null,
      hide: false,
      msg: "",
      creditCard: {},
      loading: false,
      paystackkey: "pk_test_9a79054f46776dddee3854e7f2d75fc3dc341353" //paystack public key
    };
  },
  methods: {
    makePay(response) {
      let data = {};
      data.amount = this.result;
      data.user_id = this.zobo.user_id[0];
      data.zobo_id = this.zobo._id;
      data.details = response;
      data.msg=this.msg;
      data.show=!this.hide;
      console.log(data);
      this.loading = true;
      this.$store.dispatch("makePayment", data).then(() => {
        this.loading = false;
        this.$router.push({ name: "zobo.transactions" });
      });
    },
    callback: function(response) {
      if (response.status === "success") {
        this.makePay(response);
      }
    },
    close: function() {
      console.log("Payment closed");
    }
  },
  created() {
    if (!this.min) {
      alert();
    }
  },
   mounted() {
   if (localStorage.getItem('token')) {
      this.$store.dispatch("getUser");
      this.$store.dispatch("getCurrency");
   }
  },
  computed: {
    ...mapGetters({
      result: "giftResult",
      isLoggedIn: "loggedIn",
      min: "min",
      zobo: "zobo",
      user: "user"
    }),

    reference() {
      let text = "";
      let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (let i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    }
  }
};
</script>

<style lang="scss" scoped>
.payment-con {
  background: #eee;
  margin: auto;
  max-width: 600px;
  padding: 10px;
  display: flex;

  .pay-side {
    width: 40%;
    background: #e50913;
    text-align: center;
    color: white;
    position: relative;
    padding-top: 35px;
  }

  .pay-details {
    background: white;
    box-shadow: -5px 0px 13px #6b181c;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    position: relative;
    padding: 24px 20px 80px 31px;

    &::before {
      content: "";
      position: absolute;
      left: -18px;
      background: white;
      border-top: 30px solid transparent;
      border-right: 30px solid white;
      transform: rotate(135deg);
    }
  }
}

@media (max-width:460px){
  .payment-con {
    flex-direction: column;
  .pay-side {
    width: 100%;
    padding-bottom: 35px;
  }
    
  .pay-details {
    box-shadow: 0px -5px 13px #6b181c;

    &::before {
      top: -20px;
    left: 46%;
    border-top: 30px solid transparent;
    border-right: 30px solid white;
    -webkit-transform: rotate(135deg);
    transform: rotate(135deg) translateX(0%); 
    }

  }
  }

}
</style>