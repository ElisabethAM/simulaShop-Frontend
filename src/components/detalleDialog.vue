<template>
  <div class="resultados">
    <v-row>
      <v-col cols="6">
        <br />
        <h2>Ganancias del ciclo {{ cycleCurrent }}:</h2>
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
              <h3>{{ shopStore.shop.money - ultimoBeneficio }} Lps</h3>
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
                    <h3 class="text-right">{{ shopStore.shop.money }}</h3>
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
                    v-for="product in shopStore.shop.inventory.filter((p) =>
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
    </div>
  </div>
</template>
<script setup>
import { Line } from "vue-chartjs";
import { ref } from "vue";

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

const props = defineProps({
  numeroCiclo: Number,
  lastBenefits: Number,
});

const shopStore = useShopStore();
const cicloDatos = ref(null);
const cycleCurrent = ref(0);
const ultimoBeneficio = ref(null);

cycleCurrent.value = props.numeroCiclo;
ultimoBeneficio.value = props.lastBenefits;
cicloDatos.value = shopStore.cicloDatos

// Obtener los 5 ciclos deseados (ciclo actual y 4 anteriores)
const cycleStartIndex = Math.max(cycleCurrent.value - 5, 0); // Asegura que no haya índices negativos
const lastFiveCycles = Object.values(cicloDatos.value).slice(cycleStartIndex, cycleCurrent.value);

console.log(lastFiveCycles);
const labels = lastFiveCycles.map((cycle) => cycle.cycleNumber.toString());
const dataSet = lastFiveCycles.map((cycle) => cycle.lastBenefits);

const nextPage = ref(false);
const btnvolver = ref(false);

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
  background-color: #ede5d8;
  color: rgb(48, 48, 48);
  padding: 40px;
}
</style>
