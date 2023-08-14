<template>
    <v-container class="blogs-content">
        <v-row no-gutters style="width: 100%;">
            <v-col class="ma-1 pa-1" v-for="card in cards" :key="card.id">

                <v-card variant="tonal" class="mx-auto">
                    <v-img :src=covers[card.id] class="align-end"
                        gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.7)" height="200px" cover>

                        <!-- when clicked on the card title, the user is bring to the blog associated with that title -->
                        <router-link :to="`/blog/${card.id}`" style="color: white">
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
        <v-pagination v-model="queryParams.pageNum" :length="Math.ceil(total / queryParams.pageSize)"
            rounded="0"></v-pagination>
    </v-container>
</template>


<script>
import Navbar from '@/components/Navbar.vue';
import { listBlogs } from '@/api/blogs';
import { increLikeCount } from '@/api/blogs';
import { increSaveCount } from '@/api/blogs';
import { increCommentCount } from '@/api/blogs';
import { getUserName } from '@/api/users';
import { getDetails } from '@/api/details.js';

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
        covers: {},
        total: 0,
        loading: true,
        queryParams: {
            pageNum: 1,
            pageSize: 12,
            publisherId: null,
            title: null,
            categoryId: null,
            likeCount: null,
            commentCount: null,
            saveCount: null,
            createTime: null,
            updateTime: null
        },
    }),
    watch: {
        categoryID(newCategoryId) {
            this.queryParams.categoryId = newCategoryId;
        },
        'queryParams.pageNum': {
            handler: function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    this.getList();
                }
            },
            immediate: true
        }
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
                console.log(this.categoryID)
                console.log(response.rows);
                this.total = response.total;
                this.loading = false;
                // get publisherName for eachcard
                this.cards.forEach(card => {
                    this.getPublisherName(card.publisherId);
                });
                //get cover image for each card
                this.cards.forEach(card => {
                    getDetails(card.id).then(response => {
                        this.covers[card.id] = response.data.coverPic;
                    }).catch((err) => {
                        console.log(err);
                    });

                })
                console.log(this.publishers)
            }).catch((err) => {
                console.log(err);
            });
        },
        //call getUser api to get the publisher name from the user database
        getPublisherName(publisherId) {
            // if the publisher name is already in the map, return
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