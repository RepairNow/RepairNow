import "@mdi/font/css/materialdesignicons.css";
import { createVuetify, ThemeDefinition } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const defaultLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: "#F4F4F4",
    surface: "#F4F4F4",
    primary: "#4D908E",
    "primary-darken-1": "#577590",
    secondary: "#F8961E",
    "secondary-darken-1": "#F9844A",
    error: "#B00020",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
    lightBlack: "#080808",
  },
};

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: "defaultLightTheme",
      themes: { defaultLightTheme },
    },
    defaults: {
      VBtn: {
        color: "primary",
        density: "default",
        variant: "flat",
      },
      VAlert: {
        border: "start",
        color: "primary",
        closable: true,
        variant: "tonal",
      },
      VTextField: {
        density: "compact",
        color: "secondary-darken-1",
        baseColor: "secondary-darken-1",
        variant: "solo-filled",
        singleLine: true,
      },
      VCheckbox: {
        color: "primary",
      },
      VSwitch: {
        color: "primary",
      },
      VTabs: {
        color: "primary",
        alignTabs: "center",
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
