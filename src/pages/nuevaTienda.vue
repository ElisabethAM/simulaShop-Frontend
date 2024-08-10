<template>
  <br />
  <h2>Ingreso de datos</h2>
  <br />
  <hr />
  <hr />
  <br />
  <v-form ref="formAdd" @submit.prevent="createStore">
    <div class="whiteContent mb-3 elevation-6 py-5">
      <v-row>
        <v-col cols="4">
          <h2>Nombre de la tienda:</h2>
        </v-col>
        <v-col cols="7">
          <v-text-field
            v-model="storeName"
            dense
            outlined
            placeholder="Tienda de conveniencia 1"
            :rules="[(v) => !!v || 'Este campo no puede estar vacío']"
            required
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <h2>Tipo de ciclo:</h2>
        </v-col>
        <v-col cols="7">
          <v-select
            v-model="cicleType"
            label="Seleccione"
            :items="['Dias', 'Semanas', 'Meses', 'Años']"
            :rules="[(v) => !!v || 'Este campo no puede estar vacío']"
            required
          >
          </v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <h2>Cantidad de ciclos:</h2>
        </v-col>
        <v-col cols="7">
          <v-text-field
            v-model="quantity"
            dense
            placeholder="5"
            type="number"
            :rules="[(v) => !!v || 'Este campo no puede estar vacío']"
            required
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <h2>Beneficios iniciales:</h2>
        </v-col>
        <v-col cols="7">
          <v-text-field
            v-model="intialBenefits"
            type="number"
            dense
            outlined
            placeholder="10,000,000"
            :rules="[(v) => !!v || 'Este campo no puede estar vacío']"
            required
            class="custom-text-field"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <div class="d-flex justify-center align-center mt-6 mb-3">
        <v-row class="info">
          <v-col cols="1">
            <img src="../assets/info.png" alt="" />
          </v-col>
          <v-col cols="11">
            <h4>
              El nuevo registro de beneficios de la
              {{ storeName ? storeName : "Tienda" }} contará con {{ quantity }}
              {{ cicleType }}.
            </h4>
          </v-col>
        </v-row>
      </div>
    </div>
    <div class="footer my-8 justify-end">
      <v-btn
        type="submit"
        class="d-flex no-focus pa-6 justify-center"
        color="#B98D4C"
      >
        <h3>Empezar a gestionar</h3>
        <img src="../assets/play.png" alt="icono" class="play ml-3" />
      </v-btn>
    </div>
  </v-form>
  <v-snackbar v-model="snackbar" :timeout="timeout" color="green">
    {{ msg }}
  </v-snackbar>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useShopStore } from "../stores/shop_store.js";

const name = "NuevaTienda";
const storeName = ref(null);
const quantity = ref(null);
const cicleType = ref(null);
const idStore = ref(null);
const intialBenefits = ref(null);
const formAdd = ref(null);
const msg = ref(null);
const snackbar = ref(false);
const timeout = 1000;

const shopStore = useShopStore();
const router = useRouter();


const createStore = async () => {
  // Verifica la validez del formulario antes de enviar
  const {valid} = await formAdd.value.validate()
  try {
    if(valid){
      shopStore.shop = {};
      await shopStore.createShop(
        storeName.value,
        quantity.value,
        cicleType.value,
        intialBenefits.value
      );
      msg.value = "Tienda creada con éxito";
      snackbar.value = true;
      idStore.value = shopStore.shop._id;
      router.push(`/gestionarTienda/${idStore.value}`)
      formAdd.value.resetValidation();
    }else{
      
    }
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped>
.info img {
  height: 40px;
  /* Aumenta el tamaño del icono en la sección de información */
  width: auto;
  /* Mantiene la proporción */
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

.info {
  background-color: #393534;
  color: #ede5d8;
  max-width: 90%;
  height: 70px;
  display: flex;
  align-items: center;
  /* Ajusta según sea necesario */
}


</style>
