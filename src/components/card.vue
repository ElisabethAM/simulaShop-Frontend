<template>
    <v-card class="crema scaled-card elevation-6 mb-3 pb-3">
        <v-card-text class="pa-0">
            <header class="header">
                <v-row class="ma-2" align="center">
                    <v-col cols="12">
                        <h4 class="header-title">{{ tittle }}</h4>
                    </v-col>
                </v-row>
            </header>
        </v-card-text>
        <main>
            <v-row class="contenido mb-3 mt-2">
                <v-col cols="12">
                    <h2>últimos beneficios:</h2>
                </v-col>

                <v-row>
                    <v-col cols="1"></v-col>

                    <v-col cols="10">
                        <div class="beneficios elevation-6 d-flex align-center justify-center pa-3">
                            {{ lastBenefits }}
                            <img class="coins" src="../assets/coins.png" alt="monedas" >
                        </div>
                    </v-col>

                    <v-col cols="1"></v-col>
                </v-row>

            </v-row>
        </main>
    </v-card>
</template>

<script>
export default {
    name: 'Card',
    props: {
    tittle: {
      type: String,
      required: true
    },
    lastBenefits: {
        type: Number,
        required: false
    }
  }
}
</script>

<style scoped>
.beneficios {
    background: #E9D89D;

}

.coins{
    height: 20px;
    margin-left: 5px;
}

.contenido {
    display: flex;
    justify-content: center;
}

.crema {
    background: #F8F8F8;
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

.header-title {
    margin: 0;
    color: #EDE5D8;
    font-size: 1.3rem;
    /* Aumenta el tamaño del texto del título */
    font-family: 'Inika', serif;
}

.header-logo-volver {
    height: 40px !important;
    align-content: center !important;
}
</style>