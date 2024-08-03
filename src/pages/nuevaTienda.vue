<template>
  <br>
  <h2>Ingreso de datos</h2>
  <br>
  <hr>
  <hr>
  <br>
  <div class="whiteContent mb-3 elevation-6 py-5">
    <v-form>
      <v-row>
        <v-col cols="4">
          <h2>Nombre de la tienda:</h2>
        </v-col>
        <v-col cols="7">
          <v-text-field v-model="storeName" hide-details dense outlined placeholder="Tienda de conveniencia 1">
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <h2>Tipo de ciclo:</h2>
        </v-col>
        <v-col cols="7">
          <v-select v-model="cicleType" label="Seleccione" :items="['Dias', 'Semanas', 'Meses', 'Años']">
          </v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <h2>Cantidad de ciclos:</h2>
        </v-col>
        <v-col cols="7">
          <v-text-field v-model="quantity" hide-details dense outlined placeholder="5">
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <h2>Beneficios iniciales:</h2>
        </v-col>
        <v-col cols="7">
          <v-text-field hide-details dense outlined placeholder="10,000,000">
          </v-text-field>
        </v-col>
      </v-row>
    </v-form>
    <div class="d-flex justify-center align-center my-3">
      <v-row class="ma-3 info pa-3">
        <v-col cols="1">
          <img src="../assets/info.png" alt="">
        </v-col>
        <v-col cols="11">
          <h2>
            El nuevo registro de beneficios de la {{ storeName }} contará con {{ quantity }} {{ cicleType }}.
          </h2>
        </v-col>
      </v-row>
    </div>
  </div>
  <div class="footer my-8 justify-end">
    <router-link :to="`/gestionarTienda/${idStore}`">
      <v-btn class="d-flex no-focus pa-6 justify-center" color="#B98D4C">
        <h3>Empezar a gestionar</h3>
        <img src="../assets/play.png" alt="icono" class="play ml-3">
      </v-btn>
    </router-link>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  name: 'NuevaTienda',
  setup() {
    const storeName = ref('');
    const quantity = ref('');
    const cicleType = ref('');
    const idStore = ref(0)
    idStore.value = 2; //por mientras

    return { storeName, quantity, cicleType,idStore };
  },
}
</script>

<style scoped>
.info img {
  height: 60px;
  /* Aumenta el tamaño del icono en la sección de información */
  width: auto;
  /* Mantiene la proporción */
}

.whiteContent {
  background-color: #F8F8F8;
  font-family: 'Inika', serif;
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
  color: #EDE5D8;
  max-width: 90%;
  /* Ajusta según sea necesario */
}
</style>