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
          <span class="title">Share</span>
          <v-spacer></v-spacer>
          <v-btn icon color="red" @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <div class="d-flex justify-center pa-10">
          <v-btn class="mr-4" icon color="#3b5998" fab>
            <v-icon  size="40">mdi-facebook</v-icon>
          </v-btn>
          <v-btn class="mr-4" icon color="#bc2a8d" fab>
            <v-icon size="40">mdi-instagram</v-icon>
          </v-btn>
          <v-btn class="mr-4" icon color="#00ACEE" fab>
            <v-icon size="40">mdi-twitter</v-icon>
          </v-btn>
          <v-btn class="mr-4" icon color="green" fab>
            <v-icon size="40">mdi-whatsapp</v-icon>
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  props: ["dialog"],

  data() {
    return {};
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    }
  },
  watch: {}
};
</script>

<style>
</style>