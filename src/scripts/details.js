import { getPokemonById } from "/scripts/pokapi.js";

async function init() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");

    const pokemon = await getPokemonById(id);

    console.log(pokemon);
}

init();