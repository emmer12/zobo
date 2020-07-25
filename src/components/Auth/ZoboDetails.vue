<template>
  <div class="pa-4">
    <div class="d-flex justify-center align-center" style v-if="zobo">
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
            <p class="py-4">{{zobo.description}}</p>
            <v-btn color="grey" rounded outlined>
              Min : $
              <strong>{{zobo.min}}</strong>
            </v-btn>
            <v-btn color="primary" class="mx-4" rounded outlined>
              Balance : $
              <strong>{{zobo.balance}}</strong>
            </v-btn>
            <br />
            <div class="d-flex">
              <v-text-field
                class="mt-5"
                solo
                label="label"
                :value="zobo.link"
                disabled
                prepend-inner-icon="mdi-link"
                ref="link"
              ></v-text-field>
              <div class="copy">
                <span v-show="show" class="t-tip">Copied!</span>
                <div class="mt-5 ml-2 pa-2 elevation-1 copy-btn" @click="copyText">
                  <v-icon>mdi-content-copy</v-icon>
                </div>
              </div>
            </div>

            <v-btn color="primary" rounded @click="dialog=true">
              Share your Link
              <v-icon right>mdi-share</v-icon>
            </v-btn>
          </div>
        </v-flex>
      </v-layout>
    </div>
    <v-divider></v-divider>

    <div class="yield-con">
      <h2 class="title mt-5">Zobo Yields</h2>
      <v-divider></v-divider>

      <div v-if="!yielded.length" class="pa-10">
        Empty
        <v-icon size="70">mdi-coffee-outline</v-icon>
      </div>

      <div v-for="(yields, index) in yielded" :key="index">
        <v-card class="ma-2">
          <div
            v-show="yields.show == false"
            class="amount"
            style="position:absolute;right:0px;top:0px;float:right;padding:10px;margin-bottom:20px;filter:blur(0px)"
          >
            $
            <span>{{yields.amount}}</span>
          </div>
          <v-list :class="{'hidey':yields.show == false}">
            <v-list-item>
              <v-list-item-avatar>
                <v-img :src="require('./../../assets/images/slider/01.jpg')"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <div
                  class="amount"
                  style="position:absolute;right:0px;top:0px;float:right;padding:10px;margin-bottom:20px"
                >
                  $
                  <span>{{yields.amount}}</span>
                </div>
                <v-list-item-title>
                  <strong>{{ yields.sender_id[0].username }}</strong> but you zobo
                </v-list-item-title>
                <v-list-item-subtitle>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae quod ipsum porro esse delectus minima ea eos facere molestias quasi!</v-list-item-subtitle>
                <div v-if="isLoggedIn">
                  <v-btn
                    rounded
                    v-if="following.includes(yields.sender_id[0]._id)"
                    @click="follow(yields.sender_id[0]._id)"
                    class="mt-3"
                    outlined
                    color="primary"
                    small
                    dark
                  >Unfollow</v-btn>
                  <v-btn
                    v-else
                    rounded
                    @click="follow(yields.sender_id[0]._id)"
                    class="mt-3"
                    outlined
                    color="primary"
                    small
                    dark
                  >Follow</v-btn>
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </div>
    </div>

    <share-dialog :dialog="dialog" @closeDialog="dialog=!dialog;value='';field=''"></share-dialog>
  </div>
</template>

<script>
import ShareDialog from "../Dialogs/ShareDialog";
import { mapGetters } from "vuex";
export default {
  components: {
    ShareDialog
  },
  data() {
    return {
      dialog: false,
      follower: [],
      following: [],
      show: false
    };
  },
  methods: {
    follow(fuid) {
      if (this.following.includes(fuid)) {
        this.$store.dispatch("unfollow", { fuid }).then(() => {
          let index = this.following.findIndex(i => i === fuid);
          this.following.splice(index, 1);
        });
      } else {
        this.$store.dispatch("follow", { fuid });
        this.following.push(fuid);
      }
    },
    getZobo() {
      this.$store.dispatch("getZoboDetails", this.$route.params.id);
    },
    getYield() {
      this.$store.dispatch("getYield", this.$route.params.id);
    },
    copyText() {
      navigator.clipboard.writeText(this.zobo.link);
      this.show=true;
      let dis=this
      setTimeout(function () {
        dis.show=false
      },3000)
    }
  },
  mounted() {
    this.getZobo();
    this.getYield();
    this.$store.dispatch("getFollow").then(res => {
      this.follower = res.data.follower;
      this.following = res.data.following;
      this.loading = false;
    });
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "loggedIn",
      user: "user",
      zobo: "zobo",
      yielded: "yield"
    })
  }
};
</script>

<style lang="scss" scoped>
.hidey {
  & div {
    filter: blur(5px);
  }
  & > .span {
    filter: blur(0px);
  }
}
.copy {
  position: relative;
  & .t-tip {
    background: #333;
    position: absolute;
    color: #fff;
    padding:5px 10px;
    border-radius: 3px;
    right: 0px;
    top: -15px;
  }
}

.copy-btn {
  height: 45px;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background: #ccc;
  }
}
</style>