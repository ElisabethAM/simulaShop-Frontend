<template>
  <v-card class="crema scaled-card elevation-6 mb-2 pb-0">
    <v-card-text class="pa-0">
      <header class="header">
        <v-row class="ma-2" align="center">
          <v-col cols="12">
            <h4 class="header-title">{{ tittle }}</h4>
          </v-col>
        </v-row>
      </header>
    </v-card-text>
    <main>
      <v-row class="contenido mb-3 mt-2 mx-3 text-left">
        <v-col cols="12">
          <img :src="img" class="responsive-image" alt="imagen" />
        </v-col>
        <v-col cols="12">
          <h4>{{ description }}</h4>
        </v-col>
        <v-row v-if="primerAcceso && type !== 'productos'">
          <v-col cols="2">
            <img src="../assets/warning.png" alt="icono" class="h-50 ml-3" />
          </v-col>
          <v-col cols="10" class="warning">
            <p>{{ warningMsg }}</p>
          </v-col>
        </v-row>
        <v-col
          v-if="primerAcceso && type === 'productos'"
          cols="12"
          class="py-0"
        >
          <!-- boton habilitado cuando es primer acceso -->
          <div class="footer justify-end">
            <router-link :to="btnRoute">
              <v-btn
                class="d-flex no-focus py-6 px-8 justify-center"
                color="#B98D4C"
              >
                <img src="../assets/play.png" alt="icono" class="play" />
              </v-btn>
            </router-link>
          </div>
        </v-col>
        <v-col v-if="!primerAcceso" cols="12" class="py-0">
          <!-- este es para el caso en que no se primer acceso -->
          <div class="footer justify-end">
            <router-link :to="btnRoute">
              <v-btn
                class="d-flex no-focus py-6 px-8 justify-center"
                color="#B98D4C"
              >
                <img src="../assets/play.png" alt="icono" class="play" />
              </v-btn>
            </router-link>
          </div>
        </v-col>
      </v-row>
    </main>
  </v-card>
</template>

<script setup>
import { ref, watch } from "vue";
import { useShopStore } from "../stores/shop_store.js";
const shopStore = useShopStore();
const gestionShop = ref(null);

const props = defineProps({
  tittle: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: false,
  },
  idStore: {
    type: Number,
    required: true,
  },
});

// Definir una variable reactiva para el mensaje de advertencia
const warningMsg = ref("");
const primerAcceso = ref(false); //var para primer acceso
const btnRoute = ref("");

// Función para establecer el mensaje basado en el tipo
function setMsg(type, idStore) {
  if (type === "gestion") {
    const hasSelectedProduct = shopStore.shop.inventory.some(
      (product) => product.selectedForCycle
    );
    if (!hasSelectedProduct) {
      warningMsg.value = "Aún no se ha configurado el inventario";
      primerAcceso.value = true;
    } else {
      primerAcceso.value = false;
      btnRoute.value = `/cargando/${shopStore.shop.name}`;
    }
  } else if (type === "historico") {
    warningMsg.value = "Aún no se han registrado resultados";
    btnRoute.value = `/historico/${shopStore.shop.name}`;
  } else {
    warningMsg.value = "Tipo desconocido"; // Opcional: Mensaje para tipos no reconocidos
    btnRoute.value = `/configurarProductos/${shopStore.shop.name}`;
  }
}

// Llamar a setMsg cuando el componente se monte o el tipo cambie
watch(
  () => props.type,
  (newType) => {
    setMsg(newType, props.idStore);
  },
  { immediate: true }
);
</script>

<style scoped>
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

.footer {
  display: flex;
  justify-content: space-between;
  border-radius: 0 0 16px 16px;
  /* Aumenta el radio de borde */
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
}

.crema {
  background: #f8f8f8;
  min-height: 415px;
}

.header {
  display: flex;
  align-items: center;
  background-color: #393534;
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
