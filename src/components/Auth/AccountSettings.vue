<template>
  <v-container grid-list-xs>
    <v-layout column v-if="user"> 
     
      <div class="special-con elevation-1">
        <div class="header">
          <h4 class="">Your special days </h4>
          </div>
        <div v-if="user.special">
          <div class="edit-list" v-for="(special, index) in specials" :key="index">
            <v-card class="pa-4 d-flex" >
               <div>
                  <h4 class="text-block">{{ special.name }}</h4>
                  <div>{{special.date | formatDate}}</div>
               </div>
                 <v-spacer></v-spacer>
                <v-btn fab color="white" small @click="deleteSp(special._id)">
                  <v-icon color="red">mdi-delete</v-icon>
                </v-btn>
            </v-card>
           
          </div>
        </div>

         <v-btn fab pl-2 color="white" small @click="openEdit('special',user.name)">
             <v-icon color="grey">add</v-icon>
        </v-btn>

      </div>

      <div class="edit-list">
        <v-card class="pa-4">
          <h4 class="text-block">
            <v-icon color="red">mdi-password</v-icon>Change Password
          </h4>
          <div class="d-flex align-center">
            <span class="text-block">(Encrypted)</span>
            <v-spacer></v-spacer>
            <v-btn fab color="white" small @click="openEdit('password',user.password)">
              <v-icon color="grey">edit</v-icon>
            </v-btn>
          </div>
        </v-card>
      </div>

      <ac-dialog :value="value" :field="field" :dialog="dialog" @closeDialog="dialog=!dialog;value='';field=''"></ac-dialog>
    </v-layout>

    <div v-else>
      <v-skeleton-loader
        table
        class="mx-auto md3"
        min-width
        max-width="*80%"
        type="list-item-three-line"
      ></v-skeleton-loader>
    </div>
  </v-container>
</template>

<script>

import AcDialog from '../Dialogs/AcDialog'


export default {
  inject: ["theme"],
  components: {
    AcDialog
  },
  data() {
    return {
      value: "",
      field: "",
      dialog: false,
      loading: false,
      updated: false,
      menu: false,
      newUser: "",
      edited: false
    };
  },
  watch: {
    user() {
      this.edited = true;
    },
    deep: true
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    deleteSp(id){
       let conf=confirm()

       if (conf) {
          this.loading=true
          this.$store.dispatch('deleteSp',id).then(()=>{
             this.$toast.success({
              title: "Deleted",
              message: "You have succesfully deleted created spacial day"
            });
          })
       }
    },
    openEdit(field, value) {
      this.field = field;
      this.value = value;
      this.dialog = true;
    },
    updateField(field, e) {
      if (this.edited) {
        let data = {};
        data.field = field;
        data.value = e.target.value;
        this.loading = true;
        this.$store
          .dispatch("updateUser", data)
          .then(() => {
            this.loading = false;
            this.$toast.success({
              title: "Success",
              message: "Profile updated"
            });
          })
          .catch(() => {
            this.$toast.error({
              title: "Update fale",
              message: "something went wrong"
            });
            this.loading = false;
          });
      }
    },

    setImage(data) {
      this.$refs.img.src = data.url;
      this.updateField("profile_image", { target: { value: data.url } });
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    specials() {
      return this.$store.getters.user.special;
    }
  }
};
</script>

<style lang="scss">
.special-con{
  padding:10px;
  width: 70%;
}
.edit-list {
  width: 100%;
  margin: 10px;
  padding-right:10px
}

.loader {
  position: fixed;
  right: 10px;
  z-index: 999;
  padding: 10px;
}

@media screen and (max-width: 640px) {
  .edit-list {
    width: 100%;
  }
  .special-con{
  width: 100%;
}
}
</style>