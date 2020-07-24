<template>
  <v-container grid-list-xs>
    <v-layout column v-if="user">
         <div class="edit-list">
        <v-card class="pa-4">
          <h4 class="text-block">Profile Image</h4>
          <div class="d-flex align-center justify-ceneter">
            <v-avatar
                size="100"
                color="white"
            >
            <img v-if="user" :src="'http://localhost:8000/uploads/'+user.profile_image" alt="alt" />
            </v-avatar>
            <v-spacer></v-spacer>
            <v-btn fab rounde color="white" small   @click="openEdit('profile_image',user.profile_image)">
              <v-icon color="grey">edit</v-icon>
            </v-btn>
          </div>
        </v-card>
      </div>


      <div class="edit-list">
        <v-card class="pa-4">
          <h4 class="text-block">Fullname</h4>
          <div class="d-flex align-center">
            <span class="text-block">{{user.fullname}}</span>
            <v-spacer></v-spacer>
            <v-btn fab rounde color="white" small  @click="openEdit('fullname',user.fullname)">
              <v-icon color="grey">edit</v-icon>
            </v-btn>
          </div>
        </v-card>
      </div>

      <div class="edit-list">
        <v-card class="pa-4">
          <h4 class="text-block">Username</h4>
          <div class="d-flex align-center">
            <span class="text-block">{{user.username}}</span>
            <v-spacer></v-spacer>
            <v-btn fab rounde color="white" small @click="openEdit('username',user.username)">
              <v-icon color="grey">edit</v-icon>
            </v-btn>
          </div>
        </v-card>
      </div>

       <div class="edit-list">
        <v-card class="pa-4">
          <h4 class="text-block">Bio</h4>
          <div class="d-flex align-center">
            <span class="text-block">{{user.bio || "(Empty) Please Write something about yourself"}}</span>
            <v-spacer></v-spacer>
            <v-btn fab rounde color="white" small @click="openEdit('bio',user.bio)">
              <v-icon color="grey">edit</v-icon>
            </v-btn>
          </div>
        </v-card>
      </div>


       <div class="edit-list">
        <v-card class="pa-4">
          <h4 class="text-block">Specialized in</h4>
          <div class="d-flex align-center">
            <span class="text-block">{{user.specilized_in}}</span>
            <v-spacer></v-spacer>
            <v-btn fab rounde color="white" small @click="openEdit('specialized_in',user.specialized_in)">
              <v-icon color="grey">edit</v-icon>
            </v-btn>
          </div>
        </v-card>
      </div>

      <v-divider></v-divider>
      <span class="title ma-4">Address</span>

        <div class="edit-list">
        <v-card class="pa-4">
          <h4 class="text-block">Email Address </h4>
          <div class="d-flex align-center">
            <span class="text-block">{{user.email}}</span>
            <v-spacer></v-spacer>
            <v-btn fab rounde color="white" small @click="openEdit('email',user.email)">
              <v-icon color="grey">edit</v-icon>
            </v-btn>
          </div>
        </v-card>
      </div>


      <div class="edit-list">
        <v-card class="pa-4">
          <h4 class="text-block">Phone Number </h4>
          <div class="d-flex align-center">
            <a :href="'tel:'+user.phoneNo" class="inherit"><span class="text-block black--text text-weight-bold">0{{user.phoneNo || "(Empty)"}}</span></a>
            <v-spacer></v-spacer>
            <v-btn fab rounde color="white" small @click="openEdit('phoneNo',user.phoneNo)">
              <v-icon color="grey">edit</v-icon>
            </v-btn>
          </div>
        </v-card>
      </div>

      
        <div class="edit-list">
        <v-card class="pa-4">
          <h4 class="text-block"><v-icon>my_location</v-icon> Location </h4>
          <div class="d-flex align-center">
            <span class="text-block">{{user.location || "(Empty)" }}</span>
            <v-spacer></v-spacer>
            <v-btn fab rounde color="white" small @click="openEdit('location',user.location)">
              <v-icon color="grey">edit</v-icon>
            </v-btn>
          </div>
        </v-card>
      </div>


      
        <div class="edit-list">
        <v-card class="pa-4">
          <h4 class="text-block"><v-icon color="primary">mdi-facebook</v-icon> Facebook Link </h4>
          <div class="d-flex align-center">
            <a :href="user.facebook" target="_blank"><span class="text-block black--text"><v-icon>link</v-icon> {{user.facebook || "(Empty)" }}</span></a>
            <v-spacer></v-spacer>
            <v-btn fab rounde color="white" small @click="openEdit('facebook',user.facebook)">
              <v-icon color="grey">edit</v-icon>
            </v-btn>
          </div>
        </v-card>
      </div>


      
        <div class="edit-list">
        <v-card class="pa-4">
          <h4 class="text-block"><v-icon color="blue">mdi-twitter</v-icon> Tweeter Link</h4>
          <div class="d-flex align-center">
             <a :href="user.twitter" target="_blank"><span class="text-block black--text"><v-icon>link</v-icon>  {{user.twitter || "(Empty)" }}</span></a>
            <v-spacer></v-spacer>
            <v-btn fab rounde color="white" small @click="openEdit('twitter',user.twitter)">
              <v-icon color="grey">edit</v-icon>
            </v-btn>
          </div>
        </v-card>
      </div>

      
        <div class="edit-list">
        <v-card class="pa-4">
          <h4 class="text-block"><v-icon color="red">mdi-youtube</v-icon> Youtube Channel</h4>
          <div class="d-flex align-center">
            <a :href="user.youtube" target="_blank"><span class="text-block black--text"><v-icon>link</v-icon> {{user.youtube || "(Empty)" }}</span></a>
            <v-spacer></v-spacer>
            <v-btn fab rounde color="white" small @click="openEdit('youtube',user.youtube)">
              <v-icon color="grey">edit</v-icon>
            </v-btn>
          </div>
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



      <div class="edit-list">
        <v-card class="pa-4">
          <h4 class="text-block"><v-icon color="red">mdi-password</v-icon>My Tunner Link</h4>
          <div class="d-flex align-center">
             <router-link :to="'/t/@'+user.username">http://localhost:8080/t/@{{user.username}}</router-link>
            <v-spacer></v-spacer>
            <v-btn  color="white" small>
              <v-icon color="grey" >mdi-content-copy</v-icon>
            </v-btn>
          </div>
        </v-card>
      </div>


      <edit-dialog :value="value" :field="field" :dialog="dialog" @closeDialog="dialog=!dialog;value='';field=''"></edit-dialog>
      



    </v-layout>

    <div v-else>
       
         <v-skeleton-loader table class="mx-auto md3" min-width max-width="*80%" type="list-item-three-line"></v-skeleton-loader>
    </div>
  </v-container>
</template>

<script>
import EditDialog from './../Dialogs/EditDialog'
export default {
  inject: ['theme'],
  components: {
    EditDialog,
  },
  data() {
    return {
       value:"",
       field:"",
       dialog:false,
    }
  },
  methods: {
     openEdit(field,value){
       this.field=field;
       this.value=value;
       this.dialog=true
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

@media screen and (max-width: 640px) {
  .edit-list {
    width: 100%;
  }
}
</style>