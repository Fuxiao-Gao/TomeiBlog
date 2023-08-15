<template>
    <v-parallax src="../assets/tomei/tomei9.jpg" height="auto">
        <div class="blog">
            <Navbar></Navbar>

            <!-- create a sheet  to display all the info of a blog post -->
            <v-sheet class="mx-auto mt-15" max-width="700" elevation="12" rounded="lg"
                style="background-color:rgba(225, 225, 225, 0.4);">
                <v-card-title class="text-center">
                    <h1 class="display-1 font-weight-bold">{{ blog.title }}</h1>
                </v-card-title>
                <v-card-subtitle class="text-center">
                    <h3 class="font-weight-light">{{ publisherName }}</h3>
                </v-card-subtitle>
                <v-card-text>
                    <v-img :src=coverPic height="500px" contain></v-img>
                </v-card-text>
                <v-card-text class="text-black">
                    <div>
                        {{ content }}
                    </div>
                </v-card-text>

                <v-card-actions>
                    <v-btn color="white" variant="text" @click="handleLike()">
                        liked( {{ blog.likeCount }})
                    </v-btn>
                    <v-btn color="white" variant="text" @click="handleSave()">
                        saved( {{ blog.saveCount }} )
                    </v-btn>
                    <v-btn color="white" variant="text" @click="openDialog(message)">
                        comments( {{ blog.commentCount }} )
                    </v-btn>
                </v-card-actions>

                <!-- comment section -->
                <div class="d-flex align-center flex-column ma-0">
                    <div class="text-h5 ma-2" style="color: rgba(0,0,0,0.5);">Comment Section</div>
                    <!-- display each message here -->
                    <div class="comment ma-2" v-for="commentEach in comments" :key="commentEach.id">
                        <v-card width="600" class="mx-auto text-black" variant="tonal">
                            <v-card-title>{{ commentPublishers[commentEach.publishUser] }}</v-card-title>
                            <v-card-subtitle>{{ commentEach.createdTime }}</v-card-subtitle>
                            <v-card-text>{{ commentEach.content }}</v-card-text>
                            <v-card-actions>
                                <v-btn text color="blue-lighten-5"
                                    @click="handleCommentLike(commentEach.id)">like({{ commentEach.likeCount }})</v-btn>
                            </v-card-actions>
                        </v-card>
                    </div>
                </div>
            </v-sheet>

            <!-- create one dialogue for the user to reply to any message. -->
            <!-- be careful, this is tricky, since the dialogue is used to reply to both the blog and the comment -->
            <v-dialog v-model="dialog" persistent width="1024">
                <v-card>
                    <v-card-title>
                        <span class="text-h5">Comment</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-textarea v-model="commentParams.content" label="Comment Tomei" required></v-textarea>
                            </v-row>
                        </v-container>
                        <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                            Close
                        </v-btn>
                        <v-btn color="blue-darken-1" variant="text" @click="addComment()">
                            Send
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
    </v-parallax>
</template>


