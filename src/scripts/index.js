import { buildNextPrevButtons, buildPokemonContainer } from "/lib/pokedex.js";

/* Loads and displays all Pokemons in a range made with Offset and Limit vars local to 'pokedex.js'. */
window.addEventListener('load', async () => {
    buildNextPrevButtons();
    await buildPokemonContainer();
    console.log("load");
})
