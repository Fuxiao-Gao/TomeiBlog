<template>
  <v-parallax src="../assets/tomei/tomei14.jpg" height="auto">
    <Navbar></Navbar>

    <v-container class="display:flex">
      <v-row>
        <!-- Personal info -->
        <v-col cols="12" sm="6">
          <v-card class="mx-auto text-center fixed-min-height-card" style="background-color:rgba(225, 225, 225, 0.4);">
            <v-card-title class="justify-center">
              <div class="headline mt-5">User Info</div>
            </v-card-title>
            <v-card-subtitle class="pb-0">
              <v-avatar size="100" class="mx-auto">
                <img :src="user.profilePic" alt="Avatar">
              </v-avatar>
            </v-card-subtitle>
            <v-card-text class="title text-h6">
              {{ user.username }}
            </v-card-text>
            <v-card-text class="text-subtitle-1">
              Email: {{ user.email }}
            </v-card-text>
            <v-card-text class="caption">
              <v-row class="mt-3 justify-center">
                <v-col cols="6" sm="4" md="6">
                  <div>followers: {{ followerCount }}</div>
                </v-col>
                <v-col cols="6" sm="4" md="6">
                  <div>Following: {{ followingCount }}</div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Posts -->
        <v-col cols="12" sm="6">
          <v-card class="text-white fixed-min-height-card" style="background-color:rgba(225, 225, 225, 0.4);">
            <v-card-title>Posts</v-card-title>
            <!-- Posts section -->
            <div v-for="post in posts" :key="post.id">
              <v-row>
                <v-col cols="6" class="mt-2 pl-2">
                  <v-img :src="blogCovers[post.id]" class="ma-3 uniform-image rounded-corners"></v-img>
                </v-col>
                <v-col cols="6" class="mr-0">
                  <router-link :to="`/blog/${post.id}`" style="color: white">
                    <v-card-title>{{ post.title }}</v-card-title>
                  </router-link>
                  <v-card-subtitle>created on {{ formatDate(post.createTime) }}</v-card-subtitle>
                  <v-card-actions>
                    <v-btn color="blue-lighten-4" variant="tonal" @click="">Edit</v-btn>
                    <v-btn color="blue-lighten-4" variant="tonal" @click="handleDeletePost(post.id)">Delete</v-btn>
                  </v-card-actions>
                </v-col>
              </v-row>
            </div>
            <!-- Pagination section -->
            <v-pagination v-model="postsPage" :length="postsPageCount" class="my-5"></v-pagination>
          </v-card>
        </v-col>
      </v-row>


      <v-row>
        <!-- Comments -->
        <v-col cols="12" sm="6">
          <v-card class="text-white fixed-min-height-card" style="background-color:rgba(225, 225, 225, 0.4);">
            <v-card-title>Comments</v-card-title>
            <v-list-item-group v-for="item in comments" :key="item.id">
              <v-list-item> <v-card>
                  <router-link :to="`/blog/${item.blogBelong}`" style="color: white">
                    <v-card-title>{{ blogTitles[item.id] }}</v-card-title>
                  </router-link>
                  <v-card-subtitle> created on {{ item.createdTime }}</v-card-subtitle>
                  <v-card-text>{{ item.content }}</v-card-text>
                  <v-card-actions>
                    <v-btn text color="blue-lighten-5"
                      @click="handleCommentLike(item.id)">like({{ item.likeCount }})</v-btn>
                    <v-btn text color="blue-lighten-5" @click="handleCommentDelete(item.id)">delete</v-btn>
                  </v-card-actions>
                </v-card></v-list-item>
            </v-list-item-group>
            <!-- Pagination section -->
            <v-pagination v-model="postsPage" :length="postsPageCount" class="my-5"></v-pagination>
          </v-card>
        </v-col>


        <!-- Saved Posts -->
        <v-col cols="12" sm="6">
          <v-card class="text-white fixed-min-height-card" style="background-color:rgba(225, 225, 225, 0.4);">
            <v-card-title>Saved Posts</v-card-title>
            <!-- Posts section -->
            <div v-if="loadingBlog || loadingDetails">loading...</div>

            <div v-else v-for="post in saved" :key="post.blogId">
              <v-row>
                <v-col cols="6">
                  <v-img :src="savedBlogCovers[post.blogId]" class="ma-3 uniform-image rounded-corners"></v-img>
                </v-col>
                <v-col cols="6">
                  <router-link :to="`/blog/${post.blogId}`" style="color: white">
                    <v-card-title>{{ savedBlog[post.blogId].title }}</v-card-title>
                  </router-link>
                  <v-card-subtitle>created on {{ formatDate(savedBlog[post.blogId].createTime) }}</v-card-subtitle>
                  <v-card-subtitle>{{ post.description }}</v-card-subtitle>
                  <v-card-actions>
                    <v-card-actions>
                      <v-btn color="blue-lighten-5" variant="tonal" @click="">Remove</v-btn>
                      <v-btn color="blue-lighten-5" variant="tonal" @click="handleDeleteSaved(post.blogId)">Delete</v-btn>
                    </v-card-actions>
                  </v-card-actions>
                </v-col>
              </v-row>
            </div>
            <!-- Pagination section -->
            <v-pagination v-model="postsPage" :length="postsPageCount" class="my-5"></v-pagination>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-parallax>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import { getUsers } from '../api/users.js';
