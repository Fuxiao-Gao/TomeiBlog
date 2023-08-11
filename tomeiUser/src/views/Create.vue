<template>
    <v-parallax src="../assets/tomei/tomei4.jpg" height="1000">
        <div class="create">
            <v-container fluid class="navbar">
                <v-row>
                    <v-col cols="3" class="d-flex align-center pa-0 ma-0">
                        <v-text-field dense class="ml-2" label="Search" prepend-inner-icon="mdi-magnify"></v-text-field>
                    </v-col>
                    <v-col cols="9" class="d-flex align-center pa-0 ma-0">
                        <v-row class="justify-end mr-5">
                            <v-btn class="hidden-xs" text color="blue-lighten-5" variant="text" to="/">Home</v-btn>
                            <v-btn class="hidden-md-and-down" text color="blue-lighten-5" variant="text"
                                to="/categories">Categories</v-btn>

                            <v-btn class="hidden-xs-and-down" text color="blue-lighten-5" variant="text"
                                to="/about">About</v-btn>

                            <v-menu open-on-hover>
                                <template v-slot:activator="{ props }">
                                    <v-btn class="hidden-xs" text color="blue-lighten-4 mr-2" v-bind="props"
                                        variant="text">Account</v-btn>
                                </template>

                                <v-list class="trans-background">
                                    <v-list-item v-for="(PersonalItem, index) in PersonalItems" :key="index"
                                        :to="PersonalItem.link">
                                        <v-list-item-title>{{ PersonalItem.title }}</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>

                            <div class="ml-6">
                                <p class="font-weight-light ma-2">
                                    TOMEI BLOG
                                </p>
                            </div>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>

            <v-container class="create-blog mt-15 mx-auto">
                <v-sheet style="background-color:rgba(0, 0, 0, 0.35);" rounded="lg">
                    <v-form ref="form" v-model="valid" class="ma-3">
                        <v-text-field class="pa-5" v-model="form.title" label="Blog Title" required></v-text-field>

                        <v-textarea class="pa-5" v-model="form.content" label="Content" required></v-textarea>

                        <v-row align="center">
                            <v-col cols="12" md="8">
                                <v-text-field class="pa-5" v-model="form.coverPicture" prepend-icon="mdi-camera"
                                    label="Image URL" placeholder="Enter your image URL" required>
                                </v-text-field>
                            </v-col>

                            <v-col cols="12" md="4" class="text-center mb-2">
                                <v-btn @click="showImage">Confirm</v-btn>
                            </v-col>

                            <!-- Loading spinner -->
                            <v-col v-if="isLoading" cols="12" class="text-center">
                                <v-progress-circular indeterminate></v-progress-circular>
                            </v-col>
                        </v-row>


                        <div v-if="displayImage">
                            <img :src="form.coverPicture" alt="Uploaded Image" width="300">
                        </div>
                        <v-combobox class="pa-5" v-model="form.categoryId" :items="categoryNames" density="compact"
                            label="Category"></v-combobox>

                        <v-btn text color="blue-lighten-5" variant="tonal" class="mr-4 mb-6" @click="submit">
                            Submit
                        </v-btn>

                    </v-form>
                </v-sheet>
            </v-container>
        </div>
    </v-parallax>
</template>

<script>
import { addBlogs } from '@/api/blogs';
import { listCategory } from '@/api/category';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { getUsers } from '@/api/users';
export default {
    name: 'Create',
    data: () => ({
        valid: true,
        title: '',
        loading: true,
        isLoading: false,
        form: {
            publisherId: null,
            title: '',
            content: '',
            coverPicture: '',
            categoryId: '',
        },
        valid: false,
        displayImage: false,
        categoryList: [],
        queryParams: {
            name: null,
            description: null
        },
        PersonalItems: [
            { title: 'My WorkSpace', link: "/myworkspace" },
            { title: 'Messages', link: "/messages" },
        ],
    }),
    created() {
        // if this.$store.state.user.token doesn't exist, call swal fire
        if (!this.$store.state.user.token) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You need to login first!',
            }).then(() => {
                this.$router.push('/login');
            });
        }
        this.getCategory();
        console.log("id in store" + this.$store.state.user);
        console.log(this.$store.state.user)
        this.form.publisherId = this.$store.state.user.id;
    },
    methods: {
        getCategory() {
            this.loading = true;
            // get the list of category
            listCategory(this.queryParams).then(response => {
                this.categoryList = response.rows;
                this.loading = false;
                console.log(this.categoryList);
            });
        },
        submit() {
            if (this.$refs.form.validate()) {
                //get publisherID through username
                const username = this.$store.state.user.username;

                // form is valid, do the submit operation
                addBlogs(this.form).then(response => {
                    this.$modal.msgSuccess("success adding");
                    this.open = false;
                    this.getList();
                });
            }
        },
        async showImage() {
            this.isLoading = true; // Start loading
            this.displayImage = false; // Initially, hide the image

            // Give the browser a moment to start the loading process
            await this.$nextTick();

            const image = new Image();
            image.src = this.form.coverPicture;

            image.onload = () => {
                this.displayImage = true;
                this.isLoading = false; // Stop loading
            };

            image.onerror = () => {
                this.isLoading = false; // Stop loading
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'The image URL is invalid or the image failed to load.',
                });
            };
        },
    },
    computed: {
        categoryNames() {
            return this.categoryList.map(category => category.name);
        }
        //find categoryId by name
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


<style></style>
