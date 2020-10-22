<template>
  <div>
    <v-layout v-if="page==='dashboard'" row wrap  my-3 class="zobo-list-con">
      <transition-group
        class="v-layout row wrap"
        enter-active-class="animated zoomIn"
        leave-active-class="animated zoomOut"
      >
      
        <v-flex v-for="(zobo, index) in zobos" :key="index" md6 sm4 xs6>
            <v-btn @click="shareLink(zobo)" style="float:right;z-index:999" fab small color="error" class="elevation-1">
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
          <v-card class="ma-2 pa-2 zobo-cart" :to="{name:'list.details',params:{id:zobo._id}}">
            <span class="title" v-if="zobo.title.length < 5">{{zobo.title}}</span>
            <span v-else class="title">{{zobo.title.substr(0,5) + '...'}}</span>
            <img :src="zobo.cover" width="100%" style="max-height:250px"/>
            <!-- &#8358; -->
            <v-card-actions class="card-foot d-flex justify-space-between pa-3 align-center" style="background:rgba(245,245,245,0.5)">
              <span style="color:#d34a1a">$ {{zobo.balance}}.00</span>

              <v-menu offset-y>
               <template v-slot:activator="{on,attrs}">
                <v-btn v-on="on" v-bind="attrs" v-on:click.prevent style="z-index:999" color="primary" icon large class="elevation-1">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
               </template>
                <v-list>
                  <v-list-item  @click="deleteZobo(zobo._id)">
                    <v-list-item-title v-text="'Delete'"></v-list-item-title>
                  </v-list-item>

                    <v-list-item to="#" >
                    <v-list-item-title v-text="'Edit'"></v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-actions>
          </v-card>
        </v-flex>


      </transition-group>
    </v-layout>

    <share-dialog :dialog="dialog" :zobo="zobo" @closeDialog="dialog=!dialog;"  @copyLink="copyText"></share-dialog>

  </div>
</template>

<script>
import ShareDialog from "../Dialogs/ShareDialog";

export default {
  props: ["zobos", "page"],
  components: {
    ShareDialog
  },
  data() {
    return {
      zobo:{
        link:'',
        title:""
    },
      dialog:false
    };
  },
  methods: {
    copyText() {
      navigator.clipboard.writeText(this.zobo.link);
      this.show=true;
      let dis=this
      setTimeout(function () {
        dis.show=false
      },3000)
    },
    deleteZobo(id){
      let conf=confirm('You are about to delete this post')
      if (conf) {
         this.$store.dispatch('deleteZobo',id)
      }else{
        return
      }
    },
    shareLink(zobo){
      this.zobo=zobo
      this.dialog=true
      
    }
  },

  mounted() {
  }
};
</script>


<style lang="scss">
.zobo-list-con{
    width:80%;
}
.zobo-cart{
    background-image: linear-gradient(rgb(255, 255, 255) 80%,rgba(0,0,0,0.2) );
    
}

@media (max-width: 600px) {
    .zobo-list-con{
    width:100%;
}
}

</style>