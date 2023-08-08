<template>
    <v-parallax src="../assets/tomei/tomei6.jpg" height="auto">
        <Navbar></Navbar>
        <v-container class="categories" >
            <!-- display loading spinner when data is being fetched -->
            <v-progress-circular v-if="loading"></v-progress-circular>

            <!-- display the card only when data is avaliable -->
            <v-card v-if="!loading && categoryList" class="text-white mt-10" variant="tonal" style="min-height: 100vh; width: 100%;">
                <v-tabs v-model="tab" bg-color="transparent" color="basil" grow>
                    <v-tab> All Posts </v-tab>
                    <v-tab v-for="(category, index) in categoryList.slice(0, 5)" :key="index" :value="category">
                        {{ category.name }}
                    </v-tab>
                    <v-menu v-if="categoryList.length > 5">
                        <template v-slot:activator="{ props }">
                            <v-btn variant="plain" rounded="0" class="align-self-center me-4" height="100%" v-bind="props">
                                more
                                <v-icon end>
                                    mdi-menu-down
                                </v-icon>
                            </v-btn>
                        </template>

                        <v-list class="trans-background">
                            <v-tab v-for="(category, index) in categoryList.slice(5,)" :key="index" :value="category">
                                {{ category.name }}
                            </v-tab>
                        </v-list>
                    </v-menu>

                </v-tabs>

                <v-window v-model="tab">
                    <v-window-item value="all">
                        <v-container fluid>
                            <Category :categoryID="null"></Category>
                        </v-container>
                    </v-window-item>

                    <v-window-item v-for="(category, index) in categoryList" :key="index" :value="category">
                        <v-container fluid>
                            <Category :categoryID="category.id"></Category>
                        </v-container>
                    </v-window-item>
                </v-window>
            </v-card>
        </v-container>
    </v-parallax>
</template>


<script>
import Navbar from '/home/tomeiUser/src/components/Navbar.vue';
import Category from '/home/tomeiUser/src/components/Category.vue';
import { listCategory } from '@/api/category';
export default {
    name: 'Categories',
    components: {
        Navbar,
        Category,
    },
    data: () => ({
        mode: 'light',
        valid: false,
        tab: null,
        loading: true,
        categoryList: [],
        queryParams: {
            name: null,
            description: null
        },
    }),
    created() {
        this.getList();
    },
    methods: {
        getList() {
            this.loading = true;
            listCategory(this.queryParams).then(response => {
                this.categoryList = response.rows;
                this.loading = false;
                console.log(this.categoryList);
            });
        }
    },
}
</script>