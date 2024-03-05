import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar, Notify } from 'quasar'
import './style.css'
// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from './App.vue'

/* Importing the router.js file from the router folder. */
import router from "./router";

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

/* Creating a new instance of Pinia. */
const pinia = createPinia();

/* Importing the axios plugin. */
import { axios } from "./plugins/axios"

/* Registering the store with Pinia. */
// pinia.use(store);

/* Creating a new instance of Vue. */
const myApp = createApp(App);

/* Importing the Quasar plugins. */
myApp.use(Quasar, {
  plugins: {
    Notify
  }, // import Quasar plugins and add here
  config: {
    notify: { /* look at QuasarConfOptions from the API card */ }
  }
})

/* Mounting the app to the div with the id of app. */
myApp.use(pinia)
// myApp.use(store);
myApp.use(router);
/* Importing the authentication module from the authentication.js file. */
import { authentication } from './store/modules/authentication';

/* Creating a new instance of the authentication module. */
const useAuthentication = authentication();


/* Making the axios plugin available to all components. */
myApp.config.globalProperties.$axios = axios
myApp.config.globalProperties.$authentication = useAuthentication;

myApp.config.globalProperties.$router = router;

// Assumes you have a <div id="app"></div> in your index.html
myApp.mount('#app')

export default myApp;
