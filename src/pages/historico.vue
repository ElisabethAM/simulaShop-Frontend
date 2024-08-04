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
            <v-table height="300px" fixed-header class="elevation-6">
                <thead>
                    <tr>
                        <th class="text-left encabezado">
                            Nombre
                        </th>
                        <th class="text-center encabezado">
                            Tipo de ciclo
                        </th>
                        <th class="text-center encabezado">
                            Visualizar
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in cicles" :key="item.name" class="text-left">
                        <td>{{ item.name }}</td>
                        <td class="text-center">{{ item.calories }}</td>
                        <td class="text-center">
                            <router-link :to="`/resultados/${cicleId}`">
                                <img src="../assets/play.png" alt="icono" class="play">
                            </router-link>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-col>

        <v-col cols="12">
            <h2>Proyecciones:</h2>
            <br>
            <hr>
            <hr>
            <br>
            <v-table height="300px" fixed-header class="elevation-6">
                <thead>
                    <tr>
                        <th class="text-left encabezado">
                            Nombre
                        </th>
                        <th class="text-center encabezado">
                            Alcance
                        </th>
                        <th class="text-center encabezado">
                            Visualizar
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in proyections" :key="item.name" class="text-left">
                        <td>{{ item.name }}</td>
                        <td class="text-center">{{ item.calories }}</td>
                        <td class="text-center">
                            <router-link :to="`/resultados/${proyectionId}`">
                                <img src="../assets/play.png" alt="icono" class="play">
                            </router-link>
                        </td>
                    </tr>
                </tbody>
            </v-table>
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
const cicleId= ref(2)//por mientras
const proyectionId= ref(2)//por mientras
const proyections = [
    {
        name: 'Frozen Yogurt',
        calories: 159,
    },
    {
        name: 'Ice cream sandwich',
        calories: 237,
    },
    {
        name: 'Eclair',
        calories: 262,
    },
    {
        name: 'Cupcake',
        calories: 305,
    },
    {
        name: 'Gingerbread',
        calories: 356,
    },
    {
        name: 'Jelly bean',
        calories: 375,
    },
    {
        name: 'Lollipop',
        calories: 392,
    },
    {
        name: 'Honeycomb',
        calories: 408,
    },
    {
        name: 'Donut',
        calories: 452,
    },
    {
        name: 'KitKat',
        calories: 518,
    },
]

const cicles = [
    {
        name: 'Frozen Yogurt',
        calories: 159,
    },
    {
        name: 'Ice cream sandwich',
        calories: 237,
    },
    {
        name: 'Eclair',
        calories: 262,
    },
    {
        name: 'Cupcake',
        calories: 305,
    },
    {
        name: 'Gingerbread',
        calories: 356,
    },
    {
        name: 'Jelly bean',
        calories: 375,
    },
    {
        name: 'Lollipop',
        calories: 392,
    },
    {
        name: 'Honeycomb',
        calories: 408,
    },
    {
        name: 'Donut',
        calories: 452,
    },
    {
        name: 'KitKat',
        calories: 518,
    },
]

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

.encabezado {
    background: #E9D89D !important;
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