<script>
import Navbar from '@/components/Navbar.vue';
import { getDetails } from '@/api/details.js';
import { getBlogs } from '@/api/blogs';
import { increLikeCount } from '@/api/blogs';
import { increSaveCount } from '@/api/blogs';
import { increCommentCount } from '@/api/blogs';
import { getUserName } from '@/api/users';
import { listLikes } from '@/api/likes';
import { listSaved } from '@/api/saved';
import { listComments, addComments, increCommentsLike } from '@/api/comments';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
export default {
    name: 'blog',
    components: {
        Navbar,
    },
    data: () => ({
        valid: false,
        dialog: false,
        content: null,
        coverPic: null,
        userHasLiked: false,
        userHasSaved: false,
        userHasLikedComment: {},
        blog: {
            id: null,
            publisherId: null,
            title: null,
            categoryId: null,
            likeCount: null,
            commentCount: null,
            saveCount: null,
        },
        comment: {
            pageNum: 1,
            pageSize: 12,
            blogBelong: null,
        },
        commentParams: {
            content: null,
            publishUser: null,
            blogBelong: null
        },
        commentPublishers: {},
        comments: [],
        save: {
            userId: null,
            blogId: null,
        },
        like: {
            userId: null,
            blogId: null,
            commentId: null,
        },
        commentLike: {
            userId: null,
            blogId: null,
            commentId: null,
        },
        publisherName: null
    }),
    methods: {
        openDialog(message) {
            this.dialog = true;
            this.currentMessage = message;
        },
        handleLike() {
            // if the user in store is null, notify the user to relogin
            if (this.userHasLiked) {
                // if the user has liked the post, do nothing
                console.log("user has already liked the post");
                return;
            } else {
                increLikeCount(this.like).then(response => {
                    // refresh the page and retrieve blog info again
                    this.userHasLiked = true;
                    this.getBlog();
                }).catch((err) => {
                    console.log(err);
                });
            }
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
        handleSave() {
            // if the user in store is null, notify the user to relogin
            if (this.userHasSaved) {
                console.log("user has already saved the post");
                return;
            } else {
                increSaveCount(this.save).then(response => {
                    // refresh the page and retrieve blog info again
                    this.userHasSaved = true;
                    this.getBlog();
                }).catch((err) => {
                    console.log(err);
                });
            }
        },
        getBlog() {
            // get a blog
            getBlogs(this.blog.id).then((res) => {
                this.blog = res.data;
                this.getPublisherName();

                this.save.blogId = this.blog.id;
                this.save.userId = localStorage.getItem('userId');

                this.like.blogId = this.blog.id;
                this.like.userId = localStorage.getItem('userId');

                this.commentLike.userId = localStorage.getItem('userId');

                this.commentParams.publishUser = localStorage.getItem('userId');
                this.commentParams.blogBelong = this.blog.id;

                //check whether listLikes return an empty list or not
                listLikes(this.like).then(response => {
                    if (response.total == 0) {
                        this.userHasLiked = false;
                    } else {
                        this.userHasLiked = true;
                    }
                }).catch((err) => {
                    console.log(err);
                });

                //check whether listSaved return an empty list or not
                listSaved(this.save).then(response => {
                    if (response.total == 0) {
                        this.userHasSaved = false;
                    } else {
                        this.userHasSaved = true;
                    }
                }).catch((err) => {
                    console.log(err);
                });
            });
        },
        getDetail() {
            // get the details of the post
            getDetails(this.blog.id).then((res) => {
                this.coverPic = res.data.coverPic;
                this.content = res.data.content;
            });
        },
        getComments() {
            listComments(this.comment).then(response => {
                this.comments = response.rows;

                // get publisherName for each comment
                this.comments.forEach(comment => {
                    this.getCommentPublisherName(comment.publishUser);
                });
            }).catch((err) => {
                console.log(err);
            });
        },
        addComment() {
            // add a comment
            increCommentCount(this.commentParams).then(response => {
                this.getComments();
                this.dialog = false;
            }).catch((err) => {
                console.log(err);
            });
        },
        //call getUser api to get the publisher name
        getPublisherName() {
            getUserName(this.blog.publisherId).then(response => {
                this.publisherName = response.msg;
            }).catch((err) => {
                console.log(err);
            });
        },
        getCommentPublisherName(publisherId) {
            // if the publisher name is already in the map, return
            if (this.commentPublishers[publisherId]) return;

            getUserName(publisherId).then(response => {
                //build a map to store the publisher name
                this.commentPublishers[publisherId] = response.msg;
            }).catch((err) => {
                console.log(err);
            });
        },
    },
    // the created lifecycle hood is running before the computed property
    created() {
        // get the id of the blog
        this.blog.id = Number(this.$route.params.id);
        this.comment.blogBelong = this.blog.id;
        // get the details of the blog
        this.getDetail();
        this.getBlog();
        this.getComments();
    },
    computed() {
        //extract likeCount for comments
    }
}
</script>
<style></style>
