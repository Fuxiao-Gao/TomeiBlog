<template>
  <v-parallax src="../assets/tomei/tomei14.jpg" height="auto">
    <Navbar></Navbar>
    
    <v-container>
      <v-row>
        <!-- Personal info -->
        <v-col cols="6">
          <v-card class="mx-auto text-center" style="background-color:rgba(225, 225, 225, 0.4);">
            <v-card-title class="justify-center">
              <div class="headline mt-5">User Info</div>
            </v-card-title>
            <v-card-subtitle class="pb-0">
              <v-avatar size="100" class="mx-auto">
                <img src="../assets/tomei/tomei12.jpg" alt="Avatar">
              </v-avatar>
            </v-card-subtitle>
            <v-card-text class="title">
              {{ user.username }}
            </v-card-text>
            <v-card-text class="body-1">
              Email: {{ user.email }}
            </v-card-text>
            <v-card-text class="Bio">
              orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum.
            </v-card-text>
            <v-card-text class="caption">
              <v-row class="mt-3 justify-center">
                <v-col cols="6" sm="4" md="6">
                  <div>Followers: {{ user.followers.length }}</div>
                </v-col>
                <v-col cols="6" sm="4" md="6">
                  <div>Following: {{ user.following.length }}</div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>


        <!-- Posts -->
        <v-col cols="6">
          <v-card class="text-white" style="background-color:rgba(225, 225, 225, 0.4);">
            <v-card-title>Posts</v-card-title>
            <!-- Posts section -->
            <div v-for="(post, index) in displayedPosts" :key="index">
              <v-row>
                <v-col cols="6">
                  <v-img src="../assets/tomei/tomei11.jpg" height="150px" class="ma-3"></v-img>
                </v-col>
                <v-col cols="6">
                  <v-card-title class="text-h5">{{ post.title }}</v-card-title>
                  <v-card-subtitle>{{ post.description }}</v-card-subtitle>
                  <v-card-actions>
                    <v-btn class="ms-2" variant="outlined" size="small">
                      view post
                    </v-btn>
                  </v-card-actions>
                </v-col>
              </v-row>
            </div>
            <!-- Pagination section -->
            <v-pagination v-model="postsPage" :length="postsPageCount" class="my-5" color="white"></v-pagination>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <!-- Comments -->
        <v-col cols="6">
          <v-card class="text-white" style="background-color:rgba(225, 225, 225, 0.4);">
            <v-card-title>Comments</v-card-title>
            <v-virtual-scroll :items="user.comments" height="650" class="scrollable-section">
              <template v-slot="{ item, index }">
                <div :key="index">
                  <v-list-item>
                    <v-list-item-content>
                      <v-card>
                        <v-card-title>{{ item.replyTo }}</v-card-title>
                        <v-card-subtitle>{{ item.publish }}</v-card-subtitle>
                        <v-card-text>{{ item.content }}</v-card-text>
                      </v-card>
                    </v-list-item-content>
                  </v-list-item>
                </div>
              </template>
            </v-virtual-scroll>
          </v-card>
        </v-col>


        <!-- Saved Posts -->
        <v-col cols="6">
          <v-card class="text-white" style="background-color:rgba(225, 225, 225, 0.4);">
            <v-card-title>Saved Posts</v-card-title>
            <!-- Posts section -->
            <div v-for="(post, index) in displayedSavedPosts" :key="index">
              <v-row>
                <v-col cols="6">
                  <v-img src="../assets/tomei/tomei1.jpg" height="150px" class="ma-3"></v-img>
                </v-col>
                <v-col cols="6">
                  <v-card-title class="text-h5">{{ post.title }}</v-card-title>
                  <v-card-subtitle>{{ post.description }}</v-card-subtitle>
                  <v-card-actions>
                    <v-btn class="ms-2" variant="outlined" size="small">
                      view post
                    </v-btn>
                  </v-card-actions>
                </v-col>
              </v-row>
            </div>
            <!-- Pagination section -->
            <v-pagination v-model="postsPage" :length="postsPageCount" class="my-5" color="white"></v-pagination>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-parallax>
</template>

<script>
import Navbar from '../components/Navbar.vue';

export default {
  name: 'account',
  components: {
    Navbar,
  },
  data: () => ({
    mode: 'light',
    valid: false,
    postsPage: 1,
    itemsPerPage: 3,
    user: {
      username: 'User name',
      email: 'user@example.com',
      avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
      posts: [
        {
          title: 'Post title',
          description: 'Post description',
          coverImage: 'https://cdn.vuetifyjs.com/images/cards/desert.jpg',
        },
        {
          title: 'Post title',
          description: 'Post description',
          coverImage: 'https://cdn.vuetifyjs.com/images/cards/desert.jpg',
        },
        {
          title: 'Post title',
          description: 'Post description',
          coverImage: 'https://cdn.vuetifyjs.com/images/cards/desert.jpg',
        },
        {
          title: 'Post title',
          description: 'Post description',
          coverImage: 'https://cdn.vuetifyjs.com/images/cards/desert.jpg',
        },
        {
          title: 'Post title',
          description: 'Post description',
          coverImage: 'https://cdn.vuetifyjs.com/images/cards/desert.jpg',
        },
      ],
      comments: [
        {
          replyTo: 'Reply to',
          publish: '2021-05-01',
          content: 'Comment content',
        },
        {
          replyTo: 'Reply to',
          publish: '2021-05-01',
          content: 'Comment content',
        },
        {
          replyTo: 'Reply to',
          publish: '2021-05-01',
          content: 'Comment content',
        },
        {
          replyTo: 'Reply to',
          publish: '2021-05-01',
          content: 'Comment content',
        },
        {
          replyTo: 'Reply to',
          publish: '2021-05-01',
          content: 'Comment content',
        },
        {
          replyTo: 'Reply to',
          publish: '2021-05-01',
          content: 'Comment content',
        },
        {
          replyTo: 'Reply to',
          publish: '2021-05-01',
          content: 'Comment content',
        },
      ],
      savedPosts: [
        {
          title: 'Saved Post',
          description: 'Post description',
          coverImage: 'https://cdn.vuetifyjs.com/images/cards/desert.jpg',
        },
        {
          title: 'Saved Post',
          description: 'Post description',
          coverImage: 'https://cdn.vuetifyjs.com/images/cards/desert.jpg',
        },
        {
          title: 'Saved Post',
          description: 'Post description',
          coverImage: 'https://cdn.vuetifyjs.com/images/cards/desert.jpg',
        },
        {
          title: 'Saved Post',
          description: 'Post description',
          coverImage: 'https://cdn.vuetifyjs.com/images/cards/desert.jpg',
        },
        {
          title: 'Saved Post',
          description: 'Post description',
          coverImage: 'https://cdn.vuetifyjs.com/images/cards/desert.jpg',
        },
      ],
      followers: [
        {},
        {},
        {}
      ],
      following: [
        {},
        {},
        {},
        {}
      ]
      // ... more user data
    }
  }),
  computed: {
    // determines how many pages there are in total
    postsPageCount() {
      return Math.ceil(this.user.posts.length / this.itemsPerPage);
    },
    // get the items for the current page
    displayedPosts() {
      const start = (this.postsPage - 1) * this.itemsPerPage;
      return this.user.posts.slice(start, start + this.itemsPerPage);
    },
    displayedSavedPosts() {
      const start = (this.postsPage - 1) * this.itemsPerPage;
      return this.user.savedPosts.slice(start, start + this.itemsPerPage);
    },
  },
}
</script>

<style scoped>
.scrollable-section {
  overflow-y: auto;
}
</style>
