<template>
    <v-parallax src="../assets/tomei/tomei3.jpg" height="1000">
    <div class="about">
        <div class="about-content">
            <v-card class="mx-auto text-black" max-width="700" variant="tonal">
                <template v-slot:title >
                    Tomei Blog
                </template>

                <template v-slot:subtitle>
                    A blog website inspired by tomei/透明愛好家
                </template>

                <template v-slot:text>
                    <p class="font-weight-normal my-3">
                        At the heart of our digital space lies the essence of "tomei" — the Japanese art of translucency. 
                        Just as "tomei" beautifully signifies clarity without opacity, our blog seeks to weave stories, thoughts, 
                        and ideas in a manner that's both transparent and elegant. The aesthetic of our website, deeply inspired by 
                        the unique style of 透明愛好家 on YouTube, serves as a tranquil reflection of the purity of expression we aim to encapsulate. 
                        Every visual component you encounter here is designed to be translucent, mirroring the idea that while our thoughts and emotions 
                        have substance, they are free from obstructions, offering a crystal-clear view into the soul of the content. 
                        This platform is not just a mere compilation of articles; it's a celebration of clarity, simplicity, and the delicate balance 
                        between revelation and concealment. As you traverse through our tomei-inspired pages, we invite you to embrace the serenity and 
                        candidness that each piece has to offer, and hope that this space becomes a sanctuary for those seeking genuine, transparent 
                        narratives in the vast expanse of the digital world.
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