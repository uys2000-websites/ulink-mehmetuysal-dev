import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { useAppStore } from "./stores/app";
import { setULogger } from "u-logger";
const app = createApp(App);

setULogger(
  import.meta.env.DEV || localStorage.getItem("debug") == "true",
  false
);

app.use(createPinia());
app.use(router);
app.mount("#app");

const appStore = useAppStore();

appStore.theme = localStorage.getItem("theme") ?? "dark";
document.body.setAttribute("data-theme", appStore.theme);
