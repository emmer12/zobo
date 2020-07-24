<template>
  <v-container grid-list-xs>
    <v-layout column v-if="user">
        <div class="loader" v-show="loading">
          <v-progress-circular
            :size="25"
            :width="3"
            :rotate="-90"
            :value="30"
            color="dark"
            indeterminate
  
          >
            {{ value }}
          </v-progress-circular>
          updating...
        </div>
  
         <div class="edit-list">
        <v-card class="pa-4">
          <h4 class="text-block">Profile Image</h4>
          <div class="d-flex align-center justify-ceneter">
            <v-avatar
                size="100"
                color="white"
            >
            <img v-if="user.profile_image" :src="'http://localhost:8000/uploads/'+user.profile_image" alt="alt" />
            <v-icon size="100">mdi-account-circle-outline</v-icon>
            </v-avatar><br>
            <v-btn fab  color="white" small @click="openEdit('password',user.password)">
              <v-icon color="grey">edit</v-icon>
            </v-btn>

          </div>
        </v-card>
      </div>


      <div class="edit-list">
        <v-card class="pa-4">
          <h4 class="text-block">Firstname</h4>
          <v-text-field
            label="Firstname"
            id="id"
            :value="user.firstname"
            v-model="user.firstname"
            @blur="val=>{updateField('firstname',val)}"
            solo
          ></v-text-field>
        </v-card>
      </div>

      
      <div class="edit-list">
        <v-card class="pa-4">
          <h4 class="text-block">Lastname</h4>
          <v-text-field
            @blur="val=>{updateField('lastname',val)}"
            label="Lastname"
            id="id"
            v-model="user.lastname"
            :value="user.lastname"
            solo
          ></v-text-field>
        </v-card>
      </div>



      <div class="edit-list">
        <v-card class="pa-4">
          <h4 class="text-block">Username</h4>
          <v-text-field
          @blur="val=>{updateField('username',val)}"
            label="Username"
            v-model="user.username"
            id="id"
            :value="user.username"
            solo
          ></v-text-field>
        </v-card>
      </div>

      <div class="edit-list">
        <v-card class="pa-4">
          <h4 class="text-block">Email</h4>
          <v-text-field
          @blur="val=>{updateField('email',val)}"
            v-model="user.email"
            label="Email"
            id="id"
            :value="user.email"
            type="email"
            solo
          ></v-text-field>
        </v-card>
      </div>

      <div class="edit-list">
        <v-card class="pa-4">
          <h4 class="text-block">Phone Number</h4>
          <v-text-field
          @blur="val=>{updateField('phoneNo',val)}"
            label="Phone Number"
            id="id"
            :value="user.phoneNo"
            type="number"
            solo
          ></v-text-field>
        </v-card>
      </div>



        
        <div class="edit-list">
        <v-card class="pa-4">
          <h4 class="text-block"><v-icon color="red">mdi-password</v-icon> Change Password</h4>
          <div class="d-flex align-center">
            <span class="text-block">(Encrypted)</span>
            <v-spacer></v-spacer>
            <v-btn fab  color="white" small @click="openEdit('password',user.password)">
              <v-icon color="grey">edit</v-icon>
            </v-btn>
          </div>
        </v-card>
      </div>

      <!-- <edit-dialog :value="value" :field="field" :dialog="dialog" @closeDialog="dialog=!dialog;value='';field=''"></edit-dialog> -->
      



    </v-layout>

    <div v-else>
         <v-skeleton-loader table class="mx-auto md3" min-width max-width="*80%" type="list-item-three-line"></v-skeleton-loader>
    </div>
  </v-container>
</template>

<script>
export default {
  inject: ['theme'],
  components: {
  },
  data() {
    return {
       value:"",
       field:"",
       dialog:false,
       loading:false,
       updated:false,
    }
  },
  methods: {
     openEdit(field,value){
       this.field=field;
       this.value=value;
       this.dialog=true
     },
     updateField(field,e){
       let data={}
       data.field=field;
       data.value=e.target.value
       this.loading=true
       this.$store.dispatch('updateUser',data).then(()=>{
         this.loading=false
         this.$toast.success({
              title: "Success",
              message: "Profile updated"
            });
       }).catch(()=>{
         this.$toast.error({
              title: "Update fale",
              message: "something went wrong"
            });
         this.loading=false
       })
     }
  },
  computed: {
    user(){
      return this.$store.getters.user
    }
  },
};
</script>

<style lang="scss">
.edit-list {
  width: 70%;
  margin:10px
}

.loader{
  position:fixed;
  right:10px;
  z-index: 999;
  padding:10px

}

@media screen and (max-width: 640px) {
  .edit-list {
    width: 100%;
  }
}
</style>