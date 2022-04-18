import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import antdv from "./utils/antdv";

const app = createApp(App);
antdv(app);

app.use(store).use(router).mount("#app");
