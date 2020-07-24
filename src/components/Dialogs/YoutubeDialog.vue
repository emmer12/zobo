<template>
  <v-container grid-list-md>
    <v-dialog
      v-model="dialog"
      persistent
      :overlay="false"
      transition="dialog-transition"
    >
      <v-card flat class="pa-3">
         <v-toolbar dense>
          <span class="title">{{title }}</span>
          <v-spacer></v-spacer>
          <v-btn icon color="red" @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
          <iframe :src='"https://www.youtube.com/embed/"+videoId' width="100%" height="350"  frameborder="0"></iframe>
           <span class="card-title">{{title}}</span>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  props: ["videoId","title",'dialog'],
  data() {
    return {
    };
  },
methods: {
    closeDialog(){
        this.videoId=""
        this.$emit("closeDialog");
    }
},
watch: {
  videoId(e){
    this.videoId=e  
  }
},
};
</script>

<style>
</style>