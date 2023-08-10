<template>
    <v-parallax src="../assets/tomei/tomei9.jpg" height="auto">
        <div class="blog">
            <Navbar></Navbar>

            <!-- create a sheet  to display all the info of a blog post -->
            <v-sheet class="mx-auto mt-15" max-width="700" elevation="12" rounded="lg"
                style="background-color:rgba(225, 225, 225, 0.4);">
                <v-card-title class="text-center">
                    <h1 class="display-1 font-weight-bold">{{ title }}</h1>
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
                    <div class="comment ma-2" v-for="comment in comments" :key="comment.sender">
                        <v-card width="600" class="mx-auto text-black" variant="tonal">
                            <v-card-title>{{ comment.sender }}</v-card-title>
                            <v-card-subtitle>{{ comment.publish }}</v-card-subtitle>
                            <v-card-text>{{ comment.content }}</v-card-text>
                            <v-card-actions>
                                <v-btn text color="blue-lighten-5" @click="openDialog(message)">reply</v-btn>
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
                                <v-textarea v-model="content" label="Comment Tomei" required></v-textarea>
                            </v-row>
                        </v-container>
                        <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                            Close
                        </v-btn>
                        <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                            Send
                        </v-btn>
                        <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                            Save
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
        blog: {},
        id: null,
        publisherId: null,
        publisherName: null,
        comments: [
            { sender: 'Tomei', publish: '2020-10-10', content: 'This is a comment' }
        ]
    }),
    methods: {
        openDialog(message) {
            this.dialog = true;
            this.currentMessage = message;
        },
        handleLike() {
            increLikeCount(this.id).then(response => {
                // refresh the page and retrieve blog info again
                this.getBlog();
            }).catch((err) => {
                console.log(err);
            });
        },
        handleSave() {
            increSaveCount(this.id).then(response => {
                // refresh the page and retrieve blog info again
                this.getBlog();
            }).catch((err) => {
                console.log(err);
            });
        },
        getBlog() {
            // get a blog
            getBlogs(this.id).then((res) => {
                this.blog = res.data;
            });
        },
        getDetail() {
            // get the details of the post
            getDetails(this.id).then((res) => {
                this.coverPic = res.data.coverPic;
                this.content = res.data.content;
            });
        },
        //call getUser api to get the publisher name
        getPublisherName() {
            this.publisherId = Number(this.blog);
            getUserName(this.publisherId).then(response => {
                console.log(this.publisherId)
                this.publisherName = response.msg;
            }).catch((err) => {
                console.log(err);
            });
        },
    },
    // the created lifecycle hood is running before the computed property
    created() {
        // get the id of the blog
        this.id = Number(this.$route.params.id);

        // get the details of the blog
        this.getDetail();
        this.getBlog();
        this.getPublisherName();

    }
}
</script>

<style></style>
