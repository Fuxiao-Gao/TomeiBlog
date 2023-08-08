<template>
    <v-container class="blogs-content mt-5">
        <v-row no-gutters style="width: 100%;">
            <v-col class="ma-1 pa-1" v-for="card in cards" :key="card.title">

                <v-card variant="tonal" class="mx-auto">
                    <v-img :src="card.src" class="align-end"
                        gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.7)" height="200px" cover>

                        <router-link to="/blog" style="color: white">
                            <v-card-title>{{ card.title }}</v-card-title></router-link>
                        <v-card-subtitle class="pt-4">
                            <!-- query using api function getUsers(id) with card.publisher_id as param-->
                             {{ getUserName(card.publisher_id) }}
                        </v-card-subtitle>
                        <v-card-text>
                            <v-row justify="end">user: </v-row>
                        </v-card-text>
                    </v-img>

                    <v-card-actions>
                        <v-btn size="small" color="white" variant="text" icon="mdi-heart"></v-btn>

                        <v-btn size="small" color="white" variant="text" icon="mdi-bookmark"></v-btn>

                        <v-btn size="small" color="white" variant="text" icon="mdi-share-variant"></v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>


<script>
import Navbar from '@/components/Navbar.vue';
import { listBlogs } from '@/api/blogs';
import { getUsers } from '@/api/users';
export default {
    name: 'Travel',
    props: ['categoryID'],
    components: {
        Navbar,
    },
    data: () => ({
        mode: 'light',
        valid: false,
        cards: [],
        users: {},
        queryParams: {
            categoryId: null,
        }
    }),
    watch: {
        categoryID(newCategoryId) {
            this.queryParams.categoryId = newCategoryId;
        },
    },
    created() {
        if (this.categoryID) {
            console.log(this.categoryID);
            this.queryParams.categoryId = this.categoryID;
        }
         this.getList();
    },
    methods: {
        getList() {
            listBlogs(this.queryParams).then(response => {
                this.cards = response.rows;
                this.cards.forEach(card => {
                    if (!this.users[card.publisher_id]) {  // If user not cached, fetch
                        this.fetchUser(card.publisher_id);
                    }
                });
            }).catch((err) => {
                console.log(err);
            });
        },
        fetchUser(publisherId) {
            getUsers(publisherId).then(response => {
                this.$set(this.users, publisherId, response); // Cache the user
            }).catch((err) => {
                console.log(err);
            });
        }
    },
    computed: {
        getUserName() {
            return (publisherId) => {
                const user = this.users[publisherId];
                return user ? user.name : 'Loading...';
            }
        }
    }

}
</script>


<!--  -->
<style scoped></style>