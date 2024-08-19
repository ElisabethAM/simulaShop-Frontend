<template>
    <footer class="footer mx-5">
        <v-btn @click="guia=true" class="no-focus"  color="#B98D4C">
            Manual
            <img src="../assets/play.png" alt="icono" class="ml-3 play">
        </v-btn>
        <v-btn @click="modelo=true" class="no-focus" color="#B98D4C">
            Modelo
            <img src="../assets/play.png" alt="icono" class="ml-3 play">
        </v-btn>
    </footer>
    <!-- dialogo para carrusel de guia de usuario -->
    <v-dialog v-model="guia" width="auto">
        <v-card width="1000px"
          prepend-icon="mdi-book"
          title="Guía de uso"
        >
            <v-carousel progress="success" hide-delimiters height="530" show-arrows="hover">
            <v-carousel-item :src="paso1"></v-carousel-item>
            <v-carousel-item :src="paso2"></v-carousel-item>
            <v-carousel-item :src="paso3"></v-carousel-item>
            <v-carousel-item :src="paso4"></v-carousel-item>
            <v-carousel-item :src="paso5"></v-carousel-item>
            <v-carousel-item :src="paso6"></v-carousel-item>
            <v-carousel-item :src="paso7"></v-carousel-item>
            <v-carousel-item :src="paso8"></v-carousel-item>
        </v-carousel>
        </v-card>
    </v-dialog>

    <!-- dialogo para carrusel de regresión lineal -->
    <v-dialog v-model="modelo" width="auto">
        <v-card width="1000px"
          prepend-icon="mdi-pencil"
          title="Modelo utilizado"
        >
            <v-carousel progress="success" hide-delimiters height="530" show-arrows="hover">
            <v-carousel-item :src="modelo1"></v-carousel-item>
            <v-carousel-item :src="modelo2"></v-carousel-item>
            <v-carousel-item :src="modelo3"></v-carousel-item>
            <v-carousel-item :src="modelo4"></v-carousel-item>
            <v-carousel-item :src="modelo5"></v-carousel-item>
            <v-carousel-item :src="modelo6"></v-carousel-item>

        </v-carousel>
        </v-card>
    </v-dialog>

</template>

<script setup>
import { ref } from 'vue'
import paso1 from "../assets/guia/paso 1.png";
import paso2 from "../assets/guia/paso 2.png";
import paso3 from "../assets/guia/paso 3.png";
import paso4 from "../assets/guia/paso 4.png";
import paso5 from "../assets/guia/paso 5.png";
import paso6 from "../assets/guia/paso 6.png";
import paso7 from "../assets/guia/paso 7.png";
import paso8 from "../assets/guia/paso 8.png";
import modelo1 from "../assets/guia/modelo1.png";
import modelo2 from "../assets/guia/modelo2.png";
import modelo3 from "../assets/guia/modelo3.png";
import modelo4 from "../assets/guia/modelo4.png";
import modelo5 from "../assets/guia/modelo5.png";
import modelo6 from "../assets/guia/modelo6.png";

const guia = ref(false);
const modelo = ref(false);


</script>

<style scoped>
.no-focus:focus {
    outline: none;
    /* Elimina el borde de enfoque */
}

.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 32px;
    height: 200px;
    /* Aumenta el padding para el footer */
    border-radius: 0 0 16px 16px;
    /* Aumenta el radio de borde */
}

.play {
    height: 30px;
}

.footer .v-btn {
    font-size: 1.25rem;

    padding: 16px 32px;

    min-width: 150px;

    min-height: 70px;
    border-radius: 5%;
}
</style>