<template>
  <div class="background-container">
    <div class="background-image"></div>
    <v-row class="encima">
      <v-row>
        <v-col cols="12">
          <v-progress-circular color="white" indeterminate :size="160" :width="20"></v-progress-circular>
        </v-col>
      </v-row>
    </v-row>
    <!-- Inicio del footer -->
    <div class="footer" height="auto" padless>
      <v-row>
        <v-col class="header justify-center" cols="4">
          <h2>Cargando resultados</h2>
        </v-col>
      </v-row>
      <v-row class="contenido">
        <v-col cols="2" class="imagen">
          <v-img 
            :src="comentarios[currentComentario].img" 
            alt="Personaje"
            cover
           >
          </v-img>
        </v-col>
        <v-col cols="10" class="dialogo">
          <div>
            <h3>{{ comentarios[currentComentario].nombre }}:</h3>
          </div>
          <div class="monologo elevation-6">
            <h3>{{ comentarios[currentComentario].dialogo }}</h3>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup>
import { ref,onMounted,onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { useShopStore } from "../stores/shop_store.js";

const router = useRouter();
const shopStore = useShopStore();
const store = shopStore.shop;
const currentComentario = ref(0);
const intervalId = ref(null);
const comentarios = [
  {
    nombre: 'Visitante 1',
    dialogo: 'Muy buena tienda, excelentes precios',
    img: new URL('../assets/personajes/1.png', import.meta.url).href,
  },
  {
    nombre: 'Visitante 2',
    dialogo: 'Muy limpios los pasillos, se ve que el local vale la pena',
    img: new URL('../assets/personajes/2.png', import.meta.url).href,
  },
  {
    nombre: 'Visitante 3',
    dialogo: 'Gran variedad de productos, voy a volver seguido',
    img: new URL('../assets/personajes/4.png', import.meta.url).href,
  },
  {
    nombre: 'Empleado 1',
    dialogo: 'Limpieza en el pasillo 4, se cayo la refri :(',
    img: new URL('../assets/personajes/3.png', import.meta.url).href,
  },
  {
    nombre: 'Visitante 4',
    dialogo: 'El personal es muy agradable, 5 estrellas',
    img: new URL('../assets/personajes/5.png', import.meta.url).href,
  },
  {
    nombre: 'Visitante 5',
    dialogo: 'Este lugar es muy amplio, tienen muchos productos que ofrecer',
    img: new URL('../assets/personajes/6.png', import.meta.url).href,
  },
  {
    nombre: 'Visitante 6',
    dialogo: 'Yo solo vine a usar el baño, con permiso.',
    img: new URL('../assets/personajes/10.png', import.meta.url).href,
  },
  {
    nombre: 'Visitante 7',
    dialogo: 'Es el único local en donde pude encontrar lo que necesito, excelente',
    img: new URL('../assets/personajes/8.png', import.meta.url).href,
  },
  {
    nombre: 'Empleado 1',
    dialogo: 'Limpieza en el pasillo 6, se cayó un ventilador...',
    img: new URL('../assets/personajes/7.png', import.meta.url).href,
  },
  {
    nombre: 'Visitante 8',
    dialogo: 'Excelente, ¡pude encontrar todo lo que buscaba!',
    img: new URL('../assets/personajes/9.png', import.meta.url).href,
  },
]

onMounted(() => {
  obtenerBeneficios();

  intervalId.value = setInterval(() => {
    cambiarComentario();
  }, 2500); // Cambia de comentario cada 2.5 segundos
});

onBeforeUnmount(() => {
  clearInterval(intervalId.value); // Limpia el intervalo al desmontar el componente
});

const cambiarComentario = () => {
  const randomIndex = Math.floor(Math.random() * comentarios.length);
  currentComentario.value = randomIndex;
};

const obtenerBeneficios = async () => {
  await shopStore.getBenefits(store._id);
  store.value = shopStore.shop;
  router.push({ name: "Resultados" });
};
</script>

<style scoped>
.monologo {
  background: #E9D89D;
  padding: inherit;
  min-width: 100%;
  text-align: left;
  margin-top: 2%;
}

.dialogo {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.imagen {
  display: flex;
  align-content: center;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  min-height: 120px;
}

.header {
  display: flex;
  align-items: center;
  background-color: #393534;
}

.contenido {
  background: #ede5d8;
  color: #393534;
}

.background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("../assets/fondo.jpg") no-repeat center center;
  background-size: cover;
  filter: blur(8px);
  z-index: -1;
}

.encima {
  position: relative;
  z-index: 1;
  color: white;
  text-align: center;
  padding: 20px;
  border-radius: 8px;
  height: 80%;
  min-height: max-content;
  display: flex;
  align-content: center;
  ;
}

.footer {
  font-family: 'Inika', serif;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1;
}

.footer .v-row {
  margin: 0;
}
</style>
