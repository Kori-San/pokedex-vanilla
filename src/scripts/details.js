import {getPokemonById} from "./pokapi.js";

/**
 * The function capitalizes the first letter of a given string.
 *
 * @param {string } string
 * The parameter "string" is a string data type that represents the input string that needs
 * to be capitalized.
 *
 * @returns {string}
 * Returns a string with the first character capitalized and the rest of the string unchanged.
 */
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 *
 * @returns {string}
 */
function getIdWithURL() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get("id");
}

async function loadPokemonDetails() {
    const id = getIdWithURL();
    /** @type Pokemon */
    const pokemon = await getPokemonById(id);

    const artworkElement = document.getElementById("pokemon-artwork");
    const nameElement = document.getElementById("pokemon-name");

    document.title = capitalize(pokemon.name);
    nameElement.innerText = capitalize(pokemon.name);

    const officialFrontArtwork = pokemon.sprites.other["official-artwork"].front_default;

    if (officialFrontArtwork) {
        artworkElement.src = officialFrontArtwork;
    }
    else {
        artworkElement.src = "https://www.pokepedia.fr/images/f/f7/Sprite_%3F%3F%3F%3F%3F%3F%3F%3F%3F%3F_RS.png"
    }
}

window.addEventListener('load', async () => {
    await loadPokemonDetails();
});
