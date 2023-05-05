import { getPokemonsList } from "./pokapi.js";

/* Vars */
let limit = 70;
let offset = 0;

/**
 * The function capitalizes the first letter of a given string.
 * 
 * Args:
 *   string: The parameter "string" is a string data type that represents the input string that needs
 *           to be capitalized.
 * 
 * Returns:
 *   Returns a string with the first character capitalized and the rest of the string unchanged.
 */
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * This function clears the content of a container element with the ID "pokemon-container".
 * 
 * Returns:
 *   Nothing.
 */
function clearPokemonContainer() {
    /* Clears the content of the Container */
    const container = document.getElementById("pokemon-container");
    container.innerHTML = "";

    return;
}

/**
 * The function updates the text of an HTML element to display the Pokedex number range of the first
 * and last Pokemon in a given interval.
 * 
 * Returns:
 *   Nothing.
 */
function buildPokedexInterval() {
    /* Target Interval's element */
    const pokedexInterval = document.getElementById("pokedex-interval");

    const firstPokemonNumber = offset + 1;
    const lastPokemonNumber = firstPokemonNumber + limit;

    /* Change Text of Interval with the Pokedex Number of the first and last Pokemon */
    pokedexInterval.innerText = firstPokemonNumber + " - " + lastPokemonNumber;

    return;
}

/**
 * This function creates a new div element containing a Pokemon's image and name, fetched from a given
 * URL, and appends it to a container element on the webpage.
 * 
 * Args:
 *   url: The URL from which to fetch the Pokemon's data.
 * 
 * Returns:
 *   Nothing.
 */
async function createPokemonBox(url) {
    /* Target Container's element */
    const container = document.getElementById("pokemon-container");

    /* Fetch Pokemon's Data */
    const response = await fetch(url);
    const pokemon = await response.json();

    /* Create the div who contains all informations */
    const newPokemonBox = document.createElement("div");
    newPokemonBox.classList.add("pokemon-box");

    /* Create Image element */
    const newSprite = document.createElement("img");
    newSprite.src = pokemon.sprites.front_default;

    /* Create Name element */
    const newName = document.createTextNode(capitalize(pokemon.name));

    /* Add Child elements to Parents */
    newPokemonBox.appendChild(newSprite);
    newPokemonBox.appendChild(newName);
    container.appendChild(newPokemonBox);

    return;
}

/**
 * This function builds a container for displaying a list of Pokemon and creates a Pokemon Box element
 * for each Pokemon in the list.
 * 
 * Returns:
 *   Nothing.
 */
async function buildPokemonContainer() {
    clearPokemonContainer();

    try {
        buildPokedexInterval();

        const ogOffset = offset;
        const pokemonList = await getPokemonsList(limit, offset);

        for (let pokemon of pokemonList) {
            /*
            * Since offset only change when page is changed we can clear 
            * the old page before quitting this function, preventing the
            * currently created Pokemon to be displayed.
            */
            if (ogOffset != offset) {
                clearPokemonContainer();
                return;
            }

            /* Create a Pokemon Box element for the itterated Pokemon */
            await createPokemonBox(pokemon.url);
        }

    } catch (error) {
        const container = document.getElementById("pokemon-container");

        const newErrorText = document.createTextNode(error);
        container.appendChild(newErrorText);
    }

    return;
}

document.getElementById("previous-button").onclick = () => {
    const futureOffset = offset - limit;

    if (futureOffset < 0) {
        return;
    }

    offset = futureOffset;
    buildPokemonContainer();

    return;
}

document.getElementById("next-button").onclick = () => {
    offset += limit;

    buildPokemonContainer();

    return;
}

buildPokemonContainer();