<template>
  <div class="background-image"></div>

  <v-container class="content mx-5" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <v-card class="crema scaled-card" elevation="15">
          <v-card-text class="pa-0">
            <header class="header">
              <v-row class="ma-5">
                <v-col cols="2">
                  <img src="../assets/tienda.svg" alt="Logo" class="header-logo">
                </v-col>
                <v-col cols="10">
                  <h2 class="header-title">SIMULADOR DE BENEFICIOS SIMULASHOP</h2>
                </v-col>
              </v-row>
            </header>
            <main>
              <router-view></router-view>
            </main>
            <footer class="footer mx-5">
              <v-btn class="no-focus" color="#B98D4C">
                Iniciar
                <img src="../assets/play.png" alt="icono" class="ml-3">
              </v-btn>
              <v-btn class="no-focus" color="#B98D4C">
                Guía rápida
                <img src="../assets/play.png" alt="icono" class="ml-3">
              </v-btn>
            </footer>
            <div class="d-flex justify-center align-center mb-3">
              <v-row class="ma-3 info pa-3">
                <v-col cols="1">
                  <img src="../assets/info.png" alt="">
                </v-col>
                <v-col cols="11">
                  <h2>
                    Esta es una herramienta para gestión de los beneficios de un negocio en base a los valores establecidos de demanda, inventario y ciclos de funcionamiento
                  </h2>
                </v-col>
              </v-row>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'IndexPage',
};
</script>

<style scoped>
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

.info {
  background-color: #393534;
  color: #EDE5D8;
  max-width: 80%; /* Ajusta según sea necesario */
}

.no-focus:focus {
  outline: none; /* Elimina el borde de enfoque */
}

.content {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 800px;
  /* min-height: 150vh; */
}

h2{
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
  height: 100px; /* Aumenta el tamaño del logo */
  color: #B98D4C;
}

.header-title {
  margin: 0;
  color: #EDE5D8;
  font-size: 2.3rem; /* Aumenta el tamaño del texto del título */
  font-family: 'Inika', serif;
}

.footer {
  display: flex;
  justify-content: space-between;
  padding: 32px; /* Aumenta el padding para el footer */
  border-radius: 0 0 16px 16px; /* Aumenta el radio de borde */
}
.footer .v-btn {
  font-size: 1.25rem; /* Aumenta el tamaño del texto en los botones */
  padding: 16px 32px; /* Ajusta el padding para aumentar el tamaño del botón */
  min-width: 150px; /* Ajusta el ancho mínimo del botón */
  min-height: 70px;
  border-radius: 5%;
}

.footer .v-btn img {
  height: 30px; /* Aumenta el tamaño del icono dentro del botón */
  width: auto; /* Mantiene la proporción */
}

.info img {
  height: 60px; /* Aumenta el tamaño del icono en la sección de información */
  width: auto; /* Mantiene la proporción */
}


.scaled-card {
  transform: scale(1); /* Escala el card al 100% de su tamaño original */
  transform-origin: top center; /* Ajusta el origen de la transformación */
}
</style>
