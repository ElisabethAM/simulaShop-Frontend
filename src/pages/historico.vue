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
            <td>{{ item.displayCycle }}</td>
            <td>{{ item.lastBenefits }}</td>
            <td>
              <div >
                <img src="../assets/play.png" @click="item.dialog = true" alt="icono" class="play" />
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
                  :moneyInCycle="item.moneyInCycle"
                ></DetalleDialog>
              </v-dialog>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-col>

    <v-col cols="12">
      <h2>Proyeccion del siguiente ciclo:</h2>
      <br />
      <hr />
      <hr />
      <br />

    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from "vue";
import { useShopStore } from "../stores/shop_store.js";
import DetalleDialog from "../components/detalleDialog.vue";

const shopStore = useShopStore();
let cicles = [];

const headers = [
  { title: "Registro", key: "cycleNumber" },
  { title: "Ganancias", key: "totalEarnings" },
  { title: "Detalles", key: "Detalles", sortable: false },
];

const getCicles = async () => {
  shopStore.getDataShop();
  let cicleType = shopStore.shop.cycleType;
  cicles = Object.values(shopStore.cicloDatos);
  cicles = cicles.map((cycle) => ({
    ...cycle,
    displayCycle: `${cicleType} ${cycle.cycleNumber}`, // Nuevo campo para mostrar en la tabla
    dialog: false, // Añade el estado del diálogo a cada ciclo
  }));
};
getCicles();
</script>

<style scoped>
.play {
  height: 25px;
  cursor: pointer;
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
