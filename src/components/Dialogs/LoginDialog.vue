<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500">
      <v-card>
        <v-toolbar dense>
          <span class="title">Tunner</span>
          <v-spacer></v-spacer>
          <v-btn icon color="red" @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text style="text-align:center">
          <v-spacer class="mt-5"></v-spacer>
            <v-layout row wrap justify-space-between>
                <v-flex md10 xs8>
                  <v-btn color="primary" block dark>
                    <v-icon left>mdi-google</v-icon>Sign up with Google
                  </v-btn>
                </v-flex>
                <v-flex md2 xs2>
                  <v-btn icon color="primary" class="ml-2" outlined>
                    <v-icon>mdi-twitter</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
              <v-btn
                class="ma-4"
                fab
                small
                color="default"
                size="10"
                
              >
              OR
              </v-btn>

              <div >
              <v-btn text color="success" :to="{name:'signup'}">Sign Up with Email</v-btn>
              </div>
            <v-divider></v-divider>

            <div class="ma-3">
              <span class="font-weight-bold">Allready a mentmer?</span><router-link :to="{name:'signin'}"><span class="primary--text font-weight-black pl-1" to="/">Signin</span></router-link>
            </div>

        </v-card-text>
  
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: ["dialog"],
  data() {
    return {};
  },
   methods: {
      closeDialog(){
          this.$emit("closeDialog");
      }
  },
};
</script>

<style>
</style>