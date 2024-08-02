<template>
  <div class="background-image"></div>
  <v-container class="content mx-5" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <v-card class="crema scaled-card elevation-6" >
          <v-card-text class="pa-0">
            <header class="header">
              <v-row class="ma-2" align="center">
                <v-col cols="1">
                  <img src="../assets/tienda.svg" alt="Logo" class="header-logo ">
                </v-col>
                <v-col cols="4"> 
                  <h2 class="header-title">{{ tittle }}</h2>
                </v-col>
                <v-col cols="4">
                </v-col>
                <v-col cols="2">
                  <router-link :to="previusRoute">
                    <h2 class="header-title" style="">volver</h2>
                  </router-link>
                </v-col>
                <v-col cols="1">
                  <router-link :to="previusRoute">
                    <img src="../assets/volver.png"  alt="Logo" class="header-logo-volver">
                  </router-link>
                </v-col>
              </v-row>
            </header>
          </v-card-text>
          <main>
            <v-row class="contenido">
              <v-col cols="10">
                <div v-if="route.path === '/nuevaTienda'">
                  <NuevaTienda></NuevaTienda>
                </div>
                <div v-if="route.path === '/bienvenido'">
                  <Bienvenido></Bienvenido>
                </div>
              </v-col>
            </v-row>
          </main>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref,watchEffect,watch   } from 'vue';
import { useRoute } from 'vue-router';
import NuevaTienda from '../pages/nuevaTienda.vue'
import Bienvenido from '../pages/bienvenido.vue'

export default {
  components: { NuevaTienda,Bienvenido },
  name: 'MainLayout',
  setup() {
    const route = useRoute();
    const tittle = ref('');
    const previusRoute = ref('');

    watchEffect(() => {
      switch (route.path) {
        case '/bienvenido':
          tittle.value = 'Bienvenido';
          previusRoute.value= '/'
          break;
          case '/nuevaTienda':
          tittle.value = 'Nueva Tienda';
          previusRoute.value = '/bienvenido'
          break;
        default:
          tittle.value = 'Título por Defecto';
      }
    });

   
    return { tittle,route,previusRoute };
  },
};
</script>

<style scoped>
.contenido {
  display: flex;
  justify-content: center;
}

.background-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('../assets/fondo.jpg') no-repeat center center;
  background-size: cover;
  filter: blur(8px);
  z-index: -1;
}


.no-focus:focus {
  outline: none;
  /* Elimina el borde de enfoque */
}

.content {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 1000px;
  /* min-height: 150vh; */
}

h2 {
  font-family: 'Inika', serif !important;
}

.crema {
  background: #EDE5D8;
}

.header {
  display: flex;
  align-items: center;
  background-color: #393534;

}

.header-logo {
  height: 60px;
  /* Aumenta el tamaño del logo */
  color: #B98D4C;
}

.header-logo-volver {
  height: 40px !important;
  align-content: center !important;
}

.header-title {
  margin: 0;
  color: #EDE5D8;
  font-size: 2.3rem;
  /* Aumenta el tamaño del texto del título */
  font-family: 'Inika', serif;
}


.scaled-card {
  transform: scale(1);
  /* Escala el card al 100% de su tamaño original */
  transform-origin: top center;
  /* Ajusta el origen de la transformación */
}


</style>
