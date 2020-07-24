<template>
  <div class="pa-4">
    <div class="d-flex justify-center align-center" style v-if="zobo">
      <v-layout row wrap>
        <v-flex md6 xs12>
          <div style="width:100%">
            <div>
              <img :src="zobo.cover" width="100%" />
            </div>
          </div>
        </v-flex>
        <v-flex md6 xs12>
          <div class="pa-4">
            <v-btn block color rounded>{{zobo.title}}</v-btn>
            <p class="py-4">{{zobo.description}}</p>
            <v-btn color="grey" rounded outlined>
              Min : $
              <strong>{{zobo.min}}</strong>
            </v-btn>
            <v-btn color="primary" class="mx-4" rounded outlined>
              Balance : $
              <strong>{{zobo.balance}}</strong>
            </v-btn>
            <br />
            <div class="d-flex" >
                <v-text-field
              class="mt-5"
              solo
              label="label"
              :value="zobo.link"
              disabled
              prepend-inner-icon="mdi-link"
            ></v-text-field>
            <div class="mt-5 ml-2 pa-2 elevation-1" style="height:45px;cursor:pointer" @click="copyText"><v-icon >mdi-content-copy</v-icon> </div>
            </div>

            <v-btn color="primary" rounded @click="dialog=true">
              Share your Link 
              <v-icon right>mdi-share</v-icon>
            </v-btn>
          </div>
        </v-flex>
      </v-layout>
    </div>
    <share-dialog :dialog="dialog" @closeDialog="dialog=!dialog;value='';field=''"></share-dialog>
  </div>
</template>

<script>
import ShareDialog from "../Dialogs/ShareDialog";
export default {
  components: {
    ShareDialog
  },
  methods: {
    getZobo() {
      this.$store.dispatch("getZoboDetails", this.$route.params.id);
    },
    copyText(){
      alert()
    }
  },
  mounted() {
    this.getZobo();
  },
  data() {
    return {
      dialog: false
    };
  },
  computed: {
    zobo() {
      return this.$store.getters.zobo;
    }
  }
};
</script>

<style>
</style>