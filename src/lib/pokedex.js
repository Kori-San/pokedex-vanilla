/* Imported functions */
import { getPokemonsList, getPokemonByIdOrName } from "/lib/pokeapi.js";
import { capitalize, levenstein } from "/lib/utilities.js"

/* Imported Constants */
import { questionMarkSprite, idParamName } from "/lib/utilities.js";

/* Vars */
let limit = 35;
let offset = 0;
let pokemonList = [];
let subPokemonList = [];
let filterValue = "";

/* Magic Constant */
const misstypedMaximum = 1; // Allows X misstyped letter

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
        const futureOffset = offset + limit;

        if (futureOffset > subPokemonList.length) {
            return;
        }

        offset = futureOffset;
        await buildPokemonContainer();
    }
}

export function buildSearchBar() {
    const searchBar = document.getElementById("search-bar");
    searchBar.value = "";

    searchBar.addEventListener("input", function () {
        offset = 0;
        filterValue = this.value;

        buildPokemonContainer();
    });
}


/**
 * The function updates the text of an HTML element to display the Pokedex number range of the first
 * and last Pokemon in a list.
 */
function buildPokedexInterval(array) {
    /* Target Interval's element */
    const pokedexInterval = document.getElementById("pokedex-interval");

    const firstPokemonNumber = offset + 1;
    const lastPokemonNumber = offset + array.length;

    /* Change Text of Interval with the Pokedex Number of the first and last Pokemon */
    pokedexInterval.innerText = firstPokemonNumber + " - " + lastPokemonNumber;
}

function searchMatch(reference, value) {
    const treatedRef = reference.substr(0, value.length).toLowerCase();
    const treatedVal = value.toLowerCase();
    return levenstein(treatedRef, treatedVal) <= misstypedMaximum; // Allows one misstyped letter
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

    if (pokemonList.length === 0) {
        pokemonList = await getPokemonsList(10000, 0);
    }

    try {

        subPokemonList = pokemonList.filter(element => searchMatch(element.name, filterValue));
        const truncPokemonList = subPokemonList.slice(offset, offset + limit);
        buildPokedexInterval(truncPokemonList);

        for (let pokemon of truncPokemonList) {
            /* Create a Pokemon Box element for the iterated Pokemon */
            createPokemonBox(pokemon.name);
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
 * @typedef PokemonSpecie
 * @property {{ is_default: boolean, pokemon: {name : string, url: string}}[]} varieties
 * @property {{name: string}} color
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

    /*
    * First, we create the div who contains all the informations.
    * It is created first so the order of the pokedex can remain the same.
    */
    const newPokemonBox = document.createElement("div");
    container.appendChild(newPokemonBox);

    newPokemonBox.onclick = () => {
        window.location.href = "details.html?" + idParamName + "=" + pokemon.id;
    }

    /**
     * @type PokemonSpecie
     * Fetch Pokemon's Data
     * */
    /* TODO: GetPokemonSpeciesByIdOrName */
    const pokemonSpecies = await fetch("https://pokeapi.co/api/v2/pokemon-species/" + name).then((response) => response.json());
    const pokemonColor = pokemonSpecies.color.name;

    /** @type Pokemon */
    const pokemon = await getPokemonByIdOrName(name);

    /* Create Image element */
    const newSprite = document.createElement("img");

    const pokemonSprite = pokemon.sprites.front_default;
    newSprite.src = pokemonSprite ? pokemonSprite : questionMarkSprite;

    await newSprite.decode();

    /* Create div element to store newName */
    const newNameContainer = document.createElement('div');

    /* Create Name element */
    /* TODO: Choose name with language */
    const newName = document.createTextNode(capitalize(pokemon.species.name));

    /* Add Styles and append everything */
    newPokemonBox.classList.add("pokemon-box");
    newPokemonBox.classList.add("pokemon-background-" + pokemonColor);
    newNameContainer.classList.add('pokemon-name');

    newPokemonBox.appendChild(newSprite);
    newPokemonBox.appendChild(newNameContainer);
    newNameContainer.appendChild(newName);
}
