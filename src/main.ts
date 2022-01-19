import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import "vue-skeletor/dist/vue-skeletor.css";

createApp(App).use(router).mount("#app");
