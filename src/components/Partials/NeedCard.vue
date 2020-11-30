<template>

<div>


        <div>
          <div  tag="div" class="ma-2 pa-2 n-card" :to="{name:'myzobopage',params:{title:zobo.slug,id:zobo._id}}">
              <!-- <div class="special" v-if="zobo.spacial">
                <v-icon size="30" color="primary">mdi-check-decagram</v-icon>
              </div> -->
            <!-- <span class="title" v-if="zobo.title.length < 5">{{zobo.title}}</span> -->
            <!-- <span v-else class="title">{{zobo.title.substr(0,5) + '...'}}{{zobo.title.substr(-5)}}</span> -->
            <div class="display">
            <div class="overlay"></div>
              <h4 class="title">{{zobo.title}}</h4>
              <img :src="zobo.cover" width="100%" />
            </div>
          <!-- &#8358; -->
            <div class="details" >
                <p class="body1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, commodi! Incidunt veniam corporis nemo at voluptate iste eum dolorum praesentium... <router-link to="#" tag="span" class="primary--text">read more</router-link></p>      
            </div>
          </div>
      </div>

</div>
      
</template>

<script>

export default {
  props: ['zobo']
};
</script>

<style lang="scss" scoped>
.n-card{
    padding:10px;
    height:400px;
    max-width:350px;
    position: relative;
    background:#2b2a2a;
    left:50%;
    transform:translateX(-50%);
    
    .display{
    position:relative;
    height:70%;
    cursor:pointer;
    h4{
        transition:0.3s;
        color:rgba($color: #fff, $alpha:0.8);
        position:absolute;
        margin:10px
    }
    .overlay{
        transition:0.3s;
        width:100%;
        height:100%;
        top:0;
        position: absolute;
        border-radius:10px;
        background-image:linear-gradient(to bottom,rgba(0,0,0,0.5) 10%, rgba(0,0,0,0.2));
    }
    img{
        height:100%;
        object-fit: cover;
        border-radius:10px;
        // opacity:0
    }

    &:hover{
        .overlay{
        background-image:linear-gradient(to bottom,rgba(0,0,0,0.5) 10%, rgba(0,0,0,0.1));
        }
        h4{
            margin-left:15px;
            color:#fff
        }
    }
  }
  .details{
      color:rgba($color: #fff, $alpha: 0.8);
      padding:10px
  }

  .special{
    position: absolute;
    left: 90%;
    top:15                                               px;
  }
}
</style>


