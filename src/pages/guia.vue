<template>
    <v-carousel progress="success" hide-delimiters height="530" show-arrows="hover">
        <v-carousel-item :src="paso1" ></v-carousel-item>
        <v-carousel-item :src="paso2" ></v-carousel-item>
        <v-carousel-item :src="paso3" ></v-carousel-item>
        <v-carousel-item :src="paso4" ></v-carousel-item>
        <v-carousel-item :src="paso5" ></v-carousel-item>
        <v-carousel-item :src="paso6" ></v-carousel-item>
        <v-carousel-item :src="paso7" ></v-carousel-item>
        <v-carousel-item :src="paso8" ></v-carousel-item>
    </v-carousel>
    <br>
</template>

<script setup>
import paso1 from "../assets/guia/paso 1.png";
import paso2 from "../assets/guia/paso 2.png";
import paso3 from "../assets/guia/paso 3.png";
import paso4 from "../assets/guia/paso 4.png";
import paso5 from "../assets/guia/paso 5.png";
import paso6 from "../assets/guia/paso 6.png";
import paso7 from "../assets/guia/paso 7.png";
import paso8 from "../assets/guia/paso 8.png";
</script>

<style scoped></style>