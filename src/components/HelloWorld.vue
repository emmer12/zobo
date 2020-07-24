<template>
  <v-container>
    <v-row class="text-center">
      <h1 style="background:green" class="ma-3 pa-10" >Hello</h1>

      <v-skeleton-loader table class="mx-auto" min-width="240px" max-width="300" type="card">

      </v-skeleton-loader>
      
      <vboilerplate></vboilerplate>
   </v-row>
<!-- <template>
  <v-sheet
    :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
    class="px-3 pt-3 pb-12"
  >
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-boilerplate
            class="mb-6"
            type="card-avatar, article, actions"
          ></v-boilerplate>

          <v-boilerplate type="date-picker"></v-boilerplate>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-boilerplate
            class="mb-6"
            type="article, actions"
          ></v-boilerplate>
 
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-boilerplate
            class="mb-6"
            type="list-item-avatar, divider, list-item-three-line, card-heading, image, actions"
          ></v-boilerplate>

          <v-boilerplate type="list-item-avatar-three-line, image, article"></v-boilerplate>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
  export default {
    // Vuetify components provide
    // a theme variable that is
    // used to determine dark
    inject: ['theme'],

    components: {
      // Create a new component that
      // extends v-skeleton-loader
      VBoilerplate: {
        functional: true,

        render (h, { data, props, children }) {
          return h('v-skeleton-loader', {
            ...data,
            props: {
              boilerplate: true,
              elevation: 2,
              ...props,
            },
          }, children)
        },
      },
    },
  }

  <template>
  <v-row justify="center">
    <v-menu transition="slide-x-transition">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" class="ma-2" v-on="on">
          Slide X Transition
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="n in 5"
          :key="n"
          link
        >
          <v-list-item-title v-text="'Item ' + n"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <div class="mx-6 hidden-sm-and-down"></div>

    <v-menu transition="scroll-y-transition">
      <template v-slot:activator="{ on }">
        <v-btn color="secondary" class="ma-2" v-on="on">
          Scroll Y Transition
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="n in 5"
          :key="n"
          link
        >
          <v-list-item-title v-text="'Item ' + n"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-row>
</template>
<template>
  <div class="text-center">
    <v-menu transition="fab-transition">
      <template v-slot:activator="{ on }">
        <v-btn
          dark
          color="primary"
          v-on="on"
        >
          Fab Transition
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="n in 5" :key="n" @click="">
          <v-list-item-title v-text="'Item ' + n"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
</script> -->
  </v-container>

</template>

<script>
  export default {
    name: 'HelloWorld',

    data: () => ({
      ecosystem: [
        {
          text: 'vuetify-loader',
          href: 'https://github.com/vuetifyjs/vuetify-loader',
        },
        {
          text: 'github',
          href: 'https://github.com/vuetifyjs/vuetify',
        },
        {
          text: 'awesome-vuetify',
          href: 'https://github.com/vuetifyjs/awesome-vuetify',
        },
      ],
      importantLinks: [
        {
          text: 'Documentation',
          href: 'https://vuetifyjs.com',
        },
        {
          text: 'Chat',
          href: 'https://community.vuetifyjs.com',
        },
        {
          text: 'Made with Vuetify',
          href: 'https://madewithvuejs.com/vuetify',
        },
        {
          text: 'Twitter',
          href: 'https://twitter.com/vuetifyjs',
        },
        {
          text: 'Articles',
          href: 'https://medium.com/vuetify',
        },
      ],
      whatsNext: [
        {
          text: 'Explore components',
          href: 'https://vuetifyjs.com/components/api-explorer',
        },
        {
          text: 'Select a layout',
          href: 'https://vuetifyjs.com/layout/pre-defined',
        },
        {
          text: 'Frequently Asked Questions',
          href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions',
        },
      ],
    }),
  }
</script>
