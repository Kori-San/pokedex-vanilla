import { buildNextPrevButtons, buildSearchBar, buildPokemonContainer, buildLimitInput } from "/lib/pokedex.js";
import { hideLoader } from '/lib/utilities.js';

const pokeballLoader = document.querySelector('.container-loader');
/* Loads and displays all Pokemons in a range made with Offset and Limit vars local to 'pokedex.js'. */
window.addEventListener('load', async () => {
    buildNextPrevButtons();
    buildSearchBar();
    buildLimitInput();
    await buildPokemonContainer();
    setTimeout(() => {
        hideLoader(pokeballLoader);
    }, 3000)
})
