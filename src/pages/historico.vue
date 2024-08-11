<template>
  <v-row>
    <v-col cols="12">
      <br />
      <h2>Ciclos anteriores:</h2>
      <br />
      <hr />
      <hr />
      <br />
      <br />
      <!-- tabla de ciclos anteriores -->

      <v-data-table
        :items="cicles"
        :headers="headers"
        class="elevation-6 text-start custom-header"
        :items-per-page="5"
        hover
      >
        <!-- render del boton visualizar -->
        <template v-slot:item="{ item }">
          <tr class="bg-white">
            <td>{{ item.cycleNumber }}</td>
            <td>{{ item.totalEarnings }}</td>
            <td>
              <div @click="item.dialog = true">
                <img src="../assets/play.png" alt="icono" class="play" />
              </div>
              <v-dialog
                v-model="item.dialog"
                max-width="1000px"
                transition="dialog-bottom-transition"
              >
                <v-btn
                  class="text-red position-absolute right-0 close"
                  text="Cerrar"
                  variant="text"
                  size="x-large"
                  :border="false"
                  @click="item.dialog = false"
                ></v-btn>
                <DetalleDialog
                  :numeroCiclo="item.cycleNumber"
                  :lastBenefits="item.lastBenefits"
                ></DetalleDialog>
              </v-dialog>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-col>

    <v-col cols="12">
      <h2>Proyecciones:</h2>
      <br />
      <hr />
      <hr />
      <br />
      <!-- tabla de proyecciones -->
      <!-- <v-data-table :items="proyections" :headers="headersProyecciones" class="elevation-6" :items-per-page="5">
                <template v-slot:item.visualizar="{ item }">
                    <div class="text-center">
                        <router-link :to="`/resultados/${item.cicleId}`">
                            <img src="../assets/play.png" alt="icono" class="play">
                        </router-link>
                    </div>
                </template>
            </v-data-table> -->
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from "vue";
import { useShopStore } from "../stores/shop_store.js";
import { color } from "chart.js/helpers";
import DetalleDialog from "../components/detalleDialog.vue";

const shopStore = useShopStore();
let cicles = [];
let dataset = [];
// const proyections = ref(null);
const dialog = ref(false);

const headers = [
  { title: "Registro", key: "cycleNumber" },
  { title: "Ganancias", key: "totalEarnings" },
  { title: "Detalles", key: "Detalles", sortable: false },
];

// const headersProyecciones = [
//     { title: 'Registro', key: 'Registro', },
//     { title: 'Alcance', key: 'Alcance' },
//     { title: 'Visualizar', key: 'visualizar', sortable: false },
// ];

const getCicles = async () => {
  shopStore.getDataShop();
  cicles = Object.values(shopStore.cicloDatos);
  cicles = cicles.map((cycle) => ({
    ...cycle,
    dialog: false, // Añade el estado del diálogo a cada ciclo
  }));
  console.log(cicles);
};
getCicles();
</script>

<style scoped>
.play {
  height: 25px;
}

/* el componente no deja editar los estilos de encabezado :B */
.encabezado {
  background: #e9d89d !important;
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

.custom-header {
  background-color: #e9d89d !important; /* Cambia al color que desees */
  color: rgb(51, 51, 51) !important; /* Cambia el color del texto */
}
</style>
