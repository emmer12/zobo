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
        <span class="title"  v-if="from ==='settings'">Upload Profile pic</span>
        <span class="title" v-else>Upload File</span>
        <v-spacer></v-spacer>
        <v-btn icon color="red" @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      

     <section class="conain" v-if="from !=='settings' ">
        <div class="images-div">
        <div class="image" v-for="(image, index) in filterImages" :key="index" @click="selected(image.url)">
          <img 
           ref="img"
           :src="image.url"
           alt="alt"
           width="100%"                               
          />
        </div>
      </div>

        <v-text-field prepend-inner-icon="mdi-magnify" rounded label="Filter display image"  v-model="q"></v-text-field>

     </section>
 
      <v-progress-linear class="" background-color="#ddd" color="success" :value="progress" ></v-progress-linear>
        
        <div>

        </div>
        
        
        
        
        
        <v-form>
          <v-file-input
            accept="image/png, image/jpeg, image/jpg, image/gif"
            :placeholder="from === 'settings' ? 'Please pick your profile image' : 'Please pick your cover image'"
            label="Profile Image"
            :rules="[rules.size,rules.required]"
            prepend-icon="mdi-camera"
            v-on:change="processFormImg"
            name="display"
            type="file"
          ></v-file-input>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  props: ["dialog","from"],

  data() {
    return {
      file:null,
      isProgress:true,
      q:'',
      rules: {
        length: v =>
          (v && v.length >= 6) || "password must be least 6 characters",
        required: v => !!v || "This field is required",
        size: v =>
          !v || v.size < 2000000 || "Image must not be greater than 2 MB"
      },
      images:[
        {
        id:1,
        url:'http://localhost:3000/images/1.jpg',
        category:'Wedding',
      },
      {
        id:2,
        url:'http://localhost:3000/images/2.jpg',
        category:'birthday',
      },
      {
        id:3,
        url:'http://localhost:3000/images/3.jpg',
        category:'birthday',
      },
      {
        id:4,
        url:'http://localhost:3000/images/4.jpg',
        category:'Wedding',
      },
      {
        id:5,
        url:'http://localhost:3000/images/5.jpg',
        category:'Graduation',
      },
      {
        id:6,
        url:'http://localhost:3000/images/6.jpg',
        category:'birthday',
      },
      {
        id:7,
        url:'http://localhost:3000/images/7.jpg',
        category:'birthday',
      },
      {
        id:8,
        url:'http://localhost:3000/images/8.jpg',
        category:'birthday',
      },
      {
        id:9,
        url:'http://localhost:3000/images/9.jpg',
        category:'birthday',
      },
      ]
    };
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
    processFormImg: function(file) {
      this.isProgress = true;
      this.$store.dispatch("uploadFile",file).then(res => {
        this.$emit("closeDialog");
        this.$emit("uploaded",{
          "url":res.data.url,
          "filename":res.data.filename
        })

      });
    },
    selected(url){
        this.$emit("closeDialog");
        this.$emit("uploaded",{
          "url":url,
        })
    }
  },
  computed: {
    progress(){
      return this.$store.getters.uploadProgress
    },

    filterImages(){
     return this.images.filter((image)=>{
       return image.category.toLowerCase().includes(this.q.toLowerCase());
     }) 
    }
  },
  watch: {}
};
</script>

<style lang="scss" >
  .images-div{
    display:flex;
    flex-direction: row;
    flex-wrap: wrap;
    // padding:10px;
    max-height: 200px;
    overflow: auto;
    margin-top:10px;
    // justify-content: space-around;
      &::-webkit-scrollbar{
        background:#eef4ff;
        width:5px;
        height:3px
      }

    &::-webkit-scrollbar-thumb{
     background: #fad4d5;
      border-radius:2.5px

    }
    .image{
      height:100px;
      width:100px;
      padding:5px;
      transition: 0.3s;
      cursor:pointer;

      &:hover{
        border:4px solid #e50913; 
        opacity:0.8
      }
    }
  }

  @media (max-width:600px){
   .images-div{
   .image{
      height:90px;
      width:90px;

   }
   }
  }
</style>