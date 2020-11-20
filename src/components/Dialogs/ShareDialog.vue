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
        <div class="pt-5 mx-5 text-center">
          <p class="title">We are super excited to join you in celebrating your ________ today! Share your links on all your social media to recieve some <v-icon color="primary">mdi-hand-heart</v-icon></p>
        </div>
        <div class="d-flex justify-center pa-10 s-con">

          
          <ShareNetwork
            network="facebook"
            :url="zobo.link"
            :title="zobo.title"
            :description="zobo.description"
            hashtags="Cellepay,Celebrate,Birthday"
          >
            <v-btn class="mr-4" icon color="#3b5998" fab>
              <v-icon size="40">mdi-facebook</v-icon>
            </v-btn>
          </ShareNetwork>
          <ShareNetwork
            network="linkedIn"
            :url="'http://cellepay.com'"
          >
            <v-btn class="mr-4" icon color="#bc2a8d" fab>
              <v-icon size="40">mdi-linkedin</v-icon>
            </v-btn>
          </ShareNetwork>
          <ShareNetwork
            network="twitter"
            :url="zobo.link"
            :title="zobo.title "
            hashtags="Cellepay,Celebrate,Birthday"
          >
            <v-btn class="mr-4" icon color="#00ACEE" fab>
              <v-icon size="40">mdi-twitter</v-icon>
            </v-btn>
          </ShareNetwork>
          <ShareNetwork
            network="whatsapp"
            :url="zobo.link"
            :title="zobo.title "
            :description="zobo.description"
          >
            <v-btn class="mr-4" icon color="green" fab>
              <v-icon size="40">mdi-whatsapp</v-icon>
            </v-btn>
          </ShareNetwork>

          <v-btn class="mr-4" icon color="green" @click="copyLink" fab>
             <v-icon>mdi-content-copy</v-icon>
          </v-btn>


        </div>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  props: ["dialog", "zobo"],

  data() {
    return {};
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
    copyLink(){
      this.$emit("copyLink");
      this.$emit("closeDialog");
    }
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
   @media (max-width: 460px){
     .s-con{
       padding: 0px !important;
     }
   }
</style>