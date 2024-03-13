import { createApp } from "vue";
import { createPinia } from "pinia";
import { Quasar, Notify } from "quasar";
import "./style.css";
// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from "./App.vue";

/* Importing the router.js file from the router folder. */
import router from "./router";

// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";

// Import Quasar css
import "quasar/src/css/index.sass";

/* Creating a new instance of Pinia. */
const pinia = createPinia();

/* Importing the axios plugin. */
import { axios } from "./plugins/axios";

/* Registering the store with Pinia. */
// pinia.use(store);

/* Creating a new instance of Vue. */
const myApp = createApp(App);

/* Importing the Quasar plugins. */
myApp.use(Quasar, {
  plugins: {
    Notify,
  }, // import Quasar plugins and add here
  config: {
    notify: {
      /* look at QuasarConfOptions from the API card */
    },
  },
});

/* Mounting the app to the div with the id of app. */
myApp.use(pinia);

// myApp.use(store);
myApp.use(router);

/* Importing the authentication module from the authentication.js file. */
import { authentication } from "./store/modules/authentication";
import { ticket } from "./store/modules/tickets.js";
import { workspaceUser } from "./store/modules/workspace_users.js";

/* Creating a new instance of the authentication module. */
const useAuthentication = authentication();
const useTicket         = ticket();
const useWorkspaceUser  = workspaceUser();

/* Making the axios plugin available to all components. */
myApp.config.globalProperties.$axios = axios;
myApp.config.globalProperties.$authentication = useAuthentication;
myApp.config.globalProperties.$ticket = useTicket;
myApp.config.globalProperties.$workspaceUser = useWorkspaceUser;
myApp.config.globalProperties.$router = router;

myApp.config.globalProperties.$truncateString = function (str, maxLength) {
  if (!str || !str?.length) return;

  if (str.length <= maxLength) {
    return str;
  } else {
    return str.substring(0, maxLength) + "...";
  }
};

myApp.config.globalProperties.$capitalize = (str) => {
  if (typeof str !== "string" || str.length === 0) return str;

  return str.charAt(0).toUpperCase() + str.slice(1);
};

myApp.config.globalProperties.$formatPriority = (priority = 'low') => {
  const priorities = {
    low: {
      label: 'baixa',
      color: '#5cb85c', // verde
      icon: 'low_priority'
    },
    medium: {
      label: 'média',
      color: '#f0ad4e', // amarelo
      icon: 'priority'
    },
    high: {
      label: 'alta',
      color: '#d9534f', // vermelho
      icon: 'priority_high'
    }
  };

  return priorities[priority]
};

myApp.config.globalProperties.$getTagColor = (tag) => {
  const colors = {
    urgent: {
      iconName: "warning", // ou 'alert'
      backgroundColor: `var(--tag-${tag})`,
      textColor: `var(--tag-text-${tag})`,
    },
    critical: {
      iconName: "error", // ou 'critical'
      backgroundColor: `var(--tag-${tag})`,
      textColor: `var(--tag-text-${tag})`,
    },
    deadline: {
      iconName: "schedule", // ou 'clock'
      backgroundColor: `var(--tag-${tag})`,
      textColor: `var(--tag-text-${tag})`,
    },
    new_feature: {
      iconName: "add", // ou 'star'
      backgroundColor: `var(--tag-${tag})`,
      textColor: `var(--tag-text-${tag})`,
    },
    bug: {
      iconName: "bug_report",
      backgroundColor: `var(--tag-${tag})`,
      textColor: `var(--tag-text-${tag})`,
    },
    security: {
      iconName: "lock", // ou 'shield'
      backgroundColor: `var(--tag-${tag})`,
      textColor: `var(--tag-text-${tag})`,
    },
    documentation: {
      iconName: "book", // ou 'book'
      backgroundColor: `var(--tag-${tag})`,
      textColor: `var(--tag-text-${tag})`,
    },
    user_feedback: {
      iconName: "comment", // ou 'speech'
      backgroundColor: `var(--tag-${tag})`,
      textColor: `var(--tag-text-${tag})`,
    },
    performance_improvement: {
      iconName: "rocket", // ou 'rocket'
      backgroundColor: `var(--tag-${tag})`,
      textColor: `var(--tag-text-${tag})`,
    },
    integration: {
      iconName: "settings", // ou 'gear'
      backgroundColor: `var(--tag-${tag})`,
      textColor: `var(--tag-text-${tag})`,
    },
  };

  return colors[tag];
};

// Assumes you have a <div id="app"></div> in your index.html
myApp.mount("#app");

export default myApp;
