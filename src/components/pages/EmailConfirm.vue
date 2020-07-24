<template>
  <div>
    <v-container grid-list-md>
      <v-card class="pa-5 text-center">
        <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>
        <div v-if="success">
          <v-icon color="green" size="70">check</v-icon>
          <h1 class="font-weight-black">Welcome To tunner</h1>
          <p>Your email has been confirmed successfully</p>
          <v-btn color="success" :to="{name:'profile'}">Go To Your Profile</v-btn>
        </div>

         <div v-if="error">
          <v-icon color="red" size="70">mdi-cancel</v-icon>
          <h1 class="font-weight-black red--text">Opps! Invalid token</h1>
        </div>


      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      success: false,
      error: false
    };
  },
  created() {
      this.loading=true
    this.$store
      .dispatch("confirmEmail", this.$route.params.token)
      .then(() => {
          this.loading=false,
          this.success=true
      })
      .catch(() => {
          this.loading=false
          this.error=-true
      });
  }
};
</script>

<style>
</style>