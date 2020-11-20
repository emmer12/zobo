<template>
  <v-layout row justify-center>
    <v-dialog
      v-if="['special'].includes(field)"
      v-model="dialog"
      persistent
      max-width="500"
    >
      <v-card>
        <v-toolbar dense>
          <span class="title">Your Special day</span>
          <v-spacer></v-spacer>
          <v-btn icon color="red" @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <br>
        <v-card-text style="text-align:center">
          <v-form ref="form">
                           <v-select
                               :items="specials"
                               v-model="special.name"
                               label="Special"
                               editable
                               outlined
                               :placeholder="value"

                           >
                           
                            <template v-slot:append-item >
                                  <v-text-field
                                     ma-4
                                     v-model="custom"
                                      name="name"
                                      label="Custom"
                                      id="id"
                                      solo
                                      @blur="addOther"
                                  ></v-text-field>
                            </template>


                           </v-select>
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
                                    label="Pick Date"
                                    v-model="special.date"
                                    prepend-inner-icon="event"
                                    readonly
                                    v-on="on"
                                    outlined                           
                                ></v-text-field>
                                </template>
                                <v-date-picker
                                ref="picker"
                                v-model="special.date"
                                @change="$refs.menu.save(special.date)"
                                :min="new Date().toISOString().substr(0, 10)"

                                
                                ></v-date-picker>
                            </v-menu>

                          <v-flex>
                            <v-btn   :loading="loading" @click="saveSpecial()" outlined color="primary" dark>Add</v-btn>
                          </v-flex>


                       </v-form>
        </v-card-text>
       </v-card>


    </v-dialog>



    <v-dialog
      v-if="['password'].includes(field)"
      v-model="dialog"
      persistent
      max-width="500"
    >
      <v-card>
        <v-toolbar dense>
          <span class="title">Change password</span>
          <v-spacer></v-spacer>
          <v-btn icon color="red" @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <br>
        <v-card-text style="text-align:center">
          <v-form ref="form">
            <v-alert type="error" :value="!!serverErrors">
              {{serverErrors}} 
            </v-alert>
              <v-text-field
                v-model="newPass.password"
                name="password"
                label="Old Password"
                hint="At least 6 characters"
                min="6"
                :append-icon="val ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (val = !val)"
                :rules="[rules.required]"
                :type="val ? 'password' : 'text'"
                @click:append="() => (val = !val)"
                solo
              ></v-text-field>


              <v-text-field
                v-model="newPass.password_new"
                name="password"
                label="Enter your New password"
                hint="At least 6 characters"
                min="6"
                :append-icon="val ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (val = !val)"
                :rules="[rules.required,rules.length]"
                :type="val ? 'password' : 'text'"
                @click:append="() => (val = !val)"
                solo
              ></v-text-field>

            <v-btn rounded :loading="loading" color="success" class="mr-4" @click="updateProfile">Update</v-btn>
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
       specials:['Birthday','Wedding','Graduaion'],   
       special:{},
        update:{},
        newPass:{},
        rules: {
        length: v =>
          (v && v.length >= 6) || "password must be least 6 characters",
        required: v => !!v || "This field is required",
         },
      loading:false,
      open: true,
      serverErrors:false,
      custom:"",
      val:true
    };
  },
  methods: {
    addOther(){
        this.specials.push(this.custom)
    },
    closeDialog() {
      this.update={},
      this.newPass={},
      this.serverErrors=false
      this.$emit("closeDialog");
    },
     saveSpecial(){
     this.loading=true;  
     this.$store.dispatch('addSpecial',this.special).then(()=>{
            this.special={}
            this.closeDialog()
            this.loading=false
            this.$store.dispatch('getUser')
             this.$toast.success({
                title: "Successfully Added",
                message:"You have successfully added a special day"
              });
    }).catch(()=>{
       this.loading=false
        this.$toast.error({
                title: "Server Error",
                message:"Opps! something went wrong"
            });
    })
   },
    updateProfile(){
       if (this.$refs.form.validate()) {
           this.loading=true
           this.newPass.field='password'
        this.$store.dispatch("updateUser",this.newPass).then(()=>{
                this.closeDialog()
                this.loading=false;
                this.$toast.success({
                title: "Updated",
                message: "You have successfully updated your password"
            });
            this.update={}

        }).catch((err)=>{
          this.loading=false
          this.serverErrors=err.response.data.msg
        })
       }
    }
  }
};

</script>

<style>
</style>