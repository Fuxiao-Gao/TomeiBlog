<template>
    <v-container class="blogs-content mt-5">
        <v-row no-gutters style="width: 100%;">
            <v-col class="ma-1 pa-1" v-for="card in cards" :key="card.title">

                <v-card variant="tonal" class="mx-auto">
                    <v-img :src="card.src" class="align-end"
                        gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.7)" height="200px" cover>

                        <router-link to="/blog" style="color: white">
                            <v-card-title>{{ card.title }}</v-card-title></router-link>
                        <v-card-subtitle> Published by {{ publishers[card.publisherId] || 'Loading...' }}</v-card-subtitle>
                        <v-card-text>
                            <v-row justify="end">
                                <v-col> Created on {{ formatDate(card.createTime) }}</v-col>
                                <v-col> Last Updated on {{ formatDate(card.updateTime) }}</v-col>
                            </v-row>
                        </v-card-text>
                    </v-img>

                    <v-card-actions>
                        <v-btn size="small" color="white" variant="text" @click="handleLike(card.id)">
                            <v-icon left>mdi-heart</v-icon>
                            {{ card.likeCount }}
                        </v-btn>

                        <v-btn size="small" color="white" variant="text" @click="handleSave(card.id)">
                            <v-icon left>mdi-bookmark</v-icon>
                            {{ card.saveCount }}
                        </v-btn>

                        <v-btn size="small" color="white" variant="text">
                            <v-icon left>mdi-share-variant</v-icon>
                            {{ card.commentCount }}
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>


<script>
import Navbar from '@/components/Navbar.vue';
import { listBlogs } from '@/api/blogs';
import { increLikeCount } from '@/api/blogs';
import { increSaveCount } from '@/api/blogs';
import { increCommentCount } from '@/api/blogs';
import { getUserName } from '@/api/users';
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
        publishers: {},
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
            this.queryParams.categoryId = this.categoryID;
        }
        this.getList();
    },
    methods: {
        getList() {
            listBlogs(this.queryParams).then(response => {
                this.cards = response.rows;
                this.cards.forEach(card => {
                    this.getPublisherName(card.publisherId);
                });
                console.log(this.publishers)
            }).catch((err) => {
                console.log(err);
            });
        },
        //call getUser api to get the publisher name from the user database
        getPublisherName(publisherId) {
            if (this.publishers[publisherId]) return;

            getUserName(publisherId).then(response => {
                //build a map to store the publisher name
                this.publishers[publisherId] = response.msg;
                //this.$set(this.publishers, publisherId, response.msg);
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
        handleLike(id) {
            increLikeCount(id).then(response => {
                console.log("blogId:" + id);
                this.getList();
            }).catch((err) => {
                console.log(err);
            });
        },
        handleSave(id) {
            increSaveCount(id).then(response => {
                this.getList();
            }).catch((err) => {
                console.log(err);
            });
        },
        handleComment(id) {
            increCommentCount(id).then(response => {
                this.getList();
            }).catch((err) => {
                console.log(err);
            });
        },
    },
}
</script>


<!--  -->
<style scoped></style>