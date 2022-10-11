import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

const purpleTheme: any = {
  theme: {
    dark: false,
    default: "light",
    themes: {
      light: {
        primary: "#673ab7",
        secondary: "#ff5722",
        accent: "#03a9f4",
        error: "#f44336",
        warning: "#ffeb3b",
        info: "#2196f3",
        success: "#8bc34a",

        anchor: "#1FFFF1",
      },
    },
  },
};

export default new Vuetify(purpleTheme);
