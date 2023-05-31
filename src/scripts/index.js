import {
    buildNextPrevButtons, buildSearchBar, buildPokemonContainer, buildLimitInput,
} from '/lib/pokedex.js';
import { hideLoader, getRandomBetween } from '/lib/utilities.js';

const pokeballLoader = document.querySelector('.container-loader');
/* Loads and displays all Pokemons in a range made with Offset and Limit vars local to 'pokedex.js'. */
window.addEventListener('load', async () => {
    document.body.style.overflow = 'hidden';

    buildNextPrevButtons();
    buildSearchBar();
    buildLimitInput();
    await buildPokemonContainer();

    setTimeout(() => {
        hideLoader(pokeballLoader);
        document.body.style.overflow = '';
    }, getRandomBetween(250, 3000));
});
