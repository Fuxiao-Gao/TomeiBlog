<template>
    <v-parallax src="../assets/tomei/tomei3.jpg" height="1000">
    <div class="about">
        <div class="about-content">
            <v-card class="mx-auto text-black" max-width="700" variant="tonal">
                <template v-slot:title>
                    Tomei Blog
                </template>

                <template v-slot:subtitle>
                    A blog website inspired by tomei/透明愛好家
                </template>

                <template v-slot:text>
                    <p class="font-weight-light">
                         Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est
                        labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque
                        porro libero rerum unde voluptatem!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est
                        labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque
                        porro libero rerum unde voluptatem!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est
                        labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque
                        porro libero rerum unde voluptatem!
                    </p>
                </template>
                <v-card-actions>
                    <v-btn variant="plain" to="/">
                        back to home
                    </v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </div>
    </v-parallax>
</template>

<script>


</script>



<style scoped>
.about {
    /* background-image: url(../assets/tomei/tomei3.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-color: rgba(0, 0, 0, 0.3);
    min-height: 100vh; */
}

.about-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
</style>