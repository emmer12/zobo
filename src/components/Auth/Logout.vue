<template>
    <div style="padding:20px">
      <h4>logging out...</h4>
      <!-- <img src="/images/logout.gif" alt="logout"> -->
    </div>
</template>

<script>
export default {
 created(){
         this.$store.dispatch('destroyToken').then(()=>{
           this.$router.push({name:'access.signin'})
         })
       }
}
</script>

<style>

</style>