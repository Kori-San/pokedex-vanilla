/* Imported functions */
import { getPokemonsList, getPokemonByIdOrName } from "/lib/pokeapi.js";
import { capitalize, levenstein, getParamWithURL, hasParamWithURL, setParamWithURL, deleteParamWithURL, sortParamWithURL } from "/lib/utilities.js"

/* Imported Constants */
import { questionMarkSprite, idParamName } from "/lib/utilities.js";

/* Magic Constant */
const initialLimit = 35;
const initialOffset = 0;

/* URL Params constant */
const limitParamName = "limit";
const offsetParamName = "offset";
const searchParamName = "query";

/* Vars */
let limit = hasParamWithURL(limitParamName) ? parseInt(getParamWithURL(limitParamName)) : initialLimit;
let offset = hasParamWithURL(offsetParamName) ? parseInt(getParamWithURL(offsetParamName)) : initialOffset;
let filterValue = hasParamWithURL(searchParamName) ? getParamWithURL(searchParamName) : "";

/* Pokemon Lists */
let pokemonList = [];
let subPokemonList = [];

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

        offset = futureOffset < 0 ? 0 : futureOffset;
        setParamWithURL(offsetParamName, offset);

        await buildPokemonContainer();
    }

    document.getElementById("next-button").onclick = async () => {
        const futureOffset = offset + limit;

        if (futureOffset >= subPokemonList.length) {
            return;
        }

        offset = futureOffset;
        setParamWithURL(offsetParamName, offset);
        await buildPokemonContainer();
    }
}

export function buildSearchBar() {
    const searchBar = document.getElementById("search-bar");
    searchBar.value = hasParamWithURL(searchParamName) ? getParamWithURL(searchParamName) : "";

    searchBar.addEventListener("input", async function () {
        offset = 0;
        deleteParamWithURL(offsetParamName);

        filterValue = this.value;

        if (this.value) {
            setParamWithURL(searchParamName, filterValue);
        }
        else {
            deleteParamWithURL(searchParamName);
        }

        await buildPokemonContainer();
    });
}

export function buildLimitInput() {
    const limitInput = document.getElementById("limit-input");
    limitInput.value = limit;

    limitInput.addEventListener("input", async function () {
        if (this.value === "") {
            limit = 0;
        }
        else if (parseInt(this.value) > parseInt(this.max)) {
            limit = parseInt(this.max);
        }
        else if (parseInt(this.value) < parseInt(this.min)) {
            limit = parseInt(this.min);
        }
        else {
            limit = parseInt(this.value);
        }

        setParamWithURL(limitParamName, limit);

        await buildPokemonContainer();
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

function setPokedexInterval(message) {
    /* Target Interval's element */
    const pokedexInterval = document.getElementById("pokedex-interval");
    pokedexInterval.innerText = message;
}

function searchMatch(reference, value) {
    const treatedRef = reference.toLowerCase();
    const treatedVal = value.toLowerCase();

    return treatedRef.includes(treatedVal);
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
    sortParamWithURL();

    if (pokemonList.length === 0) {
        pokemonList = await getPokemonsList(10000, 0);
    }

    try {
        subPokemonList = pokemonList.filter(element => searchMatch(element.name, filterValue));

        if (subPokemonList.length === 0) {
            const error = new Error("No Pokemon found !");
            error.name = "NoPokeInSearch";
            throw error;
        }

        const truncPokemonList = subPokemonList.slice(offset, offset + limit);
        buildPokedexInterval(truncPokemonList);

        for (let pokemon of truncPokemonList) {
            /* Create a Pokemon Box element for the iterated Pokemon */
            createPokemonBox(pokemon.name);
        }

    } catch (error) {
        if (error.name = "NoPokeInSearch") {
            const container = document.getElementById("pokemon-container");

            const newErrorContainer = document.createElement("div");
            newErrorContainer.classList.add("error-message");

            const newErrorText = document.createTextNode(error.message);

            setPokedexInterval("None");

            newErrorContainer.appendChild(newErrorText);
            container.appendChild(newErrorContainer);
        }
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
 *  @param {string} name
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
    const pokemonDefaultFormName = pokemonSpecies.varieties[0].pokemon.name;
    const pokemonColor = pokemonSpecies.color.name;

    /** @type Pokemon */
    const pokemon = await getPokemonByIdOrName(pokemonDefaultFormName);

    /* Create Image element */
    const spriteContainer = document.createElement('div');
    spriteContainer.classList.add('background-sprite');
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

    spriteContainer.appendChild(newSprite)
    newNameContainer.appendChild(newName);
    newPokemonBox.appendChild(spriteContainer);
    newPokemonBox.appendChild(newNameContainer);

    /* Create Badges for types */
    const typesContainer = document.createElement('div');
    typesContainer.classList.add('types-container');

    pokemon.types.forEach(type => {
        const badge = document.createElement('span');
        badge.classList.add('badge-type');

        const typeName = document.createTextNode(type.type.name.toUpperCase());
        badge.appendChild(typeName);
        typesContainer.appendChild(badge);
    })
    newPokemonBox.appendChild(typesContainer);
}
