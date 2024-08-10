<template>
  <div class="resultados">
    <v-row>
      <v-col cols="6">
        <br />
        <h2>Ganancias del ciclo {{ shopActual.currentCycle - 1 }}:</h2>
        <Line :options="config" :data="chartData" />
      </v-col>
      <v-col cols="6">
        <br />
        <h2>Detalle de ganancias:</h2>
        <br />
        <div v-if="!nextPage">
          <v-row>
            <v-col cols="6">
              <h3>Utilidad anterior:</h3>
              <br />
              <h3>Beneficios del ciclo:</h3>
              <br />
            </v-col>
            <v-col cols="6">
              <h3>{{ shopActual.money - ultimoBeneficio }} Lps</h3>
              <br />
              <h3>{{ ultimoBeneficio }} Lps</h3>
              <br />
            </v-col>
            <v-row>
              <v-col cols="12">
                <div class="beneficios elevation-6 d-flex pa-3">
                  <v-col>
                    <h3>Total</h3>
                  </v-col>
                  <v-col cols="1">
                    <img
                      class="coins"
                      src="../assets/coins.png"
                      alt="monedas"
                    />
                  </v-col>
                  <v-col cols="9">
                    <h3 class="text-right">{{ shopActual.money }}</h3>
                  </v-col>
                </div>
              </v-col>
            </v-row>
          </v-row>
        </div>
        <div v-if="nextPage">
          <v-row>
            <v-col cols="12">
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
                    v-for="product in shopActual.inventory.filter((p) =>
                      p.historicalData.some(
                        (h) => h.cycleNumber === cycleCurrent
                      )
                    )"
                    :key="product._id"
                    class="text-left"
                  >
                    <td class="">{{ product.name }}</td>
                    <td class="text-center">
                      {{
                        product.historicalData.find(
                          (h) => h.cycleNumber === cycleCurrent
                        )?.saleUnits || "N/A"
                      }}
                    </td>
                    <td class="text-center">
                      {{
                        (product.historicalData.find(
                          (h) => h.cycleNumber === cycleCurrent
                        )?.salePrice || 0) *
                        (product.historicalData.find(
                          (h) => h.cycleNumber === cycleCurrent
                        )?.saleUnits || 0)
                      }}
                    </td>
                  </tr>
                  <tr class="encabezado">
                    <td colspan="1" class="text-center">Total Ingresos:</td>
                    <td colspan="3" class="text-right">
                      {{ ultimoBeneficio }}
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
    <div v-if="!nextPage" class="footer my-8 justify-end">
      <v-btn
        @click="next"
        class="d-flex no-focus pa-6 justify-center"
        color="#B98D4C"
      >
        <h3>Ver más</h3>
        <img src="../assets/play.png" alt="icono" class="play ml-3" />
      </v-btn>
    </div>
    <div v-if="btnvolver" class="footer my-8 justify-space-between">
      <v-btn
        @click="volver"
        class="d-flex no-focus pa-6 justify-center"
        color="#B98D4C"
      >
        <h3>Anterior</h3>
      </v-btn>
      <router-link
        v-if="nextPage"
        :to="{ name: 'Gestionar Tienda', params: { id: idLocal } }"
      >
        <v-btn class="d-flex no-focus pa-6 justify-center" color="#B98D4C">
          <h3>Ir al siguiente ciclo</h3>
          <img src="../assets/play.png" alt="icono" class="play ml-3" />
        </v-btn>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { useShopStore } from "../stores/shop_store.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);
import { ref } from "vue";

const shopStore = useShopStore();
const shopActual = ref(null);
const ultimoBeneficio = ref(null);
const cicloDatos = ref(null);
const cycleCurrent = ref(0);

shopActual.value = shopStore.shop;
cycleCurrent.value = shopActual.value.currentCycle - 1;
cicloDatos.value = shopActual.value.cycleData;
ultimoBeneficio.value =
  cicloDatos.value[shopActual.value.cycleData.length - 1].lastBenefits;

const lastFiveCycles = Object.values(cicloDatos.value).slice(-5);

const labels = lastFiveCycles.map((cycle) => cycle.cycleNumber.toString());

const dataSet = lastFiveCycles.map((cycle) => cycle.lastBenefits);

const nextPage = ref(false);
const btnvolver = ref(false);
const idLocal = ref(2);

const chartData = {
  labels: labels,
  datasets: [
    {
      label: "Ganancias por ciclo",
      fill: true,
      data: dataSet,
      borderColor: " #B98D4C",
      backgroundColor: "#E9D89D",
      pointStyle: "circle",
      pointRadius: 5,
      pointHoverRadius: 15,
    },
  ],
};

const config = {
  type: "line",
  data: chartData,
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: (ctx) => "Point Style: " + ctx.chart.data.datasets[0].pointStyle,
      },
      filler: true,
    },
  },
};
const next = () => {
  //mostrar tabla de productos
  nextPage.value = true;
  btnvolver.value = true;
};

const volver = () => {
  //mostrar beneficios
  btnvolver.value = false;
  nextPage.value = false;
};
</script>

<style scoped>
.beneficios {
  background: #e9d89d;
}

.play {
  height: 25px;
}

.encabezado {
  background: #e9d89d !important;
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

.coins {
  height: 20px;
  margin-left: 5px;
}

.resultados {
  height: 500px;
}
</style>
