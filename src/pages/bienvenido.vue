<template>
  <br />
  <h2>Tiendas registradas</h2>
  <br />
  <hr />
  <hr />
  <br />
  <v-row class="scroll-container">
    <v-col v-for="store in stores" :key="store._id" cols="4" class="cards">
      <router-link
        :to="{ name: 'Gestionar Tienda', params: { id: store._id } }"
      >
        <Card
          :tittle="store.name"
          :lastBenefits="store.money"
          @click="enviarStore(store)"
        />
      </router-link>
    </v-col>
  </v-row>

  <div class="footer my-8 justify-end">
    <router-link to="/nuevaTienda">
      <v-btn class="d-flex no-focus pa-6 justify-center" color="#B98D4C">
        <h3>Nuevo registro</h3>
        <img src="../assets/nuevo.png" alt="icono" class="play ml-3" />
      </v-btn>
    </router-link>
  </div>
</template>

<script setup>
import Card from "../components/card.vue";
import { ref } from "vue";
import { useShopStore } from "../stores/shop_store.js";

const shopStore = useShopStore();
const stores = ref(null);

const getStores = async () => {
  await shopStore.getShops();
  stores.value = shopStore.shops;
};

getStores();

const enviarStore = (store) => {
  shopStore.shop = store;
};

</script>

<style scoped>
.cards {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  align-content: stretch;
}

.scroll-container {
  height: 300px;
  /* Altura fija */
  overflow-y: auto;
  /* Barra de desplazamiento vertical */
  overflow-x: hidden;
  /* Ocultar barra de desplazamiento horizontal */
}

.whiteContent {
  background-color: #f8f8f8;
  font-family: "Inika", serif;
}

.no-focus:focus {
  outline: none;
  /* Elimina el borde de enfoque */
}

.play {
  height: 25px;
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
