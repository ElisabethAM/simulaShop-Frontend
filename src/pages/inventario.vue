<template>
    <br>
    <h2>Productos registrados</h2>
    <br>
    <hr>
    <hr>
    <br>
    <v-row class=" scroll-container mb-8">
        <!-- Card añadir producto -->
        <v-col cols="4">
            <v-card class="crema scaled-card elevation-6 mb-2 pb-0 d-flex justify-center align-center">

                <v-row class="d-flex flex-column align-center">
                    <v-col cols="10">

                        <img src="../assets/newProduct.png" @click="showNewProdDialog = true" class="responsive-image"
                            alt="imagen">

                    </v-col>
                </v-row>

            </v-card>
        </v-col>

        <!-- Productos existentes -->
        <v-col cols="4" v-for="producto in inventario.productos" :key="producto.nombre">
            <ProductCard :title="producto.nombre" :img="producto.img" :precioCompra="producto.precioCompra"
                :precioVenta="producto.precioVenta" :demandaMin="producto.demandaMin" :demandaMax="producto.demandaMax"
                :disponibles="producto.disponibles" :seleccionado="producto.seleccionado" />
        </v-col>
    </v-row>

    <!-- dialogo para agregar producto -->
    <v-dialog v-model="showNewProdDialog" max-width="400">
        <v-card>
            <v-card-title class="headline">Agregar Producto</v-card-title>
            <br>

            <main>
                <v-row class="px-5">
                    <v-col cols="7" class="text-left py-0">
                        <p>Nombre:</p>
                    </v-col>
                    <v-col cols="4" class="py-0">
                        <input v-model="newNombre" type="text" class="columnas" placeholder="Producto 1">
                    </v-col>
                </v-row>
                <v-row class="px-5">
                    <v-col cols="7" class="text-left py-0">
                        <p>Tipo:</p>
                    </v-col>
                    <v-col cols="4" class="py-0">
                        <select v-model="newTipo" id="prodType" name="prodType" class="columnas" placeholder="seleccione">
                            <option v-for="tipo in tiposProd" :key="tipo" :value="tipo">
                                {{ tipo }}
                            </option>
                        </select>
                    </v-col>
                </v-row>
                <v-row class="px-5">
                    <v-col cols="7" class="text-left py-0">
                        <p>Precio compra:</p>
                    </v-col>
                    <v-col cols="4" class="py-0">
                        <input v-model="newPrecioCompra" type="text" class="columnas" placeholder="0.00">
                    </v-col>
                </v-row>
                <v-row class="px-5">
                    <v-col cols="7" class="text-left py-0">
                        <p>Precio venta:</p>
                    </v-col>
                    <v-col cols="4" class="py-0">
                        <input v-model="newPrecioVenta" type="text" class="columnas" placeholder="0.00">
                    </v-col>
                </v-row>
                <v-row class="px-5">
                    <v-col cols="7" class="text-left py-0">
                        <p>Demanda mínima:</p>
                    </v-col>
                    <v-col cols="4" class="py-0">
                        <input v-model="newDemandaMin" type="text" class="columnas" placeholder="0.00">
                    </v-col>
                </v-row>
                <v-row class="px-5">
                    <v-col cols="7" class="text-left py-0">
                        <p>Demanda máxima:</p>
                    </v-col>
                    <v-col cols="4" class="py-0">
                        <input v-model="newDemandaMax" type="text" class="columnas" placeholder="0.00">
                    </v-col>
                </v-row>
                <v-row class="px-5">
                    <v-col cols="7" class="text-left py-0">
                        <p>En bodega:</p>
                    </v-col>
                    <v-col cols="4" class="py-0">
                        <input v-model="newDisponibles" type="text" class="columnas" placeholder="0.00">
                    </v-col>
                </v-row>
            </main>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="addProduct">Agregar</v-btn>
                <v-btn color="red darken-1" text @click="showNewProdDialog = false">Cancelar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref } from 'vue';
import ProductCard from '../components/productCard.vue';
import basicos from '../assets/basicos.png'
import bebidas from '../assets/bebidas.png'
import congelados from '../assets/congelados.png'
import higiene from '../assets/higiene.png'
const inventario = {
    productos: [
        {
            nombre: "Producto 1",
            precioCompra: 10.0,
            precioVenta: 15.0,
            demandaMin: 100,
            demandaMax: 200,
            disponibles: 50,
            seleccionado: true,
            img: basicos
        },
        {
            nombre: "Producto 2",
            precioCompra: 20.0,
            precioVenta: 30.0,
            demandaMin: 100,
            demandaMax: 200,
            disponibles: 30,
            seleccionado: true,
            img: bebidas
        },
        {
            nombre: "Producto 3",
            precioCompra: 10.0,
            precioVenta: 15.0,
            demandaMin: 100,
            demandaMax: 200,
            disponibles: 50,
            seleccionado: false,
            img: congelados
        },
        {
            nombre: "Producto 4",
            precioCompra: 10.0,
            precioVenta: 15.0,
            demandaMin: 100,
            demandaMax: 200,
            disponibles: 50,
            seleccionado: true,
            img: higiene
        },
        {
            nombre: "Producto 5",
            precioCompra: 10.0,
            precioVenta: 15.0,
            demandaMin: 100,
            demandaMax: 200,
            disponibles: 50,
            seleccionado: false,
            img: congelados
        },
        {
            nombre: "Producto 6",
            precioCompra: 10.0,
            precioVenta: 15.0,
            demandaMin: 100,
            demandaMax: 200,
            disponibles: 50,
            seleccionado: true,
            img: congelados
        },
        {
            nombre: "Producto 7",
            precioCompra: 10.0,
            precioVenta: 15.0,
            demandaMin: 100,
            demandaMax: 200,
            disponibles: 50,
            seleccionado: false,
            img: congelados
        },
        {
            nombre: "Producto 8",
            precioCompra: 10.0,
            precioVenta: 15.0,
            demandaMin: 100,
            demandaMax: 200,
            disponibles: 50,
            seleccionado: false,
            img: congelados
        },
    ]
};

const tiposProd = ['basicos', 'bebidas', 'congelados', 'higiene']

const showNewProdDialog = ref(false)
const newNombre = ref()
const newPrecioCompra = ref()
const newPrecioVenta = ref()
const newDemandaMin = ref()
const newDemandaMax = ref()
const newDisponibles = ref()
const newTipo = ref()//para las imagenes de los prods

const addProduct = () => {
    // Lógica para eliminar el producto
    console.log('Producto agregado');
    showNewProdDialog.value = false;
};


</script>

<style scoped>
.columnas {
    background-color: white;
    color: black;
    border: 1px solid #ccc;
    padding: 0px;
    font-size: 14px;
    width: 100px;
    padding-left: 5px;
    outline: none;
}

.scroll-container {
    height: 600px;
    /* Altura fija */
    overflow-y: auto;
    /* Barra de desplazamiento vertical */
    overflow-x: hidden;
    /* Ocultar barra de desplazamiento horizontal */
}

.crema {
    background: #F8F8F8;
    min-height: 400px;
}

.responsive-image {
    width: 100%;
    height: auto;
    object-fit: contain;
    /* Esto asegurará que la imagen mantenga su proporción y se ajuste al contenedor */
}
</style>