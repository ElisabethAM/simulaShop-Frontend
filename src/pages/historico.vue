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

            <v-data-table :items="cicles" :headers="headers" class="elevation-6" :items-per-page="5">
                <!-- render del boton visualizar -->
                <template v-slot:item.visualizar="{ item }">
                    <div class="text-center">
                        <router-link :to="`/resultados/${item.cicleId}`">
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
            <v-data-table :items="proyections" :headers="headersProyecciones" class="elevation-6" :items-per-page="5">
                <!-- render del boton visualizar -->
                <template v-slot:item.visualizar="{ item }">
                    <div class="text-center">
                        <router-link :to="`/resultados/${item.cicleId}`">
                            <img src="../assets/play.png" alt="icono" class="play">
                        </router-link>
                    </div>
                </template>
            </v-data-table>

        </v-col>
    </v-row>

    <div class="footer my-8 justify-end">
        <v-btn @click="newProyection = true" class="d-flex no-focus pa-6 justify-center" color="#B98D4C">
            <h3>Nueva proyección</h3>
            <img src="../assets/nuevo.png" alt="icono" class="play ml-3">
        </v-btn>
    </div>

    <!-- modal de datos de nueva proyección -->
    <v-dialog v-model="newProyection" max-width="300">
        <v-card>
            <v-card-title class="headline">Crear Proyección</v-card-title>
            <br>

            <main>
                <v-row class="px-5">
                    <v-col cols="4" class="text-left py-0">
                        <p>Nombre:</p>
                    </v-col>
                    <v-col cols="8" class="py-0">
                        <input v-model="newNombre" type="text" class="columnas" placeholder="Proyección 1">
                    </v-col>
                </v-row>
                <v-row class="px-5">
                    <v-col cols="4" class="text-left py-0">
                        <p>Alcance:</p>
                    </v-col>
                    <v-col cols="8" class="py-0">
                        <select v-model="newAlcance" class="columnas" placeholder="seleccione">
                            <option v-for="x in alcance" :key="x" :value="x">
                                {{ x }}
                            </option>
                        </select>
                    </v-col>
                </v-row>
            </main>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-col cols="4">
                    <v-btn color="red darken-1" text @click="newProyection = false">Cancelar</v-btn>
                </v-col>
                <v-col cols="4">

                </v-col>
                <v-col cols="4">
                    <v-btn color="green darken-1" text @click="startProyection">Proyectar</v-btn>
                </v-col>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref } from 'vue';
const alcance = ['mensual', 'trimestral', 'anual', 'Semestral']

const newProyection = ref(false)
const newAlcance = ref()
const newNombre = ref()
const cicleId = ref(2)//por mientras
const proyectionId = ref(2)//por mientras

const cicles = [
    { cicleId: 1, Registro: 'Frozen Yogurt', Ganancias: 159 },
    { cicleId: 2, Registro: 'Ice cream sandwich', Ganancias: 237 },
    { cicleId: 3, Registro: 'Eclair', Ganancias: 262 },
    { cicleId: 4, Registro: 'Cupcake', Ganancias: 305 },
    { cicleId: 5, Registro: 'Gingerbread', Ganancias: 356 },
    { cicleId: 6, Registro: 'Jelly bean', Ganancias: 375 },
    { cicleId: 7, Registro: 'Lollipop', Ganancias: 392 },
    { cicleId: 8, Registro: 'Honeycomb', Ganancias: 408 },
    { cicleId: 9, Registro: 'Donut', Ganancias: 452 },
    { cicleId: 10, Registro: 'KitKat', Ganancias: 518 },
];

const proyections = [
    { cicleId: 1, Registro: 'Frozen Yogurt', Alcance: 'anual' },
    { cicleId: 2, Registro: 'Ice cream sandwich', Alcance: 'anual' },
    { cicleId: 3, Registro: 'Eclair', Alcance: 'anual' },
    { cicleId: 4, Registro: 'Cupcake', Alcance: 'anual' },
    { cicleId: 5, Registro: 'Gingerbread', Alcance: 'trimestral' },
    { cicleId: 6, Registro: 'Jelly bean', Alcance: 'anual' },
    { cicleId: 7, Registro: 'Lollipop', Alcance: 'anual' },
    { cicleId: 8, Registro: 'Honeycomb', Alcance: 'semestral' },
    { cicleId: 9, Registro: 'Donut', Alcance: 'anual' },
    { cicleId: 10, Registro: 'KitKat', Alcance: 'anual' },
];

const headers = [
    { title: 'Registro', key: 'Registro', },
    { title: 'Ganancias', key: 'Ganancias' },
    { title: 'Visualizar', key: 'visualizar', sortable: false },
];

const headersProyecciones = [
    { title: 'Registro', key: 'Registro', },
    { title: 'Alcance', key: 'Alcance' },
    { title: 'Visualizar', key: 'visualizar', sortable: false },
];

const startProyection = () => {
    // Lógica para eliminar el producto
    console.log('Proyección empezada');
    newProyection.value = false;
};

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