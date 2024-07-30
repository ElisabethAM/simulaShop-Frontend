import { createApp } from "vue";
import "./style.css";

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
});

const app = createApp(App);
app.config.globalProperties.$api = api;
app.use(vuetify);
app.use(pinia);
app.use(router);
app.mount("#app");