<template>
  <div>
   <v-container grid-list-md>
        <v-card>
      <v-layout row wrap pl-4 align-center>
        <v-flex md1>
          <v-btn @click="$router.go(-1)" icon color="info">
            <v-icon >mdi-arrow-left</v-icon>
          </v-btn>
        </v-flex>

        <v-spacer></v-spacer>
        <v-flex pr-5 pa-2 text-md-right>
            <input
                name="name"
                id="search"
                type="search"
                placeholder="Search"
                v-model="search"
            >
            <v-btn  icon color=""  @click="explore">
                <v-icon>search</v-icon>
            </v-btn>
        </v-flex>
      </v-layout>
    </v-card>
       
       <div v-if="loading">
          <v-layout row wrap>
               <v-flex v-show="loading" md3 xs6 v-for="(item, index) in 4" :key="index">
                <v-skeleton-loader table class="mx-auto md3" min-width max-width="300" type="card"></v-skeleton-loader>
            </v-flex>
          </v-layout>
       </div>

      <v-layout row wrap>
           <v-flex md-6>
                <v-alert type="error" class="ma-8" :value="serverError">
                    {{this.serverError}}
                </v-alert>
           </v-flex>

      </v-layout>
   </v-container>

      <v-layout row wrap>
          <v-flex md3 v-for="(feed, index) in feeds" :key="index" >
            `<v-card class="ma-4 pa-4">
                <img :src="feed.snippet.thumbnails.high.url" width="100%">
        
                <v-card-title primary-title>
                    <div>
                        <h3 class="title mb-0">{{feed.snippet.title}}</h3>
                    </div>
                </v-card-title>
                <v-card-actions>
                    <v-btn text color="primary" @click="openVideo(feed.snippet.title,feed.id.videoId)">View</v-btn>
                </v-card-actions>
            </v-card>
              
          </v-flex>
      </v-layout>


      <youtube-dialog :title="title" :videoId="videoId" :dialog="dialog" @closeDialog="dialog=!dialog;value='';field=''"></youtube-dialog>



<!-- 
      <v-card v-for="(feed, index) in feeds" :key="index">
           <iframe :src='"https://www.youtube.com/embed/"+feed.id.videoId' width="400" height="350"  frameborder="0"></iframe>
           <span class="card-title">{{feed.snippet.title}}</span>
      </v-card> -->


  </div>
</template>

<script> 
// import axios from 'axios'
import YoutubeDialog from './../Dialogs/YoutubeDialog'
 
export default {
    components:{
        YoutubeDialog
    },
    data() {
        return {
            apiKeys:"AIzaSyDnFCybhrNQ2FHMRcl_Flbww0pHKiqCBIM",
            maxResults:10,
            feeds:null,
            dialog:false,
            title:"",
            videoId:"",
            loading:false,
            serverError:false,
            search:""
        }
    },


    methods: {
        explore(){
              this.loading=true
              let title=this.search || this.$route.params.key;
              fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&key='+ this.apiKeys + '&type=video&maxResults='+ this.maxResults + '&q='+title).then(res=> res.json()).then((data)=>{
                  this.feeds=data.items
                  
                  this.loading=false
              }).catch(()=>{
                  this.loading=false
                  this.serverError="Oops, something went wrong please try again later"
              })
        },

        openVideo(title,videoId){
        this.title=title;
        this.videoId=videoId;
        this.dialog=true
     }
    },
    created() {
        this.explore()
    },
}
</script>

<style> 
    #search{
        border-bottom:1px solid grey;
        padding:5px 10px;
        font-weight: 700;
    }
    #search:focus{
        outline: none;
        border-bottom:1px solid blue
    }
</style>