<template>
  <div class="pa-4 zobo-con">

    <v-alert v-show="errors" type="error" :value="true">
      {{errors}}
    </v-alert>

    <div class="d-flex justify-center align-center" v-if="!loading && zobo" style>
      <v-layout row wrap>
        <v-flex md6 xs12>
          <div style="width:100%">
            <div>
              <img :src="zobo.cover" width="100%" />
            </div>
          </div>
        </v-flex>
        <v-flex md6 xs12>
          <div class="pa-4">
            <v-btn block color rounded>{{zobo.title}}</v-btn>
            <p class="py-4" v-if="zobo.description.length<100">{{zobo.description}}</p>
            <p class="py-4" v-else>{{zobo.description.substr(0,100)+'...'}}</p>
          </div>
          <div class="zobo">
            <div style="width:100px" class="elevation-1" color>
              <v-icon left color="#d34a1a">mdi-hand-heart</v-icon>
              <span class="grey--text">$ {{zobo.min}}</span>
            </div>

            <div class="elevation-1">X</div>
            <div class="elevation-1">
              <input type="number" min="1" @input="updateInput" :value="init" />
            </div>
            <div class="rounded elevation-1" @click="setVal(3)">
              <span>3</span>
            </div>
            <div class="rounded elevation-1" @click="setVal(5)">
              <span>5</span>
            </div>
            <div class="rounded elevation-1" @click="setVal(10)">
              <span>10</span>
            </div>
          </div>

          <div class="pa-4">
            <v-btn color="primary" @click="proccedBuying">Buy $ {{ result }}</v-btn>
          </div>
        </v-flex>
      </v-layout>
    </div>

    <share-dialog :dialog="dialog" @closeDialog="dialog=!dialog;value='';field=''"></share-dialog>
  </div>
</template>

<script>
import ShareDialog from "../Dialogs/ShareDialog";
import {mapGetters} from 'vuex'
export default {
  components: {
    ShareDialog
  },
  data() {
    return {
      dialog: false,
      active: true,
      loading:true,
      errors:null
    };
  },

  methods: {
    setVal(val) {
      this.$store.dispatch("setZoboVal", val);
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
  height: 100px;
}

.zobo {
  // background: #f6f6f9;
  padding: 10px;
  display: flex;
  position: relative;

  & div {
    padding: 10px;
    border-radius: 3px;
    margin-right: 5px;
    align-self: center;

    &.rounded {
      border-radius: 25px;
      height: 50px;
      width: 50px;
      text-align: center;
      line-height: 30px;
      cursor: pointer;
      color: #d34a1a;
      border: 1px solid #d34a1a;
      transition: 0.3s ease-in-out;
      &.active {
        background: #d34a1a;
        color: white;
      }

      &:hover {
        background: #d34a1a;
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