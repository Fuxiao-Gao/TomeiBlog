<template>
  <v-container fluid class="navbar">
    <v-row>
      <v-col cols="3" class="d-flex align-center pa-0 ma-0">
        <v-text-field dense class="ml-2" label="Search" prepend-inner-icon="mdi-magnify"></v-text-field>
      </v-col>
      <v-col cols="9" class="d-flex align-center pa-0 ma-0">
        <v-row class="justify-end mr-5">
          <v-btn class="hidden-xs" text color="blue-lighten-5" variant="text" to="/">Home</v-btn>
          <v-btn class="hidden-md-and-down" text color="blue-lighten-5" variant="text" to="/categories">Categories</v-btn>

          <v-btn class="hidden-xs-and-down" text color="blue-lighten-5" variant="text" to="/about">About</v-btn>

          <v-menu open-on-hover>
            <template v-slot:activator="{ props }">
              <v-btn class="hidden-md-and-down" text color="blue-lighten-4 mr-2" v-bind="props"
                variant="text">Account</v-btn>
            </template>

            <v-list class="trans-background">
              <v-list-item v-for="(PersonalItem, index) in PersonalItems" :key="index" :to="PersonalItem.link">
                <v-list-item-title>{{ PersonalItem.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-btn class="hidden-xs" text color="blue-lighten-5" variant="text" to="/create">Create</v-btn>
          <div class="ml-6">
            <p class="font-weight-light ma-2">
              TOMEI BLOG
            </p>
          </div>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>



<script>
export default {
  name: 'navbar',
  data: () => ({
    valid: false,
    items: [
      { title: 'Movie', link: "/movie" },
      { title: 'Travel', link: "/travel" },
      { title: 'Music', link: "/music" },
      { title: 'Nature', link: "/nature" },
      { title: 'Art and Design', link: "/art" },
      { title: 'Photography', link: "/photography" },
    ],
    PersonalItems: [
      { title: 'My WorkSpace', link: "/myworkspace" },
      { title: 'Messages', link: "/messages" },
    ],
  }),
}
</script>

<style>
.navbar {
  background-color: rgba(0, 0, 0, 0.116);
  width: 100%;
  z-index: 1;
}

.trans-background {
  background-color: rgba(255, 255, 255, 0.13) !important;
  /* or customize */
  /*   background-image: url('path-to-your-image.jpg');
  background-size: cover;
  background-position: center; */
}
</style>