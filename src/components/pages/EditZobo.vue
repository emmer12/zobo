<template>
  <div class="">
      <div class="d-flex justify-center align-center" style="">
        <div class="create-zobo">
            <v-form ref="form">


          <v-select
            :items="['Buy me','Celebrate me']"
            v-model="zobo.celep"
            label="What are you up to?"
            solo
            hint=""
            value="Buy me"
          ></v-select>

            <div style="position:relative" v-if="zobo.celep=='Buy me'">
              <input
              name="name"
              id="id"
              placeholder="What do you want people to buy for you?"
              v-model="zobo.title"
              class="elevation-1 custom-input"
             v-on:change='wait'
            />
            <span class="placeh">Buy me</span>
            </div>


            <v-select
              v-if="zobo.celep=='Celebrate me'"
              :items="['Birthday','Wedding','Graduation']"
              v-model="zobo.title"
              label="What are you celebrating?"
              hint="Tell us what you are celebrating"
              v-on:change="(val)=>handleChange(val)"
              solo
            ></v-select>
            

            


            <div class="auto-complete"  v-if="zobo.celep=='Celebrate me'">
               <v-btn color="" v-for="(custom, index) in fCustomText" :key="index" outlined rounded small @click="setVal(custom.msg)"> {{custom.msg}} </v-btn>              
            </div>

            <v-textarea
              row="2"
              :label="zobo.description"
              name="name"
              v-model="zobo.description"
              textarea
              counter="100"
              rows="2"
              solo
              :rules="[rules.required,rules.length]"
              maxlength="100"
            ></v-textarea>

          
            <v-text-field
              name="name"
              :label="zobo.min"
              id="id"
              type="number"
              v-model="zobo.min"
              :prepend-inner-icon="user.currency=='USD' ? 'mdi-currency-usd' : 'mdi-currency-ngn'"
              solo
            ></v-text-field>


             <v-menu
                v-if="zobo.celep=='Celebrate me'"
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
                    :label="zobo.date"
                    v-model="newZobo.date"
                    prepend-inner-icon="event"
                    readonly
                    v-on="on"
                    solo
                  ></v-text-field>
                </template>
                <v-date-picker
                  ref="picker"
                  v-model="newZobo.date"
                  @change="$refs.menu.save(newZobo.date)"
                  :min="new Date().toISOString().substr(0, 10)"
                ></v-date-picker>
              </v-menu>

              <v-btn v-if="!src.length" color="" class="my-5" @click="openUpload">Upload File</v-btn>

              <div v-else class="preview">
                <v-icon @click="closePreview">mdi-window-close</v-icon>
                <img :src="src" width="100%" alt=""> 
              </div>


            <br />
            
            <v-btn :loading="loading" :disabled="loading" color="primary" block outlined @click="updateZobo">Update</v-btn>
          </v-form>
        </div>
      </div>

      <upload-dialog :dialog='dialog' @closeDialog="dialog=!dialog;" @uploaded="setImage" ></upload-dialog>
  
  
  
  </div>
</template>


