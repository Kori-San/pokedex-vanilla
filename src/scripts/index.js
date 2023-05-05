import { getAllPokemonsList } from "./pokapi.js";

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function createPokemonBox(url) {
    const container = document.getElementById("pokemon-container");

    const response = await fetch(url);
    const pokemon = await response.json();

    const newPokemonBox = document.createElement("div");

    const newSprite = document.createElement("img");
    newSprite.src = pokemon.sprites.front_default;

    const newName = document.createTextNode(capitalize(pokemon.name));

    newPokemonBox.classList.add("pokemon-box");
    newPokemonBox.appendChild(newSprite);
    newPokemonBox.appendChild(newName);
    container.appendChild(newPokemonBox);
}

async function buildStartPage() {
    try {
        const pokemonList = await getAllPokemonsList(70, 0);

        for (let pokemonData of pokemonList) {
            // pokemonData: { name, url }
            await createPokemonBox(pokemonData.url);
        }

    } catch (error) {
        const container = document.getElementById("pokemon-container");

        const newPokemonBox = document.createElement("div");
        const newName = document.createTextNode(error);
        newPokemonBox.appendChild(newName);
        container.appendChild(newPokemonBox);
    }
}

buildStartPage();