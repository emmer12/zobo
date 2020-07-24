<template>
<v-container grid-list-xs>
  <h1>Payment </h1>
  <v-btn color="success" @click="makePay">Pay {{result}}</v-btn>
</v-container>

  
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
       creditCard:{} 
    }
  },
  methods: {
    makePay(){
      let data={}
      data.amount=this.result;
      data.user_id=this.zobo.user_id[0];
      data.zobo_id=this.zobo._id;
      data.details=this.creditCard
      this.$store.dispatch('makePayment',data).then(()=>{
        this.$router.push({name:'zobo.transactions'})
      })
    }
  },
  created() {
    if (!this.min) {
      alert()
    }
  },
  computed: {
      ...mapGetters({result:'giftResult',isLoggedIn:'loggedIn',min:'min',zobo:'zobo'})
  }
}
</script>

<style>

</style>