import { listComments, increCommentsLike, delComments } from '@/api/comments';
import { getBlogs, listBlogs } from '@/api/blogs';
import { getDetails } from '@/api/details';
import { listLikes } from '@/api/likes';
import { listSaved } from '@/api/saved';
import { listList } from '@/api/list';
import { delBlogs } from '@/api/blogs';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
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
    loadingBlog: false,
    loadingDetails: false,
    user: {
      username: null,
      email: null,
      profilePic: null
    },
    followerParams: {
      followeeId: localStorage.getItem('userId'),
    },
    followingParams: {
      followerId: localStorage.getItem('userId'),
    },
    followerCount: 0,
    followingCount: 0,
    postParams: {
      pageNum: 1,
      pageSize: 3,
      publisherId: localStorage.getItem('userId'),
    },
    posts: [],
    blogTitles: {},
    blogCovers: {},
    commentParams: {
      pageNum: 1,
      pageSize: 3,
      publishUser: localStorage.getItem('userId'),
    },
    commentLike: {
      userId: localStorage.getItem('userId'),
      blogId: null,
      commentId: null,
    },
    comments: [],
    savedParams: {
      pageNum: 1,
      pageSize: 3,
      userId: localStorage.getItem('userId'),
    },
    savedBlogCovers: {},
    savedBlog: {},
    saved: [],
    followers: [
    ],
    following: [
    ],
  }),
  methods: {
    listComments() {
      listComments(this.commentParams).then(response => {
        this.comments = response.rows;
        //get all the blog titles
        this.comments.forEach((comment) => {
          getBlogs(comment.blogBelong).then(response => {
            this.blogTitles[comment.id] = response.data.title;
          }).catch((err) => {
            console.log(err);
          });
        });
      }).catch((err) => {
        console.log(err);
      });
    },
    getUser() {
      getUsers(localStorage.getItem('userId')).then(response => {
        this.user = response.data;
        this.user.profilePic = this.user.profilePic ? import.meta.env.VITE_API_BASE_URL + this.user.profilePic : '../assets/tomei/tomei1.jpg';
        //console.log(this.user.profilePic)
      }).catch((err) => {
        console.log(err);
      });
    },
    listBlogs() {
      // check if the value is not null
      if (this.postParams.publisherId) {
        listBlogs(this.postParams).then(response => {
          this.posts = response.rows;
          //get all the blog details
          this.posts.forEach((post) => {
            getDetails(post.id).then(response => {
              this.blogCovers[post.id] = response.data.coverPic;
            }).catch((err) => {
              console.log(err);
            });
          });
        }).catch((err) => {
          console.log(err);
        });
      }
    },
    getFollowers() {
      listList(this.followerParams).then(response => {
        this.followerCount = response.total;
      }).catch((err) => {
        console.log(err);
      });
    },
    getFollowing() {
      listList(this.followingParams).then(response => {
        this.followingCount = response.total;
      }).catch((err) => {
        console.log(err);
      });
    },
    handleDeletePost(blogId) {
      delBlogs(blogId).then(response => {
        // refresh the page and retrieve blog info again
        this.listBlogs();
      }).catch((err) => {
        console.log(err);
      });
    },
    listSaved() {
      this.loadingBlog = true;
      this.loadingDetails = true;

      listSaved(this.savedParams).then(response => {
        this.saved = response.rows;

        // Get all the blogs
        let blogPromises = this.saved.map(post => {
          return getBlogs(post.blogId).then(response => {
            this.savedBlog[post.blogId] = response.data;
          });
        });

        // Get all the blog details
        let detailPromises = this.saved.map(post => {
          return getDetails(post.blogId).then(response => {
            this.savedBlogCovers[post.blogId] = response.data.coverPic;
          });
        });

        // Return combined promises
        return Promise.all([...blogPromises, ...detailPromises]);

      }).then(() => {
        this.loadingBlog = false;
        this.loadingDetails = false;

      }).catch(err => {
        // Always ensure your loading flags are set to false in case of an error to prevent infinite loaders.
        this.loadingBlog = false;
        this.loadingDetails = false;
        console.log(err);
      });
    },
    listSaved() {
      listSaved(this.savedParams).then(response => {
        this.loadingBlog = true;
        this.loadingDetails = true;
        this.saved = response.rows;

        // Get all the blogs
        let blogPromises = this.saved.map(post => {
          return getBlogs(post.blogId).then(response => {
            this.savedBlog[post.blogId] = response.data;
          });
        });

        // Get all the blog details
        let detailPromises = this.saved.map(post => {
          return getDetails(post.blogId).then(response => {
            this.savedBlogCovers[post.blogId] = response.data.coverPic;
          });
        });

        // Merge all promises into one array
        let allPromises = blogPromises.concat(detailPromises);
        // Use Promise.all to wait for all promises to resolve
        return Promise.all(allPromises);
      })
        .then(() => {
          this.loadingBlog = false;
          this.loadingDetails = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleCommentLike(commentId) {
      //if the user in store is null, notify the user to relogin
      this.commentLike.commentId = commentId;

      listLikes(this.commentLike).then(response => {
        if (response.total == 0) {
          this.userHasLikedComment[commentId] = false;
          increCommentsLike(this.commentLike).then(response => {
            // refresh the page and retrieve blog info again
            this.userHasLikedComment[commentId] = true;
            this.getComments();
          }).catch((err) => {
            console.log(err);
          });
        } else {
          this.userHasLikedComment[commentId] = true;
          console.log("user has already liked the comment");
          return;
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    handleCommentDelete(commentId) {
      delComments(commentId).then(response => {
        // refresh the page and retrieve blog info again
        this.getComments();
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
  },
  created() {
    this.getUser();
    this.listComments();
    this.listBlogs();
    this.listSaved();
    this.getFollowers();
    this.getFollowing();
  },
}
</script>

<style scoped>
.scrollable-section {
  overflow-y: auto;
}

.uniform-image img {
  width: 80px !important;
  height: 70px !important;
  object-fit: fill !important;
}

.rounded-corners {
  border-radius: 4px;
  /* Adjust this value as needed */
}

.compact-card {
  height: 150px;
  /* Adjust this value according to your needs */
  overflow: hidden;
  /* Hide overflow content to ensure clean design */
}


.fixed-min-height-card {
  height: 700px;
  /* or any value you find appropriate */
  display: flex;
  flex-direction: column;
}
</style>
