<template>
  <v-layout row justify-center>
    <v-dialog
      v-if="['username','fullname','location','facebook','twitter','youtube'].includes(field)"
      v-model="dialog"
      persistent
      max-width="500"
    >
      <v-card>
        <v-toolbar dense>
          <span class="title">{{field }}</span>
          <v-spacer></v-spacer>
          <v-btn icon color="red" @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text style="text-align:center">
          <v-form ref="form">
            <v-alert type="error" :value="!!serverErrors">
              {{serverErrors}} 
            </v-alert>
            <v-text-field :label="field" :placeholder="value" v-model="update.value" :rules="[rules.required]"></v-text-field>

            <v-btn rounded :loading="loading" color="success" class="mr-4" @click="updatePeofile">Update</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Bio Dialog -->

    <v-dialog v-if="field=='bio'" v-model="dialog" persistent max-width="500">
      <v-card>
        <v-toolbar dense>
          <span class="title">{{field }}</span>
          <v-spacer></v-spacer>
          <v-btn icon color="red" @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text style="text-align:center">
          <v-form  ref="form">
              <v-alert type="error" :value="!!serverErrors">
              {{serverErrors}} 
            </v-alert>
            <v-textarea
              textarea
              counter="100"
              rows="2"
              :label="field"
              :placeholder="value"
              :rules="[rules.required]"
              maxlength="100"
              v-model="update.value"
            ></v-textarea>

            <v-btn rounded :loading="loading" color="success" class="mr-4" @click="updatePeofile">Update</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Email Dialog -->

    <v-dialog v-if="field=='email'" v-model="dialog" persistent max-width="500">
      <v-card>
        <v-toolbar dense>
          <span class="title">{{field }}</span>
          <v-spacer></v-spacer>
          <v-btn icon color="red" @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text style="text-align:center">
          <v-form ref="form"> 
              <v-alert type="error" :value="!!serverErrors">
              {{serverErrors}} 
            </v-alert>
            <v-text-field :label="field" v-model="update.value" :placeholder="value" :rules="[rules.required,rules.email]"></v-text-field>

            <v-btn rounded :loading="loading" color="success" class="mr-4" @click="updatePeofile">Update</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>


    <!-- Email Dialog -->

    <v-dialog v-if="field=='phoneNo'" v-model="dialog" persistent max-width="500">
      <v-card>
        <v-toolbar dense>
          <span class="title">{{field }}</span>
          <v-spacer></v-spacer>
          <v-btn icon color="red" @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text style="text-align:center">
          <v-form ref="form">
              <v-alert type="error" :value="!!serverErrors">
              {{serverErrors}} 
            </v-alert>
            <v-text-field :label="field" v-model="update.value" :placeholder="value" type="number" :rules="[rules.required]"></v-text-field>

            <v-btn rounded :loading="loading" color="success" class="mr-4" @click="updatePeofile">Update</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>



       <!-- Specialized Dialog -->

    <v-dialog v-if="field=='specialized_in'" v-model="dialog" persistent max-width="500">
      <v-card>
        <v-toolbar dense>
          <span class="title">{{field }}</span>
          <v-spacer></v-spacer>
          <v-btn icon color="red" @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text style="text-align:center">
          <v-form>
            <v-alert type="error" :value="!!serverErrors">
              {{serverErrors}} 
            </v-alert>
          <v-select
                v-model="update.specilized_in"
                :items="['Guitar','Piano']"
                :rules="[v => !!v || 'Item is required']"
                label="Specialized In"
                required
              ></v-select>

            <v-btn rounded :loading="loading" color="success" class="mr-4" @click="updatePeofile">Update</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>




    
       <!-- Profile -->

    <v-dialog v-if="field=='profile_image' " v-model="dialog" persistent max-width="500">
      <v-card>
        <v-toolbar dense>
          <span class="title">{{field }}</span>
          <v-spacer></v-spacer>
          <v-btn icon color="red" @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text style="text-align:center">
          <v-form ref="form">
            <v-alert type="error" :value="!!serverErrors">
              {{serverErrors}} 
            </v-alert>
            <v-file-input
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Please pick your profile image"
                label="Profile Image"
                :rules="[rules.size,rules.required]"
                prepend-icon="mdi-camera"
                v-on:change="processFormImg"
                name="display"
              ></v-file-input>

            <v-btn rounded :loading="loading" color="success" class="mr-4" @click="uploadImage">Update</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>





    <!-- Password Change Dialog -->

    <v-dialog v-if="field=='password'" v-model="dialog" persistent max-width="500">
      <v-card>
        <v-toolbar dense>
          <span class="title">{{field }}</span>
          <v-spacer></v-spacer>
          <v-btn icon color="red" @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text style="text-align:center">
          <v-form ref="form">
              <v-alert type="error" :value="!!serverErrors">
              {{serverErrors}} 
            </v-alert>
            <v-text-field
              v-model="update.value"
              name="password"
              label="Enter your old password"
              hint="At least 6 characters"
              min="6"
              :append-icon="open ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (open = !open)"
              :rules="[rules.required,rules.length]"
              :type="open ? 'password' : 'text'"
              @click:append="() => (open = !open)"
            ></v-text-field>

            <v-text-field
              v-model="update.password_new"
              name="password"
              label="Enter New password"
              hint="At least 6 characters"
              min="6"
              :append-icon="open ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (open = !open)"
              :rules="[rules.required,rules.length]"
              :type="open ? 'password' : 'text'"
              @click:append="() => (open = !open)"
            ></v-text-field>

            <v-btn rounded :loading="loading" color="success" class="mr-4" @click="updatePeofile">Update</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    
  </v-layout>
</template>



<script>
export default {
  props: ["value", "field", "dialog"],
  data() {
    return {
        update:{},
        rules: {
        email: v => /.+@.+/.test(v) || "E-mail must be valid",
        length: v =>
          (v && v.length >= 6) || "password must be least 6 characters",
        required: v => !!v || "This field is required",
        size: v =>
          !v || v.size < 2000000 || "Image must not be greater than 2 MB",
         },
      loading:false,
      open: true,
      serverErrors:false,
    };
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
      this.update={},
      this.serverErrors=false
    },
    processFormImg(file) {
      this.update.profile_image = file;
    },
    uploadImage(){
       if (this.$refs.form.validate()) {
        this.loading=true
        this.$store.dispatch("uploadFile",this.update).then(()=>{
            this.$store.dispatch('getUser');
             this.$emit("closeDialog")
                this.loading=false;
                this.$toast.success({
                title: "Updated",
                message: "You have successfully updated your profile"
            });
            this.update={}

        }).catch((err)=>{
          this.serverErrors=err.response.data.msg
          this.loading=false
        })
       }
    },
    updatePeofile(){
       if (this.$refs.form.validate()) {
              this.loading=true
        this.update.field=this.field
        this.$store.dispatch("updateProfile",this.update).then(()=>{
            this.$store.dispatch('getUser');
             this.$emit("closeDialog")
                this.loading=false;
                this.$toast.success({
                title: "Updated",
                message: "You have successfully updated your profile"
            });
            this.update={}

        }).catch((err)=>{
          this.serverErrors=err.response.data.msg
          this.loading=false
        })
       }
    }
  }
};

</script>

<style>
</style>