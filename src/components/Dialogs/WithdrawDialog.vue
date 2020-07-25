<template>
  <v-container grid-list-md>
    <v-dialog
      v-model="dialog"
      persistent
      :overlay="true"
      transition="dialog-transition"
      max-width="500"
    >
      <v-card flat class="pa-3">
        <v-toolbar dense>
          <span class="title">Balance : $ {{balance}}</span>
          <v-spacer></v-spacer>
          <v-btn icon color="red" @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <br>
         <v-alert type="error" v-if="error" :value="true">
           {{error}}
         </v-alert>
        <v-form ref="form">
          <v-text-field
          name="name"
          label=""
          id="id"
          solo
          type="number"
          v-model="amount.amount"
          prepend-inner-icon="mdi-currency-usd"
           :rules="[rules.required,rules.upto,rules.min]"
           :loading="loading"
        ></v-text-field>

        <v-btn :loading="loading" :disabled="loading" rounded color="primary" dark @click="withdraw">Withdraw</v-btn>

        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  props: ["dialog","balance"],

  data() {
    return {
       rules: {
        required: v => !!v || "This field is required",
        upto: v =>v <= this.balance || "Insufficient fund",
        min: v =>v == 2 || "You can only withdraw $2 and above",
         },
      amount:{},
      loading:false,
      error:null
    };
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },

    withdraw(){
      if (this.$refs.form.validate()) {
        this.$store.dispatch('withdraw', this.amount).then(()=>{
           this.$toast.success({
              title: "transaction successfull",
              message: "your withdrawer has been received successfully"
            });
            this.amount={}
            this.$store.dispatch("getUser");
            this.closeDialog()
        }).catch(()=>{
          this.error="Transaction failed; please try again later"
        })
      }else{
        alert('bad')
      }
    }
  },
  computed: {
    
  },
  watch: {}
};
</script>

<style>
</style>