<template>
    <v-parallax src="../assets/tomei/tomei6.jpg" height="auto">
    <div class="travel">
        <Navbar></Navbar>

        
    </div>
    </v-parallax>
</template>

<script>
import Navbar from '/home/tomeiUser/ src / components / Navbar.vue';
export default {
    name: 'Travel',
    components: {
        Navbar,
    },
    data: () => ({
        mode: 'light',
        valid: false,
        cards: [
            { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg' },
            { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg' },
            { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg' },
            { title: 'Top 10 getaways', src: 'https://cdn.vuetifyjs.com/images/cards/getaway.png' },
            { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg' },
            { title: 'Top 10 getaways', src: 'https://cdn.vuetifyjs.com/images/cards/getaway.png' },
            { title: 'Top 10 getaways', src: 'https://cdn.vuetifyjs.com/images/cards/getaway.png' },
            { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg' },
            { title: 'Top 10 getaways', src: 'https://cdn.vuetifyjs.com/images/cards/getaway.png' },
            { title: 'Top 10 getaways', src: 'https://cdn.vuetifyjs.com/images/cards/getaway.png' },
            { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg' },
            { title: 'Top 10 getaways', src: 'https://cdn.vuetifyjs.com/images/cards/getaway.png' },
            { title: 'Top 10 getaways', src: 'https://cdn.vuetifyjs.com/images/cards/getaway.png' },
            { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg' },
            { title: 'Top 10 getaways', src: 'https://cdn.vuetifyjs.com/images/cards/getaway.png' }
        ],
    }),
}
</script>

<style scoped>
.travel {
    /* background-image: url(/home/tomeiUser/src/assets/tomei/tomei6.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-color: rgba(0, 0, 0, 0.3);
    min-height: 100vh; */
}

</style>


<style></style>
