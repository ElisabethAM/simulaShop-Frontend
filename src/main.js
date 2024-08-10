import { createApp } from "vue";
import "./style.css";
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import router from "./routes/index.js";
import {api} from './boot/axios.js';

//pinia
import { createPinia } from "pinia";
const pinia = createPinia();

import App from "./App.vue";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi', // This is already the default value - only for display purposes
  },
});

const app = createApp(App);
app.config.globalProperties.$api = api;
app.use(vuetify);
app.use(router);
app.use(pinia);
app.mount("#app");