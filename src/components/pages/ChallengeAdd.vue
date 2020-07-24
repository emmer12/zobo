<template>
  <v-container grid-list-md >
    <v-card>
      <v-layout row wrap pl-4 align-center>
        <v-flex >
          <v-btn to="/profile" icon color="info">
            <v-icon to="/profile">mdi-arrow-left</v-icon>
          </v-btn>
        </v-flex>

        <!-- <v-spacer></v-spacer> -->
        <v-flex  pr-5 pa-2 text-right > 
          <v-btn :loading="loading" @click="processPost" color="success elevation-5" >
            <v-icon left>mdi-content-save-all</v-icon>Save
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card>

    <v-layout row wrap justify-center  v-if="!loadings">
      <v-flex md6 ma-5>
        <v-card class="pa-5">
          <v-card-title>Create New challenge</v-card-title>
          <v-form ref="form" enctype="multipart/formdata">
            <v-alert
              v-for="(error, index) in serverErrors"
              :key="index"
              type="error"
              :value="error"
            >{{error.msg}}</v-alert>
            <v-text-field
              :rules="[rules.required]"
              v-model="newPost.title"
              name="challenge-t"
              label="Title"
              id="title"
            ></v-text-field>
            <v-textarea
              row="2"
              label="Description"
              name="name"
              v-model="newPost.description"
              textarea
              counter="150"
              :rules="[rules.required,rules.length]"
              maxlength="150"
            ></v-textarea>
            <v-combobox
            v-model="newPost.tags"
            :items="tagItems"
            label="Select Or Add Tags"
            hint="To add, write tag and press enter"
            multiple
            chips

            ></v-combobox>
            <v-select
              :items="categories"
              v-model="newPost.category"
              label="Category"
              :rules="[rules.required]"
            ></v-select>

            <v-file-input
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Please pick your display image"
              label="Display Image"
              :rules="[rules.imgSize,rules.required]"
              prepend-icon="mdi-camera"
              v-on:change="processFormImg"
              name="display"
            ></v-file-input>

            <v-divider></v-divider>

            <v-file-input
              accept="video/*"
              placeholder="Upload Video"
              label="Upload Video"
              :rules="[rules.vidSize,rules.required]"
              prepend-icon="mdi-video"
              v-on:change="processFormVid"
              name="video"
            ></v-file-input>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      newPost: {
        title: "",
        description: "",
        category: "",
        display: "",
        video: "",
        tags:['music']
      },
      tagItems:['freestyle','music','style'],
      loading: false,
      error: false,
      serverErrors: null,
      rules: {
        imgSize: v =>
          !v || v.size < 1000000 || "Image must not be greater than 1 MB",
        vidSize: v =>
        !v || v.size < 10000000 || "Video must not be greater than 2 MB",
        length: v =>
          (v && v.length <= 150) || "password must be least 100 characters",
        required: v => !!v || "This field is required"
      }
    };
  },
  methods: {
    processFormImg(file) {
      this.newPost.display = file;
    },
    processFormVid(file) {
      // this.newPost.video = file;

      // let video=document.createElement('video');
      // video.prelode='metadata'
      
      // video.onloadedmetadata=function () {
      //   window.URL.revokeObjectURL(video.src)
      //   if (video.duration > 120) {
      //     console.log("invalid Video! video is greater than 2min");
      //   }

         this.newPost.video = file;

      // }

      
    },
    processPost: function() {
      //  this.$Progress.start();
       if (this.$refs.form.validate()) {
          this.loading = true;
          this.$store
            .dispatch("postDataChallenge", this.newPost)
            .then(() => {
              this.loading = false;
              //  this.$Progress.finish();
              this.newPost = {};
              this.$toast.success({
                title: "Challenge Created",
                message: "challenge successfully created "
              });
              this.$router.push({ name: "profile" });
            })
            .catch(err => {
              this.loading = false;

              //  this.$Progress.fail()
              this.error = true;
              this.serverErrors = null || Object.values(err.response.data.msg);
              console.log(this.serverErrors);

              this.$toast.error({
                title: "Server Error",
                message: "Oops! something went wrong"
              });
            });
            }
          else{
            return
          }
    }
  },
  created(){
    this.$store.dispatch('getCategory')
  },
  watch: {
    categories(e){
      console.log(e);
      
    }
  },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
  computed: {
    loadings() {
      return this.$store.getters.loading;
    },
    categories(){
      let cats=[]
      this.$store.getters.category.map(cat=>{
        cats.push(cat.name)
      })
        return cats
      
    }
  },
};
</script>

<style>
</style>
