<template>
  <v-card class="crema scaled-card elevation-6 pb-0">
    <v-card-text class="pa-0">
      <header class="header">
        <v-row class="ma-2 d-flex justify-space-between align-center">
          <v-col cols="9">
            <h4 class="header-title text-left">{{ title }}</h4>
          </v-col>
          <v-col cols="3">
            <div v-if="localProduct.disponibles > 0" class="custom-checkbox">
              <input
                v-model="localProduct.seleccionado"
                @click="updateSelected()"
                type="checkbox"
              />
            </div>
            <v-icon v-else icon="mdi-basket-off" size="x-large" color="red">
              <v-tooltip activator="parent" location="icon"
                >Sin existencias</v-tooltip
              >
            </v-icon>
          </v-col>
        </v-row>
      </header>
    </v-card-text>
    <main>
      <v-row class="mb-2 mt-2 mx-3 text-left">
        <v-col cols="12" class="contenido">
          <img :src="img" class="responsive-image" alt="imagen" />
        </v-col>
      </v-row>
      <v-row class="px-5">
        <v-col cols="7" class="text-left py-0">
          <p>Precio compra:</p>
        </v-col>
        <v-col cols="4" class="py-0">
          <input
            :disabled="!editing"
            v-model="localProduct.precioCompra"
            type="text"
            class="columnas"
            placeholder="0.00"
          />
        </v-col>
      </v-row>
      <v-row class="px-5">
        <v-col cols="7" class="text-left py-0">
          <p>Precio venta:</p>
        </v-col>
        <v-col cols="4" class="py-0">
          <input
            :disabled="!editing"
            v-model="localProduct.precioVenta"
            type="text"
            class="columnas"
            placeholder="0.00"
          />
        </v-col>
      </v-row>
      <v-row class="px-5">
        <v-col cols="7" class="text-left py-0">
          <p>Demanda mínima:</p>
        </v-col>
        <v-col cols="4" class="py-0">
          <input
            :disabled="!editing"
            v-model="localProduct.demandaMin"
            type="text"
            class="columnas"
            placeholder="0.00"
          />
        </v-col>
      </v-row>
      <v-row class="px-5">
        <v-col cols="7" class="text-left py-0">
          <p>Demanda máxima:</p>
        </v-col>
        <v-col cols="4" class="py-0">
          <input
            :disabled="!editing"
            v-model="localProduct.demandaMax"
            type="text"
            class="columnas"
            placeholder="0.00"
          />
        </v-col>
      </v-row>
      <v-row class="px-5">
        <v-col cols="7" class="text-left py-0">
          <p>En bodega:</p>
        </v-col>
        <v-col cols="4" class="py-0">
          <input
            disabled="true"
            v-model="localProduct.disponibles"
            type="text"
            class="columnas"
            placeholder="0.00"
          />
        </v-col>
      </v-row>
    </main>
    <v-card-actions>
      <v-row class="px-5 pt-4 d-flex align-center justify-space-between">
        <div v-if="!editing">
          <img
            src="../assets/editProd.png"
            @click="editing = true"
            alt="icono"
            class="delete cursor-pointer mt-3"
          />
        </div>
        <div v-if="!editing">
          <img
            src="../assets/comprar.png"
            @click="showShopDialog = true"
            alt="icono"
            class="delete cursor-pointer mt-3"
          />
        </div>
        <!-- para guardar cambios -->
        <div v-if="editing">
          <img
            src="../assets/check.png"
            @click="updateProd"
            alt="icono"
            class="delete cursor-pointer mt-3"
          />
        </div>
        <div v-if="editing">
          <img
            src="../assets/cancel.png"
            @click="editing = false"
            alt="icono"
            class="cancel cursor-pointer mt-3"
          />
        </div>
        <!-- borrar prod -->
        <div>
          <img
            src="../assets/delete.png"
            @click="showDeleteDialog = true"
            alt="icono"
            class="delete cursor-pointer mt-3"
          />
        </div>
      </v-row>
    </v-card-actions>
  </v-card>

  <!-- dialogo para eliminar producto -->
  <v-dialog v-model="showDeleteDialog" max-width="500">
    <v-card>
      <v-card-title class="headline">Eliminar Producto</v-card-title>
      <v-card-text> ¿Esta seguro de eliminar este producto? </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="showDeleteDialog = false"
          >Cancelar</v-btn
        >
        <v-btn color="red darken-1" text @click="deleteProducto"
          >Eliminar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- dialogo para comprar producto -->
  <v-dialog v-model="showShopDialog" max-width="400">
    <v-card>
      <v-card-title class="headline mb-5"
        >Comprar productos, {{ title }}</v-card-title
      >
      <main>
        <v-row class="px-5 mb-3">
          <v-col cols="7" class="text-left py-0">
            <p>cantidad:</p>
          </v-col>
          <v-col cols="4" class="py-0">
            <input
              v-model="newQuantity"
              type="text"
              class="columnas"
              placeholder="0"
            />
          </v-col>
        </v-row>
      </main>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="sumQuantity">Añadir</v-btn>
        <v-btn color="red darken-1" text @click="showShopDialog = false"
          >Cancelar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- campos actualizados @blur -->
  <v-snackbar v-model="snackbar" :timeout="timeout" color="green">
    {{ msg }}
  </v-snackbar>
