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
        <span class="title">Upload File</span>
        <v-spacer></v-spacer>
        <v-btn icon color="red" @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
     
 
        <v-progress-linear class="" background-color="#ddd" color="success" :value="progress" ></v-progress-linear>
        <v-form>
          <v-file-input
            accept="image/png, image/jpeg, image/jpg, image/gif"
            placeholder="Please pick your cover image"
            label="Profile Image"
            :rules="[rules.size,rules.required]"
            prepend-icon="mdi-camera"
            v-on:change="processFormImg"
            name="display"
            type="file"
          ></v-file-input>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  props: ["dialog"],

  data() {
    return {
      file:null,
      isProgress:true,
      rules: {
        length: v =>
          (v && v.length >= 6) || "password must be least 6 characters",
        required: v => !!v || "This field is required",
        size: v =>
          !v || v.size < 2000000 || "Image must not be greater than 2 MB"
      }
    };
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },

    processFormImg: function(file) {
      this.isProgress = true;
      this.$store.dispatch("uploadFile",file).then(res => {
        this.$emit("closeDialog");
        this.$emit("uploaded",{
          "url":res.data.url,
          "filename":res.data.filename
        })

      });
    }
  },
  computed: {
    progress(){
      return this.$store.getters.uploadProgress
    }
  },
  watch: {}
};
</script>

<style>
</style>