<script>
import { mapGetters } from 'vuex';
import UploadDialog from '../Dialogs/UploadDialog'
export default {
  components: {
    UploadDialog
  },
  data() {
    return {
         rules: {
            length: v =>
              (v && v.length >= 6) || "password must be least 6 characters",
            required: v => !!v || "This field is required",
              size: v =>
             !v || v.size < 2000000 || "Image must not be greater than 2 MB",            
          },
          newZobo:{
            description:'',
            title:'',
            date:''
          },
          loadingC:true,
          loading:false,
          zoboCat:[],
          fv:'',
          customText:[{
            id:1,
            msg:'This is he first custum wedding',
            category:'Wedding'
          },
          {
            id:2,
            msg:'This is he first custum weding',
            category:'Wedding'
          },
          {
            id:3,
            msg:'This is he first happy birthday',
            category:'Birthday'
          },
          {
            id:4,
            msg:'This is he first custum message',
            category:'Wedding'
          },
          {
            id:5,
            msg:'Happy graduation o me Graduation',
            category:'Graduation'
          },
          
          
          ],
          dialog:false,
          src:""

    };
  },
  methods: {
    getZoboCat(){
      this.loadingC=true
      this.$store.dispatch('getZoboCat').then(res=>{
      this.loadingC=false
      res.map(item=>{
        this.zoboCat.push(item.zobo)
      })
    });
    },

    getZobo(){
         this.$store.dispatch("getZoboDetails", this.$route.params.id);
    },

    setImage(data){
      this.zobo.cover=data.url;
      this.src=data.url;
    },
    closePreview(){
      this.src='';
    },

    openUpload(){
      this.dialog=true

    },

    setVal(text){
      this.zobo.description=text
    },
    updateZobo(){
      if (this.$refs.form.validate()) {
        this.loading = true;
        // this.newZobo.type=this.getId(this.newZobo.type)
      this.zobo.date=this.newZobo.date.length ? this.newZobo.date : this.zobo.date
      this.$store
          .dispatch("updateZobo", this.zobo)
          .then(() => {
            this.loading = false;
            this.$toast.success({
              title: "Updated",
              message: "Post was updated successfull"
            });
            this.$router.push({ name: "zobo.list" });
          })
          .catch(err => {
            this.loading = false;
            if (err.response.data.global) {
              this.serverErrors = null || Object.values(err.response.data.errors);
              this.$toast.error({
                title: "Server Error",
                message:"Opps! something went wrong"
              });
              window.scrollTo(0,50)
            }else{
                 this.$toast.error({
                title: "Server Error",
                message:err.response.data.msg
              });
            }
          });
      } else {
        this.$toast.error({
          title: "Validation Error",
          message: "Opps something went wrong, all field required"
        });
      }
    },
    handleChange(val){
        this.fv=val
    },

    getId(zobo){
      return this.zoboCat.find(item=>zobo === item.zobo)._id
    },
    wait(val){
      console.log(val);
    },


    waitForIt(val) {
      if (this.time) {
        clearTimeout(this.time);
      }
      this.loading = true;
      this.time = setTimeout(() => this.searchTerm(val), 1000);
    },
    searchTerm(val) {
      if (!val.length) return;
      this.$store.dispatch("searchTerm", val).then(data => {
        this.users = data.users;
        this.challenges = data.challenges;
        this.loading = false;
      });
    }
  },

  mounted() {
    this.getZobo()
    this.getZoboCat()
  },
  watch: {
    title(val) {
      this.waitForIt(val);
    },
  },
  computed: {
      ...mapGetters([
          "user",
          "zobo",
          "zoboCat"
      ]),
      fCustomText(){
        return this.customText.filter(custom=>custom.category===this.fv)
      }
  }
};
</script>

<style lang="scss" >

.custom-input{ 
  padding:10px;
  border-radius:3px;
  margin-bottom:10px;
  width:100%;
  padding-left:100px;
  outline: none;

  & :focus{
    border:none
  }
}
.placeh{
  position:absolute;
  left:10px;
  top:5px;
  color:#ccc;
  font-size:20px
}
.create-zobo{
   margin-top:50px;
   max-width:600px;
   width:600px;
   .auto-complete{
     padding:10px;
     margin:10px 0px;
     opacity: .7;
     display: flex;
     flex-direction: row;
     overflow: auto;
     &::-webkit-scrollbar{
        background:#eef4ff;
        width:5px;
        height:3px
      }

    &::-webkit-scrollbar-thumb{
     background: #fad4d5;
      border-radius:2.5px

    }
      
     button{
       margin-left: 5px;
        text-transform:none !important;
     }

   }

  
}

 .preview{
     position: relative;
    padding: 10px;
    .v-icon{
    position: absolute;
    right: 25px;
    top: 25px;
    color: #ffffff;
    cursor: pointer;
    text-shadow: 0px 2px 2px #444;
    }
   }
@media (max-width: 767px) {
.create-zobo{
   margin-top:50px;
   width:100%;
}
}
</style>