<template>
  <v-container>
    <!-- <h2>Hello</h2>
    <v-btn :to="{name:'access.signin'}" color="primary">sign in</v-btn>
    <v-btn :to="{name:'access.signup'}" color="primary">sign up</v-btn> -->
    <transition mode="out-in" enter-active-class="animated slideInLeft" leave-active-class="animated slideOutLeft">
      <router-view></router-view>
    </transition>
  </v-container>
</template>

<script>

export default {};
</script>
<style lang="scss">

</style>