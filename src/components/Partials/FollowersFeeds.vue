<template>
  <div>
      <post-feeds :posts="FollowerPost"></post-feeds>
  </div>
</template>

<script>

import PostFeeds from "./PostFeeds"
export default {
    components: {
        PostFeeds
    },
    data () {
        return {
            filteredPost:[]
        }
    },
    created () {
        this.$store.dispatch('getFollowPost')
    },
    computed: {
        FollowerPost(){
            return this.$store.getters.followerFeeds
        }
        
    }
}
</script>

<style>

</style>