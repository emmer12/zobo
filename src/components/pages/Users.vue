<template>
  <v-container grid-list-lg>
      <user-list></user-list>
  </v-container>
</template>

<script>
import UserList from './../Partials/UserList'
export default {
    components: {
        UserList
    },
    data () {
        return {
                  
        }
    }
}
</script>

<style>

</style>