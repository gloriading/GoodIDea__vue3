//vue.config.js
module.exports = {
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Vue3 | GoodIDeas";
      return args;
    });
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/scss/_variables.scss";
        `,
      },
    },
  },
};
