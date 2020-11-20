<template>

<div>

   <v-flex md12 sm12 xs12 v-if="from=='profile'">
            <!-- <v-btn @click="deleteZobo(zobo._id)" style="float:right;z-index:999" fab small color="error" class="elevation-1">
              <v-icon>mdi-delete</v-icon>
            </v-btn> -->
          <v-card tag="div" class="ma-2 pa-2 z-card elevation-10" :to="{name:'myzobopage',params:{title:zobo.slug,id:zobo._id}}">
            <span class="title" v-if="zobo.title.length < 5">{{zobo.title}}</span>
            <span v-else class="title">{{zobo.title.substr(0,5) + '...'}}{{zobo.title.substr(-5)}}</span>
            <div class="display">
              <img :src="zobo.cover" width="100%" />
            </div>
          <!-- &#8358; -->
            <div class="details" >
              <v-avatar
                size="40"
                color="white"
              >
                <img :src="user.profile_image" alt="alt">
              </v-avatar>
              <span style="color:#d34a1a;font-weight:bolder" class="pl-2">$ {{zobo.min}}.00</span>
              <span style="color:rgba(0,0,0,.5);font-weight:bolder" class="pl-2 caption float-right" ><v-icon left size="20">mdi-clock-outline</v-icon> {{zobo.createdAt | timeAgo}} ago</span>
            </div>
          </v-card>
      </v-flex>

        <div  v-if="from=='home'">
          <v-card tag="div" class="ma-2 pa-2 z-card elevation-10" :to="{name:'myzobopage',params:{title:zobo.slug,id:zobo._id}}">
            <span class="title" v-if="zobo.title.length < 5">{{zobo.title}}</span>
            <span v-else class="title">{{zobo.title.substr(0,5) + '...'}}{{zobo.title.substr(-5)}}</span>
            <div class="display">
              <img :src="zobo.cover" width="100%" />
            </div>
          <!-- &#8358; -->
            <div class="details" >
              <router-link v-on:click.prevent :to="{name:'profile',params:{username:zobo.user_id[0].username}}">              <v-avatar
                size="40"
                color="white"
                
              >
                <img :src="zobo.user_id[0].profile_image" alt="alt">
              </v-avatar>
              </router-link>
              <span style="color:#d34a1a;font-weight:bolder" class="pl-2">$ {{zobo.min}}.00</span>
              <span style="color:rgba(0,0,0,.5);font-weight:bolder" class="pl-2 caption float-right" ><v-icon left size="20">mdi-clock-outline</v-icon> {{zobo.createdAt | timeAgo}} ago</span>
            </div>
          </v-card>
      </div>

</div>
      
</template>

<script>

export default {
  props: ['zobo','user','from']
};
</script>

<style lang="scss" scoped>
.z-card{
  padding:10px;
  & .display{
    clip-path: circle(200px at center 0px);
    stroke: 2px;
    height:230px;
    background: #f7f6f6;
  }
}
</style>


