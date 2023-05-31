let pokemonCount = -1;

/**
 * @typedef PokemonSpecies
 * @type {object}
 * @property {number} count
 * @property {?string} next
 * @property {?string} previous
 * @property {{name: string, url: string}[]} results
 *
 * @param {number} limit
 * @param {number} offset
 * @returns {Promise<PokemonSpecies.results>}
 */
export async function getPokemonsList(limit, offset) {
    const url = `https://pokeapi.co/api/v2/pokemon-species?limit=${limit}&offset=${offset}`;
    const response = await fetch(url);

    /** @type {PokemonSpecies} */
    const data = await response.json();

    if (pokemonCount < 0) {
        pokemonCount = data.count;
    }

    return data.results;
}

export function getPokemonCount() {
    return pokemonCount;
}

/**
 * This function retrieves data for a specific Pokemon by its ID from the PokeAPI.
 *
 * @param {string} idOrName - The `id` parameter is a number that represents the
 * unique identifier of a specific Pokemon in the PokeAPI. This function uses the `id`
 * parameter to construct a URL that points to the API endpoint for the corresponding Pokemon.
 * The function then sends a GET request to the API endpoint using the constructed URL.
 *
 * @returns {Promise<Pokemon>} The function `getPokemonById` returns a Promise that resolves
 * to the data of a Pokemon with the specified `id` fetched from the PokeAPI.
 * The data is in JSON format.
 */
export async function getPokemonByIdOrName(idOrName) {
    const url = `https://pokeapi.co/api/v2/pokemon/${idOrName}`;
    const response = await fetch(url);
    return response.json();
}
