<template>
  <div class="zobo-con">
    <v-alert v-show="errors" type="error" :value="true">
      {{errors}}
    </v-alert>

    <div v-if="loading">
      <v-skeleton-loader v-bind="attrs" type="list-item-avatar-three-line,image"></v-skeleton-loader>
      <v-skeleton-loader v-bind="attrs" type="card-avatar,article,actions"></v-skeleton-loader>
    </div>

    <div v-else>
    <v-layout v-if="zobo" class="pa-5" style="background:#fff;">
    <v-avatar
      size="150"
      color="white"
    >
      <img :src="zobo.user_id[0].profile_image" alt="Cellepay">
    </v-avatar>
    <div class="pa-4">
        <h4 class="title">{{ zobo.user_id[0].firstname  }} {{zobo.user_id[0].lastname}}</h4>
        <router-link :to="{name:'profile',params:{username:zobo.user_id[0].username}}" class="body-2 primary--text">@{{ zobo.user_id[0].username}}</router-link>    
    </div>
    </v-layout>



    <div class="d-flex justify-center align-center" v-if="!loading && zobo" style>
      <v-layout row wrap>
        <v-flex md6 xs12>
          <div style="width:100%">
            <div class="img">
              <img :src="zobo.cover" width="100%" />
            </div>
          </div>
        </v-flex>
        <v-flex md6 xs12>
          <div class="pa-4">
            <v-btn block color  style="cursor:text;" rounded>{{zobo.title}}</v-btn>
            <p class="py-4">{{zobo.description}}</p>
          </div>
          <div class="zobo pa-4">
            <div style="width:100px" class="elevation-1" color>
              <v-icon left color="#d34a1a">mdi-hand-heart</v-icon>
              <span class="grey--text">$ {{zobo.min}}</span>
            </div>

            <div class="elevation-1">X</div>
            <div class="elevation-1">
              <input type="number" @blur="blurInput" min="1" @input="updateInput" :value="init" />
            </div>
            <div class="rounded elevation-1 " :class="{active:multiple===3}" @click="setVal(3) ">
              <span>3</span>
            </div>
            <div class="rounded elevation-1" :class="{active:multiple===5}" @click="setVal(5)">
              <span>5</span>
            </div>
            <div class="rounded elevation-1" :class="{active:multiple===10}" @click="setVal(10)">
              <span>10</span>
            </div>
          </div>

          <div class="pa-4">
            <v-btn color="primary" @click="proccedBuying">Buy $ {{ result }}</v-btn>
          </div>
        </v-flex>
      </v-layout>
    </div>
       <count-down :date="zobo.date"></count-down>
  
       <share-dialog :dialog="dialog" @closeDialog="dialog=!dialog;value='';field=''"></share-dialog>
    </div>
  </div>
</template>

<script>
import ShareDialog from "../Dialogs/ShareDialog";
import CountDown from "../Partials/CountDown";
import {mapGetters} from 'vuex'
export default {
  components: {
    ShareDialog,
    CountDown
  },
  data() {
    return {
      dialog: false,
      active: true,
      loading:true,
      errors:null,
      multiple:null
    };
  },

  methods: {
    setVal(val) {
      this.multiple=val
      this.$store.dispatch("setZoboVal", val);
    },
    blurInput(){
      this.multiple=null
    },
    getZobo() {
      this.loading=true
      this.$store.dispatch("getZoboDetailsVisitor", this.$route.params.id).then(()=>{
        this.loading=false
      }).catch(()=>{
        this.errors="Oops, post not found  owner may have deleted this post"
        this.loading=false
      })
    },
    updateInput(e){
        if(e.target.value<1) return
        this.$store.dispatch("setZoboVal", e.target.value);
    },

    proccedBuying() {
      if (this.isLoggedIn) {
        try{
          localStorage.setItem('zobo',JSON.stringify(this.zobo))
          localStorage.setItem('init',this.init)
          this.$router.push({ name: "payments" });
        }catch(err){
          console.log(err);
        }
      } else {
        let params=JSON.stringify(this.$route.params)
        localStorage.setItem('visitor-buyer',params)
        this.$router.push({name:'access.signin'})
      }
    }
  },
  mounted(){
    localStorage.removeItem('visitor-buyer')
    this.getZobo();
  },
  computed: {
      ...mapGetters({result:'giftResult',isLoggedIn:'loggedIn',init:'init',min:'min',zobo:'zobo'})
  }
};
</script>

<style lang="scss" scoped>
.zobo-con {
  position: relative;
  max-width: 800px;
  left: 50%;
  transform: translateX(-50%);

  .img{
    height:300px;
    img{
      object-fit:cover;
      height:100%;
    }
  }
}



.zobo {
  // background: #f6f6f9;
  padding: 10px;
  display: flex;
  position: relative;

  & div {
    padding: 10px;
    border-radius: 3px;
    // margin-right: 5px;
    align-self: center;

    &.rounded {
      border-radius: 25px;
      height: 50px;
      width: 50px;
      text-align: center;
      line-height: 30px;
      cursor: pointer;
      color: #e50913;
      border: 1px solid #e50913;
      transition: 0.3s ease-in-out;
      &.active {
        background: #e50913;
        color: white;
      }


      &:hover {
        background: #e50913;
        color: white;
      }
    }

    & input {
      width: 50px;
      outline: none;
      border-radius: 3px;
      // padding: 5px;
      &:focus {
        border: 1px solid #ddd;
      }
    }
  }
}
</style>