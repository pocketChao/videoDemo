import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueCompositionApi from "@vue/composition-api";
import animate from "animate.css";
import { Toast } from "vant";
import sayHello from "./plugins/say";
const VConsole = require("vconsole");
console.log(VConsole);
new VConsole();
console.log(VConsole);
Vue.config.productionTip = false;
Vue.use(VueCompositionApi);
Vue.use(animate);
Vue.use(Toast);
Vue.use(sayHello, "option's of plugin sayHello");
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
