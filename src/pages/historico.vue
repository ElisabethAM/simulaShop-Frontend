<template>
    <v-row>
        <v-col cols="12">
            <br>
            <h2>Ciclos anteriores:</h2>
            <br>
            <hr>
            <hr>
            <br>
            <br>
            <!-- tabla de ciclos anteriores -->

            <v-data-table :items="dataset" :headers="headers" class="elevation-6" :items-per-page="5">
                <!-- render del boton visualizar -->
                <template v-slot:item.visualizar="{ item }">
                    <div class="text-center">
                        <router-link :to="`/resultados/${item.cycleNumber}`">
                            <img src="../assets/play.png" alt="icono" class="play">
                        </router-link>
                    </div>
                </template>
            </v-data-table>
        </v-col>

        <v-col cols="12">
            <h2>Proyecciones:</h2>
            <br>
            <hr>
            <hr>
            <br>
            <!-- tabla de proyecciones -->
            <!-- <v-data-table :items="proyections" :headers="headersProyecciones" class="elevation-6" :items-per-page="5">
                <template v-slot:item.visualizar="{ item }">
                    <div class="text-center">
                        <router-link :to="`/resultados/${item.cicleId}`">
                            <img src="../assets/play.png" alt="icono" class="play">
                        </router-link>
                    </div>
                </template>
            </v-data-table> -->

        </v-col>
    </v-row>

</template>

<script setup>
import { ref } from 'vue';
import { useShopStore } from "../stores/shop_store.js";

const shopStore = useShopStore();
let cicles = [];
let dataset = [];
// const proyections = ref(null);

//  const cicles = [
//      {
//          cycleNumber:1,
//          lastBenefits:1695,
//          totalEarnings:1695,
//          _id:"66b6f484b8e8a701dc4fbe2d"
//      }
//  ];

// const proyections = [
//     { cicleId: 1, Registro: 'Frozen Yogurt', Alcance: 'anual' },
//     { cicleId: 2, Registro: 'Ice cream sandwich', Alcance: 'anual' },
//     { cicleId: 3, Registro: 'Eclair', Alcance: 'anual' },
//     { cicleId: 4, Registro: 'Cupcake', Alcance: 'anual' },
//     { cicleId: 5, Registro: 'Gingerbread', Alcance: 'trimestral' },
//     { cicleId: 6, Registro: 'Jelly bean', Alcance: 'anual' },
//     { cicleId: 7, Registro: 'Lollipop', Alcance: 'anual' },
//     { cicleId: 8, Registro: 'Honeycomb', Alcance: 'semestral' },
//     { cicleId: 9, Registro: 'Donut', Alcance: 'anual' },
//     { cicleId: 10, Registro: 'KitKat', Alcance: 'anual' },
// ];

const headers = [
    { title: 'Registro', key: 'cycleNumber', },
    { title: 'Ganancias', key: 'totalEarnings' },
    { title: 'Visualizar', key: 'visualizar', sortable: false },
];

// const headersProyecciones = [
//     { title: 'Registro', key: 'Registro', },
//     { title: 'Alcance', key: 'Alcance' },
//     { title: 'Visualizar', key: 'visualizar', sortable: false },
// ];

// const getCicles = async () => {
     shopStore.getShop();
    cicles = Object.values(shopStore.cicloDatos);
     dataset= cicles.map((cicle)=>{
        cicle.cycleNumber
        // cicle.totalEarnings
    })
    console.log(dataset)
    // console.log(cicles.value)
    // console.log(typeof(cicles.value))
// };
// getCicles();

</script>

<style scoped>
.play {
    height: 25px;
}

/* el componente no deja editar los estilos de encabezado :B */
.encabezado {
    background: #E9D89D !important;
    color: black;
}

.columnas {
    background-color: white;
    color: black;
    border: 1px solid #ccc;
    padding: 0px;
    font-size: 14px;
    width: 160px;
    padding-left: 5px;
    outline: none;
}

.scroll-container {
    height: 400px;
    /* Altura fija */
    overflow-y: auto;
    /* Barra de desplazamiento vertical */
    overflow-x: hidden;
    /* Ocultar barra de desplazamiento horizontal */
}

.footer {
    display: flex;
    justify-content: space-between;
    padding: 0;
    /* Aumenta el padding para el footer */
    border-radius: 0 0 16px 16px;
    /* Aumenta el radio de borde */
}
</style>