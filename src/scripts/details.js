/* Imported Functions */
import { getPokemonByIdOrName } from '/lib/pokeapi.js';
import {
    getParamWithURL, capitalize, hideLoader, getRandomBetween, questionMarkSprite, idParamName,
} from '/lib/utilities.js';

const pokeballLoader = document.querySelector('.container-loader');

/**
 * This function loads and displays details of a Pokemon, including its name and artwork.
 */
async function loadPokemonDetails() {
    const id = getParamWithURL(idParamName);
    /** @type Pokemon */
    const pokemon = await getPokemonByIdOrName(id);

    const artworkElement = document.getElementById('pokemon-artwork');
    const nameElement = document.getElementById('pokemon-name');

    document.title = capitalize(pokemon.name);
    nameElement.innerText = capitalize(pokemon.species.name);

    const officialFrontArtwork = pokemon.sprites.other['official-artwork'].front_default;

    artworkElement.loading = 'lazy';

    if (officialFrontArtwork) {
        artworkElement.src = officialFrontArtwork;
    } else {
        artworkElement.src = questionMarkSprite;
    }
}

/* Loads and displays details of a Pokemon. */
window.addEventListener('load', async () => {
    document.body.style.overflow = 'hidden';

    await loadPokemonDetails();

    setTimeout(() => {
        hideLoader(pokeballLoader);
        document.body.style.overflow = '';
    }, getRandomBetween(250, 3000));
});