</template>

<script setup>
import { ref, watch, defineProps } from "vue";
import { useProductStore } from "../stores/product_store.js";

const productStore = useProductStore();

const showDeleteDialog = ref(false);
const showShopDialog = ref(false);
const snackbar = ref(false);
const timeout = 1000;
const msg = ref(null);
const editing = ref(false);
const newQuantity = ref(0);

const props = defineProps({
  product: Object,
  productId: String,
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
  seleccionado: props.seleccionado,
});

const deleteProducto = async () => {
  // Lógica para eliminar el producto
  await productStore.deleteProduct(props.product);

  showDeleteDialog.value = false;
};

const sumQuantity = async () => {
  await productStore.addUnitsProduct(props.product, newQuantity.value);
  localProduct.value.disponibles = productStore.product.availableUnits;
  showShopDialog.value = false;
  msg.value = "Producto añadido con éxito";
  snackbar.value = true;
};

const updateSelected = async () => {
  if (localProduct.value.seleccionado) {
    localProduct.value.seleccionado = false;
  } else {
    localProduct.value.seleccionado = true;
  }

  let prodUpdate = {
    _id: props.product._id,
    name: props.product.name,
    image: props.product.image,
    category: props.product.category,
    salePrice: localProduct.value.precioVenta,
    purchasePrice: localProduct.value.precioCompra,
    selectedForCycle: localProduct.value.seleccionado,
    availableUnits: localProduct.value.disponibles,
    demandMin: localProduct.value.demandaMin,
    demandMax: localProduct.value.demandaMax,
    isDeleted: props.product.isDeleted,
  };
  await productStore.updateProduct(prodUpdate);
  localProduct.value.disponibles = productStore.product.availableUnits;
  editing.value = false;
};

const updateProd = async () => {
  const actProd = {
    _id: props.product._id,
    name: props.product.name,
    image: props.product.image,
    category: props.product.category,
    salePrice: localProduct.value.precioVenta,
    purchasePrice: localProduct.value.precioCompra,
    selectedForCycle: localProduct.value.seleccionado,
    availableUnits: localProduct.value.disponibles,
    demandMin: localProduct.value.demandaMin,
    demandMax: localProduct.value.demandaMax,
    isDeleted: props.product.isDeleted,
  };
  await productStore.updateProduct(actProd);
  msg.value = "Producto actualizado con éxito";
  editing.value = false;
  snackbar.value = true;
};

watch(
  () => props,
  (newProps) => {
    localProduct.value = { ...newProps };
  },
  { deep: true }
);

watch(
  localProduct,
  (newValue) => {
    // Emit changes to parent component if needed
    // emit('update:product', newValue);
  },
  { deep: true }
);
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
  width: 40px;
  height: 40px;
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
  content: "✔";
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

.columnas:disabled {
  color: gray;
  /* cursor: not-allowed; */
}

.columnas::placeholder {
  color: #999;
}

p {
  font-family: "Inika", serif;
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

.cancel {
  height: 40px;
}

.warning {
  color: red;
}

.beneficios {
  background: #e9d89d;
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
  background: #f8f8f8;
  min-height: 415px;
}

.header {
  display: flex;
  align-items: center;
  background-color: #393534;
  height: 70px;
}

.header-logo {
  height: 60px;
  /* Aumenta el tamaño del logo */
  color: #b98d4c;
}

.header-title {
  margin: 0;
  color: #ede5d8;
  font-size: 1.3rem;
  /* Aumenta el tamaño del texto del título */
  font-family: "Inika", serif;
}

.header-logo-volver {
  height: 40px !important;
  align-content: center !important;
}
</style>
