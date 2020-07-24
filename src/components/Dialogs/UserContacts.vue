<template>
  <v-container grid-list-md>
    <v-dialog
      v-model="dialog"
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card flat height="300px" class="pa-3">
        <v-toolbar dense>
          <span class="title">{{user.username}}'s Contacts</span>
          <v-spacer></v-spacer>
          <v-btn icon color="red" @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <div class="pa-4">
          <v-layout row wrap align-center>
            <v-flex md2 sm2 xs2>
              <v-btn icon>
                <v-icon>my_location</v-icon>
              </v-btn>
            </v-flex>

            <v-flex md10 sm10 xs10>
              <span class="weight-bold">{{user.location || "Lagos"}}</span>
            </v-flex>

            <v-flex md2 sm2 xs2>
              <v-btn icon>
                <v-icon>phone</v-icon>
              </v-btn>
            </v-flex>

            <v-flex md10 sm10 xs10>
              <span class="weight-bold">{{user.phoneNo || "090484748784"}}</span>
            </v-flex>

            <v-flex md2 sm2 xs2>
              <v-btn icon>
                <v-icon>mail</v-icon>
              </v-btn>
            </v-flex>

            <v-flex md10 sm10 xs10>
              <span class="weight-bold">{{user.email}}</span>
            </v-flex>
          </v-layout>
          <br />
          <v-divider insert></v-divider>

          <v-layout row wrap justify-space-around>
            <v-btn fab icon color="blue">
              <v-icon size="40">mdi-facebook</v-icon>
            </v-btn>
            <v-btn fab icon color="primary">
              <v-icon size="40">mdi-twitter</v-icon>
            </v-btn>
            <v-btn fab icon color="success">
              <v-icon size="40">mdi-whatsapp</v-icon>
            </v-btn>
            <v-btn fab icon color="red">
              <v-icon size="40">mdi-youtube</v-icon>
        </v-btn>
          </v-layout>
        </div>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  props: ["user",'dialog'],
  data() {
    return {
    };
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