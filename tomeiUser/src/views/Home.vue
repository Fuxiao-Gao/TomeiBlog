<template>
  <v-parallax src="../assets/tomei/tomei10.jpg" height="1000">
    <div class="home">
      <!-- navbar -->
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

      <!-- content -->
      <v-container class=" blog-intro fill-height d-flex justify-center">
        <v-row>
          <v-col cols="12" md="6" class="d-flex align-center justify-center">
            <div class="text-center">
              <h1 class="display-3 font-weight-bold">TOMEI BLOG</h1>
              <h3 class="font-weight-light">Through Translucent Tales, We Unveil Souls.</h3>
              <v-btn color="blue-lighten-5" class="mt-5" to="/register">Get Started</v-btn>
            </div>
          </v-col>

          <v-col cols="12" md="6">
            <v-carousel v-if="cards.length" :continuous="false" :show-arrows="false" hide-delimiter-background
              delimiter-icon="mdi-square" height="300">
              <!-- key directive helps vue optimizing its rendering process -->
              <v-carousel-item v-for="card in cards" :key="card.id" contain>
                <v-card variant="tonal" class="mx-auto">
                  <v-img :src=covers[card.id] class="align-end"
                    gradient="to top right, rgba(173,216,230,0.8), rgba(58,128,227,0.6)" height="250px" cover>
                    <router-link :to="`/blog/${card.id}`" style="color: white">
                      <v-card-title>{{ card.title }}</v-card-title></router-link>
                    <v-card-text>
                      <v-row justify="end">
                        <v-col> Created on {{ formatDate(card.createTime) }}</v-col>
                        <v-col> Last Updated on {{ formatDate(card.updateTime) }}</v-col>
                      </v-row>
                    </v-card-text>
                  </v-img>
                </v-card>
              </v-carousel-item>
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
import { listBlogs } from '@/api/blogs';
import { getDetails } from '@/api/details.js';
export default {
  name: 'Home',
  setup() {
    const store = useStore();

    const token = computed(() => store.state.user.token);

    const buttonText = computed(() => {
      return token.value ? 'Logout' : 'Login';
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
    cards: [],
    covers: [],
    PersonalItems: [
      { title: 'My WorkSpace', link: "/myworkspace" },
      { title: 'Messages', link: "/messages" },
    ],
    queryPartams: {
      pageNum: 1,
      pageSize: 8,
      publisherId: null,
      title: null,
      categoryId: null,
      likeCount: null,
      commentCount: null,
      saveCount: null,
      createTime: null,
      updateTime: null
    }
  }),
  created() {
    this.listBlogs();
  },
  methods: {
    listBlogs() {
      listBlogs(this.queryParams).then(response => {
        this.cards = response.rows;

        //get cover image for each card
        this.cards.forEach(card => {
          getDetails(card.id).then(response => {
            this.covers[card.id] = response.data.coverPic;
          }).catch((err) => {
            console.log(err);
          });
        })
      }).catch((err) => {
        console.log(err);
      });
    },
    formatDate(datetime) {
      if (datetime) {
        return datetime.split(' ')[0];
      }
      return '';
    },
  }
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

.blog-intro {
  margin-top: 250px;
}
</style>


<style></style>
