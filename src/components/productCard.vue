<template>
    <v-card class="crema scaled-card elevation-6  pb-0">
        <v-card-text class="pa-0">
            <header class="header">
                <v-row class="ma-2" align="center">
                    <v-col cols="12">
                        <h4 class="header-title">{{ title }}</h4>
                    </v-col>
                </v-row>
            </header>
        </v-card-text>
        <main>
            <v-row class="mb-2 mt-2 mx-3 text-left">
                <v-col cols="12" class="contenido">
                    <img :src="img" class="responsive-image" alt="imagen">
                </v-col>
            </v-row>
            <v-row class="px-5">
                <v-col cols="7" class="text-left py-0">
                    <p>Precio compra:</p>
                </v-col>
                <v-col cols="4" class="py-0">
                    <input v-model="localProduct.precioCompra" @blur="updateProd()" type="text" class="columnas" placeholder="0.00">
                </v-col>
            </v-row>
            <v-row class="px-5">
                <v-col cols="7" class="text-left py-0">
                    <p>Precio venta:</p>
                </v-col>
                <v-col cols="4" class="py-0">
                    <input v-model="localProduct.precioVenta" @blur="updateProd()" type="text" class="columnas" placeholder="0.00">
                </v-col>
            </v-row>
            <v-row class="px-5">
                <v-col cols="7" class="text-left py-0">
                    <p>Demanda mínima:</p>
                </v-col>
                <v-col cols="4" class="py-0">
                    <input v-model="localProduct.demandaMin" @blur="updateProd()" type="text" class="columnas" placeholder="0.00">
                </v-col>
            </v-row>
            <v-row class="px-5">
                <v-col cols="7" class="text-left py-0">
                    <p>Demanda máxima:</p>
                </v-col>
                <v-col cols="4" class="py-0">
                    <input v-model="localProduct.demandaMax" @blur="updateProd()" type="text" class="columnas" placeholder="0.00">
                </v-col>
            </v-row>
            <v-row class="px-5">
                <v-col cols="7" class="text-left py-0">
                    <p>En bodega:</p>
                </v-col>
                <v-col cols="4" class="py-0">
                    <input v-model="localProduct.disponibles" @blur="updateProd()" type="text" class="columnas" placeholder="0.00">
                </v-col>
            </v-row>
        </main>
        <v-card-actions>
            <v-row class="px-5 pt-4 d-flex align-center justify-space-between">
                <div class="custom-checkbox">
                    <input v-model="localProduct.seleccionado" @blur="updateProd()" type="checkbox" id="checkbox">
                </div>
                
                    <img src="../assets/delete.png" @click="showDeleteDialog = true" alt="icono" class="delete mt-3">
              
            </v-row>
        </v-card-actions>
    </v-card>


    <!-- dialogo para eliminar producto -->
    <v-dialog v-model="showDeleteDialog" max-width="500">
      <v-card>
        <v-card-title class="headline">Eliminar Producto</v-card-title>
        <v-card-text>
          ¿Esta seguro de eliminar este producto?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="showDeleteDialog=false">Cancelar</v-btn>
          <v-btn color="red darken-1" text @click="deleteProduct">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- campos actualizados @blur -->
    <v-snackbar v-model="snackbar" :timeout="timeout" color="green">
        Campo actualizado
      </v-snackbar>
</template>

<script setup>
import { ref, watch, defineProps } from 'vue';

const showDeleteDialog = ref(false);
const snackbar = ref(false);
const timeout = 1000; 

const props = defineProps({
  title: String,
  img: String,
  precioCompra: Number,
  precioVenta: Number,
  demandaMin: Number,
  demandaMax: Number,
  disponibles: Number,
  seleccionado: Boolean,
});

const localProduct = ref({
  precioCompra: props.precioCompra,
  precioVenta: props.precioVenta,
  demandaMin: props.demandaMin,
  demandaMax: props.demandaMax,
  disponibles: props.disponibles,
  seleccionado: props.seleccionado
});

const deleteProduct = () => {
  // Lógica para eliminar el producto
  console.log('Producto eliminado');
  showDeleteDialog.value = false;
};

const updateProd = () => {
    snackbar.value = true;;
};


watch(() => props, (newProps) => {
  localProduct.value = { ...newProps };
}, { deep: true });

watch(localProduct, (newValue) => {
  // Emit changes to parent component if needed
  // emit('update:product', newValue);
}, { deep: true });
</script>


<style scoped>
.custom-checkbox {
    display: flex;
    align-items: center;
}

.custom-checkbox input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 50px;
    height: 50px;
    border: 2px solid #ccc;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
    position: relative;
}

.custom-checkbox input[type="checkbox"]:checked {
    background-color: #28a745;
    border-color: #28a745;
}

.custom-checkbox input[type="checkbox"]:checked::before {
    content: '✔';
    display: block;
    color: white;
    font-size: 24px;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
}

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

.columnas::placeholder {
    color: #999;
}

p {
    font-family: 'Inika', serif;
}

.play {
    height: 25px;
}

.no-focus:focus {
    outline: none;
    /* Elimina el borde de enfoque */
}

.responsive-image {
    width: 100%;
    height: auto;
    object-fit: contain;
    /* Esto asegurará que la imagen mantenga su proporción y se ajuste al contenedor */
}

.delete {
    height: 50px;
}

.warning {
    color: red;
}

.beneficios {
    background: #E9D89D;

}

.coins {
    height: 20px;
    margin-left: 5px;
}

.contenido {
    display: flex;
    justify-content: center;
    height: max-content;
}

.crema {
    background: #F8F8F8;
    min-height: 400px;
}

.header {
    display: flex;
    align-items: center;
    background-color: #393534;

}

.header-logo {
    height: 60px;
    /* Aumenta el tamaño del logo */
    color: #B98D4C;
}

.header-title {
    margin: 0;
    color: #EDE5D8;
    font-size: 1.3rem;
    /* Aumenta el tamaño del texto del título */
    font-family: 'Inika', serif;
}

.header-logo-volver {
    height: 40px !important;
    align-content: center !important;
}
</style>