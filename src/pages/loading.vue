<template>
  <div>
    <div class="background-image"></div>
    <div>
      <v-row>
        <v-col cols="12">
          <h2>Procesando...</h2>
        </v-col>
        <v-col cols="12">
          <v-progress-circular
            color="white"
            indeterminate
            :size="128"
            :width="12"
          ></v-progress-circular>
        </v-col>
      </v-row>
      <!-- <v-row>
            <h2>Cargando resultados</h2>
        </v-row>
        <v-row>
            <v-col cols="4">
                imagen
            </v-col>
            <v-col cols="8">
                <div>
                    <p>visitante 1:</p>
                </div>
                <div>
                    <p>Excelente, ¡el papel de baño esta barato esta semana!</p>
                </div>
            </v-col>
        </v-row> -->
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useShopStore } from "../stores/shop_store.js";

const router = useRouter();
const shopStore = useShopStore();
const store = shopStore.shop;

onMounted(() => {
  obtenerBeneficios();
});

const obtenerBeneficios = async () => {
  await shopStore.getBenefits(store._id);
  store.value = shopStore.shop;
  router.push({ name: "Resultados" });
};
</script>

<style scoped>
.background-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("../assets/fondo.jpg") no-repeat center center;
  background-size: cover;
  filter: blur(8px);
  z-index: -1;
}
</style>
