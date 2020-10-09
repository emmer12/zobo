<template>
  <div class="pa-4">
      <v-btn color="success" @click="sendEmail">
          Send Mail
           
      </v-btn>
  </div>
</template>

<script>
export default {
    methods: {
        sendEmail(){
            this.$store.dispatch('sendEmail');
        }
    },
}
</script>

<style>

</style>