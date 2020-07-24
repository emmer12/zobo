<template>
  <v-container>
      <div v-for="(item, index) in productCat" :key="index">{{item.price}}</div>
  </v-container>
</template>


<script>
export default {
  props:[],
  data() {
    return {
      products:[{
        id:1,
        categoryId:1,
        perodectName:'Turkey',
        display:'',
        price:400,
      },
      {
        id:1,
        categoryId:1,
        perodectName:'Bush Meat',
        display:'',
        price:350,
      },
      {
        id:1,
        categoryId:1,
        perodectName:'Beaf',
        display:'',
        price:300,
      }
      ]
    };
  },
  methods: {
    
  },
  computed:{
    productCat(){
      return  this.products.filter(data=>{
        if (data.categoryId === this.$route.params.category) {
          console.log(data,'jd');
          
          return data

        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>

</style>

