<template>
  <div v-if="user"> 
    <v-card class="mt-2">
      <v-card-title primary-title>
          Your Balance
      </v-card-title>
        <v-card-text>
           <h2 class="body-1"><v-icon>mdi-currency-usd</v-icon> {{user.balance}}</h2>
          <v-btn color="primary" text small class="float-right mt-n4" @click="openW">Withdraw</v-btn>
        </v-card-text>
    </v-card>
      <withdraw-dialog :value="value" :balance="user.balance" :dialog="dialog" @closeDialog="dialog=!dialog;value='';"></withdraw-dialog>
  </div>
</template>



<script>

import WithdrawDialog from '../Dialogs/WithdrawDialog'
export default {
  components: {
    WithdrawDialog
  },
  data () {
    return {
      dialog:false  
    }
  },
  methods: {
    openW(){
      this.dialog=true
    }
  },
  computed: {
    user(){
      return this.$store.getters.user
    }
  }
}
</script>

<style>

</style>