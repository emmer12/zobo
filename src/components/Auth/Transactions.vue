<template>
  <div class="pa-4">
      <h1>Transactions page</h1>
      <v-list  v-for="(item, index) in transactions" :key="index">
         <div class="elevation-1 pa-4">
           {{item.amount}}
         </div>
      </v-list>
  </div>
</template>

<script>
export default {
  components: {
  },
    data() {
    return {
        dialog: false,
    };
    },
  methods: {
    getTransactions() {
      this.$store.dispatch("getTransactions");
    },
    copyText(){
      alert()
    }
  },
  mounted() {
    this.getTransactions();
  },
  computed: {
    transactions() {
      return this.$store.getters.transactions;
    }
  }
};
</script>

<style>
</style>