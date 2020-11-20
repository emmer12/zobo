<template>
    <v-container grid-list-lg>
         <v-layout row wrap justify-center>
         <div class="justify-center">
               <div class="special-content">
                   <div>
                       <h1 class="title">Sepcial Days</h1>
                       <span class="primary--text">We will be glad to know your special days</span>
                   </div><br>

                   <div>
                       <v-form>
                           <v-select
                               :items="specials"
                               v-model="special.name"
                               label="Special"
                               editable
                               outlined

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
                            <v-btn   :loading="loading" @click="saveSpecial('add')" outlined color="primary" dark>Save and Add More</v-btn>
                            <v-btn   :loading="cloading"  @click="saveSpecial('continue')"  color="primary" class="float-right" dark>Save and Continue</v-btn>
                          </v-flex>


                       </v-form>
                   </div>
               </div>

              <special class="special"></special>
         </div>
         </v-layout>
    </v-container>
</template>

<script>
import Special from '../svg/special'
export default {
components:{
    Special
},
data() {
    return {
        special:{
        name:'',
        date:'',
       },
    custom:'',
      loading:false,
      cloading:false,
       menu:false,
       specials:['Bithday','Wedding','Graduaion']   
        }
},
methods: {
    addOther(){
        this.specials.push(this.custom)
    },
   saveSpecial(action){
       this.loading=(action == 'add') ? true : false
       this.cloading=(action == 'add') ? false : true
     this.$store.dispatch('addSpecial',this.special).then(()=>{
        this.special={}
        if (action==="add") {
        this.loading=false
            this.$toast.success({
                title: "Successfully Added",
                message:"You have successfully added a special day"
              });
        }else{
            this.cloading=false
             this.$toast.success({
                title: "Successfully Added",
                message:"You have successfully added a special day"
              });
            this.$router.push({name:'dashboard'})
        }
    }).catch(()=>{
        this.loading=false
        this.$toast.error({
                title: "Server Error",
                message:"Opps! something went wrong"
            });
    })
   }
},
}
</script>

<style lang="scss">
  .special{
      opacity:0.5;
      position: fixed;
      left:50%;
      top:40%;
      transform: translate(-50%,-30%);
      z-index: 0;
  }
  .special-content{
      position:relative;
      z-index: 1;
      background: rgba($color: #fff, $alpha: 0.7);
      padding: 20px;
      top: 100px;
      width:600px;
  }

  @media (max-width:600px) {
 .special-content{
      width:100%
  }

  }
</style>