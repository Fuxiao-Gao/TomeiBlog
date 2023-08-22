<template>
    <v-container class="blogs-content">
        <v-row>
            <v-col cols="12" sm="6" md="4" v-for="card in cards" :key="card.id">
                <v-card variant="tonal" class="mx-auto" style="height: 200px;"> <!-- example fixed height -->
                    <v-img :src="covers[card.id]" class="align-end"
                        gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.7)" height="200px" cover>
                        <router-link :to="`/blog/${card.id}`" style="color: white">
                            <v-card-title class="text-truncate"
                                style="max-width: 90%; white-space: nowrap;">{{ card.title }}</v-card-title>
                        </router-link>

                        <v-card-text>
                            <v-row justify="end">
                                <v-col> Created on {{ formatDate(card.createTime) }}</v-col>
                                <v-col> Last Updated on {{ formatDate(card.updateTime) }}</v-col>
                            </v-row>
                        </v-card-text>
                    </v-img>
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
import { getUserName } from '@/api/users';
import { getDetails } from '@/api/details.js';

export default {
    name: 'Category',
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
            this.getList();
            //  call getList() whenever the categoryID changes
        },
        'queryParams.pageNum': {
            handler: function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    this.getList();
                }
                // remove immediate: true, this means that the watcher will not be invoked upon component creation
            },
        }
    },
    created() {
        // this will only be called one time
        this.queryParams.categoryId = this.categoryID;
        console.log(this.categoryID)
        this.getList();
    },
    methods: {
        getList() {
            listBlogs(this.queryParams).then(response => {
                console.log(this.queryParams)
                this.cards = response.rows;
                console.log(this.cards)
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
    },
}
</script>


<!--  -->
<style scoped>
.fixed-card {
    height: 200px;
    /* or any value you find appropriate */
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>