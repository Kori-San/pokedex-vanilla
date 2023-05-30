const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://pokedex-qe1p1dckh-kori-san.vercel.app',
  },
});
