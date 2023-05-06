import { getPokemonCount, getPokemonsList } from "./pokapi.js";

/* Vars */
let limit = 35;
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
}

/**
 * @typedef PokemonSpecie
 * @property {{ is_default: boolean, pokemon: {name : string, url: string}}[]} varieties
 *
 * @typedef Pokemon
 * @property {string} name
 * @property {{back_default : string, front_default: string}} sprites
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

    /**
     * @type PokemonSpecie
     * Fetch Pokemon's Data
     * */
    const pokemonSpecies = await fetch(url).then((response) => response.json());

    const pokemonURL = pokemonSpecies.varieties[0].pokemon.url;
    /** @type Pokemon */
    const pokemon = await fetch(pokemonURL).then((response) => response.json());

    /* Create the div who contains all informations */
    const newPokemonBox = document.createElement("div");

    newPokemonBox.onclick = () => {
        window.location.href = "details.html?id=" + pokemon.id;
        return;
    }

    newPokemonBox.classList.add("pokemon-box");

    /* Create Image element */
    const newSprite = document.createElement("img");

    if (pokemon.sprites.front_default) {
        newSprite.src = pokemon.sprites.front_default;
    }
    else {
        newSprite.src = "https://www.pokepedia.fr/images/f/f7/Sprite_%3F%3F%3F%3F%3F%3F%3F%3F%3F%3F_RS.png";
    }

    /* Create Name element */
    /* TODO: Choose name with language */
    const newName = document.createTextNode(capitalize(pokemon.name));

    /* Add Child elements to Parents */
    newPokemonBox.appendChild(newSprite);
    newPokemonBox.appendChild(newName);
    container.appendChild(newPokemonBox);
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
            if (ogOffset !== offset) {
                clearPokemonContainer();
                return;
            }

            /* Create a Pokemon Box element for the iterated Pokemon */
            await createPokemonBox(pokemon.url);
        }

    } catch (error) {
        const container = document.getElementById("pokemon-container");

        const newErrorText = document.createTextNode(error);
        container.appendChild(newErrorText);
    }
}

document.getElementById("previous-button").onclick = async () => {
    const futureOffset = offset - limit;

    if (futureOffset < 0) {
        return;
    }

    offset = futureOffset;
    await buildPokemonContainer();
}

document.getElementById("next-button").onclick = async () => {
    const pokemonCount = await getPokemonCount();
    const futureOffset = offset + limit;

    if (futureOffset > pokemonCount) {
        return;
    }

    offset = futureOffset;
    await buildPokemonContainer();
}

window.addEventListener('load', async () => {
    await buildPokemonContainer();
    console.log("load")
})
