<template>
    <br>
    <h2>Beneficios actuales: {{ '10,000,000 ' }}Lps</h2>
    <br>
    <hr>
    <hr>
    <br>
    <v-row class="mb-5">
        <v-col cols="4" class="cards">
            <CardMenu :tittle="'Configurar productos '" :img="productosImg"
                :description="'Aquí puede gestionar los precios del inventario, así como la demanda y nuevos productos'"
                :type="'productos'"
                :idStore="idStore" />
        </v-col>
        <v-col cols="4" class="cards">
            <CardMenu :tittle="'Comenzar a gestionar '" :img="gestionarImg"
                :description="'Aquí puede comenzar una simulación con la demanda e inventario actuales'"
                :type="'gestion'" 
                :idStore="idStore"/>
        </v-col>
        <v-col cols="4" class="cards">
            <CardMenu :tittle="'Registros anteriores'" :img="historicoImg"
                :description="'Aquí puede visualizar el histórico de las gestiones y proyecciones anteriores'"
                :type="'historico'" 
                :idStore="idStore"/>
        </v-col>
    </v-row>
</template>

<script setup>
import { ref } from 'vue';
import CardMenu from '../components/cardMenu.vue';
import productosImg from '../assets/productos.png';
import gestionarImg from '../assets/gestionar.png';
import historicoImg from '../assets/historico.png';


const idStore= ref(0)
idStore.value= 2; //por mientras
</script>


<style></style>
