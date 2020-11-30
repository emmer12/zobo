<template>
  <v-container grid-list-xs>

     <div class="header">
          <h4 class="">Profile Settings </h4>
      </div>
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
            <img v-if="user.profile_image" ref="img" :src="user.profile_image || 'http://localhost:3000/images/'+user.profile_image" alt="alt" />
            </v-avatar><br>
            <v-spacer></v-spacer>
            <v-btn fab  color="white" small @click="openDialog" >
              <v-icon color="grey">edit</v-icon>
            </v-btn>
          </div>
        </v-card>
      </div>
      <upload-dialog :dialog='dialog' @closeDialog="dialog=!dialog;" @uploaded="setImage" :from="'settings'"></upload-dialog>


      <div class="edit-list">
        <v-card class="pa-4">
          <h4 class="text-block">Firstname</h4>
          <v-text-field
            label="Firstname"
            id="id"
            :autofill="false"
            :value="user.firstname"
            v-model="user.firstname"
            :rules="[rules.required]"
            @blur="val=>{updateField('firstname',val)}"
            @focus="inputF"
            solo
          ></v-text-field>
        </v-card>
      </div>

      
      <div class="edit-list">
        <v-card class="pa-4">
          <h4 class="text-block">Lastname</h4>
          <v-text-field
            @blur="val=>{updateField('lastname',val)}"
            @focus="inputF"
            label="Lastname"
            :autofill="false"
            id="id"
            v-model="user.lastname"
            :value="user.lastname"
            solo
            :autocomplete="false"
          ></v-text-field>
        </v-card>
      </div>



      <div class="edit-list">
        <v-card class="pa-4">
          <h4 class="text-block">Username</h4>
          <v-text-field
          @focus="inputF"
          @blur="val=>{updateField('username',val)}"
            label="Username"
            v-model="user.username"
            id="id"
            :value="user.username"
            :autofill="false"
            solo
            :autocomplete="false"

          ></v-text-field>
        </v-card>
      </div>

      <div class="edit-list">
        <v-card class="pa-4">
          <h4 class="text-block">Email</h4>
          <v-text-field
          @focus="inputF"
          @blur="val=>{updateField('email',val)}"
            v-model="user.email"
            label="Email"
            :autofill="false"
            id="id"
            :value="user.email"
            type="email"
            solo
            :autocomplete="false"

          ></v-text-field>
        </v-card>
      </div>

      <div class="edit-list">
        <v-card class="pa-4">
          <h4 class="text-block">Phone Number</h4>
          <v-text-field
          @focus="inputF"
          @blur="val=>{updateField('phoneNo',val)}"
            label="Phone Number"
            :autofill="false"
            id="id"
            :value="user.phoneNo"
            type="number"
            solo
            :autocomplete="false"
          ></v-text-field>
        </v-card>
      </div>


      
        <div class="edit-list">
        <v-card class="pa-4">
          <h4 class="text-block">Date of birth</h4>
         <v-menu
                ref="menu"
                :close-on-content-click="false"
                v-model="menu"
                transition="scale-transition"
                offset-y
                :nudge-right="40"
                min-width="290px"

              >
                <template v-slot:activator="{on}">
                  <v-text-field
                    :label="user.birthday"
                    @focus="inputF"
                    @blur="()=>{update('birthday',birthday)}"
                    v-model="birthday"
                    prepend-inner-icon="event"
                    readonly
                    v-on="on"
                    solo
                  ></v-text-field>
                </template>
                <v-date-picker
                  ref="picker"
                  v-model="birthday"
                  @change="$refs.menu.save(birthday)"
                  :min="new Date().toISOString().substr(0, 10)"
                ></v-date-picker>
              </v-menu>

              <v-btn color="success" @click="updateBirthDay('birthday',birthday)">Update date of birth {{birthday}}</v-btn>
        </v-card>
      </div>


    </v-layout>

    <div v-else>
         <v-skeleton-loader v-for="(item, index) in 3" :key="index" table class="mx-auto md3" min-width max-width="*80%" type="list-item-three-line"></v-skeleton-loader>
    </div>
  </v-container>
</template>

<script>
import UploadDialog from '../Dialogs/UploadDialog'
export default {

  inject: ['theme'],
  components: {
    UploadDialog
  },
  data() {
    return {
       value:"",
       field:"",
       dialog:false,
       loading:false,
       updated:false,
       menu: false,
       newUser:'',
       edited:false,
       birthday:'',
       fValue:'',
       rules: {
        email: v => /.+@.+/.test(v) || "E-mail must be valid",
        required: v => !!v || "This field is required"
      }
    }
  },
  watch: {
     deep:true
  },
  methods: {
    openDialog(){
      this.dialog=true
    },
     openEdit(field,value){
       this.field=field;
       this.value=value;
       this.dialog=true
     },
     inputF(e){
         this.fValue=e.target.value;
     },
     updateField(field,e){
      // this.zobo.date=this.newZobo.date.length ? this.newZobo.date : this.zobo.date
         
      if (e.target.value !== this.fValue || field == "birthday"){
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

     updateBirthDay(field,val){
         this.$store.dispatch('updateUser',{field:'birthday',value:val}).then(()=>{
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
     },

     setImage(data){
       this.$refs.img.src=data.url
       this.updateField('profile_image',{target:{value:data.url}})
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