<template>
    <v-parallax src="../assets/tomei/tomei17.jpg">
        <Navbar></Navbar>
        <v-container class="messages">
            <div class="d-flex align-center flex-column mt-15">
                <div class="text-h5 ma-2" style="color: rgba(0, 0, 0, 0.6);">Message Box</div>
                <!-- display each message here -->
                <div class="message ma-2" v-for="message in messages" :key="message.sender">
                    <v-card width="600" class="mx-auto text-black" variant="tonal">
                        <v-card-title>{{ message.sender }}</v-card-title>
                        <v-card-subtitle>{{ message.publish }}</v-card-subtitle>
                        <v-card-text>{{ message.content }}</v-card-text>
                        <v-card-actions>
                            <v-btn text color="blue-lighten-5" @click="openDialog(message)">reply</v-btn>
                        </v-card-actions>
                    </v-card>
                </div>

                <!-- create one dialogue for the user to reply to any message -->
                <v-dialog v-model="dialog" persistent width="1024">
                    <v-card>
                        <!-- display the the message you are replying to -->
                        <v-card-title>
                            <v-card-title>{{ currentMessage.sender }}</v-card-title>
                            <v-card-subtitle>{{ currentMessage.publish }}</v-card-subtitle>
                            <v-card-text>{{ currentMessage.content }}</v-card-text>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-textarea v-model="content" :label="`Reply to ${currentMessage.sender}`"
                                        required></v-textarea>
                                </v-row>
                            </v-container>
                            <small>*indicates required field</small>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="white" variant="text" @click="dialog = false">
                                Close
                            </v-btn>
                            <v-btn color="white" variant="text" @click="dialog = false">
                                Save
                            </v-btn>
                            <v-btn color="white" variant="text" @click="dialog = false">
                                Send
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>

        </v-container>
    </v-parallax>
</template>

<script>
import Navbar from '../components/Navbar.vue';
export default {
    name: 'Home',
    components: {
        Navbar,
    },
    data: () => ({
        valid: false,
        dialog: false,
        returnMessage: null,
        messages: [
            { sender: 'Tomei', publish: '2020-10-10', content: 'Hello World' },
            { sender: 'Tomei', publish: '2020-10-10', content: 'Hello World' },
            { sender: 'Tomei', publish: '2020-10-10', content: 'Hello World' },
            { sender: 'Tomei', publish: '2020-10-10', content: 'Hello World' },
            { sender: 'Tomei', publish: '2020-10-10', content: 'Hello World' },
            { sender: 'Tomei', publish: '2020-10-10', content: 'Hello World' },
            { sender: 'Tomei', publish: '2020-10-10', content: 'Hello World' },
            { sender: 'Tomei', publish: '2020-10-10', content: 'Hello World' },
        ]
    }),
    methods: {
        openDialog(message) {
            this.currentMessage = message;
            this.dialog = true;
        },
    }
}
</script>

<style scoped>
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