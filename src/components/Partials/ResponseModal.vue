<template>
  <div>
    <v-btn color="success" outlined rounded block @click="dialog=!dialog">Respond</v-btn>
    <v-dialog v-model="dialog" persistent max-width="500">
      <v-card>
        <v-card-title class="headline">Respond to Challenge</v-card-title>
        <v-card-text>
          <v-form ref="form" enctype="multipart/formdata">
            <v-alert
              v-for="(error, index) in serverErrors"
              :key="index"
              type="error"
              :value="error"
            >{{error.msg}}</v-alert>
            <v-textarea
              row="2"
              label="Comment"
              name="name"
              v-model="newPost.comment"
              textarea
              counter="100"
              rows="2"
              :rules="[rules.required,rules.length]"
              maxlength="100"
            ></v-textarea>

            <v-file-input
              accept="video/*"
              placeholder="Upload Video"
              label="Upload Video"
              :rules="[rules.size,rules.required]"
              prepend-icon="mdi-video"
              v-on:change="processFormVid"
              name="video"
            ></v-file-input>
            <br />
            <v-btn :loading="loading" color="success" outlined @click="sendResponse">Post</v-btn>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click.native="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["post_id"],
  data() {
    return {
      newPost: {
        comment: "",
        video: ""
      },
      dialog: false,
      loading: false,
      serverErrors: null,
      rules: {
        size: v =>
          !v || v.size > 2000000 || "Image must not be greater than 2 MB",
        length: v =>
          (v && v.length <= 150) || "password must be least 100 characters",
        required: v => !!v || "This field is required"
      }
    };
  },
  methods: {
    processFormVid(file) {
      this.newPost.video = file;
    },
    sendResponse() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.newPost.feed_id=this.post_id;
        this.$store
          .dispatch("responsePost", this.newPost)
          .then(() => {
            this.loading = false;
           this.serverErrors=null;
           this.dialog=false;
           this.newPost = {};
           this.$emit('responded');
           this.$toast.success({
              title: "Response Created",
              message: "Response successfully created "
            });
          })
          .catch(err => {
            this.loading = false;

            this.error = true;
            this.serverErrors = null || Object.values(err.response.data.msg);
            console.log(this.serverErrors);

            this.$toast.error({
              title: "Server Error",
              message: "Oops! something went wrong"
            });
          });
      }
    }
  }
};
</script>

<style>
</style>