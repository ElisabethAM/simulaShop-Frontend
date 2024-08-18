<template>
  <v-row>
    <v-col cols="12">
      <h2 class="my-3">{{ shopStore.shop.cycleType }}s anteriores:</h2>
      <v-divider class="mb-3" :thickness="3"></v-divider>
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
              <div>
                <img
                  src="../assets/play.png"
                  @click="item.dialog = true"
                  alt="icono"
                  class="play"
                />
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
      <div
        v-if="proyections.length === 0"
        class="d-flex align-center justify-center"
      >
        <h2 class="text-center mb-3 mr-1">
          Selecciona o agrega productos en el inventario para realizar la
          proyección
        </h2>
        <v-dialog max-width="500" transition="dialog-bottom-transition">
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn
              v-bind="activatorProps"
              icon="mdi-information"
              color="brown-darken-4"
              variant="text"
              size="large"
            ></v-btn>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card title="Proyecciones" class="bgPredit text-brown-lighten-5">
              <v-card-text>
                Para poder realizar la proyeccion del siguiente periodo (Dia,
                Semana, Mes o Año) es necesario que seleccione en el inventario
                los productos con los que piensa empezar dicho periodo.
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn text="Cerrar" @click="isActive.value = false"></v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </div>
      <!-- boton de proyecciones -->
      <v-btn
        v-if="!showProy"
        @click="showProyections()"
        class="d-flex no-focus pa-6 justify-center"
        color="#B98D4C"
      >
        <h3>Ver proyecciones</h3>
        <img src="../assets/play.png" alt="icono" class="play ml-3" />
      </v-btn>

      <v-dialog v-model="dialogPredits" max-width="320" persistent>
        <v-list class="py-2 bgPredit" elevation="12" rounded="lg">
          <v-list-item
            prepend-icon="mdi-store-clock-outline"
            title="Calculando Proyección..."
            class="text-white"
          >
            <template v-slot:prepend>
              <div class="pe-4">
                <v-icon color="yellow-lighten-3" size="x-large"></v-icon>
              </div>
            </template>

            <template v-slot:append>
              <v-progress-circular
                color="primary"
                indeterminate="disable-shrink"
                size="16"
                width="2"
              ></v-progress-circular>
            </template>
          </v-list-item>
        </v-list>
      </v-dialog>

      <!-- tabla de Proyecciones -->
      <br />
      <div v-if="showProy && proyections.length > 0" class="mb-5">
        <h2 class="text-center mb-3">
          Proyeccion para {{ shopStore.shop.cycleType }}:
          {{ shopStore.shop.currentCycle }}
        </h2>
        <v-divider class="mb-3" :thickness="3"></v-divider>
        <v-table height="300px" fixed-header class="elevation-6">
          <thead>
            <tr>
              <th class="text-left encabezado">Producto</th>
              <th class="text-center encabezado">Ventas</th>
              <th class="text-center encabezado">Ingreso</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="product in proyections"
              :key="product._id"
              class="text-left"
            >
              <td class="">{{ product.productName }}</td>
              <td class="text-center">
                {{ product.predictedUnits }}
              </td>
              <td class="text-center">
                {{ product.totalEarnings }}
              </td>
            </tr>
            <tr class="encabezado">
              <td colspan="1" class="text-center">Total Ingresos:</td>
              <td colspan="3" class="text-right">
                {{ predictsBenefits }}
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from "vue";
import { useShopStore } from "../stores/shop_store.js";
import DetalleDialog from "../components/detalleDialog.vue";

const shopStore = useShopStore();
let cicles = [];
let proyections = ref([]);
let showProy = ref(false);
const dialogPredits = ref(false);
const predictsBenefits = ref(null);

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

const showProyections = async () => {
  dialogPredits.value = true;
  await getProyections();

  showProy.value = true;
};
const getProyections = async () => {
  await shopStore.getPredictions();
  proyections.value = shopStore.predictions;
  predictsBenefits.value = proyections.value.reduce((sum, product) => {
    return sum + product.totalEarnings;
  }, 0);
  dialogPredits.value = false;
};
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

.no-focus:focus {
  outline: none;
  /* Elimina el borde de enfoque */
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

.bgPredit {
  background-color: #393534;
}
</style>
