import {
    buildNextPrevButtons, buildSearchBar, buildPokemonContainer, buildLimitInput,
} from '/lib/pokedex.js';
import { hideLoader } from '/lib/utilities.js';

const pokeballLoader = document.querySelector('.container-loader');
/* Loads and displays all Pokemons in a range made with Offset and Limit URL params */
window.addEventListener('load', async () => {
    document.body.style.overflow = 'hidden';

    buildNextPrevButtons();
    buildSearchBar();
    buildLimitInput();
    await buildPokemonContainer();

    setTimeout(() => {
        hideLoader(pokeballLoader);
        document.body.style.overflow = '';
    }, 250);
});
