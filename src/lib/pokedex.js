/* Imported functions */
import { getPokemonsList, getPokemonCount, getPokemonByName } from "/lib/pokeapi.js";
import { capitalize } from "/lib/utilities.js"

/* Imported Constants */
import { questionMarkSprite, idParamName } from "/lib/utilities.js";

/* Vars */
let limit = 35;
let offset = 0;

// ----------------------------------------------------------------
// -- (Create = From scratch) != (Build = From existing element) --
// ----------------------------------------------------------------

/**
 * This function builds previous and next buttons that allow the user to navigate through a list of
 * Pokemon.
 */
export function buildNextPrevButtons() {
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
}

/**
 * This function builds a container for displaying a list of Pokemon, fetching the list from an API and
 * creating a Pokemon Box element for each Pokemon in the list.
 * 
 * @returns The function `buildPokemonContainer()` does not have a return statement, so it will return
 * `undefined` by default.
 */
export async function buildPokemonContainer() {
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
            await createPokemonBox(pokemon.name);
        }

    } catch (error) {
        const container = document.getElementById("pokemon-container");

        const newErrorText = document.createTextNode(error);
        container.appendChild(newErrorText);
    }
}

/**
 * The function clears the content of a container element with the ID "pokemon-container".
 */
function clearPokemonContainer() {
    /* Clears the content of the Container */
    const container = document.getElementById("pokemon-container");
    container.innerHTML = "";
}


/**
 * The function updates the text of an HTML element to display the Pokedex number range of the first
 * and last Pokemon in a list.
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
 * @property {{ back_default : string, front_default: string, other: {'official-artwork': {front_default: string}} }} sprites
 * This function creates a new div element containing a Pokemon's image and name, fetched from a given
 * URL, and appends it to a container element on the webpage.
 * 
 * Args:
 *  @param {string} url
 *   url: The URL from which to fetch the Pokemon's data.
 * 
 * Returns:
 *   Nothing.
 */
async function createPokemonBox(name) {
    /* Target Container's element */
    const container = document.getElementById("pokemon-container");

    /** @type Pokemon */
    const pokemon = await getPokemonByName(name);

    /* Create the div who contains all informations */
    const newPokemonBox = document.createElement("div");

    newPokemonBox.onclick = () => {
        window.location.href = "details.html?" + idParamName + "=" + pokemon.id;
    }

    newPokemonBox.classList.add("pokemon-box");

    /* Create Image element */
    const newSprite = document.createElement("img");

    if (pokemon.sprites.front_default) {
        newSprite.src = pokemon.sprites.front_default;
    }
    else {
        newSprite.src = questionMarkSprite;
    }

    /* Create Name element */
    /* TODO: Choose name with language */
    const newName = document.createTextNode(capitalize(pokemon.name));

    /* Add Child elements to Parents */
    newPokemonBox.appendChild(newSprite);
    newPokemonBox.appendChild(newName);
    container.appendChild(newPokemonBox);
}
