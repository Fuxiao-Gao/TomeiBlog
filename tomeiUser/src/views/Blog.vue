<template>
    <v-parallax src="../assets/tomei/tomei9.jpg" height="auto">
    <div class="blog">
        <Navbar></Navbar>

        <!-- create a sheet  to display all the info of a blog post -->
        <v-sheet class="mx-auto mt-15" max-width="700" elevation="12" rounded="lg"
            style="background-color:rgba(225, 225, 225, 0.4);">
            <v-card-title class="text-center">
                <h1 class="display-1 font-weight-bold">TOMEI BLOG</h1>
            </v-card-title>
            <v-card-subtitle class="text-center">
                <h3 class="font-weight-light">A place to share your stories</h3>
            </v-card-subtitle>
            <v-card-text>
                <v-img src="../assets/tomei/tomei14.jpg" height="500px" contain></v-img>
            </v-card-text>
            <v-card-text class="text-black">
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                    ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                    ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                    ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                </div>
            </v-card-text>

            <v-card-actions>
                <v-btn color="white" variant="text" @click="">
                    liked(5)
                </v-btn>
                <v-btn color="white" variant="text" @click="">
                    saved(20)
                </v-btn>
                <v-btn color="white" variant="text" @click="openDialog(message)">
                    comments(10)
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
import Navbar from '/home/tomeiUser/src/components/Navbar.vue';
export default {
    name: 'blog',
    components: {
        Navbar,
    },
    data: () => ({
        valid: false,
        dialog: false,
        comments: [
            { sender: 'Tomei', publish: '2020-10-10', content: 'This is a comment' },
            { sender: 'Tomei', publish: '2020-10-10', content: 'This is a comment' },
            { sender: 'Tomei', publish: '2020-10-10', content: 'This is a comment' },
            { sender: 'Tomei', publish: '2020-10-10', content: 'This is a comment' },
            { sender: 'Tomei', publish: '2020-10-10', content: 'This is a comment' },
            { sender: 'Tomei', publish: '2020-10-10', content: 'This is a comment' },
            { sender: 'Tomei', publish: '2020-10-10', content: 'This is a comment' },
            { sender: 'Tomei', publish: '2020-10-10', content: 'This is a comment' },
        ]
    }),
    methods: {
        openDialog(message) {
            this.dialog = true;
            this.currentMessage = message;
        },
    },
}
</script>

<style>
.blog {
    /* background-image: url(../assets/tomei/tomei9.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-color: rgba(0, 0, 0, 0.3);
    min-height: 100vh; */
}
</style>
