<template>
  <v-parallax src="../assets/tomei/tomei10.jpg" height="1000">
    <div class="home">
      <v-container fluid class="navbar">
        <v-row>
          <v-col cols="3" class="d-flex align-center pa-0 ma-0">
            <v-text-field dense class="ml-2" label="Search" prepend-inner-icon="mdi-magnify"></v-text-field>
          </v-col>
          <v-col cols="9" class="d-flex align-center pa-0 ma-0">
            <v-row class="justify-end mr-5">
              <v-btn class="hidden-md-and-down" text color="blue-lighten-5" variant="text"
                to="/categories">Categories</v-btn>

              <v-btn class="hidden-xs-and-down" text color="blue-lighten-5" variant="text" to="/about">About</v-btn>

              <v-menu open-on-hover>
                <template v-slot:activator="{ props }">
                  <v-btn class="hidden-xs" text color="blue-lighten-4 mr-2" v-bind="props" variant="text">Account</v-btn>
                </template>

                <v-list class="trans-background">
                  <v-list-item v-for="(PersonalItem, index) in PersonalItems" :key="index" :to="PersonalItem.link">
                    <v-list-item-title>{{ PersonalItem.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>

              <v-btn class="hidden-xs" text color="blue-lighten-5" variant="text" to="/create">Create</v-btn>
              <v-btn class="hidden-md-and-down" text color="blue-lighten-5" variant="outlined"
                @click="handlebtn()">{{ buttonText }}</v-btn>
              <div class="ml-6">
                <p class="font-weight-light ma-2">
                  TOMEI BLOG
                </p>
              </div>
            </v-row>
          </v-col>
        </v-row>
      </v-container>

      <v-container class="home-content mt-10">
        <v-row>
          <v-col cols="12" md="6" class="d-flex align-center justify-center">
            <div class="text-center">
              <h1 class="display-3 font-weight-bold">TOMEI BLOG</h1>
              <h3 class="font-weight-light">A place to share your stories</h3>
              <v-btn color="blue-lighten-5" class="mt-5" to="/register">Get Started</v-btn>
            </div>
          </v-col>

          <v-col cols="12" md="6">
            <v-carousel hide-delimiters>
              <v-carousel-item v-for="(img, i) in imgs" :key="i" :src="img.src" height="500px" contain></v-carousel-item>
            </v-carousel>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-parallax>
</template>

<script>
import router from '@/router';
import { computed } from 'vue';
import { useStore } from 'vuex';
export default {
  name: 'Home',
  setup() {
    const store = useStore();

    const token = computed(() => store.state.user.token);

    const buttonText = computed(() => {
      return token.value? 'Logout': 'Login';
    });

    const handlebtn = () => {
      if (token.value) {
        store.dispatch('FedLogOut').then(() => {
          router.push('/')
        })
      } else {
        router.push('/login')
      }
    };

    return {
      token,
      buttonText,
      handlebtn
    };
  },
  data: () => ({
    mode: 'light',
    valid: false,
    PersonalItems: [
      { title: 'My WorkSpace', link: "/myworkspace" },
      { title: 'Messages', link: "/messages" },
    ],
    imgs: [
      {
        src: "https://github.com/Fuxiao-Gao/TomeiBlog_front/blob/main/src/assets/tomei/tomei1.jpg",
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
      },
      // add more image paths here
    ]
  }),
}
</script>

<style scoped>
.home {
  /* background-image: url(../assets/tomei/tomei10.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-color: rgba(0, 0, 0, 0.3);
  min-height: 100vh; */
}

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


<style></style>
